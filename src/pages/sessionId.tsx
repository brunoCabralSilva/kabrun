import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Loading from "../components/loading";
import { authenticate } from "../firebase/authenticate";
import contexto from "../context/context";
import MenuSession from "../components/menuSession";
import Nav from "../components/nav";
import { FaAngleDoubleLeft } from "react-icons/fa";

export default function SessionId() {
  const { id } = useParams();
  const [showData, setShowData] = useState(false);
  const {
    setShowMessage,
    showMenuSession, setShowMenuSession,
  } = useContext(contexto);
  const router = useNavigate();

  const fetchData = async (): Promise<void> => {
    try {
      const authData: any = await authenticate(setShowMessage);
      if (authData && authData.email && authData.displayName) {
        setShowData(true);
      } else router('/login');
    } catch (error) {
      setShowMessage({ show: true, text: 'Ocorreu um erro ao obter acesso à Sessão: ' + error });
      router('/sessions');
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchData();
  }, []);

  return(
    <div className="flex flex-col w-full h-screen relative">
      <Nav />
      <div id="grid-container" className="relative h-screen">
        {
          showData
          ? <div className="flex w-full h-screen"> 
              <div className="h-screen w-full bg-gray-500 overflow-y-auto pt-2 px-2 flex">
                Mapa da Sessão { id }
              </div>
              {
                showMenuSession !== ''
                ? <div className="w-full md:w-3/5 bg-gray-700 p-2 flex flex-col gap-2 justify-center items-center">
                  <MenuSession />
                </div>
                : <button
                    type="button"
                    className="fixed bottom-2 right-2 p-2 text-xl bg-black text-white rounded-full"
                    onClick={ () => setShowMenuSession('yes') }
                  >
                    <FaAngleDoubleLeft />
                  </button>
              }
            </div>
          : <div className="text-white h-full flex items-center justify-center flex-col">
              <Loading />
            </div>
        }
      </div>
    </div>
  );
}