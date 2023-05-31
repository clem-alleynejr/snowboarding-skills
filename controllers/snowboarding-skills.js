const SnowboardingSkill = require('../models/snowboarding-skill.js');
// const Performer = require('../models/performer');

module.exports = {
    index,
    new: newSkill,
    create,
    createNoteComment,
    show,
    delete: deleteSkill
};

async function deleteSkill(req, res) {
    await SnowboardingSkill.findByIdAndDelete(req.params.id)
    res.redirect('/snowboarding-skills')
}

async function index(req, res) {
    const snowboardingSkills = await SnowboardingSkill.find({ user: req.user._id });
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
        // Add the user-centric info to req.body (the new review)
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
    
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

async function createNoteComment(req, res) {
    const snowboardingSkill = await SnowboardingSkill.findById(req.params.id);

    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    snowboardingSkill.notesComments.push(req.body);
    try {
        await snowboardingSkill.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/snowboarding-skills/${snowboardingSkill._id}`)
}

async function show(req, res) {
    const snowboardingSkill = await SnowboardingSkill.findById(req.params.id)
    res.render('snowboarding-skills/show', {
        title: 'My Skills',
        subTitle: 'Track Your Snowboarding Progression!',
        snowboardingSkill       
        // errorMsg: err.message
    })
}



