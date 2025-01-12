import { useContext, useEffect, useState } from "react";
import contexto from "../context/context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authenticate } from "../firebase/authenticate";
import Logout from "./logout";
// import vertical from '../assets/dnd-barra-vertical.png';
// import horizontal from '../assets/dnd-barra-horizontal.png';
import kabrunIcon from '../assets/kabrun-icon.png';

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const [loginLogout, setLoginLogout] = useState('');
  const [routeName] = useState(useLocation().pathname.includes('/sessions/'));
  const router = useNavigate();
  const { logoutUser, setLogoutUser, setShowMessage } = useContext(contexto);

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
    } return 'rotate-45 transition duration-500 translate-y-2.5 z-40';
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
    <div className="w-full">
      <nav className="flex justify-between items-center w-full text-base leading-6 z-40 bg-rule bg-cover py-1">
        { logoutUser && <Logout /> }
        <button
          type="button"
          title="Início"
          onClick={ () => router('/') }
          className=""
        >
          <img src={kabrunIcon} className="ml-2 h-10" />
        </button>
        <div
          onClick={ () => setShowMenu(!showMenu) }
          className={`px-2 rounded cursor-pointer flex flex-col items-end z-40`}
        >
          <div className={ `w-10 rounded h-1.5 bg-dnd-blue-dark mb-1 ${ barra1() }` } />
          <div className={ `w-10 rounded h-1.5 bg-dnd-blue-dark mb-1 ${ barra2() }` } />
          <div className={ `w-10 rounded h-1.5 bg-dnd-blue-dark ${ barra3() }` } />
        </div>
        { 
          showMenu &&
          <ul
            className={`overflow-y-auto fixed top-0 ${routeName ? 'left-0' : 'right-0'} opacity-1 z-30 w-full sm:w-1/2 md:w-1/4 h-screen items-center transition duration-500 flex justify-center bg-rule bg-cover font-bold`}
          >
            <div className="absolute left-0">
              <div
                // src={vertical}
                className="h-screen w-0.5 bg-dnd-blue-dark"
              />
            </div>
            <div className="flex flex-col items-center justify-center h-screen">
              <li>
                <Link
                  to="/home"
                  onClick={ () => setShowMenu(!showMenu) }
                  className="text-dnd-blue-dark hover:underline transition duration-1000 px-2"
                >
                  Início
                </Link>
              </li>
              <li className="pt-4">
                <Link
                  to="/sessions"
                  onClick={ () => setShowMenu(!showMenu) }
                  className="text-dnd-blue-dark hover:underline transition duration-1000 px-2"
                >
                  Sessões
                </Link>
              </li>
              <li className="pt-4">
                <Link
                  to="/lore"
                  onClick={ () => setShowMenu(!showMenu) }
                  className="text-dnd-blue-dark hover:underline transition duration-1000 px-2"
                >
                  Lore
                </Link>
              </li>
              <li className="pt-4">
                <Link
                  to="/races"
                  onClick={ () => setShowMenu(!showMenu) }
                  className="text-dnd-blue-dark hover:underline transition duration-1000 px-2"
                >
                  Raças
                </Link>
              </li>
              <li className="pt-4">
                <Link
                  to="/classes"
                  onClick={ () => setShowMenu(!showMenu) }
                  className="text-dnd-blue-dark hover:underline transition duration-1000 px-2"
                >
                  Classes
                </Link>
              </li>
              <li className="pt-4">
                <Link
                  to="/magics"
                  onClick={ () => setShowMenu(!showMenu) }
                  className="text-dnd-blue-dark hover:underline transition duration-1000 px-2"
                >
                  Magias
                </Link>
              </li>
              <li className="pt-4">
                <Link
                  to="/monsters"
                  onClick={ () => setShowMenu(!showMenu) }
                  className="text-dnd-blue-dark hover:underline transition duration-1000 px-2"
                >
                  Monstros
                </Link>
              </li>
              <li className="pt-4">
                <Link
                  to="/equipments"
                  onClick={ () => setShowMenu(!showMenu) }
                  className="text-dnd-blue-dark hover:underline transition duration-1000 px-2"
                >
                  Equipamentos
                </Link>
              </li>
              <li className="pt-4">
                <Link to="/profile"
                  onClick={ () => setShowMenu(!showMenu) }
                  className="text-dnd-blue-dark hover:underline transition duration-1000 px-2"
                >
                  Perfil
                </Link>
              </li>
              <li className="pt-4">
                <Link to="/about"
                  onClick={ () => setShowMenu(!showMenu) }
                  className="text-dnd-blue-dark hover:underline transition duration-1000 px-2"
                >
                  Quem Somos
                </Link>
              </li>
              <li className="pt-10">
              <button
                  type="button"
                  onClick={ async () => {
                    if (loginLogout === 'login') router('/login');
                    else setLogoutUser(true)
                  }}
                  className="text-dnd-blue-dark hover:underline transition duration-1000 px-2"
                >
                  { loginLogout === 'logout' && 'Logout' }
                  { loginLogout === 'login' && 'Login' }
                </button>
              </li>
            </div>
          </ul>
        }
      </nav>
    </div>
  );
}