import React, { useState, useEffect } from 'react';
import './login-varianteA.css';
import './login-varianteB.css';

function Login() {
    const [variant, setVariant] = useState('A');
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
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
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        } else if (!formData.email.endsWith('@fatec.sp.gov.br')) {
            newErrors.email = 'E-mail deve ser @fatec.sp.gov.br';
        }
        if (!formData.senha) {
            newErrors.senha = 'Senha é obrigatória';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.senha)) {
            newErrors.senha = 'Senha deve ter no mínimo 8 caracteres, pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial';
        }
        return newErrors;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`container variant-${variant}`}>
            <img
                className={`logo-rachai1 variant-${variant}`}
                src={variant === 'A' ? '/assets/img/rachai.png' : '/assets/img/rachai2.png'}
                alt="Logo Rachaí"
            />
            <form onSubmit={handleSubmit}>
                <div className={`input-container variant-${variant}`}>
                    <i className="fas fa-envelope"></i>
                    <input
                        className={`input-field variant-${variant}`}
                        type="email"
                        name="email"
                        placeholder="E-mail: usuario@fatec.sp.gov.br"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                {errors.email && <span className={`error variant-${variant}`}>{errors.email}</span>}
                <div className={`input-container variant-${variant}`}>
                    <input
                        className={`input-field variant-${variant}`}
                        type={showPassword ? "text" : "password"}
                        name="senha"
                        placeholder="Senha"
                        value={formData.senha}
                        onChange={handleChange}
                    />
                    <i
                        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle`}
                        onClick={togglePasswordVisibility}>   
                    </i>
                </div>
                {errors.senha && <span className={`error variant-${variant}`}>{errors.senha}</span>}
                <button type="submit" className={`button-button-cadastro variant-${variant}`}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;