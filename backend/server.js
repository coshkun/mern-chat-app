
//import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { app, server, express } from './socket/socket.js';

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

//const app = express(); -> moved to socket.js
const PORT = process.env.PORT || 3000;

app.use(express.json()); // to parse incoming reqs with JSON payloads
app.use(cookieParser()); // to parse incoming cookies from req.cookies

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// app.get('/', (req, res) => {
//     // root route on http://localhost:3000
//     res.send("Server is running!");
// } );


//connectToMongoDB
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
} );
