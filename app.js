const express = require('express');
const app = express();
const bodyParser = require ('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');
const hbs = require("hbs");

const db = mysql.createPool({
  database: 'work',
  host: "localhost",
  user: "root",
  password: "",
});

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true,
  })
);
app.use(express.static(__dirname   + "/" ));
app.set("view engine", "hbs");

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/getStatsForWorker/:workerID",(req,res) => {
	const id = req.params.workerID;
	const idt = req.params.workerID;
	const sqlSelect = "select jobs.name, worker_job.startDate, worker_job.salary, if (@i:=@i+1 < 2, (select sum(salary) from worker_job where workerID = ?), null) as 'Общая ЗП по всем работам' from worker_job join (select @i:=0) as c join jobs on worker_job.jobID = jobs.jobID where workerID = ? " ; 
	db.query(sqlSelect , [id, idt], (err, result)=>{
     if (err) {
      console.log(err);
    }
		res.send(result);
		    
	})
});

app.get("/api/getStatsForJob/:jobID",(req,res) => {
	const id = req.params.jobID;
	const id2 = req.params.jobID;
	const sqlSelect = "select workers.firstName, workers.lastName, worker_job.startDate, worker_job.salary, if (@i:=@i+1 < 2, (select sum(salary) from worker_job where jobID = ?), null) as 'Общая ЗП по всем работникам' from work.worker_job join (select @i:=0) as c join work.workers on worker_job.workerID = workers.workerID where jobID = ?;" ; 
	db.query(sqlSelect ,[id, id2], (err, result)=>{
     if (err) {
      console.log(err);
    }
		res.send(result);
    
	})
});

app.post("/api/insert",(req,response) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const name = req.body.name;
	const date = new Date();
	const hours = req.body.hours;
	const salary = req.body.salary;
	const sqlCheckHours = "select sum(hoursPerDay) as 'hoursSum' from worker_job join workers on worker_job.workerID = workers.workerID where firstName = ? and lastName = ? " ;
	db.query(sqlCheckHours, [firstName, lastName], (error, result) => {
		if (error) {
					console.log(error);
				}
		if (result[0].hoursSum + hours < 20) {
			const sqlInsert = "insert into worker_job (workerID, jobID, startDate, hoursPerDay, salary) select workerid, jobid, ?, ?, ? from workers, jobs where firstname = ? and LastName = ? and name = ?;";
			db.query(sqlInsert, [date, hours, salary, firstName, lastName, name], (err, res)=>{
				if (err) {
					console.log(err);
				}
				response.send(res);
			})
		} else {
			console.error('Нельзя работать более 20 часов в сутки');
		}
	})
});

app.delete("/api/delete/:id", (req,res)=>{
  const id = req.params.id;
  const sqlDelete = "DELETE FROM worker_job WHERE recordID = ?";
  db.query(sqlDelete, id, (err,result)=>{
    if (err){console.log(err)}
      else {
        res.send(result);
      }
  })
});
  
app.get("/", (req,res)=>{
	res.render("insertJob.hbs")
})

app.listen(3001, () => {
console.log("running on port 3001");
});