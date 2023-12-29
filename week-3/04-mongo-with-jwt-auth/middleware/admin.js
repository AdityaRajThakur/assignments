const jwt = require('jsonwebtoken')
const {JWT_PASSWORD}  = require("../config") 
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers['authorization'].split(" ")[1] ; 
    // console.log(token + " " + JWT_PASSWORD) ; 
    const value = jwt.verify(token , JWT_PASSWORD); 
    if(value.username){
        next() ; 
    }else{
        res.status(404).json({
            "msg":"Authentication failed" , 
        })
    }
}
module.exports = adminMiddleware;