import { useContext } from "react";
import contexto from "../../../context/context";
import ItemSavingThrow from "../items/itemSavingThrow";

export default function DataSkills() {
  const { provDataPlayer } = useContext(contexto);

  if (provDataPlayer && provDataPlayer.sheet)
  return(
    <div className="col-span-5 row-span-2 h-full">
      <div className="relative flex items-start justify-center w-full h-full">
        <div className="box__line box__line--top"></div>
        <div className="box__line box__line--right"></div>
        <div className="box__line box__line--bottom"></div>
        <div className="box__line box__line--left"></div>
        <div className="grid grid-cols-3 w-full text-sm p-3">
          <div className="w-full text-center pb-3 col-span-3">
            Perícias
            <hr className="bg-black h-[0.05rem] border-0" />
          </div>
          <ItemSavingThrow
            name="Acrobacia (Des)"
            mod={ provDataPlayer.sheet.attributes.dexterity.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.acrobatics.trained }
          />
          <ItemSavingThrow
            name="Arcanismo (Int)"
            mod={ provDataPlayer.sheet.attributes.intelligence.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.arcana.trained }
          />
          <ItemSavingThrow
            name="Atletismo (For)"
            mod={ provDataPlayer.sheet.attributes.strength.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.athletics.trained }
          />
          <ItemSavingThrow
            name="Atuação (Car)"
            mod={ provDataPlayer.sheet.attributes.charisma.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.performance.trained }
          />
          <ItemSavingThrow
            name="Enganação (Car)"
            mod={ provDataPlayer.sheet.attributes.charisma.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.decepcion.trained }
          />
          <ItemSavingThrow
            name="Furtividade (Des)"
            mod={ provDataPlayer.sheet.attributes.dexterity.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.stealth.trained }
          />
          <ItemSavingThrow
            name="História (Int)"
            mod={ provDataPlayer.sheet.attributes.intelligence.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.history.trained }
          />
          <ItemSavingThrow
            name="Intimidação (Car)"
            mod={ provDataPlayer.sheet.attributes.charisma.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.intimidation.trained }
          />
          <ItemSavingThrow
            name="Intuição (Sab)"
            mod={ provDataPlayer.sheet.attributes.wisdom.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.insight.trained }
          />
          <ItemSavingThrow
            name="Investigação (Int)"
            mod={ provDataPlayer.sheet.attributes.intelligence.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.investigation.trained }
          />
          <ItemSavingThrow
            name="Lid. com Animais (Sab)"
            mod={ provDataPlayer.sheet.attributes.wisdom.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.animalHandling.trained }
          />
          <ItemSavingThrow
            name="Medicina (Sab)"
            mod={ provDataPlayer.sheet.attributes.wisdom.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.medicine.trained }
          />
          <ItemSavingThrow
            name="Natureza (Int)"
            mod={ provDataPlayer.sheet.attributes.intelligence.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.nature.trained }
          />
          <ItemSavingThrow
            name="Percepção (Sab)"
            mod={ provDataPlayer.sheet.attributes.wisdom.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.perception.trained }
          />
          <ItemSavingThrow
            name="Persuasão (Car)"
            mod={ provDataPlayer.sheet.attributes.charisma.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.persuasion.trained }
          />
          <ItemSavingThrow
            name="Prestidigitação (Des)"
            mod={ provDataPlayer.sheet.attributes.dexterity.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.sleightOfHand.trained }
          />
          <ItemSavingThrow
            name="Religião (Int)"
            mod={ provDataPlayer.sheet.attributes.intelligence.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.religion.trained }
          />
          <ItemSavingThrow
            name="Sobrevivência (Sab)"
            mod={ provDataPlayer.sheet.attributes.wisdom.mod }
            proficiency={ provDataPlayer.sheet.proficiency }
            trained={ provDataPlayer.sheet.skills.survival.trained }
          />
        </div>
      </div>
    </div>
  );
}