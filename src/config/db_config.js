import mongoose from "mongoose";


export class ConnectDatabase {
    constructor(){
        this.db_url = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017'
        this.db_name = process.env.DATABASE_NAME || 'webskitters'
    }

    async connectMongoDb() {
        try {
            const db_connection = await mongoose.connect(`${this.db_url}/${this.db_name}`);
            console.log(`MongoDB connected !! DB HOST: ${db_connection.connection.host} ${db_connection.connection.name}`);
        } catch (error) {
            console.log(`MONGODB CONNECTION FAILED: ${error}`);
        }
    }
}