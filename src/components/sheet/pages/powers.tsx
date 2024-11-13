import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";

export default function Powers() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const { session, players, showSheet } = useContext(contexto);
  
  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
  }, [session, players]);
  
  return(
    <div className="w-full">
      {
        dataPlayer && dataPlayer.sheet.powers.map((power: any, index: number) => (
          <div
            key={ index }
            className="p-3 border-2 border-black"
          >
            <p className="text-xl pb-2 font-bold">{ power.name } </p>
            <p className="text-xl pb-2 font-bold">Fonte: { power.font } </p>
            <p>
              <span className="font-bold pr-1">Descrição:</span>
              <span>{ power.description }</span>
            </p>
          </div>
        ))
      }
    </div>
  );
}