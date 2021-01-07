import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config';
import router from './routes/routes';
import swaggerDocument from '../swagger.json';

const { log } = console;

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  connectDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => log('Database connected')
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', router);

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to Getir Tech Challenge',
}));

app.all('*', (req, res) => res.status(404).json({
  error: 'Path not found.',
}));

app.listen(PORT, () => {
  log(`Server listening on port ${PORT}`);
});

export default app;
