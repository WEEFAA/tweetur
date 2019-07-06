const Tweetur = require('../index');
const me = new Tweetur({
	consumer_key: process.env.TWITTER_KEY, //your twitter key here
	consumer_secret: process.env.TWITTER_SECRET, //your twitter secret here
})


me.authenticate(function(){

	me.userTimeline({screen_name:'rayranilweefa',count:1},function(err,response,body){
		console.log('USER_TIMELINE CHECK')
	})
	me.followersList({screen_name:'rayranilweefa',count:1},function(err,response,body){
		console.log('FOLLOWERS_LIST CHECK')
	})
	me.followersIds({screen_name:'rayranilweefa',count:1},function(err,response,body){
		console.log('FOLLOWERDS_IDS CHECK')
	})
	me.friendsIds({screen_name:'rayranilweefa',count:1},function(err,response,body){
		console.log('FRIENDS_IDS CHECK')
	})
	me.friendsList({screen_name:'rayranilweefa',count:1},function(err,response,body){
		console.log('FRIENDS_LIST CHECK')
	})
	me.usersLookUp({screen_name:['rayranilweefa','myouvy']},function(err,response,body){
		console.log('USERS_LOOK_UP CHECK')
	})
	me.userShow({screen_name:'rayranilweefa'},function(err,response,body){
		console.log('USER_SHOW CHECK')
	})
	me.checkLimit({resources:['friends','statuses']},function(err,response,body){
		console.log('CHECK_LIMIT CHECK')
	})
	me.revoke(function(err,response,body){
		console.log('REVOKE CHECK')
	})
})

