import { addDoc, arrayUnion, collection, doc, getDocs, getFirestore, query, runTransaction, where } from "firebase/firestore";
import firebaseConfig from "./connection";
import { getOfficialTimeBrazil, playerSheet } from "./utilities";

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

export const createSheet = async (email: string, user: string, session: any, setShowMessage: any) => {
  const db = getFirestore(firebaseConfig);
  const playersCollectionRef = collection(db, 'players');
  const querySession = query(playersCollectionRef, where("sessionId", "==", session.id));
  const querySnapshot = await getDocs(querySession);
  if (querySnapshot.empty) {
    setShowMessage({ show: true, text: 'Não foi possível localizar a Sessão. Por favor, atualize a página e tente novamente.' });
  }
  const playerDocRef = querySnapshot.docs[0].ref;
  const dateMessage = await getOfficialTimeBrazil();
  await runTransaction(db, async (transaction: any) => {
    const playerDocSnapshot = await transaction.get(playerDocRef);
    const playerData = playerDocSnapshot.data();
    const filterByEmail = playerData.list.filter((user: any) => user.emails.includes(email));
    const sheet = {
      id: playerData.list.length + 1,
      sheet: playerSheet(`Personagem ${filterByEmail.length + 1}`),
      emails: [email],
      user,
      creationDate: dateMessage,
    };
    transaction.update(playerDocRef, { list: arrayUnion(sheet) });
  });
}

export const updateDataPlayer = async (sessionId: string, newData: any, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, 'players');
    const q = query(collectionRef, where('sessionId', '==', sessionId));
    await runTransaction(db, async (transaction) => {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setShowMessage({ show: true, text: 'Sessão não encontrada.' });
        return;
      }
      const dataDoc = querySnapshot.docs[0];
      const docRef = doc(db, 'players', dataDoc.id);
      const data = dataDoc.data();
      const playerIndex = data.list.findIndex((item: any) => item.id === newData.id);  
      if (playerIndex !== -1) {
        data.list[playerIndex] = newData;
        transaction.update(docRef, { list: data.list });
      } else setShowMessage({ show: true, text: 'Jogador não encontrado.' });
    });
  } catch (err: any) {
    setShowMessage({ show: true, text: 'Ocorreu um erro ao atualizar os dados do Jogador: ' + err.message });
  }
};