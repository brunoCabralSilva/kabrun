import { useContext } from "react";
import contexto from "../../../context/context";

export default function DataTalents() {
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
            Talentos
            <hr className="bg-black h-[0.05rem] border-0" />
          </div>
          <div className="flex flex-col w-full">
            {
              provDataPlayer.sheet.talents.map((talent: any, index: number) => (
                <div
                  key={ index }
                  className="w-full mb-3"
                >
                  <div className="font-bold pb-1">{ talent.name }</div>
                    { talent.prerequisite && <div>Pré-Requisito: { talent.prerequisite }</div> }
                    <div className="w-full text-left">Descrição: { talent.description }</div>
                    <div className="w-full flex flex-col items-start">
                      {
                        talent.benefits.map((benefit: string, index2: number) => (
                          <div className="w-full flex justify-start text-left" key={index2}> - { benefit }</div>
                        ))
                      }
                    </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}