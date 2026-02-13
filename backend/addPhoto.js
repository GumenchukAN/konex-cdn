import express from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import sharp from 'sharp';
import { getToken } from './getToken.js';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!allowed.includes(file.mimetype)) {
      cb(new Error('Only .jpg, .jpeg, .png formats are allowed'));
    } else {
      cb(null, true);
    }
  }
});

export const addPhoto = express.Router();

addPhoto.post('/add-photo', upload.array('files'), async (req, res) => {
  try {
    const token = await getToken();
    if (!token) return res.status(401).json({ message: 'No token' });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const results = [];

    for (const file of req.files) {

      let quality = 90;

      let processedImage = await sharp(file.buffer)
        .resize(512, 512, {
          fit: 'cover',    
          position: 'centre'  
        })
        .jpeg({ quality })
        .toBuffer();

      if (processedImage.length > 0.5 * 1024 * 1024) {
        processedImage = await sharp(file.buffer)
          .resize(512, 512, {
            fit: 'cover',
            position: 'centre'
          })
          .jpeg({ quality: 70 })
          .toBuffer();
      }

      // 🔹 Відправка на CDN
      const form = new FormData();
      form.append('input', 'file');
      form.append('path', 'project');
      form.append('file', processedImage, {
        filename: file.originalname.replace(/\.(png|jpeg|jpg)$/i, '.jpg'),
        contentType: 'image/jpeg'
      });

      const response = await axios.post(
        'https://cdn.konex.com.ua/upload/',
        form,
        {
          headers: form.getHeaders(),
          params: { token }
        }
      );

      results.push(response.data);
    }

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
