import express, { Express } from 'express';
import cors from 'cors';
import { generateRandomGoal, checkGoal, Position } from './utils';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/generateGoal', (req, res) => {
  const { latitude, longitude, radius } = req.body;
  if (
    !isNaN(parseFloat(latitude)) ||
    !isNaN(parseFloat(longitude)) ||
    !isNaN(parseFloat(radius))
  ) {
    throw new Error('Invalid input');
  }
  const position: Position = { lat: latitude, lng: longitude };
  const pos = generateRandomGoal(position, radius);

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
  if (
    !isNaN(parseFloat(ballLatitude)) ||
    !isNaN(parseFloat(ballLongitude)) ||
    !isNaN(parseFloat(goalLatitude)) ||
    !isNaN(parseFloat(goalLongitude)) ||
    !isNaN(parseFloat(goalDistance))
  ) {
    throw new Error('Invalid input');
  }
  const ballPos: Position = { lat: ballLatitude, lng: ballLongitude };
  const goallPos: Position = { lat: goalLatitude, lng: goalLongitude };
  const result = checkGoal(ballPos, goallPos, goalDistance);

  res.status(200).json({ result });
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
