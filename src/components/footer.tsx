import { useNavigate } from 'react-router-dom';
import kabrunIcon from '../assets/kabrun-icon.png';

export default function Footer() {
  const router = useNavigate();
  return (
    <div className="flex flex-col w-full">
      <footer className={`relative text-white pr-8 flex flex-col sm:flex-row justify-between items-center w-full py-2 z-5 bg-rule bg-cover`}>
        <button
          type="button"
          title="Início"
          onClick={ () => router('/') }
          className=""
        >
          <img src={kabrunIcon} className="ml-2 h-10" />
        </button>
        <div className="sm:w-3/4 text-sm">
          <p className="text-center sm:text-right w-full text-dnd-blue-dark">© Wizards of the Coast. Trademarks belong to their respective owners. All rights reserved.</p>
          <p
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`pt-3 pb-2 sm:py-0 text-center sm:text-right w-full cursor-pointer text-dnd-blue-dark hover:underline font-bold transition duration-1000`}
          >
            Retornar ao Topo
          </p>
        </div>
      </footer>
    </div>
  );
}