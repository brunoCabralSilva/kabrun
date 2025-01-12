import { CiEdit } from "react-icons/ci";
import imageItem from '../../../assets/tiamat.png';

export default function DataImage() {
  return(
    <div className="col-span-3 row-span-3 h-full w-full relative">
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="box__line box__line--top"></div>
        <div className="box__line box__line--right"></div>
        <div className="box__line box__line--bottom"></div>
        <div className="box__line box__line--left"></div>
        <img
          src={imageItem}
          className="w-full h-full object-cover"
        />
        <button type="button" className="bg-[#f0e9d2] rounded absolute bottom-1 right-1 text-xl p-1 border border-black hover:bg-black hover:border-[#f0e9d2] hover:text-white transition-colors duration-400">
          <CiEdit />
        </button>
      </div>
    </div>
  );
}