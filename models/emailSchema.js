const mongoose = require('mongoose');

const validateEmail = (email) => {
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regEx.test(email)
}

const emailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        min: 3,
        max: 20,
        trim: true
    },
    email: {
        type: String,
        validate: [validateEmail, 'Please fill in a valid email address'],
        trim: true,
        required: [true, 'Email is required'],
        lowercase: true,
        unique: [true, 'This email has already been submitted']
    }
})

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;