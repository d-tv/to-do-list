import app from './app.js';
import config from './config/index.js';

const server = app.listen(config.port, () => {
  const { port } = server.address();
  console.log(`Listening on port ${port}. Press Ctrl+C to quit.`);
});
