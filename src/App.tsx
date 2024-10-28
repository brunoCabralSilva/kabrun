// import imageWpp from '../src/assets/dragon.png';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="*" element={ <Login /> } />
      </Routes>
    </div>
  )
}
