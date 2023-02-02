
import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost/todoApp"

const connectDB = async () => {
    const connection = await mongoose.connect(MONGO_URI)
    console.log(`Connected to mongo! Database name: ${connection.connections[0].name}`)
}

export default connectDB