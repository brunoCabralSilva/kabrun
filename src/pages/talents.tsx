import { useEffect } from "react";
import Nav from "../components/nav";
import talents from '../data/talents.json';

export default function Talents() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return(
    <div>
      <Nav />
      <p className="font-bold text-2xl p-2">{talents.length } Talentos Adicionados</p>
      <div className="grid grid-cols-1 gap-2 p-2">
        {
          talents.map((talent: any, index: number) => (
            <div
              key={ index }
              className="p-3 border-2 border-black"
            >
              <p className="text-xl pb-2 font-bold">{ talent.name } </p>
              {
                talent.prerequisite &&
                <p className="pb-2 font-bold">Pré-Requisitos: { talent.prerequisite } </p>
              }
              <p>
                <span className="font-bold pr-1">Descrição:</span>
                <span>{ talent.description }</span>
              </p>
              {
                talent.benefits &&
                <ul className="py-2 pl-6">
                  {
                    talent.benefits.map((benefit: any, index2: number) => (
                      <li key={ index2 } className="list-disc">
                        <span className="capitalize pr-1">{ benefit }</span>
                      </li>
                    ))
                  }
                </ul>
              }
              <p>
                <span className="font-bold pr-1">Fonte:</span>
                <span>{ talent.book }, pg. { talent.pg }</span>
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
}