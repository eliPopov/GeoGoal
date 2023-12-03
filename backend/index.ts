import express, { Express } from 'express';
import cors from 'cors';
import { generateRandomGoal, checkGoal, Position } from './utils';
import { isFloat } from './utils';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/generateRandomCoordinates', (req, res) => {
  console.log(req.query);
  const { latitude, longitude, radius } = req.query as {
    [key: string]: string;
  };
  if (isFloat(latitude) && isFloat(longitude) && isFloat(radius)) {
    throw new Error('Invalid input');
  }

  const position: Position = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };
  const pos = generateRandomGoal(position, parseFloat(radius));

  res.status(200).json({ pos });
});

app.get('/doesGoalOccurs', (req, res) => {
  const {
    ballLatitude,
    ballLongitude,
    goalLatitude,
    goalLongitude,
    goalDistance,
  } = req.query as { [key: string]: string };
  if (
    isFloat(ballLatitude) &&
    isFloat(ballLongitude) &&
    isFloat(goalLatitude) &&
    isFloat(goalLongitude) &&
    isFloat(goalDistance)
  ) {
    throw new Error('Invalid input');
  }
  const ballPos: Position = {
    lat: parseFloat(ballLatitude),
    lng: parseFloat(ballLongitude),
  };
  const goallPos: Position = {
    lat: parseFloat(goalLatitude),
    lng: parseFloat(goalLongitude),
  };
  const result = checkGoal(ballPos, goallPos, parseFloat(goalDistance));

  res.status(200).json({ result });
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
