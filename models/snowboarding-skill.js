const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const snowboardingSkillSchema = new Schema({
    skill: {
        type: String,
        required: true
    },
    skillDifficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        required: true
    },
    myProficiency: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true
    }
})


module.exports = mongoose.model('SnowboardingSkill', snowboardingSkillSchema);