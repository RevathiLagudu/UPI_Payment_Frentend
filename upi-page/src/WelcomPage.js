import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; // Ensure this path is correct
import RegistrationForm from './RegistrationForm'; // Ensure this path is correct
import WelcomePage from './WelcomePage'; // Ensure this path is correct

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/welcome" element={<WelcomePage />} />
            </Routes>
        </Router>
    );
};

export default App;