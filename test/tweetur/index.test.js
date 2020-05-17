const Tweetur = require('./../../src/tweetur')

// integration test for Tweetur module
const {
	// app keys
	TWEETUR_TEST_KEY: consumer_key = "xxxxx",
	TWEETUR_TEST_SECRET: consumer_secret = "xxxxx",
	TWEETUR_TEST_TOKEN: access_token = "xxxxx",
	TWEETUR_TEST_TOKEN_SECRET: access_token_secret = "xxxxx",
	TWEETUR_TEST_SUB: sub = "api", // default
	TWEETUR_TEST_API_VERSION: api_version = "1.1" // default
} = process.env

const myKeys = {
	consumer_key, consumer_secret,
	access_token, access_token_secret,
	sub, api_version
}

test('should return bearer token when authenticate method is invoked', async () => {
	const app = new Tweetur(myKeys)
	const result = await app.authenticate()
	expect(result.access_token).toBe(app.bearer_token)
})

test('should invalidate bearer_token on revoke', async () => {
	const target_screenName = "rayranilWEEFA"
	const app = new Tweetur(myKeys)
	await app.authenticate() // get fresh bearer_token
	// call an endpoint to verify if bearer_token is valid
	let me = await app.get('users/show.json', { screen_name: target_screenName })
	expect(me.screen_name.toLowerCase()).toBe(target_screenName.toLowerCase())
	//revoke the token
	await app.revoke()
	// call the endpoint again
	await expect(app.get('users/show', { screen_name: target_screenName })).rejects.toThrow(Error)
})



