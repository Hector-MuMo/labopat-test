import express from "express";
import mongoose from "mongoose";
import usersRouter from "./users/routes/index.js";
import tasksRouter from "./tasks/routes/index.js";
import authRouter from "./auth/routes/index.js";
import { config } from "./config/env.js";

const app = express();

app.use(express.json());

const connectMongoDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://hector-labopat:${config.mongoDBPassword}@labopat-test.hpf2i.mongodb.net/`, {
    })

    console.log('MongoDB connected');
  } catch (error) {
    console.log('Error to connect MongoDB', error)
  }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
})

const startServer = () => {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log('Server is running at port: ' + PORT + '🚀​');
  })
}

//Routes
app.use('/api', usersRouter);
app.use('/api', tasksRouter);
app.use('/api/auth', authRouter);


export {
  startServer,
  connectMongoDB
}