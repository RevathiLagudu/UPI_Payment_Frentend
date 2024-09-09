// BankAccountList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BankAccountList.css'; // Import the CSS file

const BankAccountList = ({ userId }) => {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBankAccounts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/banks/accounts/${userId}`);
                if (response.data.length === 0) {
                    setError('No bank accounts found.');
                } else {
                    setBankAccounts(response.data);
                }
            } catch (err) {
                setError('Failed to fetch bank accounts. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchBankAccounts();
        }
    }, [userId]);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="bank-account-list">
            <h2>Bank Account List</h2>
            <ul>
                {bankAccounts.map((account) => (
                    <li key={account.accountNumber}>
                        <p><strong>Bank Name:</strong> {account.bankName}</p>
                        <p><strong>Account Number:</strong> {account.accountNumber}</p>
                        <p><strong>Transaction Limit:</strong> {account.transactionLimit}</p>
                        <p><strong>Amount:</strong> {account.amount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BankAccountList;
