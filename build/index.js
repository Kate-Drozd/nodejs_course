"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var cors = require('cors');
var mongoose = require('mongoose');
app.use(express_1.default.json());
app.use(cors());
var workersRoutes = require('./routes/workers');
var jobsRoutes = require('./routes/jobs');
var worker_jobRoutes = require('./routes/worker_job');
app.use("/workers/", workersRoutes);
app.use("/jobs/", jobsRoutes);
app.use("/worker_job/", worker_jobRoutes);
mongoose.connect('<YOUR LINK HERE>', {
    useNewUrlParser: true,
});
app.listen(3001, function () {
    console.log("Server is running on port 3001...");
});
