import { startServer, connectMongoDB } from "./server/index.js";

connectMongoDB();
startServer();