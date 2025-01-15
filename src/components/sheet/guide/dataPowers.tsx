import { useContext } from "react";
import contexto from "../../../context/context";

export default function DataPowers() {
  const { provDataPlayer } = useContext(contexto);

  return(
    <div className="col-span-3 pb-3">
      <div className="w-full col-span-4 box-attributes">
        <div className="box__line box__line--top" />
        <div className="box__line box__line--right" />
        <div className="box__line box__line--bottom" />
        <div className="box__line box__line--left relative" />
        <div className="w-full p-5">
          <div className="w-full text-center pb-3 col-span-3">
            Poderes
            <hr className="bg-black h-[0.05rem] border-0" />
          </div>
          <div className="flex flex-col w-full">
            {
              provDataPlayer.sheet.powers.map((power: any, index: number) => (
                <div
                  key={ index }
                  className="w-full mb-3"
                >
                  <span className="pr-1 font-bold">{ power.name }</span>
                  <span>- { power.description }</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}