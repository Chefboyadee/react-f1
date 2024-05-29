import { Link } from 'react-router-dom';
import f1logo from './photos/F1 Formula 1.svg';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 left-0 flex items-center">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src={f1logo} alt="Logo" className="w-10 h-10"/>
        </Link>
        <Link to="/drivers">
          <button className="bg-gray-500 border-2 border-black text-black font-bold py-2 px-4 rounded-full">
            Drivers
          </button>
        </Link>
        <Link to="/radio">
          <button className="bg-gray-500 border-2 border-black text-black font-bold py-2 px-4 rounded-full">
            Radio
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
