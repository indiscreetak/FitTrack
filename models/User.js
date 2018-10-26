const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const friends = new Schema({
  name: String
});

const exercises = new Schema({
  date: { type: Number, default: Date.now() },
  type: String,
  Distance: Number,
  CalBurn: Number
});

const data = new Schema({
  steps: Number,
  calories: Number,
  weight: Number,
  friends: [friends],
  recentExercises: [exercises]
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  data: [data]
});

module.exports = User = mongoose.model('users', userSchema);
