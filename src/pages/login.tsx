import { useContext, useEffect, useState } from "react";
import { authenticate, signIn } from "../firebase/authenticate";
import Loading from "../components/loading";
import { Link, useNavigate } from "react-router-dom";
import imageWpp from '../../src/assets/dragon.png';
import contexto from "../context/context";
import MessageToUser from "../components/messageToUser";
import ForgotPassword from "../components/forgotPassword";
// import ForgotPassword from "@/components/popup/forgotPassword";
// import Nav from "@/components/nav";

function App() {
  const [showData, setShowData] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useNavigate();
  const {
    resetPopups,
    showMessage, setShowMessage,
    showForgotPassword, setShowForgotPassword,
  } = useContext(contexto);
  //   dataUser, setDataUser,

  useEffect(() => {
    resetPopups();
    const authUser = async () => {
    //   if (dataUser.email !== '' && dataUser.displayName !== '') {
    //     router.push("/home");
    //   } else {
        const auth = await authenticate(setShowMessage);
        if(auth && auth.email && auth.displayName) {
    //       setDataUser({ email: auth.email, displayName: auth.displayName });
          router("/home");
        } else setShowData(true);
    //   }
    };
    authUser();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    const validate = /\S+@\S+\.\S+/;
    const vEmail = !email || !validate.test(email) || email === '';
    if(vEmail) {
      setShowMessage({ show: true, text: 'Necessário preencher um Email válido' });
      setLoading(false);
    } else if (!password || password.length < 6) {
      setShowMessage({ show: true, text: 'Necessário inserir uma Senha com pelo menos 6 dígitos' });
      setLoading(false);
    } else {
      const log = await signIn(email, password);
      if (log) {
        const auth = await authenticate(setShowMessage);
        if(auth && auth.email && auth.displayName) {
          // setDataUser({ email: auth.email, displayName: auth.displayName });
          router("/home");
        }
      }
      else {
        setShowMessage({ show: true, text: 'Não foi possível realizar o login. Por favor, verifique suas credenciais e tente novamente.' });
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const buttonSend = document.getElementById('sendMessage');
      if (buttonSend) buttonSend.click();
    }
  };
  
  return(
    <section className="bg-ritual bg-cover break-words bg-dice bg-center h-screen w-full items-center justify-center">
      { showMessage.show && <MessageToUser /> }
      <div className="flex flex-col items-center justify-center h-full">
        {
          !showData 
            ? <Loading />            
            : <div className="break-words w-full h-screen rounded-lg grid grid-cols-3">
                <div className="col-span-2 bg-black w-full h-full">
                  <img
                    src={imageWpp}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
                <div className="break-words rounded-lg w-full h-full flex items-center justify-center">
                  <div className="break-words p-4 space-y-4 md:space-y-6 sm:p-8 w-full">
                    <div className="break-words space-y-4 md:space-y-6 w-full">
                      <div className="w-full">
                      <label htmlFor="email" className="break-words block mb-2 text-sm font-medium">Email</label>
                        <div className="break-words">
                          <input 
                            type="email"
                            name="email"
                            id="email" 
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            className="break-words outline-none text-sm rounded w-full p-2.5 placeholder-gray-400 border-2 border-black text-center sm:text-left" placeholder="name@company.com"
                          />
                        </div>
                      </div>
                      <div>
                          <label htmlFor="password" className="break-words block mb-2 text-sm font-medium">Senha</label>
                          <div className="break-words">
                            <input 
                              type="password"
                              name="password"
                              id="password"
                              onKeyDown={handleKeyDown}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••"
                              className="break-words text-center sm:text-left outline-none text-sm rounded block w-full p-2.5 placeholder-gray-400 border-2 border-black"
                            />
                          </div>
                      </div>
                      <div className="break-words flex items-center justify-center sm:justify-end">
                          <button
                            onClick={() => setShowForgotPassword(true) }
                            className="break-words text-sm font-medium underline hover:text-red-400 transition-colors">
                              Esqueceu a Senha?
                          </button>
                      </div>
                      <button 
                        type="button"
                        onClick={handleLogin}
                        id="sendMessage"
                        className="break-words border-2 border-prot-light transition-colors hover:border-red-400 w-full focus:ring-prot-light font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        { loading ? 'Verificando...' : 'Entrar'}
                      </button>
                      <Link 
                        to="/register"
                        className="break-words text-sm font-light flex flex-col sm:flex-row items-center justify-center">
                        Não tem uma conta? <span className="break-words font-medium hover:underline pl-1 underline hover:text-red-400 transition-colors">Cadastrar</span>
                      </Link>
                    </div>
                  </div>
                </div>
                { showForgotPassword && <ForgotPassword /> }
              </div>
        }
      </div>
    </section>
  );
}

export default App;