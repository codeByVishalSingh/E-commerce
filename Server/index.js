const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./Config/db")
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.send("Backend is working");
    
}) 
app.use('/api/auth',require('./Routes/auth.Routes'))
app.use('/api/products',require('./Routes/auth.Routes'))
app.use('/api/orders',require('./Routes/auth.Routes'))
app.use('/api/payment',require('./Routes/auth.Routes'))
app.use('/api/analytics',require('./Routes/auth.Routes'))



const PORT = process.env.PORT; 

app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT}`);
    
})

