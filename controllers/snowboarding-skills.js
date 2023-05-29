const SnowboardingSkill = require('../models/snowboarding-skill.js');
// const Performer = require('../models/performer');

module.exports = {
    index
    // show,
    // new: newMovie,
    // create
};

async function index(req, res) {
    const snowboardingSkills = await SnowboardingSkill.find({});
    res.render('snowboarding-skills/index', { title: 'My Skills', snowboardingSkills });
}