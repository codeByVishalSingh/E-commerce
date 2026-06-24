const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./Config/db")
const orderRoutes = require('./Routes/order.Routes');
const analyticsRouter = require("./Routes/analytics.Routes")
dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin:['http://http://localhost:5173/'],
    credentials: true
})

);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.send("Backend is working");
    
}) 
app.use('/api/auth',require('./Routes/auth.Routes'))
app.use('/api/products',require('./Routes/product.Routes'))
app.use('/api/orders', orderRoutes);
app.use('/api/payment',require('./Routes/auth.Routes'))
app.use("/api/analytics", analyticsRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT}`);
    
})

 