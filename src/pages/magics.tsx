import { useEffect } from "react";
import Nav from "../components/nav";
import magics from '../data/magics.json';

export default function Magics() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const returnGrid = (magic: any) => {
    switch(magic.name) {
      case "Animar Objetos": return 'grid-cols-7';
      case "Teletransporte": return 'grid-cols-5';
      default: return 'grid-cols-2';
    }
  }

  return(
    <div>
      <Nav />
      <p className="font-bold text-2xl p-2">{magics.length } Magias / Truques Adicionados</p>
      <div className="grid grid-cols-1 gap-2 p-2">
        {
          magics.map((magic: any, index: number) => (
            <div
              key={ index }
              className="p-3 border-2 border-black"
            >
              <p className="text-xl pb-2 font-bold">{ magic.name } { magic.level === 0 ? '- Truque' : `- Nível ${ magic.level }`} de { magic.school } { magic.ritual && ' (Ritual)'}</p>
              <p>
                <span className="font-bold pr-1">Tempo de Conjuração:</span>
                <span>{ magic.casting_time }</span>
              </p>
              <p>
                <span className="font-bold pr-1">Alcance:</span>
                <span>{ magic.range }</span>
              </p>
              <p>
                <span className="font-bold pr-1">Componentes:</span>
                <span>{ magic.components }</span>
              </p>
              <p>
                <span className="font-bold pr-1">Duração:</span>
                <span>{ magic.duration } { magic.contentration && ' (Concentração)' }</span>
              </p>
              <p>
                <span className="font-bold pr-1">Descrição:</span>
                <span>{ magic.description }</span>
              </p>
              {
                magic.effects &&
                <ul className="py-2 pl-6">
                  {
                    magic.effects.map((effect: any, index2: number) => (
                      <li key={ index2 } className="list-disc">
                        { effect.type !== '' && <span className="capitalize pr-1 font-bold">{effect.type} -</span> }{ effect.description }
                      </li>
                    ))
                  }
                </ul>
              }
              {
                magic.statistics &&
                <ul className="py-2">
                  {
                    magic.statistics.map((statistic: any, index2: number) => (
                      <div key={ index2 } className="">
                        <p className="pt-3 font-bold">{ statistic.type }</p>
                        <div className={`font-bold grid border-2 mt-2 ${ returnGrid(magic) }`}>
                          {
                            Object.keys(statistic.data[0]).map((item: any, index4: number) => (
                            <div key={index4} className="text-center border-l">{ item }</div>))
                          }
                        </div>
                        { 
                          statistic.data.map((dataItem: any, index3: number) => (
                          <div key={index3} className={``}>
                            <div className={`grid border-2 mt-1 ${returnGrid(magic)}`}>
                              {
                                Object.keys(dataItem).map((item: any, index4: number) => (
                                <div className="text-center border-l" key={ index4 }>
                                  { dataItem[item] }
                                </div>
                                ))
                              }
                            </div>
                          </div>
                        )) }
                      </div>
                    ))
                  }
                </ul>
              }
              {
                magic.higher_levels &&
                <p>
                  <span className="font-bold pr-1">Em Níveis Superiores:</span>
                  <span>{ magic.higher_levels }</span>
                </p>
              }
              <p>
                <span className="font-bold pr-1">Fonte:</span>
                <span>{ magic.book }, pg. { magic.pg }</span>
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
}