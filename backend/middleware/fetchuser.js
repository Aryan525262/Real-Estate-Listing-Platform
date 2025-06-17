const jwt = require('jsonwebtoken');
const api = "properties@12345";
const fetchuser = (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:" Please authenticate using a valid token"});
    }
    try{
        const data = jwt.verify(token, api);
        req.user = data.user;
        next();
    }catch(error){
        res.status(401).send({error:" Please authenticate using a valid token"});
    }
}
module.exports = fetchuser;