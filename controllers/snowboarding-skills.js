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
  editNoteComment,
  updateNoteComment,
  deleteNoteComment,
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
  // find the Skill to Update:
  const updatedSnowboardSkill = await SnowboardingSkill.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  // update skill with updated properties
  updatedSnowboardSkill.skill = req.body.skill;
  updatedSnowboardSkill.difficultyLevel = req.body.difficultyLevel;
  updatedSnowboardSkill.myProficiency = req.body.myProficiency;

  // Below function validates if updated skillname isn't blank
  const validateSnowboardingSkill = (body) => {
    const errors = [];
    if (!body.skill) {
      errors.push('Error: "Skill" is required.');
    }
    return errors;
  };

  try {
    // save skill
    await updatedSnowboardSkill.save();

    // if successful, return the previous page
    const referer = req.header('Referer');

      // Check if the Referer header exists and if it is from the snowboarding skills domain (for security purposes)
  if (referer && referer.includes("snowboarding-skills.herokuapp.com")) {
    // Redirect the user back to the previous page
    return res.redirect(referer);
    // else, redirect to the snowboarding skills home page
  } else {
    return res.redirect('/');
  }

    // return res.redirect(`/snowboarding-skills/${updatedSnowboardSkill._id}`);

    //if unsuccessful...
  } catch (err) {
    const validationErrors = validateSnowboardingSkill(req.body);
    // Pass in attempted skill edit into locals and
    // re-render the edit page with what user tried to input
    const snowboardingSkill = updatedSnowboardSkill;
    res.render("snowboarding-skills/edit", {
      viewType: "Edit Skill",
      title: "Edit Snowboarding Skill Below:",
      snowboardingSkill,
      skill: updatedSnowboardSkill.skill,
      difficultyLevel: updatedSnowboardSkill.difficultyLevel,
      myProficiency: updatedSnowboardSkill.myProficiency,
      viewType: "Edit Skill",
      title: "Edit Snowboarding Skill Below:",
      errorMsg: validationErrors,
    });
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
  // Below function validates if New Skill is fully filled with the required information and returns list of fields not filled
  const validateSnowboardingSkill = (body) => {
    const errors = [];

    if (!body.skill) {
      errors.push('Error: "Skill" is required.');
    }

    if (!body.difficultyLevel) {
      errors.push('Error: "Difficulty Level" is required.');
    }

    if (!body.myProficiency) {
      errors.push('Error: "My Proficiency Level" is required.');
    }

    return errors;
  };

    // Add the user info to req.body
    req.body.user = req.user._id;

  try {
    await SnowboardingSkill.create(req.body);
    res.redirect("/snowboarding-skills");
  } catch (err) {
    const validationErrors = validateSnowboardingSkill(req.body);
    res.render("snowboarding-skills/new", {
      skill: req.body.skill,
      difficultyLevel: req.body.difficultyLevel,
      myProficiency: req.body.myProficiency,
      viewType: "Add Skill", 
      title: "Add Snowboarding Skill Below:",
      errorMsg: validationErrors,
    });
  }
}

async function createNoteComment(req, res) {
  const snowboardingSkill = await SnowboardingSkill.findById(req.params.id);

  // Add the user info to req.body
  req.body.user = req.user._id;

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

async function editNoteComment(req, res) {
  const snowboardingSkillId = req.params.snowboardingSkillId;
  const noteCommentId = req.params.noteCommentId;

  // Find the Snowboarding Skill
  const snowboardingSkill = await SnowboardingSkill.findOne({
    _id: snowboardingSkillId,
    user: req.user._id,
  });

  // Find the Specific Comment
  const noteComment = snowboardingSkill.notesComments.find(
    (nc) => nc._id.toString() === noteCommentId
  );

  res.render("snowboarding-skills/notes-comments/edit", {
    viewType: "Edit Note/Comment",
    title: "Edit Note/Comment",
    snowboardingSkill,
    noteComment,
    errorMsg: "",
  });
}

async function updateNoteComment(req, res) {
  const snowboardingSkillId = req.params.snowboardingSkillId;
  const noteCommentId = req.params.noteCommentId;

  // Find the Snowboarding Skill
  const snowboardingSkill = await SnowboardingSkill.findOne({
    _id: snowboardingSkillId,
    user: req.user._id,
  });

  // Find the Specific Comment
  const noteComment = snowboardingSkill.notesComments.find(
    (nc) => nc._id.toString() === noteCommentId
  );

  // Edit the Comment
  noteComment.content = req.body.content;

  // Save the comment by saving the snowboarding skill model
  await snowboardingSkill.save();

  // Redirect to the skill page
  return res.redirect(`/snowboarding-skills/${snowboardingSkillId}`);
}

async function deleteNoteComment(req, res) {
  const snowboardingSkillId = req.params.snowboardingSkillId;
  const noteCommentId = req.params.noteCommentId;

  // Find the Snowboarding Skill
  const snowboardingSkill = await SnowboardingSkill.findOne({
    _id: snowboardingSkillId,
    user: req.user._id,
  });

  // Find the Specific Comment
  const noteComment = snowboardingSkill.notesComments.find(
    (nc) => nc._id.toString() === noteCommentId
  );

  // Find the index of the comment in the notesComments Array
  const noteCommentIndex = snowboardingSkill.notesComments.findIndex(
    (nc) => nc._id.toString() === noteCommentId
  );

  // Remove the note/comment from the notesComments Array
  snowboardingSkill.notesComments.splice(noteCommentIndex, 1);

  // Save the Snowboarding Skill
  await snowboardingSkill.save();

  // Redirect to the Snowboarding Skill page
  res.redirect(`/snowboarding-skills/${snowboardingSkillId}`)
}
