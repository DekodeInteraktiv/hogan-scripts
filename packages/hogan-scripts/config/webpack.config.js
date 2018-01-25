/**
 * External dependencies
 */
const _ = require( 'lodash' );
const webpack = require( 'webpack' );

/**
 * Internal dependencies
 */
const paths = require( './paths' );

/**
 * Variables
 */
const pluginPackage = require( paths.pluginPackage );
const shouldUseSourceMap = process.env.NODE_ENV !== 'production';
const name = pluginPackage.hogan.name || 'hogan';
const plugins = [];

/**
 * Browser support
 */
const browsers = require( './browsers' );

/**
 * Plugins
 */
if ( ! shouldUseSourceMap ) {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin( {
			compress: {
				warnings: false,
			},
			mangle: {
				safari10: true,
			},
			output: {
				comments: false,
				ascii_only: true, // eslint-disable-line
			},
			sourceMap: false,
		} )
	);
}

const output = {
	path: paths.buildFolder,
};

if ( ! _.isObjectLike( pluginPackage.hogan.js ) ) {
	output.filename = `${ name }.js`;
}

/**
 * Config
 */
module.exports = {
	bail: true,
	devtool: shouldUseSourceMap ? 'source-map' : false,
	entry: pluginPackage.hogan.js,
	output,
	module: {
		strictExportPresence: true,
		rules: [ {
			oneOf: [ {
				test: /\.js$/,
				loader: require.resolve( 'babel-loader' ),
				options: {
					babelrc: false,
					presets: [
						[ '@babel/preset-env', { targets: { browsers } } ],
						'@babel/preset-flow',
					],
					plugins: [ '@babel/plugin-proposal-object-rest-spread' ],
					compact: true,
				},
			} ],
		} ],
	},
	plugins,
};
