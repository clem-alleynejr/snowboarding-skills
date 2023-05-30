const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const notesCommentsSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      userName: String,
      userAvatar: String
}, {
    timestamps: true
})

const snowboardingSkillSchema = new Schema({
    skill: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        required: true
    },
    myProficiency: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true
    },
    notesComments: [notesCommentsSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      userName: String,
      userAvatar: String
}, {
    timestamps: true
})


module.exports = mongoose.model('SnowboardingSkill', snowboardingSkillSchema);