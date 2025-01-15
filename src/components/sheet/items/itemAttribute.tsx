import { useContext } from "react";
import contexto from "../../../context/context";

export default function ItemAttribute(
  props: {
    type: string,
    attribute: number,
    name: string
  }) {
  
  const { attribute, name, type } = props;
  const { provDataPlayer, calculateMod } = useContext(contexto);

  
  const calculateBonus = () => {
    if (provDataPlayer && provDataPlayer.sheet) {
      const findBonus = provDataPlayer.sheet.attributes.bonus.filter((bonusItem: any) => bonusItem.name === type);
      let bonusToAdd = 0;
      for (let i = 0; i < findBonus.length; i += 1) {
        bonusToAdd += findBonus[i].value;
      }
      return bonusToAdd;
    } return 0;
  }

  const calculateModif = () => {
    if(provDataPlayer && provDataPlayer.sheet) {
      const findBonus = provDataPlayer.sheet.attributes.bonus.filter((bonusItem: any) => bonusItem.name === type);
      let bonusToAdd = 0;
      for (let i = 0; i < findBonus.length; i += 1) {
        bonusToAdd += findBonus[i].value;
      }
      return calculateMod(attribute + bonusToAdd);
    } return 0;
  }

  return(
    <div className="w-full gap-4 text-sm mr-3 h-full">
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="box__line box__line--top"></div>
        <div className="box__line box__line--right"></div>
        <div className="box__line box__line--bottom"></div>
        <div className="box__line box__line--left"></div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">{ attribute + calculateBonus() }</p>
          <p className="text-xs pb-1 text-center">{ name }</p>
          <p className="text-xs pb-1">Mod: ({ calculateModif() > 0 ? '+' : '' }{ calculateModif() })</p>
        </div>
      </div>
    </div>
  );
}