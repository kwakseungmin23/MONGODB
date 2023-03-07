const { Router } = require("express");
const userRouter = Router();
const { User, Blog, Comment } = require("../models");
const { mongoose } = require("mongoose");

userRouter.get("/", async function (req, res) {
  //중요한 부분//get method, end-point, 함수(request, response){}
  //request 안에 header 등등
  //response 안에 client 에 줘야하는 것 전부
  try {
    const users = await User.find({});
    return res.send({ users: users });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
  //client 에 어떤 정보를 주는지에 대한 내용
});

userRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userId" });
    const user = await User.findOne({ _id: userId });
    return res.send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    let { username, name } = req.body;
    if (!username) return res.status(400).send({ err: "username required" });
    if (!name || !name.first || !name.last)
      return res.status(400).send({ err: "Both first & last names required." });
    const user = new User({ ...req.body });
    await user.save();
    return res.send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

userRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userId" });
    const [user] = await Promise.all([
      User.findOneAndDelete({ _id: userId }),
      Blog.deleteMany({ "user._id": userId }),
      Blog.updateMany(
        { "comments.user": userId },
        { $pull: { comments: { user: userId } } }
      ),
      Comment.deleteMany({ user: userId }),
    ]);
    return res.send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});
//age, name 수정 -> 유의점
userRouter.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userId" });

    const { age, name } = req.body;
    if (!age && !name)
      return res.status(400).send({ err: "age or name is required" });
    if (age && typeof age !== "number")
      return res.status(400).send({ err: "age must be a number" });
    if (name && typeof name.first !== "string" && typeof name.last !== "string")
      return res.status(400).send({ err: "first or last name are string" });

    // let updateBody = {};
    // if (age) updateBody.age = age;
    // if (name) updateBody.name = name;
    // const user = await User.findByIdAndUpdate(userId, updateBody, {
    //   new: true,
    // });
    //#pic1
    let user = await User.findById(userId);
    if (age) user.age = age;
    // console.log({ name }, req.body);
    if (name) {
      user.name; // 한 유저의 이름 수정이 파생하는 많은 블로그에서, 많은 커멘츠에서도 같이 수정되어야 하기 때문에 updateMany
      await Promise.all([
        Blog.updateMany({ "user._id": userId }, { "user.name": name }),
        Blog.updateMany(
          {},
          { "comments.$[element].userFullName": `${name.first} ${name.last}` },
          { arrayFilters: [{ "comment.user": userId }] }
        ),
      ]);
    }
    await user.save();
    return res.send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

module.exports = { userRouter };
