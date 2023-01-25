var jwt = require('jsonwebtoken');
const JWT_SECRET="Oh hey wassup bro!"


const fetchuser = (req,res,next) =>{
    // get the user from jwt token and add is to req object
    const token = req.header('auth-token');
    if(!token) res.status(401).send({error:"Please authenticate using valid token!"})
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.send(401).send({error:"Please authenticate using valid token!"});
    }
    
}
module.exports = fetchuser;