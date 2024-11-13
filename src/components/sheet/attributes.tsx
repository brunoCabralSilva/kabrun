import { useContext, useEffect, useState } from "react";
import contexto from "../../context/context";
import { updateDataPlayer } from "../../firebase/players";

export default function Attributes() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const { session, showSheet, players, setShowGuide, setShowMessage, calculateMod, setOptionGuide } = useContext(contexto);
  const [type, setType] = useState('');
  const [listNumbers, setListNumbers] = useState<number[]>([]);
  const [strength, setStrength] = useState(0);
  const [dexterity, setDexterity] = useState(0);
  const [constitution, setConstitution] = useState(0);
  const [intelligence, setIntelligence] = useState(0);
  const [wisdom, setWisdom] = useState(0);
  const [charisma, setCharisma] = useState(0);
  const [sumCost, setSumCost] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
    if (findPlayer.sheet.chooseAttribute) {
      setType('selected');
      setStrength(findPlayer.sheet.attributes.strength.value);
      setDexterity(findPlayer.sheet.attributes.dexterity.value);
      setConstitution(findPlayer.sheet.attributes.constitution.value);
      setIntelligence(findPlayer.sheet.attributes.intelligence.value);
      setWisdom(findPlayer.sheet.attributes.wisdom.value);
      setCharisma(findPlayer.sheet.attributes.charisma.value);
      setListNumbers([findPlayer.sheet.attributes.strength.value, findPlayer.sheet.attributes.dexterity.value, findPlayer.sheet.attributes.constitution.value, findPlayer.sheet.attributes.intelligence.value, findPlayer.sheet.attributes.wisdom.value, findPlayer.sheet.attributes.charisma.value]);
    }
  }, [session, players]);

  const roll4d6DropLowest = () => {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => a - b);
    rolls.shift();
    return rolls.reduce((sum, roll) => sum + roll, 0);
  };

  const formatList = (numbers: number[]) => {
    if (numbers.length === 0) return '';
    if (numbers.length === 1) return numbers[0].toString();
    if (numbers.length === 2) return `${numbers[0]} e ${numbers[1]}`;
  
    return `${numbers.slice(0, -1).join(', ')} e ${numbers[numbers.length - 1]}`;
  };

  const calculateSumCosts = (attribute: string, value: number) => {
    let totalSum = 0;
    let listValues = [];
    switch(attribute) {
      case 'strength':
        listValues = [value, dexterity, constitution, intelligence, wisdom, charisma];
        break;
      case 'dexterity':
        listValues = [strength, value, constitution, intelligence, wisdom, charisma];
        break;
      case 'constitution':
        listValues = [strength, dexterity, value, intelligence, wisdom, charisma];
        break;
      case 'intelligence':
        listValues = [strength, dexterity, constitution, value, wisdom, charisma];
        break;
      case 'wisdom':
        listValues = [strength, dexterity, constitution, intelligence, value, charisma];
        break;
      default:
        listValues = [strength, dexterity, constitution, intelligence, wisdom, value];
        break;
    }
    for (let i = 0; i < listValues.length; i += 1) {
      switch(listValues[i]) {
        case 15: totalSum += 9; break;
        case 14: totalSum += 7; break;
        case 13: totalSum += 5; break;
        case 12: totalSum += 4; break;
        case 11: totalSum += 3; break;
        case 10: totalSum += 2; break;
        case 9: totalSum += 1; break;
        default: totalSum += 0;
      }
    }
    setSumCost(totalSum);
  };

  const verifyCost = () => {
    if (sumCost !== 27) {
      setShowMessage({ show: true, text: 'É necessário preencher valores de atributos que o total dos custos seja 27.' });
    } else updateAttributes();
  };

  const updateAttributes = async () => {
    if (type === 'rolling') dataPlayer.sheet.chooseAttribute = true;
    dataPlayer.sheet.attributes.strength.value = strength;
    dataPlayer.sheet.attributes.strength.mod = calculateMod(strength + dataPlayer.sheet.attributes.strength.bonus);
    dataPlayer.sheet.attributes.dexterity.value = dexterity;
    dataPlayer.sheet.attributes.dexterity.mod = calculateMod(dexterity + dataPlayer.sheet.attributes.dexterity.bonus);
    dataPlayer.sheet.attributes.constitution.value = constitution;
    dataPlayer.sheet.attributes.constitution.mod = calculateMod(constitution + dataPlayer.sheet.attributes.constitution.bonus);
    dataPlayer.sheet.attributes.intelligence.value = intelligence;
    dataPlayer.sheet.attributes.intelligence.mod = calculateMod(intelligence + dataPlayer.sheet.attributes.intelligence.bonus);
    dataPlayer.sheet.attributes.wisdom.value = wisdom;
    dataPlayer.sheet.attributes.wisdom.mod = calculateMod(wisdom + dataPlayer.sheet.attributes.wisdom.bonus);
    dataPlayer.sheet.attributes.charisma.value = charisma;
    dataPlayer.sheet.attributes.charisma.mod = calculateMod(charisma + dataPlayer.sheet.attributes.charisma.bonus);
    await updateDataPlayer(session.id, dataPlayer, setShowMessage);
    setShowGuide(false);
    setOptionGuide('initials');
  }

  return(
    <div className="flex flex-col gap-2 h-90vh overflow-y-auto p-4 w-full justify-start items-center relative bg-gray-whats-dark border-white border-2">
      {
        dataPlayer
        && dataPlayer.sheet.level === 1
        && !dataPlayer.sheet.chooseAttribute &&
        <div className="w-full">
          {
            session.attributeDistribution.find((atrDist: any) => atrDist.name === 'fixed') &&
            <button
            type="button"
            onClick={ () => {
              setType('fixed');
              setListNumbers([15, 14, 13, 12, 10, 8]);
              setStrength(15);
              setDexterity(14);
              setConstitution(13);
              setIntelligence(12);
              setWisdom(10);
              setCharisma(8);
            }}
            className="w-full flex flex-col"
          >
            <div className="flex items-center gap-2 w-full">
              <div className="box flex items-center justify-center w-full col-span-1 mt-2">
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <p>Atributos Fixos</p>
              </div>
            </div>
            </button>
          }
          {
            session.attributeDistribution.find((atrDist: any) => atrDist.name === 'personalized') &&
            <button
              type="button"
              onClick={ () => {
                setType('personalized');
                setStrength(8);
                setDexterity(8);
                setConstitution(8);
                setIntelligence(8);
                setWisdom(8);
                setCharisma(8);
                setListNumbers([15, 14, 13, 12, 11,10, 9, 8]);
              }}
              className="w-full flex flex-col"
            >
              <div className="flex items-center gap-2 w-full">
                <div className="box flex items-center justify-center w-full col-span-1 mt-2">
                  <div className="box__line box__line--top" />
                  <div className="box__line box__line--right" />
                  <div className="box__line box__line--bottom" />
                  <div className="box__line box__line--left" />
                  <p>Atributos Personalizados</p>
                </div>
              </div>
            </button>
          }
          {
            session.attributeDistribution.find((atrDist: any) => atrDist.name === 'rolling') &&
            <button
              type="button"
              onClick={() => {
                setType('');
                setShowConfirmation(true);
              }}
              className="w-full flex flex-col"
            >
              <div className="flex items-center gap-2 w-full">
                <div className="box flex items-center justify-center w-full col-span-1 mt-2">
                  <div className="box__line box__line--top" />
                  <div className="box__line box__line--right" />
                  <div className="box__line box__line--bottom" />
                  <div className="box__line box__line--left" />
                  <p>Atributos rolando Dados</p>
                </div>
              </div>
            </button>
          }
        </div>
      }
      {
        (type === 'fixed' || type === 'rolling') &&
        <div>Distribua nos Atributos abaixo os valores { formatList(listNumbers) }</div>
      }
      {
        type === 'personalized' &&
        <div>Verifique o custo de cada valor de Atributo abaixo. Você tem um total de 27 pontos para distribuir entre eles:</div>
      }
      {
        showConfirmation &&
        <div
        >
          <div>
            Para cada Atributo, serão rolados 4d6 e excluídos os piores resultados. Você poderá selecionar os resultados para os Atributos que desejar, mas a ação de rolar dados só pode ser feita uma única vez e desabilitará as outras opções de Atributos Fixos e Personalizados. Tem certeza que quer rolar dados para definir os atributos?
          </div>
          <button
            onClick={ async () => {
              const newNumbers = Array.from({ length: 6 }, () => roll4d6DropLowest());
              setType('rolling');
              setListNumbers(newNumbers.sort((a, b) => b - a));
              setStrength(newNumbers[0]);
              setDexterity(newNumbers[1]);
              setConstitution(newNumbers[2]);
              setIntelligence(newNumbers[3]);
              setWisdom(newNumbers[4]);
              setCharisma(newNumbers[5]);
              dataPlayer.sheet.chooseAttribute = true;
              dataPlayer.sheet.attributes.strength.value = newNumbers[0];
              dataPlayer.sheet.attributes.strength.mod = calculateMod(newNumbers[0] + dataPlayer.sheet.attributes.strength.bonus);
              dataPlayer.sheet.attributes.dexterity.value = newNumbers[1];
              dataPlayer.sheet.attributes.dexterity.mod = calculateMod(newNumbers[1] + dataPlayer.sheet.attributes.dexterity.bonus);
              dataPlayer.sheet.attributes.constitution.value = newNumbers[2];
              dataPlayer.sheet.attributes.constitution.mod = calculateMod(newNumbers[2] + dataPlayer.sheet.attributes.constitution.bonus);
              dataPlayer.sheet.attributes.intelligence.value = newNumbers[3];
              dataPlayer.sheet.attributes.intelligence.mod = calculateMod(newNumbers[3] + dataPlayer.sheet.attributes.intelligence.bonus);
              dataPlayer.sheet.attributes.wisdom.value = newNumbers[4];
              dataPlayer.sheet.attributes.wisdom.mod = calculateMod(newNumbers[4] + dataPlayer.sheet.attributes.wisdom.bonus);
              dataPlayer.sheet.attributes.charisma.value = newNumbers[5];
              dataPlayer.sheet.attributes.charisma.mod = calculateMod(newNumbers[5] + dataPlayer.sheet.attributes.charisma.bonus);
              await updateDataPlayer(session.id, dataPlayer, setShowMessage);
              setShowConfirmation(false);
            }}
          >
            Sim
          </button>
          <button
            onClick={ () => setShowConfirmation(false) }
          >
            Não
          </button>
        </div>
      }
      {
        type === 'personalized' &&
        <div className="grid grid-cols-2 w-full py-3 gap-2">
          <div className="grid grid-cols-2 w-full border border-white p-1">
            <p className="text-center w-full border-b border-r border-white">Valor</p>
            <p className="text-center w-full border-b border-white">Custo</p>
            <p className="text-center w-full border-b border-r border-white">8</p>
            <p className="text-center w-full border-b border-white">0</p>
            <p className="text-center w-full border-b border-r border-white">9</p>
            <p className="text-center w-full border-b border-white">1</p>
            <p className="text-center w-full border-b border-r border-white">10</p>
            <p className="text-center w-full border-b border-white">2</p>
            <p className="text-center w-full border-r border-white">11</p>
            <p className="text-center w-full">3</p>
          </div>
          <div className="grid grid-cols-2 w-full border border-white p-1">
            <p className="text-center w-full border-b border-r border-white">Valor</p>
            <p className="text-center w-full border-b border-white">Custo</p>
            <p className="text-center w-full border-b border-r border-white">12</p>
            <p className="text-center w-full border-b border-white">4</p>
            <p className="text-center w-full border-b border-r border-white">13</p>
            <p className="text-center w-full border-b border-white">5</p>
            <p className="text-center w-full border-b border-r border-white">14</p>
            <p className="text-center w-full border-b border-white">7</p>
            <p className="text-center w-full border-r border-white">15</p>
            <p className="text-center w-full">9</p>
          </div>
        </div>
      }
      {
        type === 'personalized' &&
        <div>Total gasto: { sumCost }</div>
      }
      {
        dataPlayer && type !== '' &&
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="w-full gap-4 text-sm mt-3">
            <div className=""> 
              <div className="relative flex items-center justify-center w-full ">
                <div className="box__line box__line--top"></div>
                <div className="box__line box__line--right"></div>
                <div className="box__line box__line--bottom"></div>
                <div className="box__line box__line--left"></div>
                <div className="flex flex-col items-center justify-center">
                  <select
                    value={strength}
                    className="text-2xl font-bold bg-gray-whats-dark text-center outline-none"
                    onChange={ (e: any) => {
                      const selectedValue = parseInt(e.target.value);
                      if (type !== 'personalized') {
                        if (dexterity === selectedValue) setDexterity(strength);
                        else if (constitution === selectedValue) setConstitution(strength); 
                        else if (intelligence === selectedValue) setIntelligence(strength);
                        else if (wisdom === selectedValue) setWisdom(strength);
                        else if (charisma === selectedValue) setCharisma(strength);
                      }
                      setStrength(selectedValue);
                      calculateSumCosts('strength', selectedValue);
                    }}
                  >
                    {
                      listNumbers.map((list: any, index: number) => (
                        <option key={index}>{list}</option>
                      ))
                    }
                  </select>
                  <p className="text-xs pb-1">Força { dataPlayer.sheet.attributes.strength.bonus !== 0 && `(+${dataPlayer.sheet.attributes.strength.bonus})` }</p>
                  <p className="text-xs pb-1">({ calculateMod(strength + dataPlayer.sheet.attributes.strength.bonus) })</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full gap-4 text-sm mt-3">
            <div className=""> 
              <div className="relative flex items-center justify-center w-full ">
                <div className="box__line box__line--top"></div>
                <div className="box__line box__line--right"></div>
                <div className="box__line box__line--bottom"></div>
                <div className="box__line box__line--left"></div>
                <div className="flex flex-col items-center justify-center">
                  <select
                    value={dexterity}
                    className="text-2xl font-bold bg-gray-whats-dark text-center outline-none"
                    onChange={ (e: any) => {
                      const selectedValue = parseInt(e.target.value);
                      if (type !== 'personalized') {
                        if (strength === selectedValue) setStrength(dexterity);
                        else if (constitution === selectedValue) setConstitution(dexterity); 
                        else if (intelligence === selectedValue) setIntelligence(dexterity);
                        else if (wisdom === selectedValue) setWisdom(dexterity);
                        else if (charisma === selectedValue) setCharisma(dexterity);
                      }
                      setDexterity(selectedValue);
                      calculateSumCosts('dexterity', selectedValue);
                    }}
                  >
                    {
                      listNumbers.map((list: any, index: number) => (
                        <option key={index}>{list}</option>
                      ))
                    }
                  </select>
                  <p className="text-xs pb-1">Destreza { dataPlayer.sheet.attributes.dexterity.bonus !== 0 && `(+${dataPlayer.sheet.attributes.dexterity.bonus})` }</p>
                  <p className="text-xs pb-1">({ calculateMod(dexterity + dataPlayer.sheet.attributes.dexterity.bonus) })</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full gap-4 text-sm mt-3">
            <div className=""> 
              <div className="relative flex items-center justify-center w-full ">
                <div className="box__line box__line--top"></div>
                <div className="box__line box__line--right"></div>
                <div className="box__line box__line--bottom"></div>
                <div className="box__line box__line--left"></div>
                <div className="flex flex-col items-center justify-center">
                  <select
                    value={constitution}
                    className="text-2xl font-bold bg-gray-whats-dark text-center outline-none"
                    onChange={ (e: any) => {
                      const selectedValue = parseInt(e.target.value);
                      if (type !== 'personalized') {
                        if (strength === selectedValue) setStrength(constitution);
                        else if (dexterity === selectedValue) setDexterity(constitution); 
                        else if (intelligence === selectedValue) setIntelligence(constitution);
                        else if (wisdom === selectedValue) setWisdom(constitution);
                        else if (charisma === selectedValue) setCharisma(constitution);
                      }
                      setConstitution(selectedValue);
                      calculateSumCosts('constitution', selectedValue);
                    }}
                  >
                    {
                      listNumbers.map((list: any, index: number) => (
                        <option key={index}>{list}</option>
                      ))
                    }
                  </select>
                  <p className="text-xs pb-1">Constituição { dataPlayer.sheet.attributes.constitution.bonus !== 0 && `(+${dataPlayer.sheet.attributes.constitution.bonus})` }</p>
                  <p className="text-xs pb-1">({ calculateMod(constitution + dataPlayer.sheet.attributes.constitution.bonus) })</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full gap-4 text-sm">
            <div className=""> 
              <div className="relative flex items-center justify-center w-full ">
                <div className="box__line box__line--top"></div>
                <div className="box__line box__line--right"></div>
                <div className="box__line box__line--bottom"></div>
                <div className="box__line box__line--left"></div>
                <div className="flex flex-col items-center justify-center">
                  <select
                    value={intelligence}
                    className="text-2xl font-bold bg-gray-whats-dark text-center outline-none"
                    onChange={ (e: any) => {
                      const selectedValue = parseInt(e.target.value);
                      if (type !== 'personalized') {
                        if (strength === selectedValue) setStrength(intelligence);
                        else if (dexterity === selectedValue) setDexterity(intelligence); 
                        else if (constitution === selectedValue) setConstitution(intelligence);
                        else if (wisdom === selectedValue) setWisdom(intelligence);
                        else if (charisma === selectedValue) setCharisma(intelligence);
                      }
                      setIntelligence(selectedValue);
                      calculateSumCosts('intelligence', selectedValue);
                    }}
                  >
                    {
                      listNumbers.map((list: any, index: number) => (
                        <option key={index}>{list}</option>
                      ))
                    }
                  </select>
                  <p className="text-xs pb-1">Inteligência { dataPlayer.sheet.attributes.intelligence.bonus !== 0 && `(+${dataPlayer.sheet.attributes.intelligence.bonus})` }</p>
                  <p className="text-xs pb-1">({ calculateMod(intelligence + dataPlayer.sheet.attributes.intelligence.bonus) })</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full gap-4 text-sm">
            <div className=""> 
              <div className="relative flex items-center justify-center w-full ">
                <div className="box__line box__line--top"></div>
                <div className="box__line box__line--right"></div>
                <div className="box__line box__line--bottom"></div>
                <div className="box__line box__line--left"></div>
                <div className="flex flex-col items-center justify-center">
                  <select
                    value={wisdom}
                    className="text-2xl font-bold bg-gray-whats-dark text-center outline-none"
                    onChange={ (e: any) => {
                      const selectedValue = parseInt(e.target.value);
                      if (type !== 'personalized') {
                        if (strength === selectedValue) setStrength(wisdom);
                        else if (dexterity === selectedValue) setDexterity(wisdom); 
                        else if (constitution === selectedValue) setConstitution(wisdom);
                        else if (intelligence === selectedValue) setIntelligence(wisdom);
                        else if (charisma === selectedValue) setCharisma(wisdom);
                      }
                      setWisdom(selectedValue);
                      calculateSumCosts('wisdom', selectedValue);
                    }}
                  >
                    {
                      listNumbers.map((list: any, index: number) => (
                        <option key={index}>{list}</option>
                      ))
                    }
                  </select>
                  <p className="text-xs pb-1">Sabedoria { dataPlayer.sheet.attributes.wisdom.bonus !== 0 && `(+${dataPlayer.sheet.attributes.wisdom.bonus})` }</p>
                  <p className="text-xs pb-1">({ calculateMod(wisdom + dataPlayer.sheet.attributes.wisdom.bonus) })</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full gap-4 text-sm">
            <div className=""> 
              <div className="relative flex items-center justify-center w-full ">
                <div className="box__line box__line--top"></div>
                <div className="box__line box__line--right"></div>
                <div className="box__line box__line--bottom"></div>
                <div className="box__line box__line--left"></div>
                <div className="flex flex-col items-center justify-center">
                  <select
                    value={charisma}
                    className="text-2xl font-bold bg-gray-whats-dark text-center outline-none"
                    onChange={ (e: any) => {
                      const selectedValue = parseInt(e.target.value);
                      if (type !== 'personalized') {
                        if (strength === selectedValue) setStrength(charisma);
                        else if (dexterity === selectedValue) setDexterity(charisma); 
                        else if (constitution === selectedValue) setConstitution(charisma);
                        else if (intelligence === selectedValue) setIntelligence(charisma);
                        else if (charisma === selectedValue) setCharisma(charisma);
                      }
                      setCharisma(selectedValue);
                      calculateSumCosts('charisma', selectedValue);
                    }}
                  >
                    {
                      listNumbers.map((list: any, index: number) => (
                        <option key={index}>{list}</option>
                      ))
                    }
                  </select>
                  <p className="text-xs pb-1">Carisma { dataPlayer.sheet.attributes.charisma.bonus !== 0 && `(+${dataPlayer.sheet.attributes.charisma.bonus})` }</p>
                  <p className="text-xs pb-1">({ calculateMod(charisma + dataPlayer.sheet.attributes.charisma.bonus) })</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {
        session.attributeDistribution.find((atrDist: any) => atrDist.name === 'fixed' || atrDist.name === 'personalized' || atrDist.name === 'rolling') && <div>
          É necessário que o Narrador decida quais os métodos de distribuição de atributo serão usados para esta crônica
        </div>
      }
      <div className="w-full flex justify-between col-span-10 py-3">
        <button
          onClick={ () => setOptionGuide('class') }
          className="break-words items-center justify-center text-sm font-medium hover:text-white p-2 border-2 border-white"
          >
            Anterior
        </button>
        {
          session.attributeDistribution.find((atrDist: any) => atrDist.name === 'fixed' || atrDist.name === 'personalized' || atrDist.name === 'rolling') &&
          <button
            onClick={ async (e:any) => {
              if (type === 'personalized') verifyCost();
              else updateAttributes();
              e.stopPropagation();
            }}
            className="break-words items-center justify-center text-sm font-medium hover:text-white p-2 border-2 border-white"
            >
              Concluir
          </button>
        }
      </div>
    </div>
  )
}