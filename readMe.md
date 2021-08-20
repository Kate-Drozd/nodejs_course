# MySQL settings

1)npm init
2)npm i
3)fill your password in app.js:13
4)import  db_dump.sql in your workbench
5)node app.js
http://localhost:3001/api/getStatsForWorker/:workerID - shows statistics for the worker
http://localhost:3001/api/getStatsForJob/:jobID - shows statistics for the company
http://localhost:3001/ - form for insertion a new job for the worker
http://localhost:3001//api/delete/:id - delete job

# Sequelize settings
1)npm init
2)npm i
3)fill your db password in config/config.json
4)create the db with name "work2" in your mysql workbench
5)node appForSequelize.js
6) repeat step 5 after uncomment all the code in routes directory. it will create some records in db to work with. If you uncomment code before step 5 it will make "create" db functions and "define" db functions run at the same time, this will cause errors.

http://localhost:3000/worker_job/insert - insert a new job for the worker. If you want to see in what format post the data - look at post.jpg
http://localhost:3000/worker_job/delete/:recordID - delete job
http://localhost:3000/worker_job/StatsForWorker/:workerID - shows statistics for the worker
http://localhost:3000/worker_job/StatsForJob/:jobID - shows statistics for the company
http://localhost:3000/worker_job/ - shows all the records in Worker_job table
http://localhost:3000/workers/ - shows all the records in Workers table
http://localhost:3000/jobs/ - shows all the records in Jobs table