import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../pages/Home/Home';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Home Component', () => {
    beforeEach(() => {
        fetch.resetMocks();
        localStorage.clear();
    });

    test('renders Home component and checks initial state', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        expect(screen.getByText(/Suas Caronas Agendadas/i)).toBeInTheDocument();
        expect(screen.getByText(/Agende uma Carona/i)).toBeInTheDocument();
    });

    test('sets variant randomly and applies correct CSS class', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const variant = document.body.classList.contains('variant-A') ? 'A' : 'B';
        expect(document.body.classList.contains(`variant-${variant}`)).toBe(true);
    });

    test('fetches and displays user name from localStorage', () => {
        const user = { nome: 'Test User' };
        localStorage.setItem('user', JSON.stringify(user));
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        expect(screen.getByText(/Test User/i)).toBeInTheDocument();
    });

    test('fetches and displays motoristas from backend', async () => {
        const motoristas = [
            { _id: '1', nome: 'Motorista 1', curso: 'Curso 1', veiculos: [{ modelo: 'Modelo 1' }], img_url: '' },
            { _id: '2', nome: 'Motorista 2', curso: 'Curso 2', veiculos: [{ modelo: 'Modelo 2' }], img_url: '' }
        ];
        fetch.mockResponseOnce(JSON.stringify(motoristas));

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Motorista 1/i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText(/Motorista 2/i)).toBeInTheDocument();
        });
    });

    test('sets greeting based on current time', () => {
        const originalDate = Date;
        global.Date = jest.fn(() => ({
            getHours: () => 10
        }));
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        expect(screen.getByText(/Bom dia/i)).toBeInTheDocument();
        global.Date = originalDate;
    });
});