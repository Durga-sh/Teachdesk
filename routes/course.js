import express from "express";
import { auth } from "../middleware/middleware.js";
import { courseModel, purchaseModel } from "../db.js";
const courseRouter = express.Router();

const app = express();

app.use(express.json());

courseRouter.post("/purchase", auth, async function (req, res) {
  try {
  
    const userId = req.id;
    console.log(userId);

    const courseId = req.body.courseId;
    console.log(courseId);

    await purchaseModel.create({
      userId: userId,
      courseId: courseId,
    });

    res.json({
      message: "successfull",
    });
  } catch (error) {
    console.log(error);
  }
});

courseRouter.get("/preview", auth, async function (req, res) {
  const userId = req.id;

  const course = await purchaseModel.find({
    userId: userId,
  });

  res.json({
    course,
  });
});


courseRouter.get("/allcourse" , async function(req, res){
    const course = await courseModel.find({})

    res.json({
        course
    })
})
export default courseRouter;
