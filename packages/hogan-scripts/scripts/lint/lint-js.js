/**
 * External dependencies
 */
const CLIEngine = require( 'eslint' ).CLIEngine;
const baseConfig = require( 'eslint-config-hogan' );

/*
 * Print results
 */
function printResults( engine, results, format ) {
	let formatter;

	try {
		formatter = engine.getFormatter( format );
	} catch ( e ) {
		console.error( e.message );
		return false;
	}

	const output = formatter( results );

	if ( output ) {
		console.log( output );
	}

	return true;
}

/**
 * Eslint
 */
module.exports = () => {
	const engine = new CLIEngine( {
		baseConfig,
		ignorePattern: 'assets/*',
	} );

	const report = engine.executeOnFiles( [ '.' ] );
	report.results = CLIEngine.getErrorResults( report.results );

	if ( printResults( engine, report.results, 'stylish' ) ) {
		if ( report.errorCount ) {
			process.exit( 1 );
		}
	}
};
