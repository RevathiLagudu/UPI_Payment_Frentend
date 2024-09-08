// src/apiService.js

const API_BASE_URL = 'http://localhost:8080'; // Replace with your backend URL

// Fetch transactions for a given account ID
export async function getTransactionsByAccountId(accountId) {
    const response = await fetch(`${API_BASE_URL}/${accountId}`, {
        method: 'GET',
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch transactions');
    }
    
    return response.json();
}
