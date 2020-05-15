// config/resource/assets
const { TWEETUR_KEYS_SCHEMA } = require('./config')

// @utilities for tweetur module

function evaluateArgs(args, opts = {}){
	let hasCallback = true
	const { allowFirstArgAsCallback = false } = opts
	// errors
	const callbackErr = new TypeError("Expects callback function<function>")
	const paramsErr = new TypeError("Expects parameter as an object<object> containing key:value pairs defined on twitter documentation")
	const endpointErr = new TypeError("Expects first parameter as a endpoint<string:not_null>!")
	// expected parameters
	const [endpoint, params, callback] = args
	const eType = typeof endpoint 
	const pType = typeof params
	const cType = typeof callback
	switch(args.length){
		case 3:
			// fn(endpoint, params, callback)
			// check all parameters type 
			if(eType !== "string" || endpoint === "") throw endpointErr
			if(pType !== "object" || Array.isArray(params)) throw paramsErr
			if(cType !== "function") throw callbackErr
			break
		case 2: 
			// fn(endpoint, params){...}
			// check if endpoint and params are valid according to desired types
			if(eType !== "string" || endpoint === "") throw endpointErr
			if(pType !== "object" || Array.isArray(params)) throw paramsErr
			// no callback
			hasCallback = false
			break
		case 1:
			// fn(callback){...} OR fn(endpoint) 
			// check if passed parameter is valid according to its context
			if(allowFirstArgAsCallback){ 
				// in this case, first parameter should be the callback
				if(typeof args[0] !== "function") throw callbackErr
				return hasCallback = true
			}
			if(eType !== "string" || endpoint === "") throw endpointErr
			hasCallback = false
			break
		case 0:
			if(allowFirstArgAsCallback){
				// unique to some methods, optional callback i.e. authenticating
				hasCallback = false
				break
			}
			// otherwise, this is not allowed
			throw new SyntaxError("Expects at least 1 parameter<string:endpoint>")
			break
		default:
			throw new SyntaxError("Unexpected length of passed parameters")
	}
	// return a boolean if the function is invoked with a callback
	return hasCallback
}

function checkAuth(mode = "default", credentials = {}){
	// check authentication state
	const { consumer_key, consumer_secret, access_token, access_token_secret } = credentials 
	switch(checkAuth){
		case "credentials":
			// check consumer_key & consumer_secret on authentication
			const keyType = typeof consumer_key
			const secretType = typeof consumer_secret
			const aType = typeof access_token
			const aSType = typeof access_token_secret
			if(!consumer_key || !consumer_secret || !access_token || !access_token_secret || 
				keyType !== "string" || secretType !== "string" || aType !== "string" || aSType !== "string"){
				throw new Error("CREDENTIALS NOT VALID")
			}
			break
		default: // auth required
			// check access token
			if(!access_token || typeof access_token !== "string"){
				throw new Error("Access Token Invalid")
			}
	}
}

function generateUrl(sub, host, api_version, endpoint){
	// check if given endpoint does not contain '/' prefix
	if(!/^\//.test(endpoint)){
		api_version = api_version + "/" // add '/' prefix
	}

	return encodeURI("https://" + sub + "." + host + "/" + api_version + endpoint)
}

function validateAndGetProperties(keys = {}){
	//if 'keys' is an array, reject
	if(Array.isArray(keys)) throw new Error("Expects an object<object> as a parameter")
	// check each tweetur property
	const tweetur_keys = Object.keys(TWEETUR_KEYS_SCHEMA)
	for(let tweetur_property of tweetur_keys){
		const tweetur_property_type = TWEETUR_KEYS_SCHEMA[tweetur_property].type
		const regexp  = TWEETUR_KEYS_SCHEMA[tweetur_property].regexp
		if(TWEETUR_KEYS_SCHEMA[tweetur_property].required){
			if(!keys.hasOwnProperty(tweetur_property) 
			&& typeof keys[tweetur_property] !== tweetur_property_type){
				throw new Error("Expects key of '"+ tweetur_property +"' with type of <"+ tweetur_property_type +">")
			}else if(keys.hasOwnProperty(tweetur_property) && regexp
			&& !regexp.test(keys[tweetur_property])){
				throw new Error("Invalid value of '" + tweetur_property + "'")
			}
		}else{
			if(keys.hasOwnProperty(tweetur_property) 
			&& typeof keys[tweetur_property] !== tweetur_property_type){
				throw new Error("Expects key of '"+ tweetur_property +"' with type of <"+ tweetur_property_type +">")
			}else if(keys.hasOwnProperty(tweetur_property) && !regexp.test(keys[tweetur_property])){
				throw new Error("Invalid value of '" + tweetur_property + "'") 
			}else{
				// if property is defined, don't set to default
				if(keys.hasOwnProperty(tweetur_property)) continue
				// set default values for optional properties
				keys[tweetur_property] = TWEETUR_KEYS_SCHEMA[tweetur_property].default
			}
		}
	}
	// updated properties
	return keys
}

exports.evaluateArgs = evaluateArgs
exports.checkAuth = checkAuth
exports.generateUrl = generateUrl
exports.validateAndGetProperties = validateAndGetProperties