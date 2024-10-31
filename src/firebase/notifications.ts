import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebaseConfig from "./connection";

export const createNotificationData = async (sessionId: string, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const notificationsCollection = collection(db, 'notifications');
    await addDoc(notificationsCollection, { sessionId, list: [] });
  } catch (err: any) {
    setShowMessage({ show: true, text: 'Ocorreu um erro ao criar uma aba de notificação na Sessão: ' + err.message });
  }
};