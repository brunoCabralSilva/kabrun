import { useContext, useEffect, useState } from "react";
import contexto from "../../context/context";
import Loading from "../loading";
import { FiEdit } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { FaCircleDown, FaCircleUp } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import races from '../../data/races.json';
import classList from '../../data/classes.json';
import listLanguages from '../../data/languages.json';

export default function General() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const { session, showSheet, players } = useContext(contexto);
  const [name, setName] = useState('');
  const [race, setRace] = useState('');
  const [xp, setXp] = useState('');
  const [subRace, setSubRace] = useState('');
  const [alignment, setAlignment] = useState('');
  const [classPlayer, setClassPlayer] = useState('');
  const [languagesNotAdded, setLanguagesNotAdded] = useState<any>([]);
  const [languagesAdded, setLanguagesAdded] = useState<any>([]);
  const [newLanguage, setNewLanguage] = useState('');
  const [editName, setEditName] = useState(false);
  const [editRaceAndClass, setEditRaceAndClass] = useState(false);
  const [editXp, setEditXp] = useState(false);
  const [editLanguages, setEditLanguages] = useState(false);
  const [colorDeathSaves, setColorDeathSaves] = useState(false);

  var conditions = [{ name: 'weakness', color: 'bg-pink-700' }, { name: 'weakness', color: 'bg-yellow-700' }, { name: 'weakness', color: 'bg-orange-700' }, { name: 'weakness', color: 'bg-blue-700' }, { name: 'weakness', color: 'bg-green-700' }, ];

  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
    setName(findPlayer.sheet.name);
    setRace(findPlayer.sheet.race);
    setSubRace(findPlayer.sheet.subRace);
    setClassPlayer(findPlayer.sheet.class);
    setAlignment(findPlayer.sheet.alignment);
    setXp(findPlayer.sheet.xp);
    const filteredLanguages = listLanguages.filter(language => !findPlayer.sheet.languages.includes(language.name)).map((language: any) => language.name).sort();
    setLanguagesNotAdded(filteredLanguages);
    setLanguagesAdded(findPlayer.sheet.languages);
  }, [session, players]);

  const returnHitPoints = () => {
    const total = dataPlayer.sheet.hitPoints.total + dataPlayer.sheet.hitPoints.temporary;
    const actual = dataPlayer.sheet.hitPoints.actual;
    const temporary = dataPlayer.sheet.hitPoints.temporary;
    const percentage = (actual / total) * 100;
    const filledSquares = Math.floor((percentage / 100) * 30);
    const tempSquares = Math.floor((temporary / total) * 30);
  
    let color = 'bg-green-700';
    if (total * 0.3 >= actual) color = 'bg-red-700';
    else if (total * 0.5 >= actual) color = 'bg-yellow-800';
  
    return (
      <div className="col-span-3 w-full border-t-2 border-r-2 border-b-2 text-right rounded-r">
        <div
          title="Alterar Pontos de Vida"
          className="h-7 w-full grid grid-cols-30 relative cursor-pointer"
        >
          <div className={`absolute w-full h-full flex ${total * 0.5 <= actual ? 'justify-start pl-2' : 'justify-end pr-2'} items-center  text-md`}>
            {dataPlayer.sheet.hitPoints.actual} / {dataPlayer.sheet.hitPoints.total} {temporary > 0 && `+ ${temporary}`}
          </div>
          {
            Array(30).fill(null).map((_, index) => (
              <div
                key={index}
                className={`w-full h-full ${
                  index < filledSquares ? color : index < filledSquares + tempSquares ? 'bg-blue-700' : ''
                } ${index === filledSquares + tempSquares - 1 ? 'rounded-r' : ''}`}
              />
            ))
          }
        </div>
      </div>
    );
  };  

  return(
    <div className="">
      {
        dataPlayer && dataPlayer.sheet
        ? <div className="px-2">
            <div className="grid grid-cols-4 mt-2 text-sm">
              {/* Images */}
              <div className="z-50 box-image flex items-center justify-center w-full col-span-1 mt-2">
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left relative" />
                  <img
                    className="w-full h-full object-cover relative"
                    src={dataPlayer.sheet.profileImage}
                  />
                  <button
                    type="button"
                    title="Alterar Imagem do Personagem"
                    className="absolute z-50 bg-gray-whats-dark bottom-0 right-0 p-0.5 text-lg cursor-pointer rounded-tl"
                  >
                    <FiEdit />
                  </button>
              </div>
              <div className="flex flex-col col-span-3 justify-around items-between h-full py-2">
                { returnHitPoints() }
                {/* Nome */}
                <div
                  className="capitalize flex justify-between items-center mt-1 pl-2"
                  onClick={() => setEditName(true)}
                >
                  { 
                    editName
                    ? <input
                        type="text"
                        className="border-2 border-white text-white w-full mr-1 bg-black outline-none p-1"
                        placeholder="Nome"
                        value={ name }
                        onChange={(e) => {
                          const sanitizedValue = e.target.value.replace(/\s+/g, ' ');
                          setName(sanitizedValue);
                        }}
                      />
                    : <div className="w-full">
                        { name }
                      </div>
                  }
                  { 
                    editName
                    ? 
                      <button
                        type="button"
                        onClick={(e:any) => {
                          // updateValue('name', dataPlayer.name);
                          setEditName(false);
                          e.stopPropagation();
                        }}
                      >
                        <FaRegSave className="text-2xl" />
                      </button>
                    : <button
                        type="button"
                        title="Alterar Nome"
                        onClick={ (e:any) => {
                          setEditName(true);
                          e.stopPropagation();
                        }}
                      >
                        <FiEdit className="text-2xl" />
                      </button>
                  }
                </div>
                {/* Raça e Classe */}
                <div className="pl-2 flex w-full flex-between items-center">
                  <div className="w-full leading-4">
                    { 
                      race === ''
                        ? <span>Sem Raça</span>
                        : <span className="pr-1 ">{ subRace ? subRace : race }</span>
                    }
                    {
                      classPlayer === ''
                        ? <span className="pl-1 ">/ Sem Classe</span>
                        : <span>{ classPlayer }</span>
                    }
                  </div>
                  { 
                    editRaceAndClass
                    ? 
                      <button
                        type="button"
                        onClick={(e:any) => {
                          // updateValue('name', dataPlayer.name);
                          setEditRaceAndClass(false);
                          e.stopPropagation();
                        }}
                      >
                        <FaRegSave className="text-2xl" />
                      </button>
                    : <button
                        type="button"
                        title="Alterar Raça e Classe"
                        onClick={ (e:any) => {
                          setEditRaceAndClass(true);
                          e.stopPropagation();
                        }}
                      >
                        <FiEdit className="text-2xl" />
                      </button>
                  }
                </div>
                {/* Nível */}
                <div className="w-full flex justify-between items-center pl-2 ">
                  {
                    <div className="w-full">
                    Nível { dataPlayer.sheet.level }
                  </div>
                  }
                  <button
                    type="button"
                    title="Subir de Nível"
                    className="bottom-0 right-0 p-0.5 text-xl cursor-pointer"
                  >
                    <FaCircleUp />
                  </button>
                  <button
                    type="button"
                    title="Diminuir Nível"
                    className="bottom-0 right-0 p-0.5 text-xl cursor-pointer"
                  >
                    <FaCircleDown />
                  </button>
                </div>
              </div>
            </div>
            {/* Condições */}
            <div className="w-full flex flex-wrap justify-start my-4 gap-1">
              <button
                type="button"
                title="Adicionar uma Condição"
                className={`w-6 h-6 rounded-full bg-gray-whats-dark hover:bg-white transition-colors duration-400 border-2 border-white text-white hover:text-black flex items-center justify-center text-xl cursor-pointer`}
              >
                <GoPlus />
              </button>
              {
                conditions.map((condition: any, index: number) => (
                <div key={index} className={`w-6 h-6 rounded-full ${condition.color}`}>

                </div>
                ))
              }
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              {/* Iniciativa */}
              <button
                type="button"
                className="hover:bg-white hover:text-gray-whats-dark transition-colors duration-400"
                title={`Rolar Iniciativa (1d20 + Mod. Destreza ${dataPlayer.sheet.attributes.dexterity.mod})`}
              > 
                <div className="box flex items-center justify-center w-full col-span-1">
                  <div className="box__line box__line--top"></div>
                  <div className="box__line box__line--right"></div>
                  <div className="box__line box__line--bottom"></div>
                  <div className="box__line box__line--left"></div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">{ dataPlayer.sheet.attributes.dexterity.mod }</p>
                    <p className="text-xs pb-1">Iniciativa</p>
                  </div>
                </div>
              </button>
              {/* Armor Class */}
              <div className=""> 
                <div className="box flex items-center justify-center w-full col-span-1">
                  <div className="box__line box__line--top"></div>
                  <div className="box__line box__line--right"></div>
                  <div className="box__line box__line--bottom"></div>
                  <div className="box__line box__line--left"></div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">{ dataPlayer.sheet.armorClass }</p>
                    <p className="text-xs pb-1">CA</p>
                  </div>
                </div>
              </div>
              {/* Deslocamento */}
              <div className=""> 
                <div className="box flex items-center justify-center w-full col-span-1">
                  <div className="box__line box__line--top"></div>
                  <div className="box__line box__line--right"></div>
                  <div className="box__line box__line--bottom"></div>
                  <div className="box__line box__line--left"></div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">{ dataPlayer.sheet.speed }</p>
                    <p className="text-xs pb-1">Desloc.</p>
                  </div>
                </div>
              </div>
              {/* Inspiração */}
              <div className=""> 
                <div className="box flex items-center justify-center w-full col-span-1">
                  <div className="box__line box__line--top"></div>
                  <div className="box__line box__line--right"></div>
                  <div className="box__line box__line--bottom"></div>
                  <div className="box__line box__line--left"></div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">{ dataPlayer.sheet.inspiration }</p>
                    <p className="text-xs pb-1">Inspiração</p>
                  </div>
                </div>
              </div>
              {/* Testes contra a Morte */}
              <button
                type="button"
                title="Realizar Teste de Morte"
                onMouseEnter ={ () => setColorDeathSaves(true)}
                onMouseLeave={ () => setColorDeathSaves(false)}
                className="flex col-span-2 hover:bg-white hover:text-gray-whats-dark transition-colors duration-400"
              >
                <div className="h-full relative flex items-center justify-center w-full">
                  <div className="box__line box__line--top"></div>
                  <div className="box__line box__line--right"></div>
                  <div className="box__line box__line--bottom"></div>
                  <div className="box__line box__line--left"></div>
                  <div className="flex flex-col">
                    <div className="w-full text-center mt-2">
                      Testes contra a Morte
                    </div>
                    <div className="p-2 grid grid-cols-2 gap-2">
                      <div className="text-xs">
                          <p className="pb-1 w-full text-center">Sucessos</p>
                          <div className="flex gap-1 justify-center">
                            <div
                              className={`w-4 h-4 ${colorDeathSaves ? 'border-black' : 'border-white' } border rounded-full ${ dataPlayer.sheet.deathSaves.successes >= 1 && 'bg-green-700'}`}
                            />
                            <div
                              className={`w-4 h-4 ${colorDeathSaves ? 'border-black' : 'border-white' } border rounded-full ${ dataPlayer.sheet.deathSaves.successes >= 2 && 'bg-green-700'}`}
                            />
                            <div
                              className={`w-4 h-4 ${colorDeathSaves ? 'border-black' : 'border-white' } border rounded-full ${ dataPlayer.sheet.deathSaves.successes === 3 && 'bg-green-700'}`}
                            />
                          </div>
                        </div>
                      <div className={`text-xs border-l ${colorDeathSaves ? 'border-black' : 'border-white' } pl-3`}>
                        <p className="pb-1 w-full text-center">Falhas</p>
                        <div className="flex gap-1  justify-center">
                          <div
                            className={`w-4 h-4 ${colorDeathSaves ? 'border-black' : 'border-white' } border rounded-full ${ dataPlayer.sheet.deathSaves.failures >= 1 && 'bg-red-700'}`}
                          />
                          <div
                            className={`w-4 h-4 ${colorDeathSaves ? 'border-black' : 'border-white' } border rounded-full ${ dataPlayer.sheet.deathSaves.failures >= 2 && 'bg-red-700'}`}
                          />
                          <div
                            className={`w-4 h-4 ${colorDeathSaves ? 'border-black' : 'border-white' } border rounded-full ${ dataPlayer.sheet.deathSaves.failures === 3 && 'bg-red-700'}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              {/* Capacidade de Carga */}
              <div className="col-span-2"> 
                <div className="h-full relative flex items-center justify-center w-full col-span-1">
                  <div className="box__line box__line--top"></div>
                  <div className="box__line box__line--right"></div>
                  <div className="box__line box__line--bottom"></div>
                  <div className="box__line box__line--left"></div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">0 / { dataPlayer.sheet.inspiration }</p>
                    <p className="text-xs pb-1">Capacidade de Carga</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Edição de Raça e Classe */}
            <div>
              {
                editRaceAndClass &&
                <div>
                  {/* Raça */}
                  <div className="mt-3 capitalize w-full">
                    <span className="pr-3 mb-3">Raça</span>
                    <div className="flex items-center gap-2">
                      <div className="box-select flex items-center justify-center w-full col-span-1 mt-2">
                        <div className="box__line box__line--top" />
                        <div className="box__line box__line--right" />
                        <div className="box__line box__line--bottom" />
                        <div className="box__line box__line--left" />
                        <select
                          className="w-full text-center py-1 bg-gray-whats-dark cursor-pointer outline-none"
                          value={race}
                          onChange={ (e) => {
                            setRace(e.target.value);
                            setSubRace('');
                          }}
                        >
                          <option disabled value="">Escolha uma Raça</option>
                          {
                            races.map((race: any, index: number) => (
                              <option
                                key={index}
                                value={race.name}
                              >
                                {race.name}
                              </option>
                            ))
                          }
                        </select>
                      </div>
                      <button
                        type="button"
                        className="rounded-full text-3xl mt-2 cursor-pointer hover:bg-white bg-gray-whats-dark transition-colors hover:text-black duration-400"
                        onClick={ () => {} }
                      >
                        <IoIosInformationCircleOutline />
                      </button>
                    </div>
                  </div>
                  {/* SubRaça */}
                  {
                    races
                    .filter((itemRace: any) => itemRace.name === race)
                    .flatMap((itemRace: any) => itemRace.subraces).length > 0
                    &&
                    <div className="mt-3 capitalize w-full">
                      <span className="pr-3 mb-3">SubRaça</span>
                      <div className="flex items-center gap-2">
                      <div className="box-select flex items-center justify-center w-full col-span-1 mt-2">
                        <div className="box__line box__line--top" />
                        <div className="box__line box__line--right" />
                        <div className="box__line box__line--bottom" />
                        <div className="box__line box__line--left" />
                        <select
                          className="w-full text-center py-1 bg-gray-whats-dark cursor-pointer outline-none"
                          value={subRace}
                          onChange={ (e) => setSubRace(e.target.value) }
                        >
                          <option disabled value="">Escolha uma SubRaça</option>
                          {
                            races
                            .filter((itemRace: any) => itemRace.name === race)
                            .flatMap((itemRace: any) =>
                              itemRace.subraces.map((subrace: any, index: number) => (
                                <option key={index} value={subrace.name}>
                                  {subrace.name}
                                </option>
                              ))
                          )}
                        </select>
                      </div>
                      <button
                        type="button"
                        className="rounded-full text-3xl mt-2 cursor-pointer hover:bg-white bg-gray-whats-dark transition-colors hover:text-black duration-400"
                        onClick={ () => {} }
                      >
                        <IoIosInformationCircleOutline />
                      </button>
                    </div>
                    </div>
                  }
                  {/* classe */}
                  <div className="mt-3 capitalize w-full">
                    <span className="pr-3 mb-3">Classe</span>
                    <div className="flex items-center gap-2">
                      <div className="box-select flex items-center justify-center w-full col-span-1 mt-2">
                        <div className="box__line box__line--top" />
                        <div className="box__line box__line--right" />
                        <div className="box__line box__line--bottom" />
                        <div className="box__line box__line--left" />
                        <select
                          className="w-full text-center py-1 bg-gray-whats-dark cursor-pointer outline-none"
                          value={ classPlayer }
                          onChange={ (e) => setClassPlayer(e.target.value) }
                        >
                          <option disabled value="">Escolha uma Classe</option>
                          {
                            classList
                              .sort((a: any, b: any) => a.name.localeCompare(b.name))
                              .map((classItem: any, index: number) => (
                              <option
                                key={index}
                                value={ classItem.name }
                              >
                                { classItem.name }
                              </option>
                            ))
                          }
                        </select>
                      </div>
                      <button
                        type="button"
                        className="rounded-full text-3xl mt-2 cursor-pointer hover:bg-white bg-gray-whats-dark transition-colors hover:text-black duration-400"
                        onClick={ () => {} }
                      >
                        <IoIosInformationCircleOutline />
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
            {/* Alinhamento */}
            <div className="mt-3 capitalize w-full">
              <span className="pr-3 mb-3">Alinhamento</span>
              <div className="flex items-center gap-2">
                <div className="box-select flex items-center justify-center w-full col-span-1 mt-2">
                  <div className="box__line box__line--top" />
                  <div className="box__line box__line--right" />
                  <div className="box__line box__line--bottom" />
                  <div className="box__line box__line--left" />
                  <select
                    className="w-full text-center py-1 bg-gray-whats-dark cursor-pointer outline-none"
                    value={alignment}
                    onChange={ (e) => {
                      setAlignment(e.target.value);
                    }}
                  >
                    <option disabled value="">Escolha um Alinhamento</option>
                    <option
                      title="É a tendência de criaturas que se pode contar para fazer o que é correto como é esperado pela sociedade. Dragões dourados, paladinos e muitos anões são ordeiros e bons."
                      value="Ordeiro e Bom"
                    >
                      Ordeiro e Bom
                    </option>
                    <option
                      title="É a tendência do povo que faz o melhor que pode para ajudar outros de acordo com suas necessidades. Muitos celestiais, alguns gigantes das nuvens, e grande parte dos gnomos são neutros e bons"
                      value="Neutro e Bom"
                      >
                      Neutro e Bom
                    </option>
                    <option
                      title="É a tendência de criaturas que agem de acordo com sua própria consciência, se importando pouco com as expectativas dos outros. Dragões de cobre, muitos elfos e unicórnios são caóticos e bons"
                      value="Caótico e Bom"
                    >
                      Caótico e Bom
                    </option>
                    <option
                      title="É a tendência dos indivíduos que agem de acordo com as leis, tradições ou códigos pessoais. Muitos monges e alguns magos são ordeiros e neutros"
                      value="Ordeiro e Neutro"
                    >
                      Ordeiro e Neutro
                    </option>
                    <option
                      title="É a tendência daqueles que preferem manter distância de questões morais e não tomar partido, fazendo o que aparenta ser melhor conforme a situação. O povo lagarto, muitos druidas e diversos humanos são neutros."
                      value="Neutro"
                    >
                      Neutro
                    </option>
                    <option
                      title="É a tendência das criaturas que seguem seus caprichos, mantendo sua liberdade pessoal acima de tudo. Muitos bárbaros e ladinos, e alguns  bardos, são caóticos e neutros"
                      value="Caótico e Neutro"
                    >
                      Caótico e Neutro
                    </option>
                    <option
                      title="É a tendência das criaturas que conseguem metodicamente tudo o que querem, dentro dos limites de uma tradição, lei ou ordem. Diabos, dragões azuis e hobgoblins são ordeiros e maus."
                      value="Ordeiro e Mau"
                    >
                      Ordeiro e Mau
                    </option>
                    <option
                      title="É a tendência daqueles que farão tudo o que quiserem, sem compaixão ou remorso. Muitos drow, alguns gigantes das nuvens e yugoloths são neutros e maus"
                      value="Neutro e Mau"
                    >
                      Neutro e Mau
                    </option>
                    <option
                      title="É a tendência de criaturas que agem com violência arbitrária, estimulada por sua ganância, ódio ou sede de sangue. Demônios, dragões vermelhos e orcs são caóticos e maus"
                      value="Caótico e Mau"
                    >
                      Caótico e Mau
                    </option>
                  </select>
                </div>
                <button
                  type="button"
                  className="rounded-full text-3xl mt-2 cursor-pointer hover:bg-white bg-gray-whats-dark transition-colors hover:text-black duration-400"
                  onClick={ () => {} }
                >
                  <IoIosInformationCircleOutline />
                </button>
              </div>
            </div>
            {/* Idiomas */}
            <div className="mt-3 capitalize w-full">
              <div className="pr-1 flex w-full justify-between mt-5">
                Idiomas
                { 
                  editLanguages
                  ? 
                    <button
                      type="button"
                      onClick={(e:any) => {
                        // updateValue('name', dataPlayer.name);
                        setEditLanguages(false);
                        e.stopPropagation();
                      }}
                    >
                      <FaRegSave className="text-2xl" />
                    </button>
                  : <button
                      type="button"
                      title="Alterar Raça e Classe"
                      onClick={ (e:any) => {
                        setEditLanguages(true);
                        e.stopPropagation();
                      }}
                    >
                      <FiEdit className="text-2xl" />
                    </button>
                }
              </div>
              <div className="">
                {
                  editLanguages &&
                  <div className="flex items-center gap-2">
                    <div className="box-select flex items-center justify-center w-full col-span-1 mt-2">
                      <div className="box__line box__line--top" />
                      <div className="box__line box__line--right" />
                      <div className="box__line box__line--bottom" />
                      <div className="box__line box__line--left" />
                      <select
                        className="w-full text-center py-1 bg-gray-whats-dark cursor-pointer outline-none"
                        value={newLanguage}
                        onChange={ (e) => setNewLanguage(e.target.value) }
                      >
                        <option disabled value="">Escolha um Idioma</option>
                        {
                          languagesNotAdded.map((language: any, index: number) => 
                            <option value={language} key={index}>
                              { language }
                            </option>
                          )
                        }
                      </select>
                    </div>
                    <button
                      type="button"
                      className="rounded-full text-3xl mt-2 cursor-pointer hover:bg-white bg-gray-whats-dark transition-colors hover:text-black duration-400"
                      onClick={ () => {
                        setLanguagesAdded([...languagesAdded, newLanguage].sort());
                        setLanguagesNotAdded(languagesNotAdded.filter((language: any) => language !== newLanguage).sort());
                        setNewLanguage('');
                      }}
                    >
                      <CiCirclePlus />
                    </button>
                  </div>
                }
                <div className="w-full flex flex-col mt-2">
                  {
                    languagesAdded.map((language: any, index: number) => (
                      <div key={index} className="flex items-center pl-3">
                        <p className="w-full">{language}</p>
                        <button
                          type="button"
                          onClick={ () => {
                            setLanguagesAdded(languagesAdded.filter((languageItem: any) => languageItem !== language).sort());
                            setLanguagesNotAdded([...languagesNotAdded, language].sort());
                            setNewLanguage('');
                          }}
                          className="rounded-full text-3xl mt-2 cursor-pointer hover:bg-white bg-gray-whats-dark transition-colors hover:text-black duration-400"
                        >
                          <CiCircleMinus />
                        </button>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            {/* Pontos de Experiência */}
            <div className="grid grid-cols-4 mt-5">
              <div className="box flex items-center justify-center w-full col-span-1">
                <div className="box__line box__line--top"></div>
                <div className="box__line box__line--right"></div>
                <div className="box__line box__line--bottom"></div>
                <div className="box__line box__line--left"></div>
                { 
                  editXp
                  ? <input
                      type="number"
                      className="text-white w-full h-full text-2xl bg-black text-center outline-none p-1 pl-3"
                      placeholder="XP"
                      value={ xp }
                      onChange={ (e) => setXp(e.target.value) }
                    />
                  : <div className="w-full h-full flex items-center justify-center text-2xl">{ xp }</div>
                }
              </div>
              <div className="py-2 col-span-3 w-full">
                <div className="border-t-2 border-r-2 border-b-2 w-full pl-4 pr-2 py-1 rounded-r flex justify-bewteen items-center">
                  <p className="w-full">Pontos de Experiência</p>
                  { 
                    editXp
                    ? 
                      <button
                        type="button"
                        onClick={(e:any) => {
                          // updateValue('name', dataPlayer.name);
                          setEditXp(false);
                          e.stopPropagation();
                        }}
                      >
                        <FaRegSave className="text-2xl" />
                      </button>
                    : <button
                        type="button"
                        title="Alterar Pontos de Experiência"
                        onClick={ (e:any) => {
                          setEditXp(true);
                          e.stopPropagation();
                        }}
                      >
                        <FiEdit className="text-2xl" />
                      </button>
                  }
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-5 mb-2 p-2 w-full text-center border-2 border-white text-white bg-red-800 cursor-pointer font-bold hover:bg-red-900 transition-colors"
              // onClick={() => setRemoveFromSession({show: true, gm }) }
            >
              Excluir Ficha
            </button>
          </div>
        : <Loading />
      }
    </div>
  )
}