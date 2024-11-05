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

// export const playerSheet = {
//   advantagesAndFlaws: {
//     flaws: [],
//     advantages: [],
//     talens: [],
//     loresheets: [],
//   },
//   favorsAndBans: [],
//   touchstones: [],
//   harano: 0,
//   hauglosk: 0,
//   trybe: '',
//   auspice: '',
//   name: '',
//   glory: 0,
//   honor: 0,
//   wisdom: 0,
//   health: [],
//   rage: 0,
//   willpower: [],
//   gifts: [],
//   rituals: [],
//   form: 'Hominídeo',
//   background: '',
//   notes: '',
//   attributes: {
//     strength: 1,
//     dexterity: 1,
//     stamina: 1,
//     charisma: 1,
//     manipulation: 1,
//     composure: 1,
//     intelligence: 1,
//     wits: 1,
//     resolve: 1,
//   },
//   skills: {
//     type: '',
//     athletics: { value: 0, specialty: '' },
//     animalKen: { value: 0, specialty: '' },
//     academics: { value: 0, specialty: '' },
//     brawl: { value: 0, specialty: '' },
//     etiquette: { value: 0, specialty: '' },
//     awareness: { value: 0, specialty: '' },
//     craft: { value: 0, specialty: '' },
//     insight: { value: 0, specialty: '' },
//     finance: { value: 0, specialty: '' },
//     driving: { value: 0, specialty: '' },
//     intimidation: { value: 0, specialty: '' },
//     investigation: { value: 0, specialty: '' },
//     firearms: { value: 0, specialty: '' },
//     leadership: { value: 0, specialty: '' },
//     medicine: { value: 0, specialty: '' },
//     larceny: { value: 0, specialty: '' },
//     performance: { value: 0, specialty: '' },
//     occult: { value: 0, specialty: '' },
//     melee: { value: 0, specialty: '' },
//     persuasion: { value: 0, specialty: '' },
//     politics: { value: 0, specialty: '' },
//     stealth: { value: 0, specialty: '' },
//     streetwise: { value: 0, specialty: '' },
//     science: { value: 0, specialty: '' },
//     survival: { value: 0, specialty: '' },
//     subterfuge: { value: 0, specialty: '' },
//     technology: { value: 0, specialty: '' },
//   },
// };

// export const sheetStructure = (email: string, user: string, message: any) => {
//   const sheet = {
//     email: email,
//     user: user,
//     creationDate: message,
//     data: {
//       advantagesAndFlaws: {
//         flaws: [],
//         advantages: [],
//         talens: [],
//         loresheets: [],
//       },
//       favorsAndBans: [],
//       touchstones: [],
//       harano: 0,
//       hauglosk: 0,
//       trybe: '',
//       auspice: '',
//       name: '',
//       glory: 0,
//       honor: 0,
//       wisdom: 0,
//       health: [],
//       rage: 0,
//       willpower: [],
//       gifts: [],
//       rituals: [],
//       form: 'Hominídeo',
//       background: '',
//       notes: '',
//       attributes: {
//         strength: 1,
//         dexterity: 1,
//         stamina: 1,
//         charisma: 1,
//         manipulation: 1,
//         composure: 1,
//         intelligence: 1,
//         wits: 1,
//         resolve: 1,
//       },
//       skills: {
//         type: '',
//         athletics: { value: 0, specialty: '' },
//         animalKen: { value: 0, specialty: '' },
//         academics: { value: 0, specialty: '' },
//         brawl: { value: 0, specialty: '' },
//         etiquette: { value: 0, specialty: '' },
//         awareness: { value: 0, specialty: '' },
//         craft: { value: 0, specialty: '' },
//         insight: { value: 0, specialty: '' },
//         finance: { value: 0, specialty: '' },
//         driving: { value: 0, specialty: '' },
//         intimidation: { value: 0, specialty: '' },
//         investigation: { value: 0, specialty: '' },
//         firearms: { value: 0, specialty: '' },
//         leadership: { value: 0, specialty: '' },
//         medicine: { value: 0, specialty: '' },
//         larceny: { value: 0, specialty: '' },
//         performance: { value: 0, specialty: '' },
//         occult: { value: 0, specialty: '' },
//         melee: { value: 0, specialty: '' },
//         persuasion: { value: 0, specialty: '' },
//         politics: { value: 0, specialty: '' },
//         stealth: { value: 0, specialty: '' },
//         streetwise: { value: 0, specialty: '' },
//         science: { value: 0, specialty: '' },
//         survival: { value: 0, specialty: '' },
//         subterfuge: { value: 0, specialty: '' },
//         technology: { value: 0, specialty: '' },
//       },
//     },
//   };
//   return sheet;
// };