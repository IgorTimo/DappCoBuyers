import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import { routes } from './config/routes.js';

await mongoose.connect("mongodb://localhost/co_buyers");

const app = express();
app.use(express.json()); 
app.use(express.urlencoded());
app.use(cors());
app.use("/", routes)


const port = "3003";
app.listen(port, ()=> console.log(`Listening port ${port}`));