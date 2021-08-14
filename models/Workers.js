
module.exports = function(sequelize, DataTypes) {                                                         
  const Workers = sequelize.define("Workers", {
    workerID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
   timestamps: false
 });  

Workers.associate = (models) =>{
    Workers.belongsToMany(models.Jobs, {through: `${models.Worker_job}`});
  }

  return Workers;                                                                                          
};