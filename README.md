# TWEETUR for application-only authentication

A simplified request to interact with Twitter API

# USE 

To interact with twitter API with simple functionalities 
and basic authentication with the help of this module

[Application-only Authentication](https://developer.twitter.com/en/docs/basics/authentication/overview/application-only)

**Disclaimer: Application-only Authentication supports limited endpoints**

# Installation

```npm
	npm install tweetur --save
```


# Usage 

```javascript
	const Tweetur = require('tweetur') //

	//initialize the Tweetur object...
	//along with your keys
	const me = new Tweetur({
		consumer_key : "xxxxxxxx", // required **
		consumer_secret: "xxxxxxx" // required **
	}) 
```
consumer_key and consumer_secret are needed to make Tweetur work,
you can get you keys in your developer account dashboard at [twitter](https://dev.twitter.com)

**once you construct the Tweetur object you can now use methods in this package**

### Authenticate

```javascript 
	me.authenticate(function(err,response,body){

	if(err){
		console.error(err)
	}

	console.log(JSON.parse(body))
	//access_token received 
	//token_type 'bearer'
	})
```

### callback for authenticate method is recommended...
authenticate method is used to to authenticate your credentials with twitter
and the response body of this request would contain the access_token...
you are good to go now

# Methods
List of all the methods covered...

Please refer to the twitter parameter for more information about parameters,
parameters can be ommitted in some methods but most of the time 
parameters are required and callbacks are highly recommended

#### Note: params should always be an object

```javascript 
	//tweetur class methods
	userTimeline(params,callback) // returns timeline status of specified user
	followersList(params,callback) // returns list of your followers
	friendsList(params,callback) // returns a list of people you are following
	followersIds(params,callback) // same as followersList but ids are returned instead
	friendsIds(params,callback) // same as friendsList but ids are returned instead
	userShow(params,callback) // looks for a user 
	usersLookUp({screen_name:[ids]},callback) // looks up for couple of users
	

	//extras
	checkLimit(params,callback) //checks the limit for your endpoints
	revoke(callback) //revoke your access_token
	authenticate(callback) //authenticate your credentials

	//DEPRECATED
	usersSuggestions(params,callback) // list of suggestion of users
```


# EXAMPLE

userTimeline method is used to get a user timeline by specifying some 
parameter that you can look up at the [statuses/user_timeline](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline) endpoint.

```javascript 
	//access_token received
	//token_type 'bearer'

	me.userTimeline({screen_name:'rayranilweefa',count:1},function(err,response,body){
		if(err){
			return console.error(err)
		}

		console.log(JSON.parse(body))
		//user timeline data
	})

```

in this example screen_name and count parameters are specified 
hence it will only return a one tweet status of the screen_name parameter


# FIND YOUR ENDPOINT HERE
[API REFERENCE INDEX](https://developer.twitter.com/en/docs/api-reference-index)

# Status
--IN PROGRESS--
Email me: [rayranilfu7o7@gmail.com](rayranilfu7o7@gmail.com)

