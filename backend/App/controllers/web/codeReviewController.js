const codeReviewModel = require("../../models/codeReview.model");

const saveReviewRoute = async (req, res) => {
  try {
    const { language, code, response } = req.body;

    if (!code || !response) {
      return res.status(400).send({
        status: 0,
        msg: "Code and response are required"
      });
    }

    const review = new codeReviewModel({
      language: language || "unknown",
      code,
      response
    });

    await review.save();

    res.send({
      status: 1,
      msg: "Review successfully saved"
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      msg: "Error saving review",
      err
    });
  }
};

const historyRoute = async (req, res) => {
  try {
    const reviews = await codeReviewModel
      .find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.send({
      status: 1,
      data: reviews
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      msg: "Error fetching review history",
      err
    });
  }
};

module.exports = {
  saveReviewRoute,
  historyRoute
};
