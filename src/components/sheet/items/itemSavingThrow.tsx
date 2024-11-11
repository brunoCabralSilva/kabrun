import { BiX } from "react-icons/bi";
import { GiDiceTwentyFacesTwenty } from "react-icons/gi";

export default function ItemSavingThrow(props: { mod: number, name: string, trained: number, proficiency: number }) {
  const { mod, name, trained, proficiency } = props;
  return(
    <div className="flex items-center justify-between w-full mt-1">
      <div className="flex gap-2">
        <div className="h-4 w-4 border bg-white flex items-center justify-center">
          { trained && <BiX className="text-black" /> }
        </div>
        <p>{ name } ({ trained ? mod + proficiency : mod })</p>
      </div>
      <button
        type="button"
        className="text-2xl cursor-pointer"
      >
        <GiDiceTwentyFacesTwenty />
      </button>
    </div>
  );
}