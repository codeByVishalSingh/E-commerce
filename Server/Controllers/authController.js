const userModel = require('../Models/user.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const sendEmail = require('../Utils/sendEmail');


const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'});
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 'await' add kiya
        const user = await userModel.create({ 
            name, 
            email, 
            password: hashedPassword // Schema check kar lein yahan 'password' ya 'hashedPassword'
        });

        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const message = `Welcome... Your OTP is ${otp}`;

            await sendEmail(email, 'Welcome to E-Commerce', message);
            
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        console.error(error); // Error log zaroor karein
        res.status(500).json({ message: 'Server Error' });
    }
}
// login User 

const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:generateToken(user._id)
            })
        }
        else {
            res.status(400).json({message: "invaild email or password"})
        }
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

const getUsers = async (req,res) =>{
    try {
        const users = await userModel.find({}).select('-password')
        res.json(users)
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
}

module.exports ={registerUser,loginUser,getUsers}