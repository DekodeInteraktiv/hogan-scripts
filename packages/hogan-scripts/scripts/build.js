/**
 * Make sure we are in the correct enviroment.
 */
process.env.BABEL_ENV = process.env.NODE_ENV || 'production';
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

/**
 * Make the script crash on unhandled rejections instead of silently
 * ignoring them.
 */
process.on( 'unhandledRejection', err => {
	throw err;
} );

/**
 * External dependencies
 */
const chalk = require( 'chalk' );

/**
 * Internal dependencies
 */
const paths = require( '../config/paths' );
const pluginPackage = require( paths.pluginPackage );

/**
 * Build
 */
if ( ! pluginPackage.hogan ) {
	console.log( chalk.red( 'No hogan config found in package.json\n' ) );
	process.exit( 1 );
}

console.log( `Creating an ${ process.env.NODE_ENV } build...` );

/**
 * Build
 */
const buildJS = require( './build/build-js' );
const buildCSS = require( './build/build-css' );

buildJS();
buildCSS();
