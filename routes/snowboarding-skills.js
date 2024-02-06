const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const snowboardingSkillsCtrl = require('../controllers/snowboarding-skills');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /snowboarding-skills
router.get('/', ensureLoggedIn, snowboardingSkillsCtrl.index);
// GET /snowboarding-skills/new
router.get('/new', ensureLoggedIn, snowboardingSkillsCtrl.new);
// POST /snowboarding-skills
router.post('/', ensureLoggedIn, snowboardingSkillsCtrl.create);
// GET /snowboarding-skills/:id 
router.get('/:id', ensureLoggedIn, snowboardingSkillsCtrl.show);
// DELETE /snowboarding-skills/:id 
router.delete('/:id', ensureLoggedIn, snowboardingSkillsCtrl.delete);
// GET /snowboarding-skills/:id/edit
router.get('/:id/edit', ensureLoggedIn, snowboardingSkillsCtrl.edit);
// PUT /snowboarding-skills/:id
router.put('/:id', ensureLoggedIn, snowboardingSkillsCtrl.update);

// POST /snowboarding-skills/:id/notes-comments
router.post('/:id/notes-comments', ensureLoggedIn, snowboardingSkillsCtrl.createNoteComment);
// show note/comment edit page for a specific note/comment
router.get('/:snowboardingSkillId/notes-comments/:noteCommentId/edit', ensureLoggedIn, snowboardingSkillsCtrl.editNoteComment);
// update the specific note/comment
router.put('/:snowboardingSkillId/notes-comments/:noteCommentId', ensureLoggedIn, snowboardingSkillsCtrl.updateNoteComment);
// delete specific note/comment
router.delete('/:snowboardingSkillId/notes-comments/:noteCommentId', ensureLoggedIn, snowboardingSkillsCtrl.deleteNoteComment);

module.exports = router;