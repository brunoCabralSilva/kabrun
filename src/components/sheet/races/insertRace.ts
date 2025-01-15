import listLanguages from '../../../data/languages.json';
import listRaces from '../../../data/races.json';

interface IAttributesToAdd {
  value: number;
  name: string;
}

export const insertRace = (
  sheet: any,
  calculateMod: any,
  race: string,
  attributes: IAttributesToAdd[],
  session: any,
  skillData: string[] | null,
  languagesText: string | null,
) => {
    //Remove todos os Bônus Raciais e SubRaciais existentes
    sheet.attributes.bonus = sheet.attributes.bonus.filter((item: any) => item.type !== 'race' && item.type !== 'subrace');

    //Insere o Bônus Racial
    const listOfBonus = attributes.map((attribute: IAttributesToAdd) => {
      return { ...attribute, type: 'race', font: race };
    });
    sheet.attributes.bonus = [...sheet.attributes.bonus, ...listOfBonus];

    //Recalcula o modificador de Força
    const filterStr = sheet.attributes.bonus.filter((item: any) => item.name === 'strength');
    var bonusStr = 0;
    filterStr.forEach((item: any) => bonusStr += item.value);
    sheet.attributes.strength.mod = calculateMod(sheet.attributes.strength.value + bonusStr);

    //Recalcula o modificador de Destreza
    const filterDex = sheet.attributes.bonus.filter((item: any) => item.name === 'dexterity');
    var bonusDex = 0;
    filterDex.forEach((item: any) => bonusDex += item.value);
    sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + bonusDex);

    //Recalcula o modificador de Constituição
    const filterConstitution = sheet.attributes.bonus.filter((item: any) => item.name === 'constitution');
    var bonusCon = 0;
    filterConstitution.forEach((item: any) => bonusCon += item.value);
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + bonusCon);

    //Recalcula o modificador de Inteligência
    const filterInt = sheet.attributes.bonus.filter((item: any) => item.name === 'intelligence');
    var bonusInt = 0;
    filterInt.forEach((item: any) => bonusInt += item.value);
    sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + bonusInt);

    //Recalcula o modificador de Sabedoria
    const filterWis = sheet.attributes.bonus.filter((item: any) => item.name === 'wisdom');
    var bonusWis = 0;
    filterWis.forEach((item: any) => bonusWis += item.value);
    sheet.attributes.wisdom.mod = calculateMod(sheet.attributes.wisdom.value + bonusWis);

    //Recalcula o modificador de Carisma
    const filterCha = sheet.attributes.bonus.filter((item: any) => item.name === 'charisma');
    var bonusCha = 0;
    filterCha.forEach((item: any) => bonusCha += item.value);
    sheet.attributes.charisma.mod = calculateMod(sheet.attributes.charisma.value + bonusCha);

    //Remove todos os Talentos Raciais e SubRaciais existentes
    sheet.talents = sheet.talents.filter((item: any) => item.type !== 'race' && item.type !== 'subrace');

    //Remove todos os Poderes Raciais e SubRaciais existentes
    sheet.powers = sheet.powers.filter((item: any) => item.type !== 'race' && item.type !== 'subrace');
    
    //Remove todas as magias advindas de Raças ou Subraças
    sheet.magics = sheet.magics.filter((magic: any) => !magic.type || magic.type !== 'race' || magic.type !== 'subrace');

    //Remove os Idiomas raciais e subraciais que existiam
    sheet.languages = sheet.languages.filter((language: any) => language.type !== 'race' && language.type !== 'subrace' );

    //Remove as Perícias treinadas por caract. raciais e subraciais
    for (const [, skill] of Object.entries(sheet.skills) as [string, any][]) {
      skill.tags = skill.tags.filter((tag: any) => tag !== 'race' && tag !== 'subrace');
      if (skill.tags.length === 0) skill.trained = false;
    }

    //Remove todas as Condições de Raças e SubRaças Anteriores
    sheet.conditions = sheet.conditions.filter((data: any) => data.type !== 'race' && data.type !== 'subrace');
    
    //Remove todas as Proficiências de Raças e SubRaças Anteriores
    sheet.equipments.proficiencies = sheet.equipments.proficiencies.filter((data: any) => data.type !== 'race' && data.type !== 'subrace');

    //Adiciona Perícias escolhidas para a Raça
    if (skillData) {
      for (const skillName of skillData) {
        const skill = sheet.skills[skillName];
        skill.trained = true;
        if (!skill.tags.includes("race")) {
          skill.tags.push("race");
        }
      }
    }

    //Seleciona Linguagens adicionais de Raça
    if (languagesText) {
      const findLanguage = listLanguages.find((languageItem: any) => languageItem.name === languagesText);
      if (findLanguage) {
        sheet.languages = [...sheet.languages, { type: 'race', ...findLanguage }];
      }
    }
    
    //Encontra os dados da Raça selecionada
    let findRace: any = {};
    if (race === 'Draconato') {
      findRace = listRaces.filter((itemList: any) => {
        if (session.books.includes("Fizban's Treasury of Dragons")) {
          return !itemList.type || itemList.type !== 2
        } return !itemList.type || itemList.type !== 1
      }).find((raceItem: any) => raceItem.name === race);
    } else findRace = listRaces.find((raceName: any) => raceName.name === race);
    if (findRace) {
      //Adiciona Linguagens
      let allLanguages = [];
      for (let i = 0; i < findRace.languages.length; i += 1) {
        if (findRace.languages[i] !== 'other') {
          const languageToAdd = listLanguages.find((language: any) => {
            return language.name === findRace.languages[i];
          });
          if (languageToAdd) allLanguages.push({ ...languageToAdd, font: race, type: 'race' });
        }
      }
      sheet.languages = [...sheet.languages, ...allLanguages];

      //Adiciona Proficiências de Raça
      if (findRace.skills.mode !== 'none') {
        for (let i = 0; i < findRace.skills.items.length; i += 1) {
          if (findRace.skills.items[i] !== 'other') {
            sheet.skills[findRace.skills.items[i]].trained = true;
            sheet.skills[findRace.skills.items[i]].tags = [...sheet.skills[findRace.skills.items[i]].tags, 'race'];
          } else { }
        }
      }

      //Adiciona o Deslocamento da Raça Selecionada
      sheet.speed = findRace.speed;

      //Adiciona as Condições da Raça Selecionada
      sheet.conditions = [...sheet.conditions, findRace.characteristics];

      //Adiciona as Proficiências da Raça Selecionada
      sheet.equipments.proficiencies = [...sheet.equipments.proficiencies, findRace.proficiencies];
    }

    //Insere a Raça e limpa a Subraça
    sheet.race = race;
    sheet.subrace = '';
    return sheet;
}

export const insertSubRace = (
  sheet: any,
  calculateMod: any,
  subrace: string,
  attributes: IAttributesToAdd[],
) => {
  //Remove todos os Bônus Subraciais existentes
  sheet.attributes.bonus = sheet.attributes.bonus.filter((item: any) => item.type !== 'subrace');

  //Insere o Bônus Racial
  const listOfBonus = attributes.map((attribute: IAttributesToAdd) => {
    return { ...attribute, type: 'subrace', font: subrace };
  });
  sheet.attributes.bonus = [...sheet.attributes.bonus, ...listOfBonus];

  //Recalcula o modificador de Força
  const filterStr = sheet.attributes.bonus.filter((item: any) => item.name === 'strength');
  var bonusStr = 0;
  filterStr.forEach((item: any) => bonusStr += item.value);
  sheet.attributes.strength.mod = calculateMod(sheet.attributes.strength.value + bonusStr);

  //Recalcula o modificador de Destreza
  const filterDex = sheet.attributes.bonus.filter((item: any) => item.name === 'dexterity');
  var bonusDex = 0;
  filterDex.forEach((item: any) => bonusDex += item.value);
  sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + bonusDex);

  //Recalcula o modificador de Constituição
  const filterConstitution = sheet.attributes.bonus.filter((item: any) => item.name === 'constitution');
  var bonusCon = 0;
  filterConstitution.forEach((item: any) => bonusCon += item.value);
  sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + bonusCon);

  //Recalcula o modificador de Inteligência
  const filterInt = sheet.attributes.bonus.filter((item: any) => item.name === 'intelligence');
  var bonusInt = 0;
  filterInt.forEach((item: any) => bonusInt += item.value);
  sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + bonusInt);

  //Recalcula o modificador de Sabedoria
  const filterWis = sheet.attributes.bonus.filter((item: any) => item.name === 'wisdom');
  var bonusWis = 0;
  filterWis.forEach((item: any) => bonusWis += item.value);
  sheet.attributes.wisdom.mod = calculateMod(sheet.attributes.wisdom.value + bonusWis);

  //Recalcula o modificador de Carisma
  const filterCha = sheet.attributes.bonus.filter((item: any) => item.name === 'charisma');
  var bonusCha = 0;
  filterCha.forEach((item: any) => bonusCha += item.value);
  sheet.attributes.charisma.mod = calculateMod(sheet.attributes.charisma.value + bonusCha);

  //Remove todas as magias advindas de Subraças
  sheet.magics = sheet.magics.filter((magic: any) => !magic.type || magic.type !== 'subrace');

  //Remove todos os Poderes SubRaciais existentes
  sheet.talents = sheet.talents.filter((item: any) => item.type !== 'subrace');

  //Remove todos os Poderes SubRaciais existentes
  sheet.powers = sheet.powers.filter((item: any) => item.type !== 'subrace');

  //Remove os Idiomas Subraciais que existiam
  sheet.languages = sheet.languages.filter((language: any) => language.type !== 'subrace' );
    
  //Remove todas as Condições de SubRaças Anteriores
  sheet.conditions = sheet.conditions.filter((data: any) => data.type !== 'subrace');
  
  //Remove todas as Proficiências de SubRaças Anteriores
  sheet.equipments.proficiencies = sheet.equipments.proficiencies.filter((data: any) => data.type !== 'subrace');

  //Encontra os dados da Raça selecionada
  let findSubrace = null;
  for (const race of listRaces) {
    const itemSubrace = race.subraces.find(sub => sub.name === subrace);
    if (itemSubrace) findSubrace = itemSubrace;
  }

  if (findSubrace) {
    //Adiciona Linguagens
    let allLanguages = [];
    for (let i = 0; i < findSubrace.languages.length; i += 1) {
      if (findSubrace.languages[i] !== 'other') {
        const languageToAdd = listLanguages.find((language: any) => language.name === findSubrace.languages[i]);
        if (languageToAdd) allLanguages.push({ ...languageToAdd, font: race, type: 'race' });
      }
    }
    sheet.languages = [...sheet.languages, ...allLanguages];

    //Adiciona o Deslocamento da Raça Selecionada
    sheet.speed = findSubrace.speed;

    //Adiciona as Condições da Raça Selecionada
    sheet.conditions = [...sheet.conditions, findSubrace.characteristics];

    //Adiciona as Proficiências da Raça Selecionada
    sheet.equipments.proficiencies = [...sheet.equipments.proficiencies, findSubrace.proficiencies];
  }

  //Insere a Subraça
  sheet.subrace = subrace;
  return sheet;
}