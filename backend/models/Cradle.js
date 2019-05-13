const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CradleSchema = new Schema({
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

module.exports = Cradle = mongoose.model('cradles', CradleSchema);