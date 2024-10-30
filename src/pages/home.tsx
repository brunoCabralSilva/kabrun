import { useContext, useEffect, useState } from "react";
import Nav from "../components/nav";
import { authenticate } from "../firebase/authenticate";
import { useNavigate } from "react-router-dom";
import contexto from "../context/context";
import Loading from "../components/loading";

export default function Home() {
  const [showData, setShowData] = useState(false);
  const { setShowMessage } = useContext(contexto);
  const router = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      const auth = await authenticate(setShowMessage);
      if(auth && auth.email && auth.displayName) {
        setShowData(true);
      } else router('/login');
    };
    authUser();
  }, []);

  return(
    <div>
      {
        !showData 
          ? <div className="w-full h-screen flex items-center justify-center"><Loading /></div>
          : <div>
              <Nav />
            </div>
      }
    </div>
  );
}