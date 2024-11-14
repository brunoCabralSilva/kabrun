import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import { updateDataPlayer } from "../../../firebase/players";

export default function ClassCharactetistics() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [classPlayer, setClassPlayer] = useState<string>('');
  const { showSheet, session, players, setShowMessage, setOptionGuide, setShowSheet } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) {
      setDataPlayer(findPlayer);
      setClassPlayer(findPlayer.sheet.class);
    } else setShowSheet({ show: false, id: '' });
  }, [session, players]);

  const updateData = async () => {
    if (classPlayer === '') setShowMessage({ show: true, text: 'Necessário preencher uma Classe para continuar' });
    else {
      dataPlayer.sheet.class = classPlayer;
      await updateDataPlayer(session.id, dataPlayer, setShowMessage);
    }
  };
  
  if (dataPlayer)
    return(
      <div className="flex flex-col gap-2 h-90vh overflow-y-auto p-4 w-full justify-start items-center relative bg-gray-whats-dark border-white border-2">
        <div className="capitalize w-full">
            <div className="mt-3 capitalize w-full">
             <span className="pr-3 mb-3">Chegou a hora de escolher algumas características da classe { dataPlayer && dataPlayer.sheet.class }</span>
          </div>
        </div>
        {
          classPlayer === 'Bárbaro' &&
          <div>
            
          </div>
        }
        <div className="h-full w-full flex flex-col justify-start items-center">
          <div className="w-full flex justify-between col-span-10 py-3">
            <button
              onClick={ () => setOptionGuide('attributes') }
              className="break-words items-center justify-center text-sm font-medium hover:text-white p-2 border-2 border-white"
              >
                Anterior
            </button>
            <button
              onClick={ updateData }
              className="break-words items-center justify-center text-sm font-medium hover:text-white p-2 border-2 border-white"
              >
                Concluir
            </button>
          </div>
        </div>
      </div>
  );
}