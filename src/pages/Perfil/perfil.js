// src/Perfil.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/navbar/navbar';
import Menu from '../../components/menu/menu';
import './perfil-varianteA.css';
import './perfil-varianteB.css';

function Perfil() {
    const navigate = useNavigate();
    const [variant, setVariant] = React.useState('');

    useEffect(() => {
        // Escolhe aleatoriamente entre 'A' e 'B'
        const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
        setVariant(randomVariant);

        // Cria uma tag <link> para carregar o CSS apropriado
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = randomVariant === 'A' ? '/path/to/perfil-variantA.css' : '/path/to/perfil-variantB.css';
        document.head.appendChild(link);

        // Adiciona a classe ao body
        document.body.classList.add(`variant-${randomVariant}`);

        // Limpa o link e a classe quando o componente é desmontado
        return () => {
            document.head.removeChild(link);
            document.body.classList.remove(`variant-${randomVariant}`);
        };
    }, []);

    const handleEditProfile = () => {
        navigate('/editar_perfil');
    };

    return (
        <>
            <Navbar />
            <div className={`perfil variant-${variant}`}>
                <div className={`perfil-container variant-${variant}`}>
                    <div className={`perfil-header variant-${variant}`}>
                        <h1>PERFIL</h1>
                        <div className={`perfil-avatar variant-${variant}`}>
                            <img
                                src=""
                                alt="Avatar do usuário"
                                className="perfil-imagem"
                            />
                        </div>
                    </div>

                    <div className={`perfil-detalhes variant-${variant}`}>
                        <div className={`campo variant-${variant}`}>
                            <label>Nome Completo:</label>
                            <p>Leonardo dos Santos Almeida</p>
                        </div>

                        <div className={`campo variant-${variant}`}>
                            <label>Email:</label>
                            <p>17/04/1989</p>
                        </div>

                        <div className={`campo variant-${variant}`}>
                            <label>RA:</label>
                            <p>Leo_Almeida</p>
                        </div>

                        <div className={`campo variant-${variant}`}>
                            <label>Curso:</label>
                            <p>17/04/1989</p>
                        </div>

                        <div className={`campo variant-${variant}`}>
                            <label>Tipo de Usuário:</label>
                            <p>123.456.789.01</p>
                        </div>

                        <div className={`campo variant-${variant}`}>
                            <label>Modelo do Veículo:</label>
                            <p>11-99999-8888</p>
                        </div>

                        <div className={`campo variant-${variant}`}>
                            <label>Placa do Veículo:</label>
                            <p>06700-000</p>
                        </div>

                        <div className={`campo variant-${variant}`}>
                            <label>Cor do Veículo:</label>
                            <p>Rua 1, Centro, Cotia - SP</p>
                        </div>
                    </div>

                    <div className={`perfil-acoes variant-${variant}`}>
                        <button className={`voltar variant-${variant}`} onClick={() => navigate(-1)}>Voltar</button>
                        <button className={`alterar variant-${variant}`} onClick={handleEditProfile}>Alterar Perfil</button>
                        <button className={`excluir variant-${variant}`}>Excluir Perfil</button>
                    </div>
                </div>
            </div>
            <Menu />
        </>
    );
};

export default Perfil;