const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");


// Routers
const workersRouter = require("./routes/Workers");
app.use("/workers", workersRouter);
const jobsRouter = require("./routes/Jobs");
app.use("/jobs", jobsRouter);
const worker_jobRouter = require("./routes/Worker_job");
app.use("/worker_job", worker_jobRouter);

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}).catch(err=>console.log(err));;


