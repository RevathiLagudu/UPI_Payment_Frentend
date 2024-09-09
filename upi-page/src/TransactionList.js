// TransactionList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionList.css'; // Import the CSS file

const TransactionList = ({ accountId }) => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/transactions/${accountId}`);
                if (response.data.transactions.length === 0) {
                    setError('No transactions found.');
                } else {
                    setTransactions(response.data.transactions);
                }
            } catch (err) {
                setError('Failed to fetch transactions. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (accountId) {
            fetchTransactions();
        }
    }, [accountId]);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="transaction-list">
            <h2>Transaction List</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        <p><strong>Transaction ID:</strong> {transaction.id}</p>
                        <p><strong>Amount:</strong> {transaction.amount}</p>
                        <p><strong>Date:</strong> {transaction.date}</p>
                        <p><strong>Recipient:</strong> {transaction.recipient}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
