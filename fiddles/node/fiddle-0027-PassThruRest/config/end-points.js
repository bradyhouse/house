module.exports = {
  passthru: require('../server/services/pass-thru.js'),
  info: {
    gen: require('../server/services/info/gen.js'),
    poll: require('../server/services/info/poll.js')
  },
  health: require('../server/services/health.js')
};