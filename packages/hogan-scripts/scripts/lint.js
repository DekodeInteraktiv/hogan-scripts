/**
 * Internal dependencies
 */
const lintJS = require( './lint/lint-js' );
const lintCSS = require( './lint/lint-css' );

// Boot.
lintJS();
lintCSS();
