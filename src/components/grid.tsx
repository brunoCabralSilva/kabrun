import { useContext, useState } from 'react';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import wallpaper from '../../src/assets/village-center-2-4k-no-grid-60x45-15-min.jpg';
import contexto from '../context/context';
import { FaDice } from 'react-icons/fa';
import Dices from './menuSession/dices';

const Grid = () => {
  const rows = 30;
  const cols = 30;
  const totalSquares = rows * cols;
  const [zoomLevel, setZoomLevel] = useState(1);
  const { showMenuDices, setShowMenuDices, showMenuSession } = useContext(contexto);

  const handleZoomIn = () => {
    setZoomLevel(prevZoom => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.1));
  };

  return (
    <div className="overflow-auto w-full h-screen border border-gray-300 p-12 relative">
      <div className="fixed z-50 top-12 left-2 flex flex-col gap-2">
        <button onClick={handleZoomIn} className="rounded-full p-2 bg-white text-black">
          <AiOutlineZoomIn />
        </button>
        <button onClick={handleZoomOut} className="rounded-full p-2 bg-white text-black">
          <AiOutlineZoomOut />
        </button>
      </div>
      <button
        type="button"
        title="Dados"
        onClick={ () => setShowMenuDices(!showMenuDices) }
        className="text-white text-3xl cursor-pointer fixed z-50 bottom-7 left-2"
      >
        <FaDice />
      </button>
      {
        showMenuDices
        && <div className={`fixed w-4/12 ${ showMenuSession !== '' ? 'h-97vh bottom-5' : 'bottom-0 h-screen'} overflow-y-auto z-50 bg-black`}>
            <Dices />
           </div>
      }
      <div className="grid grid-cols-30 relative" style={{ width: `${(cols * 40)}px`, transform: `scale(${zoomLevel})`, transformOrigin: '0 0' }}>
        <img src={wallpaper} alt="" className="absolute w-full h-full object-cover" />
        {
          Array.from({ length: totalSquares }, (_, index) => (
            <div key={index} className="z-40 w-10 h-10 border border-black" />
          ))
        }
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Grid />
    </div>
  );
};

export default App;
