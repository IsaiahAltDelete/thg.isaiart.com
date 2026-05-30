/* ============================================================================
   HungerSim — shared battle-royale simulation engine.
   Powers both the Hunger Games and D&D Hunger Games pages from one codebase.
   A "mode" object supplies the content + combatant creation + card/detail
   rendering; the engine owns the loop, combat, events, UI and persistence.
============================================================================ */
window.HungerSim = (function () {
  'use strict';

  const INTERVALS = [1000, 5000, 15000, 30000, 60000];
  const INTERVAL_LABELS = ['1 sec', '5 sec', '15 sec', '30 sec', '1 min'];

  /* ---------- small utilities ---------- */
  const $ = (id) => document.getElementById(id);
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // Parse dice notation: "2d6", "1d8+2d6", "3d4+3"
  function rollDamage(expr) {
    let total = 0;
    String(expr).split('+').forEach(term => {
      const m = term.trim().match(/^(\d+)d(\d+)$/);
      if (m) { const n = +m[1], s = +m[2]; for (let i = 0; i < n; i++) total += rand(1, s); }
      else { const n = parseInt(term, 10); if (!isNaN(n)) total += n; }
    });
    return Math.max(1, total);
  }

  function create(mode) {
    const D = mode.data;
    const LS = {
      settings: mode.key + '-settings',
      victors: mode.key + '-victors'
    };

    /* ---------- state ---------- */
    let combatants = [];
    let day = 1, hour = 6;
    let timer = null;
    let running = false, gameOver = false;
    let placement = 24;
    let weather = 'Clear';
    let currentArena = null;
    let freqSyncing = false;

    let settings = loadSettings();

    /* ---------- DOM ---------- */
    const el = {
      day: $('day'), time: $('time'), weather: $('weather'), arenaName: $('arena-name'),
      container: $('combatants'),
      log: $('log-container'),
      countLeft: $('count-left'),
      mostKills: $('most-kills'), mostKillsName: $('most-kills-name'),
      fanList: $('fan-favorites'),
      freq: $('event-frequency'), freqLabel: $('event-frequency-label'),
      freqSelect: $('event-frequency-setting'),
      startBtn: $('start-button'), pauseBtn: $('pause-button'), resumeBtn: $('resume-button'),
      restartBtn: $('restart-button')
    };

    /* ---------- settings ---------- */
    function loadSettings() {
      let s = { baseHealth: 20, baseHunger: 100, freq: 0 };
      try { Object.assign(s, JSON.parse(localStorage.getItem(LS.settings)) || {}); } catch (e) {}
      s.baseHealth = clamp(+s.baseHealth || 20, 10, 60);
      s.baseHunger = clamp(+s.baseHunger || 100, 50, 200);
      s.freq = clamp(+s.freq || 0, 0, 4);
      return s;
    }
    function saveSettings() { try { localStorage.setItem(LS.settings, JSON.stringify(settings)); } catch (e) {} }

    /* ---------- victors ---------- */
    function getVictors() { try { return JSON.parse(localStorage.getItem(LS.victors)) || []; } catch (e) { return []; } }
    function addVictor(v) { const list = getVictors(); list.unshift(v); try { localStorage.setItem(LS.victors, JSON.stringify(list.slice(0, 100))); } catch (e) {} }
    function clearVictors() { try { localStorage.removeItem(LS.victors); } catch (e) {} }

    /* ---------- log ---------- */
    function log(text, type = 'info') {
      if (!el.log) return;
      const d = document.createElement('div');
      d.className = 'log-entry ' + type;
      d.innerHTML = `<span class="log-day">D${day}</span> ${text}`;
      el.log.prepend(d);
      while (el.log.children.length > 60) el.log.removeChild(el.log.lastChild);
    }

    /* ---------- combatants ---------- */
    const aliveList = () => combatants.filter(c => c.isAlive);
    const aliveCount = () => aliveList().length;
    function pickAlive(exclude) {
      const pool = exclude ? aliveList().filter(c => c !== exclude && !exclude.includes?.(c)) : aliveList();
      return pool.length ? pick(pool) : null;
    }

    function uniqueName(usedFirst, usedFull) {
      const first = D.firstNames, last = D.lastNames;
      for (let i = 0; i < 200; i++) {
        const f = pick(first), l = pick(last), full = `${f} ${l}`;
        if (!usedFull.has(full)) {
          usedFull.add(full);
          return { first: f, last: l, full };
        }
      }
      const full = `${pick(first)} ${pick(last)} ${rand(1, 99)}`;
      usedFull.add(full);
      return { first: full.split(' ')[0], last: '', full };
    }

    function generate() {
      combatants = [];
      placement = 24;
      const usedFull = new Set();
      const genders = mode.genders || ['Male', 'Female'];
      let id = 0;
      for (let district = 1; district <= 12; district++) {
        for (let g = 0; g < 2; g++) {
          id++;
          const name = uniqueName(null, usedFull);
          const base = {
            id, name: name.full, district,
            gender: genders[g],
            isAlive: true,
            maxHealth: settings.baseHealth, health: settings.baseHealth,
            maxHunger: settings.baseHunger, hunger: settings.baseHunger,
            ac: 10, attackBonus: 2, dmgBonus: 0,
            kills: 0, actions: 0,
            weapon: null, inventory: [],
            statusEffects: [], alliances: [], placement: null
          };
          const c = mode.createCombatant(base, { rand, pick, rollDamage, D, settings, genderIndex: g });
          combatants.push(c);
        }
      }
    }

    /* ---------- combat ---------- */
    function effectiveAC(c) {
      let ac = c.ac;
      c.statusEffects.forEach(s => { if (s.effect === 'armor') ac += s.value; });
      return ac;
    }
    function effectiveAtk(c) {
      let a = c.attackBonus;
      c.statusEffects.forEach(s => { if (s.effect === 'agility') a += s.value; });
      if (weather === 'Storm' || weather === 'Fog' || weather === 'Blizzard') a -= 1;
      return a;
    }
    function attack(att, def) {
      const roll = rand(1, 20);
      const crit = roll === 20;
      if (!crit && roll + effectiveAtk(att) < effectiveAC(def)) return { hit: false };
      let dmg = rollDamage(att.weapon ? att.weapon.damage : '1d4') + (att.dmgBonus || 0);
      if (crit) dmg = Math.floor(dmg * 1.8);
      return { hit: true, crit, dmg };
    }

    function damage(c, amount) {
      c.health = Math.max(0, c.health - amount);
      pulse(c.id, 'damage');
    }
    function heal(c, amount) {
      c.health = Math.min(c.maxHealth, c.health + amount);
      pulse(c.id, 'heal');
    }

    function kill(victim, cause, killer) {
      if (!victim.isAlive) return;
      victim.isAlive = false;
      victim.health = 0;
      victim.placement = placement--;
      // break this victim out of everyone's alliances
      combatants.forEach(c => { c.alliances = c.alliances.filter(x => x !== victim.id); });
      victim.alliances = [];
      if (killer && killer !== victim) { killer.kills++; killer.actions += 2; }
      log(cause, 'death');
      checkVictory();
    }

    function checkVictory() {
      if (gameOver) return;
      const alive = aliveList();
      if (alive.length <= 1) {
        gameOver = true;
        stop();
        if (alive.length === 1) {
          const w = alive[0];
          w.isWinner = true;
          w.placement = 1;
          addVictor(w.name);
          log(`👑 <strong>${esc(w.name)}</strong> is the victor! ${esc(mode.terms.title)} over.`, 'victory');
        } else {
          log('Everyone has fallen. There is no victor.', 'gameover');
        }
        render(); updateScoreboard();
        setButtons('over');
      }
    }

    /* ---------- status & hunger upkeep ---------- */
    function upkeep() {
      aliveList().forEach(c => {
        // status effects
        c.statusEffects = c.statusEffects.filter(s => {
          if (s.effect === 'poison') { c.health = Math.max(0, c.health - (s.value || 1)); }
          if (s.effect === 'regen') { c.health = Math.min(c.maxHealth, c.health + (s.value || 1)); }
          s.duration--;
          return s.duration > 0;
        });
        // mana regen / mode hook
        if (mode.upkeep) mode.upkeep(c, { rand });
        // hunger
        c.hunger = Math.max(0, c.hunger - 1);
        if (c.hunger <= 0) {
          // try to eat
          const food = c.inventory.find(i => i.effect === 'hunger' || i.effect === 'heal');
          if (food) {
            c.inventory = c.inventory.filter(i => i !== food);
            if (food.effect === 'hunger') c.hunger = Math.min(c.maxHunger, food.value);
            else c.health = Math.min(c.maxHealth, c.health + food.value);
            log(`${c.emoji} ${esc(c.name)} consumes ${food.emoji} ${esc(food.name)}.`, 'resource');
          } else {
            c.health = Math.max(0, c.health - 2);
          }
        }
        if (c.health <= 0 && c.isAlive) {
          kill(c, `${c.emoji} ${esc(c.name)} succumbs to their wounds.`, null);
        }
      });
    }

    /* ============================ EVENTS ============================ */
    // Each event returns false if it could not run (so we can retry another).
    const coreEvents = [
      { type: 'fight', weight: a => 3 + (a <= 6 ? 6 : 0), run: fight },
      { type: 'weapon', weight: () => 2, run: findWeapon },
      { type: 'resource', weight: () => 2, run: findResource },
      { type: 'heal', weight: () => 1.5, run: healEvent },
      { type: 'alliance', weight: a => (a > 4 ? 1.6 : 0), run: formAlliance },
      { type: 'break', weight: a => (a > 3 ? 0.7 : 0), run: breakAlliance },
      { type: 'natural', weight: () => 1, run: naturalEvent },
      { type: 'trap', weight: () => 1, run: trapEvent },
      { type: 'wildlife', weight: () => 1, run: wildlifeEvent },
      { type: 'treasure', weight: () => 0.6, run: treasureEvent }
    ];
    const allEvents = coreEvents.concat((mode.extraEvents || []).map(e => ({
      type: e.type, weight: e.weight, run: () => e.run(engineApi)
    })));

    function chooseEvent() {
      const a = aliveCount();
      const weighted = allEvents.map(e => ({ e, w: Math.max(0, e.weight(a)) }));
      const total = weighted.reduce((s, x) => s + x.w, 0);
      if (total <= 0) return fight;
      let r = Math.random() * total;
      for (const x of weighted) { r -= x.w; if (r <= 0) return x.e.run; }
      return fight;
    }

    function fight() {
      const a = pickAlive();
      const b = a ? pickAlive(a) : null;
      if (!a || !b) return false;
      a.actions++;
      const res = attack(a, b);
      const aw = a.weapon ? `${a.weapon.emoji} ` : '';
      if (!res.hit) {
        log(`${a.emoji} ${esc(a.name)} swings ${aw}at ${b.emoji} ${esc(b.name)} and misses.`, 'fight');
      } else {
        damage(b, res.dmg);
        if (b.health <= 0) {
          kill(b, `${a.emoji} ${esc(a.name)} ${res.crit ? 'lands a critical blow on' : 'cuts down'} ${b.emoji} ${esc(b.name)}${a.weapon ? ' with the ' + esc(a.weapon.name) : ''}.`, a);
        } else {
          log(`${a.emoji} ${esc(a.name)} hits ${b.emoji} ${esc(b.name)} for <strong>${res.dmg}</strong>${res.crit ? ' (CRIT!)' : ''}.`, 'fight');
        }
      }
      return true;
    }

    function findWeapon() {
      const c = pickAlive(); if (!c) return false;
      const w = pick(D.weapons);
      if (!c.weapon || w.legendary || Math.random() < 0.5) {
        c.weapon = w; c.actions++;
        log(`${c.emoji} ${esc(c.name)} ${w.legendary ? 'unearths the legendary' : 'finds a'} ${w.emoji} <strong>${esc(w.name)}</strong>.`, 'resource');
      }
      return true;
    }

    function findResource() {
      const c = pickAlive(); if (!c) return false;
      const r = pick(D.resources);
      c.actions++;
      if (r.effect === 'hunger') { c.hunger = Math.min(c.maxHunger, c.hunger + r.value); }
      else if (r.effect === 'heal') { heal(c, r.value); }
      else if (r.effect === 'armor' || r.effect === 'agility') {
        c.statusEffects.push({ name: r.name, effect: r.effect, value: r.value, duration: r.duration || 5 });
      } else { c.inventory.push(r); }
      log(`${c.emoji} ${esc(c.name)} picks up ${r.emoji} ${esc(r.name)}.`, 'resource');
      return true;
    }

    function healEvent() {
      const c = pickAlive(); if (!c) return false;
      if (c.health >= c.maxHealth) return false;
      const amt = rand(3, 8);
      heal(c, amt); c.actions++;
      log(`${c.emoji} ${esc(c.name)} treats their wounds and recovers <strong>${amt}</strong> HP.`, 'heal');
      return true;
    }

    function formAlliance() {
      const a = pickAlive(); const b = a ? pickAlive(a) : null;
      if (!a || !b || a.alliances.includes(b.id)) return false;
      a.alliances.push(b.id); b.alliances.push(a.id);
      a.actions++; b.actions++;
      log(`🤝 ${a.emoji} ${esc(a.name)} and ${b.emoji} ${esc(b.name)} form an alliance.`, 'alliance');
      return true;
    }

    function breakAlliance() {
      const a = aliveList().find(c => c.alliances.length);
      if (!a) return false;
      const bId = a.alliances[0];
      const b = combatants.find(c => c.id === bId);
      a.alliances = a.alliances.filter(x => x !== bId);
      if (b) b.alliances = b.alliances.filter(x => x !== a.id);
      log(`💔 ${a.emoji} ${esc(a.name)} betrays ${b ? b.emoji + ' ' + esc(b.name) : 'an ally'}!`, 'break');
      // chance the betrayal turns deadly
      if (b && Math.random() < 0.5) {
        const res = attack(a, b);
        if (res.hit) { damage(b, res.dmg); if (b.health <= 0) kill(b, `${a.emoji} ${esc(a.name)} strikes down former ally ${b.emoji} ${esc(b.name)}.`, a); }
      }
      return true;
    }

    function naturalEvent() {
      const text = pick(D.naturalEvents);
      weather = pick(D.weather);
      log(`🌪️ ${esc(text)}. <em>Weather: ${esc(weather)}.</em>`, 'natural');
      aliveList().forEach(c => {
        if (Math.random() < 0.35) {
          const dmg = rand(2, 7);
          damage(c, dmg);
          if (c.health <= 0) kill(c, `${c.emoji} ${esc(c.name)} falls as ${esc(text.toLowerCase())}.`, null);
        }
      });
      return true;
    }

    function trapEvent() {
      const c = pickAlive(); if (!c) return false;
      const dmg = rand(4, 12);
      damage(c, dmg);
      if (c.health <= 0) kill(c, `🪤 ${c.emoji} ${esc(c.name)} is killed by a hidden trap.`, null);
      else log(`🪤 ${c.emoji} ${esc(c.name)} triggers a trap and takes <strong>${dmg}</strong> damage.`, 'trap');
      return true;
    }

    function wildlifeEvent() {
      const c = pickAlive(); if (!c) return false;
      const beast = mode.beasts ? pick(mode.beasts) : 'wild beast';
      const dmg = rand(3, 10);
      damage(c, dmg);
      if (c.health <= 0) kill(c, `🐾 ${c.emoji} ${esc(c.name)} is mauled to death by a ${esc(beast)}.`, null);
      else log(`🐾 ${c.emoji} ${esc(c.name)} fights off a ${esc(beast)}, taking <strong>${dmg}</strong> damage.`, 'wildlife');
      return true;
    }

    function treasureEvent() {
      const c = pickAlive(); if (!c) return false;
      const buff = D.resources.filter(r => r.effect === 'armor' || r.effect === 'agility');
      const item = buff.length ? pick(buff) : pick(D.resources);
      c.statusEffects.push({ name: item.name, effect: item.effect, value: item.value, duration: item.duration || 6 });
      c.actions++;
      log(`💎 ${c.emoji} ${esc(c.name)} discovers ${item.emoji} <strong>${esc(item.name)}</strong>.`, 'treasure');
      return true;
    }

    /* ---------- the tick ---------- */
    function tick() {
      if (gameOver) return;
      // advance clock
      hour++; if (hour > 23) { hour = 0; day++; }
      // run one event (retry a couple of times if it no-ops)
      for (let i = 0; i < 4; i++) { if (chooseEvent()() !== false) break; }
      upkeep();
      if (aliveCount() <= 5) breakRemainingAlliances();
      render(); updateClock(); updateScoreboard();
    }

    function breakRemainingAlliances() {
      let broke = false;
      aliveList().forEach(c => { if (c.alliances.length) { c.alliances = []; broke = true; } });
      if (broke) log('⚔️ The final tributes turn on each other — all alliances shatter.', 'break');
    }

    /* ============================ RENDERING ============================ */
    function pulse(id, cls) {
      const card = el.container && el.container.querySelector(`[data-id="${id}"]`);
      if (!card) return;
      card.classList.remove('fx-damage', 'fx-heal');
      void card.offsetWidth;
      card.classList.add(cls === 'heal' ? 'fx-heal' : 'fx-damage');
    }

    function render() {
      if (!el.container) return;
      const frag = document.createDocumentFragment();
      combatants.forEach(c => {
        const card = document.createElement('div');
        card.className = 'card' + (c.isAlive ? '' : ' dead') + (c.isWinner ? ' winner' : '');
        card.dataset.id = c.id;
        const hp = Math.round((c.health / c.maxHealth) * 100);
        const hg = Math.round((c.hunger / c.maxHunger) * 100);
        card.innerHTML = `
          ${!c.isAlive ? `<span class="placement">#${c.placement || ''}</span>` : ''}
          ${c.isWinner ? `<span class="crown">👑</span>` : ''}
          <div class="card-avatar">${c.emoji}</div>
          <div class="card-name">${esc(c.name)}</div>
          <div class="card-meta">${esc(mode.cardMeta(c))}</div>
          <div class="bar hp" title="Health"><span style="width:${hp}%"></span></div>
          <div class="bar hg" title="Hunger"><span style="width:${hg}%"></span></div>
          <div class="card-foot">
            <span>${c.weapon ? c.weapon.emoji : '✊'}</span>
            <span title="Kills">🗡️ ${c.kills}</span>
            ${c.alliances.length ? `<span title="Allies">🤝 ${c.alliances.length}</span>` : ''}
          </div>`;
        card.addEventListener('click', () => openDetail(c));
        frag.appendChild(card);
      });
      el.container.innerHTML = '';
      el.container.appendChild(frag);
    }

    function updateClock() {
      if (el.day) el.day.textContent = day;
      if (el.time) el.time.textContent = String(hour).padStart(2, '0') + ':00';
      if (el.weather) el.weather.textContent = weather;
    }

    function updateScoreboard() {
      if (el.countLeft) el.countLeft.textContent = aliveCount();
      const top = combatants.slice().sort((a, b) => b.kills - a.kills)[0];
      if (el.mostKills) el.mostKills.textContent = top ? top.kills : 0;
      if (el.mostKillsName) el.mostKillsName.textContent = top && top.kills ? top.name : '—';
      if (el.fanList) {
        const fans = combatants.slice().sort((a, b) => b.actions - a.actions).slice(0, 3);
        el.fanList.innerHTML = fans.map((f, i) =>
          `<span class="fan fan-${i + 1}">${esc(f.name)}</span>`).join('');
      }
    }

    /* ---------- detail modal ---------- */
    function openDetail(c) {
      const modal = $('detail-modal');
      if (!modal) return;
      $('detail-name').innerHTML = `${c.emoji} ${esc(c.name)}`;
      $('detail-body').innerHTML = mode.detailHTML(c, { esc, statusList });
      modal.classList.add('open');
    }
    function statusList(c) {
      if (!c.statusEffects.length) return '<span class="muted">None</span>';
      return c.statusEffects.map(s => `${esc(s.name)} (${s.duration})`).join(', ');
    }

    /* ============================ ARENAS ============================ */
    function setArena(arena) {
      currentArena = arena;
      const body = document.body;
      body.className = body.className.replace(/\barena-[\w-]+\b/g, '').trim();
      if (!arena) {
        body.style.backgroundImage = '';
        if (el.arenaName) el.arenaName.textContent = '—';
        return;
      }
      if (mode.arenaMode === 'image') {
        const bg = pick(arena.backgrounds);
        body.style.backgroundImage = `url('./images/${bg}')`;
      } else {
        body.style.backgroundImage = '';
      }
      body.classList.add('arena-' + arena.slug);
      if (el.arenaName) el.arenaName.textContent = arena.name;
      log(`📍 Arena set to <strong>${esc(arena.name)}</strong>.`, 'natural');
    }

    function buildArenaModal() {
      const list = $('arena-list');
      if (!list) return;
      list.innerHTML = '';
      D.arenas.forEach(arena => {
        const b = document.createElement('button');
        b.className = 'arena-card';
        b.title = arena.description;
        if (mode.arenaMode === 'image') {
          b.innerHTML = `<img src="./images/${arena.backgrounds[0]}" alt="${esc(arena.name)}" loading="lazy"><span>${esc(arena.name)}</span>`;
        } else {
          b.innerHTML = `<div class="arena-swatch arena-${arena.slug}"></div><span>${esc(arena.name)}</span>`;
        }
        b.addEventListener('click', () => { setArena(arena); closeModal('arena-modal'); });
        list.appendChild(b);
      });
    }

    /* ============================ MODALS ============================ */
    function openModal(id) { const m = $(id); if (m) m.classList.add('open'); }
    function closeModal(id) { const m = $(id); if (m) m.classList.remove('open'); }

    function wireModals() {
      document.querySelectorAll('[data-open]').forEach(btn =>
        btn.addEventListener('click', () => {
          const id = btn.dataset.open;
          if (id === 'victors-modal') renderVictors();
          if (id === 'alliances-modal') renderAlliances();
          openModal(id);
        }));
      document.querySelectorAll('.modal .close').forEach(x =>
        x.addEventListener('click', () => x.closest('.modal').classList.remove('open')));
      document.querySelectorAll('.modal').forEach(m =>
        m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); }));
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
      });
    }

    function renderVictors() {
      const list = $('victors-list'); if (!list) return;
      const v = getVictors();
      list.innerHTML = v.length
        ? v.map((n, i) => `<div class="victor-item">👑 ${esc(n)}</div>`).join('')
        : '<p class="muted">No victors yet. Run a simulation!</p>';
    }
    function renderAlliances() {
      const list = $('alliances-list'); if (!list) return;
      const seen = new Set(); const rows = [];
      aliveList().forEach(c => c.alliances.forEach(id => {
        const key = [c.id, id].sort((a, b) => a - b).join('-');
        if (seen.has(key)) return; seen.add(key);
        const o = combatants.find(x => x.id === id);
        if (o && o.isAlive) rows.push(`<div class="alliance-item">${c.emoji} ${esc(c.name)} <span class="muted">&amp;</span> ${o.emoji} ${esc(o.name)}</div>`);
      }));
      list.innerHTML = rows.length ? rows.join('') : '<p class="muted">No active alliances.</p>';
    }

    /* ============================ CONTROL FLOW ============================ */
    function setButtons(stateName) {
      const set = (b, on) => { if (b) b.disabled = !on; };
      if (stateName === 'idle') { set(el.startBtn, 1); set(el.pauseBtn, 0); set(el.resumeBtn, 0); set(el.restartBtn, 0); }
      if (stateName === 'running') { set(el.startBtn, 0); set(el.pauseBtn, 1); set(el.resumeBtn, 0); set(el.restartBtn, 1); }
      if (stateName === 'paused') { set(el.startBtn, 0); set(el.pauseBtn, 0); set(el.resumeBtn, 1); set(el.restartBtn, 1); }
      if (stateName === 'over') { set(el.startBtn, 0); set(el.pauseBtn, 0); set(el.resumeBtn, 0); set(el.restartBtn, 1); }
    }

    function startLoop() { stopLoop(); timer = setInterval(tick, INTERVALS[settings.freq]); }
    function stopLoop() { if (timer) { clearInterval(timer); timer = null; } }

    function start() {
      if (running && !gameOver) return;
      gameOver = false; running = true; day = 1; hour = 6; weather = 'Clear';
      generate(); render(); updateClock(); updateScoreboard();
      log(`🎺 The ${esc(mode.terms.title)} begin! 24 ${esc(mode.terms.combatants.toLowerCase())} enter the arena.`, 'natural');
      startLoop(); setButtons('running');
    }
    function pause() { if (!running) return; running = false; stopLoop(); setButtons('paused'); }
    function resume() { if (running || gameOver) return; running = true; startLoop(); setButtons('running'); }
    function stop() { running = false; stopLoop(); }
    function restart() { stop(); gameOver = false; start(); }

    /* ---------- frequency ---------- */
    function setFreq(index, source) {
      if (freqSyncing) return;
      freqSyncing = true;
      settings.freq = clamp(+index, 0, 4);
      if (el.freq && source !== 'slider') el.freq.value = settings.freq;
      if (el.freqSelect && source !== 'select') el.freqSelect.value = settings.freq;
      if (el.freqLabel) el.freqLabel.textContent = INTERVAL_LABELS[settings.freq];
      saveSettings();
      if (running && !gameOver) startLoop();
      freqSyncing = false;
    }

    /* ============================ WIRE UP ============================ */
    function bindControls() {
      if (el.startBtn) el.startBtn.addEventListener('click', start);
      if (el.pauseBtn) el.pauseBtn.addEventListener('click', pause);
      if (el.resumeBtn) el.resumeBtn.addEventListener('click', resume);
      if (el.restartBtn) el.restartBtn.addEventListener('click', restart);

      const rngBtn = $('random-arena-button');
      if (rngBtn) rngBtn.addEventListener('click', () => setArena(pick(D.arenas)));

      if (el.freq) {
        el.freq.value = settings.freq;
        el.freq.addEventListener('input', () => setFreq(el.freq.value, 'slider'));
      }
      if (el.freqSelect) {
        el.freqSelect.value = settings.freq;
        el.freqSelect.addEventListener('change', () => setFreq(el.freqSelect.value, 'select'));
      }
      if (el.freqLabel) el.freqLabel.textContent = INTERVAL_LABELS[settings.freq];

      // settings modal
      const bh = $('base-health'), bhg = $('base-hunger');
      if (bh) bh.value = settings.baseHealth;
      if (bhg) bhg.value = settings.baseHunger;
      const saveBtn = $('save-settings');
      if (saveBtn) saveBtn.addEventListener('click', () => {
        if (bh) settings.baseHealth = clamp(+bh.value || 20, 10, 60);
        if (bhg) settings.baseHunger = clamp(+bhg.value || 100, 50, 200);
        saveSettings(); closeModal('settings-modal');
        log('⚙️ Settings saved. They apply on the next game.', 'info');
      });
      const resetBtn = $('reset-settings');
      if (resetBtn) resetBtn.addEventListener('click', () => {
        settings = { baseHealth: 20, baseHunger: 100, freq: settings.freq };
        if (bh) bh.value = 20; if (bhg) bhg.value = 100; saveSettings();
      });
      const resetAll = $('reset-all');
      if (resetAll) resetAll.addEventListener('click', () => {
        clearVictors(); settings = { baseHealth: 20, baseHunger: 100, freq: 0 };
        if (bh) bh.value = 20; if (bhg) bhg.value = 100; setFreq(0);
        saveSettings(); closeModal('settings-modal');
        log('🧹 Everything reset.', 'info');
      });
      const clearVic = $('clear-victors-button');
      if (clearVic) clearVic.addEventListener('click', () => { clearVictors(); renderVictors(); });
    }

    /* ---------- engineApi handed to mode extraEvents ---------- */
    const engineApi = {
      rand, pick, rollDamage, log, kill, damage, heal, attack,
      pickAlive, aliveList, aliveCount, get combatants() { return combatants; }, D
    };

    /* ---------- init ---------- */
    function init() {
      if (mode.terms && mode.terms.heading) {
        const h = $('game-title'); if (h) h.textContent = mode.terms.heading;
        document.title = mode.terms.heading;
      }
      bindControls();
      wireModals();
      buildArenaModal();
      generate(); render(); updateClock(); updateScoreboard();
      setButtons('idle');
    }

    return { init, engineApi };
  }

  return { create };
})();
