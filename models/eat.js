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
      username: {
        type: DataTypes.STRING,
        allowNull: false,           
      },
    })
    return Eat;
  };
  