import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CadastroAuth from '../../pages/Cadastro 2/Cadastro2';
import '@testing-library/jest-dom';

describe('CadastroAuth Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <Router>
                <CadastroAuth />
            </Router>
        );
        expect(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br')).toBeInTheDocument();
    });

    test('handles email input change', () => {
        render(
            <Router>
                <CadastroAuth />
            </Router>
        );
        const emailInput = screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br');
        fireEvent.change(emailInput, { target: { value: 'test@fatec.sp.gov.br' } });
        expect(emailInput.value).toBe('test@fatec.sp.gov.br');
    });

    test('handles password input change', () => {
        render(
            <Router>
                <CadastroAuth />
            </Router>
        );
        const passwordInput = screen.getByPlaceholderText('Senha');
        fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
        expect(passwordInput.value).toBe('Password123!');
    });

    test('shows error for invalid email', async () => {
        render(
            <Router>
                <CadastroAuth />
            </Router>
        );
        const emailInput = screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br');
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        const submitButton = screen.getByText('Cadastrar-se');
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
        });
    });

    test('shows error for invalid password', async () => {
        render(
            <Router>
                <CadastroAuth />
            </Router>
        );
        const passwordInput = screen.getByPlaceholderText('Senha');
        fireEvent.change(passwordInput, { target: { value: 'short' } });
        const submitButton = screen.getByText('Cadastrar-se');
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText('Senha deve ter no mínimo 8 caracteres, pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial')).toBeInTheDocument();
        });
    });

    test('shows error for non-matching passwords', async () => {
        render(
            <Router>
                <CadastroAuth />
            </Router>
        );
        const passwordInput = screen.getByPlaceholderText('Senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme a Senha');
        fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });
        const submitButton = screen.getByText('Cadastrar-se');
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText('As senhas não coincidem')).toBeInTheDocument();
        });
    });

    test('submits form with valid data', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true }),
            })
        );

        render(
            <Router>
                <CadastroAuth />
            </Router>
        );

        const emailInput = screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br');
        const passwordInput = screen.getByPlaceholderText('Senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme a Senha');

        fireEvent.change(emailInput, { target: { value: 'test@fatec.sp.gov.br' } });
        fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });

        const submitButton = screen.getByText('Cadastrar-se');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}/auth/cadastro`,
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: 'test@fatec.sp.gov.br',
                        senha: 'Password123!',
                    }),
                })
            );
        });
    });
});