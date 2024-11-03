import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cadastro from '../../pages/Cadastro/Cadastro';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Cadastro Component', () => {
    test('renders without crashing', () => {
        render(
            <Router>
                <Cadastro />
            </Router>
        );
        expect(screen.getByPlaceholderText('RA')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('E-mail Institucional')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    });

    test('toggles between Carona and Motorista', () => {
        render(
            <Router>
                <Cadastro />
            </Router>
        );

        const caronaButton = screen.getByText('Carona');
        const motoristaButton = screen.getByText('Motorista');

        // Initially, Carona should be active
        expect(caronaButton).toHaveClass('active');
        expect(motoristaButton).not.toHaveClass('active');

        // Click Motorista button
        fireEvent.click(motoristaButton);

        // Now, Motorista should be active
        expect(motoristaButton).toHaveClass('active');
        expect(caronaButton).not.toHaveClass('active');

        // Additional fields should be visible
        expect(screen.getByPlaceholderText('Modelo do Carro')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Placa')).toBeInTheDocument();
    });

    test('renders correct logo based on variant', () => {
        render(
            <Router>
                <Cadastro />
            </Router>
        );

        const logo = screen.getByAltText('Logo Rachaí');
        expect(logo).toBeInTheDocument();
        expect(logo.src).toMatch(/\/assets\/img\/rachai(2)?\.png$/);
    });

    test('renders Cadastro button', () => {
        render(
            <Router>
                <Cadastro />
            </Router>
        );

        const cadastroButton = screen.getByText('Cadastrar-se');
        expect(cadastroButton).toBeInTheDocument();
    });
});