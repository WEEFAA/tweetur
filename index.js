let request = require('request')
let btoa = require("btoa")
let qs = require('querystring')


// https://api.twitter.com/oauth2/token
// https://api.twitter.com/oauth2/invalidate_token
// https://api.twitter.com/1.1/statuses/user_timeline.json
// https://api.twitter.com/1.1/application/rate_limit_status.json
// https://api.twitter.com/1.1/followers/list.json
// https://api.twitter.com/1.1/friends/ids.json
// https://api.twitter.com/1.1/followers/ids.json
// https://api.twitter.com/1.1/friends/list.json
// https://api.twitter.com/1.1/users/lookup.json
// https://api.twitter.com/1.1/users/show.json


function Tweetur(keys){
	this.credentials = keys || {}
	this.access_token = null
	this.hasCallback = true
}


// ver 1.2.1 prototype structure

Tweetur.prototype.authenticate = function(callback){
	this.test({callback},(error) => {
		//GENERATE BASIC OAUTH TOKEN
		this.basic_token = btoa(this.credentials.consumer_key+":"+ this.credentials.consumer_secret)

		request.post({
			url:"https://api.twitter.com/oauth2/token",
			headers:{
				"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
				"Authorization": "Basic " + this.basic_token
			},
			body: "grant_type=client_credentials"
		}, (err,response,body) => {
			//save the access token to this particular bot
			let data = JSON.parse(body)
			this.access_token =  data.access_token
			if(this.hasCallback){
				return callback(err,response,body)
			}
			console.log("---TWEETUR AUTHENTICATED---")
		})
	},'authenticate')
}


Tweetur.prototype.userTimeline = function(params,callback){
	//validate first
	this.test({params,callback},(error) => {
		try{
			if(error){
				throw new Error(error)
			}
			this.get("usertimeline",params,(err,response,body) => {
				if(this.hasCallback){
					return callback(err,response,body)
				}
			})
		}catch(e){
			if(this.hasCallback){
				return callback(e,null,null)
			}
		}
	})
}

//followers
Tweetur.prototype.followersList = function(params,callback){
	this.test({params,callback},(error) => {
		try{
			if(error){
				throw new Error(error)
			}
			this.get("followerslist",params,(err,response,body) =>{
				if(this.hasCallback){
					return callback(err,response,body)
				}
			})
		}catch(error){
			if(this.hasCallback){
				return callback(error,null,null)
			}
		}
	})
}



Tweetur.prototype.friendsList = function(params,callback){
	this.test({params,callback},(error) => {
		try{
			if(error){
				throw new Error(error)
			}
			this.get("friendslist",params,(err,response,body) => {
				if(this.hasCallback){
					return callback(err,response,body)
				}
			})
		}catch(error){
			if(this.hasCallback){
				return callback(error,null,null)
			}
		}
	})
}

Tweetur.prototype.followersIds = function(params,callback){
	this.test({params,callback}, (error) => {
		try{
			if(error){
				throw new Error(error)
			}
			this.get("followersids",params,(err,response,body) => {
				if(this.hasCallback){
					return callback(err,response,body)
				}
			})

		}catch(error){
			if(this.hasCallback){
				return callback(error,null,null)
			}
		}
	})
}

Tweetur.prototype.friendsIds = function(params,callback){
	this.test({params,callback},(error) => {
		try{
			if(error){
				throw new Error(error)
			}
			this.get("friendsids",params,(err,response,body) => {
				if(this.hasCallback){
					return callback(err,response,body)
				}
			})
		}catch(error){
			if(this.hasCallback){
				return callback(error,null,null)
			}
		}
	})
}

Tweetur.prototype.usersLookUp = function(params,callback){
	this.test({params,callback},(error) => {
		try{
			if(error){
				throw new Error(error)
			}
			this.get("userslookup",params,(err,response,body) => {
				if(this.hasCallback){
					return callback(err,response,body)
				}
			})
		}catch(error){
			if(this.hasCallback){
				return callback(error,null,null)
			}
		}
	})
}

Tweetur.prototype.userShow = function(params,callback){
	this.test({params,callback},(error) => {
		try{
			if(error){
				throw new Error(error)
			}
			this.get("usershow",params,(err,response,body) => {
				if(this.hasCallback){
					return callback(err,response,body)
				}
			})
		}catch(error){
			if(this.hasCallback){
				return callback(error,null,null)
			}
		}
	})
}


// @@@ DEPRECATING USER SUGGESTIONS
// Tweetur.prototype.usersSuggestions = function(params,callback){
// 	this.test({params,callback},(error) => {
// 		try{
// 			if(error){
// 				throw new Error(error)
// 			}
// 			this.get("usersuggestions",params,(err,response,body) => {
// 				if(this.hasCallback && typeof callback == 'function'){
// 					return callback(err,response,body)
// 				}else if(this.hasCallback && typeof params == 'function'){
// 					return params(err,response,body)
// 				}
// 			})
// 		}catch(error){
// 			if(this.hasCallback){
// 				return callback(error,null,null)
// 			}
// 			console.log(error)
// 		}
// 	},"param_ommit")
// }

Tweetur.prototype.checkLimit = function(params,callback){
	this.test({params,callback},(error) => {
		try{
			if(error){
				throw new Error(error)
			}
			this.get("checklimit",params,(err,response,body) => {
				if(this.hasCallback){
					return callback(err,response,body)
				}
			})
		}catch(error){
			if(this.hasCallback){
				return callback(error,null,null)
			}
		}
	})
}

Tweetur.prototype.revoke = function(callback){
	this.test({callback},(error) => {
		try{
			if(error){
				throw new Error(error)
			}
			request.post({
				url: "https://api.twitter.com/oauth2/invalidate_token",
				headers:{
					"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
					"Authorization": "Basic " + this.basic_token
				},
				body: "access_token=" + this.access_token
			},(err,response,body) => {
				if(this.hasCallback){
					return callback(err,response,body)
				}
			})
		}catch(error){
			if(this.hasCallback){
				return callback(error,null,null)
			}
		}
	},"no_param")
}


Tweetur.prototype.get = function(endpoint,params,cb){
	let url = ''
	switch(endpoint){
		case "usertimeline":
			url = "https://api.twitter.com/1.1/statuses/user_timeline.json"
			break
		case "followerslist":
			url = "https://api.twitter.com/1.1/followers/list.json"
			break
		case "friendslist":
			url = "https://api.twitter.com/1.1/friends/list.json"
			break
		case "followersids":
			url = "https://api.twitter.com/1.1/followers/ids.json"
			break
		case "friendsids":
			url = "https://api.twitter.com/1.1/friends/ids.json"
			break
		case "usershow":
			url = "https://api.twitter.com/1.1/users/show.json"
			break
		case "usersuggestions":
			url = "https://api.twitter.com/1.1/users/suggestions.json"
			break
		case "checklimit":
			url = "https://api.twitter.com/1.1/application/rate_limit_status.json"
			let resources = params.resources || []
			params.resources = resources.join(",")
			break
		case "userslookup":
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
			"Authorization": "Bearer " + this.access_token
		},
		qs:params
	},(err,response,body) => {
		cb(err,response,body)
	})
}

Tweetur.prototype.test = function(p,cb,ref=""){
	try{
		//check if user specified the callback or ommitted it
		typeof p.callback === "function" ? this.hasCallback = true : this.hasCallback = false
		//always validating the tokens and credetials
		if(!this.access_token || typeof this.credentials !== 'object' && ref !== 'authenticate'){
			 throw new Error("CREDENTIALS NOT VALID")
		}
		//
		switch(ref){
			case "param_ommit":
				//parameter is ommitted
				//first arg act as the callback
				if(typeof p.params === 'function' && typeof p.callback === 'undefined'){
					this.hasCallback = true
				}
				break
			case "no_param":
				if(typeof p.callback === 'function'){
					this.hasCallback = true
				}else if(typeof p.callback !== 'undefined' && typeof p.callback !== 'function'){
					throw new TypeError("INVALID CALLBACK")
				}else{
					this.hasCallback = false
				}
				break
			default:
				if(typeof p.params !== 'object'){
					throw new TypeError('INVALID PARAMETER')
				}
		}
		//if all error routes passed, call the callback with null value <-- no errors
		cb(null)

	}catch(e){
		cb(e)
	}
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
