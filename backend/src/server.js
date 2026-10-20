const app = require('./app');
const env = require('./config/env');
const connectDB = require('./config/db');

connectDB().then(() => {
  app.listen(env.port, () => console.log('LogiCare Export API running on port ' + env.port));
});
