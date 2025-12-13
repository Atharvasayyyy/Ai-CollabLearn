import express from 'express';
import morgon from 'morgan';
import cookieparser from 'cookie-parser';
import corse from 'cors';

import connectDB from './Autentication/db/db.js';
import userRouter from './Autentication/routes/user.router.js';


const app = express();
app.use(morgon('dev'));
app.use(express.json());
app.use(cookieparser());
connectDB();
app.use(corse());

app.use('/api/users', userRouter);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


export default app;
