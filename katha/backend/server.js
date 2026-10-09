require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db/connection');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json({
    ok: true,
    service: 'Katha backend',
    message: 'API is running. Use /health or /api endpoints.',
    endpoints: ['/health', '/api/documents', '/api/auth']
  });
});

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: 'Not found',
    path: req.originalUrl,
    message: 'Katha backend is running. Try /health or an /api route.'
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

db.connect().finally(() => {
  app.listen(PORT, () => {
    console.log(`[katha-backend] listening on http://localhost:${PORT}`);
  });
});
