import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Profile from './pages/profile';
import Magics from './pages/magics';
import Sessions from './pages/sessions';
import Classes from './pages/classes';
import Equipments from './pages/equipments';
import Lore from './pages/lore';
import Monsters from './pages/Monsters';
import Talents from './pages/talents';
import About from './pages/about';
import Races from './pages/races';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/home" element={ <Home /> } />        
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/magics" element={ <Magics /> } />
      <Route path="/races" element={ <Races /> } />
      <Route path="/sessions" element={ <Sessions /> } />
      <Route path="/classes" element={ <Classes /> } />
      <Route path="/equipments" element={ <Equipments /> } />
      <Route path="/lore" element={ <Lore /> } />
      <Route path="/monsters" element={ <Monsters /> } />
      <Route path="/talents" element={ <Talents /> } />
      <Route path="/about" element={ <About /> } />
      <Route path="*" element={ <Home /> } />
    </Routes>
  )
}
