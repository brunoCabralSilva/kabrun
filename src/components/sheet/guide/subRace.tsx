import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import races from '../../../data/races.json';
import listRaces from '../../../data/races.json';
import listMagics from '../../../data/magics.json';
import listClasses from '../../../data/classes.json';
import listLanguages from '../../../data/languages.json';
import { updateDataPlayer } from "../../../firebase/players";
import { applySubRace } from "../../../firebase/utilitiesRaces";

export default function SubRaces() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [subRace, setSubRace] = useState<any>(null);
  const [subRaceSelected, setSubRaceSelected] = useState<any>(null);
  const [race, setRace] = useState<any>(null);
  const [languagesNotAdded, setLanguagesNotAdded] = useState<any>([]);
  const [languagesAdded, setLanguagesAdded] = useState<any>([]);
  const [newLanguage, setNewLanguage] = useState<{ name: string, title: string, book: string}>({ name: '', title: '', book: ''});
  const [newMagic, setNewMagic] = useState({ name: '' });
  const { showSheet, session, players, returnAttribute, setShowMessage, calculateMod, setOptionGuide, setShowSheet } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) {
      setDataPlayer(findPlayer);
      const listRacesData = listRaces.find((racesItem: any) => racesItem.name === findPlayer.sheet.race);
      setRace(listRacesData);
      if (listRacesData) {
        const listSubRaces = listRacesData.subraces.find((subRaceItem: any) => subRaceItem.name === findPlayer.sheet.subRace);
        setSubRaceSelected(listSubRaces);
        setSubRace(findPlayer.sheet.subRace);
      }
      const filteredLanguages = listLanguages
        .filter(language => session.books.includes(language.book))
        .filter(language => !findPlayer.sheet.languages.some((lang: any) => lang.name === language.name))
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));
      setLanguagesNotAdded(filteredLanguages);
      setLanguagesAdded(findPlayer.sheet.languages);
    } else setShowSheet({ show: false, id: '' });
  }, [session, players]);

  const updateData = async () => {
    if (subRace === '' || subRace === null) setShowMessage({ show: true, text: 'Necessário preencher uma SubRaça para continuar' });
    else if (subRace === 'Alto Elfo' && newLanguage.name === '') setShowMessage({ show: true, text: 'Necessário inserir um Idioma Adicional' });
    else if (subRace === 'Alto Elfo' && newMagic.name === '') setShowMessage({ show: true, text: 'Necessário escolher um dos Truques de Mago listados Abaixo' });
    else {
      const playerData = dataPlayer;
      playerData.sheet = applySubRace(playerData.sheet, subRace, calculateMod);
      playerData.sheet.subRace = subRace;
      if (subRace === 'Alto Elfo') {
        const magicHighElf: any = newMagic;
        magicHighElf.font = 'alto elfo';
        const languageHighElf: any = newLanguage;
        languageHighElf.font = 'alto elfo';
        playerData.sheet.magics = [...playerData.sheet.magics, magicHighElf];
        playerData.sheet.languages = [...playerData.sheet.languages, languageHighElf];
      }
      await updateDataPlayer(session.id, playerData, setShowMessage);
      setOptionGuide('class');
    }
  };

  const returnGrid = (magic: any) => {
    switch(magic.name) {
      case "Animar Objetos": return 'grid-cols-7';
      case "Teletransporte": return 'grid-cols-5';
      default: return 'grid-cols-2';
    }
  }
  
  if (dataPlayer)
    return(
      <div className="flex flex-col gap-2 h-90vh overflow-y-auto p-4 w-full justify-start items-center relative bg-gray-whats-dark border-white border-2">
        <div className="capitalize w-full">
          <span className="pr-3 pb-3">Escolha uma SubRaça</span>
          <div className="w-full grid grid-cols-4 gap-3 mt-3">
            {
              race && race.subraces.map((itemSubRace: any, index: number) => (
              <button
                type="button"
                key={index}
                onClick={ () => {
                  setSubRace(itemSubRace.name);
                  setSubRaceSelected(race.subraces.find((subRacesItem: any) => subRacesItem.name === itemSubRace.name));
                }}
                className={`${itemSubRace.name === subRace && 'bg-black'} box-select flex items-center justify-center w-full col-span-1 p-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>{ itemSubRace.name }</div>
              </button>
              ))
            }
          </div>
          <div className="">
            {
              subRaceSelected &&
              <div
                className="mt-4 p-3 border-2 border-white text-justify h-full"
              >
                <p className="text-xl pb-2 font-bold capitalize">{ subRaceSelected.name }</p>
                <div className="flex pt-1">
                  <span className="font-bold pr-1">Bônus em Habilidade:</span>
                  <div className="flex font-normal">
                    <div>
                      <span className="pr-1">
                        {`+ ${ subRaceSelected.value ? subRaceSelected.value : 1 } em ${ returnAttribute(subRaceSelected.attribute)}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    subRaceSelected.skills.map((skill: any, index2: number) => (
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
        <div className="h-full w-full flex flex-col justify-start items-center">
          {
            races
            .filter((itemRace: any) => itemRace.name === subRace)
            .flatMap((itemRace: any) => itemRace.subraces).length > 0
            &&
            <div className="mt-3 capitalize w-full">
              <span className="pr-3 mb-3">SubRaça</span>
              <div className="flex items-center gap-2">
                <div className="box-select flex items-center justify-center w-full col-span-1 mt-2">
                  <div className="box__line box__line--top" />
                  <div className="box__line box__line--right" />
                  <div className="box__line box__line--bottom" />
                  <div className="box__line box__line--left" />
                  <select
                    className="w-full text-center py-1 bg-gray-whats-dark cursor-pointer outline-none"
                    value={subRace}
                    onChange={ (e) => setSubRace(e.target.value) }
                  >
                    <option disabled value="">Escolha uma SubRaça</option>
                    {
                      races
                      .filter((itemRace: any) => itemRace.name === subRace)
                      .flatMap((itemRace: any) =>
                        itemRace.subraces.map((subrace: any, index: number) => (
                          <option key={index} value={subrace.name}>
                            {subrace.name}
                          </option>
                        ))
                    )}
                  </select>
                </div>
              </div>
            </div>
          } 
          {
            subRace === 'Alto Elfo' &&
            <div>
              <div>
                <p>Escolha um Idioma adicional</p>
                <div className="flex items-center gap-2 my-4">
                  <div className="box-select flex items-center justify-center w-full col-span-1 px-2 pt-1">
                    <div className="box__line box__line--top" />
                    <div className="box__line box__line--right" />
                    <div className="box__line box__line--bottom" />
                    <div className="box__line box__line--left" />
                    <div className="capitalize w-full">
                      <div className={`flex items-center gap-2 ${ languagesAdded.length > 0 && 'pt-2'}`}>
                        <select
                          className={`${languagesAdded.length > 0 && 'pb-2 border-b border-white' } w-full text-left bg-gray-whats-dark cursor-pointer outline-none`}
                          value={newLanguage.name}
                          onChange={ (e) => {
                            const lang = listLanguages.find((lang: any) => lang.name === e.target.value);
                            if (lang) setNewLanguage(lang);
                          }}
                        >
                          <option disabled value="">Idiomas</option>
                          {
                            languagesNotAdded.map((language: any, index: number) => 
                              <option value={language.name} key={index}>
                                { language.name }
                              </option>
                            )
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-4">Escolha um Truque dentre a lista de truques do mago</p>
                <div className="grid-cols-2 grid w-full">
                  {
                    listMagics.filter((magic: any) => {
                      const mageMagics = listClasses.find((classItem: any) => classItem.name === 'Mago');
                      if (mageMagics) return mageMagics.magics.includes(magic.name) && magic.level === 0;
                      return false;
                    }).map((magic: any, index: number) => (
                      <button
                        type="button"
                        key={ index }
                        onClick={ () => {
                          if (newMagic && newMagic.name === magic.name) setNewMagic({ name: '' });
                          else setNewMagic(magic);
                        }}
                        className={`p-3 border-2 border-white gap-2 ${newMagic && newMagic.name === magic.name && 'bg-white text-black'}`}
                      >
                        <p className="text-normal pb-2 font-bold">{ magic.name } { magic.level === 0 ? '- Truque' : `- Nível ${ magic.level }`} de { magic.school } { magic.ritual && ' (Ritual)'}</p>
                        <div className="text-sm">
                          <p>
                            <span className="font-bold pr-1">Tempo de Conjuração:</span>
                            <span>{ magic.casting_time }</span>
                          </p>
                          <p>
                            <span className="font-bold pr-1">Alcance:</span>
                            <span>{ magic.range }</span>
                          </p>
                          <p>
                            <span className="font-bold pr-1">Componentes:</span>
                            <span>{ magic.components }</span>
                          </p>
                          <p>
                            <span className="font-bold pr-1">Duração:</span>
                            <span>{ magic.duration } { magic.contentration && ' (Concentração)' }</span>
                          </p>
                          <p>
                            <span className="font-bold pr-1">Descrição:</span>
                            <span>{ magic.description }</span>
                          </p>
                          {
                            magic.effects &&
                            <ul className="py-2 pl-6">
                              {
                                magic.effects.map((effect: any, index2: number) => (
                                  <li key={ index2 } className="list-disc">
                                    { effect.type !== '' && <span className="capitalize pr-1 font-bold">{effect.type} -</span> }{ effect.description }
                                  </li>
                                ))
                              }
                            </ul>
                          }
                          {
                            magic.statistics &&
                            <ul className="py-2">
                              {
                                magic.statistics.map((statistic: any, index2: number) => (
                                  <div key={ index2 } className="">
                                    <p className="pt-3 font-bold">{ statistic.type }</p>
                                    <div className={`font-bold grid border-2 mt-2 ${ returnGrid(magic) }`}>
                                      {
                                        Object.keys(statistic.data[0]).map((item: any, index4: number) => (
                                        <div key={index4} className="text-center border-l">{ item }</div>))
                                      }
                                    </div>
                                    { 
                                      statistic.data.map((dataItem: any, index3: number) => (
                                      <div key={index3} className={``}>
                                        <div className={`grid border-2 mt-1 ${returnGrid(magic)}`}>
                                          {
                                            Object.keys(dataItem).map((item: any, index4: number) => (
                                            <div className="text-center border-l" key={ index4 }>
                                              { dataItem[item] }
                                            </div>
                                            ))
                                          }
                                        </div>
                                      </div>
                                    )) }
                                  </div>
                                ))
                              }
                            </ul>
                          }
                          {
                            magic.higher_levels &&
                            <p>
                              <span className="font-bold pr-1">Em Níveis Superiores:</span>
                              <span>{ magic.higher_levels }</span>
                            </p>
                          }
                          <p>
                            <span className="font-bold pr-1">Fonte:</span>
                            <span>{ magic.book }, pg. { magic.pg }</span>
                          </p>
                        </div>
                      </button>
                    ))
                  }
                </div>
              </div>
              
            </div>
          }
          <div className="w-full flex justify-between col-span-10 py-3">
            <button
              onClick={ () => setOptionGuide('race') }
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