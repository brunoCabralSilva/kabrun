import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import listRaces from '../../../data/races.json';
import listTalents from '../../../data/talents.json';
import listLanguages from '../../../data/languages.json';
import listBreaths from '../../../data/breaths.json';
import skillsList from '../../../data/skills.json';
import { updateDataPlayer } from "../../../firebase/players";
import { applyRace, applySubrace } from "../../../firebase/utilitiesRaces";

export default function Race() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [race, setRace] = useState<any>(null);
  const [newSkill, setNewSkill] = useState('');
  const [newTalent, setNewTalent] = useState({ name: '' });
  const [newLanguage, setNewLanguage] = useState<any>({ name: '' });
  const [raceSelected, setRaceSelected] = useState<any>(null);
  const [alternativeHuman, setAlternativeHuman] = useState(false);
  const [listAttributes, setListAttributes] = useState<string[]>([]);
  const [listSkills, setListSkills] = useState<string[]>([]);
  const [ breathType, setBreathType] = useState<{ dragon: string, type: string, attack: string }>({ dragon: '', type: '', attack: '' });
  const { showSheet, session, players, returnAttribute, setShowMessage, calculateMod, setOptionGuide, setShowSheet } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) {
      setDataPlayer(findPlayer);
      setRaceSelected(listRaces.find((racesItem: any) => racesItem.name === findPlayer.sheet.race));
      setRace(findPlayer.sheet.race);
    } else setShowSheet({ show: false, id: '' });
  }, [session, players]);

  const updateData = async () => {
    if (race === '') setShowMessage({ show: true, text: 'Necessário preencher uma Raça para continuar' });
    else if ((race === 'Humano' || race === 'Meio Elfo') && newLanguage.name === '') setShowMessage({ show: true, text: 'Necessário Selecionar uma Linguagem' });
    else if (((race === 'Humano' && alternativeHuman) || race === 'Meio Elfo') && listAttributes.length !== 2) setShowMessage({ show: true, text: 'Necessário Selecionar um total de 2 atributos' });
    else if (race === 'Humano' && alternativeHuman && newSkill === '') setShowMessage({ show: true, text: 'Necessário Selecionar uma Perícia' });
    else if (race === 'Humano' && alternativeHuman && newTalent.name === '') setShowMessage({ show: true, text: 'Necessário Selecionar um Talento' });
    else if (race === 'Meio Elfo' && listSkills.length !== 2) setShowMessage({ show: true, text: 'Necessário Selecionar um total de 2 Perícias' });
    else if (race === 'Draconato' && breathType.dragon === '') setShowMessage({ show: true, text: 'Necessário escolher uma Ancestralidade Dracônica' });
    else {
      const playerData = dataPlayer;
      if ((race === 'Humano' && alternativeHuman)) {
        playerData.sheet = applyRace(playerData.sheet, race, calculateMod, { skill: newSkill, list: listAttributes });
      } else if (race === 'Meio Elfo') {
        playerData.sheet = applyRace(playerData.sheet, race, calculateMod, { skill: listSkills, list: listAttributes });
      } else if (race === 'Draconato') {
        playerData.sheet = applyRace(playerData.sheet, race, calculateMod, breathType);
      } else playerData.sheet = applyRace(playerData.sheet, race, calculateMod, null);
      playerData.sheet.race = race;
      const listRacesData = listRaces.find((racesItem: any) => racesItem.name === playerData.sheet.race);
      if (listRacesData) {
        const listSubraces = listRacesData.subraces.find((subraceItem: any) => subraceItem.name === playerData.sheet.subrace);
        if (!listSubraces) {
          playerData.sheet = applySubrace(playerData.sheet, '', calculateMod);
          playerData.sheet.subrace = '';
        }
      }
      if (race === 'Humano' && alternativeHuman) {
        playerData.sheet.talents = [...playerData.sheet.talents, { ...newTalent, font: 'humano' }];
        playerData.sheet.skills[newSkill].font = [ ...playerData.sheet.skills[newSkill].font, 'humano'];
        playerData.sheet.skills[newSkill].trained = true;
      }
      if (race === 'Humano') playerData.sheet.languages = [...playerData.sheet.languages, { ...newLanguage, font: 'humano' }];
      if (race === 'Meio Elfo') playerData.sheet.languages = [...playerData.sheet.languages, { ...newLanguage, font: 'meio elfo' }];
      await updateDataPlayer(session.id, playerData, setShowMessage);
      if (race === 'Humano' || race === 'Meio Orc' || race === 'Meio Elfo' || race === 'Draconato') setOptionGuide('class');
      else setOptionGuide('subrace');
    }
  };
  
  if (dataPlayer)
    return(
      <div className="flex flex-col gap-2 h-90vh overflow-y-auto p-4 w-full justify-start items-center relative bg-gray-whats-dark border-white border-2">
        <div className="h-full w-full flex flex-col justify-start items-center">
          <div className="capitalize w-full">
            <span className="pr-3 pb-3">Escolha uma Raça</span>
            <div className="w-full grid grid-cols-4 gap-3 mt-3">
              {
                listRaces.map((itemRace: any, index: number) => (
                <button
                  type="button"
                  key={index}
                  onClick={ () => {
                    setRace(itemRace.name);
                    setRaceSelected(listRaces.find((racesItem: any) => racesItem.name === itemRace.name));
                  }}
                  className={`${itemRace.name === race && 'bg-black'} box-select flex items-center justify-center w-full col-span-1 p-3`}
                >
                  <div className="box__line box__line--top" />
                  <div className="box__line box__line--right" />
                  <div className="box__line box__line--bottom" />
                  <div className="box__line box__line--left" />
                  <div>{ itemRace.name }</div>
                </button>
                ))
              }
            </div>
            {
              race === "Humano" &&
              <div className="mt-4">
                <input
                  checked={alternativeHuman}
                  onChange={ () => {
                    const humans = listRaces.find((raceItem: any) => raceItem.name === 'Humano');
                    if (humans) {
                      if (alternativeHuman)
                        setRaceSelected(listRaces.find((racesItem: any) => racesItem.name === race));
                      else
                        setRaceSelected({
                          ...raceSelected,
                          skills: humans.optionals,
                          attributes: [{ name: 2, value: 2 }],
                        });
                    }
                    setAlternativeHuman(!alternativeHuman);
                  }}
                  type="checkbox"
                />
                Marque se deseja usar os traços Raciais alternativos dos Humanos
              </div>
            }
            <div className="">
              {
                raceSelected &&
                <div
                  className="mt-4 p-3 border-2 border-white text-justify h-full"
                >
                  <p className="text-xl pb-2 font-bold capitalize">{ raceSelected.name }</p>
                  <div className="flex pt-1">
                    <span className="font-bold pr-1">Bônus em Habilidade:</span>
                    <div className="flex font-normal">
                      { 
                        raceSelected.attribute.map((attr: any, index2: number) => (
                          <div key={index2}>
                            <span className="pr-1">
                              {
                                race === 'Humano'
                                ? alternativeHuman ? '+ 1 em dois atributos' : '+ 1 em todos os atributos'
                                : `+ ${ attr.value } em ${ returnAttribute(attr.name) }${(index2 + 1) === raceSelected.attribute.length ? '.' : ', '}`
                              }
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className="pt-1">
                    <span className="font-bold pr-1">Idade:</span>
                    <span className="font-normal">{ raceSelected.age }</span>
                  </div>
                  <div className="pt-1">
                    <span className="font-bold pr-1">Tendência:</span>
                    <span className="font-normal">{ raceSelected.alignment }</span>
                  </div>
                  <div className="pt-1">
                    <span className="font-bold pr-1">Tamanho:</span>
                    <span className="font-normal">{ raceSelected.size }</span>
                  </div>
                  <div className="pt-1">
                    <span className="font-bold pr-1">Deslocamento:</span>
                    <span className="font-normal">{ raceSelected.speed } metros </span>
                  </div>
                  <div>
                    {
                      raceSelected.skills.map((skill: any, index2: number) => (
                        <div key={ index2 }>
                          {
                            skill.name !== ''
                            &&  <span className="capitalize font-bold">
                                  {skill.name}
                                </span> }
                                <span className="px-1">-</span>
                                <span className="font-normal">
                                  { skill.description }
                                </span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              }
            </div>
          </div>
          {
            (race === 'Humano' || race === 'Meio Elfo') &&
            <div className="w-full mt-5">
              <p>Escolha um Idioma à sua Escolha</p>
              <div className="flex items-center gap-2 my-4 w-full">
                <div className="box-select flex items-center justify-center w-full col-span-1 px-2 pt-1">
                  <div className="box__line box__line--top" />
                  <div className="box__line box__line--right" />
                  <div className="box__line box__line--bottom" />
                  <div className="box__line box__line--left" />
                  <div className="capitalize w-full">
                    <div className={`flex items-center gap-2`}>
                      <select
                        className="w-full text-left bg-gray-whats-dark cursor-pointer outline-none mb-1"
                        value={newLanguage.name}
                        onChange={ (e: any) => setNewLanguage(listLanguages.find((language: any) => language.name === e.target.value))
                        }
                      >
                        <option disabled value="">Idiomas</option>
                        {
                          race === 'Humano'
                          ? listLanguages
                          .filter(language => session.books.includes(language.book))
                          .filter(language => !dataPlayer.sheet.languages.some((lang: any) => lang.name === language.name))
                          .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
                          .map((langItem: any, index: number) => (
                            <option key={index} value={ langItem.name }>{ langItem.name }</option>
                          ))
                          : listLanguages
                          .filter(language => session.books.includes(language.book))
                          .filter(language => language.name !== 'Comum' && language.name !== 'Élfico')
                          .filter(language => !dataPlayer.sheet.languages.some((lang: any) => lang.name === language.name))
                          .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
                          .map((langItem: any, index: number) => (
                            <option key={index} value={ langItem.name }>{ langItem.name }</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {
            (race === 'Meio Elfo' || (race === 'Humano' && alternativeHuman)) &&
            <div className="w-full mt-5">
              Escolha dois atributos que irão adquirir o Bônus de +1 em cada
              <div className="grid grid-cols-3">
                <button
                  type="button"
                  onClick={ () => {
                    if (listAttributes.find((attribute: any) => attribute === 'strength')) {
                      setListAttributes(listAttributes.filter((attribute: any) => attribute !== 'strength'));
                    } else setListAttributes([...listAttributes, 'strength']);
                  }}
                  className={`py-2 border border-white ${listAttributes.find((attr: any) => attr === 'strength') && 'bg-white text-black'}`}
                >Força</button>
                <button
                  type="button"
                  onClick={ () => {
                    if (listAttributes.find((attribute: any) => attribute === 'dexterity')) {
                      setListAttributes(listAttributes.filter((attribute: any) => attribute !== 'dexterity'));
                    } else setListAttributes([...listAttributes, 'dexterity']);
                  }}
                  className={`py-2 border border-white ${listAttributes.find((attr: any) => attr === 'dexterity') && 'bg-white text-black'}`}
                >Destreza</button>
                <button
                  type="button"
                  onClick={ () => {
                    if (listAttributes.find((attribute: any) => attribute === 'constitution')) {
                      setListAttributes(listAttributes.filter((attribute: any) => attribute !== 'constitution'));
                    } else setListAttributes([...listAttributes, 'constitution']);
                  }}
                  className={`py-2 border border-white ${listAttributes.find((attr: any) => attr === 'constitution') && 'bg-white text-black'}`}
                >Constituição</button>
                <button
                  type="button"
                  onClick={ () => {
                    if (listAttributes.find((attribute: any) => attribute === 'intelligence')) {
                      setListAttributes(listAttributes.filter((attribute: any) => attribute !== 'intelligence'));
                    } else setListAttributes([...listAttributes, 'intelligence']);
                  }}
                  className={`py-2 border border-white ${listAttributes.find((attr: any) => attr === 'intelligence') && 'bg-white text-black'}`}
                >Inteligência</button>
                <button
                  type="button"
                  onClick={ () => {
                    if (listAttributes.find((attribute: any) => attribute === 'wisdom')) {
                      setListAttributes(listAttributes.filter((attribute: any) => attribute !== 'wisdom'));
                    } else setListAttributes([...listAttributes, 'wisdom']);
                  }}
                  className={`py-2 border border-white ${listAttributes.find((attr: any) => attr === 'wisdom') && 'bg-white text-black'}`}
                >Sabedoria</button>
                <button
                  type="button"
                  onClick={ () => {
                    if (listAttributes.find((attribute: any) => attribute === 'charisma')) {
                      setListAttributes(listAttributes.filter((attribute: any) => attribute !== 'charisma'));
                    } else setListAttributes([...listAttributes, 'charisma']);
                  }}
                  className={`py-2 border border-white ${listAttributes.find((attr: any) => attr === 'charisma') && 'bg-white text-black'}`}
                >Carisma</button>
              </div>
            </div>
          }
          {
            race === 'Humano' && alternativeHuman &&
            <div className="w-full">
              <div className="w-full mt-5">
                <p>Escolha uma Perícia adicional</p>
                <div className="flex items-center gap-2 my-4 w-full">
                  <div className="box-select flex items-center justify-center w-full col-span-1 px-2 pt-1">
                    <div className="box__line box__line--top" />
                    <div className="box__line box__line--right" />
                    <div className="box__line box__line--bottom" />
                    <div className="box__line box__line--left" />
                    <div className="capitalize w-full">
                      <div className={`flex items-center gap-2`}>
                        <select
                          className="w-full text-left bg-gray-whats-dark cursor-pointer outline-none mb-1"
                          value={newSkill}
                          onChange={ (e) => setNewSkill(e.target.value) }
                        >
                          <option disabled value="">Perícias</option>
                          {
                            skillsList.map((skillItem: any, index: number) => (
                              <option
                                key={index}
                                value={skillItem.value}
                              >
                                {skillItem.name}
                              </option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>Selecione um talento adicional</div>
                <div className="grid grid-cols-2">
                  {
                    listTalents.map((talent: any, index: number) => (
                      <button
                        type="button"
                        onClick={() => {
                          if (newTalent.name === talent.name) setNewTalent({ name: '' })
                          else setNewTalent(talent);
                        }}
                        key={ index }
                        className={`p-3 border-2 border-black ${newTalent.name === talent.name && 'bg-white text-black'}`}
                      >
                        <p className="text-xl pb-2 font-bold">{ talent.name } </p>
                        {
                          talent.prerequisite &&
                          <p className="pb-2 font-bold">Pré-Requisitos: { talent.prerequisite } </p>
                        }
                        <p>
                          <span className="font-bold pr-1">Descrição:</span>
                          <span>{ talent.description }</span>
                        </p>
                        {
                          talent.benefits &&
                          <ul className="py-2 pl-6">
                            {
                              talent.benefits.map((benefit: any, index2: number) => (
                                <li key={ index2 } className="list-disc">
                                  <span className="capitalize pr-1">{ benefit }</span>
                                </li>
                              ))
                            }
                          </ul>
                        }
                        <p>
                          <span className="font-bold pr-1">Fonte:</span>
                          <span>{ talent.book }, pg. { talent.pg }</span>
                        </p>
                      </button>
                    ))
                  }
                </div>
              </div>
            </div>
          }
          {
            race === 'Meio Elfo' &&
            <div className="w-full">
              Escolha duas Perícias
              <div className="grid grid-cols-3 w-full">
                {
                  skillsList.map((skillItem: any, index: number) => (
                  <button
                    key={index}
                    type="button"
                    onClick={ () => {
                      if (listSkills.find((skill: any) => skill === skillItem.value)) {
                        setListSkills(listSkills.filter((skill: any) => skill !== skillItem.value));
                      } else setListSkills([...listSkills, skillItem.value]);
                    }}
                    className={`py-2 border border-white ${listSkills.find((skl: any) => skl === skillItem.value) && 'bg-white text-black'}`}
                  >
                    { skillItem.name }
                  </button>
                  ))
                }
              </div>
            </div>
          }
          {
            race === 'Draconato' &&
            <div className="w-full">
              Escolha a Herança Dracônica
              <div className="w-full grid grid-cols-1">
                <div className="w-full grid grid-cols-3 border border-white mt-1 py-2">
                  <div className="font-bold w-full text-center">Dragão</div>
                  <div className="font-bold w-full text-center">Tipo de Dano</div>
                  <div className="font-bold w-full text-center">Ataque do Sopro</div>
                </div>
                {
                  listBreaths.map((breath: any, index: number) => (
                    <button
                      key={index}
                      type="button"
                      onClick={ () => setBreathType(breath) }
                      className={`w-full grid grid-cols-3 border border-white mt-1 py-2 ${breathType.dragon === breath.dragon && 'text-black bg-white'}`}
                    >
                      <div>{ breath.dragon }</div>
                      <div>{ breath.type }</div>
                      <div>{ breath.attack }</div>
                    </button>
                  ))
                }
              </div>
            </div>
          }
          <div className="w-full flex justify-between col-span-10 py-3">
            <button
              onClick={ () => setOptionGuide('initials') }
              className="break-words items-center justify-center text-sm font-medium hover:text-white p-2 border-2 border-white"
              >
                Anterior
            </button>
            <button
              onClick={ updateData }
              className="break-words items-center justify-center text-sm font-medium hover:text-white p-2 border-2 border-white"
              >
                Próximo
            </button>
          </div>
        </div>
      </div>
  );
}