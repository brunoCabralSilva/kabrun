import { useContext, useState } from "react";
import contexto from "../../context/context";
import { IoIosSend } from "react-icons/io";
import Messages from "./messages";
import { registerMessage } from "../../firebase/chats";

export default function Chat() {
  const [text, setText] = useState('');
  const { scrollToBottom, setShowMessage, sessionId } = useContext(contexto);

  return(
    <div>
      <div className="h-82vh overflow-y-auto pr-1">
        <Messages />
      </div>
      <div className="flex w-full items-end bottom-0 mt-2">
        <textarea
          rows={Math.max(1, Math.ceil(text.length / 40))}
          className="w-full h-6vh p-2 text-black"
          value={text}
          onKeyDown={ async (event) => {
            if (event.key === 'Enter' && text !== '' && text !== ' ') {
              await registerMessage(sessionId, { type: 'text', message: text }, null, setShowMessage);
              setText('');
              scrollToBottom();
            }
          }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const sanitizedValue = e.target.value.replace(/\s+/g, ' ');
            setText(sanitizedValue);
          }}                  
        />
        <div className="pl-2 gap-2 flex">
          <div className="text-xl border border-white flex justify-center hover:bg-white transition-colors text-white hover:text-black">
            <button
              className="p-2 h-6vh"
              title="Enviar uma mensagem"
              onClick={ async () => {
                if (text !== '' && text !== ' ') {
                  await registerMessage(sessionId, { type: 'text', message: text }, null, setShowMessage);
                  setText('');
                  scrollToBottom();
                }
              }}
            >
              <IoIosSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}