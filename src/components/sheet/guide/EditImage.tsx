import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { updatePlayerImage } from "../../../firebase/storage";
import { updateDataPlayer } from "../../../firebase/players";
import Loading from "../../loading";

export default function EditImage() {
  const [dataPlayer, setDataPlayer] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { players, showSheet, setShowSheet, session, showDataSelector, setEditPlayerImage, provDataPlayer, setShowMessage } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) setDataPlayer(findPlayer);
    else setShowSheet({ show: false, id: '' });
  }, []);

  const handleImage = (e: any) => {
    if (e.target.files[0]) setProfileImage(e.target.files[0]);
  };

  const updateImage = async () => {
    setLoading(true);
    const updateStorage = await updatePlayerImage(session.id, provDataPlayer.id, profileImage, setShowMessage);
    if (dataPlayer) {
      const newDataPlayer: any = dataPlayer;
      newDataPlayer.sheet.profileImage = updateStorage;
      await updateDataPlayer(session.id, newDataPlayer, setShowMessage);
    }
    setLoading(false);
    setEditPlayerImage(false);
  }

  return(
    <div className={`z-70 fixed top-0 left-0 w-full h-screen overflow-y-auto flex ${showDataSelector.type === 'race' || showDataSelector.type === 'subrace' ? 'items-start' : 'items-center'} justify-center py-5 bg-black/80 px-10`}>
      <div className={`${showDataSelector.type === 'race' || showDataSelector.type === 'subrace' ? 'w-full' : 'w-1/2'} flex ${showDataSelector.type === 'race' || showDataSelector.type === 'subrace' ? 'items-start' : 'items-center'}`}>
        <div className={`box-attributes flex flex-col justify-center items-center bg-rule bg-cover w-full`}>
          <div className="w-full flex items-center justify-end px-2 pt-2">
            <IoIosCloseCircleOutline
              className="text-4xl text-black cursor-pointer"
              onClick={ () => setEditPlayerImage(false) }
            />
          </div>
          <div className="grid grid-cols-2 w-full px-5 py-5 gap-5">
            <div className="box-attributes">
              <div className="box__line box__line--top"></div>
              <div className="box__line box__line--right"></div>
              <div className="box__line box__line--bottom"></div>
              <div className="box__line box__line--left"></div>
              <img
                className="w-96 h-72 object-cover"
                alt="Imagem de perfil"
                src={ profileImage ? URL.createObjectURL(profileImage) : provDataPlayer.sheet.profileImage }
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="w-full text-justify">
                  Adicione ou altere a imagem do seu personagem. Certifique-se de que a imagem tenha dimensões iguais (altura e largura) para formar um quadrado.
                </p>
                <input
                  type="file"
                  onChange={ (e: any) => handleImage(e) }
                  className="w-full mt-5"
                />
              </div>
              {
                loading
                ? <Loading />
                :<button
                  onClick={ updateImage }
                  className="break-words items-center justify-center text-sm font-medium p-2 border-2 border-black w-full hover:bg-black hover:text-[#f0e9d2] transition-colors duration-400"
                  >
                    Concluído
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}