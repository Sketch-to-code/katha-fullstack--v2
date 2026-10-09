const documentService = require('../services/documentService');
const SoundscapeFactory = require('../services/factories/SoundscapeFactory');

async function getLibrary(req, res, next) {
  try {
    const docs = await documentService.listLibrary(req.user.sub);
    const resume = await documentService.getMostRecent(req.user.sub);
    res.json({ documents: docs, resume });
  } catch (err) {
    next(err);
  }
}

async function updateProgress(req, res, next) {
  try {
    const { page } = req.body;
    if (typeof page !== 'number') {
      return res.status(400).json({ error: 'page (number) is required.' });
    }
    const updated = await documentService.updateProgress(req.user.sub, req.params.id, page);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

function listSoundscapes(_req, res) {
  res.json({ soundscapes: SoundscapeFactory.list().map((key) => SoundscapeFactory.create(key)) });
}

module.exports = { getLibrary, updateProgress, listSoundscapes };
