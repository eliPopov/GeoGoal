import {
  point,
  buffer,
  randomPosition,
  bbox,
  distance,
  Units,
} from '@turf/turf';

export type Position = { lat: number; lng: number };

export function isFloat(value: string | number): boolean {
  const n = Number(value.toString());
  return isNaN(n) || n === 0;
}

export function generateRandomGoal(
  center: Position,
  radius: number,
  unit: Units
): Position {
  const ball = point([center.lat, center.lng]);
  const dist = buffer(ball, radius, { units: unit });
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
