const { validateAndGetProperties } = require('./../../src/tweetur/utils')
const { TWEETUR_KEYS_SCHEMA } = require('./../../src/tweetur/config')
// Test app config for Tweetur

// config properties
const tweetur_properties = Object.keys(TWEETUR_KEYS_SCHEMA)

function testValidation(config){
	return ()  => validateAndGetProperties(config)
}

const invalid_test_case = [
	// omitted required fields 
	{ consumer_key: "some_key", consumer_secret: "some_secret " }, 
	{ access_token: "some_token", access_token_secret: "some_secret"},
	{ sub: "weefa", consumer_key: "some_key" } 
]

const invalid_test_case_type = [
	// type error 
	[ { consumer_key: {}, consumer_secret: "some_secret " }, TypeError ], 
	// this will throw reference error, order matters
	[{ access_token: "some_token", access_token_secret: false, sub: 1}, ReferenceError ],
	// same as above
	[{ sub: "weefa", consumer_key: "some_key", api_version: [] }, ReferenceError ],
	// type error 
	[{ consumer_key: "some_key", consumer_secret: "some_secret", access_token: true }, TypeError ], 
]

test('should throw an error if app config is not object<object>', () => {
	expect(testValidation("invalid config")).toThrow(Error)
	expect(testValidation(true)).toThrow(Error)
	expect(testValidation([])).toThrow(Error)
})

test('should throw an error if app property is not passed when [required]', () => {
	for(let test_case of invalid_test_case){
		expect(testValidation(test_case)).toThrow(ReferenceError)
	}
})

test('should throw an error if app property is wrong type', () => {
	for(let [test_case, expects] of invalid_test_case_type){
		expect(testValidation(test_case)).toThrow(expects)
	}
})

