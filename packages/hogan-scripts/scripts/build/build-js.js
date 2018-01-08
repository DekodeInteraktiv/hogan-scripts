/**
 * External dependencies
 */
const chalk = require( 'chalk' );
const webpack = require( 'webpack' );

/**
 * Internal dependencies
 */
const config = require( '../../config/webpack.config' );
const paths = require( '../../config/paths' );
const pluginPackage = require( paths.pluginPackage );

/**
 * Build
 */
module.exports = () => {
	if ( pluginPackage.hogan.js ) {
		webpack( config ).run( ( err ) => {
			if ( err ) {
				console.log( chalk.red( 'Failed to compile.\n' ) );
				console.log( ( err.message || err ) + '\n' );
				process.exit( 1 );
			}

			console.log( chalk.green( 'Compiled JS successfully.' ) );
		} );
	}
};
