const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: ObjectId, required: true, ref: "user" }, //refference -> user
    userFullName: { type: String, required: true },
    blog: { type: ObjectId, required: true, ref: "blog" }, // 어떤 blog 에 해당되는 comment 인가? -> ref blog
  },
  { timestamps: true }
);
const Comment = model("comment", CommentSchema);
module.exports = { Comment, CommentSchema };
