# TWEETUR for application-only authentication with TWITTER

A simplified request to interact with Twitter API

## MUST KNOW! 

To interact with twitter API with simple functionalities 
and basic authentication with the help of this module

[Application-only Authentication](https://developer.twitter.com/en/docs/basics/authentication/overview/application-only)

**Disclaimer: Application-only Authentication supports limited endpoints**

## INSTALLATION

```npm
	npm install tweetur --save
```

## TWEETUR VERSION v2: WHAT'S NEW?

- Tweetur now supports Promises! [callbacks are still supported]
- Supports all API endpoints on Application-Only scope
- Tweetur helper methods are deprecated. (i.e. userTimeline, followersList)
- New invocation scheme
- Added more helpful error messages and validators
- Fixed bugs from previous version(1.2.4)

## USAGE 

Tweetur v2 introduce new configurations to your application.
Tweetur accepts an object containing your twitter application credentials, these are necessary to 
identify your application. You have to keep in mind that you must not expose your keys 
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
		sub: "", // optional > defaults  to 'api' 
		api_version: '' // optional > defaults to '1.1'
	}) 
```
TIP: All 'required' fields can be obtained on twitter's 
[developer](https://developer.twitter.com/en/apps) platform. 

## AUTHENTICATE

There are two ways to authenticate your app get your Access Token or [bearer_token](https://developer.twitter.com/en/docs/basics/authentication/oauth-2-0) to access Twitter API endpoints. Authenticating your app before calling endpoints is necessary, otherwise you'll get unexpected errors.

1. Authentication using Promises in two different approach. 

```javascript 
	// use of chaining. then/catch
	app.authenticate().then(function(data){
		// data will contain your access_token
		// { access_token: '<bearer type>' }

		//.... do some api requests here
	})

	// use of async/await.
	async function init(){
		const data = await app.authenticate()
		// data contains access_token <bearer_type>

		//... do some api requests here
	}

	init() // dont forget to call this

```

2. Authentication using callback. You can pass in a callback as first parameter in the authenticate method. 

```javascript
	app.authenticate(function(err,data){
		if(err) throw err 
		//... do some api requests here
	})
```

After completing the authentication process of your app, calling your favourite endpoints are now just a few lines of code away!

## EXAMPLES

There are lots of different api endpoints that twitter provides, see [users/show](https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-show) as an example using the **get** method of app. This endpoint allow you to search for an specific user by supplying his/her 'screen_name' or 'user_id' as parameter. Calling this endpoint will return a [user-object](https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/user-object) that contains information about the user. See [users/show](https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-show) endpoint for more information about its parameters.

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

On the example above, we call 'authenticate' method to authenticate our app and then call 'users/show.json' endpoint. Notice that there's a '.json' extension on the passed paramter, it is because twitter defined it like that to distinguish which type of data they should return to the request. 

NOTE: Not appending '.json' extension on the endpoint will not throw an error, Tweetur will try to return the fetched data as it is. 

TIP: Always check the URL of the endpoint you're calling, most of Twitter endpoints follows this convention.

You can achieve the same request above without using promises, through 'callbacks'. However, using callbacks is highly discourage to avoid convoluted codes that are hard to follow and debug if there are multiple requests after requests also known as callback hell. To use callbacks, you could pass in a callback function as a third parameter.

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

## PARAMETERS: '**get**' Tweetur method

position | name | type | required | description
--- | --- | --- | --- | ----
`first` | *endpoint* | string** | **required** | [Resource endpoint](https://developer.twitter.com/en/docs/api-reference-index)
`second` | *parameters* | object | **required** | Parameters passed to the request
`third` | *callback* | function | **optional** | Callback function, returns a promise if omitted 

Endpoint is just a string representing the resource that you want fetch (e.g. users/show.json, followers/list.json). Tweetur will automatically add or omit a '/' prefix based on the passed endpoint (i.e /users/show.json), Tweetur will omit prefixing a '/' to the url to avoid 'not found' errors. 

## INVOCATION SCHEME: Tweetur methods
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

There are times that you might want to invalidate your access_token to prevent someone from using your access_token on your behalf or implement a security measure for your application. Tweetur provides a *revoke* method bound to your app instance to revoke your token. Doing this will invalidate your future requests to any of twitter endpoint available in **get** method. In order to execute request, you must authenticate your app again to proceed. 

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
Tweetur endpoint helper methods are deprecated in v2. As a replace for this methods, **get** method is introduced to support numbers of endpoint without the need to update the Tweetur module every point in time. 

> i.e. userTimeline, usersLookUp, checkLimit, friendsIds, etc.

# FIND YOUR ENDPOINT HERE
[API REFERENCE INDEX](https://developer.twitter.com/en/docs/api-reference-index)

## ISSUES
Please submit your issues to github repository.

