const SequelizeLib = require("../../services/sequelize").SequelizeLib;
const DataTypes = require("sequelize").DataTypes;
const boom = require("@hapi/boom");

const seq = new SequelizeLib();

const MovieModel = (sequelize) => {
  return sequelize.define(
    "Movies",
    {
      jw_entity_id: DataTypes.STRING,
      title: DataTypes.STRING,
      full_path: DataTypes.TEXT,
      year: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );
};

const MovieMonetizationModel = (sequelize) => {
  return sequelize.define(
    "MovieMonetizations",
    {
      movie_id: DataTypes.INTEGER,
      platform: DataTypes.STRING,
      monetization_type: DataTypes.STRING,
      format: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );
};

const findMovieByJwId = async (jwid) => {
  const db = await seq.connection();
  return new Promise((resolve, reject) => {
    MovieModel(db)
      .findOne({
        where: {
          jw_entity_id: jwid,
        },
      })
      .then((res) => {
        if (!res) resolve(false);

        resolve(res);
      });
  });
};

const findMovieMonByJwId = async (id, platform) => {
  const db = await seq.connection();
  return new Promise((resolve, reject) => {
    MovieMonetizationModel(db)
      .findOne({
        where: {
          movie_id: id,
          platform,
        },
      })
      .then((res) => {
        if (!res) resolve(false);

        resolve(res);
      });
  });
};

const createMovie = async (movie) => {
  const db = await seq.connection();
  return new Promise(async (resolve, reject) => {
    const exists = await findMovieByJwId(movie.jw_entity_id);
    if (!exists) {
      MovieModel(db)
        .create({
          jw_entity_id: movie.jw_entity_id,
          title: movie.title,
          full_path: movie.full_path,
          year: movie.year,
          type: movie.type,
        })
        .then(async (response) => {
          if (response) {
            const a = await Promise.all(
              movie.offers.map(async (offer) => {
                MovieMonetizationModel(db)
                  .create({
                    movie_id: response.id,
                    platform: offer.package_short_name,
                    monetization_type: offer.monetization_type,
                    format: offer.presentation_type,
                  })
                  .then(async (r) => {
                    await db.close();
                  });
              })
            );
            resolve(a);
          } else {
            resolve(boom.internal());
          }
        })
        .catch((err) => {
          console.log(err);
          reject(boom.internal());
        });
    } else {
      const a = await Promise.all(
        movie.offers.map(async (offer) => {
          const offerExists = await findMovieMonByJwId(
            exists.id,
            offer.package_short_name
          );
          if (!offerExists) {
            MovieMonetizationModel(db)
              .create({
                movie_id: exists.id,
                platform: offer.package_short_name,
                monetization_type: offer.monetization_type,
                format: offer.presentation_type,
              })
              .then(async (r) => {
                await db.close();
              });
          }
        })
      );
      resolve(a);
    }
  });
};

const createMovieMonetization = async (movie) => {
  const db = await seq.connection();
  return new Promise((resolve, reject) => {
    MovieMonetizationModel(db)
      .create(movie)
      .then(async (response) => {
        await db.close();
        if (response) {
          resolve(response);
        } else {
          resolve(boom.internal());
        }
      })
      .catch((err) => {
        console.log(err);
        reject(boom.internal());
      });
  });
};

const getMovies = async () => {
  const db = await seq.connection();
  return new Promise((resolve, reject) => {
    MovieModel(db)
      .findAll()
      .then((response) => {
        if (response) {
          resolve(response);
        } else {
          resolve(boom.internal());
        }
      });
  });
};

module.exports = {
  createMovie,
  createMovieMonetization,
  getMovies,
};
