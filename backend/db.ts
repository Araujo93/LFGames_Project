import cfg from './config';
import mongoose from "mongoose";

mongoose.connect(cfg.MONGOURI);

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDb");
});
mongoose.connection.on("error", () => {
  console.log("Error connecting to MongoDb");
});

export default mongoose;
