const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://rajaditya0thakur:dq0P3wkxNQt1sjFS@cluster0.vyrcpnp.mongodb.net/Assign');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username : {type : String , required : true} , 
    password : {type : String , required : true} , 
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username : {type : String , required : true} , 
    password : {type : String , required : true} , 
    purchasedCourse:[{
        type : mongoose.Schema.ObjectId , 
        ref : "Course",
    }]

});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title : {type : String , required : true} , 
    description : {type : String , required : true} , 
    price : {type : Number  , required  : true} , 
    imageLink : {type  : String } , 
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
module.exports = {
    Admin,
    User,
    Course
}