import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Inicial from '../../pages/Inicial/Inicial';
import { BrowserRouter as Router } from 'react-router-dom';

const renderInicial = () => {
    return render(
        <Router>
            <Inicial />
        </Router>
    );
};

describe('Inicial Component', () => {
    beforeEach(() => {
        // Mock Math.random to control the variant selection
        jest.spyOn(Math, 'random').mockReturnValue(0.3); // This will always select variant 'A'
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('renders Inicial component with variant A', () => {
        renderInicial();

        // Check if the variant A elements are rendered
        expect(screen.getAllByAltText('Logo Rachaí')[0]).toHaveAttribute('src', '/assets/img/rachai.png');
        expect(screen.getByText('Cadastrar-se')).toHaveClass('button-cadastro variant-A');
        expect(screen.getByText('Login')).toHaveClass('button-login variant-A');
        expect(screen.getByText('Esqueci minha senha')).toHaveClass('esqueci-senha variant-A');
        expect(screen.getAllByAltText('Logo Rachaí')[0]).toHaveClass('logo-rachai0 variant-A');
        expect(screen.getAllByAltText('Logo Rachaí')[0]).toHaveAttribute('src', '/assets/img/rachai.png');
        expect(screen.getAllByAltText('Logo Rachaí')[1]).toHaveClass('logo-fatec variant-A');
    });

    test('renders Inicial component with variant B', () => {
        // Change the mock to return a value that selects variant 'B'
        jest.spyOn(Math, 'random').mockReturnValue(0.7);

        renderInicial();

        // Check if the variant B elements are rendered
        expect(screen.getAllByAltText('Logo Rachaí')[0]).toHaveAttribute('src', '/assets/img/rachai2.png');
        expect(screen.getByText('Cadastrar-se')).toHaveClass('button-cadastro variant-B');
        expect(screen.getByText('Login')).toHaveClass('button-login variant-B');
        expect(screen.getByText('Esqueci minha senha')).toHaveClass('esqueci-senha variant-B');
        expect(screen.getAllByAltText('Logo Rachaí')[0]).toHaveClass('logo-rachai0 variant-B');
        expect(screen.getAllByAltText('Logo Rachaí')[1]).toHaveAttribute('src', '/assets/img/fatec2.png');
        expect(screen.getAllByAltText('Logo Rachaí')[1]).toHaveClass('logo-fatec variant-B');
    });
});