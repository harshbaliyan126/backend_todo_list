const mongoose = require('mongoose');
const schema = mongoose.Schema;

const pingSchema = new schema({
  hostname: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Ping', pingSchema);
