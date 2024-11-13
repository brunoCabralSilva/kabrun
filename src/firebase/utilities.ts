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
    proficiency: 0,
    resistences: [],
    speed: 0,
    hitPoints: { actual: 0, total: 0, temporary: 0 },
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
      1: { total: 0, restant: 0},
      2: { total: 0, restant: 0},
      3: { total: 0, restant: 0},
      4: { total: 0, restant: 0},
      5: { total: 0, restant: 0},
      6: { total: 0, restant: 0},
      7: { total: 0, restant: 0},
      8: { total: 0, restant: 0},
      9: { total: 0, restant: 0},
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
