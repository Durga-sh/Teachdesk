import express from 'express';
import useRouter from './routes/user.js';
import courseRouter from './routes/course.js';
import mongoose from 'mongoose';
import adminRouter from './routes/admin.js';

const app = express();
app.use(express.json());

app.use('/user', useRouter);
app.use('/course', courseRouter);
app.use('/admin',adminRouter);


async function main(){
    await mongoose.connect("mongodb+srv://durga1234:Durga1234@cluster0.xiwkyxa.mongodb.net/courseSelling")
    app.listen(3000);
    console.log("Server Running on port 3000");
    
}
main();
