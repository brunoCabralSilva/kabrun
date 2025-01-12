import { useContext } from "react";
import contexto from "../../../context/context";

export default function DataStatic() {
  const { provDataPlayer } = useContext(contexto);
  if (provDataPlayer && provDataPlayer.sheet)
  return(
    <div className="row-span-3 h-full grid gap-3">
      <div className="box-attributes flex items-center justify-center w-full col-span-1">
        <div className="box__line box__line--top"></div>
        <div className="box__line box__line--right"></div>
        <div className="box__line box__line--bottom"></div>
        <div className="box__line box__line--left"></div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">{ provDataPlayer.sheet.attributes.dexterity.mod }</p>
          <p className="text-xs pb-1">CA</p>
        </div>
      </div>
      <div className="box-attributes flex items-center justify-center w-full col-span-1">
        <div className="box__line box__line--top"></div>
        <div className="box__line box__line--right"></div>
        <div className="box__line box__line--bottom"></div>
        <div className="box__line box__line--left"></div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">{ provDataPlayer.sheet.attributes.dexterity.mod }</p>
          <p className="text-xs pb-1">Iniciativa</p>
        </div>
      </div>
      <div className="box-attributes flex items-center justify-center w-full col-span-1">
        <div className="box__line box__line--top"></div>
        <div className="box__line box__line--right"></div>
        <div className="box__line box__line--bottom"></div>
        <div className="box__line box__line--left"></div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">{ provDataPlayer.sheet.attributes.dexterity.mod }</p>
          <p className="text-xs pb-1">Deslocamento</p>
        </div>
      </div>
      <div className="box-attributes flex items-center justify-center w-full col-span-1">
        <div className="box__line box__line--top"></div>
        <div className="box__line box__line--right"></div>
        <div className="box__line box__line--bottom"></div>
        <div className="box__line box__line--left"></div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">{ provDataPlayer.sheet.attributes.dexterity.mod }</p>
          <p className="text-xs pb-1">Pontos de Vida</p>
        </div>
      </div>
    </div>
  );
}