import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { getToken } from './getToken.js';
import { cdn_URL } from './main.js';

const router = express.Router();

router.get('/photos', async (req, res) => {
  try {
    const token = await getToken(); 
    if (!token) return res.status(401).json({ error: 'No token' });

    const response = await axios.get(`${cdn_URL}list/`, {
      params: { token }
    });

    const data = response.data;

    function getAllUrls(folder) {
      let urls = [];
      if (!folder.list || !Array.isArray(folder.list)) return urls;

      folder.list.forEach(item => {
        if (item.type === 'file' && item.url) {
          urls.push(item.url);
        } else if (item.type === 'folder' && item.list.length) {
          urls = urls.concat(getAllUrls(item));
        }
      });

      return urls;
    }

    const allUrls = getAllUrls(data.list);

    res.json(allUrls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка отримання файлів' });
  }
});

export {router as allPhotos}
