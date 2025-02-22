import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Loading from "../components/loading";
import { authenticate } from "../firebase/authenticate";
import contexto from "../context/context";
import MenuSession from "../components/menuSession";
import Nav from "../components/nav";
import { FaAngleDoubleLeft } from "react-icons/fa";
import Grid from "../components/grid";
import { getSessionById } from "../firebase/sessions";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { collection, doc, getFirestore, query, where } from "firebase/firestore";
import firestoreConfig from "../firebase/connection";
import MessageToUser from "../components/messageToUser";
import LeaveSession from "../components/menuSession/leaveSession";
import EditHealthPoints from "../components/sheet/items/editHealthPoints";
import EditConditions from "../components/sheet/items/editConditions";
import Guide from "../components/sheet/guide/guide";

export default function SessionId() {
  let { id } = useParams();
  if (!id) id = '';
  const [showData, setShowData] = useState(false);
  const {
    session, setSession,
    removeFromSession,
    editHealthPoints,
    editConditions,
    showMessage, setShowMessage,
    showMenuSession, setShowMenuSession,
    setDataSession, setListNotification,
    setPlayers, setUserEmail,
    showGuide,
  } = useContext(contexto);
  const router = useNavigate();

  //Listenning Sessions
  const db = getFirestore(firestoreConfig);
  const dataRefSession = doc(db, "sessions", id);
  let [dataSession, loadingSession] = useDocumentData(dataRefSession, { idField: "id" } as any);
  if (!dataSession) dataSession = {};
  useEffect(() => {
    if (dataSession && !loadingSession) setSession(dataSession);
  }, [dataSession, loadingSession, session, setSession]);

  // //Listenning Players
  const dataRefPlayer = collection(db, "players");
  const queryDataPlayer = query(dataRefPlayer, where("sessionId", "==", id));
  const [data, loading] = useCollectionData(queryDataPlayer, { idField: "id" } as any);
  useEffect(() => {
    if (data && !loading) setPlayers(data[0].list);
  }, [data, loading, setPlayers]);
  

  //Listenning Notifications
  const sessionRef = collection(db, 'notifications');
  const querySession = query(sessionRef, where('sessionId', '==', id));
  const [notifications] = useCollectionData(querySession, { idField: 'id' } as any);
  useEffect(() => {
    if (notifications) {
      const allLists = notifications.flatMap(notification => notification.list || []);
      setListNotification(allLists);
    }
  }, [notifications, setListNotification]);

  const fetchData = async (): Promise<void> => {
    try {
      const authData: any = await authenticate(setShowMessage);
      if (authData && authData.email && authData.displayName) {
        setShowData(true);
        setUserEmail(authData.email);
        if (id) {
          const session = await getSessionById(id, setShowMessage);
          setSession(session);
        }
      } else router('/login');
    } catch (error) {
      setShowMessage({ show: true, text: 'Ocorreu um erro ao obter acesso à Sessão: ' + error });
      router('/sessions');
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchData();
    setDataSession({ show: false, id: '' });
  }, []);

  return(
    <div className="flex flex-col w-full h-screen relative">
      <Nav />
      { showMessage.show && <MessageToUser /> }
      { removeFromSession.show && <LeaveSession /> }
      <div id="grid-container" className="relative h-screen">
        {
          showData
          ? <div className="flex h-screen bg-black"> 
              <div className={`${showMenuSession === '' ? 'w-full ': 'w-8/12'} h-screen relative`}>
                { showGuide && <Guide /> }
                { editHealthPoints && <EditHealthPoints /> }
                { editConditions && <EditConditions /> }
                <Grid />
              </div>
              {
                showMenuSession !== ''
                ? <div className="w-4/12 h-screen bg-gray-whats-dark flex flex-col gap-2 justify-center items-center">
                    <MenuSession />
                  </div>
                : <button
                    type="button"
                    className="fixed bottom-2 right-6 border-2 border-white p-2 text-xl bg-black text-white rounded-full"
                    onClick={ () => setShowMenuSession('yes') }
                  >
                    <FaAngleDoubleLeft />
                  </button>
              }
            </div>
          : <div className="text-white h-full flex items-center justify-center flex-col">
              <Loading />
            </div>
        }
      </div>
    </div>
  );
}