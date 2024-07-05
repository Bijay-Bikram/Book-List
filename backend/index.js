import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, MONGO_URL } from './config.js';
import bookRoute from './routes/booksRoute.js';

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
app.use(express.json());
app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/books', bookRoute);


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ message: err.message });
})