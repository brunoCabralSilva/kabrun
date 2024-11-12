import { useContext, useEffect, useState } from "react"
import contexto from "../../../context/context";
import listRaces from '../../../data/races.json';

export default function Race() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [race, setRace] = useState<any>(null);
  const { session, players, showSheet, returnAttribute } = useContext(contexto);
  
  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
    setRace(listRaces.find((racesItem: any) => racesItem.name === findPlayer.sheet.race));
  }, [session, players]);

  return(
    <div>
    {
      race &&
      <div
        className="p-3 border-2 border-white text-justify"
      >
        <p className="text-xl pb-2 font-bold capitalize">{ race.name }</p>
        <div className="flex pt-1">
          <span className="font-bold pr-1">Bônus em Habilidade:</span>
          <div className="flex font-normal">
            { 
              race.attribute.map((attr: any, index2: number) => (
                <div key={index2}>
                  <span className="pr-1">
                    {`+ ${ attr.value } em ${ returnAttribute(attr.name) }${(index2 + 1) === race.attribute.length ? '.' : ', '}`}
                  </span>
                </div>
              ))
            }
          </div>
        </div>
        <div className="pt-1">
          <span className="font-bold pr-1">Idade:</span>
          <span className="font-normal">{ race.age }</span>
        </div>
        <div className="pt-1">
          <span className="font-bold pr-1">Tendência:</span>
          <span className="font-normal">{ race.alignment }</span>
        </div>
        <div className="pt-1">
          <span className="font-bold pr-1">Tamanho:</span>
          <span className="font-normal">{ race.size }</span>
        </div>
        <div className="pt-1">
          <span className="font-bold pr-1">Deslocamento:</span>
          <span className="font-normal">{ race.speed } metros </span>
        </div>
        <div>
          {
            race.skills.map((skill: any, index2: number) => (
              <div key={ index2 }>
                {
                  skill.name !== ''
                  &&  <span className="capitalize font-bold">
                        {skill.name}
                      </span> }
                      <span className="px-1">-</span>
                      <span className="font-normal">
                        { skill.description }
                      </span>
              </div>
            ))
          }
        </div>
        <div>
          {
            race.subraces.filter((subrace: any) => subrace.name === dataPlayer.sheet.subRace)
              .map((subrace: any, index2: number) => (
              <div key={ index2 }>
                <p className="text-xl pt-2 font-bold">{ subrace.name }</p>
                <div className="flex">
                  <span className="font-bold pr-1">Bônus em Habilidade:</span>
                  <span className="font-normal">+ 1 em { returnAttribute(subrace.attribute) }</span>
                </div>
                {
                  subrace.skills.map((skill: any, index3: number) => (
                    <div key={ index3 }>
                      {
                        skill.name !== ''
                        &&  <span className="capitalize font-bold">
                              {skill.name}
                            </span> }
                            <span className="px-1">-</span>
                            <span className="font-normal">
                              { skill.description }
                            </span>
                    </div>
                  ))
                }
                {
                  subrace.types &&
                  <div className="grid grid-cols-3 mt-3 border">
                    <p className="p-1 border-r text-center">Tipo de Dragão</p>
                    <p className="p-1 border-r text-center">Tipo de Dano</p>
                    <p className="p-1 border-r text-center">Propagação do Sopro</p>
                  </div>
                }
                {
                  subrace.types && subrace.types.map((type: any, index4: number) => (
                    <div key={ index4 } className="grid grid-cols-3 border">
                      <p className="p-1 border-r text-center">{ type.dragon }</p>
                      <p className="p-1 border-r text-center">{ type.damage }</p>
                      <p className="p-1 border-r text-center">{ type.type } ({ type.size }m)</p>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    }
    </div>
  )
}