import React from 'react';
import { useLocation } from 'react-router-dom';
import './WelcomePage.css'; // Ensure this path is correct

const WelcomePage = () => {
    const location = useLocation();
    const user = location.state?.user;

    return (
        <div className="welcome-page">
            {user ? (
                <h1>Welcome, {user.firstName}!</h1>
            ) : (
                <h1>Welcome!</h1>
            )}
        </div>
    );
};

export default WelcomePage;
