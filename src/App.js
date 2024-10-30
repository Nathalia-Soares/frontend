import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicial from './pages/Inicial/Inicial';
import Cadastro from './pages/Cadastro/Cadastro';
import Home from './pages/Home/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicial />} />
        <Route path="/cadastro" element={<Cadastro />} /> {}
        <Route path="/home" element={<Home />} /> {}
      </Routes>
    </Router>
    
  );
}

export default App;

