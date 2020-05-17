const { generateUrl } = require('./../../src/tweetur/utils')

test("should have a prefix '/' if there's no leading '/' ", () => {
	const url = generateUrl('woka', 'tweetur.com', '2.0', 'sample/endpoint.json')
	expect(url).toBe('https://woka.tweetur.com/2.0/sample/endpoint.json')
})

test("should ignore prefixing '/' in endpoint if it's already there", () => {
	const url = generateUrl('api', 'tweetur.com', '2.0', '/sample/endpoint.json')
	expect(url).toBe('https://api.tweetur.com/2.0/sample/endpoint.json')
})