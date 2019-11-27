module.exports = function(sequelize, DataTypes) {
    var Eat = sequelize.define("Eat", {
      timeStart: {
        type: DataTypes.STRING,
        allowNull: false,
           
      },
      timeEnd: {
        type: DataTypes.STRING,
        allowNull: false,          
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,          
      },
      duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,           
      },
    })
    return Eat;
  };
  