import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../pages/Home/Home';
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Home Component', () => {
    beforeEach(() => {
        fetch.resetMocks();
        localStorage.clear();
    });

    test('sets variant class on body', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        const variantClass = document.body.className;
        expect(variantClass).toMatch(/variant-(A|B)/);
    });

    test('fetches and displays user info from localStorage', async () => {
        const user = { nome: 'John Doe', tipo_usuario: 'PASSAGEIRO' };
        localStorage.setItem('user', JSON.stringify(user));

        fetch.mockResponseOnce(JSON.stringify([]));

        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        });
    });

    test('fetches motoristas for PASSAGEIRO user', async () => {
        const user = { nome: 'John Doe', tipo_usuario: 'PASSAGEIRO' };
        localStorage.setItem('user', JSON.stringify(user));

        const motoristas = [{ _id: '1', nome: 'Ana', curso: 'Engenharia', veiculos: [{ modelo: 'Carro' }] }];
        fetch.mockResponseOnce(JSON.stringify(motoristas));

        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Ana/i)).toBeInTheDocument();
        });
    });

    test('sets greeting based on morning time', () => {
        const mockDate = new Date(2023, 10, 10, 8); // 08:00
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        expect(screen.getByText(/Bom dia/i)).toBeInTheDocument();

        jest.restoreAllMocks();
    });

    test('sets greeting based on afternoon time', () => {
        const mockDate = new Date(2023, 10, 10, 15); // 15:00
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        expect(screen.getByText(/Boa tarde/i)).toBeInTheDocument();

        jest.restoreAllMocks();
    });

    test('sets greeting based on evening time', () => {
        const mockDate = new Date(2023, 10, 10, 20); // 20:00
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        expect(screen.getByText(/Boa noite/i)).toBeInTheDocument();

        jest.restoreAllMocks();
    });
});