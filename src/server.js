const express = require("express");
const app = express();
const { userRouter, blogRouter } = require("./routes/");
const mongoose = require("mongoose");
const { generateFakeData } = require("../faker2");

mongoose.set("strictQuery", false);
// mongoose.set("debug", false);
const server = async () => {
  try {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) throw new Error("MONGO_URI is required.");
    await mongoose.connect(MONGO_URI);
    // mongoose.set("debug", true);
    console.log("MongoDB connected");

    app.use(express.json());

    app.use("/user", userRouter);

    app.use("/blog", blogRouter);

    app.listen(3000, async () => {
      console.log("server listening on port 3000");

      // await generateFakeData(5, 5, 5);

      //n명의 유저, 유저 당 n개의 블로그, 1개 블로그당 n개의 후기
    });
  } catch (err) {
    console.log(err);
  }
};

server();
