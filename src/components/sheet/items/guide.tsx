import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import contexto from "../../../context/context";
import InitialData from "../initialData";
import Race from "../race";
import SubRaces from "../subRace";
import ClassPlayer from "../classPlayer";

export default function Guide() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [option, setOption] = useState('initials');
  const { showSheet, session, players, setShowGuide } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
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
                onClick={ () => setOption('initials') }
                className="hover:bg-white font-bold hover:text-black py-2 relative flex items-center justify-center w-full col-span-1"
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left relative" />
                <p>Dados Iniciais</p>
              </button>
              <button
                type="button"
                onClick={ () => setOption('race') }
                className="hover:bg-white font-bold hover:text-black py-2 relative flex items-center justify-center w-full col-span-1 mt-3"
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left relative" />
                <p>Raça</p>
              </button>
              <button
                type="button"
                onClick={ () => setOption('subrace') }
                className="hover:bg-white font-bold hover:text-black py-2 relative flex items-center justify-center w-full col-span-1 mt-3"
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left relative" />
                <p>SubRaça</p>
              </button>
              <button
                type="button"
                onClick={ () => setOption('class') }
                className="hover:bg-white font-bold hover:text-black py-2 relative flex items-center justify-center w-full col-span-1 mt-3"
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left relative" />
                <p>Classe</p>
              </button>
            </div>
            <div className="w-full">
            { option === 'initials' && <InitialData setOption={setOption} /> }
            { option === 'race' && <Race setOption={setOption} /> }
            { option === 'subrace' && <SubRaces setOption={setOption} /> }
            { option === 'class' && <ClassPlayer setOption={setOption} /> }
            </div>
          </div>
        </div>
      }
    </div>
  );
}