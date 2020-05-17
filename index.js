const Tweetur = require('./src/tweetur')
const { 
	SIGN_METHOD,
	OAUTH_VERSION,
	TWEETUR_CREDENTIALS,
	TWEETUR_KEYS_SCHEMA
} = require('./src/tweetur/config')

// export tweetur module
module.exports = Tweetur
exports.SIGN_METHOD = SIGN_METHOD
exports.OAUTH_VERSION = OAUTH_VERSION
exports.TWEETUR_CREDENTIALS = TWEETUR_CREDENTIALS
exports.TWEETUR_KEYS_SCHEMA = TWEETUR_KEYS_SCHEMA
