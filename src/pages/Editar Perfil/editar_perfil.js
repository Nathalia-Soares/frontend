import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Menu from '../../components/menu/menu';
import './editar_perfil-varianteA.css';
import './editar_perfil-varianteB.css';

function EditarPerfil() {
    const navigate = useNavigate();
    const [variant, setVariant] = useState('A');
    const [isMotorista, setIsMotorista] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        imagemPerfil: '',
        ra: '',
        email: '',
        curso: '',
        tipo_usuario: '',
        veiculos: [{
            modelo: '',
            placa: '',
            cor: ''
        }]
    });
    const [errors, setErrors] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        // Escolhe aleatoriamente entre 'A' e 'B'
        const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
        setVariant(randomVariant);

        // Cria uma tag <link> para carregar o CSS apropriado
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = randomVariant === 'A' ? '/path/to/editar_perfil-variantA.css' : '/path/to/editar_perfil-variantB.css';
        document.head.appendChild(link);

        // Adiciona a classe ao body
        document.body.classList.add(`variant-${randomVariant}`);

        // Limpa o link e a classe quando o componente é desmontado
        return () => {
            document.head.removeChild(link);
            document.body.classList.remove(`variant-${randomVariant}`);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('veiculos')) {
            const [_, key] = name.split('.');
            setFormData((prevData) => ({
                ...prevData,
                veiculos: [{ ...prevData.veiculos[0], [key]: value }]
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
        if (!formData.email) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        } else if (!formData.email.endsWith('@fatec.sp.gov.br')) {
            newErrors.email = 'E-mail deve ser @fatec.sp.gov.br';
        }
        if (!formData.ra) newErrors.ra = 'RA é obrigatório';
        if (!formData.curso) newErrors.curso = 'Curso é obrigatório';
        if (isMotorista) {
            if (!formData.veiculos[0].modelo) newErrors.modelo = 'Modelo do veículo é obrigatório';
            if (!formData.veiculos[0].placa) newErrors.placa = 'Placa do veículo é obrigatória';
            if (!formData.veiculos[0].cor) newErrors.cor = 'Cor do veículo é obrigatória';
        }
        if (formData.ra && !/^\d+$/.test(formData.ra)) newErrors.ra = 'RA deve conter apenas números';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        console.log('Form Data:', formData);

        const { confirmSenha, ...dataToSubmit } = formData;

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/usuarios/editar_usuario/${data.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSubmit)
            });
            const data = await response.json();
            console.log('Success:', data);

            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);

                const uploadResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/usuarios/usuario/${data.id}/upload`, {
                    method: 'POST',
                    body: formData
                });
                const uploadData = await uploadResponse.json();
                console.log('Upload Success:', uploadData);

                // Atualiza a URL da imagem de perfil no estado
                setFormData((prevData) => ({
                    ...prevData,
                    imagemPerfil: uploadData.url // Supondo que o backend retorne a URL da imagem no campo 'url'
                }));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleSwitch = (tipo) => {
        setIsMotorista(tipo === 'MOTORISTA');
        setFormData((prevData) => ({
            ...prevData,
            tipo_usuario: tipo
        }));
    };

    const handleProfile = () => {
        navigate('/perfil');
    };

    return (
        <>
            <Navbar />
            <div className={`container variant-${variant}`}>
                <img
                    className={`imagem-perfil variant-${variant}`}
                    src={formData.imagemPerfil || '/path/to/default-profile.png'}
                    alt="Imagem de perfil do usuário"
                />
                <form onSubmit={handleSubmit}>
                    <div className={`input-container variant-${variant}`}>
                        <i className="fas fa-user"></i>
                        <input
                            className={`input-field variant-${variant}`}
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.nome && <span className={`error variant-${variant}`}>{errors.nome}</span>}
                    <div className={`input-container variant-${variant}`}>
                        <i className="fas fa-envelope"></i>
                        <input
                            className={`input-field variant-${variant}`}
                            type="email"
                            name="email"
                            placeholder="E-mail Institucional"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <span className={`error variant-${variant}`}>{errors.email}</span>}
                    <div className={`input-container variant-${variant}`}>
                        <i className="fas fa-lock"></i>
                        <input
                            className={`input-field variant-${variant}`}
                            type="text"
                            name="ra"
                            placeholder="RA"
                            value={formData.ra}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.ra && <span className={`error variant-${variant}`}>{errors.ra}</span>}
                    <div className={`input-container variant-${variant}`}>
                        <i className="fas fa-graduation-cap"></i>
                        <select
                            className={`input-field-select variant-${variant}`}
                            name="curso"
                            value={formData.curso}
                            onChange={handleChange}>
                            <option value="">Selecione o curso</option>
                            <option value="GE">GE - Gestão Empresarial</option>
                            <option value="GPI">GPI - Gestão de Produção Industrial</option>
                            <option value="CD">CD - Ciencia de Dados</option>
                            <option value="DSM">DSM - Desenvolvimento de Software Multiplataforma</option>
                            <option value="CE">CE - Comercio Exterior</option>
                            <option value="DP">DP - Design de Produto</option>
                        </select>
                    </div>
                    {errors.curso && <span className={`error variant-${variant}`}>{errors.curso}</span>}
                    <div className={`switch-container variant-${variant}`}>
                        <button
                            type="button"
                            className={`switch-button variant-${variant} ${!isMotorista ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); toggleSwitch('CARONA'); }}>
                            Carona
                        </button>
                        <button
                            type="button"
                            className={`switch-button variant-${variant} ${isMotorista ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); toggleSwitch('MOTORISTA'); }}>
                            Motorista
                        </button>
                    </div>
                    {isMotorista && (
                        <>
                            <div className={`input-container variant-${variant}`}>
                                <i className="fas fa-car"></i>
                                <input
                                    className={`input-field variant-${variant}`}
                                    type="text"
                                    name="veiculos.modelo"
                                    placeholder="Modelo do Veículo"
                                    value={formData.veiculos[0].modelo}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.modelo && <span className={`error variant-${variant}`}>{errors.modelo}</span>}
                            <div className={`input-container variant-${variant}`}>
                                <i className="fas fa-car-side"></i>
                                <input
                                    className={`input-field variant-${variant}`}
                                    type="text"
                                    name="veiculos.placa"
                                    placeholder="Placa do Veículo"
                                    value={formData.veiculos[0].placa}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.placa && <span className={`error variant-${variant}`}>{errors.placa}</span>}
                            <div className={`input-container variant-${variant}`}>
                                <i className="fas fa-palette"></i>
                                <input
                                    className={`input-field variant-${variant}`}
                                    type="text"
                                    name="veiculos.cor"
                                    placeholder="Cor do Veículo"
                                    value={formData.veiculos[0].cor}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.cor && <span className={`error variant-${variant}`}>{errors.cor}</span>}
                        </>
                    )}
                    <div className={`input-container variant-${variant}`}>
                        <input
                            className={`input-field variant-${variant}`}
                            type="file"
                            name="imagemPerfil"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className={`perfil-acoes variant-${variant}`}>
                        <button className={`button-button-cadastro variant-${variant}`} onClick={() => navigate(-1)}>Voltar</button>
                        <button type="submit" className={`button-button-cadastro variant-${variant}`} onClick={handleProfile}>
                            Atualizar Perfil
                        </button>
                    </div>
                </form>
            </div>
            <Menu />
        </>
    );
}

export default EditarPerfil;