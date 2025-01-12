import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import contexto from "../context/context";
import Loading from "./loading";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { authenticate } from "../firebase/authenticate";
import { getNotificationBySession, requestApproval } from "../firebase/notifications";
import { getNameAndDmFromSessions, getPlayersInSession } from "../firebase/sessions";

export default function VerifySession() {
  const router = useNavigate();
  const [popup, setPopup] = useState('');
  const [name, setName] = useState('');
	const { dataSession, setDataSession, setShowMessage } = useContext(contexto);

  useEffect(() => {
    requestSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const requestSession = async () => {
    try {
        const authData: any = await authenticate(setShowMessage);
        if (authData || authData.email || authData.displayName) {
          const email = authData.email;
          const getData = await getNameAndDmFromSessions(dataSession.id);
          if (getData) {
            setName(getData.name);
            if (email === getData.gameMaster) router(`/sessions/${dataSession.id}`);
            else {
              const notifications = await getNotificationBySession(dataSession.id, setShowMessage);
              let authNotification = false;
              notifications.forEach((notification: { email: string, type: string }) => {
                if (notification.email === email && notification.type === 'approval') authNotification = true;
              });
              if (authNotification) {
                setPopup('waiting');
              } else {
                let auth = false;
                const getPlayers = await getPlayersInSession(dataSession.id, setShowMessage);
                getPlayers.forEach((player: { email: string }) => {
                  if (player === email) auth = true;
                });
                if (auth) {
                  router(`/sessions/${dataSession.id}`);
                } else setPopup('authorization');
              }
            }
          }
        } else router('/login');
      }
    catch(error) {
      setShowMessage({ show: true, text: "Ocorreu um erro: " + error });
    }
  }

  const returnNotification = () => {
    switch(popup) {
      case 'authorization':
        return (
          <div>
            <label htmlFor="palavra-passe" className="flex flex-col items-center w-full">
              <p className=" w-full pb-3 text-justify">
                Notamos que você é novo nesta Sessão. Como é a sua primeira vez por aqui, podemos encaminhar uma notificação para que o Narrador da Sessão possa autorizar seu acesso, que tal?
              </p>
            </label>
            <div className="flex w-full gap-2">
              <button
                type="button"
                onClick={ () => setDataSession({ show: false, id: '' }) }
                className={` bg-red-800 hover:border-red-900 transition-colors cursor-pointer border-2 border-white w-full p-2 mt-6 font-bold`}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={ async () => {
                  await requestApproval(dataSession.id, requestApproval);
                  setPopup('send');
                }}
                className={` bg-green-whats hover:border-green-900 transition-colors cursor-pointer border-2 border-white w-full p-2 mt-6 font-bold`}
              >
                Solicitar
              </button>
            </div>
          </div>
        );
      case 'waiting':
        return (<div className=" text-center">Você já enviou uma solicitação para ter acesso a esta Sessão. Assim que possível, o Narrador irá avaliar sua petição.</div>);
      case 'send':
        return (<div className=" text-center">Tudo pronto! Enviamos uma solicitação ao Narrador e logo mais ele responderá! Por favor, aguarde até a resposta dele.</div>);
      default:
        return (<Loading />);
    }
  };

  return(
    <div className="z-50 fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/80 px-3 sm:px-0">
      <div className="w-full sm:w-2/3 md:w-1/2 bg-ritual bg-cover relative border-white border-2">
        <div className="overflow-y-auto flex flex-col justify-center items-center bg-rule bg-cover text-black pb-5">
          <div className="flex justify-between w-full items-center px-5 py-5">
            <h1 className="text-2xl w-full capitalize font-bold">
              { name }
            </h1>
            <IoIosCloseCircleOutline
              className="text-4xl cursor-pointer"
              onClick={ () => setDataSession({ show: false, id: '' }) }
            />
          </div>
          <div className="pb-5 px-5 w-full">
            { returnNotification() }
          </div>
        </div>
      </div>
    </div>
  );
}