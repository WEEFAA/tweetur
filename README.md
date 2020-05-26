# TWEETUR for application-only authentication with TWITTER

A simplified request to interact with Twitter API

## MUST KNOW! 

To interact with twitter API with simple functionalities 
and basic authentication, reading the provided
documentation of [Application-only Authentication](https://developer.twitter.com/en/docs/basics/authentication/overview/application-only) to somehow grasp the concept and implementations 
of this module.

**Disclaimer: Application-only Authentication supports limited endpoints**

## INSTALLATION

```npm
	npm install tweetur --save
```

## TWEETUR v2: WHAT'S NEW?

- Tweetur now supports Promises! [callbacks are still supported]
- Supports all API endpoints on Application-Only scope
- Tweetur helper methods are deprecated. (i.e. userTimeline, followersList)
- New invocation scheme
- Added more helpful error messages and validators
- Fixed bugs from previous version(v1)

## USAGE 

Tweetur v2 introduce new configurations to your application.
Tweetur accepts an object containing your twitter application credentials, these are necessary to 
identify your application. You have to keep in mind that you should not expose your keys 
publicly and store them somewhere safe such as environment variables.

```javascript
	const Tweetur = require('tweetur') //

	//initialize the Tweetur object...
	//along with your keys
	const app = new Tweetur({
		consumer_key : "*******", // required **
		consumer_secret: "*******", // required **
		access_token: "*******", // required **
		access_token_secret: "*******", // required **
		sub: "api", // optional > defaults  to 'api' 
		api_version: '1.1' // optional > defaults to '1.1'
	}) 
```
TIP: All 'required' fields can be obtained on twitter's 
[developer](https://developer.twitter.com/en/apps) platform. 

## AUTHENTICATE

There are two ways to authenticate your app get your access token or [bearer_token](https://developer.twitter.com/en/docs/basics/authentication/oauth-2-0) to access Twitter API endpoints. Authenticating your app before calling Twitter endpoints is necessary, otherwise you'll get an error.

1.) Authentication using Promises in two different approach. 

```javascript 
	// first approach
	// use of chaining. then/catch
	app.authenticate().then(function(data){
		// data will contain your access_token
		// { access_token: '<bearer type>' }

		//.... do some api requests here
	})
	// second approach
	// use of async/await.
	async function init(){
		const data = await app.authenticate()
		// data contains access_token <bearer_type>

		//... do some api requests here
	}

	init() // dont forget to invoke your init func

```

2.) Authentication using a callback. You can pass in a callback as first parameter in the authenticate method but it's not required. 

```javascript
	app.authenticate(function(err,data){
		if(err) throw err 
		//... do some api requests here
	})
```

After completing the authentication process of your app, calling your favourite endpoints are now just a few lines of code away!

## EXAMPLES

There are lots of different api endpoints that twitter provides, see [users/show](https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-show) as we will use this as an example using the **get** method of app(instance of Tweetur). This endpoint allow you to search for an specific user by supplying twitter **user's**screen_name** or **user_id** as parameter to **get** method, see below **get** method list of parameters. Calling this endpoint will return a [user-object](https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/user-object) that contains information about the user. Visit [users/show](https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-show) endpoint for more information about its parameters.

```javascript 
	const app = new Tweetur(<my_config>)
	// authenticate
	async function init(){
		await app.authenticate() 
		// in this example, we'll search for user that have a screen_name of 'twitterdev'
		const target_user = 'twitterdev'
		const twitter_dev = await app.get('users/show.json', { screen_name: target_user })
		// this contains the data about the twitter account associated to @twitterdev
		console.log(twitter_dev)
		// call more endpoints here!
	}

	init()
```

On the example above, we called 'authenticate' method to authenticate our app and then call 'users/show.json' endpoint through our app **get** method. Notice that there's a '.json' extension on the endpoint parameter, it is because twitter defined it like that to distinguish what type of data to return as the response to the request. 

NOTE: Not appending '.json' extension on the endpoint will not throw an error, Tweetur will try to return the fetched data as it is without parsing it. 

>Always check the URL of the endpoint you're calling, most of Twitter endpoints follows this convention.

You can achieve the same request above without using promises through 'callbacks'. However, using callbacks is highly discourage to avoid convoluted codes that are hard to follow and debug if there are multiple requests after requests also known as callback hell. To use callbacks, you could pass in a callback function as a third parameter.

```javascript
		const app = new Tweetur(<my_config>)
		// authenticate your app
		app.authenticate(function(){
			// in this example, we'll search for user that have a screen_name of 'twitterdev'
			const target_user = 'twitterdev'
			app.get('users/show.json', { screen_name: target_user }, function(err,twitter_dev){
				// throw error if there is.
				if(err) throw err 
				// this contains the data about the twitter account associated to @twitterdev
				console.log(twitter_dev)
				// ofcourse, you can still call more endpoints here
				// this time, we'll get information about the followers of our target user
				app.get('followers/list.json', { screen_name: target_user }, function(err,data){
					if(err) throw err 
					console.log(data)
				})
			})
		}) 
```

>This is just a simple example of a nested request using callbacks. You must know that when a callback is not passed, 'get' method will return a promise instead. 

## PARAMETERS: Tweetur instance '**get**' method 

position | name | type | isRequired | description
--- | --- | --- | --- | ----
`first` | *endpoint* | string | **required** | check at [Resource endpoint](https://developer.twitter.com/en/docs/api-reference-index)
`second` | *parameters* | object | **required** | Endpoint parameters passed to the request
`third` | *callback* | function | **optional** | Callback function, returns a promise if omitted 

Endpoint is just a string representing the resource that you want fetch (e.g. users/show.json, followers/list.json). Tweetur will automatically add or omit '/' prefix depending on the passed endpoint. For example  in '/users/show.json', Tweetur will omit prefixing '/' to the specified endpoint. 

## INVOCATION SCHEME: Tweetur instance methods
```javascript
	// reference
	const app = new Tweetur(<my_config>)
```

method | scheme | note
--- | --- | ---
`authenticate` | app.authenticate(callback) | callback is optional, returns a promise if omitted
`get` | app.get(endpoint, params, callback) | see above for information about **get** method 
`revoke` | app.revoke(callback) | callback is optional, returns a promise if omitted


## REVOKING APP ACCESS_TOKEN <BEARER>

There are times that you might want to invalidate your access_token to prevent someone from using your access_token on your behalf or you might want to implement a security measure for your application. Tweetur provides a *revoke* method in your app to revoke access_token or bearer_token. Doing this will invalidate all your future requests to any of Twitter API endpoints except some endpoints such as authentication endpoint.

```javascript
	const app = new Tweetur(<my_config>)
	async function init(){
		await app.authenticate()
		// this is still valid
		const peeps = await app.get('friends/ids.json', { screen_name: 'twitterdev' })
		console.log(peeps)
		// revoking app access_token
		await app.revoke()
		// calling 'get' method on any endpoints after revoking access_token
		// will throw an error
		app.get('friends/list.json', { screen_name: 'twitterdev'}).then(function(data){
			// this will not trigger 
		}).catch(function(err){
			console.error(err) 
		})
	}

	init()
``` 


## v1.2.4 METHODS DEPRECATION NOTICE
Tweetur endpoint helper methods are deprecated in Tweetur v2. As a replacement for these methods, **get** method is introduced to support various endpoints. You can still call these deprecated endpoints by specifying their resource on the endpoint paramater of Tweetur instance **get** method (i.e. 'statuses/user_timeline.json', 'application/rate_limit_status.json'). This interface provides a more flexible way of calling your favourite endpoits. 

> i.e. userTimeline, usersLookUp, checkLimit, friendsIds, etc.

# FIND YOUR ENDPOINT HERE
[API REFERENCE INDEX](https://developer.twitter.com/en/docs/api-reference-index)

## ISSUES
Please submit found issues/bugs to Tweetur's github repository.

