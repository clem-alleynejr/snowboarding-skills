const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const snowboardingSkillsCtrl = require('../controllers/snowboarding-skills');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /snowboarding-skills
router.get('/', snowboardingSkillsCtrl.index);
// GET /snowboarding-skills/new
router.get('/new', ensureLoggedIn, snowboardingSkillsCtrl.new);
// POST /snowboarding-skills
router.post('/', ensureLoggedIn, snowboardingSkillsCtrl.create);
// POST /snowboarding-skills/:id/notes-comments
router.post('/:id/notes-comments', ensureLoggedIn, snowboardingSkillsCtrl.createNoteComment)
// GET /snowboarding-skills/:id (show functionality) MUST be below new route
router.get('/:id', snowboardingSkillsCtrl.show);

module.exports = router;