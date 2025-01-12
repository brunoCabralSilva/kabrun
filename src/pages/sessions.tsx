import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../firebase/authenticate";
import contexto from "../context/context";
import Loading from "../components/loading";
import Nav from "../components/nav";
import MessageToUser from "../components/messageToUser";
import Footer from "../components/footer";
import { IoMdAdd } from "react-icons/io";
import { getSessions } from "../firebase/sessions";
import CreateSection from "../components/createSection";
import VerifySession from "../components/verifySession";
import wallpaper from '../assets/tiamat.png';

export default function Sessions() {
  const [showData, setShowData] = useState(false);
  const [sessions, setSessions] = useState<any>([]);
  const {
    showMessage, setShowMessage,
    showCreateSession, setShowCreateSession,
    dataSession, setDataSession,
    setUserEmail,
    resetPopups,
  } = useContext(contexto);
  const router = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchData();
    resetPopups();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const authData: any = await authenticate(setShowMessage);
      if (authData && authData.email && authData.displayName) {
        setUserEmail(authData.email);
        const sessionsList = await getSessions();
        setSessions(sessionsList);
        setShowData(true);
      } else router('/login');
    } catch (error) {
      setShowMessage({ show: true, text: 'Ocorreu um erro ao obter Sessões: ' + error });
    }
  };

  return(
    <div className="min-h-screen bg-rule bg-cover bg-top">
      { showMessage.show && <MessageToUser /> }
      { dataSession.show && <VerifySession />}
      <Nav />
      {
        showData
        ? <section className="relative min-h-screen pb-2">
            <div className="flex">
              <div className="h-0.5 w-full bg-black mt-1" />
            </div>
            <div className="h-full w-full bg-black/30 absolute" />
            <div className="h-full w-full relative">
              <div className="pb-2 text-black flex flex-col items-center sm:items-start text-justify w-full relative">
                <div className="flex w-full items-center justify-between bg-rule bg-cover py-4 px-3">
                  <p className="text-4xl pr-2 text-dnd-blue-dark flex items-center font-bold">
                    Sessões
                  </p>
                  <button
                    type="button"
                    title="Crie uma nova Sessão"
                    className="cursor-pointer text-dnd-yellow-light bg-dnd-blue-dark rounded-full p-2"
                    onClick={ () => {
                      setShowCreateSession(true);
                      // setShowInfoSessions(false);
                    }}
                  >
                    <IoMdAdd className="text-xl" />
                    {/* <IoIosInformationCircle /> */}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 bg-transparent relative px-2">
                {
                  sessions.map((session: any, index: number) =>
                    <button
                      key={ index }
                      type="button"
                      onClick={ () => setDataSession({ show: true, id: session.id })}
                      className="w-full h-full font-bold border border-dnd-blue-dark rounded grid grid-cols-1 sm:grid-cols-6 bg-rule bg-cover mb-1"
                    >
                      <div className="h-full w-full col-span-1 sm:col-span-2 md:col-span-1 py-2 pl-2 pr-2 sm:pr-0">
                        <img src={wallpaper} className="w-full h-full object-cover" />
                      </div>
                      <div className="col-span-1 sm:col-span-4 md:col-span-5 p-4">
                        <p className="w-full text-left capitalize text-lg">
                          { session.name }
                        </p>
                        <p className="w-full text-left font-normal my-1">
                          { session.description }
                        </p>
                        <p className="w-full text-left">
                          <span className="font-bold pr-1">Sessão criada em:</span>
                          <span className="font-normal">{ session.creationDate }.</span>
                        </p>
                      </div>
                    </button>
                  )
                }
              </div>
            </div>
            { showCreateSession && <CreateSection /> }
            {/* { showInfoSessions && <Info /> } */}
          </section>
        : <div className="text-dnd-blue-dark h-screen flex items-center justify-center flex-col">
          <Loading />
        </div>
      }
      <Footer />
    </div>
  );
}
            
       