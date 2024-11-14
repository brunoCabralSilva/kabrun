import { useContext, useEffect, useState } from "react";
import { updateDataPlayer } from "../../../firebase/players";
import contexto from "../../../context/context";
import { FaRegSave } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

export default function Name() {
  const [name, setName] = useState('');
  const [editName, setEditName] = useState(false);
  const [dataPlayer, setDataPlayer] = useState<any>(null);

  const { session, showSheet, players, setShowMessage, setShowSheet } = useContext(contexto);

  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) {
      setDataPlayer(findPlayer);
      setName(findPlayer.sheet.name);
    } else setShowSheet({ show: false, id: '' });
  }, [session, players]);

  return(
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
            onClick={ async (e:any) => {
              if (dataPlayer.sheet.name !== name) {
                dataPlayer.sheet.name = name;
                await updateDataPlayer(session.id, dataPlayer, setShowMessage);
              }
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
  );
}