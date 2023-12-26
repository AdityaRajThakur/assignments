const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body['usename']; 
    const password = req.body['password']; 
    User.create({
        username : username , 
        password : password,
    }); 
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({}).then((data)=>{
        res.send({
            courses : data ,    
        });
    });
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router