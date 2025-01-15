import { useContext } from "react";
import ItemAttribute from "../items/itemAttribute";
import contexto from "../../../context/context";

export default function DataAttributes() {
  const { provDataPlayer, setEditAttributes } = useContext(contexto);

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
      <ItemAttribute type="strength" attribute={ provDataPlayer.sheet.attributes.strength.value } name="Força" />
      <ItemAttribute type="dexterity" attribute={ provDataPlayer.sheet.attributes.dexterity.value } name="Destreza" />
      <ItemAttribute type="constitution" attribute={ provDataPlayer.sheet.attributes.constitution.value } name="Constituição" />
      <ItemAttribute type="intelligence" attribute={ provDataPlayer.sheet.attributes.intelligence.value } name="Inteligência" />
      <ItemAttribute type="wisdom" attribute={ provDataPlayer.sheet.attributes.wisdom.value } name="Sabedoria" />
      <ItemAttribute type="charisma" attribute={ provDataPlayer.sheet.attributes.charisma.value } name="Carisma" />
    </div>
  );
}