const { evaluateArgs } = require('./../../src/tweetur/utils')
// invocation test cases
const test_cases_1 = [
	// wrong zero paramter invocations
	{ args: [], option: {}, expect: SyntaxError, matcher: 'toThrow' },
	{ args: [], option: { allowFirstArgAsCallback: false }, expects: SyntaxError, matcher: 'toThrow' },
	// wrong one parameter invocations
	{ args: [[]], option: { allowFirstArgAsCallback: true }, expects: TypeError, matcher: 'toThrow' },
	{ args: [[]], option: { allowFirstArgAsCallback: false }, expects: TypeError, matcher: 'toThrow' },
	{ args: [true], expects: TypeError, matcher: 'toThrow'},
	//  wrong two paramater invocations 
	{ args: [true, []], expects: TypeError, matcher: 'toThrow'},
	{ args: ["", []], expects: TypeError, matcher: 'toThrow'},
	{ args: [ ()=>{}, {} ], expects: TypeError, matcher: 'toThrow'},
	// wrong three paramter invocations
	{ args: [true, [], ""], expects: TypeError, matcher: 'toThrow'},
	{ args: ["sample/endpont", {}, {}], expects: TypeError, matcher: 'toThrow' },
	// number of paramters exceends three 
	{ args: [true, [], [], {}], expects: SyntaxError, matcher: 'toThrow' },
	{ args: [[], false, "", {}, null], expects: SyntaxError, matcher: 'toThrow'}
]

const test_cases_2 = [
	// zero paramter
	{ args: [], option: { allowFirstArgAsCallback: true }, expects: false, matcher: 'toBe', checkReturnValue: true },
	// one paramter
	{ args: [() => {}], option: { allowFirstArgAsCallback: true }, expects: true, matcher: 'toBe', checkReturnValue: true },
	{ args: ["sample/endpoint"], expects: false, matcher: 'toBe', checkReturnValue: true},
	// two paramater
	{ args: ["sample/endpoint", {}], expects: false, matcher: 'toBe', checkReturnValue: true},
	// three parameter
	{ args: ['sample/endpoint', {}, () => {}], expects: true, matcher: 'toBe', checkReturnValue: true },
]

test('should throw an error on wrong invocations', () => {
	runTestCases(test_cases_1)
})

test("should distinguish whether there's a callback or not", () => {
	runTestCases(test_cases_2)
})

//test_cases runner
function runTestCases(cases){
	for(let test of cases){
		const argTest = makeArgTest(test.args, test.option)
		if(test.checkReturnValue){
			const returnedValue = argTest()
			expect(returnedValue)[test.matcher](test.expects)
			continue
		}
		expect(argTest)[test.matcher](test.expects)
	}
}

// wrapper
function getDummyArguments(){
	return arguments
}
function makeArgTest(args, option = {}){
	return () => {
		const testArgs = getDummyArguments(...args)
		return evaluateArgs(testArgs, option)
	}
}

