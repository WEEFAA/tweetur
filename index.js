const Tweetur = require('./src/tweetur')

const keys = {
	consumer_key: "mPASZqPi3m0HLcA6pdPefjSki",
	consumer_secret: "rqgvc4JtC58DM9yQkZfg8VEfydWeg2U1r5fKB4wmitLmCWhGGh",
	access_token: "2442827221-3PKQEjxyFtE3JymHOfUYjtpDDrrCrGjDQo0HVud",
	access_token_secret: "9PenTj0NvndEAdsxdiN1mJ6BObKGPmcOu2yrKo7V3sTDq"
}

const me = new Tweetur(keys)
console.log(me)
;(async function(){
	try{
		await me.authenticate()
		const result = await me.revoke() 
		console.log(result)
	}catch(e){
		console.error(e)
	}
})()

// export tweetur module
module.exports = Tweetur