const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const db = require("../db/index"); 

const Admin = db.Admin;
const User = db.User; 
const Course = db.Course; 

const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body['username'] ; 
    const password = req.body['password'] ; 
    Admin.create({
        username : username , 
        password : password , 
    })
    res.send({
        message: 'Admin created successfully' ,
    }); 
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body['title'] ; 
    const description = req.body['description']; 
    const price = req.body['price']; 
    const imageLink = req.body['imageLink']; 
    Course.create({
        title : title , 
        description : description, 
        price : price , 
        iamgeLink : imageLink, 
    })
    res.send({
        message: 'Course created successfully', 
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    Course.find({}).then((data)=>{
        res.send({
            courses : data, 
        });
    });
});

module.exports = router;