import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Inicial from '../../pages/Inicial/Inicial';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Inicial Component', () => {
    beforeEach(() => {
        // Mock Math.random to control the variant selection
        jest.spyOn(Math, 'random').mockReturnValue(0.3); // This will always select variant 'A'
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('renders Inicial component with variant A', () => {
        render(
            <Router>
                <Inicial />
            </Router>
        );

        // Check if the variant A elements are rendered
        expect(screen.getByAltText('Logo Rachaí')).toHaveAttribute('src', '/assets/img/rachai.png');
        expect(screen.getByText('Cadastrar-se')).toHaveClass('button-cadastro variant-A');
        expect(screen.getByText('Login')).toHaveClass('button-login variant-A');
        expect(screen.getByText('Esqueci minha senha')).toHaveClass('esqueci-senha variant-A');
        expect(screen.getByAltText('Logo Rachaí')).toHaveClass('logo-rachai0 variant-A');
        expect(screen.getByAltText('Logo Rachaí')).toHaveAttribute('src', '/assets/img/rachai.png');
        expect(screen.getByAltText('Logo Rachaí')).toHaveClass('logo-fatec variant-A');
    });

    test('renders Inicial component with variant B', () => {
        // Change the mock to return a value that selects variant 'B'
        jest.spyOn(Math, 'random').mockReturnValue(0.7);

        render(
            <Router>
                <Inicial />
            </Router>
        );

        // Check if the variant B elements are rendered
        expect(screen.getByAltText('Logo Rachaí')).toHaveAttribute('src', '/assets/img/rachai2.png');
        expect(screen.getByText('Cadastrar-se')).toHaveClass('button-cadastro variant-B');
        expect(screen.getByText('Login')).toHaveClass('button-login variant-B');
        expect(screen.getByText('Esqueci minha senha')).toHaveClass('esqueci-senha variant-B');
        expect(screen.getByAltText('Logo Rachaí')).toHaveClass('logo-rachai0 variant-B');
        expect(screen.getByAltText('Logo Rachaí')).toHaveAttribute('src', '/assets/img/rachai2.png');
        expect(screen.getByAltText('Logo Rachaí')).toHaveClass('logo-fatec variant-B');
    });
});