import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function getToken() {
  try {
    const loginResponse = await axios.post(
      'https://auth.konex.com.ua/login/',
      {
        login: process.env.CDN_LOGIN,
        password: process.env.CDN_PASSWORD,
        user_type: process.env.CDN_USER_COMPANY,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );


    const token = loginResponse.data.token || loginResponse.data.jwt || loginResponse.data.access_token;
    if (!token) {
      console.error('Токен не знайдено у відповіді сервера!');
      return;
    }
    return token;

  } catch (err) {
    console.error('Помилка:', err.response?.data || err.message);
  }
}

