// src/apiService.js
const API_BASE_URL = 'http://localhost:8080/banks'; // Replace with your backend URL

export async function sendMoney(accountId, upiPin, amount, receiverMobile) {
  const response = await fetch(`${API_BASE_URL}/sendMoney/${accountId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      upiPin,
      amount,
      receiverMobile,
    }),
  });
  return response.json();
} 

export async function setPrimaryAccount(accountId) {
  const response = await fetch(`${API_BASE_URL}/setPrimary/${accountId}`, {
    method: 'PUT',
  });
  return response.json();
}
