import React, { useEffect, useState } from 'react';
import './home-varianteA.css';
import './home-varianteB.css';
import Navbar from '../../components/navbar/navbar';
import Menu from '../../components/menu/menu';
import ProfilePic from '../../assets/img/profile.png';

function Home() {
    const [variant, setVariant] = useState('A');
    const [greeting, setGreeting] = useState('Bom dia');
    const [userInfo, setUserInfo] = useState(null);
    const [motoristas, setMotoristas] = useState([]);
    const [passageiros, setPassageiros] = useState([]);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        // Escolhe aleatoriamente entre 'A' e 'B'
        const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
        setVariant(randomVariant);

        // Adiciona a classe ao body
        document.body.classList.add(`variant-${randomVariant}`);

        // Limpa a classe quando o componente é desmontado
        return () => {
            document.body.classList.remove(`variant-${randomVariant}`);
        };
    }, []);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userData = JSON.parse(user);
                setUserInfo(userData);
                setUserType(userData.tipo_usuario);

                const fetchUsers = async () => {
                    try {
                        const endpoint = userData.tipo_usuario === 'PASSAGEIRO'
                            ? `${process.env.REACT_APP_BACKEND_URL}/usuarios/usuario/motoristas`
                            : `${process.env.REACT_APP_BACKEND_URL}/usuarios/usuario/passageiros`;

                        const response = await fetch(endpoint, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        const data = await response.json();
                        if (userData.tipo_usuario === 'PASSAGEIRO') {
                            setMotoristas(data);
                        } else {
                            setPassageiros(data);
                        }
                    } catch (error) {
                        console.error('Erro ao buscar usuários:', error);
                    }
                };

                fetchUsers();
            } catch (error) {
                console.error('Erro ao encontrar dados do usuário do localStorage:', error);
            }
        }

        const currentHour = new Date().getHours();
        if (currentHour >= 4 && currentHour < 12) {
            setGreeting('Bom dia');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Boa tarde');
        } else {
            setGreeting('Boa noite');
        }
    }, []);

    return (
        <>
        <Navbar />
            <div className={`container-home variant-${variant}`}>
                <h1 className={`greeting-home variant-${variant}`}>{greeting}, {userInfo?.nome}</h1>
                <h2 className={`available-rides-home variant-${variant}`}>&nbsp;&nbsp;Suas Caronas Agendadas</h2>
                <div className={`ride-card-home variant-${variant}`}>
                    <div className={`ride-details-home variant-${variant}`}>
                        <img className={`driver-image-home variant-${variant}`} src="/assets/img/motorista2.jpg" alt="Motorista" />
                        <div className={`ride-info-home variant-${variant}`}>
                            <div className={`driver-name-age-home variant-${variant}`}>&nbsp;&nbsp;&nbsp;&nbsp;Ana, 30</div>
                            <div className={`ride-time-home variant-${variant}`}>&nbsp;&nbsp;&nbsp;&nbsp;Amanhã às 18:40</div>
                            <div className={`ride-location-home variant-${variant}`}>
                                <span className={`location-icon-home variant-${variant}`}>&nbsp;&nbsp;📍</span>
                                Atacadão Cotia
                            </div>
                        </div>
                    </div>
                    <button className={`ride-button-home variant-${variant}`}>
                        <img src="/assets/img/icon1.png" alt="Ícone" />
                    </button>
                </div>
                <h2 className={`available-rides2-home variant-${variant}`}>&nbsp;&nbsp;Agende uma Carona</h2>

                <div className={`user-list-home variant-${variant}`}>
                    {userType === 'PASSAGEIRO' && motoristas.map(motorista => (
                        <div key={motorista._id} className={`user-item-home variant-${variant}`}>
                            <img className={`user-img-home variant-${variant}`} src={motorista.img_url || ProfilePic} alt={motorista.nome} />
                            <div className={`user-info-home variant-${variant}`}>
                                <h3>{motorista.nome}</h3>
                                <p>Curso: {motorista.curso}</p>
                                <p>Modelo do Veículo: {motorista.veiculos[0]?.modelo || 'N/A'}</p>
                            </div>
                        </div>
                    ))}
                    {userType === 'MOTORISTA' && passageiros.map(passageiro => (
                        <div key={passageiro._id} className={`user-item-home variant-${variant}`}>
                            <img className={`user-img-home variant-${variant}`} src={passageiro.img_url || ProfilePic} alt={passageiro.nome} />
                            <div className={`user-info-home variant-${variant}`}>
                                <h3>{passageiro.nome}</h3>
                                <p>Curso: {passageiro.curso}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Menu />
            </div>
        </>
    );
}

export default Home;