// import { useContext, useEffect, useState } from "react";
// import Nav from "../components/nav";
// import { authenticate } from "../firebase/authenticate";
// import { useNavigate } from "react-router-dom";
// import contexto from "../context/context";
// import Loading from "../components/loading";

import letters from '../../src/assets/dnd.png';
import arrowDown from '../../src/assets/arrow-down.png';

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
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

  const describe = useRef<HTMLDivElement | null>(null);

  const scrollToComponent = () => {
    if (describe.current) describe.current.scrollIntoView({ behavior: 'smooth' });
  };

  return(
    <main className="bg-black flex flex-col items-center justify-center relative">
      <header className="h-screen w-full flex flex-col items-center justify-center bg-cover relative bg-background bg-top">
        <div className={`absolute w-full h-full bg-black/50`} />
        <div className="h-screen w-full z-10 flex flex-col justify-center items-center">
          <img
            src={letters}
            alt="Nome 'Dungeons & Dragons' em formato de imagem"
            className="h-50vh sm:h-70vh md:h-50vh w-10/12 sm:w-3/5 md:w-1/2 xl:w-5/12 object-contain"
          />
          <img
            src={arrowDown}
            alt="seta para baixo"
            className="sm:h-30vh w-20 object-contain animate-pulse cursor-pointer"
            onClick={scrollToComponent}
          />
        </div>
      </header>
      <div ref={ describe } className="mt-10 grid grid-cols-2 sm:grid-cols-8 w-full h-full px-4 sm:px-8 pb-4 gap-4 sm:gap-6">
        <Link to="/sessions" className="col-span-1 sm:col-span-2 sm:row-span-2">
          <div
            className={`bg-background bg-cover h-full sm:h-40vh text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2 relative">Sessões</p>
          </div>
        </Link>
        <Link to="/races" className="col-span-1 sm:col-span-2 sm:row-span-4">
          <div
            className={`bg-background bg-cover h-20vh sm:h-full text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Raças</p>
          </div>
        </Link>
        <Link to="/classes" className="col-span-2 sm:col-span-4 sm:row-span-2">
          <div
            className={`bg-background bg-cover bg-center h-20vh sm:h-40vh text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Classes</p>
          </div>
        </Link>
        <Link to="/magics" className="col-span-1 sm:col-span-2 sm:row-span-2">
          <div
            className={`bg-background bg-cover h-20vh sm:h-40vh text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2 relative">Magias</p>
          </div>
        </Link>
        <Link to="/equipments" className="col-span-1 row-span-2 sm:col-span-2 sm:row-span-2">
          <div
            className={`bg-background bg-cover h-full sm:h-40vh text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Equipamentos</p>
          </div>
        </Link>
        <Link to="/lore" className="col-span-1 sm:row-span-2 sm:col-span-2">
          <div
            className={`bg-background bg-cover h-20vh sm:h-40vh text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Lore</p>
          </div>
        </Link>
        <Link to="/talents" className="col-span-1 row-span-3 sm:row-span-4 sm:col-span-3">
          <div
            className={`bg-background bg-cover bg-center h-full text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Talentos</p>
          </div>
        </Link>
        <Link to="/monsters" className="col-span-1 sm:row-span-2 sm:col-span-3">
          <div
            className={`bg-background bg-cover bg-center h-20vh sm:h-40vh text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Monstros</p>
          </div>
        </Link>
        <Link to="/about" className="col-span-1 row-span-2 sm:row-span-2 sm:col-span-2">
          <div
            className={`bg-background bg-cover h-20vh sm:h-40vh text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-fullbg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Quem Somos</p>
          </div>
        </Link>
        <Link to="/profile" className="col-span-2 sm:col-span-5 sm:row-span-2">
          <div
            className={`bg-background bg-bottom bg-cover h-20vh sm:h-40vh text-white flex relative cursor-pointer border-transparent items-end`}>
            <div className={`absolute w-full h-full bg-black/40`} />
            <p className="z-10 font-bold text-base sm:text-xl px-3 p-2">Perfil</p>
          </div>
        </Link>
      </div>
      <button
        type="button"
        className={`pb-3bg-white text-black p-2 font-bold mt-3'}`}
        
      >
        Enviar Feedback
      </button>
      <Footer />
    </main>
  );
}