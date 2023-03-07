const { Schema, model, Types } = require("mongoose");
const { CommentSchema } = require("./Comment");
const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    isLive: { type: Boolean, required: true, default: true },
    user: {
      _id: { type: Types.ObjectId, required: true, ref: "user" }, //using ref to make relation with blog to user.
      name: {
        first: { type: String, required: true },
        last: { type: String, required: false },
      },
    },
    commentsCount: { type: Number, default: 0, required: true },
    comments: [CommentSchema],
  },
  { timestamps: true }
);
// BlogSchema.index({ "user._id": 1, updatedAt: 1 });
// BlogSchema.index({ title: "text", content: "text" });

// BlogSchema.virtual("comments", {
//   // => making virtual data. this is not uploading at DB. this is for response.
//   ref: "comment",
//   localField: "_id",
//   foreignField: "blog",
// });
// BlogSchema.set("toObject", { virtuals: true });
// BlogSchema.set("toJSON", { virtuals: true });
const Blog = model("blog", BlogSchema);
module.exports = { Blog };
