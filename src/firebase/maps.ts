import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebaseConfig from "./connection";

export const createMaps = async(sessionId: string, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, 'maps'); 
    await addDoc(collectionRef, { sessionId, list: [{ width: 30, height: 30 }] });
  } catch(err)  {
    setShowMessage({show: true, text: 'Ocorreu um erro ao criar um Mapa para a Sessão: ' + err });
  }
};