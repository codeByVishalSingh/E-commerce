const nodemailer = require("nodemailer");

const sendEmail = async (options) => { // options object pass karna zyada clean hai
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASS_USER,
            }
        });

        const mailOptions = {
            from: `"E-Commerce" <${process.env.EMAIL_USER}>`, // Explicitly define from
            to: options.email,
            subject: options.subject,
            html: options.message // 'text' ki jagah 'html' use karein
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;