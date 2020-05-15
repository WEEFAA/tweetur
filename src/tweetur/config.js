
// parameters for instancing Tweetur Class
// credential: <type>
exports.TWEETUR_CREDENTIALS = {
	consumer_key: "string", 
	consumer_secret: "string",
	access_token: "string",
	access_token_secret: "string"
}

// Tweetur credentials and keys
exports.TWEETUR_KEYS_SCHEMA = {
	consumer_key: {
		type: "string",
		required: true
	},
	consumer_secret: {
		type: "string",
		required: true
	},
	access_token: {
		type: "string",
		required: true
	},
	access_token_secret: {
		type: "string",
		required: true
	},
	sub: {
		type: "string",
		required: false,
		default: 'api', // default twitter sub domain for accessing API
		regexp: new RegExp(/^\w+-*\w*$/, 'i')
	},
	api_version: {
		type: "string",
		required: false,
		default: '1.1', // default twitter api version
		regexp: new RegExp(/^\d+\.{0,1}\d*(\d+\.{0,1})*$/)
	}
}