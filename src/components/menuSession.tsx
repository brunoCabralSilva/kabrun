import { useContext, useEffect } from "react";
import contexto from "../context/context";
import { IoBookSharp, IoChatboxEllipsesOutline } from "react-icons/io5";
import { PiBooksLight } from "react-icons/pi";
import { FaDice, FaRegImages } from "react-icons/fa";
import { IoIosCloseCircle, IoIosInformationCircle } from "react-icons/io";
import Sheets from "./menuSession/Sheets";
import Images from "./menuSession/images";
import Notes from "./menuSession/notes";
import Dices from "./menuSession/dices";
import Details from "./menuSession/details";
import Chat from "./menuSession/chat";

export default function MenuSessions() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const { showMenuSession, setShowMenuSession } = useContext(contexto);

  const returnMenu = () => {
    switch(showMenuSession) {
      case 'sheet': return <Sheets />;
      case 'images': return <Images />;
      case 'anotations': return <Notes />;
      case 'dices': return <Dices />;
      case 'details': return <Details />;
      default: return <Chat />;
    }
  };
  
  return(
    <div className="relative h-full w-full flex flex-col">
      <div className="my-2">
        <div className="flex justify-center items-center w-full gap-5">
          <button
            type="button"
            title="Chat"
            onClick={ () => setShowMenuSession('chat') }
            className="text-white text-3xl cursor-pointer"
          >
            <IoChatboxEllipsesOutline />
          </button>
          <button
            type="button"
            title="Dados"
            onClick={ () => setShowMenuSession('dices') }
            className="text-white text-3xl cursor-pointer"
          >
            <FaDice />
          </button>
          <button
            type="button"
            title="Fichas"
            onClick={ () => setShowMenuSession('sheet') }
            className="text-white text-3xl cursor-pointer"
          >
            <PiBooksLight />
          </button>
          <button
            type="button"
            title="Imagens"
            onClick={ () => setShowMenuSession('images') }
            className="text-white text-3xl cursor-pointer"
          >
            <FaRegImages />
          </button>
          <button
            type="button"
            title="Anotações"
            onClick={ () => setShowMenuSession('anotations') }
            className="text-white text-3xl cursor-pointer"
          >
            <IoBookSharp />
          </button>
          <button
            type="button"
            title="Detalhes"
            onClick={ () => setShowMenuSession('details') }
            className="text-white text-3xl cursor-pointer"
          >
            <IoIosInformationCircle />
          </button>
          <button
            type="button"
            title="Fechar"
            onClick={ () => setShowMenuSession('') }
            className="text-white text-3xl cursor-pointer"
          >
            <IoIosCloseCircle />
          </button>
        </div>
      </div>
      <div className="bg-gray-600 h-full w-full">
        { returnMenu() }
      </div>
    </div> 
  );
}