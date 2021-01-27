const { Schema, model } = require('mongoose');

const defectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    attachment: {
        type: String,
        default: '',
    },
    attachment_id: {
        type: String,
        default: '',
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
    status: {
        type: String,
        enum: ['open', 'fixing', 'solved'],
        required: true,
    },
    open_date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    close_date: {
        type: Date,
        default: '',
    },
});

module.exports = model('Defect', defectSchema);
