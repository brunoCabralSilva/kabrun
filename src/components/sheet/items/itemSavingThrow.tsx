import { BiX } from "react-icons/bi";
// import { GiDiceTwentyFacesTwenty } from "react-icons/gi";

export default function ItemSavingThrow(props: { mod: number, name: string, trained: boolean, proficiency: number }) {
  const { mod, name, trained } = props;
  return(
    <div className="flex items-center justify-between w-full mt-1">
      <div className="flex gap-2">
        <div className="h-4 w-4 border bg-white flex items-center justify-center">
          { trained && <BiX className="text-black" /> }
        </div>
        <p>{ name } ({ trained ? mod + 5 : mod })</p>
      </div>
    </div>
  );
}