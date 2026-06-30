import mongoose from 'mongoose';

const connectDB = async (): Promise<mongoose.Connection> => {
  try {
    const mongoURI = process.env.MONGODB_URI as string;
    console.log(mongoURI)
    
    const db=await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB connected successfully');
    if (!mongoose.connection.db) {
      throw new Error('Database connection is not established');
   
    }
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    return db.connection;
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;