import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';

describe('Navbar component', () => {
    test('renders without crashing', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );
    });
});