const admin = (req,res,next) =>{
    // const user = req.body;
    if(req.user && req.user.role == 'admin'){
        next();
    }
    else {
        res.ststus(401).json({message: 'Access denied amdmin only'})
    }
}
module.exports = {admin}