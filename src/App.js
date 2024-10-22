import React from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import About from './Components/About';
import CardsComponent from './Components/CardsComponents';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Signup from "./Components/Signup";
import './index.css'; 



const linksArray = ["Home", "About Us", "Contact"];

function App() {
  return (
    
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: "rgba(38,126,130,1)" }}>
        <Navbar links={linksArray} />
        <main style={{ flex: 1  }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<CardsComponent />} />
            <Route path="/aboutus" element={<About/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>


  );
}

export default App;
