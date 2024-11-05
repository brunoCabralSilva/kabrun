import contexto from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { updateSession } from "../../firebase/sessions";

export default function EditPrinciple() {
  const [description, setDescription] = useState('');
  const [listPrinciples, setListPrinciples] = useState({});
  const {
    userEmail, session,
    showEditPrinciple, setShowEditPrinciple,
    setShowMessage,
  } = useContext(contexto);

  useEffect(() => {
      setDescription(showEditPrinciple.description);
      setListPrinciples(session.principles.filter((principle: any) => principle.description !== showEditPrinciple.description));
  }, []);

  const createPrinciple = async () => {
    const newDataSession = session;
    newDataSession.principles = listPrinciples;
    newDataSession.principles = [
      ...newDataSession.principles,
      { user: userEmail, description}
    ];
    await updateSession(newDataSession, setShowMessage);
    setShowEditPrinciple({ show: false, description: '' });
  }

  return(
    <div className="z-60 fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/80 px-3 sm:px-0 text-white">
      <div className="w-full sm:w-2/3 md:w-1/2 overflow-y-auto flex flex-col justify-center items-center bg-ritual bg-cover bg-center relative border-white border-2">
        <div className="bg-black/90 h-full w-full">
          <div className="pt-4 sm:pt-2 px-2 w-full flex justify-end top-0 right-0">
            <IoIosCloseCircleOutline
              className="text-4xl text-white cursor-pointer"
              onClick={() => setShowEditPrinciple({ show: false, description: '' }) }
            />
          </div>
          <div className="pb-5 px-5 w-full">
            <p className="font-bold pb-1 pt-4">Descreva o Princípio</p>
            <textarea
              className="focus:outline-none text-white bg-black font-normal p-3 border-2 border-white w-full mr-1 mt-1"
              value={ description }
              onChange={(e) => {
                const sanitizedValue = e.target.value.replace(/\s+/g, ' ');
                setDescription(sanitizedValue);
              }}
            />
            <button
              type="button"
              onClick={ createPrinciple }
              className="mt-2 mb-5 p-2 w-full text-center border-2 border-white text-white bg-black cursor-pointer font-bold hover:border-red-500 transition-colors"
            >
              Atualizar Princípio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}