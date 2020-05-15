const Tweetur = require('./src/tweetur')
const oauthSignature = require('oauth-signature')

const keys = {
	consumer_key: "mPASZqPi3m0HLcA6pdPefjSki",
	consumer_secret: "rqgvc4JtC58DM9yQkZfg8VEfydWeg2U1r5fKB4wmitLmCWhGGh",
	access_token: "2442827221-3PKQEjxyFtE3JymHOfUYjtpDDrrCrGjDQo0HVud",
	access_token_secret: "9PenTj0NvndEAdsxdiN1mJ6BObKGPmcOu2yrKo7V3sTDq"
}

const me = new Tweetur(keys)
;(async function(){
	try{
		const result = await me.authenticate()
		const res = await me.api("application/rate_limit_status.json", { resources: ['statuses', 'friends']})
		console.log(res)
	}catch(e){
		console.error(e)
	}
})()

// export tweetur module
module.exports = Tweetur