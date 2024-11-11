import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, runTransaction, where } from "firebase/firestore";
import firebaseConfig from "./connection";
import { capitalize, getOfficialTimeBrazil } from "./utilities";
import { createNotificationData, registerNotification } from "./notifications";
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

export const getSessionById = async (sessionId: string, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const sessionsCollectionRef = collection(db, 'sessions');
    const sessionDocRef = doc(sessionsCollectionRef, sessionId);
    const sessionDocSnapshot = await getDoc(sessionDocRef);
    if (sessionDocSnapshot.exists()) {
      return { ...sessionDocSnapshot.data(), id: sessionDocSnapshot.id }
    } return null;
  } catch (error) {
    setShowMessage({show: true, text: 'Ocorreu um erro ao buscar a Sessão. Por favor, atualize a página e tente novamente: ' + error });
  }
};

export const getNameAndDmFromSessions = async (sessionId: string) => {
  const db = getFirestore(firebaseConfig);
  const sessionsCollectionRef = collection(db, 'sessions');
  const sessionDocRef = doc(sessionsCollectionRef, sessionId);
  const sessionDocSnapshot = await getDoc(sessionDocRef);
  if (sessionDocSnapshot.exists()) {
    return sessionDocSnapshot.data();
  } return null;
};

export const getPlayersInSession = async (id: string, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const sessionsCollectionRef = collection(db, 'sessions');
    const sessionDocRef = doc(sessionsCollectionRef, id);
    const sessionDocSnapshot = await getDoc(sessionDocRef);
    if (sessionDocSnapshot.exists()) {
      return sessionDocSnapshot.data().players;
    } return null;
  } catch (error) {
    setShowMessage({show: true, text: 'Ocorreu um erro ao buscar a Sessão. Por favor, atualize a página e tente novamente: ' + error });
  }
}

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
      players: [],
      images: [ { profile: '', list: [] }],
      books: ["Player's Handbook"],
      attributeDistribution: [],
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

export const updateSession = async (session: any, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const sessionsCollectionRef = collection(db, 'sessions');
    const sessionDocRef = doc(sessionsCollectionRef, session.id);
    await runTransaction(db, async (transaction) => {
      const sessionDocSnapshot = await getDoc(sessionDocRef);
      if (sessionDocSnapshot.exists()) {
        transaction.update(sessionDocRef, { ...session });
      } else throw new Error('Sessão não encontrada');
    });
  } catch (err: any) {
    setShowMessage({ show: true, text: 'Ocorreu um erro ao atualizar os dados da Sessão: ' + err.message });
  }
};

export const deleteSessionById = async (sessionId: string, setShowMessage: any) => {
  const db = getFirestore(firebaseConfig);
  const sessionsCollectionRef = collection(db, 'sessions');
  const sessionDocRef = doc(sessionsCollectionRef, sessionId);
  try {
    await runTransaction(db, async (transaction) => {
      // Deletar a sessão
      transaction.delete(sessionDocRef);
      // Deletar chats relacionados
      const chatsRef = collection(db, 'chats');
      const chatsQuery = query(chatsRef, where('sessionId', '==', sessionId));
      const chatsSnapshot = await getDocs(chatsQuery);
      chatsSnapshot.forEach((chatDoc) => {
        const chatDocRef = doc(chatsRef, chatDoc.id);
        transaction.delete(chatDocRef);
      });
      // Deletar players relacionados
      const playersRef = collection(db, 'players');
      const playersQuery = query(playersRef, where('sessionId', '==', sessionId));
      const playersSnapshot = await getDocs(playersQuery);
      playersSnapshot.forEach((playerDoc) => {
        const playerDocRef = doc(playersRef, playerDoc.id);
        transaction.delete(playerDocRef);
      });
      // Deletar Mapas relacionados
      const mapsRef = collection(db, 'maps');
      const mapsQuery = query(mapsRef, where('sessionId', '==', sessionId));
      const mapsSnapshot = await getDocs(mapsQuery);
      mapsSnapshot.forEach((mapsDoc) => {
        const mapsDocRef = doc(mapsRef, mapsDoc.id);
        transaction.delete(mapsDocRef);
      });
      // Deletar notificações relacionadas
      const notificationsRef = collection(db, 'notifications');
      const notificationsQuery = query(notificationsRef, where('sessionId', '==', sessionId));
      const notificationsSnapshot = await getDocs(notificationsQuery);
      notificationsSnapshot.forEach((notificationDoc) => {
        const notificationDocRef = doc(notificationsRef, notificationDoc.id);
        transaction.delete(notificationDocRef);
      });
    });
    setShowMessage({ show: true, text: 'A Sessão foi excluída. Esperamos que sua jornada tenha sido divertida e gratificante. Até logo!' });
  } catch (error) {
    setShowMessage({ show: true, text: `Erro ao deletar sessão. Atualize a página e tente novamente (${error}).` });
    return false;
  }
};

export const leaveFromSession = async (session: any, email: string, name: string, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, 'players');
    const q = query(collectionRef, where('sessionId', '==', session.id));
    await runTransaction(db, async (transaction) => {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const dataDoc = querySnapshot.docs[0];
        const docRef = doc(db, 'players', dataDoc.id);
        const data = dataDoc.data();
        data.list = data.list.filter((player: any) => player.email !== email);
        transaction.update(docRef, { list: data.list });
        const dataNotification = {
          message: `Olá, tudo bem? O jogador ${capitalize(name)} saiu desta sala. Você pode integrá-lo novamente, caso o mesmo solicite novamente acessar esta sessão.`,
          type: 'transfer',
        };
        await registerNotification(session.id, dataNotification, setShowMessage);
        setShowMessage({ show: true, text: "Esperamos que sua jornada nessa Sessão tenha sido divertida e gratificante. Até logo!" });
        const sessionData = session;
        session.players = session.filter((player: any) => player !== email);
        await updateSession(sessionData, setShowMessage);
      } else throw new Error('Sessão não encontrada.');
    });
  } catch (err: any) {
    setShowMessage({ show: true, text: 'Ocorreu um erro ao atualizar os dados do Jogador: ' + err.message });
  }
};