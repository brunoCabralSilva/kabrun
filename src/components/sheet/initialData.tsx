import { useContext, useEffect, useState } from "react";
import contexto from "../../context/context";
import { updatePlayerImage } from "../../firebase/storage";
import { updateDataPlayer } from "../../firebase/players";

export default function InitialData() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [alignment, setAlignment] = useState('');
  const { showSheet, session, players, setShowMessage, setOptionGuide } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
    setName(findPlayer.sheet.name);
    setAlignment(findPlayer.sheet.alignment);
  }, [session, players]);

  const updateData = async () => {
    if (name === '' || name.length < 2) setShowMessage({ show: true, text: 'Necessário preencher um nome com pelo menos 2 caracteres' });
    else if (alignment === '') setShowMessage({ show: true, text: 'Necessário escolher um Alinhamento para o Personagem' });
    else { 
      if (image) {
        const newImage = await updatePlayerImage(session.id, dataPlayer.id, image, setShowMessage);
        dataPlayer.sheet.profileImage = newImage;
      }
      dataPlayer.sheet.alignment = alignment;
      dataPlayer.sheet.name = name;
      await updateDataPlayer(session.id, dataPlayer, setShowMessage);
      setOptionGuide('race');
    }
  };
  
  const handleImage = (e: any) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };
  
  if (dataPlayer)
    return(
      <div className="flex flex-col bg-gray-900 gap-2 h-90vh overflow-y-auto p-4">
        <span className="pr-3 col-span-10 mb-1">Nome do Personagem:</span>
        <input
          type="text"
          className="border-2 border-white text-white w-full bg-black outline-none p-1 col-span-10 text-center py-2"
          placeholder="Nome"
          value={ name }
          onChange={(e) => {
            const sanitizedValue = e.target.value.replace(/\s+/g, ' ');
            setName(sanitizedValue);
          }}
        />
        <span className="w-full mb-1">Alinhamento:</span>
        <div className="w-full flex items-center gap-2">
          <div className="box-select flex items-center justify-center w-full col-span-1">
            <div className="box__line box__line--top" />
            <div className="box__line box__line--right" />
            <div className="box__line box__line--bottom" />
            <div className="box__line box__line--left" />
            <select
              className="w-full text-center py-2 bg-gray-whats-dark cursor-pointer outline-none"
              value={alignment}
              onChange={ async (e) => setAlignment(e.target.value) }
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
        </div>
        <div className="z-10 relative flex items-center justify-center col-span-3 mt-5 rounded-full">
          <img
            className="w-40 h-40 object-cover relative rounded-full border-4 border-white"
            src={dataPlayer.sheet.profileImage}
          />
        </div>
        <div className="flex flex-col w-full mt-5">
          <label htmlFor="lastPassword" className="break-words mb-2 flex flex-col items-center w-full">
            <p className="break-words w-full pb-5 text-white text-start">Insira uma Imagem para seu Personagem (Recomendamos uma imagem com dimensões quadradas, pois ela será utilizada para a criação do token do personagem)</p>
            <div className="flex w-full gap-2">
              <input 
                id="image"
                name="image"
                type="file"
                onChange={handleImage}
                className="w-full break-words shadow-sm bg-black border border-white text-white text-sm block p-2.5 placeholder-gray-400"
              />
            </div>
          </label>
        </div>
        <div className="w-full flex justify-end col-span-10">
          <button
            onClick={ updateData }
            className="break-words items-center justify-center text-sm font-medium hover:text-white p-2 border-2 border-white"
            >
            <span className="">
              Próximo
            </span>
          </button>
        </div>
      </div>
  );
}