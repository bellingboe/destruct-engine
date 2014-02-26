/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	version = "1.11.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return a 'clean' array
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return just the object
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: trim && !trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

jQuery(function() {
	// We need to execute this one support test ASAP because we need to know
	// if body.style.zoom needs to be set.

	var container, div,
		body = document.getElementsByTagName("body")[0];

	if ( !body ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

	div = document.createElement( "div" );
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";

		if ( (support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 )) ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );

	// Null elements to avoid leaks in IE
	container = div = null;
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		input = document.createElement("input");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	fragment = div = input = null;
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined && (
				// Support: IE < 9
				src.returnValue === false ||
				// Support: Android < 4.0
				src.getPreventDefault && src.getPreventDefault() ) ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var a, shrinkWrapBlocksVal,
		div = document.createElement( "div" ),
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	support.shrinkWrapBlocks = function() {
		var body, container, div, containerStyles;

		if ( shrinkWrapBlocksVal == null ) {
			body = document.getElementsByTagName( "body" )[ 0 ];
			if ( !body ) {
				// Test fired too early or in an unsupported environment, exit.
				return;
			}

			containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
			container = document.createElement( "div" );
			div = document.createElement( "div" );

			body.appendChild( container ).appendChild( div );

			// Will be changed later if needed.
			shrinkWrapBlocksVal = false;

			if ( typeof div.style.zoom !== strundefined ) {
				// Support: IE6
				// Check if elements with layout shrink-wrap their children
				div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
				div.innerHTML = "<div></div>";
				div.firstChild.style.width = "5px";
				shrinkWrapBlocksVal = div.offsetWidth !== 3;
			}

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			body = container = div = null;
		}

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal,
		pixelPositionVal, reliableMarginRightVal,
		div = document.createElement( "div" ),
		containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal != null ) {
				return reliableHiddenOffsetsVal;
			}

			var container, tds, isSupported,
				div = document.createElement( "div" ),
				body = document.getElementsByTagName( "body" )[ 0 ];

			if ( !body ) {
				// Return for frameset docs that don't have a body
				return;
			}

			// Setup
			div.setAttribute( "className", "t" );
			div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

			container = document.createElement( "div" );
			container.style.cssText = containerStyles;

			body.appendChild( container ).appendChild( div );

			// Support: IE8
			// Check if table cells still have offsetWidth/Height when they are set
			// to display:none and there are still other visible table cells in a
			// table row; if so, offsetWidth/Height are not reliable for use when
			// determining if an element has been hidden directly using
			// display:none (it is still safe to use offsets if a parent element is
			// hidden; don safety goggles and see bug #4512 for more information).
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName( "td" );
			tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
			isSupported = ( tds[ 0 ].offsetHeight === 0 );

			tds[ 0 ].style.display = "";
			tds[ 1 ].style.display = "none";

			// Support: IE8
			// Check if empty table cells still have offsetWidth/Height
			reliableHiddenOffsetsVal = isSupported && ( tds[ 0 ].offsetHeight === 0 );

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			div = body = null;

			return reliableHiddenOffsetsVal;
		},

		boxSizing: function() {
			if ( boxSizingVal == null ) {
				computeStyleTests();
			}
			return boxSizingVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {
			var body, container, div, marginDiv;

			// Use window.getComputedStyle because jsdom on node.js will break without it.
			if ( reliableMarginRightVal == null && window.getComputedStyle ) {
				body = document.getElementsByTagName( "body" )[ 0 ];
				if ( !body ) {
					// Test fired too early or in an unsupported environment, exit.
					return;
				}

				container = document.createElement( "div" );
				div = document.createElement( "div" );
				container.style.cssText = containerStyles;

				body.appendChild( container ).appendChild( div );

				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// Fails in WebKit before Feb 2011 nightlies
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				marginDiv = div.appendChild( document.createElement( "div" ) );
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";

				reliableMarginRightVal =
					!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );

				body.removeChild( container );
			}

			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		var container, div,
			body = document.getElementsByTagName( "body" )[ 0 ];

		if ( !body ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		container = document.createElement( "div" );
		div = document.createElement( "div" );
		container.style.cssText = containerStyles;

		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:absolute;display:block;padding:1px;border:1px;width:4px;" +
				"margin-top:1%;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			boxSizingVal = div.offsetWidth === 4;
		});

		// Will be changed later if needed.
		boxSizingReliableVal = true;
		pixelPositionVal = false;
		reliableMarginRightVal = true;

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE.
		div = body = null;
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					// Support: Chrome, Safari
					// Setting style to blank string required to delete "style: x !important;"
					style[ name ] = "";
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, dDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );
		dDisplay = defaultDisplay( elem.nodeName );
		if ( display === "none" ) {
			display = dDisplay;
		}
		if ( display === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || dDisplay === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var a, input, select, opt,
		div = document.createElement("div" );

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// Null elements to avoid leaks in IE.
	a = input = select = opt = div = null;
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					jQuery.text( elem );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
/*!
 * aes.js
 * https://destruct.co
 * MIT licensed
 *
 */

    function random_string(C) {
        if (C === null) {
            C = 20
        }
        var B = "abcdefghijklmnopqrstuvwxyz1234567890";
        var D = "";
        for (var A = 0; A < C; A++) {
            pos = Math.floor(Math.random() * B.length);
            D += B.charAt(pos)
        }
        return D
    }
    
    function ciph(A, B) {
        return GibberishAES.enc(B, A)
    }
    
    function unciph(A, B) {
        return GibberishAES.dec(B, A)
    }

    /**
    * @license Gibberish-AES 
    * A lightweight Javascript Libray for OpenSSL compatible AES CBC encryption.
    *
    * Author: Mark Percival
    * Email: mark@mpercival.com
    * Copyright: Mark Percival - http://mpercival.com 2008
    *
    * With thanks to:
    * Josh Davis - http://www.josh-davis.org/ecmaScrypt
    * Chris Veness - http://www.movable-type.co.uk/scripts/aes.html
    * Michel I. Gallant - http://www.jensign.com/
    * Jean-Luc Cooke <jlcooke@certainkey.com> 2012-07-12: added strhex + invertArr to compress G2X/G3X/G9X/GBX/GEX/SBox/SBoxInv/Rcon saving over 7KB, and added encString, decString, also made the MD5 routine more easlier compressible using yuicompressor.
    *
    * License: MIT
    *
    * Usage: GibberishAES.enc("secret", "password")
    * Outputs: AES Encrypted text encoded in Base64
    */
    (function (root, factory) {
        if (typeof exports === 'object') {
            // Node. 
            module.exports = factory();
        } else if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define(factory);
        } else {
            // Browser globals (root is window)
            root.GibberishAES = factory();
        }
    }(this, function () {
        'use strict';
    
        var Nr = 14,
        /* Default to 256 Bit Encryption */
        Nk = 8,
        Decrypt = false,
    
        enc_utf8 = function(s)
        {
            try {
                return unescape(encodeURIComponent(s));
            }
            catch(e) {
                throw 'Error on UTF-8 encode';
            }
        },
    
        dec_utf8 = function(s)
        {
            try {
                return decodeURIComponent(escape(s));
            }
            catch(e) {
                throw ('Bad Key');
            }
        },
    
        padBlock = function(byteArr)
        {
            var array = [], cpad, i;
            if (byteArr.length < 16) {
                cpad = 16 - byteArr.length;
                array = [cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad, cpad];
            }
            for (i = 0; i < byteArr.length; i++)
            {
                array[i] = byteArr[i];
            }
            return array;
        },
    
        block2s = function(block, lastBlock)
        {
            var string = '', padding, i;
            if (lastBlock) {
                padding = block[15];
                if (padding > 16) {
                    throw ('Decryption error: Maybe bad key');
                }
                if (padding === 16) {
                    return '';
                }
                for (i = 0; i < 16 - padding; i++) {
                    string += String.fromCharCode(block[i]);
                }
            } else {
                for (i = 0; i < 16; i++) {
                    string += String.fromCharCode(block[i]);
                }
            }
            return string;
        },
    
        a2h = function(numArr)
        {
            var string = '', i;
            for (i = 0; i < numArr.length; i++) {
                string += (numArr[i] < 16 ? '0': '') + numArr[i].toString(16);
            }
            return string;
        },
    
        h2a = function(s)
        {
            var ret = [];
            s.replace(/(..)/g,
            function(s) {
                ret.push(parseInt(s, 16));
            });
            return ret;
        },
    
        s2a = function(string, binary) {
            var array = [], i;
    
            if (! binary) {
                string = enc_utf8(string);
            }
    
            for (i = 0; i < string.length; i++)
            {
                array[i] = string.charCodeAt(i);
            }
    
            return array;
        },
    
        size = function(newsize)
        {
            switch (newsize)
            {
            case 128:
                Nr = 10;
                Nk = 4;
                break;
            case 192:
                Nr = 12;
                Nk = 6;
                break;
            case 256:
                Nr = 14;
                Nk = 8;
                break;
            default:
                throw ('Invalid Key Size Specified:' + newsize);
            }
        },
    
        randArr = function(num) {
            var result = [], i;
            for (i = 0; i < num; i++) {
                result = result.concat(Math.floor(Math.random() * 256));
            }
            return result;
        },
    
        openSSLKey = function(passwordArr, saltArr) {
            // Number of rounds depends on the size of the AES in use
            // 3 rounds for 256
            //        2 rounds for the key, 1 for the IV
            // 2 rounds for 128
            //        1 round for the key, 1 round for the IV
            // 3 rounds for 192 since it's not evenly divided by 128 bits
            var rounds = Nr >= 12 ? 3: 2,
            key = [],
            iv = [],
            md5_hash = [],
            result = [],
            data00 = passwordArr.concat(saltArr),
            i;
            md5_hash[0] = MD5(data00);
            result = md5_hash[0];
            for (i = 1; i < rounds; i++) {
                md5_hash[i] = MD5(md5_hash[i - 1].concat(data00));
                result = result.concat(md5_hash[i]);
            }
            key = result.slice(0, 4 * Nk);
            iv = result.slice(4 * Nk, 4 * Nk + 16);
            return {
                key: key,
                iv: iv
            };
        },
    
        rawEncrypt = function(plaintext, key, iv) {
            // plaintext, key and iv as byte arrays
            key = expandKey(key);
            var numBlocks = Math.ceil(plaintext.length / 16),
            blocks = [],
            i,
            cipherBlocks = [];
            for (i = 0; i < numBlocks; i++) {
                blocks[i] = padBlock(plaintext.slice(i * 16, i * 16 + 16));
            }
            if (plaintext.length % 16 === 0) {
                blocks.push([16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]);
                // CBC OpenSSL padding scheme
                numBlocks++;
            }
            for (i = 0; i < blocks.length; i++) {
                blocks[i] = (i === 0) ? xorBlocks(blocks[i], iv) : xorBlocks(blocks[i], cipherBlocks[i - 1]);
                cipherBlocks[i] = encryptBlock(blocks[i], key);
            }
            return cipherBlocks;
        },
    
        rawDecrypt = function(cryptArr, key, iv, binary) {
            //  cryptArr, key and iv as byte arrays
            key = expandKey(key);
            var numBlocks = cryptArr.length / 16,
            cipherBlocks = [],
            i,
            plainBlocks = [],
            string = '';
            for (i = 0; i < numBlocks; i++) {
                cipherBlocks.push(cryptArr.slice(i * 16, (i + 1) * 16));
            }
            for (i = cipherBlocks.length - 1; i >= 0; i--) {
                plainBlocks[i] = decryptBlock(cipherBlocks[i], key);
                plainBlocks[i] = (i === 0) ? xorBlocks(plainBlocks[i], iv) : xorBlocks(plainBlocks[i], cipherBlocks[i - 1]);
            }
            for (i = 0; i < numBlocks - 1; i++) {
                string += block2s(plainBlocks[i]);
            }
            string += block2s(plainBlocks[i], true);
            return binary ? string : dec_utf8(string); 
        },
    
        encryptBlock = function(block, words) {
            Decrypt = false;
            var state = addRoundKey(block, words, 0),
            round;
            for (round = 1; round < (Nr + 1); round++) {
                state = subBytes(state);
                state = shiftRows(state);
                if (round < Nr) {
                    state = mixColumns(state);
                }
                //last round? don't mixColumns
                state = addRoundKey(state, words, round);
            }
    
            return state;
        },
    
        decryptBlock = function(block, words) {
            Decrypt = true;
            var state = addRoundKey(block, words, Nr),
            round;
            for (round = Nr - 1; round > -1; round--) {
                state = shiftRows(state);
                state = subBytes(state);
                state = addRoundKey(state, words, round);
                if (round > 0) {
                    state = mixColumns(state);
                }
                //last round? don't mixColumns
            }
    
            return state;
        },
    
        subBytes = function(state) {
            var S = Decrypt ? SBoxInv: SBox,
            temp = [],
            i;
            for (i = 0; i < 16; i++) {
                temp[i] = S[state[i]];
            }
            return temp;
        },
    
        shiftRows = function(state) {
            var temp = [],
            shiftBy = Decrypt ? [0, 13, 10, 7, 4, 1, 14, 11, 8, 5, 2, 15, 12, 9, 6, 3] : [0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 1, 6, 11],
            i;
            for (i = 0; i < 16; i++) {
                temp[i] = state[shiftBy[i]];
            }
            return temp;
        },
    
        mixColumns = function(state) {
            var t = [],
            c;
            if (!Decrypt) {
                for (c = 0; c < 4; c++) {
                    t[c * 4] = G2X[state[c * 4]] ^ G3X[state[1 + c * 4]] ^ state[2 + c * 4] ^ state[3 + c * 4];
                    t[1 + c * 4] = state[c * 4] ^ G2X[state[1 + c * 4]] ^ G3X[state[2 + c * 4]] ^ state[3 + c * 4];
                    t[2 + c * 4] = state[c * 4] ^ state[1 + c * 4] ^ G2X[state[2 + c * 4]] ^ G3X[state[3 + c * 4]];
                    t[3 + c * 4] = G3X[state[c * 4]] ^ state[1 + c * 4] ^ state[2 + c * 4] ^ G2X[state[3 + c * 4]];
                }
            }else {
                for (c = 0; c < 4; c++) {
                    t[c*4] = GEX[state[c*4]] ^ GBX[state[1+c*4]] ^ GDX[state[2+c*4]] ^ G9X[state[3+c*4]];
                    t[1+c*4] = G9X[state[c*4]] ^ GEX[state[1+c*4]] ^ GBX[state[2+c*4]] ^ GDX[state[3+c*4]];
                    t[2+c*4] = GDX[state[c*4]] ^ G9X[state[1+c*4]] ^ GEX[state[2+c*4]] ^ GBX[state[3+c*4]];
                    t[3+c*4] = GBX[state[c*4]] ^ GDX[state[1+c*4]] ^ G9X[state[2+c*4]] ^ GEX[state[3+c*4]];
                }
            }
            
            return t;
        },
    
        addRoundKey = function(state, words, round) {
            var temp = [],
            i;
            for (i = 0; i < 16; i++) {
                temp[i] = state[i] ^ words[round][i];
            }
            return temp;
        },
    
        xorBlocks = function(block1, block2) {
            var temp = [],
            i;
            for (i = 0; i < 16; i++) {
                temp[i] = block1[i] ^ block2[i];
            }
            return temp;
        },
    
        expandKey = function(key) {
            // Expects a 1d number array
            var w = [],
            temp = [],
            i,
            r,
            t,
            flat = [],
            j;
    
            for (i = 0; i < Nk; i++) {
                r = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
                w[i] = r;
            }
    
            for (i = Nk; i < (4 * (Nr + 1)); i++) {
                w[i] = [];
                for (t = 0; t < 4; t++) {
                    temp[t] = w[i - 1][t];
                }
                if (i % Nk === 0) {
                    temp = subWord(rotWord(temp));
                    temp[0] ^= Rcon[i / Nk - 1];
                } else if (Nk > 6 && i % Nk === 4) {
                    temp = subWord(temp);
                }
                for (t = 0; t < 4; t++) {
                    w[i][t] = w[i - Nk][t] ^ temp[t];
                }
            }
            for (i = 0; i < (Nr + 1); i++) {
                flat[i] = [];
                for (j = 0; j < 4; j++) {
                    flat[i].push(w[i * 4 + j][0], w[i * 4 + j][1], w[i * 4 + j][2], w[i * 4 + j][3]);
                }
            }
            return flat;
        },
    
        subWord = function(w) {
            // apply SBox to 4-byte word w
            for (var i = 0; i < 4; i++) {
                w[i] = SBox[w[i]];
            }
            return w;
        },
    
        rotWord = function(w) {
            // rotate 4-byte word w left by one byte
            var tmp = w[0],
            i;
            for (i = 0; i < 3; i++) {
                w[i] = w[i + 1];
            }
            w[3] = tmp;
            return w;
        },
    
    // jlcooke: 2012-07-12: added strhex + invertArr to compress G2X/G3X/G9X/GBX/GEX/SBox/SBoxInv/Rcon saving over 7KB, and added encString, decString
        strhex = function(str,size) {
            var i, ret = [];
            for (i=0; i<str.length; i+=size){
                ret[i/size] = parseInt(str.substr(i,size), 16);
            }
            return ret;
        },
        invertArr = function(arr) {
            var i, ret = [];
            for (i=0; i<arr.length; i++){
                ret[arr[i]] = i;
            }
            return ret;
        },
        Gxx = function(a, b) {
            var i, ret;
    
            ret = 0;
            for (i=0; i<8; i++) {
                ret = ((b&1)===1) ? ret^a : ret;
                /* xmult */
                a = (a>0x7f) ? 0x11b^(a<<1) : (a<<1);
                b >>>= 1;
            }
    
            return ret;
        },
        Gx = function(x) {
            var i, r = [];
            for (i=0; i<256; i++){
                r[i] = Gxx(x, i);
            }
            return r;
        },
    
        // S-box
    /*
        SBox = [
        99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171,
        118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164,
        114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113,
        216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226,
        235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214,
        179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203,
        190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69,
        249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245,
        188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68,
        23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42,
        144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73,
        6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109,
        141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37,
        46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62,
        181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225,
        248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223,
        140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187,
        22], //*/ SBox = strhex('637c777bf26b6fc53001672bfed7ab76ca82c97dfa5947f0add4a2af9ca472c0b7fd9326363ff7cc34a5e5f171d8311504c723c31896059a071280e2eb27b27509832c1a1b6e5aa0523bd6b329e32f8453d100ed20fcb15b6acbbe394a4c58cfd0efaafb434d338545f9027f503c9fa851a3408f929d38f5bcb6da2110fff3d2cd0c13ec5f974417c4a77e3d645d197360814fdc222a908846eeb814de5e0bdbe0323a0a4906245cc2d3ac629195e479e7c8376d8dd54ea96c56f4ea657aae08ba78252e1ca6b4c6e8dd741f4bbd8b8a703eb5664803f60e613557b986c11d9ee1f8981169d98e949b1e87e9ce5528df8ca1890dbfe6426841992d0fb054bb16',2),
    
        // Precomputed lookup table for the inverse SBox
    /*    SBoxInv = [
        82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215,
        251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222,
        233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66,
        250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73,
        109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92,
        204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21,
        70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247,
        228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2,
        193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220,
        234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173,
        53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29,
        41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75,
        198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168,
        51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81,
        127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160,
        224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97,
        23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12,
        125], //*/ SBoxInv = invertArr(SBox),
    
        // Rijndael Rcon
    /*
        Rcon = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94,
        188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145],
    //*/ Rcon = strhex('01020408102040801b366cd8ab4d9a2f5ebc63c697356ad4b37dfaefc591',2),
    
    /*
        G2X = [
        0x00, 0x02, 0x04, 0x06, 0x08, 0x0a, 0x0c, 0x0e, 0x10, 0x12, 0x14, 0x16,
        0x18, 0x1a, 0x1c, 0x1e, 0x20, 0x22, 0x24, 0x26, 0x28, 0x2a, 0x2c, 0x2e,
        0x30, 0x32, 0x34, 0x36, 0x38, 0x3a, 0x3c, 0x3e, 0x40, 0x42, 0x44, 0x46,
        0x48, 0x4a, 0x4c, 0x4e, 0x50, 0x52, 0x54, 0x56, 0x58, 0x5a, 0x5c, 0x5e,
        0x60, 0x62, 0x64, 0x66, 0x68, 0x6a, 0x6c, 0x6e, 0x70, 0x72, 0x74, 0x76,
        0x78, 0x7a, 0x7c, 0x7e, 0x80, 0x82, 0x84, 0x86, 0x88, 0x8a, 0x8c, 0x8e,
        0x90, 0x92, 0x94, 0x96, 0x98, 0x9a, 0x9c, 0x9e, 0xa0, 0xa2, 0xa4, 0xa6,
        0xa8, 0xaa, 0xac, 0xae, 0xb0, 0xb2, 0xb4, 0xb6, 0xb8, 0xba, 0xbc, 0xbe,
        0xc0, 0xc2, 0xc4, 0xc6, 0xc8, 0xca, 0xcc, 0xce, 0xd0, 0xd2, 0xd4, 0xd6,
        0xd8, 0xda, 0xdc, 0xde, 0xe0, 0xe2, 0xe4, 0xe6, 0xe8, 0xea, 0xec, 0xee,
        0xf0, 0xf2, 0xf4, 0xf6, 0xf8, 0xfa, 0xfc, 0xfe, 0x1b, 0x19, 0x1f, 0x1d,
        0x13, 0x11, 0x17, 0x15, 0x0b, 0x09, 0x0f, 0x0d, 0x03, 0x01, 0x07, 0x05,
        0x3b, 0x39, 0x3f, 0x3d, 0x33, 0x31, 0x37, 0x35, 0x2b, 0x29, 0x2f, 0x2d,
        0x23, 0x21, 0x27, 0x25, 0x5b, 0x59, 0x5f, 0x5d, 0x53, 0x51, 0x57, 0x55,
        0x4b, 0x49, 0x4f, 0x4d, 0x43, 0x41, 0x47, 0x45, 0x7b, 0x79, 0x7f, 0x7d,
        0x73, 0x71, 0x77, 0x75, 0x6b, 0x69, 0x6f, 0x6d, 0x63, 0x61, 0x67, 0x65,
        0x9b, 0x99, 0x9f, 0x9d, 0x93, 0x91, 0x97, 0x95, 0x8b, 0x89, 0x8f, 0x8d,
        0x83, 0x81, 0x87, 0x85, 0xbb, 0xb9, 0xbf, 0xbd, 0xb3, 0xb1, 0xb7, 0xb5,
        0xab, 0xa9, 0xaf, 0xad, 0xa3, 0xa1, 0xa7, 0xa5, 0xdb, 0xd9, 0xdf, 0xdd,
        0xd3, 0xd1, 0xd7, 0xd5, 0xcb, 0xc9, 0xcf, 0xcd, 0xc3, 0xc1, 0xc7, 0xc5,
        0xfb, 0xf9, 0xff, 0xfd, 0xf3, 0xf1, 0xf7, 0xf5, 0xeb, 0xe9, 0xef, 0xed,
        0xe3, 0xe1, 0xe7, 0xe5
        ], //*/ G2X = Gx(2),
    
    /*    G3X = [
        0x00, 0x03, 0x06, 0x05, 0x0c, 0x0f, 0x0a, 0x09, 0x18, 0x1b, 0x1e, 0x1d,
        0x14, 0x17, 0x12, 0x11, 0x30, 0x33, 0x36, 0x35, 0x3c, 0x3f, 0x3a, 0x39,
        0x28, 0x2b, 0x2e, 0x2d, 0x24, 0x27, 0x22, 0x21, 0x60, 0x63, 0x66, 0x65,
        0x6c, 0x6f, 0x6a, 0x69, 0x78, 0x7b, 0x7e, 0x7d, 0x74, 0x77, 0x72, 0x71,
        0x50, 0x53, 0x56, 0x55, 0x5c, 0x5f, 0x5a, 0x59, 0x48, 0x4b, 0x4e, 0x4d,
        0x44, 0x47, 0x42, 0x41, 0xc0, 0xc3, 0xc6, 0xc5, 0xcc, 0xcf, 0xca, 0xc9,
        0xd8, 0xdb, 0xde, 0xdd, 0xd4, 0xd7, 0xd2, 0xd1, 0xf0, 0xf3, 0xf6, 0xf5,
        0xfc, 0xff, 0xfa, 0xf9, 0xe8, 0xeb, 0xee, 0xed, 0xe4, 0xe7, 0xe2, 0xe1,
        0xa0, 0xa3, 0xa6, 0xa5, 0xac, 0xaf, 0xaa, 0xa9, 0xb8, 0xbb, 0xbe, 0xbd,
        0xb4, 0xb7, 0xb2, 0xb1, 0x90, 0x93, 0x96, 0x95, 0x9c, 0x9f, 0x9a, 0x99,
        0x88, 0x8b, 0x8e, 0x8d, 0x84, 0x87, 0x82, 0x81, 0x9b, 0x98, 0x9d, 0x9e,
        0x97, 0x94, 0x91, 0x92, 0x83, 0x80, 0x85, 0x86, 0x8f, 0x8c, 0x89, 0x8a,
        0xab, 0xa8, 0xad, 0xae, 0xa7, 0xa4, 0xa1, 0xa2, 0xb3, 0xb0, 0xb5, 0xb6,
        0xbf, 0xbc, 0xb9, 0xba, 0xfb, 0xf8, 0xfd, 0xfe, 0xf7, 0xf4, 0xf1, 0xf2,
        0xe3, 0xe0, 0xe5, 0xe6, 0xef, 0xec, 0xe9, 0xea, 0xcb, 0xc8, 0xcd, 0xce,
        0xc7, 0xc4, 0xc1, 0xc2, 0xd3, 0xd0, 0xd5, 0xd6, 0xdf, 0xdc, 0xd9, 0xda,
        0x5b, 0x58, 0x5d, 0x5e, 0x57, 0x54, 0x51, 0x52, 0x43, 0x40, 0x45, 0x46,
        0x4f, 0x4c, 0x49, 0x4a, 0x6b, 0x68, 0x6d, 0x6e, 0x67, 0x64, 0x61, 0x62,
        0x73, 0x70, 0x75, 0x76, 0x7f, 0x7c, 0x79, 0x7a, 0x3b, 0x38, 0x3d, 0x3e,
        0x37, 0x34, 0x31, 0x32, 0x23, 0x20, 0x25, 0x26, 0x2f, 0x2c, 0x29, 0x2a,
        0x0b, 0x08, 0x0d, 0x0e, 0x07, 0x04, 0x01, 0x02, 0x13, 0x10, 0x15, 0x16,
        0x1f, 0x1c, 0x19, 0x1a
        ], //*/ G3X = Gx(3),
    
    /*
        G9X = [
        0x00, 0x09, 0x12, 0x1b, 0x24, 0x2d, 0x36, 0x3f, 0x48, 0x41, 0x5a, 0x53,
        0x6c, 0x65, 0x7e, 0x77, 0x90, 0x99, 0x82, 0x8b, 0xb4, 0xbd, 0xa6, 0xaf,
        0xd8, 0xd1, 0xca, 0xc3, 0xfc, 0xf5, 0xee, 0xe7, 0x3b, 0x32, 0x29, 0x20,
        0x1f, 0x16, 0x0d, 0x04, 0x73, 0x7a, 0x61, 0x68, 0x57, 0x5e, 0x45, 0x4c,
        0xab, 0xa2, 0xb9, 0xb0, 0x8f, 0x86, 0x9d, 0x94, 0xe3, 0xea, 0xf1, 0xf8,
        0xc7, 0xce, 0xd5, 0xdc, 0x76, 0x7f, 0x64, 0x6d, 0x52, 0x5b, 0x40, 0x49,
        0x3e, 0x37, 0x2c, 0x25, 0x1a, 0x13, 0x08, 0x01, 0xe6, 0xef, 0xf4, 0xfd,
        0xc2, 0xcb, 0xd0, 0xd9, 0xae, 0xa7, 0xbc, 0xb5, 0x8a, 0x83, 0x98, 0x91,
        0x4d, 0x44, 0x5f, 0x56, 0x69, 0x60, 0x7b, 0x72, 0x05, 0x0c, 0x17, 0x1e,
        0x21, 0x28, 0x33, 0x3a, 0xdd, 0xd4, 0xcf, 0xc6, 0xf9, 0xf0, 0xeb, 0xe2,
        0x95, 0x9c, 0x87, 0x8e, 0xb1, 0xb8, 0xa3, 0xaa, 0xec, 0xe5, 0xfe, 0xf7,
        0xc8, 0xc1, 0xda, 0xd3, 0xa4, 0xad, 0xb6, 0xbf, 0x80, 0x89, 0x92, 0x9b,
        0x7c, 0x75, 0x6e, 0x67, 0x58, 0x51, 0x4a, 0x43, 0x34, 0x3d, 0x26, 0x2f,
        0x10, 0x19, 0x02, 0x0b, 0xd7, 0xde, 0xc5, 0xcc, 0xf3, 0xfa, 0xe1, 0xe8,
        0x9f, 0x96, 0x8d, 0x84, 0xbb, 0xb2, 0xa9, 0xa0, 0x47, 0x4e, 0x55, 0x5c,
        0x63, 0x6a, 0x71, 0x78, 0x0f, 0x06, 0x1d, 0x14, 0x2b, 0x22, 0x39, 0x30,
        0x9a, 0x93, 0x88, 0x81, 0xbe, 0xb7, 0xac, 0xa5, 0xd2, 0xdb, 0xc0, 0xc9,
        0xf6, 0xff, 0xe4, 0xed, 0x0a, 0x03, 0x18, 0x11, 0x2e, 0x27, 0x3c, 0x35,
        0x42, 0x4b, 0x50, 0x59, 0x66, 0x6f, 0x74, 0x7d, 0xa1, 0xa8, 0xb3, 0xba,
        0x85, 0x8c, 0x97, 0x9e, 0xe9, 0xe0, 0xfb, 0xf2, 0xcd, 0xc4, 0xdf, 0xd6,
        0x31, 0x38, 0x23, 0x2a, 0x15, 0x1c, 0x07, 0x0e, 0x79, 0x70, 0x6b, 0x62,
        0x5d, 0x54, 0x4f, 0x46
        ], //*/ G9X = Gx(9),
    
    /*    GBX = [
        0x00, 0x0b, 0x16, 0x1d, 0x2c, 0x27, 0x3a, 0x31, 0x58, 0x53, 0x4e, 0x45,
        0x74, 0x7f, 0x62, 0x69, 0xb0, 0xbb, 0xa6, 0xad, 0x9c, 0x97, 0x8a, 0x81,
        0xe8, 0xe3, 0xfe, 0xf5, 0xc4, 0xcf, 0xd2, 0xd9, 0x7b, 0x70, 0x6d, 0x66,
        0x57, 0x5c, 0x41, 0x4a, 0x23, 0x28, 0x35, 0x3e, 0x0f, 0x04, 0x19, 0x12,
        0xcb, 0xc0, 0xdd, 0xd6, 0xe7, 0xec, 0xf1, 0xfa, 0x93, 0x98, 0x85, 0x8e,
        0xbf, 0xb4, 0xa9, 0xa2, 0xf6, 0xfd, 0xe0, 0xeb, 0xda, 0xd1, 0xcc, 0xc7,
        0xae, 0xa5, 0xb8, 0xb3, 0x82, 0x89, 0x94, 0x9f, 0x46, 0x4d, 0x50, 0x5b,
        0x6a, 0x61, 0x7c, 0x77, 0x1e, 0x15, 0x08, 0x03, 0x32, 0x39, 0x24, 0x2f,
        0x8d, 0x86, 0x9b, 0x90, 0xa1, 0xaa, 0xb7, 0xbc, 0xd5, 0xde, 0xc3, 0xc8,
        0xf9, 0xf2, 0xef, 0xe4, 0x3d, 0x36, 0x2b, 0x20, 0x11, 0x1a, 0x07, 0x0c,
        0x65, 0x6e, 0x73, 0x78, 0x49, 0x42, 0x5f, 0x54, 0xf7, 0xfc, 0xe1, 0xea,
        0xdb, 0xd0, 0xcd, 0xc6, 0xaf, 0xa4, 0xb9, 0xb2, 0x83, 0x88, 0x95, 0x9e,
        0x47, 0x4c, 0x51, 0x5a, 0x6b, 0x60, 0x7d, 0x76, 0x1f, 0x14, 0x09, 0x02,
        0x33, 0x38, 0x25, 0x2e, 0x8c, 0x87, 0x9a, 0x91, 0xa0, 0xab, 0xb6, 0xbd,
        0xd4, 0xdf, 0xc2, 0xc9, 0xf8, 0xf3, 0xee, 0xe5, 0x3c, 0x37, 0x2a, 0x21,
        0x10, 0x1b, 0x06, 0x0d, 0x64, 0x6f, 0x72, 0x79, 0x48, 0x43, 0x5e, 0x55,
        0x01, 0x0a, 0x17, 0x1c, 0x2d, 0x26, 0x3b, 0x30, 0x59, 0x52, 0x4f, 0x44,
        0x75, 0x7e, 0x63, 0x68, 0xb1, 0xba, 0xa7, 0xac, 0x9d, 0x96, 0x8b, 0x80,
        0xe9, 0xe2, 0xff, 0xf4, 0xc5, 0xce, 0xd3, 0xd8, 0x7a, 0x71, 0x6c, 0x67,
        0x56, 0x5d, 0x40, 0x4b, 0x22, 0x29, 0x34, 0x3f, 0x0e, 0x05, 0x18, 0x13,
        0xca, 0xc1, 0xdc, 0xd7, 0xe6, 0xed, 0xf0, 0xfb, 0x92, 0x99, 0x84, 0x8f,
        0xbe, 0xb5, 0xa8, 0xa3
        ], //*/ GBX = Gx(0xb),
    
    /*
        GDX = [
        0x00, 0x0d, 0x1a, 0x17, 0x34, 0x39, 0x2e, 0x23, 0x68, 0x65, 0x72, 0x7f,
        0x5c, 0x51, 0x46, 0x4b, 0xd0, 0xdd, 0xca, 0xc7, 0xe4, 0xe9, 0xfe, 0xf3,
        0xb8, 0xb5, 0xa2, 0xaf, 0x8c, 0x81, 0x96, 0x9b, 0xbb, 0xb6, 0xa1, 0xac,
        0x8f, 0x82, 0x95, 0x98, 0xd3, 0xde, 0xc9, 0xc4, 0xe7, 0xea, 0xfd, 0xf0,
        0x6b, 0x66, 0x71, 0x7c, 0x5f, 0x52, 0x45, 0x48, 0x03, 0x0e, 0x19, 0x14,
        0x37, 0x3a, 0x2d, 0x20, 0x6d, 0x60, 0x77, 0x7a, 0x59, 0x54, 0x43, 0x4e,
        0x05, 0x08, 0x1f, 0x12, 0x31, 0x3c, 0x2b, 0x26, 0xbd, 0xb0, 0xa7, 0xaa,
        0x89, 0x84, 0x93, 0x9e, 0xd5, 0xd8, 0xcf, 0xc2, 0xe1, 0xec, 0xfb, 0xf6,
        0xd6, 0xdb, 0xcc, 0xc1, 0xe2, 0xef, 0xf8, 0xf5, 0xbe, 0xb3, 0xa4, 0xa9,
        0x8a, 0x87, 0x90, 0x9d, 0x06, 0x0b, 0x1c, 0x11, 0x32, 0x3f, 0x28, 0x25,
        0x6e, 0x63, 0x74, 0x79, 0x5a, 0x57, 0x40, 0x4d, 0xda, 0xd7, 0xc0, 0xcd,
        0xee, 0xe3, 0xf4, 0xf9, 0xb2, 0xbf, 0xa8, 0xa5, 0x86, 0x8b, 0x9c, 0x91,
        0x0a, 0x07, 0x10, 0x1d, 0x3e, 0x33, 0x24, 0x29, 0x62, 0x6f, 0x78, 0x75,
        0x56, 0x5b, 0x4c, 0x41, 0x61, 0x6c, 0x7b, 0x76, 0x55, 0x58, 0x4f, 0x42,
        0x09, 0x04, 0x13, 0x1e, 0x3d, 0x30, 0x27, 0x2a, 0xb1, 0xbc, 0xab, 0xa6,
        0x85, 0x88, 0x9f, 0x92, 0xd9, 0xd4, 0xc3, 0xce, 0xed, 0xe0, 0xf7, 0xfa,
        0xb7, 0xba, 0xad, 0xa0, 0x83, 0x8e, 0x99, 0x94, 0xdf, 0xd2, 0xc5, 0xc8,
        0xeb, 0xe6, 0xf1, 0xfc, 0x67, 0x6a, 0x7d, 0x70, 0x53, 0x5e, 0x49, 0x44,
        0x0f, 0x02, 0x15, 0x18, 0x3b, 0x36, 0x21, 0x2c, 0x0c, 0x01, 0x16, 0x1b,
        0x38, 0x35, 0x22, 0x2f, 0x64, 0x69, 0x7e, 0x73, 0x50, 0x5d, 0x4a, 0x47,
        0xdc, 0xd1, 0xc6, 0xcb, 0xe8, 0xe5, 0xf2, 0xff, 0xb4, 0xb9, 0xae, 0xa3,
        0x80, 0x8d, 0x9a, 0x97
        ], //*/ GDX = Gx(0xd),
    
    /*
        GEX = [
        0x00, 0x0e, 0x1c, 0x12, 0x38, 0x36, 0x24, 0x2a, 0x70, 0x7e, 0x6c, 0x62,
        0x48, 0x46, 0x54, 0x5a, 0xe0, 0xee, 0xfc, 0xf2, 0xd8, 0xd6, 0xc4, 0xca,
        0x90, 0x9e, 0x8c, 0x82, 0xa8, 0xa6, 0xb4, 0xba, 0xdb, 0xd5, 0xc7, 0xc9,
        0xe3, 0xed, 0xff, 0xf1, 0xab, 0xa5, 0xb7, 0xb9, 0x93, 0x9d, 0x8f, 0x81,
        0x3b, 0x35, 0x27, 0x29, 0x03, 0x0d, 0x1f, 0x11, 0x4b, 0x45, 0x57, 0x59,
        0x73, 0x7d, 0x6f, 0x61, 0xad, 0xa3, 0xb1, 0xbf, 0x95, 0x9b, 0x89, 0x87,
        0xdd, 0xd3, 0xc1, 0xcf, 0xe5, 0xeb, 0xf9, 0xf7, 0x4d, 0x43, 0x51, 0x5f,
        0x75, 0x7b, 0x69, 0x67, 0x3d, 0x33, 0x21, 0x2f, 0x05, 0x0b, 0x19, 0x17,
        0x76, 0x78, 0x6a, 0x64, 0x4e, 0x40, 0x52, 0x5c, 0x06, 0x08, 0x1a, 0x14,
        0x3e, 0x30, 0x22, 0x2c, 0x96, 0x98, 0x8a, 0x84, 0xae, 0xa0, 0xb2, 0xbc,
        0xe6, 0xe8, 0xfa, 0xf4, 0xde, 0xd0, 0xc2, 0xcc, 0x41, 0x4f, 0x5d, 0x53,
        0x79, 0x77, 0x65, 0x6b, 0x31, 0x3f, 0x2d, 0x23, 0x09, 0x07, 0x15, 0x1b,
        0xa1, 0xaf, 0xbd, 0xb3, 0x99, 0x97, 0x85, 0x8b, 0xd1, 0xdf, 0xcd, 0xc3,
        0xe9, 0xe7, 0xf5, 0xfb, 0x9a, 0x94, 0x86, 0x88, 0xa2, 0xac, 0xbe, 0xb0,
        0xea, 0xe4, 0xf6, 0xf8, 0xd2, 0xdc, 0xce, 0xc0, 0x7a, 0x74, 0x66, 0x68,
        0x42, 0x4c, 0x5e, 0x50, 0x0a, 0x04, 0x16, 0x18, 0x32, 0x3c, 0x2e, 0x20,
        0xec, 0xe2, 0xf0, 0xfe, 0xd4, 0xda, 0xc8, 0xc6, 0x9c, 0x92, 0x80, 0x8e,
        0xa4, 0xaa, 0xb8, 0xb6, 0x0c, 0x02, 0x10, 0x1e, 0x34, 0x3a, 0x28, 0x26,
        0x7c, 0x72, 0x60, 0x6e, 0x44, 0x4a, 0x58, 0x56, 0x37, 0x39, 0x2b, 0x25,
        0x0f, 0x01, 0x13, 0x1d, 0x47, 0x49, 0x5b, 0x55, 0x7f, 0x71, 0x63, 0x6d,
        0xd7, 0xd9, 0xcb, 0xc5, 0xef, 0xe1, 0xf3, 0xfd, 0xa7, 0xa9, 0xbb, 0xb5,
        0x9f, 0x91, 0x83, 0x8d
        ], //*/ GEX = Gx(0xe),
    
        enc = function(string, pass, binary) {
            // string, password in plaintext
            var salt = randArr(8),
            pbe = openSSLKey(s2a(pass, binary), salt),
            key = pbe.key,
            iv = pbe.iv,
            cipherBlocks,
            saltBlock = [[83, 97, 108, 116, 101, 100, 95, 95].concat(salt)];
            string = s2a(string, binary);
            cipherBlocks = rawEncrypt(string, key, iv);
            // Spells out 'Salted__'
            cipherBlocks = saltBlock.concat(cipherBlocks);
            return Base64.encode(cipherBlocks);
        },
    
        dec = function(string, pass, binary) {
            // string, password in plaintext
            var cryptArr = Base64.decode(string),
            salt = cryptArr.slice(8, 16),
            pbe = openSSLKey(s2a(pass, binary), salt),
            key = pbe.key,
            iv = pbe.iv;
            cryptArr = cryptArr.slice(16, cryptArr.length);
            // Take off the Salted__ffeeddcc
            string = rawDecrypt(cryptArr, key, iv, binary);
            return string;
        },
        
        MD5 = function(numArr) {
    
            function rotateLeft(lValue, iShiftBits) {
                return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
            }
    
            function addUnsigned(lX, lY) {
                var lX4,
                lY4,
                lX8,
                lY8,
                lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
                } else {
                    return (lResult ^ lX8 ^ lY8);
                }
            }
    
            function f(x, y, z) {
                return (x & y) | ((~x) & z);
            }
            function g(x, y, z) {
                return (x & z) | (y & (~z));
            }
            function h(x, y, z) {
                return (x ^ y ^ z);
            }
            function funcI(x, y, z) {
                return (y ^ (x | (~z)));
            }
    
            function ff(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            }
    
            function gg(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            }
    
            function hh(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            }
    
            function ii(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(funcI(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            }
    
            function convertToWordArray(numArr) {
                var lWordCount,
                lMessageLength = numArr.length,
                lNumberOfWords_temp1 = lMessageLength + 8,
                lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64,
                lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16,
                lWordArray = [],
                lBytePosition = 0,
                lByteCount = 0;
                while (lByteCount < lMessageLength) {
                    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                    lBytePosition = (lByteCount % 4) * 8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (numArr[lByteCount] << lBytePosition));
                    lByteCount++;
                }
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
                lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                return lWordArray;
            }
    
            function wordToHex(lValue) {
                var lByte,
                lCount,
                wordToHexArr = [];
                for (lCount = 0; lCount <= 3; lCount++) {
                    lByte = (lValue >>> (lCount * 8)) & 255;
                    wordToHexArr = wordToHexArr.concat(lByte);
                 }
                return wordToHexArr;
            }
    
            /*function utf8Encode(string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "",
                n,
                c;
    
                for (n = 0; n < string.length; n++) {
    
                    c = string.charCodeAt(n);
    
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
    
                }
    
                return utftext;
            }*/
    
            var x = [],
            k,
            AA,
            BB,
            CC,
            DD,
            a,
            b,
            c,
            d,
            rnd = strhex('67452301efcdab8998badcfe10325476d76aa478e8c7b756242070dbc1bdceeef57c0faf4787c62aa8304613fd469501698098d88b44f7afffff5bb1895cd7be6b901122fd987193a679438e49b40821f61e2562c040b340265e5a51e9b6c7aad62f105d02441453d8a1e681e7d3fbc821e1cde6c33707d6f4d50d87455a14eda9e3e905fcefa3f8676f02d98d2a4c8afffa39428771f6816d9d6122fde5380ca4beea444bdecfa9f6bb4b60bebfbc70289b7ec6eaa127fad4ef308504881d05d9d4d039e6db99e51fa27cf8c4ac5665f4292244432aff97ab9423a7fc93a039655b59c38f0ccc92ffeff47d85845dd16fa87e4ffe2ce6e0a30143144e0811a1f7537e82bd3af2352ad7d2bbeb86d391',8);
    
            x = convertToWordArray(numArr);
    
            a = rnd[0];
            b = rnd[1];
            c = rnd[2];
            d = rnd[3];
    
            for (k = 0; k < x.length; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = ff(a, b, c, d, x[k + 0], 7, rnd[4]);
                d = ff(d, a, b, c, x[k + 1], 12, rnd[5]);
                c = ff(c, d, a, b, x[k + 2], 17, rnd[6]);
                b = ff(b, c, d, a, x[k + 3], 22, rnd[7]);
                a = ff(a, b, c, d, x[k + 4], 7, rnd[8]);
                d = ff(d, a, b, c, x[k + 5], 12, rnd[9]);
                c = ff(c, d, a, b, x[k + 6], 17, rnd[10]);
                b = ff(b, c, d, a, x[k + 7], 22, rnd[11]);
                a = ff(a, b, c, d, x[k + 8], 7, rnd[12]);
                d = ff(d, a, b, c, x[k + 9], 12, rnd[13]);
                c = ff(c, d, a, b, x[k + 10], 17, rnd[14]);
                b = ff(b, c, d, a, x[k + 11], 22, rnd[15]);
                a = ff(a, b, c, d, x[k + 12], 7, rnd[16]);
                d = ff(d, a, b, c, x[k + 13], 12, rnd[17]);
                c = ff(c, d, a, b, x[k + 14], 17, rnd[18]);
                b = ff(b, c, d, a, x[k + 15], 22, rnd[19]);
                a = gg(a, b, c, d, x[k + 1], 5, rnd[20]);
                d = gg(d, a, b, c, x[k + 6], 9, rnd[21]);
                c = gg(c, d, a, b, x[k + 11], 14, rnd[22]);
                b = gg(b, c, d, a, x[k + 0], 20, rnd[23]);
                a = gg(a, b, c, d, x[k + 5], 5, rnd[24]);
                d = gg(d, a, b, c, x[k + 10], 9, rnd[25]);
                c = gg(c, d, a, b, x[k + 15], 14, rnd[26]);
                b = gg(b, c, d, a, x[k + 4], 20, rnd[27]);
                a = gg(a, b, c, d, x[k + 9], 5, rnd[28]);
                d = gg(d, a, b, c, x[k + 14], 9, rnd[29]);
                c = gg(c, d, a, b, x[k + 3], 14, rnd[30]);
                b = gg(b, c, d, a, x[k + 8], 20, rnd[31]);
                a = gg(a, b, c, d, x[k + 13], 5, rnd[32]);
                d = gg(d, a, b, c, x[k + 2], 9, rnd[33]);
                c = gg(c, d, a, b, x[k + 7], 14, rnd[34]);
                b = gg(b, c, d, a, x[k + 12], 20, rnd[35]);
                a = hh(a, b, c, d, x[k + 5], 4, rnd[36]);
                d = hh(d, a, b, c, x[k + 8], 11, rnd[37]);
                c = hh(c, d, a, b, x[k + 11], 16, rnd[38]);
                b = hh(b, c, d, a, x[k + 14], 23, rnd[39]);
                a = hh(a, b, c, d, x[k + 1], 4, rnd[40]);
                d = hh(d, a, b, c, x[k + 4], 11, rnd[41]);
                c = hh(c, d, a, b, x[k + 7], 16, rnd[42]);
                b = hh(b, c, d, a, x[k + 10], 23, rnd[43]);
                a = hh(a, b, c, d, x[k + 13], 4, rnd[44]);
                d = hh(d, a, b, c, x[k + 0], 11, rnd[45]);
                c = hh(c, d, a, b, x[k + 3], 16, rnd[46]);
                b = hh(b, c, d, a, x[k + 6], 23, rnd[47]);
                a = hh(a, b, c, d, x[k + 9], 4, rnd[48]);
                d = hh(d, a, b, c, x[k + 12], 11, rnd[49]);
                c = hh(c, d, a, b, x[k + 15], 16, rnd[50]);
                b = hh(b, c, d, a, x[k + 2], 23, rnd[51]);
                a = ii(a, b, c, d, x[k + 0], 6, rnd[52]);
                d = ii(d, a, b, c, x[k + 7], 10, rnd[53]);
                c = ii(c, d, a, b, x[k + 14], 15, rnd[54]);
                b = ii(b, c, d, a, x[k + 5], 21, rnd[55]);
                a = ii(a, b, c, d, x[k + 12], 6, rnd[56]);
                d = ii(d, a, b, c, x[k + 3], 10, rnd[57]);
                c = ii(c, d, a, b, x[k + 10], 15, rnd[58]);
                b = ii(b, c, d, a, x[k + 1], 21, rnd[59]);
                a = ii(a, b, c, d, x[k + 8], 6, rnd[60]);
                d = ii(d, a, b, c, x[k + 15], 10, rnd[61]);
                c = ii(c, d, a, b, x[k + 6], 15, rnd[62]);
                b = ii(b, c, d, a, x[k + 13], 21, rnd[63]);
                a = ii(a, b, c, d, x[k + 4], 6, rnd[64]);
                d = ii(d, a, b, c, x[k + 11], 10, rnd[65]);
                c = ii(c, d, a, b, x[k + 2], 15, rnd[66]);
                b = ii(b, c, d, a, x[k + 9], 21, rnd[67]);
                a = addUnsigned(a, AA);
                b = addUnsigned(b, BB);
                c = addUnsigned(c, CC);
                d = addUnsigned(d, DD);
            }
    
            return wordToHex(a).concat(wordToHex(b), wordToHex(c), wordToHex(d));
        },
    
        encString = function(plaintext, key, iv) {
            var i;
            plaintext = s2a(plaintext);
    
            key = s2a(key);
            for (i=key.length; i<32; i++){
                key[i] = 0;
            }
    
            if (iv === undefined) {
                // TODO: This is not defined anywhere... commented out...
                // iv = genIV();
            } else {
                iv = s2a(iv);
                for (i=iv.length; i<16; i++){
                    iv[i] = 0;
                }
            }
    
            var ct = rawEncrypt(plaintext, key, iv);
            var ret = [iv];
            for (i=0; i<ct.length; i++){
                ret[ret.length] = ct[i];
            }
            return Base64.encode(ret);
        },
    
        decString = function(ciphertext, key) {
            var tmp = Base64.decode(ciphertext);
            var iv = tmp.slice(0, 16);
            var ct = tmp.slice(16, tmp.length);
            var i;
    
            key = s2a(key);
            for (i=key.length; i<32; i++){
                key[i] = 0;
            }
    
            var pt = rawDecrypt(ct, key, iv, false);
            return pt;
        },
    
        Base64 = (function(){
            // Takes a Nx16x1 byte array and converts it to Base64
            var _chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
            chars = _chars.split(''),
            
            encode = function(b, withBreaks) {
                var flatArr = [],
                b64 = '',
                i,
                broken_b64,
                totalChunks = Math.floor(b.length * 16 / 3);
                for (i = 0; i < b.length * 16; i++) {
                    flatArr.push(b[Math.floor(i / 16)][i % 16]);
                }
                for (i = 0; i < flatArr.length; i = i + 3) {
                    b64 += chars[flatArr[i] >> 2];
                    b64 += chars[((flatArr[i] & 3) << 4) | (flatArr[i + 1] >> 4)];
                    if ( flatArr[i + 1] !== undefined ) {
                        b64 += chars[((flatArr[i + 1] & 15) << 2) | (flatArr[i + 2] >> 6)];
                    } else {
                        b64 += '=';
                    }
                    if ( flatArr[i + 2] !== undefined ) {
                        b64 += chars[flatArr[i + 2] & 63];
                    } else {
                        b64 += '=';
                    }
                }
                // OpenSSL is super particular about line breaks
                broken_b64 = b64.slice(0, 64) + '\n';
                for (i = 1; i < (Math.ceil(b64.length / 64)); i++) {
                    broken_b64 += b64.slice(i * 64, i * 64 + 64) + (Math.ceil(b64.length / 64) === i + 1 ? '': '\n');
                }
                return broken_b64;
            },
            
            decode = function(string) {
                string = string.replace(/\n/g, '');
                var flatArr = [],
                c = [],
                b = [],
                i;
                for (i = 0; i < string.length; i = i + 4) {
                    c[0] = _chars.indexOf(string.charAt(i));
                    c[1] = _chars.indexOf(string.charAt(i + 1));
                    c[2] = _chars.indexOf(string.charAt(i + 2));
                    c[3] = _chars.indexOf(string.charAt(i + 3));
    
                    b[0] = (c[0] << 2) | (c[1] >> 4);
                    b[1] = ((c[1] & 15) << 4) | (c[2] >> 2);
                    b[2] = ((c[2] & 3) << 6) | c[3];
                    flatArr.push(b[0], b[1], b[2]);
                }
                flatArr = flatArr.slice(0, flatArr.length - (flatArr.length % 16));
                return flatArr;
            };
            
            //internet explorer
            if(typeof Array.indexOf === "function") {
                _chars = chars;
            }
            
            /*
            //other way to solve internet explorer problem
            if(!Array.indexOf){
                Array.prototype.indexOf = function(obj){
                    for(var i=0; i<this.length; i++){
                        if(this[i]===obj){
                            return i;
                        }
                    }
                    return -1;
                }
            }
            */
            
            
            return {
                "encode": encode,
                "decode": decode
            };
        })();
    
        return {
            "size": size,
            "h2a":h2a,
            "expandKey":expandKey,
            "encryptBlock":encryptBlock,
            "decryptBlock":decryptBlock,
            "Decrypt":Decrypt,
            "s2a":s2a,
            "rawEncrypt":rawEncrypt,
            "rawDecrypt":rawDecrypt,
            "dec":dec,
            "openSSLKey":openSSLKey,
            "a2h":a2h,
            "enc":enc,
            "Hash":{"MD5":MD5},
            "Base64":Base64
        };
    
    }));/*!
 * chat-main.js
 * https://destruct.co
 *
 * Copyright 2014 Brenden Ellingboe (brenden@brenden.me)
 *
 */
var _Chat = (function($) {
    
    $(function(){
        
        if (!$("body").hasClass("chat-main")) {
            return;
        }
        
        var key_size = 2048
        var key_splitter = "|**|";
        var valid_storage_change = false;
        var curr_active_cid;
        var curr_cid;
        var curr_interval;
        var lazy_reload_ms = 10000;
    
        var _priv = {
            accessCheck: function() {
                $.getJSON("/keys/ajax/access.php", function(r) {
                    if (r.id !== 0) {
                        var stored_pass = window.localStorage.getItem(r.email);
                        if (stored_pass) {
                            try {
                                 window.user_pass = unciph(r.email, stored_pass);
                            } catch(e) {
                                valid_storage_change = false;
                                window.localStorage.removeItem( window.localStorage.key(0) );
                            }
                        }
                        loadUserPage(r.email);
                    } else {
                        valid_storage_change = true;
                        window.localStorage.removeItem( window.localStorage.key(0) );
                        $("#login_signup").fadeIn();
                    }
                });
            },
            sendMessageToActiveChatSession: function(t, cb) {
                var pub_arr = [];
                
                var pub_key_contact = $("#curr_chat_pub_key").val();
                var cid = curr_active_cid.attr("data-cid");
                var aesKey = random_string(32);
    
                var pub_key_obj = window.openpgp.key.readArmored(pub_key_contact);
                var pub_key = pub_key_obj.keys[0];
                pub_arr.push(pub_key);
                
                var my_pub_key_obj = window.openpgp.key.readArmored(window.user_pubkey);
                var my_pub_key = my_pub_key_obj.keys[0];
                pub_arr.push(my_pub_key);
                
                var enc_key = window.openpgp.encryptMessage(pub_arr, aesKey);
                var enc_text = ciph(aesKey, t);
    
                
                $.post("/chat/ajax/convo.php?cid=" + cid, {t: enc_text, k: enc_key}, function(r) {
                    cb(r);
                }, "json");
    
            },
            loadConversation: function(c, cb) {
                $.getJSON("/chat/ajax/convo.php?cid=" + c, function(r) {
                    cb(r);
                });
            },
            rejectContactRequest: function(c, u, cb) {
                $.post("/chat/ajax/contacts.php", {uid: u, cid: c, action: "reject"}, function(r) {
                    cb(r);
                }, "json");
            },
            approveContactRequest: function(c, u, cb) {
                $.post("/chat/ajax/contacts.php", {uid: u, cid: c, action: "approve"}, function(r) {
                    cb(r);
                }, "json");
            },
            sendContactRequest:  function(id, cb) {
                $.post("/chat/ajax/contacts.php", {uid: id}, function(r) {
                    cb(r);
                }, "json");
            },
            searchForContacts: function(s, cb) {
                $.getJSON("/chat/ajax/search.php?s=" + s, function(r) {
                    var res = [];
                    if ("undefined" !== typeof r.users) {
                        var res = r.users;
                    }
                    cb(res);
                });
            },
            loadUserContacts: function() {
                $.getJSON("/chat/ajax/contacts.php", function(r) {
                    var list_html = $(".contact-list");
                    var req_html = $(".contact-requests");
                    var sent_html = $(".contact-sent");
                    
                    list_html.empty();
                    req_html.empty();
                    sent_html.empty();
                    
                    var contacts = r.contacts.list;
                    var sent = r.contacts.sent;
                    var req = r.contacts.requests;
                    
                    if (contacts.length == 0) {
                        $("<span>")
                            .addClass("contact-item")
                            .addClass("list-empty")
                            .html("No contacts.")
                            .appendTo(list_html);
                    }
                    
                    for (var i=0; i<contacts.length; i++) {
                        var contact = contacts[i];
                        var unread_msg = contact.contact_conversation.unread;
                        
                        var contact_obj = $("<span>")
                            .addClass("btn-clear")
                            .addClass("contact-item")
                            .addClass("contact-approved")
                            .attr("data-uid", contact.contact_user.uid)
                            .attr("data-cid", contact.contact_data.cid)
                            .html(contact.contact_user.e)
                            .appendTo(list_html);
                        
                        if (unread_msg > 0) {
                            $("<span>")
                                .addClass("unread-badge")
                                .html(unread_msg)
                                .appendTo(contact_obj);
                        }

                    }
                    
                    if (req.length == 0) {
                        $("<span>")
                            .addClass("contact-item")
                            .addClass("list-empty")
                            .html("No contact requests.")
                            .appendTo(req_html);
                    }
                    
                    for (var i=0; i<req.length; i++) {
                        var c_req = req[i];
                        var contact_item = $("<span>")
                            .addClass("btn-clear")
                            .addClass("contact-item")
                            .addClass("contact-request")
                            .attr("data-uid", c_req.contact_user.uid)
                            .attr("data-cid", c_req.contact_data.cid)
                            .html(c_req.contact_user.e)
                            .appendTo(req_html);
                            
                        var req_actions = $("<div>")
                            .addClass("hide")
                            .addClass("req-action")
                            .addClass("box-dark-open")
                            .attr("id", "request-"+c_req.contact_data.cid+"-action")
                            .appendTo(req_html);
                            
                        var req_ok = $("<span>")
                            .addClass("btn")
                            .addClass("btn-green")
                            .addClass("btn-small")
                            .addClass("req-approve")
                            .html("Approve")
                            .appendTo(req_actions);
                            
                        var req_reject = $("<span>")
                            .addClass("btn")
                            .addClass("btn-red")
                            .addClass("btn-small")
                            .addClass("req-reject")
                            .html("Reject")
                            .appendTo(req_actions);
                    }
                    
                    if (sent.length == 0) {
                        $("<span>")
                            .addClass("contact-item")
                            .addClass("list-empty")
                            .html("No sent requests.")
                            .appendTo(sent_html);
                    }
                    
                    for (var i=0; i<sent.length; i++) {
                        var c_sent = sent[i];
                        $("<span>")
                            .addClass("btn-clear")
                            .addClass("contact-item")
                            .addClass("contact-sent")
                            .attr("data-uid", c_sent.contact_user.uid)
                            .attr("data-cid", c_sent.contact_data.cid)
                            .html(c_sent.contact_user.e)
                            .appendTo(sent_html);
                    }
                });
            },
            dcKey: function(kd, ep) {
                try {
                    var k_str = unciph(ep, kd);
                } catch(e) {
                    window.user_pass = undefined;
                    delete window.user_pass;
                    window.localStorage.removeItem(window.user_email);
                }
                
                if (k_str) {
                    window.localStorage.setItem(window.user_email, ciph(window.user_email, window.user_pass));
                    var keys_sep = k_str.split(key_splitter);
                    return keys_sep;
                }
                return false;
            },
            generateKey: function(e, p, l, cb) {
                var
                    new_key_pair = window.openpgp.generateKeyPair(1, key_size, l+" <"+e+">", e+p)
                    , priv = new_key_pair.privateKeyArmored
                    , pub = new_key_pair.publicKeyArmored
                    , raw_key = JSON.stringify(new_key_pair.key)
                    , key_arr = new Array();
                    
                key_arr.push(priv);
                key_arr.push(pub);
                key_arr.push(raw_key);
                var keys_joined = key_arr.join(key_splitter);
                
                try {
                    var enc_key_str = ciph(e+p, keys_joined);
                } catch(err) {
                    console.log(err);
                }
                if (enc_key_str) {
                    $.post("/keys/ajax/regkey.php", {d: enc_key_str, l: l, pub: pub}, function(r) {
                        if (r.key_err == true) {
                            alert("Error saving keypair.");
                            $("#do_logout").simulate("click");
                        } else {
                            cb(e, p);
                        }
                    }, "json");
                }
                return;
            },
            loadUserKeypair: function() {
                $.getJSON("/keys/ajax/keys.php?chat", function(r) {
                    var keys = r.keys;
                    var kp = false;
                    var voluntary_logout = false;
                    
                    if ("undefined" == typeof keys) {
                        return false;
                    }
                    
                    for (var i=0; i<keys.length; i++) {
                        var key = keys[i];
                        kp = _priv.unlockKeypair(key.key_data);
                        
                        while (kp == false) {
                            window.user_pass = prompt("Enter your password to unlock your private key:");
                            kp = _priv.unlockKeypair(key.key_data);
    
                            if (!kp) {
                                var will_try_again = confirm("INCORRECT PASSWORD!\n\nWould you like to try again? If you choose not to, you will be logged out because we will not be able to secure your session.\n\nIf you have repeat problems with your password, you will need to create a new account but this email address will not be usable.");
                                if (!will_try_again) {
                                    kp = true;
                                    voluntary_logout = true;
                                }
                            }
                        }
                        
                        if (voluntary_logout) {
                            $("#do_logout").simulate("click");
                            return false;
                        }
                        
                        window.user_pubkey = kp[1];
                        window.user_privkey = kp[0];
                        
                        var privKey_aromor = window.openpgp.key.readArmored(window.user_privkey);
                        var priv_key = privKey_aromor.keys[0];
                        
                        window.user_privkey_unlock_pass = priv_key.decrypt(window.user_email+window.user_pass);
                        
                        if (window.user_privkey_unlock_pass) {
                            window.user_privkey_unlocked = priv_key;
                        }
                    }
                    
                    return true;
                });
            },
            unlockKeypair: function(data) {
                var ep = window.user_email+window.user_pass;
                var key_unlocked = _priv.dcKey(data, ep);
                
                return key_unlocked;
            },
            initUser: function (e, p) {
                window.user_pass = p;
                loadUserPage(e);
            },
            reloadConversation: function(cid, $this) {
                var conversation_stream = $(".conversation-output-stream");
                
                $(".conversation-output-stream").empty();
                $this.find(".unread-badge").remove();
                
                _priv.loadConversation(cid, function(_r){
                    if (_r.err) {
                        $(".needs-active-chat").hide();
                        alert(_r.m);
                        return;
                    }
                    $(".conversation-output").fadeIn();
                    
                    curr_cid = cid;
                    curr_active_cid = $this;
                    
                    curr_active_cid.addClass("box-dark-open");
                    curr_active_cid.addClass("active-chat");
                    var user = _r.conversation_data.user;
                    $("#conversation-header").html("Conversation with "+user.user_email);
                    window.localStorage.setItem("chat_"+window.user_email+"_"+cid, user.user_chat_public_key);
                    $("#curr_chat_pub_key").val(user.user_chat_public_key);
                    $(".needs-active-chat").show();
                    
                    var m = _r.messages;
                    
                    if (m.length > 0) {
                        m.reverse();
                    }
        
                    for(var i=0; i<m.length; i++) {
                        var msg = m[i];
                        var msg_obj = msg.data;
                        var msg_k_enc = msg_obj.k;
                        var msg_t_enc = msg_obj.t;
                        
                        var priv_key_obj = window.user_privkey_unlocked;
                        var msg_key_obj = window.openpgp.message.readArmored(msg_k_enc);
                        var dec_key = window.openpgp.decryptMessage(priv_key_obj, msg_key_obj);
                        var dec_msg_text = unciph(dec_key, msg_t_enc);
                        
                        dec_msg_text = "<p>"+dec_msg_text.replace("\n", "</p><p>")+"</p>";
                        
                        var email_display = "You";
                        var msg_class = "msg-me";
                        
                        if (msg.user_email !== window.user_email) {
                            email_display = msg.user_email;
                            msg_class = "msg-them";
                            if (msg.is_new) {
                                msg_class = "msg-new";
                            }
                        }
                        
                        var msg_date = "<span class='msg-ts'>"+msg.sent_ts.date+"</span>";
                        
                        email_display = "<span class='msg-name'>"+email_display+"</span>";
                        email_display = email_display+":"+msg_date;
                        
                        var new_msg = $("<div>")
                            .addClass("msg-text-entry")
                            .addClass(msg_class)
                            .html(email_display+"<br>"+dec_msg_text)
                            .appendTo(conversation_stream);
                        
                        conversation_stream.scrollTop(conversation_stream.prop('scrollHeight') + 999);
                    }
                    
                    _priv.stopRefreshInterval();
                    _priv.setOffRefreshInterval();
                    
                });
            },
            setOffRefreshInterval: function() {
                curr_interval = setInterval(function(){
                    _priv.reloadConversation(curr_cid, curr_active_cid);
                }, lazy_reload_ms);
            },
            stopRefreshInterval: function() {
                if ("undefined" !== typeof curr_interval) {
                    window.clearInterval(curr_interval);
                }
            }
        };
        
        var loadUserPage = function(em) {
            window.user_email = em;
            _priv.loadUserKeypair();
            $("#login_signup").remove();
            $(".needs-logged-in").fadeIn();
            $("body").toggleClass("landing");
            $(".user-info").html(window.user_email);
            _priv.loadUserContacts();
        };
        
        /*
         *
         * TODO: refactor storage listener.
         *
        $(window).bind('storage', function (e) {
            if (e.originalEvent.newValue !== e.originalEvent.oldValue && !valid_storage_change) {
                alert('Oops! Internal data modified. You will need to re-enter your password.');
                window.localStorage.removeItem(window.user_email);
                window.location.reload();
            }
        });
        */
        
        $(".contact-search-text").on("keyup", function() {
            var search_res_display = $(".contact-search-results");
            var search_text = $(this).val();
            search_res_display.removeClass("box-shape").html(" . . . ");
            
            if (search_text.length == 0) {
                search_res_display.removeClass("box-shape").html("");
                return;
            }
            
            var search_res = _priv.searchForContacts(search_text, function(_r){
                if (_r.length == 0) {
                    search_res_display.addClass("box-shape").html("No results.");
                    return;
                } else {
                    search_res_display.removeClass("box-shape").html("");
                    for (var i=0; i<_r.length; i++) {
                        var u = _r[i];
                        $("<span>").addClass("btn-clear").addClass("add-contact-action").attr("data-uid", u.id).html(u.e).appendTo(search_res_display);
                    }
                }
            });
        });
        
        $(".contacts-list").on("click", ".add-contact-action", function() {
            _priv.sendContactRequest($(this).attr("data-uid"), function(_r){
                $(".contact-search-close").click();
                if (_r.sent) {
                    _priv.loadUserContacts();
                }
                alert(_r.m);
            });
        });
        
        $(".contacts-list").on("click", ".contact-request", function() {
            $(this).toggleClass("box-dark-open");
            var cid = $(this).attr("data-cid");
            var req_action = $("#request-"+cid+"-action");
            req_action.toggle();
        });
        
        $(".contacts-list").on("click", ".req-approve", function() {
            var parentContainer = $(this).parent().siblings(".contact-item");
            var cid = parentContainer.attr("data-cid");
            var uid = parentContainer.attr("data-uid");
            
            _priv.approveContactRequest(cid, uid, function(_r){
                parentContainer.click();
                if (!_r.err) {
                    _priv.loadUserContacts();
                } else {
                    alert(_r.m);
                }
            });
        });
        
        $(".contacts-list").on("click", ".req-reject", function() {
            var parentContainer = $(this).parent().siblings(".contact-item");
            var cid = parentContainer.attr("data-cid");
            var uid = parentContainer.attr("data-uid");
            
            _priv.rejectContactRequest(cid, uid, function(_r){
                parentContainer.click();
                if (!_r.err) {
                    _priv.loadUserContacts();
                } else {
                    alert(_r.m);
                }
            });
        });
        
        $(".conversation-text-input").on("keydown", function(e){
            var msg = $(this).val();
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                _priv.sendMessageToActiveChatSession(msg, function(_r){
                    if (!_r.err) {
                        $(".conversation-text-input").val("");
                        _priv.stopRefreshInterval();
                        _priv.reloadConversation(curr_active_cid.attr("data-cid"), curr_active_cid);
                    } else {
                        alert(_r.m);
                    }
                });
                return false;
            }
            return true;
        });
        
        $(".contacts-list").on("click", ".contact-approved", function() {
            var $this = $(this);
            var cid = $this.attr("data-cid");
            var this_active = $this.hasClass("active-chat");
            
            _priv.stopRefreshInterval();
            
            $(".conversation-output").fadeOut();
            $(".welcome-screen").fadeOut();
            
            if ("object" == typeof curr_active_cid) {
                curr_active_cid.removeClass("box-dark-open").removeClass("active-chat");
                if (this_active) {
                    curr_active_cid = undefined;
                    curr_cid = undefined;
                    curr_interval = undefined;
                    $(".welcome-screen").fadeIn();
                    return;
                }
            }
            
            _priv.reloadConversation(cid, $this);
        });
        
        $(".contact-search").on("click", function(){
            $(".contact-search-form").toggle();
            $(".contact-search-text").focus();
        });
        
        $(".close-btn").on("click", function() {
            $(this).closest(".form-group").toggle();
        });
        
        $("#user_form").submit(function(){
                var email = $("#login_e").val();
                var pass = $("#login_p").val();
                $.post("/keys/ajax/lookup.php", {em:email, pw:pass}, function(R) {
                    if (R.id == 0) {
                        alert("Error logging in or creating account.");
                        return false;
                    }
                    
                    if (R.is_new == true) {
                        _priv.generateKey(email, pass, "Chat", function(e, p){
                            _priv.initUser(e, p);
                        });
                    } else {
                        _priv.initUser(email, pass);
                    }
    
                    return false;
                }, "json")
                .fail(function(d) {
                    return false;
                });
                
                return false;
        });
    
        _priv.accessCheck();
    
    });
})(jQuery);/*!
 * keys-main.js
 * https://destruct.co
 *
 * Copyright 2014 Brenden Ellingboe (brenden@brenden.me)
 *
 */
var _Keys = (function($) {

    $(function(){
        
        if (!$("body").hasClass("keys-main")) {
            return;
        }
        
        var nl2br = function(str, is_xhtml) {
               var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
               return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
       };
       
       var key_size = 2048;
        
        var key_splitter = "|**|";
        var key_list = $("#userKeysList");
        var pub_key_list = $("#userPubKeysList");
        var new_key_btn = $("#createNewKeyBtn");
        var new_pub_key_btn = $("#createNewPubKeyBtn");
        var key_item_tpl = $("#keyItemEntry");
        var pub_key_item_tpl = $("#pubkeyItemEntry");
        var user_page = $("#userAccountPage");
        
        var _priv = {
            createHiddenModalEl: function() {
                $("<img>").addClass("modal-hack").css({width: 0, height: 0}).appendTo($("body"));
            },
            removeHiddenModalEl: function() {
                $(".modal-hack").remove();
            },
            getHiddenModalEl: function() {
                return $(".modal-hack");
            },
            dcKey: function(kd, ep) {
                try {
                    var k_str = unciph(ep, kd);
                } catch(e) {
                    alert("Invalid password.");
                }
                
                if (k_str) {
                    var keys_sep = k_str.split(key_splitter);
                    return keys_sep;
                }
                return false;
            },
            keyPairDropdown: function() {
                var dropdown = $("<select>");
                $("#userKeysList .is-unlocked").each(function (index, value) {
                    var key_id = $(this).attr("data-key-id");
                    var key_label = $(this).find(".keyLabel").html();
                    var option_item = $("<option>").val(key_id).html(key_label).appendTo(dropdown);
                });
                return dropdown;
            },
            publicKeyDropdown: function() {
                var dropdown = $("<select>").addClass("pub-key-select");
                $("#userPubKeysList .is-unlocked").each(function (index, value) {
                    var key_id = $(this).attr("data-pub-key-id");
                    var key_label = $(this).find(".keyLabel").html();
                    var option_item = $("<option>").val(key_id).html(key_label).appendTo(dropdown);
                });
                return dropdown.wrap('<p>').parent();
            },
            getRawPrivateById: function(id) {
                return $(".kp-"+id).find(".key-priv-raw").html();
            },
            getPubKeyById: function(id) {
                return $(".pk-"+id).find(".key-pub-raw").html();
            },
            accessCheck: function() {
                $.getJSON("/keys/ajax/access.php", function(r) {
                    if (r.id !== 0) {
                        loadUserPage(r.email);
                    }
                });
            },
            loadPubKeys: function() {
                pub_key_list.find("li:not(.keys-none-public)").remove();
                $.getJSON("/keys/ajax/keys.php?public", function(r) {
                    var keys = r.keys;
                    if (keys.length == 0) {
                        $(".keys-none-public").show();
                        return false;
                    }
                    
                    for (var i=0; i<keys.length; i++) {
                        var key = keys[i];
                        var tpl = pub_key_item_tpl.clone();
                        tpl.removeAttr("id");
                        tpl.addClass("pk-"+key.id)
                        tpl.attr("data-pub-key-id", key.id);
                        tpl.find(".keyLabel").html(key.label);
                        tpl.find(".key-pub").html(nl2br(key.key_data, false));
                        tpl.find(".key-pub-raw").html(key.key_data);
                        
                        var new_li = $("<li>");
                        tpl.appendTo(new_li);
                        
                        new_li.appendTo(pub_key_list);
                    }
                    
                    $(".keys-none-public").hide();
                    return true;
                });
            },
            loadKeys: function() {
                key_list.find("li:not(.keys-none)").remove();
                $.getJSON("/keys/ajax/keys.php", function(r) {
                    var keys = r.keys;
                    if (keys.length == 0) {
                        $(".keys-none").show();
                        return false;
                    }
                    
                    for (var i=0; i<keys.length; i++) {
                        var key = keys[i];
                        var tpl = key_item_tpl.clone();
                        tpl.removeAttr("id");
                        tpl.attr("data-key-id", key.id);
                        tpl.addClass("kp-"+key.id)
                        tpl.find(".keyLabel").html(key.label);
                        tpl.find(".key-data").html(key.key_data);
                        
                        var new_li = $("<li>");
                        tpl.appendTo(new_li);
                        
                        new_li.appendTo(key_list);
                    }
                    
                    $(".keys-none").hide();
                    return true;
                });
                
                _priv.loadPubKeys();
            },
            addPublicKey: function(pd, pl) {
                $.post("/keys/ajax/regkey.php?public", {d: pd, l: pl}, function(r) {
                    if (r.key_err == true) {
                        alert("Error saving keypair.");
                        return;
                    }
                    _priv.loadPubKeys();
                }, "json");            
            },
            generateKey: function(e, p, l) {
                var
                    new_key_pair = window.openpgp.generateKeyPair(1, key_size, l+" <"+e+">", e+p)
                    , priv = new_key_pair.privateKeyArmored
                    , pub = new_key_pair.publicKeyArmored
                    , raw_key = JSON.stringify(new_key_pair.key)
                    , key_arr = new Array();
                    
                key_arr.push(priv);
                key_arr.push(pub);
                key_arr.push(raw_key);
                var keys_joined = key_arr.join(key_splitter);
                
                try {
                    var enc_key_str = ciph(e+p, keys_joined);
                } catch(err) {
                    cnsole.log(err);
                }
                if (enc_key_str) {
                    $.post("/keys/ajax/regkey.php", {d: enc_key_str, l: l, pub: pub}, function(r) {
                        var ret_val = true;
                        if (r.key_err == true) {
                            alert("Error saving keypair.");
                            ret_val = false;
                        }
                        _priv.loadKeys();
                        return ret_val;
                    }, "json");
                }
                return;
            },
            createKeyPair: function() {
                var key_label = prompt("Create a new keypair?\n\nKey Size: "+key_size+"\n\nPlease note that this can take a minute. Your browser may freeze for a short time.\n\nEnter a label for this new keypair:");
                
                if (!key_label || key_label.length == 0) {
                    return;
                }
                
                var pass = prompt("Enter a STRONG PASSWORD for this new keypair:");
                var pass2 = prompt("Enter the password again:");
                if (pass !== pass2) {
                    alert("The passwords don't match!");
                    return;
                }
                var email = window.user_email;
                _priv.generateKey(email, pass, key_label);
                
                return;
            }
        };
        
        var loadUserPage = function(em) {
            window.user_email = em;
            $("#keysUserForm").remove();
            $("#userAccountPage").show();
            _priv.loadKeys();
            new_key_btn.on("click", function(){
                _priv.createKeyPair();
            });
    
            new_pub_key_btn.avgrund({
                    height: 500,
                    holderClass: 'custom',
                    showClose: true,
                    enableStackAnimation: true,
                    onBlurContainer: '#wrapper',
                    template: '<p>Paste someone\'s public key here.</p>' +
                    '<div>' +
                    '<input type="text" class="keys-pub-name" placeholder="Person\'s Name or Email">' +
                    '<br style="clear:both">' +
                    '<textarea class="keys-pub-key"></textarea>'+
                    '<input type="button" value="Add Public Key" class="submit keys-pub-add">' +
                    '</div>'
            });
            
        };
        
        $("body").on("click", ".keys-pub-add", function(){
            var pl = $(".keys-pub-name").val();
            var pd = $(".keys-pub-key").val();
            _priv.addPublicKey(pd, pl);
            $(".avgrund-close").trigger("click");
            return false;
        });
        
        $(".help-icon").on("click", function() {
            alert($(this).attr("title"));
        });
        
        user_page.on("click", ".unlock-btn", function() {
            var data = $(this).siblings(".key-data").html();
            var label = $(this).siblings(".keyLabel").html();
            var unlocked_pass = prompt("To unlock this keypair, enter its password.\n\nIf you do not remember the password, this key cannot be used.\n\nUsing Key: '"+label+"'");
            if (!unlocked_pass || unlocked_pass.length == 0) {
                return;
            }
            
            var ep = window.user_email+unlocked_pass;
            var key_unlocked = _priv.dcKey(data, ep);
            
            if (key_unlocked == false) {
                return;
            }
            
            $(this).siblings(".key-priv").html(nl2br(key_unlocked[0], false));
            $(this).siblings(".key-pub").html(nl2br(key_unlocked[1], false));
            $(this).siblings(".key-raw").html(nl2br(key_unlocked[2], false));
            
            $(this).siblings(".key-priv-raw").html(key_unlocked[0]);
            $(this).siblings(".key-pub-raw").html(key_unlocked[1]);
            $(this).siblings(".key-raw-raw").html(key_unlocked[2]);
            
            var locked = $(this).closest(".is-locked");
            locked.removeClass("is-locked").addClass("is-unlocked");
        });
        
        user_page.on("click", ".lock-btn", function() {
            $(this).siblings(".key-priv").html("");
            $(this).siblings(".key-pub").html("");
            $(this).siblings(".key-raw").html("");
            $(this).siblings(".key-priv-raw").html("");
            $(this).siblings(".key-pub-raw").html("");
            $(this).siblings(".key-raw-raw").html("");
            var unlocked = $(this).closest(".is-unlocked");
            unlocked.removeClass("is-unlocked").addClass("is-locked");
        });
        
        user_page.on("click", ".privk-btn", function() {
            $(this).siblings(".key-priv").toggle();
        });
        
        user_page.on("click", ".raw-btn", function() {
            $(this).siblings(".key-raw").toggle();
        });
        
        user_page.on("click", ".pubk-btn", function() {
            $(this).siblings(".key-pub").toggle();
        });
        
        user_page.on("click", ".dc-msg-btn", function() {
            var priv_str = $(this).siblings(".key-priv-raw").html();
            var priv_key_obj = window.openpgp.key.readArmored(priv_str);        
            var label = $(this).siblings(".keyLabel").html();
            var unlocked_pass = prompt("To use this private key you need to enter the password to decrypt it.\n\nIf you do not remember the password, this key cannot be used.\n\nUsing Key: '"+label+"'");
            var priv_key = priv_key_obj.keys[0];
            
            if (!unlocked_pass || unlocked_pass.length == 0) {
                return;
            }
            
            var did_unlock = false;
            
            try {
                did_unlock = priv_key.decrypt(window.user_email+unlocked_pass);
            } catch(e) {
                console.log(e);
            }
    
            if (!did_unlock) {
                alert('Could not decrypt private key for message decryption.');
                return;
            }
            
            var pub_arr = [];
            
            _priv.removeHiddenModalEl();
            _priv.createHiddenModalEl();
            var new_hook = _priv.getHiddenModalEl();
            
            new_hook.avgrund({
                    height: 500,
                    holderClass: 'custom',
                    showClose: true,
                    enableStackAnimation: true,
                    onBlurContainer: '#wrapper',
                    onUnload: function(e) {
                        $("body").off("click", ".keys-pub-dc");
                    },
                    template: '<p>Choose the sender\'s public key, and paste the armored message.</p>' +
                    '<div>' +
                    'Sender Key: ' + _priv.publicKeyDropdown().html() +
                    '<br style="clear:both">' +
                    'Message: <textarea style="height:150px;" class="keys-pub-txt"></textarea>'+
                    '<input type="button" value="Decrypt" class="submit keys-pub-dc">' +
                    '</div>'
            });
            
            new_hook.trigger("click");
            
            $("body").on("click", ".keys-pub-dc", function(){
                
                pub_arr = [];
                
                var select_id = $(".pub-key-select option:selected").val();
                var pk_raw = _priv.getPubKeyById(select_id);
                var pub_key_obj = window.openpgp.key.readArmored(pk_raw);
                var pub_key = pub_key_obj.keys[0];
                pub_arr.push(pub_key);
                var msg_text = $(".keys-pub-txt").val();
                var msg_obj = window.openpgp.message.readArmored(msg_text);
                
                console.log("==================");
                
                console.log(msg_obj);
                console.log(msg_obj.decrypt(priv_key));
                console.log(msg_obj.getLiteralData());
                console.log(msg_obj.getText());
                
                console.log("==================");
                
                try {
                    var real_msg = window.openpgp.decryptAndVerifyMessage(priv_key, pub_arr, msg_obj);
                } catch(e) {
                    alert("Could not decrypt message. Perhaps you picked the wrong private key to use?");
                    console.log("========== ERR ========");
                    console.log(e.message);
                    console.log(e.stack);
                    pub_arr = [];
                    return;
                }
                
                if ("undefined" !== typeof real_msg.signatures && "undefined" !== typeof real_msg.signatures[0] && real_msg.signatures[0].valid == true) {
                    $(".keys-pub-txt").val(real_msg.text);
                } else {
                    alert("The message signature does not match the public key you supplied. Pick the correct sender key.");
                }
            });
            
            
        });
        
        user_page.on("click", ".enc-msg-btn", function() {
            var priv_str = $(this).siblings(".key-priv-raw").html();
            var priv_key_obj = window.openpgp.key.readArmored(priv_str);        
            var label = $(this).siblings(".keyLabel").html();
            var unlocked_pass = prompt("To use this private key you need to enter the password to decrypt it.\n\nIf you do not remember the password, this key cannot be used.\n\nUsing Key: '"+label+"'");
            var priv_key = priv_key_obj.keys[0];
            
            if (!unlocked_pass || unlocked_pass.length == 0) {
                return;
            }
            
            var did_unlock = priv_key.decrypt(window.user_email+unlocked_pass);
    
            if (!did_unlock) {
                alert('Could not decrypt private key for signing.');
                return;
            }
            
            var pub_arr = [];
            
            _priv.removeHiddenModalEl();
            _priv.createHiddenModalEl();
            var new_hook = _priv.getHiddenModalEl();
            
            new_hook.avgrund({
                    height: 500,
                    holderClass: 'custom',
                    showClose: true,
                    enableStackAnimation: true,
                    onBlurContainer: '#wrapper',
                    onUnload: function(e) {
                        $("body").off("click", ".keys-pub-enc");
                    },
                    template: '<p class="authorline" style="padding-top:0;">Choose the public key from your keys list. This is the only person who will be able to read your message. Then type your message and the text area will populate with a PGP armored message.</p>' +
                    '<div>' +
                    'Recipient Key: ' + _priv.publicKeyDropdown().html() +
                    '<br style="clear:both">' +
                    '<textarea style="height:150px;" class="keys-pub-txt"></textarea>'+
                    '<input type="button" value="Encrypt and Sign" class="submit keys-pub-enc">' +
                    '</div>'
            });
            
            new_hook.trigger("click");
            
            $("body").on("click", ".keys-pub-enc", function(){
                var select_id = $(".pub-key-select option:selected").val();
                var pk_raw = _priv.getPubKeyById(select_id);
                var pub_key_obj = window.openpgp.key.readArmored(pk_raw);
                var pub_key = pub_key_obj.keys[0];
                pub_arr.push(pub_key);
                var msg_text = $(".keys-pub-txt").val();
                var arm_msg = window.openpgp.signAndEncryptMessage(pub_arr, priv_key, msg_text);
                $(".keys-pub-txt").val(arm_msg);
            });
            
            
        });
        
        $("#show_intro_msg").on("click", function(e){
            e.preventDefault();
            $(".intro-msg").toggle();
            return false;
        });
        
        $("#keysUserForm").submit(function(){
                var email = $(".keys-email").val();
                var pass = $(".keys-password").val();
                $.post("/keys/ajax/lookup.php", {em:email, pw:pass}, function(R) {
                    if (R.id == 0) {
                        alert("Error logging in or creating account.");
                        return false;
                    }
                    loadUserPage(email);
                    if (R.is_new == true) {
                        _priv.generateKey(email, pass, "Chat");
                    }
                    return false;
                }, "json")
                .fail(function(d) {
                    return false;
                });
                
                return false;
        });
        
        _priv.accessCheck();
    
    });
})(jQuery);/*!
 * main.js
 * https://destruct.co
 *
 * Copyright 2014 Brenden Ellingboe (brenden@brenden.me)
 *
 */
var _Main = (function($) {

    $(function(){
        
        if (!$("body").hasClass("main")) {
            return;
        }
    
            function nl2br (str, is_xhtml) {
                    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
                    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
            }
            
            var opts = {
                    textarea: 'msgContent',
                    clientSideStorage: false,
                    focusOnLoad: true,
                    autogrow: true,
                    button: {
                            preview: true,
                            fullscreen: false,
                    },
            };
            var editor = new EpicEditor(opts).load();

            if ($("#errmsg").html()) {
                try {
                    window.history.pushState('decrypted', 'Destruct.co', '/');
                } catch(err) { }
            }
            
            if (location.hash && $("#mdisplay").html()) {
                    var A = location.hash;
                    var uc;
                    A = A.substring(1, A.length);
                    
                    try {
                            uc = unciph(A, $("#msgenc").val());
                            $("#msgForm").hide();
                    } catch(err) {
                            uc = err;
                            $("#msgForm").show();
                    }
                    
                    uc_clear = nl2br(uc, false);
                    uc = markdown.toHTML(uc);
                    
                    $("#mdisplay").show().html(uc);
                    $("#rawdisplay").show().html(uc_clear);
                    location.hash = "";
                    
                    try {
                        window.history.pushState('decrypted', 'Destruct.co', '/');
                    } catch(err) { }
            }
            
            $("#msgResp").on("click", "#shareAnchor", function(e){
                    e.preventDefault();
                    $(this).focus().select();
            });
    
            $("#msgForm").submit(function(){
                    var p = random_string(null);
                    var mt = $("#msgContent").val();
                    var em = ciph(p, mt);
                    $.post("/index.php", {m: em}, function(R) {
                            $("#msgForm").hide();
                            $("#msgResp").show().html(R);
                            var link_href = $("#shareAnchor").attr("value");
                            $("#shareAnchor").attr("value",link_href + "#" + p);
                            $("#new_btn").show();
                    }, "json")
                    .fail(function(d) {
                            console.log('failed');
                            console.log(d);
                    });
                    
                    return false;
            });
            
            $("#show_intro_msg").on("click", function(e){
                e.preventDefault();
                $(".intro-msg").toggle();
                
                return false;
            });
    });
})(jQuery);/*!
 * plugins.js
 * https://destruct.co
 *
 * Copyright 2014 Brenden Ellingboe (brenden@brenden.me)
 *
 */
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*
 * jquery.simulate - simulate browser mouse and keyboard events
 *
 * Copyright (c) 2009 Eduardo Lundgren (eduardolundgren@gmail.com)
 * and Richard D. Worth (rdworth@gmail.com)
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 */

(function($) {

$.fn.extend({
	simulate: function(type, options) {
		return this.each(function() {
			var opt = $.extend({}, $.simulate.defaults, options || {});
			new $.simulate(this, type, opt);
		});
	}
});

$.simulate = function(el, type, options) {
	this.target = el;
	this.options = options;

	if (/^drag$/.test(type)) {
		this[type].apply(this, [this.target, options]);
	} else {
		this.simulateEvent(el, type, options);
	}
};

$.extend($.simulate.prototype, {
	simulateEvent: function(el, type, options) {
		var evt = this.createEvent(type, options);
		this.dispatchEvent(el, type, evt, options);
		return evt;
	},
	createEvent: function(type, options) {
		if (/^mouse(over|out|down|up|move)|(dbl)?click$/.test(type)) {
			return this.mouseEvent(type, options);
		} else if (/^key(up|down|press)$/.test(type)) {
			return this.keyboardEvent(type, options);
		}
	},
	mouseEvent: function(type, options) {
		var evt;
		var e = $.extend({
			bubbles: true, cancelable: (type != "mousemove"), view: window, detail: 0,
			screenX: 0, screenY: 0, clientX: 0, clientY: 0,
			ctrlKey: false, altKey: false, shiftKey: false, metaKey: false,
			button: 0, relatedTarget: undefined
		}, options);

		var relatedTarget = $(e.relatedTarget)[0];

		if ($.isFunction(document.createEvent)) {
			evt = document.createEvent("MouseEvents");
			evt.initMouseEvent(type, e.bubbles, e.cancelable, e.view, e.detail,
				e.screenX, e.screenY, e.clientX, e.clientY,
				e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
				e.button, e.relatedTarget || document.body.parentNode);
		} else if (document.createEventObject) {
			evt = document.createEventObject();
			$.extend(evt, e);
			evt.button = { 0:1, 1:4, 2:2 }[evt.button] || evt.button;
		}
		return evt;
	},
	keyboardEvent: function(type, options) {
		var evt;

		var e = $.extend({ bubbles: true, cancelable: true, view: window,
			ctrlKey: false, altKey: false, shiftKey: false, metaKey: false,
			keyCode: 0, charCode: 0
		}, options);

		if ($.isFunction(document.createEvent)) {
			try {
				evt = document.createEvent("KeyEvents");
				evt.initKeyEvent(type, e.bubbles, e.cancelable, e.view,
					e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
					e.keyCode, e.charCode);
			} catch(err) {
				evt = document.createEvent("Events");
				evt.initEvent(type, e.bubbles, e.cancelable);
				$.extend(evt, { view: e.view,
					ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey, metaKey: e.metaKey,
					keyCode: e.keyCode, charCode: e.charCode
				});
			}
		} else if (document.createEventObject) {
			evt = document.createEventObject();
			$.extend(evt, e);
		}
		if (($.browser !== undefined) && ($.browser.msie || $.browser.opera)) {
			evt.keyCode = (e.charCode > 0) ? e.charCode : e.keyCode;
			evt.charCode = undefined;
		}
		return evt;
	},

	dispatchEvent: function(el, type, evt) {
		if (el.dispatchEvent) {
			el.dispatchEvent(evt);
		} else if (el.fireEvent) {
			el.fireEvent('on' + type, evt);
		}
		return evt;
	},

	drag: function(el) {
		var self = this, center = this.findCenter(this.target), 
			options = this.options,	x = Math.floor(center.x), y = Math.floor(center.y), 
			dx = options.dx || 0, dy = options.dy || 0, target = this.target;
		var coord = { clientX: x, clientY: y };
		this.simulateEvent(target, "mousedown", coord);
		coord = { clientX: x + 1, clientY: y + 1 };
		this.simulateEvent(document, "mousemove", coord);
		coord = { clientX: x + dx, clientY: y + dy };
		this.simulateEvent(document, "mousemove", coord);
		this.simulateEvent(document, "mousemove", coord);
		this.simulateEvent(target, "mouseup", coord);
	},
	findCenter: function(el) {
		var el = $(this.target), o = el.offset();
		return {
			x: o.left + el.outerWidth() / 2,
			y: o.top + el.outerHeight() / 2
		};
	}
});

$.extend($.simulate, {
	defaults: {
		speed: 'sync'
	},
	VK_TAB: 9,
	VK_ENTER: 13,
	VK_ESC: 27,
	VK_PGUP: 33,
	VK_PGDN: 34,
	VK_END: 35,
	VK_HOME: 36,
	VK_LEFT: 37,
	VK_UP: 38,
	VK_RIGHT: 39,
	VK_DOWN: 40
});

})(jQuery);/**
 * EpicEditor - An Embeddable JavaScript Markdown Editor (https://github.com/OscarGodson/EpicEditor)
 * Copyright (c) 2011-2012, Oscar Godson. (MIT Licensed)
 */

(function (window, undefined) {
  /**
   * Applies attributes to a DOM object
   * @param  {object} context The DOM obj you want to apply the attributes to
   * @param  {object} attrs A key/value pair of attributes you want to apply
   * @returns {undefined}
   */
  function _applyAttrs(context, attrs) {
    for (var attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        context[attr] = attrs[attr];
      }
    }
  }

  /**
   * Applies styles to a DOM object
   * @param  {object} context The DOM obj you want to apply the attributes to
   * @param  {object} attrs A key/value pair of attributes you want to apply
   * @returns {undefined}
   */
  function _applyStyles(context, attrs) {
    for (var attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        context.style[attr] = attrs[attr];
      }
    }
  }

  /**
   * Returns a DOM objects computed style
   * @param  {object} el The element you want to get the style from
   * @param  {string} styleProp The property you want to get from the element
   * @returns {string} Returns a string of the value. If property is not set it will return a blank string
   */
  function _getStyle(el, styleProp) {
    var x = el
      , y = null;
    if (window.getComputedStyle) {
      y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
    }
    else if (x.currentStyle) {
      y = x.currentStyle[styleProp];
    }
    return y;
  }

  /**
   * Saves the current style state for the styles requested, then applies styles
   * to overwrite the existing one. The old styles are returned as an object so
   * you can pass it back in when you want to revert back to the old style
   * @param   {object} el     The element to get the styles of
   * @param   {string} type   Can be "save" or "apply". apply will just apply styles you give it. Save will write styles
   * @param   {object} styles Key/value style/property pairs
   * @returns {object}
   */
  function _saveStyleState(el, type, styles) {
    var returnState = {}
      , style;
    if (type === 'save') {
      for (style in styles) {
        if (styles.hasOwnProperty(style)) {
          returnState[style] = _getStyle(el, style);
        }
      }
      // After it's all done saving all the previous states, change the styles
      _applyStyles(el, styles);
    }
    else if (type === 'apply') {
      _applyStyles(el, styles);
    }
    return returnState;
  }

  /**
   * Gets an elements total width including it's borders and padding
   * @param  {object} el The element to get the total width of
   * @returns {int}
   */
  function _outerWidth(el) {
    var b = parseInt(_getStyle(el, 'border-left-width'), 10) + parseInt(_getStyle(el, 'border-right-width'), 10)
      , p = parseInt(_getStyle(el, 'padding-left'), 10) + parseInt(_getStyle(el, 'padding-right'), 10)
      , w = el.offsetWidth
      , t;
    // For IE in case no border is set and it defaults to "medium"
    if (isNaN(b)) { b = 0; }
    t = b + p + w;
    return t;
  }

  /**
   * Gets an elements total height including it's borders and padding
   * @param  {object} el The element to get the total width of
   * @returns {int}
   */
  function _outerHeight(el) {
    var b = parseInt(_getStyle(el, 'border-top-width'), 10) + parseInt(_getStyle(el, 'border-bottom-width'), 10)
      , p = parseInt(_getStyle(el, 'padding-top'), 10) + parseInt(_getStyle(el, 'padding-bottom'), 10)
      , w = parseInt(_getStyle(el, 'height'), 10)
      , t;
    // For IE in case no border is set and it defaults to "medium"
    if (isNaN(b)) { b = 0; }
    t = b + p + w;
    return t;
  }

  /**
   * Inserts a <link> tag specifically for CSS
   * @param  {string} path The path to the CSS file
   * @param  {object} context In what context you want to apply this to (document, iframe, etc)
   * @param  {string} id An id for you to reference later for changing properties of the <link>
   * @returns {undefined}
   */
  function _insertCSSLink(path, context, id) {
    id = id || '';
    var headID = context.getElementsByTagName("head")[0]
      , cssNode = context.createElement('link');
    
    _applyAttrs(cssNode, {
      type: 'text/css'
    , id: id
    , rel: 'stylesheet'
    , href: path
    , name: path
    , media: 'screen'
    });

    headID.appendChild(cssNode);
  }

  // Simply replaces a class (o), to a new class (n) on an element provided (e)
  function _replaceClass(e, o, n) {
    e.className = e.className.replace(o, n);
  }

  // Feature detects an iframe to get the inner document for writing to
  function _getIframeInnards(el) {
    return el.contentDocument || el.contentWindow.document;
  }

  // Grabs the text from an element and preserves whitespace
  function _getText(el) {
    var theText;
    // Make sure to check for type of string because if the body of the page
    // doesn't have any text it'll be "" which is falsey and will go into
    // the else which is meant for Firefox and shit will break
    if (typeof document.body.innerText == 'string') {
      theText = el.innerText;
    }
    else {
      // First replace <br>s before replacing the rest of the HTML
      theText = el.innerHTML.replace(/<br>/gi, "\n");
      // Now we can clean the HTML
      theText = theText.replace(/<(?:.|\n)*?>/gm, '');
      // Now fix HTML entities
      theText = theText.replace(/&lt;/gi, '<');
      theText = theText.replace(/&gt;/gi, '>');
    }
    return theText;
  }

  function _setText(el, content) {
    // Don't convert lt/gt characters as HTML when viewing the editor window
    // TODO: Write a test to catch regressions for this
    content = content.replace(/</g, '&lt;');
    content = content.replace(/>/g, '&gt;');
    content = content.replace(/\n/g, '<br>');
    
    // Make sure to there aren't two spaces in a row (replace one with &nbsp;)
    // If you find and replace every space with a &nbsp; text will not wrap.
    // Hence the name (Non-Breaking-SPace).
    // TODO: Probably need to test this somehow...
    content = content.replace(/<br>\s/g, '<br>&nbsp;')
    content = content.replace(/\s\s\s/g, '&nbsp; &nbsp;')
    content = content.replace(/\s\s/g, '&nbsp; ')
    content = content.replace(/^ /, '&nbsp;')

    el.innerHTML = content;
    return true;
  }

  /**
   * Converts the 'raw' format of a file's contents into plaintext
   * @param   {string} content Contents of the file
   * @returns {string} the sanitized content
   */
  function _sanitizeRawContent(content) {
    // Get this, 2 spaces in a content editable actually converts to:
    // 0020 00a0, meaning, "space no-break space". So, manually convert
    // no-break spaces to spaces again before handing to marked.
    // Also, WebKit converts no-break to unicode equivalent and FF HTML.
    return content.replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ');
  }

  /**
   * Will return the version number if the browser is IE. If not will return -1
   * TRY NEVER TO USE THIS AND USE FEATURE DETECTION IF POSSIBLE
   * @returns {Number} -1 if false or the version number if true
   */
  function _isIE() {
    var rv = -1 // Return value assumes failure.
      , ua = navigator.userAgent
      , re;
    if (navigator.appName == 'Microsoft Internet Explorer') {
      re = /MSIE ([0-9]{1,}[\.0-9]{0,})/;
      if (re.exec(ua) != null) {
        rv = parseFloat(RegExp.$1, 10);
      }
    }
    return rv;
  }

  /**
   * Same as the isIE(), but simply returns a boolean
   * THIS IS TERRIBLE AND IS ONLY USED BECAUSE FULLSCREEN IN SAFARI IS BORKED
   * If some other engine uses WebKit and has support for fullscreen they
   * probably wont get native fullscreen until Safari's fullscreen is fixed
   * @returns {Boolean} true if Safari
   */
  function _isSafari() {
    var n = window.navigator;
    return n.userAgent.indexOf('Safari') > -1 && n.userAgent.indexOf('Chrome') == -1;
  }

  /**
   * Same as the isIE(), but simply returns a boolean
   * THIS IS TERRIBLE ONLY USE IF ABSOLUTELY NEEDED
   * @returns {Boolean} true if Safari
   */
  function _isFirefox() {
    var n = window.navigator;
    return n.userAgent.indexOf('Firefox') > -1 && n.userAgent.indexOf('Seamonkey') == -1;
  }

  /**
   * Determines if supplied value is a function
   * @param {object} object to determine type
   */
  function _isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
   * @param {boolean} [deepMerge=false] If true, will deep merge meaning it will merge sub-objects like {obj:obj2{foo:'bar'}}
   * @param {object} first object
   * @param {object} second object
   * @returnss {object} a new object based on obj1 and obj2
   */
  function _mergeObjs() {
    // copy reference to target object
    var target = arguments[0] || {}
      , i = 1
      , length = arguments.length
      , deep = false
      , options
      , name
      , src
      , copy

    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[1] || {};
      // skip the boolean and the target
      i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !_isFunction(target)) {
      target = {};
    }
    // extend jQuery itself if only one argument is passed
    if (length === i) {
      target = this;
      --i;
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          // @NOTE: added hasOwnProperty check
          if (options.hasOwnProperty(name)) {
            src = target[name];
            copy = options[name];
            // Prevent never-ending loop
            if (target === copy) {
              continue;
            }
            // Recurse if we're merging object values
            if (deep && copy && typeof copy === "object" && !copy.nodeType) {
              target[name] = _mergeObjs(deep,
                // Never move original objects, clone them
                src || (copy.length != null ? [] : {})
                , copy);
            } else if (copy !== undefined) { // Don't bring in undefined values
              target[name] = copy;
            }
          }
        }
      }
    }

    // Return the modified object
    return target;
  }

  /**
   * Initiates the EpicEditor object and sets up offline storage as well
   * @class Represents an EpicEditor instance
   * @param {object} options An optional customization object
   * @returns {object} EpicEditor will be returned
   */
  function EpicEditor(options) {
    // Default settings will be overwritten/extended by options arg
    var self = this
      , opts = options || {}
      , _defaultFileSchema
      , _defaultFile
      , defaults = { container: 'epiceditor'
        , basePath: 'epiceditor'
        , textarea: undefined
        , clientSideStorage: true
        , localStorageName: 'epiceditor'
        , useNativeFullscreen: true
        , file: { name: null
        , defaultContent: ''
          , autoSave: 100 // Set to false for no auto saving
          }
        , theme: { base: '/themes/base/epiceditor.css'
          , preview: '/themes/preview/github.css'
          , editor: '/themes/editor/epic-dark.css'
          }
        , focusOnLoad: false
        , shortcut: { modifier: 18 // alt keycode
          , fullscreen: 70 // f keycode
          , preview: 80 // p keycode
          }
        , string: { togglePreview: 'Toggle Preview Mode'
          , toggleEdit: 'Toggle Edit Mode'
          , toggleFullscreen: 'Enter Fullscreen'
          }
        , parser: typeof marked == 'function' ? marked : null
        , autogrow: false
        , button: { fullscreen: true
          , preview: true
          , bar: "auto"
          }
        }
      , defaultStorage
      , autogrowDefaults = { minHeight: 80
        , maxHeight: false
        , scroll: true
        };

    self.settings = _mergeObjs(true, defaults, opts);
    
    var buttons = self.settings.button;
    self._fullscreenEnabled = typeof(buttons) === 'object' ? typeof buttons.fullscreen === 'undefined' || buttons.fullscreen : buttons === true;
    self._editEnabled = typeof(buttons) === 'object' ? typeof buttons.edit === 'undefined' || buttons.edit : buttons === true;
    self._previewEnabled = typeof(buttons) === 'object' ? typeof buttons.preview === 'undefined' || buttons.preview : buttons === true;

    if (!(typeof self.settings.parser == 'function' && typeof self.settings.parser('TEST') == 'string')) {
      self.settings.parser = function (str) {
        return str;
      }
    }

    if (self.settings.autogrow) {
      if (self.settings.autogrow === true) {
        self.settings.autogrow = autogrowDefaults;
      }
      else {
        self.settings.autogrow = _mergeObjs(true, autogrowDefaults, self.settings.autogrow);
      }
      self._oldHeight = -1;
    }

    // If you put an absolute link as the path of any of the themes ignore the basePath
    // preview theme
    if (!self.settings.theme.preview.match(/^https?:\/\//)) {
      self.settings.theme.preview = self.settings.basePath + self.settings.theme.preview;
    }
    // editor theme
    if (!self.settings.theme.editor.match(/^https?:\/\//)) {
      self.settings.theme.editor = self.settings.basePath + self.settings.theme.editor;
    }
    // base theme
    if (!self.settings.theme.base.match(/^https?:\/\//)) {
      self.settings.theme.base = self.settings.basePath + self.settings.theme.base;
    }

    // Grab the container element and save it to self.element
    // if it's a string assume it's an ID and if it's an object
    // assume it's a DOM element
    if (typeof self.settings.container == 'string') {
      self.element = document.getElementById(self.settings.container);
    }
    else if (typeof self.settings.container == 'object') {
      self.element = self.settings.container;
    }
    
    // Figure out the file name. If no file name is given we'll use the ID.
    // If there's no ID either we'll use a namespaced file name that's incremented
    // based on the calling order. As long as it doesn't change, drafts will be saved.
    if (!self.settings.file.name) {
      if (typeof self.settings.container == 'string') {
        self.settings.file.name = self.settings.container;
      }
      else if (typeof self.settings.container == 'object') {
        if (self.element.id) {
          self.settings.file.name = self.element.id;
        }
        else {
          if (!EpicEditor._data.unnamedEditors) {
            EpicEditor._data.unnamedEditors = [];
          }
          EpicEditor._data.unnamedEditors.push(self);
          self.settings.file.name = '__epiceditor-untitled-' + EpicEditor._data.unnamedEditors.length;
        }
      }
    }

    if (self.settings.button.bar === "show") {
      self.settings.button.bar = true;
    }

    if (self.settings.button.bar === "hide") {
      self.settings.button.bar = false;
    }

    // Protect the id and overwrite if passed in as an option
    // TODO: Put underscrore to denote that this is private
    self._instanceId = 'epiceditor-' + Math.round(Math.random() * 100000);
    self._storage = {};
    self._canSave = true;

    // Setup local storage of files
    self._defaultFileSchema = function () {
      return {
        content: self.settings.file.defaultContent
      , created: new Date()
      , modified: new Date()
      }
    }

    if (localStorage && self.settings.clientSideStorage) {
      this._storage = localStorage;
      if (this._storage[self.settings.localStorageName] && self.getFiles(self.settings.file.name) === undefined) {
        _defaultFile = self._defaultFileSchema();
        _defaultFile.content = self.settings.file.defaultContent;
      }
    }

    if (!this._storage[self.settings.localStorageName]) {
      defaultStorage = {};
      defaultStorage[self.settings.file.name] = self._defaultFileSchema();
      defaultStorage = JSON.stringify(defaultStorage);
      this._storage[self.settings.localStorageName] = defaultStorage;
    }

    // A string to prepend files with to save draft versions of files
    // and reset all preview drafts on each load!
    self._previewDraftLocation = '__draft-';
    self._storage[self._previewDraftLocation + self.settings.localStorageName] = self._storage[self.settings.localStorageName];

    // This needs to replace the use of classes to check the state of EE
    self._eeState = {
      fullscreen: false
    , preview: false
    , edit: false
    , loaded: false
    , unloaded: false
    }

    // Now that it exists, allow binding of events if it doesn't exist yet
    if (!self.events) {
      self.events = {};
    }

    return this;
  }

  /**
   * Inserts the EpicEditor into the DOM via an iframe and gets it ready for editing and previewing
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.load = function (callback) {

    // Get out early if it's already loaded
    if (this.is('loaded')) { return this; }

    // TODO: Gotta get the privates with underscores!
    // TODO: Gotta document what these are for...
    var self = this
      , _HtmlTemplates
      , iframeElement
      , baseTag
      , utilBtns
      , utilBar
      , utilBarTimer
      , keypressTimer
      , mousePos = { y: -1, x: -1 }
      , _elementStates
      , _isInEdit
      , nativeFs = false
      , nativeFsWebkit = false
      , nativeFsMoz = false
      , nativeFsW3C = false
      , fsElement
      , isMod = false
      , isCtrl = false
      , eventableIframes
      , i // i is reused for loops
      , boundAutogrow;

    // Startup is a way to check if this EpicEditor is starting up. Useful for
    // checking and doing certain things before EpicEditor emits a load event.
    self._eeState.startup = true;

    if (self.settings.useNativeFullscreen) {
      nativeFsWebkit = document.body.webkitRequestFullScreen ? true : false;
      nativeFsMoz = document.body.mozRequestFullScreen ? true : false;
      nativeFsW3C = document.body.requestFullscreen ? true : false;
      nativeFs = nativeFsWebkit || nativeFsMoz || nativeFsW3C;
    }

    // Fucking Safari's native fullscreen works terribly
    // REMOVE THIS IF SAFARI 7 WORKS BETTER
    if (_isSafari()) {
      nativeFs = false;
      nativeFsWebkit = false;
    }

    // It opens edit mode by default (for now);
    if (!self.is('edit') && !self.is('preview')) {
      self._eeState.edit = true;
    }

    callback = callback || function () {};

    // The editor HTML
    // TODO: edit-mode class should be dynamically added
    _HtmlTemplates = {
      // This is wrapping iframe element. It contains the other two iframes and the utilbar
      chrome:   '<div id="epiceditor-wrapper" class="epiceditor-edit-mode">' +
                  '<iframe frameborder="0" id="epiceditor-editor-frame"></iframe>' +
                  '<iframe frameborder="0" id="epiceditor-previewer-frame"></iframe>' +
                  '<div id="epiceditor-utilbar">' +
                    (self._previewEnabled ? '<button title="' + this.settings.string.togglePreview + '" class="epiceditor-toggle-btn epiceditor-toggle-preview-btn"></button> ' : '') +
                    (self._editEnabled ? '<button title="' + this.settings.string.toggleEdit + '" class="epiceditor-toggle-btn epiceditor-toggle-edit-btn"></button> ' : '') +
                    (self._fullscreenEnabled ? '<button title="' + this.settings.string.toggleFullscreen + '" class="epiceditor-fullscreen-btn"></button>' : '') +
                  '</div>' +
                '</div>'
    
    // The previewer is just an empty box for the generated HTML to go into
    , previewer: '<div id="epiceditor-preview"></div>'
    , editor: '<!doctype HTML>'
    };

    // Write an iframe and then select it for the editor
    self.element.innerHTML = '<iframe scrolling="no" frameborder="0" id= "' + self._instanceId + '"></iframe>';

    // Because browsers add things like invisible padding and margins and stuff
    // to iframes, we need to set manually set the height so that the height
    // doesn't keep increasing (by 2px?) every time reflow() is called.
    // FIXME: Figure out how to fix this without setting this
    self.element.style.height = self.element.offsetHeight + 'px';

    iframeElement = document.getElementById(self._instanceId);
    
    // Store a reference to the iframeElement itself
    self.iframeElement = iframeElement;

    // Grab the innards of the iframe (returns the document.body)
    // TODO: Change self.iframe to self.iframeDocument
    self.iframe = _getIframeInnards(iframeElement);
    self.iframe.open();
    self.iframe.write(_HtmlTemplates.chrome);

    // Now that we got the innards of the iframe, we can grab the other iframes
    self.editorIframe = self.iframe.getElementById('epiceditor-editor-frame')
    self.previewerIframe = self.iframe.getElementById('epiceditor-previewer-frame');

    // Setup the editor iframe
    self.editorIframeDocument = _getIframeInnards(self.editorIframe);
    self.editorIframeDocument.open();
    // Need something for... you guessed it, Firefox
    self.editorIframeDocument.write(_HtmlTemplates.editor);
    self.editorIframeDocument.close();
    
    // Setup the previewer iframe
    self.previewerIframeDocument = _getIframeInnards(self.previewerIframe);
    self.previewerIframeDocument.open();
    self.previewerIframeDocument.write(_HtmlTemplates.previewer);

    // Base tag is added so that links will open a new tab and not inside of the iframes
    baseTag = self.previewerIframeDocument.createElement('base');
    baseTag.target = '_blank';
    self.previewerIframeDocument.getElementsByTagName('head')[0].appendChild(baseTag);

    self.previewerIframeDocument.close();

    self.reflow();

    // Insert Base Stylesheet
    _insertCSSLink(self.settings.theme.base, self.iframe, 'theme');
    
    // Insert Editor Stylesheet
    _insertCSSLink(self.settings.theme.editor, self.editorIframeDocument, 'theme');
    
    // Insert Previewer Stylesheet
    _insertCSSLink(self.settings.theme.preview, self.previewerIframeDocument, 'theme');

    // Add a relative style to the overall wrapper to keep CSS relative to the editor
    self.iframe.getElementById('epiceditor-wrapper').style.position = 'relative';

    // Set the position to relative so we hide them with left: -999999px
    self.editorIframe.style.position = 'absolute';
    self.previewerIframe.style.position = 'absolute';

    // Now grab the editor and previewer for later use
    self.editor = self.editorIframeDocument.body;
    self.previewer = self.previewerIframeDocument.getElementById('epiceditor-preview');
   
    self.editor.contentEditable = true;
 
    // Firefox's <body> gets all fucked up so, to be sure, we need to hardcode it
    self.iframe.body.style.height = this.element.offsetHeight + 'px';

    // Should actually check what mode it's in!
    self.previewerIframe.style.left = '-999999px';

    // Keep long lines from being longer than the editor
    this.editorIframeDocument.body.style.wordWrap = 'break-word';

    // FIXME figure out why it needs +2 px
    if (_isIE() > -1) {
      this.previewer.style.height = parseInt(_getStyle(this.previewer, 'height'), 10) + 2;
    }

    // If there is a file to be opened with that filename and it has content...
    this.open(self.settings.file.name);

    if (self.settings.focusOnLoad) {
      // We need to wait until all three iframes are done loading by waiting until the parent
      // iframe's ready state == complete, then we can focus on the contenteditable
      self.iframe.addEventListener('readystatechange', function () {
        if (self.iframe.readyState == 'complete') {
          self.focus();
        }
      });
    }

    // Because IE scrolls the whole window to hash links, we need our own
    // method of scrolling the iframe to an ID from clicking a hash
    self.previewerIframeDocument.addEventListener('click', function (e) {
      var el = e.target
        , body = self.previewerIframeDocument.body;
      if (el.nodeName == 'A') {
        // Make sure the link is a hash and the link is local to the iframe
        if (el.hash && el.hostname == window.location.hostname) {
          // Prevent the whole window from scrolling
          e.preventDefault();
          // Prevent opening a new window
          el.target = '_self';
          // Scroll to the matching element, if an element exists
          if (body.querySelector(el.hash)) {
            body.scrollTop = body.querySelector(el.hash).offsetTop;
          }
        }
      }
    });

    utilBtns = self.iframe.getElementById('epiceditor-utilbar');

    // TODO: Move into fullscreen setup function (_setupFullscreen)
    _elementStates = {}
    self._goFullscreen = function (el) {
      this._fixScrollbars('auto');

      if (self.is('fullscreen')) {
        self._exitFullscreen(el);
        return;
      }

      if (nativeFs) {
        if (nativeFsWebkit) {
          el.webkitRequestFullScreen();
        }
        else if (nativeFsMoz) {
          el.mozRequestFullScreen();
        }
        else if (nativeFsW3C) {
          el.requestFullscreen();
        }
      }

      _isInEdit = self.is('edit');

      // Set the state of EE in fullscreen
      // We set edit and preview to true also because they're visible
      // we might want to allow fullscreen edit mode without preview (like a "zen" mode)
      self._eeState.fullscreen = true;
      self._eeState.edit = true;
      self._eeState.preview = true;

      // Cache calculations
      var windowInnerWidth = window.innerWidth
        , windowInnerHeight = window.innerHeight
        , windowOuterWidth = window.outerWidth
        , windowOuterHeight = window.outerHeight;

      // Without this the scrollbars will get hidden when scrolled to the bottom in faux fullscreen (see #66)
      if (!nativeFs) {
        windowOuterHeight = window.innerHeight;
      }

      // This MUST come first because the editor is 100% width so if we change the width of the iframe or wrapper
      // the editor's width wont be the same as before
      _elementStates.editorIframe = _saveStyleState(self.editorIframe, 'save', {
        'width': windowOuterWidth / 2 + 'px'
      , 'height': windowOuterHeight + 'px'
      , 'float': 'left' // Most browsers
      , 'cssFloat': 'left' // FF
      , 'styleFloat': 'left' // Older IEs
      , 'display': 'block'
      , 'position': 'static'
      , 'left': ''
      });

      // the previewer
      _elementStates.previewerIframe = _saveStyleState(self.previewerIframe, 'save', {
        'width': windowOuterWidth / 2 + 'px'
      , 'height': windowOuterHeight + 'px'
      , 'float': 'right' // Most browsers
      , 'cssFloat': 'right' // FF
      , 'styleFloat': 'right' // Older IEs
      , 'display': 'block'
      , 'position': 'static'
      , 'left': ''
      });

      // Setup the containing element CSS for fullscreen
      _elementStates.element = _saveStyleState(self.element, 'save', {
        'position': 'fixed'
      , 'top': '0'
      , 'left': '0'
      , 'width': '100%'
      , 'z-index': '9999' // Most browsers
      , 'zIndex': '9999' // Firefox
      , 'border': 'none'
      , 'margin': '0'
      // Should use the base styles background!
      , 'background': _getStyle(self.editor, 'background-color') // Try to hide the site below
      , 'height': windowInnerHeight + 'px'
      });

      // The iframe element
      _elementStates.iframeElement = _saveStyleState(self.iframeElement, 'save', {
        'width': windowOuterWidth + 'px'
      , 'height': windowInnerHeight + 'px'
      });

      // ...Oh, and hide the buttons and prevent scrolling
      utilBtns.style.visibility = 'hidden';

      if (!nativeFs) {
        document.body.style.overflow = 'hidden';
      }

      self.preview();

      self.focus();

      self.emit('fullscreenenter');
    };

    self._exitFullscreen = function (el) {
      this._fixScrollbars();

      _saveStyleState(self.element, 'apply', _elementStates.element);
      _saveStyleState(self.iframeElement, 'apply', _elementStates.iframeElement);
      _saveStyleState(self.editorIframe, 'apply', _elementStates.editorIframe);
      _saveStyleState(self.previewerIframe, 'apply', _elementStates.previewerIframe);

      // We want to always revert back to the original styles in the CSS so,
      // if it's a fluid width container it will expand on resize and not get
      // stuck at a specific width after closing fullscreen.
      self.element.style.width = self._eeState.reflowWidth ? self._eeState.reflowWidth : '';
      self.element.style.height = self._eeState.reflowHeight ? self._eeState.reflowHeight : '';

      utilBtns.style.visibility = 'visible';

      // Put the editor back in the right state
      // TODO: This is ugly... how do we make this nicer?
      // setting fullscreen to false here prevents the
      // native fs callback from calling this function again
      self._eeState.fullscreen = false;

      if (!nativeFs) {
        document.body.style.overflow = 'auto';
      }
      else {
        if (nativeFsWebkit) {
          document.webkitCancelFullScreen();
        }
        else if (nativeFsMoz) {
          document.mozCancelFullScreen();
        }
        else if (nativeFsW3C) {
          document.exitFullscreen();
        }
      }

      if (_isInEdit) {
        self.edit();
      }
      else {
        self.preview();
      }

      self.reflow();

      self.emit('fullscreenexit');
    };

    // This setups up live previews by triggering preview() IF in fullscreen on keyup
    self.editor.addEventListener('keyup', function () {
      if (keypressTimer) {
        window.clearTimeout(keypressTimer);
      }
      keypressTimer = window.setTimeout(function () {
        if (self.is('fullscreen')) {
          self.preview();
        }
      }, 250);
    });
    
    fsElement = self.iframeElement;

    // Sets up the onclick event on utility buttons
    utilBtns.addEventListener('click', function (e) {
      var targetClass = e.target.className;
      if (targetClass.indexOf('epiceditor-toggle-preview-btn') > -1) {
        self.preview();
      }
      else if (targetClass.indexOf('epiceditor-toggle-edit-btn') > -1) {
        self.edit();
      }
      else if (targetClass.indexOf('epiceditor-fullscreen-btn') > -1) {
        self._goFullscreen(fsElement);
      }
    });

    // Sets up the NATIVE fullscreen editor/previewer for WebKit
    if (nativeFsWebkit) {
      document.addEventListener('webkitfullscreenchange', function () {
        if (!document.webkitIsFullScreen && self._eeState.fullscreen) {
          self._exitFullscreen(fsElement);
        }
      }, false);
    }
    else if (nativeFsMoz) {
      document.addEventListener('mozfullscreenchange', function () {
        if (!document.mozFullScreen && self._eeState.fullscreen) {
          self._exitFullscreen(fsElement);
        }
      }, false);
    }
    else if (nativeFsW3C) {
      document.addEventListener('fullscreenchange', function () {
        if (document.fullscreenElement == null && self._eeState.fullscreen) {
          self._exitFullscreen(fsElement);
        }
      }, false);
    }

    // TODO: Move utilBar stuff into a utilBar setup function (_setupUtilBar)
    utilBar = self.iframe.getElementById('epiceditor-utilbar');

    // Hide it at first until they move their mouse
    if (self.settings.button.bar !== true) {
      utilBar.style.display = 'none';
    }

    utilBar.addEventListener('mouseover', function () {
      if (utilBarTimer) {
        clearTimeout(utilBarTimer);
      }
    });

    function utilBarHandler(e) {
      if (self.settings.button.bar !== "auto") {
        return;
      }
      // Here we check if the mouse has moves more than 5px in any direction before triggering the mousemove code
      // we do this for 2 reasons:
      // 1. On Mac OS X lion when you scroll and it does the iOS like "jump" when it hits the top/bottom of the page itll fire off
      //    a mousemove of a few pixels depending on how hard you scroll
      // 2. We give a slight buffer to the user in case he barely touches his touchpad or mouse and not trigger the UI
      if (Math.abs(mousePos.y - e.pageY) >= 5 || Math.abs(mousePos.x - e.pageX) >= 5) {
        utilBar.style.display = 'block';
        // if we have a timer already running, kill it out
        if (utilBarTimer) {
          clearTimeout(utilBarTimer);
        }

        // begin a new timer that hides our object after 1000 ms
        utilBarTimer = window.setTimeout(function () {
          utilBar.style.display = 'none';
        }, 1000);
      }
      mousePos = { y: e.pageY, x: e.pageX };
    }
 
    // Add keyboard shortcuts for convenience.
    function shortcutHandler(e) {
      if (e.keyCode == self.settings.shortcut.modifier) { isMod = true } // check for modifier press(default is alt key), save to var
      if (e.keyCode == 17) { isCtrl = true } // check for ctrl/cmnd press, in order to catch ctrl/cmnd + s

      // Check for alt+p and make sure were not in fullscreen - default shortcut to switch to preview
      if (isMod === true && e.keyCode == self.settings.shortcut.preview && !self.is('fullscreen')) {
        e.preventDefault();
        if (self.is('edit') && self._previewEnabled) {
          self.preview();
        }
        else if (self._editEnabled) {
          self.edit();
        }
      }
      // Check for alt+f - default shortcut to make editor fullscreen
      if (isMod === true && e.keyCode == self.settings.shortcut.fullscreen && self._fullscreenEnabled) {
        e.preventDefault();
        self._goFullscreen(fsElement);
      }

      // Set the modifier key to false once *any* key combo is completed
      // or else, on Windows, hitting the alt key will lock the isMod state to true (ticket #133)
      if (isMod === true && e.keyCode !== self.settings.shortcut.modifier) {
        isMod = false;
      }

      // When a user presses "esc", revert everything!
      if (e.keyCode == 27 && self.is('fullscreen')) {
        self._exitFullscreen(fsElement);
      }

      // Check for ctrl + s (since a lot of people do it out of habit) and make it do nothing
      if (isCtrl === true && e.keyCode == 83) {
        self.save();
        e.preventDefault();
        isCtrl = false;
      }

      // Do the same for Mac now (metaKey == cmd).
      if (e.metaKey && e.keyCode == 83) {
        self.save();
        e.preventDefault();
      }

    }
    
    function shortcutUpHandler(e) {
      if (e.keyCode == self.settings.shortcut.modifier) { isMod = false }
      if (e.keyCode == 17) { isCtrl = false }
    }

    function pasteHandler(e) {
      var content;
      if (e.clipboardData) {
        //FF 22, Webkit, "standards"
        e.preventDefault();
        content = e.clipboardData.getData("text/plain");
        self.editorIframeDocument.execCommand("insertText", false, content);
      }
      else if (window.clipboardData) {
        //IE, "nasty"
        e.preventDefault();
        content = window.clipboardData.getData("Text");
        content = content.replace(/</g, '&lt;');
        content = content.replace(/>/g, '&gt;');
        content = content.replace(/\n/g, '<br>');
        content = content.replace(/\r/g, ''); //fuck you, ie!
        content = content.replace(/<br>\s/g, '<br>&nbsp;')
        content = content.replace(/\s\s\s/g, '&nbsp; &nbsp;')
        content = content.replace(/\s\s/g, '&nbsp; ')
        self.editorIframeDocument.selection.createRange().pasteHTML(content);
      }
    }

    // Hide and show the util bar based on mouse movements
    eventableIframes = [self.previewerIframeDocument, self.editorIframeDocument];
    
    for (i = 0; i < eventableIframes.length; i++) {
      eventableIframes[i].addEventListener('mousemove', function (e) {
        utilBarHandler(e);
      });
      eventableIframes[i].addEventListener('scroll', function (e) {
        utilBarHandler(e);
      });
      eventableIframes[i].addEventListener('keyup', function (e) {
        shortcutUpHandler(e);
      });
      eventableIframes[i].addEventListener('keydown', function (e) {
        shortcutHandler(e);
      });
      eventableIframes[i].addEventListener('paste', function (e) {
        pasteHandler(e);
      });
    }
    
    self.editor.addEventListener('focus', function (e) {
      self.emit('focus');
    });
    
    self.editor.addEventListener('blur', function (e) {
      self.emit('blur');
    });

    // Save the document every 100ms by default
    // TODO: Move into autosave setup function (_setupAutoSave)
    if (self.settings.file.autoSave) {
      self._saveIntervalTimer = window.setInterval(function () {
        if (!self._canSave) {
          return;
        }
        self.save(false, true);
      }, self.settings.file.autoSave);
    }

    // Update a textarea automatically if a textarea is given so you don't need
    // AJAX to submit a form and instead fall back to normal form behavior
    if (self.settings.textarea) {
      self._setupTextareaSync();
    }

    window.addEventListener('resize', function () {
      // If NOT webkit, and in fullscreen, we need to account for browser resizing
      // we don't care about webkit because you can't resize in webkit's fullscreen
      if (self.is('fullscreen')) {
        _applyStyles(self.iframeElement, {
          'width': window.outerWidth + 'px'
        , 'height': window.innerHeight + 'px'
        });

        _applyStyles(self.element, {
          'height': window.innerHeight + 'px'
        });

        _applyStyles(self.previewerIframe, {
          'width': window.outerWidth / 2 + 'px'
        , 'height': window.innerHeight + 'px'
        });

        _applyStyles(self.editorIframe, {
          'width': window.outerWidth / 2 + 'px'
        , 'height': window.innerHeight + 'px'
        });
      }
      // Makes the editor support fluid width when not in fullscreen mode
      else if (!self.is('fullscreen')) {
        self.reflow();
      }
    });

    // Set states before flipping edit and preview modes
    self._eeState.loaded = true;
    self._eeState.unloaded = false;

    if (self.is('preview')) {
      self.preview();
    }
    else {
      self.edit();
    }

    self.iframe.close();
    self._eeState.startup = false;

    if (self.settings.autogrow) {
      self._fixScrollbars();

      boundAutogrow = function () {
        setTimeout(function () {
          self._autogrow();
        }, 1);
      };

      //for if autosave is disabled or very slow
      ['keydown', 'keyup', 'paste', 'cut'].forEach(function (ev) {
        self.getElement('editor').addEventListener(ev, boundAutogrow);
      });
      
      self.on('__update', boundAutogrow);
      self.on('edit', function () {
        setTimeout(boundAutogrow, 50)
      });
      self.on('preview', function () {
        setTimeout(boundAutogrow, 50)
      });

      //for browsers that have rendering delays
      setTimeout(boundAutogrow, 50);
      boundAutogrow();
    }

    // The callback and call are the same thing, but different ways to access them
    callback.call(this);
    this.emit('load');
    return this;
  }

  EpicEditor.prototype._setupTextareaSync = function () {
    var self = this
      , textareaFileName = self.settings.file.name
      , _syncTextarea;

    // Even if autoSave is false, we want to make sure to keep the textarea synced
    // with the editor's content. One bad thing about this tho is that we're
    // creating two timers now in some configurations. We keep the textarea synced
    // by saving and opening the textarea content from the draft file storage.
    self._textareaSaveTimer = window.setInterval(function () {
      if (!self._canSave) {
        return;
      }
      self.save(true);
    }, 100);

    _syncTextarea = function () {
      // TODO: Figure out root cause for having to do this ||.
      // This only happens for draft files. Probably has something to do with
      // the fact draft files haven't been saved by the time this is called.
      // TODO: Add test for this case.
      self._textareaElement.value = self.exportFile(textareaFileName, 'text', true) || self.settings.file.defaultContent;
    }

    if (typeof self.settings.textarea == 'string') {
      self._textareaElement = document.getElementById(self.settings.textarea);
    }
    else if (typeof self.settings.textarea == 'object') {
      self._textareaElement = self.settings.textarea;
    }

    // On page load, if there's content in the textarea that means one of two
    // different things:
    //
    // 1. The editor didn't load and the user was writing in the textarea and
    // now he refreshed the page or the JS loaded and the textarea now has
    // content. If this is the case the user probably expects his content is
    // moved into the editor and not lose what he typed.
    //
    // 2. The developer put content in the textarea from some server side
    // code. In this case, the textarea will take precedence.
    //
    // If the developer wants drafts to be recoverable they should check if
    // the local file in localStorage's modified date is newer than the server.
    if (self._textareaElement.value !== '') {
      self.importFile(textareaFileName, self._textareaElement.value);

      // manually save draft after import so there is no delay between the
      // import and exporting in _syncTextarea. Without this, _syncTextarea
      // will pull the saved data from localStorage which will be <=100ms old.
      self.save(true);
    }

    // Update the textarea on load and pull from drafts
    _syncTextarea();

    // Make sure to keep it updated
    self.on('__update', _syncTextarea);
  }

  /**
   * Will NOT focus the editor if the editor is still starting up AND
   * focusOnLoad is set to false. This allows you to place this in code that
   * gets fired during .load() without worrying about it overriding the user's
   * option. For example use cases see preview() and edit().
   * @returns {undefined}
   */

  // Prevent focus when the user sets focusOnLoad to false by checking if the
  // editor is starting up AND if focusOnLoad is true
  EpicEditor.prototype._focusExceptOnLoad = function () {
    var self = this;
    if ((self._eeState.startup && self.settings.focusOnLoad) || !self._eeState.startup) {
      self.focus();
    }
  }

  /**
   * Will remove the editor, but not offline files
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.unload = function (callback) {

    // Make sure the editor isn't already unloaded.
    if (this.is('unloaded')) {
      throw new Error('Editor isn\'t loaded');
    }

    var self = this
      , editor = window.parent.document.getElementById(self._instanceId);

    editor.parentNode.removeChild(editor);
    self._eeState.loaded = false;
    self._eeState.unloaded = true;
    callback = callback || function () {};

    if (self.settings.textarea) {
      self._textareaElement.value = "";
      self.removeListener('__update');
    }

    if (self._saveIntervalTimer) {
      window.clearInterval(self._saveIntervalTimer);
    }
    if (self._textareaSaveTimer) {
      window.clearInterval(self._textareaSaveTimer);
    }

    callback.call(this);
    self.emit('unload');
    return self;
  }

  /**
   * reflow allows you to dynamically re-fit the editor in the parent without
   * having to unload and then reload the editor again.
   *
   * reflow will also emit a `reflow` event and will return the new dimensions.
   * If it's called without params it'll return the new width and height and if
   * it's called with just width or just height it'll just return the width or
   * height. It's returned as an object like: { width: '100px', height: '1px' }
   *
   * @param {string|null} kind Can either be 'width' or 'height' or null
   * if null, both the height and width will be resized
   * @param {function} callback A function to fire after the reflow is finished.
   * Will return the width / height in an obj as the first param of the callback.
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.reflow = function (kind, callback) {
    var self = this
      , widthDiff = _outerWidth(self.element) - self.element.offsetWidth
      , heightDiff = _outerHeight(self.element) - self.element.offsetHeight
      , elements = [self.iframeElement, self.editorIframe, self.previewerIframe]
      , eventData = {}
      , newWidth
      , newHeight;

    if (typeof kind == 'function') {
      callback = kind;
      kind = null;
    }

    if (!callback) {
      callback = function () {};
    }

    for (var x = 0; x < elements.length; x++) {
      if (!kind || kind == 'width') {
        newWidth = self.element.offsetWidth - widthDiff + 'px';
        elements[x].style.width = newWidth;
        self._eeState.reflowWidth = newWidth;
        eventData.width = newWidth;
      }
      if (!kind || kind == 'height') {
        newHeight = self.element.offsetHeight - heightDiff + 'px';
        elements[x].style.height = newHeight;
        self._eeState.reflowHeight = newHeight
        eventData.height = newHeight;
      }
    }

    self.emit('reflow', eventData);
    callback.call(this, eventData);
    return self;
  }

  /**
   * Will take the markdown and generate a preview view based on the theme
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.preview = function () {
    var self = this
      , x
      , theme = self.settings.theme.preview
      , anchors;

    _replaceClass(self.getElement('wrapper'), 'epiceditor-edit-mode', 'epiceditor-preview-mode');

    // Check if no CSS theme link exists
    if (!self.previewerIframeDocument.getElementById('theme')) {
      _insertCSSLink(theme, self.previewerIframeDocument, 'theme');
    }
    else if (self.previewerIframeDocument.getElementById('theme').name !== theme) {
      self.previewerIframeDocument.getElementById('theme').href = theme;
    }

    // Save a preview draft since it might not be saved to the real file yet
    self.save(true);

    // Add the generated draft HTML into the previewer
    self.previewer.innerHTML = self.exportFile(null, 'html', true);

    // Hide the editor and display the previewer
    if (!self.is('fullscreen')) {
      self.editorIframe.style.left = '-999999px';
      self.previewerIframe.style.left = '';
      self._eeState.preview = true;
      self._eeState.edit = false;
      self._focusExceptOnLoad();
    }

    self.emit('preview');
    return self;
  }

  /**
   * Helper to focus on the editor iframe. Will figure out which iframe to
   * focus on based on which one is active and will handle the cross browser
   * issues with focusing on the iframe vs the document body.
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.focus = function (pageload) {
    var self = this
      , isPreview = self.is('preview')
      , focusElement = isPreview ? self.previewerIframeDocument.body
        : self.editorIframeDocument.body;

    if (_isFirefox() && isPreview) {
      focusElement = self.previewerIframe;
    }

    focusElement.focus();
    return this;
  }

  /**
   * Puts the editor into fullscreen mode
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.enterFullscreen = function () {
    if (this.is('fullscreen')) { return this; }
    this._goFullscreen(this.iframeElement);
    return this;
  }

  /**
   * Closes fullscreen mode if opened
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.exitFullscreen = function () {
    if (!this.is('fullscreen')) { return this; }
    this._exitFullscreen(this.iframeElement);
    return this;
  }

  /**
   * Hides the preview and shows the editor again
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.edit = function () {
    var self = this;
    _replaceClass(self.getElement('wrapper'), 'epiceditor-preview-mode', 'epiceditor-edit-mode');
    self._eeState.preview = false;
    self._eeState.edit = true;
    self.editorIframe.style.left = '';
    self.previewerIframe.style.left = '-999999px';
    self._focusExceptOnLoad();
    self.emit('edit');
    return this;
  }

  /**
   * Grabs a specificed HTML node. Use it as a shortcut to getting the iframe contents
   * @param   {String} name The name of the node (can be document, body, editor, previewer, or wrapper)
   * @returns {Object|Null}
   */
  EpicEditor.prototype.getElement = function (name) {
    var available = {
      "container": this.element
    , "wrapper": this.iframe.getElementById('epiceditor-wrapper')
    , "wrapperIframe": this.iframeElement
    , "editor": this.editorIframeDocument
    , "editorIframe": this.editorIframe
    , "previewer": this.previewerIframeDocument
    , "previewerIframe": this.previewerIframe
    }

    // Check that the given string is a possible option and verify the editor isn't unloaded
    // without this, you'd be given a reference to an object that no longer exists in the DOM
    if (!available[name] || this.is('unloaded')) {
      return null;
    }
    else {
      return available[name];
    }
  }

  /**
   * Returns a boolean of each "state" of the editor. For example "editor.is('loaded')" // returns true/false
   * @param {String} what the state you want to check for
   * @returns {Boolean}
   */
  EpicEditor.prototype.is = function (what) {
    var self = this;
    switch (what) {
    case 'loaded':
      return self._eeState.loaded;
    case 'unloaded':
      return self._eeState.unloaded
    case 'preview':
      return self._eeState.preview
    case 'edit':
      return self._eeState.edit;
    case 'fullscreen':
      return self._eeState.fullscreen;
   // TODO: This "works", but the tests are saying otherwise. Come back to this
   // and figure out how to fix it.
   // case 'focused':
   //   return document.activeElement == self.iframeElement;
    default:
      return false;
    }
  }

  /**
   * Opens a file
   * @param   {string} name The name of the file you want to open
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.open = function (name) {
    var self = this
      , defaultContent = self.settings.file.defaultContent
      , fileObj;
    name = name || self.settings.file.name;
    self.settings.file.name = name;
    if (this._storage[self.settings.localStorageName]) {
      fileObj = self.exportFile(name);
      if (fileObj !== undefined) {
        _setText(self.editor, fileObj);
        self.emit('read');
      }
      else {
        _setText(self.editor, defaultContent);
        self.save(); // ensure a save
        self.emit('create');
      }
      self.previewer.innerHTML = self.exportFile(null, 'html');
      self.emit('open');
    }
    return this;
  }

  /**
   * Saves content for offline use
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.save = function (_isPreviewDraft, _isAuto) {
    var self = this
      , storage
      , isUpdate = false
      , file = self.settings.file.name
      , previewDraftName = ''
      , data = this._storage[previewDraftName + self.settings.localStorageName]
      , content = _getText(this.editor);

    if (_isPreviewDraft) {
      previewDraftName = self._previewDraftLocation;
    }

    // This could have been false but since we're manually saving
    // we know it's save to start autoSaving again
    this._canSave = true;

    // Guard against storage being wiped out without EpicEditor knowing
    // TODO: Emit saving error - storage seems to have been wiped
    if (data) {
      storage = JSON.parse(this._storage[previewDraftName + self.settings.localStorageName]);

      // If the file doesn't exist we need to create it
      if (storage[file] === undefined) {
        storage[file] = self._defaultFileSchema();
      }

      // If it does, we need to check if the content is different and
      // if it is, send the update event and update the timestamp
      else if (content !== storage[file].content) {
        storage[file].modified = new Date();
        isUpdate = true;
      }
      //don't bother autosaving if the content hasn't actually changed
      else if (_isAuto) {
        return;
      }

      storage[file].content = content;
      this._storage[previewDraftName + self.settings.localStorageName] = JSON.stringify(storage);

      // After the content is actually changed, emit update so it emits the updated content
      if (isUpdate) {
        self.emit('update');
        // Emit a private update event so it can't get accidentally removed
        self.emit('__update');
      }

      if (_isAuto) {
        this.emit('autosave');
      }
      else if (!_isPreviewDraft) {
        this.emit('save');
      }
    }

    return this;
  }

  /**
   * Removes a page
   * @param   {string} name The name of the file you want to remove from localStorage
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.remove = function (name) {
    var self = this
      , s;
    name = name || self.settings.file.name;

    // If you're trying to delete a page you have open, block saving
    if (name == self.settings.file.name) {
      self._canSave = false;
    }

    s = JSON.parse(this._storage[self.settings.localStorageName]);
    delete s[name];
    this._storage[self.settings.localStorageName] = JSON.stringify(s);
    this.emit('remove');
    return this;
  };

  /**
   * Renames a file
   * @param   {string} oldName The old file name
   * @param   {string} newName The new file name
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.rename = function (oldName, newName) {
    var self = this
      , s = JSON.parse(this._storage[self.settings.localStorageName]);
    s[newName] = s[oldName];
    delete s[oldName];
    this._storage[self.settings.localStorageName] = JSON.stringify(s);
    self.open(newName);
    return this;
  };

  /**
   * Imports a file and it's contents and opens it
   * @param   {string} name The name of the file you want to import (will overwrite existing files!)
   * @param   {string} content Content of the file you want to import
   * @param   {string} kind The kind of file you want to import (TBI)
   * @param   {object} meta Meta data you want to save with your file.
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.importFile = function (name, content, kind, meta) {
    var self = this
      , isNew = false;

    name = name || self.settings.file.name;
    content = content || '';
    kind = kind || 'md';
    meta = meta || {};
  
    if (JSON.parse(this._storage[self.settings.localStorageName])[name] === undefined) {
      isNew = true;
    }

    // Set our current file to the new file and update the content
    self.settings.file.name = name;
    _setText(self.editor, content);

    if (isNew) {
      self.emit('create');
    }

    self.save();

    if (self.is('fullscreen')) {
      self.preview();
    }

    //firefox has trouble with importing and working out the size right away
    if (self.settings.autogrow) {
      setTimeout(function () {
        self._autogrow();
      }, 50);
    }

    return this;
  };

  /**
   * Gets the local filestore
   * @param   {string} name Name of the file in the store
   * @returns {object|undefined} the local filestore, or a specific file in the store, if a name is given
   */
  EpicEditor.prototype._getFileStore = function (name, _isPreviewDraft) {
    var previewDraftName = ''
      , store;
    if (_isPreviewDraft) {
      previewDraftName = this._previewDraftLocation;
    }
    store = JSON.parse(this._storage[previewDraftName + this.settings.localStorageName]);
    if (name) {
      return store[name];
    }
    else {
      return store;
    }
  }

  /**
   * Exports a file as a string in a supported format
   * @param   {string} name Name of the file you want to export (case sensitive)
   * @param   {string} kind Kind of file you want the content in (currently supports html and text, default is the format the browser "wants")
   * @returns {string|undefined}  The content of the file in the content given or undefined if it doesn't exist
   */
  EpicEditor.prototype.exportFile = function (name, kind, _isPreviewDraft) {
    var self = this
      , file
      , content;

    name = name || self.settings.file.name;
    kind = kind || 'text';
   
    file = self._getFileStore(name, _isPreviewDraft);

    // If the file doesn't exist just return early with undefined
    if (file === undefined) {
      return;
    }

    content = file.content;
   
    switch (kind) {
    case 'html':
      content = _sanitizeRawContent(content);
      return self.settings.parser(content);
    case 'text':
      return _sanitizeRawContent(content);
    case 'json':
      file.content = _sanitizeRawContent(file.content);
      return JSON.stringify(file);
    case 'raw':
      return content;
    default:
      return content;
    }
  }

  /**
   * Gets the contents and metadata for files
   * @param   {string} name Name of the file whose data you want (case sensitive)
   * @param   {boolean} excludeContent whether the contents of files should be excluded
   * @returns {object} An object with the names and data of every file, or just the data of one file if a name was given
   */
  EpicEditor.prototype.getFiles = function (name, excludeContent) {
    var file
      , data = this._getFileStore(name);
    
    if (name) {
      if (data !== undefined) {
        if (excludeContent) {
          delete data.content;
        }
        else {
          data.content = _sanitizeRawContent(data.content);
        }
      }
      return data;
    }
    else {
      for (file in data) {
        if (data.hasOwnProperty(file)) {
          if (excludeContent) {
            delete data[file].content;
          }
          else {
            data[file].content = _sanitizeRawContent(data[file].content);
          }
        }
      }
      return data;
    }
  }

  // EVENTS
  // TODO: Support for namespacing events like "preview.foo"
  /**
   * Sets up an event handler for a specified event
   * @param  {string} ev The event name
   * @param  {function} handler The callback to run when the event fires
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.on = function (ev, handler) {
    var self = this;
    if (!this.events[ev]) {
      this.events[ev] = [];
    }
    this.events[ev].push(handler);
    return self;
  };

  /**
   * This will emit or "trigger" an event specified
   * @param  {string} ev The event name
   * @param  {any} data Any data you want to pass into the callback
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.emit = function (ev, data) {
    var self = this
      , x;

    data = data || self.getFiles(self.settings.file.name);

    if (!this.events[ev]) {
      return;
    }

    function invokeHandler(handler) {
      handler.call(self, data);
    }

    for (x = 0; x < self.events[ev].length; x++) {
      invokeHandler(self.events[ev][x]);
    }

    return self;
  };

  /**
   * Will remove any listeners added from EpicEditor.on()
   * @param  {string} ev The event name
   * @param  {function} handler Handler to remove
   * @returns {object} EpicEditor will be returned
   */
  EpicEditor.prototype.removeListener = function (ev, handler) {
    var self = this;
    if (!handler) {
      this.events[ev] = [];
      return self;
    }
    if (!this.events[ev]) {
      return self;
    }
    // Otherwise a handler and event exist, so take care of it
    this.events[ev].splice(this.events[ev].indexOf(handler), 1);
    return self;
  }

  /**
   * Handles autogrowing the editor
   */
  EpicEditor.prototype._autogrow = function () {
    var editorHeight
      , newHeight
      , minHeight
      , maxHeight
      , el
      , style
      , maxedOut = false;

    //autogrow in fullscreen is nonsensical
    if (!this.is('fullscreen')) {
      if (this.is('edit')) {
        el = this.getElement('editor').documentElement;
      }
      else {
        el = this.getElement('previewer').documentElement;
      }

      editorHeight = _outerHeight(el);
      newHeight = editorHeight;

      //handle minimum
      minHeight = this.settings.autogrow.minHeight;
      if (typeof minHeight === 'function') {
        minHeight = minHeight(this);
      }

      if (minHeight && newHeight < minHeight) {
        newHeight = minHeight;
      }

      //handle maximum
      maxHeight = this.settings.autogrow.maxHeight;
      if (typeof maxHeight === 'function') {
        maxHeight = maxHeight(this);
      }

      if (maxHeight && newHeight > maxHeight) {
        newHeight = maxHeight;
        maxedOut = true;
      }

      if (maxedOut) {
        this._fixScrollbars('auto');
      } else {
        this._fixScrollbars('hidden');
      }

      //actual resize
      if (newHeight != this.oldHeight) {
        this.getElement('container').style.height = newHeight + 'px';
        this.reflow();
        if (this.settings.autogrow.scroll) {
          window.scrollBy(0, newHeight - this.oldHeight);
        }
        this.oldHeight = newHeight;
      }
    }
  }

  /**
   * Shows or hides scrollbars based on the autogrow setting
   * @param {string} forceSetting a value to force the overflow to
   */
  EpicEditor.prototype._fixScrollbars = function (forceSetting) {
    var setting;
    if (this.settings.autogrow) {
      setting = 'hidden';
    }
    else {
      setting = 'auto';
    }
    setting = forceSetting || setting;
    this.getElement('editor').documentElement.style.overflow = setting;
    this.getElement('previewer').documentElement.style.overflow = setting;
  }

  EpicEditor.version = '0.2.2';

  // Used to store information to be shared across editors
  EpicEditor._data = {};

  window.EpicEditor = EpicEditor;
})(window);

/**
 * marked - a markdown parser
 * Copyright (c) 2011-2013, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){3,} *\n*/,
  blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,
  def: /^ *\[([^\]]+)\]: *([^\s]+)(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^([^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', /\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,}) *(\w+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!' + block.gfm.fences.source.replace('\\1', '\\2') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3]
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'list_start',
        ordered: isFinite(cap[2])
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item[item.length-1] === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: cap[1] === 'pre',
        text: cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[0]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>|])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)([\s\S]*?[^`])\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([^\s]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~])')(),
  url: /^(https?:\/\/[^\s]+[^.,:;"')\]\s])/,
  del: /^~{2,}([\s\S]+?)~{2,}/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, opt) {
  var inline = new InlineLexer(links, opt);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1][6] === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += '<a href="'
        + href
        + '">'
        + text
        + '</a>';
      continue;
    }

    // url (gfm)
    if (cap = this.rules.url.exec(src)) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += '<a href="'
        + href
        + '">'
        + text
        + '</a>';
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0][0];
        src = cap[0].substring(1) + src;
        continue;
      }
      out += this.outputLink(cap, link);
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<strong>'
        + this.output(cap[2] || cap[1])
        + '</strong>';
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<em>'
        + this.output(cap[2] || cap[1])
        + '</em>';
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<code>'
        + escape(cap[2], true)
        + '</code>';
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<br>';
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += '<del>'
        + this.output(cap[1])
        + '</del>';
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += escape(cap[0]);
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  if (cap[0][0] !== '!') {
    return '<a href="'
      + escape(link.href)
      + '"'
      + (link.title
      ? ' title="'
      + escape(link.title)
      + '"'
      : '')
      + '>'
      + this.output(cap[1])
      + '</a>';
  } else {
    return '<img src="'
      + escape(link.href)
      + '" alt="'
      + escape(cap[1])
      + '"'
      + (link.title
      ? ' title="'
      + escape(link.title)
      + '"'
      : '')
      + '>';
  }
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options) {
  var parser = new Parser(options);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length-1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return '<hr>\n';
    }
    case 'heading': {
      return '<h'
        + this.token.depth
        + '>'
        + this.inline.output(this.token.text)
        + '</h'
        + this.token.depth
        + '>\n';
    }
    case 'code': {
      if (this.options.highlight) {
        var code = this.options.highlight(this.token.text, this.token.lang);
        if (code != null && code !== this.token.text) {
          this.token.escaped = true;
          this.token.text = code;
        }
      }

      if (!this.token.escaped) {
        this.token.text = escape(this.token.text, true);
      }

      return '<pre><code'
        + (this.token.lang
        ? ' class="lang-'
        + this.token.lang
        + '"'
        : '')
        + '>'
        + this.token.text
        + '</code></pre>\n';
    }
    case 'table': {
      var body = ''
        , heading
        , i
        , row
        , cell
        , j;

      // header
      body += '<thead>\n<tr>\n';
      for (i = 0; i < this.token.header.length; i++) {
        heading = this.inline.output(this.token.header[i]);
        body += this.token.align[i]
          ? '<th align="' + this.token.align[i] + '">' + heading + '</th>\n'
          : '<th>' + heading + '</th>\n';
      }
      body += '</tr>\n</thead>\n';

      // body
      body += '<tbody>\n'
      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];
        body += '<tr>\n';
        for (j = 0; j < row.length; j++) {
          cell = this.inline.output(row[j]);
          body += this.token.align[j]
            ? '<td align="' + this.token.align[j] + '">' + cell + '</td>\n'
            : '<td>' + cell + '</td>\n';
        }
        body += '</tr>\n';
      }
      body += '</tbody>\n';

      return '<table>\n'
        + body
        + '</table>\n';
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return '<blockquote>\n'
        + body
        + '</blockquote>\n';
    }
    case 'list_start': {
      var type = this.token.ordered ? 'ol' : 'ul'
        , body = '';

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return '<'
        + type
        + '>\n'
        + body
        + '</'
        + type
        + '>\n';
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return '<li>'
        + body
        + '</li>\n';
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return '<li>'
        + body
        + '</li>\n';
    }
    case 'html': {
      return !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
    }
    case 'paragraph': {
      return '<p>'
        + this.inline.output(this.token.text)
        + '</p>\n';
    }
    case 'text': {
      return '<p>'
        + this.parseText()
        + '</p>\n';
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

/**
 * Marked
 */

function marked(src, opt) {
  try {
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return 'An error occured:\n' + e.message;
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  marked.defaults = opt;
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  silent: false,
  highlight: null
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());
// Released under MIT license
// Copyright (c) 2009-2010 Dominic Baggott
// Copyright (c) 2009-2010 Ash Berlin
// Copyright (c) 2011 Christoph Dorn <christoph@christophdorn.com> (http://www.christophdorn.com)
// Date: 2013-09-15T16:12Z

(function(expose) {




  var MarkdownHelpers = {};

  // For Spidermonkey based engines
  function mk_block_toSource() {
    return "Markdown.mk_block( " +
            uneval(this.toString()) +
            ", " +
            uneval(this.trailing) +
            ", " +
            uneval(this.lineNumber) +
            " )";
  }

  // node
  function mk_block_inspect() {
    var util = require("util");
    return "Markdown.mk_block( " +
            util.inspect(this.toString()) +
            ", " +
            util.inspect(this.trailing) +
            ", " +
            util.inspect(this.lineNumber) +
            " )";

  }

  MarkdownHelpers.mk_block = function(block, trail, line) {
    // Be helpful for default case in tests.
    if ( arguments.length === 1 )
      trail = "\n\n";

    // We actually need a String object, not a string primitive
    /* jshint -W053 */
    var s = new String(block);
    s.trailing = trail;
    // To make it clear its not just a string
    s.inspect = mk_block_inspect;
    s.toSource = mk_block_toSource;

    if ( line !== undefined )
      s.lineNumber = line;

    return s;
  };


  var isArray = MarkdownHelpers.isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

  // Don't mess with Array.prototype. Its not friendly
  if ( Array.prototype.forEach ) {
    MarkdownHelpers.forEach = function forEach( arr, cb, thisp ) {
      return arr.forEach( cb, thisp );
    };
  }
  else {
    MarkdownHelpers.forEach = function forEach(arr, cb, thisp) {
      for (var i = 0; i < arr.length; i++)
        cb.call(thisp || arr, arr[i], i, arr);
    };
  }

  MarkdownHelpers.isEmpty = function isEmpty( obj ) {
    for ( var key in obj ) {
      if ( hasOwnProperty.call( obj, key ) )
        return false;
    }
    return true;
  };

  MarkdownHelpers.extract_attr = function extract_attr( jsonml ) {
    return isArray(jsonml)
        && jsonml.length > 1
        && typeof jsonml[ 1 ] === "object"
        && !( isArray(jsonml[ 1 ]) )
        ? jsonml[ 1 ]
        : undefined;
  };




 /**
   *  class Markdown
   *
   *  Markdown processing in Javascript done right. We have very particular views
   *  on what constitutes 'right' which include:
   *
   *  - produces well-formed HTML (this means that em and strong nesting is
   *    important)
   *
   *  - has an intermediate representation to allow processing of parsed data (We
   *    in fact have two, both as [JsonML]: a markdown tree and an HTML tree).
   *
   *  - is easily extensible to add new dialects without having to rewrite the
   *    entire parsing mechanics
   *
   *  - has a good test suite
   *
   *  This implementation fulfills all of these (except that the test suite could
   *  do with expanding to automatically run all the fixtures from other Markdown
   *  implementations.)
   *
   *  ##### Intermediate Representation
   *
   *  *TODO* Talk about this :) Its JsonML, but document the node names we use.
   *
   *  [JsonML]: http://jsonml.org/ "JSON Markup Language"
   **/
  var Markdown = function(dialect) {
    switch (typeof dialect) {
    case "undefined":
      this.dialect = Markdown.dialects.Gruber;
      break;
    case "object":
      this.dialect = dialect;
      break;
    default:
      if ( dialect in Markdown.dialects )
        this.dialect = Markdown.dialects[dialect];
      else
        throw new Error("Unknown Markdown dialect '" + String(dialect) + "'");
      break;
    }
    this.em_state = [];
    this.strong_state = [];
    this.debug_indent = "";
  };

  /**
   * Markdown.dialects
   *
   * Namespace of built-in dialects.
   **/
  Markdown.dialects = {};




  // Imported functions
  var mk_block = Markdown.mk_block = MarkdownHelpers.mk_block,
      isArray = MarkdownHelpers.isArray;

  /**
   *  parse( markdown, [dialect] ) -> JsonML
   *  - markdown (String): markdown string to parse
   *  - dialect (String | Dialect): the dialect to use, defaults to gruber
   *
   *  Parse `markdown` and return a markdown document as a Markdown.JsonML tree.
   **/
  Markdown.parse = function( source, dialect ) {
    // dialect will default if undefined
    var md = new Markdown( dialect );
    return md.toTree( source );
  };

  function count_lines( str ) {
    var n = 0,
        i = -1;
    while ( ( i = str.indexOf("\n", i + 1) ) !== -1 )
      n++;
    return n;
  }

  // Internal - split source into rough blocks
  Markdown.prototype.split_blocks = function splitBlocks( input ) {
    input = input.replace(/(\r\n|\n|\r)/g, "\n");
    // [\s\S] matches _anything_ (newline or space)
    // [^] is equivalent but doesn't work in IEs.
    var re = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,
        blocks = [],
        m;

    var line_no = 1;

    if ( ( m = /^(\s*\n)/.exec(input) ) !== null ) {
      // skip (but count) leading blank lines
      line_no += count_lines( m[0] );
      re.lastIndex = m[0].length;
    }

    while ( ( m = re.exec(input) ) !== null ) {
      if (m[2] === "\n#") {
        m[2] = "\n";
        re.lastIndex--;
      }
      blocks.push( mk_block( m[1], m[2], line_no ) );
      line_no += count_lines( m[0] );
    }

    return blocks;
  };

  /**
   *  Markdown#processBlock( block, next ) -> undefined | [ JsonML, ... ]
   *  - block (String): the block to process
   *  - next (Array): the following blocks
   *
   * Process `block` and return an array of JsonML nodes representing `block`.
   *
   * It does this by asking each block level function in the dialect to process
   * the block until one can. Succesful handling is indicated by returning an
   * array (with zero or more JsonML nodes), failure by a false value.
   *
   * Blocks handlers are responsible for calling [[Markdown#processInline]]
   * themselves as appropriate.
   *
   * If the blocks were split incorrectly or adjacent blocks need collapsing you
   * can adjust `next` in place using shift/splice etc.
   *
   * If any of this default behaviour is not right for the dialect, you can
   * define a `__call__` method on the dialect that will get invoked to handle
   * the block processing.
   */
  Markdown.prototype.processBlock = function processBlock( block, next ) {
    var cbs = this.dialect.block,
        ord = cbs.__order__;

    if ( "__call__" in cbs )
      return cbs.__call__.call(this, block, next);

    for ( var i = 0; i < ord.length; i++ ) {
      //D:this.debug( "Testing", ord[i] );
      var res = cbs[ ord[i] ].call( this, block, next );
      if ( res ) {
        //D:this.debug("  matched");
        if ( !isArray(res) || ( res.length > 0 && !( isArray(res[0]) ) ) )
          this.debug(ord[i], "didn't return a proper array");
        //D:this.debug( "" );
        return res;
      }
    }

    // Uhoh! no match! Should we throw an error?
    return [];
  };

  Markdown.prototype.processInline = function processInline( block ) {
    return this.dialect.inline.__call__.call( this, String( block ) );
  };

  /**
   *  Markdown#toTree( source ) -> JsonML
   *  - source (String): markdown source to parse
   *
   *  Parse `source` into a JsonML tree representing the markdown document.
   **/
  // custom_tree means set this.tree to `custom_tree` and restore old value on return
  Markdown.prototype.toTree = function toTree( source, custom_root ) {
    var blocks = source instanceof Array ? source : this.split_blocks( source );

    // Make tree a member variable so its easier to mess with in extensions
    var old_tree = this.tree;
    try {
      this.tree = custom_root || this.tree || [ "markdown" ];

      blocks_loop:
      while ( blocks.length ) {
        var b = this.processBlock( blocks.shift(), blocks );

        // Reference blocks and the like won't return any content
        if ( !b.length )
          continue blocks_loop;

        this.tree.push.apply( this.tree, b );
      }
      return this.tree;
    }
    finally {
      if ( custom_root )
        this.tree = old_tree;
    }
  };

  // Noop by default
  Markdown.prototype.debug = function () {
    var args = Array.prototype.slice.call( arguments);
    args.unshift(this.debug_indent);
    if ( typeof print !== "undefined" )
      print.apply( print, args );
    if ( typeof console !== "undefined" && typeof console.log !== "undefined" )
      console.log.apply( null, args );
  };

  Markdown.prototype.loop_re_over_block = function( re, block, cb ) {
    // Dont use /g regexps with this
    var m,
        b = block.valueOf();

    while ( b.length && (m = re.exec(b) ) !== null ) {
      b = b.substr( m[0].length );
      cb.call(this, m);
    }
    return b;
  };

  // Build default order from insertion order.
  Markdown.buildBlockOrder = function(d) {
    var ord = [];
    for ( var i in d ) {
      if ( i === "__order__" || i === "__call__" )
        continue;
      ord.push( i );
    }
    d.__order__ = ord;
  };

  // Build patterns for inline matcher
  Markdown.buildInlinePatterns = function(d) {
    var patterns = [];

    for ( var i in d ) {
      // __foo__ is reserved and not a pattern
      if ( i.match( /^__.*__$/) )
        continue;
      var l = i.replace( /([\\.*+?|()\[\]{}])/g, "\\$1" )
               .replace( /\n/, "\\n" );
      patterns.push( i.length === 1 ? l : "(?:" + l + ")" );
    }

    patterns = patterns.join("|");
    d.__patterns__ = patterns;
    //print("patterns:", uneval( patterns ) );

    var fn = d.__call__;
    d.__call__ = function(text, pattern) {
      if ( pattern !== undefined )
        return fn.call(this, text, pattern);
      else
        return fn.call(this, text, patterns);
    };
  };




  var extract_attr = MarkdownHelpers.extract_attr;

  /**
   *  renderJsonML( jsonml[, options] ) -> String
   *  - jsonml (Array): JsonML array to render to XML
   *  - options (Object): options
   *
   *  Converts the given JsonML into well-formed XML.
   *
   *  The options currently understood are:
   *
   *  - root (Boolean): wether or not the root node should be included in the
   *    output, or just its children. The default `false` is to not include the
   *    root itself.
   */
  Markdown.renderJsonML = function( jsonml, options ) {
    options = options || {};
    // include the root element in the rendered output?
    options.root = options.root || false;

    var content = [];

    if ( options.root ) {
      content.push( render_tree( jsonml ) );
    }
    else {
      jsonml.shift(); // get rid of the tag
      if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) )
        jsonml.shift(); // get rid of the attributes

      while ( jsonml.length )
        content.push( render_tree( jsonml.shift() ) );
    }

    return content.join( "\n\n" );
  };


  /**
   *  toHTMLTree( markdown, [dialect] ) -> JsonML
   *  toHTMLTree( md_tree ) -> JsonML
   *  - markdown (String): markdown string to parse
   *  - dialect (String | Dialect): the dialect to use, defaults to gruber
   *  - md_tree (Markdown.JsonML): parsed markdown tree
   *
   *  Turn markdown into HTML, represented as a JsonML tree. If a string is given
   *  to this function, it is first parsed into a markdown tree by calling
   *  [[parse]].
   **/
  Markdown.toHTMLTree = function toHTMLTree( input, dialect , options ) {

    // convert string input to an MD tree
    if ( typeof input === "string" )
      input = this.parse( input, dialect );

    // Now convert the MD tree to an HTML tree

    // remove references from the tree
    var attrs = extract_attr( input ),
        refs = {};

    if ( attrs && attrs.references )
      refs = attrs.references;

    var html = convert_tree_to_html( input, refs , options );
    merge_text_nodes( html );
    return html;
  };

  /**
   *  toHTML( markdown, [dialect]  ) -> String
   *  toHTML( md_tree ) -> String
   *  - markdown (String): markdown string to parse
   *  - md_tree (Markdown.JsonML): parsed markdown tree
   *
   *  Take markdown (either as a string or as a JsonML tree) and run it through
   *  [[toHTMLTree]] then turn it into a well-formated HTML fragment.
   **/
  Markdown.toHTML = function toHTML( source , dialect , options ) {
    var input = this.toHTMLTree( source , dialect , options );

    return this.renderJsonML( input );
  };


  function escapeHTML( text ) {
    return text.replace( /&/g, "&amp;" )
               .replace( /</g, "&lt;" )
               .replace( />/g, "&gt;" )
               .replace( /"/g, "&quot;" )
               .replace( /'/g, "&#39;" );
  }

  function render_tree( jsonml ) {
    // basic case
    if ( typeof jsonml === "string" )
      return escapeHTML( jsonml );

    var tag = jsonml.shift(),
        attributes = {},
        content = [];

    if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) )
      attributes = jsonml.shift();

    while ( jsonml.length )
      content.push( render_tree( jsonml.shift() ) );

    var tag_attrs = "";
    for ( var a in attributes )
      tag_attrs += " " + a + '="' + escapeHTML( attributes[ a ] ) + '"';

    // be careful about adding whitespace here for inline elements
    if ( tag === "img" || tag === "br" || tag === "hr" )
      return "<"+ tag + tag_attrs + "/>";
    else
      return "<"+ tag + tag_attrs + ">" + content.join( "" ) + "</" + tag + ">";
  }

  function convert_tree_to_html( tree, references, options ) {
    var i;
    options = options || {};

    // shallow clone
    var jsonml = tree.slice( 0 );

    if ( typeof options.preprocessTreeNode === "function" )
      jsonml = options.preprocessTreeNode(jsonml, references);

    // Clone attributes if they exist
    var attrs = extract_attr( jsonml );
    if ( attrs ) {
      jsonml[ 1 ] = {};
      for ( i in attrs ) {
        jsonml[ 1 ][ i ] = attrs[ i ];
      }
      attrs = jsonml[ 1 ];
    }

    // basic case
    if ( typeof jsonml === "string" )
      return jsonml;

    // convert this node
    switch ( jsonml[ 0 ] ) {
    case "header":
      jsonml[ 0 ] = "h" + jsonml[ 1 ].level;
      delete jsonml[ 1 ].level;
      break;
    case "bulletlist":
      jsonml[ 0 ] = "ul";
      break;
    case "numberlist":
      jsonml[ 0 ] = "ol";
      break;
    case "listitem":
      jsonml[ 0 ] = "li";
      break;
    case "para":
      jsonml[ 0 ] = "p";
      break;
    case "markdown":
      jsonml[ 0 ] = "html";
      if ( attrs )
        delete attrs.references;
      break;
    case "code_block":
      jsonml[ 0 ] = "pre";
      i = attrs ? 2 : 1;
      var code = [ "code" ];
      code.push.apply( code, jsonml.splice( i, jsonml.length - i ) );
      jsonml[ i ] = code;
      break;
    case "inlinecode":
      jsonml[ 0 ] = "code";
      break;
    case "img":
      jsonml[ 1 ].src = jsonml[ 1 ].href;
      delete jsonml[ 1 ].href;
      break;
    case "linebreak":
      jsonml[ 0 ] = "br";
      break;
    case "link":
      jsonml[ 0 ] = "a";
      break;
    case "link_ref":
      jsonml[ 0 ] = "a";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.href = ref.href;
        if ( ref.title )
          attrs.title = ref.title;

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
    case "img_ref":
      jsonml[ 0 ] = "img";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.src = ref.href;
        if ( ref.title )
          attrs.title = ref.title;

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
    }

    // convert all the children
    i = 1;

    // deal with the attribute node, if it exists
    if ( attrs ) {
      // if there are keys, skip over it
      for ( var key in jsonml[ 1 ] ) {
        i = 2;
        break;
      }
      // if there aren't, remove it
      if ( i === 1 )
        jsonml.splice( i, 1 );
    }

    for ( ; i < jsonml.length; ++i ) {
      jsonml[ i ] = convert_tree_to_html( jsonml[ i ], references, options );
    }

    return jsonml;
  }


  // merges adjacent text nodes into a single node
  function merge_text_nodes( jsonml ) {
    // skip the tag name and attribute hash
    var i = extract_attr( jsonml ) ? 2 : 1;

    while ( i < jsonml.length ) {
      // if it's a string check the next item too
      if ( typeof jsonml[ i ] === "string" ) {
        if ( i + 1 < jsonml.length && typeof jsonml[ i + 1 ] === "string" ) {
          // merge the second string into the first and remove it
          jsonml[ i ] += jsonml.splice( i + 1, 1 )[ 0 ];
        }
        else {
          ++i;
        }
      }
      // if it's not a string recurse
      else {
        merge_text_nodes( jsonml[ i ] );
        ++i;
      }
    }
  };



  var DialectHelpers = {};
  DialectHelpers.inline_until_char = function( text, want ) {
    var consumed = 0,
        nodes = [];

    while ( true ) {
      if ( text.charAt( consumed ) === want ) {
        // Found the character we were looking for
        consumed++;
        return [ consumed, nodes ];
      }

      if ( consumed >= text.length ) {
        // No closing char found. Abort.
        return null;
      }

      var res = this.dialect.inline.__oneElement__.call(this, text.substr( consumed ) );
      consumed += res[ 0 ];
      // Add any returned nodes.
      nodes.push.apply( nodes, res.slice( 1 ) );
    }
  };

  // Helper function to make sub-classing a dialect easier
  DialectHelpers.subclassDialect = function( d ) {
    function Block() {}
    Block.prototype = d.block;
    function Inline() {}
    Inline.prototype = d.inline;

    return { block: new Block(), inline: new Inline() };
  };




  var forEach = MarkdownHelpers.forEach,
      extract_attr = MarkdownHelpers.extract_attr,
      mk_block = MarkdownHelpers.mk_block,
      isEmpty = MarkdownHelpers.isEmpty,
      inline_until_char = DialectHelpers.inline_until_char;

  /**
   * Gruber dialect
   *
   * The default dialect that follows the rules set out by John Gruber's
   * markdown.pl as closely as possible. Well actually we follow the behaviour of
   * that script which in some places is not exactly what the syntax web page
   * says.
   **/
  var Gruber = {
    block: {
      atxHeader: function atxHeader( block, next ) {
        var m = block.match( /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/ );

        if ( !m )
          return undefined;

        var header = [ "header", { level: m[ 1 ].length } ];
        Array.prototype.push.apply(header, this.processInline(m[ 2 ]));

        if ( m[0].length < block.length )
          next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

        return [ header ];
      },

      setextHeader: function setextHeader( block, next ) {
        var m = block.match( /^(.*)\n([-=])\2\2+(?:\n|$)/ );

        if ( !m )
          return undefined;

        var level = ( m[ 2 ] === "=" ) ? 1 : 2,
            header = [ "header", { level : level }, m[ 1 ] ];

        if ( m[0].length < block.length )
          next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

        return [ header ];
      },

      code: function code( block, next ) {
        // |    Foo
        // |bar
        // should be a code block followed by a paragraph. Fun
        //
        // There might also be adjacent code block to merge.

        var ret = [],
            re = /^(?: {0,3}\t| {4})(.*)\n?/;

        // 4 spaces + content
        if ( !block.match( re ) )
          return undefined;

        block_search:
        do {
          // Now pull out the rest of the lines
          var b = this.loop_re_over_block(
                    re, block.valueOf(), function( m ) { ret.push( m[1] ); } );

          if ( b.length ) {
            // Case alluded to in first comment. push it back on as a new block
            next.unshift( mk_block(b, block.trailing) );
            break block_search;
          }
          else if ( next.length ) {
            // Check the next block - it might be code too
            if ( !next[0].match( re ) )
              break block_search;

            // Pull how how many blanks lines follow - minus two to account for .join
            ret.push ( block.trailing.replace(/[^\n]/g, "").substring(2) );

            block = next.shift();
          }
          else {
            break block_search;
          }
        } while ( true );

        return [ [ "code_block", ret.join("\n") ] ];
      },

      horizRule: function horizRule( block, next ) {
        // this needs to find any hr in the block to handle abutting blocks
        var m = block.match( /^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/ );

        if ( !m )
          return undefined;

        var jsonml = [ [ "hr" ] ];

        // if there's a leading abutting block, process it
        if ( m[ 1 ] ) {
          var contained = mk_block( m[ 1 ], "", block.lineNumber );
          jsonml.unshift.apply( jsonml, this.toTree( contained, [] ) );
        }

        // if there's a trailing abutting block, stick it into next
        if ( m[ 3 ] )
          next.unshift( mk_block( m[ 3 ], block.trailing, block.lineNumber + 1 ) );

        return jsonml;
      },

      // There are two types of lists. Tight and loose. Tight lists have no whitespace
      // between the items (and result in text just in the <li>) and loose lists,
      // which have an empty line between list items, resulting in (one or more)
      // paragraphs inside the <li>.
      //
      // There are all sorts weird edge cases about the original markdown.pl's
      // handling of lists:
      //
      // * Nested lists are supposed to be indented by four chars per level. But
      //   if they aren't, you can get a nested list by indenting by less than
      //   four so long as the indent doesn't match an indent of an existing list
      //   item in the 'nest stack'.
      //
      // * The type of the list (bullet or number) is controlled just by the
      //    first item at the indent. Subsequent changes are ignored unless they
      //    are for nested lists
      //
      lists: (function( ) {
        // Use a closure to hide a few variables.
        var any_list = "[*+-]|\\d+\\.",
            bullet_list = /[*+-]/,
            // Capture leading indent as it matters for determining nested lists.
            is_list_re = new RegExp( "^( {0,3})(" + any_list + ")[ \t]+" ),
            indent_re = "(?: {0,3}\\t| {4})";

        // TODO: Cache this regexp for certain depths.
        // Create a regexp suitable for matching an li for a given stack depth
        function regex_for_depth( depth ) {

          return new RegExp(
            // m[1] = indent, m[2] = list_type
            "(?:^(" + indent_re + "{0," + depth + "} {0,3})(" + any_list + ")\\s+)|" +
            // m[3] = cont
            "(^" + indent_re + "{0," + (depth-1) + "}[ ]{0,4})"
          );
        }
        function expand_tab( input ) {
          return input.replace( / {0,3}\t/g, "    " );
        }

        // Add inline content `inline` to `li`. inline comes from processInline
        // so is an array of content
        function add(li, loose, inline, nl) {
          if ( loose ) {
            li.push( [ "para" ].concat(inline) );
            return;
          }
          // Hmmm, should this be any block level element or just paras?
          var add_to = li[li.length -1] instanceof Array && li[li.length - 1][0] === "para"
                     ? li[li.length -1]
                     : li;

          // If there is already some content in this list, add the new line in
          if ( nl && li.length > 1 )
            inline.unshift(nl);

          for ( var i = 0; i < inline.length; i++ ) {
            var what = inline[i],
                is_str = typeof what === "string";
            if ( is_str && add_to.length > 1 && typeof add_to[add_to.length-1] === "string" )
              add_to[ add_to.length-1 ] += what;
            else
              add_to.push( what );
          }
        }

        // contained means have an indent greater than the current one. On
        // *every* line in the block
        function get_contained_blocks( depth, blocks ) {

          var re = new RegExp( "^(" + indent_re + "{" + depth + "}.*?\\n?)*$" ),
              replace = new RegExp("^" + indent_re + "{" + depth + "}", "gm"),
              ret = [];

          while ( blocks.length > 0 ) {
            if ( re.exec( blocks[0] ) ) {
              var b = blocks.shift(),
                  // Now remove that indent
                  x = b.replace( replace, "");

              ret.push( mk_block( x, b.trailing, b.lineNumber ) );
            }
            else
              break;
          }
          return ret;
        }

        // passed to stack.forEach to turn list items up the stack into paras
        function paragraphify(s, i, stack) {
          var list = s.list;
          var last_li = list[list.length-1];

          if ( last_li[1] instanceof Array && last_li[1][0] === "para" )
            return;
          if ( i + 1 === stack.length ) {
            // Last stack frame
            // Keep the same array, but replace the contents
            last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ) );
          }
          else {
            var sublist = last_li.pop();
            last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ), sublist );
          }
        }

        // The matcher function
        return function( block, next ) {
          var m = block.match( is_list_re );
          if ( !m )
            return undefined;

          function make_list( m ) {
            var list = bullet_list.exec( m[2] )
                     ? ["bulletlist"]
                     : ["numberlist"];

            stack.push( { list: list, indent: m[1] } );
            return list;
          }


          var stack = [], // Stack of lists for nesting.
              list = make_list( m ),
              last_li,
              loose = false,
              ret = [ stack[0].list ],
              i;

          // Loop to search over block looking for inner block elements and loose lists
          loose_search:
          while ( true ) {
            // Split into lines preserving new lines at end of line
            var lines = block.split( /(?=\n)/ );

            // We have to grab all lines for a li and call processInline on them
            // once as there are some inline things that can span lines.
            var li_accumulate = "", nl = "";

            // Loop over the lines in this block looking for tight lists.
            tight_search:
            for ( var line_no = 0; line_no < lines.length; line_no++ ) {
              nl = "";
              var l = lines[line_no].replace(/^\n/, function(n) { nl = n; return ""; });


              // TODO: really should cache this
              var line_re = regex_for_depth( stack.length );

              m = l.match( line_re );
              //print( "line:", uneval(l), "\nline match:", uneval(m) );

              // We have a list item
              if ( m[1] !== undefined ) {
                // Process the previous list item, if any
                if ( li_accumulate.length ) {
                  add( last_li, loose, this.processInline( li_accumulate ), nl );
                  // Loose mode will have been dealt with. Reset it
                  loose = false;
                  li_accumulate = "";
                }

                m[1] = expand_tab( m[1] );
                var wanted_depth = Math.floor(m[1].length/4)+1;
                //print( "want:", wanted_depth, "stack:", stack.length);
                if ( wanted_depth > stack.length ) {
                  // Deep enough for a nested list outright
                  //print ( "new nested list" );
                  list = make_list( m );
                  last_li.push( list );
                  last_li = list[1] = [ "listitem" ];
                }
                else {
                  // We aren't deep enough to be strictly a new level. This is
                  // where Md.pl goes nuts. If the indent matches a level in the
                  // stack, put it there, else put it one deeper then the
                  // wanted_depth deserves.
                  var found = false;
                  for ( i = 0; i < stack.length; i++ ) {
                    if ( stack[ i ].indent !== m[1] )
                      continue;

                    list = stack[ i ].list;
                    stack.splice( i+1, stack.length - (i+1) );
                    found = true;
                    break;
                  }

                  if (!found) {
                    //print("not found. l:", uneval(l));
                    wanted_depth++;
                    if ( wanted_depth <= stack.length ) {
                      stack.splice(wanted_depth, stack.length - wanted_depth);
                      //print("Desired depth now", wanted_depth, "stack:", stack.length);
                      list = stack[wanted_depth-1].list;
                      //print("list:", uneval(list) );
                    }
                    else {
                      //print ("made new stack for messy indent");
                      list = make_list(m);
                      last_li.push(list);
                    }
                  }

                  //print( uneval(list), "last", list === stack[stack.length-1].list );
                  last_li = [ "listitem" ];
                  list.push(last_li);
                } // end depth of shenegains
                nl = "";
              }

              // Add content
              if ( l.length > m[0].length )
                li_accumulate += nl + l.substr( m[0].length );
            } // tight_search

            if ( li_accumulate.length ) {
              add( last_li, loose, this.processInline( li_accumulate ), nl );
              // Loose mode will have been dealt with. Reset it
              loose = false;
              li_accumulate = "";
            }

            // Look at the next block - we might have a loose list. Or an extra
            // paragraph for the current li
            var contained = get_contained_blocks( stack.length, next );

            // Deal with code blocks or properly nested lists
            if ( contained.length > 0 ) {
              // Make sure all listitems up the stack are paragraphs
              forEach( stack, paragraphify, this);

              last_li.push.apply( last_li, this.toTree( contained, [] ) );
            }

            var next_block = next[0] && next[0].valueOf() || "";

            if ( next_block.match(is_list_re) || next_block.match( /^ / ) ) {
              block = next.shift();

              // Check for an HR following a list: features/lists/hr_abutting
              var hr = this.dialect.block.horizRule( block, next );

              if ( hr ) {
                ret.push.apply(ret, hr);
                break;
              }

              // Make sure all listitems up the stack are paragraphs
              forEach( stack, paragraphify, this);

              loose = true;
              continue loose_search;
            }
            break;
          } // loose_search

          return ret;
        };
      })(),

      blockquote: function blockquote( block, next ) {
        if ( !block.match( /^>/m ) )
          return undefined;

        var jsonml = [];

        // separate out the leading abutting block, if any. I.e. in this case:
        //
        //  a
        //  > b
        //
        if ( block[ 0 ] !== ">" ) {
          var lines = block.split( /\n/ ),
              prev = [],
              line_no = block.lineNumber;

          // keep shifting lines until you find a crotchet
          while ( lines.length && lines[ 0 ][ 0 ] !== ">" ) {
            prev.push( lines.shift() );
            line_no++;
          }

          var abutting = mk_block( prev.join( "\n" ), "\n", block.lineNumber );
          jsonml.push.apply( jsonml, this.processBlock( abutting, [] ) );
          // reassemble new block of just block quotes!
          block = mk_block( lines.join( "\n" ), block.trailing, line_no );
        }


        // if the next block is also a blockquote merge it in
        while ( next.length && next[ 0 ][ 0 ] === ">" ) {
          var b = next.shift();
          block = mk_block( block + block.trailing + b, b.trailing, block.lineNumber );
        }

        // Strip off the leading "> " and re-process as a block.
        var input = block.replace( /^> ?/gm, "" ),
            old_tree = this.tree,
            processedBlock = this.toTree( input, [ "blockquote" ] ),
            attr = extract_attr( processedBlock );

        // If any link references were found get rid of them
        if ( attr && attr.references ) {
          delete attr.references;
          // And then remove the attribute object if it's empty
          if ( isEmpty( attr ) )
            processedBlock.splice( 1, 1 );
        }

        jsonml.push( processedBlock );
        return jsonml;
      },

      referenceDefn: function referenceDefn( block, next) {
        var re = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
        // interesting matches are [ , ref_id, url, , title, title ]

        if ( !block.match(re) )
          return undefined;

        // make an attribute node if it doesn't exist
        if ( !extract_attr( this.tree ) )
          this.tree.splice( 1, 0, {} );

        var attrs = extract_attr( this.tree );

        // make a references hash if it doesn't exist
        if ( attrs.references === undefined )
          attrs.references = {};

        var b = this.loop_re_over_block(re, block, function( m ) {

          if ( m[2] && m[2][0] === "<" && m[2][m[2].length-1] === ">" )
            m[2] = m[2].substring( 1, m[2].length - 1 );

          var ref = attrs.references[ m[1].toLowerCase() ] = {
            href: m[2]
          };

          if ( m[4] !== undefined )
            ref.title = m[4];
          else if ( m[5] !== undefined )
            ref.title = m[5];

        } );

        if ( b.length )
          next.unshift( mk_block( b, block.trailing ) );

        return [];
      },

      para: function para( block ) {
        // everything's a para!
        return [ ["para"].concat( this.processInline( block ) ) ];
      }
    },

    inline: {

      __oneElement__: function oneElement( text, patterns_or_re, previous_nodes ) {
        var m,
            res;

        patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;
        var re = new RegExp( "([\\s\\S]*?)(" + (patterns_or_re.source || patterns_or_re) + ")" );

        m = re.exec( text );
        if (!m) {
          // Just boring text
          return [ text.length, text ];
        }
        else if ( m[1] ) {
          // Some un-interesting text matched. Return that first
          return [ m[1].length, m[1] ];
        }

        var res;
        if ( m[2] in this.dialect.inline ) {
          res = this.dialect.inline[ m[2] ].call(
                    this,
                    text.substr( m.index ), m, previous_nodes || [] );
        }
        // Default for now to make dev easier. just slurp special and output it.
        res = res || [ m[2].length, m[2] ];
        return res;
      },

      __call__: function inline( text, patterns ) {

        var out = [],
            res;

        function add(x) {
          //D:self.debug("  adding output", uneval(x));
          if ( typeof x === "string" && typeof out[out.length-1] === "string" )
            out[ out.length-1 ] += x;
          else
            out.push(x);
        }

        while ( text.length > 0 ) {
          res = this.dialect.inline.__oneElement__.call(this, text, patterns, out );
          text = text.substr( res.shift() );
          forEach(res, add );
        }

        return out;
      },

      // These characters are intersting elsewhere, so have rules for them so that
      // chunks of plain text blocks don't include them
      "]": function () {},
      "}": function () {},

      __escape__ : /^\\[\\`\*_{}\[\]()#\+.!\-]/,

      "\\": function escaped( text ) {
        // [ length of input processed, node/children to add... ]
        // Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
        if ( this.dialect.inline.__escape__.exec( text ) )
          return [ 2, text.charAt( 1 ) ];
        else
          // Not an esacpe
          return [ 1, "\\" ];
      },

      "![": function image( text ) {

        // Unlike images, alt text is plain text only. no other elements are
        // allowed in there

        // ![Alt text](/path/to/img.jpg "Optional title")
        //      1          2            3       4         <--- captures
        var m = text.match( /^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/ );

        if ( m ) {
          if ( m[2] && m[2][0] === "<" && m[2][m[2].length-1] === ">" )
            m[2] = m[2].substring( 1, m[2].length - 1 );

          m[2] = this.dialect.inline.__call__.call( this, m[2], /\\/ )[0];

          var attrs = { alt: m[1], href: m[2] || "" };
          if ( m[4] !== undefined)
            attrs.title = m[4];

          return [ m[0].length, [ "img", attrs ] ];
        }

        // ![Alt text][id]
        m = text.match( /^!\[(.*?)\][ \t]*\[(.*?)\]/ );

        if ( m ) {
          // We can't check if the reference is known here as it likely wont be
          // found till after. Check it in md tree->hmtl tree conversion
          return [ m[0].length, [ "img_ref", { alt: m[1], ref: m[2].toLowerCase(), original: m[0] } ] ];
        }

        // Just consume the '!['
        return [ 2, "![" ];
      },

      "[": function link( text ) {

        var orig = String(text);
        // Inline content is possible inside `link text`
        var res = inline_until_char.call( this, text.substr(1), "]" );

        // No closing ']' found. Just consume the [
        if ( !res )
          return [ 1, "[" ];

        var consumed = 1 + res[ 0 ],
            children = res[ 1 ],
            link,
            attrs;

        // At this point the first [...] has been parsed. See what follows to find
        // out which kind of link we are (reference or direct url)
        text = text.substr( consumed );

        // [link text](/path/to/img.jpg "Optional title")
        //                 1            2       3         <--- captures
        // This will capture up to the last paren in the block. We then pull
        // back based on if there a matching ones in the url
        //    ([here](/url/(test))
        // The parens have to be balanced
        var m = text.match( /^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/ );
        if ( m ) {
          var url = m[1];
          consumed += m[0].length;

          if ( url && url[0] === "<" && url[url.length-1] === ">" )
            url = url.substring( 1, url.length - 1 );

          // If there is a title we don't have to worry about parens in the url
          if ( !m[3] ) {
            var open_parens = 1; // One open that isn't in the capture
            for ( var len = 0; len < url.length; len++ ) {
              switch ( url[len] ) {
              case "(":
                open_parens++;
                break;
              case ")":
                if ( --open_parens === 0) {
                  consumed -= url.length - len;
                  url = url.substring(0, len);
                }
                break;
              }
            }
          }

          // Process escapes only
          url = this.dialect.inline.__call__.call( this, url, /\\/ )[0];

          attrs = { href: url || "" };
          if ( m[3] !== undefined)
            attrs.title = m[3];

          link = [ "link", attrs ].concat( children );
          return [ consumed, link ];
        }

        // [Alt text][id]
        // [Alt text] [id]
        m = text.match( /^\s*\[(.*?)\]/ );

        if ( m ) {

          consumed += m[ 0 ].length;

          // [links][] uses links as its reference
          attrs = { ref: ( m[ 1 ] || String(children) ).toLowerCase(),  original: orig.substr( 0, consumed ) };

          link = [ "link_ref", attrs ].concat( children );

          // We can't check if the reference is known here as it likely wont be
          // found till after. Check it in md tree->hmtl tree conversion.
          // Store the original so that conversion can revert if the ref isn't found.
          return [ consumed, link ];
        }

        // [id]
        // Only if id is plain (no formatting.)
        if ( children.length === 1 && typeof children[0] === "string" ) {

          attrs = { ref: children[0].toLowerCase(),  original: orig.substr( 0, consumed ) };
          link = [ "link_ref", attrs, children[0] ];
          return [ consumed, link ];
        }

        // Just consume the "["
        return [ 1, "[" ];
      },


      "<": function autoLink( text ) {
        var m;

        if ( ( m = text.match( /^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/ ) ) !== null ) {
          if ( m[3] )
            return [ m[0].length, [ "link", { href: "mailto:" + m[3] }, m[3] ] ];
          else if ( m[2] === "mailto" )
            return [ m[0].length, [ "link", { href: m[1] }, m[1].substr("mailto:".length ) ] ];
          else
            return [ m[0].length, [ "link", { href: m[1] }, m[1] ] ];
        }

        return [ 1, "<" ];
      },

      "`": function inlineCode( text ) {
        // Inline code block. as many backticks as you like to start it
        // Always skip over the opening ticks.
        var m = text.match( /(`+)(([\s\S]*?)\1)/ );

        if ( m && m[2] )
          return [ m[1].length + m[2].length, [ "inlinecode", m[3] ] ];
        else {
          // TODO: No matching end code found - warn!
          return [ 1, "`" ];
        }
      },

      "  \n": function lineBreak() {
        return [ 3, [ "linebreak" ] ];
      }

    }
  };

  // Meta Helper/generator method for em and strong handling
  function strong_em( tag, md ) {

    var state_slot = tag + "_state",
        other_slot = tag === "strong" ? "em_state" : "strong_state";

    function CloseTag(len) {
      this.len_after = len;
      this.name = "close_" + md;
    }

    return function ( text ) {

      if ( this[state_slot][0] === md ) {
        // Most recent em is of this type
        //D:this.debug("closing", md);
        this[state_slot].shift();

        // "Consume" everything to go back to the recrusion in the else-block below
        return[ text.length, new CloseTag(text.length-md.length) ];
      }
      else {
        // Store a clone of the em/strong states
        var other = this[other_slot].slice(),
            state = this[state_slot].slice();

        this[state_slot].unshift(md);

        //D:this.debug_indent += "  ";

        // Recurse
        var res = this.processInline( text.substr( md.length ) );
        //D:this.debug_indent = this.debug_indent.substr(2);

        var last = res[res.length - 1];

        //D:this.debug("processInline from", tag + ": ", uneval( res ) );

        var check = this[state_slot].shift();
        if ( last instanceof CloseTag ) {
          res.pop();
          // We matched! Huzzah.
          var consumed = text.length - last.len_after;
          return [ consumed, [ tag ].concat(res) ];
        }
        else {
          // Restore the state of the other kind. We might have mistakenly closed it.
          this[other_slot] = other;
          this[state_slot] = state;

          // We can't reuse the processed result as it could have wrong parsing contexts in it.
          return [ md.length, md ];
        }
      }
    }; // End returned function
  }

  Gruber.inline["**"] = strong_em("strong", "**");
  Gruber.inline["__"] = strong_em("strong", "__");
  Gruber.inline["*"]  = strong_em("em", "*");
  Gruber.inline["_"]  = strong_em("em", "_");

  Markdown.dialects.Gruber = Gruber;
  Markdown.buildBlockOrder ( Markdown.dialects.Gruber.block );
  Markdown.buildInlinePatterns( Markdown.dialects.Gruber.inline );



  var Maruku = DialectHelpers.subclassDialect( Gruber ),
      extract_attr = MarkdownHelpers.extract_attr,
      forEach = MarkdownHelpers.forEach;

  Maruku.processMetaHash = function processMetaHash( meta_string ) {
    var meta = split_meta_hash( meta_string ),
        attr = {};

    for ( var i = 0; i < meta.length; ++i ) {
      // id: #foo
      if ( /^#/.test( meta[ i ] ) )
        attr.id = meta[ i ].substring( 1 );
      // class: .foo
      else if ( /^\./.test( meta[ i ] ) ) {
        // if class already exists, append the new one
        if ( attr["class"] )
          attr["class"] = attr["class"] + meta[ i ].replace( /./, " " );
        else
          attr["class"] = meta[ i ].substring( 1 );
      }
      // attribute: foo=bar
      else if ( /\=/.test( meta[ i ] ) ) {
        var s = meta[ i ].split( /\=/ );
        attr[ s[ 0 ] ] = s[ 1 ];
      }
    }

    return attr;
  };

  function split_meta_hash( meta_string ) {
    var meta = meta_string.split( "" ),
        parts = [ "" ],
        in_quotes = false;

    while ( meta.length ) {
      var letter = meta.shift();
      switch ( letter ) {
      case " " :
        // if we're in a quoted section, keep it
        if ( in_quotes )
          parts[ parts.length - 1 ] += letter;
        // otherwise make a new part
        else
          parts.push( "" );
        break;
      case "'" :
      case '"' :
        // reverse the quotes and move straight on
        in_quotes = !in_quotes;
        break;
      case "\\" :
        // shift off the next letter to be used straight away.
        // it was escaped so we'll keep it whatever it is
        letter = meta.shift();
        /* falls through */
      default :
        parts[ parts.length - 1 ] += letter;
        break;
      }
    }

    return parts;
  }

  Maruku.block.document_meta = function document_meta( block ) {
    // we're only interested in the first block
    if ( block.lineNumber > 1 )
      return undefined;

    // document_meta blocks consist of one or more lines of `Key: Value\n`
    if ( ! block.match( /^(?:\w+:.*\n)*\w+:.*$/ ) )
      return undefined;

    // make an attribute node if it doesn't exist
    if ( !extract_attr( this.tree ) )
      this.tree.splice( 1, 0, {} );

    var pairs = block.split( /\n/ );
    for ( var p in pairs ) {
      var m = pairs[ p ].match( /(\w+):\s*(.*)$/ ),
          key = m[ 1 ].toLowerCase(),
          value = m[ 2 ];

      this.tree[ 1 ][ key ] = value;
    }

    // document_meta produces no content!
    return [];
  };

  Maruku.block.block_meta = function block_meta( block ) {
    // check if the last line of the block is an meta hash
    var m = block.match( /(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/ );
    if ( !m )
      return undefined;

    // process the meta hash
    var attr = this.dialect.processMetaHash( m[ 2 ] ),
        hash;

    // if we matched ^ then we need to apply meta to the previous block
    if ( m[ 1 ] === "" ) {
      var node = this.tree[ this.tree.length - 1 ];
      hash = extract_attr( node );

      // if the node is a string (rather than JsonML), bail
      if ( typeof node === "string" )
        return undefined;

      // create the attribute hash if it doesn't exist
      if ( !hash ) {
        hash = {};
        node.splice( 1, 0, hash );
      }

      // add the attributes in
      for ( var a in attr )
        hash[ a ] = attr[ a ];

      // return nothing so the meta hash is removed
      return [];
    }

    // pull the meta hash off the block and process what's left
    var b = block.replace( /\n.*$/, "" ),
        result = this.processBlock( b, [] );

    // get or make the attributes hash
    hash = extract_attr( result[ 0 ] );
    if ( !hash ) {
      hash = {};
      result[ 0 ].splice( 1, 0, hash );
    }

    // attach the attributes to the block
    for ( var a in attr )
      hash[ a ] = attr[ a ];

    return result;
  };

  Maruku.block.definition_list = function definition_list( block, next ) {
    // one or more terms followed by one or more definitions, in a single block
    var tight = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
        list = [ "dl" ],
        i, m;

    // see if we're dealing with a tight or loose block
    if ( ( m = block.match( tight ) ) ) {
      // pull subsequent tight DL blocks out of `next`
      var blocks = [ block ];
      while ( next.length && tight.exec( next[ 0 ] ) )
        blocks.push( next.shift() );

      for ( var b = 0; b < blocks.length; ++b ) {
        var m = blocks[ b ].match( tight ),
            terms = m[ 1 ].replace( /\n$/, "" ).split( /\n/ ),
            defns = m[ 2 ].split( /\n:\s+/ );

        // print( uneval( m ) );

        for ( i = 0; i < terms.length; ++i )
          list.push( [ "dt", terms[ i ] ] );

        for ( i = 0; i < defns.length; ++i ) {
          // run inline processing over the definition
          list.push( [ "dd" ].concat( this.processInline( defns[ i ].replace( /(\n)\s+/, "$1" ) ) ) );
        }
      }
    }
    else {
      return undefined;
    }

    return [ list ];
  };

  // splits on unescaped instances of @ch. If @ch is not a character the result
  // can be unpredictable

  Maruku.block.table = function table ( block ) {

    var _split_on_unescaped = function( s, ch ) {
      ch = ch || '\\s';
      if ( ch.match(/^[\\|\[\]{}?*.+^$]$/) )
        ch = '\\' + ch;
      var res = [ ],
          r = new RegExp('^((?:\\\\.|[^\\\\' + ch + '])*)' + ch + '(.*)'),
          m;
      while ( ( m = s.match( r ) ) ) {
        res.push( m[1] );
        s = m[2];
      }
      res.push(s);
      return res;
    };

    var leading_pipe = /^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,
        // find at least an unescaped pipe in each line
        no_leading_pipe = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/,
        i,
        m;
    if ( ( m = block.match( leading_pipe ) ) ) {
      // remove leading pipes in contents
      // (header and horizontal rule already have the leading pipe left out)
      m[3] = m[3].replace(/^\s*\|/gm, '');
    } else if ( ! ( m = block.match( no_leading_pipe ) ) ) {
      return undefined;
    }

    var table = [ "table", [ "thead", [ "tr" ] ], [ "tbody" ] ];

    // remove trailing pipes, then split on pipes
    // (no escaped pipes are allowed in horizontal rule)
    m[2] = m[2].replace(/\|\s*$/, '').split('|');

    // process alignment
    var html_attrs = [ ];
    forEach (m[2], function (s) {
      if (s.match(/^\s*-+:\s*$/))
        html_attrs.push({align: "right"});
      else if (s.match(/^\s*:-+\s*$/))
        html_attrs.push({align: "left"});
      else if (s.match(/^\s*:-+:\s*$/))
        html_attrs.push({align: "center"});
      else
        html_attrs.push({});
    });

    // now for the header, avoid escaped pipes
    m[1] = _split_on_unescaped(m[1].replace(/\|\s*$/, ''), '|');
    for (i = 0; i < m[1].length; i++) {
      table[1][1].push(['th', html_attrs[i] || {}].concat(
        this.processInline(m[1][i].trim())));
    }

    // now for body contents
    forEach (m[3].replace(/\|\s*$/mg, '').split('\n'), function (row) {
      var html_row = ['tr'];
      row = _split_on_unescaped(row, '|');
      for (i = 0; i < row.length; i++)
        html_row.push(['td', html_attrs[i] || {}].concat(this.processInline(row[i].trim())));
      table[2].push(html_row);
    }, this);

    return [table];
  };

  Maruku.inline[ "{:" ] = function inline_meta( text, matches, out ) {
    if ( !out.length )
      return [ 2, "{:" ];

    // get the preceeding element
    var before = out[ out.length - 1 ];

    if ( typeof before === "string" )
      return [ 2, "{:" ];

    // match a meta hash
    var m = text.match( /^\{:\s*((?:\\\}|[^\}])*)\s*\}/ );

    // no match, false alarm
    if ( !m )
      return [ 2, "{:" ];

    // attach the attributes to the preceeding element
    var meta = this.dialect.processMetaHash( m[ 1 ] ),
        attr = extract_attr( before );

    if ( !attr ) {
      attr = {};
      before.splice( 1, 0, attr );
    }

    for ( var k in meta )
      attr[ k ] = meta[ k ];

    // cut out the string and replace it with nothing
    return [ m[ 0 ].length, "" ];
  };


  Markdown.dialects.Maruku = Maruku;
  Markdown.dialects.Maruku.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/;
  Markdown.buildBlockOrder ( Markdown.dialects.Maruku.block );
  Markdown.buildInlinePatterns( Markdown.dialects.Maruku.inline );


// Include all our depndencies and;
  expose.Markdown = Markdown;
  expose.parse = Markdown.parse;
  expose.toHTML = Markdown.toHTML;
  expose.toHTMLTree = Markdown.toHTMLTree;
  expose.renderJsonML = Markdown.renderJsonML;

})(function() {
  window.markdown = {};
  return window.markdown;
}());
/*!
 * Modernizr v2.7.1
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */

window.Modernizr = (function( window, document, undefined ) {

    var version = '2.7.1',

    Modernizr = {},

    /*>>cssclasses*/
    // option for enabling the HTML classes to be added
    enableClasses = true,
    /*>>cssclasses*/

    docElement = document.documentElement,

    /**
     * Create our "modernizr" element that we do most feature tests on.
     */
    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    /**
     * Create the input element for various Web Forms feature tests.
     */
    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,

    /*>>smile*/
    smile = ':)',
    /*>>smile*/

    toString = {}.toString,

    // TODO :: make the prefixes more granular
    /*>>prefixes*/
    // List of property values to set for css tests. See ticket #21
    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    /*>>prefixes*/

    /*>>domprefixes*/
    // Following spec is to expose vendor-specific style properties as:
    //   elem.style.WebkitBorderRadius
    // and the following would be incorrect:
    //   elem.style.webkitBorderRadius

    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
    //   erik.eae.net/archives/2008/03/10/21.48.10/

    // More here: github.com/Modernizr/Modernizr/issues/issue/21
    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),
    /*>>domprefixes*/

    /*>>ns*/
    ns = {'svg': 'http://www.w3.org/2000/svg'},
    /*>>ns*/

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, // used in testing loop


    /*>>teststyles*/
    // Inject element with style element and some CSS rules
    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
          // After page load injecting a fake body doesn't work so check if body exists
          body = document.body,
          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
          fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
          // In order not to give false positives we create a node for each test
          // This also allows the method to scale for unspecified uses
          while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
          //avoid crashing IE8, if background image is used
          fakeBody.style.background = '';
          //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
      // If this is done after page load we don't want to remove the body so check if body exists
      if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    /*>>teststyles*/

    /*>>mq*/
    // adapted from matchMedia polyfill
    // by Scott Jehl and Paul Irish
    // gist.github.com/786768
    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq).matches;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
     /*>>mq*/


    /*>>hasevent*/
    //
    // isEventSupported determines if a given element supports the given event
    // kangax.github.com/iseventsupported/
    //
    // The following results are known incorrects:
    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
    //   ...
    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if ( !isSupported ) {
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
          if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

            // If property was created, "remove it" (by setting value to `undefined`)
            if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),
    /*>>hasevent*/

    // TODO :: Add flag for hasownprop ? didn't last time

    // hasOwnProperty shim by kangax needed for Safari 2.0 support
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }

    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
    // es5.github.com/#x15.3.4.5

    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    /**
     * setCss applies given styles to the Modernizr DOM node.
     */
    function setCss( str ) {
        mStyle.cssText = str;
    }

    /**
     * setCssAll extrapolates all vendor-specific css strings.
     */
    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    /**
     * is returns a boolean for if typeof obj is exactly type.
     */
    function is( obj, type ) {
        return typeof obj === type;
    }

    /**
     * contains returns a boolean for if substr is found within str.
     */
    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    /*>>testprop*/

    // testProps is a generic CSS / DOM property test.

    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.

    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.

    // Because the testing of the CSS property names (with "-", as
    // opposed to the camelCase DOM properties) is non-portable and
    // non-standard but works in WebKit and IE (but not Gecko or Opera),
    // we explicitly reject properties with dashes so that authors
    // developing in WebKit or IE first don't end up with
    // browser-specific content by accident.

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
    /*>>testprop*/

    // TODO :: add testDOMProps
    /**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     */
    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                // return the property name as a string
                if (elem === false) return props[i];

                // let's bind a function
                if (is(item, 'function')){
                  // default to autobind unless override
                  return item.bind(elem || obj);
                }

                // return the unbound function or obj or value
                return item;
            }
        }
        return false;
    }

    /*>>testallprops*/
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *   We specify literally ALL possible (known and/or likely) properties on
     *   the element including the non-vendor prefixed one, for forward-
     *   compatibility.
     */
    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }
    /*>>testallprops*/


    /**
     * Tests
     * -----
     */

    // The *new* flexbox
    // dev.w3.org/csswg/css3-flexbox

    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };

    // The *old* flexbox
    // www.w3.org/TR/2009/WD-css3-flexbox-20090723/

    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    };

    // On the S60 and BB Storm, getContext exists, but always returns undefined
    // so we actually have to call getContext() to verify
    // github.com/Modernizr/Modernizr/issues/issue/97/

    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };

    // webk.it/70117 is tracking a legit WebGL feature detect proposal

    // We do a soft detect which may false positive in order to avoid
    // an expensive context creation: bugzil.la/732441

    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };

    /*
     * The Modernizr.touch test only indicates if the browser supports
     *    touch events, which does not necessarily reflect a touchscreen
     *    device, as evidenced by tablets running Windows 7 or, alas,
     *    the Palm Pre / WebOS (touch) phones.
     *
     * Additionally, Chrome (desktop) used to lie about its support on this,
     *    but that has since been rectified: crbug.com/36415
     *
     * We also test for Firefox 4 Multitouch Support.
     *
     * For more info, see: modernizr.github.com/Modernizr/touch.html
     */

    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };


    // geolocation is often considered a trivial feature detect...
    // Turns out, it's quite tricky to get right:
    //
    // Using !!navigator.geolocation does two things we don't want. It:
    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
    //   2. Disables page caching in WebKit: webk.it/43956
    //
    // Meanwhile, in Firefox < 8, an about:config setting could expose
    // a false positive that would throw an exception: bugzil.la/688158

    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    // Chrome incognito mode used to throw an exception when using openDatabase
    // It doesn't anymore.
    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    // Vendors had inconsistent prefixing with the experimental Indexed DB:
    // - Webkit's implementation is accessible through webkitIndexedDB
    // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
    // For speed, we don't test the legacy (and beta-only) indexedDB
    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB", window);
    };

    // documentMode logic from YUI to filter out IE8 Compat Mode
    //   which false positives.
    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    // Per 1.6:
    // This used to be Modernizr.historymanagement but the longer
    // name has been deprecated in favor of a shorter and property-matching one.
    // The old API is still available in 1.6, but as of 2.0 will throw a warning,
    // and in the first release thereafter disappear entirely.
    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    // FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF10
    // will be supported until FF19 (2/12/13), at which time, ESR becomes FF17.
    // FF10 still uses prefixes, so check for it until then.
    // for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq/
    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    // css-tricks.com/rgba-browser-support/
    tests['rgba'] = function() {
        // Set an rgba() color and check the returned value

        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
        //   except IE9 who retains it as hsla

        setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
        // Setting multiple images AND a color on the background shorthand property
        //  and then querying the style.background property value for the number of
        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

        setCss('background:url(https://),url(https://),red url(https://)');

        // If the UA supports multiple backgrounds, there should be three occurrences
        //   of the string "url(" in the return value for elemStyle.background

        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };



    // this will false positive in Opera Mini
    //   github.com/Modernizr/Modernizr/issues/396

    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };


    // Super comprehensive table about all the unique implementations of
    // border-radius: muddledramblings.com/table-of-css3-border-radius-compliance

    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    // WebOS unfortunately false positives on this test.
    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    // FF3.0 will false positive on this test
    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
        // Browsers that actually have CSS Opacity implemented have done so
        //  according to spec, which means their return values are within the
        //  range of [0.0,1.0] - including the leading zero.

        setCssAll('opacity:.55');

        // The non-literal . in this regex is intentional:
        //   German Chrome returns this value as 0,55
        // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
        return (/^0.55$/).test(mStyle.opacity);
    };


    // Note, Android < 4 will pass this test, but can only animate
    //   a single property at a time
    //   daneden.me/2011/12/putting-up-with-androids-bullshit/
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        /**
         * For CSS Gradients syntax, please see:
         * webkit.org/blog/175/introducing-css-gradients/
         * developer.mozilla.org/en/CSS/-moz-linear-gradient
         * developer.mozilla.org/en/CSS/-moz-radial-gradient
         * dev.w3.org/csswg/css3-images/#gradients-
         */

        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
             // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
              (str1 + '-webkit- '.split(' ').join(str2 + str1) +
             // standard syntax             // trailing 'background-image:'
              prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

        // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
        //   some conditions. As a result, Webkit typically recognizes the syntax but
        //   will sometimes throw a false positive, thus we must do a more thorough check:
        if ( ret && 'webkitPerspective' in docElement.style ) {

          // Webkit allows this media query to succeed only if the feature is enabled.
          // `@media (transform-3d),(-webkit-transform-3d){ ... }`
          injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };


    /*>>fontface*/
    // @font-face detection routine by Diego Perini
    // javascript.nwbox.com/CSSSupport/

    // false positives:
    //   WebOS github.com/Modernizr/Modernizr/issues/342
    //   WP7   github.com/Modernizr/Modernizr/issues/538
    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };
    /*>>fontface*/

    // CSS generated content detection
    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
          bool = node.offsetHeight >= 3;
        });

        return bool;
    };



    // These tests evaluate support of the video/audio elements, as well as
    // testing what types of content they support.
    //
    // We're using the Boolean constructor here, so that we can extend the value
    // e.g.  Modernizr.video     // true
    //       Modernizr.video.ogg // 'probably'
    //
    // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
    //                     thx to NielsLeenheer and zcorpan

    // Note: in some older browsers, "no" was a return value instead of empty string.
    //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
    //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    // In FF4, if disabled, window.localStorage should === null.

    // Normally, we could not test that directly and need to do a
    //   `('localStorage' in window) && ` test first because otherwise Firefox will
    //   throw bugzil.la/365772 if cookies are disabled

    // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
    // will throw the exception:
    //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
    // Peculiarly, getItem and removeItem calls do not throw.

    // Because we are forced to try/catch this, we'll go aggressive.

    // Just FWIW: IE8 Compat mode supports these features completely:
    //   www.quirksmode.org/dom/html5.html
    // But IE8 doesn't support either with local files

    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    // Thanks to Erik Dahlstrom
    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    // specifically for SVG inline in HTML, not within XHTML
    // test page: paulirish.com/demo/inline-svg
    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    // SVG SMIL animation
    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };

    // This test is only for clip paths in SVG proper, not clip paths on HTML content
    // demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg

    // However read the comments to dig into applying SVG clippaths to HTML content here:
    //   github.com/Modernizr/Modernizr/issues/213#issuecomment-1149491
    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    /*>>webforms*/
    // input features and input types go directly onto the ret object, bypassing the tests loop.
    // Hold this guy to execute in a moment.
    function webforms() {
        /*>>input*/
        // Run through HTML5's new input attributes to see if the UA understands any.
        // We're using f which is the <input> element created early on
        // Mike Taylr has created a comprehensive resource for testing these attributes
        //   when applied to all input types:
        //   miketaylr.com/code/input-type-attr.html
        // spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary

        // Only input placeholder is tested while textarea's placeholder is not.
        // Currently Safari 4 and Opera 11 have support only for the input placeholder
        // Both tests are available in feature-detects/forms-placeholder.js
        Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
              // safari false positive's on datalist: webk.it/74252
              // see also github.com/Modernizr/Modernizr/issues/146
              attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        /*>>input*/

        /*>>inputtypes*/
        // Run through HTML5's new input types to see if the UA understands any.
        //   This is put behind the tests runloop because it doesn't return a
        //   true/false like all the other tests; instead, it returns an object
        //   containing each input type with its corresponding true/false value

        // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
        Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                // We first check to see if the type we give it sticks..
                // If the type does, we feed it a textual value, which shouldn't be valid.
                // If the value doesn't stick, we know there's input sanitization which infers a custom UI
                if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                      // Safari 2-4 allows the smiley as a value, despite making a slider
                      bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                              // Mobile android web browser has false positive, so must
                              // check the height to see if the widget is actually there.
                              (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                      // Spec doesn't define any special parsing or detectable UI
                      //   behaviors so we pass these through as true

                      // Interestingly, opera fails the earlier test, so it doesn't
                      //  even make it here.

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      // Real url and email support comes with prebaked validation.
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                      // If the upgraded input compontent rejects the :) text, we got a winner
                      bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        /*>>inputtypes*/
    }
    /*>>webforms*/


    // End of test definitions
    // -----------------------



    // Run through all tests and detect their support in the current UA.
    // todo: hypothetically we could be doing an array of tests and use a basic loop here.
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
            // run the test, throw the return value into the Modernizr,
            //   then based on that boolean, define an appropriate className
            //   and push it into an array of classes we'll join later.
            featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    /*>>webforms*/
    // input tests need to run.
    Modernizr.input || webforms();
    /*>>webforms*/


    /**
     * addTest allows the user to define their own feature tests
     * the result will be added onto the Modernizr object,
     * as well as an appropriate className set on the html element
     *
     * @param feature - String naming the feature
     * @param test - Function returning true if feature is supported, false if not
     */
     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
           // we're going to quit if you're trying to overwrite an existing test
           // if we were to allow it, we'd do this:
           //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
           //   docElement.className = docElement.className.replace( re, '' );
           // but, no rly, stuff 'em.
           return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; // allow chaining.
     };


    // Reset modElem.cssText to nothing to reduce memory footprint.
    setCss('');
    modElem = inputElem = null;

    /*>>shiv*/
    /**
     * @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
    ;(function(window, document) {
        /*jshint evil:true */
        /** version */
        var version = '3.7.0';

        /** Preset options */
        var options = window.html5 || {};

        /** Used to skip problem elements */
        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        /** Not all elements can be cloned in IE **/
        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        /** Detect whether the browser supports default html5 styles */
        var supportsHtml5Styles;

        /** Name of the expando, to work with multiple documents or to re-shiv one document */
        var expando = '_html5shiv';

        /** The id for the the documents expando */
        var expanID = 0;

        /** Cached data for each document */
        var expandoData = {};

        /** Detect whether the browser supports unknown elements */
        var supportsUnknownElements;

        (function() {
          try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
            //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
            supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
              // assign a false positive if unable to shiv
              (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
          } catch(e) {
            // assign a false positive if detection fails => unable to shiv
            supportsHtml5Styles = true;
            supportsUnknownElements = true;
          }

        }());

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a style sheet with the given CSS text and adds it to the document.
         * @private
         * @param {Document} ownerDocument The document.
         * @param {String} cssText The CSS text.
         * @returns {StyleSheet} The style element.
         */
        function addStyleSheet(ownerDocument, cssText) {
          var p = ownerDocument.createElement('p'),
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

          p.innerHTML = 'x<style>' + cssText + '</style>';
          return parent.insertBefore(p.lastChild, parent.firstChild);
        }

        /**
         * Returns the value of `html5.elements` as an array.
         * @private
         * @returns {Array} An array of shived element node names.
         */
        function getElements() {
          var elements = html5.elements;
          return typeof elements == 'string' ? elements.split(' ') : elements;
        }

        /**
         * Returns the data associated to the given document
         * @private
         * @param {Document} ownerDocument The document.
         * @returns {Object} An object of data.
         */
        function getExpandoData(ownerDocument) {
          var data = expandoData[ownerDocument[expando]];
          if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
          }
          return data;
        }

        /**
         * returns a shived element for the given nodeName and document
         * @memberOf html5
         * @param {String} nodeName name of the element
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived element.
         */
        function createElement(nodeName, ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
          }
          if (!data) {
            data = getExpandoData(ownerDocument);
          }
          var node;

          if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
          } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
          } else {
            node = data.createElem(nodeName);
          }

          // Avoid adding some elements to fragments in IE < 9 because
          // * Attributes like `name` or `type` cannot be set/changed once an element
          //   is inserted into a document/fragment
          // * Link elements with `src` attributes that are inaccessible, as with
          //   a 403 response, will cause the tab/window to crash
          // * Script elements appended to fragments will execute when their `src`
          //   or `text` property is set
          return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

        /**
         * returns a shived DocumentFragment for the given document
         * @memberOf html5
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived DocumentFragment.
         */
        function createDocumentFragment(ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
          }
          data = data || getExpandoData(ownerDocument);
          var clone = data.frag.cloneNode(),
          i = 0,
          elems = getElements(),
          l = elems.length;
          for(;i<l;i++){
            clone.createElement(elems[i]);
          }
          return clone;
        }

        /**
         * Shivs the `createElement` and `createDocumentFragment` methods of the document.
         * @private
         * @param {Document|DocumentFragment} ownerDocument The document.
         * @param {Object} data of the document.
         */
        function shivMethods(ownerDocument, data) {
          if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
          }


          ownerDocument.createElement = function(nodeName) {
            //abort shiv
            if (!html5.shivMethods) {
              return data.createElem(nodeName);
            }
            return createElement(nodeName, ownerDocument, data);
          };

          ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                                                          'var n=f.cloneNode(),c=n.createElement;' +
                                                          'h.shivMethods&&(' +
                                                          // unroll the `createElement` calls
                                                          getElements().join().replace(/[\w\-]+/g, function(nodeName) {
            data.createElem(nodeName);
            data.frag.createElement(nodeName);
            return 'c("' + nodeName + '")';
          }) +
            ');return n}'
                                                         )(html5, data.frag);
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Shivs the given document.
         * @memberOf html5
         * @param {Document} ownerDocument The document to shiv.
         * @returns {Document} The shived document.
         */
        function shivDocument(ownerDocument) {
          if (!ownerDocument) {
            ownerDocument = document;
          }
          var data = getExpandoData(ownerDocument);

          if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
            data.hasCSS = !!addStyleSheet(ownerDocument,
                                          // corrects block display not defined in IE6/7/8/9
                                          'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                                            // adds styling not present in IE6/7/8/9
                                            'mark{background:#FF0;color:#000}' +
                                            // hides non-rendered elements
                                            'template{display:none}'
                                         );
          }
          if (!supportsUnknownElements) {
            shivMethods(ownerDocument, data);
          }
          return ownerDocument;
        }

        /*--------------------------------------------------------------------------*/

        /**
         * The `html5` object is exposed so that more elements can be shived and
         * existing shiving can be detected on iframes.
         * @type Object
         * @example
         *
         * // options can be changed before the script is included
         * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
         */
        var html5 = {

          /**
           * An array or space separated string of node names of the elements to shiv.
           * @memberOf html5
           * @type Array|String
           */
          'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

          /**
           * current version of html5shiv
           */
          'version': version,

          /**
           * A flag to indicate that the HTML5 style sheet should be inserted.
           * @memberOf html5
           * @type Boolean
           */
          'shivCSS': (options.shivCSS !== false),

          /**
           * Is equal to true if a browser supports creating unknown/HTML5 elements
           * @memberOf html5
           * @type boolean
           */
          'supportsUnknownElements': supportsUnknownElements,

          /**
           * A flag to indicate that the document's `createElement` and `createDocumentFragment`
           * methods should be overwritten.
           * @memberOf html5
           * @type Boolean
           */
          'shivMethods': (options.shivMethods !== false),

          /**
           * A string to describe the type of `html5` object ("default" or "default print").
           * @memberOf html5
           * @type String
           */
          'type': 'default',

          // shivs the document according to the specified `html5` object options
          'shivDocument': shivDocument,

          //creates a shived element
          createElement: createElement,

          //creates a shived documentFragment
          createDocumentFragment: createDocumentFragment
        };

        /*--------------------------------------------------------------------------*/

        // expose html5
        window.html5 = html5;

        // shiv the document
        shivDocument(document);

    }(this, document));
    /*>>shiv*/

    // Assign private properties to the return object with prefix
    Modernizr._version      = version;

    // expose these for the plugin API. Look in the source for how to join() them against your input
    /*>>prefixes*/
    Modernizr._prefixes     = prefixes;
    /*>>prefixes*/
    /*>>domprefixes*/
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;
    /*>>domprefixes*/

    /*>>mq*/
    // Modernizr.mq tests a given media query, live against the current state of the window
    // A few important notes:
    //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
    //   * A max-width or orientation query will be evaluated against the current state, which may change later.
    //   * You must specify values. Eg. If you are testing support for the min-width media query use:
    //       Modernizr.mq('(min-width:0)')
    // usage:
    // Modernizr.mq('only screen and (max-width:768)')
    Modernizr.mq            = testMediaQuery;
    /*>>mq*/

    /*>>hasevent*/
    // Modernizr.hasEvent() detects support for a given event, with an optional element to test on
    // Modernizr.hasEvent('gesturestart', elem)
    Modernizr.hasEvent      = isEventSupported;
    /*>>hasevent*/

    /*>>testprop*/
    // Modernizr.testProp() investigates whether a given style property is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testProp('pointerEvents')
    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };
    /*>>testprop*/

    /*>>testallprops*/
    // Modernizr.testAllProps() investigates whether a given style property,
    //   or any of its vendor-prefixed variants, is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    Modernizr.testAllProps  = testPropsAll;
    /*>>testallprops*/


    /*>>teststyles*/
    // Modernizr.testStyles() allows you to add custom styles to the document and test an element afterwards
    // Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... })
    Modernizr.testStyles    = injectElementWithStyles;
    /*>>teststyles*/


    /*>>prefixed*/
    // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
    // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

    // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
    // Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
    //
    //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

    // If you're trying to ascertain which transition end event to bind to, you might do something like...
    //
    //     var transEndEventNames = {
    //       'WebkitTransition' : 'webkitTransitionEnd',
    //       'MozTransition'    : 'transitionend',
    //       'OTransition'      : 'oTransitionEnd',
    //       'msTransition'     : 'MSTransitionEnd',
    //       'transition'       : 'transitionend'
    //     },
    //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
        return testPropsAll(prop, obj, elem);
      }
    };
    /*>>prefixed*/


    /*>>cssclasses*/
    // Remove "no-js" class from <html> element, if it exists:
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                            // Add the new classes to the <html> element.
                            (enableClasses ? ' js ' + classes.join(' ') : '');
    /*>>cssclasses*/

    return Modernizr;

})(this, this.document);
/**
 *  jQuery Avgrund Popin Plugin
 *  http://github.com/voronianski/jquery.avgrund.js/
 *
 *  (c) 2012-2013 http://pixelhunter.me/
 *  MIT licensed
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory;
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	$.fn.avgrund = function (options) {
		var defaults = {
			width: 380, // max = 640
			height: 280, // max = 350
			showClose: false,
			showCloseText: '',
			closeByEscape: true,
			closeByDocument: true,
			holderClass: '',
			overlayClass: '',
			enableStackAnimation: false,
			onBlurContainer: '',
			openOnEvent: true,
			setEvent: 'click',
			onLoad: false,
			onUnload: false,
			template: '<p>This is test popin content!</p>'
		};

		options = $.extend(defaults, options);

		return this.each(function() {
			var self = $(this),
				body = $('body'),
				maxWidth = options.width > 640 ? 640 : options.width,
				maxHeight = options.height > 350 ? 350 : options.height,
				template = typeof options.template === 'function' ?
					options.template(self) :
					options.template instanceof jQuery ?
						options.template.html() :
						options.template;

			body.addClass('avgrund-ready');

			if ($('.avgrund-overlay').length === 0) {
				body.append('<div class="avgrund-overlay ' + options.overlayClass + '"></div>');
			}

			if (options.onBlurContainer !== '') {
				$(options.onBlurContainer).addClass('avgrund-blur');
			}

			function onDocumentKeyup (e) {
				if (options.closeByEscape) {
					if (e.keyCode === 27) {
						deactivate();
					}
				}
			}

			function onDocumentClick (e) {
				if (options.closeByDocument) {
					if ($(e.target).is('.avgrund-overlay, .avgrund-close')) {
						e.preventDefault();
						deactivate();
					}
				} else if ($(e.target).is('.avgrund-close')) {
						e.preventDefault();
						deactivate();
				}
			}

			function activate () {
				if (typeof options.onLoad === 'function') {
					options.onLoad(self);
				}

				setTimeout(function() {
					body.addClass('avgrund-active');
				}, 100);

				body.append('<div class="avgrund-popin ' + options.holderClass + '">' + template + '</div>');

				$('.avgrund-popin').css({
					'width': maxWidth + 'px',
					'height': maxHeight + 'px',
					'margin-left': '-' + (maxWidth / 2 + 10) + 'px',
					'margin-top': '-' + (maxHeight / 2 + 10) + 'px'
				});

				if (options.showClose) {
					$('.avgrund-popin').append('<a href="#" class="avgrund-close">' + options.showCloseText + '</a>');
				}

				if (options.enableStackAnimation) {
					$('.avgrund-popin').addClass('stack');
				}

				body.bind('keyup', onDocumentKeyup)
					.bind('click', onDocumentClick);
			}

			function deactivate () {
				body.unbind('keyup', onDocumentKeyup)
					.unbind('click', onDocumentClick)
					.removeClass('avgrund-active');

				setTimeout(function() {
					$('.avgrund-popin').remove();
				}, 500);

				if (typeof options.onUnload === 'function') {
					options.onUnload(self);
				}
			}

			if (options.openOnEvent) {
				self.bind(options.setEvent, function (e) {
					e.stopPropagation();

					if ($(e.target).is('a')) {
						e.preventDefault();
					}

					activate();
				});
			} else {
				activate();
			}
		});
	};
}));
 /*! OpenPGPjs.org  this is LGPL licensed code, see LICENSE/our website for more information.- v0.4.1 - 2014-02-25 */
 
 !function(a) {
    "object" == typeof exports ? module.exports = a() : "function" == typeof define && define.amd ? define(a) : "undefined" != typeof window ? window.openpgp = a() : "undefined" != typeof global ? global.openpgp = a() : "undefined" != typeof self && (self.openpgp = a())
}(function() {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i)
                        return i(g, !0);
                    if (f)
                        return f(g, !0);
                    throw new Error("Cannot find module '" + g + "'")
                }
                var j = c[g] = {exports: {}};
                b[g][0].call(j.exports, function(a) {
                    var c = b[g][1][a];
                    return e(c ? c : a)
                }, j, j.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)
            e(d[g]);
        return e
    }({1: [function(a, b, c) {
                function d(a, b) {
                    return this instanceof d ? (this.text = a.replace(/\r/g, "").replace(/[\t ]+\n/g, "\n").replace(/\n/g, "\r\n"), void (this.packets = b || new g.List)) : new d(b)
                }
                function e(a) {
                    var b = i.decode(a);
                    if (b.type !== h.armor.signed)
                        throw new Error("No cleartext signed message.");
                    var c = new g.List;
                    c.read(b.data);
                    var e = new d(b.text, c);
                    return e
                }
                var f = a("./config"), g = a("./packet"), h = a("./enums.js"), i = a("./encoding/armor.js");
                d.prototype.getSigningKeyIds = function() {
                    var a = [], b = this.packets.filterByTag(h.packet.signature);
                    return b.forEach(function(b) {
                        a.push(b.issuerKeyId)
                    }), a
                }, d.prototype.sign = function(a) {
                    var b = new g.List, c = new g.Literal;
                    c.setText(this.text);
                    for (var d = 0; d < a.length; d++) {
                        var e = new g.Signature;
                        e.signatureType = h.signature.text, e.hashAlgorithm = f.prefer_hash_algorithm;
                        var i = a[d].getSigningKeyPacket();
                        if (e.publicKeyAlgorithm = i.algorithm, !i.isDecrypted)
                            throw new Error("Private key is not decrypted.");
                        e.sign(i, c), b.push(e)
                    }
                    this.packets = b
                }, d.prototype.verify = function(a) {
                    var b = [], c = this.packets.filterByTag(h.packet.signature), d = new g.Literal;
                    return d.setText(this.text), a.forEach(function(a) {
                        for (var e = 0; e < c.length; e++) {
                            var f = a.getPublicKeyPacket([c[e].issuerKeyId]);
                            if (f) {
                                var g = {};
                                g.keyid = c[e].issuerKeyId, g.valid = c[e].verify(f, d), b.push(g);
                                break
                            }
                        }
                    }), b
                }, d.prototype.getText = function() {
                    return this.text.replace(/\r\n/g, "\n")
                }, d.prototype.armor = function() {
                    var a = {hash: h.read(h.hash, f.prefer_hash_algorithm).toUpperCase(),text: this.text,data: this.packets.write()};
                    return i.encode(h.armor.signed, a)
                }, c.CleartextMessage = d, c.readArmored = e
            }, {"./config": 4,"./encoding/armor.js": 28,"./enums.js": 30,"./packet": 40}],2: [function(a, b) {
                JXG = {exists: function(a) {
                        return function(b) {
                            return !(b === a || null === b)
                        }
                    }()}, JXG.decompress = function(a) {
                    return unescape(new JXG.Util.Unzip(JXG.Util.Base64.decodeAsArray(a)).unzip()[0][0])
                }, JXG.Util = {}, JXG.Util.Unzip = function(a) {
                    function b() {
                        return J += 8, H < G.length ? G[H++] : -1
                    }
                    function c() {
                        I = 1
                    }
                    function d() {
                        var a;
                        return J++, a = 1 & I, I >>= 1, 0 === I && (I = b(), a = 1 & I, I = I >> 1 | 128), a
                    }
                    function e(a) {
                        for (var b = 0, c = a; c--; )
                            b = b << 1 | d();
                        return a && (b = A[b] >> 8 - a), b
                    }
                    function f() {
                        y = 0
                    }
                    function g(a) {
                        r++, x[y++] = a, t.push(String.fromCharCode(a)), 32768 == y && (y = 0)
                    }
                    function h() {
                        this.b0 = 0, this.b1 = 0, this.jump = null, this.jumppos = -1
                    }
                    function i() {
                        for (; ; ) {
                            if (S[R] >= U)
                                return -1;
                            if (T[S[R]] == R)
                                return S[R]++;
                            S[R]++
                        }
                    }
                    function j() {
                        var a, b = Q[P];
                        if (u && document.write("<br>len:" + R + " treepos:" + P), 17 == R)
                            return -1;
                        if (P++, R++, a = i(), u && document.write("<br>IsPat " + a), a >= 0)
                            b.b0 = a, u && document.write("<br>b0 " + b.b0);
                        else if (b.b0 = 32768, u && document.write("<br>b0 " + b.b0), j())
                            return -1;
                        if (a = i(), a >= 0)
                            b.b1 = a, u && document.write("<br>b1 " + b.b1), b.jump = null;
                        else if (b.b1 = 32768, u && document.write("<br>b1 " + b.b1), b.jump = Q[P], b.jumppos = P, j())
                            return -1;
                        return R--, 0
                    }
                    function k(a, b, c, d) {
                        var e;
                        for (u && document.write("currentTree " + a + " numval " + b + " lengths " + c + " show " + d), Q = a, P = 0, T = c, U = b, e = 0; 17 > e; e++)
                            S[e] = 0;
                        if (R = 0, j())
                            return u && alert("invalid huffman tree\n"), -1;
                        if (u) {
                            document.write("<br>Tree: " + Q.length);
                            for (var f = 0; 32 > f; f++)
                                document.write("Places[" + f + "].b0=" + Q[f].b0 + "<br>"), document.write("Places[" + f + "].b1=" + Q[f].b1 + "<br>")
                        }
                        return 0
                    }
                    function l(a) {
                        for (var b, c, e, f = 0, g = a[f]; ; )
                            if (e = d(), u && document.write("b=" + e), e) {
                                if (!(32768 & g.b1))
                                    return u && document.write("ret1"), g.b1;
                                for (g = g.jump, b = a.length, c = 0; b > c; c++)
                                    if (a[c] === g) {
                                        f = c;
                                        break
                                    }
                            } else {
                                if (!(32768 & g.b0))
                                    return u && document.write("ret2"), g.b0;
                                f++, g = a[f]
                            }
                    }
                    function m() {
                        var a, i, j, m, n, o, p;
                        do {
                            switch (a = d(), j = e(2)) {
                                case 0:
                                    u && alert("Stored\n");
                                    break;
                                case 1:
                                    u && alert("Fixed Huffman codes\n");
                                    break;
                                case 2:
                                    u && alert("Dynamic Huffman codes\n");
                                    break;
                                case 3:
                                    u && alert("Reserved block type!!\n");
                                    break;
                                default:
                                    u && alert("Unexpected value %d!\n", j)
                            }
                            if (0 === j) {
                                var q, r;
                                for (c(), q = b(), q |= b() << 8, r = b(), r |= b() << 8, 65535 & (q ^ ~r) && document.write("BlockLen checksum mismatch\n"); q--; )
                                    i = b(), g(i)
                            } else if (1 == j)
                                for (; ; )
                                    if (n = A[e(7)] >> 1, n > 23 ? (n = n << 1 | d(), n > 199 ? (n -= 128, n = n << 1 | d()) : (n -= 48, n > 143 && (n += 136))) : n += 256, 256 > n)
                                        g(n);
                                    else {
                                        if (256 == n)
                                            break;
                                        for (n -= 257, o = e(C[n]) + B[n], n = A[e(5)] >> 3, E[n] > 8 ? (p = e(8), p |= e(E[n] - 8) << 8) : p = e(E[n]), p += D[n], n = 0; o > n; n++)
                                            i = x[y - p & 32767], g(i)
                                    }
                            else if (2 == j) {
                                var s, t, v, w, z = new Array(320);
                                for (t = 257 + e(5), v = 1 + e(5), w = 4 + e(4), n = 0; 19 > n; n++)
                                    z[n] = 0;
                                for (n = 0; w > n; n++)
                                    z[F[n]] = e(3);
                                for (o = O.length, m = 0; o > m; m++)
                                    O[m] = new h;
                                if (k(O, 19, z, 0))
                                    return f(), 1;
                                if (u) {
                                    document.write("<br>distanceTree");
                                    for (var G = 0; G < O.length; G++)
                                        document.write("<br>" + O[G].b0 + " " + O[G].b1 + " " + O[G].jump + " " + O[G].jumppos)
                                }
                                s = t + v, m = 0;
                                var H = -1;
                                for (u && document.write("<br>n=" + s + " bits: " + J + "<br>"); s > m; )
                                    if (H++, n = l(O), u && document.write("<br>" + H + " i:" + m + " decode: " + n + "    bits " + J + "<br>"), 16 > n)
                                        z[m++] = n;
                                    else if (16 == n) {
                                        var I;
                                        if (n = 3 + e(2), m + n > s)
                                            return f(), 1;
                                        for (I = m ? z[m - 1] : 0; n--; )
                                            z[m++] = I
                                    } else {
                                        if (n = 17 == n ? 3 + e(3) : 11 + e(7), m + n > s)
                                            return f(), 1;
                                        for (; n--; )
                                            z[m++] = 0
                                    }
                                for (o = N.length, m = 0; o > m; m++)
                                    N[m] = new h;
                                if (k(N, t, z, 0))
                                    return f(), 1;
                                for (o = N.length, m = 0; o > m; m++)
                                    O[m] = new h;
                                var K = [];
                                for (m = t; m < z.length; m++)
                                    K[m - t] = z[m];
                                if (k(O, v, K, 0))
                                    return f(), 1;
                                u && document.write("<br>literalTree");
                                a: for (; ; )
                                    if (n = l(N), n >= 256) {
                                        if (n -= 256, 0 === n)
                                            break;
                                        for (n--, o = e(C[n]) + B[n], n = l(O), E[n] > 8 ? (p = e(8), p |= e(E[n] - 8) << 8) : p = e(E[n]), p += D[n]; o--; ) {
                                            if (0 > y - p)
                                                break a;
                                            i = x[y - p & 32767], g(i)
                                        }
                                    } else
                                        g(n)
                            }
                        } while (!a);
                        return f(), c(), 0
                    }
                    function n() {
                        u && alert("NEXTFILE"), t = [];
                        var a = [];
                        if (z = !1, a[0] = b(), a[1] = b(), u && alert("type: " + a[0] + " " + a[1]), a[0] == parseInt("78", 16) && a[1] == parseInt("da", 16) && (u && alert("GEONExT-GZIP"), m(), u && alert(t.join("")), w[v] = new Array(2), w[v][0] = t.join(""), w[v][1] = "geonext.gxt", v++), a[0] == parseInt("78", 16) && a[1] == parseInt("9c", 16) && (u && alert("ZLIB"), m(), u && alert(t.join("")), w[v] = new Array(2), w[v][0] = t.join(""), w[v][1] = "ZLIB", v++), a[0] == parseInt("1f", 16) && a[1] == parseInt("8b", 16) && (u && alert("GZIP"), o(), u && alert(t.join("")), w[v] = new Array(2), w[v][0] = t.join(""), w[v][1] = "file", v++), a[0] == parseInt("50", 16) && a[1] == parseInt("4b", 16) && (z = !0, a[2] = b(), a[3] = b(), a[2] == parseInt("3", 16) && a[3] == parseInt("4", 16))) {
                            a[0] = b(), a[1] = b(), u && alert("ZIP-Version: " + a[1] + " " + a[0] / 10 + "." + a[0] % 10), p = b(), p |= b() << 8, u && alert("gpflags: " + p);
                            var c = b();
                            c |= b() << 8, u && alert("method: " + c), b(), b(), b(), b();
                            var d = b();
                            d |= b() << 8, d |= b() << 16, d |= b() << 24;
                            var e = b();
                            e |= b() << 8, e |= b() << 16, e |= b() << 24;
                            var f = b();
                            f |= b() << 8, f |= b() << 16, f |= b() << 24, u && alert("local CRC: " + d + "\nlocal Size: " + f + "\nlocal CompSize: " + e);
                            var g = b();
                            g |= b() << 8;
                            var h = b();
                            h |= b() << 8, u && alert("filelen " + g), j = 0, L = [];
                            for (var i; g--; )
                                i = b(), "/" == i | ":" == i ? j = 0 : K - 1 > j && (L[j++] = String.fromCharCode(i));
                            u && alert("nameBuf: " + L), s || (s = L);
                            for (var j = 0; h > j; )
                                i = b(), j++;
                            q = 4294967295, r = 0, 0 === f && "/" == fileOut.charAt(s.length - 1) && u && alert("skipdir"), 8 == c && (m(), u && alert(t.join("")), w[v] = new Array(2), w[v][0] = t.join(""), w[v][1] = L.join(""), v++), o()
                        }
                    }
                    function o() {
                        var a, c, d, e, f, g, h = [];
                        if (8 & p && (h[0] = b(), h[1] = b(), h[2] = b(), h[3] = b(), h[0] == parseInt("50", 16) && h[1] == parseInt("4b", 16) && h[2] == parseInt("07", 16) && h[3] == parseInt("08", 16) ? (a = b(), a |= b() << 8, a |= b() << 16, a |= b() << 24) : a = h[0] | h[1] << 8 | h[2] << 16 | h[3] << 24, c = b(), c |= b() << 8, c |= b() << 16, c |= b() << 24, d = b(), d |= b() << 8, d |= b() << 16, d |= b() << 24, u && alert("CRC:")), z && n(), h[0] = b(), 8 != h[0])
                            return u && alert("Unknown compression method!"), 0;
                        if (p = b(), u && p & ~parseInt("1f", 16) && alert("Unknown flags set!"), b(), b(), b(), b(), b(), e = b(), 4 & p)
                            for (h[0] = b(), h[2] = b(), R = h[0] + 256 * h[1], u && alert("Extra field size: " + R), f = 0; R > f; f++)
                                b();
                        if (8 & p) {
                            for (f = 0, L = []; g = b(); )
                                ("7" == g || ":" == g) && (f = 0), K - 1 > f && (L[f++] = g);
                            u && alert("original file name: " + L)
                        }
                        if (16 & p)
                            for (; g = b(); )
                                ;
                        2 & p && (b(), b()), m(), a = b(), a |= b() << 8, a |= b() << 16, a |= b() << 24, d = b(), d |= b() << 8, d |= b() << 16, d |= b() << 24, z && n()
                    }
                    var p, q, r, s, t = [], u = !1, v = 0, w = [], x = new Array(32768), y = 0, z = !1, A = [0, 128, 64, 192, 32, 160, 96, 224, 16, 144, 80, 208, 48, 176, 112, 240, 8, 136, 72, 200, 40, 168, 104, 232, 24, 152, 88, 216, 56, 184, 120, 248, 4, 132, 68, 196, 36, 164, 100, 228, 20, 148, 84, 212, 52, 180, 116, 244, 12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254, 1, 129, 65, 193, 33, 161, 97, 225, 17, 145, 81, 209, 49, 177, 113, 241, 9, 137, 73, 201, 41, 169, 105, 233, 25, 153, 89, 217, 57, 185, 121, 249, 5, 133, 69, 197, 37, 165, 101, 229, 21, 149, 85, 213, 53, 181, 117, 245, 13, 141, 77, 205, 45, 173, 109, 237, 29, 157, 93, 221, 61, 189, 125, 253, 3, 131, 67, 195, 35, 163, 99, 227, 19, 147, 83, 211, 51, 179, 115, 243, 11, 139, 75, 203, 43, 171, 107, 235, 27, 155, 91, 219, 59, 187, 123, 251, 7, 135, 71, 199, 39, 167, 103, 231, 23, 151, 87, 215, 55, 183, 119, 247, 15, 143, 79, 207, 47, 175, 111, 239, 31, 159, 95, 223, 63, 191, 127, 255], B = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], C = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99], D = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], E = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], G = a, H = 0, I = 1, J = 0, K = 256, L = [], M = 288, N = new Array(M), O = new Array(32), P = 0, Q = null, R = (new Array(64), new Array(64), 0), S = new Array(17);
                    S[0] = 0;
                    var T, U;
                    JXG.Util.Unzip.prototype.unzipFile = function(a) {
                        var b;
                        for (this.unzip(), b = 0; b < w.length; b++)
                            if (w[b][1] == a)
                                return w[b][0]
                    }, JXG.Util.Unzip.prototype.deflate = function() {
                        t = [];
                        return z = !1, m(), u && alert(t.join("")), w[v] = new Array(2), w[v][0] = t.join(""), w[v][1] = "DEFLATE", v++, w
                    }, JXG.Util.Unzip.prototype.unzip = function() {
                        return u && alert(G), n(), w
                    }
                }, JXG.Util.Base64 = {_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode: function(a) {
                        var b, c, d, e, f, g, h, i = [], j = 0;
                        for (a = JXG.Util.Base64._utf8_encode(a); j < a.length; )
                            b = a.charCodeAt(j++), c = a.charCodeAt(j++), d = a.charCodeAt(j++), e = b >> 2, f = (3 & b) << 4 | c >> 4, g = (15 & c) << 2 | d >> 6, h = 63 & d, isNaN(c) ? g = h = 64 : isNaN(d) && (h = 64), i.push([this._keyStr.charAt(e), this._keyStr.charAt(f), this._keyStr.charAt(g), this._keyStr.charAt(h)].join(""));
                        return i.join("")
                    },decode: function(a, b) {
                        var c, d, e, f, g, h, i, j = [], k = 0;
                        for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); k < a.length; )
                            f = this._keyStr.indexOf(a.charAt(k++)), g = this._keyStr.indexOf(a.charAt(k++)), h = this._keyStr.indexOf(a.charAt(k++)), i = this._keyStr.indexOf(a.charAt(k++)), c = f << 2 | g >> 4, d = (15 & g) << 4 | h >> 2, e = (3 & h) << 6 | i, j.push(String.fromCharCode(c)), 64 != h && j.push(String.fromCharCode(d)), 64 != i && j.push(String.fromCharCode(e));
                        return j = j.join(""), b && (j = JXG.Util.Base64._utf8_decode(j)), j
                    },_utf8_encode: function(a) {
                        a = a.replace(/\r\n/g, "\n");
                        for (var b = "", c = 0; c < a.length; c++) {
                            var d = a.charCodeAt(c);
                            128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
                        }
                        return b
                    },_utf8_decode: function(a) {
                        for (var b = [], c = 0, d = 0, e = 0, f = 0; c < a.length; )
                            d = a.charCodeAt(c), 128 > d ? (b.push(String.fromCharCode(d)), c++) : d > 191 && 224 > d ? (e = a.charCodeAt(c + 1), b.push(String.fromCharCode((31 & d) << 6 | 63 & e)), c += 2) : (e = a.charCodeAt(c + 1), f = a.charCodeAt(c + 2), b.push(String.fromCharCode((15 & d) << 12 | (63 & e) << 6 | 63 & f)), c += 3);
                        return b.join("")
                    },_destrip: function(a, b) {
                        var c, d, e = [], f = [];
                        for (null === b && (b = 76), a.replace(/ /g, ""), c = a.length / b, d = 0; c > d; d++)
                            e[d] = a.substr(d * b, b);
                        for (c != a.length / b && (e[e.length] = a.substr(c * b, a.length - c * b)), d = 0; d < e.length; d++)
                            f.push(e[d]);
                        return f.join("\n")
                    },decodeAsArray: function(a) {
                        var b, c = this.decode(a), d = [];
                        for (b = 0; b < c.length; b++)
                            d[b] = c.charCodeAt(b);
                        return d
                    },decodeGEONExT: function(a) {
                        return decodeAsArray(destrip(a), !1)
                    }}, JXG.Util.asciiCharCodeAt = function(a, b) {
                    var c = a.charCodeAt(b);
                    if (c > 255)
                        switch (c) {
                            case 8364:
                                c = 128;
                                break;
                            case 8218:
                                c = 130;
                                break;
                            case 402:
                                c = 131;
                                break;
                            case 8222:
                                c = 132;
                                break;
                            case 8230:
                                c = 133;
                                break;
                            case 8224:
                                c = 134;
                                break;
                            case 8225:
                                c = 135;
                                break;
                            case 710:
                                c = 136;
                                break;
                            case 8240:
                                c = 137;
                                break;
                            case 352:
                                c = 138;
                                break;
                            case 8249:
                                c = 139;
                                break;
                            case 338:
                                c = 140;
                                break;
                            case 381:
                                c = 142;
                                break;
                            case 8216:
                                c = 145;
                                break;
                            case 8217:
                                c = 146;
                                break;
                            case 8220:
                                c = 147;
                                break;
                            case 8221:
                                c = 148;
                                break;
                            case 8226:
                                c = 149;
                                break;
                            case 8211:
                                c = 150;
                                break;
                            case 8212:
                                c = 151;
                                break;
                            case 732:
                                c = 152;
                                break;
                            case 8482:
                                c = 153;
                                break;
                            case 353:
                                c = 154;
                                break;
                            case 8250:
                                c = 155;
                                break;
                            case 339:
                                c = 156;
                                break;
                            case 382:
                                c = 158;
                                break;
                            case 376:
                                c = 159
                        }
                    return c
                }, JXG.Util.utf8Decode = function(a) {
                    var b, c = [], d = 0, e = 0, f = 0;
                    if (!JXG.exists(a))
                        return "";
                    for (; d < a.length; )
                        e = a.charCodeAt(d), 128 > e ? (c.push(String.fromCharCode(e)), d++) : e > 191 && 224 > e ? (f = a.charCodeAt(d + 1), c.push(String.fromCharCode((31 & e) << 6 | 63 & f)), d += 2) : (f = a.charCodeAt(d + 1), b = a.charCodeAt(d + 2), c.push(String.fromCharCode((15 & e) << 12 | (63 & f) << 6 | 63 & b)), d += 3);
                    return c.join("")
                }, JXG.Util.genUUID = function() {
                    for (var a, b = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), c = new Array(36), d = 0, e = 0; 36 > e; e++)
                        8 == e || 13 == e || 18 == e || 23 == e ? c[e] = "-" : 14 == e ? c[e] = "4" : (2 >= d && (d = 33554432 + 16777216 * Math.random() | 0), a = 15 & d, d >>= 4, c[e] = b[19 == e ? 3 & a | 8 : a]);
                    return c.join("")
                }, b.exports = JXG
            }, {}],3: [function(a, b) {
                var c = a("../enums.js");
                b.exports = {prefer_hash_algorithm: c.hash.sha256,encryption_cipher: c.symmetric.aes256,compression: c.compression.zip,show_version: !0,show_comment: !0,integrity_protect: !0,keyserver: "keyserver.linux.it",versionstring: "OpenPGP.js v0.4.1",commentstring: "http://openpgpjs.org",node_store: "./openpgp.store",debug: !1}
            }, {"../enums.js": 30}],4: [function(a, b) {
                b.exports = a("./config.js")
            }, {"./config.js": 3}],5: [function(a, b) {
                "use strict";
                var c = a("../util.js"), d = a("./cipher");
                b.exports = {encrypt: function(a, b, e, f, g) {
                        b = new d[b](f);
                        var h = b.blockSize, i = new Uint8Array(h), j = new Uint8Array(h);
                        a = a + a.charAt(h - 2) + a.charAt(h - 1), c.print_debug("prefixrandom:" + c.hexstrdump(a));
                        var k, l, m = "";
                        for (k = 0; h > k; k++)
                            i[k] = 0;
                        for (j = b.encrypt(i), k = 0; h > k; k++)
                            m += String.fromCharCode(j[k] ^ a.charCodeAt(k));
                        for (k = 0; h > k; k++)
                            i[k] = m.charCodeAt(k);
                        if (j = b.encrypt(i), m += String.fromCharCode(j[0] ^ a.charCodeAt(h)), m += String.fromCharCode(j[1] ^ a.charCodeAt(h + 1)), g)
                            for (k = 0; h > k; k++)
                                i[k] = m.charCodeAt(k + 2);
                        else
                            for (k = 0; h > k; k++)
                                i[k] = m.charCodeAt(k);
                        if (j = b.encrypt(i), g) {
                            for (k = 0; h > k; k++)
                                m += String.fromCharCode(j[k] ^ e.charCodeAt(k));
                            for (l = h + 2; l < e.length; l += h) {
                                for (k = 0; h > k; k++)
                                    i[k] = m.charCodeAt(l + k);
                                for (j = b.encrypt(i), k = 0; h > k; k++)
                                    m += String.fromCharCode(j[k] ^ e.charCodeAt(l - 2 + k))
                            }
                        } else {
                            for (e = "  " + e, k = 2; h > k; k++)
                                m += String.fromCharCode(j[k] ^ e.charCodeAt(k));
                            var n, o = m.substring(0, 2 * h), p = m.substring(h);
                            for (l = h; l < e.length; l += h) {
                                for (k = 0; h > k; k++)
                                    i[k] = p.charCodeAt(k);
                                for (p = "", j = b.encrypt(i), k = 0; h > k; k++)
                                    n = String.fromCharCode(j[k] ^ e.charCodeAt(l + k)), o += n, p += n
                            }
                            m = o
                        }
                        return m = m.substring(0, e.length + 2 + h)
                    },mdc: function(a, b, e) {
                        a = new d[a](b);
                        var f, g = a.blockSize, h = new Uint8Array(g), i = new Uint8Array(g);
                        for (f = 0; g > f; f++)
                            h[f] = 0;
                        for (h = a.encrypt(h), f = 0; g > f; f++)
                            i[f] = e.charCodeAt(f), h[f] ^= i[f];
                        return i = a.encrypt(i), c.bin2str(h) + String.fromCharCode(i[0] ^ e.charCodeAt(g)) + String.fromCharCode(i[1] ^ e.charCodeAt(g + 1))
                    },decrypt: function(a, b, c, e) {
                        a = new d[a](b);
                        var f, g = a.blockSize, h = new Uint8Array(g), i = new Uint8Array(g), j = "", k = "";
                        for (f = 0; g > f; f++)
                            h[f] = 0;
                        for (h = a.encrypt(h), f = 0; g > f; f++)
                            i[f] = c.charCodeAt(f), h[f] ^= i[f];
                        if (i = a.encrypt(i), h[g - 2] != (i[0] ^ c.charCodeAt(g)) || h[g - 1] != (i[1] ^ c.charCodeAt(g + 1)))
                            throw new Error("Invalid data.");
                        if (e) {
                            for (f = 0; g > f; f++)
                                h[f] = c.charCodeAt(f + 2);
                            for (j = g + 2; j < c.length; j += g)
                                for (i = a.encrypt(h), f = 0; g > f && f + j < c.length; f++)
                                    h[f] = c.charCodeAt(j + f), k += String.fromCharCode(i[f] ^ h[f])
                        } else {
                            for (f = 0; g > f; f++)
                                h[f] = c.charCodeAt(f);
                            for (j = g; j < c.length; j += g)
                                for (i = a.encrypt(h), f = 0; g > f && f + j < c.length; f++)
                                    h[f] = c.charCodeAt(j + f), k += String.fromCharCode(i[f] ^ h[f])
                        }
                        return j = e ? 0 : 2, k = k.substring(j, c.length - g - 2 + j)
                    },normalEncrypt: function(a, b, e, f) {
                        a = new d[a](b);
                        var g = a.blockSize, h = "", i = "", j = 0, k = "", l = "";
                        for (i = f.substring(0, g); e.length > g * j; ) {
                            var m = a.encrypt(c.str2bin(i));
                            h = e.substring(j * g, j * g + g);
                            for (var n = 0; n < h.length; n++)
                                l += String.fromCharCode(h.charCodeAt(n) ^ m[n]);
                            i = l, l = "", k += i, j++
                        }
                        return k
                    },normalDecrypt: function(a, b, e, f) {
                        a = new d[a](b);
                        var g, h = a.blockSize, i = "", j = 0, k = "", l = 0;
                        if (null === f)
                            for (g = 0; h > g; g++)
                                i += String.fromCharCode(0);
                        else
                            i = f.substring(0, h);
                        for (; e.length > h * j; ) {
                            var m = a.encrypt(c.str2bin(i));
                            for (i = e.substring(j * h + l, j * h + h + l), g = 0; g < i.length; g++)
                                k += String.fromCharCode(i.charCodeAt(g) ^ m[g]);
                            j++
                        }
                        return k
                    }}
            }, {"../util.js": 61,"./cipher": 10}],6: [function(a, b) {
                "use strict";
                function c(a) {
                    return 255 & a
                }
                function d(a) {
                    return a >> 8 & 255
                }
                function e(a) {
                    return a >> 16 & 255
                }
                function f(a) {
                    return a >> 24 & 255
                }
                function g(a, b, c, e) {
                    return d(o[255 & a]) | d(o[b >> 8 & 255]) << 8 | d(o[c >> 16 & 255]) << 16 | d(o[e >>> 24]) << 24
                }
                function h(a) {
                    var b, c, d = a.length, e = new Array(d / 4);
                    if (a && !(d % 4)) {
                        for (b = 0, c = 0; d > c; c += 4)
                            e[b++] = a[c] | a[c + 1] << 8 | a[c + 2] << 16 | a[c + 3] << 24;
                        return e
                    }
                }
                function i(a) {
                    var b, g = 0, h = a.length, i = new Array(4 * h);
                    for (b = 0; h > b; b++)
                        i[g++] = c(a[b]), i[g++] = d(a[b]), i[g++] = e(a[b]), i[g++] = f(a[b]);
                    return i
                }
                function j(a) {
                    var b, g, h, i, j, k, l = new Array(t + 1), o = a.length, p = new Array(s), q = new Array(s), r = 0;
                    if (16 == o)
                        k = 10, b = 4;
                    else if (24 == o)
                        k = 12, b = 6;
                    else {
                        if (32 != o)
                            throw new Error("Invalid key-length for AES key:" + o);
                        k = 14, b = 8
                    }
                    for (g = 0; t + 1 > g; g++)
                        l[g] = new Uint32Array(4);
                    for (g = 0, h = 0; o > h; h++, g += 4)
                        p[h] = a.charCodeAt(g) | a.charCodeAt(g + 1) << 8 | a.charCodeAt(g + 2) << 16 | a.charCodeAt(g + 3) << 24;
                    for (h = b - 1; h >= 0; h--)
                        q[h] = p[h];
                    for (i = 0, j = 0, h = 0; b > h && k + 1 > i; ) {
                        for (; b > h && 4 > j; h++, j++)
                            l[i][j] = q[h];
                        4 == j && (i++, j = 0)
                    }
                    for (; k + 1 > i; ) {
                        var u = q[b - 1];
                        if (q[0] ^= n[d(u)] | n[e(u)] << 8 | n[f(u)] << 16 | n[c(u)] << 24, q[0] ^= m[r++], 8 != b)
                            for (h = 1; b > h; h++)
                                q[h] ^= q[h - 1];
                        else {
                            for (h = 1; b / 2 > h; h++)
                                q[h] ^= q[h - 1];
                            for (u = q[b / 2 - 1], q[b / 2] ^= n[c(u)] | n[d(u)] << 8 | n[e(u)] << 16 | n[f(u)] << 24, h = b / 2 + 1; b > h; h++)
                                q[h] ^= q[h - 1]
                        }
                        for (h = 0; b > h && k + 1 > i; ) {
                            for (; b > h && 4 > j; h++, j++)
                                l[i][j] = q[h];
                            4 == j && (i++, j = 0)
                        }
                    }
                    return {rounds: k,rk: l}
                }
                function k(a, b) {
                    var c, d, e, f, j, k = h(a), l = b.rounds, m = k[0], n = k[1], s = k[2], t = k[3];
                    for (c = 0; l - 1 > c; c++)
                        d = m ^ b.rk[c][0], e = n ^ b.rk[c][1], f = s ^ b.rk[c][2], j = t ^ b.rk[c][3], m = o[255 & d] ^ p[e >> 8 & 255] ^ q[f >> 16 & 255] ^ r[j >>> 24], n = o[255 & e] ^ p[f >> 8 & 255] ^ q[j >> 16 & 255] ^ r[d >>> 24], s = o[255 & f] ^ p[j >> 8 & 255] ^ q[d >> 16 & 255] ^ r[e >>> 24], t = o[255 & j] ^ p[d >> 8 & 255] ^ q[e >> 16 & 255] ^ r[f >>> 24];
                    return c = l - 1, d = m ^ b.rk[c][0], e = n ^ b.rk[c][1], f = s ^ b.rk[c][2], j = t ^ b.rk[c][3], k[0] = g(d, e, f, j) ^ b.rk[l][0], k[1] = g(e, f, j, d) ^ b.rk[l][1], k[2] = g(f, j, d, e) ^ b.rk[l][2], k[3] = g(j, d, e, f) ^ b.rk[l][3], i(k)
                }
                function l(a) {
                    var b = function(a) {
                        this.key = j(a), this.encrypt = function(a) {
                            return k(a, this.key)
                        }
                    };
                    return b.blockSize = b.prototype.blockSize = 16, b.keySize = b.prototype.keySize = a / 8, b
                }
                var m = (a("../../util.js"), new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145])), n = new Uint8Array([99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22]), o = new Uint32Array([2774754246, 2222750968, 2574743534, 2373680118, 234025727, 3177933782, 2976870366, 1422247313, 1345335392, 50397442, 2842126286, 2099981142, 436141799, 1658312629, 3870010189, 2591454956, 1170918031, 2642575903, 1086966153, 2273148410, 368769775, 3948501426, 3376891790, 200339707, 3970805057, 1742001331, 4255294047, 3937382213, 3214711843, 4154762323, 2524082916, 1539358875, 3266819957, 486407649, 2928907069, 1780885068, 1513502316, 1094664062, 49805301, 1338821763, 1546925160, 4104496465, 887481809, 150073849, 2473685474, 1943591083, 1395732834, 1058346282, 201589768, 1388824469, 1696801606, 1589887901, 672667696, 2711000631, 251987210, 3046808111, 151455502, 907153956, 2608889883, 1038279391, 652995533, 1764173646, 3451040383, 2675275242, 453576978, 2659418909, 1949051992, 773462580, 756751158, 2993581788, 3998898868, 4221608027, 4132590244, 1295727478, 1641469623, 3467883389, 2066295122, 1055122397, 1898917726, 2542044179, 4115878822, 1758581177, 0, 753790401, 1612718144, 536673507, 3367088505, 3982187446, 3194645204, 1187761037, 3653156455, 1262041458, 3729410708, 3561770136, 3898103984, 1255133061, 1808847035, 720367557, 3853167183, 385612781, 3309519750, 3612167578, 1429418854, 2491778321, 3477423498, 284817897, 100794884, 2172616702, 4031795360, 1144798328, 3131023141, 3819481163, 4082192802, 4272137053, 3225436288, 2324664069, 2912064063, 3164445985, 1211644016, 83228145, 3753688163, 3249976951, 1977277103, 1663115586, 806359072, 452984805, 250868733, 1842533055, 1288555905, 336333848, 890442534, 804056259, 3781124030, 2727843637, 3427026056, 957814574, 1472513171, 4071073621, 2189328124, 1195195770, 2892260552, 3881655738, 723065138, 2507371494, 2690670784, 2558624025, 3511635870, 2145180835, 1713513028, 2116692564, 2878378043, 2206763019, 3393603212, 703524551, 3552098411, 1007948840, 2044649127, 3797835452, 487262998, 1994120109, 1004593371, 1446130276, 1312438900, 503974420, 3679013266, 168166924, 1814307912, 3831258296, 1573044895, 1859376061, 4021070915, 2791465668, 2828112185, 2761266481, 937747667, 2339994098, 854058965, 1137232011, 1496790894, 3077402074, 2358086913, 1691735473, 3528347292, 3769215305, 3027004632, 4199962284, 133494003, 636152527, 2942657994, 2390391540, 3920539207, 403179536, 3585784431, 2289596656, 1864705354, 1915629148, 605822008, 4054230615, 3350508659, 1371981463, 602466507, 2094914977, 2624877800, 555687742, 3712699286, 3703422305, 2257292045, 2240449039, 2423288032, 1111375484, 3300242801, 2858837708, 3628615824, 84083462, 32962295, 302911004, 2741068226, 1597322602, 4183250862, 3501832553, 2441512471, 1489093017, 656219450, 3114180135, 954327513, 335083755, 3013122091, 856756514, 3144247762, 1893325225, 2307821063, 2811532339, 3063651117, 572399164, 2458355477, 552200649, 1238290055, 4283782570, 2015897680, 2061492133, 2408352771, 4171342169, 2156497161, 386731290, 3669999461, 837215959, 3326231172, 3093850320, 3275833730, 2962856233, 1999449434, 286199582, 3417354363, 4233385128, 3602627437, 974525996]), p = new Uint32Array([1667483301, 2088564868, 2004348569, 2071721613, 4076011277, 1802229437, 1869602481, 3318059348, 808476752, 16843267, 1734856361, 724260477, 4278118169, 3621238114, 2880130534, 1987505306, 3402272581, 2189565853, 3385428288, 2105408135, 4210749205, 1499050731, 1195871945, 4042324747, 2913812972, 3570709351, 2728550397, 2947499498, 2627478463, 2762232823, 1920132246, 3233848155, 3082253762, 4261273884, 2475900334, 640044138, 909536346, 1061125697, 4160222466, 3435955023, 875849820, 2779075060, 3857043764, 4059166984, 1903288979, 3638078323, 825320019, 353708607, 67373068, 3351745874, 589514341, 3284376926, 404238376, 2526427041, 84216335, 2593796021, 117902857, 303178806, 2155879323, 3806519101, 3958099238, 656887401, 2998042573, 1970662047, 151589403, 2206408094, 741103732, 437924910, 454768173, 1852759218, 1515893998, 2694863867, 1381147894, 993752653, 3604395873, 3014884814, 690573947, 3823361342, 791633521, 2223248279, 1397991157, 3520182632, 0, 3991781676, 538984544, 4244431647, 2981198280, 1532737261, 1785386174, 3419114822, 3200149465, 960066123, 1246401758, 1280088276, 1482207464, 3486483786, 3503340395, 4025468202, 2863288293, 4227591446, 1128498885, 1296931543, 859006549, 2240090516, 1162185423, 4193904912, 33686534, 2139094657, 1347461360, 1010595908, 2678007226, 2829601763, 1364304627, 2745392638, 1077969088, 2408514954, 2459058093, 2644320700, 943222856, 4126535940, 3166462943, 3065411521, 3671764853, 555827811, 269492272, 4294960410, 4092853518, 3537026925, 3452797260, 202119188, 320022069, 3974939439, 1600110305, 2543269282, 1145342156, 387395129, 3301217111, 2812761586, 2122251394, 1027439175, 1684326572, 1566423783, 421081643, 1936975509, 1616953504, 2172721560, 1330618065, 3705447295, 572671078, 707417214, 2425371563, 2290617219, 1179028682, 4008625961, 3099093971, 336865340, 3739133817, 1583267042, 185275933, 3688607094, 3772832571, 842163286, 976909390, 168432670, 1229558491, 101059594, 606357612, 1549580516, 3267534685, 3553869166, 2896970735, 1650640038, 2442213800, 2509582756, 3840201527, 2038035083, 3890730290, 3368586051, 926379609, 1835915959, 2374828428, 3587551588, 1313774802, 2846444e3, 1819072692, 1448520954, 4109693703, 3941256997, 1701169839, 2054878350, 2930657257, 134746136, 3132780501, 2021191816, 623200879, 774790258, 471611428, 2795919345, 3031724999, 3334903633, 3907570467, 3722289532, 1953818780, 522141217, 1263245021, 3183305180, 2341145990, 2324303749, 1886445712, 1044282434, 3048567236, 1718013098, 1212715224, 50529797, 4143380225, 235805714, 1633796771, 892693087, 1465364217, 3115936208, 2256934801, 3250690392, 488454695, 2661164985, 3789674808, 4177062675, 2560109491, 286335539, 1768542907, 3654920560, 2391672713, 2492740519, 2610638262, 505297954, 2273777042, 3924412704, 3469641545, 1431677695, 673730680, 3755976058, 2357986191, 2711706104, 2307459456, 218962455, 3216991706, 3873888049, 1111655622, 1751699640, 1094812355, 2576951728, 757946999, 252648977, 2964356043, 1414834428, 3149622742, 370551866]), q = new Uint32Array([1673962851, 2096661628, 2012125559, 2079755643, 4076801522, 1809235307, 1876865391, 3314635973, 811618352, 16909057, 1741597031, 727088427, 4276558334, 3618988759, 2874009259, 1995217526, 3398387146, 2183110018, 3381215433, 2113570685, 4209972730, 1504897881, 1200539975, 4042984432, 2906778797, 3568527316, 2724199842, 2940594863, 2619588508, 2756966308, 1927583346, 3231407040, 3077948087, 4259388669, 2470293139, 642542118, 913070646, 1065238847, 4160029431, 3431157708, 879254580, 2773611685, 3855693029, 4059629809, 1910674289, 3635114968, 828527409, 355090197, 67636228, 3348452039, 591815971, 3281870531, 405809176, 2520228246, 84545285, 2586817946, 118360327, 304363026, 2149292928, 3806281186, 3956090603, 659450151, 2994720178, 1978310517, 152181513, 2199756419, 743994412, 439627290, 456535323, 1859957358, 1521806938, 2690382752, 1386542674, 997608763, 3602342358, 3011366579, 693271337, 3822927587, 794718511, 2215876484, 1403450707, 3518589137, 0, 3988860141, 541089824, 4242743292, 2977548465, 1538714971, 1792327274, 3415033547, 3194476990, 963791673, 1251270218, 1285084236, 1487988824, 3481619151, 3501943760, 4022676207, 2857362858, 4226619131, 1132905795, 1301993293, 862344499, 2232521861, 1166724933, 4192801017, 33818114, 2147385727, 1352724560, 1014514748, 2670049951, 2823545768, 1369633617, 2740846243, 1082179648, 2399505039, 2453646738, 2636233885, 946882616, 4126213365, 3160661948, 3061301686, 3668932058, 557998881, 270544912, 4293204735, 4093447923, 3535760850, 3447803085, 202904588, 321271059, 3972214764, 1606345055, 2536874647, 1149815876, 388905239, 3297990596, 2807427751, 2130477694, 1031423805, 1690872932, 1572530013, 422718233, 1944491379, 1623236704, 2165938305, 1335808335, 3701702620, 574907938, 710180394, 2419829648, 2282455944, 1183631942, 4006029806, 3094074296, 338181140, 3735517662, 1589437022, 185998603, 3685578459, 3772464096, 845436466, 980700730, 169090570, 1234361161, 101452294, 608726052, 1555620956, 3265224130, 3552407251, 2890133420, 1657054818, 2436475025, 2503058581, 3839047652, 2045938553, 3889509095, 3364570056, 929978679, 1843050349, 2365688973, 3585172693, 1318900302, 2840191145, 1826141292, 1454176854, 4109567988, 3939444202, 1707781989, 2062847610, 2923948462, 135272456, 3127891386, 2029029496, 625635109, 777810478, 473441308, 2790781350, 3027486644, 3331805638, 3905627112, 3718347997, 1961401460, 524165407, 1268178251, 3177307325, 2332919435, 2316273034, 1893765232, 1048330814, 3044132021, 1724688998, 1217452104, 50726147, 4143383030, 236720654, 1640145761, 896163637, 1471084887, 3110719673, 2249691526, 3248052417, 490350365, 2653403550, 3789109473, 4176155640, 2553000856, 287453969, 1775418217, 3651760345, 2382858638, 2486413204, 2603464347, 507257374, 2266337927, 3922272489, 3464972750, 1437269845, 676362280, 3752164063, 2349043596, 2707028129, 2299101321, 219813645, 3211123391, 3872862694, 1115997762, 1758509160, 1099088705, 2569646233, 760903469, 253628687, 2960903088, 1420360788, 3144537787, 371997206]), r = new Uint32Array([3332727651, 4169432188, 4003034999, 4136467323, 4279104242, 3602738027, 3736170351, 2438251973, 1615867952, 33751297, 3467208551, 1451043627, 3877240574, 3043153879, 1306962859, 3969545846, 2403715786, 530416258, 2302724553, 4203183485, 4011195130, 3001768281, 2395555655, 4211863792, 1106029997, 3009926356, 1610457762, 1173008303, 599760028, 1408738468, 3835064946, 2606481600, 1975695287, 3776773629, 1034851219, 1282024998, 1817851446, 2118205247, 4110612471, 2203045068, 1750873140, 1374987685, 3509904869, 4178113009, 3801313649, 2876496088, 1649619249, 708777237, 135005188, 2505230279, 1181033251, 2640233411, 807933976, 933336726, 168756485, 800430746, 235472647, 607523346, 463175808, 3745374946, 3441880043, 1315514151, 2144187058, 3936318837, 303761673, 496927619, 1484008492, 875436570, 908925723, 3702681198, 3035519578, 1543217312, 2767606354, 1984772923, 3076642518, 2110698419, 1383803177, 3711886307, 1584475951, 328696964, 2801095507, 3110654417, 0, 3240947181, 1080041504, 3810524412, 2043195825, 3069008731, 3569248874, 2370227147, 1742323390, 1917532473, 2497595978, 2564049996, 2968016984, 2236272591, 3144405200, 3307925487, 1340451498, 3977706491, 2261074755, 2597801293, 1716859699, 294946181, 2328839493, 3910203897, 67502594, 4269899647, 2700103760, 2017737788, 632987551, 1273211048, 2733855057, 1576969123, 2160083008, 92966799, 1068339858, 566009245, 1883781176, 4043634165, 1675607228, 2009183926, 2943736538, 1113792801, 540020752, 3843751935, 4245615603, 3211645650, 2169294285, 403966988, 641012499, 3274697964, 3202441055, 899848087, 2295088196, 775493399, 2472002756, 1441965991, 4236410494, 2051489085, 3366741092, 3135724893, 841685273, 3868554099, 3231735904, 429425025, 2664517455, 2743065820, 1147544098, 1417554474, 1001099408, 193169544, 2362066502, 3341414126, 1809037496, 675025940, 2809781982, 3168951902, 371002123, 2910247899, 3678134496, 1683370546, 1951283770, 337512970, 2463844681, 201983494, 1215046692, 3101973596, 2673722050, 3178157011, 1139780780, 3299238498, 967348625, 832869781, 3543655652, 4069226873, 3576883175, 2336475336, 1851340599, 3669454189, 25988493, 2976175573, 2631028302, 1239460265, 3635702892, 2902087254, 4077384948, 3475368682, 3400492389, 4102978170, 1206496942, 270010376, 1876277946, 4035475576, 1248797989, 1550986798, 941890588, 1475454630, 1942467764, 2538718918, 3408128232, 2709315037, 3902567540, 1042358047, 2531085131, 1641856445, 226921355, 260409994, 3767562352, 2084716094, 1908716981, 3433719398, 2430093384, 100991747, 4144101110, 470945294, 3265487201, 1784624437, 2935576407, 1775286713, 395413126, 2572730817, 975641885, 666476190, 3644383713, 3943954680, 733190296, 573772049, 3535497577, 2842745305, 126455438, 866620564, 766942107, 1008868894, 361924487, 3374377449, 2269761230, 2868860245, 1350051880, 2776293343, 59739276, 1509466529, 159418761, 437718285, 1708834751, 3610371814, 2227585602, 3501746280, 2193834305, 699439513, 1517759789, 504434447, 2076946608, 2835108948, 1842789307, 742004246]), s = 8, t = 14;
                b.exports = {};
                var u = [128, 192, 256];
                for (var v in u)
                    b.exports[u[v]] = l(u[v])
            }, {"../../util.js": 61}],7: [function(a, b) {
                function c() {
                }
                function d(a) {
                    this.bf = new c, this.bf.init(e.str2bin(a)), this.encrypt = function(a) {
                        return this.bf.encrypt_block(a)
                    }
                }
                c.prototype.BLOCKSIZE = 8, c.prototype.SBOXES = [[3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946], [1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055], [3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504], [976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462]], c.prototype.PARRAY = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731], c.prototype.NN = 16, c.prototype._clean = function(a) {
                    if (0 > a) {
                        var b = 2147483647 & a;
                        a = b + 2147483648
                    }
                    return a
                }, c.prototype._F = function(a) {
                    var b, c, d, e, f;
                    return e = 255 & a, a >>>= 8, d = 255 & a, a >>>= 8, c = 255 & a, a >>>= 8, b = 255 & a, f = this.sboxes[0][b] + this.sboxes[1][c], f ^= this.sboxes[2][d], f += this.sboxes[3][e]
                }, c.prototype._encrypt_block = function(a) {
                    var b, c = a[0], d = a[1];
                    for (b = 0; b < this.NN; ++b) {
                        c ^= this.parray[b], d = this._F(c) ^ d;
                        var e = c;
                        c = d, d = e
                    }
                    c ^= this.parray[this.NN + 0], d ^= this.parray[this.NN + 1], a[0] = this._clean(d), a[1] = this._clean(c)
                }, c.prototype.encrypt_block = function(a) {
                    var b, c = [0, 0], d = this.BLOCKSIZE / 2;
                    for (b = 0; b < this.BLOCKSIZE / 2; ++b)
                        c[0] = c[0] << 8 | 255 & a[b + 0], c[1] = c[1] << 8 | 255 & a[b + d];
                    this._encrypt_block(c);
                    var e = [];
                    for (b = 0; b < this.BLOCKSIZE / 2; ++b)
                        e[b + 0] = c[0] >>> 24 - 8 * b & 255, e[b + d] = c[1] >>> 24 - 8 * b & 255;
                    return e
                }, c.prototype._decrypt_block = function(a) {
                    var b, c = a[0], d = a[1];
                    for (b = this.NN + 1; b > 1; --b) {
                        c ^= this.parray[b], d = this._F(c) ^ d;
                        var e = c;
                        c = d, d = e
                    }
                    c ^= this.parray[1], d ^= this.parray[0], a[0] = this._clean(d), a[1] = this._clean(c)
                }, c.prototype.init = function(a) {
                    var b, c = 0;
                    for (this.parray = [], b = 0; b < this.NN + 2; ++b) {
                        var d, e = 0;
                        for (d = 0; 4 > d; ++d)
                            e = e << 8 | 255 & a[c], ++c >= a.length && (c = 0);
                        this.parray[b] = this.PARRAY[b] ^ e
                    }
                    for (this.sboxes = [], b = 0; 4 > b; ++b)
                        for (this.sboxes[b] = [], c = 0; 256 > c; ++c)
                            this.sboxes[b][c] = this.SBOXES[b][c];
                    var f = [0, 0];
                    for (b = 0; b < this.NN + 2; b += 2)
                        this._encrypt_block(f), this.parray[b + 0] = f[0], this.parray[b + 1] = f[1];
                    for (b = 0; 4 > b; ++b)
                        for (c = 0; 256 > c; c += 2)
                            this._encrypt_block(f), this.sboxes[b][c + 0] = f[0], this.sboxes[b][c + 1] = f[1]
                };
                var e = a("../../util.js");
                b.exports = d, b.exports.keySize = d.prototype.keySize = 16, b.exports.blockSize = d.prototype.blockSize = 16
            }, {"../../util.js": 61}],8: [function(a, b) {
                function c() {
                    function a(a, b, c) {
                        var d = b + a, e = d << c | d >>> 32 - c;
                        return (f[0][e >>> 24] ^ f[1][e >>> 16 & 255]) - f[2][e >>> 8 & 255] + f[3][255 & e]
                    }
                    function b(a, b, c) {
                        var d = b ^ a, e = d << c | d >>> 32 - c;
                        return f[0][e >>> 24] - f[1][e >>> 16 & 255] + f[2][e >>> 8 & 255] ^ f[3][255 & e]
                    }
                    function c(a, b, c) {
                        var d = b - a, e = d << c | d >>> 32 - c;
                        return (f[0][e >>> 24] + f[1][e >>> 16 & 255] ^ f[2][e >>> 8 & 255]) - f[3][255 & e]
                    }
                    this.BlockSize = 8, this.KeySize = 16, this.setKey = function(a) {
                        if (this.masking = new Array(16), this.rotate = new Array(16), this.reset(), a.length != this.KeySize)
                            throw new Error("CAST-128: keys must be 16 bytes");
                        return this.keySchedule(a), !0
                    }, this.reset = function() {
                        for (var a = 0; 16 > a; a++)
                            this.masking[a] = 0, this.rotate[a] = 0
                    }, this.getBlockSize = function() {
                        return BlockSize
                    }, this.encrypt = function(d) {
                        for (var e = new Array(d.length), f = 0; f < d.length; f += 8) {
                            var g, h = d[f] << 24 | d[f + 1] << 16 | d[f + 2] << 8 | d[f + 3], i = d[f + 4] << 24 | d[f + 5] << 16 | d[f + 6] << 8 | d[f + 7];
                            g = i, i = h ^ a(i, this.masking[0], this.rotate[0]), h = g, g = i, i = h ^ b(i, this.masking[1], this.rotate[1]), h = g, g = i, i = h ^ c(i, this.masking[2], this.rotate[2]), h = g, g = i, i = h ^ a(i, this.masking[3], this.rotate[3]), h = g, g = i, i = h ^ b(i, this.masking[4], this.rotate[4]), h = g, g = i, i = h ^ c(i, this.masking[5], this.rotate[5]), h = g, g = i, i = h ^ a(i, this.masking[6], this.rotate[6]), h = g, g = i, i = h ^ b(i, this.masking[7], this.rotate[7]), h = g, g = i, i = h ^ c(i, this.masking[8], this.rotate[8]), h = g, g = i, i = h ^ a(i, this.masking[9], this.rotate[9]), h = g, g = i, i = h ^ b(i, this.masking[10], this.rotate[10]), h = g, g = i, i = h ^ c(i, this.masking[11], this.rotate[11]), h = g, g = i, i = h ^ a(i, this.masking[12], this.rotate[12]), h = g, g = i, i = h ^ b(i, this.masking[13], this.rotate[13]), h = g, g = i, i = h ^ c(i, this.masking[14], this.rotate[14]), h = g, g = i, i = h ^ a(i, this.masking[15], this.rotate[15]), h = g, e[f] = i >>> 24 & 255, e[f + 1] = i >>> 16 & 255, e[f + 2] = i >>> 8 & 255, e[f + 3] = 255 & i, e[f + 4] = h >>> 24 & 255, e[f + 5] = h >>> 16 & 255, e[f + 6] = h >>> 8 & 255, e[f + 7] = 255 & h
                        }
                        return e
                    }, this.decrypt = function(d) {
                        for (var e = new Array(d.length), f = 0; f < d.length; f += 8) {
                            var g, h = d[f] << 24 | d[f + 1] << 16 | d[f + 2] << 8 | d[f + 3], i = d[f + 4] << 24 | d[f + 5] << 16 | d[f + 6] << 8 | d[f + 7];
                            g = i, i = h ^ a(i, this.masking[15], this.rotate[15]), h = g, g = i, i = h ^ c(i, this.masking[14], this.rotate[14]), h = g, g = i, i = h ^ b(i, this.masking[13], this.rotate[13]), h = g, g = i, i = h ^ a(i, this.masking[12], this.rotate[12]), h = g, g = i, i = h ^ c(i, this.masking[11], this.rotate[11]), h = g, g = i, i = h ^ b(i, this.masking[10], this.rotate[10]), h = g, g = i, i = h ^ a(i, this.masking[9], this.rotate[9]), h = g, g = i, i = h ^ c(i, this.masking[8], this.rotate[8]), h = g, g = i, i = h ^ b(i, this.masking[7], this.rotate[7]), h = g, g = i, i = h ^ a(i, this.masking[6], this.rotate[6]), h = g, g = i, i = h ^ c(i, this.masking[5], this.rotate[5]), h = g, g = i, i = h ^ b(i, this.masking[4], this.rotate[4]), h = g, g = i, i = h ^ a(i, this.masking[3], this.rotate[3]), h = g, g = i, i = h ^ c(i, this.masking[2], this.rotate[2]), h = g, g = i, i = h ^ b(i, this.masking[1], this.rotate[1]), h = g, g = i, i = h ^ a(i, this.masking[0], this.rotate[0]), h = g, e[f] = i >>> 24 & 255, e[f + 1] = i >>> 16 & 255, e[f + 2] = i >>> 8 & 255, e[f + 3] = 255 & i, e[f + 4] = h >>> 24 & 255, e[f + 5] = h >> 16 & 255, e[f + 6] = h >> 8 & 255, e[f + 7] = 255 & h
                        }
                        return e
                    };
                    var d = new Array(4);
                    d[0] = new Array(4), d[0][0] = new Array(4, 0, 13, 15, 12, 14, 8), d[0][1] = new Array(5, 2, 16, 18, 17, 19, 10), d[0][2] = new Array(6, 3, 23, 22, 21, 20, 9), d[0][3] = new Array(7, 1, 26, 25, 27, 24, 11), d[1] = new Array(4), d[1][0] = new Array(0, 6, 21, 23, 20, 22, 16), d[1][1] = new Array(1, 4, 0, 2, 1, 3, 18), d[1][2] = new Array(2, 5, 7, 6, 5, 4, 17), d[1][3] = new Array(3, 7, 10, 9, 11, 8, 19), d[2] = new Array(4), d[2][0] = new Array(4, 0, 13, 15, 12, 14, 8), d[2][1] = new Array(5, 2, 16, 18, 17, 19, 10), d[2][2] = new Array(6, 3, 23, 22, 21, 20, 9), d[2][3] = new Array(7, 1, 26, 25, 27, 24, 11), d[3] = new Array(4), d[3][0] = new Array(0, 6, 21, 23, 20, 22, 16), d[3][1] = new Array(1, 4, 0, 2, 1, 3, 18), d[3][2] = new Array(2, 5, 7, 6, 5, 4, 17), d[3][3] = new Array(3, 7, 10, 9, 11, 8, 19);
                    var e = new Array(4);
                    e[0] = new Array(4), e[0][0] = new Array(24, 25, 23, 22, 18), e[0][1] = new Array(26, 27, 21, 20, 22), e[0][2] = new Array(28, 29, 19, 18, 25), e[0][3] = new Array(30, 31, 17, 16, 28), e[1] = new Array(4), e[1][0] = new Array(3, 2, 12, 13, 8), e[1][1] = new Array(1, 0, 14, 15, 13), e[1][2] = new Array(7, 6, 8, 9, 3), e[1][3] = new Array(5, 4, 10, 11, 7), e[2] = new Array(4), e[2][0] = new Array(19, 18, 28, 29, 25), e[2][1] = new Array(17, 16, 30, 31, 28), e[2][2] = new Array(23, 22, 24, 25, 18), e[2][3] = new Array(21, 20, 26, 27, 22), e[3] = new Array(4), e[3][0] = new Array(8, 9, 7, 6, 3), e[3][1] = new Array(10, 11, 5, 4, 7), e[3][2] = new Array(12, 13, 3, 2, 8), e[3][3] = new Array(14, 15, 1, 0, 13), this.keySchedule = function(a) {
                        var b, c, g = new Array(8), h = new Array(32);
                        for (b = 0; 4 > b; b++)
                            c = 4 * b, g[b] = a[c] << 24 | a[c + 1] << 16 | a[c + 2] << 8 | a[c + 3];
                        for (var i, j = [6, 7, 4, 5], k = 0, l = 0; 2 > l; l++)
                            for (var m = 0; 4 > m; m++) {
                                for (c = 0; 4 > c; c++) {
                                    var n = d[m][c];
                                    i = g[n[1]], i ^= f[4][g[n[2] >>> 2] >>> 24 - 8 * (3 & n[2]) & 255], i ^= f[5][g[n[3] >>> 2] >>> 24 - 8 * (3 & n[3]) & 255], i ^= f[6][g[n[4] >>> 2] >>> 24 - 8 * (3 & n[4]) & 255], i ^= f[7][g[n[5] >>> 2] >>> 24 - 8 * (3 & n[5]) & 255], i ^= f[j[c]][g[n[6] >>> 2] >>> 24 - 8 * (3 & n[6]) & 255], g[n[0]] = i
                                }
                                for (c = 0; 4 > c; c++) {
                                    var o = e[m][c];
                                    i = f[4][g[o[0] >>> 2] >>> 24 - 8 * (3 & o[0]) & 255], i ^= f[5][g[o[1] >>> 2] >>> 24 - 8 * (3 & o[1]) & 255], i ^= f[6][g[o[2] >>> 2] >>> 24 - 8 * (3 & o[2]) & 255], i ^= f[7][g[o[3] >>> 2] >>> 24 - 8 * (3 & o[3]) & 255], i ^= f[4 + c][g[o[4] >>> 2] >>> 24 - 8 * (3 & o[4]) & 255], h[k] = i, k++
                                }
                            }
                        for (b = 0; 16 > b; b++)
                            this.masking[b] = h[b], this.rotate[b] = 31 & h[16 + b]
                    };
                    var f = new Array(8);
                    f[0] = new Array(821772500, 2678128395, 1810681135, 1059425402, 505495343, 2617265619, 1610868032, 3483355465, 3218386727, 2294005173, 3791863952, 2563806837, 1852023008, 365126098, 3269944861, 584384398, 677919599, 3229601881, 4280515016, 2002735330, 1136869587, 3744433750, 2289869850, 2731719981, 2714362070, 879511577, 1639411079, 575934255, 717107937, 2857637483, 576097850, 2731753936, 1725645e3, 2810460463, 5111599, 767152862, 2543075244, 1251459544, 1383482551, 3052681127, 3089939183, 3612463449, 1878520045, 1510570527, 2189125840, 2431448366, 582008916, 3163445557, 1265446783, 1354458274, 3529918736, 3202711853, 3073581712, 3912963487, 3029263377, 1275016285, 4249207360, 2905708351, 3304509486, 1442611557, 3585198765, 2712415662, 2731849581, 3248163920, 2283946226, 208555832, 2766454743, 1331405426, 1447828783, 3315356441, 3108627284, 2957404670, 2981538698, 3339933917, 1669711173, 286233437, 1465092821, 1782121619, 3862771680, 710211251, 980974943, 1651941557, 430374111, 2051154026, 704238805, 4128970897, 3144820574, 2857402727, 948965521, 3333752299, 2227686284, 718756367, 2269778983, 2731643755, 718440111, 2857816721, 3616097120, 1113355533, 2478022182, 410092745, 1811985197, 1944238868, 2696854588, 1415722873, 1682284203, 1060277122, 1998114690, 1503841958, 82706478, 2315155686, 1068173648, 845149890, 2167947013, 1768146376, 1993038550, 3566826697, 3390574031, 940016341, 3355073782, 2328040721, 904371731, 1205506512, 4094660742, 2816623006, 825647681, 85914773, 2857843460, 1249926541, 1417871568, 3287612, 3211054559, 3126306446, 1975924523, 1353700161, 2814456437, 2438597621, 1800716203, 722146342, 2873936343, 1151126914, 4160483941, 2877670899, 458611604, 2866078500, 3483680063, 770352098, 2652916994, 3367839148, 3940505011, 3585973912, 3809620402, 718646636, 2504206814, 2914927912, 3631288169, 2857486607, 2860018678, 575749918, 2857478043, 718488780, 2069512688, 3548183469, 453416197, 1106044049, 3032691430, 52586708, 3378514636, 3459808877, 3211506028, 1785789304, 218356169, 3571399134, 3759170522, 1194783844, 1523787992, 3007827094, 1975193539, 2555452411, 1341901877, 3045838698, 3776907964, 3217423946, 2802510864, 2889438986, 1057244207, 1636348243, 3761863214, 1462225785, 2632663439, 481089165, 718503062, 24497053, 3332243209, 3344655856, 3655024856, 3960371065, 1195698900, 2971415156, 3710176158, 2115785917, 4027663609, 3525578417, 2524296189, 2745972565, 3564906415, 1372086093, 1452307862, 2780501478, 1476592880, 3389271281, 18495466, 2378148571, 901398090, 891748256, 3279637769, 3157290713, 2560960102, 1447622437, 4284372637, 216884176, 2086908623, 1879786977, 3588903153, 2242455666, 2938092967, 3559082096, 2810645491, 758861177, 1121993112, 215018983, 642190776, 4169236812, 1196255959, 2081185372, 3508738393, 941322904, 4124243163, 2877523539, 1848581667, 2205260958, 3180453958, 2589345134, 3694731276, 550028657, 2519456284, 3789985535, 2973870856, 2093648313, 443148163, 46942275, 2734146937, 1117713533, 1115362972, 1523183689, 3717140224, 1551984063), f[1] = new Array(522195092, 4010518363, 1776537470, 960447360, 4267822970, 4005896314, 1435016340, 1929119313, 2913464185, 1310552629, 3579470798, 3724818106, 2579771631, 1594623892, 417127293, 2715217907, 2696228731, 1508390405, 3994398868, 3925858569, 3695444102, 4019471449, 3129199795, 3770928635, 3520741761, 990456497, 4187484609, 2783367035, 21106139, 3840405339, 631373633, 3783325702, 532942976, 396095098, 3548038825, 4267192484, 2564721535, 2011709262, 2039648873, 620404603, 3776170075, 2898526339, 3612357925, 4159332703, 1645490516, 223693667, 1567101217, 3362177881, 1029951347, 3470931136, 3570957959, 1550265121, 119497089, 972513919, 907948164, 3840628539, 1613718692, 3594177948, 465323573, 2659255085, 654439692, 2575596212, 2699288441, 3127702412, 277098644, 624404830, 4100943870, 2717858591, 546110314, 2403699828, 3655377447, 1321679412, 4236791657, 1045293279, 4010672264, 895050893, 2319792268, 494945126, 1914543101, 2777056443, 3894764339, 2219737618, 311263384, 4275257268, 3458730721, 669096869, 3584475730, 3835122877, 3319158237, 3949359204, 2005142349, 2713102337, 2228954793, 3769984788, 569394103, 3855636576, 1425027204, 108000370, 2736431443, 3671869269, 3043122623, 1750473702, 2211081108, 762237499, 3972989403, 2798899386, 3061857628, 2943854345, 867476300, 964413654, 1591880597, 1594774276, 2179821409, 552026980, 3026064248, 3726140315, 2283577634, 3110545105, 2152310760, 582474363, 1582640421, 1383256631, 2043843868, 3322775884, 1217180674, 463797851, 2763038571, 480777679, 2718707717, 2289164131, 3118346187, 214354409, 200212307, 3810608407, 3025414197, 2674075964, 3997296425, 1847405948, 1342460550, 510035443, 4080271814, 815934613, 833030224, 1620250387, 1945732119, 2703661145, 3966000196, 1388869545, 3456054182, 2687178561, 2092620194, 562037615, 1356438536, 3409922145, 3261847397, 1688467115, 2150901366, 631725691, 3840332284, 549916902, 3455104640, 394546491, 837744717, 2114462948, 751520235, 2221554606, 2415360136, 3999097078, 2063029875, 803036379, 2702586305, 821456707, 3019566164, 360699898, 4018502092, 3511869016, 3677355358, 2402471449, 812317050, 49299192, 2570164949, 3259169295, 2816732080, 3331213574, 3101303564, 2156015656, 3705598920, 3546263921, 143268808, 3200304480, 1638124008, 3165189453, 3341807610, 578956953, 2193977524, 3638120073, 2333881532, 807278310, 658237817, 2969561766, 1641658566, 11683945, 3086995007, 148645947, 1138423386, 4158756760, 1981396783, 2401016740, 3699783584, 380097457, 2680394679, 2803068651, 3334260286, 441530178, 4016580796, 1375954390, 761952171, 891809099, 2183123478, 157052462, 3683840763, 1592404427, 341349109, 2438483839, 1417898363, 644327628, 2233032776, 2353769706, 2201510100, 220455161, 1815641738, 182899273, 2995019788, 3627381533, 3702638151, 2890684138, 1052606899, 588164016, 1681439879, 4038439418, 2405343923, 4229449282, 167996282, 1336969661, 1688053129, 2739224926, 1543734051, 1046297529, 1138201970, 2121126012, 115334942, 1819067631, 1902159161, 1941945968, 2206692869, 1159982321), f[2] = new Array(2381300288, 637164959, 3952098751, 3893414151, 1197506559, 916448331, 2350892612, 2932787856, 3199334847, 4009478890, 3905886544, 1373570990, 2450425862, 4037870920, 3778841987, 2456817877, 286293407, 124026297, 3001279700, 1028597854, 3115296800, 4208886496, 2691114635, 2188540206, 1430237888, 1218109995, 3572471700, 308166588, 570424558, 2187009021, 2455094765, 307733056, 1310360322, 3135275007, 1384269543, 2388071438, 863238079, 2359263624, 2801553128, 3380786597, 2831162807, 1470087780, 1728663345, 4072488799, 1090516929, 532123132, 2389430977, 1132193179, 2578464191, 3051079243, 1670234342, 1434557849, 2711078940, 1241591150, 3314043432, 3435360113, 3091448339, 1812415473, 2198440252, 267246943, 796911696, 3619716990, 38830015, 1526438404, 2806502096, 374413614, 2943401790, 1489179520, 1603809326, 1920779204, 168801282, 260042626, 2358705581, 1563175598, 2397674057, 1356499128, 2217211040, 514611088, 2037363785, 2186468373, 4022173083, 2792511869, 2913485016, 1173701892, 4200428547, 3896427269, 1334932762, 2455136706, 602925377, 2835607854, 1613172210, 41346230, 2499634548, 2457437618, 2188827595, 41386358, 4172255629, 1313404830, 2405527007, 3801973774, 2217704835, 873260488, 2528884354, 2478092616, 4012915883, 2555359016, 2006953883, 2463913485, 575479328, 2218240648, 2099895446, 660001756, 2341502190, 3038761536, 3888151779, 3848713377, 3286851934, 1022894237, 1620365795, 3449594689, 1551255054, 15374395, 3570825345, 4249311020, 4151111129, 3181912732, 310226346, 1133119310, 530038928, 136043402, 2476768958, 3107506709, 2544909567, 1036173560, 2367337196, 1681395281, 1758231547, 3641649032, 306774401, 1575354324, 3716085866, 1990386196, 3114533736, 2455606671, 1262092282, 3124342505, 2768229131, 4210529083, 1833535011, 423410938, 660763973, 2187129978, 1639812e3, 3508421329, 3467445492, 310289298, 272797111, 2188552562, 2456863912, 310240523, 677093832, 1013118031, 901835429, 3892695601, 1116285435, 3036471170, 1337354835, 243122523, 520626091, 277223598, 4244441197, 4194248841, 1766575121, 594173102, 316590669, 742362309, 3536858622, 4176435350, 3838792410, 2501204839, 1229605004, 3115755532, 1552908988, 2312334149, 979407927, 3959474601, 1148277331, 176638793, 3614686272, 2083809052, 40992502, 1340822838, 2731552767, 3535757508, 3560899520, 1354035053, 122129617, 7215240, 2732932949, 3118912700, 2718203926, 2539075635, 3609230695, 3725561661, 1928887091, 2882293555, 1988674909, 2063640240, 2491088897, 1459647954, 4189817080, 2302804382, 1113892351, 2237858528, 1927010603, 4002880361, 1856122846, 1594404395, 2944033133, 3855189863, 3474975698, 1643104450, 4054590833, 3431086530, 1730235576, 2984608721, 3084664418, 2131803598, 4178205752, 267404349, 1617849798, 1616132681, 1462223176, 736725533, 2327058232, 551665188, 2945899023, 1749386277, 2575514597, 1611482493, 674206544, 2201269090, 3642560800, 728599968, 1680547377, 2620414464, 1388111496, 453204106, 4156223445, 1094905244, 2754698257, 2201108165, 3757000246, 2704524545, 3922940700, 3996465027), f[3] = new Array(2645754912, 532081118, 2814278639, 3530793624, 1246723035, 1689095255, 2236679235, 4194438865, 2116582143, 3859789411, 157234593, 2045505824, 4245003587, 1687664561, 4083425123, 605965023, 672431967, 1336064205, 3376611392, 214114848, 4258466608, 3232053071, 489488601, 605322005, 3998028058, 264917351, 1912574028, 756637694, 436560991, 202637054, 135989450, 85393697, 2152923392, 3896401662, 2895836408, 2145855233, 3535335007, 115294817, 3147733898, 1922296357, 3464822751, 4117858305, 1037454084, 2725193275, 2127856640, 1417604070, 1148013728, 1827919605, 642362335, 2929772533, 909348033, 1346338451, 3547799649, 297154785, 1917849091, 4161712827, 2883604526, 3968694238, 1469521537, 3780077382, 3375584256, 1763717519, 136166297, 4290970789, 1295325189, 2134727907, 2798151366, 1566297257, 3672928234, 2677174161, 2672173615, 965822077, 2780786062, 289653839, 1133871874, 3491843819, 35685304, 1068898316, 418943774, 672553190, 642281022, 2346158704, 1954014401, 3037126780, 4079815205, 2030668546, 3840588673, 672283427, 1776201016, 359975446, 3750173538, 555499703, 2769985273, 1324923, 69110472, 152125443, 3176785106, 3822147285, 1340634837, 798073664, 1434183902, 15393959, 216384236, 1303690150, 3881221631, 3711134124, 3960975413, 106373927, 2578434224, 1455997841, 1801814300, 1578393881, 1854262133, 3188178946, 3258078583, 2302670060, 1539295533, 3505142565, 3078625975, 2372746020, 549938159, 3278284284, 2620926080, 181285381, 2865321098, 3970029511, 68876850, 488006234, 1728155692, 2608167508, 836007927, 2435231793, 919367643, 3339422534, 3655756360, 1457871481, 40520939, 1380155135, 797931188, 234455205, 2255801827, 3990488299, 397000196, 739833055, 3077865373, 2871719860, 4022553888, 772369276, 390177364, 3853951029, 557662966, 740064294, 1640166671, 1699928825, 3535942136, 622006121, 3625353122, 68743880, 1742502, 219489963, 1664179233, 1577743084, 1236991741, 410585305, 2366487942, 823226535, 1050371084, 3426619607, 3586839478, 212779912, 4147118561, 1819446015, 1911218849, 530248558, 3486241071, 3252585495, 2886188651, 3410272728, 2342195030, 20547779, 2982490058, 3032363469, 3631753222, 312714466, 1870521650, 1493008054, 3491686656, 615382978, 4103671749, 2534517445, 1932181, 2196105170, 278426614, 6369430, 3274544417, 2913018367, 697336853, 2143000447, 2946413531, 701099306, 1558357093, 2805003052, 3500818408, 2321334417, 3567135975, 216290473, 3591032198, 23009561, 1996984579, 3735042806, 2024298078, 3739440863, 569400510, 2339758983, 3016033873, 3097871343, 3639523026, 3844324983, 3256173865, 795471839, 2951117563, 4101031090, 4091603803, 3603732598, 971261452, 534414648, 428311343, 3389027175, 2844869880, 694888862, 1227866773, 2456207019, 3043454569, 2614353370, 3749578031, 3676663836, 459166190, 4132644070, 1794958188, 51825668, 2252611902, 3084671440, 2036672799, 3436641603, 1099053433, 2469121526, 3059204941, 1323291266, 2061838604, 1018778475, 2233344254, 2553501054, 334295216, 3556750194, 1065731521, 183467730), f[4] = new Array(2127105028, 745436345, 2601412319, 2788391185, 3093987327, 500390133, 1155374404, 389092991, 150729210, 3891597772, 3523549952, 1935325696, 716645080, 946045387, 2901812282, 1774124410, 3869435775, 4039581901, 3293136918, 3438657920, 948246080, 363898952, 3867875531, 1286266623, 1598556673, 68334250, 630723836, 1104211938, 1312863373, 613332731, 2377784574, 1101634306, 441780740, 3129959883, 1917973735, 2510624549, 3238456535, 2544211978, 3308894634, 1299840618, 4076074851, 1756332096, 3977027158, 297047435, 3790297736, 2265573040, 3621810518, 1311375015, 1667687725, 47300608, 3299642885, 2474112369, 201668394, 1468347890, 576830978, 3594690761, 3742605952, 1958042578, 1747032512, 3558991340, 1408974056, 3366841779, 682131401, 1033214337, 1545599232, 4265137049, 206503691, 103024618, 2855227313, 1337551222, 2428998917, 2963842932, 4015366655, 3852247746, 2796956967, 3865723491, 3747938335, 247794022, 3755824572, 702416469, 2434691994, 397379957, 851939612, 2314769512, 218229120, 1380406772, 62274761, 214451378, 3170103466, 2276210409, 3845813286, 28563499, 446592073, 1693330814, 3453727194, 29968656, 3093872512, 220656637, 2470637031, 77972100, 1667708854, 1358280214, 4064765667, 2395616961, 325977563, 4277240721, 4220025399, 3605526484, 3355147721, 811859167, 3069544926, 3962126810, 652502677, 3075892249, 4132761541, 3498924215, 1217549313, 3250244479, 3858715919, 3053989961, 1538642152, 2279026266, 2875879137, 574252750, 3324769229, 2651358713, 1758150215, 141295887, 2719868960, 3515574750, 4093007735, 4194485238, 1082055363, 3417560400, 395511885, 2966884026, 179534037, 3646028556, 3738688086, 1092926436, 2496269142, 257381841, 3772900718, 1636087230, 1477059743, 2499234752, 3811018894, 2675660129, 3285975680, 90732309, 1684827095, 1150307763, 1723134115, 3237045386, 1769919919, 1240018934, 815675215, 750138730, 2239792499, 1234303040, 1995484674, 138143821, 675421338, 1145607174, 1936608440, 3238603024, 2345230278, 2105974004, 323969391, 779555213, 3004902369, 2861610098, 1017501463, 2098600890, 2628620304, 2940611490, 2682542546, 1171473753, 3656571411, 3687208071, 4091869518, 393037935, 159126506, 1662887367, 1147106178, 391545844, 3452332695, 1891500680, 3016609650, 1851642611, 546529401, 1167818917, 3194020571, 2848076033, 3953471836, 575554290, 475796850, 4134673196, 450035699, 2351251534, 844027695, 1080539133, 86184846, 1554234488, 3692025454, 1972511363, 2018339607, 1491841390, 1141460869, 1061690759, 4244549243, 2008416118, 2351104703, 2868147542, 1598468138, 722020353, 1027143159, 212344630, 1387219594, 1725294528, 3745187956, 2500153616, 458938280, 4129215917, 1828119673, 544571780, 3503225445, 2297937496, 1241802790, 267843827, 2694610800, 1397140384, 1558801448, 3782667683, 1806446719, 929573330, 2234912681, 400817706, 616011623, 4121520928, 3603768725, 1761550015, 1968522284, 4053731006, 4192232858, 4005120285, 872482584, 3140537016, 3894607381, 2287405443, 1963876937, 3663887957, 1584857e3, 2975024454, 1833426440, 4025083860), f[5] = new Array(4143615901, 749497569, 1285769319, 3795025788, 2514159847, 23610292, 3974978748, 844452780, 3214870880, 3751928557, 2213566365, 1676510905, 448177848, 3730751033, 4086298418, 2307502392, 871450977, 3222878141, 4110862042, 3831651966, 2735270553, 1310974780, 2043402188, 1218528103, 2736035353, 4274605013, 2702448458, 3936360550, 2693061421, 162023535, 2827510090, 687910808, 23484817, 3784910947, 3371371616, 779677500, 3503626546, 3473927188, 4157212626, 3500679282, 4248902014, 2466621104, 3899384794, 1958663117, 925738300, 1283408968, 3669349440, 1840910019, 137959847, 2679828185, 1239142320, 1315376211, 1547541505, 1690155329, 739140458, 3128809933, 3933172616, 3876308834, 905091803, 1548541325, 4040461708, 3095483362, 144808038, 451078856, 676114313, 2861728291, 2469707347, 993665471, 373509091, 2599041286, 4025009006, 4170239449, 2149739950, 3275793571, 3749616649, 2794760199, 1534877388, 572371878, 2590613551, 1753320020, 3467782511, 1405125690, 4270405205, 633333386, 3026356924, 3475123903, 632057672, 2846462855, 1404951397, 3882875879, 3915906424, 195638627, 2385783745, 3902872553, 1233155085, 3355999740, 2380578713, 2702246304, 2144565621, 3663341248, 3894384975, 2502479241, 4248018925, 3094885567, 1594115437, 572884632, 3385116731, 767645374, 1331858858, 1475698373, 3793881790, 3532746431, 1321687957, 619889600, 1121017241, 3440213920, 2070816767, 2833025776, 1933951238, 4095615791, 890643334, 3874130214, 859025556, 360630002, 925594799, 1764062180, 3920222280, 4078305929, 979562269, 2810700344, 4087740022, 1949714515, 546639971, 1165388173, 3069891591, 1495988560, 922170659, 1291546247, 2107952832, 1813327274, 3406010024, 3306028637, 4241950635, 153207855, 2313154747, 1608695416, 1150242611, 1967526857, 721801357, 1220138373, 3691287617, 3356069787, 2112743302, 3281662835, 1111556101, 1778980689, 250857638, 2298507990, 673216130, 2846488510, 3207751581, 3562756981, 3008625920, 3417367384, 2198807050, 529510932, 3547516680, 3426503187, 2364944742, 102533054, 2294910856, 1617093527, 1204784762, 3066581635, 1019391227, 1069574518, 1317995090, 1691889997, 3661132003, 510022745, 3238594800, 1362108837, 1817929911, 2184153760, 805817662, 1953603311, 3699844737, 120799444, 2118332377, 207536705, 2282301548, 4120041617, 145305846, 2508124933, 3086745533, 3261524335, 1877257368, 2977164480, 3160454186, 2503252186, 4221677074, 759945014, 254147243, 2767453419, 3801518371, 629083197, 2471014217, 907280572, 3900796746, 940896768, 2751021123, 2625262786, 3161476951, 3661752313, 3260732218, 1425318020, 2977912069, 1496677566, 3988592072, 2140652971, 3126511541, 3069632175, 977771578, 1392695845, 1698528874, 1411812681, 1369733098, 1343739227, 3620887944, 1142123638, 67414216, 3102056737, 3088749194, 1626167401, 2546293654, 3941374235, 697522451, 33404913, 143560186, 2595682037, 994885535, 1247667115, 3859094837, 2699155541, 3547024625, 4114935275, 2968073508, 3199963069, 2732024527, 1237921620, 951448369, 1898488916, 1211705605, 2790989240, 2233243581, 3598044975), f[6] = new Array(2246066201, 858518887, 1714274303, 3485882003, 713916271, 2879113490, 3730835617, 539548191, 36158695, 1298409750, 419087104, 1358007170, 749914897, 2989680476, 1261868530, 2995193822, 2690628854, 3443622377, 3780124940, 3796824509, 2976433025, 4259637129, 1551479e3, 512490819, 1296650241, 951993153, 2436689437, 2460458047, 144139966, 3136204276, 310820559, 3068840729, 643875328, 1969602020, 1680088954, 2185813161, 3283332454, 672358534, 198762408, 896343282, 276269502, 3014846926, 84060815, 197145886, 376173866, 3943890818, 3813173521, 3545068822, 1316698879, 1598252827, 2633424951, 1233235075, 859989710, 2358460855, 3503838400, 3409603720, 1203513385, 1193654839, 2792018475, 2060853022, 207403770, 1144516871, 3068631394, 1121114134, 177607304, 3785736302, 326409831, 1929119770, 2983279095, 4183308101, 3474579288, 3200513878, 3228482096, 119610148, 1170376745, 3378393471, 3163473169, 951863017, 3337026068, 3135789130, 2907618374, 1183797387, 2015970143, 4045674555, 2182986399, 2952138740, 3928772205, 384012900, 2454997643, 10178499, 2879818989, 2596892536, 111523738, 2995089006, 451689641, 3196290696, 235406569, 1441906262, 3890558523, 3013735005, 4158569349, 1644036924, 376726067, 1006849064, 3664579700, 2041234796, 1021632941, 1374734338, 2566452058, 371631263, 4007144233, 490221539, 206551450, 3140638584, 1053219195, 1853335209, 3412429660, 3562156231, 735133835, 1623211703, 3104214392, 2738312436, 4096837757, 3366392578, 3110964274, 3956598718, 3196820781, 2038037254, 3877786376, 2339753847, 300912036, 3766732888, 2372630639, 1516443558, 4200396704, 1574567987, 4069441456, 4122592016, 2699739776, 146372218, 2748961456, 2043888151, 35287437, 2596680554, 655490400, 1132482787, 110692520, 1031794116, 2188192751, 1324057718, 1217253157, 919197030, 686247489, 3261139658, 1028237775, 3135486431, 3059715558, 2460921700, 986174950, 2661811465, 4062904701, 2752986992, 3709736643, 367056889, 1353824391, 731860949, 1650113154, 1778481506, 784341916, 357075625, 3608602432, 1074092588, 2480052770, 3811426202, 92751289, 877911070, 3600361838, 1231880047, 480201094, 3756190983, 3094495953, 434011822, 87971354, 363687820, 1717726236, 1901380172, 3926403882, 2481662265, 400339184, 1490350766, 2661455099, 1389319756, 2558787174, 784598401, 1983468483, 30828846, 3550527752, 2716276238, 3841122214, 1765724805, 1955612312, 1277890269, 1333098070, 1564029816, 2704417615, 1026694237, 3287671188, 1260819201, 3349086767, 1016692350, 1582273796, 1073413053, 1995943182, 694588404, 1025494639, 3323872702, 3551898420, 4146854327, 453260480, 1316140391, 1435673405, 3038941953, 3486689407, 1622062951, 403978347, 817677117, 950059133, 4246079218, 3278066075, 1486738320, 1417279718, 481875527, 2549965225, 3933690356, 760697757, 1452955855, 3897451437, 1177426808, 1702951038, 4085348628, 2447005172, 1084371187, 3516436277, 3068336338, 1073369276, 1027665953, 3284188590, 1230553676, 1368340146, 2226246512, 267243139, 2274220762, 4070734279, 2497715176, 2423353163, 2504755875), f[7] = new Array(3793104909, 3151888380, 2817252029, 895778965, 2005530807, 3871412763, 237245952, 86829237, 296341424, 3851759377, 3974600970, 2475086196, 709006108, 1994621201, 2972577594, 937287164, 3734691505, 168608556, 3189338153, 2225080640, 3139713551, 3033610191, 3025041904, 77524477, 185966941, 1208824168, 2344345178, 1721625922, 3354191921, 1066374631, 1927223579, 1971335949, 2483503697, 1551748602, 2881383779, 2856329572, 3003241482, 48746954, 1398218158, 2050065058, 313056748, 4255789917, 393167848, 1912293076, 940740642, 3465845460, 3091687853, 2522601570, 2197016661, 1727764327, 364383054, 492521376, 1291706479, 3264136376, 1474851438, 1685747964, 2575719748, 1619776915, 1814040067, 970743798, 1561002147, 2925768690, 2123093554, 1880132620, 3151188041, 697884420, 2550985770, 2607674513, 2659114323, 110200136, 1489731079, 997519150, 1378877361, 3527870668, 478029773, 2766872923, 1022481122, 431258168, 1112503832, 897933369, 2635587303, 669726182, 3383752315, 918222264, 163866573, 3246985393, 3776823163, 114105080, 1903216136, 761148244, 3571337562, 1690750982, 3166750252, 1037045171, 1888456500, 2010454850, 642736655, 616092351, 365016990, 1185228132, 4174898510, 1043824992, 2023083429, 2241598885, 3863320456, 3279669087, 3674716684, 108438443, 2132974366, 830746235, 606445527, 4173263986, 2204105912, 1844756978, 2532684181, 4245352700, 2969441100, 3796921661, 1335562986, 4061524517, 2720232303, 2679424040, 634407289, 885462008, 3294724487, 3933892248, 2094100220, 339117932, 4048830727, 3202280980, 1458155303, 2689246273, 1022871705, 2464987878, 3714515309, 353796843, 2822958815, 4256850100, 4052777845, 551748367, 618185374, 3778635579, 4020649912, 1904685140, 3069366075, 2670879810, 3407193292, 2954511620, 4058283405, 2219449317, 3135758300, 1120655984, 3447565834, 1474845562, 3577699062, 550456716, 3466908712, 2043752612, 881257467, 869518812, 2005220179, 938474677, 3305539448, 3850417126, 1315485940, 3318264702, 226533026, 965733244, 321539988, 1136104718, 804158748, 573969341, 3708209826, 937399083, 3290727049, 2901666755, 1461057207, 4013193437, 4066861423, 3242773476, 2421326174, 1581322155, 3028952165, 786071460, 3900391652, 3918438532, 1485433313, 4023619836, 3708277595, 3678951060, 953673138, 1467089153, 1930354364, 1533292819, 2492563023, 1346121658, 1685000834, 1965281866, 3765933717, 4190206607, 2052792609, 3515332758, 690371149, 3125873887, 2180283551, 2903598061, 3933952357, 436236910, 289419410, 14314871, 1242357089, 2904507907, 1616633776, 2666382180, 585885352, 3471299210, 2699507360, 1432659641, 277164553, 3354103607, 770115018, 2303809295, 3741942315, 3177781868, 2853364978, 2269453327, 3774259834, 987383833, 1290892879, 225909803, 1741533526, 890078084, 1496906255, 1111072499, 916028167, 243534141, 1252605537, 2204162171, 531204876, 290011180, 3916834213, 102027703, 237315147, 209093447, 1486785922, 220223953, 2758195998, 4175039106, 82940208, 3127791296, 2569425252, 518464269, 1353887104, 3941492737, 2377294467, 3935040926)
                }
                function d(a) {
                    this.cast5 = new c, this.cast5.setKey(e.str2bin(a)), this.encrypt = function(a) {
                        return this.cast5.encrypt(a)
                    }
                }
                var e = a("../../util.js");
                b.exports = d, b.exports.blockSize = d.prototype.blockSize = 8, b.exports.keySize = d.prototype.keySize = 16
            }, {"../../util.js": 61}],9: [function(a, b) {
                function c(a, b, c, d, g, h) {
                    var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w = new Array(16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756), x = new Array(-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344), y = new Array(520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584), z = new Array(8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928), A = new Array(256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080), B = new Array(536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312), C = new Array(2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154), D = new Array(268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696), E = 0, F = b.length, G = 0, H = 32 == a.length ? 3 : 9;
                    for (p = 3 == H ? c ? new Array(0, 32, 2) : new Array(30, -2, -2) : c ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2), c && (b = e(b, h), F = b.length), result = "", tempresult = "", 1 == d && (q = g.charCodeAt(E++) << 24 | g.charCodeAt(E++) << 16 | g.charCodeAt(E++) << 8 | g.charCodeAt(E++), s = g.charCodeAt(E++) << 24 | g.charCodeAt(E++) << 16 | g.charCodeAt(E++) << 8 | g.charCodeAt(E++), E = 0); F > E; ) {
                        for (n = b.charCodeAt(E++) << 24 | b.charCodeAt(E++) << 16 | b.charCodeAt(E++) << 8 | b.charCodeAt(E++), o = b.charCodeAt(E++) << 24 | b.charCodeAt(E++) << 16 | b.charCodeAt(E++) << 8 | b.charCodeAt(E++), 1 == d && (c ? (n ^= q, o ^= s) : (r = q, t = s, q = n, s = o)), k = 252645135 & (n >>> 4 ^ o), o ^= k, n ^= k << 4, k = 65535 & (n >>> 16 ^ o), o ^= k, n ^= k << 16, k = 858993459 & (o >>> 2 ^ n), n ^= k, o ^= k << 2, k = 16711935 & (o >>> 8 ^ n), n ^= k, o ^= k << 8, k = 1431655765 & (n >>> 1 ^ o), o ^= k, n ^= k << 1, n = n << 1 | n >>> 31, o = o << 1 | o >>> 31, j = 0; H > j; j += 3) {
                            for (u = p[j + 1], v = p[j + 2], i = p[j]; i != u; i += v)
                                l = o ^ a[i], m = (o >>> 4 | o << 28) ^ a[i + 1], k = n, n = o, o = k ^ (x[l >>> 24 & 63] | z[l >>> 16 & 63] | B[l >>> 8 & 63] | D[63 & l] | w[m >>> 24 & 63] | y[m >>> 16 & 63] | A[m >>> 8 & 63] | C[63 & m]);
                            k = n, n = o, o = k
                        }
                        n = n >>> 1 | n << 31, o = o >>> 1 | o << 31, k = 1431655765 & (n >>> 1 ^ o), o ^= k, n ^= k << 1, k = 16711935 & (o >>> 8 ^ n), n ^= k, o ^= k << 8, k = 858993459 & (o >>> 2 ^ n), n ^= k, o ^= k << 2, k = 65535 & (n >>> 16 ^ o), o ^= k, n ^= k << 16, k = 252645135 & (n >>> 4 ^ o), o ^= k, n ^= k << 4, 1 == d && (c ? (q = n, s = o) : (n ^= r, o ^= t)), tempresult += String.fromCharCode(n >>> 24, n >>> 16 & 255, n >>> 8 & 255, 255 & n, o >>> 24, o >>> 16 & 255, o >>> 8 & 255, 255 & o), G += 8, 512 == G && (result += tempresult, tempresult = "", G = 0)
                    }
                    return result += tempresult, c || (result = f(result, h)), result
                }
                function d(a) {
                    pc2bytes0 = new Array(0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964), pc2bytes1 = new Array(0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697), pc2bytes2 = new Array(0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272), pc2bytes3 = new Array(0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144), pc2bytes4 = new Array(0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256), pc2bytes5 = new Array(0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488), pc2bytes6 = new Array(0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746), pc2bytes7 = new Array(0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568), pc2bytes8 = new Array(0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578), pc2bytes9 = new Array(0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488), pc2bytes10 = new Array(0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800), pc2bytes11 = new Array(0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744), pc2bytes12 = new Array(0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128), pc2bytes13 = new Array(0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261);
                    for (var b, c, d, e = a.length > 8 ? 3 : 1, f = new Array(32 * e), g = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0), h = 0, j = 0, k = 0; e > k; k++)
                        for (left = a.charCodeAt(h++) << 24 | a.charCodeAt(h++) << 16 | a.charCodeAt(h++) << 8 | a.charCodeAt(h++), right = a.charCodeAt(h++) << 24 | a.charCodeAt(h++) << 16 | a.charCodeAt(h++) << 8 | a.charCodeAt(h++), d = 252645135 & (left >>> 4 ^ right), right ^= d, left ^= d << 4, d = 65535 & (right >>> -16 ^ left), left ^= d, right ^= d << -16, d = 858993459 & (left >>> 2 ^ right), right ^= d, left ^= d << 2, d = 65535 & (right >>> -16 ^ left), left ^= d, right ^= d << -16, d = 1431655765 & (left >>> 1 ^ right), right ^= d, left ^= d << 1, d = 16711935 & (right >>> 8 ^ left), left ^= d, right ^= d << 8, d = 1431655765 & (left >>> 1 ^ right), right ^= d, left ^= d << 1, d = left << 8 | right >>> 20 & 240, left = right << 24 | right << 8 & 16711680 | right >>> 8 & 65280 | right >>> 24 & 240, right = d, i = 0; i < g.length; i++)
                            g[i] ? (left = left << 2 | left >>> 26, right = right << 2 | right >>> 26) : (left = left << 1 | left >>> 27, right = right << 1 | right >>> 27), left &= -15, right &= -15, b = pc2bytes0[left >>> 28] | pc2bytes1[left >>> 24 & 15] | pc2bytes2[left >>> 20 & 15] | pc2bytes3[left >>> 16 & 15] | pc2bytes4[left >>> 12 & 15] | pc2bytes5[left >>> 8 & 15] | pc2bytes6[left >>> 4 & 15], c = pc2bytes7[right >>> 28] | pc2bytes8[right >>> 24 & 15] | pc2bytes9[right >>> 20 & 15] | pc2bytes10[right >>> 16 & 15] | pc2bytes11[right >>> 12 & 15] | pc2bytes12[right >>> 8 & 15] | pc2bytes13[right >>> 4 & 15], d = 65535 & (c >>> 16 ^ b), f[j++] = b ^ d, f[j++] = c ^ d << 16;
                    return f
                }
                function e(a, b) {
                    var c = 8 - a.length % 8;
                    return 2 == b && 8 > c ? a += "        ".substr(0, c) : 1 == b ? a += String.fromCharCode(c, c, c, c, c, c, c, c).substr(0, c) : !b && 8 > c && (a += "\x00\x00\x00\x00\x00\x00\x00\x00".substr(0, c)), a
                }
                function f(a, b) {
                    if (2 == b)
                        a = a.replace(/ *$/g, "");
                    else if (1 == b) {
                        var c = a.charCodeAt(a.length - 1);
                        a = a.substr(0, a.length - c)
                    } else
                        b || (a = a.replace(/\0*$/g, ""));
                    return a
                }
                function g(a) {
                    this.key = [];
                    for (var b = 0; 3 > b; b++)
                        this.key.push(a.substr(8 * b, 8));
                    this.encrypt = function(a) {
                        return j.str2bin(c(d(this.key[2]), c(d(this.key[1]), c(d(this.key[0]), j.bin2str(a), !0, 0, null, null), !1, 0, null, null), !0, 0, null, null))
                    }
                }
                function h(a) {
                    this.key = a, this.encrypt = function(a, b) {
                        var e = d(this.key);
                        return j.str2bin(c(e, j.bin2str(a), !0, 0, null, b))
                    }, this.decrypt = function(a, b) {
                        var e = d(this.key);
                        return j.str2bin(c(e, j.bin2str(a), !1, 0, null, b))
                    }
                }
                var j = a("../../util.js");
                g.keySize = g.prototype.keySize = 24, g.blockSize = g.prototype.blockSize = 8, b.exports = {des: g,originalDes: h}
            }, {"../../util.js": 61}],10: [function(a, b) {
                var c = a("./des.js");
                b.exports = {des: c.originalDes,tripledes: c.des,cast5: a("./cast5.js"),twofish: a("./twofish.js"),blowfish: a("./blowfish.js")};
                var d = a("./aes.js");
                for (var e in d)
                    b.exports["aes" + e] = d[e]
            }, {"./aes.js": 6,"./blowfish.js": 7,"./cast5.js": 8,"./des.js": 9,"./twofish.js": 11}],11: [function(a, b) {
                function c(a, b) {
                    return (a << b | a >>> 32 - b) & i
                }
                function d(a, b) {
                    return a[b] | a[b + 1] << 8 | a[b + 2] << 16 | a[b + 3] << 24
                }
                function e(a, b, c) {
                    a.splice(b, 4, 255 & c, c >>> 8 & 255, c >>> 16 & 255, c >>> 24 & 255)
                }
                function f(a, b) {
                    return a >>> 8 * b & 255
                }
                function g() {
                    function a(a) {
                        function b(a) {
                            return a ^ a >> 2 ^ [0, 90, 180, 238][3 & a]
                        }
                        function e(a) {
                            return a ^ a >> 1 ^ a >> 2 ^ [0, 238, 180, 90][3 & a]
                        }
                        function g(a, b) {
                            var c, d, e;
                            for (c = 0; 8 > c; c++)
                                d = b >>> 24, b = b << 8 & i | a >>> 24, a = a << 8 & i, e = d << 1, 128 & d && (e ^= 333), b ^= d ^ e << 16, e ^= d >>> 1, 1 & d && (e ^= 166), b ^= e << 24 | e << 8;
                            return b
                        }
                        function h(a, b) {
                            var c, d, e, f;
                            return c = b >> 4, d = 15 & b, e = A[a][c ^ d], f = B[a][E[d] ^ F[c]], D[a][E[f] ^ F[e]] << 4 | C[a][e ^ f]
                        }
                        function j(a, b) {
                            var c = f(a, 0), d = f(a, 1), e = f(a, 2), g = f(a, 3);
                            switch (q) {
                                case 4:
                                    c = G[1][c] ^ f(b[3], 0), d = G[0][d] ^ f(b[3], 1), e = G[0][e] ^ f(b[3], 2), g = G[1][g] ^ f(b[3], 3);
                                case 3:
                                    c = G[1][c] ^ f(b[2], 0), d = G[1][d] ^ f(b[2], 1), e = G[0][e] ^ f(b[2], 2), g = G[0][g] ^ f(b[2], 3);
                                case 2:
                                    c = G[0][G[0][c] ^ f(b[1], 0)] ^ f(b[0], 0), d = G[0][G[1][d] ^ f(b[1], 1)] ^ f(b[0], 1), e = G[1][G[0][e] ^ f(b[1], 2)] ^ f(b[0], 2), g = G[1][G[1][g] ^ f(b[1], 3)] ^ f(b[0], 3)
                            }
                            return H[0][c] ^ H[1][d] ^ H[2][e] ^ H[3][g]
                        }
                        o = a;
                        var k, l, m, n, p, q, r, u, v, w = [], x = [], y = [], z = [], A = [[8, 1, 7, 13, 6, 15, 3, 2, 0, 11, 5, 9, 14, 12, 10, 4], [2, 8, 11, 13, 15, 7, 6, 14, 3, 1, 9, 4, 0, 10, 12, 5]], B = [[14, 12, 11, 8, 1, 2, 3, 5, 15, 4, 10, 6, 7, 0, 9, 13], [1, 14, 2, 11, 4, 12, 3, 7, 6, 13, 10, 5, 15, 9, 0, 8]], C = [[11, 10, 5, 14, 6, 13, 9, 0, 12, 8, 15, 3, 2, 4, 7, 1], [4, 12, 7, 5, 1, 6, 9, 10, 0, 14, 13, 8, 2, 11, 3, 15]], D = [[13, 7, 15, 4, 1, 2, 6, 14, 9, 11, 3, 0, 8, 5, 12, 10], [11, 9, 5, 1, 12, 3, 13, 14, 6, 4, 7, 15, 2, 0, 8, 10]], E = [0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14, 7, 15], F = [0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 5, 14, 7], G = [[], []], H = [[], [], [], []];
                        for (o = o.slice(0, 32), k = o.length; 16 != k && 24 != k && 32 != k; )
                            o[k++] = 0;
                        for (k = 0; k < o.length; k += 4)
                            y[k >> 2] = d(o, k);
                        for (k = 0; 256 > k; k++)
                            G[0][k] = h(0, k), G[1][k] = h(1, k);
                        for (k = 0; 256 > k; k++)
                            r = G[1][k], u = b(r), v = e(r), H[0][k] = r + (u << 8) + (v << 16) + (v << 24), H[2][k] = u + (v << 8) + (r << 16) + (v << 24), r = G[0][k], u = b(r), v = e(r), H[1][k] = v + (v << 8) + (u << 16) + (r << 24), H[3][k] = u + (r << 8) + (v << 16) + (u << 24);
                        for (q = y.length / 2, k = 0; q > k; k++)
                            l = y[k + k], w[k] = l, m = y[k + k + 1], x[k] = m, z[q - k - 1] = g(l, m);
                        for (k = 0; 40 > k; k += 2)
                            l = 16843009 * k, m = l + 16843009, l = j(l, w), m = c(j(m, x), 8), s[k] = l + m & i, s[k + 1] = c(l + 2 * m, 9);
                        for (k = 0; 256 > k; k++)
                            switch (l = m = n = p = k, q) {
                                case 4:
                                    l = G[1][l] ^ f(z[3], 0), m = G[0][m] ^ f(z[3], 1), n = G[0][n] ^ f(z[3], 2), p = G[1][p] ^ f(z[3], 3);
                                case 3:
                                    l = G[1][l] ^ f(z[2], 0), m = G[1][m] ^ f(z[2], 1), n = G[0][n] ^ f(z[2], 2), p = G[0][p] ^ f(z[2], 3);
                                case 2:
                                    t[0][k] = H[0][G[0][G[0][l] ^ f(z[1], 0)] ^ f(z[0], 0)], t[1][k] = H[1][G[0][G[1][m] ^ f(z[1], 1)] ^ f(z[0], 1)], t[2][k] = H[2][G[1][G[0][n] ^ f(z[1], 2)] ^ f(z[0], 2)], t[3][k] = H[3][G[1][G[1][p] ^ f(z[1], 3)] ^ f(z[0], 3)]
                            }
                    }
                    function b(a) {
                        return t[0][f(a, 0)] ^ t[1][f(a, 1)] ^ t[2][f(a, 2)] ^ t[3][f(a, 3)]
                    }
                    function g(a) {
                        return t[0][f(a, 3)] ^ t[1][f(a, 0)] ^ t[2][f(a, 1)] ^ t[3][f(a, 2)]
                    }
                    function h(a, d) {
                        var e = b(d[0]), f = g(d[1]);
                        d[2] = c(d[2] ^ e + f + s[4 * a + 8] & i, 31), d[3] = c(d[3], 1) ^ e + 2 * f + s[4 * a + 9] & i, e = b(d[2]), f = g(d[3]), d[0] = c(d[0] ^ e + f + s[4 * a + 10] & i, 31), d[1] = c(d[1], 1) ^ e + 2 * f + s[4 * a + 11] & i
                    }
                    function j(a, d) {
                        var e = b(d[0]), f = g(d[1]);
                        d[2] = c(d[2], 1) ^ e + f + s[4 * a + 10] & i, d[3] = c(d[3] ^ e + 2 * f + s[4 * a + 11] & i, 31), e = b(d[2]), f = g(d[3]), d[0] = c(d[0], 1) ^ e + f + s[4 * a + 8] & i, d[1] = c(d[1] ^ e + 2 * f + s[4 * a + 9] & i, 31)
                    }
                    function k() {
                        s = [], t = [[], [], [], []]
                    }
                    function l(a, b) {
                        p = a, q = b;
                        for (var c = [d(p, q) ^ s[0], d(p, q + 4) ^ s[1], d(p, q + 8) ^ s[2], d(p, q + 12) ^ s[3]], f = 0; 8 > f; f++)
                            h(f, c);
                        return e(p, q, c[2] ^ s[4]), e(p, q + 4, c[3] ^ s[5]), e(p, q + 8, c[0] ^ s[6]), e(p, q + 12, c[1] ^ s[7]), q += 16, p
                    }
                    function m(a, b) {
                        p = a, q = b;
                        for (var c = [d(p, q) ^ s[4], d(p, q + 4) ^ s[5], d(p, q + 8) ^ s[6], d(p, q + 12) ^ s[7]], f = 7; f >= 0; f--)
                            j(f, c);
                        e(p, q, c[2] ^ s[0]), e(p, q + 4, c[3] ^ s[1]), e(p, q + 8, c[0] ^ s[2]), e(p, q + 12, c[1] ^ s[3]), q += 16
                    }
                    function n() {
                        return p
                    }
                    var o = null, p = null, q = -1, r = null;
                    r = "twofish";
                    var s = [], t = [[], [], [], []];
                    return {name: "twofish",blocksize: 16,open: a,close: k,encrypt: l,decrypt: m,finalize: n}
                }
                function h(a) {
                    this.tf = g(), this.tf.open(j.str2bin(a), 0), this.encrypt = function(a) {
                        return this.tf.encrypt([].concat(a), 0)
                    }
                }
                var i = 4294967295, j = a("../../util.js");
                b.exports = h, b.exports.keySize = h.prototype.keySize = 32, b.exports.blockSize = h.prototype.blockSize = 16
            }, {"../../util.js": 61}],12: [function(a, b) {
                var c = a("./random.js"), d = a("./cipher"), e = a("./public_key"), f = a("../type/mpi.js");
                b.exports = {publicKeyEncrypt: function(a, b, c) {
                        var d = function() {
                            var d;
                            switch (a) {
                                case "rsa_encrypt":
                                case "rsa_encrypt_sign":
                                    var f = new e.rsa, g = b[0].toBigInteger(), h = b[1].toBigInteger();
                                    return d = c.toBigInteger(), [f.encrypt(d, h, g)];
                                case "elgamal":
                                    var i = new e.elgamal, j = b[0].toBigInteger(), k = b[1].toBigInteger(), l = b[2].toBigInteger();
                                    return d = c.toBigInteger(), i.encrypt(d, k, j, l);
                                default:
                                    return []
                            }
                        }();
                        return d.map(function(a) {
                            var b = new f;
                            return b.fromBigInteger(a), b
                        })
                    },publicKeyDecrypt: function(a, b, c) {
                        var d, g = function() {
                            switch (a) {
                                case "rsa_encrypt_sign":
                                case "rsa_encrypt":
                                    var f = new e.rsa, g = b[2].toBigInteger();
                                    d = b[3].toBigInteger();
                                    var h = b[4].toBigInteger(), i = b[5].toBigInteger(), j = c[0].toBigInteger();
                                    return f.decrypt(j, g, d, h, i);
                                case "elgamal":
                                    var k = new e.elgamal, l = b[3].toBigInteger(), m = c[0].toBigInteger(), n = c[1].toBigInteger();
                                    return d = b[0].toBigInteger(), k.decrypt(m, n, d, l);
                                default:
                                    return null
                            }
                        }(), h = new f;
                        return h.fromBigInteger(g), h
                    },getPrivateMpiCount: function(a) {
                        switch (a) {
                            case "rsa_encrypt":
                            case "rsa_encrypt_sign":
                            case "rsa_sign":
                                return 4;
                            case "elgamal":
                                return 1;
                            case "dsa":
                                return 1;
                            default:
                                throw new Error("Unknown algorithm")
                        }
                    },getPublicMpiCount: function(a) {
                        switch (a) {
                            case "rsa_encrypt":
                            case "rsa_encrypt_sign":
                            case "rsa_sign":
                                return 2;
                            case "elgamal":
                                return 3;
                            case "dsa":
                                return 4;
                            default:
                                throw new Error("Unknown algorithm.")
                        }
                    },generateMpi: function(a, b) {
                        var c = function() {
                            switch (a) {
                                case "rsa_encrypt":
                                case "rsa_encrypt_sign":
                                case "rsa_sign":
                                    var c = new e.rsa, d = c.generate(b, "10001"), f = [];
                                    return f.push(d.n), f.push(d.ee), f.push(d.d), f.push(d.p), f.push(d.q), f.push(d.u), f;
                                default:
                                    throw new Error("Unsupported algorithm for key generation.")
                            }
                        }();
                        return c.map(function(a) {
                            var b = new f;
                            return b.fromBigInteger(a), b
                        })
                    },getPrefixRandom: function(a) {
                        return c.getRandomBytes(d[a].blockSize)
                    },generateSessionKey: function(a) {
                        return c.getRandomBytes(d[a].keySize)
                    }}
            }, {"../type/mpi.js": 59,"./cipher": 10,"./public_key": 23,"./random.js": 26}],13: [function(a, b) {
                var c = b.exports = {}, d = a("./forge_util.js"), e = null, f = !1, g = null, h = function() {
                    e = String.fromCharCode(128), e += d.fillString(String.fromCharCode(0), 64), g = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], f = !0
                }, i = function(a, b, c) {
                    for (var d, e, f, h, i, j, k, l, m, n, o, p, q, r, s, t = c.length(); t >= 64; ) {
                        for (k = 0; 16 > k; ++k)
                            b[k] = c.getInt32();
                        for (; 64 > k; ++k)
                            d = b[k - 2], d = (d >>> 17 | d << 15) ^ (d >>> 19 | d << 13) ^ d >>> 10, e = b[k - 15], e = (e >>> 7 | e << 25) ^ (e >>> 18 | e << 14) ^ e >>> 3, b[k] = d + b[k - 7] + e + b[k - 16] & 4294967295;
                        for (l = a.h0, m = a.h1, n = a.h2, o = a.h3, p = a.h4, q = a.h5, r = a.h6, s = a.h7, k = 0; 64 > k; ++k)
                            h = (p >>> 6 | p << 26) ^ (p >>> 11 | p << 21) ^ (p >>> 25 | p << 7), i = r ^ p & (q ^ r), f = (l >>> 2 | l << 30) ^ (l >>> 13 | l << 19) ^ (l >>> 22 | l << 10), j = l & m | n & (l ^ m), d = s + h + i + g[k] + b[k], e = f + j, s = r, r = q, q = p, p = o + d & 4294967295, o = n, n = m, m = l, l = d + e & 4294967295;
                        a.h0 = a.h0 + l & 4294967295, a.h1 = a.h1 + m & 4294967295, a.h2 = a.h2 + n & 4294967295, a.h3 = a.h3 + o & 4294967295, a.h4 = a.h4 + p & 4294967295, a.h5 = a.h5 + q & 4294967295, a.h6 = a.h6 + r & 4294967295, a.h7 = a.h7 + s & 4294967295, t -= 64
                    }
                };
                c.create = function() {
                    f || h();
                    var a = null, b = d.createBuffer(), c = new Array(64), g = {algorithm: "sha256",blockLength: 64,digestLength: 32,messageLength: 0};
                    return g.start = function() {
                        return g.messageLength = 0, b = d.createBuffer(), a = {h0: 1779033703,h1: 3144134277,h2: 1013904242,h3: 2773480762,h4: 1359893119,h5: 2600822924,h6: 528734635,h7: 1541459225}, g
                    }, g.start(), g.update = function(e, f) {
                        return "utf8" === f && (e = d.encodeUtf8(e)), g.messageLength += e.length, b.putBytes(e), i(a, c, b), (b.read > 2048 || 0 === b.length()) && b.compact(), g
                    }, g.digest = function() {
                        var f = g.messageLength, h = d.createBuffer();
                        h.putBytes(b.bytes()), h.putBytes(e.substr(0, 64 - (f + 8) % 64)), h.putInt32(f >>> 29 & 255), h.putInt32(f << 3 & 4294967295);
                        var j = {h0: a.h0,h1: a.h1,h2: a.h2,h3: a.h3,h4: a.h4,h5: a.h5,h6: a.h6,h7: a.h7};
                        i(j, c, h);
                        var k = d.createBuffer();
                        return k.putInt32(j.h0), k.putInt32(j.h1), k.putInt32(j.h2), k.putInt32(j.h3), k.putInt32(j.h4), k.putInt32(j.h5), k.putInt32(j.h6), k.putInt32(j.h7), k
                    }, g
                }
            }, {"./forge_util.js": 14}],14: [function(a, b) {
                var c = b.exports = {};
                c.isArray = Array.isArray || function(a) {
                    return "[object Array]" === Object.prototype.toString.call(a)
                }, c.isArrayBuffer = function(a) {
                    return "undefined" != typeof ArrayBuffer && a instanceof ArrayBuffer
                };
                var d = [];
                "undefined" != typeof Int8Array && d.push(Int8Array), "undefined" != typeof Uint8Array && d.push(Uint8Array), "undefined" != typeof Uint8ClampedArray && d.push(Uint8ClampedArray), "undefined" != typeof Int16Array && d.push(Int16Array), "undefined" != typeof Uint16Array && d.push(Uint16Array), "undefined" != typeof Int32Array && d.push(Int32Array), "undefined" != typeof Uint32Array && d.push(Uint32Array), "undefined" != typeof Float32Array && d.push(Float32Array), "undefined" != typeof Float64Array && d.push(Float64Array), c.isArrayBufferView = function(a) {
                    for (var b = 0; b < d.length; ++b)
                        if (a instanceof d[b])
                            return !0;
                    return !1
                }, c.ByteBuffer = function(a) {
                    if (this.data = "", this.read = 0, "string" == typeof a)
                        this.data = a;
                    else if (c.isArrayBuffer(a) || c.isArrayBufferView(a)) {
                        var b = new Uint8Array(a);
                        try {
                            this.data = String.fromCharCode.apply(null, b)
                        } catch (d) {
                            for (var e = 0; e < b.length; ++e)
                                this.putByte(b[e])
                        }
                    }
                }, c.ByteBuffer.prototype.length = function() {
                    return this.data.length - this.read
                }, c.ByteBuffer.prototype.isEmpty = function() {
                    return this.length() <= 0
                }, c.ByteBuffer.prototype.putByte = function(a) {
                    return this.data += String.fromCharCode(a), this
                }, c.ByteBuffer.prototype.fillWithByte = function(a, b) {
                    a = String.fromCharCode(a);
                    for (var c = this.data; b > 0; )
                        1 & b && (c += a), b >>>= 1, b > 0 && (a += a);
                    return this.data = c, this
                }, c.ByteBuffer.prototype.putBytes = function(a) {
                    return this.data += a, this
                }, c.ByteBuffer.prototype.putString = function(a) {
                    return this.data += c.encodeUtf8(a), this
                }, c.ByteBuffer.prototype.putInt16 = function(a) {
                    return this.data += String.fromCharCode(a >> 8 & 255) + String.fromCharCode(255 & a), this
                }, c.ByteBuffer.prototype.putInt24 = function(a) {
                    return this.data += String.fromCharCode(a >> 16 & 255) + String.fromCharCode(a >> 8 & 255) + String.fromCharCode(255 & a), this
                }, c.ByteBuffer.prototype.putInt32 = function(a) {
                    return this.data += String.fromCharCode(a >> 24 & 255) + String.fromCharCode(a >> 16 & 255) + String.fromCharCode(a >> 8 & 255) + String.fromCharCode(255 & a), this
                }, c.ByteBuffer.prototype.putInt16Le = function(a) {
                    return this.data += String.fromCharCode(255 & a) + String.fromCharCode(a >> 8 & 255), this
                }, c.ByteBuffer.prototype.putInt24Le = function(a) {
                    return this.data += String.fromCharCode(255 & a) + String.fromCharCode(a >> 8 & 255) + String.fromCharCode(a >> 16 & 255), this
                }, c.ByteBuffer.prototype.putInt32Le = function(a) {
                    return this.data += String.fromCharCode(255 & a) + String.fromCharCode(a >> 8 & 255) + String.fromCharCode(a >> 16 & 255) + String.fromCharCode(a >> 24 & 255), this
                }, c.ByteBuffer.prototype.putInt = function(a, b) {
                    do
                        b -= 8, this.data += String.fromCharCode(a >> b & 255);
                    while (b > 0);
                    return this
                }, c.ByteBuffer.prototype.putSignedInt = function(a, b) {
                    return 0 > a && (a += 2 << b - 1), this.putInt(a, b)
                }, c.ByteBuffer.prototype.putBuffer = function(a) {
                    return this.data += a.getBytes(), this
                }, c.ByteBuffer.prototype.getByte = function() {
                    return this.data.charCodeAt(this.read++)
                }, c.ByteBuffer.prototype.getInt16 = function() {
                    var a = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
                    return this.read += 2, a
                }, c.ByteBuffer.prototype.getInt24 = function() {
                    var a = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
                    return this.read += 3, a
                }, c.ByteBuffer.prototype.getInt32 = function() {
                    var a = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
                    return this.read += 4, a
                }, c.ByteBuffer.prototype.getInt16Le = function() {
                    var a = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
                    return this.read += 2, a
                }, c.ByteBuffer.prototype.getInt24Le = function() {
                    var a = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
                    return this.read += 3, a
                }, c.ByteBuffer.prototype.getInt32Le = function() {
                    var a = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
                    return this.read += 4, a
                }, c.ByteBuffer.prototype.getInt = function(a) {
                    var b = 0;
                    do
                        b = (b << 8) + this.data.charCodeAt(this.read++), a -= 8;
                    while (a > 0);
                    return b
                }, c.ByteBuffer.prototype.getSignedInt = function(a) {
                    var b = this.getInt(a), c = 2 << a - 2;
                    return b >= c && (b -= c << 1), b
                }, c.ByteBuffer.prototype.getBytes = function(a) {
                    var b;
                    return a ? (a = Math.min(this.length(), a), b = this.data.slice(this.read, this.read + a), this.read += a) : 0 === a ? b = "" : (b = 0 === this.read ? this.data : this.data.slice(this.read), this.clear()), b
                }, c.ByteBuffer.prototype.bytes = function(a) {
                    return "undefined" == typeof a ? this.data.slice(this.read) : this.data.slice(this.read, this.read + a)
                }, c.ByteBuffer.prototype.at = function(a) {
                    return this.data.charCodeAt(this.read + a)
                }, c.ByteBuffer.prototype.setAt = function(a, b) {
                    return this.data = this.data.substr(0, this.read + a) + String.fromCharCode(b) + this.data.substr(this.read + a + 1), this
                }, c.ByteBuffer.prototype.last = function() {
                    return this.data.charCodeAt(this.data.length - 1)
                }, c.ByteBuffer.prototype.copy = function() {
                    var a = c.createBuffer(this.data);
                    return a.read = this.read, a
                }, c.ByteBuffer.prototype.compact = function() {
                    return this.read > 0 && (this.data = this.data.slice(this.read), this.read = 0), this
                }, c.ByteBuffer.prototype.clear = function() {
                    return this.data = "", this.read = 0, this
                }, c.ByteBuffer.prototype.truncate = function(a) {
                    var b = Math.max(0, this.length() - a);
                    return this.data = this.data.substr(this.read, b), this.read = 0, this
                }, c.ByteBuffer.prototype.toHex = function() {
                    for (var a = "", b = this.read; b < this.data.length; ++b) {
                        var c = this.data.charCodeAt(b);
                        16 > c && (a += "0"), a += c.toString(16)
                    }
                    return a
                }, c.ByteBuffer.prototype.toString = function() {
                    return c.decodeUtf8(this.bytes())
                }, c.createBuffer = function(a, b) {
                    return b = b || "raw", void 0 !== a && "utf8" === b && (a = c.encodeUtf8(a)), new c.ByteBuffer(a)
                }, c.fillString = function(a, b) {
                    for (var c = ""; b > 0; )
                        1 & b && (c += a), b >>>= 1, b > 0 && (a += a);
                    return c
                }, c.xorBytes = function(a, b, c) {
                    for (var d = "", e = "", f = "", g = 0, h = 0; c > 0; --c, ++g)
                        e = a.charCodeAt(g) ^ b.charCodeAt(g), h >= 10 && (d += f, f = "", h = 0), f += String.fromCharCode(e), ++h;
                    return d += f
                }, c.hexToBytes = function(a) {
                    var b = "", c = 0;
                    for (a.length & !0 && (c = 1, b += String.fromCharCode(parseInt(a[0], 16))); c < a.length; c += 2)
                        b += String.fromCharCode(parseInt(a.substr(c, 2), 16));
                    return b
                }, c.bytesToHex = function(a) {
                    return c.createBuffer(a).toHex()
                }, c.int32ToBytes = function(a) {
                    return String.fromCharCode(a >> 24 & 255) + String.fromCharCode(a >> 16 & 255) + String.fromCharCode(a >> 8 & 255) + String.fromCharCode(255 & a)
                };
                var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", f = [62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 64, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
                c.encode64 = function(a, b) {
                    for (var c, d, f, g = "", h = "", i = 0; i < a.length; )
                        c = a.charCodeAt(i++), d = a.charCodeAt(i++), f = a.charCodeAt(i++), g += e.charAt(c >> 2), g += e.charAt((3 & c) << 4 | d >> 4), isNaN(d) ? g += "==" : (g += e.charAt((15 & d) << 2 | f >> 6), g += isNaN(f) ? "=" : e.charAt(63 & f)), b && g.length > b && (h += g.substr(0, b) + "\r\n", g = g.substr(b));
                    return h += g
                }, c.decode64 = function(a) {
                    a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                    for (var b, c, d, e, g = "", h = 0; h < a.length; )
                        b = f[a.charCodeAt(h++) - 43], c = f[a.charCodeAt(h++) - 43], d = f[a.charCodeAt(h++) - 43], e = f[a.charCodeAt(h++) - 43], g += String.fromCharCode(b << 2 | c >> 4), 64 !== d && (g += String.fromCharCode((15 & c) << 4 | d >> 2), 64 !== e && (g += String.fromCharCode((3 & d) << 6 | e)));
                    return g
                }, c.encodeUtf8 = function(a) {
                    return unescape(encodeURIComponent(a))
                }, c.decodeUtf8 = function(a) {
                    return decodeURIComponent(escape(a))
                }
            }, {}],15: [function(a, b) {
                var c = a("./sha.js"), d = a("./forge_sha256.js");
                b.exports = {md5: a("./md5.js"),sha1: c.sha1,sha224: c.sha224,sha256: c.sha256,sha384: c.sha384,sha512: c.sha512,ripemd: a("./ripe-md.js"),digest: function(a, b) {
                        switch (a) {
                            case 1:
                                return this.md5(b);
                            case 2:
                                return this.sha1(b);
                            case 3:
                                return this.ripemd(b);
                            case 8:
                                var c = d.create();
                                return c.update(b), c.digest().getBytes();
                            case 9:
                                return this.sha384(b);
                            case 10:
                                return this.sha512(b);
                            case 11:
                                return this.sha224(b);
                            default:
                                throw new Error("Invalid hash function.")
                        }
                    },getHashByteLength: function(a) {
                        switch (a) {
                            case 1:
                                return 16;
                            case 2:
                            case 3:
                                return 20;
                            case 8:
                                return 32;
                            case 9:
                                return 48;
                            case 10:
                                return 64;
                            case 11:
                                return 28;
                            default:
                                throw new Error("Invalid hash algorithm.")
                        }
                    }}
            }, {"./forge_sha256.js": 13,"./md5.js": 16,"./ripe-md.js": 17,"./sha.js": 18}],16: [function(a, b) {
                function c(a, b) {
                    var c = a[0], d = a[1], i = a[2], j = a[3];
                    c = e(c, d, i, j, b[0], 7, -680876936), j = e(j, c, d, i, b[1], 12, -389564586), i = e(i, j, c, d, b[2], 17, 606105819), d = e(d, i, j, c, b[3], 22, -1044525330), c = e(c, d, i, j, b[4], 7, -176418897), j = e(j, c, d, i, b[5], 12, 1200080426), i = e(i, j, c, d, b[6], 17, -1473231341), d = e(d, i, j, c, b[7], 22, -45705983), c = e(c, d, i, j, b[8], 7, 1770035416), j = e(j, c, d, i, b[9], 12, -1958414417), i = e(i, j, c, d, b[10], 17, -42063), d = e(d, i, j, c, b[11], 22, -1990404162), c = e(c, d, i, j, b[12], 7, 1804603682), j = e(j, c, d, i, b[13], 12, -40341101), i = e(i, j, c, d, b[14], 17, -1502002290), d = e(d, i, j, c, b[15], 22, 1236535329), c = f(c, d, i, j, b[1], 5, -165796510), j = f(j, c, d, i, b[6], 9, -1069501632), i = f(i, j, c, d, b[11], 14, 643717713), d = f(d, i, j, c, b[0], 20, -373897302), c = f(c, d, i, j, b[5], 5, -701558691), j = f(j, c, d, i, b[10], 9, 38016083), i = f(i, j, c, d, b[15], 14, -660478335), d = f(d, i, j, c, b[4], 20, -405537848), c = f(c, d, i, j, b[9], 5, 568446438), j = f(j, c, d, i, b[14], 9, -1019803690), i = f(i, j, c, d, b[3], 14, -187363961), d = f(d, i, j, c, b[8], 20, 1163531501), c = f(c, d, i, j, b[13], 5, -1444681467), j = f(j, c, d, i, b[2], 9, -51403784), i = f(i, j, c, d, b[7], 14, 1735328473), d = f(d, i, j, c, b[12], 20, -1926607734), c = g(c, d, i, j, b[5], 4, -378558), j = g(j, c, d, i, b[8], 11, -2022574463), i = g(i, j, c, d, b[11], 16, 1839030562), d = g(d, i, j, c, b[14], 23, -35309556), c = g(c, d, i, j, b[1], 4, -1530992060), j = g(j, c, d, i, b[4], 11, 1272893353), i = g(i, j, c, d, b[7], 16, -155497632), d = g(d, i, j, c, b[10], 23, -1094730640), c = g(c, d, i, j, b[13], 4, 681279174), j = g(j, c, d, i, b[0], 11, -358537222), i = g(i, j, c, d, b[3], 16, -722521979), d = g(d, i, j, c, b[6], 23, 76029189), c = g(c, d, i, j, b[9], 4, -640364487), j = g(j, c, d, i, b[12], 11, -421815835), i = g(i, j, c, d, b[15], 16, 530742520), d = g(d, i, j, c, b[2], 23, -995338651), c = h(c, d, i, j, b[0], 6, -198630844), j = h(j, c, d, i, b[7], 10, 1126891415), i = h(i, j, c, d, b[14], 15, -1416354905), d = h(d, i, j, c, b[5], 21, -57434055), c = h(c, d, i, j, b[12], 6, 1700485571), j = h(j, c, d, i, b[3], 10, -1894986606), i = h(i, j, c, d, b[10], 15, -1051523), d = h(d, i, j, c, b[1], 21, -2054922799), c = h(c, d, i, j, b[8], 6, 1873313359), j = h(j, c, d, i, b[15], 10, -30611744), i = h(i, j, c, d, b[6], 15, -1560198380), d = h(d, i, j, c, b[13], 21, 1309151649), c = h(c, d, i, j, b[4], 6, -145523070), j = h(j, c, d, i, b[11], 10, -1120210379), i = h(i, j, c, d, b[2], 15, 718787259), d = h(d, i, j, c, b[9], 21, -343485551), a[0] = n(c, a[0]), a[1] = n(d, a[1]), a[2] = n(i, a[2]), a[3] = n(j, a[3])
                }
                function d(a, b, c, d, e, f) {
                    return b = n(n(b, a), n(d, f)), n(b << e | b >>> 32 - e, c)
                }
                function e(a, b, c, e, f, g, h) {
                    return d(b & c | ~b & e, a, b, f, g, h)
                }
                function f(a, b, c, e, f, g, h) {
                    return d(b & e | c & ~e, a, b, f, g, h)
                }
                function g(a, b, c, e, f, g, h) {
                    return d(b ^ c ^ e, a, b, f, g, h)
                }
                function h(a, b, c, e, f, g, h) {
                    return d(c ^ (b | ~e), a, b, f, g, h)
                }
                function i(a) {
                    txt = "";
                    var b, d = a.length, e = [1732584193, -271733879, -1732584194, 271733878];
                    for (b = 64; b <= a.length; b += 64)
                        c(e, j(a.substring(b - 64, b)));
                    a = a.substring(b - 64);
                    var f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (b = 0; b < a.length; b++)
                        f[b >> 2] |= a.charCodeAt(b) << (b % 4 << 3);
                    if (f[b >> 2] |= 128 << (b % 4 << 3), b > 55)
                        for (c(e, f), b = 0; 16 > b; b++)
                            f[b] = 0;
                    return f[14] = 8 * d, c(e, f), e
                }
                function j(a) {
                    var b, c = [];
                    for (b = 0; 64 > b; b += 4)
                        c[b >> 2] = a.charCodeAt(b) + (a.charCodeAt(b + 1) << 8) + (a.charCodeAt(b + 2) << 16) + (a.charCodeAt(b + 3) << 24);
                    return c
                }
                function k(a) {
                    for (var b = "", c = 0; 4 > c; c++)
                        b += p[a >> 8 * c + 4 & 15] + p[a >> 8 * c & 15];
                    return b
                }
                function l(a) {
                    for (var b = 0; b < a.length; b++)
                        a[b] = k(a[b]);
                    return a.join("")
                }
                function m(a) {
                    return l(i(a))
                }
                function n(a, b) {
                    return a + b & 4294967295
                }
                function n(a, b) {
                    var c = (65535 & a) + (65535 & b), d = (a >> 16) + (b >> 16) + (c >> 16);
                    return d << 16 | 65535 & c
                }
                var o = a("../../util.js");
                b.exports = function(a) {
                    var b = m(a), c = o.hex2bin(b);
                    return c
                };
                var p = "0123456789abcdef".split("");
                "5d41402abc4b2a76b9719d911017c592" != m("hello")
            }, {"../../util.js": 61}],17: [function(a, b) {
                function c(a, b) {
                    return new Number(a << b | a >>> 32 - b)
                }
                function d(a, b, c) {
                    return new Number(a ^ b ^ c)
                }
                function e(a, b, c) {
                    return new Number(a & b | ~a & c)
                }
                function f(a, b, c) {
                    return new Number((a | ~b) ^ c)
                }
                function g(a, b, c) {
                    return new Number(a & c | b & ~c)
                }
                function h(a, b, c) {
                    return new Number(a ^ (b | ~c))
                }
                function i(a, b, i, j, k, l, m, n) {
                    switch (n) {
                        case 0:
                            a += d(b, i, j) + l + 0;
                            break;
                        case 1:
                            a += e(b, i, j) + l + 1518500249;
                            break;
                        case 2:
                            a += f(b, i, j) + l + 1859775393;
                            break;
                        case 3:
                            a += g(b, i, j) + l + 2400959708;
                            break;
                        case 4:
                            a += h(b, i, j) + l + 2840853838;
                            break;
                        case 5:
                            a += h(b, i, j) + l + 1352829926;
                            break;
                        case 6:
                            a += g(b, i, j) + l + 1548603684;
                            break;
                        case 7:
                            a += f(b, i, j) + l + 1836072691;
                            break;
                        case 8:
                            a += e(b, i, j) + l + 2053994217;
                            break;
                        case 9:
                            a += d(b, i, j) + l + 0;
                            break;
                        default:
                            document.write("Bogus round number")
                    }
                    a = c(a, m) + k, i = c(i, 10), a &= 4294967295, b &= 4294967295, i &= 4294967295, j &= 4294967295, k &= 4294967295;
                    var o = [];
                    return o[0] = a, o[1] = b, o[2] = i, o[3] = j, o[4] = k, o[5] = l, o[6] = m, o
                }
                function j(a) {
                    a[0] = 1732584193, a[1] = 4023233417, a[2] = 2562383102, a[3] = 271733878, a[4] = 3285377520
                }
                function k(a, b) {
                    blockA = [], blockB = [];
                    var c, d, e;
                    for (d = 0; 5 > d; d++)
                        blockA[d] = new Number(a[d]), blockB[d] = new Number(a[d]);
                    var f = 0;
                    for (e = 0; 5 > e; e++)
                        for (d = 0; 16 > d; d++)
                            c = i(blockA[(f + 0) % 5], blockA[(f + 1) % 5], blockA[(f + 2) % 5], blockA[(f + 3) % 5], blockA[(f + 4) % 5], b[s[e][d]], r[e][d], e), blockA[(f + 0) % 5] = c[0], blockA[(f + 1) % 5] = c[1], blockA[(f + 2) % 5] = c[2], blockA[(f + 3) % 5] = c[3], blockA[(f + 4) % 5] = c[4], f += 4;
                    for (f = 0, e = 5; 10 > e; e++)
                        for (d = 0; 16 > d; d++)
                            c = i(blockB[(f + 0) % 5], blockB[(f + 1) % 5], blockB[(f + 2) % 5], blockB[(f + 3) % 5], blockB[(f + 4) % 5], b[s[e][d]], r[e][d], e), blockB[(f + 0) % 5] = c[0], blockB[(f + 1) % 5] = c[1], blockB[(f + 2) % 5] = c[2], blockB[(f + 3) % 5] = c[3], blockB[(f + 4) % 5] = c[4], f += 4;
                    blockB[3] += blockA[2] + a[1], a[1] = a[2] + blockA[3] + blockB[4], a[2] = a[3] + blockA[4] + blockB[0], a[3] = a[4] + blockA[0] + blockB[1], a[4] = a[0] + blockA[1] + blockB[2], a[0] = blockB[3]
                }
                function l(a) {
                    for (var b = 0; 16 > b; b++)
                        a[b] = 0
                }
                function m(a, b, c, d) {
                    var e = new Array(16);
                    l(e);
                    for (var f = 0, g = 0; (63 & c) > g; g++)
                        e[g >>> 2] ^= (255 & b.charCodeAt(f++)) << 8 * (3 & g);
                    e[c >>> 2 & 15] ^= 1 << 8 * (3 & c) + 7, (63 & c) > 55 && (k(a, e), e = new Array(16), l(e)), e[14] = c << 3, e[15] = c >>> 29 | d << 3, k(a, e)
                }
                function n(a) {
                    var b = (255 & a.charCodeAt(3)) << 24;
                    return b |= (255 & a.charCodeAt(2)) << 16, b |= (255 & a.charCodeAt(1)) << 8, b |= 255 & a.charCodeAt(0)
                }
                function o(a) {
                    var b, c, d = new Array(q / 32), e = new Array(q / 8);
                    j(d), b = a.length;
                    var f = new Array(16);
                    l(f);
                    var g, h = 0;
                    for (c = b; c > 63; c -= 64) {
                        for (g = 0; 16 > g; g++)
                            f[g] = n(a.substr(h, 4)), h += 4;
                        k(d, f)
                    }
                    for (m(d, a.substr(h), b, 0), g = 0; q / 8 > g; g += 4)
                        e[g] = 255 & d[g >>> 2], e[g + 1] = d[g >>> 2] >>> 8 & 255, e[g + 2] = d[g >>> 2] >>> 16 & 255, e[g + 3] = d[g >>> 2] >>> 24 & 255;
                    return e
                }
                function p(a) {
                    for (var b = o(a), c = "", d = 0; q / 8 > d; d++)
                        c += String.fromCharCode(b[d]);
                    return c
                }
                var q = 160, r = [[11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8], [7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12], [11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5], [11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12], [9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6], [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6], [9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11], [9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5], [15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8], [8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]], s = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8], [3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12], [1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2], [4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12], [6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2], [15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13], [8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14], [12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]];
                b.exports = p
            }, {}],18: [function(a, b) {
                var c = function() {
                    var a = 8, b = "", c = 0, d = function(a, b) {
                        this.highOrder = a, this.lowOrder = b
                    }, e = function(b) {
                        var c, d = [], e = (1 << a) - 1, f = b.length * a;
                        for (c = 0; f > c; c += a)
                            d[c >> 5] |= (b.charCodeAt(c / a) & e) << 32 - a - c % 32;
                        return d
                    }, f = function(a) {
                        var b, c, d = [], e = a.length;
                        for (b = 0; e > b; b += 2) {
                            if (c = parseInt(a.substr(b, 2), 16), isNaN(c))
                                return "INVALID HEX STRING";
                            d[b >> 3] |= c << 24 - 4 * (b % 8)
                        }
                        return d
                    }, g = function(a) {
                        var b, d, e = c ? "0123456789ABCDEF" : "0123456789abcdef", f = "", g = 4 * a.length;
                        for (b = 0; g > b; b += 1)
                            d = a[b >> 2] >> 8 * (3 - b % 4), f += e.charAt(d >> 4 & 15) + e.charAt(15 & d);
                        return f
                    }, h = function(a) {
                        var c, d, e, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", g = "", h = 4 * a.length;
                        for (c = 0; h > c; c += 3)
                            for (e = (a[c >> 2] >> 8 * (3 - c % 4) & 255) << 16 | (a[c + 1 >> 2] >> 8 * (3 - (c + 1) % 4) & 255) << 8 | a[c + 2 >> 2] >> 8 * (3 - (c + 2) % 4) & 255, d = 0; 4 > d; d += 1)
                                g += 8 * c + 6 * d <= 32 * a.length ? f.charAt(e >> 6 * (3 - d) & 63) : b;
                        return g
                    }, i = function(a) {
                        for (var b = "", c = 255, d = 0; d < 32 * a.length; d += 8)
                            b += String.fromCharCode(a[d >> 5] >>> 24 - d % 32 & c);
                        return b
                    }, j = function(a, b) {
                        return a << b | a >>> 32 - b
                    }, k = function(a, b) {
                        return a >>> b | a << 32 - b
                    }, l = function(a, b) {
                        return 32 >= b ? new d(a.highOrder >>> b | a.lowOrder << 32 - b, a.lowOrder >>> b | a.highOrder << 32 - b) : new d(a.lowOrder >>> b | a.highOrder << 32 - b, a.highOrder >>> b | a.lowOrder << 32 - b)
                    }, m = function(a, b) {
                        return a >>> b
                    }, n = function(a, b) {
                        return 32 >= b ? new d(a.highOrder >>> b, a.lowOrder >>> b | a.highOrder << 32 - b) : new d(0, a.highOrder << 32 - b)
                    }, o = function(a, b, c) {
                        return a ^ b ^ c
                    }, p = function(a, b, c) {
                        return a & b ^ ~a & c
                    }, q = function(a, b, c) {
                        return new d(a.highOrder & b.highOrder ^ ~a.highOrder & c.highOrder, a.lowOrder & b.lowOrder ^ ~a.lowOrder & c.lowOrder)
                    }, r = function(a, b, c) {
                        return a & b ^ a & c ^ b & c
                    }, s = function(a, b, c) {
                        return new d(a.highOrder & b.highOrder ^ a.highOrder & c.highOrder ^ b.highOrder & c.highOrder, a.lowOrder & b.lowOrder ^ a.lowOrder & c.lowOrder ^ b.lowOrder & c.lowOrder)
                    }, t = function(a) {
                        return k(a, 2) ^ k(a, 13) ^ k(a, 22)
                    }, u = function(a) {
                        var b = l(a, 28), c = l(a, 34), e = l(a, 39);
                        return new d(b.highOrder ^ c.highOrder ^ e.highOrder, b.lowOrder ^ c.lowOrder ^ e.lowOrder)
                    }, v = function(a) {
                        return k(a, 6) ^ k(a, 11) ^ k(a, 25)
                    }, w = function(a) {
                        var b = l(a, 14), c = l(a, 18), e = l(a, 41);
                        return new d(b.highOrder ^ c.highOrder ^ e.highOrder, b.lowOrder ^ c.lowOrder ^ e.lowOrder)
                    }, x = function(a) {
                        return k(a, 7) ^ k(a, 18) ^ m(a, 3)
                    }, y = function(a) {
                        var b = l(a, 1), c = l(a, 8), e = n(a, 7);
                        return new d(b.highOrder ^ c.highOrder ^ e.highOrder, b.lowOrder ^ c.lowOrder ^ e.lowOrder)
                    }, z = function(a) {
                        return k(a, 17) ^ k(a, 19) ^ m(a, 10)
                    }, A = function(a) {
                        var b = l(a, 19), c = l(a, 61), e = n(a, 6);
                        return new d(b.highOrder ^ c.highOrder ^ e.highOrder, b.lowOrder ^ c.lowOrder ^ e.lowOrder)
                    }, B = function(a, b) {
                        var c = (65535 & a) + (65535 & b), d = (a >>> 16) + (b >>> 16) + (c >>> 16);
                        return (65535 & d) << 16 | 65535 & c
                    }, C = function(a, b, c, d) {
                        var e = (65535 & a) + (65535 & b) + (65535 & c) + (65535 & d), f = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16);
                        return (65535 & f) << 16 | 65535 & e
                    }, D = function(a, b, c, d, e) {
                        var f = (65535 & a) + (65535 & b) + (65535 & c) + (65535 & d) + (65535 & e), g = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16) + (f >>> 16);
                        return (65535 & g) << 16 | 65535 & f
                    }, E = function(a, b) {
                        var c, e, f, g;
                        return c = (65535 & a.lowOrder) + (65535 & b.lowOrder), e = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c >>> 16), f = (65535 & e) << 16 | 65535 & c, c = (65535 & a.highOrder) + (65535 & b.highOrder) + (e >>> 16), e = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c >>> 16), g = (65535 & e) << 16 | 65535 & c, new d(g, f)
                    }, F = function(a, b, c, e) {
                        var f, g, h, i;
                        return f = (65535 & a.lowOrder) + (65535 & b.lowOrder) + (65535 & c.lowOrder) + (65535 & e.lowOrder), g = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (e.lowOrder >>> 16) + (f >>> 16), h = (65535 & g) << 16 | 65535 & f, f = (65535 & a.highOrder) + (65535 & b.highOrder) + (65535 & c.highOrder) + (65535 & e.highOrder) + (g >>> 16), g = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (e.highOrder >>> 16) + (f >>> 16), i = (65535 & g) << 16 | 65535 & f, new d(i, h)
                    }, G = function(a, b, c, e, f) {
                        var g, h, i, j;
                        return g = (65535 & a.lowOrder) + (65535 & b.lowOrder) + (65535 & c.lowOrder) + (65535 & e.lowOrder) + (65535 & f.lowOrder), h = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (e.lowOrder >>> 16) + (f.lowOrder >>> 16) + (g >>> 16), i = (65535 & h) << 16 | 65535 & g, g = (65535 & a.highOrder) + (65535 & b.highOrder) + (65535 & c.highOrder) + (65535 & e.highOrder) + (65535 & f.highOrder) + (h >>> 16), h = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (e.highOrder >>> 16) + (f.highOrder >>> 16) + (g >>> 16), j = (65535 & h) << 16 | 65535 & g, new d(j, i)
                    }, H = function(a, b) {
                        var c, d, e, f, g, h, i, k, l, m = [], n = p, q = o, s = r, t = j, u = B, v = D, w = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], x = [1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782];
                        for (a[b >> 5] |= 128 << 24 - b % 32, a[(b + 65 >> 9 << 4) + 15] = b, l = a.length, i = 0; l > i; i += 16) {
                            for (c = w[0], d = w[1], e = w[2], f = w[3], g = w[4], k = 0; 80 > k; k += 1)
                                m[k] = 16 > k ? a[k + i] : t(m[k - 3] ^ m[k - 8] ^ m[k - 14] ^ m[k - 16], 1), h = 20 > k ? v(t(c, 5), n(d, e, f), g, x[k], m[k]) : 40 > k ? v(t(c, 5), q(d, e, f), g, x[k], m[k]) : 60 > k ? v(t(c, 5), s(d, e, f), g, x[k], m[k]) : v(t(c, 5), q(d, e, f), g, x[k], m[k]), g = f, f = e, e = t(d, 30), d = c, c = h;
                            w[0] = u(c, w[0]), w[1] = u(d, w[1]), w[2] = u(e, w[2]), w[3] = u(f, w[3]), w[4] = u(g, w[4])
                        }
                        return w
                    }, I = function(a, b, c) {
                        var e, f, g, h, i, j, k, l, m, n, o, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z = [];
                        for ("SHA-224" === c || "SHA-256" === c ? (H = 64, I = (b + 65 >> 9 << 4) + 15, L = 16, M = 1, W = Number, N = B, O = C, P = D, Q = x, R = z, S = t, T = v, V = r, U = p, X = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], o = "SHA-224" === c ? [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428] : [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]) : ("SHA-384" === c || "SHA-512" === c) && (H = 80, I = (b + 128 >> 10 << 5) + 31, L = 32, M = 2, W = d, N = E, O = F, P = G, Q = y, R = A, S = u, T = w, V = s, U = q, X = [new W(1116352408, 3609767458), new W(1899447441, 602891725), new W(3049323471, 3964484399), new W(3921009573, 2173295548), new W(961987163, 4081628472), new W(1508970993, 3053834265), new W(2453635748, 2937671579), new W(2870763221, 3664609560), new W(3624381080, 2734883394), new W(310598401, 1164996542), new W(607225278, 1323610764), new W(1426881987, 3590304994), new W(1925078388, 4068182383), new W(2162078206, 991336113), new W(2614888103, 633803317), new W(3248222580, 3479774868), new W(3835390401, 2666613458), new W(4022224774, 944711139), new W(264347078, 2341262773), new W(604807628, 2007800933), new W(770255983, 1495990901), new W(1249150122, 1856431235), new W(1555081692, 3175218132), new W(1996064986, 2198950837), new W(2554220882, 3999719339), new W(2821834349, 766784016), new W(2952996808, 2566594879), new W(3210313671, 3203337956), new W(3336571891, 1034457026), new W(3584528711, 2466948901), new W(113926993, 3758326383), new W(338241895, 168717936), new W(666307205, 1188179964), new W(773529912, 1546045734), new W(1294757372, 1522805485), new W(1396182291, 2643833823), new W(1695183700, 2343527390), new W(1986661051, 1014477480), new W(2177026350, 1206759142), new W(2456956037, 344077627), new W(2730485921, 1290863460), new W(2820302411, 3158454273), new W(3259730800, 3505952657), new W(3345764771, 106217008), new W(3516065817, 3606008344), new W(3600352804, 1432725776), new W(4094571909, 1467031594), new W(275423344, 851169720), new W(430227734, 3100823752), new W(506948616, 1363258195), new W(659060556, 3750685593), new W(883997877, 3785050280), new W(958139571, 3318307427), new W(1322822218, 3812723403), new W(1537002063, 2003034995), new W(1747873779, 3602036899), new W(1955562222, 1575990012), new W(2024104815, 1125592928), new W(2227730452, 2716904306), new W(2361852424, 442776044), new W(2428436474, 593698344), new W(2756734187, 3733110249), new W(3204031479, 2999351573), new W(3329325298, 3815920427), new W(3391569614, 3928383900), new W(3515267271, 566280711), new W(3940187606, 3454069534), new W(4118630271, 4000239992), new W(116418474, 1914138554), new W(174292421, 2731055270), new W(289380356, 3203993006), new W(460393269, 320620315), new W(685471733, 587496836), new W(852142971, 1086792851), new W(1017036298, 365543100), new W(1126000580, 2618297676), new W(1288033470, 3409855158), new W(1501505948, 4234509866), new W(1607167915, 987167468), new W(1816402316, 1246189591)], o = "SHA-384" === c ? [new W(3418070365, 3238371032), new W(1654270250, 914150663), new W(2438529370, 812702999), new W(355462360, 4144912697), new W(1731405415, 4290775857), new W(41048885895, 1750603025), new W(3675008525, 1694076839), new W(1203062813, 3204075428)] : [new W(1779033703, 4089235720), new W(3144134277, 2227873595), new W(1013904242, 4271175723), new W(2773480762, 1595750129), new W(1359893119, 2917565137), new W(2600822924, 725511199), new W(528734635, 4215389547), new W(1541459225, 327033209)]), a[b >> 5] |= 128 << 24 - b % 32, a[I] = b, Y = a.length, J = 0; Y > J; J += L) {
                            for (e = o[0], f = o[1], g = o[2], h = o[3], i = o[4], j = o[5], k = o[6], l = o[7], K = 0; H > K; K += 1)
                                Z[K] = 16 > K ? new W(a[K * M + J], a[K * M + J + 1]) : O(R(Z[K - 2]), Z[K - 7], Q(Z[K - 15]), Z[K - 16]), m = P(l, T(i), U(i, j, k), X[K], Z[K]), n = N(S(e), V(e, f, g)), l = k, k = j, j = i, i = N(h, m), h = g, g = f, f = e, e = N(m, n);
                            o[0] = N(e, o[0]), o[1] = N(f, o[1]), o[2] = N(g, o[2]), o[3] = N(h, o[3]), o[4] = N(i, o[4]), o[5] = N(j, o[5]), o[6] = N(k, o[6]), o[7] = N(l, o[7])
                        }
                        switch (c) {
                            case "SHA-224":
                                return [o[0], o[1], o[2], o[3], o[4], o[5], o[6]];
                            case "SHA-256":
                                return o;
                            case "SHA-384":
                                return [o[0].highOrder, o[0].lowOrder, o[1].highOrder, o[1].lowOrder, o[2].highOrder, o[2].lowOrder, o[3].highOrder, o[3].lowOrder, o[4].highOrder, o[4].lowOrder, o[5].highOrder, o[5].lowOrder];
                            case "SHA-512":
                                return [o[0].highOrder, o[0].lowOrder, o[1].highOrder, o[1].lowOrder, o[2].highOrder, o[2].lowOrder, o[3].highOrder, o[3].lowOrder, o[4].highOrder, o[4].lowOrder, o[5].highOrder, o[5].lowOrder, o[6].highOrder, o[6].lowOrder, o[7].highOrder, o[7].lowOrder];
                            default:
                                return []
                        }
                    }, J = function(b, c) {
                        if (this.sha1 = null, this.sha224 = null, this.sha256 = null, this.sha384 = null, this.sha512 = null, this.strBinLen = null, this.strToHash = null, "HEX" === c) {
                            if (0 !== b.length % 2)
                                return "TEXT MUST BE IN BYTE INCREMENTS";
                            this.strBinLen = 4 * b.length, this.strToHash = f(b)
                        } else {
                            if ("ASCII" !== c && "undefined" != typeof c)
                                return "UNKNOWN TEXT INPUT TYPE";
                            this.strBinLen = b.length * a, this.strToHash = e(b)
                        }
                    };
                    return J.prototype = {getHash: function(a, b) {
                            var c = null, d = this.strToHash.slice();
                            switch (b) {
                                case "HEX":
                                    c = g;
                                    break;
                                case "B64":
                                    c = h;
                                    break;
                                case "ASCII":
                                    c = i;
                                    break;
                                default:
                                    return "FORMAT NOT RECOGNIZED"
                            }
                            switch (a) {
                                case "SHA-1":
                                    return null === this.sha1 && (this.sha1 = H(d, this.strBinLen)), c(this.sha1);
                                case "SHA-224":
                                    return null === this.sha224 && (this.sha224 = I(d, this.strBinLen, a)), c(this.sha224);
                                case "SHA-256":
                                    return null === this.sha256 && (this.sha256 = I(d, this.strBinLen, a)), c(this.sha256);
                                case "SHA-384":
                                    return null === this.sha384 && (this.sha384 = I(d, this.strBinLen, a)), c(this.sha384);
                                case "SHA-512":
                                    return null === this.sha512 && (this.sha512 = I(d, this.strBinLen, a)), c(this.sha512);
                                default:
                                    return "HASH NOT RECOGNIZED"
                            }
                        },getHMAC: function(b, c, d, j) {
                            var k, l, m, n, o, p, q, r, s, t = [], u = [];
                            switch (j) {
                                case "HEX":
                                    k = g;
                                    break;
                                case "B64":
                                    k = h;
                                    break;
                                case "ASCII":
                                    k = i;
                                    break;
                                default:
                                    return "FORMAT NOT RECOGNIZED"
                            }
                            switch (d) {
                                case "SHA-1":
                                    m = 64, s = 160;
                                    break;
                                case "SHA-224":
                                    m = 64, s = 224;
                                    break;
                                case "SHA-256":
                                    m = 64, s = 256;
                                    break;
                                case "SHA-384":
                                    m = 128, s = 384;
                                    break;
                                case "SHA-512":
                                    m = 128, s = 512;
                                    break;
                                default:
                                    return "HASH NOT RECOGNIZED"
                            }
                            if ("HEX" === c) {
                                if (0 !== b.length % 2)
                                    return "KEY MUST BE IN BYTE INCREMENTS";
                                l = f(b), r = 4 * b.length
                            } else {
                                if ("ASCII" !== c)
                                    return "UNKNOWN KEY INPUT TYPE";
                                l = e(b), r = b.length * a
                            }
                            for (n = 8 * m, q = m / 4 - 1, r / 8 > m ? (l = "SHA-1" === d ? H(l, r) : I(l, r, d), l[q] &= 4294967040) : m > r / 8 && (l[q] &= 4294967040), o = 0; q >= o; o += 1)
                                t[o] = 909522486 ^ l[o], u[o] = 1549556828 ^ l[o];
                            return "SHA-1" === d ? (p = H(t.concat(this.strToHash), n + this.strBinLen), p = H(u.concat(p), n + s)) : (p = I(t.concat(this.strToHash), n + this.strBinLen, d), p = I(u.concat(p), n + s, d)), k(p)
                        }}, J
                }();
                b.exports = {sha1: function(a) {
                        var b = new c(a, "ASCII");
                        return b.getHash("SHA-1", "ASCII")
                    },sha224: function(a) {
                        var b = new c(a, "ASCII");
                        return b.getHash("SHA-224", "ASCII")
                    },sha256: function(a) {
                        var b = new c(a, "ASCII");
                        return b.getHash("SHA-256", "ASCII")
                    },sha384: function(a) {
                        var b = new c(a, "ASCII");
                        return b.getHash("SHA-384", "ASCII")
                    },sha512: function(a) {
                        var b = new c(a, "ASCII");
                        return b.getHash("SHA-512", "ASCII")
                    }}
            }, {}],19: [function(a, b) {
                b.exports = {cipher: a("./cipher"),hash: a("./hash"),cfb: a("./cfb.js"),publicKey: a("./public_key"),signature: a("./signature.js"),random: a("./random.js"),pkcs1: a("./pkcs1.js")};
                var c = a("./crypto.js");
                for (var d in c)
                    b.exports[d] = c[d]
            }, {"./cfb.js": 5,"./cipher": 10,"./crypto.js": 12,"./hash": 15,"./pkcs1.js": 20,"./public_key": 23,"./random.js": 26,"./signature.js": 27}],20: [function(a, b) {
                hash_headers = [], hash_headers[1] = [48, 32, 48, 12, 6, 8, 42, 134, 72, 134, 247, 13, 2, 5, 5, 0, 4, 16], hash_headers[2] = [48, 33, 48, 9, 6, 5, 43, 14, 3, 2, 26, 5, 0, 4, 20], hash_headers[3] = [48, 33, 48, 9, 6, 5, 43, 36, 3, 2, 1, 5, 0, 4, 20], hash_headers[8] = [48, 49, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 1, 5, 0, 4, 32], hash_headers[9] = [48, 65, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 2, 5, 0, 4, 48], hash_headers[10] = [48, 81, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 3, 5, 0, 4, 64], hash_headers[11] = [48, 49, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 4, 5, 0, 4, 28];
                var c = (a("./crypto.js"), a("./random.js")), d = a("../util.js"), e = a("./public_key/jsbn.js"), f = a("./hash");
                b.exports = {eme: {encode: function(a, b) {
                            if (a.length > b - 11)
                                return -1;
                            var d = "";
                            d += String.fromCharCode(0), d += String.fromCharCode(2);
                            for (var e = 0; e < b - a.length - 3; e++)
                                d += String.fromCharCode(c.getPseudoRandom(1, 255));
                            return d += String.fromCharCode(0), d += a
                        },decode: function(a, b) {
                            if (a.length < b && (a = String.fromCharCode(0) + a), a.length < 12 || 0 !== a.charCodeAt(0) || 2 != a.charCodeAt(1))
                                return -1;
                            for (var c = 2; 0 !== a.charCodeAt(c) && a.length > c; )
                                c++;
                            return a.substring(c + 1, a.length)
                        }},emsa: {encode: function(a, b, c) {
                            var g = "";
                            g += String.fromCharCode(0), g += String.fromCharCode(1);
                            var h;
                            for (h = 0; h < c - hash_headers[a].length - 3 - f.getHashByteLength(a); h++)
                                g += String.fromCharCode(255);
                            for (g += String.fromCharCode(0), h = 0; h < hash_headers[a].length; h++)
                                g += String.fromCharCode(hash_headers[a][h]);
                            return g += f.digest(a, b), new e(d.hexstrdump(g), 16)
                        },decode: function(a, b) {
                            var c = 0;
                            if (0 === b.charCodeAt(0))
                                c++;
                            else {
                                if (1 != b.charCodeAt(0))
                                    return -1;
                                c++
                            }
                            for (; 255 == b.charCodeAt(c); )
                                c++;
                            if (0 !== b.charCodeAt(c++))
                                return -1;
                            var d = 0;
                            for (d = 0; d < hash_headers[a].length && d + c < b.length; d++)
                                if (b.charCodeAt(d + c) != hash_headers[a][d])
                                    return -1;
                            return c += d, b.substring(c).length < f.getHashByteLength(a) ? -1 : b.substring(c)
                        }}}
            }, {"../util.js": 61,"./crypto.js": 12,"./hash": 15,"./public_key/jsbn.js": 24,"./random.js": 26}],21: [function(a, b) {
                function c() {
                    function a(a, b, c, h, i, j) {
                        var k = g.getLeftNBits(f.digest(a, b), i.bitLength()), l = new d(g.hexstrdump(k), 16), m = e.getRandomBigIntegerInRange(d.ONE.add(d.ONE), i.subtract(d.ONE)), n = c.modPow(m, h).mod(i), o = m.modInverse(i).multiply(l.add(j.multiply(n))).mod(i), p = [];
                        return p[0] = n.toMPI(), p[1] = o.toMPI(), p
                    }
                    function b(a) {
                        var b = h.prefer_hash_algorithm;
                        switch (Math.round(a.bitLength() / 8)) {
                            case 20:
                                return 2 != b && b > 11 && 10 != b && 8 > b ? 2 : b;
                            case 28:
                                return b > 11 && 8 > b ? 11 : b;
                            case 32:
                                return b > 10 && 8 > b ? 8 : b;
                            default:
                                return g.print_debug("DSA select hash algorithm: returning null for an unknown length of q"), null
                        }
                    }
                    function c(a, b, c, e, h, i, j, k) {
                        var l = g.getLeftNBits(f.digest(a, e), i.bitLength()), m = new d(g.hexstrdump(l), 16);
                        if (d.ZERO.compareTo(b) > 0 || b.compareTo(i) > 0 || d.ZERO.compareTo(c) > 0 || c.compareTo(i) > 0)
                            return g.print_debug("invalid DSA Signature"), null;
                        var n = c.modInverse(i), o = m.multiply(n).mod(i), p = b.multiply(n).mod(i);
                        return j.modPow(o, h).multiply(k.modPow(p, h)).mod(h).mod(i)
                    }
                    this.select_hash_algorithm = b, this.sign = a, this.verify = c
                }
                var d = a("./jsbn.js"), e = a("../random.js"), f = a("../hash"), g = a("../../util.js"), h = a("../../config");
                b.exports = c
            }, {"../../config": 4,"../../util.js": 61,"../hash": 15,"../random.js": 26,"./jsbn.js": 24}],22: [function(a, b) {
                function c() {
                    function a(a, b, c, f) {
                        var g = d.ONE.add(d.ONE), h = c.subtract(g), i = e.getRandomBigIntegerInRange(g, h);
                        i = i.mod(h).add(d.ONE);
                        var j = [];
                        return j[0] = b.modPow(i, c), j[1] = f.modPow(i, c).multiply(a).mod(c), j
                    }
                    function b(a, b, c, d) {
                        return f.print_debug("Elgamal Decrypt:\nc1:" + f.hexstrdump(a.toMPI()) + "\nc2:" + f.hexstrdump(b.toMPI()) + "\np:" + f.hexstrdump(c.toMPI()) + "\nx:" + f.hexstrdump(d.toMPI())), a.modPow(d, c).modInverse(c).multiply(b).mod(c)
                    }
                    this.encrypt = a, this.decrypt = b
                }
                var d = a("./jsbn.js"), e = a("../random.js"), f = a("../../util.js");
                b.exports = c
            }, {"../../util.js": 61,"../random.js": 26,"./jsbn.js": 24}],23: [function(a, b) {
                b.exports = {rsa: a("./rsa.js"),elgamal: a("./elgamal.js"),dsa: a("./dsa.js")}
            }, {"./dsa.js": 21,"./elgamal.js": 22,"./rsa.js": 25}],24: [function(a, b) {
                function c(a, b, c) {
                    null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
                }
                function d() {
                    return new c(null)
                }
                function e(a, b, c, d, e, f) {
                    for (; --f >= 0; ) {
                        var g = b * this[a++] + c[d] + e;
                        e = Math.floor(g / 67108864), c[d++] = 67108863 & g
                    }
                    return e
                }
                function f(a) {
                    return ec.charAt(a)
                }
                function g(a, b) {
                    var c = fc[a.charCodeAt(b)];
                    return null == c ? -1 : c
                }
                function h(a) {
                    for (var b = this.t - 1; b >= 0; --b)
                        a[b] = this[b];
                    a.t = this.t, a.s = this.s
                }
                function i(a) {
                    this.t = 1, this.s = 0 > a ? -1 : 0, a > 0 ? this[0] = a : -1 > a ? this[0] = a + DV : this.t = 0
                }
                function j(a) {
                    var b = d();
                    return b.fromInt(a), b
                }
                function k(a, b) {
                    var d;
                    if (16 == b)
                        d = 4;
                    else if (8 == b)
                        d = 3;
                    else if (256 == b)
                        d = 8;
                    else if (2 == b)
                        d = 1;
                    else if (32 == b)
                        d = 5;
                    else {
                        if (4 != b)
                            return void this.fromRadix(a, b);
                        d = 2
                    }
                    this.t = 0, this.s = 0;
                    for (var e = a.length, f = !1, h = 0; --e >= 0; ) {
                        var i = 8 == d ? 255 & a[e] : g(a, e);
                        0 > i ? "-" == a.charAt(e) && (f = !0) : (f = !1, 0 == h ? this[this.t++] = i : h + d > this.DB ? (this[this.t - 1] |= (i & (1 << this.DB - h) - 1) << h, this[this.t++] = i >> this.DB - h) : this[this.t - 1] |= i << h, h += d, h >= this.DB && (h -= this.DB))
                    }
                    8 == d && 0 != (128 & a[0]) && (this.s = -1, h > 0 && (this[this.t - 1] |= (1 << this.DB - h) - 1 << h)), this.clamp(), f && c.ZERO.subTo(this, this)
                }
                function l() {
                    for (var a = this.s & this.DM; this.t > 0 && this[this.t - 1] == a; )
                        --this.t
                }
                function m(a) {
                    if (this.s < 0)
                        return "-" + this.negate().toString(a);
                    var b;
                    if (16 == a)
                        b = 4;
                    else if (8 == a)
                        b = 3;
                    else if (2 == a)
                        b = 1;
                    else if (32 == a)
                        b = 5;
                    else {
                        if (4 != a)
                            return this.toRadix(a);
                        b = 2
                    }
                    var c, d = (1 << b) - 1, e = !1, g = "", h = this.t, i = this.DB - h * this.DB % b;
                    if (h-- > 0)
                        for (i < this.DB && (c = this[h] >> i) > 0 && (e = !0, g = f(c)); h >= 0; )
                            b > i ? (c = (this[h] & (1 << i) - 1) << b - i, c |= this[--h] >> (i += this.DB - b)) : (c = this[h] >> (i -= b) & d, 0 >= i && (i += this.DB, --h)), c > 0 && (e = !0), e && (g += f(c));
                    return e ? g : "0"
                }
                function n() {
                    var a = d();
                    return c.ZERO.subTo(this, a), a
                }
                function o() {
                    return this.s < 0 ? this.negate() : this
                }
                function p(a) {
                    var b = this.s - a.s;
                    if (0 != b)
                        return b;
                    var c = this.t;
                    if (b = c - a.t, 0 != b)
                        return b;
                    for (; --c >= 0; )
                        if (0 != (b = this[c] - a[c]))
                            return b;
                    return 0
                }
                function q(a) {
                    var b, c = 1;
                    return 0 != (b = a >>> 16) && (a = b, c += 16), 0 != (b = a >> 8) && (a = b, c += 8), 0 != (b = a >> 4) && (a = b, c += 4), 0 != (b = a >> 2) && (a = b, c += 2), 0 != (b = a >> 1) && (a = b, c += 1), c
                }
                function r() {
                    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + q(this[this.t - 1] ^ this.s & this.DM)
                }
                function s(a, b) {
                    var c;
                    for (c = this.t - 1; c >= 0; --c)
                        b[c + a] = this[c];
                    for (c = a - 1; c >= 0; --c)
                        b[c] = 0;
                    b.t = this.t + a, b.s = this.s
                }
                function t(a, b) {
                    for (var c = a; c < this.t; ++c)
                        b[c - a] = this[c];
                    b.t = Math.max(this.t - a, 0), b.s = this.s
                }
                function u(a, b) {
                    var c, d = a % this.DB, e = this.DB - d, f = (1 << e) - 1, g = Math.floor(a / this.DB), h = this.s << d & this.DM;
                    for (c = this.t - 1; c >= 0; --c)
                        b[c + g + 1] = this[c] >> e | h, h = (this[c] & f) << d;
                    for (c = g - 1; c >= 0; --c)
                        b[c] = 0;
                    b[g] = h, b.t = this.t + g + 1, b.s = this.s, b.clamp()
                }
                function v(a, b) {
                    b.s = this.s;
                    var c = Math.floor(a / this.DB);
                    if (c >= this.t)
                        return void (b.t = 0);
                    var d = a % this.DB, e = this.DB - d, f = (1 << d) - 1;
                    b[0] = this[c] >> d;
                    for (var g = c + 1; g < this.t; ++g)
                        b[g - c - 1] |= (this[g] & f) << e, b[g - c] = this[g] >> d;
                    d > 0 && (b[this.t - c - 1] |= (this.s & f) << e), b.t = this.t - c, b.clamp()
                }
                function w(a, b) {
                    for (var c = 0, d = 0, e = Math.min(a.t, this.t); e > c; )
                        d += this[c] - a[c], b[c++] = d & this.DM, d >>= this.DB;
                    if (a.t < this.t) {
                        for (d -= a.s; c < this.t; )
                            d += this[c], b[c++] = d & this.DM, d >>= this.DB;
                        d += this.s
                    } else {
                        for (d += this.s; c < a.t; )
                            d -= a[c], b[c++] = d & this.DM, d >>= this.DB;
                        d -= a.s
                    }
                    b.s = 0 > d ? -1 : 0, -1 > d ? b[c++] = this.DV + d : d > 0 && (b[c++] = d), b.t = c, b.clamp()
                }
                function x(a, b) {
                    var d = this.abs(), e = a.abs(), f = d.t;
                    for (b.t = f + e.t; --f >= 0; )
                        b[f] = 0;
                    for (f = 0; f < e.t; ++f)
                        b[f + d.t] = d.am(0, e[f], b, f, 0, d.t);
                    b.s = 0, b.clamp(), this.s != a.s && c.ZERO.subTo(b, b)
                }
                function y(a) {
                    for (var b = this.abs(), c = a.t = 2 * b.t; --c >= 0; )
                        a[c] = 0;
                    for (c = 0; c < b.t - 1; ++c) {
                        var d = b.am(c, b[c], a, 2 * c, 0, 1);
                        (a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV && (a[c + b.t] -= b.DV, a[c + b.t + 1] = 1)
                    }
                    a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1)), a.s = 0, a.clamp()
                }
                function z(a, b, e) {
                    var f = a.abs();
                    if (!(f.t <= 0)) {
                        var g = this.abs();
                        if (g.t < f.t)
                            return null != b && b.fromInt(0), void (null != e && this.copyTo(e));
                        null == e && (e = d());
                        var h = d(), i = this.s, j = a.s, k = this.DB - q(f[f.t - 1]);
                        k > 0 ? (f.lShiftTo(k, h), g.lShiftTo(k, e)) : (f.copyTo(h), g.copyTo(e));
                        var l = h.t, m = h[l - 1];
                        if (0 != m) {
                            var n = m * (1 << this.F1) + (l > 1 ? h[l - 2] >> this.F2 : 0), o = this.FV / n, p = (1 << this.F1) / n, r = 1 << this.F2, s = e.t, t = s - l, u = null == b ? d() : b;
                            for (h.dlShiftTo(t, u), e.compareTo(u) >= 0 && (e[e.t++] = 1, e.subTo(u, e)), c.ONE.dlShiftTo(l, u), u.subTo(h, h); h.t < l; )
                                h[h.t++] = 0;
                            for (; --t >= 0; ) {
                                var v = e[--s] == m ? this.DM : Math.floor(e[s] * o + (e[s - 1] + r) * p);
                                if ((e[s] += h.am(0, v, e, t, 0, l)) < v)
                                    for (h.dlShiftTo(t, u), e.subTo(u, e); e[s] < --v; )
                                        e.subTo(u, e)
                            }
                            null != b && (e.drShiftTo(l, b), i != j && c.ZERO.subTo(b, b)), e.t = l, e.clamp(), k > 0 && e.rShiftTo(k, e), 0 > i && c.ZERO.subTo(e, e)
                        }
                    }
                }
                function A(a) {
                    var b = d();
                    return this.abs().divRemTo(a, null, b), this.s < 0 && b.compareTo(c.ZERO) > 0 && a.subTo(b, b), b
                }
                function B(a) {
                    this.m = a
                }
                function C(a) {
                    return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
                }
                function D(a) {
                    return a
                }
                function E(a) {
                    a.divRemTo(this.m, null, a)
                }
                function F(a, b, c) {
                    a.multiplyTo(b, c), this.reduce(c)
                }
                function G(a, b) {
                    a.squareTo(b), this.reduce(b)
                }
                function H() {
                    if (this.t < 1)
                        return 0;
                    var a = this[0];
                    if (0 == (1 & a))
                        return 0;
                    var b = 3 & a;
                    return b = b * (2 - (15 & a) * b) & 15, b = b * (2 - (255 & a) * b) & 255, b = b * (2 - ((65535 & a) * b & 65535)) & 65535, b = b * (2 - a * b % this.DV) % this.DV, b > 0 ? this.DV - b : -b
                }
                function I(a) {
                    this.m = a, this.mp = a.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << a.DB - 15) - 1, this.mt2 = 2 * a.t
                }
                function J(a) {
                    var b = d();
                    return a.abs().dlShiftTo(this.m.t, b), b.divRemTo(this.m, null, b), a.s < 0 && b.compareTo(c.ZERO) > 0 && this.m.subTo(b, b), b
                }
                function K(a) {
                    var b = d();
                    return a.copyTo(b), this.reduce(b), b
                }
                function L(a) {
                    for (; a.t <= this.mt2; )
                        a[a.t++] = 0;
                    for (var b = 0; b < this.m.t; ++b) {
                        var c = 32767 & a[b], d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
                        for (c = b + this.m.t, a[c] += this.m.am(0, d, a, b, 0, this.m.t); a[c] >= a.DV; )
                            a[c] -= a.DV, a[++c]++
                    }
                    a.clamp(), a.drShiftTo(this.m.t, a), a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
                }
                function M(a, b) {
                    a.squareTo(b), this.reduce(b)
                }
                function N(a, b, c) {
                    a.multiplyTo(b, c), this.reduce(c)
                }
                function O() {
                    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
                }
                function P(a, b) {
                    if (a > 4294967295 || 1 > a)
                        return c.ONE;
                    var e = d(), f = d(), g = b.convert(this), h = q(a) - 1;
                    for (g.copyTo(e); --h >= 0; )
                        if (b.sqrTo(e, f), (a & 1 << h) > 0)
                            b.mulTo(f, g, e);
                        else {
                            var i = e;
                            e = f, f = i
                        }
                    return b.revert(e)
                }
                function Q(a, b) {
                    var c;
                    return c = 256 > a || b.isEven() ? new B(b) : new I(b), this.exp(a, c)
                }
                function R() {
                    var a = d();
                    return this.copyTo(a), a
                }
                function S() {
                    if (this.s < 0) {
                        if (1 == this.t)
                            return this[0] - this.DV;
                        if (0 == this.t)
                            return -1
                    } else {
                        if (1 == this.t)
                            return this[0];
                        if (0 == this.t)
                            return 0
                    }
                    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
                }
                function T() {
                    return 0 == this.t ? this.s : this[0] << 24 >> 24
                }
                function U() {
                    return 0 == this.t ? this.s : this[0] << 16 >> 16
                }
                function V(a) {
                    return Math.floor(Math.LN2 * this.DB / Math.log(a))
                }
                function W() {
                    return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
                }
                function X(a) {
                    if (null == a && (a = 10), 0 == this.signum() || 2 > a || a > 36)
                        return "0";
                    var b = this.chunkSize(a), c = Math.pow(a, b), e = j(c), f = d(), g = d(), h = "";
                    for (this.divRemTo(e, f, g); f.signum() > 0; )
                        h = (c + g.intValue()).toString(a).substr(1) + h, f.divRemTo(e, f, g);
                    return g.intValue().toString(a) + h
                }
                function Y(a, b) {
                    this.fromInt(0), null == b && (b = 10);
                    for (var d = this.chunkSize(b), e = Math.pow(b, d), f = !1, h = 0, i = 0, j = 0; j < a.length; ++j) {
                        var k = g(a, j);
                        0 > k ? "-" == a.charAt(j) && 0 == this.signum() && (f = !0) : (i = b * i + k, ++h >= d && (this.dMultiply(e), this.dAddOffset(i, 0), h = 0, i = 0))
                    }
                    h > 0 && (this.dMultiply(Math.pow(b, h)), this.dAddOffset(i, 0)), f && c.ZERO.subTo(this, this)
                }
                function Z(a, b, d) {
                    if ("number" == typeof b)
                        if (2 > a)
                            this.fromInt(1);
                        else
                            for (this.fromNumber(a, d), this.testBit(a - 1) || this.bitwiseTo(c.ONE.shiftLeft(a - 1), fb, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(b); )
                                this.dAddOffset(2, 0), this.bitLength() > a && this.subTo(c.ONE.shiftLeft(a - 1), this);
                    else {
                        var e = new Array, f = 7 & a;
                        e.length = (a >> 3) + 1, b.nextBytes(e), f > 0 ? e[0] &= (1 << f) - 1 : e[0] = 0, this.fromString(e, 256)
                    }
                }
                function $() {
                    var a = this.t, b = new Array;
                    b[0] = this.s;
                    var c, d = this.DB - a * this.DB % 8, e = 0;
                    if (a-- > 0)
                        for (d < this.DB && (c = this[a] >> d) != (this.s & this.DM) >> d && (b[e++] = c | this.s << this.DB - d); a >= 0; )
                            8 > d ? (c = (this[a] & (1 << d) - 1) << 8 - d, c |= this[--a] >> (d += this.DB - 8)) : (c = this[a] >> (d -= 8) & 255, 0 >= d && (d += this.DB, --a)), (e > 0 || c != this.s) && (b[e++] = c);
                    return b
                }
                function _(a) {
                    return 0 == this.compareTo(a)
                }
                function ab(a) {
                    return this.compareTo(a) < 0 ? this : a
                }
                function bb(a) {
                    return this.compareTo(a) > 0 ? this : a
                }
                function cb(a, b, c) {
                    var d, e, f = Math.min(a.t, this.t);
                    for (d = 0; f > d; ++d)
                        c[d] = b(this[d], a[d]);
                    if (a.t < this.t) {
                        for (e = a.s & this.DM, d = f; d < this.t; ++d)
                            c[d] = b(this[d], e);
                        c.t = this.t
                    } else {
                        for (e = this.s & this.DM, d = f; d < a.t; ++d)
                            c[d] = b(e, a[d]);
                        c.t = a.t
                    }
                    c.s = b(this.s, a.s), c.clamp()
                }
                function db(a, b) {
                    return a & b
                }
                function eb(a) {
                    var b = d();
                    return this.bitwiseTo(a, db, b), b
                }
                function fb(a, b) {
                    return a | b
                }
                function gb(a) {
                    var b = d();
                    return this.bitwiseTo(a, fb, b), b
                }
                function hb(a, b) {
                    return a ^ b
                }
                function ib(a) {
                    var b = d();
                    return this.bitwiseTo(a, hb, b), b
                }
                function jb(a, b) {
                    return a & ~b
                }
                function kb(a) {
                    var b = d();
                    return this.bitwiseTo(a, jb, b), b
                }
                function lb() {
                    for (var a = d(), b = 0; b < this.t; ++b)
                        a[b] = this.DM & ~this[b];
                    return a.t = this.t, a.s = ~this.s, a
                }
                function mb(a) {
                    var b = d();
                    return 0 > a ? this.rShiftTo(-a, b) : this.lShiftTo(a, b), b
                }
                function nb(a) {
                    var b = d();
                    return 0 > a ? this.lShiftTo(-a, b) : this.rShiftTo(a, b), b
                }
                function ob(a) {
                    if (0 == a)
                        return -1;
                    var b = 0;
                    return 0 == (65535 & a) && (a >>= 16, b += 16), 0 == (255 & a) && (a >>= 8, b += 8), 0 == (15 & a) && (a >>= 4, b += 4), 0 == (3 & a) && (a >>= 2, b += 2), 0 == (1 & a) && ++b, b
                }
                function pb() {
                    for (var a = 0; a < this.t; ++a)
                        if (0 != this[a])
                            return a * this.DB + ob(this[a]);
                    return this.s < 0 ? this.t * this.DB : -1
                }
                function qb(a) {
                    for (var b = 0; 0 != a; )
                        a &= a - 1, ++b;
                    return b
                }
                function rb() {
                    for (var a = 0, b = this.s & this.DM, c = 0; c < this.t; ++c)
                        a += qb(this[c] ^ b);
                    return a
                }
                function sb(a) {
                    var b = Math.floor(a / this.DB);
                    return b >= this.t ? 0 != this.s : 0 != (this[b] & 1 << a % this.DB)
                }
                function tb(a, b) {
                    var d = c.ONE.shiftLeft(a);
                    return this.bitwiseTo(d, b, d), d
                }
                function ub(a) {
                    return this.changeBit(a, fb)
                }
                function vb(a) {
                    return this.changeBit(a, jb)
                }
                function wb(a) {
                    return this.changeBit(a, hb)
                }
                function xb(a, b) {
                    for (var c = 0, d = 0, e = Math.min(a.t, this.t); e > c; )
                        d += this[c] + a[c], b[c++] = d & this.DM, d >>= this.DB;
                    if (a.t < this.t) {
                        for (d += a.s; c < this.t; )
                            d += this[c], b[c++] = d & this.DM, d >>= this.DB;
                        d += this.s
                    } else {
                        for (d += this.s; c < a.t; )
                            d += a[c], b[c++] = d & this.DM, d >>= this.DB;
                        d += a.s
                    }
                    b.s = 0 > d ? -1 : 0, d > 0 ? b[c++] = d : -1 > d && (b[c++] = this.DV + d), b.t = c, b.clamp()
                }
                function yb(a) {
                    var b = d();
                    return this.addTo(a, b), b
                }
                function zb(a) {
                    var b = d();
                    return this.subTo(a, b), b
                }
                function Ab(a) {
                    var b = d();
                    return this.multiplyTo(a, b), b
                }
                function Bb() {
                    var a = d();
                    return this.squareTo(a), a
                }
                function Cb(a) {
                    var b = d();
                    return this.divRemTo(a, b, null), b
                }
                function Db(a) {
                    var b = d();
                    return this.divRemTo(a, null, b), b
                }
                function Eb(a) {
                    var b = d(), c = d();
                    return this.divRemTo(a, b, c), new Array(b, c)
                }
                function Fb(a) {
                    this[this.t] = this.am(0, a - 1, this, 0, 0, this.t), ++this.t, this.clamp()
                }
                function Gb(a, b) {
                    if (0 != a) {
                        for (; this.t <= b; )
                            this[this.t++] = 0;
                        for (this[b] += a; this[b] >= this.DV; )
                            this[b] -= this.DV, ++b >= this.t && (this[this.t++] = 0), ++this[b]
                    }
                }
                function Hb() {
                }
                function Ib(a) {
                    return a
                }
                function Jb(a, b, c) {
                    a.multiplyTo(b, c)
                }
                function Kb(a, b) {
                    a.squareTo(b)
                }
                function Lb(a) {
                    return this.exp(a, new Hb)
                }
                function Mb(a, b, c) {
                    var d = Math.min(this.t + a.t, b);
                    for (c.s = 0, c.t = d; d > 0; )
                        c[--d] = 0;
                    var e;
                    for (e = c.t - this.t; e > d; ++d)
                        c[d + this.t] = this.am(0, a[d], c, d, 0, this.t);
                    for (e = Math.min(a.t, b); e > d; ++d)
                        this.am(0, a[d], c, d, 0, b - d);
                    c.clamp()
                }
                function Nb(a, b, c) {
                    --b;
                    var d = c.t = this.t + a.t - b;
                    for (c.s = 0; --d >= 0; )
                        c[d] = 0;
                    for (d = Math.max(b - this.t, 0); d < a.t; ++d)
                        c[this.t + d - b] = this.am(b - d, a[d], c, 0, 0, this.t + d - b);
                    c.clamp(), c.drShiftTo(1, c)
                }
                function Ob(a) {
                    this.r2 = d(), this.q3 = d(), c.ONE.dlShiftTo(2 * a.t, this.r2), this.mu = this.r2.divide(a), this.m = a
                }
                function Pb(a) {
                    if (a.s < 0 || a.t > 2 * this.m.t)
                        return a.mod(this.m);
                    if (a.compareTo(this.m) < 0)
                        return a;
                    var b = d();
                    return a.copyTo(b), this.reduce(b), b
                }
                function Qb(a) {
                    return a
                }
                function Rb(a) {
                    for (a.drShiftTo(this.m.t - 1, this.r2), a.t > this.m.t + 1 && (a.t = this.m.t + 1, a.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); a.compareTo(this.r2) < 0; )
                        a.dAddOffset(1, this.m.t + 1);
                    for (a.subTo(this.r2, a); a.compareTo(this.m) >= 0; )
                        a.subTo(this.m, a)
                }
                function Sb(a, b) {
                    a.squareTo(b), this.reduce(b)
                }
                function Tb(a, b, c) {
                    a.multiplyTo(b, c), this.reduce(c)
                }
                function Ub(a, b) {
                    var c, e, f = a.bitLength(), g = j(1);
                    if (0 >= f)
                        return g;
                    c = 18 > f ? 1 : 48 > f ? 3 : 144 > f ? 4 : 768 > f ? 5 : 6, e = 8 > f ? new B(b) : b.isEven() ? new Ob(b) : new I(b);
                    var h = new Array, i = 3, k = c - 1, l = (1 << c) - 1;
                    if (h[1] = e.convert(this), c > 1) {
                        var m = d();
                        for (e.sqrTo(h[1], m); l >= i; )
                            h[i] = d(), e.mulTo(m, h[i - 2], h[i]), i += 2
                    }
                    var n, o, p = a.t - 1, r = !0, s = d();
                    for (f = q(a[p]) - 1; p >= 0; ) {
                        for (f >= k ? n = a[p] >> f - k & l : (n = (a[p] & (1 << f + 1) - 1) << k - f, p > 0 && (n |= a[p - 1] >> this.DB + f - k)), i = c; 0 == (1 & n); )
                            n >>= 1, --i;
                        if ((f -= i) < 0 && (f += this.DB, --p), r)
                            h[n].copyTo(g), r = !1;
                        else {
                            for (; i > 1; )
                                e.sqrTo(g, s), e.sqrTo(s, g), i -= 2;
                            i > 0 ? e.sqrTo(g, s) : (o = g, g = s, s = o), e.mulTo(s, h[n], g)
                        }
                        for (; p >= 0 && 0 == (a[p] & 1 << f); )
                            e.sqrTo(g, s), o = g, g = s, s = o, --f < 0 && (f = this.DB - 1, --p)
                    }
                    return e.revert(g)
                }
                function Vb(a) {
                    var b = this.s < 0 ? this.negate() : this.clone(), c = a.s < 0 ? a.negate() : a.clone();
                    if (b.compareTo(c) < 0) {
                        var d = b;
                        b = c, c = d
                    }
                    var e = b.getLowestSetBit(), f = c.getLowestSetBit();
                    if (0 > f)
                        return b;
                    for (f > e && (f = e), f > 0 && (b.rShiftTo(f, b), c.rShiftTo(f, c)); b.signum() > 0; )
                        (e = b.getLowestSetBit()) > 0 && b.rShiftTo(e, b), (e = c.getLowestSetBit()) > 0 && c.rShiftTo(e, c), b.compareTo(c) >= 0 ? (b.subTo(c, b), b.rShiftTo(1, b)) : (c.subTo(b, c), c.rShiftTo(1, c));
                    return f > 0 && c.lShiftTo(f, c), c
                }
                function Wb(a) {
                    if (0 >= a)
                        return 0;
                    var b = this.DV % a, c = this.s < 0 ? a - 1 : 0;
                    if (this.t > 0)
                        if (0 == b)
                            c = this[0] % a;
                        else
                            for (var d = this.t - 1; d >= 0; --d)
                                c = (b * c + this[d]) % a;
                    return c
                }
                function Xb(a) {
                    var b = a.isEven();
                    if (this.isEven() && b || 0 == a.signum())
                        return c.ZERO;
                    for (var d = a.clone(), e = this.clone(), f = j(1), g = j(0), h = j(0), i = j(1); 0 != d.signum(); ) {
                        for (; d.isEven(); )
                            d.rShiftTo(1, d), b ? (f.isEven() && g.isEven() || (f.addTo(this, f), g.subTo(a, g)), f.rShiftTo(1, f)) : g.isEven() || g.subTo(a, g), g.rShiftTo(1, g);
                        for (; e.isEven(); )
                            e.rShiftTo(1, e), b ? (h.isEven() && i.isEven() || (h.addTo(this, h), i.subTo(a, i)), h.rShiftTo(1, h)) : i.isEven() || i.subTo(a, i), i.rShiftTo(1, i);
                        d.compareTo(e) >= 0 ? (d.subTo(e, d), b && f.subTo(h, f), g.subTo(i, g)) : (e.subTo(d, e), b && h.subTo(f, h), i.subTo(g, i))
                    }
                    return 0 != e.compareTo(c.ONE) ? c.ZERO : i.compareTo(a) >= 0 ? i.subtract(a) : i.signum() < 0 ? (i.addTo(a, i), i.signum() < 0 ? i.add(a) : i) : i
                }
                function Yb(a) {
                    var b, c = this.abs();
                    if (1 == c.t && c[0] <= gc[gc.length - 1]) {
                        for (b = 0; b < gc.length; ++b)
                            if (c[0] == gc[b])
                                return !0;
                        return !1
                    }
                    if (c.isEven())
                        return !1;
                    for (b = 1; b < gc.length; ) {
                        for (var d = gc[b], e = b + 1; e < gc.length && hc > d; )
                            d *= gc[e++];
                        for (d = c.modInt(d); e > b; )
                            if (d % gc[b++] == 0)
                                return !1
                    }
                    return c.millerRabin(a)
                }
                function q(a) {
                    var b, c = 1;
                    return 0 != (b = a >>> 16) && (a = b, c += 16), 0 != (b = a >> 8) && (a = b, c += 8), 0 != (b = a >> 4) && (a = b, c += 4), 0 != (b = a >> 2) && (a = b, c += 2), 0 != (b = a >> 1) && (a = b, c += 1), c
                }
                function Zb() {
                    var a = this.toByteArray(), b = 8 * (a.length - 1) + q(a[0]), c = "";
                    return c += String.fromCharCode((65280 & b) >> 8), c += String.fromCharCode(255 & b), c += ac.bin2str(a)
                }
                function $b(a) {
                    var b = this.subtract(c.ONE), e = b.getLowestSetBit();
                    if (0 >= e)
                        return !1;
                    var f = b.shiftRight(e);
                    a = a + 1 >> 1, a > gc.length && (a = gc.length);
                    for (var g, h = d(), i = [], j = 0; a > j; ++j) {
                        for (; g = gc[Math.floor(Math.random() * gc.length)], -1 != i.indexOf(g); )
                            ;
                        i.push(g), h.fromInt(g);
                        var k = h.modPow(f, this);
                        if (0 != k.compareTo(c.ONE) && 0 != k.compareTo(b)) {
                            for (var g = 1; g++ < e && 0 != k.compareTo(b); )
                                if (k = k.modPowInt(2, this), 0 == k.compareTo(c.ONE))
                                    return !1;
                            if (0 != k.compareTo(b))
                                return !1
                        }
                    }
                    return !0
                }
                var _b, ac = a("../../util.js");
                c.prototype.am = e, _b = 26, c.prototype.DB = _b, c.prototype.DM = (1 << _b) - 1, c.prototype.DV = 1 << _b;
                var bc = 52;
                c.prototype.FV = Math.pow(2, bc), c.prototype.F1 = bc - _b, c.prototype.F2 = 2 * _b - bc;
                var cc, dc, ec = "0123456789abcdefghijklmnopqrstuvwxyz", fc = new Array;
                for (cc = "0".charCodeAt(0), dc = 0; 9 >= dc; ++dc)
                    fc[cc++] = dc;
                for (cc = "a".charCodeAt(0), dc = 10; 36 > dc; ++dc)
                    fc[cc++] = dc;
                for (cc = "A".charCodeAt(0), dc = 10; 36 > dc; ++dc)
                    fc[cc++] = dc;
                B.prototype.convert = C, B.prototype.revert = D, B.prototype.reduce = E, B.prototype.mulTo = F, B.prototype.sqrTo = G, I.prototype.convert = J, I.prototype.revert = K, I.prototype.reduce = L, I.prototype.mulTo = N, I.prototype.sqrTo = M, c.prototype.copyTo = h, c.prototype.fromInt = i, c.prototype.fromString = k, c.prototype.clamp = l, c.prototype.dlShiftTo = s, c.prototype.drShiftTo = t, c.prototype.lShiftTo = u, c.prototype.rShiftTo = v, c.prototype.subTo = w, c.prototype.multiplyTo = x, c.prototype.squareTo = y, c.prototype.divRemTo = z, c.prototype.invDigit = H, c.prototype.isEven = O, c.prototype.exp = P, c.prototype.toString = m, c.prototype.negate = n, c.prototype.abs = o, c.prototype.compareTo = p, c.prototype.bitLength = r, c.prototype.mod = A, c.prototype.modPowInt = Q, c.ZERO = j(0), c.ONE = j(1), b.exports = c, Hb.prototype.convert = Ib, Hb.prototype.revert = Ib, Hb.prototype.mulTo = Jb, Hb.prototype.sqrTo = Kb, Ob.prototype.convert = Pb, Ob.prototype.revert = Qb, Ob.prototype.reduce = Rb, Ob.prototype.mulTo = Tb, Ob.prototype.sqrTo = Sb;
                var gc = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], hc = (1 << 26) / gc[gc.length - 1], c = a("./jsbn.js");
                c.prototype.chunkSize = V, c.prototype.toRadix = X, c.prototype.fromRadix = Y, c.prototype.fromNumber = Z, c.prototype.bitwiseTo = cb, c.prototype.changeBit = tb, c.prototype.addTo = xb, c.prototype.dMultiply = Fb, c.prototype.dAddOffset = Gb, c.prototype.multiplyLowerTo = Mb, c.prototype.multiplyUpperTo = Nb, c.prototype.modInt = Wb, c.prototype.millerRabin = $b, c.prototype.clone = R, c.prototype.intValue = S, c.prototype.byteValue = T, c.prototype.shortValue = U, c.prototype.signum = W, c.prototype.toByteArray = $, c.prototype.equals = _, c.prototype.min = ab, c.prototype.max = bb, c.prototype.and = eb, c.prototype.or = gb, c.prototype.xor = ib, c.prototype.andNot = kb, c.prototype.not = lb, c.prototype.shiftLeft = mb, c.prototype.shiftRight = nb, c.prototype.getLowestSetBit = pb, c.prototype.bitCount = rb, c.prototype.testBit = sb, c.prototype.setBit = ub, c.prototype.clearBit = vb, c.prototype.flipBit = wb, c.prototype.add = yb, c.prototype.subtract = zb, c.prototype.multiply = Ab, c.prototype.divide = Cb, c.prototype.remainder = Db, c.prototype.divideAndRemainder = Eb, c.prototype.modPow = Ub, c.prototype.modInverse = Xb, c.prototype.pow = Lb, c.prototype.gcd = Vb, c.prototype.isProbablePrime = Yb, c.prototype.toMPI = Zb, c.prototype.square = Bb
            }, {"../../util.js": 61,"./jsbn.js": 24}],25: [function(a, b) {
                function c() {
                    function a(a) {
                        for (var b = 0; b < a.length; b++)
                            a[b] = g.getSecureRandomOctet()
                    }
                    this.nextBytes = a
                }
                function d() {
                    function a(a, b, c, d, g) {
                        var h = a.mod(c).modPow(b.mod(c.subtract(e.ONE)), c), i = a.mod(d).modPow(b.mod(d.subtract(e.ONE)), d);
                        f.print_debug("rsa.js decrypt\nxpn:" + f.hexstrdump(h.toMPI()) + "\nxqn:" + f.hexstrdump(i.toMPI()));
                        var j = i.subtract(h);
                        return 0 === j[0] ? (j = h.subtract(i), j = j.multiply(g).mod(d), j = d.subtract(j)) : j = j.multiply(g).mod(d), j.multiply(c).add(h)
                    }
                    function b(a, b, c) {
                        return a.modPowInt(b, c)
                    }
                    function d(a, b, c) {
                        return a.modPow(b, c)
                    }
                    function g(a, b, c) {
                        return a.modPowInt(b, c)
                    }
                    function h() {
                        this.n = null, this.e = 0, this.ee = null, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.u = null
                    }
                    function i(a, b) {
                        var d = new h, f = new c, g = a >> 1;
                        for (d.e = parseInt(b, 16), d.ee = new e(b, 16); ; ) {
                            for (; d.p = new e(a - g, 1, f), 0 !== d.p.subtract(e.ONE).gcd(d.ee).compareTo(e.ONE) || !d.p.isProbablePrime(10); )
                                ;
                            for (; d.q = new e(g, 1, f), 0 !== d.q.subtract(e.ONE).gcd(d.ee).compareTo(e.ONE) || !d.q.isProbablePrime(10); )
                                ;
                            if (d.p.compareTo(d.q) <= 0) {
                                var i = d.p;
                                d.p = d.q, d.q = i
                            }
                            var j = d.p.subtract(e.ONE), k = d.q.subtract(e.ONE), l = j.multiply(k);
                            if (0 === l.gcd(d.ee).compareTo(e.ONE)) {
                                d.n = d.p.multiply(d.q), d.d = d.ee.modInverse(l), d.dmp1 = d.d.mod(j), d.dmq1 = d.d.mod(k), d.u = d.p.modInverse(d.q);
                                break
                            }
                        }
                        return d
                    }
                    this.encrypt = b, this.decrypt = a, this.verify = g, this.sign = d, this.generate = i, this.keyObject = h
                }
                var e = a("./jsbn.js"), f = a("../../util.js"), g = a("../random.js");
                b.exports = d
            }, {"../../util.js": 61,"../random.js": 26,"./jsbn.js": 24}],26: [function(a, b) {
                function c() {
                    this.buffer = null, this.size = null
                }
                var d = a("../type/mpi.js"), e = null;
                "undefined" == typeof window && (e = a("crypto")), b.exports = {getRandomBytes: function(a) {
                        for (var b = "", c = 0; a > c; c++)
                            b += String.fromCharCode(this.getSecureRandomOctet());
                        return b
                    },getPseudoRandom: function(a, b) {
                        return Math.round(Math.random() * (b - a)) + a
                    },getSecureRandom: function(a, b) {
                        for (var c = this.getSecureRandomUint(), d = (b - a).toString(2).length; (c & Math.pow(2, d) - 1) > b - a; )
                            c = this.getSecureRandomUint();
                        return a + Math.abs(c & Math.pow(2, d) - 1)
                    },getSecureRandomOctet: function() {
                        var a = new Uint8Array(1);
                        return this.getRandomValues(a), a[0]
                    },getSecureRandomUint: function() {
                        var a = new Uint8Array(4), b = new DataView(a.buffer);
                        return this.getRandomValues(a), b.getUint32(0)
                    },getRandomValues: function(a) {
                        if ("undefined" != typeof window && window.crypto)
                            window.crypto.getRandomValues(a);
                        else if (e) {
                            var b = e.randomBytes(a.length);
                            a.set(b)
                        } else {
                            if (!this.randomBuffer.buffer)
                                throw new Error("No secure random number generator available.");
                            this.randomBuffer.get(a)
                        }
                    },getRandomBigInteger: function(a) {
                        if (0 > a)
                            return null;
                        var b = Math.floor((a + 7) / 8), c = this.getRandomBytes(b);
                        a % 8 > 0 && (c = String.fromCharCode(Math.pow(2, a % 8) - 1 & c.charCodeAt(0)) + c.substring(1));
                        var e = new d;
                        return e.fromBytes(c), e.toBigInteger()
                    },getRandomBigIntegerInRange: function(a, b) {
                        if (!(b.compareTo(a) <= 0)) {
                            for (var c = b.subtract(a), d = this.getRandomBigInteger(c.bitLength()); d > c; )
                                d = this.getRandomBigInteger(c.bitLength());
                            return a.add(d)
                        }
                    },randomBuffer: new c}, c.prototype.init = function(a) {
                    this.buffer = new Uint32Array(a), this.size = 0
                }, c.prototype.set = function(a) {
                    if (!this.buffer)
                        throw new Error("RandomBuffer is not initialized");
                    var b = this.buffer.length - this.size;
                    a.length > b && (a = a.subarray(0, b)), this.buffer.set(a, this.size), this.size += a.length
                }, c.prototype.get = function(a) {
                    if (!this.buffer)
                        throw new Error("RandomBuffer is not initialized");
                    if (this.size < a.length)
                        throw new Error("Random number buffer depleted.");
                    for (var b = 0; b < a.length; b++)
                        a[b] = this.buffer[--this.size]
                }
            }, {"../type/mpi.js": 59,crypto: !1}],27: [function(a, b) {
                var c = a("./public_key"), d = a("./pkcs1.js"), e = a("./hash");
                b.exports = {verify: function(a, b, f, g, h) {
                        var i, j = e.digest(b, h);
                        switch (a) {
                            case 1:
                            case 2:
                            case 3:
                                var k = new c.rsa, l = g[0].toBigInteger(), m = g[1].toBigInteger(), n = f[0].toBigInteger();
                                i = k.verify(n, m, l);
                                var o = d.emsa.decode(b, i.toMPI().substring(2));
                                if (-1 == o)
                                    throw new Error("PKCS1 padding in message or key incorrect. Aborting...");
                                return o == j;
                            case 16:
                                throw new Error("signing with Elgamal is not defined in the OpenPGP standard.");
                            case 17:
                                var p = new c.dsa, q = f[0].toBigInteger(), r = f[1].toBigInteger(), s = g[0].toBigInteger(), t = g[1].toBigInteger(), u = g[2].toBigInteger(), v = g[3].toBigInteger(), w = h;
                                return i = p.verify(b, q, r, w, s, t, u, v), 0 === i.compareTo(q);
                            default:
                                throw new Error("Invalid signature algorithm.")
                        }
                    },sign: function(a, b, e, f) {
                        var g;
                        switch (b) {
                            case 1:
                            case 2:
                            case 3:
                                var h = new c.rsa, i = e[2].toBigInteger(), j = e[0].toBigInteger();
                                return g = d.emsa.encode(a, f, e[0].byteLength()), h.sign(g, i, j).toMPI();
                            case 17:
                                var k = new c.dsa, l = e[0].toBigInteger(), m = e[1].toBigInteger(), n = e[2].toBigInteger(), o = (e[3].toBigInteger(), e[4].toBigInteger());
                                g = f;
                                var p = k.sign(a, g, n, l, m, o);
                                return p[0].toString() + p[1].toString();
                            case 16:
                                throw new Error("Signing with Elgamal is not defined in the OpenPGP standard.");
                            default:
                                throw new Error("Invalid signature algorithm.")
                        }
                    }}
            }, {"./hash": 15,"./pkcs1.js": 20,"./public_key": 23}],28: [function(a, b) {
                function c(a) {
                    var b = /^-----([^-]+)-----$\n/m, c = a.match(b);
                    return c[1].match(/BEGIN PGP MESSAGE, PART \d+\/\d+/) ? m.armor.multipart_section : c[1].match(/BEGIN PGP MESSAGE, PART \d+/) ? m.armor.multipart_last : c[1].match(/BEGIN PGP SIGNED MESSAGE/) ? m.armor.signed : c[1].match(/BEGIN PGP MESSAGE/) ? m.armor.message : c[1].match(/BEGIN PGP PUBLIC KEY BLOCK/) ? m.armor.public_key : c[1].match(/BEGIN PGP PRIVATE KEY BLOCK/) ? m.armor.private_key : void 0
                }
                function d() {
                    var a = "";
                    return n.show_version && (a += "Version: " + n.versionstring + "\r\n"), n.show_comment && (a += "Comment: " + n.commentstring + "\r\n"), a += "\r\n"
                }
                function e(a) {
                    var b = g(a), c = "" + String.fromCharCode(b >> 16) + String.fromCharCode(b >> 8 & 255) + String.fromCharCode(255 & b);
                    return l.encode(c)
                }
                function f(a, b) {
                    var c = e(a), d = b;
                    return c[0] == d[0] && c[1] == d[1] && c[2] == d[2]
                }
                function g(a) {
                    for (var b = 11994318, c = 0; a.length - c > 16; )
                        b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 1))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 2))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 3))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 4))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 5))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 6))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 7))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 8))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 9))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 10))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 11))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 12))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 13))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 14))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 15))], c += 16;
                    for (var d = c; d < a.length; d++)
                        b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c++))];
                    return 16777215 & b
                }
                function h(a) {
                    var b = /^[\t ]*\n/m, c = "", d = a, e = b.exec(a);
                    return null !== e && (c = a.slice(0, e.index), d = a.slice(e.index + e[0].length)), {headers: c,body: d}
                }
                function i(a) {
                    var b = /^=/m, c = a, d = "", e = b.exec(a);
                    return null !== e && (c = a.slice(0, e.index), d = a.slice(e.index + 1)), {body: c,checksum: d}
                }
                function j(a) {
                    var b = /^-----[^-]+-----$\n/m;
                    a = a.replace(/\r/g, "");
                    var d = c(a);
                    if (!d)
                        throw new Error("Unknow ASCII armor type");
                    var g, j, k, m = a.split(b), n = 1;
                    if (a.search(b) != m[0].length && (n = 0), 2 != d) {
                        k = h(m[n]);
                        var o = i(k.body);
                        g = {data: l.decode(o.body),type: d}, j = o.checksum
                    } else {
                        k = h(m[n].replace(/^- /gm, "").replace(/[\t ]+\n/g, "\n"));
                        var p = h(m[n + 1].replace(/^- /gm, "")), q = i(p.body);
                        g = {text: k.body.replace(/\n$/, "").replace(/\n/g, "\r\n"),data: l.decode(q.body),type: d}, j = q.checksum
                    }
                    if (f(g.data, j))
                        return g;
                    throw new Error("Ascii armor integrity check on message failed: '" + j + "' should be '" + e(g) + "'")
                }
                function k(a, b, c, f) {
                    var g = "";
                    switch (a) {
                        case m.armor.multipart_section:
                            g += "-----BEGIN PGP MESSAGE, PART " + c + "/" + f + "-----\r\n", g += d(), g += l.encode(b), g += "\r\n=" + e(b) + "\r\n", g += "-----END PGP MESSAGE, PART " + c + "/" + f + "-----\r\n";
                            break;
                        case m.armor.multipart_last:
                            g += "-----BEGIN PGP MESSAGE, PART " + c + "-----\r\n", g += d(), g += l.encode(b), g += "\r\n=" + e(b) + "\r\n", g += "-----END PGP MESSAGE, PART " + c + "-----\r\n";
                            break;
                        case m.armor.signed:
                            g += "\r\n-----BEGIN PGP SIGNED MESSAGE-----\r\n", g += "Hash: " + b.hash + "\r\n\r\n", g += b.text.replace(/\n-/g, "\n- -"), g += "\r\n-----BEGIN PGP SIGNATURE-----\r\n", g += d(), g += l.encode(b.data), g += "\r\n=" + e(b.data) + "\r\n", g += "-----END PGP SIGNATURE-----\r\n";
                            break;
                        case m.armor.message:
                            g += "-----BEGIN PGP MESSAGE-----\r\n", g += d(), g += l.encode(b), g += "\r\n=" + e(b) + "\r\n", g += "-----END PGP MESSAGE-----\r\n";
                            break;
                        case m.armor.public_key:
                            g += "-----BEGIN PGP PUBLIC KEY BLOCK-----\r\n", g += d(), g += l.encode(b), g += "\r\n=" + e(b) + "\r\n", g += "-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n";
                            break;
                        case m.armor.private_key:
                            g += "-----BEGIN PGP PRIVATE KEY BLOCK-----\r\n", g += d(), g += l.encode(b), g += "\r\n=" + e(b) + "\r\n", g += "-----END PGP PRIVATE KEY BLOCK-----\r\n"
                    }
                    return g
                }
                var l = a("./base64.js"), m = a("../enums.js"), n = a("../config"), o = [0, 8801531, 25875725, 17603062, 60024545, 51751450, 35206124, 44007191, 128024889, 120049090, 103502900, 112007375, 70412248, 78916387, 95990485, 88014382, 264588937, 256049778, 240098180, 248108927, 207005800, 215016595, 232553829, 224014750, 140824496, 149062475, 166599357, 157832774, 200747345, 191980970, 176028764, 184266919, 520933865, 529177874, 512099556, 503334943, 480196360, 471432179, 487973381, 496217854, 414011600, 405478443, 422020573, 430033190, 457094705, 465107658, 448029500, 439496647, 281648992, 273666971, 289622637, 298124950, 324696449, 333198714, 315665548, 307683447, 392699481, 401494690, 383961940, 375687087, 352057528, 343782467, 359738805, 368533838, 1041867730, 1050668841, 1066628831, 1058355748, 1032471859, 1024199112, 1006669886, 1015471301, 968368875, 960392720, 942864358, 951368477, 975946762, 984451313, 1000411399, 992435708, 836562267, 828023200, 810956886, 818967725, 844041146, 852051777, 868605623, 860066380, 914189410, 922427545, 938981743, 930215316, 904825475, 896059e3, 878993294, 887231349, 555053627, 563297984, 547333942, 538569677, 579245274, 570480673, 588005847, 596249900, 649392898, 640860153, 658384399, 666397428, 623318499, 631331096, 615366894, 606833685, 785398962, 777416777, 794487231, 802989380, 759421523, 767923880, 751374174, 743392165, 695319947, 704115056, 687564934, 679289981, 719477610, 711202705, 728272487, 737067676, 2083735460, 2092239711, 2109313705, 2101337682, 2141233477, 2133257662, 2116711496, 2125215923, 2073216669, 2064943718, 2048398224, 2057199467, 2013339772, 2022141063, 2039215473, 2030942602, 1945504045, 1936737750, 1920785440, 1929023707, 1885728716, 1893966647, 1911503553, 1902736954, 1951893524, 1959904495, 1977441561, 1968902626, 2009362165, 2000822798, 1984871416, 1992881923, 1665111629, 1673124534, 1656046400, 1647513531, 1621913772, 1613380695, 1629922721, 1637935450, 1688082292, 1679317903, 1695859321, 1704103554, 1728967061, 1737211246, 1720132760, 1711368291, 1828378820, 1820103743, 1836060105, 1844855090, 1869168165, 1877963486, 1860430632, 1852155859, 1801148925, 1809650950, 1792118e3, 1784135691, 1757986588, 1750004711, 1765960209, 1774462698, 1110107254, 1118611597, 1134571899, 1126595968, 1102643863, 1094667884, 1077139354, 1085643617, 1166763343, 1158490548, 1140961346, 1149762745, 1176011694, 1184812885, 1200772771, 1192499800, 1307552511, 1298785796, 1281720306, 1289958153, 1316768798, 1325007077, 1341561107, 1332794856, 1246636998, 1254647613, 1271201483, 1262662192, 1239272743, 1230733788, 1213667370, 1221678289, 1562785183, 1570797924, 1554833554, 1546300521, 1588974462, 1580441477, 1597965939, 1605978760, 1518843046, 1510078557, 1527603627, 1535847760, 1494504007, 1502748348, 1486784330, 1478020017, 1390639894, 1382365165, 1399434779, 1408230112, 1366334967, 1375129868, 1358579962, 1350304769, 1430452783, 1438955220, 1422405410, 1414423513, 1456544974, 1448562741, 1465633219, 1474135352];
                b.exports = {encode: k,decode: j}
            }, {"../config": 4,"../enums.js": 30,"./base64.js": 29}],29: [function(a, b) {
                function c(a) {
                    var b, c, d, f = "", g = 0, h = 0, i = a.length;
                    for (d = 0; i > d; d++)
                        c = a.charCodeAt(d), 0 === h ? (f += e.charAt(c >> 2 & 63), b = (3 & c) << 4) : 1 == h ? (f += e.charAt(b | c >> 4 & 15), b = (15 & c) << 2) : 2 == h && (f += e.charAt(b | c >> 6 & 3), g += 1, g % 60 === 0 && (f += "\n"), f += e.charAt(63 & c)), g += 1, g % 60 === 0 && (f += "\n"), h += 1, 3 == h && (h = 0);
                    return h > 0 && (f += e.charAt(b), g += 1, g % 60 === 0 && (f += "\n"), f += "=", g += 1), 1 == h && (g % 60 === 0 && (f += "\n"), f += "="), f
                }
                function d(a) {
                    var b, c, d = "", f = 0, g = 0, h = a.length;
                    for (c = 0; h > c; c++)
                        b = e.indexOf(a.charAt(c)), b >= 0 && (f && (d += String.fromCharCode(g | b >> 6 - f & 255)), f = f + 2 & 7, g = b << f & 255);
                    return d
                }
                var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                b.exports = {encode: c,decode: d}
            }, {}],30: [function(a, b) {
                b.exports = {s2k: {simple: 0,salted: 1,iterated: 3,gnu: 101},publicKey: {rsa_encrypt_sign: 1,rsa_encrypt: 2,rsa_sign: 3,elgamal: 16,dsa: 17},symmetric: {plaintext: 0,idea: 1,tripledes: 2,cast5: 3,blowfish: 4,aes128: 7,aes192: 8,aes256: 9,twofish: 10},compression: {uncompressed: 0,zip: 1,zlib: 2,bzip2: 3},hash: {md5: 1,sha1: 2,ripemd: 3,sha256: 8,sha384: 9,sha512: 10,sha224: 11},packet: {publicKeyEncryptedSessionKey: 1,signature: 2,symEncryptedSessionKey: 3,onePassSignature: 4,secretKey: 5,publicKey: 6,secretSubkey: 7,compressed: 8,symmetricallyEncrypted: 9,marker: 10,literal: 11,trust: 12,userid: 13,publicSubkey: 14,userAttribute: 17,symEncryptedIntegrityProtected: 18,modificationDetectionCode: 19},literal: {binary: "b".charCodeAt(),text: "t".charCodeAt(),utf8: "u".charCodeAt()},signature: {binary: 0,text: 1,standalone: 2,cert_generic: 16,cert_persona: 17,cert_casual: 18,cert_positive: 19,cert_revocation: 48,subkey_binding: 24,key_binding: 25,key: 31,key_revocation: 32,subkey_revocation: 40,timestamp: 64,third_party: 80},signatureSubpacket: {signature_creation_time: 2,signature_expiration_time: 3,exportable_certification: 4,trust_signature: 5,regular_expression: 6,revocable: 7,key_expiration_time: 9,placeholder_backwards_compatibility: 10,preferred_symmetric_algorithms: 11,revocation_key: 12,issuer: 16,notation_data: 20,preferred_hash_algorithms: 21,preferred_compression_algorithms: 22,key_server_preferences: 23,preferred_key_server: 24,primary_user_id: 25,policy_uri: 26,key_flags: 27,signers_user_id: 28,reason_for_revocation: 29,features: 30,signature_target: 31,embedded_signature: 32},keyFlags: {certify_keys: 1,sign_data: 2,encrypt_communication: 4,encrypt_storage: 8,split_private_key: 16,authentication: 32,shared_private_key: 128},keyStatus: {invalid: 0,expired: 1,revoked: 2,valid: 3,no_self_cert: 4},armor: {multipart_section: 0,multipart_last: 1,signed: 2,message: 3,public_key: 4,private_key: 5},write: function(a, b) {
                        if ("number" == typeof b && (b = this.read(a, b)), void 0 !== a[b])
                            return a[b];
                        throw new Error("Invalid enum value.")
                    },read: function(a, b) {
                        for (var c in a)
                            if (a[c] == b)
                                return c;
                        throw new Error("Invalid enum value.")
                    }}
            }, {}],31: [function(a, b) {
                b.exports = a("./openpgp.js"), b.exports.key = a("./key.js"), b.exports.message = a("./message.js"), b.exports.cleartext = a("./cleartext.js"), b.exports.util = a("./util.js"), b.exports.packet = a("./packet"), b.exports.MPI = a("./type/mpi.js"), b.exports.S2K = a("./type/s2k.js"), b.exports.Keyid = a("./type/keyid.js"), b.exports.armor = a("./encoding/armor.js"), b.exports.enums = a("./enums.js"), b.exports.config = a("./config/config.js"), b.exports.crypto = a("./crypto"), b.exports.Keyring = a("./keyring"), b.exports.AsyncProxy = a("./worker/async_proxy.js")
            }, {"./cleartext.js": 1,"./config/config.js": 3,"./crypto": 19,"./encoding/armor.js": 28,"./enums.js": 30,"./key.js": 32,"./keyring": 33,"./message.js": 36,"./openpgp.js": 37,"./packet": 40,"./type/keyid.js": 58,"./type/mpi.js": 59,"./type/s2k.js": 60,"./util.js": 61,"./worker/async_proxy.js": 62}],32: [function(a, b, c) {
                function d(a) {
                    if (!(this instanceof d))
                        return new d(a);
                    if (this.primaryKey = null, this.revocationSignature = null, this.directSignatures = null, this.users = null, this.subKeys = null, this.packetlist2structure(a), !this.primaryKey || !this.users)
                        throw new Error("Invalid key: need at least key and user ID packet")
                }
                function e(a, b) {
                    for (var c = 0; c < a.length; c++)
                        for (var d = a[c].getKeyId(), e = 0; e < b.length; e++)
                            if (d.equals(b[e]))
                                return a[c];
                    return null
                }
                function f(a, b) {
                    return a.algorithm !== n.read(n.publicKey, n.publicKey.dsa) && a.algorithm !== n.read(n.publicKey, n.publicKey.rsa_sign) && (!b.keyFlags || 0 !== (b.keyFlags[0] & n.keyFlags.encrypt_communication) || 0 !== (b.keyFlags[0] & n.keyFlags.encrypt_storage))
                }
                function g(a, b) {
                    return !(a.algorithm != n.read(n.publicKey, n.publicKey.dsa) && a.algorithm != n.read(n.publicKey, n.publicKey.rsa_sign) && a.algorithm != n.read(n.publicKey, n.publicKey.rsa_encrypt_sign) || b.keyFlags && 0 === (b.keyFlags[0] & n.keyFlags.sign_data))
                }
                function h(a, b) {
                    return 3 == a.version && 0 !== a.expirationTimeV3 ? new Date(a.created.getTime() + 24 * a.expirationTimeV3 * 3600 * 1e3) : 4 == a.version && b.keyNeverExpires === !1 ? new Date(a.created.getTime() + 1e3 * b.keyExpirationTime) : null
                }
                function i(a) {
                    return this instanceof i ? (this.userId = a.tag == n.packet.userid ? a : null, this.userAttribute = a.tag == n.packet.userAttribute ? a : null, this.selfCertifications = null, this.otherCertifications = null, void (this.revocationCertifications = null)) : new i(a)
                }
                function j(a) {
                    return this instanceof j ? (this.subKey = a, this.bindingSignature = null, void (this.revocationSignature = null)) : new j(a)
                }
                function k(a) {
                    var b = {};
                    b.keys = [];
                    try {
                        var c = o.decode(a);
                        if (c.type != n.armor.public_key && c.type != n.armor.private_key)
                            throw new Error("Armored text not of type key");
                        var e = new m.List;
                        e.read(c.data);
                        var f = e.indexOfTag(n.packet.publicKey, n.packet.secretKey);
                        if (0 === f.length)
                            throw new Error("No key packet found in armored text");
                        for (var g = 0; g < f.length; g++) {
                            var h = e.slice(f[g], f[g + 1]);
                            try {
                                var i = new d(h);
                                b.keys.push(i)
                            } catch (j) {
                                b.err = b.err || [], b.err.push(j)
                            }
                        }
                    } catch (j) {
                        b.err = b.err || [], b.err.push(j)
                    }
                    return b
                }
                function l(a, b, c, e) {
                    var f = new m.List, g = new m.SecretKey;
                    g.algorithm = n.read(n.publicKey, a), g.generate(b), g.encrypt(e);
                    var h = new m.Userid;
                    h.read(c);
                    var i = {};
                    i.userid = h, i.key = g;
                    var j = new m.Signature;
                    j.signatureType = n.signature.cert_generic, j.publicKeyAlgorithm = a, j.hashAlgorithm = n.hash.sha256, j.keyFlags = [n.keyFlags.certify_keys | n.keyFlags.sign_data], j.sign(g, i);
                    var k = new m.SecretSubkey;
                    k.algorithm = n.read(n.publicKey, a), k.generate(b), k.encrypt(e), i = {}, i.key = g, i.bind = k;
                    var l = new m.Signature;
                    return l.signatureType = n.signature.subkey_binding, l.publicKeyAlgorithm = a, l.hashAlgorithm = n.hash.sha256, l.keyFlags = [n.keyFlags.encrypt_communication | n.keyFlags.encrypt_storage], l.sign(g, i), f.push(g), f.push(h), f.push(j), f.push(k), f.push(l), new d(f)
                }
                var m = a("./packet"), n = a("./enums.js"), o = a("./encoding/armor.js"), p = a("./config");
                d.prototype.packetlist2structure = function(a) {
                    for (var b, c, d, e = 0; e < a.length; e++)
                        switch (a[e].tag) {
                            case n.packet.publicKey:
                            case n.packet.secretKey:
                                this.primaryKey = a[e], c = this.primaryKey.getKeyId();
                                break;
                            case n.packet.userid:
                            case n.packet.userAttribute:
                                b = new i(a[e]), this.users || (this.users = []), this.users.push(b);
                                break;
                            case n.packet.publicSubkey:
                            case n.packet.secretSubkey:
                                b = null, this.subKeys || (this.subKeys = []), d = new j(a[e]), this.subKeys.push(d);
                                break;
                            case n.packet.signature:
                                switch (a[e].signatureType) {
                                    case n.signature.cert_generic:
                                    case n.signature.cert_persona:
                                    case n.signature.cert_casual:
                                    case n.signature.cert_positive:
                                        a[e].issuerKeyId.equals(c) ? (b.selfCertifications || (b.selfCertifications = []), b.selfCertifications.push(a[e])) : (b.otherCertifications || (b.otherCertifications = []), b.otherCertifications.push(a[e]));
                                        break;
                                    case n.signature.cert_revocation:
                                        b ? (b.revocationCertifications || (b.revocationCertifications = []), b.revocationCertifications.push(a[e])) : (this.directSignatures || (this.directSignatures = []), this.directSignatures.push(a[e]));
                                        break;
                                    case n.signature.key:
                                        this.directSignatures || (this.directSignatures = []), this.directSignatures.push(a[e]);
                                        break;
                                    case n.signature.subkey_binding:
                                        d.bindingSignature = a[e];
                                        break;
                                    case n.signature.key_revocation:
                                        this.revocationSignature = a[e];
                                        break;
                                    case n.signature.subkey_revocation:
                                        d.revocationSignature = a[e]
                                }
                        }
                }, d.prototype.toPacketlist = function() {
                    var a = new m.List;
                    a.push(this.primaryKey), a.push(this.revocationSignature), a.concat(this.directSignatures);
                    var b;
                    for (b = 0; b < this.users.length; b++)
                        a.concat(this.users[b].toPacketlist());
                    if (this.subKeys)
                        for (b = 0; b < this.subKeys.length; b++)
                            a.concat(this.subKeys[b].toPacketlist());
                    return a
                }, d.prototype.getKeyPacket = function() {
                    return this.primaryKey
                }, d.prototype.getSubkeyPackets = function() {
                    var a = [];
                    if (this.subKeys)
                        for (var b = 0; b < this.subKeys.length; b++)
                            a.push(this.subKeys[b].subKey);
                    return a
                }, d.prototype.getAllKeyPackets = function() {
                    return [this.getKeyPacket()].concat(this.getSubkeyPackets())
                }, d.prototype.getKeyIds = function() {
                    for (var a = [], b = this.getAllKeyPackets(), c = 0; c < b.length; c++)
                        a.push(b[c].getKeyId());
                    return a
                }, d.prototype.getPublicKeyPacket = function(a) {
                    return this.primaryKey.tag == n.packet.publicKey ? e(this.getAllKeyPackets(), a) : null
                }, d.prototype.getPrivateKeyPacket = function(a) {
                    return this.primaryKey.tag == n.packet.secretKey ? e(this.getAllKeyPackets(), a) : null
                }, d.prototype.getUserIds = function() {
                    for (var a = [], b = 0; b < this.users.length; b++)
                        this.users[b].userId && a.push(this.users[b].userId.write());
                    return a
                }, d.prototype.isPublic = function() {
                    return this.primaryKey.tag == n.packet.publicKey
                }, d.prototype.isPrivate = function() {
                    return this.primaryKey.tag == n.packet.secretKey
                }, d.prototype.toPublic = function() {
                    for (var a, b = new m.List, c = this.toPacketlist(), e = 0; e < c.length; e++)
                        switch (c[e].tag) {
                            case n.packet.secretKey:
                                a = c[e].writePublicKey();
                                var f = new m.PublicKey;
                                f.read(a), b.push(f);
                                break;
                            case n.packet.secretSubkey:
                                a = c[e].writePublicKey();
                                var g = new m.PublicSubkey;
                                g.read(a), b.push(g);
                                break;
                            default:
                                b.push(c[e])
                        }
                    return new d(b)
                }, d.prototype.armor = function() {
                    var a = this.isPublic() ? n.armor.public_key : n.armor.private_key;
                    return o.encode(a, this.toPacketlist().write())
                }, d.prototype.getSigningKeyPacket = function() {
                    if (this.isPublic())
                        throw new Error("Need private key for signing");
                    var a = this.getPrimaryUser();
                    if (a && g(this.primaryKey, a.selfCertificate))
                        return this.primaryKey;
                    if (this.subKeys)
                        for (var b = 0; b < this.subKeys.length; b++)
                            if (this.subKeys[b].isValidSigningKey(this.primaryKey))
                                return this.subKeys[b].subKey;
                    return null
                }, d.prototype.getPreferredHashAlgorithm = function() {
                    var a = this.getPrimaryUser();
                    return a && a.selfCertificate.preferredHashAlgorithms ? a.selfCertificate.preferredHashAlgorithms[0] : p.prefer_hash_algorithm
                }, d.prototype.getEncryptionKeyPacket = function() {
                    if (this.subKeys)
                        for (var a = 0; a < this.subKeys.length; a++)
                            if (this.subKeys[a].isValidEncryptionKey(this.primaryKey))
                                return this.subKeys[a].subKey;
                    var b = this.getPrimaryUser();
                    return b && f(this.primaryKey, b.selfCertificate) ? this.primaryKey : null
                }, d.prototype.decrypt = function(a) {
                    if (!this.isPrivate())
                        throw new Error("Nothing to decrypt in a public key");
                    for (var b = this.getAllKeyPackets(), c = 0; c < b.length; c++) {
                        var d = b[c].decrypt(a);
                        if (!d)
                            return !1
                    }
                    return !0
                }, d.prototype.decryptKeyPacket = function(a, b) {
                    if (!this.isPrivate())
                        throw new Error("Nothing to decrypt in a public key");
                    for (var c = this.getAllKeyPackets(), d = 0; d < c.length; d++)
                        for (var e = c[d].getKeyId(), f = 0; f < a.length; f++)
                            if (e.equals(a[f])) {
                                var g = c[d].decrypt(b);
                                if (!g)
                                    return !1
                            }
                    return !0
                }, d.prototype.verifyPrimaryKey = function() {
                    if (this.revocationSignature && !this.revocationSignature.isExpired() && (this.revocationSignature.verified || this.revocationSignature.verify(this.primaryKey, {key: this.primaryKey})))
                        return n.keyStatus.revoked;
                    if (3 == this.primaryKey.version && 0 !== this.primaryKey.expirationTimeV3 && Date.now() > this.primaryKey.created.getTime() + 24 * this.primaryKey.expirationTimeV3 * 3600 * 1e3)
                        return n.keyStatus.expired;
                    for (var a = !1, b = 0; b < this.users.length; b++)
                        this.users[b].userId && this.users[b].selfCertifications && (a = !0);
                    if (!a)
                        return n.keyStatus.no_self_cert;
                    var c = this.getPrimaryUser();
                    return c ? 4 == this.primaryKey.version && c.selfCertificate.keyNeverExpires === !1 && Date.now() > this.primaryKey.created.getTime() + 1e3 * c.selfCertificate.keyExpirationTime ? n.keyStatus.expired : n.keyStatus.valid : n.keyStatus.invalid
                }, d.prototype.getExpirationTime = function() {
                    if (3 == this.primaryKey.version)
                        return h(this.primaryKey);
                    if (4 == this.primaryKey.version) {
                        var a = this.getPrimaryUser();
                        return a ? h(this.primaryKey, a.selfCertificate) : null
                    }
                }, d.prototype.getPrimaryUser = function() {
                    for (var a, b = null, c = 0; c < this.users.length; c++)
                        if (this.users[c].userId) {
                            var d = this.users[c].getValidSelfCertificate(this.primaryKey);
                            d && (!b || !a.isPrimaryUserID && d.isPrimaryUserID || a.created < d.created) && (b = this.users[c], a = d)
                        }
                    return b ? {user: b,selfCertificate: a} : null
                }, d.prototype.revoke = function() {
                }, i.prototype.toPacketlist = function() {
                    var a = new m.List;
                    return a.push(this.userId || this.userAttribute), a.concat(this.revocationCertifications), a.concat(this.selfCertifications), a.concat(this.otherCertifications), a
                }, i.prototype.isRevoked = function(a, b) {
                    if (this.revocationCertifications) {
                        var c = this;
                        return this.revocationCertifications.some(function(d) {
                            return d.issuerKeyId.equals(a.issuerKeyId) && !d.isExpired() && (d.verified || d.verify(b, {userid: c.userId || c.userAttribute,key: b}))
                        })
                    }
                    return !1
                }, i.prototype.getValidSelfCertificate = function(a) {
                    if (!this.selfCertifications)
                        return null;
                    for (var b = [], c = 0; c < this.selfCertifications.length; c++)
                        this.isRevoked(this.selfCertifications[c], a) || this.selfCertifications[c].isExpired() || !this.selfCertifications[c].verified && !this.selfCertifications[c].verify(a, {userid: this.userId || this.userAttribute,key: a}) || b.push(this.selfCertifications[c]);
                    return b = b.sort(function(a, b) {
                        return a = a.created, b = b.created, a > b ? -1 : b > a ? 1 : 0
                    }), b[0]
                }, i.prototype.verify = function(a) {
                    if (!this.selfCertifications)
                        return n.keyStatus.no_self_cert;
                    for (var b, c = 0; c < this.selfCertifications.length; c++)
                        if (this.isRevoked(this.selfCertifications[c], a))
                            b = n.keyStatus.revoked;
                        else if (this.selfCertifications[c].verified || this.selfCertifications[c].verify(a, {userid: this.userId || this.userAttribute,key: a})) {
                            if (!this.selfCertifications[c].isExpired()) {
                                b = n.keyStatus.valid;
                                break
                            }
                            b = n.keyStatus.expired
                        } else
                            b = n.keyStatus.invalid;
                    return b
                }, j.prototype.toPacketlist = function() {
                    var a = new m.List;
                    return a.push(this.subKey), a.push(this.revocationSignature), a.push(this.bindingSignature), a
                }, j.prototype.isValidEncryptionKey = function(a) {
                    return this.verify(a) == n.keyStatus.valid && f(this.subKey, this.bindingSignature)
                }, j.prototype.isValidSigningKey = function(a) {
                    return this.verify(a) == n.keyStatus.valid && g(this.subKey, this.bindingSignature)
                }, j.prototype.verify = function(a) {
                    return this.revocationSignature && !this.revocationSignature.isExpired() && (this.revocationSignature.verified || this.revocationSignature.verify(a, {key: a,bind: this.subKey})) ? n.keyStatus.revoked : 3 == this.subKey.version && 0 !== this.subKey.expirationTimeV3 && Date.now() > this.subKey.created.getTime() + 24 * this.subKey.expirationTimeV3 * 3600 * 1e3 ? n.keyStatus.expired : this.bindingSignature ? this.bindingSignature.isExpired() ? n.keyStatus.expired : this.bindingSignature.verified || this.bindingSignature.verify(a, {key: a,bind: this.subKey}) ? 4 == this.subKey.version && this.bindingSignature.keyNeverExpires === !1 && Date.now() > this.subKey.created.getTime() + 1e3 * this.bindingSignature.keyExpirationTime ? n.keyStatus.expired : n.keyStatus.valid : n.keyStatus.invalid : n.keyStatus.invalid
                }, j.prototype.getExpirationTime = function() {
                    return h(this.subKey, this.bindingSignature)
                }, c.Key = d, c.readArmored = k, c.generate = l
            }, {"./config": 4,"./encoding/armor.js": 28,"./enums.js": 30,"./packet": 40}],33: [function(a, b) {
                b.exports = a("./keyring.js"), b.exports.localstore = a("./localstore.js")
            }, {"./keyring.js": 34,"./localstore.js": 35}],34: [function(a, b) {
                function c(b) {
                    this.storeHandler = b || new (a("./localstore.js")), this.keys = this.storeHandler.load()
                }
                function d(a, b) {
                    a = a.toLowerCase();
                    for (var c = b.getUserIds(), d = 0; d < c.length; d++)
                        if (keyEmail = c[d].split("<")[1].split(">")[0].trim().toLowerCase(), keyEmail == a)
                            return !0;
                    return !1
                }
                function e(a, b) {
                    for (var c = b.getKeyIds(), d = 0; d < c.length; d++)
                        if (i.hexstrdump(c[d].write()) == a)
                            return !0;
                    return !1
                }
                function f(a, b, c, d) {
                    for (var e = [], f = 0; f < a.length; f++) {
                        var h = a[f];
                        switch (d) {
                            case g.packet.publicKey:
                                h.isPublic() && b(c, h) && e.push(h);
                                break;
                            case g.packet.secretKey:
                                h.isPrivate() && b(c, h) && e.push(h)
                        }
                    }
                    return e
                }
                var g = a("../enums.js"), h = a("../key.js"), i = a("../util.js");
                b.exports = c, c.prototype.store = function() {
                    this.storeHandler.store(this.keys)
                }, c.prototype.clear = function() {
                    this.keys = []
                }, c.prototype.getPublicKeyForAddress = function(a) {
                    return f(this.keys, d, a, g.packet.publicKey)
                }, c.prototype.getPrivateKeyForAddress = function(a) {
                    return f(this.keys, d, a, g.packet.secretKey)
                }, c.prototype.getKeysForKeyId = function(a) {
                    return f(this.keys, e, a, g.packet.publicKey)
                }, c.prototype.importKey = function(a) {
                    return this.keys = this.keys.concat(h.readArmored(a).keys), !0
                }, c.prototype.exportKey = function(a) {
                    return this.keys[a].armor()
                }, c.prototype.removeKey = function(a) {
                    var b = this.keys.splice(a, 1);
                    return b
                }, c.prototype.exportPublicKey = function(a) {
                    return this.keys[a].toPublic().armor()
                }
            }, {"../enums.js": 30,"../key.js": 32,"../util.js": 61,"./localstore.js": 35}],35: [function(a, b) {
                function c(b) {
                    this.storage = "undefined" != typeof window && window.localStorage ? window.localStorage : new (a("node-localstorage").LocalStorage)(d.config.node_store), "string" == typeof b && (this.item = b)
                }
                b.exports = c;
                var d = a("../");
                c.prototype.item = "armoredKeys", c.prototype.load = function() {
                    var a = JSON.parse(this.storage.getItem(this.item)), b = [];
                    if (null !== a && 0 !== a.length)
                        for (var c, e = 0; e < a.length; e++)
                            c = d.key.readArmored(a[e]).keys[0], b.push(c);
                    return b
                }, c.prototype.store = function(a) {
                    for (var b = [], c = 0; c < a.length; c++)
                        b.push(a[c].armor());
                    this.storage.setItem(this.item, JSON.stringify(b))
                }
            }, {"../": 31,"node-localstorage": !1}],36: [function(a, b, c) {
                function d(a) {
                    return this instanceof d ? void (this.packets = a || new h.List) : new d(a)
                }
                function e(a) {
                    var b = j.decode(a).data, c = new h.List;
                    c.read(b);
                    var e = new d(c);
                    return e
                }
                function f(a) {
                    var b = new h.Literal;
                    b.setText(a);
                    var c = new h.List;
                    c.push(b);
                    var e = new d(c);
                    return e
                }
                function g(a) {
                    var b = new h.Literal;
                    b.setBytes(a, i.read(i.literal, i.literal.binary));
                    var c = new h.List;
                    c.push(b);
                    var e = new d(c);
                    return e
                }
                var h = a("./packet"), i = a("./enums.js"), j = a("./encoding/armor.js"), k = a("./config"), l = a("./crypto");
                d.prototype.getEncryptionKeyIds = function() {
                    var a = [], b = this.packets.filterByTag(i.packet.publicKeyEncryptedSessionKey);
                    return b.forEach(function(b) {
                        a.push(b.publicKeyId)
                    }), a
                }, d.prototype.getSigningKeyIds = function() {
                    var a = [], b = this.unwrapCompressed(), c = b.packets.filterByTag(i.packet.onePassSignature);
                    if (c.forEach(function(b) {
                        a.push(b.signingKeyId)
                    }), !a.length) {
                        var d = b.packets.filterByTag(i.packet.signature);
                        d.forEach(function(b) {
                            a.push(b.issuerKeyId)
                        })
                    }
                    return a
                }, d.prototype.decrypt = function(a) {
                    var b = this.getEncryptionKeyIds();
                    if (!b.length)
                        return this;
                    var c = a.getPrivateKeyPacket(b);
                    if (!c.isDecrypted)
                        throw new Error("Private key is not decrypted.");
                    for (var e, f = this.packets.filterByTag(i.packet.publicKeyEncryptedSessionKey), g = 0; g < f.length; g++)
                        if (f[g].publicKeyId.equals(c.getKeyId())) {
                            e = f[g], e.decrypt(c);
                            break
                        }
                    if (e) {
                        var h = this.packets.filterByTag(i.packet.symmetricallyEncrypted, i.packet.symEncryptedIntegrityProtected);
                        if (0 !== h.length) {
                            var j = h[0];
                            return j.decrypt(e.sessionKeyAlgorithm, e.sessionKey), new d(j.packets)
                        }
                    }
                }, d.prototype.getLiteralData = function() {
                    var a = this.packets.findPacket(i.packet.literal);
                    return a && a.data || null
                }, d.prototype.getText = function() {
                    var a = this.packets.findPacket(i.packet.literal);
                    return a ? a.getText() : null
                }, d.prototype.encrypt = function(a) {
                    var b = new h.List, c = l.generateSessionKey(i.read(i.symmetric, k.encryption_cipher));
                    a.forEach(function(a) {
                        var d = a.getEncryptionKeyPacket();
                        if (!d)
                            throw new Error("Could not find valid key packet for encryption in key " + a.primaryKey.getKeyId().toHex());
                        var e = new h.PublicKeyEncryptedSessionKey;
                        e.publicKeyId = d.getKeyId(), e.publicKeyAlgorithm = d.algorithm, e.sessionKey = c, e.sessionKeyAlgorithm = i.read(i.symmetric, k.encryption_cipher), e.encrypt(d), b.push(e)
                    });
                    var e;
                    return e = k.integrity_protect ? new h.SymEncryptedIntegrityProtected : new h.SymmetricallyEncrypted, e.packets = this.packets, e.encrypt(i.read(i.symmetric, k.encryption_cipher), c), b.push(e), e.packets = new h.List, new d(b)
                }, d.prototype.sign = function(a) {
                    var b = new h.List, c = this.packets.findPacket(i.packet.literal);
                    if (!c)
                        throw new Error("No literal data packet to sign.");
                    var e, f = i.write(i.literal, c.format), g = f == i.literal.binary ? i.signature.binary : i.signature.text;
                    for (e = 0; e < a.length; e++) {
                        var j = new h.OnePassSignature;
                        j.type = g, j.hashAlgorithm = k.prefer_hash_algorithm;
                        var l = a[e].getSigningKeyPacket();
                        if (!l)
                            throw new Error("Could not find valid key packet for signing in key " + a[e].primaryKey.getKeyId().toHex());
                        j.publicKeyAlgorithm = l.algorithm, j.signingKeyId = l.getKeyId(), b.push(j)
                    }
                    for (b.push(c), e = a.length - 1; e >= 0; e--) {
                        var m = new h.Signature;
                        if (m.signatureType = g, m.hashAlgorithm = k.prefer_hash_algorithm, m.publicKeyAlgorithm = l.algorithm, !l.isDecrypted)
                            throw new Error("Private key is not decrypted.");
                        m.sign(l, c), b.push(m)
                    }
                    return new d(b)
                }, d.prototype.verify = function(a) {
                    var b = [], c = this.unwrapCompressed(), d = c.packets.filterByTag(i.packet.literal);
                    if (1 !== d.length)
                        throw new Error("Can only verify message with one literal data packet.");
                    var e = c.packets.filterByTag(i.packet.signature);
                    return a.forEach(function(a) {
                        for (var c = 0; c < e.length; c++) {
                            var f = a.getPublicKeyPacket([e[c].issuerKeyId]);
                            if (f) {
                                var g = {};
                                g.keyid = e[c].issuerKeyId, g.valid = e[c].verify(f, d[0]), b.push(g);
                                break
                            }
                        }
                    }), b
                }, d.prototype.unwrapCompressed = function() {
                    var a = this.packets.filterByTag(i.packet.compressed);
                    return a.length ? new d(a[0].packets) : this
                }, d.prototype.armor = function() {
                    return j.encode(i.armor.message, this.packets.write())
                }, c.Message = d, c.readArmored = e, c.fromText = f, c.fromBinary = g
            }, {"./config": 4,"./crypto": 19,"./encoding/armor.js": 28,"./enums.js": 30,"./packet": 40}],37: [function(a, b, c) {
                function d(a) {
                    n = new t(a)
                }
                function e(a, b, c) {
                    return l(c) ? void n.encryptMessage(a, b, c) : m(function() {
                        var c, d;
                        return c = q.fromText(b), c = c.encrypt(a), d = o.encode(p.armor.message, c.packets.write())
                    }, c)
                }
                function f(a, b, c, d) {
                    return l(d) ? void n.signAndEncryptMessage(a, b, c, d) : m(function() {
                        var d, e;
                        return d = q.fromText(c), d = d.sign([b]), d = d.encrypt(a), e = o.encode(p.armor.message, d.packets.write())
                    }, d)
                }
                function g(a, b, c) {
                    return l(c) ? void n.decryptMessage(a, b, c) : m(function() {
                        return b = b.decrypt(a), b.getText()
                    }, c)
                }
                function h(a, b, c, d) {
                    return l(d) ? void n.decryptAndVerifyMessage(a, b, c, d) : m(function() {
                        var d = {};
                        return c = c.decrypt(a), d.text = c.getText(), d.text ? (d.signatures = c.verify(b), d) : null
                    }, d)
                }
                function i(a, b, c) {
                    return l(c) ? void n.signClearMessage(a, b, c) : m(function() {
                        var c = new r.CleartextMessage(b);
                        return c.sign(a), c.armor()
                    }, c)
                }
                function j(a, b, c) {
                    return l(c) ? void n.verifyClearSignedMessage(a, b, c) : m(function() {
                        var c = {};
                        if (!(b instanceof r.CleartextMessage))
                            throw new Error("Parameter [message] needs to be of type CleartextMessage.");
                        return c.text = b.getText(), c.signatures = b.verify(a), c
                    }, c)
                }
                function k(a, b, c, d, e) {
                    return l(e) ? void n.generateKeyPair(a, b, c, d, e) : m(function() {
                        var e = {}, f = s.generate(a, b, c, d);
                        return e.key = f, e.privateKeyArmored = f.armor(), e.publicKeyArmored = f.toPublic().armor(), e
                    }, e)
                }
                function l(a) {
                    if ("undefined" == typeof window || !window.Worker || "function" != typeof a)
                        return !1;
                    if (!n)
                        throw new Error("You need to set the worker path!");
                    return !0
                }
                function m(a, b) {
                    var c;
                    try {
                        c = a()
                    } catch (d) {
                        if (b)
                            return void b(d);
                        throw d
                    }
                    return b ? void b(null, c) : c
                }
                var n, o = a("./encoding/armor.js"), p = (a("./packet"), a("./enums.js")), q = (a("./config"), a("./message.js")), r = a("./cleartext.js"), s = a("./key.js"), t = a("./worker/async_proxy.js");
                c.initWorker = d, c.encryptMessage = e, c.signAndEncryptMessage = f, c.decryptMessage = g, c.decryptAndVerifyMessage = h, c.signClearMessage = i, c.verifyClearSignedMessage = j, c.generateKeyPair = k
            }, {"./cleartext.js": 1,"./config": 4,"./encoding/armor.js": 28,"./enums.js": 30,"./key.js": 32,"./message.js": 36,"./packet": 40,"./worker/async_proxy.js": 62}],38: [function(a, b) {
                function c(a) {
                    return a.substr(0, 1).toUpperCase() + a.substr(1)
                }
                var d = a("../enums.js");
                b.exports = {Compressed: a("./compressed.js"),SymEncryptedIntegrityProtected: a("./sym_encrypted_integrity_protected.js"),PublicKeyEncryptedSessionKey: a("./public_key_encrypted_session_key.js"),SymEncryptedSessionKey: a("./sym_encrypted_session_key.js"),Literal: a("./literal.js"),PublicKey: a("./public_key.js"),SymmetricallyEncrypted: a("./symmetrically_encrypted.js"),Marker: a("./marker.js"),PublicSubkey: a("./public_subkey.js"),UserAttribute: a("./user_attribute.js"),OnePassSignature: a("./one_pass_signature.js"),SecretKey: a("./secret_key.js"),Userid: a("./userid.js"),SecretSubkey: a("./secret_subkey.js"),Signature: a("./signature.js"),Trust: a("./trust.js"),newPacketFromTag: function(a) {
                        return new (this[c(a)])
                    },fromStructuredClone: function(a) {
                        var b = d.read(d.packet, a.tag), c = this.newPacketFromTag(b);
                        for (var e in a)
                            a.hasOwnProperty(e) && (c[e] = a[e]);
                        return c.postCloneTypeFix && c.postCloneTypeFix(), c
                    }}
            }, {"../enums.js": 30,"./compressed.js": 39,"./literal.js": 41,"./marker.js": 42,"./one_pass_signature.js": 43,"./public_key.js": 46,"./public_key_encrypted_session_key.js": 47,"./public_subkey.js": 48,"./secret_key.js": 49,"./secret_subkey.js": 50,"./signature.js": 51,"./sym_encrypted_integrity_protected.js": 52,"./sym_encrypted_session_key.js": 53,"./symmetrically_encrypted.js": 54,"./trust.js": 55,"./user_attribute.js": 56,"./userid.js": 57}],39: [function(a, b) {
                function c() {
                    this.tag = d.packet.compressed, this.packets = null, this.algorithm = "uncompressed", this.compressed = null
                }
                b.exports = c;
                var d = a("../enums.js"), e = a("../compression/jxg.js"), f = a("../encoding/base64.js");
                c.prototype.read = function(a) {
                    this.algorithm = d.read(d.compression, a.charCodeAt(0)), this.compressed = a.substr(1), this.decompress()
                }, c.prototype.write = function() {
                    return null === this.compressed && this.compress(), String.fromCharCode(d.write(d.compression, this.algorithm)) + this.compressed
                }, c.prototype.decompress = function() {
                    var a, b;
                    switch (this.algorithm) {
                        case "uncompressed":
                            a = this.compressed;
                            break;
                        case "zip":
                            compData = this.compressed, b = f.encode(compData).replace(/\n/g, "");
                            var c = new e.Util.Unzip(e.Util.Base64.decodeAsArray(b));
                            a = unescape(c.deflate()[0][0]);
                            break;
                        case "zlib":
                            var d = this.compressed.charCodeAt(0) % 16;
                            if (8 == d) {
                                compData = this.compressed.substring(0, this.compressed.length - 4), b = f.encode(compData).replace(/\n/g, ""), a = e.decompress(b);
                                break
                            }
                            throw new Error("Compression algorithm ZLIB only supports DEFLATE compression method.");
                        case "bzip2":
                            throw new Error("Compression algorithm BZip2 [BZ2] is not implemented.");
                        default:
                            throw new Error("Compression algorithm unknown :" + this.alogrithm)
                    }
                    this.packets.read(a)
                }, c.prototype.compress = function() {
                    switch (this.algorithm) {
                        case "uncompressed":
                            this.compressed = this.packets.write();
                            break;
                        case "zip":
                            throw new Error("Compression algorithm ZIP [RFC1951] is not implemented.");
                        case "zlib":
                            throw new Error("Compression algorithm ZLIB [RFC1950] is not implemented.");
                        case "bzip2":
                            throw new Error("Compression algorithm BZip2 [BZ2] is not implemented.");
                        default:
                            throw new Error("Compression algorithm unknown :" + this.type)
                    }
                }
            }, {"../compression/jxg.js": 2,"../encoding/base64.js": 29,"../enums.js": 30}],40: [function(a, b) {
                a("../enums.js");
                b.exports = {List: a("./packetlist.js")};
                var c = a("./all_packets.js");
                for (var d in c)
                    b.exports[d] = c[d]
            }, {"../enums.js": 30,"./all_packets.js": 38,"./packetlist.js": 45}],41: [function(a, b) {
                function c() {
                    this.tag = e.packet.literal, this.format = "utf8", this.data = "", this.date = new Date
                }
                b.exports = c;
                var d = a("../util.js"), e = a("../enums.js");
                c.prototype.setText = function(a) {
                    a = a.replace(/\r/g, "").replace(/\n/g, "\r\n"), this.data = "utf8" == this.format ? d.encode_utf8(a) : a
                }, c.prototype.getText = function() {
                    var a = d.decode_utf8(this.data);
                    return a.replace(/\r\n/g, "\n")
                }, c.prototype.setBytes = function(a, b) {
                    this.format = b, this.data = a
                }, c.prototype.getBytes = function() {
                    return this.data
                }, c.prototype.read = function(a) {
                    var b = e.read(e.literal, a.charCodeAt(0)), c = a.charCodeAt(1);
                    this.filename = d.decode_utf8(a.substr(2, c)), this.date = d.readDate(a.substr(2 + c, 4));
                    var f = a.substring(6 + c);
                    this.setBytes(f, b)
                }, c.prototype.write = function() {
                    var a = d.encode_utf8("msg.txt"), b = this.getBytes(), c = "";
                    return c += String.fromCharCode(e.write(e.literal, this.format)), c += String.fromCharCode(a.length), c += a, c += d.writeDate(this.date), c += b
                }
            }, {"../enums.js": 30,"../util.js": 61}],42: [function(a, b) {
                function c() {
                    this.tag = d.packet.marker
                }
                b.exports = c;
                var d = a("../enums.js");
                c.prototype.read = function(a) {
                    return 80 == a.charCodeAt(0) && 71 == a.charCodeAt(1) && 80 == a.charCodeAt(2) ? !0 : !1
                }
            }, {"../enums.js": 30}],43: [function(a, b) {
                function c() {
                    this.tag = d.packet.onePassSignature, this.version = null, this.type = null, this.hashAlgorithm = null, this.publicKeyAlgorithm = null, this.signingKeyId = null, this.flags = null
                }
                b.exports = c;
                var d = a("../enums.js"), e = a("../type/keyid.js");
                c.prototype.read = function(a) {
                    var b = 0;
                    return this.version = a.charCodeAt(b++), this.type = d.read(d.signature, a.charCodeAt(b++)), this.hashAlgorithm = d.read(d.hash, a.charCodeAt(b++)), this.publicKeyAlgorithm = d.read(d.publicKey, a.charCodeAt(b++)), this.signingKeyId = new e, this.signingKeyId.read(a.substr(b)), b += 8, this.flags = a.charCodeAt(b++), this
                }, c.prototype.write = function() {
                    var a = "";
                    return a += String.fromCharCode(3), a += String.fromCharCode(d.write(d.signature, this.type)), a += String.fromCharCode(d.write(d.hash, this.hashAlgorithm)), a += String.fromCharCode(d.write(d.publicKey, this.publicKeyAlgorithm)), a += this.signingKeyId.write(), a += String.fromCharCode(this.flags)
                }, c.prototype.postCloneTypeFix = function() {
                    this.signingKeyId = e.fromClone(this.signingKeyId)
                }
            }, {"../enums.js": 30,"../type/keyid.js": 58}],44: [function(a, b) {
                var c = (a("../enums.js"), a("../util.js"));
                b.exports = {readSimpleLength: function(a) {
                        var b, d = 0, e = a.charCodeAt(0);
                        return 192 > e ? (d = a.charCodeAt(0), b = 1) : 255 > e ? (d = (a.charCodeAt(0) - 192 << 8) + a.charCodeAt(1) + 192, b = 2) : 255 == e && (d = c.readNumber(a.substr(1, 4)), b = 5), {len: d,offset: b}
                    },writeSimpleLength: function(a) {
                        var b = "";
                        return 192 > a ? b += String.fromCharCode(a) : a > 191 && 8384 > a ? (b += String.fromCharCode((a - 192 >> 8) + 192), b += String.fromCharCode(a - 192 & 255)) : (b += String.fromCharCode(255), b += c.writeNumber(a, 4)), b
                    },writeHeader: function(a, b) {
                        var c = "";
                        return c += String.fromCharCode(192 | a), c += this.writeSimpleLength(b)
                    },writeOldHeader: function(a, b) {
                        var d = "";
                        return 256 > b ? (d += String.fromCharCode(128 | a << 2), d += String.fromCharCode(b)) : 65536 > b ? (d += String.fromCharCode(128 | a << 2 | 1), d += c.writeNumber(b, 2)) : (d += String.fromCharCode(128 | a << 2 | 2), d += c.writeNumber(b, 4)), d
                    },read: function(a, b, d) {
                        if (null === a || a.length <= b || a.substring(b).length < 2 || 0 === (128 & a.charCodeAt(b)))
                            throw new Error("Error during parsing. This message / key is probably not containing a valid OpenPGP format.");
                        var e, f = b, g = -1, h = -1;
                        h = 0, 0 !== (64 & a.charCodeAt(f)) && (h = 1);
                        var i;
                        h ? g = 63 & a.charCodeAt(f) : (g = (63 & a.charCodeAt(f)) >> 2, i = 3 & a.charCodeAt(f)), f++;
                        var j = null, k = -1;
                        if (h)
                            if (a.charCodeAt(f) < 192)
                                e = a.charCodeAt(f++), c.print_debug("1 byte length:" + e);
                            else if (a.charCodeAt(f) >= 192 && a.charCodeAt(f) < 224)
                                e = (a.charCodeAt(f++) - 192 << 8) + a.charCodeAt(f++) + 192, c.print_debug("2 byte length:" + e);
                            else if (a.charCodeAt(f) > 223 && a.charCodeAt(f) < 255) {
                                e = 1 << (31 & a.charCodeAt(f++)), c.print_debug("4 byte length:" + e);
                                var l = f + e;
                                j = a.substring(f, f + e);
                                for (var m; ; ) {
                                    if (a.charCodeAt(l) < 192) {
                                        m = a.charCodeAt(l++), e += m, j += a.substring(l, l + m), l += m;
                                        break
                                    }
                                    if (a.charCodeAt(l) >= 192 && a.charCodeAt(l) < 224) {
                                        m = (a.charCodeAt(l++) - 192 << 8) + a.charCodeAt(l++) + 192, e += m, j += a.substring(l, l + m), l += m;
                                        break
                                    }
                                    if (!(a.charCodeAt(l) > 223 && a.charCodeAt(l) < 255)) {
                                        l++, m = a.charCodeAt(l++) << 24 | a.charCodeAt(l++) << 16 | a[l++].charCodeAt() << 8 | a.charCodeAt(l++), j += a.substring(l, l + m), e += m, l += m;
                                        break
                                    }
                                    m = 1 << (31 & a.charCodeAt(l++)), e += m, j += a.substring(l, l + m), l += m
                                }
                                k = l
                            } else
                                f++, e = a.charCodeAt(f++) << 24 | a.charCodeAt(f++) << 16 | a.charCodeAt(f++) << 8 | a.charCodeAt(f++);
                        else
                            switch (i) {
                                case 0:
                                    e = a.charCodeAt(f++);
                                    break;
                                case 1:
                                    e = a.charCodeAt(f++) << 8 | a.charCodeAt(f++);
                                    break;
                                case 2:
                                    e = a.charCodeAt(f++) << 24 | a.charCodeAt(f++) << 16 | a.charCodeAt(f++) << 8 | a.charCodeAt(f++);
                                    break;
                                default:
                                    e = d
                            }
                        return -1 == k && (k = e), null === j && (j = a.substring(f, f + k)), {tag: g,packet: j,offset: f + k}
                    }}
            }, {"../enums.js": 30,"../util.js": 61}],45: [function(a, b) {
                function c() {
                    this.length = 0
                }
                b.exports = c;
                var d = a("./packet.js"), e = a("./all_packets.js"), f = a("../enums.js");
                c.prototype.read = function(a) {
                    for (var b = 0; b < a.length; ) {
                        var c = d.read(a, b, a.length - b);
                        b = c.offset;
                        var g = f.read(f.packet, c.tag), h = e.newPacketFromTag(g);
                        this.push(h), h.read(c.packet)
                    }
                }, c.prototype.write = function() {
                    for (var a = "", b = 0; b < this.length; b++) {
                        var c = this[b].write();
                        a += d.writeHeader(this[b].tag, c.length), a += c
                    }
                    return a
                }, c.prototype.push = function(a) {
                    a && (a.packets = a.packets || new c, this[this.length] = a, this.length++)
                }, c.prototype.filter = function(a) {
                    for (var b = new c, d = 0; d < this.length; d++)
                        a(this[d], d, this) && b.push(this[d]);
                    return b
                }, c.prototype.filterByTag = function() {
                    for (var a = Array.prototype.slice.call(arguments), b = new c, d = this, e = 0; e < this.length; e++)
                        a.some(function(a) {
                            return d[e].tag == a
                        }) && b.push(this[e]);
                    return b
                }, c.prototype.forEach = function(a) {
                    for (var b = 0; b < this.length; b++)
                        a(this[b])
                }, c.prototype.findPacket = function(a) {
                    var b = this.filterByTag(a);
                    if (b.length)
                        return b[0];
                    for (var c = null, d = 0; d < this.length; d++)
                        if (this[d].packets.length && (c = this[d].packets.findPacket(a)))
                            return c;
                    return null
                }, c.prototype.indexOfTag = function() {
                    for (var a = Array.prototype.slice.call(arguments), b = [], c = this, d = 0; d < this.length; d++)
                        a.some(function(a) {
                            return c[d].tag == a
                        }) && b.push(d);
                    return b
                }, c.prototype.slice = function(a, b) {
                    b || (b = this.length);
                    for (var d = new c, e = a; b > e; e++)
                        d.push(this[e]);
                    return d
                }, c.prototype.concat = function(a) {
                    if (a)
                        for (var b = 0; b < a.length; b++)
                            this.push(a[b])
                }, b.exports.fromStructuredClone = function(a) {
                    for (var b = new c, d = 0; d < a.length; d++)
                        b.push(e.fromStructuredClone(a[d])), b[d].packets = 0 !== b[d].packets.length ? this.fromStructuredClone(b[d].packets) : new c;
                    return b
                }
            }, {"../enums.js": 30,"./all_packets.js": 38,"./packet.js": 44}],46: [function(a, b) {
                function c() {
                    this.tag = g.packet.publicKey, this.version = 4, this.created = new Date, this.mpi = [], this.algorithm = "rsa_sign", this.expirationTimeV3 = 0
                }
                b.exports = c;
                var d = a("../util.js"), e = a("../type/mpi.js"), f = a("../type/keyid.js"), g = a("../enums.js"), h = a("../crypto");
                c.prototype.read = function(a) {
                    var b = 0;
                    if (this.version = a.charCodeAt(b++), 3 == this.version || 4 == this.version) {
                        this.created = d.readDate(a.substr(b, 4)), b += 4, 3 == this.version && (this.expirationTimeV3 = d.readNumber(a.substr(b, 2)), b += 2), this.algorithm = g.read(g.publicKey, a.charCodeAt(b++));
                        var c = h.getPublicMpiCount(this.algorithm);
                        this.mpi = [];
                        for (var f = a.substr(b), i = 0, j = 0; c > j && i < f.length; j++)
                            if (this.mpi[j] = new e, i += this.mpi[j].read(f.substr(i)), i > f.length)
                                throw new Error("Error reading MPI @:" + i);
                        return i + 6
                    }
                    throw new Error("Version " + version + " of the key packet is unsupported.")
                }, c.prototype.readPublicKey = c.prototype.read, c.prototype.write = function() {
                    var a = String.fromCharCode(this.version);
                    a += d.writeDate(this.created), 3 == this.version && (a += d.writeNumber(this.expirationTimeV3, 2)), a += String.fromCharCode(g.write(g.publicKey, this.algorithm));
                    for (var b = h.getPublicMpiCount(this.algorithm), c = 0; b > c; c++)
                        a += this.mpi[c].write();
                    return a
                }, c.prototype.writePublicKey = c.prototype.write, c.prototype.writeOld = function() {
                    var a = this.writePublicKey();
                    return String.fromCharCode(153) + d.writeNumber(a.length, 2) + a
                }, c.prototype.getKeyId = function() {
                    var a = new f;
                    return 4 == this.version ? a.read(this.getFingerprint().substr(12, 8)) : 3 == this.version && a.read(this.mpi[0].write().substr(-8)), a
                }, c.prototype.getFingerprint = function() {
                    var a = "";
                    if (4 == this.version)
                        return a = this.writeOld(), h.hash.sha1(a);
                    if (3 == this.version) {
                        for (var b = h.getPublicMpiCount(this.algorithm), c = 0; b > c; c++)
                            a += this.mpi[c].toBytes();
                        return h.hash.md5(a)
                    }
                }, c.prototype.getBitSize = function() {
                    return 8 * this.mpi[0].byteLength()
                }, c.prototype.postCloneTypeFix = function() {
                    for (var a = 0; a < this.mpi.length; a++)
                        this.mpi[a] = e.fromClone(this.mpi[a])
                }
            }, {"../crypto": 19,"../enums.js": 30,"../type/keyid.js": 58,"../type/mpi.js": 59,"../util.js": 61}],47: [function(a, b) {
                function c() {
                    this.tag = g.packet.publicKeyEncryptedSessionKey, this.version = 3, this.publicKeyId = new d, this.publicKeyAlgorithm = "rsa_encrypt", this.sessionKey = null, this.sessionKeyAlgorithm = "aes256", this.encrypted = []
                }
                b.exports = c;
                var d = a("../type/keyid.js"), e = a("../util.js"), f = a("../type/mpi.js"), g = a("../enums.js"), h = a("../crypto");
                c.prototype.read = function(a) {
                    this.version = a.charCodeAt(0), this.publicKeyId.read(a.substr(1)), this.publicKeyAlgorithm = g.read(g.publicKey, a.charCodeAt(9));
                    var b = 10, c = function(a) {
                        switch (a) {
                            case "rsa_encrypt":
                            case "rsa_encrypt_sign":
                                return 1;
                            case "elgamal":
                                return 2;
                            default:
                                throw new Error("Invalid algorithm.")
                        }
                    }(this.publicKeyAlgorithm);
                    this.encrypted = [];
                    for (var d = 0; c > d; d++) {
                        var e = new f;
                        b += e.read(a.substr(b)), this.encrypted.push(e)
                    }
                }, c.prototype.write = function() {
                    var a = String.fromCharCode(this.version);
                    a += this.publicKeyId.write(), a += String.fromCharCode(g.write(g.publicKey, this.publicKeyAlgorithm));
                    for (var b = 0; b < this.encrypted.length; b++)
                        a += this.encrypted[b].write();
                    return a
                }, c.prototype.encrypt = function(a) {
                    var b = String.fromCharCode(g.write(g.symmetric, this.sessionKeyAlgorithm));
                    b += this.sessionKey;
                    var c = e.calc_checksum(this.sessionKey);
                    b += e.writeNumber(c, 2);
                    var d = new f;
                    d.fromBytes(h.pkcs1.eme.encode(b, a.mpi[0].byteLength())), this.encrypted = h.publicKeyEncrypt(this.publicKeyAlgorithm, a.mpi, d)
                }, c.prototype.decrypt = function(a) {
                    var b = h.publicKeyDecrypt(this.publicKeyAlgorithm, a.mpi, this.encrypted).toBytes(), c = e.readNumber(b.substr(b.length - 2)), d = h.pkcs1.eme.decode(b, a.mpi[0].byteLength());
                    if (a = d.substring(1, d.length - 2), c != e.calc_checksum(a))
                        throw new Error("Checksum mismatch");
                    this.sessionKey = a, this.sessionKeyAlgorithm = g.read(g.symmetric, d.charCodeAt(0))
                }, c.prototype.postCloneTypeFix = function() {
                    this.publicKeyId = d.fromClone(this.publicKeyId);
                    for (var a = 0; a < this.encrypted.length; a++)
                        this.encrypted[a] = f.fromClone(this.encrypted[a])
                }
            }, {"../crypto": 19,"../enums.js": 30,"../type/keyid.js": 58,"../type/mpi.js": 59,"../util.js": 61}],48: [function(a, b) {
                function c() {
                    d.call(this), this.tag = e.packet.publicSubkey
                }
                b.exports = c;
                var d = a("./public_key.js"), e = a("../enums.js");
                c.prototype = new d, c.prototype.constructor = c
            }, {"../enums.js": 30,"./public_key.js": 46}],49: [function(a, b) {
                function c() {
                    i.call(this), this.tag = j.packet.secretKey, this.encrypted = null, this.isDecrypted = !1
                }
                function d(a) {
                    return "sha1" == a ? 20 : 2
                }
                function e(a) {
                    return "sha1" == a ? l.hash.sha1 : function(a) {
                        return k.writeNumber(k.calc_checksum(a), 2)
                    }
                }
                function f(a, b, c) {
                    var f = d(a), g = e(a), h = b.substr(b.length - f);
                    b = b.substr(0, b.length - f);
                    var i = g(b);
                    if (i != h)
                        return new Error("Hash mismatch.");
                    for (var j = l.getPrivateMpiCount(c), k = 0, n = [], o = 0; j > o && k < b.length; o++)
                        n[o] = new m, k += n[o].read(b.substr(k));
                    return n
                }
                function g(a, b, c) {
                    for (var d = "", f = l.getPublicMpiCount(b), g = f; g < c.length; g++)
                        d += c[g].write();
                    return d += e(a)(d)
                }
                function h(a, b, c) {
                    return a.produce_key(b, l.cipher[c].keySize)
                }
                b.exports = c;
                var i = a("./public_key.js"), j = a("../enums.js"), k = a("../util.js"), l = a("../crypto"), m = a("../type/mpi.js"), n = a("../type/s2k.js");
                c.prototype = new i, c.prototype.constructor = c, c.prototype.read = function(a) {
                    var b = this.readPublicKey(a);
                    a = a.substr(b);
                    var c = a.charCodeAt(0);
                    if (c)
                        this.encrypted = a;
                    else {
                        var d = f("mod", a.substr(1), this.algorithm);
                        if (d instanceof Error)
                            throw d;
                        this.mpi = this.mpi.concat(d), this.isDecrypted = !0
                    }
                }, c.prototype.write = function() {
                    var a = this.writePublicKey();
                    return this.encrypted ? a += this.encrypted : (a += String.fromCharCode(0), a += g("mod", this.algorithm, this.mpi)), a
                }, c.prototype.encrypt = function(a) {
                    var b = new n, c = "aes256", d = g("sha1", this.algorithm, this.mpi), e = h(b, a, c), f = l.cipher[c].blockSize, i = l.random.getRandomBytes(f);
                    this.encrypted = "", this.encrypted += String.fromCharCode(254), this.encrypted += String.fromCharCode(j.write(j.symmetric, c)), this.encrypted += b.write(), this.encrypted += i, this.encrypted += l.cfb.normalEncrypt(c, e, d, i)
                }, c.prototype.decrypt = function(a) {
                    if (this.isDecrypted)
                        return !0;
                    var b, c, d = 0, e = this.encrypted.charCodeAt(d++);
                    if (255 == e || 254 == e) {
                        b = this.encrypted.charCodeAt(d++), b = j.read(j.symmetric, b);
                        var g = new n;
                        d += g.read(this.encrypted.substr(d)), c = h(g, a, b)
                    } else
                        b = e, b = j.read(j.symmetric, b), c = l.hash.md5(a);
                    var i = this.encrypted.substr(d, l.cipher[b].blockSize);
                    d += i.length;
                    var k, m = this.encrypted.substr(d);
                    k = l.cfb.normalDecrypt(b, c, m, i);
                    var o = 254 == e ? "sha1" : "mod", p = f(o, k, this.algorithm);
                    return p instanceof Error ? !1 : (this.mpi = this.mpi.concat(p), this.isDecrypted = !0, !0)
                }, c.prototype.generate = function(a) {
                    this.mpi = l.generateMpi(this.algorithm, a), this.isDecrypted = !0
                }
            }, {"../crypto": 19,"../enums.js": 30,"../type/mpi.js": 59,"../type/s2k.js": 60,"../util.js": 61,"./public_key.js": 46}],50: [function(a, b) {
                function c() {
                    d.call(this), this.tag = e.packet.secretSubkey
                }
                b.exports = c;
                var d = a("./secret_key.js"), e = a("../enums.js");
                c.prototype = new d, c.prototype.constructor = c
            }, {"../enums.js": 30,"./secret_key.js": 49}],51: [function(a, b) {
                function c() {
                    this.tag = g.packet.signature, this.version = 4, this.signatureType = null, this.hashAlgorithm = null, this.publicKeyAlgorithm = null, this.signatureData = null, this.signedHashValue = null, this.created = new Date, this.signatureExpirationTime = null, this.signatureNeverExpires = !0, this.exportable = null, this.trustLevel = null, this.trustAmount = null, this.regularExpression = null, this.revocable = null, this.keyExpirationTime = null, this.keyNeverExpires = null, this.preferredSymmetricAlgorithms = null, this.revocationKeyClass = null, this.revocationKeyAlgorithm = null, this.revocationKeyFingerprint = null, this.issuerKeyId = new j, this.notation = null, this.preferredHashAlgorithms = null, this.preferredCompressionAlgorithms = null, this.keyServerPreferences = null, this.preferredKeyServer = null, this.isPrimaryUserID = null, this.policyURI = null, this.keyFlags = null, this.signersUserId = null, this.reasonForRevocationFlag = null, this.reasonForRevocationString = null, this.features = null, this.signatureTargetPublicKeyAlgorithm = null, this.signatureTargetHashAlgorithm = null, this.signatureTargetHash = null, this.embeddedSignature = null, this.verified = !1
                }
                function d(a, b) {
                    var c = "";
                    return c += f.writeSimpleLength(b.length + 1), c += String.fromCharCode(a), c += b
                }
                b.exports = c;
                var e = a("../util.js"), f = a("./packet.js"), g = a("../enums.js"), h = a("../crypto"), i = a("../type/mpi.js"), j = a("../type/keyid.js");
                c.prototype.read = function(a) {
                    function b(a) {
                        for (var b = e.readNumber(a.substr(0, 2)), c = 2; 2 + b > c; ) {
                            var d = f.readSimpleLength(a.substr(c));
                            c += d.offset, this.read_sub_packet(a.substr(c, d.len)), c += d.len
                        }
                        return c
                    }
                    var c = 0;
                    switch (this.version = a.charCodeAt(c++), this.version) {
                        case 3:
                            5 != a.charCodeAt(c++) && e.print_debug("packet/signature.js\ninvalid One-octet length of following hashed material.MUST be 5. @:" + (c - 1));
                            var d = c;
                            this.signatureType = a.charCodeAt(c++), this.created = e.readDate(a.substr(c, 4)), c += 4, this.signatureData = a.substring(d, c), this.issuerKeyId.read(a.substring(c, c + 8)), c += 8, this.publicKeyAlgorithm = a.charCodeAt(c++), this.hashAlgorithm = a.charCodeAt(c++);
                            break;
                        case 4:
                            this.signatureType = a.charCodeAt(c++), this.publicKeyAlgorithm = a.charCodeAt(c++), this.hashAlgorithm = a.charCodeAt(c++), c += b.call(this, a.substr(c), !0), this.signatureData = a.substr(0, c), c += b.call(this, a.substr(c), !1);
                            break;
                        default:
                            throw new Error("Version " + version + " of the signature is unsupported.")
                    }
                    this.signedHashValue = a.substr(c, 2), c += 2, this.signature = a.substr(c)
                }, c.prototype.write = function() {
                    return this.signatureData + e.writeNumber(0, 2) + this.signedHashValue + this.signature
                }, c.prototype.sign = function(a, b) {
                    var c = g.write(g.signature, this.signatureType), d = g.write(g.publicKey, this.publicKeyAlgorithm), e = g.write(g.hash, this.hashAlgorithm), f = String.fromCharCode(4);
                    f += String.fromCharCode(c), f += String.fromCharCode(d), f += String.fromCharCode(e), this.issuerKeyId = a.getKeyId(), f += this.write_all_sub_packets(), this.signatureData = f;
                    var i = this.calculateTrailer(), j = this.toSign(c, b) + this.signatureData + i, k = h.hash.digest(e, j);
                    this.signedHashValue = k.substr(0, 2), this.signature = h.signature.sign(e, d, a.mpi, j)
                }, c.prototype.write_all_sub_packets = function() {
                    var a = g.signatureSubpacket, b = "", c = "";
                    if (null !== this.created && (b += d(a.signature_creation_time, e.writeDate(this.created))), null !== this.signatureExpirationTime && (b += d(a.signature_expiration_time, e.writeNumber(this.signatureExpirationTime, 4))), null !== this.exportable && (b += d(a.exportable_certification, String.fromCharCode(this.exportable ? 1 : 0))), null !== this.trustLevel && (c = String.fromCharCode(this.trustLevel) + String.fromCharCode(this.trustAmount), b += d(a.trust_signature, c)), null !== this.regularExpression && (b += d(a.regular_expression, this.regularExpression)), null !== this.revocable && (b += d(a.revocable, String.fromCharCode(this.revocable ? 1 : 0))), null !== this.keyExpirationTime && (b += d(a.key_expiration_time, e.writeNumber(this.keyExpirationTime, 4))), null !== this.preferredSymmetricAlgorithms && (c = e.bin2str(this.preferredSymmetricAlgorithms), b += d(a.preferred_symmetric_algorithms, c)), null !== this.revocationKeyClass && (c = String.fromCharCode(this.revocationKeyClass), c += String.fromCharCode(this.revocationKeyAlgorithm), c += this.revocationKeyFingerprint, b += d(a.revocation_key, c)), this.issuerKeyId.isNull() || (b += d(a.issuer, this.issuerKeyId.write())), null !== this.notation)
                        for (var f in this.notation)
                            if (this.notation.hasOwnProperty(f)) {
                                var h = this.notation[f];
                                c = String.fromCharCode(128), c += String.fromCharCode(0), c += String.fromCharCode(0), c += String.fromCharCode(0), c += e.writeNumber(f.length, 2), c += e.writeNumber(h.length, 2), c += f + h, b += d(a.notation_data, c)
                            }
                    return null !== this.preferredHashAlgorithms && (c = e.bin2str(this.preferredHashAlgorithms), b += d(a.preferred_hash_algorithms, c)), null !== this.preferredCompressionAlgorithms && (c = e.bin2str(this.preferredCompressionAlgorithms), b += d(a.preferred_hash_algorithms, c)), null !== this.keyServerPreferences && (c = e.bin2str(this.keyServerPreferences), b += d(a.key_server_preferences, c)), null !== this.preferredKeyServer && (b += d(a.preferred_key_server, this.preferredKeyServer)), null !== this.isPrimaryUserID && (b += d(a.primary_user_id, String.fromCharCode(this.isPrimaryUserID ? 1 : 0))), null !== this.policyURI && (b += d(a.policy_uri, this.policyURI)), null !== this.keyFlags && (c = e.bin2str(this.keyFlags), b += d(a.key_flags, c)), null !== this.signersUserId && (b += d(a.signers_user_id, this.signersUserId)), null !== this.reasonForRevocationFlag && (c = String.fromCharCode(this.reasonForRevocationFlag), c += this.reasonForRevocationString, b += d(a.reason_for_revocation, c)), null !== this.features && (c = e.bin2str(this.features), b += d(a.features, c)), null !== this.signatureTargetPublicKeyAlgorithm && (c = String.fromCharCode(this.signatureTargetPublicKeyAlgorithm), c += String.fromCharCode(this.signatureTargetHashAlgorithm), c += this.signatureTargetHash, b += d(a.signature_target, c)), null !== this.embeddedSignature && (b += d(a.embedded_signature, this.embeddedSignature.write())), b = e.writeNumber(b.length, 2) + b
                }, c.prototype.read_sub_packet = function(a) {
                    function b(a, b) {
                        this[a] = [];
                        for (var c = 0; c < b.length; c++)
                            this[a].push(b.charCodeAt(c))
                    }
                    var d, f = 0, g = 127 & a.charCodeAt(f++);
                    switch (g) {
                        case 2:
                            this.created = e.readDate(a.substr(f));
                            break;
                        case 3:
                            d = e.readNumber(a.substr(f)), this.signatureNeverExpires = 0 === d, this.signatureExpirationTime = d;
                            break;
                        case 4:
                            this.exportable = 1 == a.charCodeAt(f++);
                            break;
                        case 5:
                            this.trustLevel = a.charCodeAt(f++), this.trustAmount = a.charCodeAt(f++);
                            break;
                        case 6:
                            this.regularExpression = a.substr(f);
                            break;
                        case 7:
                            this.revocable = 1 == a.charCodeAt(f++);
                            break;
                        case 9:
                            d = e.readNumber(a.substr(f)), this.keyExpirationTime = d, this.keyNeverExpires = 0 === d;
                            break;
                        case 11:
                            for (this.preferredSymmetricAlgorithms = []; f != a.length; )
                                this.preferredSymmetricAlgorithms.push(a.charCodeAt(f++));
                            break;
                        case 12:
                            this.revocationKeyClass = a.charCodeAt(f++), this.revocationKeyAlgorithm = a.charCodeAt(f++), this.revocationKeyFingerprint = a.substr(f, 20);
                            break;
                        case 16:
                            this.issuerKeyId.read(a.substr(f));
                            break;
                        case 20:
                            if (128 != a.charCodeAt(f))
                                throw new Error("Unsupported notation flag.");
                            f += 4;
                            var i = e.readNumber(a.substr(f, 2));
                            f += 2;
                            var j = e.readNumber(a.substr(f, 2));
                            f += 2;
                            var k = a.substr(f, i), l = a.substr(f + i, j);
                            this.notation = this.notation || {}, this.notation[k] = l;
                            break;
                        case 21:
                            b.call(this, "preferredHashAlgorithms", a.substr(f));
                            break;
                        case 22:
                            b.call(this, "preferredCompressionAlgorithms ", a.substr(f));
                            break;
                        case 23:
                            b.call(this, "keyServerPreferencess", a.substr(f));
                            break;
                        case 24:
                            this.preferredKeyServer = a.substr(f);
                            break;
                        case 25:
                            this.isPrimaryUserID = 0 !== a[f++];
                            break;
                        case 26:
                            this.policyURI = a.substr(f);
                            break;
                        case 27:
                            b.call(this, "keyFlags", a.substr(f));
                            break;
                        case 28:
                            this.signersUserId += a.substr(f);
                            break;
                        case 29:
                            this.reasonForRevocationFlag = a.charCodeAt(f++), this.reasonForRevocationString = a.substr(f);
                            break;
                        case 30:
                            b.call(this, "features", a.substr(f));
                            break;
                        case 31:
                            this.signatureTargetPublicKeyAlgorithm = a.charCodeAt(f++), this.signatureTargetHashAlgorithm = a.charCodeAt(f++);
                            var m = h.getHashByteLength(this.signatureTargetHashAlgorithm);
                            this.signatureTargetHash = a.substr(f, m);
                            break;
                        case 32:
                            this.embeddedSignature = new c, this.embeddedSignature.read(a.substr(f));
                            break;
                        default:
                            throw new Error("Unknown signature subpacket type " + g + " @:" + f)
                    }
                }, c.prototype.toSign = function(a, b) {
                    var c = g.signature;
                    switch (a) {
                        case c.binary:
                        case c.text:
                            return b.getBytes();
                        case c.standalone:
                            return "";
                        case c.cert_generic:
                        case c.cert_persona:
                        case c.cert_casual:
                        case c.cert_positive:
                        case c.cert_revocation:
                            var d, f;
                            if (void 0 !== b.userid)
                                f = 180, d = b.userid;
                            else {
                                if (void 0 === b.userattribute)
                                    throw new Error("Either a userid or userattribute packet needs to be supplied for certification.");
                                f = 209, d = b.userattribute
                            }
                            var h = d.write();
                            if (4 == this.version)
                                return this.toSign(c.key, b) + String.fromCharCode(f) + e.writeNumber(h.length, 4) + h;
                            if (3 == this.version)
                                return this.toSign(c.key, b) + h;
                            break;
                        case c.subkey_binding:
                        case c.subkey_revocation:
                        case c.key_binding:
                            return this.toSign(c.key, b) + this.toSign(c.key, {key: b.bind});
                        case c.key:
                            if (void 0 === b.key)
                                throw new Error("Key packet is required for this sigtature.");
                            return b.key.writeOld();
                        case c.key_revocation:
                            return this.toSign(c.key, b);
                        case c.timestamp:
                            return "";
                        case c.third_party:
                            throw new Error("Not implemented");
                        default:
                            throw new Error("Unknown signature type.")
                    }
                }, c.prototype.calculateTrailer = function() {
                    var a = "";
                    return 3 == this.version ? a : (a += String.fromCharCode(4), a += String.fromCharCode(255), a += e.writeNumber(this.signatureData.length, 4))
                }, c.prototype.verify = function(a, b) {
                    var c = g.write(g.signature, this.signatureType), d = g.write(g.publicKey, this.publicKeyAlgorithm), e = g.write(g.hash, this.hashAlgorithm), f = this.toSign(c, b), j = this.calculateTrailer(), k = 0;
                    d > 0 && 4 > d ? k = 1 : 17 == d && (k = 2);
                    for (var l = [], m = 0, n = 0; k > n; n++)
                        l[n] = new i, m += l[n].read(this.signature.substr(m));
                    return this.verified = h.signature.verify(d, e, l, a.mpi, f + this.signatureData + j), this.verified
                }, c.prototype.isExpired = function() {
                    return this.signatureNeverExpires ? !1 : Date.now() > this.created.getTime() + 1e3 * this.signatureExpirationTime
                }, c.prototype.postCloneTypeFix = function() {
                    this.issuerKeyId = j.fromClone(this.issuerKeyId)
                }
            }, {"../crypto": 19,"../enums.js": 30,"../type/keyid.js": 58,"../type/mpi.js": 59,"../util.js": 61,"./packet.js": 44}],52: [function(a, b) {
                function c() {
                    this.tag = e.packet.symEncryptedIntegrityProtected, this.encrypted = null, this.modification = !1, this.packets = null
                }
                b.exports = c;
                var d = (a("../util.js"), a("../crypto")), e = a("../enums.js");
                c.prototype.read = function(a) {
                    var b = a.charCodeAt(0);
                    if (1 != b)
                        throw new Error("Invalid packet version.");
                    this.encrypted = a.substr(1)
                }, c.prototype.write = function() {
                    return String.fromCharCode(1) + this.encrypted
                }, c.prototype.encrypt = function(a, b) {
                    var c = this.packets.write(), e = d.getPrefixRandom(a), f = e + e.charAt(e.length - 2) + e.charAt(e.length - 1), g = c;
                    g += String.fromCharCode(211), g += String.fromCharCode(20), g += d.hash.sha1(f + g), this.encrypted = d.cfb.encrypt(e, a, g, b, !1).substring(0, f.length + g.length)
                }, c.prototype.decrypt = function(a, b) {
                    var c = d.cfb.decrypt(a, b, this.encrypted, !1);
                    this.hash = d.hash.sha1(d.cfb.mdc(a, b, this.encrypted) + c.substring(0, c.length - 20));
                    var e = c.substr(c.length - 20, 20);
                    if (this.hash != e)
                        throw new Error("Modification detected.");
                    this.packets.read(c.substr(0, c.length - 22))
                }
            }, {"../crypto": 19,"../enums.js": 30,"../util.js": 61}],53: [function(a, b) {
                function c() {
                    this.tag = e.packet.symEncryptedSessionKey, this.sessionKeyEncryptionAlgorithm = null, this.sessionKeyAlgorithm = "aes256", this.encrypted = null, this.s2k = new d
                }
                var d = a("../type/s2k.js"), e = a("../enums.js"), f = a("../crypto");
                b.exports = c, c.prototype.read = function(a) {
                    this.version = a.charCodeAt(0);
                    var b = e.read(e.symmetric, a.charCodeAt(1)), c = this.s2k.read(a.substr(2)), d = c + 2;
                    d < a.length ? (this.encrypted = a.substr(d), this.sessionKeyEncryptionAlgorithm = b) : this.sessionKeyAlgorithm = b
                }, c.prototype.write = function() {
                    var a = null === this.encrypted ? this.sessionKeyAlgorithm : this.sessionKeyEncryptionAlgorithm, b = String.fromCharCode(this.version) + String.fromCharCode(e.write(e.symmetric, a)) + this.s2k.write();
                    return null !== this.encrypted && (b += this.encrypted), b
                }, c.prototype.decrypt = function(a) {
                    var b = null !== this.sessionKeyEncryptionAlgorithm ? this.sessionKeyEncryptionAlgorithm : this.sessionKeyAlgorithm, c = f.cipher[b].keySize, d = this.s2k.produce_key(a, c);
                    if (null === this.encrypted)
                        this.sessionKey = d;
                    else {
                        var g = f.cfb.decrypt(this.sessionKeyEncryptionAlgorithm, d, this.encrypted, !0);
                        this.sessionKeyAlgorithm = e.read(e.symmetric, g[0].keyCodeAt()), this.sessionKey = g.substr(1)
                    }
                }, c.prototype.encrypt = function(a) {
                    var b = f.getKeyLength(this.sessionKeyEncryptionAlgorithm), c = this.s2k.produce_key(a, b), d = String.fromCharCode(e.write(e.symmetric, this.sessionKeyAlgorithm)) + f.getRandomBytes(f.getKeyLength(this.sessionKeyAlgorithm));
                    this.encrypted = f.cfb.encrypt(f.getPrefixRandom(this.sessionKeyEncryptionAlgorithm), this.sessionKeyEncryptionAlgorithm, c, d, !0)
                }, c.prototype.postCloneTypeFix = function() {
                    this.s2k = d.fromClone(this.s2k)
                }
            }, {"../crypto": 19,"../enums.js": 30,"../type/s2k.js": 60}],54: [function(a, b) {
                function c() {
                    this.tag = e.packet.symmetricallyEncrypted, this.encrypted = null, this.packets = null
                }
                b.exports = c;
                var d = a("../crypto"), e = a("../enums.js");
                c.prototype.read = function(a) {
                    this.encrypted = a
                }, c.prototype.write = function() {
                    return this.encrypted
                }, c.prototype.decrypt = function(a, b) {
                    var c = d.cfb.decrypt(a, b, this.encrypted, !0);
                    this.packets.read(c)
                }, c.prototype.encrypt = function(a, b) {
                    var c = this.packets.write();
                    this.encrypted = d.cfb.encrypt(d.getPrefixRandom(a), a, c, b, !0)
                }
            }, {"../crypto": 19,"../enums.js": 30}],55: [function(a, b) {
                function c() {
                    this.tag = d.packet.trust
                }
                b.exports = c;
                var d = a("../enums.js")
            }, {"../enums.js": 30}],56: [function(a, b) {
                function c() {
                    this.tag = e.packet.userAttribute, this.attributes = []
                }
                var d = (a("../util.js"), a("./packet.js")), e = a("../enums.js");
                b.exports = c, c.prototype.read = function(a) {
                    for (var b = 0; b < a.length; ) {
                        var c = d.readSimpleLength(a.substr(b));
                        b += c.offset, this.attributes.push(a.substr(b, c.len)), b += c.len
                    }
                }
            }, {"../enums.js": 30,"../util.js": 61,"./packet.js": 44}],57: [function(a, b) {
                function c() {
                    this.tag = e.packet.userid, this.userid = ""
                }
                b.exports = c;
                var d = a("../util.js"), e = a("../enums.js");
                c.prototype.read = function(a) {
                    this.userid = d.decode_utf8(a)
                }, c.prototype.write = function() {
                    return d.encode_utf8(this.userid)
                }
            }, {"../enums.js": 30,"../util.js": 61}],58: [function(a, b) {
                function c() {
                    this.bytes = ""
                }
                b.exports = c;
                var d = a("../util.js");
                c.prototype.read = function(a) {
                    this.bytes = a.substr(0, 8)
                }, c.prototype.write = function() {
                    return this.bytes
                }, c.prototype.toHex = function() {
                    return d.hexstrdump(this.bytes)
                }, c.prototype.equals = function(a) {
                    return this.bytes == a.bytes
                }, c.prototype.isNull = function() {
                    return "" === this.bytes
                }, b.exports.mapToHex = function(a) {
                    return a.toHex()
                }, b.exports.fromClone = function(a) {
                    var b = new c;
                    return b.bytes = a.bytes, b
                }
            }, {"../util.js": 61}],59: [function(a, b) {
                function c() {
                    this.data = null
                }
                b.exports = c;
                var d = a("../crypto/public_key/jsbn.js"), e = a("../util.js");
                c.prototype.read = function(a) {
                    var b = a.charCodeAt(0) << 8 | a.charCodeAt(1), c = Math.ceil(b / 8), d = a.substr(2, c);
                    return this.fromBytes(d), 2 + c
                }, c.prototype.fromBytes = function(a) {
                    this.data = new d(e.hexstrdump(a), 16)
                }, c.prototype.toBytes = function() {
                    return this.write().substr(2)
                }, c.prototype.byteLength = function() {
                    return this.toBytes().length
                }, c.prototype.write = function() {
                    return this.data.toMPI()
                }, c.prototype.toBigInteger = function() {
                    return this.data.clone()
                }, c.prototype.fromBigInteger = function(a) {
                    this.data = a.clone()
                }, b.exports.fromClone = function(a) {
                    a.data.copyTo = d.prototype.copyTo;
                    var b = new d;
                    a.data.copyTo(b);
                    var e = new c;
                    return e.data = b, e
                }
            }, {"../crypto/public_key/jsbn.js": 24,"../util.js": 61}],60: [function(a, b) {
                function c() {
                    this.algorithm = "sha256", this.type = "iterated", this.c = 96, this.salt = f.random.getRandomBytes(8)
                }
                b.exports = c;
                var d = a("../enums.js"), e = a("../util.js"), f = a("../crypto");
                c.prototype.get_count = function() {
                    var a = 6;
                    return 16 + (15 & this.c) << (this.c >> 4) + a
                }, c.prototype.read = function(a) {
                    var b = 0;
                    switch (this.type = d.read(d.s2k, a.charCodeAt(b++)), this.algorithm = d.read(d.hash, a.charCodeAt(b++)), this.type) {
                        case "simple":
                            break;
                        case "salted":
                            this.salt = a.substr(b, 8), b += 8;
                            break;
                        case "iterated":
                            this.salt = a.substr(b, 8), b += 8, this.c = a.charCodeAt(b++);
                            break;
                        case "gnu":
                            if ("GNU" != a.substr(b, 3))
                                throw new Error("Unknown s2k type.");
                            b += 3;
                            var c = 1e3 + a.charCodeAt(b++);
                            if (1001 != c)
                                throw new Error("Unknown s2k gnu protection mode.");
                            this.type = c;
                            break;
                        default:
                            throw new Error("Unknown s2k type.")
                    }
                    return b
                }, c.prototype.write = function() {
                    var a = String.fromCharCode(d.write(d.s2k, this.type));
                    switch (a += String.fromCharCode(d.write(d.hash, this.algorithm)), this.type) {
                        case "simple":
                            break;
                        case "salted":
                            a += this.salt;
                            break;
                        case "iterated":
                            a += this.salt, a += String.fromCharCode(this.c)
                    }
                    return a
                }, c.prototype.produce_key = function(a, b) {
                    function c(b, c) {
                        var e = d.write(d.hash, c.algorithm);
                        switch (c.type) {
                            case "simple":
                                return f.hash.digest(e, b + a);
                            case "salted":
                                return f.hash.digest(e, b + c.salt + a);
                            case "iterated":
                                var g = [], h = c.get_count();
                                for (data = c.salt + a; g.length * data.length < h; )
                                    g.push(data);
                                return g = g.join(""), g.length > h && (g = g.substr(0, h)), f.hash.digest(e, b + g)
                        }
                    }
                    a = e.encode_utf8(a);
                    for (var g = "", h = ""; g.length <= b; )
                        g += c(h, this), h += String.fromCharCode(0);
                    return g.substr(0, b)
                }, b.exports.fromClone = function(a) {
                    var b = new c;
                    return this.algorithm = a.algorithm, this.type = a.type, this.c = a.c, this.salt = a.salt, b
                }
            }, {"../crypto": 19,"../enums.js": 30,"../util.js": 61}],61: [function(a, b) {
                var c = a("./config");
                b.exports = {readNumber: function(a) {
                        for (var b = 0, c = 0; c < a.length; c++)
                            b <<= 8, b += a.charCodeAt(c);
                        return b
                    },writeNumber: function(a, b) {
                        for (var c = "", d = 0; b > d; d++)
                            c += String.fromCharCode(a >> 8 * (b - d - 1) & 255);
                        return c
                    },readDate: function(a) {
                        var b = this.readNumber(a), c = new Date;
                        return c.setTime(1e3 * b), c
                    },writeDate: function(a) {
                        var b = Math.round(a.getTime() / 1e3);
                        return this.writeNumber(b, 4)
                    },emailRegEx: /^[+a-zA-Z0-9_.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,6}$/,hexdump: function(a) {
                        for (var b, c = [], d = a.length, e = 0, f = 0; d > e; ) {
                            for (b = a.charCodeAt(e++).toString(16); b.length < 2; )
                                b = "0" + b;
                            c.push(" " + b), f++, f % 32 === 0 && c.push("\n           ")
                        }
                        return c.join("")
                    },hexstrdump: function(a) {
                        if (null === a)
                            return "";
                        for (var b, c = [], d = a.length, e = 0; d > e; ) {
                            for (b = a.charCodeAt(e++).toString(16); b.length < 2; )
                                b = "0" + b;
                            c.push("" + b)
                        }
                        return c.join("")
                    },hex2bin: function(a) {
                        for (var b = "", c = 0; c < a.length; c += 2)
                            b += String.fromCharCode(parseInt(a.substr(c, 2), 16));
                        return b
                    },hexidump: function(a) {
                        for (var b, c = [], d = a.length, e = 0; d > e; ) {
                            for (b = a[e++].toString(16); b.length < 2; )
                                b = "0" + b;
                            c.push("" + b)
                        }
                        return c.join("")
                    },encode_utf8: function(a) {
                        return unescape(encodeURIComponent(a))
                    },decode_utf8: function(a) {
                        try {
                            return decodeURIComponent(escape(a))
                        } catch (b) {
                            return a
                        }
                    },bin2str: function(a) {
                        for (var b = [], c = 0; c < a.length; c++)
                            b.push(String.fromCharCode(a[c]));
                        return b.join("")
                    },_str2bin: function(a, b) {
                        for (var c = 0; c < a.length; c++)
                            b[c] = a.charCodeAt(c);
                        return b
                    },str2bin: function(a) {
                        return this._str2bin(a, new Array(a.length))
                    },str2Uint8Array: function(a) {
                        return this._str2bin(a, new Uint8Array(new ArrayBuffer(a.length)))
                    },Uint8Array2str: function(a) {
                        return this.bin2str(a)
                    },calc_checksum: function(a) {
                        for (var b = {s: 0,add: function(a) {
                                this.s = (this.s + a) % 65536
                            }}, c = 0; c < a.length; c++)
                            b.add(a.charCodeAt(c));
                        return b.s
                    },print_debug: function(a) {
                        c.debug && console.log(a)
                    },print_debug_hexstr_dump: function(a, b) {
                        c.debug && (a += this.hexstrdump(b), console.log(a))
                    },getLeftNBits: function(a, b) {
                        var c = b % 8;
                        if (0 === c)
                            return a.substring(0, b / 8);
                        var d = (b - c) / 8 + 1, e = a.substring(0, d);
                        return this.shiftRight(e, 8 - c)
                    },shiftRight: function(a, b) {
                        var c = util.str2bin(a);
                        if (b % 8 === 0)
                            return a;
                        for (var d = c.length - 1; d >= 0; d--)
                            c[d] >>= b % 8, d > 0 && (c[d] |= c[d - 1] << 8 - b % 8 & 255);
                        return util.bin2str(c)
                    },get_hashAlgorithmString: function(a) {
                        switch (a) {
                            case 1:
                                return "MD5";
                            case 2:
                                return "SHA1";
                            case 3:
                                return "RIPEMD160";
                            case 8:
                                return "SHA256";
                            case 9:
                                return "SHA384";
                            case 10:
                                return "SHA512";
                            case 11:
                                return "SHA224"
                        }
                        return "unknown"
                    }}
            }, {"./config": 4}],62: [function(a, b) {
                function c(a) {
                    this.worker = new Worker(a || "openpgp.worker.js"), this.worker.onmessage = this.onMessage.bind(this), this.seedRandom(h), this.tasks = []
                }
                var d = a("../crypto"), e = a("../packet"), f = a("../key.js"), g = a("../type/keyid.js"), h = (a("../enums.js"), 5e4), i = 2e4;
                c.prototype.onMessage = function(a) {
                    var b = a.data;
                    switch (b.event) {
                        case "method-return":
                            this.tasks.shift()(b.err ? new Error(b.err) : null, b.data);
                            break;
                        case "request-seed":
                            this.seedRandom(i);
                            break;
                        default:
                            throw new Error("Unknown Worker Event.")
                    }
                }, c.prototype.seedRandom = function(a) {
                    var b = this.getRandomBuffer(a);
                    this.worker.postMessage({event: "seed-random",buf: b})
                }, c.prototype.getRandomBuffer = function(a) {
                    if (!a)
                        return null;
                    var b = new Uint8Array(a);
                    return d.random.getRandomValues(b), b
                }, c.prototype.terminate = function() {
                    this.worker.terminate()
                }, c.prototype.encryptMessage = function(a, b, c) {
                    a = a.map(function(a) {
                        return a.toPacketlist()
                    }), this.worker.postMessage({event: "encrypt-message",keys: a,text: b}), this.tasks.push(c)
                }, c.prototype.signAndEncryptMessage = function(a, b, c, d) {
                    a = a.map(function(a) {
                        return a.toPacketlist()
                    }), b = b.toPacketlist(), this.worker.postMessage({event: "sign-and-encrypt-message",publicKeys: a,privateKey: b,text: c}), this.tasks.push(d)
                }, c.prototype.decryptMessage = function(a, b, c) {
                    a = a.toPacketlist(), this.worker.postMessage({event: "decrypt-message",privateKey: a,message: b}), this.tasks.push(c)
                }, c.prototype.decryptAndVerifyMessage = function(a, b, c, d) {
                    a = a.toPacketlist(), b = b.map(function(a) {
                        return a.toPacketlist()
                    }), this.worker.postMessage({event: "decrypt-and-verify-message",privateKey: a,publicKeys: b,message: c}), this.tasks.push(function(a, b) {
                        b && (b.signatures = b.signatures.map(function(a) {
                            return a.keyid = g.fromClone(a.keyid), a
                        })), d(a, b)
                    })
                }, c.prototype.signClearMessage = function(a, b, c) {
                    a = a.map(function(a) {
                        return a.toPacketlist()
                    }), this.worker.postMessage({event: "sign-clear-message",privateKeys: a,text: b}), this.tasks.push(c)
                }, c.prototype.verifyClearSignedMessage = function(a, b, c) {
                    a = a.map(function(a) {
                        return a.toPacketlist()
                    }), this.worker.postMessage({event: "verify-clear-signed-message",publicKeys: a,message: b}), this.tasks.push(function(a, b) {
                        b && (b.signatures = b.signatures.map(function(a) {
                            return a.keyid = g.fromClone(a.keyid), a
                        })), c(a, b)
                    })
                }, c.prototype.generateKeyPair = function(a, b, c, d, g) {
                    this.worker.postMessage({event: "generate-key-pair",keyType: a,numBits: b,userId: c,passphrase: d}), this.tasks.push(function(a, b) {
                        if (b) {
                            var c = e.List.fromStructuredClone(b.key);
                            b.key = new f.Key(c)
                        }
                        g(a, b)
                    })
                }, c.prototype.decryptKey = function(a, b, c) {
                    a = a.toPacketlist(), this.worker.postMessage({event: "decrypt-key",privateKey: a,password: b}), this.tasks.push(function(a, b) {
                        if (b) {
                            var d = e.List.fromStructuredClone(b);
                            b = new f.Key(d)
                        }
                        c(a, b)
                    })
                }, c.prototype.decryptKeyPacket = function(a, b, c, d) {
                    a = a.toPacketlist(), this.worker.postMessage({event: "decrypt-key-packet",privateKey: a,keyIds: b,password: c}), this.tasks.push(function(a, b) {
                        if (b) {
                            var c = e.List.fromStructuredClone(b);
                            b = new f.Key(c)
                        }
                        d(a, b)
                    })
                }, b.exports = c
            }, {"../crypto": 19,"../enums.js": 30,"../key.js": 32,"../packet": 40,"../type/keyid.js": 58}]}, {}, [31])(31)
});
