/**
 * Module dependencies.
 */

var env = process.env;

/**
 * Expose heroku helper
 */

module.exports = {
  port: env.PORT,
  mongoUrl: env.MONGO_URL,
  client: env.CLIENT_CONF ? env.CLIENT_CONF.split(',') : [ "organization name", "locale" ]
}