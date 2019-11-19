const { app } = require('./app');
const { db } = require('./db/index.js');
const PORT = process.env.PORT || 3000;

// Do not touch this file
db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log('listening on port:', PORT);
      console.log('click me --->', `http://localhost:${PORT}`);
    });
  })
  .catch(e => {
    console.log('connection error', e);
  });
