export const getOfficialTimeBrazil = async () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const brazilTime = new Intl.DateTimeFormat('pt-BR', options).format(date);
  return brazilTime;
};

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeFirstLetter = (str: string): String => {
  switch(str) {
    default: return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  }
};

export const playerSheet = (nameSheet: string) => {
  return {
    attributes: {
      strength: { value: 0, mod: 0, proficiency: false, bonus: 0 },
      dexterity: { value: 0, mod: 0, proficiency: false, bonus: 0 },
      wisdom: { value: 0, mod: 0, proficiency: false, bonus: 0 },
      charisma: { value: 0, mod: 0, proficiency: false, bonus: 0 },
      intelligence: { value: 0, mod: 0, proficiency: false, bonus: 0 },
      constitution: { value: 0, mod: 0, proficiency: false, bonus: 0 },
    },
    profileImage: null,
    name: nameSheet,
    conditions: [],
    class: '',
    race: '',
    subRace: '',
    level: 1,
    background: '',
    alignment: '',
    xp: 0,
    inspiration: 0,
    proficiency: 2,
    resistences: [],
    speed: 0,
    hitPoints: { actual: 0, total: 0, temporary: 0, class: 0 },
    deathSaves: { successes: 0, failures: 0 },
    talents: [],
    powers: [],
    equipments: {
      proficiencies: [],
      equiped: [],
      storage: [],
    },
    items:[],
    languages: [],
    magics: [],
    modMagic: '',
    spacesOfMagics: {
      level1: { total: 0, restant: 0},
      level2: { total: 0, restant: 0},
      level3: { total: 0, restant: 0},
      level4: { total: 0, restant: 0},
      level5: { total: 0, restant: 0},
      level6: { total: 0, restant: 0},
      level7: { total: 0, restant: 0},
      level8: { total: 0, restant: 0},
      level9: { total: 0, restant: 0},
    },
    armorClass: 0,
    skills: {
      decepcion: { trained: false, attribute: 'charisma', font: [] },
      intimidation: { trained: false, attribute: 'charisma', font: [] },
      performance: { trained: false, attribute: 'charisma', font: [] },
      persuasion: { trained: false, attribute: 'charisma', font: [] },
      acrobatics: { trained: false, attribute: 'dexterity', font: [] },
      sleightOfHand: { trained: false, attribute: 'dexterity', font: [] },
      stealth: { trained: false, attribute: 'dexterity', font: [] },
      religion: { trained: false, attribute: 'intelligence', font: [] },
      nature: { trained: false, attribute: 'intelligence', font: [] },
      investigation: { trained: false, attribute: 'intelligence', font: [] },
      history: { trained: false, attribute: 'intelligence', font: [] },
      arcana: { trained: false, attribute: 'intelligence', font: [] },
      athletics: { trained: false, attribute: 'strength', font: [] },
      animalHandling: { trained: false, attribute: 'wisdom', font: [] },
      perception: { trained: false, attribute: 'wisdom', font: [] },
      survival: { trained: false, attribute: 'wisdom', font: [] },
      medicine: { trained: false, attribute: 'wisdom', font: [] },
      insight: { trained: false, attribute: 'wisdom', font: [] },
    }
  }
}

export const returnNameSkill = (name: string) => {
  switch(name) {
    case 'decepcion': return 'Enganação';
    case 'intimidation': return 'Intimidação';
    case 'performance': return 'Atuação';
    case 'persuasion': return 'Persuasão';
    case 'acrobatics': return 'Acrobacia';
    case 'sleightOfHand': return 'Prestidigitação';
    case 'stealth': return 'Furtividade';
    case 'religion': return 'Religião';
    case 'nature': return 'Natureza';
    case 'investigation': return 'Investigação';
    case 'history': return 'História';
    case 'arcana': return 'Arcanismo';
    case 'athletics': return 'Atletismo';
    case 'animalHandling': return 'Lidar com Animais';
    case 'perception': return 'Percepção';
    case 'survival': return 'Sobrevivência';
    case 'medicine': return 'Medicina';
    case 'insight': return 'Intuição';
  }
}
