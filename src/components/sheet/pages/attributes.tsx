import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";

export default function Attributes() {
  const [dataPlayer, setDataPlayer] = useState<any>(0);
  const [strength, setStrength] = useState<any>(0);
  const [dexterity, setDexterity] = useState<any>(0);
  const [constitution, setConstitution] = useState<any>(0);
  const [charisma, setCharisma] = useState<any>(0);
  const [wisdom, setWisdom] = useState<any>(0);
  const [intelligence, setIntelligence] = useState<any>(0);
  const [model, setModel] = useState('');
  const { session, showSheet, players } = useContext(contexto);

  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
    setStrength(findPlayer.sheet.attributes.strength.value);
    setDexterity(findPlayer.sheet.attributes.dexterity.value);
    setConstitution(findPlayer.sheet.attributes.constitution.value);
    setCharisma(findPlayer.sheet.attributes.charisma.value);
    setWisdom(findPlayer.sheet.attributes.wisdom.value);
    setIntelligence(findPlayer.sheet.attributes.intelligence.value);
  }, [session, players]);
  
  // const fixedAttributes = [15, 14, 13, 12, 10, 8];
  // const personalizedAttributes = {
  //   sum: 27,
  //   costs: [
  //     { 8: 0 },
  //     { 9: 1 },
  //     { 10: 2 },
  //     { 11: 3 },
  //     { 12: 4 },
  //     { 13: 5 },
  //     { 14: 7 },
  //     { 15: 9 },
  //   ]
  // }

  const calculateMod = (value: number) => {
    if (value === 1) return -5;
    else if (value >= 2 && value <= 3) return -4;
    else if (value >= 4 && value <= 5) return -3;
    else if (value >= 6 && value <= 7) return -2;
    else if (value >= 8 && value <= 9) return -1;
    else if (value >= 10 && value <= 11) return 0;
    else if (value >= 12 && value <= 13) return 1;
    else if (value >= 14 && value <= 15) return 2;
    else if (value >= 16 && value <= 17) return 3;
    else if (value >= 18 && value <= 19) return 4;
    else if (value >= 20 && value <= 21) return 5;
    else if (value >= 22 && value <= 23) return 6;
    else if (value >= 24 && value <= 25) return 7;
    else if (value >= 26 && value <= 27) return 8;
    else if (value >= 28 && value <= 29) return 9;
    else if (value === 30) return 10;
  };

  if (dataPlayer) {
    return(
      <div>
        <div className="flex items-center gap-2 w-full">
          <div className="box-select flex items-center justify-center w-full col-span-1 mt-2">
            <div className="box__line box__line--top" />
            <div className="box__line box__line--right" />
            <div className="box__line box__line--bottom" />
            <div className="box__line box__line--left" />
            <select
              className="w-full text-center py-1 bg-gray-whats-dark cursor-pointer outline-none"
              value={model}
              onChange={ (e) => {
                setModel(e.target.value);
              }}
            >
              <option disabled value="">Selecione um Modelo de Distribuição</option>
              <option value="fixo">Atributos Fixos (15, 14, 13, 12, 10, 8)</option>
              <option value="fixo">Atributos Personalizados</option>
              <option value="fixo">Atributos rolando Dados</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-4 mt-5">
          <div className="box flex items-center justify-center w-full col-span-1 mb-4">
            <div className="box__line box__line--top"></div>
            <div className="box__line box__line--right"></div>
            <div className="box__line box__line--bottom"></div>
            <div className="box__line box__line--left"></div>
            <div className="w-full h-full flex items-center justify-center text-2xl">{ strength }</div>
          </div>
          <div className="py-2 col-span-2 w-full">
            <div className="border-t-2 border-r-2 border-b-2 w-full pl-4 pr-2 py-1 rounded-r flex justify-bewteen items-center">
              <p className="w-full text-center">Força</p>
            </div>
          </div>
          <div className=""> 
            <div className="box flex items-center justify-center w-full col-span-1">
              <div className="box__line box__line--top"></div>
              <div className="box__line box__line--right"></div>
              <div className="box__line box__line--bottom"></div>
              <div className="box__line box__line--left"></div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">{ calculateMod(dataPlayer.sheet.attributes.strength.value) }</p>
                <p className="text-xs pb-1">Mod.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4">
          <div className="box flex items-center justify-center w-full col-span-1 mb-4">
            <div className="box__line box__line--top"></div>
            <div className="box__line box__line--right"></div>
            <div className="box__line box__line--bottom"></div>
            <div className="box__line box__line--left"></div>
            <div className="w-full h-full flex items-center justify-center text-2xl">{ dexterity }</div>
          </div>
          <div className="py-2 col-span-2 w-full">
            <div className="border-t-2 border-r-2 border-b-2 w-full pl-4 pr-2 py-1 rounded-r flex justify-bewteen items-center">
              <p className="w-full text-center">Destreza</p>
            </div>
          </div>
          <div className=""> 
            <div className="box flex items-center justify-center w-full col-span-1">
              <div className="box__line box__line--top"></div>
              <div className="box__line box__line--right"></div>
              <div className="box__line box__line--bottom"></div>
              <div className="box__line box__line--left"></div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">{ calculateMod(dataPlayer.sheet.attributes.dexterity.value) }</p>
                <p className="text-xs pb-1">Mod.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4">
          <div className="box flex items-center justify-center w-full col-span-1 mb-4">
            <div className="box__line box__line--top"></div>
            <div className="box__line box__line--right"></div>
            <div className="box__line box__line--bottom"></div>
            <div className="box__line box__line--left"></div>
            <div className="w-full h-full flex items-center justify-center text-2xl">{ constitution }</div>
          </div>
          <div className="py-2 col-span-2 w-full">
            <div className="border-t-2 border-r-2 border-b-2 w-full pl-4 pr-2 py-1 rounded-r flex justify-bewteen items-center">
              <p className="w-full text-center">Constituição</p>
            </div>
          </div>
          <div className=""> 
            <div className="box flex items-center justify-center w-full col-span-1">
              <div className="box__line box__line--top"></div>
              <div className="box__line box__line--right"></div>
              <div className="box__line box__line--bottom"></div>
              <div className="box__line box__line--left"></div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">{ calculateMod(dataPlayer.sheet.attributes.constitution.value) }</p>
                <p className="text-xs pb-1">Mod.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4">
          <div className="box flex items-center justify-center w-full col-span-1 mb-4">
            <div className="box__line box__line--top"></div>
            <div className="box__line box__line--right"></div>
            <div className="box__line box__line--bottom"></div>
            <div className="box__line box__line--left"></div>
            <div className="w-full h-full flex items-center justify-center text-2xl">{ intelligence }</div>
          </div>
          <div className="py-2 col-span-2 w-full">
            <div className="border-t-2 border-r-2 border-b-2 w-full pl-4 pr-2 py-1 rounded-r flex justify-bewteen items-center">
              <p className="w-full text-center">Inteligência</p>
            </div>
          </div>
          <div className=""> 
            <div className="box flex items-center justify-center w-full col-span-1">
              <div className="box__line box__line--top"></div>
              <div className="box__line box__line--right"></div>
              <div className="box__line box__line--bottom"></div>
              <div className="box__line box__line--left"></div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">{ calculateMod(dataPlayer.sheet.attributes.intelligence.value) }</p>
                <p className="text-xs pb-1">Mod.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4">
          <div className="box flex items-center justify-center w-full col-span-1 mb-4">
            <div className="box__line box__line--top"></div>
            <div className="box__line box__line--right"></div>
            <div className="box__line box__line--bottom"></div>
            <div className="box__line box__line--left"></div>
            <div className="w-full h-full flex items-center justify-center text-2xl">{ wisdom }</div>
          </div>
          <div className="py-2 col-span-2 w-full">
            <div className="border-t-2 border-r-2 border-b-2 w-full pl-4 pr-2 py-1 rounded-r flex justify-bewteen items-center">
              <p className="w-full text-center">Sabedoria</p>
            </div>
          </div>
          <div className=""> 
            <div className="box flex items-center justify-center w-full col-span-1">
              <div className="box__line box__line--top"></div>
              <div className="box__line box__line--right"></div>
              <div className="box__line box__line--bottom"></div>
              <div className="box__line box__line--left"></div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">{ calculateMod(dataPlayer.sheet.attributes.wisdom.value) }</p>
                <p className="text-xs pb-1">Mod.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4">
          <div className="box flex items-center justify-center w-full col-span-1 mb-4">
            <div className="box__line box__line--top"></div>
            <div className="box__line box__line--right"></div>
            <div className="box__line box__line--bottom"></div>
            <div className="box__line box__line--left"></div>
            <div className="w-full h-full flex items-center justify-center text-2xl">{ charisma }</div>
          </div>
          <div className="py-2 col-span-2 w-full">
            <div className="border-t-2 border-b-2 w-full pl-4 pr-2 py-1 flex justify-bewteen items-center">
              <p className="w-full text-center">Carisma</p>
            </div>
          </div>
          <div className=""> 
            <div className="box flex items-center justify-center col-span-1">
              <div className="box__line box__line--top"></div>
              <div className="box__line box__line--right"></div>
              <div className="box__line box__line--bottom"></div>
              <div className="box__line box__line--left"></div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">{ calculateMod(dataPlayer.sheet.attributes.charisma.value) }</p>
                <p className="text-xs pb-1">Mod.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}