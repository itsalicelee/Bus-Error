import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';
import path from 'path';

require('dotenv').config();

mongoose.set('strictQuery', false);

const app = express();
app.use(cors({
    optionSuccessStatus: 200
}));
app.use(express.json());
app.use('/', routes);

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}

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
    app.listen(port, () => {
        console.log(`Server is up on port ${port}.`);
    });
});
