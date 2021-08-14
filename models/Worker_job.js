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
      allowNull: false
    },
    jobID: {                    
      type: DataTypes.INTEGER,
      allowNull: false
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



  return Worker_job;
}