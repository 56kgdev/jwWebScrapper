'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movies.init({
    jw_entity_id: DataTypes.STRING,
    title: DataTypes.STRING,
    full_path: DataTypes.TEXT,
    year: DataTypes.STRING,
    type: DataTypes.STRING,    
    platform: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};