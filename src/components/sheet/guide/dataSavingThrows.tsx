import { useContext } from "react";
import contexto from "../../../context/context";
import ItemSavingThrow from "../items/itemSavingThrow";

export default function DataSavingThrows() {
  const { calculateMod, provDataPlayer } = useContext(contexto);

  if (provDataPlayer && provDataPlayer.sheet)
  return(
    <div className="col-span-2 row-span-2 h-full"> 
      <div className="relative flex items-start justify-center w-full h-full">
        <div className="box__line box__line--top"></div>
        <div className="box__line box__line--right"></div>
        <div className="box__line box__line--bottom"></div>
        <div className="box__line box__line--left"></div>
        <div className="w-full flex flex-col items-start justify-center text-sm p-3">
        <div className="w-full text-center pb-2">
          Salvaguardas
          <hr className="bg-black h-[0.05rem] border-0" />
        </div>
        <ItemSavingThrow
          name="Força"
          proficiency={ provDataPlayer.sheet.proficiency }
          mod={calculateMod(provDataPlayer.sheet.attributes.strength.value + provDataPlayer.sheet.attributes.strength.bonus)}
          trained={provDataPlayer.sheet.attributes.strength.proficiency}
        />
        <ItemSavingThrow
          name="Destreza"
          proficiency={ provDataPlayer.sheet.proficiency }
          mod={calculateMod(provDataPlayer.sheet.attributes.dexterity.value + provDataPlayer.sheet.attributes.dexterity.bonus)}
          trained={provDataPlayer.sheet.attributes.dexterity.proficiency}
        />
        <ItemSavingThrow
          name="Constituição"
          proficiency={ provDataPlayer.sheet.proficiency }
          mod={calculateMod(provDataPlayer.sheet.attributes.constitution.value + provDataPlayer.sheet.attributes.constitution.bonus)}
          trained={provDataPlayer.sheet.attributes.constitution.proficiency}
        />
        <ItemSavingThrow
          name="Inteligência"
          proficiency={ provDataPlayer.sheet.proficiency }
          mod={calculateMod(provDataPlayer.sheet.attributes.intelligence.value + provDataPlayer.sheet.attributes.intelligence.bonus)}
          trained={provDataPlayer.sheet.attributes.intelligence.proficiency}
        />
        <ItemSavingThrow
          name="Sabedoria"
          proficiency={ provDataPlayer.sheet.proficiency }
          mod={calculateMod(provDataPlayer.sheet.attributes.wisdom.value + provDataPlayer.sheet.attributes.wisdom.bonus)}
          trained={provDataPlayer.sheet.attributes.wisdom.proficiency}
        />
        <ItemSavingThrow
          name="Carisma"
          proficiency={ provDataPlayer.sheet.proficiency }
          mod={calculateMod(provDataPlayer.sheet.attributes.charisma.value + provDataPlayer.sheet.attributes.charisma.bonus)}
          trained={provDataPlayer.sheet.attributes.charisma.proficiency}
        />
        </div>
      </div>
    </div>
  );
}