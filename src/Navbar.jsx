import { Link, useLocation } from 'react-router-dom';
import f1logo from './photos/F1 Formula 1.svg';

export default function Navbar() {

    const location = useLocation();
    const isNotRootPath = location.pathname !== '/';


  return (
    <nav
      className={`bg-blue-600 p-4 mb-24 absolute w-full top-0 left-0 flex items-center ${
        isNotRootPath ? 'z-50' : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src={f1logo} alt="Logo" className="w-10 h-10"/>
        </Link>
        <Link to="/drivers">
          <button className="bg-purple-500 border-2 border-black text-black font-mono font-bold py-2 px-4 rounded-full">
            Drivers
          </button>
        </Link>
        <Link to="/radio">
          <button className="bg-purple-500 border-2 border-black text-black font-mono font-bold py-2 px-4 rounded-full">
            Radio
          </button>
        </Link>
      </div>
    </nav>
  );
}

