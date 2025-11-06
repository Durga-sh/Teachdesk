import express from 'express';
import {courseModel} from "../db.js"
const courseRouter = express.Router();

courseRouter.get('/', function (req, res) {
    res.json({
        message: 'All Courses'
    });
});

export default courseRouter;