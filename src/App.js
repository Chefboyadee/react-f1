import { BrowserRouter, Routes, Route } from "react-router-dom";

import DriverApi from './DriverApi.js'
import RadioCalls from './RadioCalls.js';
import LandingPage from './LandingPage.js';
import Navbar from './Navbar.jsx';

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="drivers" element={<DriverApi/>} />
        <Route path="radio" element={<RadioCalls/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}