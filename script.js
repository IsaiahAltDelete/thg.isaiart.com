document.addEventListener('DOMContentLoaded', () => {
  const weapons = [
    { name: 'Short Sword', emoji: '🗡️', damage: '1d6' },
    { name: 'Longbow', emoji: '🏹', damage: '1d8' },
    { name: 'Battle Axe', emoji: '🪓', damage: '1d8' },
    { name: 'Dagger', emoji: '🔪', damage: '1d4' },
    { name: 'Warhammer', emoji: '🔨', damage: '1d8' },
    { name: 'Greatsword', emoji: '⚔️', damage: '2d6' },
    // Legendary weapons
    { name: 'Excalibur', emoji: '🗡️', damage: '3d8', legendary: true },
    { name: 'Mjolnir', emoji: '🔨', damage: '4d6', legendary: true },
  ];
  const skinTones = ['🏻', '🏼', '🏽', '🏾', '🏿'];
  const genders = ['♂️', '♀️'];
  const districts = Array.from({ length: 12 }, (_, i) => i + 1);
  const firstNames = [
    'Aria', 'Zephyr', 'Nova', 'Caspian', 'Luna', 'Orion', 'Sage', 'Phoenix', 'Lyra', 'Atlas',
    'Kai', 'Jade', 'Ezra', 'Rowan', 'Skye', 'Ember', 'Ash', 'Finn', 'Quinn', 'Raven',
    'Eden', 'Reed', 'Jett', 'Milo', 'Ivy', 'Faye', 'Blake', 'Coral', 'Dane', 'Wren',
    'Leo', 'Mara', 'Avery', 'Asher', 'Harper', 'River', 'Storm', 'Indigo', 'Zara', 'Silas',
    'Riley', 'Kendall', 'Jordan', 'Morgan', 'Casey', 'Taylor', 'Reese', 'Alex', 'Skyler', 'Blair',
    'Remy', 'Peyton', 'Quincy', 'Sydney', 'Dylan', 'Logan', 'Parker', 'Rory', 'Sloan', 'Amara',
    'Beau', 'Chance', 'Dahlia', 'Elliot', 'Freya', 'Gideon', 'Hazel', 'Isla', 'Jasper', 'Kira',
    'Lachlan', 'Maeve', 'Nico', 'Opal', 'Piper', 'Rafael', 'Sierra', 'Teagan', 'Ulric',
    'Vera', 'Wyatt', 'Xander', 'Yara', 'Zane', 'Hawk', 'Ayla', 'Elio', 'Seren', 'Alden',
    'Tessa', 'Juno', 'Callum', 'Willa', 'Bran', 'Elara', 'Maven', 'Clover', 'Eris', 'Thorne',
    'Galen', 'Vale', 'Rook', 'Kael', 'Maia', 'Elowen', 'Frost', 'Vesper', 'Raine', 'Cyrus',
    'Dorian', 'Lyric', 'Winter', 'Arrow', 'Talon', 'Isolde', 'Sable', 'Aurelia', 'Sol', 'Finnian',
    'Juniper', 'Soren', 'Echo', 'Rune', 'Drake', 'Elian', 'Lucian', 'Kalon', 'Sorrel',
    'Niamh', 'Corwin', 'Xanthe', 'Liora', 'Selene'
  ];
  const lastNames = [
    'Frost', 'Storm', 'Wilde', 'Blackwood', 'Rivers', 'Sky', 'Stone', 'Moon', 'Flame', 'Star',
    'Vale', 'Haven', 'Thorne', 'Winter', 'Ember', 'Blaze', 'Shadow', 'Lark', 'Fable', 'Noble',
    'Brook', 'Shade', 'Finch', 'Knight', 'Gale', 'Hunter', 'Fox', 'Ash', 'Viper', 'Falcon',
    'Moss', 'Reed', 'Bluff', 'Dune', 'Pine', 'Grove', 'Heath', 'Marsh', 'Glade', 'Field',
    'Cliff', 'Meadow', 'Ridge', 'Holt', 'Cove', 'Dell', 'Fern', 'Leaf', 'Briar', 'Vale',
    'Knightley', 'Black', 'Dusk', 'Hart', 'Whisper', 'Shade', 'Bright', 'Crest', 'Hollow', 'Dawn',
    'Evergreen', 'Fable', 'Glimmer', 'Haze', 'Jewel', 'Kite', 'Loom', 'Mist', 'Night', 'Owl',
    'Petal', 'Quest', 'Rune', 'Stone', 'Thyme', 'Underwood', 'Vine', 'Warden', 'Xane', 'Yew', 'Zenith',
    'Alder', 'Bane', 'Crimson', 'Frostborn', 'Driftwood', 'Hawke', 'Ironwood', 'Lowell', 'Nightshade', 'Ravenwood',
    'Silverwind', 'Stormrider', 'Thistle', 'Wildflower', 'Windrider', 'Winterfell', 'Whitestone', 'Wolfstone', 'Duskwalker', 'Ironheart'
  ];
  const naturalEvents = [
    'A sudden storm hits the arena',
    'An earthquake shakes the ground',
    'A wildfire spreads rapidly',
    'A dense fog covers the arena',
    'A torrential rain begins',
    'A blistering heatwave strikes',
    'Snow starts falling heavily',
  ];
  const weatherTypes = ['Clear', 'Rain', 'Storm', 'Fog', 'Heatwave', 'Snow'];
  const eventIntervals = [1000, 5000, 15000, 30000, 60000];
  const eventIntervalLabels = ['1 Second', '5 Seconds', '15 Seconds', '30 Seconds', '1 Minute'];
  let tributes = [];
  let events = [];
  let day = 1;
  let hour = 6;
  let interval;
  let placementCounter = 24;
  let gameOver = false;
  let currentWeather = 'Clear';

  const generateUniqueName = (usedNames, usedFirstNames) => {
    let name;
    let firstName;
    do {
      firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      name = `${firstName} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    } while (usedNames.has(name) || usedFirstNames.has(firstName));
    usedNames.add(name);
    usedFirstNames.add(firstName);
    return name;
  };

  const generateEmoji = (gender) => {
    const baseEmoji = gender === '♂️' ? '👨' : '👩';
    const skinTone = skinTones[Math.floor(Math.random() * skinTones.length)];
    return baseEmoji + skinTone;
  };

  const generateStats = () => {
    return {
      strength: Math.floor(Math.random() * 6) + 8, // 8 to 13
      agility: Math.floor(Math.random() * 6) + 8,
      intelligence: Math.floor(Math.random() * 6) + 8,
      stealth: Math.floor(Math.random() * 6) + 8,
    };
  };

  const generateTributes = () => {
    const usedNames = new Set();
    const usedFirstNames = new Set();
    let tributes = [];
    districts.forEach(district => {
      for (let g = 0; g < 2; g++) {
        const name = generateUniqueName(usedNames, usedFirstNames);
        const gender = genders[g];
        tributes.push({
          id: tributes.length + 1,
          name: name,
          health: 20,
          hunger: 100,
          AC: 10,
          attackBonus: 2,
          isAlive: true,
          kills: 0,
          weapon: null,
          emoji: generateEmoji(gender),
          actions: 0,
          alliances: [],
          inventory: [],
          stats: generateStats(),
          district: district,
        });
      }
    });
    return tributes;
  };

  const rollDice = (diceExpression) => {
    const [numDice, diceType] = diceExpression.toLowerCase().split('d').map(Number);
    let total = 0;
    let rolls = [];
    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * diceType) + 1;
      total += roll;
      rolls.push(roll);
    }
    return { total, rolls };
  };

  const attack = (attacker, defender) => {
    const attackRoll = Math.floor(Math.random() * 20) + 1 + Math.floor((attacker.stats.strength - 10) / 2);
    const attackTotal = attackRoll + attacker.attackBonus;
    const hit = attackTotal >= defender.AC;
    let damage = 0;
    let damageRollResult = null;
    if (hit) {
      if (attacker.weapon) {
        damageRollResult = rollDice(attacker.weapon.damage);
      } else {
        damageRollResult = rollDice('1d6');
      }
      damage = damageRollResult.total + Math.floor((attacker.stats.strength - 10) / 2);
      defender.health = Math.max(0, defender.health - damage);
    }
    return {
      attackRoll,
      attackTotal,
      hit,
      damage,
      damageRollResult,
    };
  };

  const updateTributesDisplay = () => {
    const tributesContainer = document.getElementById('tributes-container');
    tributesContainer.innerHTML = tributes.map(tribute => `
      <div class="tribute ${tribute.isAlive ? '' : 'dead'} ${tribute.isAlive && tribute.placement === 1 ? 'winner' : ''}" id="tribute-${tribute.id}" data-id="${tribute.id}">
        ${!tribute.isAlive ? `<div class="placement">${tribute.placement}${getOrdinalSuffix(tribute.placement)} Place</div>` : ''}
        <div>${tribute.emoji} ${tribute.name}</div>
        <div>District ${tribute.district}</div>
        <div>HP: ${tribute.health}</div>
        <div class="health-bar">
          <div class="health-bar-fill" style="width: ${(tribute.health / 20) * 100}%"></div>
        </div>
        <div>Hunger: ${tribute.hunger}%</div>
        <div class="hunger-bar">
          <div class="hunger-bar-fill" style="width: ${tribute.hunger}%"></div>
        </div>
        <div>Weapon: ${tribute.weapon ? tribute.weapon.emoji + ' ' + tribute.weapon.name : 'None'}</div>
      </div>
    `).join('');

    // Add event listeners to tribute cards
    const tributeElements = document.querySelectorAll('.tribute');
    tributeElements.forEach(el => {
      el.addEventListener('click', () => {
        const tributeId = parseInt(el.getAttribute('data-id'));
        const tribute = tributes.find(t => t.id === tributeId);
        openTributeModal(tribute);
      });
    });
  };

  const getOrdinalSuffix = (i) => {
    const j = i % 10,
          k = i % 100;
    if (j == 1 && k != 11) {
      return "st";
    }
    if (j == 2 && k != 12) {
      return "nd";
    }
    if (j == 3 && k != 13) {
      return "rd";
    }
    return "th";
  };

  const addEvent = (message, type) => {
    const logContainer = document.getElementById('log-container');
    events.unshift({ message, type });

    // Keep only the latest 25 events
    if (events.length > 25) {
      events = events.slice(0, 25);
    }

    logContainer.innerHTML = events.map(event => `
      <div class="log-entry ${event.type}">${event.message}</div>
    `).join('');
  };

  const updateScoreboard = () => {
    const aliveTributes = tributes.filter(t => t.isAlive);
    document.getElementById('tributes-left').textContent = aliveTributes.length;

    const mostKills = Math.max(...tributes.map(t => t.kills));
    const tributeWithMostKills = tributes.find(t => t.kills === mostKills && mostKills > 0);
    document.getElementById('most-kills').textContent = mostKills > 0 ? mostKills : '0';
    document.getElementById('most-kills-name').textContent = tributeWithMostKills ? tributeWithMostKills.name : 'N/A';

    const mostActions = Math.max(...tributes.map(t => t.actions));
    const tributeWithMostActions = tributes.find(t => t.actions === mostActions);
    document.getElementById('fan-favorite').textContent = tributeWithMostActions ? tributeWithMostActions.name : 'N/A';
  };

  const getVictorsFromStorage = () => {
    return JSON.parse(localStorage.getItem('victors')) || [];
  };

  const saveVictorToStorage = (victor) => {
    const victors = getVictorsFromStorage();
    victors.push(victor);
    localStorage.setItem('victors', JSON.stringify(victors));
  };

  const clearVictorsFromStorage = () => {
    localStorage.removeItem('victors');
    updateVictorsList();
  };

  const updateVictorsList = () => {
    const victorsList = getVictorsFromStorage();
    const victorsListElement = document.getElementById('victors-list');
    victorsListElement.innerHTML = victorsList.map((victor, index) => `
      <div class="victor-item">${index + 1} - ${victor}</div>
    `).join('');
  };

  const gameLoop = () => {
    tributes.forEach(tribute => {
      if (tribute.isAlive) {
        tribute.hunger = Math.max(0, tribute.hunger - 1);
        if (tribute.hunger === 0) {
          tribute.health = Math.max(0, tribute.health - 2);
        }
        if (tribute.health <= 0) {
          tribute.isAlive = false;
          tribute.placement = placementCounter--;
        }
      }
    });
    updateTributesDisplay();
    updateScoreboard();
  };

  const generateEvent = () => {
    const aliveTributes = tributes.filter(t => t.isAlive);
    if (aliveTributes.length <= 1) return;
    const eventTypes = ['fight', 'resource', 'alliance', 'break_alliance', 'heal', 'natural', 'hunt', 'forage'];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

    switch (eventType) {
      case 'fight':
        const attacker = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        let potentialDefenders = aliveTributes.filter(t => t.id !== attacker.id && !attacker.alliances.includes(t.id));
        if (potentialDefenders.length === 0) {
          // No valid defenders, break alliance if possible
          if (attacker.alliances.length > 0) {
            const allyId = attacker.alliances[Math.floor(Math.random() * attacker.alliances.length)];
            const ally = tributes.find(t => t.id === allyId);
            // Break alliance
            attacker.alliances = attacker.alliances.filter(id => id !== allyId);
            ally.alliances = ally.alliances.filter(id => id !== attacker.id);
            addEvent(`${attacker.emoji} ${attacker.name} breaks the alliance with ${ally.emoji} ${ally.name}.`, 'break_alliance');
            potentialDefenders = [ally];
          } else {
            // Only one tribute left, nothing to do
            return;
          }
        }
        const defender = potentialDefenders[Math.floor(Math.random() * potentialDefenders.length)];
        const attackResult = attack(attacker, defender);
        attacker.actions++;
        if (attackResult.hit) {
          if (defender.health === 0) {
            defender.isAlive = false;
            defender.placement = placementCounter--;
            attacker.kills++;
            addEvent(`${attacker.emoji} ${attacker.name} attacks ${defender.emoji} ${defender.name} and hits! (${attackResult.attackRoll} vs AC ${defender.AC}). Damage: ${attackResult.damageRollResult.rolls.join('+')} = ${attackResult.damage}. ${defender.name} has died.`, 'death');
          } else {
            addEvent(`${attacker.emoji} ${attacker.name} attacks ${defender.emoji} ${defender.name} and hits! (${attackResult.attackRoll} vs AC ${defender.AC}). Damage: ${attackResult.damageRollResult.rolls.join('+')} = ${attackResult.damage}. ${defender.name} has ${defender.health} HP left.`, 'fight');
          }
        } else {
          addEvent(`${attacker.emoji} ${attacker.name} attacks ${defender.emoji} ${defender.name} and misses. (${attackResult.attackRoll} vs AC ${defender.AC})`, 'fight');
        }
        break;
      case 'resource':
        const tribute = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        if (!tribute.weapon) {
          tribute.weapon = weapons[Math.floor(Math.random() * weapons.length)];
          tribute.inventory.push(tribute.weapon);
          addEvent(`${tribute.emoji} ${tribute.name} finds a ${tribute.weapon.legendary ? 'legendary ' : ''}${tribute.weapon.name}!`, 'resource');
        } else {
          const itemFound = { name: 'Food Ration', effect: 'hunger', value: 20 };
          tribute.inventory.push(itemFound);
          addEvent(`${tribute.emoji} ${tribute.name} finds a ${itemFound.name}.`, 'resource');
        }
        break;
      case 'alliance':
        const tribute1 = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        let tribute2;
        do {
          tribute2 = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        } while (tribute2.id === tribute1.id || tribute1.alliances.includes(tribute2.id));
        tribute1.alliances.push(tribute2.id);
        tribute2.alliances.push(tribute1.id);
        tribute1.actions++;
        tribute2.actions++;
        addEvent(`${tribute1.emoji} ${tribute1.name} forms an alliance with ${tribute2.emoji} ${tribute2.name}.`, 'alliance');
        break;
      case 'break_alliance':
        const breaker = aliveTributes.find(t => t.alliances.length > 0);
        if (breaker) {
          const allyId = breaker.alliances[Math.floor(Math.random() * breaker.alliances.length)];
          const ally = tributes.find(t => t.id === allyId);
          breaker.alliances = breaker.alliances.filter(id => id !== allyId);
          ally.alliances = ally.alliances.filter(id => id !== breaker.id);
          addEvent(`${breaker.emoji} ${breaker.name} breaks the alliance with ${ally.emoji} ${ally.name}.`, 'break_alliance');
        }
        break;
      case 'heal':
        const healer = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        const healAmount = Math.floor(Math.random() * 5) + 5;
        healer.health = Math.min(20, healer.health + healAmount);
        healer.actions++;
        addEvent(`${healer.emoji} ${healer.name} finds a healing herb and restores ${healAmount} HP.`, 'heal');
        break;
      case 'natural':
        const event = naturalEvents[Math.floor(Math.random() * naturalEvents.length)];
        currentWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        document.getElementById('weather').textContent = currentWeather;
        aliveTributes.forEach(t => {
          const damage = Math.floor(Math.random() * 3) + 1;
          t.health = Math.max(0, t.health - damage);
          if (t.health === 0) {
            t.isAlive = false;
            t.placement = placementCounter--;
          }
        });
        addEvent(`${event}, causing damage to all tributes!`, 'natural');
        break;
      case 'hunt':
        const hunter = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        const success = Math.random() < hunter.stats.agility / 20;
        hunter.actions++;
        if (success) {
          const foodFound = Math.floor(Math.random() * 20) + 10;
          hunter.hunger = Math.min(100, hunter.hunger + foodFound);
          addEvent(`${hunter.emoji} ${hunter.name} successfully hunts and gains ${foodFound}% hunger.`, 'resource');
        } else {
          addEvent(`${hunter.emoji} ${hunter.name} fails to hunt anything.`, 'resource');
        }
        break;
      case 'forage':
        const forager = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        const forageSuccess = Math.random() < forager.stats.intelligence / 20;
        forager.actions++;
        if (forageSuccess) {
          const foodFound = Math.floor(Math.random() * 15) + 5;
          forager.hunger = Math.min(100, forager.hunger + foodFound);
          addEvent(`${forager.emoji} ${forager.name} forages and finds edible plants, gaining ${foodFound}% hunger.`, 'resource');
        } else {
          addEvent(`${forager.emoji} ${forager.name} fails to find anything edible.`, 'resource');
        }
        break;
    }
  };

  const startInterval = () => {
    const intervalValue = eventIntervals[parseInt(document.getElementById('event-frequency').value)];
    interval = setInterval(() => {
      if (!gameOver) {
        generateEvent();
        gameLoop();
        const aliveTributes = tributes.filter(t => t.isAlive);
        if (aliveTributes.length <= 1) {
          gameOver = true;
          clearInterval(interval);
          interval = null;
          if (aliveTributes.length === 1) {
            aliveTributes[0].placement = 1;
            addEvent(`${aliveTributes[0].emoji} ${aliveTributes[0].name} is the victor of The Hunger Games!`, 'victory');
            saveVictorToStorage(`${aliveTributes[0].emoji} ${aliveTributes[0].name}`);
            updateVictorsList();
          } else {
            addEvent('No survivors. The arena is silent.', 'gameOver');
          }
          updateTributesDisplay();
        }
        hour += 1;
        if (hour >= 24) {
          hour = 0;
          day += 1;
        }
        document.getElementById('day').textContent = day;
        document.getElementById('time').textContent = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      }
    }, intervalValue);
  };

  const startSimulation = () => {
    if (!interval) {
      startInterval();
    }
  };

  const pauseSimulation = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  const resumeSimulation = () => {
    if (!interval && !gameOver) {
      startInterval();
    }
  };

  const restartSimulation = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    tributes = generateTributes();
    events = [];
    day = 1;
    hour = 6;
    currentWeather = 'Clear';
    document.getElementById('weather').textContent = currentWeather;
    gameOver = false;
    placementCounter = 24;
    updateTributesDisplay();
    updateScoreboard();
    document.getElementById('log-container').innerHTML = '';
  };

  document.getElementById('start-button').addEventListener('click', startSimulation);
  document.getElementById('pause-button').addEventListener('click', pauseSimulation);
  document.getElementById('resume-button').addEventListener('click', resumeSimulation);
  document.getElementById('restart-button').addEventListener('click', restartSimulation);
  document.getElementById('clear-victors-button').addEventListener('click', clearVictorsFromStorage);

  // Victors' Village Modal
  const victorsModal = document.getElementById('victors-modal');
  const victorsButton = document.getElementById('victors-button');
  const victorsClose = document.getElementById('victors-close');

  victorsButton.onclick = function() {
    victorsModal.style.display = "block";
    updateVictorsList();
  }

  victorsClose.onclick = function() {
    victorsModal.style.display = "none";
  }

  // Tribute Modal
  const tributeModal = document.getElementById('tribute-modal');
  const tributeModalClose = document.getElementById('tribute-modal-close');

  tributeModalClose.onclick = function() {
    tributeModal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == victorsModal) {
      victorsModal.style.display = "none";
    }
    if (event.target == tributeModal) {
      tributeModal.style.display = "none";
    }
  }

  const openTributeModal = (tribute) => {
    const tributeModalName = document.getElementById('tribute-modal-name');
    const tributeModalStats = document.getElementById('tribute-modal-stats');
    tributeModalName.textContent = `${tribute.emoji} ${tribute.name}`;
    tributeModalStats.innerHTML = `
      <div><strong>District:</strong> ${tribute.district}</div>
      <div><strong>Health:</strong> ${tribute.health}</div>
      <div><strong>Hunger:</strong> ${tribute.hunger}%</div>
      <div><strong>Weapon:</strong> ${tribute.weapon ? tribute.weapon.emoji + ' ' + tribute.weapon.name : 'None'}</div>
      <div><strong>Kills:</strong> ${tribute.kills}</div>
      <div><strong>Alliances:</strong> ${tribute.alliances.length > 0 ? tribute.alliances.map(id => tributes.find(t => t.id === id).name).join(', ') : 'None'}</div>
      <div><strong>Stats:</strong></div>
      <div>Strength: ${tribute.stats.strength}</div>
      <div>Agility: ${tribute.stats.agility}</div>
      <div>Intelligence: ${tribute.stats.intelligence}</div>
      <div>Stealth: ${tribute.stats.stealth}</div>
      <div><strong>Inventory:</strong> ${tribute.inventory.length > 0 ? tribute.inventory.map(item => item.name).join(', ') : 'Empty'}</div>
    `;
    tributeModal.style.display = 'block';
  };

  // Event Frequency Slider
  document.getElementById('event-frequency').addEventListener('input', function() {
    const index = parseInt(this.value);
    document.getElementById('event-frequency-label').textContent = eventIntervalLabels[index];
    if (interval) {
      clearInterval(interval);
      startInterval();
    }
  });

  // Initialize the simulation
  tributes = generateTributes();
  updateTributesDisplay();
  updateScoreboard();
});
