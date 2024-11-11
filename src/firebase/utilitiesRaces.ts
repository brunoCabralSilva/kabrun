export const applyRace = (sheet: any, race: string, subrace: string, calculateMod: any) => {
  //Removendo dados da Raça Anã
  if (sheet.race === 'Anão') {
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus - 2;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
    sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'anão');
    sheet.equipments.proficiencies = sheet.equipments.proficiencies.filter((data: any) => data.font !== 'anão');
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

  //Adicionando Dados da Raça Anã
  if (race === 'Anão') {
    sheet.attributes.constitution.bonus = sheet.attributes.constitution.bonus + 2;
    sheet.attributes.constitution.mod = calculateMod(sheet.attributes.constitution.value + sheet.attributes.constitution.bonus);
    sheet.speed = 7.5;
    sheet.conditions = [
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
}