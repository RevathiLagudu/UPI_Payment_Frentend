import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SendMoney.css'; // Import your CSS file

const SendMoney = () => {
    const [accountId, setAccountId] = useState('');
    const [amount, setAmount] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSendMoney = async () => {
        // Prompt for UPI PIN
        const upiPin = prompt('Please enter your UPI PIN:');
        if (!upiPin) {
            setError('UPI PIN is required.');
            return;
        }

        // Validate inputs
        if (!accountId || !amount || !mobileNumber) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/banks/sendMoney/${accountId}`, {
                amount,
                receiverMobile: mobileNumber,
                upiPin
            });

            // Handle success
            setSuccess('Money sent successfully!');
            setError('');
        } catch (err) {
            setError('Failed to send money. Please check your inputs and try again.');
            setSuccess('');
        }
    };

    return (
        <div className="send-money">
            <h2>Send Money</h2>
            <div className="form-group">
                <label>Account ID:</label>
                <input
                    type="text"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step="0.01"
                />
            </div>
            <div className="form-group">
                <label>Receiver Mobile Number:</label>
                <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
            </div>
            <button onClick={handleSendMoney}>Send Money</button>
            <button onClick={() => navigate('/accountDetails')}>Account Details</button>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default SendMoney;
