import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
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

export const getPlayersBySession = async (sessionId: string, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, 'players'); 
    const q = query(collectionRef, where('sessionId', '==', sessionId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const dataDoc = querySnapshot.docs[0];
      const data = dataDoc.data();
      return data.list;
    } return [];
  } catch (err) {
    setShowMessage({ show: true, text: 'Ocorreu um erro ao buscar os usuários da Sessão: ' + err });
  }
};