import { useContext, useEffect, useState } from "react";
import contexto from "../../context/context";
import Loading from "../loading";
import DefaultData from "./defaultData";
import races from '../../data/races.json';
import classList from '../../data/classes.json';
import { FiEdit } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { FaCircleDown, FaCircleUp } from "react-icons/fa6";

export default function General() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const { session, showSheet, players } = useContext(contexto);
  const [name, setName] = useState('');
  const [race, setRace] = useState('');
  const [subRace, setSubRace] = useState('');
  const [classPlayer, setClassPlayer] = useState('');
  const [editName, setEditName] = useState(false);
  const [editRaceAndClass, setEditRaceAndClass] = useState(false);

  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
    setName(findPlayer.sheet.name);
    setRace(findPlayer.sheet.race);
    setSubRace(findPlayer.sheet.subRace);
    setClassPlayer(findPlayer.sheet.class);
  }, [session, players]);

  const returnHitPoints = () => {
    const total = dataPlayer.sheet.hitPoints.total + dataPlayer.sheet.hitPoints.temporary;
    const actual = dataPlayer.sheet.hitPoints.actual;
    const percentage = (actual / total) * 100;
    const filledSquares = Math.floor((percentage / 100) * 20);
    let color = 'bg-green-700';
    if (total * 0.3 >= actual) color = 'bg-red-700';
    else if (total * 0.5 >= actual) color = 'bg-yellow-800';
  
    return (
      <div className="col-span-3 w-full border-t-2 border-r-2 border-b-2 text-right rounded-r">
        <div
          title="Alterar Pontos de Vida"
          className="h-7 w-full grid grid-cols-20 relative cursor-pointer"
        >
          <div className="absolute w-full h-full flex justify-start items-center pl-2 text-md">
            {dataPlayer.sheet.hitPoints.actual} / {dataPlayer.sheet.hitPoints.total} {dataPlayer.sheet.hitPoints.temporary > 0 && `+ ${dataPlayer.sheet.hitPoints.temporary}`}
          </div>
          {
            Array(20).fill(null).map((_, index) => (
              <div
                key={index}
                className={`w-full h-full ${index < filledSquares ? color : ''} ${index === filledSquares - 1 ? 'rounded-r' : ''}`}
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
            <div className="grid grid-cols-4 gap-4 mt-2 text-sm">
              <div className="mt-4"> 
                <div className="box flex items-center justify-center w-full col-span-1">
                  <div className="box__line box__line--top"></div>
                  <div className="box__line box__line--right"></div>
                  <div className="box__line box__line--bottom"></div>
                  <div className="box__line box__line--left"></div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">{ dataPlayer.sheet.iniciative }</p>
                    <p className="text-xs pb-1">Iniciativa</p>
                  </div>
                </div>
              </div>
              <div className="mt-4"> 
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
              <div className="mt-4"> 
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
              <div className="mt-4"> 
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
                        onClick={ () => {} }
                      >
                        <IoIosInformationCircleOutline className="text-3xl mt-2 cursor-pointer" />
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
                        onClick={ () => {} }
                      >
                        <IoIosInformationCircleOutline
                          className="text-3xl mt-2 cursor-pointer"
                        />
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
                        onClick={ () => {} }
                      >
                        <IoIosInformationCircleOutline
                          className="text-3xl mt-2 cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className="grid grid-cols-2 w-full mt-5 gap-3">
            </div>
              <DefaultData
                value={ dataPlayer.sheet.deathSaves.successes + dataPlayer.sheet.deathSaves.failures }
                title="Testes contra a Morte"
              />
              <DefaultData
                value={ dataPlayer.sheet.carryingCapacity }
                title="Carga"
              />
              <DefaultData
                value={ dataPlayer.sheet.languages }
                title="Linguagens"
              />
              <DefaultData
                value={ dataPlayer.sheet.alignment }
                title="Alinhamento"
              />
              <DefaultData
                value={ dataPlayer.sheet.conditions }
                title="Condições"
              />
              <DefaultData
                value={ dataPlayer.sheet.xp }
                title="XP"
              />
            
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