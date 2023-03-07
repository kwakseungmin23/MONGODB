const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: false },
    },
    age: Number,
    email: String,
  },
  { timestamps: true }
);

//언제 수정, 생성 확인 가능

const User = model("user", UserSchema);
module.exports = { User };
