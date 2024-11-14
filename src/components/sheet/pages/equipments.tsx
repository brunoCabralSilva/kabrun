import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";

export default function Equipments() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const { session, players, showSheet, setShowSheet } = useContext(contexto);
  
  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) setDataPlayer(findPlayer);
    else setShowSheet({ show: false, id: '' });
  }, [session, players]);
  
  return(
    <div className="w-full gap-4 flex flex-col mt-5">
      {
        dataPlayer && dataPlayer.sheet.equipments.storage.map((item: any, index: number) => (
          <div
            key={ index }
            className={`relative flex items-center justify-center w-full col-span-1 p-3`}
          >
              <div className="box__line box__line--top" />
              <div className="box__line box__line--right" />
              <div className="box__line box__line--bottom" />
              <div className="box__line box__line--left" />
              <div>{ item.name } ({ item.font }) </div>
          </div>
        ))
      }
    </div>
  );
}