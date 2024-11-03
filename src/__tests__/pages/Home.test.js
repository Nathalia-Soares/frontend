import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../../pages/Home/Home';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../../pages/Home/Home';


describe('Home Component', () => {
    test('renders the Home component', () => {
        render(<Home />);
        const greetingElement = screen.getByText(/Bom dia, Pedro/i);
        expect(greetingElement).toBeInTheDocument();
    });

    test('renders the logo image', () => {
        render(<Home />);
        const logoElement = screen.getByAltText(/Logo Rachaí/i);
        expect(logoElement).toBeInTheDocument();
    });

    test('renders the scheduled rides section', () => {
        render(<Home />);
        const scheduledRidesElement = screen.getByText(/Suas Caronas Agendadas/i);
        expect(scheduledRidesElement).toBeInTheDocument();
    });

    test('renders the ride card with driver details', () => {
        render(<Home />);
        const driverNameElement = screen.getByText(/Ana, 30/i);
        expect(driverNameElement).toBeInTheDocument();
        const rideTimeElement = screen.getByText(/Amanhã às 18:40/i);
        expect(rideTimeElement).toBeInTheDocument();
        const rideLocationElement = screen.getByText(/Atacadão Cotia/i);
        expect(rideLocationElement).toBeInTheDocument();
    });

    test('renders the schedule a ride section', () => {
        render(<Home />);
        const scheduleRideElement = screen.getByText(/Agende uma Carona/i);
        expect(scheduleRideElement).toBeInTheDocument();
    });

    test('renders the list of drivers', () => {
        render(<Home />);
        const driverElements = screen.getAllByText(/Curso:/i);
        expect(driverElements.length).toBe(5);
    });

    describe('Home Component', () => {
        test('renders the Home component', () => {
            render(<Home />);
            const greetingElement = screen.getByText(/Bom dia, Pedro/i);
            expect(greetingElement).toBeInTheDocument();
        });
    
        test('renders the logo image', () => {
            render(<Home />);
            const logoElement = screen.getByAltText(/Logo Rachaí/i);
            expect(logoElement).toBeInTheDocument();
        });
    
        test('renders the scheduled rides section', () => {
            render(<Home />);
            const scheduledRidesElement = screen.getByText(/Suas Caronas Agendadas/i);
            expect(scheduledRidesElement).toBeInTheDocument();
        });
    
        test('renders the ride card with driver details', () => {
            render(<Home />);
            const driverNameElement = screen.getByText(/Ana, 30/i);
            expect(driverNameElement).toBeInTheDocument();
            const rideTimeElement = screen.getByText(/Amanhã às 18:40/i);
            expect(rideTimeElement).toBeInTheDocument();
            const rideLocationElement = screen.getByText(/Atacadão Cotia/i);
            expect(rideLocationElement).toBeInTheDocument();
        });
    
        test('renders the schedule a ride section', () => {
            render(<Home />);
            const scheduleRideElement = screen.getByText(/Agende uma Carona/i);
            expect(scheduleRideElement).toBeInTheDocument();
        });
    
        test('renders the list of drivers', () => {
            render(<Home />);
            const driverElements = screen.getAllByText(/Curso:/i);
            expect(driverElements.length).toBe(5);
        });
    
        test('applies the correct variant class to the container', () => {
            render(<Home />);
            const containerElement = screen.getByRole('main');
            expect(containerElement).toHaveClass('container');
            expect(containerElement.className).toMatch(/variant-(A|B)/);
        });
    
        test('applies the correct variant class to the logo', () => {
            render(<Home />);
            const logoElement = screen.getByAltText(/Logo Rachaí/i);
            expect(logoElement.className).toMatch(/variant-(A|B)/);
        });
    
        test('applies the correct variant class to the greeting', () => {
            render(<Home />);
            const greetingElement = screen.getByText(/Bom dia, Pedro/i);
            expect(greetingElement.className).toMatch(/variant-(A|B)/);
        });
    
        test('applies the correct variant class to the scheduled rides section', () => {
            render(<Home />);
            const scheduledRidesElement = screen.getByText(/Suas Caronas Agendadas/i);
            expect(scheduledRidesElement.className).toMatch(/variant-(A|B)/);
        });
    
        test('applies the correct variant class to the ride card', () => {
            render(<Home />);
            const rideCardElement = screen.getByText(/Ana, 30/i).closest('.ride-card');
            expect(rideCardElement.className).toMatch(/variant-(A|B)/);
        });
    
        test('applies the correct variant class to the schedule a ride section', () => {
            render(<Home />);
            const scheduleRideElement = screen.getByText(/Agende uma Carona/i);
            expect(scheduleRideElement.className).toMatch(/variant-(A|B)/);
        });
    
        test('applies the correct variant class to the list of drivers', () => {
            render(<Home />);
            const driverElements = screen.getAllByText(/Curso:/i);
            driverElements.forEach(driverElement => {
                expect(driverElement.closest('.motorista-item').className).toMatch(/variant-(A|B)/);
            });
        });
    });
});