import { useContext, useEffect, useState } from "react";
import contexto from "../../context/context";
import { createSheet } from "../../firebase/players";
import { authenticate } from "../../firebase/authenticate";

const allColors = [
  'bg-red-600', 'bg-orange-600', 'bg-yellow-400', 'bg-lime-400', 
  'bg-emerald-600', 'bg-cyan-400', 'bg-violet-400', 'bg-pink-500', 
  'bg-rose-900', 'bg-stone-500'
];

export default function Sheets() {
  const [colors, setColors] = useState<any>([]);
  const {
    session,
    players,
    userEmail,
    setShowSheet,
    setShowMessage,
  } = useContext(contexto);

  useEffect(() => {
    const availableColors = [...allColors];
    const newColors = [];
    for (let i = 0; i < session.players.length; i += 1) {
      const player = session.players[i];
      if (availableColors.length === 0) {
        newColors.push({ player, color: 'bg-white' });
      } else {
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        const color = availableColors.splice(randomIndex, 1)[0];
        newColors.push({ player, color });
      }
    }
    setColors(newColors);
  }, [session]);

  const addSheet = async () => {
    const auth = await authenticate(setShowMessage);
    if (auth && auth.email && auth.displayName) {
      await createSheet(auth.email, auth.displayName, session, setShowMessage);
    }
  };
  
  return (
    <div className="h-90vh overflow-y-auto pr-1 flex flex-col justify-start px-2">
      <button
        type="button"
        onClick={addSheet}
        className="bg-white font-bold px-2 py-1 rounded w-full"
      >
        Nova Ficha
      </button>
      {
        players
          .filter((player: any) => {
            if (userEmail === session.gameMaster) return true;
            return player.emails.includes(userEmail);
          })
          .sort((a: any, b: any) => {
            const aHasEmail = a.emails.includes(userEmail);
            const bHasEmail = b.emails.includes(userEmail);
            return bHasEmail - aHasEmail;
          })
          .map((player: any, index: number) => (
            <button
              type="button"
              onClick={ () => setShowSheet({ show: true, id: player.id}) }
              key={index}
              className="bg-black border border-white rounded text-white font-bold p-2 w-full mt-2 cursor-pointer text-center flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200">
                  {
                    player.sheet.profileImage &&
                    <img 
                      src={ player.sheet.profileImage }
                      className="w-full h-full object-cover rounded-full border border-white"
                    />
                  }
                </div>
                {player.sheet.name}, { player.sheet.subRace ? player.sheet.subRace : player.sheet.race } { player.sheet.class } Lv { player.sheet.level }
              </div>
              <div className="flex items-center">
                {
                  player.emails.map((itemPlayer: any, index: number) => {
                    const color: any = colors.find((item: any) => item.player === itemPlayer);
                    return (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${color && color.color}`}
                      />
                    );
                  })
                }
              </div>
            </button>
          ))
      }
    </div>
  );
}