import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Inicial from '../../pages/Inicial/Inicial';

describe('Inicial Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <Router>
                <Inicial />
            </Router>
        );
        expect(screen.getAllByAltText('Logo Rachaí').length).toBeGreaterThan(0);
    });
    
    test('renders correct images based on variant', () => {
        render(
            <Router>
                <Inicial />
            </Router>
        );

        const logoRachai = screen.getAllByAltText('Logo Rachaí')[0];
        const logoFatec = screen.getAllByAltText('Logo Rachaí')[1];

        expect(logoRachai.src).toMatch(/(rachai|rachai2)\.png$/);
        expect(logoFatec.src).toMatch(/(fatec|fatec2)\.png$/);
    });

    test('renders buttons and links correctly', () => {
        render(
            <Router>
                <Inicial />
            </Router>
        );

        expect(screen.getByText('Cadastrar-se')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Esqueci minha senha')).toBeInTheDocument();
    });
});