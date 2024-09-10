// AccountDetails.js
import React, { useState } from 'react';
import BankAccountList from './BankAccountList';
import './AccountDetails.css'; // Import the CSS file

const UserBank = () => {
    const [userId, setUserId] = useState('');

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    };

    return (
        <div className="account-details">
            <h1>Account Details</h1>
            <div>
                <label htmlFor="userId">Enter User ID:</label>
                <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={handleUserIdChange}
                />
            </div>
            {userId && <BankAccountList userId={userId} />}
        </div>
    );
};

export default UserBank;
