import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import f1logo from './photos/F1 Formula 1.svg';
import './index.css';

export default function LandingPage(){

    const navigate = useNavigate();

    return (
        <>
          <body className="circle-background flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center hover:animate-pulse-custom">
                    <img src={f1logo} alt="Logo" className="w-40 h-40"/>
                  </div>
                </div>
              </div>
    
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
    
              <div className="flex justify-center space-x-12 mt-12">
                <button 
                    onClick={() => navigate('/drivers')}
                    className="bg-gray-500 border-4 border-black text-black font-bold py-4 px-8 rounded-full hover:scale-110 transition-transform duration-300 ripple">
                        Meet the F1 Grid!
                </button>
                <button 
                    onClick={() => navigate('/radio')}
                    className="bg-gray-500 border-4 border-black text-black font-bold py-4 px-8 rounded-full hover:scale-110 transition-transform duration-300 ripple">
                        Team Radios!
                </button>
              </div>
            </div>
          </body>
        </>
       );
}