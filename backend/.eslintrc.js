module.exports = {
	parser: 'babel-eslint',
	env: {
		commonjs: true,
		node: true,
		es6: true
	},
	plugins: ['prettier'],
	extends: [
		'prettier',
		'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	parserOptions: {
		ecmaVersion: 8, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			experimentalObjectRestSpread: true
		}
	},
	ignorePatterns: ['node_modules/'],
	rules: {
		'prettier/prettier': 'error'
	},
	globals: {}
}
