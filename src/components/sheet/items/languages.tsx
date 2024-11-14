import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import listLanguages from '../../../data/languages.json';
import { updateDataPlayer } from "../../../firebase/players";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

export default function Languages() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [languagesNotAdded, setLanguagesNotAdded] = useState<any>([]);
  const [languagesAdded, setLanguagesAdded] = useState<any>([]);
  const [newLanguage, setNewLanguage] = useState<{ name: string, title: string, book: string}>({ name: '', title: '', book: ''});
  const { players, session, showSheet, setShowSheet, setShowMessage, userEmail } = useContext(contexto);

  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) {
      setDataPlayer(findPlayer);
      const filteredLanguages = listLanguages
        .filter(language => session.books.includes(language.book))
        .filter(language => !findPlayer.sheet.languages.some((lang: any) => lang.name === language.name))
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));
      setLanguagesNotAdded(filteredLanguages);
      setLanguagesAdded(findPlayer.sheet.languages);
    } else setShowSheet({ show: false, id: '' });
  }, [session, players]);

  return(
    <div className="flex items-center gap-2 mt-4">
      <div className="box-select flex items-center justify-center w-full col-span-1 px-2 pt-1">
        <div className="box__line box__line--top" />
        <div className="box__line box__line--right" />
        <div className="box__line box__line--bottom" />
        <div className="box__line box__line--left" />
        <div className="capitalize w-full">
          <div className={`flex items-center gap-2 ${ languagesAdded.length > 0 && 'pt-2'}`}>
            {
              dataPlayer && userEmail === session.gameMaster
              ? <select
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
              : <div className={`${languagesAdded.length > 0 ? 'pb-2 border-b border-white' : 'text-center' } w-full text-left bg-gray-whats-dark cursor-pointer outline-none`}>
                  Idiomas
                </div>
            }
            {
              newLanguage.name !== '' &&
              <button
                type="button"
                className="rounded-full text-3xl cursor-pointer hover:bg-white bg-gray-whats-dark transition-colors hover:text-black duration-400"
                onClick={ async () => {
                  setLanguagesNotAdded(
                    languagesNotAdded
                    .filter((language: any) => language.name !== newLanguage.name)
                    .sort((a: any, b: any) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
                  );
                  setLanguagesAdded(
                    [...languagesAdded, newLanguage].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
                  );
                  dataPlayer.sheet.languages = [...languagesAdded, newLanguage];
                  await updateDataPlayer(session.id, dataPlayer, setShowMessage);
                  setNewLanguage({ name: '', title: '', book: ''});
                }}
              >
                <CiCirclePlus />
              </button>
            }
          </div>
          <div className={`w-full flex flex-col mt-2 ${languagesAdded.length > 0 && 'pb-2'}`}>
            {
              languagesAdded.map((language: any, index: number) => (
                <div key={index} className="flex items-center pl-3">
                  <p className="w-full">{language.name}</p>
                  {
                    dataPlayer && userEmail === session.gameMaster &&
                    <button
                      type="button"
                      onClick={ async () => {
                        setLanguagesNotAdded(
                          [...languagesNotAdded, language]
                          .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
                        );
                        setNewLanguage({ name: '', title: '', book: ''});
                        setLanguagesAdded(
                          languagesAdded
                            .filter((languageItem: any) => languageItem.name !== language.name)
                            .sort((a: any, b: any) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
                        );
                        dataPlayer.sheet.languages = languagesAdded
                        .filter((languageItem: any) => languageItem.name !== language.name);
                        await updateDataPlayer(session.id, dataPlayer, setShowMessage);
                      }}
                      className="rounded-full text-3xl mt-2 cursor-pointer hover:bg-white bg-gray-whats-dark transition-colors hover:text-black duration-400"
                    >
                      <CiCircleMinus />
                    </button>
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}