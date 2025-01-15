import { useContext } from "react";
import contexto from "../../../context/context";

export default function DataLanguages() {
  const { provDataPlayer } = useContext(contexto);

  return(
    <div className="col-span-3">
      <div className="w-full col-span-4 box-attributes">
        <div className="box__line box__line--top" />
        <div className="box__line box__line--right" />
        <div className="box__line box__line--bottom" />
        <div className="box__line box__line--left relative" />
        <div className="w-full p-5">
          <div className="w-full text-center pb-3 col-span-3">
            Idiomas
            <hr className="bg-black h-[0.05rem] border-0" />
          </div>
          <div className="flex flex-col w-full">
            {
              provDataPlayer.sheet.languages.map((language: any, index: number) => (
                <div
                  key={ index }
                  className="w-full"
                >
                  <span className="pr-1 font-bold">{ language.name }</span>
                  <span>- { language.title }</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}