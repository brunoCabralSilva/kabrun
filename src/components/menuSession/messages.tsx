import { collection, getFirestore, query, where } from "firebase/firestore";
import { useContext, useEffect, useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firestoreConfig from '../../firebase/connection';
import contexto from "../../context/context";
import Loading from "../loading";

export default function Messages() {
  const { sessionId, userEmail } = useContext(contexto);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const db = getFirestore(firestoreConfig);
  const dataRef = collection(db, "chats");
  const queryData = query(dataRef, where("sessionId", "==", sessionId));
  const [chat] = useCollectionData(queryData, { idField: "id" } as any);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

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
      default:
        return(
          <div key={index} className={`w-full flex ${color === 'green' ? 'justify-end' : 'justify-start' } text-white`}>
            <div className={`${color === 'green' ? 'bg-green-whats': 'bg-gray-whats'} rounded-xl w-11/12 sm:w-7/12 md:w-7/12 p-2 mb-2 pl-3`}>
              {
                color === 'gray' &&
                <div className="pb-2 capitalize font-bold flex items-center gap-2">
                  { msg.user }
                </div>
              }
              <div className="pl-1">{ msg.message }</div>
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
