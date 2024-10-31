import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebaseConfig from "./connection";

export const createPlayersData = async (sessionId: string, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, 'players');
    await addDoc(collectionRef, { sessionId, list: [] });
  } catch (err: any) {
    setShowMessage({ show: true, text: 'Ocorreu um erro ao criar jogadores para a Sessão: ' + err.message });
  }
};