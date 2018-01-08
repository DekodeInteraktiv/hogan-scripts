/**
 * External dependencies
 */
const stylelint = require( 'stylelint' );
const stylelintFormatter = require( 'stylelint-formatter-pretty' );

/**
 * Stylelint
 */
module.exports = () => {
	stylelint.lint( {
		config: {
			extends: 'stylelint-config-hogan',
			ignoreFiles: 'assets/**/*.css',
		},
		files: '**/*.css',
		formatter: stylelintFormatter,
	} ).then( data => {
		console.log( data.output );

		if ( data.errored ) {
			process.exit( 1 );
		}
	} ).catch( err => {
		console.error( err.stack );
		process.exit( 1 );
	} );
};
