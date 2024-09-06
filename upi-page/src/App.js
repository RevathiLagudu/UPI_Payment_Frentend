import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import WelcomePage from './WelcomPage';


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
