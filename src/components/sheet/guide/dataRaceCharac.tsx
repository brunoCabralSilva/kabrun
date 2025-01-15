import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import listRaces from '../../../data/races.json';

export default function DataRaceCharac() {
  const [race, setRace] = useState<any>(null);
  const [subrace, setSubrace] = useState<any>(null);
  const [attributes, setAttributes] = useState<string>('');
  const { provDataPlayer, returnDataAttribute, returnAttrSubrace, session } = useContext(contexto);

  useEffect(() => {
    let findRace: any = {}
    if (provDataPlayer.sheet.race === 'Draconato') {
      findRace = listRaces.filter((itemList: any) => {
        if (session.books.includes("Fizban's Treasury of Dragons")) {
          return !itemList.type || itemList.type !== 2
        } return !itemList.type || itemList.type !== 1
      }).find((raceItem: any) => raceItem.name === provDataPlayer.sheet.race);
    } else if (provDataPlayer.sheet.race === 'Tiferino') {
      findRace = listRaces.filter((itemList: any) => {
        if (session.books.includes("Mordenkainen's Tome of Foes")) {
          return !itemList.type || itemList.type !== 2
        } return !itemList.type || itemList.type !== 1
      }).find((raceItem: any) => raceItem.name === provDataPlayer.sheet.race);
    } else findRace = listRaces.find((raceItem: any) => raceItem.name === provDataPlayer.sheet.race);
    
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
            Características Raciais
            <hr className="bg-black h-[0.05rem] border-0" />
          </div>
          <div className="flex flex-col w-full">
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
                  race.characteristics.map((skill: any, index: number) => (
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
                  subrace.characteristics.map((skill: any, index: number) => (
                    <div className="" key={ index }>
                      <span className="font-bold pr-1">{ skill.name }:</span>
                      <span>{ skill.description }</span>
                    </div>
                  ))
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}