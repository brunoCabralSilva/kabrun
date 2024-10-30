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
import { getUserByEmail, updateUserById } from '../firebase/user';
import { IoIosCheckbox } from 'react-icons/io';
import ChangeProfileImage from '../components/changeProfileImage';
import Loading from '../components/loading';

export default function Profile() {
  const [showData, setShowData] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState(null);
  const [id, setId] = useState('');
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const router = useNavigate();
  const {
    resetPopups,
    showMessage, setShowMessage,
    showForgotPassword, setShowForgotPassword,
    showChangePassword, setShowChangePassword,
    showChangeImage, setShowChangeImage,
  } = useContext(contexto);
  
  const updateProfile = async () => {
    const authData: any = await authenticate(setShowMessage);
    if (authData && authData.email && authData.displayName) {
      const user = await getUserByEmail(authData.email, setShowMessage);
      const { email, firstName, lastName, imageURL, id } = user;
      setId(id);
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setImage(imageURL);
      setShowData(true);
    } else router('/login');
  }
  useEffect(() => {
    resetPopups();
    updateProfile();
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
                            className="w-full text-black p-1 outline-none"
                          />
                        : <p className="py-1">{firstName}</p>
                      }
                    </div>
                    <button
                      type="button"
                      onClick={ async () => {
                        if (editFirstName) await updateUserById(
                          { email, firstName, lastName, imageURL: image, id },
                          setShowMessage,
                        );
                        setEditFirstName(!editFirstName)
                      }}
                      className="text-2xl"
                    >
                      {
                        editFirstName
                        ? <IoIosCheckbox />
                        : <TiEdit  />
                      }
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
                              className="w-full text-black p-1 outline-none"
                            />
                          : <p className="py-1">{lastName}</p>
                        }
                      </div>
                      <button
                        type="button"
                        onClick={ async () => {
                          if (editLastName) await updateUserById(
                            { email, firstName, lastName, imageURL: image, id },
                            setShowMessage,
                          );
                          setEditLastName(!editLastName);
                        }}
                        className="text-2xl"
                      >
                        {
                          editLastName
                          ? <IoIosCheckbox />
                          : <TiEdit  />
                        }
                      </button>
                    </div>
                  </div>
                  <p className="pt-5 w-full text-center sm:text-left">Email:</p>
                  <div className="flex">
                    <div className="w-full text-center sm:text-left text-white font-bold">
                     <p>{email}</p>
                    </div>
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
                      onClick={ () => setShowChangeImage({ 
                        show: true,
                        user: { email, firstName, lastName, id },
                      }) }
                      className="absolute top-0 right-0 text-2xl"
                    >
                      <TiEdit  />
                    </button>
                  </div>
                }
              </div>
              { showForgotPassword && <ForgotPassword /> }
              { showChangePassword.show && <ChangePassword /> }
              { showChangeImage.show && <ChangeProfileImage updateProfile={updateProfile} /> }
            </div>
          </div>
        : <div className="text-white h-full flex items-center justify-center flex-col">
            <Loading />
          </div>
      }
      <Footer />
    </div>
  );
}