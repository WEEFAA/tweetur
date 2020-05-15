let request = require('request')
let btoa = require("btoa")
let qs = require('query-string')

const oauthSignature = require('oauth-signature')
// @utilities
const { 
	evaluateArgs, generateSignature, checkAuth,
	checkParams, generateUrl, validateAndGetProperties
} = require('./utils')
// config
const { TWEETUR_CREDENTIALS } = require('./config')


function Tweetur(user_credentials){
	const properties = validateAndGetProperties(user_credentials)
	this.credentials = properties || {}
	this.bearer_token = null
	this.basic_token = ""
}


// ver 1.2.1 prototype structure

Tweetur.prototype.authenticate = function(callback){
	return new Promise((resolve, reject) => {
		try{
			// check auth credentials
			checkAuth("credentials", { ...this.credentials })
			// test args
			const evaluationOpts = { allowFirstArgAsCallback: true }
			const hasCallback = evaluateArgs(arguments, evaluationOpts)
			// create a basic token 
			this.basic_token = btoa(this.credentials.consumer_key+":"+ this.credentials.consumer_secret)
			// request for a bearer token
			request.post({
				url:"https://api.twitter.com/oauth2/token",
				headers:{
					"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
					"Authorization": "Basic " + this.basic_token
				},
				body: "grant_type=client_credentials"
			}, (err,response,body) => {
				if(err){
					if(hasCallback) return callback(err, {})
					return reject(err)
				}
				let data = JSON.parse(body) // parse data
				// set instance access_token
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


Tweetur.prototype.userTimeline = function(params,callback){
	const api_endpoint_info = "USERTIMELINE"
	return new Promise((resolve, reject) => {
		try{
			// check bearer token
			checkAuth(null, { access_token: this.bearer_token })
			// test args
			const hasCallback = evaluateArgs(arguments)
			// check params
			checkParams(api_endpoint_info, params)
			this.get(api_endpoint_info, params, (err,response,body) => {
				if(err){
					if(hasCallback) return callback(err, {})
					return reject(e)
				}
				const data = JSON.parse(body)
				// return data
				if(hasCallback) return callback(null, data)
				return resolve(data)
			})
		}catch(e){
			reject(e)
		}
	})
}

//followers
Tweetur.prototype.followersList = function(params,callback){
	const api_endpoint_info = "FOLLOWERSLIST"
	return new Promise((resolve, reject) => {
		try{
			// check bearer token
			checkAuth(null, { access_token: this.bearer_token })
			// test args
			const hasCallback = evaluateArgs(arguments)
			// check params
			checkParams(api_endpoint_info, params)
			this.get(api_endpoint_info, params, (err,response,body) => {
				if(err){
					if(hasCallback) return callback(err, {})
					return reject(e)
				}
				const data = JSON.parse(body)
				// return data
				if(hasCallback) return callback(null, data)
				return resolve(data)
			})
		}catch(e){
			reject(e)
		}
	})
}



Tweetur.prototype.friendsList = function(params,callback){
	const api_endpoint_info = "FRIENDSLIST"
	return new Promise((resolve, reject) => {
		try{
			// check bearer token
			checkAuth(null, { access_token: this.bearer_token })
			// test args
			const hasCallback = evaluateArgs(arguments)
			// check params
			checkParams(api_endpoint_info,params)
			this.get(api_endpoint_info, params, (err,response,body) => {
				if(err){
					if(hasCallback) return callback(err, {})
					return reject(e)
				}
				const data = JSON.parse(body)
				// return data
				if(hasCallback) return callback(null, data)
				return resolve(data)
			})
		}catch(e){
			reject(e)
		}
	})
}

Tweetur.prototype.followersIds = function(params,callback){
	const api_endpoint_info = "FOLLOWERSIDS"
	return new Promise((resolve, reject) => {
		try{
			// check bearer token
			checkAuth(null, { access_token: this.bearer_token })
			// test args
			const hasCallback = evaluateArgs(arguments)
			// check params
			checkParams(api_endpoint_info, params)
			this.get(api_endpoint_info, params, (err,response,body) => {
				if(err){
					if(hasCallback) return callback(err, {})
					return reject(e)
				}
				const data = JSON.parse(body)
				// return data
				if(hasCallback) return callback(null, data)
				return resolve(data)
			})
		}catch(e){
			reject(e)
		}
	})
}

Tweetur.prototype.friendsIds = function(params,callback){
	const api_endpoint_info = "FRIENDSIDS"
	return new Promise((resolve, reject) => {
		try{
			// check bearer token
			checkAuth(null, { access_token: this.bearer_token })
			// test args
			const hasCallback = evaluateArgs(arguments)
			// check params
			checkParams(api_endpoint_info, params)
			this.get(api_endpoint_info, params, (err,response,body) => {
				if(err){
					if(hasCallback) return callback(err, {})
					return reject(e)
				}
				const data = JSON.parse(body)
				// return data
				if(hasCallback) return callback(null, data)
				return resolve(data)
			})
		}catch(e){
			reject(e)
		}
	})
}

Tweetur.prototype.usersLookUp = function(params,callback){
	const api_endpoint_info = "USERSLOOKUP"
	return new Promise((resolve, reject) => {
		try{
			// check bearer token
			checkAuth(null, { access_token: this.bearer_token })
			// test args
			const hasCallback = evaluateArgs(arguments)
			// check params
			checkParams(api_endpoint_info,params)
			this.get("USERSLOOKUP",params,(err,response,body) => {
				if(err){
					if(hasCallback) return callback(err, {})
					return reject(e)
				}
				const data = JSON.parse(body)
				// return data
				if(hasCallback) return callback(null, data)
				return resolve(data)
			})
		}catch(e){
			reject(e)
		}
	})
}

Tweetur.prototype.userShow = function(params,callback){
	const api_endpoint_info = "USERSSHOW"
	return new Promise((resolve, reject) => {
		try{
			// check bearer token
			checkAuth(null, { access_token: this.bearer_token })
			// test args
			const hasCallback = evaluateArgs(arguments)
			// check params 
			checkParams(api_endpoint_info, params)
			this.get(api_endpoint_info, params, (err,response,body) => {
				if(err){
					if(hasCallback) return callback(err, {})
					return reject(e)
				}
				const data = JSON.parse(body)
				// return data
				if(hasCallback) return callback(null, data)
				return resolve(data)
			})
		}catch(e){
			reject(e)
		}
	})
}

Tweetur.prototype.checkLimit = function(params,callback){
	const api_endpoint_info = "CHECKLIMIT"
	return new Promise((resolve, reject) => {
		try{
			// check bearer token
			checkAuth(null, { access_token: this.bearer_token })
			// test args
			const hasCallback = evaluateArgs(arguments)
			// check params
			checkParams(api_endpoint_info, params)
			this.get(api_endpoint_info, params, (err,response,body) => {
				if(err){
					if(hasCallback) return callback(err, {})
					return reject(e)
				}
				const data = JSON.parse(body)
				// return data
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
			const evaluationOpts = {
				allowFirstArgAsCallback: true,
				credentials: { access_token: this.bearer_token }
			}
			const hasCallback = evaluateArgs(arguments,evaluationOpts)
			// tested signature invocation
			const timestamp = Math.round(Date.now() / 1000)
			const url = "https://api.twitter.com/oauth2/invalidate_token",
			parameters = {
				oauth_consumer_key: this.credentials.consumer_key,
				oauth_token: this.credentials.access_token,
				oauth_nonce: btoa(this.credentials.consumer_key + ":" + timestamp),
				oauth_timestamp: timestamp,
				oauth_signature_method: "HMAC-SHA1",
				oauth_version: "1.0",
				access_token: this.bearer_token
			},
			method = "POST",
			consumerSecret = this.credentials.consumer_secret,
			token_secret = this.credentials.access_token_secret,
			encodeSignature = true

			const signature = oauthSignature.generate(method, url, parameters, consumerSecret, token_secret, { encodeSignature })
			// authorization header
			const authHeader = 'OAuth oauth_consumer_key="' + parameters.oauth_consumer_key + '", ' +
		   	'oauth_nonce="' + parameters.oauth_nonce + '", ' +
		   	'oauth_signature="' + signature + '", ' +
		    'oauth_signature_method="' + parameters.oauth_signature_method + '", ' + 
		    'oauth_timestamp="' + parameters.oauth_timestamp + '", ' +
		    'oauth_token="' + parameters.oauth_token + '", ' + 
		    'oauth_version="' + parameters.oauth_version + '"'
			// request for to revoke access_token
			request.post({
				url: `${url}?access_token=${this.bearer_token}`,
				headers:{ "Authorization": authHeader }
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


Tweetur.prototype.get = function(endpoint,params,cb){
	let url = ''
	switch(endpoint){
		case "USERTIMELINE":
			url = "https://api.twitter.com/1.1/statuses/user_timeline.json"
			break
		case "FOLLOWERSLIST":
			url = "https://api.twitter.com/1.1/followers/list.json"
			break
		case "FRIENDSLIST":
			url = "https://api.twitter.com/1.1/friends/list.json"
			break
		case "FOLLOWERSIDS":
			url = "https://api.twitter.com/1.1/followers/ids.json"
			break
		case "FRIENDSIDS":
			url = "https://api.twitter.com/1.1/friends/ids.json"
			break
		case "USERSSHOW":
			url = "https://api.twitter.com/1.1/users/show.json"
			break
		case "CHECKLIMIT":
			url = "https://api.twitter.com/1.1/application/rate_limit_status.json"
			let resources = params.resources || []
			params.resources = resources.join(",")
			break
		case "USERSLOOKUP":
			url = "https://api.twitter.com/1.1/users/lookup.json"
			if(params.user_id){
				params.user_id = params.user_id.join(",")
			}else if(params.screen_name){
				params.screen_name = params.screen_name.join(",")
			}
			break
		default:
			url = ''
	}
	//make the request when the filter data are all ready
	request({
		url,
		headers:{
			"Authorization": "Bearer " + this.bearer_token
		},
		qs:params
	},(err,response,body) => {
		cb(err,response,body)
	})
}

Tweetur.prototype.api = function(endpoint, params = {}, callback){
	return new Promise((resolve, reject) => {
		try{
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
				const data = JSON.parse(body)
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
	const { api_version, sub } = this.credentials
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


Tweetur.prototype._handler = function(err,statusCode,errCallback){
	if(err != null){
		return errCallback(true,err)
	}

	switch(statusCode){
		case 400:
			errCallback(true,"SOMETHING WENT WRONG")
			break
		case 404:
			errCallback(true,"NOT FOUND")
			break
		case 403:
			errCallback(true,"FORBIDDEN")
			break
		case 200:
			errCallback(false,"STATUS OK!")
			break
		default:
			errCallback(true,statusCode)
	}
}



module.exports = Tweetur
