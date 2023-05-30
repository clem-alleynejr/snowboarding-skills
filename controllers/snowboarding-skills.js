const SnowboardingSkill = require('../models/snowboarding-skill.js');
// const Performer = require('../models/performer');

module.exports = {
    index,
    // show,
    new: newSkill,
    create
};

async function index(req, res) {
    const snowboardingSkills = await SnowboardingSkill.find({});
    res.render('snowboarding-skills/index', { 
        title: 'My Skills', 
        subTitle: 'Track Your Snowboarding Progression!', 
        snowboardingSkills, 
        user: req.user 
    });
}

function newSkill(req, res) {
    res.render('snowboarding-skills/new', { 
        title: 'Add Snowboarding Skill Below:', 
        subTitle: 'Track Your Snowboarding Progression!', 
        errorMsg: '' 
    });
}

async function create(req, res) {
    try {
        await SnowboardingSkill.create(req.body);
        res.redirect('/snowboarding-skills');
    } catch (err) {
        res.render('snowboarding-skills/new', { 
            title: 'My Skills',
            subTitle: 'Track Your Snowboarding Progression!',           
            errorMsg: err.message 
        });
    }
}
