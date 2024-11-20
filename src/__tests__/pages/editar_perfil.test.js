import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EditarPerfil from '../../pages/Editar Perfil/editar_perfil';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('EditarPerfil', () => {
    beforeEach(() => {
        localStorage.setItem('user', JSON.stringify({ _id: '12345' }));
        fetch.resetMocks();
    });

    afterEach(() => {
        localStorage.clear();
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

    test('validates form fields', async () => {
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

    test('handles file input change', () => {
        render(
            <Router>
                <EditarPerfil />
            </Router>
        );

        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
        const input = screen.getByLabelText('Escolher Imagem');
        fireEvent.change(input, { target: { files: [file] } });

        expect(input.files[0]).toBe(file);
        expect(input.files).toHaveLength(1);
    });

    test('toggles between motorista and passageiro', () => {
        render(
            <Router>
                <EditarPerfil />
            </Router>
        );

        fireEvent.click(screen.getByText('Motorista'));
        expect(screen.getByPlaceholderText('Modelo do Veículo')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Placa do Veículo')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Cor do Veículo')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Carona'));
        expect(screen.queryByPlaceholderText('Modelo do Veículo')).not.toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Placa do Veículo')).not.toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Cor do Veículo')).not.toBeInTheDocument();
    });
});