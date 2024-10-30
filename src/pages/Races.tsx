import { useContext } from "react";
import Nav from "../components/nav";
import races from '../data/races.json';
import contexto from "../context/context";

export default function Races() {
  const { returnAttribute } = useContext(contexto);
  return(
    <div>
      <Nav />
      <p className="font-bold text-2xl p-2">{races.length } Raças</p>
      <div className="grid grid-cols-1 gap-2 p-2">
        {
          races.map((race: any, index: number) => (
            <div
              key={ index }
              className="p-3 border-2 border-black"
            >
              <p className="text-xl pb-2 font-bold capitalize">{ race.name }</p>
              <div className="flex">
                <span className="font-bold pr-1">Bônus em Habilidade:</span>
                <div className="flex">
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
              <p>
                <span className="font-bold pr-1">Idade:</span>
                <span>{ race.age }</span>
              </p>
              <p>
                <span className="font-bold pr-1">Tendência:</span>
                <span>{ race.alignment }</span>
              </p>
              <p>
                <span className="font-bold pr-1">Tamanho:</span>
                <span>{ race.size }</span>
              </p>
              <p>
                <span className="font-bold pr-1">Deslocamento:</span>
                <span>{ race.speed } metros </span>
              </p>
              <div>
                {
                  race.skills.map((skill: any, index2: number) => (
                    <div key={ index2 }>
                      { skill.name !== '' && <span className="capitalize pr-1 font-bold">{skill.name} -</span> }{ skill.description }
                    </div>
                  ))
                }
              </div>
              <div>
                {
                  race.subraces.map((subrace: any, index2: number) => (
                    <div key={ index2 }>
                      <p className="text-xl pt-2 font-bold">{ subrace.name }</p>
                      <div className="flex">
                        <span className="font-bold pr-1">Bônus em Habilidade:</span>
                        <span>+ 1 em { returnAttribute(subrace.attribute) }</span>
                      </div>
                      {
                        subrace.skills.map((skill: any, index3: number) => (
                          <div key={ index3 }>
                            { skill.name !== '' && <span className="capitalize pr-1 font-bold">{skill.name} -</span> }{ skill.description }
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
          ))
        }
      </div>
    </div>
  );
}