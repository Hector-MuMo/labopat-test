import { startServer, connectMongoDB } from "./api/app.js";

connectMongoDB();
startServer();