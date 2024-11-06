import { useContext, useEffect } from "react";
import contexto from "../context/context";
import { IoBookSharp, IoChatboxEllipsesOutline } from "react-icons/io5";
import { PiBooksLight } from "react-icons/pi";
import { FaMap, FaRegImages } from "react-icons/fa";
import { IoIosCloseCircle, IoIosInformationCircle, IoIosNotifications } from "react-icons/io";
import Sheets from "./menuSession/sheets";
import Images from "./menuSession/images";
import Notes from "./menuSession/notes";
import Details from "./menuSession/details";
import Chat from "./menuSession/chat";
import Notifications from "./menuSession/notifications";
import Maps from "./menuSession/maps";
import SheetSelected from "./menuSession/sheetSelected";

export default function MenuSessions() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const {
    showMenuSession, setShowMenuSession,
    showSheet,
    listNotification,
  } = useContext(contexto);

  const returnMenu = () => {
    switch(showMenuSession) {
      case 'sheet': return <Sheets />;
      case 'images': return <Images />;
      case 'anotations': return <Notes />;
      case 'maps': return <Maps />;
      case 'details': return <Details />;
      case 'notifications': return <Notifications />
      default: return <Chat />;
    }
  };
  
  return(
    <div className="w-full">
      {
        showSheet.show
        ? <SheetSelected />
        : <div className="relative h-screen w-full flex flex-col">
            <div className="my-2 h-6vh">
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
                  title="Mapas"
                  onClick={ () => setShowMenuSession('maps') }
                  className="text-white text-3xl cursor-pointer"
                >
                  <FaMap />
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
                  title="Notificações"
                  onClick={ () => setShowMenuSession('notifications') }
                  className="text-white text-3xl cursor-pointer"
                >
                  <div className="relative">
                    {
                      listNotification.length > 0 &&
                      <div className="absolute top-0 right-0 text-white text-xs bg-red-500 rounded-full w-4 h-4">{listNotification.length}</div>
                    }
                    <IoIosNotifications />
                  </div>
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
            <div className="h-full w-full">
              { returnMenu() }
            </div>
          </div>
      }
    </div> 
  );
}