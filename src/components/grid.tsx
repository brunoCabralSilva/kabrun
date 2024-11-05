import { useState } from 'react';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import wallpaper from '../../src/assets/village-center-2-4k-no-grid-60x45-15-min.jpg';

const Grid = () => {
  const rows = 30;
  const cols = 30;
  const totalSquares = rows * cols;
  const [zoomLevel, setZoomLevel] = useState(1);

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
