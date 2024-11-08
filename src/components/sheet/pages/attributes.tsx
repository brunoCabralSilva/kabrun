// import { useContext, useEffect, useState } from "react";
// import contexto from "../../context/context";

export default function Attributes() {
  // const [dataPlayer, setDataPlayer] = useState<any>(null);
  // const { session, showSheet, players } = useContext(contexto);
  // const [optionSelect, setOptionSelect] = useState('general');

  // useEffect( () => {
  //   const findPlayer = players.find((player: any) => player.id === showSheet.id);
  //   setDataPlayer(findPlayer);
  // }, [session, players]);

  return(
    <div>
      <p>Força</p>
      <p>Destreza</p>
      <p>Constituição</p>
      <p>Inteligência</p>
      <p>Sabedoria</p>
      <p>Carisma</p>
    </div>
  )
}