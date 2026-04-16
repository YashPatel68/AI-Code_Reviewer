let express = require('express');
const { insertRoute } = require('../../controllers/web/feedbackController');
const {
  saveReviewRoute,
  historyRoute
} = require('../../controllers/web/codeReviewController');
const path = require("path");
let feedbackRouter = express.Router();



// ===== API Routes =====
feedbackRouter.post("/insert", insertRoute);
feedbackRouter.post("/review/save", saveReviewRoute);
feedbackRouter.get("/review/history", historyRoute);


// ===== React build serving =====
const buildPath = path.join(__dirname, "../../../../frontend/dist");

// Serve static files (JS, CSS, images) from React build
feedbackRouter.use(express.static(buildPath));

// Catch-all: send React index.html for React Router routes
feedbackRouter.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});


module.exports = feedbackRouter;
