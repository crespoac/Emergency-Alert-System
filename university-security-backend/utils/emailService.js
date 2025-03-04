//Alex and Oscar
const nodemailer = require("nodemailer");

//Create function that allows us to send verification email
const sendVerificationEmail = async(userEmail, verifyToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });


    const verLink = `http://localhost:5001/api/verify/${verifyToken}`;

    //Function to send verification link to users
    const mailOps = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: "Verify Email Now - Emergency Alert System MSU",
        html: `<h2>Email Verification</h2> 
        <p>Click the link below to verify your email:</p>
        <a href ="${verLink}">${verLink}</a>
        <p>Please ignore this if this was not you!</p>`
    };

    try {
        await transporter.sendMail(mailOps);
        console.log(`Verification email sent to ${userEmail}`);
    }
    catch (error) {
        console.error("Error sending the email", error);
    }
};

module.exports = sendVerificationEmail;