import { useEffect, useState, useContext } from "react";
import { GiD10, GiD12, GiD4, GiDiceTwentyFacesTwenty, GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { roll } from "../../firebase/rolls";
import contexto from "../../context/context";

export default function Dices() {
  const [quantD4, setQuantD4] = useState(0);
  const [sumD4, setSumD4] = useState(0);
  const [quantD6, setQuantD6] = useState(0);
  const [sumD6, setSumD6] = useState(0);
  const [quantD8, setQuantD8] = useState(0);
  const [sumD8, setSumD8] = useState(0);
  const [quantD10, setQuantD10] = useState(0);
  const [sumD10, setSumD10] = useState(0);
  const [quantD12, setQuantD12] = useState(0);
  const [sumD12, setSumD12] = useState(0);
  const [quantD20, setQuantD20] = useState(0);
  const [sumD20, setSumD20] = useState(0);
  const [quantD100, setQuantD100] = useState(0);
  const [sumD100, setSumD100] = useState(0);
  const [quantOther, setQuantOther] = useState(0);
  const [sumOther, setSumOther] = useState(0);
  const [valueOther, setValueOther] = useState(0);
  const [advantage, setAdvantage] = useState(false);
  const [disadvantage, setDisadvantage] = useState(false);
  const [other, setOther] = useState(false);

  const {
    setShowMessage,
    sessionId,
    userEmail,
    showMenuSession, setShowMenuSession
  } = useContext(contexto);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const rollDices = async () => {
    const dicesList = [
      { quant: quantD4, faces: 4, sum: sumD4 },
      { quant: quantD6, faces: 6, sum: sumD6 },
      { quant: quantD8, faces: 8,  sum: sumD8 },
      { quant: quantD10, faces: 10,  sum: sumD10 },
      { quant: quantD12, faces: 12, sum: sumD12},
      { quant: quantD20, faces: 20, sum: sumD20 },
      { quant: quantD100, faces: 100, sum: sumD100 },
      { quant: quantOther, faces: valueOther, sum: sumOther },
    ];
    
    await roll(
      dicesList.filter((dice: any) => dice.quant > 0),
      advantage,
      disadvantage,
      sessionId,
      userEmail,
      setShowMessage,
    );

    setSumD4(0);
    setQuantD4(0);
    setSumD6(0);
    setQuantD6(0);
    setSumD8(0);
    setQuantD8(0);
    setSumD10(0);
    setQuantD10(0);
    setSumD12(0);
    setQuantD12(0);
    setSumD20(0);
    setQuantD20(0);
    setSumD100(0);
    setQuantD100(0);
    setValueOther(0);
    setSumOther(0);
    setQuantOther(0);
    setAdvantage(false);
    setDisadvantage(false);
  };

  const disableRoll = () => {
    return quantD4 === 0 && quantD6 === 0 && quantD8 === 0 && quantD10 === 0 && quantD12 === 0 && quantD20 === 0 && quantD100 === 0 && (quantOther === 0 || valueOther === 0);
  }
  
  return(
    <div className={`w-full flex flex-col items-center ${ showMenuSession ? 'h-95vh' : 'h-screen' } z-50 top-0 right-0 overflow-y-auto pr-2`}>
      <div className="grid grid-cols-3 w-full mt-2 gap-1">
        <div className="text-center w-full font-bold text-white border border-white p-2">Quantidade</div>
        <div className="text-center w-full font-bold text-white border border-white p-2">Tipo de Dado</div>
        <div className="text-center w-full font-bold text-white border border-white p-2">Bônus</div>
      </div>
      <div className="grid grid-cols-3 w-full mt-2 gap-1">
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={quantD4}
          onChange={(e: any) => {
            if (e.target.value === '' || e.target.value <= 0) setQuantD4(0);
            else setQuantD4(e.target.value) }}
        />
        <div className="text-white grid grid-cols-2 gap-2 border border-white">
          <div className="w-full flex justify-end items-center">
            <GiD4 className="text-2xl" />
          </div>
          <div className="w-full flex items-center">D4</div>
        </div>
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={sumD4}
          onChange={(e: any) => {
            if (e.target.value === '') setSumD4(0);
            else setSumD4(e.target.value) }}
        />
      </div>
      <div className="grid grid-cols-3 w-full mt-2 gap-1">
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={quantD6}
          onChange={(e: any) => {
            if (e.target.value === '' || e.target.value <= 0) setQuantD6(0);
            else setQuantD6(e.target.value) }}
        />
          <div className="text-white grid grid-cols-2 gap-2 border border-white">
            <div className="w-full flex justify-end items-center">
              <GiPerspectiveDiceSixFacesOne className="text-2xl" />
            </div>
            <div className="w-full flex items-center">D6</div>
          </div>
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={sumD6}
          onChange={(e: any) => {
            if (e.target.value === '') setSumD6(0);
            else setSumD6(e.target.value) }}
        />
      </div>
      <div className="grid grid-cols-3 w-full mt-2 gap-1">
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={quantD8}
          onChange={(e: any) => {
            if (e.target.value === '' || e.target.value <= 0) setQuantD8(0);
            else setQuantD8(e.target.value) }}
        />
        <div className="text-white grid grid-cols-2 gap-2 border border-white">
            <div className="w-full flex justify-end items-center">
              <GiPerspectiveDiceSixFacesOne className="text-2xl" />
            </div>
            <div className="w-full flex items-center">D8</div>
          </div>
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={sumD8}
          onChange={(e: any) => {
            if (e.target.value === '') setSumD8(0);
            else setSumD8(e.target.value) }}
        />
      </div>
      <div className="grid grid-cols-3 w-full mt-2 gap-1">
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={quantD10}
          onChange={(e: any) => {
            if (e.target.value === '' || e.target.value <= 0) setQuantD10(0);
            else setQuantD10(e.target.value) }}
        />
        <div className="text-white grid grid-cols-2 gap-2 border border-white">
          <div className="w-full flex justify-end items-center">
            <GiD10 className="text-2xl" />
          </div>
          <div className="w-full flex items-center">D10</div>
        </div>
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={sumD10}
          onChange={(e: any) => {
            if (e.target.value === '') setSumD10(0);
            else setSumD10(e.target.value) }}
        />
      </div>
      <div className="grid grid-cols-3 w-full mt-2 gap-1">
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={quantD12}
          onChange={(e: any) => {
            if (e.target.value === '' || e.target.value <= 0) setQuantD12(0);
            else setQuantD12(e.target.value) }}
        />
        <div className="text-white grid grid-cols-2 gap-2 border border-white">
          <div className="w-full flex justify-end items-center">
            <GiD12 className="text-2xl" />
          </div>
          <div className="w-full flex items-center">D12</div>
        </div>
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={sumD12}
          onChange={(e: any) => {
            if (e.target.value === '') setSumD12(0);
            else setSumD12(e.target.value) }}
        />
      </div>
      <div className="grid grid-cols-3 w-full mt-2 gap-1">
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={quantD20}
          onChange={(e: any) => {
            if (e.target.value === '' || e.target.value <= 0) setQuantD20(0);
            else setQuantD20(e.target.value) }}
        />
        <div className="text-white grid grid-cols-2 gap-2 border border-white">
          <div className="w-full flex justify-end items-center">
            <GiDiceTwentyFacesTwenty className="text-2xl" />
          </div>
          <div className="w-full flex items-center">D20</div>
        </div>
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={sumD20}
          onChange={(e: any) => {
            if (e.target.value === '') setSumD20(0);
            else setSumD20(e.target.value) }}
        />
      </div>
      <div className="grid grid-cols-3 w-full mt-2 gap-1">
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={quantD100}
          onChange={(e: any) => {
            if (e.target.value === '' || e.target.value <= 0) setQuantD100(0);
            else setQuantD100(e.target.value) }}
        />
        <div className="text-white grid grid-cols-2 gap-2 border border-white">
          <div className="w-full flex justify-end items-center">
            <GiDiceTwentyFacesTwenty className="text-2xl" />
          </div>
          <div className="w-full flex items-center">D100</div>
        </div>
        <input
          type="number"
          className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
          value={sumD100}
          onChange={(e: any) => {
            if (e.target.value === '') setSumD100(0);
            else setSumD100(e.target.value) }}
        />
      </div>
      {
        other &&
        <div className="grid grid-cols-3 w-full mt-2 gap-1">
          <input
            type="number"
            className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
            value={quantOther}
            onChange={(e: any) => {
              if (e.target.value === '' || e.target.value <= 0) setQuantOther(0);
              else setQuantOther(e.target.value);
            }}
          />
          <input
            type="number"
            className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
            value={valueOther}
            onChange={(e: any) => {
              if (e.target.value === '' || e.target.value <= 0) setValueOther(0);
              else setValueOther(e.target.value) }}
          />
          <input
            type="number"
            className="p-2 bg-gray-whats-dark border border-white text-center text-white w-full outline-none"
            value={sumOther}
            onChange={(e: any) => {
              if (e.target.value === '') setSumOther(0);
              else setSumOther(e.target.value) }}
          />
        </div>
      }
      <button
        className="text-white bg-black hover:border-red-800 border-2 border-white  transition-colors cursor-pointer w-full p-2 mt-2 font-bold"
        onClick={ () => {
          setOther(!other);
          setValueOther(0);
          setSumOther(0);
          setQuantOther(0);
        }}
      >
        { `${other ? 'Remover' : 'Utilizar'} Dado com Faces Personalizadas` }
      </button>
      <button
        className={`${advantage ? 'bg-red-500' : 'text-white bg-black hover:border-red-800' } border-2 border-white  transition-colors cursor-pointer w-full p-2 mt-2 font-bold`}
        onClick={ () => {
          setDisadvantage(false);
          setAdvantage(!advantage);
        }}
      >
        {`${ advantage ? 'Remover Vantagem' : 'Realizar Teste Com Vantagem'}`}
      </button>
      <button
        className={`${disadvantage ? 'bg-red-500' : 'text-white bg-black hover:border-red-800' } border-2 border-white  transition-colors cursor-pointer w-full p-2 mt-2 font-bold`}
        onClick={ () => {
          setAdvantage(false);
          setDisadvantage(!disadvantage);
        }}
      >
        {`${ disadvantage ? 'Remover Desvantagem' : 'Realizar Teste Com Desvantagem'}`}
      </button>
      <button
        className={`${disableRoll() ? 'text-black bg-gray-400 ' : 'text-white bg-black hover:border-red-800 ' } border-2 border-white  transition-colors cursor-pointer w-full p-2 mt-2 mb-2 font-bold`}
        onClick={ () => {
          setShowMenuSession('chat');
          rollDices();
        }}
        disabled={ disableRoll() }
      >
        Rolar dados
      </button>
    </div>
  );
}