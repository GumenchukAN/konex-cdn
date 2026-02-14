import express from 'express';
import { getToken } from './getToken.js';
import axios from 'axios';
import { cdn_URL } from './main.js';

export const downloadPhoto = express.Router();

downloadPhoto.get('/download', async (req, res) => {
   try {
    const { path } = req.query
    const token = await getToken()

    const response = await axios.get(
      `${cdn_URL}${path}`,
      {
        responseType: 'stream',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${path.split('/').pop()}"`
    )

    response.data.pipe(res)
  } catch (error) {
    res.status(500).json({ error: 'Download error' })
  }
})
