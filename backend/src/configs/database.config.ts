import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/foodmine';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectToDatabase;
