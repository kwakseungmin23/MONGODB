console.log("client code running.");
const axios = require("axios");

const URI = "http://localhost:3000";
// 비효율적인 방법 :
// - blogslimit 20 일때 7초
// - blogslimit 50 일때 아예 안됨.
// populate 사용 :
// - blogslimit 20 일때 0.2초
// - blogslimit 50 일때 0.3초
// - blogslimit 200 일때 2초
// nesting 사용 :
// - blogslimit 20 일때 0.04초
// - blogslimit 50 일때 0.08초
// - blogslimit 200 일때 0.15초
const test = async () => {
  console.time("time:");
  await axios.get(`${URI}/blog`);
  // console.log(blogs[3], { depth: 10 });
  // blogs = await Promise.all(
  //   blogs.map(async (blog) => {
  //     const [res1, res2] = await Promise.all([
  //       axios.get(`${URI}/user/${blog.user}`),
  //       axios.get(`${URI}/blog/${blog._id}/comment`),
  //     ]);
  //     blog.user = res1.data.user;
  //     blog.comments = await Promise.all(
  //       res2.data.comments.map(async (comment) => {
  //         const {
  //           data: { user },
  //         } = (comment.user = await axios.get(`${URI}/user/${comment.user}`));
  //         comment.user = user;
  //         return comment;
  //       })
  //     );
  //     return blog;
  //   })
  // );
  console.timeEnd("time:");
};

const testGroup = async () => {
  await test();
  await test();
  await test();
  await test();
  await test();
  await test();
};
testGroup();
