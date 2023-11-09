const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Activity",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dificultad: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1, // Valor mínimo permitido
          max: 5, // Valor máximo permitido
        },
        allowNull: false,
      },
      duracion: {
        type: DataTypes.DECIMAL(5, 2), // 5 dígitos en total, 2 decimal
        allowNull: false,
      },
      temporada: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
