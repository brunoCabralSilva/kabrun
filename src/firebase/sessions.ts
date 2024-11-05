import { addDoc, collection, doc, getDocs, getFirestore, query, runTransaction, where } from "firebase/firestore";
import firebaseConfig from "./connection";
import { getOfficialTimeBrazil } from "./utilities";
import { createNotificationData } from "./notifications";
import { createChatData } from "./chats";
import { createPlayersData } from "./players";
import { createMaps } from "./maps";

export const getSessions = async () => {
  const db = getFirestore(firebaseConfig);
  const collectionRef = collection(db, 'sessions');
  const querySnapshot = await getDocs(collectionRef);
  const sessionsList = querySnapshot.docs.map((doc) => ({
    id: doc.id, ...doc.data(),
  }));
  return sessionsList;
};

export const getSessionByName = async (nameSession: string, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const sessionsCollection = collection(db, 'sessions');
    const querySnapshot = await getDocs(query(sessionsCollection, where('name', '==', nameSession)));
    let sessionList: any;
    if (!querySnapshot.empty) sessionList = querySnapshot.docs[0].data();
    return sessionList;
  } catch (error) {
    setShowMessage({show: true, text: 'Ocorreu um erro ao buscar Sessões: ' + error });
  }
};

export const createSession = async (
  nameSession: string,
  description: string,
  email: string,
  setShowMessage: any,
) => {
  try {
    const dateMessage = await getOfficialTimeBrazil();
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, 'sessions');
    const newSession = await addDoc(collectionRef, {
      name: nameSession.toLowerCase(),
      creationDate: dateMessage,
      gameMaster: email,
      principles: [],
      images: [ { profile: '', list: [] }],
      books: ["Dungeons & Dragons - Player's Handbook"],
      anotations: '',
      description,
    });
    const newSessionRef = doc(db, 'sessions', newSession.id);
    await runTransaction(db, async (transaction) => {
      transaction.update(newSessionRef, { id: newSession.id });
    });
    await createNotificationData(newSession.id, setShowMessage);
    await createPlayersData(newSession.id, setShowMessage);
    await createChatData(newSession.id, setShowMessage);
    await createMaps(newSession.id, setShowMessage);
    return newSession.id;
  } catch (err: any) {
    setShowMessage({ show: true, text: 'Ocorreu um erro ao criar uma sessão: ' + err.message });
  }
};