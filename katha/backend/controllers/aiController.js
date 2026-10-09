const academicMode = require('../services/AcademicModeFacade');

async function assist(req, res, next) {
  try {
    const { text, mode } = req.body;
    if (!text || !mode) {
      return res.status(400).json({ error: 'text and mode ("summarize" | "explain" | "narrate") are required.' });
    }
    const result = await academicMode.assist(text, mode);
    res.json(result);
  } catch (err) {
    err.status = err.status || 400;
    next(err);
  }
}

module.exports = { assist };
