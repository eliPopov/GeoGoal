"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGoal = exports.generateRandomGoal = void 0;
const turf_1 = require("@turf/turf");
function generateRandomGoal(center, radius) {
    const ball = (0, turf_1.point)([center.lat, center.lng]);
    const dist = (0, turf_1.buffer)(ball, radius);
    const randomPos = (0, turf_1.randomPosition)((0, turf_1.bbox)(dist));
    const goal = { lat: randomPos[0], lng: randomPos[1] };
    return goal;
}
exports.generateRandomGoal = generateRandomGoal;
function checkGoal(ball, goal, goalDistance) {
    const ballPosition = (0, turf_1.point)([ball.lat, ball.lng]);
    const goalPosition = (0, turf_1.point)([goal.lat, goal.lng]);
    const dist = (0, turf_1.distance)(ballPosition, goalPosition);
    return goalDistance < dist;
}
exports.checkGoal = checkGoal;
