import logger from '@utils/serverLogs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const PORT = process.env['PORT'] || 5000;
const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.listen(PORT, () => {
  logger.log(`Server is running on http://localhost:${PORT}`);
});
