const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken") ; 
const {User} = require("../db/index") ; 
const {Course} = require("../db/index") ; 
const {Admin} = require("../db/index") ; 
const {JWT_PASSWORD} = require("../config") ; 
// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body['username'] ; 
    const password = req.body['password'] ; 
    User.create({
        username : username , 
        password : password 
    }).then((user)=>{
        res.status(200).json({
            "message":"User created successfully" , 
        })
    }).catch((err)=>{
        res.status(404).json({
            "message" : "Failed to create user" , 
        })
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username =  req.body['username'] ; 
    const password = req.body['password'] ; 

    User.findOne({
        username : username , 
        password : password 
    }).then((value)=>{
        const token = jwt.sign({
            username , 
            password 
        } , JWT_PASSWORD); 
        res.status(200).send({
            "token":token, 
        })
    }).catch((err)=>{
        res.send(404).json({
            "message" : "some error occurred" , 
        })
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const course = await Course.find({}) ; 
    res.status(200).send({
        "course" : course
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseid = req.params.courseId ; 
    const username  = req.body['username'];  
    const password = req.body['password'] ; 
    const user = User.updateOne({
        username : username,
        password : password 
    }, {
        $push : {
            purchasedCourse :courseid
        }
    }).then((value)=>{
        res.status(200).json({
            "message" : "Course purchased successfully"
        })
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    
    const user = await User.findOne({
        username : req.body.username , 
        password : req.body.password ,
    }); 

    let promise_courses = user.purchasedCourse.map((id)=>Course.find({_id : id})) ; 
    const courses = await Promise.all(promise_courses) ;
    res.status(200).json({
        "courses" : courses
    })
});

module.exports = router