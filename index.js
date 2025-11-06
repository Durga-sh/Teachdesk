import express from 'express';
import useRouter from './routes/user.js';
import courseRouter from './routes/course.js';
import mongoose from 'mongoose';

const app = express();

app.use('/api/v1/user', useRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/admin', courseRouter);


async function main(){
    await mongoose.connect("mongodb+srv://durga1234:Durga1234@cluster0.stke71i.mongodb.net/courseSelling")
    app.listen(3000);
    console.log("Server Running on port 3000");
    
}

main();
