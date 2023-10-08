const mongoose = require('mongoose');
const schema = mongoose.Schema;

const taskSchema = new schema({
  task: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', taskSchema);
