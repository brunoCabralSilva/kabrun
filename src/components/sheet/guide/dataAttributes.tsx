import { useContext } from "react";
import ItemAttribute from "../items/itemAttribute";
import contexto from "../../../context/context";

export default function DataAttributes() {
  const { provDataPlayer, setEditAttributes, calculateMod } = useContext(contexto);

  if (provDataPlayer && provDataPlayer.sheet)
  return(
    <div className="col-span-7 grid grid-cols-7 gap-3">
      <button
        className="hover:bg-black hover:text-[#f0e9d2] transition-colors duration-400 w-full gap-4 text-sm mr-3 h-full"
        type="button"
        onClick={ () => setEditAttributes(true) }
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="box__line box__line--top"></div>
          <div className="box__line box__line--right"></div>
          <div className="box__line box__line--bottom"></div>
          <div className="box__line box__line--left"></div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold px-2 text-center">Distribuir Atributos</p>
          </div>
        </div>
      </button>
      <ItemAttribute
        bonus={provDataPlayer.sheet.attributes.strength.bonus}
        mod={ calculateMod(provDataPlayer.sheet.attributes.strength.value + provDataPlayer.sheet.attributes.strength.bonus) }
        attribute={ provDataPlayer.sheet.attributes.strength.value + provDataPlayer.sheet.attributes.strength.bonus }
        name="Força"
      />
      <ItemAttribute
        bonus={provDataPlayer.sheet.attributes.dexterity.bonus}
        mod={ calculateMod(provDataPlayer.sheet.attributes.dexterity.value + provDataPlayer.sheet.attributes.dexterity.bonus) }
        attribute={ provDataPlayer.sheet.attributes.dexterity.value + provDataPlayer.sheet.attributes.dexterity.bonus }
        name="Destreza"
      />
      <ItemAttribute
        bonus={provDataPlayer.sheet.attributes.constitution.bonus}
        mod={ calculateMod(provDataPlayer.sheet.attributes.constitution.value + provDataPlayer.sheet.attributes.constitution.bonus) }
        attribute={ provDataPlayer.sheet.attributes.constitution.value + provDataPlayer.sheet.attributes.constitution.bonus }
        name="Constituição"
      />
      <ItemAttribute
        bonus={provDataPlayer.sheet.attributes.intelligence.bonus}
        mod={ calculateMod(provDataPlayer.sheet.attributes.intelligence.value + provDataPlayer.sheet.attributes.intelligence.bonus) }
        attribute={ provDataPlayer.sheet.attributes.intelligence.value + provDataPlayer.sheet.attributes.intelligence.bonus }
        name="Inteligência"
      />
      <ItemAttribute
        bonus={provDataPlayer.sheet.attributes.wisdom.bonus}
        mod={ calculateMod(provDataPlayer.sheet.attributes.wisdom.value + provDataPlayer.sheet.attributes.wisdom.bonus) }
        attribute={ provDataPlayer.sheet.attributes.wisdom.value + provDataPlayer.sheet.attributes.wisdom.bonus }
        name="Sabedoria"
      />
      <ItemAttribute
        bonus={provDataPlayer.sheet.attributes.charisma.bonus}
        mod={ calculateMod(provDataPlayer.sheet.attributes.charisma.value + provDataPlayer.sheet.attributes.charisma.bonus) }
        attribute={ provDataPlayer.sheet.attributes.charisma.value + provDataPlayer.sheet.attributes.charisma.bonus }
        name="Carisma"
      />
    </div>
  );
}