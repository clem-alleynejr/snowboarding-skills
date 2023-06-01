const SnowboardingSkill = require('../models/snowboarding-skill.js');
// const Performer = require('../models/performer');

module.exports = {
    index,
    new: newSkill,
    create,
    createNoteComment,
    show,
    delete: deleteSkill,
    edit,
    update
};

async function edit(req, res) {
    const snowboardingSkill = await SnowboardingSkill.findOne({
        _id: req.params.id, 
        user: req.user._id
    });
    if (!snowboardingSkill) return res.redirect('/snowboarding-skills');
    res.render('snowboarding-skills/edit', { 
        title: 'Edit Snowboarding Skill Below:', 
        subTitle: '',         
        snowboardingSkill,
        errorMsg: ''
     });
  }

async function update(req, res) {
    try {
      const updatedSnowboardSkill = await SnowboardingSkill.findOneAndUpdate({
        _id: req.params.id, 
        user: req.user._id
    },
        // update object with updated properties
        req.body,
        // options object {new: true} returns updated doc
        {new: true}
      );
      return res.redirect(`/snowboarding-skills/${updatedSnowboardSkill._id}`);
    } catch (err) {
      console.log(err.message);
      return res.redirect('/snowboarding-skills');
    }
  }

async function deleteSkill(req, res) {
    await SnowboardingSkill.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
    });
    res.redirect('/snowboarding-skills');
}

async function index(req, res) {
    const snowboardingSkills = await SnowboardingSkill.find({user: req.user._id});
    res.render('snowboarding-skills/index', { 
        title: 'My Snowboarding Skills', 
        subTitle: '', 
        snowboardingSkills, 
        user: req.user 
    });
}

function newSkill(req, res) {
    res.render('snowboarding-skills/new', { 
        title: 'Add Snowboarding Skill Below:', 
        subTitle: '', 
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
            title: 'Add Snowboarding Skill Below:',
            subTitle: '',           
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
        title: snowboardingSkill.skill,
        subTitle: '',
        snowboardingSkill       
        // errorMsg: err.message
    })
}



