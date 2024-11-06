import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import contexto from "../../context/context";

export default function SheetSelected() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const { session, showSheet, setShowSheet, players } = useContext(contexto);

  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    console.log(findPlayer);
    setDataPlayer(findPlayer);
  }, [session, players]);

  return (
    <div className="relative h-screen w-full flex flex-col overflow-y-auto">
      <div className="flex w-full justify-between mt-3">
        <div>

        </div>
        <button
          type="button"
          title="Fechar"
          onClick={ () => setShowSheet({ show: false, id: '' }) }
          className="text-white text-3xl cursor-pointer"
        >
          <IoIosCloseCircle />
        </button>
      </div>
      <div className="text-white font-bold">
        {
          dataPlayer &&
            <div>
              { dataPlayer.sheet.name }
            </div>
        }
      </div>
    </div>
  );
}