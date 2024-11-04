import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="menu-bar" role="navigation">
            <Link to="/cadastro" className="menu-icon">
                <img src="/assets/img/icon4.png" alt="Início" />
            </Link>
            <Link to="/home" className="menu-icon">
                <img src="/assets/img/icon2.png" alt="Início" />
            </Link>
            <Link to="/perfil" className="menu-icon">
                <img src="/assets/img/icon3.png" alt="Início" />
            </Link>
        </div>
    );
}

export default Navbar;