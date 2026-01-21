import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import Dashboard from "./pages/Dashboard";
import Blueprints from "./pages/Blueprints";
import Contracts from "./pages/Contracts";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
function App() {
  return (
    <>
 
      <Router>
         <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/Dashboard" element={<Dashboard/>}/>
           <Route path="/Blueprints" element={<Blueprints/>}/>
           <Route path="/Contracts" element={<Contracts/>}/>


        </Routes>
      </Router>
      <Footer/>
    </>
  )
}

export default App;
