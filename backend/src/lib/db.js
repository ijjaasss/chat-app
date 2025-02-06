import mongoose from 'mongoose'

export const connectDb=async()=>{
  try {
   const conn= await mongoose.connect(process.env.MONGO_URL);
   console.log(`mongodb connect :${conn.connection.host}`)
  } catch (error) {
    console.log('mongodb connection error is',error)
  }
}