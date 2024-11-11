import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import Loading from "../../loading";
import { FiEdit } from "react-icons/fi";
import { FaCircleDown, FaCircleUp } from "react-icons/fa6";
import Name from "../items/name";
import { Alignment } from "../items/alignment";
import ExperiencePoints from "../items/experiencePoints";
import Languages from "../items/languages";
import { MdDelete } from "react-icons/md";
import { updateDataPlayer } from "../../../firebase/players";

export default function General() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const {
    session,
    showSheet,
    players,
    setEditRaceAndClass,
    setEditHealthPoints,
    setEditPlayerImage,
    setEditLevel,
    setEditConditions,
    setShowMessage,
  } = useContext(contexto);
  const [colorDeathSaves, setColorDeathSaves] = useState(false);

  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
  }, [session, players]);

  const returnHitPoints = () => {
    const total = parseInt(dataPlayer.sheet.hitPoints.total) + parseInt(dataPlayer.sheet.hitPoints.temporary);
    const actual = dataPlayer.sheet.hitPoints.actual;
    const temporary = dataPlayer.sheet.hitPoints.temporary;
    const percentage = (actual / total) * 100;
    const filledSquares = Math.floor((percentage / 100) * 30);
    const tempSquares = Math.floor((temporary / total) * 30);
  
    let color = 'bg-green-700';
    if (total * 0.3 >= actual) color = 'bg-red-700';
    else if (total * 0.5 >= actual) color = 'bg-yellow-700';

    let colorTemporary = 'bg-green-800';
    if (total * 0.3 >= actual) colorTemporary = 'bg-red-900';
    else if (total * 0.5 >= actual) colorTemporary = 'bg-yellow-800';
  
    return (
      <button
        title="Alterar Pontos de Vida"
        onClick={ () => setEditHealthPoints(true) }
        className="col-span-3 w-full border-t-2 border-r-2 border-b-2 text-right rounded-r"
      >
        <div
          className="h-7 w-full grid grid-cols-30 relative cursor-pointer"
        >
          <div className={`absolute w-full h-full flex ${total * 0.3 <= actual ? 'justify-start pl-2' : 'justify-end pr-2'} items-center  text-md`}>
            {dataPlayer.sheet.hitPoints.actual} / {dataPlayer.sheet.hitPoints.total} {temporary > 0 && `+ ${temporary}`}
          </div>
          {
            Array(30).fill(null).map((_, index) => (
              <div
                key={index}
                className={`w-full h-full ${
                  index < filledSquares ? color 
                  : temporary > 0 && index <= filledSquares + tempSquares ? colorTemporary 
                  : ''
                }`}
              />
            ))
          }
        </div>
      </button>
    );
  };

  return(
    <div className="">
      {
        dataPlayer && dataPlayer.sheet
        ? <div className="px-2">
            <div className="grid grid-cols-4 mt-2 text-sm">
              {/* Images */}
              <div className="z-10 box-image flex items-center justify-center w-full col-span-1 mt-2">
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
                    onClick={ () => setEditPlayerImage(true) }
                    className="absolute z-50 bg-gray-whats-dark bottom-0 right-0 p-0.5 text-lg cursor-pointer rounded-tl"
                  >
                    <FiEdit />
                  </button>
              </div>
              <div className="flex flex-col col-span-3 justify-around items-between h-full py-2">
                { returnHitPoints() }
                <Name />
                {/* Raça e Classe */}
                <div className="pl-2 flex w-full flex-between items-center">
                  <div className="w-full leading-4">
                    { 
                      dataPlayer.sheet.race === ''
                        ? <span>Sem Raça</span>
                        : <span className="pr-1 ">{ dataPlayer.sheet.subRace ? dataPlayer.sheet.subRace : dataPlayer.sheet.race }</span>
                    }
                    {
                      dataPlayer.sheet.class === ''
                        ? <span className="pl-1 ">/ Sem Classe</span>
                        : <span>{ dataPlayer.sheet.class }</span>
                    }
                  </div>
                  <button
                    type="button"
                    title="Alterar Raça e Classe"
                    onClick={ (e:any) => {
                      setEditRaceAndClass(true);
                      e.stopPropagation();
                    }}
                  >
                    <FiEdit className="text-2xl" />
                  </button>
                </div>
                {/* Nível */}
                <div className="w-full flex justify-between items-center pl-2 ">
                  {
                    <div className="w-full">
                    Nível { dataPlayer.sheet.level }
                  </div>
                  }
                  {
                    dataPlayer.sheet.level !== 20 &&
                    <button
                      type="button"
                      title="Subir de Nível"
                      onClick={ () => setEditLevel({ show: true, type: 'up' }) }
                      className="bottom-0 right-0 p-0.5 text-xl cursor-pointer"
                    >
                      <FaCircleUp />
                    </button>
                  }
                  {
                    dataPlayer.sheet.level !== 1 &&
                    <button
                      type="button"
                      title="Diminuir Nível"
                      onClick={ () => setEditLevel({ show: true, type: 'down' }) }
                      className="bottom-0 right-0 p-0.5 text-xl cursor-pointer"
                    >
                      <FaCircleDown />
                    </button>
                  }
                </div>
              </div>
            </div>
            {/* Condições */}
            <div className="w-full flex flex-wrap justify-start items-center my-4 gap-1">
              <button
                type="button"
                title="Adicionar uma Condição"
                onClick={ () => setEditConditions(true) }
                className="rounded-full border border-white px-2 py-1 hover:bg-white hover:text-black text-sm transition-colors duration-400"
              >
                + Condição
              </button>
              {
                dataPlayer.sheet.conditions.map((condition: any, index: number) => (
                <div
                  key={index}
                  title={condition.title}
                  className="rounded-full border border-white px-2 py-1 flex items-center gap-2"
                >
                  <span className="text-sm">{ condition.name }</span>
                  <button
                    type="button"
                    title="Remover Condição"
                    className="rounded hover:bg-white hover:text-black flex items-center gap-2"
                    onClick={ async () => {
                      dataPlayer.sheet.conditions = dataPlayer.sheet.conditions.filter((cond: any) => cond.name !== condition.name);
                      await updateDataPlayer(session.id, dataPlayer, setShowMessage);
                    } }
                  >
                    <MdDelete />
                  </button>
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
                    <p className="text-2xl font-bold">0 / { (dataPlayer.sheet.attributes.strength.value + dataPlayer.sheet.attributes.strength.bonus) * 7.5 }</p>
                    <p className="text-xs pb-1">Capacidade de Carga</p>
                  </div>
                </div>
              </div>
            </div>
            <Alignment />
            <ExperiencePoints />
            <Languages />
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