import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import contexto from "../../../context/context";
import { updateDataPlayer } from "../../../firebase/players";

export default function EditLevel() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);

  const {
    session,
    showSheet,
    players,
    editLevel, setEditLevel,
    setShowMessage
  } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
  }, [session, players]);

  return(
    <div className="z-50 absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 px-3 sm:px-0 text-white">
      <div className="w-full sm:w-2/3 md:w-1/2 overflow-y-auto flex flex-col justify-center items-center relative bg-gray-whats-dark border-white border-2 p-4">
        <div className="pt-4 sm:pt-2 w-full flex justify-end">
          <IoIosCloseCircleOutline
            className="text-4xl text-white cursor-pointer"
            onClick={ () => setEditLevel({ show: false, type: '' }) }
          />
        </div>
        <div className="w-full text-center">
          { `Tem certeza que quer ${editLevel.type === 'up' ? 'Subir de Nível?' : ''} ${editLevel.type === 'down' ? 'Diminuir Nível?' : '' }`}
        </div>
        <div className="flex w-full gap-2">
          <button
            type="button"
            onClick={ () => setEditLevel({ show: false, type: '' }) }
            className="mt-5 mb-2 p-2 w-full text-center border-2 border-white text-white bg-black cursor-pointer font-bold transition-colors"
          >
            Não
          </button>
          <button
            type="button"
            onClick={ async () => {
              if (editLevel.type === 'up')
                dataPlayer.sheet.level = parseFloat(dataPlayer.sheet.level) + 1;
              if (editLevel.type === 'down')
                dataPlayer.sheet.level = parseFloat(dataPlayer.sheet.level) - 1;
              await updateDataPlayer(session.id, dataPlayer, setShowMessage);
              setEditLevel({ show: false, type: '' });
            } }
            className="mt-5 mb-2 p-2 w-full text-center border-2 border-white text-white bg-black cursor-pointer font-bold transition-colors"
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}