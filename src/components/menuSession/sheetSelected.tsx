import { useContext, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import contexto from "../../context/context";
import General from "../sheet/general";
import Attributes from "../sheet/attributes";
import SavingThrows from "../sheet/savingthrows";
import Skills from "../sheet/skills";
import Race from "../sheet/race";
import ClassPlayer from "../sheet/classPlayer";
import Attacks from "../sheet/attacks";
import Equipments from "../sheet/equipments";
import Items from "../sheet/items";

export default function SheetSelected() {
  const { setShowSheet } = useContext(contexto);
  const [optionSelect, setOptionSelect] = useState('general');

  return (
    <div className="relative h-screen w-full flex flex-col overflow-y-auto">
      <div className="flex w-full justify-end mt-3 px-3">
        <button
          type="button"
          title="Fechar"
          onClick={ () => setShowSheet({ show: false, id: '' }) }
          className="text-white text-3xl cursor-pointer"
        >
          <IoIosCloseCircle />
        </button>
      </div>
      <div className="text-white font-bold px-4 pt-2">
        <select
          onChange={(e) => setOptionSelect(e.target.value)}
          className="w-full outline-none mb-2 border border-white p-3 cursor-pointer bg-black text-white flex items-center justify-center font-bold text-center"
        >
          <option value={'general'}>Geral</option>
          <option value={'attributes'}>Atributos</option>
          <option value={'saving-throws'}>Salvaguardas</option>
          <option value={'skills'}>Perícias</option>
          <option value={'race'}>Raça</option>
          <option value={'class'}>Classe</option>
          <option value={'attacks'}>Ataques</option>
          <option value={'equipments'}>Equipamentos</option>
          <option value={'items'}>Itens</option>
        </select>
        {optionSelect === 'general' && <General />}
        {optionSelect === 'attributes' && <Attributes />}
        {optionSelect === 'saving-throws' &&  <SavingThrows /> }
        {optionSelect === 'skills' && <Skills />}
        {optionSelect === 'race' && <Race />}
        {optionSelect === 'class' && <ClassPlayer />}
        {optionSelect === 'attacks' && <Attacks />}
        {optionSelect === 'equipments' && <Equipments />}
        {optionSelect === 'items' && <Items />}
      </div>
    </div>
  );
}