module.exports = {
  AUTH0_DOMAIN: '[AUTHO_DOMAIN]', // e.g., kmaida.auth0.com
  AUTH0_API_AUDIENCE: '[http://localhost:8083/api/]', // e.g., 'http://localhost:8083/api/'
  MONGO_URI: process.env.MONGO_URI || 'MONGO_DB_CLOUD_URI'
};
