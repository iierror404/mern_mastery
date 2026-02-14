import mongoose from "mongoose";

const db_connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("[🟢 DB] MongoDB is Connected.");

    } catch (error) {
        console.log("[🔴 DB] MongoDB Connect Field: \n", error);
    }
}

export default db_connect;
