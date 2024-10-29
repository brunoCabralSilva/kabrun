'use client'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import contexto from '../context/context';
import { authenticate } from '../firebase/authenticate';
import MessageToUser from '../components/messageToUser';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { TiEdit } from 'react-icons/ti';
import ForgotPassword from '../components/forgotPassword';
import ChangePassword from '../components/changePassword';
import { getUserByEmail } from '../firebase/user';

export default function Profile() {
  const [showData, setShowData] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState(null);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const router = useNavigate();
  console.log(editImage);
  const {
    resetPopups,
    showMessage, setShowMessage,
    showForgotPassword, setShowForgotPassword,
    showChangePassword, setShowChangePassword,
  } = useContext(contexto);
  
  useEffect(() => {
    resetPopups();
    const profile = async () => {
    const authData: any = await authenticate(setShowMessage);
    if (authData && authData.email && authData.displayName) {
      const user = await getUserByEmail(authData.email, setShowMessage);
      const { email, firstName, lastName, imageURL } = user;
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setImage(imageURL);
      setShowData(true);
    } else router('/login');
  }

  profile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen bg-ritual bg-cover bg-top">
      { showMessage.show && <MessageToUser /> }
      <Nav />
      {
        showData
        ? <div className="h-full w-full bg-ritual bg-cover bg-top relative">
            <div className="py-6 sm:px-5 text-white flex flex-col items-start sm:items-start text-justify">
              <h1 className="text-4xl relative text-black">Perfil</h1>
              <hr className="w-10/12 mt-6" />
              <div className="w-full bg-black p-4 mt-6 mb-2 flex items-start justify-between">
                <div className="">
                  <p className="w-full text-center sm:text-left">Nome:</p>
                  <div className="flex">
                    <div className="w-full text-center sm:text-left text-white font-bold capitalize">
                      {
                        editFirstName
                        ? <input
                            value={firstName}
                            onChange={ (e: any) => setFirstName(e.target.value.toLowerCase()) }
                            className="w-full text-black p-2"
                          />
                        : <p>{firstName}</p>
                      }
                    </div>
                    <button
                      type="button"
                      onClick={ () => setEditFirstName(!editFirstName) }
                      className="text-2xl"
                    >
                      <TiEdit  />
                    </button>
                  </div>
                  <div className="pt-5">
                    <p className="w-full text-center sm:text-left">Sobrenome:</p>
                    <div className="flex">
                      <div className="w-full text-center sm:text-left text-white font-bold capitalize">
                        {
                          editLastName
                          ? <input
                              value={lastName}
                              onChange={ (e: any) => setLastName(e.target.value.toLowerCase()) }
                              className="w-full text-black p-2"
                            />
                          : <p>{lastName}</p>
                        }
                      </div>
                      <button
                        type="button"
                        onClick={ () => setEditLastName(!editLastName) }
                        className="text-2xl"
                      >
                        <TiEdit  />
                      </button>
                    </div>
                  </div>
                  <p className="pt-5 w-full text-center sm:text-left">Email:</p>
                  <div className="flex">
                    <div className="w-full text-center sm:text-left text-white font-bold">
                      {
                        editEmail
                        ? <input className="w-full" />
                        : <p>{email}</p>
                      }
                    </div>
                    <button
                      type="button"
                      onClick={ () => setEditEmail(!editEmail) }
                      className="ml-5 text-2xl"
                    >
                      <TiEdit  />
                    </button>
                  </div>
                  <button 
                    type="button"
                    onClick={ () => setShowChangePassword({ show: true, email }) }
                    className="mt-10 break-words border-2 border-prot-light transition-colors hover:border-red-400 w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Alterar a Senha
                  </button>
                  <button 
                    type="button"
                    onClick={ () => setShowForgotPassword(true) }
                    className="mt-2 break-words border-2 border-prot-light transition-colors hover:border-red-400 w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Esqueci a Senha
                  </button>
                </div>
                {
                  image &&
                  <div className="rounded-full border-2 border-black p-1 relative">
                    <img
                      src={image}
                      alt="Imagem de Perfil"
                      className="w-28 h-28 object-cover rounded-full mr-5"
                    />
                    <button
                      type="button"
                      onClick={ () => setEditImage(true) }
                      className="absolute top-0 right-0 text-2xl"
                    >
                      <TiEdit  />
                    </button>
                  </div>
                }
              </div>
              { showForgotPassword && <ForgotPassword /> }
              { showChangePassword.show && <ChangePassword /> }
            </div>
          </div>
        : <div className="text-white h-full flex items-center justify-center flex-col">
            <span className="loader z-50" />
          </div>
      }
      <Footer />
    </div>
  );
}