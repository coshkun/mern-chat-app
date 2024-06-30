
//import express from "express";
import path from "path";
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

const __dirname = path.resolve();

app.use(express.json()); // to parse incoming reqs with JSON payloads
app.use(cookieParser()); // to parse incoming cookies from req.cookies

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// PREPARE FOR DEPLOYMENT
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
// //////////////////////


//connectToMongoDB
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
} );
