import { addDoc, collection, getDocs, getFirestore, query, runTransaction, where } from "firebase/firestore";
import firebaseConfig from "./connection";
import { authenticate } from "./authenticate";
import { getOfficialTimeBrazil } from "./utilities";
// import { getOfficialTimeBrazil } from "./utilities";
// import { registerMessage } from "./messagesAndRolls";

export const createChatData = async(sessionId: string, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const dateMessage = await getOfficialTimeBrazil();
    const collectionRef = collection(db, 'chats'); 
    await addDoc(collectionRef, { sessionId, list: [] });
    await registerMessage(
      sessionId,
      {
        message: `Sessão inicializada em ${dateMessage}. Aprove solicitações de entrada ou adicione novos jogadores para uma melhor interação com a plataforma!`,
        type: 'notification',
      },
      null,
      setShowMessage,
    );
  } catch(err)  {
    setShowMessage({show: true, text: 'Ocorreu um erro ao criar um chat para a Sessão: ' + err });
  }
};

export const registerMessage = async (sessionId: string, data: any, email: string | null, setShowMessage: any) => {
	try {
	  const authData: any = await authenticate(setShowMessage);
	  if (authData && authData.email && authData.displayName) {
		const date = await getOfficialTimeBrazil();
		const db = getFirestore(firebaseConfig);
		const chatsCollectionRef = collection(db, 'chats');
		const querySession = query(chatsCollectionRef, where("sessionId", "==", sessionId));
		const querySnapshot = await getDocs(querySession);
		if (querySnapshot.empty) {
		  setShowMessage({ show: true, text: 'Não foi possível localizar a Sessão. Por favor, atualize a página e tente novamente.' });
		} else {
			const sessionDocRef = querySnapshot.docs[0].ref;
			await runTransaction(db, async (transaction: any) => {
        const sessionDocSnapshot = await transaction.get(sessionDocRef);
        if (sessionDocSnapshot.exists()) {
          let emailToRecord = email;
          if (!emailToRecord) emailToRecord = authData.email;
          const sessionData = sessionDocSnapshot.data();
          const updatedChat = [
          ...sessionData.list,
          { date, email: emailToRecord, user: authData.displayName, ...data, order: sessionData.list.length + 1 },
          ];
          updatedChat.sort((a: any, b: any) => a.order - b.order)
          if (updatedChat.length > 20) updatedChat.shift();
          transaction.update(sessionDocRef, { list: updatedChat });
        } else {
          setShowMessage({ show: true, text: "Não foi possível localizar a Sessão. Por favor, atualize a página e tente novamente." });
        }
		  });
		}
	  }
	} catch (error) {
	  setShowMessage({ show: true, text: 'Ocorreu um erro ao enviar a mensagem: ' + error });
	}
};