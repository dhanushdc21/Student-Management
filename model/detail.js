const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    done: {
        type: Boolean,
    }
});
const detailSchema = new mongoose.Schema({
    emailID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tasks: [taskSchema],
})

module.exports = mongoose.model('students',detailSchema)