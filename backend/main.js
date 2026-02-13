import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRotes } from './login.js';
import { allPhotos } from './getListOfPhotos.js';
import { addPhoto } from './addPhoto.js';
import { deleteRouter } from './deletePhoto.js';
import { downloadPhoto } from './downloadPhoto.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.get('/', (req, res) => res.send('Server running'));

app.use('/api', authRotes);  
app.use('/api', allPhotos);  
app.use('/api', addPhoto);  
app.use('/api', deleteRouter);  
app.use('/api', downloadPhoto);  

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
