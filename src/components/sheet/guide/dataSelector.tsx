import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import { IoIosCloseCircleOutline } from "react-icons/io";
import listAlignments from '../../../data/alignment.json';
import listRace from '../../../data/races.json';
import listSkills from '../../../data/skills.json';
import listTalents from '../../../data/talents.json';
import listLanguages from '../../../data/languages.json';
import { applyRace } from "../../../firebase/utilitiesRaces";
import { insertRace, insertSubRace } from "../races/insertRace";

export default function DataSelector() {
  const [text, setText] = useState('');
  const [data, setData] = useState<any>(null);
  const [optional, setOptional] = useState<any>(null);
  const [talent, setTalent] = useState<any>(null);
  const [skillList, setSkillList] = useState<any>([]);
  const [newLanguage, setNewLanguage] = useState<string>('');
  const [listAttributes, setListAttributes] = useState<any>([]);
  const [dataBreath, setDataBreath] = useState<any>(null);
  const { showDataSelector, setShowDataSelector, setProvDataPlayer, provDataPlayer, session,
    returnDataAttribute, returnAttrSubrace, calculateMod, setShowMessage, returnAttribute } = useContext(contexto);

  useEffect(() => {
    if (showDataSelector.type === 'alignment') {
      const dataAlignment = listAlignments.find((alignment: any) => alignment.name === showDataSelector.value);
      if (dataAlignment) setText(dataAlignment.description);
    } else if (showDataSelector.type === 'race') {
      let dataRace: any = {};
      if (showDataSelector.value === 'Draconato') {
        dataRace = listRace.filter((itemList: any) => {
          if (session.books.includes("Fizban's Treasury of Dragons")) {
            return !itemList.type || itemList.type !== 2
          } return !itemList.type || itemList.type !== 1
        }).find((raceItem: any) => raceItem.name === showDataSelector.value);
      } else if (showDataSelector.value === 'Tiferino') {
        dataRace = listRace.filter((itemList: any) => {
          if (session.books.includes("Mordenkainen's Tome of Foes")) {
            return !itemList.type || itemList.type !== 2
          } return !itemList.type || itemList.type !== 1
        }).find((raceItem: any) => raceItem.name === showDataSelector.value);
      } else dataRace = listRace.find((raceItem: any) => raceItem.name === showDataSelector.value);
      if (dataRace) setData(dataRace);
    } else if (showDataSelector.type === 'subrace') {
      const dataRace = listRace.find((race: any) => race.name === provDataPlayer.sheet.race);
      if (dataRace) setData(dataRace);
    }
  }, []);

  const clearData = () => {
    setShowDataSelector({ show: false, type: '', value: '' });
    setOptional(false);
    setTalent(null);
    setSkillList([]);
    setListAttributes([]);
  }

  const setValue = () => {
    if (showDataSelector.type === 'alignment') {
      setProvDataPlayer( { ...provDataPlayer, sheet: { ...provDataPlayer.sheet, alignment: showDataSelector.value } });
      clearData();
    } else if (showDataSelector.type === 'race') {
      let apply = {};
      let findRace: any = {}
      if (showDataSelector.value === 'Draconato') {
        findRace = listRace.filter((itemList: any) => {
          if (session.books.includes("Fizban's Treasury of Dragons")) {
            return !itemList.type || itemList.type !== 2
          } return !itemList.type || itemList.type !== 1
        }).find((raceItem: any) => raceItem.name === showDataSelector.value);
      } else if (showDataSelector.value === 'Tiferino') {
        findRace = listRace.filter((itemList: any) => {
          if (session.books.includes("Mordenkainen's Tome of Foes")) {
            return !itemList.type || itemList.type !== 2
          } return !itemList.type || itemList.type !== 1
        }).find((raceItem: any) => raceItem.name === showDataSelector.value);
      } else findRace = listRace.find((raceItem: any) => raceItem.name === showDataSelector.value);
      if (findRace) {
        if (showDataSelector.value === 'Draconato' && session.books.includes("Fizban's Treasury of Dragons")) {
          if (newLanguage === '') setShowMessage({ show: true, text: 'É necessário selecionar um Idioma Adicional' });
          else {
            setProvDataPlayer({
              ...provDataPlayer,
              sheet: insertRace(
                provDataPlayer.sheet,
                calculateMod,
                returnAttribute,
                showDataSelector.value,
                findRace.attribute,
                session,
                skillList.map((itemSkill: any) => { return itemSkill.value }),
                newLanguage,
                null,
                null,
              ),
            });
            clearData();
          }
        } else if (showDataSelector.value === 'Draconato' && !session.books.includes("Fizban's Treasury of Dragons")) {
          if (!dataBreath) setShowMessage({ show: true, text: 'É necessário selecionar uma Herença Dracônica' });
          else {
            setProvDataPlayer({
              ...provDataPlayer,
              sheet: insertRace(
                provDataPlayer.sheet,
                calculateMod,
                returnAttribute,
                showDataSelector.value,
                findRace.attribute,
                session,
                skillList.map((itemSkill: any) => { return itemSkill.value }),
                newLanguage,
                dataBreath,
                null,
              ),
            });
            clearData();
          }
        } else if (showDataSelector.value === 'Humano') {
          if (newLanguage === '') setShowMessage({ show: true, text: 'É necessário selecionar um Idioma Adicional' });
          else if (optional) {
            if (listAttributes.length !== 2) setShowMessage({ show: true, text: 'É necessário selecionar um total de 2 Atributos' });
            else if (skillList.length !== 1) setShowMessage({ show: true, text: 'É necessário selecionar um total de 1 Perícia' });
            else if (!talent) setShowMessage({ show: true, text: 'É necessário selecionar um Talento' });
            else {
              setProvDataPlayer({
                ...provDataPlayer,
                sheet: insertRace(
                  provDataPlayer.sheet,
                  calculateMod,
                  returnAttribute,
                  showDataSelector.value,
                  [{ name: listAttributes[0], value: 1 }, { name: listAttributes[1], value: 1 }],
                  session,
                  skillList.map((itemSkill: any) => { return itemSkill.value }),
                  newLanguage,
                  null,
                  talent,
                ),
              });
              clearData();
            }
          } else {
            setProvDataPlayer({
              ...provDataPlayer,
              sheet:
                insertRace(
                  provDataPlayer.sheet,
                  calculateMod,
                  returnAttribute,
                  showDataSelector.value,
                  [
                    { name: 'strength', value: 1},
                    { name: 'dexterity', value: 1},
                    { name: 'constitution', value: 1},
                    { name: 'intelligence', value: 1},
                    { name: 'wisdom', value: 1},
                    { name: 'charisma', value: 1},
                  ],
                  session,
                  null,
                  newLanguage,
                  null,
                  null,
                ),
            });
            clearData();
          }
        } else if (showDataSelector.value === 'Meio Elfo') {
          if (newLanguage === '') setShowMessage({ show: true, text: 'É necessário selecionar um Idioma Adicional' });
          else if (listAttributes.length !== 2) setShowMessage({ show: true, text: 'É necessário selecionar um total de 2 Atributos' });
          else if (skillList.length !== 2) setShowMessage({ show: true, text: 'É necessário selecionar um total de 2 Perícias' });
          else {
            setProvDataPlayer({
              ...provDataPlayer,
              sheet: insertRace(
                provDataPlayer.sheet,
                calculateMod,
                returnAttribute,
                showDataSelector.value,
                [{ name: listAttributes[0], value: 1 }, { name: listAttributes[1], value: 1 }],
                session,
                skillList.map((itemSkill: any) => { return itemSkill.value }),
                newLanguage,
                null,
                null,
              ),
            });
            clearData();
          }
        } else {
          setProvDataPlayer({
            ...provDataPlayer,
            sheet:
              insertRace(
                provDataPlayer.sheet,
                calculateMod,
                returnAttribute,
                showDataSelector.value,
                findRace.attribute,
                session,
                null,
                null,
                null,
                null,
              ),
          });
          clearData();
        }
      }
    } else if (showDataSelector.type === 'subrace') {
      const findRace = listRace.find((raceItem: any) => raceItem.name === showDataSelector.value);
      if (findRace) {
        const findSubrace = findRace.subraces.find((raceItem: any) => raceItem.name === showDataSelector.value);
        if (findSubrace) {
          setProvDataPlayer({
            ...provDataPlayer,
            sheet: insertSubRace(provDataPlayer.sheet, calculateMod, showDataSelector.value, [{ value: findSubrace.value, name: findSubrace.attribute }]),
          });
          clearData();
        }
      }
    } else if (showDataSelector.type === 'class') {
      setProvDataPlayer({ ...provDataPlayer, sheet: { ...provDataPlayer.sheet, class: showDataSelector.value } });
      clearData();
    }
  }

  const returnTitle = () => {
    switch(showDataSelector.type) {
      case 'alignment': return 'este Alinhamento';
      case 'race': return 'esta Raça';
      case 'subrace': return "esta Subraça";
      default: '';
    }
  }

  const returnTitleItem = () => {
    switch(showDataSelector.type) {
      case 'alignment': return 'Alinhamento';
      case 'race': return 'Raça';
      case 'subrace': return "Subraça";
      default: '';
    }
  }

  const returnLanguageList = () => {
    if (showDataSelector.value === "Humano" || showDataSelector.value === 'Meio Elfo' || (showDataSelector.value === "Draconato" && session.books.includes("Fizban's Treasury of Dragons"))) {
      const findRace = listRace.find((raceItem: any) => raceItem.name === showDataSelector.value);
      if (findRace) {
        const filteredLanguages = listLanguages
        .filter(language => session.books.includes(language.book)) // Filtra por livro
        .filter(language => !findRace.languages.some((lang: any) => lang === language.name))
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));
        return(
          <div className="w-1/2">
            <div className="w-full gap-1">
              <p className="flex w-full mt-5 font-bold pb-2">Selecione um Idioma Adicional:</p>
              <div className="w-1/2 pb-5"></div>
              <div className="box-attributes flex items-center justify-center col-span-1 px-2 pt-1">
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div className="w-full">
                  <select
                    className="w-full text-left bg-transparent cursor-pointer outline-none pb-1"
                    value={ newLanguage }
                    onChange={ (e) => { setNewLanguage(e.target.value) }}
                  >
                    <option disabled value="">Idiomas</option>
                    {
                      filteredLanguages.map((language: any, index: number) => 
                        <option value={language.name} key={index}>
                          { language.name }
                        </option>
                      )
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
        )
      }
    } else return <div />
    return <div />
  }

  const returnBreathsDragonborn = () => {
    const findRace = listRace.find((raceItemFind: any) => raceItemFind.name === 'Draconato' && raceItemFind.type === 2);
    if (findRace && findRace.breaths) {
      return (
        <table className="w-full mt-3">
          <th className="border border-black p-1">Dragão</th>
          <th className="border border-black p-1">Tipo de Dano</th>
          <th className="border border-black p-1">Arma de Sopro</th>
          <th className="border border-black p-1">Salvaguarda</th>
          {
            findRace.breaths.map((breath: any, index: number) => (
              <tr
                key={ index }
                className={`${dataBreath && dataBreath.dragon === breath.dragon ? 'bg-black text-[#f0e9d2]' : 'bg-transparent text-black hover:bg-black/20 hover:text-black' } cursor-pointer transition-colors duration-400`}
                onClick={ () => setDataBreath(breath) }
              >
                <td className="text-center border border-black p-1">
                  { breath.dragon }
                </td>
                <td className="text-center border border-black p-1">
                  { breath.damage }
                </td>
                <td className="text-center border border-black p-1">
                  <span className="pr-1">{ breath.type } -</span>
                  <span  className="pr-1">
                    { breath.size.length > 1 ? `${breath.size[0] } x ${breath.size[1] } m`: `${breath.size[0]} m` }
                  </span>
                </td>
                <td className="text-center border border-black p-1">
                  { returnAttribute(breath.svg) }
                </td>
              </tr>
            ))
          }
        </table>
      )
    } return <div />
  }

  const returnAttrAndSkills = () => {
    if ((optional && showDataSelector.value === "Humano") || showDataSelector.value === "Meio Elfo") {
      return (
        <div>
          <div className="w-full grid grid-cols-6 gap-1 px-10">
            <p className="col-span-6 w-full mt-5 font-bold">Selecione dois Atributos para receber + 1:</p>
            <button className={`${listAttributes.includes('strength') ? 'bg-black text-[#f0e9d2]' : 'bg-transparent text-black'} transition-colors duration-400 border border-black px-2 py-1 w-full`} type="button" onClick={ () => setNewAttribute('strength')}>
              Força
            </button>
            <button className={`${listAttributes.includes('dexterity') ? 'bg-black text-[#f0e9d2]' : 'bg-transparent text-black'} transition-colors duration-400 border border-black px-2 py-1 w-full`} type="button" onClick={ () => setNewAttribute('dexterity')}>
              Destreza
            </button>
            <button className={`${listAttributes.includes('constitution') ? 'bg-black text-[#f0e9d2]' : 'bg-transparent text-black'} transition-colors duration-400 border border-black px-2 py-1 w-full`} type="button" onClick={ () => setNewAttribute('constitution')}>
              Constituição
            </button>
            <button className={`${listAttributes.includes('intelligence') ? 'bg-black text-[#f0e9d2]' : 'bg-transparent text-black'} transition-colors duration-400 border border-black px-2 py-1 w-full`} type="button" onClick={ () => setNewAttribute('intelligence')}>
              Inteligência
            </button>
            <button className={`${listAttributes.includes('wisdom') ? 'bg-black text-[#f0e9d2]' : 'bg-transparent text-black'} transition-colors duration-400 border border-black px-2 py-1 w-full`} type="button" onClick={ () => setNewAttribute('wisdom')}>
              Sabedoria
            </button>
            <button className={`${listAttributes.includes('charisma') ? 'bg-black text-[#f0e9d2]' : 'bg-transparent text-black'} transition-colors duration-400 border border-black px-2 py-1 w-full`} type="button" onClick={ () => setNewAttribute('charisma')}>
              Carisma
            </button>
          </div>
          <div className="w-full grid grid-cols-6 gap-1 px-10">
            <p className="col-span-6 w-full mt-5 font-bold">Selecione { showDataSelector.value === "Humano" ? '1 Perícia:': '2 Perícias:' }</p>
            {
              listSkills.map((skillItem: any, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    if (skillList.find((skl: any) => skl.name === skillItem.name)) {
                      setSkillList(skillList.filter((skl2: any) => skl2.name !== skillItem.name));
                    } else setSkillList([...skillList, skillItem]);
                  }}
                  className={`${skillList.find((skl: any) => skl.name === skillItem.name) ? 'bg-black text-[#f0e9d2]' : 'bg-transparent text-black'} transition-colors duration-400 border border-black px-2 py-1 w-full`}
                  type="button"
                >
                  { skillItem.name }
                </button>
              ))
            }
          </div>
        </div>
      );
    } else return <div />
  }

  const setNewAttribute = (attr: string) => {
    if (listAttributes.includes(attr))
      setListAttributes(listAttributes.filter((attributeItem: any) => attributeItem !== attr));
    else setListAttributes([...listAttributes, attr]);
  }

  return(
    <div className={`z-70 fixed top-0 left-0 w-full h-screen overflow-y-auto flex ${showDataSelector.type === 'race' || showDataSelector.type === 'subrace' ? 'items-start' : 'items-center'} justify-center py-5 bg-black/80 px-10`}>
      <div className={`${showDataSelector.type === 'race' || showDataSelector.type === 'subrace' ? 'w-full' : 'w-1/2'} flex ${showDataSelector.type === 'race' || showDataSelector.type === 'subrace' ? 'items-start' : 'items-center'}`}>
        <div className={`box-attributes flex flex-col justify-center items-center bg-rule bg-cover w-full`}>
          <div className="w-full flex items-center justify-end px-2 pt-2">
            <IoIosCloseCircleOutline
              className="text-4xl text-black cursor-pointer"
              onClick={ () => {
                setShowDataSelector({ show: false, type: '', value: '' })
                setOptional(false);
                setTalent(null);
                setSkillList([]);
                setListAttributes([]);
              }}
            />
          </div>
          <div className="box__line box__line--top"></div>
          <div className="box__line box__line--right"></div>
          <div className="box__line box__line--bottom"></div>
          <div className="box__line box__line--left"></div>
          <div className="flex flex-col items-center justify-center px-3 w-full">
            <div className="font-bold w-full text-center text-lg pb-3">{ returnTitleItem() } - { showDataSelector.value }</div>
            <div className="text-center w-full">{ text }</div>
            {
              showDataSelector.type === 'race' &&
              data &&
              data.name &&
              <div>
                <div>
                  <div className="w-full justify-start">
                    <span className="pr-1 font-bold">
                      Bônus de Atributo{ data.attribute.length > 1 && 's'}: 
                    </span>
                    <span>{ returnDataAttribute(data) }</span>
                  </div>
                  <div className="text-justify pt-1">
                    <span className="pr-1 font-bold">Idade:</span>
                    <span>{ data.age }</span>
                  </div>
                  <div className="text-justify pt-1">
                    <span className="pr-1 font-bold">Alinhamento:</span>
                    <span>{ data.alignment }</span>
                  </div>
                  <div className="text-justify pt-1">
                    <span className="pr-1 font-bold">Tamanho:</span>
                    <span>{ data.size }</span>
                  </div>
                  <div className="w-full text-justify pt-1">
                    <span className="pr-1 font-bold">Deslocamento:</span>
                    <span>{ data.speed } metros</span>
                  </div>
                  <div className="w-full text-justify pt-1">
                    <span className="pr-1 font-bold">Idiomas:</span>
                    {
                      data.languages.map((dataItem: any, index: number) => (
                        <span className="capitalize" key={index}>
                          { dataItem === 'other' ? 'outra' : dataItem }
                          { index === data.languages.length - 1 ? '' : ', ' }
                        </span>
                      ))
                    }
                  </div>
                  <div className="w-full text-justify pt-1">
                    {
                      data.characteristics.map((dataItem: any, index: number) => (
                        <div className=""key={index}>
                          <span className="pr-1 font-bold">{ dataItem.name }: </span>
                          <span>{ dataItem.description }</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="w-full"> { returnLanguageList() } </div>
                {
                  showDataSelector.value === 'Draconato' && !session.books.includes("Fizban's Treasury of Dragons")
                  &&
                  <div>
                    <p className="font-bold w-full pt-3">Escolha a sua Herança Dracônica: </p>
                    <div>{ returnBreathsDragonborn() }</div>
                  </div>
                }
                {
                  data.optionals &&
                  <div className="w-full text-justify pt-1">
                    <div className="font-bold flex items-center gap-2 py-3">
                      <div
                        className={`w-5 cursor-pointer h-5 border-2 border-black ${optional ? 'bg-black' : 'bg-white'}`}
                        onClick={ () => setOptional(!optional)}
                      />
                      <div className="w-full">
                        Marque se você deseja aplicar as Características Opcionais da Raça {showDataSelector.value} listadas abaixo ao invés de utilizar as Características acima:
                      </div>
                    </div>
                    <div>
                      <div className="w-full text-justify pl-7">
                        {
                          data.optionals.characteristics.map((dataItem: any, index: number) => (
                            <div className="pt-1" key={index}>
                              <span className="pr-1 font-bold">{ dataItem.name }: </span>
                              <span>{ dataItem.description }</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
            {
              showDataSelector.type === 'subrace' &&
              data &&
              data.name &&
              <div>
                <div className="w-full justify-start">
                  <span className="pr-1 font-bold">
                    Bônus de Atributo: 
                  </span>
                  <span>{ returnAttrSubrace(data, showDataSelector.value) }</span>
                </div>
                <div className="w-full text-justify pt-1">
                  {
                    data.skills.map((dataItem: any, index: number) => (
                      <div className=""key={index}>
                        <span className="pr-1 font-bold">{ dataItem.name }: </span>
                        <span>{ dataItem.description }</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            }
          </div>
          <div className="w-full">
            { returnAttrAndSkills() }
            {
              optional && showDataSelector.value === "Humano" &&
              <div className="w-full gap-1 px-10">
                <p className="flex w-full mt-5 font-bold pb-2">Selecione um Talento:</p>
                {
                  listTalents.map((talentItem: any, index: number) => (
                    <button
                      onClick={ () => setTalent(talentItem) }
                      key={index}
                      className={`${talent && talentItem.name === talent.name ? 'bg-black text-[#f0e9d2]' : 'bg-transparent text-black' } transition-colors duration-500 border border-black p-3 w-full flex flex-col mb-2`}
                      type="button"
                    >
                      <div className="font-bold pb-1">{ talentItem.name }</div>
                      <hr className="w-full h-0.5 bg-gray-500 " />
                      { talentItem.prerequisite && <div>Pré-Requisito: { talentItem.prerequisite }</div> }
                      <div className="w-full text-left">Descrição: { talentItem.description }</div>
                      <div className="w-full flex flex-col items-start">
                        {
                          talentItem.benefits.map((benefit: string, index2: number) => (
                            <div className="w-full flex justify-start text-left" key={index2}> - { benefit }</div>
                          ))
                        }
                      </div>
                    </button>
                  ))
                }
              </div>
            }
          </div>
          <div className="pt-5">Deseja selecionar { returnTitle() }?</div>
          <div className="w-full flex items-center justify-center px-5 gap-2 py-5">
            <button
              type="button"
              onClick={ setValue }
              className="p-2 border border-black w-full bg-green-700 hover:bg-green-900 text-white font-bold transition-all duration-400"
            >
              Sim
            </button>
            <button
              type="button"
              onClick={ () => {
                setShowDataSelector({ show: false, type: '', value: '' });
                setOptional(false);
                setTalent(null);
                setSkillList([]);
                setListAttributes([]);
              }}
              className="p-2 border border-black w-full bg-red-700 hover:bg-red-900 text-white font-bold transition-all duration-400"
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}