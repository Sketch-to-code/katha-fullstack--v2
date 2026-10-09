const noteService = require('../services/noteService');

async function list(req, res, next) {
  try {
    const notes = await noteService.listNotes(req.user.sub, req.query.documentId);
    res.json({ notes });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { documentId, page, highlightedText, body } = req.body;
    if (!documentId || typeof page !== 'number' || !body) {
      return res.status(400).json({ error: 'documentId, page (number) and body are required.' });
    }
    const note = await noteService.addNote(req.user.sub, { documentId, page, highlightedText, body });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const updated = await noteService.updateNote(req.user.sub, req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Note not found.' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const ok = await noteService.removeNote(req.user.sub, req.params.id);
    if (!ok) return res.status(404).json({ error: 'Note not found.' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = { list, create, update, remove };
