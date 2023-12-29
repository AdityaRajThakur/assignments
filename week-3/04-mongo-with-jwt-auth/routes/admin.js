const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require("jsonwebtoken") ; 
const router = Router();
const {Admin} = require('../db') 
const {Course} = require('../db')
const {User} = require('../db'); 
const {JWT_PASSWORD}  = require("../config") ; 
// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username ;
    const password = req.body.password ;
    const value = await Admin.findOne({
        username : username , 
        password : password , 
    })
    if(value){
        return res.status(404).json({
            "msg": "Admin already exists" , 
        })
    }
    Admin.create({
        username : username , 
        password : password ,
    }).then((value)=>{
        res.status(200).json({
            "msg" : "Admin created successfully" , 
        })
    }).catch((err)=>{
        res.send(404).json({
            "msg":"credentials invalid" ,
        })
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username ;
    const password = req.body.password ;
    const value = await Admin.findOne({
        username : username , 
        password : password , 
    }).then((value)=>{
        
        const token = jwt.sign({
            username : username , 
            password : password 
        } ,JWT_PASSWORD)
        res.status(200).json({
            "token" : token 
        })
    }).catch((err)=>{
        res.status(404).json({
            "msg" : "invalid creadentials",
        })
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    // Description: Creates a new course.
    // Input: Headers: { 'Authorization': 'Bearer <your-token>' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
    // Output: { message: 'Course created successfully', courseId: "new course id" }
    const title = req.body['title'] ; 
    const description = req.body['description'] ; 
    const price = req.body['price'] ; 
    const imageLink = req.body['imageLink'] ; 
    try{
        const course = await Course.create({
            title : title , 
            description : description , 
            price : price  , 
            imageLink : imageLink , 
        }) ; 
        res.status(200).json({
            "message":"Course created successfully" , 
            "courseId": course._id.toString() , 
        }); 
    }catch(err){
        res.status(404).json({
            "message":"Failed to create course" , 
        })
    }
    
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({}).then((course)=>{
        res.status(200).json({
            "courses" : course
        })
    })
});

module.exports = router;