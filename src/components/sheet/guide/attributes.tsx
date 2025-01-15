import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaBackward } from "react-icons/fa";
import { updateDataPlayer } from "../../../firebase/players";

export default function Attributes() {
  const { session, provDataPlayer, setShowMessage, calculateMod, setEditAttributes, setProvDataPlayer, players, showSheet, setShowSheet } = useContext(contexto);
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
  const [selected, setSelected] = useState(false);
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [bonusStrength, setBonusStrength] = useState(0);
  const [bonusDexterity, setBonusDexterity] = useState(0);
  const [bonusConstitution, setBonusConstitution] = useState(0);
  const [bonusIntelligence, setBonusIntelligence] = useState(0);
  const [bonusWisdom, setBonusWisdom] = useState(0);
  const [bonusCharisma, setBonusCharisma] = useState(0);

  const findPlayer = () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) setDataPlayer(findPlayer);
    else setShowSheet({ show: false, id: '' });
    setStrength(findPlayer.sheet.attributes.strength.value);
    setDexterity(findPlayer.sheet.attributes.dexterity.value);
    setConstitution(findPlayer.sheet.attributes.constitution.value);
    setIntelligence(findPlayer.sheet.attributes.intelligence.value);
    setWisdom(findPlayer.sheet.attributes.wisdom.value);
    setCharisma(findPlayer.sheet.attributes.charisma.value);
    if (findPlayer.sheet.chooseAttribute) {
      setListNumbers([findPlayer.sheet.attributes.strength.value, findPlayer.sheet.attributes.dexterity.value, findPlayer.sheet.attributes.constitution.value, findPlayer.sheet.attributes.intelligence.value, findPlayer.sheet.attributes.wisdom.value, findPlayer.sheet.attributes.charisma.value]);
    }
    const bonusItemStr = provDataPlayer.sheet.attributes.bonus.filter((bonusItem: any) => bonusItem.name === 'strength');
    let bonusStr = 0;
    for (let i = 0; i < bonusItemStr.length; i += 1) {
      bonusStr += bonusItemStr[i].value;
    }
    const bonusItemDex = provDataPlayer.sheet.attributes.bonus.filter((bonusItem: any) => bonusItem.name === 'dexterity');
    let bonusDex = 0;
    for (let i = 0; i < bonusItemDex.length; i += 1) {
      bonusDex += bonusItemDex[i].value;
    }
    const bonusItemCon = provDataPlayer.sheet.attributes.bonus.filter((bonusItem: any) => bonusItem.name === 'constitution');
    let bonusCon = 0;
    for (let i = 0; i < bonusItemCon.length; i += 1) {
      bonusCon += bonusItemCon[i].value;
    }
    const bonusItemInt = provDataPlayer.sheet.attributes.bonus.filter((bonusItem: any) => bonusItem.name === 'intelligence');
    let bonusInt = 0;
    for (let i = 0; i < bonusItemInt.length; i += 1) {
      bonusInt += bonusItemInt[i].value
    }
    const bonusItemWis = provDataPlayer.sheet.attributes.bonus.filter((bonusItem: any) => bonusItem.name === 'wisdom');
    let bonusWis = 0;
    for (let i = 0; i < bonusItemWis.length; i += 1) {
      bonusWis += bonusItemWis[i].value;
    }
    const bonusItemCha = provDataPlayer.sheet.attributes.bonus.filter((bonusItem: any) => bonusItem.name === 'charisma');
    let bonusCha = 0;
    for (let i = 0; i < bonusItemCha.length; i += 1) {
      bonusCha += bonusItemCha[i].value;
    }
    setBonusStrength(bonusStr);
    setBonusDexterity(bonusDex);
    setBonusConstitution(bonusCon);
    setBonusIntelligence(bonusInt);
    setBonusWisdom(bonusWis);
    setBonusCharisma(bonusCha);
  }

  useEffect(() => findPlayer(), [provDataPlayer]);

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

  const sumCostGenerate = () => {
    const listValues = [strength, dexterity, constitution, intelligence, wisdom, charisma];
    let totalSum = 0;
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
  }

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
    const data = dataPlayer;
    if (type === 'rolling') data.sheet.chooseAttribute = true;
    data.sheet.attributes.strength.value = strength;
    data.sheet.attributes.strength.mod = calculateMod(strength + bonusStrength);
    data.sheet.attributes.dexterity.value = dexterity;
    data.sheet.attributes.dexterity.mod = calculateMod(dexterity + bonusDexterity);
    data.sheet.attributes.constitution.value = constitution;
    data.sheet.attributes.constitution.mod = calculateMod(constitution + bonusConstitution);
    data.sheet.attributes.intelligence.value = intelligence;
    data.sheet.attributes.intelligence.mod = calculateMod(intelligence + bonusIntelligence);
    data.sheet.attributes.wisdom.value = wisdom;
    data.sheet.attributes.wisdom.mod = calculateMod(wisdom + bonusWisdom);
    data.sheet.attributes.charisma.value = charisma;
    data.sheet.attributes.charisma.mod = calculateMod(charisma + bonusCharisma);
    setProvDataPlayer(data);
    setEditAttributes(false);
  }

  const rollRandomDices = async () => {
    const newNumbers = Array.from({ length: 6 }, () => roll4d6DropLowest());
    setType('rolling-dices');
    setListNumbers(newNumbers.sort((a, b) => b - a));
    setStrength(newNumbers[0]);
    setDexterity(newNumbers[1]);
    setConstitution(newNumbers[2]);
    setIntelligence(newNumbers[3]);
    setWisdom(newNumbers[4]);
    setCharisma(newNumbers[5]);
    dataPlayer.sheet.chooseAttribute = true;
    dataPlayer.sheet.attributes.strength.value = newNumbers[0];
    dataPlayer.sheet.attributes.strength.mod = calculateMod(newNumbers[0] + bonusStrength);
    dataPlayer.sheet.attributes.dexterity.value = newNumbers[1];
    dataPlayer.sheet.attributes.dexterity.mod = calculateMod(newNumbers[1] + bonusDexterity);
    dataPlayer.sheet.attributes.constitution.value = newNumbers[2];
    dataPlayer.sheet.attributes.constitution.mod = calculateMod(newNumbers[2] + bonusConstitution);
    dataPlayer.sheet.attributes.intelligence.value = newNumbers[3];
    dataPlayer.sheet.attributes.intelligence.mod = calculateMod(newNumbers[3] + bonusIntelligence);
    dataPlayer.sheet.attributes.wisdom.value = newNumbers[4];
    dataPlayer.sheet.attributes.wisdom.mod = calculateMod(newNumbers[4] + bonusWisdom);
    dataPlayer.sheet.attributes.charisma.value = newNumbers[5];
    dataPlayer.sheet.attributes.charisma.mod = calculateMod(newNumbers[5] + bonusCharisma);
    await updateDataPlayer(session.id, dataPlayer, setShowMessage);
    setShowConfirmation(false);
  }

  return(
    <div className="fixed top-0 z-70 left-0 w-full overflow-y-auto h-screen p-4 flex justify-center items-start bg-black/80">
      <div className="w-1/2 bg-rule bg-cover flex justify-center items-start">
        <div className="box-attributes h-full">
          <div className="w-full flex flex-col items-center justify-start">
            <div className="w-full flex justify-between items-center pt-5 px-2">
              {
                selected
                ? <FaBackward
                    className="pl-2 text-3xl text-black cursor-pointer"
                    onClick={ () => {
                      setSelected(false);
                      setType('');
                      setShowConfirmation(false);
                    }}
                  />
                : <div className="w-10" />
              }
              {
                !selected
                && provDataPlayer
                && provDataPlayer.sheet.level === 1
                && !provDataPlayer.sheet.chooseAttribute
                && (session.attributeDistribution.find((atrDist: any) => atrDist.name === 'rolling') || session.attributeDistribution.find((atrDist: any) => atrDist.name === 'personalized') || session.attributeDistribution.find((atrDist: any) => atrDist.name === 'fixed'))
                && <div className="font-bold text-lg">Escolha uma Distribuição de Atributos</div>
              }
              { type === 'fixed' && <div className="font-bold text-lg">Atributos Fixos</div> }
              { type === 'rolling' && <div className="font-bold text-lg">Atributos Rolando Dados</div> }
              { type === 'personalized' && <div className="font-bold text-lg">Atributos Personalizados</div> }
              {
                dataPlayer &&
                dataPlayer.sheet &&
                dataPlayer.sheet.chooseAttribute &&
                <div className="font-bold text-lg">
                  <p className="text-center">Você selecionou os Atributos rolando Dados</p>
                  <p className="text-center text-sm">(A ação não pode ser desfeita)</p>
                </div>
              }
              <IoIosCloseCircleOutline
                className="text-4xl text-black cursor-pointer"
                onClick={ () => setEditAttributes(false) }
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full px-5 pt-3 h-full">
              {
                !selected
                && provDataPlayer
                && provDataPlayer.sheet.level === 1
                && !provDataPlayer.sheet.chooseAttribute &&
                <div className="w-full px-2">
                  {
                     session.attributeDistribution.find((atrDist: any) => atrDist.name === 'fixed') &&
                    <button
                      type="button"
                      onClick={ () => {
                        setType('fixed');
                        setSelected(true);
                        setListNumbers([15, 14, 13, 12, 10, 8]);
                        if (provDataPlayer.sheet.attributes.strength.value === 0) {
                          setStrength(15);
                          setDexterity(14);
                          setConstitution(13);
                          setIntelligence(12);
                          setWisdom(10);
                          setCharisma(8);
                        } else {
                          var list = [strength, dexterity, constitution, intelligence, wisdom, charisma];
                          if (list.includes(15) && list.includes(14) && list.includes(13) && list.includes(12) && list.includes(11) && list.includes(10) && list.includes(8)) {
                            setStrength(provDataPlayer.sheet.attributes.strength.value);
                            setDexterity(provDataPlayer.sheet.attributes.dexterity.value);
                            setConstitution(provDataPlayer.sheet.attributes.constitution.value);
                            setIntelligence(provDataPlayer.sheet.attributes.intelligence.value);
                            setWisdom(provDataPlayer.sheet.attributes.wisdom.value);
                            setCharisma(provDataPlayer.sheet.attributes.charisma.value);
                          } else {
                            setStrength(15);
                            setDexterity(14);
                            setConstitution(13);
                            setIntelligence(12);
                            setWisdom(10);
                            setCharisma(8);
                          }
                        }
                      }}
                      className="w-full flex flex-col mb-2 font-bold"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="box flex items-center justify-center w-full col-span-1 mt-2 hover:bg-black hover:text-[#f0e9d2] transition-colors duration-400">
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
                        setSelected(true);
                        setType('personalized');
                        setListNumbers([15, 14, 13, 12, 11,10, 9, 8]);
                        if (provDataPlayer.sheet.attributes.strength.value === 0) {
                          setStrength(8);
                          setDexterity(8);
                          setConstitution(8);
                          setIntelligence(8);
                          setWisdom(8);
                          setCharisma(8);
                        } else {
                          setStrength(provDataPlayer.sheet.attributes.strength.value);
                          setDexterity(provDataPlayer.sheet.attributes.dexterity.value);
                          setConstitution(provDataPlayer.sheet.attributes.constitution.value);
                          setIntelligence(provDataPlayer.sheet.attributes.intelligence.value);
                          setWisdom(provDataPlayer.sheet.attributes.wisdom.value);
                          setCharisma(provDataPlayer.sheet.attributes.charisma.value);
                        }
                        sumCostGenerate();
                      }}
                      className="w-full flex flex-col mb-2"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="box flex items-center justify-center w-full col-span-1 mt-2 hover:bg-black hover:text-[#f0e9d2] transition-colors duration-400 font-bold">
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
                        setSelected(true);
                        setType('rolling');
                        setShowConfirmation(true);
                      }}
                      className="w-full flex flex-col mb-5"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="box flex items-center justify-center w-full col-span-1 mt-2 hover:bg-black hover:text-[#f0e9d2] transition-colors duration-400 font-bold">
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
                <div className="font-bold pb-2 text-lg">
                  Distribua nos Atributos abaixo os valores { formatList(listNumbers) }
                </div>
              }
              {
                type === 'personalized' &&
                <div>
                  Verifique o custo de cada valor de Atributo abaixo. Você tem um total de 27 pontos para distribuir entre eles:
                </div>
              }
              {
                showConfirmation && type === 'rolling' &&
                <div
                >
                  <div className="w-full text-center">
                    Para cada Atributo, serão rolados 4d6 e excluídos os piores resultados. Você poderá selecionar os resultados para os Atributos que desejar, mas a ação de rolar dados só pode ser feita uma única vez e desabilitará as outras opções de Atributos Fixos e Personalizados. Tem certeza que quer rolar dados para definir os atributos?
                  </div>
                  <div className="w-full flex items-center justify-center gap-2 py-5">
                    <button
                      className="p-2 border border-black w-full bg-green-700 hover:bg-green-900 text-white font-bold transition-all duration-400"
                      onClick={ rollRandomDices }
                    >
                      Sim
                    </button>
                    <button
                      className="p-2 border border-black w-full bg-red-700 hover:bg-red-900 text-white font-bold transition-all duration-400"
                      onClick={ () => {
                        setSelected(false);
                        setType('');
                        setShowConfirmation(false);
                      }}
                    >
                      Não
                    </button>
                  </div>
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
                <div className="font-bold">Total gasto: { sumCost } / 27</div>
              }
              {
                provDataPlayer && (type === 'fixed' || type === 'personalized' || (dataPlayer && dataPlayer.sheet && dataPlayer.sheet.chooseAttribute)) &&
                <div className="grid grid-cols-3 gap-4 w-full mb-5">
                  <div className="w-full gap-4 text-sm mt-3">
                    <div className=""> 
                      <div className="relative flex items-center justify-center w-full ">
                        <div className="box__line box__line--top"></div>
                        <div className="box__line box__line--right"></div>
                        <div className="box__line box__line--bottom"></div>
                        <div className="box__line box__line--left"></div>
                        <div className="flex flex-col items-center justify-center">
                          {
                            <select
                              value={strength}
                              className="text-2xl font-bold bg-transparent text-center outline-none"
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
                          }
                          <p className="text-xs pb-1">Força { bonusStrength !== 0 && `(+${bonusStrength})` }</p>
                          <p className="text-xs pb-1">({ calculateMod(strength + bonusStrength) })</p>
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
                          {
                            <select
                              value={dexterity}
                              className="text-2xl font-bold bg-transparent text-center outline-none"
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
                          }
                          <p className="text-xs pb-1">Destreza { bonusDexterity !== 0 && `(+${bonusDexterity})` }</p>
                          <p className="text-xs pb-1">({ calculateMod(dexterity + bonusDexterity) })</p>
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
                          {
                            <select
                                value={constitution}
                                className="text-2xl font-bold bg-transparent text-center outline-none"
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
                          }
                          <p className="text-xs pb-1">Constituição { bonusConstitution !== 0 && `(+${bonusConstitution})` }</p>
                          <p className="text-xs pb-1">({ calculateMod(constitution + bonusConstitution) })</p>
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
                          {
                            <select
                              value={intelligence}
                              className="text-2xl font-bold bg-transparent text-center outline-none"
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
                          }
                          <p className="text-xs pb-1">Inteligência { bonusIntelligence !== 0 && `(+${bonusIntelligence})` }</p>
                          <p className="text-xs pb-1">({ calculateMod(intelligence + bonusIntelligence) })</p>
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
                          {
                            <select
                                value={wisdom}
                                className="text-2xl font-bold bg-transparent text-center outline-none"
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
                          }
                          <p className="text-xs pb-1">Sabedoria { bonusWisdom !== 0 && `(+${bonusWisdom})` }</p>
                          <p className="text-xs pb-1">({ calculateMod(wisdom + bonusWisdom) })</p>
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
                          {
                            <select
                                value={charisma}
                                className="text-2xl font-bold bg-transparent text-center outline-none"
                                onChange={ (e: any) => {
                                  const selectedValue = parseInt(e.target.value);
                                  if (type !== 'personalized') {
                                    if (strength === selectedValue) setStrength(charisma);
                                    else if (dexterity === selectedValue) setDexterity(charisma); 
                                    else if (constitution === selectedValue) setConstitution(charisma);
                                    else if (intelligence === selectedValue) setIntelligence(charisma);
                                    else if (wisdom === selectedValue) setWisdom(charisma);
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
                          }
                          <p className="text-xs pb-1">Carisma { bonusCharisma !== 0 && `(+${bonusCharisma})` }</p>
                          <p className="text-xs pb-1">({ calculateMod(charisma + bonusCharisma) })</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {
                !session.attributeDistribution.find((atrDist: any) => atrDist.name === 'fixed' || atrDist.name === 'personalized' || atrDist.name === 'rolling') && <p className="text-center w-full font-bold">
                  É necessário que o Narrador decida quais os métodos de distribuição de atributo serão usados para esta crônica
                </p>
              }
              {
                !showConfirmation &&
                <div className="w-full flex justify-between col-span-10 py-3">
                  {
                    session.attributeDistribution.find((atrDist: any) => atrDist.name === 'fixed' || atrDist.name === 'personalized' || atrDist.name === 'rolling') &&
                    <button
                      onClick={ async (e:any) => {
                        if (type === 'personalized') verifyCost();
                        else updateAttributes();
                        e.stopPropagation();
                      }}
                      className="break-words items-center justify-center text-sm font-medium p-2 border-2 border-black w-full hover:bg-black hover:text-[#f0e9d2] transition-colors duration-400"
                      >
                        Concluído
                    </button>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}