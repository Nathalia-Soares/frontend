import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from './../../assets/img/profile.png';
import './navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const fetchUserInfo = async () => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userId = JSON.parse(user)._id;
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
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const handleProfileClick = () => {
        navigate('/perfil');
    };

    const handleNavIconClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.status === 200) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('expirationTime');
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                console.error('Erro ao fazer logout');
            }
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const handleMinhasViagensClick = () => {
        navigate('/perfil/listar_viagens');
    };

    return (
        <div className="header-container">
            <div className="nav-icon" onClick={handleNavIconClick}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            {dropdownOpen && (
                <div className="dropdown-menu">
                    <button onClick={handleMinhasViagensClick}>Minhas Viagens</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            {userInfo && (
                <div className="profile-picture" onClick={handleProfileClick}>
                    <img
                        src={userInfo?.img_url || defaultProfilePic }
                        alt="Imagem de perfil do usuário"
                    />
                </div>
            )}
        </div>
    );
}

export default Navbar;