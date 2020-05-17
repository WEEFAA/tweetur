const { checkAuth } = require('./../../src/tweetur/utils')


test('should throw an error if bearer token is invalid', () => {
	const mode = "default"
	expect(callAuth(mode,{})).toThrow(Error)
	expect(callAuth(mode,{bearer_token: true})).toThrow(Error)
	expect(callAuth(mode,{bearer_token: {}})).toThrow(Error)
})

const test_cases_1 = [
	{ consumer_key: {} },
	{ consumer_key: "", consumer_secret: true },
	{ access_token_secret: "", consumer_key: ""}
]

test('should throw an error if credentials are invalid', () => {
	const mode = 'credentials'
	for(let test of test_cases_1){
		expect(callAuth(mode, test)).toThrow(Error)
	}
})

function callAuth(mode, app){
	return () => checkAuth(mode, app)
}