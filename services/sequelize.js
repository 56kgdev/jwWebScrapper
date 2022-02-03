const seq = require("sequelize");
const config = require("config");
const boom = require("@hapi/boom");

class SequelizeLib {
constructor() {
    this.sequelize = new seq.Sequelize(
      config.get("DATABASEPROD.database"),
      config.get("DATABASEPROD.username"),
      config.get("DATABASEPROD.password"),
      {
        host: config.get("DATABASEPROD.host"),
        dialect: config.get("DATABASEPROD.dialect"),
      }
    );
  }

  async connection() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
      return this.sequelize;
    } catch (error) {
      return boom.badData(`Unable to connect to the database: ${error}`);
    }
  }
}

module.exports = {
  SequelizeLib,
};
