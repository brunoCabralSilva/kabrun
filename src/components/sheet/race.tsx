import { useContext, useEffect, useState } from "react";
import contexto from "../../context/context";
import listRaces from '../../data/races.json';
import { updateDataPlayer } from "../../firebase/players";
import { applyRace, applySubRace } from "../../firebase/utilitiesRaces";

export default function Race() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [race, setRace] = useState<any>(null);
  const [raceSelected, setRaceSelected] = useState<any>(null);
  const { showSheet, session, players, returnAttribute, setShowMessage, calculateMod, setOptionGuide } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
    setRaceSelected(listRaces.find((racesItem: any) => racesItem.name === findPlayer.sheet.race));
    setRace(findPlayer.sheet.race);
  }, [session, players]);

  const updateData = async () => {
    if (race === '') setShowMessage({ show: true, text: 'Necessário preencher uma Raça para continuar' });
    else {
      const playerData = dataPlayer;
      playerData.sheet = applyRace(playerData.sheet, race, calculateMod);
      playerData.sheet.race = race;
      const listRacesData = listRaces.find((racesItem: any) => racesItem.name === playerData.sheet.race);
      if (listRacesData) {
        const listSubRaces = listRacesData.subraces.find((subRaceItem: any) => subRaceItem.name === playerData.sheet.subRace);
        if (!listSubRaces) {
          playerData.sheet = applySubRace(playerData.sheet, '', calculateMod);
          playerData.sheet.subRace = '';
        }
      }
      await updateDataPlayer(session.id, playerData, setShowMessage);
      setOptionGuide('subrace');
    }
  };
  
  if (dataPlayer)
    return(
      <div className="flex flex-col gap-2 h-90vh overflow-y-auto p-4 w-full justify-start items-center relative bg-gray-whats-dark border-white border-2">
        <div className="h-full w-full flex flex-col justify-start items-center">
          <div className="capitalize w-full">
            <span className="pr-3 pb-3">Escolha uma Raça</span>
            <div className="w-full grid grid-cols-4 gap-3 mt-3">
              {
                listRaces.map((itemRace: any, index: number) => (
                <button
                  type="button"
                  key={index}
                  onClick={ () => {
                    setRace(itemRace.name);
                    setRaceSelected(listRaces.find((racesItem: any) => racesItem.name === itemRace.name));
                  }}
                  className={`${itemRace.name === race && 'bg-black'} box-select flex items-center justify-center w-full col-span-1 p-3`}
                >
                  <div className="box__line box__line--top" />
                  <div className="box__line box__line--right" />
                  <div className="box__line box__line--bottom" />
                  <div className="box__line box__line--left" />
                  <div>{ itemRace.name }</div>
                </button>
                ))
              }
            </div>
            <div className="">
              {
                raceSelected &&
                <div
                  className="mt-4 p-3 border-2 border-white text-justify h-full"
                >
                  <p className="text-xl pb-2 font-bold capitalize">{ raceSelected.name }</p>
                  <div className="flex pt-1">
                    <span className="font-bold pr-1">Bônus em Habilidade:</span>
                    <div className="flex font-normal">
                      { 
                        raceSelected.attribute.map((attr: any, index2: number) => (
                          <div key={index2}>
                            <span className="pr-1">
                              {`+ ${ attr.value } em ${ returnAttribute(attr.name) }${(index2 + 1) === raceSelected.attribute.length ? '.' : ', '}`}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className="pt-1">
                    <span className="font-bold pr-1">Idade:</span>
                    <span className="font-normal">{ raceSelected.age }</span>
                  </div>
                  <div className="pt-1">
                    <span className="font-bold pr-1">Tendência:</span>
                    <span className="font-normal">{ raceSelected.alignment }</span>
                  </div>
                  <div className="pt-1">
                    <span className="font-bold pr-1">Tamanho:</span>
                    <span className="font-normal">{ raceSelected.size }</span>
                  </div>
                  <div className="pt-1">
                    <span className="font-bold pr-1">Deslocamento:</span>
                    <span className="font-normal">{ raceSelected.speed } metros </span>
                  </div>
                  <div>
                    {
                      raceSelected.skills.map((skill: any, index2: number) => (
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
          <div className="w-full flex justify-between col-span-10 py-3">
            <button
              onClick={ () => setOptionGuide('initials') }
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