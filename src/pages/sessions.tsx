import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../firebase/authenticate";
import contexto from "../context/context";
import Loading from "../components/loading";
import Nav from "../components/nav";
import MessageToUser from "../components/messageToUser";

export default function Sessions() {
  const [showData, setShowData] = useState(false);
  const { showMessage, setShowMessage } = useContext(contexto);
  const router = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const authUser = async () => {
      const auth = await authenticate(setShowMessage);
      if(auth && auth.email && auth.displayName) {
        setShowData(true);
      } else router('/login');
    };
    authUser();
  }, []);

  return(
    <div className="h-screen bg-ritual bg-cover bg-top">
      { showMessage.show && <MessageToUser /> }
      <Nav />
      {
        showData
        ? <div>Sessions</div>
        : <div className="text-white h-full flex items-center justify-center flex-col">
          <Loading />
        </div>
      }
    </div>
  );
}