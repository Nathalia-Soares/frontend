// src/Perfil.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/navbar/navbar';
import Menu from '../../components/menu/menu';
import DefaultProfilePic from './../../assets/img/profile.png';
import './perfil-varianteA.css';
import './perfil-varianteB.css';

function Perfil() {
    const navigate = useNavigate();
    const [variant, setVariant] = useState('');
    const [userInfo, setUserInfo] = useState(null);

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

    useEffect(() => {
        // Recupera o ID do usuário do LocalStorage
        const user = localStorage.getItem('user');
        if (user && user !== "undefined") {
            try {
                const userId = JSON.parse(user)._id;

                // Busca as informações do usuário no backend usando o ID
                const fetchUserInfo = async () => {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/usuarios/usuario/${userId}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        const data = await response.json();
                        setUserInfo(data);
                    } catch (error) {
                        console.error('Error fetching user info:', error);
                    }
                };

                fetchUserInfo();
            } catch (error) {
                console.error('Erro ao acessar dados do usuário no localStorage:', error);
            }
        } else {
            console.error('Os dados do usuário não estão definidos no localStorage');
        }
    }, []);

    const handleEditProfile = () => {
        navigate('/editar_perfil');
    };

    const handleDeleteProfile = () => {
        navigate('/excluir_perfil');
    };

    return (
        <>
            <Navbar />
            <div className={`perfil-perfil variant-${variant}`}>
                <div className={`perfil-container-perfil variant-${variant}`}>
                    <div className={`perfil-header-perfil variant-${variant}`}>
                        <h1>PERFIL</h1>
                        <div className={`perfil-avatar-perfil variant-${variant}`}>
                            <img
                                src={userInfo?.img_url || DefaultProfilePic}
                                alt="Avatar do usuário"
                                className={`perfil-imagem-perfil variant-${variant}`}
                            />
                        </div>
                    </div>

                    <div className={`perfil-detalhes-perfil variant-${variant}`}>
                        {userInfo && (
                            <>
                                <div className={`campo-perfil variant-${variant}`}>
                                    <label>Nome Completo:</label>
                                    <p>{userInfo.nome}</p>
                                </div>

                                <div className={`campo-perfil variant-${variant}`}>
                                    <label>Email:</label>
                                    <p>{userInfo.email}</p>
                                </div>

                                <div className={`campo-perfil variant-${variant}`}>
                                    <label>RA:</label>
                                    <p>{userInfo.ra}</p>
                                </div>

                                <div className={`campo-perfil variant-${variant}`}>
                                    <label>Curso:</label>
                                    <p>{userInfo.curso}</p>
                                </div>

                                <div className={`campo-perfil variant-${variant}`}>
                                    <label>Tipo de Usuário:</label>
                                    <p>{userInfo.tipo_usuario}</p>
                                </div>

                                {userInfo.tipo_usuario === 'MOTORISTA' && (
                                    <>
                                        <div className={`campo-perfil variant-${variant}`}>
                                            <label>Modelo do Veículo:</label>
                                            <p>{userInfo.veiculos[0]?.modelo || 'N/A'}</p>
                                        </div>

                                        <div className={`campo-perfil variant-${variant}`}>
                                            <label>Placa do Veículo:</label>
                                            <p>{userInfo.veiculos[0]?.placa || 'N/A'}</p>
                                        </div>

                                        <div className={`campo-perfil variant-${variant}`}>
                                            <label>Cor do Veículo:</label>
                                            <p>{userInfo.veiculos[0]?.cor || 'N/A'}</p>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    <div className={`perfil-acoes-perfil variant-${variant}`}>
                        <button className={`voltar-perfil variant-${variant}`} onClick={() => navigate(-1)}>Voltar</button>
                        <button className={`alterar-perfil variant-${variant}`} onClick={handleEditProfile}>Alterar Perfil</button>
                        <button className={`excluir-perfil variant-${variant}`} onClick={handleDeleteProfile}>Excluir Perfil</button>
                    </div>
                </div>
            </div>
            <Menu />
        </>
    );
};

export default Perfil;