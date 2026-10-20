const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

(async () => {
  await connectDB();
  const email = 'admin@logicare.com';
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin already exists');
  } else {
    await User.create({ name: 'LogiCare Admin', email, password: 'Admin@123', role: 'admin', company: 'LogiCare Export' });
    console.log('Admin created: ' + email + ' / Admin@123');
  }
  await mongoose.disconnect();
})();
