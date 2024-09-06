import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/users/WelcomePage';
import RegistrationForm from './RegistrationForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegistrationForm />} />
                <Route path="/welcome" element={<WelcomePage />} />
            </Routes>
        </Router>
    );
};

export default App;
