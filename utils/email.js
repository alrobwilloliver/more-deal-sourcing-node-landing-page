const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_HOST,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    // Define the email options
    const mailOptions = {
        from: 'Alan Oliver <moredealsourcing@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        //html:
    }
    // Actually send the email with nodemailer
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendEmail;