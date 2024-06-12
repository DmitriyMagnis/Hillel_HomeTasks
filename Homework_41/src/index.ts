import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
// import morgan from 'morgan';
import { todoRouter } from './controllers/controller';
import { loggerMiddleware, MyLogger } from './logger';

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const main = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USENAME}:${process.env.MONGO_PWR}@todocluster.zouc62x.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME}`
    );
    MyLogger.info('Connection to db successfull!');
  } catch (err: any) {
    console.dir(err);
    console.log(err?.errmsg);
  }
};

app.use(express.static('assets'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(loggerMiddleware);
app.use(todoRouter);

app.listen(PORT, () => {
  main();
  console.log(`Server is runing at port ${PORT}`);
});

// console.log('xaxa');
