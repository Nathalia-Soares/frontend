import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Menu from '../../components/menu/menu';
import './listar_viagens-varianteA.css';
import './listar_viagens-varianteB.css';

function ListarViagens() {
    const [viagens, setViagens] = useState([]);
    const [expandedViagemId, setExpandedViagemId] = useState(null);
    const [variant, setVariant] = useState('A');

    useEffect(() => {
        // Escolhe aleatoriamente entre 'A' e 'B'
        const randomVariant = window.crypto.getRandomValues(new Uint32Array(1))[0] % 2 === 0 ? 'A' : 'B';
        setVariant(randomVariant);

        // Cria uma tag <link> para carregar o CSS apropriado
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = randomVariant === 'A' ? '/path/to/listar_viagens-variantA.css' : '/path/to/listar_viagens-variantB.css';
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
        const fetchViagens = async () => {
            try {
                // Recupera o ID do usuário do LocalStorage
                const user = localStorage.getItem('user');
                if (user) {
                    const userId = JSON.parse(user)._id;

                    // Faz a requisição para buscar as viagens do usuário
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/viagens/usuario/${userId}/viagens`);
                    const data = await response.json();
                    setViagens(data);
                }
            } catch (error) {
                console.error('Erro ao acessar viagens:', error);
            }
        };

        fetchViagens();
    }, []);

    const toggleExpand = (id) => {
        setExpandedViagemId(expandedViagemId === id ? null : id);
    };

    return (
        <>
            <Navbar />
            <div className={`container-listar-viagens variant-${variant}`}>
                <div className={`viagens-list-listar-viagens variant-${variant}`}>
                    {viagens.length === 0 ? (
                        <p>Você ainda não tem viagens registradas</p>
                    ) : (
                        viagens.map((viagem) => (
                            <div key={viagem.id} className={`viagem-item-listar-viagens variant-${variant}`}>
                                <div className={`viagem-info-listar-viagens variant-${variant}`}>
                                    <p><b>Status: </b>{viagem.status}</p>
                                    <p><b>Local de Partida: </b>{viagem.localPartida}</p>
                                    <p><b>Destino: </b>{viagem.destino}</p>
                                    <p><b>Data: </b>{viagem.data}</p>
                                    <button className={`btn-listar-viagens variant-${variant}`} onClick={() => toggleExpand(viagem.id)}>+</button>
                                </div>
                                {expandedViagemId === viagem.id && (
                                    <div className={`viagem-detalhes-listar-viagens variant-${variant}`}>
                                        <h4>Usuários</h4>
                                        {viagem.usuarios.map((usuario) => (
                                            <div key={usuario.id}>
                                                <p><b>Usuário: </b>{usuario.nome}</p>
                                                <p><b>Tipo de Usuário: </b>{usuario.tipo_usuario}</p>
                                            </div>
                                        ))}
                                        <h4>Pagamento</h4>
                                        {viagem.pagamento.map((pagamento) => (
                                            <div key={pagamento.id}>
                                                <p><b>Método de Pagamento: </b>{pagamento.metodo}</p>
                                                <p><b>Valor: </b>R${pagamento.valor}</p>
                                            </div>
                                        ))}
                                        <h4>Avaliação</h4>
                                        {viagem.avaliacao.map((avaliacao) => (
                                            <div key={avaliacao.id}>
                                                <p><b>Nota: </b>{avaliacao.nota}</p>
                                                <p><b>Feedback: </b>{avaliacao.feedback}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Menu />
        </>
    );
}

export default ListarViagens;