import { useContext, useEffect, useState } from "react";
import contexto from "../../context/context";
import classList from '../../data/classes.json';
import { updateDataPlayer } from "../../firebase/players";

export default function ClassPlayer() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [classPlayer, setClassPlayer] = useState<string>('');
  const { showSheet, session, players, setShowMessage, setOptionGuide } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
    setClassPlayer(findPlayer.sheet.class);
  }, [session, players]);

  const updateData = async () => {
    if (classPlayer === '') setShowMessage({ show: true, text: 'Necessário preencher uma Classe para continuar' });
    else {
      dataPlayer.sheet.class = classPlayer;
      await updateDataPlayer(session.id, dataPlayer, setShowMessage);
      setOptionGuide('attributes');
    }
  };
  
  if (dataPlayer)
    return(
      <div className="flex flex-col gap-2 h-90vh overflow-y-auto p-4 w-full justify-start items-center relative bg-gray-whats-dark border-white border-2">
        <div className="capitalize w-full">
            <div className="mt-3 capitalize w-full">
             <span className="pr-3 mb-3">Escolha uma Classe</span>
          </div>
          <div className="w-full grid grid-cols-4 gap-3 mt-3">
            {
              classList.map((itemClass: any, index: number) => (
              <button
                type="button"
                key={index}
                onClick={ () => {
                  setClassPlayer(itemClass.name);
                }}
                className={`${itemClass.name === classPlayer && 'bg-black'} box-select flex items-center justify-center w-full col-span-1 p-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>{ itemClass.name }</div>
              </button>
              ))
            }
          </div>
        </div> 
        <div className="h-full w-full flex flex-col justify-start items-center">
          <div className="w-full flex justify-between col-span-10 py-3">
            <button
              onClick={ () => setOptionGuide('subrace') }
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