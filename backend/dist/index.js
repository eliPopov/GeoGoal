'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const utils_1 = require('./utils');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/generateGoal', (req, res) => {
  const { latitude, longitude, radius } = req.body;
  const position = { lat: latitude, lng: longitude };
  const pos = (0, utils_1.generateRandomGoal)(position, radius);
  res.status(200).json({ pos });
});
app.get('/doesGoalOccurs', (req, res) => {
  const {
    ballLatitude,
    ballLongitude,
    goalLatitude,
    goalLongitude,
    goalDistance,
  } = req.body;
  const ballPos = { lat: ballLatitude, lng: ballLongitude };
  const goallPos = { lat: goalLatitude, lng: goalLongitude };
  const result = (0, utils_1.checkGoal)(ballPos, goallPos, goalDistance);
  res.status(200).json({ result });
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
