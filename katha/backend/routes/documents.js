const express = require('express');
const { requireAuth } = require('../middleware/auth');
const documentController = require('../controllers/documentController');

const router = express.Router();

router.use(requireAuth);
router.get('/', documentController.getLibrary);
router.get('/soundscapes', documentController.listSoundscapes);
router.patch('/:id/progress', documentController.updateProgress);

module.exports = router;
