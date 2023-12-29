const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const db = require("../db/index"); 

const Admin = db.Admin;
const Course = db.Course; 

const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body['username'] ; 
    const password = req.body['password'] ; 
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
    }).then(()=>{
        res.send({
            message: 'Admin created successfully' ,
        });
    }).catch((err)=>{
        res.status(404).json({
            "msg":"some error occurred" , 
        })
    })
});

router.post('/courses', adminMiddleware,  (req, res) => {
    // Implement course creation logic
    const title = req.body['title'] ; 
    const description = req.body['description']; 
    const price = req.body['price']; 
    const imageLink = req.body['imageLink']; 
    Course.create({
        title : title , 
        description : description, 
        price : price , 
        imageLink : imageLink, 
    }).then((value)=>{
        console.log(value._id) ; 
        res.send({
            message: 'Course created successfully', 
            courseId: value._id.toString(), 
        })
    }).catch((err)=>{
        console.log(err) ; 
        res.status(404).json({
            message: "Failed to create courses..." , 
        })
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