import { CiEdit } from "react-icons/ci";
import { useContext } from "react";
import contexto from "../../../context/context";
import Loading from "../../loading";

export default function DataImage() {
  const { provDataPlayer, setEditPlayerImage } = useContext(contexto);
  return(
    <div className="col-span-3 row-span-3"> 
      <div className="relative flex items-start justify-center w-full h-full">
        <div className="box__line box__line--top"></div>
        <div className="box__line box__line--right"></div>
        <div className="box__line box__line--bottom"></div>
        <div className="box__line box__line--left"></div>
        {
          provDataPlayer.sheet
          ? provDataPlayer.sheet &&
          !provDataPlayer.sheet.profileImage
          ? 'Sem Imagem de Perfil'
          : <img
              src={provDataPlayer.sheet.profileImage}
              className="w-full h-full object-cover"
            />
          : <Loading />
        }
        <button
          type="button"
          onClick={ () => setEditPlayerImage(true) }
          className="bg-[#f0e9d2] rounded absolute bottom-1 right-1 text-xl p-1 border border-black hover:bg-black hover:border-[#f0e9d2] hover:text-white transition-colors duration-400"
        >
          <CiEdit />
        </button>
      </div>
    </div>
  );
}