import { useContext } from "react";
import contexto from "../../../context/context";

export default function SelectorRace(props: { list: any }) {
  const { provDataPlayer, setShowDataSelector } = useContext(contexto);
  const { list } = props;

  return(
    <div className="w-full pr-5">
      {
        provDataPlayer && provDataPlayer.sheet &&
        <select
          value={ provDataPlayer.sheet.race }
          onChange={ (e: any) => setShowDataSelector({ show: true, type: 'race', value: e.target.value }) }
          className="w-full border-b-black border bg-transparent border-t-transparent border-l-transparent border-r-transparent outline-none cursor-pointer"
        >
          <option disabled value="">Selecione uma Raça</option>
          {
            list.map((item: any, index: number) => (
            <option
              value={item.name}
              key={index}
              className="flex items-center justify-center w-full col-span-1 p-3"
            >
              { item.name }
            </option>
            ))
          } 
        </select>
      }
      <p className="text-sm font-bold pl-1">Raça</p>
    </div>
  );
}