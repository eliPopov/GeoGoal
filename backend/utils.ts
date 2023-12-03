import { point, buffer, randomPosition, bbox, distance } from '@turf/turf';

export type Position = { lat: number; lng: number };

export function generateRandomGoal(center: Position, radius: number): Position {
  const ball = point([center.lat, center.lng]);
  const dist = buffer(ball, radius);
  const randomPos = randomPosition(bbox(dist));
  const goal: Position = { lat: randomPos[0], lng: randomPos[1] };
  return goal;
}

export function checkGoal(
  ball: Position,
  goal: Position,
  goalDistance: number
) {
  const ballPosition = point([ball.lat, ball.lng]);
  const goalPosition = point([goal.lat, goal.lng]);
  const dist = distance(ballPosition, goalPosition);

  return goalDistance < dist;
}
