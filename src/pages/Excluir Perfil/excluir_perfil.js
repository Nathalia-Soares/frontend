import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './excluir_perfil-varianteA.css';
import './excluir_perfil-varianteB.css';
import Navbar from '../../components/navbar/navbar';
import Menu from '../../components/menu/menu';

function ExcluirPerfil() {
    const navigate = useNavigate();
    const [variant, setVariant] = useState('A');

    useEffect(() => {
        // Escolhe aleatoriamente entre 'A' e 'B'
        const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
        setVariant(randomVariant);

        // Cria uma tag <link> para carregar o CSS apropriado
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = randomVariant === 'A' ? '/path/to/excluir_perfil-variantA.css' : '/path/to/excluir_perfil-variantB.css';
        document.head.appendChild(link);

        // Adiciona a classe ao body
        document.body.classList.add(`variant-${randomVariant}`);

        // Limpa o link e a classe quando o componente é desmontado
        return () => {
            document.head.removeChild(link);
            document.body.classList.remove(`variant-${randomVariant}`);
        };
    }, []);

    const handleDelete = async () => {
        // Recupera o ID do usuário do LocalStorage
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userId = JSON.parse(user)._id;

                // Faz a requisição para deletar o usuário
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/usuarios/deletar_usuario/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Usuário deletado com sucesso. Você será redirecionado para a página inicial.');
                    // Remove os dados do usuário do LocalStorage
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    localStorage.removeItem('expirationTime');
                    // Redireciona para a página de login
                    setTimeout(() => navigate('/'), 3000);
                } else {
                    console.error('Erro ao deletar usuário');
                }
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
            }
        }
    };

    return (
        <>
        <Navbar />
        <div className={`excluir-container variant-${variant}`}>
            <div className={`excluir-perfil-container variant-${variant}`}>
                <h1>Excluir Perfil</h1>
                <p>Tem certeza de que deseja excluir seu perfil? Esta ação não pode ser desfeita.</p>
                <div className={`button-container variant-${variant}`}>
                    <button className={`excluir-button variant-${variant}`} onClick={handleDelete}>Excluir Perfil</button>
                    <button className={`cancelar-button variant-${variant}`} onClick={() => navigate(-1)}>Cancelar</button>
                </div>
            </div>
        </div>
        <Menu />
        </>
    );
}

export default ExcluirPerfil;