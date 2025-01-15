import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import listRaces from '../../../data/races.json';

export default function DataClassCharac() {
  const [race, setRace] = useState<any>(null);
  const [subrace, setSubrace] = useState<any>(null);
  const [attributes, setAttributes] = useState<string>('');
  const { provDataPlayer, returnDataAttribute, returnAttrSubrace } = useContext(contexto);

  useEffect(() => {
    const findRace = listRaces.find((item: any) => item.name === provDataPlayer.sheet.race);
    if (findRace) {
      let textAttribute = returnDataAttribute(findRace);
      if (provDataPlayer.sheet.subrace !== '') {
        const findSubrace = findRace.subraces.find((subrace: any) => subrace.name === provDataPlayer.sheet.subrace);
        if (findSubrace) {
          const attrSubrace = returnAttrSubrace(findRace, findSubrace.name);
          textAttribute += `e ${attrSubrace}`;
          setSubrace(findSubrace);
        }
      } else setSubrace(null);
      setAttributes(textAttribute);
      setRace(findRace);
    }
  }, [provDataPlayer]);

  return(
    <div className="col-span-4">
      <div className="w-full col-span-4 box-attributes">
        <div className="box__line box__line--top" />
        <div className="box__line box__line--right" />
        <div className="box__line box__line--bottom" />
        <div className="box__line box__line--left relative" />
        <div className="w-full p-5">
          <div className="w-full text-center pb-3 col-span-3">
            Características de Classe
            <hr className="bg-black h-[0.05rem] border-0" />
          </div>
          {/* <div className="flex flex-col w-full">
            <div>
              <span className="font-bold pr-1">Bônus de Atributo:</span>
              <span>{ attributes }</span>
            </div>
            {
              race && race.age &&
              <div>
                <div>
                  <span className="font-bold pr-1">Idade:</span>
                  <span>{ race.age }</span>
                </div>
                <div>
                  <span className="font-bold pr-1">Alinhamento:</span>
                  <span>{ race.alignment }</span>
                </div>
                <div>
                  <span className="font-bold pr-1">Tamanho:</span>
                  <span>{ race.size }</span>
                </div>
                {
                  race.skills.map((skill: any, index: number) => (
                    <div className="" key={ index }>
                      <span className="font-bold pr-1">{ skill.name }:</span>
                      <span>{ skill.description }</span>
                    </div>
                  ))
                }
              </div>
            }
            {
              subrace &&
              <div>
                {
                  subrace.skills.map((skill: any, index: number) => (
                    <div className="" key={ index }>
                      <span className="font-bold pr-1">{ skill.name }:</span>
                      <span>{ skill.description }</span>
                    </div>
                  ))
                }
              </div>
            }
          </div> */}
        </div>
      </div>
    </div>
  );
}