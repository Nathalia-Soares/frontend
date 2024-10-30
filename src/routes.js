import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicial from './pages/Inicial';
import Cadastro from './pages/Cadastro'; 
import Home from './pages/Home'; 

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

