import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './db.js';
import user from './routes/user.js';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


// ----------------------- Connection to Database ------------------------

dbConnect();


// ---------------------------------------------- All Routes -------------------------------------------

app.get('/', (req, res) => {
    return res.send('Hello!');
});

app.use('/api', user);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});