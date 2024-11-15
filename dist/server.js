import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import thoughtRoutes from './routes/thoughts.js';
import reactionRoutes from './routes/reactions.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social_network_db';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/thoughts', [thoughtRoutes, reactionRoutes]);
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
    app.use((_req, res) => {
        res.status(404).send({ error: 'Endpoint not found' });
    });
    // Start the server
    app.listen(PORT, () => {
        console.log('Express server started on', PORT);
    });
});
