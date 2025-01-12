import { useContext, useEffect, useState } from "react";
import contexto from "../../../context/context";
import { IoIosCloseCircleOutline } from "react-icons/io";
import listAlignments from '../../../data/alignment.json';
import listRace from '../../../data/races.json';

export default function DataSelector() {
  const [text, setText] = useState('');
  const [data, setData] = useState<any>(null);
  const { showDataSelector, setShowDataSelector, setProvDataPlayer, provDataPlayer, returnAttribute } = useContext(contexto);

  useEffect(() => {
    if (showDataSelector.type === 'alignment') {
      const dataAlignment = listAlignments.find((alignment: any) => alignment.name === showDataSelector.value);
      if (dataAlignment) setText(dataAlignment.description);
    } else if (showDataSelector.type === 'race') {
      console.log(provDataPlayer.sheet.race);
      const dataRace = listRace.find((race: any) => race.name === showDataSelector.value);
      if (dataRace) setData(dataRace);
    } else if (showDataSelector.type === 'subrace') {
      console.log(provDataPlayer.sheet.race);
      const dataRace = listRace.find((race: any) => race.name === provDataPlayer.sheet.race);
      if (dataRace) setData(dataRace);
    }
  }, []);

  const setValue = () => {
    if (showDataSelector.type === 'alignment') {
      setProvDataPlayer( { ...provDataPlayer, sheet: { ...provDataPlayer.sheet, alignment: showDataSelector.value } });
    } else if (showDataSelector.type === 'race') {
      setProvDataPlayer({ ...provDataPlayer, sheet: { ...provDataPlayer.sheet, subrace: '', race: showDataSelector.value } });
    } else if (showDataSelector.type === 'subrace') {
      setProvDataPlayer({ ...provDataPlayer, sheet: { ...provDataPlayer.sheet, subrace: showDataSelector.value } });
    } else if (showDataSelector.type === 'class') {
      setProvDataPlayer({ ...provDataPlayer, sheet: { ...provDataPlayer.sheet, class: showDataSelector.value } });
    }
    setShowDataSelector({ show: false, type: '', value: '' });
  }

  const returnTitle = () => {
    switch(showDataSelector.type) {
      case 'alignment': return 'este Alinhamento';
      case 'race': return 'esta Raça';
      case 'subrace': return "Subraça";
      default: '';
    }
  }

  const returnTitleItem = () => {
    switch(showDataSelector.type) {
      case 'alignment': return 'Alinhamento';
      case 'race': return 'Raça';
      case 'subrace': return "Subraça";
      default: '';
    }
  }

  const returnDataAttribute = (list: any) => {
    const filterOthers = list.filter((item: any) => item.name === 'other');
    const filterAll = list.filter((item: any) => item.name === 'all');
    const filterRest = list.filter((item: any) => item.name !== 'other' && item.name !== 'all');
    let text2 = '';
    if (filterOthers.length > 0) text2 = '+1 em ' + filterOthers.length + ' Atributos';
    if (filterAll.length > 0) text2 = '+' + filterAll.length + ' em todos os Atributos';

    const text1 = filterRest.map((item: any, index: number) => {
      return `+${ item.value } em ${returnAttribute(item.name) } ${ index !== data.attribute.length - 1 ? ', ' : '' }`
    });

    return text1 + text2;
  };

  return(
    <div className={`z-70 fixed top-0 left-0 w-full h-screen overflow-y-auto flex ${showDataSelector.type === 'race' || showDataSelector.type === 'subrace' ? 'items-start' : 'items-center'} justify-center py-5 bg-black/80 px-10`}>
      <div className={`${showDataSelector.type === 'race' || showDataSelector.type === 'subrace' ? 'w-full' : 'w-1/2'} flex ${showDataSelector.type === 'race' || showDataSelector.type === 'subrace' ? 'items-start' : 'items-center'}`}>
        <div className={`box-attributes flex flex-col justify-center items-center bg-rule bg-cover w-full`}>
          <div className="w-full flex items-center justify-end px-2 pt-2">
            <IoIosCloseCircleOutline
              className="text-4xl text-black cursor-pointer"
              onClick={ () => setShowDataSelector({ show: false, type: '', value: '' }) }
            />
          </div>
          <div className="box__line box__line--top"></div>
          <div className="box__line box__line--right"></div>
          <div className="box__line box__line--bottom"></div>
          <div className="box__line box__line--left"></div>
          <div className="flex flex-col items-center justify-center px-3 w-full">
            <div className="font-bold w-full text-center text-lg pb-3">{ returnTitleItem() } - { showDataSelector.value }</div>
            <div className="text-center w-full">{ text }</div>
            { console.log(data) }
            {
              showDataSelector.type === 'race' &&
              data &&
              data.name &&
              <div>
                <div className="w-full justify-start">
                  <span className="pr-1 font-bold">
                    Bônus de Atributo{ data.attribute.length > 1 && 's'}: 
                  </span>
                  <span>{ returnDataAttribute(data.attribute) }</span>
                </div>
                <div className="text-justify pt-1">
                  <span className="pr-1 font-bold">Idade:</span>
                  <span>{ data.age }</span>
                </div>
                <div className="text-justify pt-1">
                  <span className="pr-1 font-bold">Alinhamento:</span>
                  <span>{ data.alignment }</span>
                </div>
                <div className="text-justify pt-1">
                  <span className="pr-1 font-bold">Tamanho:</span>
                  <span>{ data.size }</span>
                </div>
                <div className="w-full text-justify pt-1">
                  <span className="pr-1 font-bold">Deslocamento:</span>
                  <span>{ data.speed } metros</span>
                </div>
                <div className="w-full text-justify pt-1">
                  <span className="pr-1 font-bold">Idiomas:</span>
                  {
                    data.languages.map((dataItem: any, index: number) => (
                      <span className="capitalize" key={index}>
                        { dataItem === 'other' ? 'outra' : dataItem }
                        { index === data.languages.length - 1 ? '' : ', ' }
                      </span>
                    ))
                  }
                </div>
                <div className="w-full text-justify pt-1">
                  {
                    data.skills.map((dataItem: any, index: number) => (
                      <div className=""key={index}>
                        <span className="pr-1 font-bold">{ dataItem.name }: </span>
                        <span>{ dataItem.description }</span>
                      </div>
                    ))
                  }
                </div>
                {
                  data.optionals && data.optionals.length > 0 &&
                  <div className="w-full text-justify pt-1">
                    <div className="font-bold">Características Opcionais:</div>
                    {
                      data.optionals.map((dataItem: any, index: number) => (
                        <div className="pl-2" key={index}>
                          <span className="pr-1 font-bold">{ dataItem.name }: </span>
                          <span>{ dataItem.description }</span>
                        </div>
                      ))
                    }
                  </div>
                }
              </div>
            }
            {
              showDataSelector.type === 'subrace' &&
              data &&
              data.name &&
              <div>
                <div className="w-full justify-start">
                  <span className="pr-1 font-bold">
                    Bônus de Atributo: 
                  </span>
                  <span>{ returnDataAttribute(data.attribute) }</span>
                </div>
                <div className="w-full text-justify pt-1">
                  {
                    data.skills.map((dataItem: any, index: number) => (
                      <div className=""key={index}>
                        <span className="pr-1 font-bold">{ dataItem.name }: </span>
                        <span>{ dataItem.description }</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            }
          </div>
          <div className="pt-5">Deseja selecionar { returnTitle() }?</div>
          <div className="w-full flex items-center justify-center px-5 gap-2 py-5">
            <button
              type="button"
              onClick={ setValue }
              className="p-2 border border-black w-full bg-green-700 hover:bg-green-900 text-white font-bold transition-all duration-400"
            >
              Sim
            </button>
            <button
              type="button"
              onClick={ () => setShowDataSelector({ show: false, type: '', value: '' }) }
              className="p-2 border border-black w-full bg-red-700 hover:bg-red-900 text-white font-bold transition-all duration-400"
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}