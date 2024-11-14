import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import ItemAttribute from "../items/itemAttribute";
import ItemSavingThrow from "../items/itemSavingThrow";

export default function Skills() {
  const [dataPlayer, setDataPlayer] = useState<any>(0);
  const [strength, setStrength] = useState<any>(0);
  const [dexterity, setDexterity] = useState<any>(0);
  const [constitution, setConstitution] = useState<any>(0);
  const [charisma, setCharisma] = useState<any>(0);
  const [wisdom, setWisdom] = useState<any>(0);
  const [intelligence, setIntelligence] = useState<any>(0);
  const { session, showSheet, players, calculateMod, setShowSheet } = useContext(contexto);

  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) {
      setDataPlayer(findPlayer);
      setStrength(findPlayer.sheet.attributes.strength.value);
      setDexterity(findPlayer.sheet.attributes.dexterity.value);
      setConstitution(findPlayer.sheet.attributes.constitution.value);
      setCharisma(findPlayer.sheet.attributes.charisma.value);
      setWisdom(findPlayer.sheet.attributes.wisdom.value);
      setIntelligence(findPlayer.sheet.attributes.intelligence.value);
    } else setShowSheet({ show: false, id: '' });
  }, [session, players]);

  if (dataPlayer) {
    return(
      <div className="">
        <div className="grid grid-cols-4 w-full h-full gap-3">
          <div className="col-span-1 w-full">
            <ItemAttribute
              bonus={dataPlayer.sheet.attributes.strength.bonus}
              mod={ calculateMod(strength + dataPlayer.sheet.attributes.strength.bonus) }
              attribute={ strength + dataPlayer.sheet.attributes.strength.bonus }
              name="Força"
            />
            <ItemAttribute
              bonus={dataPlayer.sheet.attributes.dexterity.bonus}
              mod={ calculateMod(dexterity + dataPlayer.sheet.attributes.dexterity.bonus) }
              attribute={ dexterity + dataPlayer.sheet.attributes.dexterity.bonus }
              name="Destreza"
            />
            <ItemAttribute
              bonus={dataPlayer.sheet.attributes.constitution.bonus}
              mod={ calculateMod(constitution + dataPlayer.sheet.attributes.constitution.bonus) }
              attribute={ constitution + dataPlayer.sheet.attributes.constitution.bonus }
              name="Constituição"
            />
            <ItemAttribute
              bonus={dataPlayer.sheet.attributes.intelligence.bonus}
              mod={ calculateMod(intelligence + dataPlayer.sheet.attributes.intelligence.bonus) }
              attribute={ intelligence + dataPlayer.sheet.attributes.intelligence.bonus }
              name="Inteligência"
            />
            <ItemAttribute
              bonus={dataPlayer.sheet.attributes.wisdom.bonus}
              mod={ calculateMod(wisdom + dataPlayer.sheet.attributes.wisdom.bonus) }
              attribute={ wisdom + dataPlayer.sheet.attributes.wisdom.bonus }
              name="Sabedoria"
            />
            <ItemAttribute
              bonus={dataPlayer.sheet.attributes.charisma.bonus}
              mod={ calculateMod(charisma + dataPlayer.sheet.attributes.charisma.bonus) }
              attribute={ charisma + dataPlayer.sheet.attributes.charisma.bonus }
              name="Carisma"
            />
          </div>
          <div className="col-span-3 w-full h-screen">
            <div className="mt-3"> 
              <div className="relative flex items-center justify-center w-full ">
                <div className="box__line box__line--top"></div>
                <div className="box__line box__line--right"></div>
                <div className="box__line box__line--bottom"></div>
                <div className="box__line box__line--left"></div>
                <div className="w-full flex flex-col items-start justify-center text-sm p-3">
                  <div className="w-full text-center pb-2">
                    Salvaguardas
                    <hr />
                  </div>
                  <ItemSavingThrow
                    name="Força"
                    proficiency={ dataPlayer.sheet.proficiency }
                    mod={calculateMod(strength + dataPlayer.sheet.attributes.strength.bonus)}
                    trained={dataPlayer.sheet.attributes.strength.proficiency}
                  />
                  <ItemSavingThrow
                    name="Destreza"
                    proficiency={ dataPlayer.sheet.proficiency }
                    mod={calculateMod(dexterity + dataPlayer.sheet.attributes.dexterity.bonus)}
                    trained={dataPlayer.sheet.attributes.dexterity.proficiency}
                  />
                  <ItemSavingThrow
                    name="Constituição"
                    proficiency={ dataPlayer.sheet.proficiency }
                    mod={calculateMod(constitution + dataPlayer.sheet.attributes.constitution.bonus)}
                    trained={dataPlayer.sheet.attributes.constitution.proficiency}
                  />
                  <ItemSavingThrow
                    name="Inteligência"
                    proficiency={ dataPlayer.sheet.proficiency }
                    mod={calculateMod(intelligence + dataPlayer.sheet.attributes.intelligence.bonus)}
                    trained={dataPlayer.sheet.attributes.intelligence.proficiency}
                  />
                  <ItemSavingThrow
                    name="Sabedoria"
                    proficiency={ dataPlayer.sheet.proficiency }
                    mod={calculateMod(wisdom + dataPlayer.sheet.attributes.wisdom.bonus)}
                    trained={dataPlayer.sheet.attributes.wisdom.proficiency}
                  />
                  <ItemSavingThrow
                    name="Carisma"
                    proficiency={ dataPlayer.sheet.proficiency }
                    mod={calculateMod(charisma + dataPlayer.sheet.attributes.charisma.bonus)}
                    trained={dataPlayer.sheet.attributes.charisma.proficiency}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 pb-2"> 
              <div className="relative flex items-center justify-center w-full ">
                <div className="box__line box__line--top"></div>
                <div className="box__line box__line--right"></div>
                <div className="box__line box__line--bottom"></div>
                <div className="box__line box__line--left"></div>
                <div className="w-full flex flex-col items-start justify-center text-sm p-3">
                  <div className="w-full text-center pb-3">
                    Perícias
                    <hr />
                  </div>
                  <div className="flex flex-col items-center justify-between w-full">
                    <ItemSavingThrow
                      name="Acrobacia (Des)"
                      mod={ dataPlayer.sheet.attributes.dexterity.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.acrobatics.trained }
                    />
                    <ItemSavingThrow
                      name="Arcanismo (Int)"
                      mod={ dataPlayer.sheet.attributes.intelligence.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.arcana.trained }
                    />
                    <ItemSavingThrow
                      name="Atletismo (For)"
                      mod={ dataPlayer.sheet.attributes.strength.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.athletics.trained }
                    />
                    <ItemSavingThrow
                      name="Atuação (Car)"
                      mod={ dataPlayer.sheet.attributes.charisma.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.performance.trained }
                    />
                    <ItemSavingThrow
                      name="Enganação (Car)"
                      mod={ dataPlayer.sheet.attributes.charisma.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.decepcion.trained }
                    />
                    <ItemSavingThrow
                      name="Furtividade (Des)"
                      mod={ dataPlayer.sheet.attributes.dexterity.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.stealth.trained }
                    />
                    <ItemSavingThrow
                      name="História (Int)"
                      mod={ dataPlayer.sheet.attributes.intelligence.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.history.trained }
                    />
                    <ItemSavingThrow
                      name="Intimidação (Car)"
                      mod={ dataPlayer.sheet.attributes.charisma.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.intimidation.trained }
                    />
                    <ItemSavingThrow
                      name="Intuição (Sab)"
                      mod={ dataPlayer.sheet.attributes.wisdom.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.insight.trained }
                    />
                    <ItemSavingThrow
                      name="Investigação (Int)"
                      mod={ dataPlayer.sheet.attributes.intelligence.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.investigation.trained }
                    />
                    <ItemSavingThrow
                      name="Lidar com Animais (Sab)"
                      mod={ dataPlayer.sheet.attributes.wisdom.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.animalHandling.trained }
                    />
                    <ItemSavingThrow
                      name="Medicina (Sab)"
                      mod={ dataPlayer.sheet.attributes.wisdom.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.medicine.trained }
                    />
                    <ItemSavingThrow
                      name="Natureza (Int)"
                      mod={ dataPlayer.sheet.attributes.intelligence.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.nature.trained }
                    />
                    <ItemSavingThrow
                      name="Percepção (Sab)"
                      mod={ dataPlayer.sheet.attributes.wisdom.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.perception.trained }
                    />
                    <ItemSavingThrow
                      name="Persuasão (Car)"
                      mod={ dataPlayer.sheet.attributes.charisma.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.persuasion.trained }
                    />
                    <ItemSavingThrow
                      name="Prestidigitação (Des)"
                      mod={ dataPlayer.sheet.attributes.dexterity.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.sleightOfHand.trained }
                    />
                    <ItemSavingThrow
                      name="Religião (Int)"
                      mod={ dataPlayer.sheet.attributes.intelligence.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.religion.trained }
                    />
                    <ItemSavingThrow
                      name="Sobrevivência (Sab)"
                      mod={ dataPlayer.sheet.attributes.wisdom.mod }
                      proficiency={ dataPlayer.sheet.proficiency }
                      trained={ dataPlayer.sheet.skills.survival.trained }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}