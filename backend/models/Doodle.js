const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoodleSchema = new Schema({
  title: {
    type: String
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = Doodle = mongoose.model('doodles', DoodleSchema);