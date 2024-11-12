import listLanguages from '../data/languages.json';
import listMagics from '../data/magics.json';

export const applyRace = (sheet: any, race: string, calculateMod: any, humanAlt: any) => {
  //Removendo a Raça
  if (sheet.race === 'Anão') {
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus - 2;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
    sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'anão');
    sheet.equipments.proficiencies = sheet.equipments.proficiencies.filter((data: any) => data.font !== 'anão');
    sheet.languages = sheet.languages.filter((language: any) => language.font !== 'anão');
  } else if (sheet.race === 'Elfo') {
    sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus - 2;
    sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
    const filterFont = sheet.skills.perception.font.filter((data: any) => data !== 'elfo');
    sheet.skills.perception.font = filterFont;
    if (filterFont.length === 0) sheet.skills.perception.trained = false;
    sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'elfo');
    sheet.languages = sheet.languages.filter((language: any) => language.font !== 'elfo');
  } else if (sheet.race === 'Humano') {
    if (sheet.humanAlternative) {
      sheet.attributes[sheet.humanAlternative.list[0]].bonus = sheet.attributes[sheet.humanAlternative.list[0]].bonus - 1;
      sheet.attributes[sheet.humanAlternative.list[0]].mod = calculateMod(sheet.attributes[sheet.humanAlternative.list[0]].value + sheet.attributes[sheet.humanAlternative.list[0]].bonus);
      sheet.attributes[sheet.humanAlternative.list[1]].bonus = sheet.attributes[sheet.humanAlternative.list[1]].bonus - 1;
      sheet.attributes[sheet.humanAlternative.list[1]].mod = calculateMod(sheet.attributes[sheet.humanAlternative.list[1]].value + sheet.attributes[sheet.humanAlternative.list[1]].bonus);
      const filterFont = sheet.skills[sheet.humanAlternative.skill].font.filter((data: any) => data !== 'humano');
      sheet.skills[sheet.humanAlternative.skill].font = filterFont;
      if (filterFont.length === 0) sheet.skills[sheet.humanAlternative.skill].trained = false;
      sheet.talents = sheet.talents.filter((talent: any) => talent.font !== 'humano');
    } else {
      sheet.attributes.strength.bonus = sheet.attributes.strength.bonus - 1;
      sheet.attributes.strength.mod = calculateMod(sheet.attributes.strength.value + sheet.attributes.strength.bonus);
      sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus - 1;
      sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
      sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus - 1;
      sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
      sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus - 1;
      sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
      sheet.attributes.wisdom.bonus = sheet.attributes.wisdom.bonus - 1;
      sheet.attributes.wisdom.mod = calculateMod(sheet.attributes.wisdom.value + sheet.attributes.wisdom.bonus);
      sheet.attributes.charisma.bonus = sheet.attributes.charisma.bonus - 1;
      sheet.attributes.charisma.mod = calculateMod(sheet.attributes.charisma.value + sheet.attributes.charisma.bonus);
    }
    sheet.languages = sheet.languages.filter((language: any) => language.font !== 'humano');
    const { humanAlternative, ...newSheet } = sheet;
    sheet = newSheet;
  } else if (sheet.race === 'Halfling') {
    sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus - 2;
    sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
    sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'halfling');
    sheet.languages = sheet.languages.filter((language: any) => language.font !== 'halfling');
  } else if (sheet.race === 'Gnomo') {
    sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus - 2;
    sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
    sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'gnomo');
    sheet.languages = sheet.languages.filter((language: any) => language.font !== 'gnomo');
  } else if (sheet.race === 'Meio Orc') {
    sheet.attributes.strength.bonus = sheet.attributes.strength.bonus - 2;
    sheet.attributes.strength.mod = calculateMod(sheet.attributes.strength.value + sheet.attributes.strength.bonus);
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus - 1;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
    sheet.languages = sheet.languages.filter((language: any) => language.font !== 'orc');
    sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'orc');
    const filterFont = sheet.skills.intimidation.font.filter((data: any) => data !== 'orc');
    sheet.skills.intimidation.font = filterFont;
    if (filterFont.length === 0) sheet.skills.intimidation.trained = false;
  } else if (sheet.race === 'Tiferino') {
    sheet.attributes.charisma.bonus = sheet.attributes.charisma.bonus - 2;
    sheet.attributes.charisma.mod = calculateMod(sheet.attributes.charisma.value + sheet.attributes.charisma.bonus);
    sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'tiferino');
    sheet.languages = sheet.languages.filter((language: any) => language.font !== 'tiferino');
  } else if (race === 'Meio Elfo') {

  } else if (race === 'Draconato') {
    
  }

  //Adicionando a Raça
  if (race === 'Anão') {
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus + 2;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
    sheet.speed = 7.5;
    listLanguages.filter((language: any) => language.name === 'Anão' || language.name === 'Comum').forEach(languageName => {
      const exists = sheet.languages.some((language: any) => language.name === languageName.name);
      if (!exists) {
        const newLanguage = listLanguages.find((language: any) => language.name === languageName.name);
        if (newLanguage) sheet.languages = [...sheet.languages, { ...newLanguage, font: 'anão' }];
      }
    });
    sheet.conditions = [
      ...sheet.conditions,
      {
        name: 'Visão no Escuro',
        font: 'anão',
        title: 'Acostumado à vida subterrânea, você tem uma visão superior no escuro e na penumbra. Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.',
      },
      {
        name: 'Resistência a Toxinas',
        font: 'anão',
        title: "Você possui vantagem nas salvaguardas contra venenos e resistência contra dano de veneno (explicado no capítulo 9 do Player's Handbook).",
      },
      {
        name: "Proficiência com Ferramentas",
        font: 'anão',
        title: 'Você tem proficiência em uma ferramenta de artesão à sua escolha: ferraria, cervejaria ou alvenaria.'
      },
      {
        name: "Conhecimento de Pedras",
        font: 'anão',
        title: 'Sempre que você realizar um teste de Inteligência (História) relacionado à origem de um trabalho em pedra, você é considerado proficiente na perícia História e adiciona o dobro do seu bônus de proficiência ao teste, ao invés do seu bônus de proficiência normal.'
      }
    ];
    sheet.equipments.proficiencies = [
      ...sheet.equipments.proficiencies,
      { name: 'Machados de batalha', font: 'anão', type: 'weapon' },
      { name: 'Machadinhas', font: 'anão', type: 'weapon' },
      { name: 'Martelos leves', font: 'anão', type: 'weapon' },
      { name: 'Martelos de guerra', font: 'anão', type: 'weapon' },
    ];
  } else if (race === 'Elfo') {
    sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus + 2;
    sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
    sheet.speed = 9;
    listLanguages.filter((language: any) => language.name === 'Élfico' || language.name === 'Comum').forEach(languageName => {
      const exists = sheet.languages.some((language: any) => language.name === languageName.name);
      if (!exists) {
        const newLanguage = listLanguages.find((language: any) => language.name === languageName.name);
        if (newLanguage) sheet.languages = [...sheet.languages, { ...newLanguage, font: 'elfo'}];
      }
    });
    sheet.skills.perception.trained = true;
    sheet.skills.perception.font = [...sheet.skills.perception.font, 'elfo'];
    sheet.conditions = [
      ...sheet.conditions,
      {
        name: 'Visão no Escuro',
        font: 'elfo',
        title: 'Acostumado às florestas crepusculares e ao céu noturno, você possui uma visão superior em condições de escuridão e na penumbra. Você pode enxergar na penumbra a até 18 metros como se fosse na luz plena, e no escuro como se fosse na penumbra. Você não pode discernir cores no escuro, apenas tons de cinza..',
      },
      {
        name: 'Ancestralidade Feérica',
        font: 'elfo',
        title: "Nenhum tipo de magia pode colocá-lo para dormir e você tem Você tem vantagem em salvaguardas contra ser enfeitiçado.",
      },
      {
        name: "Transe",
        font: 'elfo',
        title: 'Elfos não precisam dormir. Em vez disso, meditam profundamente, permanecendo semiconscientes 4 horas ao dia (A expressão comum para tal meditação é "transe"). Enquanto medita, você pode sonhar, de certo modo; tais sonhos são, na verdade, exercícios mentais que passaram a ser quase involuntários após anos de prática. Depois de descansar dessa forma, você obtém os mesmos benefícios que um ser humano obtém após 8 horas de sono.'
      }
    ];
  } else if (race === 'Humano') {
    if (humanAlt) {
      sheet.attributes[humanAlt.list[0]].bonus = sheet.attributes[humanAlt.list[0]].bonus + 1;
      sheet.attributes[humanAlt.list[0]].mod = calculateMod(sheet.attributes[humanAlt.list[0]].value + sheet.attributes[humanAlt.list[0]].bonus);
      sheet.attributes[humanAlt.list[1]].bonus = sheet.attributes[humanAlt.list[1]].bonus + 1;
      sheet.attributes[humanAlt.list[1]].mod = calculateMod(sheet.attributes[humanAlt.list[1]].value + sheet.attributes[humanAlt.list[1]].bonus);
      sheet.humanAlternative = humanAlt;
    } else {
      sheet.attributes.strength.bonus = sheet.attributes.strength.bonus + 1;
      sheet.attributes.strength.mod = calculateMod(sheet.attributes.strength.value + sheet.attributes.strength.bonus);
      sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus + 1;
      sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
      sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus + 1;
      sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
      sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus + 1;
      sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
      sheet.attributes.wisdom.bonus = sheet.attributes.wisdom.bonus + 1;
      sheet.attributes.wisdom.mod = calculateMod(sheet.attributes.wisdom.value + sheet.attributes.wisdom.bonus);
      sheet.attributes.charisma.bonus = sheet.attributes.charisma.bonus + 1;
      sheet.attributes.charisma.mod = calculateMod(sheet.attributes.charisma.value + sheet.attributes.charisma.bonus);
    }
    sheet.speed = 9;
    listLanguages.filter((language: any) => language.name === 'Comum').forEach(languageName => {
      const exists = sheet.languages.some((language: any) => language.name === languageName.name);
      if (!exists) {
        const newLanguage = listLanguages.find((language: any) => language.name === languageName.name);
        if (newLanguage) sheet.languages = [...sheet.languages, newLanguage];
      }
    });
  } else if (race === 'Halfling') {
    sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus + 2;
    sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
    sheet.speed = 7.5;
    listLanguages.filter((language: any) => language.name === 'Halfling' || language.name === 'Comum').forEach(languageName => {
      const exists = sheet.languages.some((language: any) => language.name === languageName.name);
      if (!exists) {
        const newLanguage = listLanguages.find((language: any) => language.name === languageName.name);
        if (newLanguage) sheet.languages = [...sheet.languages, { ...newLanguage, font: 'halfling' }];
      }
    });
    sheet.conditions = [
      ...sheet.conditions,
      {
        name: 'Sortudo',
        font: 'halfling',
        title: 'Quando você obtiver um 1 natural em uma jogada de ataque, teste de habilidade ou teste de resistência, você pode jogar de novo o dado e deve utilizar o novo resultado.',
      },
      {
        name: 'Corajoso',
        font: 'halfling',
        title: "Você tem vantagem em testes de resistência contra ficar amedrontado.",
      },
      {
        name: "Agilidade Halfling",
        font: 'halfling',
        title: 'Você pode mover-se através do espaço de qualquer criatura que for de um  tamanho maior que o seu.'
      },
    ];
  } else if (race === 'Gnomo') {
    sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus + 2;
    sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
    sheet.speed = 7.5;
    listLanguages.filter((language: any) => language.name === 'Gnômico' || language.name === 'Comum').forEach(languageName => {
      const exists = sheet.languages.some((language: any) => language.name === languageName.name);
      if (!exists) {
        const newLanguage = listLanguages.find((language: any) => language.name === languageName.name);
        if (newLanguage) sheet.languages = [...sheet.languages, { ...newLanguage, font: 'gnomo' }];
      }
    });
    sheet.conditions = [
      ...sheet.conditions,
      {
        name: 'Visão no Escuro',
        font: 'gnomo',
        title: 'Acostumado à vida subterrânea, você tem uma visão superior no escuro e na penumbra. Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.',
      },
      {
        name: 'Astúcia do Gnomo',
        font: 'gnomo',
        title: "Você possui vantagem em todas as Salvaguardas de Inteligência, Sabedoria e Carisma contra magia.",
      }
    ];
  } else if (race === 'Meio Orc') {
    sheet.attributes.strength.bonus = sheet.attributes.strength.bonus + 2;
    sheet.attributes.strength.mod = calculateMod(sheet.attributes.strength.value + sheet.attributes.strength.bonus);
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus + 1;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
    sheet.speed = 9;
    sheet.skills.intimidation.trained = true;
    sheet.skills.intimidation.font = [...sheet.skills.intimidation.font, 'orc'];
    listLanguages.filter((language: any) => language.name === 'Orc' || language.name === 'Comum').forEach(languageName => {
      const exists = sheet.languages.some((language: any) => language.name === languageName.name);
      if (!exists) {
        const newLanguage = listLanguages.find((language: any) => language.name === languageName.name);
        if (newLanguage) sheet.languages = [...sheet.languages, { ...newLanguage, font: 'orc' }];
      }
    });
    sheet.conditions = [
      ...sheet.conditions,
      {
        name: 'Visão no Escuro',
        font: 'orc',
        title: 'Graças ao seu sangue orc, você tem uma visão superior no escuro e na penumbra. Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.',
      },
      {
        name: 'Vigor Implacável',
        font: 'orc',
        title: "Quando você é reduzido a 0 pontos de vida mas não é completamente morto, você pode voltar para 1 ponto de vida. Você não pode usar essa característica novamente até completar um descanso longo.",
      },
      {
        name: "Ataques Selvagens",
        font: 'orc',
        title: 'Quando você atinge um ataque crítico com uma arma corpo-a-corpo, você pode rolar um dos dados de dano da arma mais uma vez e adicioná-lo ao dano extra causado pelo acerto crítico.'
      },
    ];
  } else if (race === 'Tiferino') {
    sheet.attributes.charisma.bonus = sheet.attributes.charisma.bonus + 2;
    sheet.attributes.charisma.mod = calculateMod(sheet.attributes.charisma.value + sheet.attributes.charisma.bonus);
    sheet.speed = 9;
    listLanguages.filter((language: any) => language.name === 'Infernal' || language.name === 'Comum').forEach(languageName => {
      const exists = sheet.languages.some((language: any) => language.name === languageName.name);
      if (!exists) {
        const newLanguage = listLanguages.find((language: any) => language.name === languageName.name);
        if (newLanguage) sheet.languages = [...sheet.languages, { ...newLanguage, font: 'tiferino' }];
      }
    });
    sheet.conditions = [
      ...sheet.conditions,
      {
        name: 'Visão no Escuro',
        font: 'tiferino',
        title: 'Graças a sua herança infernal, você tem uma visão superior no escuro e na  penumbra. Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse na penumbra. Você não pode discernir cores no escuro, apenas tons de cinza.',
      },
      {
        name: 'Resistência Infernal',
        font: 'tiferino',
        title: "Você possui resistência a dano de fogo.",
      },
    ];
  } else if (race === 'Meio Elfo') {

  } else if (race === 'Draconato') {

  }
  return sheet;
}

export const applySubRace = (sheet: any, subRace: string, calculateMod: any) => {
  if (sheet.subRace === 'Anão da Colina') {
    sheet.attributes.wisdom.bonus = sheet.attributes.wisdom.bonus - 1;
    sheet.attributes.wisdom.mod = calculateMod(sheet.attributes.wisdom.value + sheet.attributes.wisdom.bonus);
    sheet.hitPoints.total -= 1;
  } else if (sheet.subRace === 'Anão da Montanha') {
    sheet.attributes.strength.bonus = sheet.attributes.strength.bonus - 2;
    sheet.attributes.strength.mod = calculateMod(sheet.attributes.strength.value + sheet.attributes.strength.bonus);
    sheet.equipments.proficiencies = sheet.equipments.proficiencies.filter((data: any) => data.font !== 'anão da montanha');
  } else if (sheet.subRace === 'Alto Elfo') {
    sheet.equipments.proficiencies = sheet.equipments.proficiencies.filter((data: any) => data.font !== 'alto elfo');
    sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'alto elfo');
    sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus - 1;
    sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
    sheet.magics = sheet.magics.filter((magic: any) => !magic.font || magic.font !== 'alto elfo');
    sheet.languages = sheet.languages.filter((language: any) => !language.font || language.font !== 'alto elfo');
  } else if (sheet.subRace === 'Elfo da Floresta') {
    sheet.equipments.proficiencies = sheet.equipments.proficiencies.filter((data: any) => data.font !== 'elfo da floresta');
    sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'elfo da floresta');
    sheet.attributes.wisdom.bonus = sheet.attributes.wisdom.bonus - 1;
    sheet.speed = 9;
    sheet.attributes.wisdom.mod = calculateMod(sheet.attributes.wisdom.value + sheet.attributes.wisdom.bonus);
  } else if (sheet.subRace === 'Elfo Negro (Drow)') {
    sheet.equipments.proficiencies = sheet.equipments.proficiencies.filter((data: any) => data.font !== 'elfo negro (drow)');
    sheet.conditions = [
      ...sheet.conditions.filter((data: any) => data.font !== 'elfo negro (drow)')];
    sheet.magics = sheet.magics.filter((magic: any) => magic.font !== 'elfo negro (drow)');
    sheet.speed = 9;
    sheet.attributes.charisma.bonus = sheet.attributes.charisma.bonus - 1;
    sheet.attributes.charisma.mod = calculateMod(sheet.attributes.charisma.value + sheet.attributes.charisma.bonus);
  } else if (sheet.subRace === 'Halfling Pés Leves') {
    sheet.conditions = [
      ...sheet.conditions.filter((data: any) => data.font !== 'halfling pés leves')];
    sheet.attributes.charisma.bonus = sheet.attributes.charisma.bonus - 1;
    sheet.attributes.charisma.mod = calculateMod(sheet.attributes.charisma.value + sheet.attributes.charisma.bonus);
  } else if (sheet.subRace === 'Halfling Robusto') {
    sheet.conditions = [
      ...sheet.conditions.filter((data: any) => data.font !== 'halfling robusto')];
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus - 1;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
  } else if (sheet.subRace === 'Gnomo dos Bosques') {
    sheet.conditions = [
      ...sheet.conditions.filter((data: any) => data.font !== 'gnomo dos bosques')];
    sheet.magics = sheet.magics.filter((magic: any) => magic.font !== 'gnomo dos bosques');
    sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus - 1;
    sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
  } else if (sheet.subRace === 'Gnomo das Rochas') {
    sheet.conditions = [
      ...sheet.conditions.filter((data: any) => data.font !== 'gnomo das rochas')];
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus - 1;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
  } else if (sheet.subRace === 'Tiferino de Nessus (Asmodeus)') {
    sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus - 1;
    sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
    sheet.magics = sheet.magics.filter((magic: any) => magic.font !== 'tiferino de nessus (asmodeus)');
  } else if (sheet.subRace === 'Tiferino de Maladomini (Belzebu)') {
    sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus - 1;
    sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
    sheet.magics = sheet.magics.filter((magic: any) => magic.font !== 'tiferino de maladomini (belzebu)');
  } else if (sheet.subRace === 'Tiferino de Dis (Dispater)') {
    sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus - 1;
    sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
    sheet.magics = sheet.magics.filter((magic: any) => magic.font !== 'tiferino de dis (dispater)');
  } else if (sheet.subRace === 'Tiferino de Flegetos (Fierna)') {
    sheet.attributes.wisdom.bonus = sheet.attributes.wisdom.bonus - 1;
    sheet.attributes.wisdom.mod = calculateMod(sheet.attributes.wisdom.value + sheet.attributes.wisdom.bonus);
    sheet.magics = sheet.magics.filter((magic: any) => magic.font !== 'tiferino de flegetos (fierna)');
  } else if (sheet.subRace === 'Tiferino de Malebólgia (Glasya)') {
    sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus - 1;
    sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
    sheet.magics = sheet.magics.filter((magic: any) => magic.font !== 'tiferino de malebólgia (glasya)');
  } else if (sheet.subRace === 'Tiferino de Estígia (Levisto)') {
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus - 1;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
    sheet.magics = sheet.magics.filter((magic: any) => magic.font !== 'tiferino de estígia (levisto)');
  } else if (sheet.subRace === 'Tiferino de Minauros (Mammon)') {
    sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus - 1;
    sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
    sheet.magics = sheet.magics.filter((magic: any) => magic.font !== 'tiferino de minauros (mammon)');
  } else if (sheet.subRace === 'Tiferino de Cánia (Mefistófeles)') {
    sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus - 1;
    sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
    sheet.magics = sheet.magics.filter((magic: any) => magic.font !== 'tiferino de cánia (mefistófeles)');
  } else if (sheet.subRace === 'Tiferino de Avernus (Zariel)') {
    sheet.attributes.strength.bonus = sheet.attributes.strength.bonus - 1;
    sheet.attributes.strength.mod = calculateMod(sheet.attributes.strength.value + sheet.attributes.strength.bonus);
    sheet.magics = sheet.magics.filter((magic: any) => magic.font !== 'tiferino de avernus (zariel)');
  }

  if (subRace === 'Anão da Colina') {
    sheet.attributes.wisdom.bonus = sheet.attributes.wisdom.bonus + 1;
    sheet.attributes.wisdom.mod = calculateMod(sheet.attributes.wisdom.value + sheet.attributes.wisdom.bonus);
    sheet.hitPoints.total += 1;
  } else if (subRace === 'Anão da Montanha') {
    sheet.attributes.strength.bonus = sheet.attributes.strength.bonus + 2;
    sheet.attributes.strength.mod = calculateMod(sheet.attributes.strength.value + sheet.attributes.strength.bonus);
    sheet.equipments.proficiencies = [
      ...sheet.equipments.proficiencies,
      { name: 'Armaduras Leves', font: 'anão da montanha', type: 'armors' },
      { name: 'Armaduras Médias', font: 'anão da montanha', type: 'armors' },
    ];
  } else if (subRace === 'Alto Elfo') {
    sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus + 1;
    sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
    sheet.equipments.proficiencies = [
      ...sheet.equipments.proficiencies,
      { name: 'Espada Longa', font: 'alto elfo', type: 'weapon' },
      { name: 'Espada Curta', font: 'alto elfo', type: 'weapon' },
      { name: 'Arco Curto', font: 'alto elfo', type: 'weapon' },
      { name: 'Arco Longo', font: 'alto elfo', type: 'weapon' },
    ];
  } else if (subRace === 'Elfo da Floresta') {
    sheet.attributes.wisdom.bonus = sheet.attributes.wisdom.bonus + 1;
    sheet.attributes.wisdom.mod = calculateMod(sheet.attributes.wisdom.value + sheet.attributes.wisdom.bonus);
    sheet.speed = 10.5;
    sheet.equipments.proficiencies = [
      ...sheet.equipments.proficiencies,
      { name: 'Espada Longa', font: 'elfo da floresta', type: 'weapon' },
      { name: 'Espada Curta', font: 'elfo da floresta', type: 'weapon' },
      { name: 'Arco Curto', font: 'elfo da floresta', type: 'weapon' },
      { name: 'Arco Longo', font: 'elfo da floresta', type: 'weapon' },
    ];
    sheet.conditions = [
      ...sheet.conditions,
      {
        name: 'Máscara da Natureza',
        font: 'elfo da floresta',
        title: 'Você pode tentar se esconder mesmo quando estiver parcialmente obscurecido apenas por folhagem, chuva forte, neve em queda, névoa ou outro fenômeno natural.',
      }
    ];
  } else if (subRace === 'Elfo Negro (Drow)') {
    sheet.attributes.charisma.bonus = sheet.attributes.charisma.bonus + 1;
    sheet.attributes.charisma.mod = calculateMod(sheet.attributes.charisma.value + sheet.attributes.charisma.bonus);
    sheet.equipments.proficiencies = [
      ...sheet.equipments.proficiencies,
      { name: 'Rapieiras', font: 'elfo negro (drow)', type: 'weapon' },
      { name: 'Espadas Curtas', font: 'elfo negro (drow)', type: 'weapon' },
      { name: 'Bestas de Mão', font: 'elfo negro (drow)', type: 'weapon' },
    ];
    sheet.conditions = [
      ...sheet.conditions.filter((condition: any) => condition.name !== 'Visão no Escuro'),
      {
        name: 'Visão no Escuro Aprimorada',
        font: 'elfo negro (drow)',
        title: 'Sua Visão no escuro tem um alcance maior, atingindo até 36 metros.',
      },
      {
        name: 'Sensibilidade à Luz Solar',
        font: 'elfo negro (drow)',
        title: 'Você possui desvantagem nas jogadas de ataque e nos testes de Sabedoria (Percepção) relacionados à visão quando você, o alvo do seu ataque ou qualquer coisa que esteja tentando perceber estiver sob luz solar direta.',
      },
    ];
    const luzesDancantes = listMagics.find((magic: any) => magic.name === 'Globos de Luz');
    sheet.magics = [ ...sheet.magics, { ...luzesDancantes, font: 'elfo negro (drow)' } ];
  } else if (subRace === 'Halfling Pés Leves') {
    sheet.attributes.charisma.bonus = sheet.attributes.charisma.bonus + 1;
    sheet.attributes.charisma.mod = calculateMod(sheet.attributes.charisma.value + sheet.attributes.charisma.bonus);
    sheet.conditions = [
      ...sheet.conditions,
      {
        name: 'Furtividade Natural',
        font: 'halfling pés leves',
        title: 'Você pode tentar se esconder mesmo quando possuir apenas a cobertura de uma criatura que for no mínimo um tamanho maior que o seu.',
      },
    ]
  } else if (subRace === 'Halfling Robusto') {
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus + 1;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
    sheet.conditions = [
      ...sheet.conditions,
      {
        name: 'Resistência a Toxinas',
        font: 'halfling robusto',
        title: 'Você tem vantagem em salvaguardas contra veneno e tem resistência contra dano de veneno.',
      },
    ]
  } else if (subRace === 'Gnomo dos Bosques') {
    sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus + 1;
    sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
    sheet.conditions = [
      ...sheet.conditions,
      {
        name: 'Falar com Animais Pequenos',
        font: 'gnomo dos bosques',
        title: 'Através de sons e gestos, você pode comunicar ideias simples para Bestas pequenas ou menores. Gnomos da floresta amam os animais e normalmente possuem esquilos, doninhas, coelhos, toupeiras, pica-paus e outras criaturas como amados animais de estimação.',
      },
    ];
    const minorIlusion = listMagics.find((magic: any) => magic.name === 'Ilusão Menor');
    sheet.magics = [ ...sheet.magics, { ...minorIlusion, font: 'gnomo dos bosques' } ];
  } else if (subRace === 'Gnomo das Rochas') {
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus + 1;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
    sheet.conditions = [
      ...sheet.conditions,
      {
        name: 'Conhecimento de Artífice',
        font: 'gnomo das rochas',
        title: 'Toda vez que você fizer um teste de Inteligência (História) relacionado a itens mágicos, objetos alquímicos ou mecanismos tecnológicos, você pode adicionar o dobro do seu bônus de proficiência, ao invés de qualquer bônus de proficiência que você normalmente use.',
      },
      {
        name: 'Engenhoqueiro',
        font: 'gnomo das rochas',
        title: 'Você possui proficiência com ferramentas de artesão (ferramentas de engenhoqueiro). Usando essas ferramentas, você pode gastar 1 hora e 10 po em materiais para construir um mecanismo Miúdo (CA 5, 1 pv). O mecanismo para de funcionar após 24 horas (a não ser que você gaste 1 hora reparando-o para manter o mecanismo funcionando), ou quando você usa sua ação para desmantelá-lo; nesse momento, você pode recuperar o material usado para criá-lo. Você pode ter até três desses mecanismos ativos ao mesmo tempo. Quando você criar um mecanismo, escolha uma das seguintes opções: Brinquedo Mecânico (Esse brinquedo é um animal, monstro ou pessoa mecânica, como um sapo, rato, pássaro, dragão ou soldado. Quando colocado no chão, o brinquedo se move 1,5 metro pelo chão em cada um dos seus turnos em uma direção aleatória. Ele faz barulhos apropriados a criatura que ele representa),  Isqueiro Mecânico (O mecanismo produz uma miniatura de chama, que você pode usar para acender uma vela, tocha ou fogueira. Usar o mecanismo requer sua ação) ou Caixa de Música (Quando aberta, essa caixa de música toca uma canção a um volume moderado. A caixa para de tocar quando alcança o fim da música ou quando é fechada).',
      }
    ]
  } else if (subRace === 'Tiferino de Nessus (Asmodeus)') {
    sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus + 1;
    sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
    const taumaturgia = listMagics.find((magic: any) => magic.name === 'Taumaturgia');
    sheet.magics = [ ...sheet.magics, { ...taumaturgia, font: 'tiferino de nessus (asmodeus)' } ];
  } else if (subRace === 'Tiferino de Maladomini (Belzebu)') {
    sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus + 1;
    sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
    const taumaturgia = listMagics.find((magic: any) => magic.name === 'Taumaturgia');
    sheet.magics = [ ...sheet.magics, { ...taumaturgia, font: 'tiferino de maladomini (belzebu)' } ];
  } else if (subRace === 'Tiferino de Dis (Dispater)') {
    sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus + 1;
    sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
    const taumaturgia = listMagics.find((magic: any) => magic.name === 'Taumaturgia');
    sheet.magics = [ ...sheet.magics, { ...taumaturgia, font: 'tiferino de dis (dispater)' } ];
  } else if (subRace === 'Tiferino de Flegetos (Fierna)') {
    sheet.attributes.wisdom.bonus = sheet.attributes.wisdom.bonus + 1;
    sheet.attributes.wisdom.mod = calculateMod(sheet.attributes.wisdom.value + sheet.attributes.wisdom.bonus);
    const amizade = listMagics.find((magic: any) => magic.name === 'Amizade');
    sheet.magics = [ ...sheet.magics, { ...amizade, font: 'tiferino de flegetos (fierna)' } ];
  } else if (subRace === 'Tiferino de Malebólgia (Glasya)') {
    sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus + 1;
    sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
    const minorIlusion = listMagics.find((magic: any) => magic.name === 'Ilusão Menor');
    sheet.magics = [ ...sheet.magics, { ...minorIlusion, font: 'tiferino de malebólgia (glasya)' } ];
  } else if (subRace === 'Tiferino de Estígia (Levisto)') {
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus + 1;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
    const raioDeGelo = listMagics.find((magic: any) => magic.name === 'Raio de Gelo');
    sheet.magics = [ ...sheet.magics, { ...raioDeGelo, font: 'tiferino de Estígia (levisto)' } ];
  } else if (subRace === 'Tiferino de Minauros (Mammon)') {
    sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus + 1;
    sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
    const magicHands = listMagics.find((magic: any) => magic.name === 'Mãos Mágicas');
    sheet.magics = [ ...sheet.magics, { ...magicHands, font: 'tiferino de minauros (mammon)' } ];
  } else if (subRace === 'Tiferino de Cánia (Mefistófeles)') {
    sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus + 1;
    sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
    const magicHands = listMagics.find((magic: any) => magic.name === 'Mãos Mágicas');
    sheet.magics = [ ...sheet.magics, { ...magicHands, font: 'tiferino de cánia (mefistófeles)' } ];
  } else if (subRace === 'Tiferino de Avernus (Zariel)') {
    sheet.attributes.strength.bonus = sheet.attributes.strength.bonus + 1;
    sheet.attributes.strength.mod = calculateMod(sheet.attributes.strength.value + sheet.attributes.strength.bonus);
    const taumaturgia = listMagics.find((magic: any) => magic.name === 'Taumaturgia');
    sheet.magics = [ ...sheet.magics, { ...taumaturgia, font: 'tiferino de avernus (zariel)' } ];
  }
  return sheet;
}