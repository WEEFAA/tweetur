const Tweetur = require('../index.js')
const me = new Tweetur({
	consumer_key :process.env.TWITTER_KEY,
	consumer_secret : process.env.TWITTER_SECRET
})


me.authenticate((err,response,body) => {

	if(err){
		console.log(err)
	}

	console.log(JSON.parse(body))
	me.userShow({screen_name:'rayranilweefa'},function(err,response,body){
		if(err){
			return console.log(err)
		}

		console.log(me)
	})

})

