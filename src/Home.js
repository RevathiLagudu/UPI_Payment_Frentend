import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Home = () => {
    const { userId, firstName, bankAccounts, logout, loading } = useContext(UserContext);
    const navigate = useNavigate();

    const handleCreateAccountClick = () => {
        navigate('/create-bank-account');
    };

    const handleTransferMoneyClick = () => {
        navigate('/transfer-money');
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home">
            <h1>Welcome, {firstName}</h1>
            <button onClick={handleLogoutClick}>Login</button>
            {userId ? (
                <div>
                    <h2>Your Bank Accounts</h2>
                    {bankAccounts.length > 0 ? (
                        <ul>
                            {bankAccounts.map((account) => (
                                <li key={account.id}>{account.accountNumber} - {account.balance}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No bank accounts found.</p>
                    )}
                    <button onClick={handleCreateAccountClick}>Create Bank Account</button>
                    <button onClick={handleTransferMoneyClick}>Transfer Money</button>
                </div>
            ) : (
                <div>
                    <p>Please log in to see your bank accounts.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
