const jwt = require('jsonwebtoken') 
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const jwtPassword = "pass" ; 
    const token = req.headers['authorization'] ; 
    try{
        const value = jwt.verify(token , jwtPassword) ; 
        next() ; 
    }catch(e){
        return res.status(404).json({
            "msg":"Authentication faild" , 
        })
    }
}

module.exports = adminMiddleware;