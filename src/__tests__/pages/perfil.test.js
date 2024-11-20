import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Perfil from './../../pages/Perfil/perfil';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Perfil Component', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('renders Perfil component', () => {
        render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        expect(screen.getByText('PERFIL')).toBeInTheDocument();
    });

    test('loads user info from localStorage and fetches user data', async () => {
        const mockUser = { _id: '12345' };
        localStorage.setItem('user', JSON.stringify(mockUser));

        const mockUserInfo = {
            nome: 'John Doe',
            email: 'john.doe@example.com',
            ra: '123456',
            curso: 'Computer Science',
            tipo_usuario: 'ALUNO',
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockUserInfo),
            })
        );

        render(
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('john.doe@example.com')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('123456')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Computer Science')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('ALUNO')).toBeInTheDocument());
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