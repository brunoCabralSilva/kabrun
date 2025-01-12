// import { useContext, useEffect, useState } from "react";
// import Nav from "../components/nav";
// import { authenticate } from "../firebase/authenticate";
// import { useNavigate } from "react-router-dom";
// import contexto from "../context/context";
// import Loading from "../components/loading";

// import letters from '../../src/assets/dnd.png';
// import arrowDown from '../../src/assets/arrow-down.png';

// import { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import Footer from "../components/footer";
import Nav from '../components/nav';

export default function Home() {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }, []);
  // const [showData, setShowData] = useState(false);
  // const { setShowMessage } = useContext(contexto);
  // const router = useNavigate();

  // useEffect(() => {
  //   const authUser = async () => {
  //     const auth = await authenticate(setShowMessage);
  //     if(auth && auth.email && auth.displayName) {
  //       setShowData(true);
  //     } else router('/login');
  //   };
  //   authUser();
  // }, []);

  // const describe = useRef<HTMLDivElement | null>(null);

  // const scrollToComponent = () => {
  //   if (describe.current) describe.current.scrollIntoView({ behavior: 'smooth' });
  // };

  return(
    <main className="bg-black flex flex-col items-center justify-center relative">
      <Nav />
      <header className="h-screen w-full flex flex-col items-center justify-center bg-cover relative bg-background bg-top">
        {/* <div className="h-screen w-full z-10 flex flex-col justify-center items-center">
          <img
            src={letters}
            alt="Nome 'Dungeons & Dragons' em formato de imagem"
            className="h-50vh sm:h-70vh md:h-50vh w-10/12 sm:w-3/5 md:w-1/2 xl:w-5/12 object-contain"
          />
        </div> */}
      </header>
      <Footer />
    </main>
  );
}