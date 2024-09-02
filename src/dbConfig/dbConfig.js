import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.once('connected' , () => {
            console.log('MongoDB Connected...');
        })

        connection.on('error' , (err) => {
            console.log('MongoDB Error' , err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
    }
}