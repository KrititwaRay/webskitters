import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();


import { ConnectDatabase } from './config/db_config.js';
const connectDatabase = new ConnectDatabase();
connectDatabase.connectMongoDb()


app.use(express.json({ limit: '150mb' }));


import { app_router } from './app_routing.js';
app.use('/v1', app_router)



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
})