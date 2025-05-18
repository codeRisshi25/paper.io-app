import mongoose from "mongoose";

const db = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/paperio")
        console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default db;