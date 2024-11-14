import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import { updatePlayerImage } from "../../../firebase/storage";
import { updateDataPlayer } from "../../../firebase/players";
import listAlignments from '../../../data/alignment.json';

export default function InitialData() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [alignment, setAlignment] = useState('');
  const { showSheet, session, players, setShowMessage, setOptionGuide, setShowSheet } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) {
      setDataPlayer(findPlayer);
      setName(findPlayer.sheet.name);
      setAlignment(findPlayer.sheet.alignment);
    } else setShowSheet({ show: false, id: '' });
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
              {  
                listAlignments.map((align: any, index: number) => (
                  <option
                    key={index}
                    title={ align.description }
                    value={ align.value }
                  >
                    { align.value }
                  </option> 
                ))
              }
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