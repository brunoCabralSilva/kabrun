'use client'
import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import contexto from "../../../context/context";
import { updateDataPlayer } from "../../../firebase/players";
import { updatePlayerImage } from "../../../firebase/storage";

export default function EditPlayerImage() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showSheet, session, players, setShowMessage, setEditPlayerImage } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
  }, [session, players]);

  
  const updatePassword = async () => {
    setLoading(true);
    if (!image) setShowMessage({ show: true, text: 'Necessário inserir uma Imagem válida' });
    else { 
      const newImage = await updatePlayerImage(session.id, dataPlayer.id, image, setShowMessage);
      dataPlayer.sheet.profileImage = newImage;
      await updateDataPlayer(session.id, dataPlayer, setShowMessage);
    }
    setEditPlayerImage(false);
    setLoading(false);
  };

  const handleImage = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="break-words z-50 absolute top-0 left-0 w-full flex items-center justify-center bg-black/80 px-3 sm:px-0 overflow-y-auto h-full">
      <div className="break-words w-11/12 sm:w-1/2 lex flex-col justify-center items-center relative bg-black border-violet-500 border-2 pb-5 bg-dice">
        <div className="break-words pt-4 sm:pt-2 px-2 w-full flex justify-end top-0 right-0">
          <IoIosCloseCircleOutline
            className="break-words text-4xl text-white cursor-pointer hover:text-violet-500 duration-500 transition-colors"
            onClick={() => setEditPlayerImage(false) }
          />
        </div>
        <div className="break-words px-6 sm:px-10 w-full">
          <div className="break-words w-full overflow-y-auto flex flex-col justify-center items-center mt-2 mb-10">
            <div className="break-words w-full text-white text-2xl pb-3 font-bold text-center mt-2 mb-2">
              Alteração de Imagem de Perfil
            </div>
            <label htmlFor="lastPassword" className="break-words mb-4 flex flex-col items-center w-full">
              <p className="break-words w-full mb-1 text-white">Inrisa uma Nova Imagem</p>
              <input 
                id="image"
                name="image"
                type="file"
                onChange={handleImage}
                className="break-words shadow-sm bg-black border border-white text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              />
            </label>
            <button
              onClick={ updatePassword }
              disabled={loading}
              className="break-words relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-full mt-3"
              >
              <span className="break-words relative px-5 py-2.5 transition-all ease-in duration-75 text-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                { loading ? "Atualizando..." : "Atualizar" }
              </span>
            </button>
          </div>
          {
            loading
            && <div className="break-words bg-black/80 text-white flex items-center justify-center flex-col my-5">
              <span className="break-words loader z-50" />
            </div>
          }
        </div>    
      </div>
    </div>
  );
}