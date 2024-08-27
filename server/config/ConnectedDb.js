import mongoose from "mongoose";

const ConnectToDb = () => {
  mongoose.connect(process.env.BASE_URL).then((conx) => {
    console.log(conx.connection.host);
  });
};

export default ConnectToDb;
