// src/components/SetPrimaryAccount.js
import React, { useState } from 'react';
import { setPrimaryAccount } from '../ApiService';

function SetPrimaryAccount() {
  const [accountId, setAccountId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await setPrimaryAccount(accountId);
      setMessage(result.message || 'Primary account set successfully');
    } catch (error) {
      setMessage('Failed to set primary account');
    }
  };

  return (
    <div>
      <h2>Set Primary Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Account ID:</label>
          <input type="text" value={accountId} onChange={(e) => setAccountId(e.target.value)} />
        </div>
        <button type="submit">Set Primary</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SetPrimaryAccount;
