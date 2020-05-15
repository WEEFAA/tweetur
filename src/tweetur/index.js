const request = require('request')
const qs = require('query-string')
const OAuth = require('oauth-1.0a')
const crypto = require('crypto')
// @utilities
const { 
	evaluateArgs, generateSignature, checkAuth,
	generateUrl, validateAndGetProperties
} = require('./utils')
// config
const { TWEETUR_CREDENTIALS, SIGN_METHOD, OAUTH_VERSION } = require('./config')

// OAuth Client generator
function getClient(credentials){
	return OAuth({
		version: OAUTH_VERSION,
		consumer: { ...credentials }, // TWITTER APP KEYS
		signature_method: SIGN_METHOD, // TWITTER SIGN METHOD
		hash_function(base_string, key){
			return crypto.createHmac('sha1', key)
				.update(base_string)
				.digest('base64')
		}
	})
}


function Tweetur(user_credentials){
	const keys = validateAndGetProperties(user_credentials)
	this.app = keys || {}
	this.oauth = getClient({ key: keys.consumer_key, secret: keys.consumer_secret })
	this.bearer_token = null
}

// ver 1.2.1 prototype structure

Tweetur.prototype.authenticate = function(callback){
	return new Promise((resolve, reject) => {
		try{
			// check auth credentials
			checkAuth("credentials", { ...this.app })
			// test args
			const evaluationOpts = { allowFirstArgAsCallback: true }
			const hasCallback = evaluateArgs(arguments, evaluationOpts)
			// generate basic token using Buffer
			const { consumer_key, consumer_secret } = this.app 
			const basic_token = Buffer.from(consumer_key + ":" + consumer_secret).toString('base64')
			// request data 
			const request_data = {
				method: "POST",
				url: "https://api.twitter.com/oauth2/token", // auth url 
				body: "grant_type=client_credentials",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					authorization: 'Basic ' + basic_token 
				}
			}
			// execute request, auythenticate.
			// request for a bearer token
			request.post(request_data, (err,response,body) => {
				if(err){
					if(hasCallback) return callback(err, {})
					return reject(err)
				}
				let data = JSON.parse(body) // parse data
				// bind access_token
				this.bearer_token = data.access_token 
				// return data through calling callback or return a promise
				if(hasCallback) return callback(null, data)
				return resolve(data)
			})
		}catch(e){
			reject(e)
		}
	})
}


Tweetur.prototype.revoke = function(callback){
	return new Promise((resolve, reject) => {
		try{
			const revokeUrl = "https://api.twitter.com/oauth2/invalidate_token"
			// check if required parameters are passed
			checkAuth(null, { access_token: this.bearer_token })
			// test arguments
			const evaluationOpts = {
				allowFirstArgAsCallback: true,
				credentials: { access_token: this.bearer_token }
			}
			const hasCallback = evaluateArgs(arguments,evaluationOpts)
			// app tokens
			const tokens = {
				key: this.app.access_token, 
				secret: this.app.access_token_secret
			}
			// request data 
			const request_data = {
				method: 'POST',
				url: revokeUrl + "?access_token=" + this.bearer_token
			}
			// request to revoke current access_token<bearer type>
			const prev_bearer = this.bearer_token
			request({
				...request_data,
				headers: this.oauth.toHeader(this.oauth.authorize(request_data, tokens))
			},(err,response,body) => {
				if(err){
					if(hasCallback) return callback(err, {})
					return reject(err)
				}	
				const data = JSON.parse(body) // parse body
				// return data through calling callback or return a promise
				if(hasCallback) return callback(null, data)
				return resolve(data)
			})
		}catch(e){
			reject(e)
		}
	})
}

Tweetur.prototype.api = function(endpoint, params = {}, callback){
	return new Promise((resolve, reject) => {
		try{
			const endsWithJSON = /.json$/
			// check bearer token
			checkAuth(null, { access_token: this.bearer_token })
			// test args
			const hasCallback = evaluateArgs(arguments)
			this._request_api(endpoint, params, function(err,resp,body){
				if(err){
					// request error
					if(hasCallback) return callback(err, {})
					return reject(e)
				}
				const data = endsWithJSON.test(endpoint) ? JSON.parse(body) : body
				// return data
				if(hasCallback) return callback(null, data)
				return resolve(data)
			})
		}catch(e){
			reject(e)
		}
	})
}

Tweetur.prototype._request_api = function(endpoint, params, callback){
	// url information
	const host = "twitter.com"
	const { api_version, sub } = this.app
	// request paramters
	const query = qs.stringify(params, { arrayFormat: 'comma' })
	const url = generateUrl(sub, host, api_version, endpoint) + "?" + query 
	const headers = { "Authorization": "Bearer " + this.bearer_token }
	// make a request to Twitter API 
	// including access_token<bearer> on request header as Bearer
	request({ url, headers },(err,response,body) => {
		callback(err,response,body)
	})
}

module.exports = Tweetur
