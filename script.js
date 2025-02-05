document.addEventListener('DOMContentLoaded', () => {
  const weapons = [
    { name: 'Short Sword', emoji: '🗡️', damage: '1d6', type: 'sword' },
    { name: 'Longbow', emoji: '🏹', damage: '1d8', type: 'ranged' },
    { name: 'Battle Axe', emoji: '🪓', damage: '1d8', type: 'axe' },
    { name: 'Dagger', emoji: '🔪', damage: '1d4', type: 'dagger' },
    { name: 'Warhammer', emoji: '🔨', damage: '1d8', type: 'hammer' },
    { name: 'Greatsword', emoji: '⚔️', damage: '2d6', type: 'sword' },
    // More Sword Types
    { name: 'Longsword', emoji: '🗡️', damage: '1d8', type: 'sword' },
    { name: 'Scimitar', emoji: ' curved sword ️', damage: '1d6', type: 'sword' },
    { name: 'Broadsword', emoji: '⚔️', damage: '1d8', type: 'sword' },
    { name: 'Rapier', emoji: ' thin sword ️', damage: '1d6', type: 'sword', finesse: true },
    // Polearms and Spears
    { name: 'Spear', emoji: ' ️', damage: '1d6', type: 'polearm' },
    { name: 'Pike', emoji: ' polearm ️', damage: '1d10', type: 'polearm', reach: true },
    { name: 'Halberd', emoji: ' poleaxe ️', damage: '1d10', type: 'polearm', heavy: true },
    { name: 'Quarterstaff', emoji: ' staff ️', damage: '1d6', type: 'staff', versatile: '1d8' },
    // Blunt Weapons
    { name: 'Mace', emoji: ' mace ️', damage: '1d6', type: 'mace' },
    { name: 'Morningstar', emoji: ' morningstar ️', damage: '1d8', type: 'mace' },
    { name: 'Club', emoji: ' club ️', damage: '1d4', type: 'club' },
    { name: 'Flail', emoji: ' flail ️', damage: '1d8', type: 'flail' },
    // Ranged Weapons - More Bows and Arrows
    { name: 'Shortbow', emoji: '🏹', damage: '1d6', type: 'ranged' },
    { name: 'Heavy Crossbow', emoji: ' crossbow ️', damage: '1d10', type: 'ranged', heavy: true, loading: true },
    { name: 'Light Crossbow', emoji: ' crossbow ️', damage: '1d8', type: 'ranged', loading: true },
    { name: 'Sling', emoji: ' sling ️', damage: '1d4', type: 'ranged' },

    // Legendary weapons
    { name: 'Excalibur', emoji: '🗡️', damage: '3d8', legendary: true, type: 'sword' },
    { name: 'Mjolnir', emoji: '🔨', damage: '4d6', legendary: true, type: 'hammer' },
    { name: 'Gungnir', emoji: ' spear ️', damage: '3d10', legendary: true, type: 'polearm' },
    { name: ' composite bow ️', emoji: '🏹', damage: '2d8', legendary: true, type: 'ranged' },
  ];

  const skinTones = ['🏻', '🏼', '🏽', '🏾', '🏿'];
  const genders = ['Male', 'Female'];
  const genderEmojis = {
    'Male': '👨',
    'Female': '👩‍🦰'
  };
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
    'Niamh', 'Corwin', 'Xanthe', 'Liora', 'Selene',
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Charles', 'Karen',
    'José', 'María', 'Luis', 'Carmen', 'Carlos', 'Ana', 'Juan', 'Lucía',
    'Miguel', 'Sofía',
    'Wei', 'Jing', 'Li', 'Hao', 'Mei', 'Xiao', 'Jun', 'Fang',
    'Ying', 'Tian',
    'Amit', 'Priya', 'Ravi', 'Anjali', 'Vijay', 'Deepa', 'Rahul', 'Pooja',
    'Sanjay', 'Neha',
    'Ivan', 'Olga', 'Dmitry', 'Natalia', 'Sergey', 'Ekaterina', 'Alexei', 'Tatiana',
    'Mikhail', 'Anastasia',
    'Ahmed', 'Fatima', 'Mohamed', 'Aisha', 'Omar', 'Layla', 'Youssef', 'Huda',
    'Hassan', 'Mariam',
    'Jean', 'Marie', 'Pierre', 'Sophie', 'Michel', 'Isabelle', 'Alain', 'Claire',
    'Laurent', 'Céline',
    'Hans', 'Anna', 'Karl', 'Emma', 'Fritz', 'Lena', 'Heinz', 'Mia',
    'Günther', 'Lea',
    'Hiroshi', 'Yuki', 'Kenji', 'Aiko', 'Takashi', 'Miyu', 'Daiki', 'Sakura',
    'Yuto', 'Hana',
    'Liam', 'Noah', 'Oliver', 'Elijah', 'Benjamin', 'Lucas',
    'Henry', 'Alexander', 'Charlotte', 'Amelia', 'Olivia', 'Emma',
    'Ava', 'Sophia', 'Isabella', 'Mia', 'Evelyn', 'Harper',
    'Mateo', 'Santiago', 'Valentina', 'Leonardo', 'Gabriela', 'Sebastián', 'Camila',
    'Fernando', 'Catalina', 'Diego', 'Daniela', 'Emilio', 'Julieta', 'Ricardo', 'Luciana',
    'Pedro', 'Bianca', 'Francisco', 'Mariana'
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
    'Silverwind', 'Stormrider', 'Thistle', 'Wildflower', 'Windrider', 'Winterfell', 'Whitestone', 'Wolfstone', 'Duskwalker', 'Ironheart',
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin',
    'García', 'Martínez', 'Rodríguez', 'López', 'Hernández', 'Sánchez', 'Pérez', 'Gómez',
    'Martín', 'Jiménez',
    'Wang', 'Li', 'Zhang', 'Liu', 'Chen', 'Yang', 'Huang', 'Zhao',
    'Wu', 'Zhou',
    'Patel', 'Singh', 'Sharma', 'Kumar', 'Gupta', 'Verma', 'Reddy', 'Mehta',
    'Jain', 'Shah',
    'Ivanov', 'Petrov', 'Sidorov', 'Smirnov', 'Kuznetsov', 'Popov', 'Vasiliev', 'Sokolov',
    'Mikhailov', 'Fedorov',
    'Mohamed', 'Ali', 'Hassan', 'Hussein', 'Ahmed', 'Abdullah', 'Khan', 'Rahman',
    'Saleh', 'Amin',
    'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand',
    'Leroy', 'Moreau',
    'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker',
    'Hoffmann', 'Schulz',
    'Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura',
    'Kobayashi', 'Kato',
    'Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Dang', 'Bui', 'Do',
    'Vo', 'Dinh', 'Pham', 'Mai', 'Lai', 'Ngo', 'Lam', 'Ho',
    'Chan', 'Lee', 'Kim', 'Park',
    'Singh', 'Khan', 'Chowdhury', 'Rana', 'Das', 'Gupta', 'Joshi', 'Nair',
    'Bhattacharya', 'Mitra'
  ];

  const naturalEvents = [
    'A sudden storm hits the arena',
    'An earthquake shakes the ground',
    'A wildfire spreads rapidly',
    'A dense fog covers the arena',
    'A torrential rain begins',
    'A blistering heatwave strikes',
    'Snow starts falling heavily',
    'A volcanic eruption occurs nearby',
    'Lightning strikes the arena',
    'A landslide blocks a major area',
  ];

  const weatherTypes = ['Clear', 'Rain', 'Storm', 'Fog', 'Heatwave', 'Snow', 'Volcano', 'Lightning', 'Landslide'];
  const eventIntervals = [1000, 5000, 15000, 30000, 60000];
  const eventIntervalLabels = ['1 Second', '5 Seconds', '15 Seconds', '30 Seconds', '1 Minute'];

  const resources = [
    { name: 'Food Ration', emoji: '🍎', effect: 'hunger', value: 20, type: 'food' },
    { name: 'Medkit', emoji: '🩹', effect: 'heal', value: 10, type: 'medicine' },
    { name: 'Water Bottle', emoji: '💧', effect: 'hunger', value: 15, type: 'food' },
    { name: 'Energy Drink', emoji: '⚡', effect: 'hunger', value: 25, type: 'food' },
    { name: 'Healing Herbs', emoji: '🌿', effect: 'heal', value: 7, type: 'medicine' },
    { name: 'Sturdy Armor', emoji: '🛡️', effect: 'armor', value: 1, duration: 5, type: 'buff' },
    { name: 'Agility Boots', emoji: '🥾', effect: 'agility', value: 1, duration: 5, type: 'buff' }
  ];

  const resourceItemsForConsumption = ['Food Ration', 'Medkit', 'Water Bottle', 'Energy Drink', 'Healing Herbs'];

  const additionalEvents = [
    'trap',
    'treasure',
    'stealth_mission',
    'environmental_hazard',
    'secret_alliance',
    'resource_cache',
    'wildlife_attack'
  ];

  let tributes = [];
  let events = [];
  let day = 1;
  let hour = 6;
  let interval;
  let placementCounter = 24;
  let gameOver = false;
  let currentWeather = 'Clear';
  let environment = { weather: 'Clear', terrain: 'Open Field', effects: [] };

  let simulationSettings = {
    baseHealth: 20,
    baseHunger: 100,
    eventFrequencyIndex: 0
  };

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('simulationSettings');
    if (savedSettings) {
      simulationSettings = JSON.parse(savedSettings);
      document.getElementById('base-health').value = simulationSettings.baseHealth;
      document.getElementById('base-hunger').value = simulationSettings.baseHunger;
      document.getElementById('event-frequency-setting').value = simulationSettings.eventFrequencyIndex;
      document.getElementById('event-frequency').value = simulationSettings.eventFrequencyIndex;
      document.getElementById('event-frequency-label').textContent = eventIntervalLabels[simulationSettings.eventFrequencyIndex];
    }
  };

  const saveSettingsToLocalStorage = () => {
    localStorage.setItem('simulationSettings', JSON.stringify(simulationSettings));
  };

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

  const generateGender = () => {
    return genders[Math.floor(Math.random() * genders.length)];
  };

  const generateAge = () => {
    return Math.floor(Math.random() * 6) + 13;

  };

  const generateEmoji = (gender) => {
    const baseEmoji = genderEmojis[gender];
    const skinTone = skinTones[Math.floor(Math.random() * skinTones.length)];
    return baseEmoji + skinTone;
  };

  const generateStats = () => {
    return {
      strength: Math.floor(Math.random() * 6) + 8,
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
      genders.forEach(gender => {
        const name = generateUniqueName(usedNames, usedFirstNames);
        const age = generateAge();
        tributes.push({
          id: tributes.length + 1,
          name: name,
          gender: gender,
          age: age,
          health: simulationSettings.baseHealth,
          hunger: simulationSettings.baseHunger,
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
          statusEffects: [],
        });
      });
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
    let attackRoll = Math.floor(Math.random() * 20) + 1 + Math.floor((attacker.stats.strength - 10) / 2);
    let defenderAC = defender.AC;

    if (environment.weather === 'Rain' || environment.weather === 'Storm') {
      attackRoll = Math.max(1, attackRoll - 2);
    }
    if (environment.terrain === 'Dense Fog' && Math.random() < 0.3) {
      attackRoll = Math.max(1, attackRoll - 3);
    }

    let agilityBuff = attacker.statusEffects.find(effect => effect.effect === 'agility');
    if (agilityBuff) {
      attackRoll += agilityBuff.value;
    }

    let attackTotal = attackRoll + attacker.attackBonus;

    let armorBuff = defender.statusEffects.find(effect => effect.effect === 'armor');
    if (armorBuff) {
      defenderAC += armorBuff.value;
    }

    const hit = attackTotal >= defenderAC;
    let damage = 0;
    let damageRollResult = null;

    if (attackRoll === 20) { // Natural 20: Instant Kill
      defender.health = 0;
      damage = simulationSettings.baseHealth; // For log message clarity, set damage to max health
      triggerAnimation(defender.id, 'damage');
      return {
        attackRoll,
        attackTotal,
        hit: true,
        criticalHit: true, // Indicate critical hit
        damage,
        damageRollResult: { total: damage, rolls: ['Instant Kill'] }, // Mock damage roll result
        defenderAC
      };
    } else if (hit) {
      if (attacker.weapon) {
        damageRollResult = rollDice(attacker.weapon.damage);
      } else {
        damageRollResult = rollDice('1d6');
      }
      damage = damageRollResult.total + Math.floor((attacker.stats.strength - 10) / 2);
      defender.health = Math.max(0, defender.health - damage);
      triggerAnimation(defender.id, 'damage');
      if (damage > 5 && defender.health > 0) {
        defender.statusEffects.push({ name: 'Injured', type: 'debuff', duration: 3, effect: 'health', value: -1 });
      }
    }
    return {
      attackRoll,
      attackTotal,
      hit,
      damage,
      damageRollResult,
      defenderAC
    };
  };

  const updateTributesDisplay = () => {
    const tributesContainer = document.getElementById('tributes-container');
    tributesContainer.innerHTML = tributes.map(tribute =>
      `<div class="tribute ${tribute.isAlive ? '' : 'dead'} ${tribute.isAlive && tribute.placement === 1 ? 'winner' : ''}" id="tribute-${tribute.id}" data-id="${tribute.id}">
        ${tribute.placement ? `<div class="placement">${tribute.placement}${getOrdinalSuffix(tribute.placement)}</div>` : ''}
        <div>${tribute.emoji} ${tribute.name}</div>
        <div>District ${tribute.district}</div>
        <div>Age: ${tribute.age}</div>
        <div>HP: ${tribute.health}</div>
        <div class="health-bar">
          <div class="health-bar-fill" style="width: ${(tribute.health / simulationSettings.baseHealth) * 100}%"></div>
        </div>
        <div>Hunger: ${tribute.hunger}%</div>
        <div class="hunger-bar">
          <div class="hunger-bar-fill" style="width: ${tribute.hunger}%"></div>
        </div>
        <div>Weapon: ${tribute.weapon ? tribute.weapon.emoji + ' ' + tribute.weapon.name : 'None'}</div>
        ${tribute.statusEffects.length > 0 ? `<div class="status-effects">Status: ${tribute.statusEffects.map(effect => effect.name).join(', ')}</div>` : ''}
      </div>`
    ).join('');

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
    if (j === 1 && k !== 11) {
      return "st";
    }
    if (j === 2 && k !== 12) {
      return "nd";
    }
    if (j === 3 && k !== 13) {
      return "rd";
    }
    return "th";
  };

  const addEvent = (message, type) => {
    const logContainer = document.getElementById('log-container');
    const logEntry = document.createElement('div');
    logEntry.classList.add('log-entry', type);
    logEntry.textContent = message;
    logContainer.insertBefore(logEntry, logContainer.firstChild);

    if (logContainer.children.length > 25) {
      logContainer.removeChild(logContainer.lastChild);
    }
    logContainer.scrollTop = 0;
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
    if (victorsList.length === 0) {
      victorsListElement.innerHTML = '<p>No victors yet.</p>';
    } else {
      victorsListElement.innerHTML = victorsList.map((victor, index) =>
        `<div class="victor-item">${index + 1} - ${victor}</div>`
      ).join('');
    }
  };

  const applyStatusEffects = (tribute) => {
    for (let i = tribute.statusEffects.length - 1; i >= 0; i--) {
      const effect = tribute.statusEffects[i];
      if (effect.effect === 'health') {
        tribute.health = Math.max(0, tribute.health + effect.value);
        if (effect.value < 0 && tribute.health > 0) {
          triggerAnimation(tribute.id, 'damage');
        }
      } else if (effect.effect === 'hunger') {
        tribute.hunger = Math.min(100, tribute.hunger + effect.value);
      } else if (effect.effect === 'armor') {

      } else if (effect.effect === 'agility') {

      }
      effect.duration--;
      if (effect.duration <= 0) {
        tribute.statusEffects.splice(i, 1);
        addEvent(`${tribute.emoji} ${tribute.name}'s status effect '${effect.name}' has worn off.`, 'status_end');
      }
    }
  };

  const useResource = (tribute, resourceName) => {
    const resourceIndex = tribute.inventory.findIndex(item => item.name === resourceName);
    if (resourceIndex > -1) {
      const resource = tribute.inventory.splice(resourceIndex, 1)[0];
      if (resource.effect === 'hunger') {
        const hungerBefore = tribute.hunger;
        tribute.hunger = Math.min(100, tribute.hunger + resource.value);
        addEvent(`${tribute.emoji} ${tribute.name} consumes a ${resource.emoji} ${resource.name} to restore ${tribute.hunger - hungerBefore} hunger.`, 'resource');
      } else if (resource.effect === 'heal') {
        const healthBefore = tribute.health;
        tribute.health = Math.min(simulationSettings.baseHealth, tribute.health + resource.value);
        addEvent(`${tribute.emoji} ${tribute.name} uses a ${resource.emoji} ${resource.name} to heal for ${tribute.health - healthBefore} HP.`, 'heal');
        triggerAnimation(tribute.id, 'heal');
      }
    }
  };


  const gameLoop = () => {
    tributes.forEach(tribute => {
      if (tribute.isAlive) {
        applyStatusEffects(tribute);

        // Resource Consumption Logic
        const healthThreshold = simulationSettings.baseHealth * 0.5;
        const hungerThreshold = 50;

        if (tribute.health < healthThreshold) {
          const medicineItem = tribute.inventory.find(item => item.type === 'medicine');
          if (medicineItem) {
            useResource(tribute, medicineItem.name);
          }
        }

        if (tribute.hunger < hungerThreshold) {
          const foodItem = tribute.inventory.find(item => item.type === 'food');
          if (foodItem) {
            useResource(tribute, foodItem.name);
          }
        }


        tribute.hunger = Math.max(0, tribute.hunger - 1);
        if (tribute.hunger === 0) {
          tribute.health = Math.max(0, tribute.health - 2);
          if (tribute.health > 0) {
            triggerAnimation(tribute.id, 'damage');
          }
          if (tribute.health <= 0) {
            tribute.isAlive = false;
            tribute.placement = placementCounter--;
            addEvent(`${tribute.emoji} ${tribute.name} has died of starvation.`, 'death');
          }
        } else if (tribute.health <= 0 && tribute.isAlive) {
          tribute.isAlive = false;
          tribute.placement = placementCounter--;
          addEvent(`${tribute.emoji} ${tribute.name} has fallen.`, 'death');
        }
      }
    });

    const aliveTributes = tributes.filter(t => t.isAlive);
    if (aliveTributes.length <= 5 && aliveTributes.length > 1) {
      breakAllAlliances();
    }

    updateTributesDisplay();
    updateScoreboard();

    if (aliveTributes.length <= 1 && !gameOver) {
      gameOver = true;
      clearInterval(interval);
      interval = null;
      if (aliveTributes.length === 1) {
        aliveTributes[0].placement = 1;
        addEvent(`${aliveTributes[0].emoji} ${aliveTributes[0].name} is the victor of The Hunger Games!`, 'victory');
        saveVictorToStorage(aliveTributes[0].name);
      } else {
        addEvent('The games are over, with no victor.', 'gameOver');
      }
    }
  };

  const getEventWeights = () => {
    const aliveCount = tributes.filter(t => t.isAlive).length;
    let weights = {
      fight: 3,
      resource: 2,
      alliance: aliveCount > 5 ? 2 : 1,
      break_alliance: aliveCount < 10 ? 3 : 1,
      heal: 2,
      natural: 1,
      trap: 2,
      treasure: 1,
      stealth_mission: 2,
      environmental_hazard: 1,
      secret_alliance: aliveCount > 5 ? 1 : 0,
      resource_cache: 1,
      wildlife_attack: 2,
    };

    if (aliveCount <= 5) {
      weights.fight += 3;
      weights.heal = Math.max(weights.heal - 1, 1);
    }
    return weights;
  };

  const chooseDynamicEvent = () => {
    const weights = getEventWeights();
    const events = Object.keys(weights);
    const weightedArray = events.reduce((acc, event) => {
      const weight = weights[event];
      for (let i = 0; i < weight; i++) {
        acc.push(event);
      }
      return acc;
    }, []);
    return weightedArray[Math.floor(Math.random() * weightedArray.length)];
  };

  const generateEvent = () => {
    const aliveTributes = tributes.filter(t => t.isAlive);
    if (aliveTributes.length <= 1) return;

    const eventType = chooseDynamicEvent();

    switch (eventType) {
      case 'fight':
        const attacker = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        let potentialDefenders = aliveTributes.filter(t => t.id !== attacker.id && !attacker.alliances.includes(t.id));
        if (potentialDefenders.length === 0) {
          if (attacker.alliances.length > 0) {
            const allyId = attacker.alliances[Math.floor(Math.random() * attacker.alliances.length)];
            const ally = tributes.find(t => t.id === allyId);
            attacker.alliances = attacker.alliances.filter(id => id !== allyId);
            ally.alliances = ally.alliances.filter(id => id !== attacker.id);
            addEvent(`${attacker.emoji} ${attacker.name} breaks the alliance with ${ally.emoji} ${ally.name}.`, 'break_alliance');
            potentialDefenders = [ally];
          } else {
            return;
          }
        }
        const defender = potentialDefenders[Math.floor(Math.random() * potentialDefenders.length)];
        const attackResult = attack(attacker, defender);
        attacker.actions++;
        if (attackResult.hit) {
          if (attackResult.criticalHit) { // Check for critical hit
            defender.isAlive = false;
            defender.placement = placementCounter--;
            attacker.kills++;
            addEvent(`${attacker.emoji} ${attacker.name} scores a CRITICAL HIT on ${defender.emoji} ${defender.name} with a natural 20! It's an instant kill!`, 'death');
          } else if (defender.health <= 0) {
            defender.isAlive = false;
            defender.placement = placementCounter--;
            attacker.kills++;
            addEvent(`${attacker.emoji} ${attacker.name} attacks ${defender.emoji} ${defender.name} and hits! (${attackResult.attackRoll} vs AC ${attackResult.defenderAC}). Damage: ${attackResult.damageRollResult.rolls.join('+')} = ${attackResult.damage}. ${defender.name} has died.`, 'death');
          } else {
            addEvent(`${attacker.emoji} ${attacker.name} attacks ${defender.emoji} ${defender.name} and hits! (${attackResult.attackRoll} vs AC ${attackResult.defenderAC}). Damage: ${attackResult.damageRollResult.rolls.join('+')} = ${attackResult.damage}. ${defender.name} has ${defender.health} HP left.`, 'fight');
          }
        } else {
          addEvent(`${attacker.emoji} ${attacker.name} attacks ${defender.emoji} ${defender.name} and misses. (${attackResult.attackRoll} vs AC ${attackResult.defenderAC})`, 'fight');
        }
        break;
      case 'resource':
        const resourceTribute = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        const weaponResourceChance = 0.3;
        if (Math.random() < weaponResourceChance && !resourceTribute.weapon) {
          const weapon = weapons[Math.floor(Math.random() * weapons.length)];
          resourceTribute.weapon = weapon;
          resourceTribute.inventory.push(weapon);
          addEvent(`${resourceTribute.emoji} ${resourceTribute.name} finds a ${weapon.emoji} ${weapon.name}.`, 'resource');
        } else {
          const foodOrMedResource = resources.filter(r => r.type === 'food' || r.type === 'medicine');
          const resourceItem = foodOrMedResource[Math.floor(Math.random() * foodOrMedResource.length)];
          resourceTribute.inventory.push(resourceItem);
          addEvent(`${resourceTribute.emoji} ${resourceTribute.name} finds a ${resourceItem.emoji} ${resourceItem.name}.`, 'resource');
        }
        break;
      case 'alliance':
        if (aliveTributes.length > 5) {
          const allianceTribute1 = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
          let allianceTribute2;
          do {
            allianceTribute2 = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
          } while (allianceTribute2.id === allianceTribute1.id || allianceTribute1.alliances.includes(allianceTribute2.id));
          allianceTribute1.alliances.push(allianceTribute2.id);
          allianceTribute2.alliances.push(allianceTribute1.id);
          allianceTribute1.actions++;
          allianceTribute2.actions++;
          addEvent(`${allianceTribute1.emoji} ${allianceTribute1.name} forms an alliance with ${allianceTribute2.emoji} ${allianceTribute2.name}.`, 'alliance');
        }
        break;
      case 'break_alliance':
        const breaker = tributes.find(t => t.isAlive && t.alliances.length > 0);
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
        healer.health = Math.min(simulationSettings.baseHealth, healer.health + healAmount);
        healer.actions++;
        addEvent(`${healer.emoji} ${healer.name} finds healing herbs and restores ${healAmount} HP.`, 'heal');
        triggerAnimation(healer.id, 'heal');
        break;
      case 'natural':
        const naturalEvent = naturalEvents[Math.floor(Math.random() * naturalEvents.length)];
        currentWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        environment.weather = currentWeather;
        environment.terrain = 'Open Field';
        document.getElementById('weather').textContent = currentWeather;

        if (currentWeather === 'Fog') {
          environment.terrain = 'Dense Fog';
        } else {
          environment.terrain = 'Open Field';
        }

        aliveTributes.forEach(t => {
          let damage = Math.floor(Math.random() * 2) + 1;
          if (currentWeather === 'Storm') {
            damage += Math.floor(Math.random() * 2);
          }
          t.health = Math.max(0, t.health - damage);
          if (t.health > 0 && damage > 0) {
            triggerAnimation(t.id, 'damage');
          }
          if (t.health <= 0) {
            t.isAlive = false;
            t.placement = placementCounter--;
            addEvent(`${t.emoji} ${t.name} has fallen due to ${naturalEvent}.`, 'death');
          }
        });
        addEvent(`${naturalEvent}, causing minor damage to tributes!`, 'natural');
        break;
      case 'trap':
        const trapTribute = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        const trapDamage = Math.floor(Math.random() * 5) + 1;
        trapTribute.health = Math.max(0, trapTribute.health - trapDamage);
        trapTribute.actions++;
        if (trapTribute.health <= 0) {
          trapTribute.isAlive = false;
          tribute.placement = placementCounter--;
          addEvent(`${trapTribute.emoji} ${trapTribute.name} triggered a trap and took ${trapDamage} damage, resulting in death.`, 'trap');
        } else {
          addEvent(`${trapTribute.emoji} ${trapTribute.name} triggered a trap and took ${trapDamage} damage.`, 'trap');
          triggerAnimation(trapTribute.id, 'damage');
        }
        break;
      case 'treasure':
        const treasureTribute = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        const treasureType = Math.random() < 0.3 ? 'legendary_weapon' : 'rare_item';
        if (treasureType === 'legendary_weapon') {
          const legendaryWeapons = weapons.filter(w => w.legendary);
          if (legendaryWeapons.length > 0) {
            const weapon = legendaryWeapons[Math.floor(Math.random() * legendaryWeapons.length)];
            treasureTribute.weapon = weapon;
            treasureTribute.inventory.push(weapon);
            addEvent(`${treasureTribute.emoji} ${treasureTribute.name} discovers a legendary ${weapon.name}!`, 'treasure');
          }
        } else {
          const rareItem = resources.filter(r => r.effect === 'armor' || r.effect === 'agility')[Math.floor(Math.random() * resources.filter(r => r.effect === 'armor' || r.effect === 'agility').length)];
          if (rareItem) {
            treasureTribute.inventory.push(rareItem);
            rareItem.duration = rareItem.duration || 5;
            treasureTribute.statusEffects.push({ ...rareItem, duration: rareItem.duration, value: rareItem.value, name: rareItem.name });
            addEvent(`${treasureTribute.emoji} ${treasureTribute.name} finds a ${rareItem.emoji} ${rareItem.name}, granting ${rareItem.effect} buff for ${rareItem.duration} turns.`, 'treasure');
          } else {
            const foodItem = resources.filter(r => r.type === 'food')[Math.floor(Math.random() * resources.filter(r => r.type === 'food').length)];
            treasureTribute.inventory.push(foodItem);
            addEvent(`${treasureTribute.emoji} ${treasureTribute.name} finds a ${foodItem.emoji} ${foodItem.name}.`, 'treasure');
          }
        }
        break;
      case 'stealth_mission':
        const stealthTribute = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        const stealthSuccess = Math.random() < stealthTribute.stats.stealth / 20;
        stealthTribute.actions++;
        if (stealthSuccess) {
          const stealFrom = tributes.filter(t => t.id !== stealthTribute.id && t.isAlive);
          if (stealFrom.length > 0) {
            const victim = stealFrom[Math.floor(Math.random() * stealFrom.length)];
            if (victim.inventory.length > 0) {
              const stolenItem = victim.inventory.pop();
              stealthTribute.inventory.push(stolenItem);
              addEvent(`${stealthTribute.emoji} ${stealthTribute.name} successfully steals a ${stolenItem.name} from ${victim.emoji} ${victim.name}.`, 'stealth_mission');
            } else {
              addEvent(`${stealthTribute.emoji} ${stealthTribute.name} attempted a stealth mission but found nothing to steal from ${victim.emoji} ${victim.name}.`, 'stealth_mission');
            }
          }
        } else {
          addEvent(`${stealthTribute.emoji} ${stealthTribute.name} failed the stealth mission and was spotted.`, 'stealth_mission');
        }
        break;
      case 'environmental_hazard':
        const hazardEvent = ['Toxic Gas Leak', 'Radioactive Spill', 'Sudden Avalanche'];
        const selectedHazard = hazardEvent[Math.floor(Math.random() * hazardEvent.length)];
        const hazardDamage = Math.floor(Math.random() * 4) + 2;
        aliveTributes.forEach(t => {
          t.health = Math.max(0, t.health - hazardDamage);
          if (t.health <= 0) {
            t.isAlive = false;
            tribute.placement = placementCounter--;
            addEvent(`${t.emoji} ${t.name} has fallen due to ${selectedHazard}.`, 'environmental_hazard');
          } else if (t.health > 0 && hazardDamage > 0) {
            triggerAnimation(t.id, 'damage');
          }
        });
        addEvent(`${selectedHazard} has occurred in the arena, dealing ${hazardDamage} damage to tributes!`, 'environmental_hazard');
        break;
      case 'secret_alliance':
        const secretTribute1 = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        let secretTribute2;
        do {
          secretTribute2 = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        } while (secretTribute2.id === secretTribute1.id || secretTribute1.alliances.includes(secretTribute2.id) || secretTribute2.alliances.includes(secretTribute1.id));
        secretTribute1.alliances.push(secretTribute2.id);
        secretTribute2.alliances.push(secretTribute1.id);
        secretTribute1.actions++;
        secretTribute2.actions++;
        addEvent(`${secretTribute1.emoji} ${secretTribute1.name} forms a secret alliance with ${secretTribute2.emoji} ${secretTribute2.name}.`, 'secret_alliance');
        break;
      case 'resource_cache':
        const cacheTribute = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        const cacheItem = resources.filter(r => r.type === 'food')[Math.floor(Math.random() * resources.filter(r => r.type === 'food').length)];
        cacheTribute.inventory.push(cacheItem);
        addEvent(`${cacheTribute.emoji} ${cacheTribute.name} discovers a hidden resource cache containing a ${cacheItem.emoji} ${cacheItem.name}.`, 'resource_cache');
        break;
      case 'wildlife_attack':
        const wildlifeTribute = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        const wildlifeDamage = Math.floor(Math.random() * 4) + 1;
        wildlifeTribute.health = Math.max(0, wildlifeTribute.health - wildlifeDamage);
        wildlifeTribute.actions++;
        if (wildlifeTribute.health <= 0) {
          wildlifeTribute.isAlive = false;
          tribute.placement = placementCounter--;
          addEvent(`${wildlifeTribute.emoji} ${wildlifeTribute.name} was attacked by wildlife and died from ${wildlifeDamage} damage.`, 'wildlife_attack');
        } else {
          addEvent(`${wildlifeTribute.emoji} ${wildlifeTribute.name} was attacked by wildlife and took ${wildlifeDamage} damage.`, 'wildlife_attack');
          triggerAnimation(wildlifeTribute.id, 'damage');
        }
        break;
    }
  };

  const breakAllAlliances = () => {
    tributes.forEach(tribute => {
      if (tribute.alliances.length > 0) {
        tribute.alliances.forEach(allyId => {
          const ally = tributes.find(t => t.id === allyId);
          if (ally) {
            ally.alliances = ally.alliances.filter(id => id !== tribute.id);
          }
        });
        tribute.alliances = [];
      }
    });
    addEvent('All alliances have been broken as the number of tributes dwindles.', 'break_alliance');
  };

  const startInterval = () => {
    const intervalValue = eventIntervals[parseInt(document.getElementById('event-frequency').value)];
    interval = setInterval(() => {
      if (!gameOver) {
        generateEvent();
        gameLoop();
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
    environment.weather = currentWeather;
    environment.terrain = 'Open Field';
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

  const settingsModal = document.getElementById('settings-modal');
  const settingsButton = document.getElementById('settings-button');
  const settingsClose = document.getElementById('settings-close');
  const saveSettingsButton = document.getElementById('save-settings');

  settingsButton.onclick = function() {
    settingsModal.style.display = "block";
  }
  settingsClose.onclick = function() {
    settingsModal.style.display = "none";
  }
  const closeSettingsModal = function() {
    settingsModal.style.display = "none";
  }

  saveSettingsButton.addEventListener('click', () => {
    simulationSettings.baseHealth = parseInt(document.getElementById('base-health').value);
    simulationSettings.baseHunger = parseInt(document.getElementById('base-hunger').value);
    simulationSettings.eventFrequencyIndex = parseInt(document.getElementById('event-frequency-setting').value);

    saveSettingsToLocalStorage();
    clearInterval(interval);
    startInterval();
    closeSettingsModal();
    restartSimulation();
    addEvent('Simulation settings updated and restarted.', 'settings_update');
  });


  const helpModal = document.getElementById('help-modal');
  const helpButton = document.getElementById('help-button');
  const helpClose = document.getElementById('help-close');

  helpButton.onclick = function() {
    helpModal.style.display = "block";
  }
  helpClose.onclick = function() {
    helpModal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == settingsModal) {
      settingsModal.style.display = "none";
    }
    if (event.target == helpModal) {
      helpModal.style.display = "none";
    }
    if (event.target == victorsModal) {
      victorsModal.style.display = "none";
    }
    if (event.target == tributeModal) {
      tributeModal.style.display = "none";
    }
  }


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

  const tributeModal = document.getElementById('tribute-modal');
  const tributeModalClose = document.getElementById('tribute-modal-close');

  tributeModalClose.onclick = function() {
    tributeModal.style.display = "none";
  }

  const openTributeModal = (tribute) => {
    const tributeModalName = document.getElementById('tribute-modal-name');
    const tributeModalStats = document.getElementById('tribute-modal-stats');
    tributeModalName.textContent = `${tribute.emoji} ${tribute.name}`;
    tributeModalStats.innerHTML = `
      <div class="modal-stat-group">
        <div><strong>District:</strong> ${tribute.district}</div>
        <div><strong>Age:</strong> ${tribute.age}</div>
        <div><strong>Gender:</strong> ${tribute.gender}</div>
      </div>
      <div class="modal-stat-group">
        <div><strong>Health:</strong> ${tribute.health}</div>
        <div><strong>Hunger:</strong> ${tribute.hunger}%</div>
        <div><strong>AC:</strong> ${tribute.AC}</div>
      </div>
      <div class="modal-stat-group">
        <div><strong>Weapon:</strong> ${tribute.weapon ? tribute.weapon.emoji + ' ' + tribute.weapon.name : 'None'}</div>
        <div><strong>Kills:</strong> ${tribute.kills}</div>
        <div><strong>Alliances:</strong> ${tribute.alliances.length > 0 ? tribute.alliances.map(id => tributes.find(t => t.id === id).name).join(', ') : 'None'}</div>
      </div>
      <div class="modal-stat-group">
        <div><strong>Stats:</strong></div>
        <div>Strength: ${tribute.stats.strength}</div>
        <div>Agility: ${tribute.stats.agility}</div>
        <div>Intelligence: ${tribute.stats.intelligence}</div>
        <div>Stealth: ${tribute.stats.stealth}</div>
      </div>
      <div class="modal-stat-group">
        <div><strong>Inventory:</strong> ${tribute.inventory.length > 0 ? tribute.inventory.map(item => `${item.emoji || ''} ${item.name}`).join(', ') : 'Empty'}</div>
        ${tribute.statusEffects.length > 0 ? `<div><strong>Status Effects:</strong> ${tribute.statusEffects.map(effect => effect.name).join(', ')}</div>` : ''}
      </div>
      `;
    tributeModal.style.display = 'block';
  };

  document.getElementById('event-frequency').addEventListener('input', function() {
    const index = parseInt(this.value);
    document.getElementById('event-frequency-label').textContent = eventIntervalLabels[index];
    simulationSettings.eventFrequencyIndex = index;
    saveSettingsToLocalStorage();
    if (interval) {
      clearInterval(interval);
      startInterval();
    }
  });
  document.getElementById('event-frequency-setting').addEventListener('change', function() {
    const index = parseInt(this.value);
    document.getElementById('event-frequency').value = index;
    document.getElementById('event-frequency-label').textContent = eventIntervalLabels[index];
    simulationSettings.eventFrequencyIndex = index;
    saveSettingsToLocalStorage();
    if (interval) {
      clearInterval(interval);
      startInterval();
    }
  });


  function triggerAnimation(tributeId, type) {
    const tributeCard = document.getElementById(`tribute-${tributeId}`);
    if (!tributeCard) return;

    if (type === 'damage') {
      tributeCard.classList.add('damage');
      setTimeout(() => {
        tributeCard.classList.remove('damage');
      }, 500);
    } else if (type === 'heal') {
      const glowType = Math.random() < 0.5 ? 'heal' : 'heal-blue';
      tributeCard.classList.add(glowType);
      setTimeout(() => {
        tributeCard.classList.remove(glowType);
      }, 1000);
    }
  }

  loadSettings();
  tributes = generateTributes();
  updateTributesDisplay();
  updateScoreboard();
});