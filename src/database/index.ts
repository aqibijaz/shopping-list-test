import mongoose from 'mongoose';
import { CONSTANTS } from '../config';

async function databaseConnection() {
    try {
        await mongoose.connect(CONSTANTS.MONGODB_URL);
        console.log('Connected to MongoDB');
        return mongoose.connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export { databaseConnection };