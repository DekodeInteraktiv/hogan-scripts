/**
 * External dependencies
 */
const autoprefixer = require( 'autoprefixer' );
const chalk = require( 'chalk' );
const cssnano = require( 'cssnano' );
const fs = require( 'fs' );
const path = require( 'path' );
const postcss = require( 'postcss' );
const postcssFlexbugsFixes = require( 'postcss-flexbugs-fixes' );

/**
 * Internal dependencies
 */
const paths = require( '../../config/paths' );
const pluginPackage = require( paths.pluginPackage );
const browsers = require( '../../config/browsers' );

/**
 * Variables
 */
const shouldUseSourceMap = process.env.NODE_ENV !== 'production';
const name = pluginPackage.hogan.name || 'hogan';
const from = pluginPackage.hogan.css;
const to = path.join( paths.buildFolder, `${ name }.css` );

/**
 * Config
 */
const config = {
	from,
	to,
};

if ( shouldUseSourceMap ) {
	config.map = {
		inline: false,
	};
}

/**
 * Build
 */
module.exports = () => {
	if ( pluginPackage.hogan.css ) {
		fs.readFile( from, ( err, css ) => {
			postcss( [
				postcssFlexbugsFixes,
				autoprefixer( { browsers, flexbox: 'no-2009' } ),
				cssnano,
			] )
				.process( css, config )
				.then( result => {
					fs.writeFile( to, result.css, () => {
						console.log( chalk.green( 'Compiled CSS successfully.' ) );
					} );

					if ( shouldUseSourceMap ) {
						fs.writeFile( `${ to }.map`, result.map, () => {
							console.log( chalk.green( 'Compiled CSS map successfully.' ) );
						} );
					}
				} );
		} );
	}
};
