const  Workers  = require("./Workers.js");
const  Jobs  = require("./Jobs.js");
module.exports = function(sequelize, DataTypes) {                                                    
      
  const Worker_job = sequelize.define("Worker_job", {
    recordID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    workerID: {                    
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Workers,
        key : 'workerID'
      }

    },
    jobID: {                    
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Jobs,
        key : 'jobID'
      }
    },
    startDate: {                    
      type: DataTypes.DATE,
      allowNull: false
    },
    hoursPerDay: {                    
      type: DataTypes.INTEGER,
      allowNull: false
    },
    salary: {                    
      type: DataTypes.FLOAT.UNSIGNED,
      allowNull: false
    }
  },{
   timestamps: false
 });  

Worker_job.associate = (models) =>{
    models.Jobs.belongsToMany(models.Workers, {through: models.Worker_job, foreignKey: 'jobID'});
    models.Workers.belongsToMany(models.Jobs, {through: models.Worker_job, foreignKey: 'workerID'});
  }


  return Worker_job;
}