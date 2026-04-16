const mongoose = require('mongoose');

const codeReviewSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    response: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const codeReviewModel = mongoose.model('CodeReview', codeReviewSchema);

module.exports = codeReviewModel;
