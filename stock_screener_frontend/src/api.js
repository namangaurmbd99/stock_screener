import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });
      console.log('Response from login API:', response.data);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Login failed';
    }
  };
  

export const signupUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || 'Signup failed';
  }
};
