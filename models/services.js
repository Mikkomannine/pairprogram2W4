const mongoose = require('mongoose');


const serviceSchema = new mongoose.Schema({

    icon: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },

    });

const services = mongoose.model('Service', serviceSchema);
module.exports = services;