import React, { useEffect, useState } from 'react';
import './home-varianteA.css';
import './home-varianteB.css';
import Navbar from '../../components/navbar/navbar';

const motoristas = [
    {
        id: 1,
        nome: "Carlos, 43",
        curso: "GE",
        periodo: "Noturno",
        img: "/assets/img/motorista1.jpg"
    },
    {
        id: 2,
        nome: "Ana, 30",
        curso: "DSM",
        periodo: "Diurno",
        img: "/assets/img/motorista2.jpg"
    },
    {
        id: 3,
        nome: "Lucas, 28",
        curso: "GPI",
        periodo: "Noturno",
        img: "/assets/img/motorista3.jpg"
    },
    {
        id: 4,
        nome: "Mariana, 22",
        curso: "DSM",
        periodo: "Diurno",
        img: "/assets/img/motorista4.jpg"
    },
    {
        id: 5,
        nome: "Thiago, 27",
        curso: "GPI",
        periodo: "Noturno",
        img: "/assets/img/motorista5.jpg"
    }
];

function Home() {
    const [variant, setVariant] = useState('A');

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

    return (
        <div className={`container variant-${variant}`}>
            <img 
                    className={`logo-rachai2 variant-${variant}`}
                    src={variant === 'A' ? '/assets/img/rachai.png' : '/assets/img/rachai2.png'} 
                    alt="Logo Rachaí"
                    style={{ width: '100px' }} 
                />
            <h1 className={`greeting variant-${variant}`}>Bom dia, Pedro</h1>
            <h2 className={`available-rides variant-${variant}`}>&nbsp;&nbsp;Suas Caronas Agendadas</h2>
            <div className={`ride-card variant-${variant}`}>
                <div className={`ride-details variant-${variant}`}>
                    <img className={`driver-image variant-${variant}`} src="/assets/img/motorista2.jpg" alt="Motorista" />
                    <div className={`ride-info variant-${variant}`}>
                        <div className={`driver-name-age variant-${variant}`}>&nbsp;&nbsp;&nbsp;&nbsp;Ana, 30</div>
                        <div className={`ride-time variant-${variant}`}>&nbsp;&nbsp;&nbsp;&nbsp;Amanhã às 18:40</div>
                        <div className={`ride-location variant-${variant}`}>
                            <span className={`location-icon variant-${variant}`}>&nbsp;&nbsp;📍</span>
                            Atacadão Cotia
                        </div>
                    </div>
                </div>
                <button className={`ride-button variant-${variant}`}>
                    <img src="/assets/img/icon1.png" alt="Ícone" />
                </button>
            </div>
            <h2 className={`available-rides2 variant-${variant}`}>&nbsp;&nbsp;Agende uma Carona</h2>

            <div className={`motorista-list variant-${variant}`}>
                {motoristas.map(motorista => (
                    <div key={motorista.id} className={`motorista-item variant-${variant}`}>
                        <img className={`motorista-img variant-${variant}`} src={motorista.img} alt={motorista.nome} />
                        <div className={`motorista-info variant-${variant}`}>
                            <h3>{motorista.nome}</h3>
                            <p>Curso: {motorista.curso}</p>
                            <p>Período: {motorista.periodo}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Navbar />
        </div>
    );
}

export default Home;





