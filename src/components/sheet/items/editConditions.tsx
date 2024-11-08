import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import contexto from "../../../context/context";
import listConditions from '../../../data/conditions.json';
import { updateDataPlayer } from "../../../firebase/players";

export default function EditConditions() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [newCondition, setNewCondition] = useState<{ name: string,title: string }>({ name: '', title: '' });
  const [conditionsAdded, setConditionsAdded] = useState<{ name: string,title: string }[]>([]);
  const [conditionsNotAdded, setConditionsNotAdded] = useState<{ name: string, title: string }[]>([]);

  const { session, showSheet, players, setEditConditions, setShowMessage } = useContext(contexto);

  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
    const filteredConditions = listConditions
      .filter((condition: any) => !findPlayer.sheet.conditions.some((cond: any) => cond.name === condition.name))
      .sort((a: any, b: any) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));
    setConditionsNotAdded(filteredConditions);
    setConditionsAdded(findPlayer.sheet.conditions);
  }, [session, players]);

  return(
    <div className="z-50 absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 px-3 sm:px-0 text-white">
      <div className="w-full sm:w-2/3 md:w-1/2 overflow-y-auto flex flex-col justify-center items-center relative bg-gray-whats-dark border-white border-2 p-4">
        <div className="pt-4 sm:pt-2 w-full flex justify-end">
          <IoIosCloseCircleOutline
            className="text-4xl text-white cursor-pointer"
            onClick={ () => setEditConditions(false) }
          />
        </div>
        <div className="w-full ">
          {/* classe */}
          <div className="capitalize w-full mt-2">
            <div className="flex items-center gap-2">
              <div className="box-select flex items-center justify-center w-full col-span-1 mt-2">
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <select
                  className={`${conditionsAdded.length > 0 && 'pb-2 border-b border-white' } w-full text-center bg-gray-whats-dark cursor-pointer outline-none py-2`}
                  value={newCondition.name}
                  onChange={ (e) => {
                    const cond = listConditions.find((condit: any) => condit.name === e.target.value);
                    if (cond) setNewCondition(cond);
                  }}
                >
                  <option disabled value="">Escolha uma Condição</option>
                  {
                    conditionsNotAdded.map((cond: any, index: number) => 
                      <option
                        title={cond.title}
                        value={cond.name}
                        key={index}
                      >
                        { cond.name }
                      </option>
                    )
                  }
                </select>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="mt-5 mb-2 p-2 w-full text-center border-2 border-white text-white bg-black cursor-pointer font-bold transition-colors"
          onClick={ async (e:any) => {
              if (!dataPlayer.sheet.conditions.find((cond: any) => cond.name === newCondition.name)) {
                dataPlayer.sheet.conditions = [...dataPlayer.sheet.conditions, newCondition];
                await updateDataPlayer(session.id, dataPlayer, setShowMessage);
                e.stopPropagation();
              } else setShowMessage({ show: true, text: 'Você já possui esta condição!' });
              setEditConditions(false);
          }}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}