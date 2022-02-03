"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MovieMonetization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MovieMonetization.init(
    {
      movie_id: DataTypes.INTEGER,
      platform: DataTypes.STRING,
      monetization_type: DataTypes.STRING,
      format: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MovieMonetizations",
    }
  );
  return MovieMonetization;
};
