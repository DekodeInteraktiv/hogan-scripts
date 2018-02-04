/**
 * External dependencies
 */
const _ = require( 'lodash' );
const chalk = require( 'chalk' );
const cssnano = require( 'cssnano' );
const cssnext = require( 'postcss-cssnext' );
const fs = require( 'fs' );
const path = require( 'path' );
const postcss = require( 'postcss' );
const postcssFlexbugsFixes = require( 'postcss-flexbugs-fixes' );
const postcssMixins = require( 'postcss-mixins' );

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

/*
 * Build
 */
function build( from, to ) {
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

	fs.readFile( from, ( err, css ) => {
		postcss( [
			postcssMixins,
			postcssFlexbugsFixes,
			cssnext( {
				features: {
					autoprefixer: {
						browsers,
						flexbox: 'no-2009',
					},
				},
				warnForDuplicates: false,
			} ),
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

module.exports = () => {
	if ( pluginPackage.hogan.css ) {
		if ( _.isObjectLike( pluginPackage.hogan.css ) ) {
			_.forEach( pluginPackage.hogan.css, ( value, key ) => {
				build( value, path.join( paths.buildFolder, `${ key }.css` ) );
			} );
		} else {
			const name = pluginPackage.hogan.name || 'hogan';
			const from = pluginPackage.hogan.css;
			const to = path.join( paths.buildFolder, `${ name }.css` );

			build( from, to );
		}
	}
};
