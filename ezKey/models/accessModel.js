const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessCodeSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  accessCode: {
    type: String,
    unique: true
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  visitorsName: {
    type: String,
    required: true,
  },

}, {
  timestamps: true
});


const AccessCode = mongoose.model('Access', accessCodeSchema);

module.exports = AccessCode;
