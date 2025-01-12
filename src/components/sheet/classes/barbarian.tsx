import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";

export default function Barbarian() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const {
    session,
    players,
    showSheet, setShowSheet,
    setShowGuide,
  } = useContext(contexto);
  
  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) {
      setDataPlayer(findPlayer);
    } else {
      setShowSheet({ show: false, id: '' });
      setShowGuide(false);
    }
  }, [session, players]);

  return(
    <div className="">
      { 
        dataPlayer && dataPlayer.sheet.level === 1 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 2 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 3 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 4 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 5 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 6 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 7 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 8 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 9 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 10 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 11 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 12 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 13 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 14 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 15 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 16 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 17 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 18 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 19 &&
        <div></div>
      }
      { 
        dataPlayer && dataPlayer.sheet.level === 20 &&
        <div></div>
      }
    </div>
  );
}