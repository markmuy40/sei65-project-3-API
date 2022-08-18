import mongoose from "mongoose";
// import CONSTS from "../consts.js";

const connectToDb = async () => {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  return mongoose.connect('mongodb://localhost:27017/topic', opts);
};

export default connectToDb;