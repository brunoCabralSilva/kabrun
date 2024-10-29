import { useContext, useEffect, useState } from "react";
import contexto from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../firebase/authenticate";
import Logout from "./logout";

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const [loginLogout, setLoginLogout] = useState('');
  const router = useNavigate();
  const {
    logoutUser, setLogoutUser,
    setShowMessage } = useContext(contexto);

  useEffect(() => {
    const fetchData = async () => {
      const authData = await authenticate(setShowMessage);
      if (authData && authData.email && authData.displayName) {
        setLoginLogout('logout');
      } else {
        setLoginLogout('login');
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const barra1 = () => {
    if(!showMenu) {
      return 'rotate-0 transition duration-500 z-0';
    } return 'rotate-45 transition duration-500 translate-y-2 z-40';
  }

  const barra2 = () => {
    if(!showMenu) {
      return 'rotate-0 transition duration-500 z-0';
    } return '-rotate-45 transition duration-500 z-40';
  }

  const barra3 = () => {
    if(!showMenu) {
      return 'opacity-1 transition duration-500 z-0';
    } return 'opacity-0 transition duration-500 z-40';
  }

  return (
    <nav className="w-full text-base relative 2xl:text-xl leading-6 z-40">
      { logoutUser && <Logout /> }
      <div
        onClick={ () => setShowMenu(!showMenu) }
        className="bg-black px-2 pt-2 pb-1 rounded cursor-pointer fixed right-0 top-0 sm:mt-1 sm:mr-2 flex flex-col z-40"
      >
        <div className={`h-1 w-9 bg-white mb-1 ${barra1()}`} />
        <div className={`h-1 w-9 bg-white mb-1 ${barra2()}`} />
        <div className={`h-1 w-9 bg-white mb-1 ${barra3()}`} />
      </div>
      { showMenu &&
        <ul
          className={`overflow-y-auto fixed top-0 right-0 opacity-1 z-30 w-full sm:w-1/2 md:w-1/4 h-screen items-center pt-2 transition duration-500 flex flex-col text-white justify-center bg-black font-extrabold`}
        >
          <li>
            <Link
              to="/home"
              onClick={ () => setShowMenu(!showMenu) }
              className="text-white transition duration-1000 px-2 hover:underline hover:underline-offset-4"
            >
              Início
            </Link>
          </li>
          <li className="pt-4">
            <Link to="/profile"
              onClick={ () => setShowMenu(!showMenu) }
              className="text-white transition duration-1000 px-2 hover:underline hover:underline-offset-4"
            >
              Perfil
            </Link>
          </li>
          <li className="pt-10">
          <button
              type="button"
              onClick={ async () => {
                if (loginLogout === 'login') router('/login');
                else setLogoutUser(true)
              }}
              className="text-white transition duration-1000 px-2 hover:underline hover:underline-offset-4"
            >
              { loginLogout === 'logout' && 'Logout' }
              { loginLogout === 'login' && 'Login' }
            </button>
          </li>
        </ul>
      }
    </nav>
  );
}