import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Cadastro from '../../pages/Cadastro/Cadastro';
import '@testing-library/jest-dom';

describe('Cadastro Component', () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    test('renders Cadastro component', () => {
        render(
            <Router>
                <Cadastro />
            </Router>
        );
        expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('E-mail Institucional')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('RA')).toBeInTheDocument();
        expect(screen.getByText('Selecione o curso')).toBeInTheDocument();
    });

    test('handles input changes', () => {
        render(
            <Router>
                <Cadastro />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('E-mail Institucional'), { target: { value: 'john@fatec.sp.gov.br' } });
        fireEvent.change(screen.getByPlaceholderText('RA'), { target: { value: '123456' } });
        fireEvent.change(screen.getByText('Selecione o curso'), { target: { value: 'DSM' } });

        expect(screen.getByPlaceholderText('Nome').value).toBe('John Doe');
        expect(screen.getByPlaceholderText('E-mail Institucional').value).toBe('john@fatec.sp.gov.br');
        expect(screen.getByPlaceholderText('RA').value).toBe('123456');
        expect(screen.getByText('Selecione o curso').value).toBe('DSM');
    });

    test('validates form inputs', () => {
        render(
            <Router>
                <Cadastro />
            </Router>
        );

        fireEvent.click(screen.getByText('Continuar'));

        expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
        expect(screen.getByText('E-mail é obrigatório')).toBeInTheDocument();
        expect(screen.getByText('RA é obrigatório')).toBeInTheDocument();
        expect(screen.getByText('Curso é obrigatório')).toBeInTheDocument();
    });

    test('handles motorista switch', () => {
        render(
            <Router>
                <Cadastro />
            </Router>
        );

        fireEvent.click(screen.getByText('Motorista'));

        expect(screen.getByPlaceholderText('Modelo do Veículo')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Placa do Veículo')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Cor do Veículo')).toBeInTheDocument();
    });
});