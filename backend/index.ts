import express from 'express';
import authRouter from './routes/authRoutes';
import gameRouter from './routes/gamesRoutes';
import userRouter from './routes/userRoutes';
import mongoose from "mongoose";
import cfg from './config';

const app = express();

(() => {
mongoose.connect('mongodb+srv://sean:araujo93@cluster0.ngetw.mongodb.net/LFGames?retryWrites=true&w=majority');

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDb");
});
mongoose.connection.on("error", () => {
  console.log("Error connecting to MongoDb");
})})();

app.use(express.json());
app.use(authRouter);
app.use(gameRouter);
app.use(userRouter);
app.listen(cfg.PORT, () => {
  console.log(`Server listening on port ${cfg.PORT}`);
});
