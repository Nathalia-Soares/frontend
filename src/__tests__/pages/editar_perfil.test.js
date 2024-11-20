import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EditarPerfil from '../../pages/Editar Perfil/editar_perfil';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('EditarPerfil Component', () => {
    beforeEach(() => {
        if (!window.crypto) {
            window.crypto = { getRandomValues: jest.fn() };
        }
        jest.spyOn(window.crypto, 'getRandomValues').mockReturnValue(new Uint32Array([0]));
        localStorage.setItem('user', JSON.stringify({ _id: '12345' }));
        fetch.resetMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('renders EditarPerfil component', () => {
        render(
            <Router>
                <EditarPerfil />
            </Router>
        );
        expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('E-mail Institucional')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('RA')).toBeInTheDocument();
        expect(screen.getByText('Atualizar Perfil')).toBeInTheDocument();
    });

    test('handles form input changes', () => {
        render(
            <Router>
                <EditarPerfil />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('E-mail Institucional'), { target: { value: 'john.doe@fatec.sp.gov.br' } });
        fireEvent.change(screen.getByPlaceholderText('RA'), { target: { value: '123456' } });

        expect(screen.getByPlaceholderText('Nome').value).toBe('John Doe');
        expect(screen.getByPlaceholderText('E-mail Institucional').value).toBe('john.doe@fatec.sp.gov.br');
        expect(screen.getByPlaceholderText('RA').value).toBe('123456');
    });

    test('validates form inputs', async () => {
        render(
            <Router>
                <EditarPerfil />
            </Router>
        );

        fireEvent.click(screen.getByText('Atualizar Perfil'));

        expect(await screen.findByText('Nome é obrigatório')).toBeInTheDocument();
        expect(await screen.findByText('E-mail é obrigatório')).toBeInTheDocument();
        expect(await screen.findByText('RA é obrigatório')).toBeInTheDocument();
        expect(await screen.findByText('Curso é obrigatório')).toBeInTheDocument();
    });
});