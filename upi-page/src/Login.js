import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS for Login component

const Login = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', { mobileNumber, pin });
            const { userId, firstName } = response.data;

            // Store userId and firstName in localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('firstName', firstName);

            setError(null);
            // Navigate to UserBankAccounts with userId in state
            navigate('/UserBankAccounts', { state: { userId } });
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
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
            <button className="register-button" onClick={handleRegisterClick}>Register</button>
        </div>
    );
};

export default Login;
