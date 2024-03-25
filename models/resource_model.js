const mongoose = require('mongoose');

const evalid = /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,5}$/;
const phoneno = /^\d{10}$/;

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 18,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [evalid, "Invalid Email Address"]
    },
    mobile: {
        type: Number,
        validate: [phoneno, "Invalid Mobile no."]
    }
},{
    timestamps: true,
});

var Resource = new mongoose.model("Resource", schema);

module.exports = Resource;