import { useContext } from "react";
import contexto from "../../../context/context";
import listOfRaces from '../../../data/races.json';

export default function SelectorSubrace() {
  const { provDataPlayer, setShowDataSelector } = useContext(contexto);

  const returnSubRaces = () => {
    const race = listOfRaces.find((race: any) => race.name === provDataPlayer.sheet.race);
    if (race)
      return race.subraces.map((item: any, index: number) => (
        <option
          value={item.name}
          key={index}
          className="flex items-center justify-center w-full col-span-1 p-3"
        >
          { item.name }
        </option>
      ))
    return <div></div>
  }

  return(
    <div className="w-full">
      {
        provDataPlayer && provDataPlayer.sheet &&
        <select
          value={ provDataPlayer.sheet.subRace }
          onChange={ (e: any) => setShowDataSelector({ show: true, type: 'subrace', value: e.target.value }) }
          className="w-full border-b-black border bg-transparent border-t-transparent border-l-transparent border-r-transparent outline-none cursor-pointer"
        >
          <option disabled value="">Selecione uma Subraça</option>
          { returnSubRaces() } 
        </select>
      }
      <p className="text-sm font-bold pl-1">SubRaça</p>
    </div>
  );
}