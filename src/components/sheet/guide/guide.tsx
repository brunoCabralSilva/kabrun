import { useContext, useEffect } from "react";
import { FaRegSave } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import contexto from "../../../context/context";
import DataStatic from "./dataStatic";
import DataAttributes from "./dataAttributes";
import DataSavingThrows from "./dataSavingThrows";
import DataSkills from "./dataSkills";
import DataImage from "./dataImage";
import listRaces from '../../../data/races.json';
import listAlignments from '../../../data/alignment.json';
import listClasses from '../../../data/classes.json';
import dnd from '../../../assets/dnd_black.png';
import DataSelector from "./dataSelector";
import SelectorAlignment from "./selectorAlignment";
import SelectorBackground from "./selectorBackground";
import SelectorClass from "./selectorClass";
import SelectorRace from "./selectorRace";
import SelectorSubrace from "./selectorSubrace";
import Attributes from "./attributes";

export default function Guide() {
  const { showSheet, session, players, setShowGuide, setShowSheet, provDataPlayer, setProvDataPlayer, showDataSelector, editAttributes } = useContext(contexto);

  const findPlayer = () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) setProvDataPlayer(findPlayer);
    else setShowSheet({ show: false, id: '' });
  }

  const verifyRace = () => {
    if (provDataPlayer && provDataPlayer.sheet) {
      if (provDataPlayer.sheet.race === '') return <div />
      else {
        const findRace = listRaces.find((race: any) => race.name === provDataPlayer.sheet.race);
        if (findRace) {
          if (findRace.subraces.length > 0) return <SelectorSubrace />
          return <div />
        } else <div />
      }
    } else <div />
  }

  useEffect(() => findPlayer(), [session, players]);

  return(
    <div className="bg-rule bg-cover text-black px-5 pb-5 fixed top-0 z-60 left-0 w-full h-screen flex flex-col justify-start items-center bg-gray-whats-dark">
      { showDataSelector.show && <DataSelector /> }
      { editAttributes && <Attributes /> }
      <div className="w-full flex justify-between items-center py-2">
        <FaRegSave
          className="text-3xl text-black cursor-pointer"
        />
        <img src={dnd} className="w-1/4 h-full object-cover" />
        <IoIosCloseCircleOutline
          className="text-4xl text-black cursor-pointer"
          onClick={ () => setShowGuide(false) }
        />
      </div>
      <div className="w-full grid grid-cols-4 gap-5">
        <div className="w-full col-span-4 box-attributes">
          <div className="box__line box__line--top" />
          <div className="box__line box__line--right" />
          <div className="box__line box__line--bottom" />
          <div className="box__line box__line--left relative" />
          <div className="grid grid-cols-3 gap-1 w-full p-5">
            <div className="w-full cursor-pointer">
              <div className="w-full pr-5">
                <input
                  type="text"
                  onClick={ (e: any) => {
                    setProvDataPlayer({
                      ...provDataPlayer,
                      sheet: { ...provDataPlayer.sheet, name: e.target.value },
                    });
                  }}
                  className="w-full border border-t-transparent border-l-transparent border-r-transparent border-b-black outline-none bg-transparent"
                />
              </div>
              <p className="text-sm font-bold pl-1">Nome do personagem</p>
            </div>
            <SelectorAlignment list={listAlignments} />
            <SelectorBackground list={[]} />
            <SelectorClass list={listClasses} />
            <SelectorRace list={listRaces} />
            { verifyRace() }
          </div>
        </div>
      </div>
      {
        provDataPlayer && provDataPlayer.sheet &&
        <div className="mt-3 col-span-1 grid grid-cols-11 gap-3">
          <DataStatic />
          <DataAttributes />
          <DataImage />
          <DataSavingThrows />
          <DataSkills />
        </div>
      }
    </div>
  );
}