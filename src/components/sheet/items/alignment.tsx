import { useContext, useEffect, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import contexto from "../../../context/context";
import { updateDataPlayer } from "../../../firebase/players";

export function Alignment() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const { session, showSheet, players, setShowMessage } = useContext(contexto); 

  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
  }, [session, players]);

  if (dataPlayer)
      return(
        <div className="mt-3 capitalize w-full">
        <span className="pr-3 mb-3">Alinhamento</span>
        <div className="flex items-center gap-2">
          <div className="box-select flex items-center justify-center w-full col-span-1 mt-2">
            <div className="box__line box__line--top" />
            <div className="box__line box__line--right" />
            <div className="box__line box__line--bottom" />
            <div className="box__line box__line--left" />
            <select
              className="w-full text-center py-1 bg-gray-whats-dark cursor-pointer outline-none"
              value={dataPlayer.sheet.alignment}
              onChange={ async (e) => {
                dataPlayer.sheet.alignment = e.target.value
                await updateDataPlayer(session.id, dataPlayer, setShowMessage);
              }}
            >
              <option disabled value="">Escolha um Alinhamento</option>
              <option
                title="É a tendência de criaturas que se pode contar para fazer o que é correto como é esperado pela sociedade. Dragões dourados, paladinos e muitos anões são ordeiros e bons."
                value="Ordeiro e Bom"
              >
                Ordeiro e Bom
              </option>
              <option
                title="É a tendência do povo que faz o melhor que pode para ajudar outros de acordo com suas necessidades. Muitos celestiais, alguns gigantes das nuvens, e grande parte dos gnomos são neutros e bons"
                value="Neutro e Bom"
                >
                Neutro e Bom
              </option>
              <option
                title="É a tendência de criaturas que agem de acordo com sua própria consciência, se importando pouco com as expectativas dos outros. Dragões de cobre, muitos elfos e unicórnios são caóticos e bons"
                value="Caótico e Bom"
              >
                Caótico e Bom
              </option>
              <option
                title="É a tendência dos indivíduos que agem de acordo com as leis, tradições ou códigos pessoais. Muitos monges e alguns magos são ordeiros e neutros"
                value="Ordeiro e Neutro"
              >
                Ordeiro e Neutro
              </option>
              <option
                title="É a tendência daqueles que preferem manter distância de questões morais e não tomar partido, fazendo o que aparenta ser melhor conforme a situação. O povo lagarto, muitos druidas e diversos humanos são neutros."
                value="Neutro"
              >
                Neutro
              </option>
              <option
                title="É a tendência das criaturas que seguem seus caprichos, mantendo sua liberdade pessoal acima de tudo. Muitos bárbaros e ladinos, e alguns  bardos, são caóticos e neutros"
                value="Caótico e Neutro"
              >
                Caótico e Neutro
              </option>
              <option
                title="É a tendência das criaturas que conseguem metodicamente tudo o que querem, dentro dos limites de uma tradição, lei ou ordem. Diabos, dragões azuis e hobgoblins são ordeiros e maus."
                value="Ordeiro e Mau"
              >
                Ordeiro e Mau
              </option>
              <option
                title="É a tendência daqueles que farão tudo o que quiserem, sem compaixão ou remorso. Muitos drow, alguns gigantes das nuvens e yugoloths são neutros e maus"
                value="Neutro e Mau"
              >
                Neutro e Mau
              </option>
              <option
                title="É a tendência de criaturas que agem com violência arbitrária, estimulada por sua ganância, ódio ou sede de sangue. Demônios, dragões vermelhos e orcs são caóticos e maus"
                value="Caótico e Mau"
              >
                Caótico e Mau
              </option>
            </select>
          </div>
          <button
            type="button"
            className="rounded-full text-3xl mt-2 cursor-pointer hover:bg-white bg-gray-whats-dark transition-colors hover:text-black duration-400"
            onClick={ () => {} }
          >
            <IoIosInformationCircleOutline />
          </button>
        </div>
        </div>
      );
}