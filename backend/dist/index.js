"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/generateRandomCoordinates', (req, res) => {
    console.log(req.query);
    const { latitude, longitude, radius } = req.query;
    if (!isNaN(parseFloat(latitude)) ||
        !isNaN(parseFloat(longitude)) ||
        !isNaN(parseFloat(radius))) {
        throw new Error('Invalid input');
    }
    const position = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
    };
    const pos = (0, utils_1.generateRandomGoal)(position, parseFloat(radius));
    res.status(200).json({ pos });
});
app.get('/doesGoalOccurs', (req, res) => {
    const { ballLatitude, ballLongitude, goalLatitude, goalLongitude, goalDistance, } = req.query;
    if (!isNaN(parseFloat(ballLatitude)) ||
        !isNaN(parseFloat(ballLongitude)) ||
        !isNaN(parseFloat(goalLatitude)) ||
        !isNaN(parseFloat(goalLongitude)) ||
        !isNaN(parseFloat(goalDistance))) {
        throw new Error('Invalid input');
    }
    const ballPos = {
        lat: parseFloat(ballLatitude),
        lng: parseFloat(ballLongitude),
    };
    const goallPos = {
        lat: parseFloat(goalLatitude),
        lng: parseFloat(goalLongitude),
    };
    const result = (0, utils_1.checkGoal)(ballPos, goallPos, parseFloat(goalDistance));
    res.status(200).json({ result });
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
