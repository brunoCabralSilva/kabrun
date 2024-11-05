import { collection, getFirestore, query, where } from "firebase/firestore";
import { useContext, useEffect, useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firestoreConfig from '../../firebase/connection';
import contexto from "../../context/context";
import Loading from "../loading";
import { diceImages } from "../../firebase/diceImage";

export default function Messages() {
  const { session, userEmail } = useContext(contexto);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const db = getFirestore(firestoreConfig);
  const dataRef = collection(db, "chats");
  const queryData = query(dataRef, where("sessionId", "==", session.id));
  const [chat] = useCollectionData(queryData, { idField: "id" } as any);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const returnSizeImages = (faces: number) => {
    if (faces === 4) return 'w-10 object-contain';
    if (faces === 6) return 'w-8 object-contain';
    if (faces === 8) return 'w-8 h-10';
    if (faces === 10) return 'w-10 object-contain';
    if (faces === 12) return 'w-10 object-contain';
    if (faces === 20) return 'w-10 object-contain';
    return 'w-8 object-contain';
  }

  const returnListDices = (list: any) => {
    const countMap: { [key: number]: number } = {};
    for (const dice of list) {
        if (countMap[dice.faces]) countMap[dice.faces] += 1;
        else countMap[dice.faces] = 1;
    }
    const phrases: string[] = [];
    for (const faces in countMap) {
        const count = countMap[faces];
        phrases.push(`${count}d${faces}`);
    }
    if (phrases.length > 1) return `${phrases.join(' + ')}`;
    return phrases[0] || '';
  }

  const generateMessage = (msg: any, color: string, index: number) => {
    switch(msg.type) {
      case 'notification':
        return(
          <div key={index} className="my-3 w-full flex justify-center text-gray-400">
            <div className="bg-gray-whats text-sm text-center rounded-xl w-11/12 sm:w-7/12 md:w-7/12 p-2 mb-2">
              { msg.message }
            </div>
          </div>
        );
      case 'roll':
        return(
          <div key={index} className={`w-full flex ${color === 'green' ? 'justify-end' : 'justify-start' } text-white`}>
            <div className={`${color === 'green' ? 'bg-green-whats': 'bg-gray-whats'} rounded-xl w-11/12 sm:w-7/12 md:w-7/12 p-2 mb-2 pl-3`}>
              {
                color === 'gray' &&
                <div className="pb-2 capitalize font-bold flex items-center gap-2 break-words">
                  { msg.user }
                </div>
              }
              <div className="pl-1 break-words">
                <div className="flex flex-wrap gap-2">
                  {
                    msg.rolls.list.map((dice: any, index: number) => (
                      <div key={index}>
                        <img
                          alt={`Resultado do Dado de ${dice.faces}: ${dice.result}`}
                          className={ returnSizeImages(dice.faces) }
                          src={ diceImages(dice.faces + '-' + dice.result) } />
                      </div>
                    ))
                  }
                </div>
                <div className="mt-2">
                  <span className="pr-1 font-bold">Dados:</span>
                  <span>{ returnListDices(msg.rolls.list) }</span>
                  <span>{ msg.rolls.sum > 0 && ` + ${msg.rolls.sum}` }</span>
                  <span>{ msg.rolls.sum < 0 && ` - ${msg.rolls.sum + (msg.rolls.sum * -2)}` }</span>
                </div>
                <div className="">
                  <span className="pr-1 font-bold">Resultado Total:</span>
                  <span>{ msg.rolls.sum + msg.rolls.list.reduce((sum: number, dice: any) => sum + dice.result, 0) }</span>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <span className="w-full text-right text-xs flex justify-end">
                  { msg.date && msg.date }
                </span>
              </div>
            </div>
          </div>		
        );
      default:
        return(
          <div key={index} className={`w-full flex ${color === 'green' ? 'justify-end' : 'justify-start' } text-white`}>
            <div className={`${color === 'green' ? 'bg-green-whats': 'bg-gray-whats'} rounded-xl w-11/12 sm:w-7/12 md:w-7/12 p-2 mb-2 pl-3`}>
              {
                color === 'gray' &&
                <div className="pb-2 capitalize font-bold flex items-center gap-2 break-words">
                  { msg.user }
                </div>
              }
              <div className="pl-1 break-words">{ msg.message }</div>
              <div className="flex justify-end pt-2">
                <span className="w-full text-right text-xs flex justify-end">
                  { msg.date && msg.date }
                </span>
              </div>
            </div>
          </div>		
        );
    }
  }
  
  return(
    <div>
      {
        chat && chat.length > 0 && chat[0].list && chat[0].list.length >= 0
        ? chat[0] && chat[0].list
            .sort((a: any, b: any) => a.order - b.order)
            .map((msg: any, index: number) => {
              if (userEmail !== '' && userEmail === msg.email) {
                return generateMessage(msg, 'green', index);
              } return generateMessage(msg, 'gray', index);
            })
        : <div className="bg-black/60 text-white h-90vh flex items-center justify-center flex-col">
            <Loading />
          </div>
      }
      <div ref={endOfMessagesRef} />
    </div>
  );
}
