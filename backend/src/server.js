import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

require('dotenv').config();
const app = express();

mongoose.set('strictQuery', false);

// init middleware
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

const port = process.env.PORT || 4000;

if (!process.env.MONGO_URL) {
    console.error('Missing MONGO_URL!');
    process.exit(1);
} else {
    mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
}
const db = mongoose.connection;
db.on('error', (error) => {
    throw new Error('Mongoose connection error ' + error);
});
db.once('open', () => {
    routes(app);
    app.listen(port, () => {
        console.log(`Server is up on port ${port}.`);
    });
});
