import { startServer, connectMongoDB } from "./api/index.js";

connectMongoDB();
startServer();