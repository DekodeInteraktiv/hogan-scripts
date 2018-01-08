/**
 * External dependencies
 */
const path = require( 'path' );
const fs = require( 'fs' );

/**
 * Helpers
 */
const directory = fs.realpathSync( process.cwd() );
const resolve = relativePath => path.resolve( directory, relativePath );
const resolveOwn = relativePath => path.resolve( __dirname, '..', relativePath );

module.exports = {
	ownNodeModules: resolveOwn( 'node_modules' ),
	buildFolder: resolve( 'assets' ),
	plugin: resolve( '.' ),
	pluginModules: resolve( 'node_modules' ),
	pluginPackage: resolve( 'package.json' ),
};
