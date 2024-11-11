import listLanguages from '../data/languages.json';
import listMagics from '../data/magics.json';

export const applyRace = (sheet: any, race: string, subrace: string, calculateMod: any) => {
  //Removendo dados da Raça Anã
  if (sheet.race === 'Anão') {
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus - 2;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
    sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'anão');
    sheet.equipments.proficiencies = sheet.equipments.proficiencies.filter((data: any) => data.font !== 'anão');
    sheet.languages = sheet.languages.filter((language: any) => language.name !== 'Anão' || language.name === 'Comum');
    if (sheet.subRace === 'Anão da Colina') {
      sheet.attributes.wisdom.bonus = sheet.attributes.wisdom.bonus - 1;
      sheet.attributes.wisdom.mod = calculateMod(sheet.attributes.wisdom.value + sheet.attributes.wisdom.bonus);
      sheet.hitPoints.total -= 1;
    } else if (sheet.subRace === 'Anão da Montanha') {
      sheet.attributes.strength.bonus = sheet.attributes.strength.bonus - 2;
      sheet.attributes.strength.mod = calculateMod(sheet.attributes.strength.value + sheet.attributes.strength.bonus);
      sheet.equipments.proficiencies = sheet.equipments.proficiencies.filter((data: any) => data.font !== 'anão da montanha');
    }
  }
  //Removendo dados da Raça Elfo
  if (sheet.race === 'Elfo') {
    sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus - 2;
    sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
    sheet.skills.perception.trained = false;
    sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'elfo');
    sheet.languages = sheet.languages.filter((language: any) => language.name !== 'Élfico' || language.name === 'Comum');
    if (sheet.subRace === 'Alto Elfo') {
      sheet.equipments.proficiencies = sheet.equipments.proficiencies.filter((data: any) => data.font !== 'alto elfo');
      sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'alto elfo');
      sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus - 1;
      sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
      //Escolhe um truque de mago à sua escolha
      //Idioma Extra
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
      sheet.magics = sheet.magics.filter((magic: any) => magic.name !== 'Globos de Luz');
      sheet.speed = 9;
      sheet.attributes.charisma.bonus = sheet.attributes.charisma.bonus - 1;
      sheet.attributes.charisma.mod = calculateMod(sheet.attributes.charisma.value + sheet.attributes.charisma.bonus);
    }
  }

  //Adicionando Dados da Raça Anã
  if (race === 'Anão') {
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus + 2;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
    sheet.speed = 7.5;
    listLanguages.filter((language: any) => language.name === 'Anão' || language.name === 'Comum').forEach(languageName => {
      const exists = sheet.languages.some((language: any) => language.name === languageName.name);
      if (!exists) {
        const newLanguage = listLanguages.find((language: any) => language.name === languageName.name);
        if (newLanguage) sheet.languages = [...sheet.languages, newLanguage];
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
    if (subrace === 'Anão da Colina') {
      sheet.attributes.wisdom.bonus = sheet.attributes.wisdom.bonus + 1;
      sheet.attributes.wisdom.mod = calculateMod(sheet.attributes.wisdom.value + sheet.attributes.wisdom.bonus);
      sheet.hitPoints.total += 1;
    } else if (subrace === 'Anão da Montanha') {
      sheet.attributes.strength.bonus = sheet.attributes.strength.bonus + 2;
      sheet.attributes.strength.mod = calculateMod(sheet.attributes.strength.value + sheet.attributes.strength.bonus);
      sheet.equipments.proficiencies = [
        ...sheet.equipments.proficiencies,
        { name: 'Armaduras Leves', font: 'anão da montanha', type: 'armors' },
        { name: 'Armaduras Médias', font: 'anão da montanha', type: 'armors' },
      ];
    }
    return sheet;
  }
  //Adicionando Dados da Raça Elfo
  if (race === 'Elfo') {
    sheet.attributes.dexterity.bonus = sheet.attributes.dexterity.bonus + 2;
    sheet.attributes.dexterity.mod = calculateMod(sheet.attributes.dexterity.value + sheet.attributes.dexterity.bonus);
    sheet.speed = 9;
    listLanguages.filter((language: any) => language.name === 'Élfico' || language.name === 'Comum').forEach(languageName => {
      const exists = sheet.languages.some((language: any) => language.name === languageName.name);
      if (!exists) {
        const newLanguage = listLanguages.find((language: any) => language.name === languageName.name);
        if (newLanguage) sheet.languages = [...sheet.languages, newLanguage];
      }
    });
    sheet.skills.perception.trained = true;
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
    if (subrace === 'Alto Elfo') {
      sheet.attributes.intelligence.bonus = sheet.attributes.intelligence.bonus + 1;
      sheet.attributes.intelligence.mod = calculateMod(sheet.attributes.intelligence.value + sheet.attributes.intelligence.bonus);
      sheet.equipments.proficiencies = [
        ...sheet.equipments.proficiencies,
        { name: 'Espada Longa', font: 'alto elfo', type: 'weapon' },
        { name: 'Espada Curta', font: 'alto elfo', type: 'weapon' },
        { name: 'Arco Curto', font: 'alto elfo', type: 'weapon' },
        { name: 'Arco Longo', font: 'alto elfo', type: 'weapon' },
      ];
      //Escolhe um truque de mago à sua escolha
      //Idioma Extra
    } else if (subrace === 'Elfo da Floresta') {
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
    } else if (subrace === 'Elfo Negro (Drow)') {
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
      sheet.magics = [ ...sheet.magics, luzesDancantes ];
    }
    return sheet;
  }
}