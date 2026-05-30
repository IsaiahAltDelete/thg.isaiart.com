/* ============================================================================
   THE HUNGER GAMES — content data
   Edit names, weapons, resources, arenas and event flavour text here.
   Loaded as a plain script; assigns window.THG_DATA.
============================================================================ */
window.THG_DATA = {
  // ---- Tribute names (real-world, diverse) ----
  firstNames: [
    'Wei','Jing','Li','Hao','Mei','Xiao','Jun','Fang','Ying','Tian',
    'Amit','Priya','Ravi','Anjali','Vijay','Deepa','Rahul','Pooja','Sanjay','Neha',
    'Ivan','Olga','Dmitry','Natalia','Sergey','Ekaterina','Alexei','Tatiana','Mikhail','Anastasia',
    'Ahmed','Fatima','Mohamed','Aisha','Omar','Layla','Youssef','Huda','Hassan','Mariam',
    'Jean','Marie','Pierre','Sophie','Michel','Isabelle','Alain','Claire','Laurent','Céline',
    'Hans','Anna','Karl','Emma','Fritz','Lena','Heinz','Mia','Günther','Lea',
    'Hiroshi','Yuki','Kenji','Aiko','Takashi','Miyu','Daiki','Sakura','Yuto','Hana',
    'Liam','Noah','Oliver','Elijah','Benjamin','Lucas','Henry','Alexander','Charlotte','Amelia',
    'Olivia','Ava','Sophia','Isabella','Evelyn','Harper',
    'Mateo','Santiago','Valentina','Leonardo','Gabriela','Sebastián','Camila','Fernando','Catalina','Diego',
    'Daniela','Emilio','Julieta','Ricardo','Luciana','Pedro','Bianca','Francisco','Mariana',
    'Alessia','Sofia','Alessandro','Aurora','Andrea','Lorenzo','Giorgia','Riccardo',
    'Frederik','Oscar','Clara','William','Ella','Ida','Victor','Sofie',
    'Niko','Elias','Emilia','Leo','Onni','Aino','Eino','Helmi',
    'Mikael','Aada','Daniel',
    'Seung','Min','Ji','Yeon','Hyun','Soo','Eun','Jae','Ha','Kyung',
    'Kenzo','Yumi','Ren','Haruki','Hina','Akira','Kazuki','Aoi',
    'Rajesh','Lakshmi','Vikram','Deepika','Arjun','Priyanka','Kiran','Anika','Dev','Shanti',
    'Chen','Lin','Jie','Yue','Tao','Xin','Lei','Hua','Bo','Ning',
    'Karim','Nadia','Samir','Leila','Yasin','Amina','Faris','Salma','Hamza','Khadija',
    'Adrien','Manon','Hugo','Léa','Théo','Chloé','Louis','Camille','Antoine','Juliette',
    'Maximilian','Paul','Felix','Jakob','Hannah','Leon','Lina',
    'Giovanni','Chiara','Matteo','Francesca','Simone','Alice','Federico','Beatrice','Gabriele','Vittoria',
    'Bjorn','Astrid','Magnus','Ingrid','Lars','Solveig','Erik','Sigrid','Anders','Liv'
  ],
  lastNames: [
    'Wang','Li','Zhang','Liu','Chen','Yang','Huang','Zhao','Wu','Zhou',
    'Patel','Singh','Sharma','Kumar','Gupta','Verma','Reddy','Mehta','Jain','Shah',
    'Ivanov','Petrov','Sidorov','Smirnov','Kuznetsov','Popov','Vasiliev','Sokolov','Mikhailov','Fedorov',
    'Mohamed','Ali','Hassan','Hussein','Ahmed','Abdullah','Khan','Rahman','Saleh','Amin',
    'Martin','Bernard','Dubois','Thomas','Robert','Richard','Petit','Durand','Leroy','Moreau',
    'Müller','Schmidt','Schneider','Fischer','Weber','Meyer','Wagner','Becker','Hoffmann','Schulz',
    'Sato','Suzuki','Takahashi','Tanaka','Watanabe','Ito','Yamamoto','Nakamura','Kobayashi','Kato',
    'Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez',
    'Hernandez','Lopez','Gonzalez','Wilson','Anderson','Taylor','Moore','Jackson',
    'Rossi','Ferrari','Bianchi','Romano','Colombo','Ricci','Marino','Greco','Bruno','Gallo',
    'Jensen','Nielsen','Hansen','Andersen','Pedersen','Larsen','Sørensen','Rasmussen','Jørgensen','Petersen',
    'Korhonen','Virtanen','Mäkinen','Nieminen','Mäkelä','Hämäläinen','Laine','Heikkinen','Koskinen','Järvinen',
    'Andersson','Johansson','Karlsson','Nilsson','Eriksson','Larsson','Olsson','Svensson','Persson','Gustafsson',
    'Kim','Lee','Park','Choi','Jung','Kang','Jo','Yoon','Jang','Lim',
    'Yoshida','Yamaguchi','Sasaki','Saito','Matsumoto',
    'Naidu','Rao','Chowdhury','Rana','Das','Joshi','Nair','Bhattacharya',
    'Lin','Zheng','Cai','Ye','Feng','He','Xu',
    'Al-Fayed','Al-Maktoum','Al-Nahyan','Al-Thani','El-Erian','Hariri','Khouri','Malouf','Sawiris',
    'Richter','Klein',
    'Esposito','Russo','Conte','Galli','Fontana','Mancini','Lombardi','Moretti','Costa','Barbieri',
    'Viklund','Ekström','Nyberg','Lindberg','Bergström','Holm','Lundqvist','Sjöberg','Sandström','Danielsson'
  ],

  // ---- Weapons (d20 combat, dice-notation damage). Emojis cleaned up. ----
  weapons: [
    { name: 'Short Sword', emoji: '🗡️', damage: '1d6', type: 'sword' },
    { name: 'Longbow', emoji: '🏹', damage: '1d8', type: 'ranged' },
    { name: 'Battle Axe', emoji: '🪓', damage: '1d8', type: 'axe' },
    { name: 'Dagger', emoji: '🔪', damage: '1d4', type: 'dagger', finesse: true },
    { name: 'Warhammer', emoji: '🔨', damage: '1d8', type: 'hammer' },
    { name: 'Greatsword', emoji: '⚔️', damage: '2d6', type: 'sword', heavy: true },
    { name: 'Longsword', emoji: '🗡️', damage: '1d8', type: 'sword' },
    { name: 'Scimitar', emoji: '🗡️', damage: '1d6', type: 'sword', finesse: true },
    { name: 'Broadsword', emoji: '⚔️', damage: '1d8', type: 'sword' },
    { name: 'Rapier', emoji: '🤺', damage: '1d6', type: 'sword', finesse: true },
    { name: 'Spear', emoji: '🔱', damage: '1d6', type: 'polearm' },
    { name: 'Pike', emoji: '🔱', damage: '1d10', type: 'polearm', reach: true },
    { name: 'Halberd', emoji: '🪓', damage: '1d10', type: 'polearm', heavy: true },
    { name: 'Quarterstaff', emoji: '🦯', damage: '1d6', type: 'staff' },
    { name: 'Mace', emoji: '🔨', damage: '1d6', type: 'mace' },
    { name: 'Morningstar', emoji: '⚒️', damage: '1d8', type: 'mace' },
    { name: 'Club', emoji: '🏏', damage: '1d4', type: 'club' },
    { name: 'Flail', emoji: '⛓️', damage: '1d8', type: 'flail' },
    { name: 'Shortbow', emoji: '🏹', damage: '1d6', type: 'ranged' },
    { name: 'Heavy Crossbow', emoji: '🎯', damage: '1d10', type: 'ranged', heavy: true },
    { name: 'Light Crossbow', emoji: '🎯', damage: '1d8', type: 'ranged' },
    { name: 'Sling', emoji: '🪃', damage: '1d4', type: 'ranged' },
    { name: 'Excalibur', emoji: '🗡️', damage: '3d8', type: 'sword', legendary: true },
    { name: 'Mjolnir', emoji: '🔨', damage: '4d6', type: 'hammer', legendary: true },
    { name: 'Gungnir', emoji: '🔱', damage: '3d10', type: 'polearm', legendary: true },
    { name: 'Composite Bow', emoji: '🏹', damage: '2d8', type: 'ranged', legendary: true }
  ],

  // ---- Sponsor / arena resources ----
  resources: [
    { name: 'Food Ration', emoji: '🍎', effect: 'hunger', value: 20 },
    { name: 'Medkit', emoji: '🩹', effect: 'heal', value: 10 },
    { name: 'Water Bottle', emoji: '💧', effect: 'hunger', value: 15 },
    { name: 'Energy Drink', emoji: '⚡', effect: 'hunger', value: 25 },
    { name: 'Healing Herbs', emoji: '🌿', effect: 'heal', value: 7 },
    { name: 'Sturdy Armor', emoji: '🛡️', effect: 'armor', value: 2, duration: 6 },
    { name: 'Agility Boots', emoji: '🥾', effect: 'agility', value: 2, duration: 6 }
  ],

  // ---- Natural disasters / weather flavour ----
  naturalEvents: [
    'A sudden storm tears across the arena',
    'An earthquake shakes the ground',
    'A wildfire spreads rapidly',
    'A dense fog rolls over the arena',
    'A torrential downpour begins',
    'A blistering heatwave strikes',
    'Snow starts falling heavily',
    'A volcanic eruption rumbles nearby',
    'Lightning splits the sky',
    'A landslide reshapes the terrain'
  ],
  weather: ['Clear','Rain','Storm','Fog','Heatwave','Snow','Volcanic','Lightning','Overcast'],

  // ---- Arenas (only those with background images present) ----
  arenas: [
    { name: 'Dystopia',     slug: 'dystopia',     backgrounds: ['dystopia01.jpg','dystopia02.jpg','dystopia03.jpg','dystopia04.jpg'], description: 'Polluted urban wasteland. Resources are scarce and the air itself is hazardous.' },
    { name: 'Forest',       slug: 'forest',       backgrounds: ['forest01.jpg','forest02.jpg','forest03.jpg','forest04.jpg'], description: 'Dense woodland with abundant resources but dangerous wildlife.' },
    { name: 'Futuristic',   slug: 'futuristic',   backgrounds: ['futuristic01.jpg','futuristic02.jpg','futuristic03.jpg','futuristic04.jpg'], description: 'A neon technological city of advanced gear and lethal traps.' },
    { name: 'Grasslands',   slug: 'grasslands',   backgrounds: ['grasslands01.jpg','grasslands02.jpg','grasslands03.jpg','grasslands04.jpg'], description: 'Open plains with little cover and weather-driven danger.' },
    { name: 'Haunted House', slug: 'hauntedhouse', backgrounds: ['hauntedhouse01.jpg','hauntedhouse02.jpg','hauntedhouse03.jpg','hauntedhouse04.jpg'], description: 'A dark, trap-filled manor of curses and dread.' },
    { name: 'Island',       slug: 'island',       backgrounds: ['island01.jpg','island02.jpg','island03.jpg','island04.jpg'], description: 'Sun-scorched island with drowning risk and limited land.' },
    { name: 'Ocean',        slug: 'ocean',        backgrounds: ['ocean01.jpg','ocean02.jpg','ocean03.jpg','ocean04.jpg'], description: 'A vast open sea — constant drowning risk and extreme scarcity.' },
    { name: 'School',       slug: 'school',       backgrounds: ['school01.jpg','school02.jpg','school03.jpg','school04.jpg'], description: 'An abandoned school of close-quarters combat and hidden caches.' },
    { name: 'Wastelands',   slug: 'wastelands',   backgrounds: ['wastelands01.jpg','wastelands02.jpg','wastelands03.jpg','wastelands04.jpg'], description: 'Irradiated badlands with mutated wildlife and no mercy.' }
  ]
};
