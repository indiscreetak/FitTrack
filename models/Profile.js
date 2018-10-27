const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String
  },
  steps: Number,
  calories: Number,
  weight: Number,
  friends: [String],
  exercises: [
    {
      date: { type: Number, default: Date.now() },
      activity: String,
      distance: Number,
      calburn: Number
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
