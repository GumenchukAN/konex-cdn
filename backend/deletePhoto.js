import axios from 'axios';
import express from 'express';
import { getToken } from './getToken.js';
import { cdn_URL } from './main.js';


export const deleteRouter = express.Router();

deleteRouter.post('/delete', async (req, res) => {
  try {
    const { filename } = req.body;
    const token = await getToken();

    await axios.post(
      `${cdn_URL}delete/`,
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

