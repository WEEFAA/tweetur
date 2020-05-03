const oauthSignature = require('oauth-signature')

// @utilities for tweetur module

function evaluateArgs(args, opts = {}){
	let hasCallback = true
	const { allowFirstArgAsCallback = false } = opts
	// errors
	const callbackErr = new TypeError("Callback function invalid")
	const paramsErr = new TypeError("Parameter passed was invalid")
	// check if the callback is omitted 
	switch(args.length){
		case 2: 
			// fn(params, callback){...}
			const [params, callback] = args
			//check if params is a valid object and callback is a valid function
			const pType = typeof params 
			const cType = typeof callback
			if( (pType !== "object" || Array.isArray(params) )){
				throw paramsErr
			}
			if(cType !== "function"){
				throw callbackErr
			}
			break
		case 1:
			if(allowFirstArgAsCallback){
				// fn(callback){...}
				const [callback] = args 
				const cType = typeof callback 
				// check if callback is a valid function
				if(cType !== "function"){
					throw callbackErr
				}
			}else{
				// fn(params){...}
				const [params] = args 
				// callback omitted, first argument is the parameters
				// check if it's a valid object
				const pType = typeof params
				if(pType !== "object" || Array.isArray(params)){
					throw paramsErr 
				}
				hasCallback = false
			}
			break
		case 0:
			if(allowFirstArgAsCallback){
				// this indicates that callback is optional
				hasCallback = false
				break
			}
			// otherwise, this is not allowed
			throw new SyntaxError("Parameter is required")
			break
		default:
			throw new SyntaxError("Expects 1 or 2 passed parameter")
	}
	// return a boolean if the function is invoked with a callback
	return hasCallback
}

function checkAuth(mode = "default", credentials = {}){
	// check authentication state
	switch(checkAuth){
		case "credentials":
			// check consumer_key & consumer_secret on authentication
			const { consumer_key, consumer_secret } = credentials 
			const keyType = typeof consumer_key
			const secretType = typeof consumer_secret
			if(!consumer_key || !consumer_secret || keyType !== "string" || secretType !== "string" ){
				throw new Error("CREDENTIALS NOT VALID")
			}
			break
		default: // auth required
			// check access token
			const { access_token } = credentials
			if(!access_token || typeof access_token !== "string"){
				throw new Error("Access Token Invalid")
			}
	}
}

function generateSignature(opt){
	const {
		method = 'POST', 
		url = "",
		parameters = {},
		consumer_secret = "", // consumer_secret
		token_secret = "" // access_token_secret
	} = opt 
	console.log(opt)
	return oauthSignature.generate(method, url, parameters, consumer_secret, token_secret)
}

exports.generateSignature = generateSignature
exports.evaluateArgs = evaluateArgs
exports.checkAuth = checkAuth