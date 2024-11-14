export const applyClass = (sheet: any, classPlayer: string, data: any) => {
  //Removendo a classe
  if (sheet.class === 'Bárbaro') {
    sheet.hitPoints.class = 0;
    sheet.attributes.strength.proficiency = false;
    sheet.attributes.constitution.proficiency = false;
    sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'bárbaro');
    sheet.powers = sheet.powers.filter((data: any) => data.font !== 'bárbaro');
    sheet.equipments.proficiencies = sheet.equipments.proficiencies.filter((data: any) => data.font !== 'bárbaro');
    sheet.equipments.storage = sheet.equipments.storage.filter((data: any) => data.font !== 'bárbaro');
    Object.keys(sheet.skills).forEach(skill => {
      const skillData = sheet.skills[skill];
      skillData.font = skillData.font.filter((item: any) => item !== 'bárbaro');
      if (skillData.font.length === 0) {
        skillData.trained = false;
      }
    });
  } else if (sheet.class === 'Bardo') {
    sheet.hitPoints.class = 0;
    sheet.attributes.dexterity.proficiency = false;
    sheet.attributes.charisma.proficiency = false;
    sheet.conditions = sheet.conditions.filter((data: any) => data.font !== 'bardo');
    sheet.magics = sheet.magics.filter((data: any) => data.font !== 'bardo');
    sheet.powers = sheet.powers.filter((data: any) => data.font !== 'bardo');
    sheet.equipments.proficiencies = sheet.equipments.proficiencies.filter((data: any) => data.font !== 'bardo');
    sheet.equipments.storage = sheet.equipments.storage.filter((data: any) => data.font !== 'bardo');
    sheet.modMagic = '';
    Object.keys(sheet.skills).forEach(skill => {
      const skillData = sheet.skills[skill];
      skillData.font = skillData.font.filter((item: any) => item !== 'bardo');
      if (skillData.font.length === 0) {
        skillData.trained = false;
      }
    });
  }
  
  //Adicionando a classe
  if (classPlayer === 'Bárbaro') {
    sheet.armorClass = 10 + sheet.attributes.dexterity.mod +  sheet.attributes.constitution.mod;
    sheet.hitPoints.class = 12;
    sheet.equipments.proficiencies = [
      ...sheet.equipments.proficiencies,
      { name: 'Armaduras Leves', font: 'bárbaro', type: 'armors' },
      { name: 'Armaduras Médias', font: 'bárbaro', type: 'armors' },
      { name: 'Escudos', font: 'bárbaro', type: 'armors' },
      { name: 'Armas Simples', font: 'bárbaro', type: 'weapon' },
      { name: 'Armas Marciais', font: 'bárbaro', type: 'weapon' },
    ];
    sheet.skills[data.listSkills[0]].font = [ ...sheet.skills[data.listSkills[0]].font, 'bárbaro'];
    sheet.skills[data.listSkills[0]].trained = true;
    sheet.skills[data.listSkills[1]].font = [ ...sheet.skills[data.listSkills[1]].font, 'bárbaro'];
    sheet.skills[data.listSkills[1]].trained = true;
    sheet.equipments.storage = [
      ...sheet.equipments.storage,
      { name: data.listOptions[0], font: 'bárbaro' },
      { name: data.listOptions[1], font: 'bárbaro' },
      { name: 'Um pacote de aventureiro', font: 'bárbaro' },
      { name: 'Quatro Azagaias', font: 'bárbaro' }
    ];
    sheet.attributes.strength.proficiency = true;
    sheet.attributes.constitution.proficiency = true;
    sheet.conditions = [
      ...sheet.conditions,
      {
        name: 'Defesa sem Armadura',
        font: 'bárbaro',
        title: 'Quando você não estiver vestindo qualquer armadura, sua Classe de Armadura será 10 + seu modificador de Destreza + seu modificador de Constituição. Você pode usar um escudo e continuar a receber esse benefício.',
      },
    ];
    sheet.powers = [
      ...sheet.powers,
      {
        name: 'Fúria',
        font: 'bárbaro',
        description: 'Em batalha, você luta com uma ferocidade primitiva. No seu turno, você pode entrar em fúria com uma ação bônus. Enquanto estiver em fúria, você recebe os seguintes benefícios se você não estiver vestindo uma armadura pesada: 1) Você tem vantagem em testes de Força e testes de resistência de Força. 2) Quando você desferir um ataque com arma corpo-acorpo usando Força, você recebe um bônus nas jogadas de dano que aumenta à medida que você adquire níveis de bárbaro, como mostrado na coluna Dano de Fúria na tabela O Bárbaro. 3) Você possui resistência contra dano de concussão, cortante e perfurante. Se você for capaz de conjurar magias, você não poderá conjurá-las ou se concentrar nelas enquanto estiver em fúria. Sua fúria dura por 1 minuto. Ela termina prematuramente se você cair inconsciente ou se seu turno acabar e você não tiver atacado nenhuma criatura hostil desde seu último turno ou não tiver sofrido dano nesse período. Você também pode terminar sua fúria no seu turno com uma ação bônus. Quando você tiver usado a quantidade de fúrias mostrada para o seu nível de bárbaro na coluna Fúrias da tabela O Bárbaro, você precisará terminar um descanso longo antes de poder entrar em fúria novamente.'
      }
    ];
  } else if (classPlayer === 'Bardo') {
    sheet.hitPoints.class = 8;
    sheet.attributes.dexterity.proficiency = true;
    sheet.attributes.charisma.proficiency = true;
    sheet.equipments.proficiencies = [
      ...sheet.equipments.proficiencies,
      { name: 'Armaduras Leves', font: 'bardo', type: 'armors' },
      { name: 'Escudos', font: 'bardo', type: 'armors' },
      { name: 'Armas Simples', font: 'bardo', type: 'weapon' },
      { name: 'Armas Marciais', font: 'bardo', type: 'weapon' },
      { name: 'Espadas Longas', font: 'bardo', type: 'weapon' },
      { name: 'Espadas Curtas', font: 'bardo', type: 'weapon' },
      { name: 'Rapieiras', font: 'bardo', type: 'weapon' },
      { name: 'Bestas de Mão', font: 'bardo', type: 'weapon' },
    ];
    sheet.skills[data.listSkills[0]].font = [ ...sheet.skills[data.listSkills[0]].font, 'bardo'];
    sheet.skills[data.listSkills[0]].trained = true;
    sheet.skills[data.listSkills[1]].font = [ ...sheet.skills[data.listSkills[1]].font, 'bardo'];
    sheet.skills[data.listSkills[1]].trained = true;
    sheet.skills[data.listSkills[2]].font = [ ...sheet.skills[data.listSkills[2]].font, 'bardo'];
    sheet.skills[data.listSkills[1]].trained = true;
    sheet.equipments.storage = [
      ...sheet.equipments.storage,
      { name: data.listOptions[0], font: 'bardo' },
      { name: data.listOptions[1], font: 'bardo' },
      { name: data.listOptions[2], font: 'bardo' },
      { name: 'Três instrumentos musicais, à sua escolha', font: 'bardo' },
      { name: 'Armadura de couro', font: 'bardo' },
      { name: 'Adaga', font: 'bardo' },
    ];
    sheet.modMagic = 'charisma';
    sheet.conditions = [
      ...sheet.conditions,
      {
        name: 'Conjuração de Ritual',
        font: 'bardo',
        title: 'Você pode conjurar qualquer magia de bardo que você conheça como um ritual se ela possuir o descritor ritual.',
      },
      {
        name: 'Foco de Conjuração',
        font: 'bardo',
        description: "Você pode usar um instrumento musical (encontrado no capítulo 5 do Player's Handbook) como foco de conjuração das suas magias de bardo",
      }
    ];
    sheet.powers = [
      ...sheet.powers,
      {
        name: 'Inspiração de Bardo',
        font: 'bardo',
        description: "Você pode inspirar os outros através de palavras animadoras ou música. Para tanto, você usa uma ação bônus no seu turno para escolher uma outra criatura, que não seja você mesmo, a até 18 metros de você que possa ouvi-lo. Essa criatura ganha um dado de Inspiração de Bardo, um d6. Uma vez, nos próximos 10 minutos, a criatura poderá rolar o dado e adicionar o valor rolado a um teste de habilidade, jogada de ataque ou teste de resistência que ela fizer. A criatura pode esperar até rolar o d20 antes de decidir usar o dado de Inspiração de Bardo, mas deve decidir antes do Mestre dizer se a rolagem foi bem ou mal sucedida. Quando o dado de Inspiração de Bardo for rolado, ele é gasto. Uma criatura pode ter apenas um dado de Inspiração de Bardo por vez. Você pode usar essa característica um número de vezes igual ao seu modificador de Carisma (no mínimo uma vez). Você recupera todos os usos quando termina um descanso longo. Seu dado de Inspiração de Bardo muda quando você atinge certos níveis na classe. O dado se torna um d8 no 5° nível, um d10 no 10° nível e um d12 no 15° nível.",
      }
    ];
  }
  return sheet;
}
