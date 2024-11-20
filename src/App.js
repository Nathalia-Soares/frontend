import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Inicial from './pages/Inicial/Inicial';
import Cadastro from './pages/Cadastro/Cadastro';
import Home from './pages/Home/home';
import CadastroAuth from './pages/Cadastro 2/Cadastro2';
import Login from './pages/Login/login';
import Perfil from './pages/Perfil/perfil';
import EditarPerfil from './pages/Editar Perfil/editar_perfil';
import ExcluirPerfil from './pages/Excluir Perfil/excluir_perfil';
import ListarViagens from './pages/Viagens/listar_viagens';


function App() {
  return (
    <Router basename="">
      <Routes>
        <Route path="/" element={<Inicial />} />
        <Route path="/cadastro" element={<Cadastro />} /> {}
        <Route path="/cadastro_auth" element={<CadastroAuth />} /> {}
        <Route path="/login" element={<Login />} /> {}
        <Route path="/perfil" element={<Perfil />} /> {}
        <Route path="/editar_perfil" element={<EditarPerfil />} /> {}
        <Route path="/excluir_perfil" element={<ExcluirPerfil />} /> {}
        <Route path="/perfil/listar_viagens" element={<ListarViagens />} /> {}
        <Route path="/home" element={<Home />} /> {}
      </Routes>
    </Router>
    
  );
}

export default App;

