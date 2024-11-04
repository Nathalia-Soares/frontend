import React, { useEffect, useState } from 'react';
import './cadastro-varianteA.css';
import './cadastro-varianteB.css';
import { Link } from 'react-router-dom';

function Cadastro() {
    const [variant, setVariant] = useState('A');

    useEffect(() => {
        // Escolhe aleatoriamente entre 'A' e 'B'
        const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
        setVariant(randomVariant);

        // Cria uma tag <link> para carregar o CSS apropriado
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = randomVariant === 'A' ? '/path/to/cadastro-variantA.css' : '/path/to/cadastro-variantB.css';
        document.head.appendChild(link);

        // Adiciona a classe ao body
        document.body.classList.add(`variant-${randomVariant}`);

        // Limpa o link e a classe quando o componente é desmontado
        return () => {
            document.head.removeChild(link);
            document.body.classList.remove(`variant-${randomVariant}`);
        };
    }, []);

    const [isMotorista, setIsMotorista] = useState(false);
    const [isPasswordVisible] = useState(false);

    const toggleSwitch = () => {
        setIsMotorista(!isMotorista);
    };

    return (
        <div className={`container variant-${variant}`}>
            <img 
                className=
                {`logo-rachai1 variant-${variant}`}
                src={variant === 'A' ? '/assets/img/rachai.png' : '/assets/img/rachai2.png'} 
                alt="Logo Rachaí" 
            />
            <input className={`input-field variant-${variant}`} type="text" placeholder="RA" />
            <input className={`input-field variant-${variant}`} type="email" placeholder="E-mail Institucional" />
            <input 
                className={`input-field variant-${variant}`} 
                type={isPasswordVisible ? "text" : "password"} 
                placeholder="Senha" 
            />
            {isMotorista && (
                <>
                    <input className={`input-field variant-${variant}`} type="text" placeholder="Modelo do Carro" />
                    <input className={`input-field variant-${variant}`} type="text" placeholder="Placa" />
                </>
            )}
            <div className={`switch-container variant-${variant}`}>
                <button 
                    className={`switch-button variant-${variant} ${!isMotorista ? 'active' : ''}`} 
                    onClick={toggleSwitch}
                >
                    Carona
                </button>
                <button 
                    className={`switch-button variant-${variant} ${isMotorista ? 'active' : ''}`} 
                    onClick={toggleSwitch}
                >
                    Motorista
                </button>
            </div>
            <Link to="/home">
                <button className={`button-button-cadastro variant-${variant}`}>
                    Cadastrar-se
                </button>
            </Link>
        </div>
    );
}

export default Cadastro;