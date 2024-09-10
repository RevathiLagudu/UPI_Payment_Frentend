// src/RegistrationForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        address: '',
        pin: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Initialize the navigate function

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!/^\d{6}$/.test(formData.pin)) {
            newErrors.pin = 'PIN must be exactly 6 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('User registered successfully');
                setFormData({
                    firstName: '',
                    lastName: '',
                    mobileNumber: '',
                    email: '',
                    address: '',
                    pin: ''
                });
                // Navigate to CreateBankAccountForm page
                navigate('/create-bank-account');
            } else {
                alert('Failed to register user');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred during registration');
        }
    };

    return (
        <div className="registration-form">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                />
                <input
                    type="text"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    placeholder="PIN (6 digits)"
                    pattern="\d{6}"
                    maxLength="6"
                    required
                />
                {errors.pin && <p className="error">{errors.pin}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
