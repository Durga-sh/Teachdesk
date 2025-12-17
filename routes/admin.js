import { Router } from "express";
import bcrypt from "bcrypt";
import express from "express";
const JWT_SECRET = "virat";
import { adminModel, courseModel } from "../db.js";
import jwt from "jsonwebtoken";
import { adminauth } from "../middleware/adminMiddleware.js";
const app = express();

app.use(express.json());
const adminRouter = Router();

adminRouter.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  console.log(password);

  const hashPassword = await bcrypt.hash(password, 5);

  await adminModel.create({
    email: email,
    password: hashPassword,
    firstName: firstname,
    lastName: lastname,
  });
  res.status(200).json({
    message: "Sign up",
  });
});

adminRouter.post("/signin", async function (req, res) {
  try {
    const email1 = req.body.email;
    const password = req.body.password;

    const user = await adminModel.findOne({
      email: email1,
    });

    if (!user) {
      res.status(401).json({
        message: "User Not Found",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({
        message: "Invalid Credentials",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
  } catch (error) {
    console.log("Sign in Error" + error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

adminRouter.post("/course", adminauth, async function (req, res) {
  const { title, description, imageUrl, price } = req.body;

  const adminId = req.userId;
  console.log(adminId);

  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });

  res.json({
    message: "Course Created",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminauth, async function (req, res) {
  try {
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;

    const result = await courseModel.updateOne(  
      {
        _id: courseId,
        creatorId: adminId,  
      },
      {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
      }
    );

    if (result.matchedCount === 0) {  // Check if course was found
      return res.status(404).json({
        message: "Course not found or you don't have permission to update it"
      });
    }

    res.json({
      message: "Update Successful",
      courseId: courseId
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});
adminRouter.get("/course/bulk", adminauth, async function (req, res) {
  try {
    console.log("control Reach In get Router");

    const adminId = req.userId;
    console.log(adminId);

    const courses = await courseModel.find({
      // Added await!
      creatorId: adminId, // Fixed field name: createrId not creatorId
    });

    res.status(200).json({
      // Changed from 400 to 200
      courses, // Changed 'course' to 'courses' (plural)
    });
  } catch (error) {
    console.log("Error fetching courses: " + error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});
export default adminRouter;
