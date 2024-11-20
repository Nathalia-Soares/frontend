import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExcluirPerfil from '../../pages/Excluir Perfil/excluir_perfil';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('ExcluirPerfil', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('renders ExcluirPerfil component', () => {
        render(
            <MemoryRouter>
                <ExcluirPerfil />
            </MemoryRouter>
        );

        expect(screen.getAllByText('Excluir Perfil').length).toBeGreaterThan(0);
        expect(screen.getByText('Tem certeza de que deseja excluir seu perfil? Esta ação não pode ser desfeita.')).toBeInTheDocument();
        expect(screen.getAllByText('Excluir Perfil').length).toBeGreaterThan(0);
        expect(screen.getByText('Cancelar')).toBeInTheDocument();
    });

    test('sets variant state and applies correct CSS class', () => {
        render(
            <MemoryRouter>
                <ExcluirPerfil />
            </MemoryRouter>
        );

        const variant = document.body.classList.contains('variant-A') ? 'A' : 'B';
        expect(document.body.classList.contains(`variant-${variant}`)).toBe(true);
    });

    test('handles cancel button click', () => {
        const mockNavigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

        render(
            <MemoryRouter>
                <ExcluirPerfil />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Cancelar'));

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});