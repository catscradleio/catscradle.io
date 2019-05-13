const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CradleSchema = new Schema({
  title: {
    type: String
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = Cradle = mongoose.model('cradles', CradleSchema);