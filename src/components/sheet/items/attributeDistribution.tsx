import { useContext, useEffect, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import contexto from "../../../context/context";
import { updateSession } from "../../../firebase/sessions";

const types = [
  { name: 'fixed', namePtbr: 'Atributos Distribuídos de forma Fixa', title: '' },
  { name: 'personalized', namePtbr: 'Atributos Distribuídos de forma Personalizada', title: '' },
  { name: 'rolling', namePtbr: 'Atributos Definidos rolando Dados', title: '' },
];
export default function AttributeDistribution() {
  const [optionsNotAdded, setOptionsNotAdded] = useState<any>([]);
  const [optionsAdded, setOptionsAdded] = useState<any>([]);
  const [newOption, setNewOption] = useState<{ name: string, title: string, namePtbr: string}>({ name: '', title: '', namePtbr: ''});
  const { players, session, setShowMessage } = useContext(contexto);

  useEffect( () => {
    const listOptionsNotAdded = types
      .filter(option => !session.attributeDistribution.some((op: any) => op.name === option.name))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));
      const listOptionsAdded = types
      .filter(option => session.attributeDistribution.some((op: any) => op.name === option.name))
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));
    setOptionsNotAdded(listOptionsNotAdded);
    setOptionsAdded(listOptionsAdded);
  }, [session, players]);

  return(
    <div className="w-full mb-2 flex-col font-bold border-2 border-white">
      <div className="pl-4 pr-2 pt-2 flex flex-col justify-between items-center w-full">
        <div className={`flex w-full justify-between items-center gap-2 ${ optionsAdded.length > 0 && 'pt-2'}`}>
          <select
            className={`${optionsAdded.length > 0 && 'pb-2 border-b border-white' } w-full text-left bg-gray-whats-dark cursor-pointer outline-none`}
            value={newOption.name}
            onChange={ (e) => {
              const optionItem = types.find((op: any) => op.name === e.target.value);
              if (optionItem) setNewOption(optionItem);
            }}
          >
            <option disabled value="">Escolha uma ou mais formas de Distribuição de Atributos</option>
            {
              optionsNotAdded.map((opItem: any, index: number) => 
                <option value={opItem.name} key={index}>
                  { opItem.namePtbr }
                </option>
              )
            }
          </select>
          {
            newOption.name !== '' &&
            <button
              type="button"
              className="rounded-full text-3xl cursor-pointer hover:bg-white bg-gray-whats-dark transition-colors hover:text-black duration-400"
              onClick={ async () => {
                setOptionsNotAdded(
                  optionsNotAdded
                  .filter((optionItem: any) => optionItem.name !== newOption.name)
                  .sort((a: any, b: any) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
                );
                setOptionsAdded(
                  [...optionsAdded, newOption].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
                );
                const sessionData = session;
                sessionData.attributeDistribution = [...session.attributeDistribution, newOption];
                await updateSession(sessionData, setShowMessage);
                setNewOption({ name: '', title: '', namePtbr: ''});
              }}
            >
              <CiCirclePlus />
            </button>
          }
        </div>
        <div className={`w-full flex flex-col mt-2 ${optionsAdded.length > 0 && 'pb-2'}`}>
          {
            optionsAdded.map((op: any, index: number) => (
              <div key={index} className="flex items-center pl-3">
                <p className="w-full">{op.namePtbr}</p>
                  <button
                    type="button"
                    onClick={ async () => {
                      setOptionsNotAdded(
                        [...optionsNotAdded, op]
                        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
                      );
                      setNewOption({ name: '', title: '', namePtbr: ''});
                      setOptionsAdded(
                        optionsAdded
                          .filter((opItem: any) => opItem.name !== op.name)
                          .sort((a: any, b: any) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
                      );
                      const sessionData = session;
                      sessionData.attributeDistribution = optionsAdded
                      .filter((opItem: any) => opItem.name !== op.name);
                      await updateSession(sessionData, setShowMessage);
                    }}
                    className="rounded-full text-3xl mt-2 cursor-pointer hover:bg-white bg-gray-whats-dark transition-colors hover:text-black duration-400"
                  >
                    <CiCircleMinus />
                  </button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}