/**
 * External dependencies
 */
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

/**
 * Config
 */
module.exports = {
	bail: true,
	devtool: shouldUseSourceMap ? 'source-map' : false,
	entry: pluginPackage.hogan.js,
	output: {
		path: paths.buildFolder,
		filename: `${ name }.js`,
	},
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
					compact: true,
				},
			} ],
		} ],
	},
	plugins,
};
