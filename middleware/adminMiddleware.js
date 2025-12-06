import express from "express";
import jwt  from "jsonwebtoken";
const JWT_SECRET = "virat"


const app = express();

app.use(express.json());

export function adminauth(req, res, next) {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const data = jwt.verify(token, JWT_SECRET);
    
    req.userId = data.id;
    next();  // Continue to the route handler
    
  } catch (error) {
    res.status(401).json({
      message: "Invalid token"
    });
  }
}