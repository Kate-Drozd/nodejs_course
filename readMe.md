
# Settings

1)npm init

2)npm i

3)fill your db connection string from Mongo Atlas in "index.ts" file, mongoose.connect method

4)npm run devStart - starts the app.

# API 
 
1-7 requests are for DB fill with some records

1. http://localhost:3001/workers//insertWorker1 

2. http://localhost:3001/workers//insertWorker2 

3. http://localhost:3001/jobs//insertJob1

4. http://localhost:3001/jobs//insertJob2

5. http://localhost:3001/worker_job/insertWorker_Job1

6. http://localhost:3001/worker_job/insertWorker_Job2

7. http://localhost:3001/worker_job/insertWorker_Job3

8. http://localhost:3001/workers/read - gets an array of all workers

9. http://localhost:3001/workers//update - PUT request for worker update. 

Waiting for data in format like shown below:

{

        "id": "611f16caf902c90760466415",

        "firstName": "John",

		"lastName": "Snow"
    
}

10. http://localhost:3001/workers/delete/:id - delete the worker with given in params id

11. http://localhost:3001/worker_job/statsWorker/:workerID- shows statistics for the worker

12. http://localhost:3001/worker_job/statsJob/:jobID - shows statistics for the job

13. http://localhost:3001/worker_job/insert - Create a job for worker, checks if the worker try to have a new job and working hours summary isn't greater then 20. 

Waiting for data in format like shown below:

{

        "workerID": "611f054705934c12f484de5a",

		"jobID": "611f23dfdce37f0a78a7a6a9",

		"hoursPerDay": 8,

		"salary": 550
    
}

14. http://localhost:3001/worker_job/delete/:id - fires a worker from work
