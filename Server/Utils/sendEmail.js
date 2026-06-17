const nodemailer = require("nodemailer");

const sendEmail = async (to,subject,text) =>{
    try {
        const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Service ki jagah host use karein
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASS_USER, // Yahan 16-character ka App Password hi hona chahiye
    }
});
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log('error sending email',error);
        
    }
};
 module.exports = sendEmail;