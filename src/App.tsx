import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Profile from './pages/profile';

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="*" element={ <Login /> } />
      </Routes>
    </div>
  )
}
