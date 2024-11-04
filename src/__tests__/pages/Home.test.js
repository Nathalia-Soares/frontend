import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../pages/Home/Home';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Home Component', () => {
    test('renders the Home component', () => {
        render(
            <Router>
                <Home />
            </Router>
        );
        const greetingElement = screen.getByText(/Bom dia, Pedro/i);
        expect(greetingElement).toBeInTheDocument();
    });

    test('renders the logo image', () => {
        render(
            <Router>
                <Home />
            </Router>
        );
        const logoElement = screen.getByAltText(/Logo Rachaí/i);
        expect(logoElement).toBeInTheDocument();
    });

    test('renders the scheduled rides section', () => {
        render(
            <Router>
                <Home />
            </Router>
        );
        const scheduledRidesElement = screen.getByText(/Suas Caronas Agendadas/i);
        expect(scheduledRidesElement).toBeInTheDocument();
    });

    test('renders the ride card with driver details', () => {
        render(
            <Router>
                <Home />
            </Router>
        );
        const driverNameElements = screen.getAllByText(/Ana, 30/i);
        expect(driverNameElements.length).toBeGreaterThan(0);
    });

    test('renders the ride location', () => {
        render(
            <Router>
                <Home />
            </Router>
        );
        const rideLocationElement = screen.getByText(/Atacadão Cotia/i);
        expect(rideLocationElement).toBeInTheDocument();
    });

    test('renders the Navbar component', () => {
        render(
            <Router>
                <Home />
            </Router>
        );
        const navbarElement = screen.getByRole('navigation');
        expect(navbarElement).toBeInTheDocument();
    });
});