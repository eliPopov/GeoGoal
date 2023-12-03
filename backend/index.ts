import express, { Express } from 'express';
import cors from 'cors';
import { generateRandomGoal, checkGoal, Position } from './utils';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/generateGoal', (req, res) => {
  const { latitude, longitude, radius } = req.body;
  const position: Position = { lat: latitude, lng: longitude };
  const pos = generateRandomGoal(position, radius);

  res.status(200).send({ pos });
});

app.get('/doesGoalOccurs', (req, res) => {
  const {
    ballLatitude,
    ballLongitude,
    goalLatitude,
    goalLongitude,
    goalDistance,
  } = req.body;
  const ballPos: Position = { lat: ballLatitude, lng: ballLongitude };
  const goallPos: Position = { lat: goalLatitude, lng: goalLongitude };
  const resBool = checkGoal(ballPos, goallPos, goalDistance);

  res.status(200).send({ resBool });
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
