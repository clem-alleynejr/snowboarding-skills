const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const snowboardingSkillsCtrl = require('../controllers/snowboarding-skills');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /snowboarding-skills
router.get('/', snowboardingSkillsCtrl.index);
// GET /snowboarding-skills/new
router.get('/new', ensureLoggedIn, snowboardingSkillsCtrl.new);
// // GET /movies/:id (show functionality) MUST be below new route
// router.get('/:id', moviesCtrl.show);
// POST /snowboarding-skills
router.post('/', ensureLoggedIn, snowboardingSkillsCtrl.create);
	
module.exports = router;