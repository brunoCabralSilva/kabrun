import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import classList from '../../../data/classes.json';
import { updateDataPlayer } from "../../../firebase/players";
import { applyClass } from "../../../firebase/utilitiesClass";
import listMagics from '../../../data/magics.json';
import listClasses from '../../../data/classes.json';

export default function ClassPlayer() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [classPlayer, setClassPlayer] = useState<string>('');
  const { showSheet, session, players, setShowMessage, setOptionGuide, setShowSheet } = useContext(contexto);
  const [listSkills, setListSkills] = useState<string[]>([]);
  const [listOptions, setListOptions] = useState<string[]>([]);
  const [listAddedTruques, setListAddedTruques] = useState<any>([]);
  const [listAddedMagics, setListAddedMagics] = useState<any>([]);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) {
      setDataPlayer(findPlayer);
      setClassPlayer(findPlayer.sheet.class);
    } else setShowSheet({ show: false, id: '' });
  }, [session, players]);

  const updateData = async () => {
    if (classPlayer === '') setShowMessage({ show: true, text: 'Necessário preencher uma Classe para continuar' });
    else if (classPlayer === 'Bárbaro' && listSkills.length !== 2) setShowMessage({ show: true, text: 'Necessário selecionar um total de 2 Perícias' });
    else if (classPlayer === 'Bárbaro' && listOptions.length !== 2) setShowMessage({ show: true, text: 'Necessário escolher duas Opções dentre as listadas' });
    else if (classPlayer === 'Bardo' && listSkills.length !== 3) setShowMessage({ show: true, text: 'Necessário selecionar um total de 3 Perícias' });
    else if (classPlayer === 'Bardo' && listOptions.length !== 3) setShowMessage({ show: true, text: 'Necessário escolher três Opções dentre as listadas' });
    else if (classPlayer === 'Bardo' && listAddedTruques.length !== 2) setShowMessage({ show: true, text: 'Necessário selecionar um total de 2 Truques' });
    else if (classPlayer === 'Bardo' && listAddedMagics.length !== 4) setShowMessage({ show: true, text: 'Necessário selecionar um total de 4 Magias de Nível 1' });
    else {
      const playerData = dataPlayer;
      if (classPlayer === 'Bárbaro' || classPlayer === 'Bardo') {
        playerData.sheet = applyClass(playerData.sheet, classPlayer, { listSkills, listOptions });
      } else playerData.sheet = applyClass(playerData.sheet, classPlayer, null);
      playerData.sheet.class = classPlayer;
      playerData.sheet.magics = [...playerData.sheet.magics, ...listAddedMagics, ...listAddedTruques];
      await updateDataPlayer(session.id, playerData, setShowMessage);
      setOptionGuide('attributes');
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
            <div className="mt-3 capitalize w-full">
             <span className="pr-3 mb-3">Escolha uma Classe</span>
          </div>
          <div className="w-full grid grid-cols-4 gap-3 mt-3">
            {
              classList.map((itemClass: any, index: number) => (
              <button
                type="button"
                key={index}
                onClick={ () => {
                  setClassPlayer(itemClass.name);
                }}
                className={`${itemClass.name === classPlayer && 'bg-black'} box-select flex items-center justify-center w-full col-span-1 p-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>{ itemClass.name }</div>
              </button>
              ))
            }
          </div>
        </div>
        {
          (classPlayer === 'Bárbaro' || classPlayer === 'Bardo') &&
          <div>
            {
              classPlayer === 'Bárbaro' &&
              <div className="w-full mt-5 pb-2">
                Escolha duas Perícias
              </div>
            }
            {
              classPlayer === 'Bardo' &&
              <div className="w-full mt-5 pb-2">
                Escolha três Perícias
              </div>
            }
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => {
                  if (listSkills.includes('animalHandling')) {
                    setListSkills(listSkills.filter((skillItem: any) => skillItem !== 'animalHandling'));
                  } else setListSkills([...listSkills, 'animalHandling']);
                }}
                className={`${listSkills.includes('animalHandling') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
                >
                  <div className="box__line box__line--top" />
                  <div className="box__line box__line--right" />
                  <div className="box__line box__line--bottom" />
                  <div className="box__line box__line--left" />
                  <div>Lidar com Animais (Sab)</div>
              </button>
              <button
                onClick={() => {
                  if (listSkills.includes('athletics')) {
                    setListSkills(listSkills.filter((skillItem: any) => skillItem !== 'athletics'));
                  } else setListSkills([...listSkills, 'athletics']);
                }}
                className={`${listSkills.includes('athletics') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Atletismo (For)</div>
              </button>
              <button
                onClick={() => {
                  if (listSkills.includes('intimidation')) {
                    setListSkills(listSkills.filter((skillItem: any) => skillItem !== 'intimidation'));
                  } else setListSkills([...listSkills, 'intimidation']);
                }}
                className={`${listSkills.includes('intimidation') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div> Intimidação (Car)</div>
              </button>
              <button
                onClick={() => {
                  if (listSkills.includes('nature')) {
                    setListSkills(listSkills.filter((skillItem: any) => skillItem !== 'nature'));
                  } else setListSkills([...listSkills, 'nature']);
                }}
                className={`${listSkills.includes('nature') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Natureza (Int)</div>
              </button>
              <button
                onClick={() => {
                  if (listSkills.includes('perception')) {
                    setListSkills(listSkills.filter((skillItem: any) => skillItem !== 'perception'));
                  } else setListSkills([...listSkills, 'perception']);
                }}
                className={`${listSkills.includes('perception') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Percepção (Sab)</div>
              </button>
              <button
                onClick={() => {
                  if (listSkills.includes('survival')) {
                    setListSkills(listSkills.filter((skillItem: any) => skillItem !== 'survival'));
                  } else setListSkills([...listSkills, 'survival']);
                }}
                className={`${listSkills.includes('survival') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Sobrevivência (Sab)</div>
              </button>
            </div>
          </div>
        }
        {
          classPlayer === 'Bárbaro' &&
          <div className="w-full">
            <div className="w-full pt-5 pb-2">Escolha uma das Opções Abaixo:</div>
            <div className="w-full grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  if (listOptions.includes('Machado Grande')) {
                    setListOptions(listOptions.filter((optionItem: any) => optionItem !== 'Machado Grande'));
                  } else {
                    setListOptions([...listOptions.filter((optionItem: any) => optionItem !== 'Arma marcial corpo-a-corpo'), 'Machado Grande']);
                  }
                }}
                className={`${listOptions.includes('Machado Grande') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
                >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Um Machado Grande</div>
              </button>
              <button
                onClick={() => {
                  if (listOptions.includes('Arma marcial corpo-a-corpo')) {
                    setListOptions(listOptions.filter((optionItem: any) => optionItem !== 'Arma marcial corpo-a-corpo'));
                  } else {
                    setListOptions([...listOptions.filter((optionItem: any) => optionItem !== 'Machado Grande'), 'Arma marcial corpo-a-corpo']);
                  }
                }}
                className={`${listOptions.includes('Arma marcial corpo-a-corpo') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
                >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Uma Arma marcial corpo-a-corpo</div>
              </button>
            </div>
            <div className="w-full pt-5 pb-2">Escolha uma das Opções Abaixo:</div>
            <div className="w-full grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  if (listOptions.includes('Dois machados de mão')) {
                    setListOptions(listOptions.filter((optionItem: any) => optionItem !== 'Dois machados de mão'));
                  } else {
                    setListOptions([...listOptions.filter((optionItem: any) => optionItem !== 'Uma Arma simples'), 'Dois machados de mão']);
                  }
                }}
                className={`${listOptions.includes('Dois machados de mão') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
                >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Dois machados de mão</div>
              </button>
              <button
                onClick={() => {
                  if (listOptions.includes('Uma Arma simples')) {
                    setListOptions(listOptions.filter((optionItem: any) => optionItem !== 'Uma Arma simples'));
                  } else {
                    setListOptions([...listOptions.filter((optionItem: any) => optionItem !== 'Dois machados de mão'), 'Uma Arma simples']);
                  }
                }}
                className={`${listOptions.includes('Uma Arma simples') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Uma Arma simples</div>
              </button>
            </div>
          </div>
        }
        {
          classPlayer === 'Bardo' &&
          <div className="w-full">
            <div className="w-full pt-5 pb-2">Escolha uma das Opções Abaixo:</div>
            <div className="w-full grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  if (listOptions.includes('Rapieira')) {
                    setListOptions(listOptions.filter((optionItem: any) => optionItem !== 'Rapieira'));
                  } else {
                    setListOptions([...listOptions.filter((optionItem: any) => optionItem !== 'Espada longa' && optionItem !== 'Qualquer Arma Simples'), 'Rapieira']);
                  }
                }}
                className={`${listOptions.includes('Rapieira') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
                >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Rapieira</div>
              </button>
              <button
                onClick={() => {
                  if (listOptions.includes('Espada longa')) {
                    setListOptions(listOptions.filter((optionItem: any) => optionItem !== 'Espada longa'));
                  } else {
                    setListOptions([...listOptions.filter((optionItem: any) => optionItem !== 'Rapieira' && optionItem !== 'Qualquer Arma Simples'), 'Espada longa']);
                  }
                }}
                className={`${listOptions.includes('Espada longa') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
                >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Espada longa</div>
              </button>
              <button
                onClick={() => {
                  if (listOptions.includes('Qualquer Arma Simples')) {
                    setListOptions(listOptions.filter((optionItem: any) => optionItem !== 'Qualquer Arma Simples'));
                  } else {
                    setListOptions([...listOptions.filter((optionItem: any) => optionItem !== 'Rapieira' && optionItem !== 'Espada longa'), 'Qualquer Arma Simples']);
                  }
                }}
                className={`${listOptions.includes('Qualquer Arma Simples') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
                >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Uma Arma marcial corpo-a-corpo</div>
              </button>
            </div>
            <div className="w-full pt-5 pb-2">Escolha uma das Opções Abaixo:</div>
            <div className="w-full grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  if (listOptions.includes('Um Pacote de Diplomata')) {
                    setListOptions(listOptions.filter((optionItem: any) => optionItem !== 'Um Pacote de Diplomata'));
                  } else {
                    setListOptions([...listOptions.filter((optionItem: any) => optionItem !== 'Um Pacote de Artista'), 'Um Pacote de Diplomata']);
                  }
                }}
                className={`${listOptions.includes('Um Pacote de Diplomata') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
                >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Um Pacote de Diplomata</div>
              </button>
              <button
                onClick={() => {
                  if (listOptions.includes('Um Pacote de Artista')) {
                    setListOptions(listOptions.filter((optionItem: any) => optionItem !== 'Um Pacote de Artista'));
                  } else {
                    setListOptions([...listOptions.filter((optionItem: any) => optionItem !== 'Um Pacote de Diplomata'), 'Um Pacote de Artista']);
                  }
                }}
                className={`${listOptions.includes('Um Pacote de Artista') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Um Pacote de Artista</div>
              </button>
            </div>
            <div className="w-full pt-5 pb-2">Escolha uma das Opções Abaixo:</div>
            <div className="w-full grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  if (listOptions.includes('Um Lute')) {
                    setListOptions(listOptions.filter((optionItem: any) => optionItem !== 'Um Lute'));
                  } else {
                    setListOptions([...listOptions.filter((optionItem: any) => optionItem !== 'Qualquer outro instrumento musical'), 'Um Lute']);
                  }
                }}
                className={`${listOptions.includes('Um Lute') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
                >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Um Lute</div>
              </button>
              <button
                onClick={() => {
                  if (listOptions.includes('Qualquer outro instrumento musical')) {
                    setListOptions(listOptions.filter((optionItem: any) => optionItem !== 'Qualquer outro instrumento musical'));
                  } else {
                    setListOptions([...listOptions.filter((optionItem: any) => optionItem !== 'Um Lute'), 'Qualquer outro instrumento musical']);
                  }
                }}
                className={`${listOptions.includes('Qualquer outro instrumento musical') && 'bg-white text-black font-bold'} relative flex items-center justify-center w-full col-span-1 p-3`}
              >
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <div>Qualquer outro instrumento musical</div>
              </button>
            </div>
          </div>
        }
        {
          classPlayer === 'Bardo' &&
          <div className="w-full">
            <div className="w-full pt-5 pb-2">Escolha dois Truques:</div>
            <div className="grid-cols-2 grid w-full">
              {
                listMagics.filter((magic: any) => {
                  const mageMagics = listClasses.find((classItem: any) => classItem.name === 'Bardo');
                  if (mageMagics) return mageMagics.magics.includes(magic.name) && magic.level === 0;
                  return false;
                }).map((magic: any, index: number) => (
                  <button
                    type="button"
                    key={ index }
                    onClick={ () => {
                      if (listAddedTruques.find((item: any) => item.name === magic.name)) {
                        setListAddedTruques(listAddedTruques.filter((item: any) => item.name !== magic.name));
                      } else setListAddedTruques([...listAddedTruques, {...magic, font: 'bardo' }]);
                    }}
                    className={`p-3 border-2 border-white gap-2 ${listAddedTruques.find((item: any) => item.name === magic.name) && 'bg-white text-black'}`}
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
        }
        {
          classPlayer === 'Bardo' &&
          <div className="w-full">
            <div className="w-full pt-5 pb-2">Escolha Quatro Magias:</div>
            <div className="grid-cols-2 grid w-full">
              {
                listMagics.filter((magic: any) => {
                  const mageMagics = listClasses.find((classItem: any) => classItem.name === 'Bardo');
                  if (mageMagics) return mageMagics.magics.includes(magic.name) && magic.level === 1;
                  return false;
                }).map((magic: any, index: number) => (
                  <button
                    type="button"
                    key={ index }
                    onClick={ () => {
                      if (listAddedMagics.find((item: any) => item.name === magic.name)) {
                        setListAddedMagics(listAddedMagics.filter((item: any) => item.name !== magic.name));
                      } else setListAddedMagics([...listAddedMagics, {...magic, font: 'bardo' }]);
                    }}
                    className={`p-3 border-2 border-white gap-2 ${listAddedMagics.find((item: any) => item.name === magic.name) && 'bg-white text-black'}`}
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
        }
        <div className="h-full w-full flex flex-col justify-start items-center">
          <div className="w-full flex justify-between col-span-10 py-3">
            <button
              onClick={ () => {
                if (dataPlayer.sheet.race === 'Humano' || dataPlayer.sheet.race === 'Meio Orc' || dataPlayer.sheet.race === 'Meio Elfo' || dataPlayer.sheet.race === 'Draconato') {
                  setOptionGuide('race');
                } else setOptionGuide('subrace');
              }}
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