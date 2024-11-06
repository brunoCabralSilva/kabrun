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
      strength: { value: 0, mod: 0, proficiency: false },
      dexterity: { value: 0, mod: 0, proficiency: false },
      wisdom: { value: 0, mod: 0, proficiency: false },
      charisma: { value: 0, mod: 0, proficiency: false },
      intelligence: { value: 0, mod: 0, proficiency: false },
      constitution: { value: 0, mod: 0, proficiency: false },
    },
    profileImage: null,
    tokenImage: null,
    name: nameSheet,
    conditions: [],
    carryingCapacity: 0,
    class: '',
    race: '',
    level: 1,
    background: '',
    alignment: '',
    xp: 0,
    inspiration: 0,
    proficiency: 0,
    iniciative: 0,
    speed: 0,
    hitPoints: { actual: 0, total: 0, temporary: 0 },
    deathSaves: { sucesses: 0, failures: 0 },
    talents: [],
    equipments: [],
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
      decepcion: { trained: false, attribute: 'charisma' },
      intimidation: { trained: false, attribute: 'charisma' },
      performance: { trained: false, attribute: 'charisma' },
      persuasion: { trained: false, attribute: 'charisma' },
      acrobatics: { trained: false, attribute: 'dexterity' },
      sleightOfHand: { trained: false, attribute: 'dexterity' },
      stealth: { trained: false, attribute: 'dexterity' },
      religion: { trained: false, attribute: 'intelligence' },
      nature: { trained: false, attribute: 'intelligence' },
      investigation: { trained: false, attribute: 'intelligence' },
      history: { trained: false, attribute: 'intelligence' },
      arcana: { trained: false, attribute: 'intelligence' },
      athletics: { trained: false, attribute: 'strength' },
      animalHandling: { trained: false, attribute: 'wisdom' },
      perception: { trained: false, attribute: 'wisdom' },
      survival: { trained: false, attribute: 'wisdom' },
      medicine: { trained: false, attribute: 'wisdom' },
      insight: { trained: false, attribute: 'wisdom' },
    }
  }
}
