import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListarViagens from '../../pages/Viagens/listar_viagens';

// Mocking dependencies
jest.mock('../../components/navbar/navbar', () => () => <div>Navbar</div>);
jest.mock('../../components/menu/menu', () => () => <div>Menu</div>);

describe('ListarViagens', () => {
    beforeEach(() => {
        // Mock localStorage
        const localStorageMock = (function() {
            let store = {};
            return {
                getItem(key) {
                    return store[key] || null;
                },
                setItem(key, value) {
                    store[key] = value.toString();
                },
                clear() {
                    store = {};
                }
            };
        })();
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });

        // Mock fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([
                    {
                        id: '1',
                        status: 'Completed',
                        localPartida: 'Location A',
                        destino: 'Location B',
                        data: '2023-10-01',
                        usuarios: [{ id: '1', nome: 'User 1', tipo_usuario: 'Admin' }],
                        pagamento: [{ id: '1', metodo: 'Credit Card', valor: 100 }],
                        avaliacao: [{ id: '1', nota: 5, feedback: 'Great!' }]
                    }
                ])
            })
        );
        // Mock crypto.getRandomValues
        if (!global.self.crypto) {
        Object.defineProperty(global.self, 'crypto', {
            value: {
                getRandomValues: (arr) => arr.fill(0)
            }
        });
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders Navbar and Menu components', () => {
        render(<ListarViagens />);
        expect(screen.getByText('Navbar')).toBeInTheDocument();
        expect(screen.getByText('Menu')).toBeInTheDocument();
    });

    test('displays message when no viagens are available', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve([])
            })
        );
        window.localStorage.setItem('user', JSON.stringify({ _id: '123' }));
        render(<ListarViagens />);

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        expect(screen.getByText('Você ainda não tem viagens registradas')).toBeInTheDocument();
    });
});