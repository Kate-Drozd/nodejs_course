
# Settings

1)npm init

2)npm i

3)fill your db connection string from Mongo Atlas in "./src/app.module.ts" file

4)npm run start:dev - starts the app.

# API 
 
Use 1-3 requests for DB fill with some records before using another requests

1. POST http://localhost:3000/workers/ 

Waiting for data in format like shown below:

{

        "id": "611f16caf902c90760466415",

        "firstName": "John",

		"lastName": "Snow"
    
}

2. POST http://localhost:3000/jobs

Waiting for data in format like shown below:

{

    "name": "Amazon"

}

3. POST http://localhost:3000/worker-job


Waiting for data in format like shown below:

{

     "workerID": "611f16caf902c90760466415",

     "jobID": "611f23dfdce37f0a78a7a6a9",

     "hoursPerDay": 4,

     "salary": 250
     
}

4. GET http://localhost:3000/workers - gets an array of all workers

5. GET http://localhost:3000/jobs - gets an array of all companies

6. GET http://localhost:3000/worker-job/ - gets an array of all jobs

7. PUT http://localhost:3000/workers/:id - PUT request for worker update. 

Waiting for data in format like shown below:

{

        "firstName": "John",

		"lastName": "Snow"
    
}

8. DELETE http://localhost:3000/workers/:id - delete a worker with given ID

9. GET http://localhost:3000/worker-job/statsWorker/:workerID - shows statistics for the worker

11. http://localhost:3000/worker-job/statsJob/:jobID - shows statistics for the job

12. DELETE http://localhost:3000/worker-job/statsJob/:id - fires a worker from job
