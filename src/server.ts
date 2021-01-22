import express from 'express';
import Routes from './routes';
import './database';

const app = express();
app.use(express.json());

app.use(Routes);

app.listen(3333, () => console.log('server is in the air'));
