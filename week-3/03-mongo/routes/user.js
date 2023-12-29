const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User} = require("../db");
const {Course} = require('../db')
// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body['username'] 
    const password = req.body['password'] 
    const value = await User.findOne({
        username : username , 
        password : password ,            
    }); 
    if(value){
        return res.status(404).json({
            "msg": "User Already exists" , 
        }) ;
    }
    User.create({
        username : username , 
        password : password , 
    }).then(()=>{
        res.send({
            message: 'User created successfully',
        })
    }).catch((err)=>{
        res.status(404).json({
            message: "some error occurred" , 
        })
    })
    
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
//    console.log("this is /user/courses");
    // console.log("this is user/courses") ; 
    const rese = Course.find({}).then((data, err )=>{
        if(err){
            return res.send({
                "mss": "no data found"  , 
            })
        }
        return res.send({
        "courses" : data , 
        });
    }); 
    // console.log(rese) ; 
    
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const username  = req.headers.username ; 
    const password  = req.headers.password ; 
    const courseId  = req.params.courseId ; 
    User.updateOne(({
        username : username , 
        password : password , 
    },{
        $push:{
            purchasedCourse : courseId 
        } 
    })).then((value)=>{
        res.status(200).send({
            message: 'Course purchased successfully'
        })
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username ; 
    const password = req.headers.password; 
    const user = await User.findOne({
        username : username , 
        password : password ,
    })

    let promiseCourse = user.purchasedCourse.map((item)=>Course.find({_id : item})) 
    const data = await Promise.all(promiseCourse)
    res.status(200).json({
        purchasedCourse  : data 
    })
});

module.exports = router