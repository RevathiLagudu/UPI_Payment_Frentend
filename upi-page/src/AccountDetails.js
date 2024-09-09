// AccountDetails.js
import React, { useState } from 'react';
import TransactionList from './TransactionList';
import './AccountDetails.css'; // Import the CSS file

const AccountDetails = () => {
    const [accountId, setAccountId] = useState('');

    const handleAccountIdChange = (event) => {
        setAccountId(event.target.value);
    };

    return (
        <div className="account-details">
            <h1>Account Details</h1>
            <div>
                <label htmlFor="accountId">Enter Account ID:</label>
                <input
                    type="text"
                    id="accountId"
                    value={accountId}
                    onChange={handleAccountIdChange}
                />
            </div>
            {accountId && <TransactionList accountId={accountId} />}
        </div>
    );
};

export default AccountDetails;
