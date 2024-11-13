import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";

export default function Talents() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const { session, players, showSheet } = useContext(contexto);
  
  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
  }, [session, players]);
  
  return(
    <div className="w-full">
      {
        dataPlayer && dataPlayer.sheet.talents.map((talent: any, index: number) => (
          <div
            key={ index }
            className="p-3 border-2 border-black"
          >
            <p className="text-xl pb-2 font-bold">{ talent.name } </p>
            {
              talent.prerequisite &&
              <p className="pb-2 font-bold">Pré-Requisitos: { talent.prerequisite } </p>
            }
            <p>
              <span className="font-bold pr-1">Descrição:</span>
              <span>{ talent.description }</span>
            </p>
            {
              talent.benefits &&
              <ul className="py-2 pl-6">
                {
                  talent.benefits.map((benefit: any, index2: number) => (
                    <li key={ index2 } className="list-disc">
                      <span className="capitalize pr-1">{ benefit }</span>
                    </li>
                  ))
                }
              </ul>
            }
            <p>
              <span className="font-bold pr-1">Fonte:</span>
              <span>{ talent.book }, pg. { talent.pg }</span>
            </p>
          </div>
        ))
      }
    </div>
  );
}