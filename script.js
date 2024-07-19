document.addEventListener('DOMContentLoaded', () => {
    const skinTones = ['🏻', '🏼', '🏽', '🏾', '🏿'];
    const genders = ['♂️', '♀️'];
    const weapons = ['🗡️', '🏹', '🪓', '🔪', '🔨', '⚔️'];
    const districts = Array.from({ length: 12 }, (_, i) => i + 1);

    const firstNames = [
        'Aria', 'Zephyr', 'Nova', 'Caspian', 'Luna', 'Orion', 'Sage', 'Phoenix', 'Lyra', 'Atlas', 
        'Kai', 'Jade', 'Ezra', 'Rowan', 'Skye', 'Ember', 'Ash', 'Finn', 'Quinn', 'Raven', 
        'Eden', 'Reed', 'Jett', 'Milo', 'Ivy', 'Faye', 'Blake', 'Coral', 'Dane', 'Wren',
        'Leo', 'Mara', 'Avery', 'Asher', 'Harper', 'River', 'Storm', 'Indigo', 'Zara', 'Silas',
        'Riley', 'Kendall', 'Jordan', 'Morgan', 'Casey', 'Taylor', 'Reese', 'Alex', 'Skyler', 'Blair',
        'Remy', 'Peyton', 'Quincy', 'Rowan', 'Sydney', 'Dylan', 'Logan', 'Parker', 'Rory', 'Sloan',
        'Amara', 'Beau', 'Chance', 'Dahlia', 'Elliot', 'Freya', 'Gideon', 'Hazel', 'Isla', 'Jasper',
        'Kira', 'Lachlan', 'Maeve', 'Nico', 'Opal', 'Piper', 'Quinn', 'Rafael', 'Sierra', 'Teagan',
        'Ulric', 'Vera', 'Wyatt', 'Xander', 'Yara', 'Zane'
    ];
    const lastNames = [
        'Frost', 'Storm', 'Wilde', 'Blackwood', 'Rivers', 'Sky', 'Stone', 'Moon', 'Flame', 'Star', 
        'Vale', 'Haven', 'Thorne', 'Winter', 'Ember', 'Blaze', 'Shadow', 'Lark', 'Fable', 'Noble', 
        'Brook', 'Shade', 'Finch', 'Knight', 'Gale', 'Hunter', 'Fox', 'Ash', 'Viper', 'Falcon',
        'Moss', 'Reed', 'Bluff', 'Dune', 'Pine', 'Grove', 'Heath', 'Marsh', 'Glade', 'Field',
        'Cliff', 'Meadow', 'Ridge', 'Holt', 'Cove', 'Dell', 'Fern', 'Leaf', 'Briar', 'Vale',
        'Knightley', 'Black', 'Dusk', 'Hart', 'Whisper', 'Shade', 'Bright', 'Crest', 'Hollow', 'Dawn',
        'Evergreen', 'Fable', 'Glimmer', 'Haze', 'Jewel', 'Kite', 'Loom', 'Mist', 'Night', 'Owl',
        'Petal', 'Quest', 'Rune', 'Stone', 'Thyme', 'Underwood', 'Vine', 'Warden', 'Xane', 'Yew', 'Zenith'
    ];

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

    const generatePersonality = () => {
        const personalities = ['aggressive', 'cautious', 'loyal', 'treacherous'];
        return personalities[Math.floor(Math.random() * personalities.length)];
    };

    const generateTributes = () => {
        const usedNames = new Set();
        const usedFirstNames = new Set();
        let tributes = [];

        // Generate tributes ensuring one male and one female per district
        districts.forEach(district => {
            const maleName = generateUniqueName(usedNames, usedFirstNames);
            const femaleName = generateUniqueName(usedNames, usedFirstNames);
            tributes.push({
                id: tributes.length + 1,
                name: maleName,
                health: 100,
                isAlive: true,
                isBleeding: false,
                kills: 0,
                district: district,
                emoji: `👨${skinTones[Math.floor(Math.random() * skinTones.length)]}`,
                gender: '♂️',
                age: Math.floor(Math.random() * 8) + 12, // Ages 12-19
                weapon: null,
                personality: generatePersonality(),
                injuries: [],
                alliances: []
            });
            tributes.push({
                id: tributes.length + 1,
                name: femaleName,
                health: 100,
                isAlive: true,
                isBleeding: false,
                kills: 0,
                district: district,
                emoji: `👩${skinTones[Math.floor(Math.random() * skinTones.length)]}`,
                gender: '♀️',
                age: Math.floor(Math.random() * 8) + 12, // Ages 12-19
                weapon: null,
                personality: generatePersonality(),
                injuries: [],
                alliances: []
            });
        });

        return tributes;
    };

    const getVictorsFromStorage = () => {
        return JSON.parse(localStorage.getItem('victors')) || [];
    };

    const saveVictorToStorage = (victor) => {
        const victors = getVictorsFromStorage();
        victors.push(victor);
        localStorage.setItem('victors', JSON.stringify(victors));
    };

    const updateVictorsList = () => {
        const victorsList = getVictorsFromStorage();
        const victorsListElement = document.getElementById('victors-list');
        victorsListElement.innerHTML = victorsList.map(victor => `<li>${victor}</li>`).join('');
    };

    let tributes = generateTributes();
    let events = [];
    let gameOver = false;
    let day = 1;
    let hour = 6;
    let interval;
    let speed = 2000;
    let placementCounter = 24;

    const tributesContainer = document.getElementById('tributes-container');
    const dayCounter = document.getElementById('day');
    const timeCounter = document.getElementById('time');
    const dayNightIcon = document.getElementById('day-night-icon');
    const logContainer = document.getElementById('log-container');
    const tributesLeftCounter = document.getElementById('tributes-left');
    const mostKillsCounter = document.getElementById('most-kills');
    const mostKillsNameCounter = document.getElementById('most-kills-name');
    const eventFrequencyInput = document.getElementById('event-frequency');

    const updateTributesDisplay = () => {
        tributes.sort((a, b) => a.district - b.district || a.gender.localeCompare(b.gender));
        tributesContainer.innerHTML = tributes.map(tribute => `
            <div class="tribute ${tribute.isAlive ? '' : 'dead'}" id="tribute-${tribute.id}">
                <div>${tribute.emoji} ${tribute.name.split(' ')[0]}</div>
                <div>District ${tribute.district}</div>
                <div>${tribute.gender} ${tribute.age}</div>
                <div class="health-bar">
                    <div class="health-bar-fill" style="width: ${tribute.health}%"></div>
                </div>
                <div class="weapon">${tribute.weapon || '🤲'}</div>
                ${!tribute.isAlive ? `<div class="placement">${tribute.placement}</div>` : ''}
                <div class="alliances">${tribute.alliances.length > 0 ? 'Allies: ' + tribute.alliances.map(id => tributes.find(t => t.id === id).name.split(' ')[0]).join(', ') : ''}</div>
            </div>
        `).join('');
    };

    const updateScoreboard = () => {
        const aliveTributes = tributes.filter(t => t.isAlive);
        tributesLeftCounter.textContent = aliveTributes.length;

        const mostKills = Math.max(...tributes.map(t => t.kills));
        const tributeWithMostKills = tributes.find(t => t.kills === mostKills && mostKills > 0);
        mostKillsCounter.textContent = mostKills > 0 ? mostKills : '0';
        mostKillsNameCounter.textContent = tributeWithMostKills ? tributeWithMostKills.name : 'N/A';
    };

    const addEvent = (message, type) => {
        events.unshift({ message, type });
        if (events.length > 10) events.pop(); // Increase log size to 10
        logContainer.innerHTML = events.map(event => `<div class="event ${event.type}">${event.message}</div>`).join('');
        logContainer.scrollTop = 0; // Ensure log scrolls to top
    };

    const applyBounceEffect = (tributeId) => {
        const tributeElement = document.getElementById(`tribute-${tributeId}`);
        if (tributeElement) {
            tributeElement.classList.add('bounce');
            setTimeout(() => tributeElement.classList.remove('bounce'), 200);
        }
    };

    const applyBleedingEffect = (tribute) => {
        if (tribute.isBleeding) {
            const bleedDamage = Math.floor(Math.random() * 5) + 1;
            tribute.health = Math.max(0, tribute.health - bleedDamage);
            if (tribute.health === 0) {
                tribute.isAlive = false;
                tribute.placement = placementCounter--;
            }
            applyBounceEffect(tribute.id);
        }
    };

    const gameLoop = () => {
        tributes.forEach(tribute => {
            if (tribute.isAlive) {
                applyBleedingEffect(tribute);
                // Update other attributes here...
            }
        });
        updateTributesDisplay();
        updateScoreboard();
    };

    const generateEvent = () => {
        const aliveTributes = tributes.filter(t => t.isAlive);
        if (aliveTributes.length <= 1) return;

        const eventTypes = [
            { type: 'death', weight: 1 },
            { type: 'fight', weight: hour >= 6 && hour < 18 ? 3 : 1 }, // Less fights at night
            { type: 'alliance', weight: 1 },
            { type: 'resource', weight: 3 },
            { type: 'heal', weight: 2 },
            { type: 'trap', weight: 1 },
            { type: 'weather', weight: 0.5 },
            { type: 'accident', weight: 1 },
            { type: 'poison', weight: 1 },
            { type: 'starvation', weight: 1 },
            { type: 'wildAnimal', weight: hour >= 6 && hour < 18 ? 1 : 2 }, // More wild animal attacks at night
            { type: 'naturalDisaster', weight: 0.5 },
            { type: 'disease', weight: 1 }
        ];

        const totalWeight = eventTypes.reduce((sum, event) => sum + event.weight, 0);
        let random = Math.random() * totalWeight;

        for (let event of eventTypes) {
            if (random < event.weight) {
                const tribute1 = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
                const tribute2 = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];

                switch (event.type) {
                    case 'death':
                        tribute1.isAlive = false;
                        tribute1.health = 0;
                        tribute1.placement = placementCounter--;
                        return addEvent(`${tribute1.emoji} ${tribute1.name} has died in the arena.`, 'death');
                    case 'fight':
                        let damage = Math.floor(Math.random() * 30) + 10;
                        if (Math.random() < 0.1) {
                            // 10% chance to instantly kill in combat
                            damage = tribute2.health;
                        }
                        if (tribute1.weapon) {
                            damage += 20; // Weapons add more damage
                        }
                        tribute2.health = Math.max(0, tribute2.health - damage);
                        applyBounceEffect(tribute2.id);
                        if (tribute2.health === 0) {
                            tribute2.isAlive = false;
                            tribute2.placement = placementCounter--;
                            tribute1.kills += 1;
                        }
                        return addEvent(
                            `${tribute1.emoji} ${tribute1.name} attacks ${tribute2.emoji} ${tribute2.name} with ${tribute1.weapon || 'bare hands'}, dealing ${damage} damage!${tribute2.health === 0 ? ` ${tribute2.name} has died!` : ''}`,
                            tribute2.health === 0 ? 'death' : 'fight'
                        );
                    case 'alliance':
                        if (!tribute1.alliances.includes(tribute2.id)) {
                            tribute1.alliances.push(tribute2.id);
                            tribute2.alliances.push(tribute1.id);
                            return addEvent(`${tribute1.emoji} ${tribute1.name} and ${tribute2.emoji} ${tribute2.name} form an uneasy alliance.`, 'alliance');
                        }
                        break;
                    case 'resource':
                        if (!tribute1.weapon) {
                            tribute1.weapon = weapons[Math.floor(Math.random() * weapons.length)];
                            return addEvent(`${tribute1.emoji} ${tribute1.name} finds a ${tribute1.weapon}!`, 'resource');
                        }
                        return addEvent(`${tribute1.emoji} ${tribute1.name} discovers a hidden cache of supplies.`, 'resource');
                    case 'heal':
                        const healAmount = Math.floor(Math.random() * 30) + 10;
                        tribute1.health = Math.min(100, tribute1.health + healAmount);
                        return addEvent(`${tribute1.emoji} ${tribute1.name} finds medicine and heals ${healAmount} health.`, 'heal');
                    case 'trap':
                        const trapDamage = Math.floor(Math.random() * 40) + 10;
                        tribute1.health = Math.max(0, tribute1.health - trapDamage);
                        applyBounceEffect(tribute1.id);
                        if (tribute1.health === 0) {
                            tribute1.isAlive = false;
                            tribute1.placement = placementCounter--;
                        }
                        return addEvent(
                            `${tribute1.emoji} ${tribute1.name} falls into a trap, taking ${trapDamage} damage!${tribute1.health === 0 ? ` ${tribute1.name} has died!` : ''}`,
                            tribute1.health === 0 ? 'death' : 'trap'
                        );
                    case 'weather':
                        const weatherEvents = [
                            'A sudden storm hits the arena', 
                            'The temperature drops dramatically', 
                            'A thick fog descends on the arena', 
                            'The arena is engulfed in complete darkness'
                        ];
                        const weatherDamage = Math.floor(Math.random() * 20) + 5;
                        tributes.forEach(t => {
                            if (t.isAlive) {
                                t.health = Math.max(0, t.health - weatherDamage);
                                applyBounceEffect(t.id);
                                if (t.health === 0) {
                                    t.isAlive = false;
                                    t.placement = placementCounter--;
                                }
                            }
                        });
                        return addEvent(`${weatherEvents[Math.floor(Math.random() * weatherEvents.length)]}, affecting all tributes by ${weatherDamage} damage.`, 'weather');
                    case 'accident':
                        const accidentDamage = Math.floor(Math.random() * 40) + 10;
                        tribute1.health = Math.max(0, tribute1.health - accidentDamage);
                        applyBounceEffect(tribute1.id);
                        if (tribute1.health === 0) {
                            tribute1.isAlive = false;
                            tribute1.placement = placementCounter--;
                        }
                        return addEvent(`${tribute1.emoji} ${tribute1.name} has an accident and takes ${accidentDamage} damage!${tribute1.health === 0 ? ` ${tribute1.name} has died!` : ''}`, tribute1.health === 0 ? 'death' : 'accident');
                    case 'poison':
                        const poisonDamage = Math.floor(Math.random() * 30) + 20;
                        tribute1.health = Math.max(0, tribute1.health - poisonDamage);
                        applyBounceEffect(tribute1.id);
                        if (tribute1.health === 0) {
                            tribute1.isAlive = false;
                            tribute1.placement = placementCounter--;
                        }
                        return addEvent(`${tribute1.emoji} ${tribute1.name} is poisoned and takes ${poisonDamage} damage!${tribute1.health === 0 ? ` ${tribute1.name} has died!` : ''}`, tribute1.health === 0 ? 'death' : 'poison');
                    case 'starvation':
                        tribute1.health = 0;
                        tribute1.isAlive = false;
                        tribute1.placement = placementCounter--;
                        return addEvent(`${tribute1.emoji} ${tribute1.name} has died of starvation.`, 'death');
                    case 'wildAnimal':
                        const animalDamage = Math.floor(Math.random() * 40) + 10;
                        tribute1.health = Math.max(0, tribute1.health - animalDamage);
                        applyBounceEffect(tribute1.id);
                        if (tribute1.health === 0) {
                            tribute1.isAlive = false;
                            tribute1.placement = placementCounter--;
                        }
                        return addEvent(`${tribute1.emoji} ${tribute1.name} is attacked by a wild animal and takes ${animalDamage} damage!${tribute1.health === 0 ? ` ${tribute1.name} has died!` : ''}`, tribute1.health === 0 ? 'death' : 'wildAnimal');
                    case 'naturalDisaster':
                        const disasterEvents = [
                            'A massive earthquake shakes the arena', 
                            'A wildfire spreads rapidly', 
                            'A flash flood sweeps through the arena', 
                            'A landslide crushes everything in its path'
                        ];
                        const disasterDamage = Math.floor(Math.random() * 30) + 20;
                        tributes.forEach(t => {
                            if (t.isAlive) {
                                t.health = Math.max(0, t.health - disasterDamage);
                                applyBounceEffect(t.id);
                                if (t.health === 0) {
                                    t.isAlive = false;
                                    t.placement = placementCounter--;
                                }
                            }
                        });
                        return addEvent(`${disasterEvents[Math.floor(Math.random() * disasterEvents.length)]}, affecting all tributes by ${disasterDamage} damage.`, 'naturalDisaster');
                    case 'disease':
                        const diseaseDamage = Math.floor(Math.random() * 30) + 10;
                        tribute1.health = Math.max(0, tribute1.health - diseaseDamage);
                        applyBounceEffect(tribute1.id);
                        if (tribute1.health === 0) {
                            tribute1.isAlive = false;
                            tribute1.placement = placementCounter--;
                        }
                        return addEvent(`${tribute1.emoji} ${tribute1.name} contracts a disease and takes ${diseaseDamage} damage!${tribute1.health === 0 ? ` ${tribute1.name} has died!` : ''}`, tribute1.health === 0 ? 'death' : 'disease');
                }
            }
            random -= event.weight;
        }
    };

    const startSimulation = () => {
        if (!interval) {
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
                            const victor = `${aliveTributes[0].emoji} ${aliveTributes[0].name} from District ${aliveTributes[0].district}`;
                            addEvent(`${victor} is the victor of The Hunger Games!`, 'victory');
                            saveVictorToStorage(victor);
                        } else {
                            addEvent("There are no survivors. The arena stands silent.", 'gameOver');
                        }
                        updateVictorsList();
                    }

                    hour += 1;
                    if (hour >= 24) {
                        hour = 0;
                        day += 1;
                    }
                    const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
                    timeCounter.textContent = formattedHour;
                    dayCounter.textContent = day;
                    dayNightIcon.textContent = (hour >= 6 && hour < 18) ? '☀️' : '🌙';
                }
            }, speed / eventFrequencyInput.value);
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
            startSimulation();
        }
    };

    const restartSimulation = () => {
        tributes = generateTributes();
        events = [];
        gameOver = false;
        day = 1;
        hour = 6;
        speed = 2000;
        placementCounter = 24;
        updateTributesDisplay();
        updateScoreboard();
        logContainer.innerHTML = '';
        startSimulation();
    };

    document.getElementById('start-button').addEventListener('click', startSimulation);
    document.getElementById('pause-button').addEventListener('click', pauseSimulation);
    document.getElementById('resume-button').addEventListener('click', resumeSimulation);
    document.getElementById('restart-button').addEventListener('click', restartSimulation);

    updateTributesDisplay();
    updateScoreboard();
    updateVictorsList();
});
