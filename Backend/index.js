import express from "express";
import { connection } from './connection.js';
import projectRouter from "./grape/route.js";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
connection();

// Enable CORS for requests from http://localhost:3000/
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

// Body parser middleware for parsing application/json
app.use(bodyParser.json());

// Body parser middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Add an OPTIONS method handler for preflight requests
app.options('*', cors());

// Route handling
app.use('/', projectRouter);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});