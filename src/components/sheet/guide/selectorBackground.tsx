import { useContext } from "react";
import contexto from "../../../context/context";

export default function SelectorBackground(props: { list: any }) {
  const { provDataPlayer, setShowDataSelector } = useContext(contexto);
  const { list } = props;

  return(
    <div className="w-full">
      {
        provDataPlayer && provDataPlayer.sheet &&
        <select
          value={ provDataPlayer.sheet.background }
          onChange={ (e: any) => setShowDataSelector({ show: true, type: 'background', value: e.target.value }) }
          className="w-full border-b-black border bg-transparent border-t-transparent border-l-transparent border-r-transparent outline-none cursor-pointer"
        >
          <option disabled value="">Selecione um Antecedente</option>
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
      <p className="text-sm font-bold pl-1">Antecedente</p>
    </div>
  );
}