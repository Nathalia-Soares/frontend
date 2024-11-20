import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExcluirPerfil from '../../pages/Excluir Perfil/excluir_perfil';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('ExcluirPerfil', () => {
    beforeEach(() => {
        if (!window.crypto) {
            window.crypto = { getRandomValues: jest.fn() };
        }
        jest.spyOn(window.crypto, 'getRandomValues').mockReturnValue(new Uint32Array([0]));
        localStorage.clear();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('renders ExcluirPerfil component', () => {
        render(
            <MemoryRouter>
                <ExcluirPerfil />
            </MemoryRouter>
        );
        const excluirPerfilElements = screen.getAllByText('Excluir Perfil');
        expect(excluirPerfilElements.length).toBeGreaterThan(0);
        expect(screen.getByText('Tem certeza de que deseja excluir seu perfil? Esta ação não pode ser desfeita.')).toBeInTheDocument();
    });

    test('handles cancel button click', () => {
        const navigateMock = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigateMock);

        render(
            <MemoryRouter>
                <ExcluirPerfil />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Cancelar'));

        expect(navigateMock).toHaveBeenCalledWith(-1);
    });
});