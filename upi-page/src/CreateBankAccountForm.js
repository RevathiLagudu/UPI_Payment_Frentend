import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateBankAccountForm.css';
import UserBank from './UserBank'; // Import the UserBank component

const CreateBankAccountForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    bankName: '',
    accountNumber: '',
    transactionLimit: '',
    amount: '100000.0',
    upiPin: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [accountIdToDelete, setAccountIdToDelete] = useState('');
  const [accountIdToUpdate, setAccountIdToUpdate] = useState('');
  const [newTransactionLimit, setNewTransactionLimit] = useState('');
  const [newUpiPin, setNewUpiPin] = useState('');

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showUserBank, setShowUserBank] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!/^\d{4}$/.test(formData.upiPin)) {
      setError('UPI Pin must be exactly 4 digits.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/banks/link', formData);
      setSuccess('Bank account created successfully!');
      setError('');
    } catch (err) {
      setError('Failed to create bank account.');
      setSuccess('');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/banks/${accountIdToDelete}`);
      if (response.data.status === 'success') {
        setSuccess('Bank account deleted successfully!');
      } else {
        setError('Bank account not found.');
      }
      setError('');
    } catch (err) {
      setError('Failed to delete bank account.');
      setSuccess('');
    }
  };

  const handleUpdateTransactionLimit = async () => {
    try {
      const response = await axios.patch(`http://localhost:8080/banks/${accountIdToUpdate}/transactionLimit`, {
        transactionLimit: parseFloat(newTransactionLimit),
      });
      if (response.data.status === 'success') {
        setSuccess('Transaction limit updated successfully!');
      } else {
        setError('Bank account not found.');
      }
      setError('');
    } catch (err) {
      setError('Failed to update transaction limit.');
      setSuccess('');
    }
  };

  const handleUpdateUpiPin = async () => {
    try {
      const response = await axios.patch(`http://localhost:8080/banks/${accountIdToUpdate}/upiPin`, {
        upiPin: newUpiPin,
      });
      if (response.data.status === 'success') {
        setSuccess('UPI PIN updated successfully!');
      } else {
        setError('Bank account not found.');
      }
      setError('');
    } catch (err) {
      setError('Failed to update UPI PIN.');
      setSuccess('');
    }
  };

  const openSendMoneyPage = () => navigate('/sendMoney');

  return (
    <div className="create-bank-account-form">
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Hide Create Form' : 'Show Create Form'}
      </button>
      {showCreateForm && (
        <div className="form-section">
          <h2>Create Bank Account</h2>
          <form onSubmit={handleCreate}>
            <div>
              <label>User ID:</label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Bank Name:</label>
              <select
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
              >
                <option value="">Select a bank</option>
                <option value="SBI">SBI</option>
                <option value="ICIC">ICIC</option>
                <option value="APGVB">APGVB</option>
                {/* Add more bank options as needed */}
              </select>
            </div>
            <div>
              <label>Account Number:</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Transaction Limit:</label>
              <input
                type="number"
                name="transactionLimit"
                step="0.01"
                value={formData.transactionLimit}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Amount:</label>
              <input
                type="number"
                name="amount"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>UPI Pin:</label>
              <input
                type="text"
                name="upiPin"
                value={formData.upiPin}
                onChange={handleChange}
                maxLength="4"  // Restrict input length to 4 characters
              />
            </div>
            <button type="submit">Create Account</button>
          </form>
        </div>
      )}

      <button onClick={() => setShowDeleteForm(!showDeleteForm)}>
        {showDeleteForm ? 'Hide Delete Form' : 'Show Delete Form'}
      </button>
      {showDeleteForm && (
        <div className="form-section">
          <h2>Delete Bank Account</h2>
          <input
            type="text"
            value={accountIdToDelete}
            onChange={(e) => setAccountIdToDelete(e.target.value)}
            placeholder="Enter bank account ID to delete"
          />
          <button onClick={handleDelete}>Delete Account</button>
        </div>
      )}

      <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
        {showUpdateForm ? 'Hide Update Form' : 'Show Update Form'}
      </button>
      {showUpdateForm && (
        <div className="form-section">
          <h2>Update Bank Account</h2>
          <div>
            <label>Bank Account ID:</label>
            <input
              type="text"
              value={accountIdToUpdate}
              onChange={(e) => setAccountIdToUpdate(e.target.value)}
              placeholder="Enter bank account ID"
            />
          </div>
          <div>
            <label>New Transaction Limit:</label>
            <input
              type="number"
              value={newTransactionLimit}
              onChange={(e) => setNewTransactionLimit(e.target.value)}
              step="0.01"
              placeholder="Enter new transaction limit"
            />
            <button onClick={handleUpdateTransactionLimit}>Update Transaction Limit</button>
          </div>
          <div>
            <label>New UPI PIN:</label>
            <input
              type="text"
              value={newUpiPin}
              onChange={(e) => setNewUpiPin(e.target.value)}
              maxLength="4"
              placeholder="Enter new UPI PIN"
            />
            <button onClick={handleUpdateUpiPin}>Update UPI PIN</button>
          </div>
        </div>
      )}

      <button onClick={() => setShowUserBank(!showUserBank)}>
        {showUserBank ? 'Hide User Bank Details' : 'Show User Bank Details'}
      </button>
      {showUserBank && <UserBank />}

      <button onClick={openSendMoneyPage} className="payment-button">Send Money</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default CreateBankAccountForm;
