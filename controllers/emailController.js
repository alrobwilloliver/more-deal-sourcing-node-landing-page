const Email = require('./../models/emailSchema');
const appError = require('./../utils/appError');
// const catchAsync = require('./../utils/catchAsync');
const sendEmail = require('./../utils/email');

exports.sendNewEmail = async (req, res, next) => {
    try {
        const name = req.body.username;
        await Email.create({
            email: req.body.useremail,
            name
        })

        const options = {
            email: req.body.useremail,
            subject: `Welcome, ${name}!`,
            message: 'Hello, and welcome to our email list. Await weekly information on property deals! You will receive great property offers soon.\n Best,\n More Deal Sourcing Ltd.'
        }

        await sendEmail(options);

        res.status(200).render('index', {
            message: `Thank you, ${name} for joining our email list!`
        })
    } catch (err) {
        if (err.code === 11000) {
            message = 'This email has already been submitted! Please choose a different one.'
            let red = true;

            res.status(400).render('index', {
                message,
                red
            })
        } else {
            message = 'Something went wrong! Please try again.';
            res.status(500).render('index', {
                message
            })
        }
    }
}
