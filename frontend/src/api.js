import axios from "axios";

const API_BASE_URL = "http://localhost:7070";  // Falcon API

export const getLoans = async () => {
  const response = await axios.get(`${API_BASE_URL}/loans`);
  return response.data.loans;
};

export const getLoanDetails = async (loanId) => {
  const response = await axios.get(`${API_BASE_URL}/loan/${loanId}`);
  return response.data.messages;
};

export const retryMessage = async (loanId, messageId) => {
  return axios.post(`${API_BASE_URL}/retry_message/${loanId}/${messageId}`);
};
