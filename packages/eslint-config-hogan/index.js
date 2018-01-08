module.exports = {
	root: true,
	extends: 'wpcalypso',
	parser: 'babel-eslint',
	plugins: [ 'import', 'flowtype' ],
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		jest: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 7,
		sourceType: 'module',
	},
	rules: {
		'max-len': [ 'error', 200 ],
	},
};
