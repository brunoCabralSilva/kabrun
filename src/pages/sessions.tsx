import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../firebase/authenticate";
import contexto from "../context/context";
import Loading from "../components/loading";
import Nav from "../components/nav";
import MessageToUser from "../components/messageToUser";
import Footer from "../components/footer";
import { IoIosInformationCircle, IoMdAdd } from "react-icons/io";
import { getSessions } from "../firebase/sessions";
import CreateSection from "../components/createSection";

export default function Sessions() {
  const [showData, setShowData] = useState(false);
  const [sessions, setSessions] = useState<any>([]);
  const {
    showMessage, setShowMessage,
    showCreateSession, setShowCreateSession,
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
    <div className="h-screen bg-ritual bg-cover bg-top">
      { showMessage.show && <MessageToUser /> }
      <Nav />
      {
        showData
        ? <section className="h-full relative px-2 overflow-y-auto">
            <div className="py-6 px-5 text-black mt-2 flex flex-col items-center sm:items-start text-justify">
              <h1 className="text-4xl relative flex items-center">
                <span className="pr-2">Sessões</span>
                <IoIosInformationCircle
                  className="cursor-pointer"
                  onClick={() => {
                    setShowCreateSession(false);
                    // setShowInfoSessions(!showInfoSessions);
                  }}
                />
              </h1>
              <hr className="w-10/12 mt-6" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 pb-4 bg-transparent">
              <button
                type="button"
                onClick={ () => {
                  setShowCreateSession(true);
                  // setShowInfoSessions(false);
                }}
                className="p-2 border-2 border-white text-white flex items-center justify-center h-28 cursor-pointer bg-black/80"
              >
                <IoMdAdd className="text-4xl" />
              </button>
              {
                sessions.map((session: any, index: number) =>
                <button
                  type="button"
                  key={ index }
                  // onClick={ () => setDataSession({ show: true, id: session.id })}
                  className=" border-2 border-white text-white h-28 cursor-pointer bg-ritual bg-cover capitalize"
                  >
                    <button
                      type="button"
                      onClick={ () => router('/sessions/' + session.id) }
                      className="w-full h-full bg-black/60 p-2 px-4 flex flex-col items-center justify-center font-bold">
                      {/* <Image
                        src="/images/gifts/Dons Nativos.png"
                        alt="Glifo de um lobo"
                        className="w-12 relative object-contain mb-2"
                        width={35}
                        height={400}
                      /> */}
                      { session.name }
                    </button>
                  </button>
                )
              }
            </div>
            { showCreateSession && <CreateSection /> }
            {/* { showInfoSessions && <Info /> }
            { dataSession.show && <VerifySession /> } */}
          </section>
        : <div className="text-white h-full flex items-center justify-center flex-col">
          <Loading />
        </div>
      }
      <Footer />
    </div>
  );
}
            
       