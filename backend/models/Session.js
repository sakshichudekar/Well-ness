const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  json_file_url: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true,
    default: ""
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft"
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

sessionSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Session', sessionSchema);
