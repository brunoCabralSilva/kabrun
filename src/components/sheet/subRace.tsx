import { useContext, useEffect, useState } from "react";
import contexto from "../../context/context";
import races from '../../data/races.json';
import listRaces from '../../data/races.json';
import { updateDataPlayer } from "../../firebase/players";
import { applySubRace } from "../../firebase/utilitiesRaces";

export default function SubRaces() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [subRace, setSubRace] = useState<any>(null);
  const [subRaceSelected, setSubRaceSelected] = useState<any>(null);
  const [race, setRace] = useState<any>(null);
  const { showSheet, session, players, returnAttribute, setShowMessage, calculateMod, setOptionGuide } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
    const listRacesData = listRaces.find((racesItem: any) => racesItem.name === findPlayer.sheet.race);
    setRace(listRacesData);
    if (listRacesData) {
      const listSubRaces = listRacesData.subraces.find((subRaceItem: any) => subRaceItem.name === findPlayer.sheet.subRace);
      setSubRaceSelected(listSubRaces);
      setSubRace(findPlayer.sheet.subRace);
    }
  }, [session, players]);

  const updateData = async () => {
    console.log(subRace);
    if (subRace === '' || subRace === null) setShowMessage({ show: true, text: 'Necessário preencher uma Raça para continuar' });
    else {
      const playerData = dataPlayer;
      playerData.sheet = applySubRace(playerData.sheet, subRace, calculateMod);
      playerData.sheet.subRace = subRace;
      await updateDataPlayer(session.id, playerData, setShowMessage);
      setOptionGuide('class');
    }
  };
  
  if (dataPlayer)
    return(
      <div className="flex flex-col gap-2 h-90vh overflow-y-auto p-4 w-full justify-start items-center relative bg-gray-whats-dark border-white border-2">
        <div className="capitalize w-full">
          <span className="pr-3 pb-3">Escolha uma SubRaça</span>
          <div className="w-full grid grid-cols-4 gap-3 mt-3">
            {
              race && race.subraces.map((itemSubRace: any, index: number) => (
              <button
                type="button"
                key={index}
                onClick={ () => {
                  setSubRace(itemSubRace.name);
                  setSubRaceSelected(race.subraces.find((subRacesItem: any) => subRacesItem.name === itemSubRace.name));
                }}
                className={`${itemSubRace.name === subRace && 'bg-black'} box-select flex items-center justify-center w-full col-span-1 p-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>{ itemSubRace.name }</div>
              </button>
              ))
            }
          </div>
          <div className="">
            {
              subRaceSelected &&
              <div
                className="mt-4 p-3 border-2 border-white text-justify h-full"
              >
                <p className="text-xl pb-2 font-bold capitalize">{ subRaceSelected.name }</p>
                <div className="flex pt-1">
                  <span className="font-bold pr-1">Bônus em Habilidade:</span>
                  <div className="flex font-normal">
                    <div>
                      <span className="pr-1">
                        {`+ ${ subRaceSelected.value ? subRaceSelected.value : 1 } em ${ returnAttribute(subRaceSelected.attribute)}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    subRaceSelected.skills.map((skill: any, index2: number) => (
                      <div key={ index2 }>
                        {
                          skill.name !== ''
                          &&  <span className="capitalize font-bold">
                                {skill.name}
                              </span> }
                              <span className="px-1">-</span>
                              <span className="font-normal">
                                { skill.description }
                              </span>
                      </div>
                    ))
                  }
                </div>
              </div>
            }
          </div>
        </div> 
        <div className="h-full w-full flex flex-col justify-start items-center">
          {
            races
            .filter((itemRace: any) => itemRace.name === subRace)
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
                      .filter((itemRace: any) => itemRace.name === subRace)
                      .flatMap((itemRace: any) =>
                        itemRace.subraces.map((subrace: any, index: number) => (
                          <option key={index} value={subrace.name}>
                            {subrace.name}
                          </option>
                        ))
                    )}
                  </select>
                </div>
              </div>
            </div>
          } 
          <div className="w-full flex justify-between col-span-10 py-3">
            <button
              onClick={ () => setOptionGuide('race') }
              className="break-words items-center justify-center text-sm font-medium hover:text-white p-2 border-2 border-white"
              >
                Anterior
            </button>
            <button
              onClick={ updateData }
              className="break-words items-center justify-center text-sm font-medium hover:text-white p-2 border-2 border-white"
              >
                Próximo
            </button>
          </div>
        </div>
      </div>
  );
}