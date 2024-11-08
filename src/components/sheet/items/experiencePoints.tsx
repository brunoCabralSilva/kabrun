import { useContext, useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import contexto from "../../../context/context";
import { updateDataPlayer } from "../../../firebase/players";

export default function ExperiencePoints() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [xp, setXp] = useState('');
  const [editXp, setEditXp] = useState(false);
  const { session, showSheet, players, setShowMessage } = useContext(contexto);

  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
    setXp(findPlayer.sheet.xp);
  }, [session, players]);

  return(
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
                onClick={ async (e:any) => {
                  dataPlayer.sheet.xp = xp;
                  await updateDataPlayer(session.id, dataPlayer, setShowMessage);
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
  )
}