import express from 'express';
import {userModel} from "../db.js"
const useRouter = express.Router();

useRouter.post('/signup', function (req, res) {
    res.json({
        message: 'Sign up '
    });
});

useRouter.post('/signin', function (req, res) {
    res.json({
        message: 'Signin '
    });
});

useRouter.get('/purchases', function (req, res) {
    res.json({
        message: 'purchased Course'
    });
});

export default useRouter;