import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CadastroAuth from '../../pages/Cadastro 2/Cadastro2';
import '@testing-library/jest-dom';

describe('CadastroAuth Component', () => {
    beforeEach(() => {
        if (!window.crypto) {
            window.crypto = { getRandomValues: jest.fn() };
        }
        jest.spyOn(window.crypto, 'getRandomValues').mockReturnValue(new Uint32Array([0]));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <Router>
                <CadastroAuth />
            </Router>
        );
        expect(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br')).toBeInTheDocument();
    });

    test('handles input changes', () => {
        render(
            <Router>
                <CadastroAuth />
            </Router>
        );

        const emailInput = screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br');
        const passwordInput = screen.getByPlaceholderText('Senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme a Senha');

        fireEvent.change(emailInput, { target: { name: 'email', value: 'test@fatec.sp.gov.br' } });
        fireEvent.change(passwordInput, { target: { name: 'senha', value: 'Password123!' } });
        fireEvent.change(confirmPasswordInput, { target: { name: 'confirmSenha', value: 'Password123!' } });

        expect(emailInput.value).toBe('test@fatec.sp.gov.br');
        expect(passwordInput.value).toBe('Password123!');
        expect(confirmPasswordInput.value).toBe('Password123!');
    });

    test('validates form inputs', async () => {
        render(
            <Router>
                <CadastroAuth />
            </Router>
        );

        const submitButton = screen.getByText('Cadastrar-se');
        fireEvent.click(submitButton);

        expect(await screen.findByText('E-mail é obrigatório')).toBeInTheDocument();
        expect(await screen.findByText('Senha é obrigatória')).toBeInTheDocument();
        expect(await screen.findByText('Confirmação de senha é obrigatória')).toBeInTheDocument();
    });

    test('shows password mismatch error', () => {
        render(
            <Router>
                <CadastroAuth />
            </Router>
        );

        const passwordInput = screen.getByPlaceholderText('Senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme a Senha');

        fireEvent.change(passwordInput, { target: { name: 'senha', value: 'Password123!' } });
        fireEvent.change(confirmPasswordInput, { target: { name: 'confirmSenha', value: 'Password1234!' } });

        fireEvent.blur(confirmPasswordInput);

        expect(screen.getByText('As senhas não coincidem')).toBeInTheDocument();
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
        const submitButton = screen.getByText('Cadastrar-se');

        fireEvent.change(emailInput, { target: { name: 'email', value: 'test@fatec.sp.gov.br' } });
        fireEvent.change(passwordInput, { target: { name: 'senha', value: 'Password123!' } });
        fireEvent.change(confirmPasswordInput, { target: { name: 'confirmSenha', value: 'Password123!' } });

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