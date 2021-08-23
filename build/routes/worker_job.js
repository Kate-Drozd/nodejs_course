"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('express').Router;
var Worker_JobModel = require('../models/Worker_Job');
var router = Router();
router.post('/insert', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jobIDr, workerIDr, startDater, hoursPerDayr, salaryr;
    return __generator(this, function (_a) {
        jobIDr = req.body.jobID;
        workerIDr = req.body.workerID;
        startDater = new Date();
        hoursPerDayr = req.body.hoursPerDay;
        salaryr = req.body.salary;
        Worker_JobModel.aggregate([
            {
                $group: {
                    _id: "$workerID",
                    'hours': {
                        $sum: "$hoursPerDay"
                    }
                }
            },
        ])
            .exec(function (err, sum) { return __awaiter(void 0, void 0, void 0, function () {
            var total_hours, worker_job, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!err) return [3 /*break*/, 1];
                        res.send(err);
                        return [3 /*break*/, 7];
                    case 1:
                        total_hours = sum.find(function (item) { return item._id == workerIDr; });
                        if (!((parseInt(total_hours.hours) + hoursPerDayr) < 20)) return [3 /*break*/, 6];
                        worker_job = new Worker_JobModel({
                            workerID: workerIDr,
                            jobID: jobIDr,
                            startDate: Date.now(),
                            hoursPerDay: hoursPerDayr,
                            salary: salaryr,
                        });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, worker_job.save()];
                    case 3:
                        _a.sent();
                        res.send('inserted data');
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        console.log('It is forbidden to work > 20 hours per day');
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
router.get('/insertWorker_Job1', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var worker_job, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                worker_job = new Worker_JobModel({
                    workerID: '611f054705934c12f484de5a',
                    jobID: '611f23dfdce37f0a78a7a6a9',
                    startDate: Date.now(),
                    hoursPerDay: 7,
                    salary: 500,
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, worker_job.save()];
            case 2:
                _a.sent();
                res.send('inserted data');
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/insertWorker_Job2', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var worker_job2, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                worker_job2 = new Worker_JobModel({
                    workerID: '611f054705934c12f484de5a',
                    jobID: '612121479fbc8237d86bc172',
                    startDate: Date.now(),
                    hoursPerDay: 3,
                    salary: 200,
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, worker_job2.save()];
            case 2:
                _a.sent();
                res.send('inserted data');
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.log(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/insertWorker_Job3', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var worker_job2, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                worker_job2 = new Worker_JobModel({
                    workerID: '612120e35b403a3d30c6c5e7',
                    jobID: '612121479fbc8237d86bc172',
                    startDate: Date.now(),
                    hoursPerDay: 3,
                    salary: 200,
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, worker_job2.save()];
            case 2:
                _a.sent();
                res.send('inserted data');
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.log(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/statsWorker/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var wID;
    return __generator(this, function (_a) {
        wID = req.params.id;
        Worker_JobModel.find({ 'workerID': wID }, { '_id': 0, '__v': 0 }, function (err, result) {
            if (err) {
                res.send(err);
            }
            Worker_JobModel.aggregate([
                {
                    $group: {
                        _id: "$workerID",
                        'total salary for given workerID': {
                            $sum: "$salary"
                        }
                    }
                }
            ], function (err, sum) {
                if (err) {
                    res.send(err);
                }
                else {
                    var total_Salary_for_worker = sum.find(function (item) { return item._id == wID; });
                    res.send({ result: result, total_Salary_for_worker: total_Salary_for_worker });
                }
            });
        });
        return [2 /*return*/];
    });
}); });
router.get('/statsJob/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jID;
    return __generator(this, function (_a) {
        jID = req.params.id;
        Worker_JobModel.find({ 'jobID': jID }, { '_id': 0, '__v': 0 }, function (err, result) {
            if (err) {
                res.send(err);
            }
            Worker_JobModel.aggregate([
                // { $match: { 'jobID': jID}},
                {
                    $group: {
                        _id: "$jobID",
                        'total salary for given jobID': {
                            $sum: "$salary"
                        }
                    }
                },
            ])
                .exec(function (err, sum) {
                if (err) {
                    res.send(err);
                }
                else {
                    var total_Salary_for_job = sum.find(function (item) { return item._id == jID; });
                    res.send({ result: result, total_Salary_for_job: total_Salary_for_job });
                }
            });
        });
        return [2 /*return*/];
    });
}); });
router.delete('/delete/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Worker_JobModel.findByIdAndRemove(id).exec()];
            case 1:
                _a.sent();
                res.send('deleted');
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
