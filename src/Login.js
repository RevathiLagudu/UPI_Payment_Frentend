import React, { useState } from 'react';
import axios from 'axios';
import CreateBankAccountForm from './CreateBankAccountForm';
import RegistrationForm from './RegistrationForm';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', { mobileNumber, pin });
            const { userId, firstName } = response.data;

            localStorage.setItem('userId', userId);
            localStorage.setItem('firstName', firstName);

            setError(null);
            setIsLoggedIn(true);
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            {isLoggedIn ? (
                <CreateBankAccountForm />
            ) : (
                <div>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div>
                            <label htmlFor="mobileNumber">Mobile Number:</label>
                            <input
                                type="text"
                                id="mobileNumber"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="pin">PIN:</label>
                            <input
                                type="password"
                                id="pin"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    {error && <p className="error">{error}</p>}
                    <button className="register-button" onClick={() => setShowRegistrationForm(true)}>Register</button>
                </div>
            )}
            {showRegistrationForm && (
                <RegistrationForm onClose={() => setShowRegistrationForm(false)} />
            )}
        </div>
    );
};

export default Login;
