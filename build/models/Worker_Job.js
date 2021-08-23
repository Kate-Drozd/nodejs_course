"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var Worker_JobSchema = new mongoose_1.default.Schema({
    workerID: {
        type: Schema.Types.ObjectId,
        ref: 'Workers',
        required: true,
    },
    jobID: {
        type: Schema.Types.ObjectId,
        ref: 'Jobs',
        required: true,
    },
    startDate: {
        type: Date, default: Date.now,
        required: true,
    },
    hoursPerDay: {
        type: Number,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
});
var Worker_Job = mongoose_1.default.model('worker_job', Worker_JobSchema);
module.exports = Worker_Job;
