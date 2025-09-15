import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import GameDetail from "./GameDetail";
import About from "./About";
import KonamiCode from "./KonamiCode";
import Contact from "./Contact";
import FAQ from "./FAQ";

function App() {
  return (
    <>
      <KonamiCode />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/game/:id" element={<GameDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
