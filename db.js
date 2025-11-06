import mongoose from "mongoose";


const schema  = mongoose.Schema;
const schemaId = mongoose.Types.ObjectId

const userSchema =  new schema({
    
    email:{type:String , unique: true},
    password: String,
    firstName: String,
    lastname:  String
})

const adminSchema  = new  schema({
    email:{type:String , unique: true},
    password: String,
    firstName: String,
    lastname:  String 

})

const courseSchema  = new schema({
    title: String,
    description : String,
    price: Number,
    imageUrl: String,
    createrId: schemaId

})

const purchaseSchema  = new  schema({
    userId:schemaId,
    courseId: schemaId
})

const userModel = mongoose.model("user" , userSchema);
const adminModel = mongoose . model("admin" , adminSchema)
const courseModel = mongoose . model("course" , courseSchema)
const purchaseModel = mongoose. model("purchase" , purchaseSchema)

export {userModel , adminModel , courseModel , purchaseModel};