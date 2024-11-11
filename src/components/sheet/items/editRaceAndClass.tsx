import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline, IoIosInformationCircleOutline } from "react-icons/io";
import contexto from "../../../context/context";
import races from '../../../data/races.json';
import classList from '../../../data/classes.json';
import { updateDataPlayer } from "../../../firebase/players";
import { applyRace } from "../../../firebase/utilitiesRaces";

export default function EditRaceAndClass() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [race, setRace] = useState('');
  const [subRace, setSubRace] = useState('');
  const [classPlayer, setClassPlayer] = useState('');

  const { session, showSheet, players, setEditRaceAndClass, setShowMessage, calculateMod } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
    setRace(findPlayer.sheet.race);
    setSubRace(findPlayer.sheet.subRace);
    setClassPlayer(findPlayer.sheet.class);
  }, [session, players]);

  const updateRace = async () => {
    const dataPlayerSheet = dataPlayer;
    dataPlayerSheet.sheet = applyRace(dataPlayerSheet.sheet, race, subRace, calculateMod);
    dataPlayerSheet.sheet.race = race;
    dataPlayerSheet.sheet.subRace = subRace;
    dataPlayerSheet.sheet.class = classPlayer;
    await updateDataPlayer(session.id, dataPlayerSheet, setShowMessage);
    setEditRaceAndClass(false)
  }

  return(
    <div className="z-50 absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 px-3 sm:px-0 text-white">
      <div className="w-full sm:w-2/3 md:w-1/2 overflow-y-auto flex flex-col justify-center items-center relative bg-gray-whats-dark border-white border-2 p-4">
        <div className="pt-4 sm:pt-2 w-full flex justify-end">
          <IoIosCloseCircleOutline
            className="text-4xl text-white cursor-pointer"
            onClick={ () => setEditRaceAndClass(false) }
          />
        </div>
        <div className="w-full ">
          {/* classe */}
          <div className="capitalize w-full">
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
                      <option key={index} value={race.name}>{race.name}</option>
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
        <button
          type="button"
          className="mt-5 mb-2 p-2 w-full text-center border-2 border-white text-white bg-black cursor-pointer font-bold transition-colors"
          onClick={ async (e:any) => {
            updateRace();
            e.stopPropagation();
          }}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}