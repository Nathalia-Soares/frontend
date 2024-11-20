import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './../../pages/Login/login';

describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders login form', () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        expect(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('validates email and password fields', async () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('E-mail é obrigatório')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br'), { target: { value: 'invalidemail' } });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br'), { target: { value: 'user@domain.com' } });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('E-mail deve ser @fatec.sp.gov.br')).toBeInTheDocument();
        });
    });

    test('submits form with valid data', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ token: 'fake-token', userInfo: { name: 'User' } }),
            })
        );

        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br'), { target: { value: 'user@fatec.sp.gov.br' } });
        fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: 'user@fatec.sp.gov.br', senha: 'password' }),
                })
            );
        });
    });

    test('handles login error', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
            })
        );

        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br'), { target: { value: 'user@fatec.sp.gov.br' } });
        fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('Erro ao fazer login. Verifique suas credenciais.')).toBeInTheDocument();
        });
    });

    describe('Login Component', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('renders login form', () => {
            render(
                <Router>
                    <Login />
                </Router>
            );

            expect(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
            expect(screen.getByText('Login')).toBeInTheDocument();
        });

        test('validates email and password fields', async () => {
            render(
                <Router>
                    <Login />
                </Router>
            );

            fireEvent.click(screen.getByText('Login'));

            await waitFor(() => {
                expect(screen.getByText('E-mail é obrigatório')).toBeInTheDocument();
            });

            await waitFor(() => {
                expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
            });

            fireEvent.change(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br'), { target: { value: 'invalidemail' } });
            fireEvent.click(screen.getByText('Login'));

            await waitFor(() => {
                expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
            });

            fireEvent.change(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br'), { target: { value: 'user@domain.com' } });
            fireEvent.click(screen.getByText('Login'));

            await waitFor(() => {
                expect(screen.getByText('E-mail deve ser @fatec.sp.gov.br')).toBeInTheDocument();
            });
        });

        test('submits form with valid data', async () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve({ token: 'fake-token', userInfo: { name: 'User' } }),
                })
            );

            render(
                <Router>
                    <Login />
                </Router>
            );

            fireEvent.change(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br'), { target: { value: 'user@fatec.sp.gov.br' } });
            fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });

            fireEvent.click(screen.getByText('Login'));

            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(
                    `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
                    expect.objectContaining({
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: 'user@fatec.sp.gov.br', senha: 'password' }),
                    })
                );
            });
        });

        test('handles login error', async () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve({}),
                })
            );

            render(
                <Router>
                    <Login />
                </Router>
            );

            fireEvent.change(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br'), { target: { value: 'user@fatec.sp.gov.br' } });
            fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });

            fireEvent.click(screen.getByText('Login'));

            await waitFor(() => {
                expect(screen.getByText('Erro ao fazer login. Verifique suas credenciais.')).toBeInTheDocument();
            });
        });
    });
});