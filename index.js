import dotenv  from 'dotenv';
import express from 'express'
import router from './Routes/index.js';
import mongoose from 'mongoose';


const app = express();
app.use(express.json())
dotenv.config()

app.use("/" , router) 

mongoose.connect(process.env.MONGOURL).then(() => console.log("Database Connected"))
app.listen(8000, () => console.log("App is running on port 8000"))