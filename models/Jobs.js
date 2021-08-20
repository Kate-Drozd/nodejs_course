
module.exports = function(sequelize, DataTypes) {                                                    
      
  const Jobs = sequelize.define("Jobs", {
    jobID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
   timestamps: false
 });  
 


  return Jobs;
}  