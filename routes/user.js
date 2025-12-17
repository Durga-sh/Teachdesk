import express from "express";
import { courseModel, purchaseModel, userModel } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import z from "zod";
import { auth } from "../middleware/middleware.js";


const useRouter = express.Router();

const JWT_SECRET = "iloveindia";

const app = express();

app.use(express.json());



useRouter.post("/signup", async function (req, res) {
  const reqBody = z.object({
  email: z.string().min(3).max(30),
  password: z.string().min(3).max(10),
  firstName: z.string().min(3).max(10),
  lastName: z.string().min(3).max(10)
})

const parseDataWithSuccess = reqBody.safeParse(req.body);
if(!parseDataWithSuccess){
  res.json({
    message:"Incorect data Format"
  })
}
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  console.log(password);

  const hashPassword = await bcrypt.hash(password, 5);

  await userModel.create({
    email: email,
    password: hashPassword,
    firstName: firstname,
    lastName: lastname,
  });
  res.status(200).json({
    message: "Sign up",
  });
});

useRouter.post("/signin", async function (req, res) {

try {
  const email1 = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({
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
    return ;
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
    console.log("Sign in Error"+ error);
    
    res.status(500).json({
        message:"Internal Server Error"
    })
        
    }
});

useRouter.get("/purchases", auth ,async function (req, res) {

  const id= req.id
  console.log(id);
  

  const purchases = await purchaseModel.findOne({
    _id:id
  })

  const courseData = await courseModel.find({
    _id:{$in:purchases.map (x=>x.courseId)}
  })

res.json({
  purchases,
  courseData
})

});



export default useRouter;
