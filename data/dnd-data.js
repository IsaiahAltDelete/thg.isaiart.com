/* ============================================================================
   THE D&D HUNGER GAMES — content data
   Races, classes, spells, weapons, monsters, names and realm themes.
   Loaded as a plain script; assigns window.DND_DATA.
============================================================================ */
window.DND_DATA = {
  races: ['Human','Elf','Dwarf','Halfling','Orc','Tiefling','Dragonborn','Gnome','Half-Elf','Half-Orc','Goblin','Kobold','Tabaxi','Lizardfolk'],
  classes: ['Fighter','Wizard','Rogue','Cleric','Ranger','Paladin','Sorcerer','Warlock','Bard','Monk','Barbarian','Druid'],

  classEmojis: {
    Fighter:'⚔️', Wizard:'🧙', Rogue:'🗡️', Cleric:'⛪', Ranger:'🏹', Paladin:'🛡️',
    Sorcerer:'🔮', Warlock:'📜', Bard:'🎸', Monk:'🙏', Barbarian:'🪓', Druid:'🌿'
  },
  raceEmojis: {
    Human:'🧑', Elf:'🧝', Dwarf:'🧔', Halfling:'🦶', Orc:'👹', Tiefling:'😈',
    Dragonborn:'🐲', Gnome:'🧒', 'Half-Elf':'🧝', 'Half-Orc':'👹', Goblin:'👺',
    Kobold:'🐉', Tabaxi:'🐱', Lizardfolk:'🦎'
  },

  // Which classes channel mana / cast spells
  spellcasters: ['Wizard','Cleric','Sorcerer','Warlock','Bard','Druid','Paladin','Ranger'],

  weapons: [
    { name: 'Longsword', emoji: '🗡️', damage: '1d8', type: 'Melee' },
    { name: 'Shortbow', emoji: '🏹', damage: '1d6', type: 'Ranged' },
    { name: 'Battleaxe', emoji: '🪓', damage: '1d8', type: 'Melee' },
    { name: 'Dagger', emoji: '🔪', damage: '1d4', type: 'Melee', finesse: true },
    { name: 'Warhammer', emoji: '🔨', damage: '1d8', type: 'Melee' },
    { name: 'Greatsword', emoji: '⚔️', damage: '2d6', type: 'Melee', heavy: true },
    { name: 'Crossbow', emoji: '🎯', damage: '1d8', type: 'Ranged' },
    { name: 'Quarterstaff', emoji: '🦯', damage: '1d6', type: 'Melee' },
    { name: 'Flame Tongue', emoji: '🔥', damage: '1d8+2d6', type: 'Melee', magic: true, legendary: true },
    { name: 'Frost Brand', emoji: '❄️', damage: '1d8+1d6', type: 'Melee', magic: true, legendary: true }
  ],
  armors: [
    { name: 'Leather Armor', acBonus: 1 },
    { name: 'Chain Mail', acBonus: 3 },
    { name: 'Plate Armor', acBonus: 5 },
    { name: 'Mage Armor', acBonus: 3, caster: true }
  ],
  spells: [
    { name: 'Magic Missile', emoji: '✨', damage: '3d4+3', cost: 6,  alwaysHits: true },
    { name: 'Fire Bolt',     emoji: '🔥', damage: '2d10',   cost: 4 },
    { name: 'Ice Storm',     emoji: '❄️', damage: '2d8+4d6', cost: 14 },
    { name: 'Lightning Bolt',emoji: '⚡', damage: '8d6',     cost: 16 },
    { name: 'Fireball',      emoji: '🔥', damage: '8d6',     cost: 16 },
    { name: 'Sacred Flame',  emoji: '🌟', damage: '2d8',     cost: 5 }
  ],
  monsters: [
    { name: 'Goblin', emoji: '👺', health: 15, ac: 13, attackBonus: 4, damage: '1d6+2' },
    { name: 'Orc',    emoji: '👹', health: 30, ac: 13, attackBonus: 5, damage: '1d12+3' },
    { name: 'Dire Wolf', emoji: '🐺', health: 20, ac: 13, attackBonus: 4, damage: '2d4+2' },
    { name: 'Owlbear', emoji: '🦉', health: 40, ac: 13, attackBonus: 6, damage: '2d6+4' }
  ],

  firstNames: [
    'Aria','Zephyr','Nova','Caspian','Luna','Orion','Sage','Phoenix','Lyra','Atlas',
    'Kai','Jade','Ezra','Rowan','Skye','Ember','Ash','Finn','Quinn','Raven',
    'Eden','Reed','Jett','Milo','Ivy','Faye','Blake','Coral','Dane','Wren',
    'Leo','Mara','Avery','Asher','Harper','River','Storm','Indigo','Zara','Silas',
    'Riley','Kendall','Jordan','Morgan','Casey','Taylor','Reese','Alex','Skyler','Blair',
    'Remy','Peyton','Quincy','Sydney','Dylan','Logan','Parker','Rory','Sloan','Amara',
    'Beau','Chance','Dahlia','Elliot','Freya','Gideon','Hazel','Isla','Jasper','Kira',
    'Lachlan','Maeve','Nico','Opal','Piper','Rafael','Sierra','Teagan','Ulric',
    'Vera','Wyatt','Xander','Yara','Zane','Hawk','Ayla','Elio','Seren','Alden',
    'Tessa','Juno','Callum','Willa','Bran','Elara','Maven','Clover','Eris','Thorne',
    'Galen','Vale','Rook','Kael','Maia','Elowen','Frost','Vesper','Raine','Cyrus',
    'Dorian','Lyric','Winter','Arrow','Talon','Isolde','Sable','Aurelia','Sol','Finnian',
    'Juniper','Soren','Echo','Rune','Drake','Elian','Lucian','Kalon','Sorrel',
    'Niamh','Corwin','Xanthe','Liora','Selene'
  ],
  lastNames: [
    'Frost','Storm','Wilde','Blackwood','Rivers','Sky','Stone','Moon','Flame','Star',
    'Vale','Haven','Thorne','Winter','Ember','Blaze','Shadow','Lark','Fable','Noble',
    'Brook','Shade','Finch','Knight','Gale','Hunter','Fox','Ash','Viper','Falcon',
    'Moss','Reed','Bluff','Dune','Pine','Grove','Heath','Marsh','Glade','Field',
    'Cliff','Meadow','Ridge','Holt','Cove','Dell','Fern','Leaf','Briar',
    'Knightley','Black','Dusk','Hart','Whisper','Bright','Crest','Hollow','Dawn',
    'Evergreen','Glimmer','Haze','Jewel','Kite','Loom','Mist','Night','Owl',
    'Petal','Quest','Rune','Thyme','Underwood','Vine','Warden','Xane','Yew','Zenith',
    'Alder','Bane','Crimson','Frostborn','Driftwood','Hawke','Ironwood','Lowell','Nightshade','Ravenwood',
    'Silverwind','Stormrider','Thistle','Wildflower','Windrider','Winterfell','Whitestone','Wolfstone','Duskwalker','Ironheart'
  ],

  naturalEvents: [
    'An arcane storm crackles across the arena',
    'The ground splits in a sudden tremor',
    'Wildfire races through the brush',
    'A cursed fog descends',
    'A torrential rain begins to fall',
    'A scorching heat shimmers over the field',
    'A freezing blizzard rolls in'
  ],
  weather: ['Clear','Rain','Storm','Fog','Heatwave','Blizzard'],

  // Realms double as "arenas" — themed with CSS gradients (no image assets needed)
  arenas: [
    { name: 'Verdant Plains', slug: 'plains',    description: 'Open grassland under a wide sky.' },
    { name: 'Darkwood',       slug: 'forest',    description: 'A tangled, shadowed forest.' },
    { name: 'Stone Peaks',    slug: 'mountains', description: 'Jagged mountains and biting wind.' },
    { name: 'Mirefen Swamp',  slug: 'swamp',     description: 'A sucking, fetid swamp.' },
    { name: 'Ashen Desert',   slug: 'desert',    description: 'Endless dunes and merciless sun.' },
    { name: 'Underdark',      slug: 'cave',      description: 'Lightless caverns far below.' }
  ]
};
