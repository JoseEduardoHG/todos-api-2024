import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { log } from './utils/serverLogs';

const PORT = process.env['PORT'] || 5000;
const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.listen(PORT, () => {
  log(`Server is running on http://localhost:${PORT}`);
});
