const mongoose = require('mongoose');
let dbURI = 'mongodb://localhost/loc8r';
let useNewUrlParser = true;

if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
  useNewUrlParser = false;
}
mongoose.connect(dbURI, { useNewUrlParser });


mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const shutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  })
};

// For nodemon restarts
process.once('SIGUSR2', () => {
  shutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  })
});
// For app termination
process.on('SIGINT', () => {
  shutdown('app termination', () => {
    process.exit(0);
  })
});
// For Heroku app termination
process.on('SIGTERM', () => {
  shutdown('Heroku app shutdown', () => {
    process.exit(0);
  })
});

require('./locations');
