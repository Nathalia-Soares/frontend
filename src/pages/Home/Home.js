import React, { useEffect, useState } from 'react';
import './home-varianteA.css';
import './home-varianteB.css';
import Navbar from '../../components/navbar/navbar';
import Menu from '../../components/menu/menu';
import ProfilePic from '../../assets/img/profile.png';

function Home() {
    const [variant, setVariant] = useState('A');
    const [userName, setUserName] = useState('');
    const [motoristas, setMotoristas] = useState([]);
    const [greeting, setGreeting] = useState('Bom dia');

    useEffect(() => {
        // Escolhe aleatoriamente entre 'A' e 'B'
        const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
        setVariant(randomVariant);

        // Cria uma tag <link> para carregar o CSS apropriado
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = randomVariant === 'A' ? '/path/to/home-varianteA.css' : '/path/to/home-varianteB.css';
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
        // Recupera o nome do usuário do LocalStorage
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userData = JSON.parse(user);
                setUserName(userData.nome);
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
            }
        }

        // Busca os motoristas do backend
        const fetchMotoristas = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/usuarios/usuario/motoristas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setMotoristas(data);
            } catch (error) {
                console.error('Error fetching motoristas:', error);
            }
        };

        fetchMotoristas();

        // Define a saudação com base no horário atual
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
            <img
                className={`logo-rachai2-home variant-${variant}`}
                src={variant === 'A' ? '/assets/img/rachai.png' : '/assets/img/rachai2.png'}
                alt="Logo Rachaí"
                style={{ width: '100px' }}
            />
            <h1 className={`greeting-home variant-${variant}`}>{greeting}, {userName}</h1>
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

            <div className={`motorista-list-home variant-${variant}`}>
                {motoristas.map(motorista => (
                    <div key={motorista._id} className={`motorista-item-home variant-${variant}`}>
                        <img className={`motorista-img-home variant-${variant}`} src={motorista.img_url || ProfilePic } alt={motorista.nome} />
                        <div className={`motorista-info-home variant-${variant}`}>
                            <h3>{motorista.nome}</h3>
                            <p>Curso: {motorista.curso}</p>
                            <p>Modelo do Veículo: {motorista.veiculos[0]?.modelo || 'N/A'}</p>
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