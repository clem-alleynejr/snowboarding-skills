const SnowboardingSkill = require("../models/snowboarding-skill.js");
// const Performer = require('../models/performer');

module.exports = {
  index,
  new: newSkill,
  create,
  createNoteComment,
  show,
  delete: deleteSkill,
  edit,
  update,
};

async function edit(req, res) {
  const snowboardingSkill = await SnowboardingSkill.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!snowboardingSkill) return res.redirect("/snowboarding-skills");
  res.render("snowboarding-skills/edit", {
    viewType: "Edit Skill",
    title: "Edit Snowboarding Skill Below:",
    snowboardingSkill,
    errorMsg: "",
  });
}

async function update(req, res) {
  try {
    const updatedSnowboardSkill = await SnowboardingSkill.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      // update object with updated properties
      req.body,
      // options object {new: true} returns updated doc
      { new: true }
    );
    return res.redirect(`/snowboarding-skills/${updatedSnowboardSkill._id}`);
  } catch (err) {
    console.log(err.message);
    return res.redirect("/snowboarding-skills");
  }
}

async function deleteSkill(req, res) {
  await SnowboardingSkill.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  res.redirect("/snowboarding-skills");
}

async function index(req, res) {
  const snowboardingSkills = await SnowboardingSkill.find({
    user: req.user._id,
  });
  res.render("snowboarding-skills/index", {
    viewType: "My Skills",
    title: "My Snowboarding Skills",
    snowboardingSkills,
    user: req.user,
  });
}

function newSkill(req, res) {
  res.render("snowboarding-skills/new", {
    viewType: "Add Skill",
    title: "Add Snowboarding Skill Below:",
    errorMsg: "",
  });
}

async function create(req, res) {
  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // Below function validates if New Skill is fully filled with the required information and returns list of fields not filled

  const validateSnowboardingSkill = (body) => {
    const errors = [];

    if (!body.skill) {
      errors.push('"Skill" is required.');
    }
  
    if (!body.difficultyLevel) {
      errors.push('"Difficulty Level" is required.');
    }
  
    if (!body.myProficiency) {
      errors.push('"My Proficiency Level" is required.');
    }
  
    return errors;
  }

  try {
    await SnowboardingSkill.create(req.body);
    res.redirect("/snowboarding-skills");
  } catch (err) {
    const validationErrors = validateSnowboardingSkill(req.body);
    console.log(validationErrors);
    res.render("snowboarding-skills/new", {
      viewType: "Add Skill",
      title: "Add Snowboarding Skill Below:",
      errorMsg: validationErrors
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
  res.redirect(`/snowboarding-skills/${snowboardingSkill._id}`);
}

async function show(req, res) {
  const snowboardingSkill = await SnowboardingSkill.findById(req.params.id);
  res.render("snowboarding-skills/show", {
    viewType: `Skill: ${snowboardingSkill.skill}`,
    title: snowboardingSkill.skill,
    snowboardingSkill,
    // errorMsg: err.message
  });
}
