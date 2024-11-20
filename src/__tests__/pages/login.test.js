import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/Login/login';
import '@testing-library/jest-dom';

// Polyfill for crypto.getRandomValues
if (!global.crypto) {
    global.crypto = {
        getRandomValues: (arr) => require('crypto').randomBytes(arr.length)
    };
}

describe('Login Component', () => {
    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
    };

    test('renders login form', () => {
        renderComponent();
        expect(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('validates email and password fields', async () => {
        renderComponent();
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('E-mail é obrigatório')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br'), { target: { value: 'invalid-email' } });
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
        renderComponent();
        fireEvent.change(screen.getByPlaceholderText('E-mail: usuario@fatec.sp.gov.br'), { target: { value: 'user@fatec.sp.gov.br' } });
        fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password123' } });

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.queryByText('E-mail é obrigatório')).not.toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.queryByText('Senha é obrigatória')).not.toBeInTheDocument();
        });
    });
});