import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import listLanguages from '../../../data/languages.json';

export default function LanguagesGuide() {
  const [languagesNotAdded, setLanguagesNotAdded] = useState<any>([]);
  const [languagesAdded, setLanguagesAdded] = useState<any>([]);
  const [newLanguage, setNewLanguage] = useState<{ name: string, title: string, book: string}>({ name: '', title: '', book: ''});
  const { players, session, showSheet, setShowSheet } = useContext(contexto);

  useEffect( () => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    if (findPlayer) {
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
  );
}