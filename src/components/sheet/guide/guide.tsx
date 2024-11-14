import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import contexto from "../../../context/context";
import InitialData from "../guide/initialData";
import Race from "../guide/race";
import SubRaces from "../guide/subRace";
import ClassPlayer from "../guide/classPlayer";
import Attributes from "../guide/attributes";
import ClassCharactetistics from "./classCharacteristics";

export default function Guide() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const { showSheet, session, players, setShowGuide, optionGuide, setShowSheet } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) {
      setDataPlayer(findPlayer);
    } else {
      setShowSheet({ show: false, id: '' });
      setShowGuide(false);
    }
  }, [session, players]);

  return(
    <div className="z-60 absolute top-0 left-0 text-white w-full h-screen flex flex-col justify-start items-center bg-gray-whats-dark border-white border-2 ">
      {
        dataPlayer &&
        <div className="h-screen w-full">
          <div className="w-full flex justify-end p-2">
            <IoIosCloseCircleOutline
              className="text-4xl text-white cursor-pointer"
              onClick={ () => setShowGuide(false) }
            />
          </div>
          <div className="flex w-full gap-2">
            <div className="w-1/5 bg-black overflow-y-auto h-90vh p-2">
              <button
                type="button"
                className={`${optionGuide === 'initials' ? 'bg-white text-black' : 'text-white'} font-bold py-2 relative flex items-center justify-center w-full col-span-1`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left relative" />
                <p>Dados Iniciais</p>
              </button>
              <button
                type="button"
                className={`${optionGuide === 'race' ? 'bg-white text-black' : 'text-white'} font-bold py-2 relative flex items-center justify-center w-full col-span-1 mt-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left relative" />
                <p>Raça</p>
              </button>
              {
                dataPlayer.sheet.race !== 'Meio Orc' && dataPlayer.sheet.race !== 'Meio Elfo' && dataPlayer.sheet.race !== 'Humano' && dataPlayer.sheet.race !== 'Draconato' &&
                <button
                  type="button"
                  className={`${optionGuide === 'subrace' ? 'bg-white text-black' : 'text-white'} font-bold py-2 relative flex items-center justify-center w-full col-span-1 mt-3`}
                >
                  <div className="box__line box__line--top" />
                  <div className="box__line box__line--right" />
                  <div className="box__line box__line--bottom" />
                  <div className="box__line box__line--left relative" />
                  <p>SubRaça</p>
                </button>
              }
              <button
                type="button"
                className={`${optionGuide === 'class' ? 'bg-white text-black' : 'text-white'} font-bold py-2 relative flex items-center justify-center w-full col-span-1 mt-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left relative" />
                <p>Classe</p>
              </button>
              <button
                type="button"
                className={`${optionGuide === 'attributes' ? 'bg-white text-black' : 'text-white'} font-bold py-2 relative flex items-center justify-center w-full col-span-1 mt-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left relative" />
                <p>Atributos</p>
              </button>
              <button
                type="button"
                className={`${optionGuide === 'distribute-class' ? 'bg-white text-black' : 'text-white'} font-bold py-2 relative flex items-center justify-center w-full col-span-1 mt-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left relative" />
                <p>Características</p>
              </button>
            </div>
            <div className="w-full">
            { optionGuide === 'initials' && <InitialData /> }
            { optionGuide === 'race' && <Race /> }
            { optionGuide === 'subrace' && <SubRaces /> }
            { optionGuide === 'class' && <ClassPlayer /> }
            { optionGuide === 'attributes' && <Attributes /> }
            { optionGuide === 'distribute-class' && <ClassCharactetistics /> }
            </div>
          </div>
        </div>
      }
    </div>
  );
}