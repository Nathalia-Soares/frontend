import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Perfil from '../../pages/Perfil/perfil';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../../components/navbar/navbar', () => () => <div>Mocked Navbar</div>);
jest.mock('../../components/menu/menu', () => () => <div>Mocked Menu</div>);

describe('Perfil Component', () => {
    beforeEach(() => {
        if (!window.crypto) {
            window.crypto = { getRandomValues: jest.fn() };
        }
        jest.spyOn(window.crypto, 'getRandomValues').mockReturnValue(new Uint32Array([0]));
        localStorage.setItem('user', JSON.stringify({ _id: '123' }));
        fetchMock.resetMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('renders Perfil component', () => {
        render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        expect(screen.getByText('PERFIL')).toBeInTheDocument();
        expect(screen.getByText('Mocked Navbar')).toBeInTheDocument();
        expect(screen.getByText('Mocked Menu')).toBeInTheDocument();
    });

    test('fetches and displays user info from localStorage', async () => {
        const mockUser = {
            _id: '123',
            nome: 'John Doe',
            email: 'john.doe@example.com',
            ra: '123456',
            curso: 'CD',
            tipo_usuario: 'PASSAGEIRO',
            img_url: 'http://example.com/avatar.jpg',
        };
        localStorage.setItem('user', JSON.stringify(mockUser));

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockUser),
            })
        );

        render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        expect(await screen.findByText('John Doe')).toBeInTheDocument();
        expect(await screen.findByText('john.doe@example.com')).toBeInTheDocument();
        expect(await screen.findByText('123456')).toBeInTheDocument();
        expect(await screen.findByText('CD')).toBeInTheDocument();
        expect(await screen.findByText('PASSAGEIRO')).toBeInTheDocument();
    });

    test('handles edit profile button click', () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

        render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Alterar Perfil'));
        expect(navigate).toHaveBeenCalledWith('/editar_perfil');
    });

    test('handles delete profile button click', () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

        render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Excluir Perfil'));
        expect(navigate).toHaveBeenCalledWith('/excluir_perfil');
    });

    test('handles back button click', () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

        render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Voltar'));
        expect(navigate).toHaveBeenCalledWith(-1);
    });
});