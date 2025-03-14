const mongoose =  require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, ).then(() => {
            console.log('MongoDB connected');
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = connectDB;
