const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    image: {   
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
});
    
    const Tour = mongoose.model('Tour', tourSchema);
    module.exports = Tour;