import React, { useEffect, useState } from 'react';
import './inicial-varianteA.css'; 
import './inicial-varianteB.css'; 
import { Link } from 'react-router-dom';

function Inicial() {
    const [variant, setVariant] = useState('A');

    useEffect(() => {
        // Escolhe aleatoriamente entre 'A' e 'B'
        const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
        setVariant(randomVariant);

        // Cria uma tag <link> para carregar o CSS apropriado
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = randomVariant === 'A' ? '/path/to/inicial-varianteA.css' : '/path/to/inicial-varianteB.css';
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
            <div>
            <img 
                    className={`logo-rachai0 variant-${variant}`}
                    src={variant === 'A' ? '/assets/img/rachai.png' : '/assets/img/rachai2.png'} 
                    alt="Logo Rachaí" 
                />
            </div>
            
            <div className={`button-container variant-${variant}`}>
                <Link to="/cadastro">
                    <button className={`button button-cadastro variant-${variant}`}>Cadastrar-se</button>
                </Link>
                <Link to="/login">
                    <button className={`button button-login variant-${variant}`}>Login</button>
                </Link>
                <span className={`esqueci-senha variant-${variant}`}>Esqueci minha senha</span>
            </div>
            <img 
                    className={`logo-fatec variant-${variant}`}
                    src={variant === 'A' ? '/assets/img/fatec.png' : '/assets/img/fatec2.png'} 
                    alt="Logo Rachaí" 
                />
        </div>
    );
}

export default Inicial;










