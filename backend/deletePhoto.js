import axios from 'axios';
import express from 'express';
import { getToken } from './getToken.js';


export const deleteRouter = express.Router();

deleteRouter.post('/delete', async (req, res) => {
  try {
    const { filename } = req.body;
    const token = await getToken();

    await axios.post(
      'https://cdn.konex.com.ua/delete/',
      null,
      {
        params: { token, path: 'project', filename }
      }
    );

    res.json({message: 'File deleted'})
  } catch (error){
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Помилка видалення' });
  }
})

