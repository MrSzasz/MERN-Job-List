const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    date: {
        type: String,
    },

    company: {
        type: String,
        required: true
    },

    requirements: {
        type: String,
        required: true
    },

    extra: {
        type: String
    }
});

module.exports = mongoose.model("Job", jobSchema);