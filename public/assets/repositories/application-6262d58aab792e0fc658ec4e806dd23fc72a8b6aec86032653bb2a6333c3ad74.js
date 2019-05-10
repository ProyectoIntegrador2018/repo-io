/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */

( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
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
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
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
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
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

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
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
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
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
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
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

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
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
	expando = "sizzle" + 1 * new Date(),
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

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
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

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

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
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
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
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
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
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

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
			a.sourceIndex - b.sourceIndex;

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
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
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
	return context && typeof context.getElementsByTagName !== "undefined" && context;
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
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
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
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
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
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
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
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
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
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
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

	return document;
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
		!compilerCache[ expr + " " ] &&
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
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
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

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
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
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

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
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

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
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
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
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
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
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

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

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
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
							idx = indexOf( seed, matched[i] );
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
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
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
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

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

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
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
};

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
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
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

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
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

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
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
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

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
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
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
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
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

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
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

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
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

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
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

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
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
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
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
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
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
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
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


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
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
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

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
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
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
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
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

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
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
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
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




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
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

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
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
		return elem;
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
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

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

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

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
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
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

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

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
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
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
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
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
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
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
					this.focus();
					return false;
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
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
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
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
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

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
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

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

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

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

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
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
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
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
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
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
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

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
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
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
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
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
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

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
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

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
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
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
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

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
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

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

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
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
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
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
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
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

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

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
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
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
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

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

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
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

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
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

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
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
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
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
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

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
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
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
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
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
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
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
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
			"text json": JSON.parse,

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

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
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
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
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
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

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

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
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
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
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

				// Extract error from statusText and normalize for non-aborts
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
					jQuery.event.trigger( "ajaxStop" );
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
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

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
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
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

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
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
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

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
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
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
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
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

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.2.0
Copyright © 2018 Basecamp, LLC
 */

(function(){var t=this;(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,r){return e.controller.visit(t,r)},clearCache:function(){return e.controller.clearCache()},setProgressBarDelay:function(t){return e.controller.setProgressBarDelay(t)}}}).call(this)}).call(t);var e=t.Turbolinks;(function(){(function(){var t,r,n,o=[].slice;e.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},e.closest=function(e,r){return t.call(e,r)},t=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),e.defer=function(t){return setTimeout(t,1)},e.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?o.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},e.dispatch=function(t,e){var r,o,i,s,a,u;return a=null!=e?e:{},u=a.target,r=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,r===!0),i.data=null!=o?o:{},i.cancelable&&!n&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},n=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),e.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),e.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){e.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=e.Location.wrap(n).requestURL,this.referrer=e.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return e.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return e.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new e.ProgressBar}var n,o,i;return i=e.HttpRequest,n=i.NETWORK_FAILURE,o=i.TIMEOUT_FAILURE,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case o:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.History=function(){function r(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(t,r){return t=e.Location.wrap(t),this.update("push",t,r)},r.prototype.replace=function(t,r){return t=e.Location.wrap(t),this.update("replace",t,r)},r.prototype.onPopState=function(t){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=t.state)?n.turbolinks:void 0)?(r=e.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(t){return e.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){e.HeadDetails=function(){function t(t){var e,r,n,s,a,u;for(this.elements={},n=0,a=t.length;a>n;n++)u=t[n],u.nodeType===Node.ELEMENT_NODE&&(s=u.outerHTML,r=null!=(e=this.elements)[s]?e[s]:e[s]={type:i(u),tracked:o(u),elements:[]},r.elements.push(u))}var e,r,n,o,i;return t.fromHeadElement=function(t){var e;return new this(null!=(e=null!=t?t.childNodes:void 0)?e:[])},t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},t.prototype.getMetaValue=function(t){var e;return null!=(e=this.findMetaElementByName(t))?e.getAttribute("content"):void 0},t.prototype.findMetaElementByName=function(t){var r,n,o,i;r=void 0,i=this.elements;for(o in i)n=i[o].elements,e(n[0],t)&&(r=n[0]);return r},i=function(t){return r(t)?"script":n(t)?"stylesheet":void 0},o=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},r=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},n=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},e=function(t,e){var r;return r=t.tagName.toLowerCase(),"meta"===r&&t.getAttribute("name")===e},t}()}.call(this),function(){e.Snapshot=function(){function t(t,e){this.headDetails=t,this.bodyElement=e}return t.wrap=function(t){return t instanceof this?t:"string"==typeof t?this.fromHTMLString(t):this.fromHTMLElement(t)},t.fromHTMLString=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromHTMLElement(e)},t.fromHTMLElement=function(t){var r,n,o,i;return o=t.querySelector("head"),r=null!=(i=t.querySelector("body"))?i:document.createElement("body"),n=e.HeadDetails.fromHeadElement(o),new this(n,r)},t.prototype.clone=function(){return new this.constructor(this.headDetails,this.bodyElement.cloneNode(!0))},t.prototype.getRootLocation=function(){var t,r;return r=null!=(t=this.getSetting("root"))?t:"/",new e.Location(r)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.bodyElement.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.getPermanentElements=function(){return this.bodyElement.querySelectorAll("[id][data-turbolinks-permanent]")},t.prototype.getPermanentElementById=function(t){return this.bodyElement.querySelector("#"+t+"[data-turbolinks-permanent]")},t.prototype.getPermanentElementsPresentInSnapshot=function(t){var e,r,n,o,i;for(o=this.getPermanentElements(),i=[],r=0,n=o.length;n>r;r++)e=o[r],t.getPermanentElementById(e.id)&&i.push(e);return i},t.prototype.findFirstAutofocusableElement=function(){return this.bodyElement.querySelector("[autofocus]")},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){return this.headDetails.getMetaValue("turbolinks-"+t)},t}()}.call(this),function(){var t=[].slice;e.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){var t,r,n=function(t,e){function r(){this.constructor=t}for(var n in e)o.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},o={}.hasOwnProperty;e.SnapshotRenderer=function(e){function o(t,e,r){this.currentSnapshot=t,this.newSnapshot=e,this.isPreview=r,this.currentHeadDetails=this.currentSnapshot.headDetails,this.newHeadDetails=this.newSnapshot.headDetails,this.currentBody=this.currentSnapshot.bodyElement,this.newBody=this.newSnapshot.bodyElement}return n(o,e),o.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},o.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},o.prototype.replaceBody=function(){var t;return t=this.relocateCurrentBodyPermanentElements(),this.activateNewBodyScriptElements(),this.assignNewBody(),this.replacePlaceholderElementsWithClonedPermanentElements(t)},o.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},o.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},o.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},o.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},o.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.relocateCurrentBodyPermanentElements=function(){var e,n,o,i,s,a,u;for(a=this.getCurrentBodyPermanentElements(),u=[],e=0,n=a.length;n>e;e++)i=a[e],s=t(i),o=this.newSnapshot.getPermanentElementById(i.id),r(i,s.element),r(o,i),u.push(s);return u},o.prototype.replacePlaceholderElementsWithClonedPermanentElements=function(t){var e,n,o,i,s,a,u;for(u=[],o=0,i=t.length;i>o;o++)a=t[o],n=a.element,s=a.permanentElement,e=s.cloneNode(!0),u.push(r(n,e));return u},o.prototype.activateNewBodyScriptElements=function(){var t,e,n,o,i,s;for(i=this.getNewBodyScriptElements(),s=[],e=0,o=i.length;o>e;e++)n=i[e],t=this.createScriptElement(n),s.push(r(n,t));return s},o.prototype.assignNewBody=function(){return document.body=this.newBody},o.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.newSnapshot.findFirstAutofocusableElement())?t.focus():void 0},o.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},o.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},o.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},o.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},o.prototype.getCurrentBodyPermanentElements=function(){return this.currentSnapshot.getPermanentElementsPresentInSnapshot(this.newSnapshot)},o.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},o}(e.Renderer),t=function(t){var e;return e=document.createElement("meta"),e.setAttribute("name","turbolinks-permanent-placeholder"),e.setAttribute("content",t.id),{element:e,permanentElement:t}},r=function(t,e){var r;return(r=t.parentNode)?r.replaceChild(e,t):void 0}}.call(this),function(){var t=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;e.ErrorRenderer=function(e){function r(t){var e;e=document.createElement("html"),e.innerHTML=t,this.newHead=e.querySelector("head"),this.newBody=e.querySelector("body")}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceHeadAndBody(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceHeadAndBody=function(){var t,e;return e=document.head,t=document.body,e.parentNode.replaceChild(this.newHead,e),t.parentNode.replaceChild(this.newBody,t)},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(e.Renderer)}.call(this),function(){e.View=function(){function t(t){this.delegate=t,this.htmlElement=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return e.Snapshot.fromHTMLElement(this.htmlElement)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.htmlElement.setAttribute("data-turbolinks-preview",""):this.htmlElement.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,r,n){return e.SnapshotRenderer.render(this.delegate,n,this.getSnapshot(),e.Snapshot.wrap(t),r)},t.prototype.renderError=function(t,r){return e.ErrorRenderer.render(this.delegate,r,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=t(this.onScroll,this),this.onScroll=e.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){e.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var r;return t.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},t.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},t.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(t){return e.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=t(this.performScroll,this),this.identifier=e.uuid(),this.location=e.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new e.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(t,r){return this.response=t,null!=r&&(this.redirectedToLocation=e.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return e.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Controller=function(){function r(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new e.History(this),this.view=new e.View(this),this.scrollManager=new e.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return r.prototype.start=function(){return e.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new e.SnapshotCache(10)},r.prototype.visit=function(t,r){var n,o;return null==r&&(r={}),t=e.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(t,n)):window.location=t:void 0},r.prototype.startVisitToLocationWithAction=function(t,r,n){var o;return e.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(t,r,{restorationData:o})):window.location=t},r.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},r.prototype.startHistory=function(){return this.location=e.Location.wrap(window.location),this.restorationIdentifier=e.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=e.Location.wrap(t)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return null!=(e=this.cache.get(t))?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable();
},r.prototype.cacheSnapshot=function(){var t,r;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),r=this.view.getSnapshot(),t=this.lastRenderedLocation,e.defer(function(e){return function(){return e.cache.put(t,r.clone())}}(this))):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,r){return e.dispatch("turbolinks:click",{target:t,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(t){return e.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(t){return e.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return e.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(t){return e.dispatch("turbolinks:before-render",{data:{newBody:t}})},r.prototype.notifyApplicationAfterRender=function(){return e.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),e.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(t,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new e.Visit(this,t,r),u.restorationIdentifier=null!=a?a:e.uuid(),u.restorationData=e.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?e.closest(t,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(t){var r;return r=new e.Location(t.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(t){var r;return(r=e.closest(t,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,r,n;e.start=function(){return r()?(null==e.controller&&(e.controller=t()),e.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=e),n()},t=function(){var t;return t=new e.Controller,t.adapter=new e.BrowserAdapter(t),t},n=function(){return window.Turbolinks===e},n()&&e.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=e:"function"==typeof define&&define.amd&&define(e)}).call(this);
/*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = global || self, factory(global.bootstrap = {}, global.jQuery));
}(this, function (exports, $) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.3.1';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $(element).closest("." + ClassName.ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);
      $(element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(ClassName.SHOW);

      if (!$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.3.1';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
  var ClassName$1 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector$1 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event$1 = {
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1)
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Button =
  /*#__PURE__*/
  function () {
    function Button(element) {
      this._element = element;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = this._element.querySelector(Selector$1.INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

              if (activeElement) {
                $(activeElement).removeClass(ClassName$1.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }

            input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName$1.ACTIVE);
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY$1, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!$(button).hasClass(ClassName$1.BUTTON)) {
      button = $(button).closest(Selector$1.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector$1.BUTTON)[0];
    $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1] = Button._jQueryInterface;
  $.fn[NAME$1].Constructor = Button;

  $.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.3.1';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event$2 = {
    SLIDE: "slide" + EVENT_KEY$2,
    SLID: "slid" + EVENT_KEY$2,
    KEYDOWN: "keydown" + EVENT_KEY$2,
    MOUSEENTER: "mouseenter" + EVENT_KEY$2,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
    TOUCHSTART: "touchstart" + EVENT_KEY$2,
    TOUCHMOVE: "touchmove" + EVENT_KEY$2,
    TOUCHEND: "touchend" + EVENT_KEY$2,
    POINTERDOWN: "pointerdown" + EVENT_KEY$2,
    POINTERUP: "pointerup" + EVENT_KEY$2,
    DRAG_START: "dragstart" + EVENT_KEY$2,
    LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
  };
  var ClassName$2 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  };
  var Selector$2 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(Selector$2.NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event$2.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY$2);
      $.removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event$2.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(Event$2.MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(Event$2.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $(this._element).on(Event$2.POINTERDOWN, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(ClassName$2.POINTER_EVENT);
      } else {
        $(this._element).on(Event$2.TOUCHSTART, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.TOUCHMOVE, function (event) {
          return move(event);
        });
        $(this._element).on(Event$2.TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;

        default:
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

      var slideEvent = $.Event(Event$2.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $(this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
        $(indicators).removeClass(ClassName$2.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName$2.ACTIVE);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$2.LEFT;
        orderClassName = ClassName$2.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName$2.RIGHT;
        orderClassName = ClassName$2.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event$2.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($(this._element).hasClass(ClassName$2.SLIDE)) {
        $(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
          $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $(_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $(activeElement).removeClass(ClassName$2.ACTIVE);
        $(nextElement).addClass(ClassName$2.ACTIVE);
        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$2);

        var _config = _objectSpread({}, Default, $(this).data());

        if (typeof config === 'object') {
          _config = _objectSpread({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
        return;
      }

      var config = _objectSpread({}, $(target).data(), $(this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
  $(window).on(Event$2.LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $(carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$2] = Carousel._jQueryInterface;
  $.fn[NAME$2].Constructor = Carousel;

  $.fn[NAME$2].noConflict = function () {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.3.1';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event$3 = {
    SHOW: "show" + EVENT_KEY$3,
    SHOWN: "shown" + EVENT_KEY$3,
    HIDE: "hide" + EVENT_KEY$3,
    HIDDEN: "hidden" + EVENT_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
  };
  var ClassName$3 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector$3 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName$3.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(ClassName$3.COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event$3.SHOW);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

        if (!activesData) {
          $(actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event$3.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event$3.HIDE);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(ClassName$3.SHOW)) {
              $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $(element).hasClass(ClassName$3.SHOW);

      if (triggerArray.length) {
        $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$3);

        var _config = _objectSpread({}, Default$1, $this.data(), typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3] = Collapse._jQueryInterface;
  $.fn[NAME$3].Constructor = Collapse;

  $.fn[NAME$3].noConflict = function () {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.14.7
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  var timeoutDuration = 0;
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      timeoutDuration = 1;
      break;
    }
  }

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent || null;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();





  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.right - result.left;
    var height = sizes.height || element.clientHeight || result.bottom - result.top;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop, 10);
      var marginLeft = parseFloat(styles.marginLeft, 10);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    var parentNode = getParentNode(element);
    if (!parentNode) {
      return false;
    }
    return isFixed(parentNode);
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */
  function destroy() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicity asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */
  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);

    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;

    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends({}, attributes, data.attributes);
    data.styles = _extends({}, styles, data.styles);
    data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty({}, mainSide, value);
      }
    };

    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport'
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends({
          name: name
        }, _this.options.modifiers[name]);
      })
      // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.3.1';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event$4 = {
    HIDE: "hide" + EVENT_KEY$4,
    HIDDEN: "hidden" + EVENT_KEY$4,
    SHOW: "show" + EVENT_KEY$4,
    SHOWN: "shown" + EVENT_KEY$4,
    CLICK: "click" + EVENT_KEY$4,
    CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
  };
  var ClassName$4 = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  };
  var Selector$4 = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic'
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);

      var isActive = $(this._menu).hasClass(ClassName$4.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);
      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $(parent).addClass(ClassName$4.POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
        $(document.body).children().on('mouseover', null, $.noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    };

    _proto.show = function show() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $.Event(Event$4.HIDE, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$4);
      $(this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $(this._element).on(Event$4.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, this.constructor.Default, $(this._element).data(), config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(Selector$4.MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element.parentNode);
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
        placement = AttachmentMap.TOP;

        if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      } else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      } else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        } // Disable Popper.js if we have a static display

      };

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return popperConfig;
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $(toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$(parent).hasClass(ClassName$4.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');
        $(dropdownMenu).removeClass(ClassName$4.SHOW);
        $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $(parent).hasClass(ClassName$4.SHOW);

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS));

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$4] = Dropdown._jQueryInterface;
  $.fn[NAME$4].Constructor = Dropdown;

  $.fn[NAME$4].noConflict = function () {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.3.1';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event$5 = {
    HIDE: "hide" + EVENT_KEY$5,
    HIDDEN: "hidden" + EVENT_KEY$5,
    SHOW: "show" + EVENT_KEY$5,
    SHOWN: "shown" + EVENT_KEY$5,
    FOCUSIN: "focusin" + EVENT_KEY$5,
    RESIZE: "resize" + EVENT_KEY$5,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
    CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
  };
  var ClassName$5 = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$5 = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(Selector$5.DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($(this._element).hasClass(ClassName$5.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event$5.SHOW, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $.Event(Event$5.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $(document).off(Event$5.FOCUSIN);
      $(this._element).removeClass(ClassName$5.SHOW);
      $(this._element).off(Event$5.CLICK_DISMISS);
      $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */

      $(document).off(Event$5.FOCUSIN);
      $.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$3, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE)) {
        this._dialog.querySelector(Selector$5.MODAL_BODY).scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName$5.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event$5.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        $(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
      .on(Event$5.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE$1) {
            event.preventDefault();

            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event$5.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $(window).on(Event$5.RESIZE, function (event) {
          return _this6.handleUpdate(event);
        });
      } else {
        $(window).off(Event$5.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName$5.OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        $(_this7._element).trigger(Event$5.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName$5.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $(this._backdrop).appendTo(document.body);
        $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName$5.SHOW);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName$5.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($(this._element).hasClass(ClassName$5.FADE)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this9 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding

        $(fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $(stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $(document.body).css('padding-right');
        $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $(document.body).addClass(ClassName$5.OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
      $(fixedContent).each(function (index, element) {
        var padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
      $(elements).each(function (index, element) {
        var margin = $(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $(document.body).data('padding-right');
      $(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$5);

        var _config = _objectSpread({}, Default$3, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event$5.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event$5.HIDDEN, function () {
        if ($(_this10).is(':visible')) {
          _this10.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$5] = Modal._jQueryInterface;
  $.fn[NAME$5].Constructor = Modal;

  $.fn[NAME$5].noConflict = function () {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

  };
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i, len);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.3.1';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object'
  };
  var AttachmentMap$1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event$6 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var ClassName$6 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$6 = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      /**
       * Check for Popper dependency
       * Popper - https://popper.js.org
       */
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $.removeData(this.element, this.constructor.DATA_KEY);
      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper !== null) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName$6.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, {
          placement: attachment,
          modifiers: {
            offset: this._getOffset(),
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: Selector$6.ARROW
            },
            preventOverflow: {
              boundariesElement: this.config.boundary
            }
          },
          onCreate: function onCreate(data) {
            if (data.originalPlacement !== data.placement) {
              _this._handlePopperPlacementChange(data);
            }
          },
          onUpdate: function onUpdate(data) {
            return _this._handlePopperPlacementChange(data);
          }
        });
        $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if ($(this.tip).hasClass(ClassName$6.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $(document.body).children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if ($(this.tip).hasClass(ClassName$6.FADE)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
      $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getOffset = function _getOffset() {
      var _this3 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $(this.config.container);
      }

      return $(document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap$1[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this4 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
            return _this4.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
          $(_this4.element).on(eventIn, _this4.config.selector, function (event) {
            return _this4._enter(event);
          }).on(eventOut, _this4.config.selector, function (event) {
            return _this4._leave(event);
          });
        }
      });
      $(this.element).closest('.modal').on('hide.bs.modal', function () {
        if (_this4.element) {
          _this4.hide();
        }
      });

      if (this.config.selector) {
        this.config = _objectSpread({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $(this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      var popperInstance = popperData.instance;
      this.tip = popperInstance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $(tip).removeClass(ClassName$6.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$6;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$6] = Tooltip._jQueryInterface;
  $.fn[NAME$6].Constructor = Tooltip;

  $.fn[NAME$6].noConflict = function () {
    $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'popover';
  var VERSION$7 = '4.3.1';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _objectSpread({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _objectSpread({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName$7 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$7 = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var Event$7 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(Selector$7.CONTENT), content);
      $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$7;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$7] = Popover._jQueryInterface;
  $.fn[NAME$7].Constructor = Popover;

  $.fn[NAME$7].noConflict = function () {
    $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.3.1';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var Event$8 = {
    ACTIVATE: "activate" + EVENT_KEY$8,
    SCROLL: "scroll" + EVENT_KEY$8,
    LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
  };
  var ClassName$8 = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };
  var Selector$8 = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var ScrollSpy =
  /*#__PURE__*/
  function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $(this._scrollElement).on(Event$8.SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$8);
      $(this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$6, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $(config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      var offsetLength = this._offsets.length;

      for (var i = offsetLength; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
        $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
        $link.addClass(ClassName$8.ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
      }

      $(this._scrollElement).trigger(Event$8.ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(ClassName$8.ACTIVE);
      }).forEach(function (node) {
        return node.classList.remove(ClassName$8.ACTIVE);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(window).on(Event$8.LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$8] = ScrollSpy._jQueryInterface;
  $.fn[NAME$8].Constructor = ScrollSpy;

  $.fn[NAME$8].noConflict = function () {
    $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.3.1';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
  var Event$9 = {
    HIDE: "hide" + EVENT_KEY$9,
    HIDDEN: "hidden" + EVENT_KEY$9,
    SHOW: "show" + EVENT_KEY$9,
    SHOWN: "shown" + EVENT_KEY$9,
    CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
  };
  var ClassName$9 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$9 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event$9.HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $.Event(Event$9.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event$9.HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $.Event(Event$9.SHOWN, {
          relatedTarget: previous
        });
        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $(active).removeClass(ClassName$9.ACTIVE);
        var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName$9.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $(element).addClass(ClassName$9.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(ClassName$9.FADE)) {
        element.classList.add(ClassName$9.SHOW);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
        var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
          $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$9] = Tab._jQueryInterface;
  $.fn[NAME$9].Constructor = Tab;

  $.fn[NAME$9].noConflict = function () {
    $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.3.1';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
  var Event$a = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
    HIDE: "hide" + EVENT_KEY$a,
    HIDDEN: "hidden" + EVENT_KEY$a,
    SHOW: "show" + EVENT_KEY$a,
    SHOWN: "shown" + EVENT_KEY$a
  };
  var ClassName$a = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  };
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var Selector$a = {
    DATA_DISMISS: '[data-dismiss="toast"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Toast =
  /*#__PURE__*/
  function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      $(this._element).trigger(Event$a.SHOW);

      if (this._config.animation) {
        this._element.classList.add(ClassName$a.FADE);
      }

      var complete = function complete() {
        _this._element.classList.remove(ClassName$a.SHOWING);

        _this._element.classList.add(ClassName$a.SHOW);

        $(_this._element).trigger(Event$a.SHOWN);

        if (_this._config.autohide) {
          _this.hide();
        }
      };

      this._element.classList.remove(ClassName$a.HIDE);

      this._element.classList.add(ClassName$a.SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide(withoutTimeout) {
      var _this2 = this;

      if (!this._element.classList.contains(ClassName$a.SHOW)) {
        return;
      }

      $(this._element).trigger(Event$a.HIDE);

      if (withoutTimeout) {
        this._close();
      } else {
        this._timeout = setTimeout(function () {
          _this2._close();
        }, this._config.delay);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      this._timeout = null;

      if (this._element.classList.contains(ClassName$a.SHOW)) {
        this._element.classList.remove(ClassName$a.SHOW);
      }

      $(this._element).off(Event$a.CLICK_DISMISS);
      $.removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$7, $(this._element).data(), typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this3 = this;

      $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
        return _this3.hide(true);
      });
    };

    _proto._close = function _close() {
      var _this4 = this;

      var complete = function complete() {
        _this4._element.classList.add(ClassName$a.HIDE);

        $(_this4._element).trigger(Event$a.HIDDEN);
      };

      this._element.classList.remove(ClassName$a.SHOW);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$a] = Toast._jQueryInterface;
  $.fn[NAME$a].Constructor = Toast;

  $.fn[NAME$a].noConflict = function () {
    $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function () {
    if (typeof $ === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })();

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
/*
 Highcharts JS v5.0.2 (2016-10-26)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(M,a){"object"===typeof module&&module.exports?module.exports=M.document?a(M):a:M.Highcharts=a(M)})("undefined"!==typeof window?window:this,function(M){M=function(){var a=window,D=a.document,z=a.navigator&&a.navigator.userAgent||"",F=D&&D.createElementNS&&!!D.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,J=/(edge|msie|trident)/i.test(z)&&!window.opera,m=!F,f=/Firefox/.test(z),h=f&&4>parseInt(z.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highcharts",
version:"5.0.2",deg2rad:2*Math.PI/360,doc:D,hasBidiBug:h,hasTouch:D&&void 0!==D.documentElement.ontouchstart,isMS:J,isWebKit:/AppleWebKit/.test(z),isFirefox:f,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(z),SVG_NS:"http://www.w3.org/2000/svg",idCounter:0,chartCount:0,seriesTypes:{},symbolSizes:{},svg:F,vml:m,win:a,charts:[],marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){}}}();(function(a){var D=[],z=a.charts,F=a.doc,J=a.win;a.error=function(a,f){a="Highcharts error #"+
a+": www.highcharts.com/errors/"+a;if(f)throw Error(a);J.console&&console.log(a)};a.Fx=function(a,f,h){this.options=f;this.elem=a;this.prop=h};a.Fx.prototype={dSetter:function(){var a=this.paths[0],f=this.paths[1],h=[],q=this.now,n=a.length,k;if(1===q)h=this.toD;else if(n===f.length&&1>q)for(;n--;)k=parseFloat(a[n]),h[n]=isNaN(k)?a[n]:q*parseFloat(f[n]-k)+k;else h=f;this.elem.attr("d",h)},update:function(){var a=this.elem,f=this.prop,h=this.now,q=this.options.step;if(this[f+"Setter"])this[f+"Setter"]();
else a.attr?a.element&&a.attr(f,h):a.style[f]=h+this.unit;q&&q.call(a,h,this)},run:function(a,f,h){var m=this,n=function(a){return n.stopped?!1:m.step(a)},k;this.startTime=+new Date;this.start=a;this.end=f;this.unit=h;this.now=this.start;this.pos=0;n.elem=this.elem;n()&&1===D.push(n)&&(n.timerId=setInterval(function(){for(k=0;k<D.length;k++)D[k]()||D.splice(k--,1);D.length||clearInterval(n.timerId)},13))},step:function(a){var f=+new Date,h,m=this.options;h=this.elem;var n=m.complete,k=m.duration,
v=m.curAnim,d;if(h.attr&&!h.element)h=!1;else if(a||f>=k+this.startTime){this.now=this.end;this.pos=1;this.update();a=v[this.prop]=!0;for(d in v)!0!==v[d]&&(a=!1);a&&n&&n.call(h);h=!1}else this.pos=m.easing((f-this.startTime)/k),this.now=this.start+(this.end-this.start)*this.pos,this.update(),h=!0;return h},initPath:function(m,f,h){function q(a){for(l=a.length;l--;)"M"!==a[l]&&"L"!==a[l]||a.splice(l+1,0,a[l+1],a[l+2],a[l+1],a[l+2])}function n(a,b){for(;a.length<c;){a[0]=b[c-a.length];var e=a.slice(0,
B);[].splice.apply(a,[0,0].concat(e));u&&(e=a.slice(a.length-B),[].splice.apply(a,[a.length,0].concat(e)),l--)}a[0]="M"}function k(a,b){for(var t=(c-a.length)/B;0<t&&t--;)e=a.slice().splice(a.length/L-B,B*L),e[0]=b[c-B-t*B],w&&(e[B-6]=e[B-2],e[B-5]=e[B-1]),[].splice.apply(a,[a.length/L,0].concat(e)),u&&t--}f=f||"";var v,d=m.startX,g=m.endX,w=-1<f.indexOf("C"),B=w?7:3,c,e,l;f=f.split(" ");h=h.slice();var u=m.isArea,L=u?2:1,b;w&&(q(f),q(h));if(d&&g){for(l=0;l<d.length;l++)if(d[l]===g[0]){v=l;break}else if(d[0]===
g[g.length-d.length+l]){v=l;b=!0;break}void 0===v&&(f=[])}f.length&&a.isNumber(v)&&(c=h.length+v*L*B,b?(n(f,h),k(h,f)):(n(h,f),k(f,h)));return[f,h]}};a.extend=function(a,f){var h;a||(a={});for(h in f)a[h]=f[h];return a};a.merge=function(){var m,f=arguments,h,q={},n=function(k,f){var d,g;"object"!==typeof k&&(k={});for(g in f)f.hasOwnProperty(g)&&(d=f[g],a.isObject(d,!0)&&"renderTo"!==g&&"number"!==typeof d.nodeType?k[g]=n(k[g]||{},d):k[g]=f[g]);return k};!0===f[0]&&(q=f[1],f=Array.prototype.slice.call(f,
2));h=f.length;for(m=0;m<h;m++)q=n(q,f[m]);return q};a.pInt=function(a,f){return parseInt(a,f||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(m,f){return m&&"object"===typeof m&&(!f||!a.isArray(m))};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=function(a,f){for(var h=a.length;h--;)if(a[h]===f){a.splice(h,1);break}};a.defined=function(a){return void 0!==
a&&null!==a};a.attr=function(m,f,h){var q,n;if(a.isString(f))a.defined(h)?m.setAttribute(f,h):m&&m.getAttribute&&(n=m.getAttribute(f));else if(a.defined(f)&&a.isObject(f))for(q in f)m.setAttribute(q,f[q]);return n};a.splat=function(m){return a.isArray(m)?m:[m]};a.syncTimeout=function(a,f,h){if(f)return setTimeout(a,f,h);a.call(0,h)};a.pick=function(){var a=arguments,f,h,q=a.length;for(f=0;f<q;f++)if(h=a[f],void 0!==h&&null!==h)return h};a.css=function(m,f){a.isMS&&!a.svg&&f&&void 0!==f.opacity&&(f.filter=
"alpha(opacity\x3d"+100*f.opacity+")");a.extend(m.style,f)};a.createElement=function(m,f,h,q,n){m=F.createElement(m);var k=a.css;f&&a.extend(m,f);n&&k(m,{padding:0,border:"none",margin:0});h&&k(m,h);q&&q.appendChild(m);return m};a.extendClass=function(m,f){var h=function(){};h.prototype=new m;a.extend(h.prototype,f);return h};a.pad=function(a,f,h){return Array((f||2)+1-String(a).length).join(h||0)+a};a.relativeLength=function(a,f){return/%$/.test(a)?f*parseFloat(a)/100:parseFloat(a)};a.wrap=function(a,
f,h){var m=a[f];a[f]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(m);return h.apply(this,a)}};a.getTZOffset=function(m){var f=a.Date;return 6E4*(f.hcGetTimezoneOffset&&f.hcGetTimezoneOffset(m)||f.hcTimezoneOffset||0)};a.dateFormat=function(m,f,h){if(!a.defined(f)||isNaN(f))return a.defaultOptions.lang.invalidDate||"";m=a.pick(m,"%Y-%m-%d %H:%M:%S");var q=a.Date,n=new q(f-a.getTZOffset(f)),k,v=n[q.hcGetHours](),d=n[q.hcGetDay](),g=n[q.hcGetDate](),w=n[q.hcGetMonth](),B=n[q.hcGetFullYear](),
c=a.defaultOptions.lang,e=c.weekdays,l=c.shortWeekdays,u=a.pad,q=a.extend({a:l?l[d]:e[d].substr(0,3),A:e[d],d:u(g),e:u(g,2," "),w:d,b:c.shortMonths[w],B:c.months[w],m:u(w+1),y:B.toString().substr(2,2),Y:B,H:u(v),k:v,I:u(v%12||12),l:v%12||12,M:u(n[q.hcGetMinutes]()),p:12>v?"AM":"PM",P:12>v?"am":"pm",S:u(n.getSeconds()),L:u(Math.round(f%1E3),3)},a.dateFormats);for(k in q)for(;-1!==m.indexOf("%"+k);)m=m.replace("%"+k,"function"===typeof q[k]?q[k](f):q[k]);return h?m.substr(0,1).toUpperCase()+m.substr(1):
m};a.formatSingle=function(m,f){var h=/\.([0-9])/,q=a.defaultOptions.lang;/f$/.test(m)?(h=(h=m.match(h))?h[1]:-1,null!==f&&(f=a.numberFormat(f,h,q.decimalPoint,-1<m.indexOf(",")?q.thousandsSep:""))):f=a.dateFormat(m,f);return f};a.format=function(m,f){for(var h="{",q=!1,n,k,v,d,g=[],w;m;){h=m.indexOf(h);if(-1===h)break;n=m.slice(0,h);if(q){n=n.split(":");k=n.shift().split(".");d=k.length;w=f;for(v=0;v<d;v++)w=w[k[v]];n.length&&(w=a.formatSingle(n.join(":"),w));g.push(w)}else g.push(n);m=m.slice(h+
1);h=(q=!q)?"}":"{"}g.push(m);return g.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(m,f,h,q,n){var k,v=m;h=a.pick(h,1);k=m/h;f||(f=[1,2,2.5,5,10],!1===q&&(1===h?f=[1,2,5,10]:.1>=h&&(f=[1/h])));for(q=0;q<f.length&&!(v=f[q],n&&v*h>=m||!n&&k<=(f[q]+(f[q+1]||f[q]))/2);q++);return v*h};a.stableSort=function(a,f){var h=a.length,m,n;for(n=0;n<h;n++)a[n].safeI=n;a.sort(function(a,n){m=f(a,n);return 0===m?a.safeI-n.safeI:m});for(n=
0;n<h;n++)delete a[n].safeI};a.arrayMin=function(a){for(var f=a.length,h=a[0];f--;)a[f]<h&&(h=a[f]);return h};a.arrayMax=function(a){for(var f=a.length,h=a[0];f--;)a[f]>h&&(h=a[f]);return h};a.destroyObjectProperties=function(a,f){for(var h in a)a[h]&&a[h]!==f&&a[h].destroy&&a[h].destroy(),delete a[h]};a.discardElement=function(m){var f=a.garbageBin;f||(f=a.createElement("div"));m&&f.appendChild(m);f.innerHTML=""};a.correctFloat=function(a,f){return parseFloat(a.toPrecision(f||14))};a.setAnimation=
function(m,f){f.renderer.globalAnimation=a.pick(m,f.options.chart.animation,!0)};a.animObject=function(m){return a.isObject(m)?a.merge(m):{duration:m?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(m,f,h,q){m=+m||0;f=+f;var n=a.defaultOptions.lang,k=(m.toString().split(".")[1]||"").length,v,d,g=Math.abs(m);-1===f?f=Math.min(k,20):a.isNumber(f)||(f=2);v=String(a.pInt(g.toFixed(f)));d=3<v.length?v.length%3:
0;h=a.pick(h,n.decimalPoint);q=a.pick(q,n.thousandsSep);m=(0>m?"-":"")+(d?v.substr(0,d)+q:"");m+=v.substr(d).replace(/(\d{3})(?=\d)/g,"$1"+q);f&&(q=Math.abs(g-v+Math.pow(10,-Math.max(f,k)-1)),m+=h+q.toFixed(f).slice(2));return m};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(m,f){return"width"===f?Math.min(m.offsetWidth,m.scrollWidth)-a.getStyle(m,"padding-left")-a.getStyle(m,"padding-right"):"height"===f?Math.min(m.offsetHeight,m.scrollHeight)-a.getStyle(m,
"padding-top")-a.getStyle(m,"padding-bottom"):(m=J.getComputedStyle(m,void 0))&&a.pInt(m.getPropertyValue(f))};a.inArray=function(a,f){return f.indexOf?f.indexOf(a):[].indexOf.call(f,a)};a.grep=function(a,f){return[].filter.call(a,f)};a.map=function(a,f){for(var h=[],q=0,n=a.length;q<n;q++)h[q]=f.call(a[q],a[q],q,a);return h};a.offset=function(a){var f=F.documentElement;a=a.getBoundingClientRect();return{top:a.top+(J.pageYOffset||f.scrollTop)-(f.clientTop||0),left:a.left+(J.pageXOffset||f.scrollLeft)-
(f.clientLeft||0)}};a.stop=function(a){for(var f=D.length;f--;)D[f].elem===a&&(D[f].stopped=!0)};a.each=function(a,f,h){return Array.prototype.forEach.call(a,f,h)};a.addEvent=function(a,f,h){function q(k){k.target=k.srcElement||J;h.call(a,k)}var n=a.hcEvents=a.hcEvents||{};a.addEventListener?a.addEventListener(f,h,!1):a.attachEvent&&(a.hcEventsIE||(a.hcEventsIE={}),a.hcEventsIE[h.toString()]=q,a.attachEvent("on"+f,q));n[f]||(n[f]=[]);n[f].push(h)};a.removeEvent=function(m,f,h){function q(a,d){m.removeEventListener?
m.removeEventListener(a,d,!1):m.attachEvent&&(d=m.hcEventsIE[d.toString()],m.detachEvent("on"+a,d))}function n(){var a,d;if(m.nodeName)for(d in f?(a={},a[f]=!0):a=v,a)if(v[d])for(a=v[d].length;a--;)q(d,v[d][a])}var k,v=m.hcEvents,d;v&&(f?(k=v[f]||[],h?(d=a.inArray(h,k),-1<d&&(k.splice(d,1),v[f]=k),q(f,h)):(n(),v[f]=[])):(n(),m.hcEvents={}))};a.fireEvent=function(m,f,h,q){var n;n=m.hcEvents;var k,v;h=h||{};if(F.createEvent&&(m.dispatchEvent||m.fireEvent))n=F.createEvent("Events"),n.initEvent(f,!0,
!0),a.extend(n,h),m.dispatchEvent?m.dispatchEvent(n):m.fireEvent(f,n);else if(n)for(n=n[f]||[],k=n.length,h.target||a.extend(h,{preventDefault:function(){h.defaultPrevented=!0},target:m,type:f}),f=0;f<k;f++)(v=n[f])&&!1===v.call(m,h)&&h.preventDefault();q&&!h.defaultPrevented&&q(h)};a.animate=function(m,f,h){var q,n="",k,v,d;a.isObject(h)||(q=arguments,h={duration:q[2],easing:q[3],complete:q[4]});a.isNumber(h.duration)||(h.duration=400);h.easing="function"===typeof h.easing?h.easing:Math[h.easing]||
Math.easeInOutSine;h.curAnim=a.merge(f);for(d in f)v=new a.Fx(m,h,d),k=null,"d"===d?(v.paths=v.initPath(m,m.d,f.d),v.toD=f.d,q=0,k=1):m.attr?q=m.attr(d):(q=parseFloat(a.getStyle(m,d))||0,"opacity"!==d&&(n="px")),k||(k=f[d]),k.match&&k.match("px")&&(k=k.replace(/px/g,"")),v.run(q,k,n)};a.seriesType=function(m,f,h,q,n){var k=a.getOptions(),v=a.seriesTypes;k.plotOptions[m]=a.merge(k.plotOptions[f],h);v[m]=a.extendClass(v[f]||function(){},q);v[m].prototype.type=m;n&&(v[m].prototype.pointClass=a.extendClass(a.Point,
n));return v[m]};J.jQuery&&(J.jQuery.fn.highcharts=function(){var m=[].slice.call(arguments);if(this[0])return m[0]?(new (a[a.isString(m[0])?m.shift():"Chart"])(this[0],m[0],m[1]),this):z[a.attr(this[0],"data-highcharts-chart")]});F&&!F.defaultView&&(a.getStyle=function(m,f){var h={width:"clientWidth",height:"clientHeight"}[f];if(m.style[f])return a.pInt(m.style[f]);"opacity"===f&&(f="filter");if(h)return m.style.zoom=1,Math.max(m[h]-2*a.getStyle(m,"padding"),0);m=m.currentStyle[f.replace(/\-(\w)/g,
function(a,n){return n.toUpperCase()})];"filter"===f&&(m=m.replace(/alpha\(opacity=([0-9]+)\)/,function(a,n){return n/100}));return""===m?1:a.pInt(m)});Array.prototype.forEach||(a.each=function(a,f,h){for(var q=0,n=a.length;q<n;q++)if(!1===f.call(h,a[q],q,a))return q});Array.prototype.indexOf||(a.inArray=function(a,f){var h,q=0;if(f)for(h=f.length;q<h;q++)if(f[q]===a)return q;return-1});Array.prototype.filter||(a.grep=function(a,f){for(var h=[],q=0,n=a.length;q<n;q++)f(a[q],q)&&h.push(a[q]);return h})})(M);
(function(a){var D=a.each,z=a.isNumber,F=a.map,J=a.merge,m=a.pInt;a.Color=function(f){if(!(this instanceof a.Color))return new a.Color(f);this.init(f)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[m(a[1]),m(a[2]),m(a[3]),parseFloat(a[4],10)]}},{regex:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(a){return[m(a[1],16),m(a[2],16),m(a[3],16),1]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
parse:function(a){return[m(a[1]),m(a[2]),m(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(f){var h,q,n,k;if((this.input=f=this.names[f]||f)&&f.stops)this.stops=F(f.stops,function(k){return new a.Color(k[1])});else for(n=this.parsers.length;n--&&!q;)k=this.parsers[n],(h=k.regex.exec(f))&&(q=k.parse(h));this.rgba=q||[]},get:function(a){var h=this.input,f=this.rgba,n;this.stops?(n=J(h),n.stops=[].concat(n.stops),D(this.stops,function(k,f){n.stops[f]=[n.stops[f][0],k.get(a)]})):n=f&&
z(f[0])?"rgb"===a||!a&&1===f[3]?"rgb("+f[0]+","+f[1]+","+f[2]+")":"a"===a?f[3]:"rgba("+f.join(",")+")":h;return n},brighten:function(a){var h,f=this.rgba;if(this.stops)D(this.stops,function(n){n.brighten(a)});else if(z(a)&&0!==a)for(h=0;3>h;h++)f[h]+=m(255*a),0>f[h]&&(f[h]=0),255<f[h]&&(f[h]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this}};a.color=function(f){return new a.Color(f)}})(M);(function(a){var D,z,F=a.addEvent,J=a.animate,m=a.attr,f=a.charts,h=a.color,q=a.css,n=a.createElement,
k=a.defined,v=a.deg2rad,d=a.destroyObjectProperties,g=a.doc,w=a.each,B=a.extend,c=a.erase,e=a.grep,l=a.hasTouch,u=a.isArray,L=a.isFirefox,b=a.isMS,t=a.isObject,y=a.isString,K=a.isWebKit,x=a.merge,I=a.noop,r=a.pick,G=a.pInt,H=a.removeEvent,N=a.stop,p=a.svg,A=a.SVG_NS,P=a.symbolSizes,O=a.win;D=a.SVGElement=function(){return this};D.prototype={opacity:1,SVG_NS:A,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textShadow".split(" "),init:function(a,
b){this.element="span"===b?n(b):g.createElementNS(this.SVG_NS,b);this.renderer=a},animate:function(a,b,p){b=r(b,this.renderer.globalAnimation,!0);N(this);b?(p&&(b.complete=p),J(this,a,b)):this.attr(a,null,p);return this},colorGradient:function(b,E,p){var C=this.renderer,e,A,c,d,t,S,l,g,y,r,n,H=[],G;b.linearGradient?A="linearGradient":b.radialGradient&&(A="radialGradient");if(A){c=b[A];t=C.gradients;l=b.stops;r=p.radialReference;u(c)&&(b[A]=c={x1:c[0],y1:c[1],x2:c[2],y2:c[3],gradientUnits:"userSpaceOnUse"});
"radialGradient"===A&&r&&!k(c.gradientUnits)&&(d=c,c=x(c,C.getRadialAttr(r,d),{gradientUnits:"userSpaceOnUse"}));for(n in c)"id"!==n&&H.push(n,c[n]);for(n in l)H.push(l[n]);H=H.join(",");t[H]?r=t[H].attr("id"):(c.id=r="highcharts-"+a.idCounter++,t[H]=S=C.createElement(A).attr(c).add(C.defs),S.radAttr=d,S.stops=[],w(l,function(b){0===b[1].indexOf("rgba")?(e=a.color(b[1]),g=e.get("rgb"),y=e.get("a")):(g=b[1],y=1);b=C.createElement("stop").attr({offset:b[0],"stop-color":g,"stop-opacity":y}).add(S);S.stops.push(b)}));
G="url("+C.url+"#"+r+")";p.setAttribute(E,G);p.gradient=H;b.toString=function(){return G}}},applyTextShadow:function(a){var C=this.element,p,e=-1!==a.indexOf("contrast"),c={},A=this.renderer.forExport,d=this.renderer.forExport||void 0!==C.style.textShadow&&!b;e&&(c.textShadow=a=a.replace(/contrast/g,this.renderer.getContrast(C.style.fill)));if(K||A)c.textRendering="geometricPrecision";d?this.css(c):(this.fakeTS=!0,this.ySetter=this.xSetter,p=[].slice.call(C.getElementsByTagName("tspan")),w(a.split(/\s?,\s?/g),
function(a){var b=C.firstChild,E,e;a=a.split(" ");E=a[a.length-1];(e=a[a.length-2])&&w(p,function(a,p){0===p&&(a.setAttribute("x",C.getAttribute("x")),p=C.getAttribute("y"),a.setAttribute("y",p||0),null===p&&C.setAttribute("y",0));a=a.cloneNode(1);m(a,{"class":"highcharts-text-shadow",fill:E,stroke:E,"stroke-opacity":1/Math.max(G(e),3),"stroke-width":e,"stroke-linejoin":"round"});C.insertBefore(a,b)})}))},attr:function(a,b,p){var C,E=this.element,e,c=this,A;"string"===typeof a&&void 0!==b&&(C=a,a=
{},a[C]=b);if("string"===typeof a)c=(this[a+"Getter"]||this._defaultGetter).call(this,a,E);else{for(C in a)b=a[C],A=!1,this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(C)&&(e||(this.symbolAttr(a),e=!0),A=!0),!this.rotation||"x"!==C&&"y"!==C||(this.doTransform=!0),A||(A=this[C+"Setter"]||this._defaultSetter,A.call(this,b,C,E),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(C)&&this.updateShadows(C,b,A));this.doTransform&&(this.updateTransform(),
this.doTransform=!1)}p&&p();return c},updateShadows:function(a,b,p){for(var C=this.shadows,E=C.length;E--;)p.call(C[E],"height"===a?Math.max(b-(C[E].cutHeight||0),0):"d"===a?this.d:b,a,C[E])},addClass:function(a,b){var C=this.attr("class")||"";-1===C.indexOf(a)&&(b||(a=(C+(C?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==m(this.element,"class").indexOf(a)},removeClass:function(a){m(this.element,"class",(m(this.element,"class")||"").replace(a,""));
return this},symbolAttr:function(a){var b=this;w("x y r start end width height innerR anchorX anchorY".split(" "),function(C){b[C]=r(a[C],b[C])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,b){var C,p={},E;b=b||a.strokeWidth||0;E=Math.round(b)%2/2;a.x=Math.floor(a.x||this.x||0)+E;a.y=Math.floor(a.y||this.y||0)+E;a.width=Math.floor((a.width||this.width||0)-2*
E);a.height=Math.floor((a.height||this.height||0)-2*E);k(a.strokeWidth)&&(a.strokeWidth=b);for(C in a)this[C]!==a[C]&&(this[C]=p[C]=a[C]);return p},css:function(a){var C=this.styles,e={},A=this.element,c,d,t="";c=!C;a&&a.color&&(a.fill=a.color);if(C)for(d in a)a[d]!==C[d]&&(e[d]=a[d],c=!0);if(c){c=this.textWidth=a&&a.width&&"text"===A.nodeName.toLowerCase()&&G(a.width)||this.textWidth;C&&(a=B(C,e));this.styles=a;c&&!p&&this.renderer.forExport&&delete a.width;if(b&&!p)q(this.element,a);else{C=function(a,
b){return"-"+b.toLowerCase()};for(d in a)t+=d.replace(/([A-Z])/g,C)+":"+a[d]+";";m(A,"style",t)}this.added&&c&&this.renderer.buildText(this)}return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,b){var C=this,p=C.element;l&&"click"===a?(p.ontouchstart=function(a){C.touchEventFired=Date.now();a.preventDefault();b.call(p,a)},p.onclick=function(a){(-1===O.navigator.userAgent.indexOf("Android")||1100<Date.now()-(C.touchEventFired||0))&&b.call(p,a)}):p["on"+a]=b;return this},
setRadialReference:function(a){var b=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;b&&b.radAttr&&b.animate(this.renderer.getRadialAttr(a,b.radAttr));return this},translate:function(a,b){return this.attr({translateX:a,translateY:b})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,b=this.translateY||0,p=this.scaleX,e=this.scaleY,c=this.inverted,A=this.rotation,d=this.element;c&&(a+=this.attr("width"),
b+=this.attr("height"));a=["translate("+a+","+b+")"];c?a.push("rotate(90) scale(-1,1)"):A&&a.push("rotate("+A+" "+(d.getAttribute("x")||0)+" "+(d.getAttribute("y")||0)+")");(k(p)||k(e))&&a.push("scale("+r(p,1)+" "+r(e,1)+")");a.length&&d.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,b,p){var C,E,e,A,d={};E=this.renderer;e=E.alignedObjects;var t,l;if(a){if(this.alignOptions=a,this.alignByTranslate=b,!p||y(p))this.alignTo=
C=p||"renderer",c(e,this),e.push(this),p=null}else a=this.alignOptions,b=this.alignByTranslate,C=this.alignTo;p=r(p,E[C],E);C=a.align;E=a.verticalAlign;e=(p.x||0)+(a.x||0);A=(p.y||0)+(a.y||0);"right"===C?t=1:"center"===C&&(t=2);t&&(e+=(p.width-(a.width||0))/t);d[b?"translateX":"x"]=Math.round(e);"bottom"===E?l=1:"middle"===E&&(l=2);l&&(A+=(p.height-(a.height||0))/l);d[b?"translateY":"y"]=Math.round(A);this[this.placed?"animate":"attr"](d);this.placed=!0;this.alignAttr=d;return this},getBBox:function(a,
p){var C,E=this.renderer,e,A=this.element,c=this.styles,d,t=this.textStr,l,g=A.style,y,u=E.cache,x=E.cacheKeys,k;p=r(p,this.rotation);e=p*v;d=c&&c.fontSize;void 0!==t&&(k=t.toString().replace(/[0-9]/g,"0")+["",p||0,d,A.style.width].join());k&&!a&&(C=u[k]);if(!C){if(A.namespaceURI===this.SVG_NS||E.forExport){try{y=this.fakeTS&&function(a){w(A.querySelectorAll(".highcharts-text-shadow"),function(b){b.style.display=a})},L&&g.textShadow?(l=g.textShadow,g.textShadow=""):y&&y("none"),C=A.getBBox?B({},A.getBBox()):
{width:A.offsetWidth,height:A.offsetHeight},l?g.textShadow=l:y&&y("")}catch(V){}if(!C||0>C.width)C={width:0,height:0}}else C=this.htmlGetBBox();E.isSVG&&(a=C.width,E=C.height,b&&c&&"11px"===c.fontSize&&"16.9"===E.toPrecision(3)&&(C.height=E=14),p&&(C.width=Math.abs(E*Math.sin(e))+Math.abs(a*Math.cos(e)),C.height=Math.abs(E*Math.cos(e))+Math.abs(a*Math.sin(e))));if(k&&0<C.height){for(;250<x.length;)delete u[x.shift()];u[k]||x.push(k);u[k]=C}}return C},show:function(a){return this.attr({visibility:a?
"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||150,complete:function(){b.attr({y:-9999})}})},add:function(a){var b=this.renderer,p=this.element,C;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&b.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)C=this.zIndexSetter();C||(a?a.element:b.box).appendChild(p);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var b=
a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this.element||{},b=this.renderer.isSVG&&"SPAN"===a.nodeName&&this.parentGroup,p,e;a.onclick=a.onmouseout=a.onmouseover=a.onmousemove=a.point=null;N(this);this.clipPath&&(this.clipPath=this.clipPath.destroy());if(this.stops){for(e=0;e<this.stops.length;e++)this.stops[e]=this.stops[e].destroy();this.stops=null}this.safeRemoveChild(a);for(this.destroyShadows();b&&b.div&&0===b.div.childNodes.length;)a=b.parentGroup,this.safeRemoveChild(b.div),
delete b.div,b=a;this.alignTo&&c(this.renderer.alignedObjects,this);for(p in this)delete this[p];return null},shadow:function(a,b,p){var C=[],e,E,A=this.element,c,d,t,l;if(!a)this.destroyShadows();else if(!this.shadows){d=r(a.width,3);t=(a.opacity||.15)/d;l=this.parentInverted?"(-1,-1)":"("+r(a.offsetX,1)+", "+r(a.offsetY,1)+")";for(e=1;e<=d;e++)E=A.cloneNode(0),c=2*d+1-2*e,m(E,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":t*e,"stroke-width":c,transform:"translate"+l,fill:"none"}),p&&
(m(E,"height",Math.max(m(E,"height")-c,0)),E.cutHeight=c),b?b.element.appendChild(E):A.parentNode.insertBefore(E,A),C.push(E);this.shadows=C}return this},destroyShadows:function(){w(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=r(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));
return a},dSetter:function(a,b,p){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");p.setAttribute(b,a);this[b]=a},dashstyleSetter:function(a){var b,p=this["stroke-width"];"inherit"===p&&(p=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(b=a.length;b--;)a[b]=G(a[b])*
p;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,b,p){this[b]=a;p.setAttribute(b,a)},titleSetter:function(a){var b=this.element.getElementsByTagName("title")[0];b||(b=g.createElementNS(this.SVG_NS,"title"),this.element.appendChild(b));b.firstChild&&b.removeChild(b.firstChild);b.appendChild(g.createTextNode(String(r(a),"").replace(/<[^>]*>/g,
"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,b,p){"string"===typeof a?p.setAttribute(b,a):a&&this.colorGradient(a,b,p)},visibilitySetter:function(a,b,p){"inherit"===a?p.removeAttribute(b):p.setAttribute(b,a)},zIndexSetter:function(a,b){var p=this.renderer,e=this.parentGroup,C=(e||p).element||p.box,E,A=this.element,c;E=this.added;var d;k(a)&&(A.zIndex=a,a=+a,this[b]===a&&(E=!1),this[b]=a);if(E){(a=
this.zIndex)&&e&&(e.handleZ=!0);b=C.childNodes;for(d=0;d<b.length&&!c;d++)e=b[d],E=e.zIndex,e!==A&&(G(E)>a||!k(a)&&k(E)||0>a&&!k(E)&&C!==p.box)&&(C.insertBefore(A,e),c=!0);c||C.appendChild(A)}return c},_defaultSetter:function(a,b,p){p.setAttribute(b,a)}};D.prototype.yGetter=D.prototype.xGetter;D.prototype.translateXSetter=D.prototype.translateYSetter=D.prototype.rotationSetter=D.prototype.verticalAlignSetter=D.prototype.scaleXSetter=D.prototype.scaleYSetter=function(a,b){this[b]=a;this.doTransform=
!0};D.prototype["stroke-widthSetter"]=D.prototype.strokeSetter=function(a,b,p){this[b]=a;this.stroke&&this["stroke-width"]?(D.prototype.fillSetter.call(this,this.stroke,"stroke",p),p.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===b&&0===a&&this.hasStroke&&(p.removeAttribute("stroke"),this.hasStroke=!1)};z=a.SVGRenderer=function(){this.init.apply(this,arguments)};z.prototype={Element:D,SVG_NS:A,init:function(a,b,p,e,A,c){var E;e=this.createElement("svg").attr({version:"1.1",
"class":"highcharts-root"}).css(this.getStyle(e));E=e.element;a.appendChild(E);-1===a.innerHTML.indexOf("xmlns")&&m(E,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=E;this.boxWrapper=e;this.alignedObjects=[];this.url=(L||K)&&g.getElementsByTagName("base").length?O.location.href.replace(/#.*?$/,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(g.createTextNode("Created with Highcharts 5.0.2"));this.defs=this.createElement("defs").add();this.allowHTML=
c;this.forExport=A;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,p,!1);var C;L&&a.getBoundingClientRect&&(this.subPixelFix=b=function(){q(a,{left:0,top:0});C=a.getBoundingClientRect();q(a,{left:Math.ceil(C.left)-C.left+"px",top:Math.ceil(C.top)-C.top+"px"})},b(),F(O,"resize",b))},getStyle:function(a){return this.style=B({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},
isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();d(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.subPixelFix&&H(O,"resize",this.subPixelFix);return this.alignedObjects=null},createElement:function(a){var b=new this.Element;b.init(this,a);return b},draw:I,getRadialAttr:function(a,b){return{cx:a[0]-a[2]/2+b.cx*a[2],cy:a[1]-a[2]/2+b.cy*a[2],r:b.r*a[2]}},buildText:function(a){for(var b=
a.element,c=this,d=c.forExport,C=r(a.textStr,"").toString(),t=-1!==C.indexOf("\x3c"),l=b.childNodes,y,u,x,k,n=m(b,"x"),H=a.styles,f=a.textWidth,K=H&&H.lineHeight,h=H&&H.textShadow,v=H&&"ellipsis"===H.textOverflow,O=l.length,B=f&&!a.added&&this.box,P=function(a){var b;b=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:H&&H.fontSize||c.style.fontSize||12;return K?G(K):c.fontMetrics(b,a).h};O--;)b.removeChild(l[O]);t||h||v||f||-1!==C.indexOf(" ")?(y=/<.*class="([^"]+)".*>/,u=/<.*style="([^"]+)".*>/,
x=/<.*href="(http[^"]+)".*>/,B&&B.appendChild(b),C=t?C.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[C],C=e(C,function(a){return""!==a}),w(C,function(e,E){var C,t=0;e=e.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");C=e.split("|||");w(C,function(e){if(""!==e||1===C.length){var l=
{},r=g.createElementNS(c.SVG_NS,"tspan"),w,S;y.test(e)&&(w=e.match(y)[1],m(r,"class",w));u.test(e)&&(S=e.match(u)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),m(r,"style",S));x.test(e)&&!d&&(m(r,"onclick",'location.href\x3d"'+e.match(x)[1]+'"'),q(r,{cursor:"pointer"}));e=(e.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e");if(" "!==e){r.appendChild(g.createTextNode(e));t?l.dx=0:E&&null!==n&&(l.x=n);m(r,l);b.appendChild(r);!t&&E&&(!p&&d&&q(r,{display:"block"}),m(r,"dy",
P(r)));if(f){l=e.replace(/([^\^])-/g,"$1- ").split(" ");w="nowrap"===H.whiteSpace;for(var G=1<C.length||E||1<l.length&&!w,K,h,O=[],B=P(r),R=a.rotation,I=e,Q=I.length;(G||v)&&(l.length||O.length);)a.rotation=0,K=a.getBBox(!0),h=K.width,!p&&c.forExport&&(h=c.measureSpanWidth(r.firstChild.data,a.styles)),K=h>f,void 0===k&&(k=K),v&&k?(Q/=2,""===I||!K&&.5>Q?l=[]:(I=e.substring(0,I.length+(K?-1:1)*Math.ceil(Q)),l=[I+(3<f?"\u2026":"")],r.removeChild(r.firstChild))):K&&1!==l.length?(r.removeChild(r.firstChild),
O.unshift(l.pop())):(l=O,O=[],l.length&&!w&&(r=g.createElementNS(A,"tspan"),m(r,{dy:B,x:n}),S&&m(r,"style",S),b.appendChild(r)),h>f&&(f=h)),l.length&&r.appendChild(g.createTextNode(l.join(" ").replace(/- /g,"-")));a.rotation=R}t++}}})}),k&&a.attr("title",a.textStr),B&&B.removeChild(b),h&&a.applyTextShadow&&a.applyTextShadow(h)):b.appendChild(g.createTextNode(C.replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))},getContrast:function(a){a=h(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,
p,e,c,A,d,t,l,g){var E=this.label(a,p,e,g,null,null,null,null,"button"),C=0;E.attr(x({padding:8,r:2},A));var r,y,u,k;A=x({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},A);r=A.style;delete A.style;d=x(A,{fill:"#e6e6e6"},d);y=d.style;delete d.style;t=x(A,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},t);u=t.style;delete t.style;l=x(A,{style:{color:"#cccccc"}},l);k=l.style;delete l.style;F(E.element,b?"mouseover":"mouseenter",
function(){3!==C&&E.setState(1)});F(E.element,b?"mouseout":"mouseleave",function(){3!==C&&E.setState(C)});E.setState=function(a){1!==a&&(E.state=C=a);E.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);E.attr([A,d,t,l][a||0]).css([r,y,u,k][a||0])};E.attr(A).css(B({cursor:"default"},r));return E.on("click",function(a){3!==C&&c.call(E,a)})},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-b%2/
2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+b%2/2);return a},path:function(a){var b={fill:"none"};u(a)?b.d=a:t(a)&&B(b,a);return this.createElement("path").attr(b)},circle:function(a,b,p){a=t(a)?a:{x:a,y:b,r:p};b=this.createElement("circle");b.xSetter=b.ySetter=function(a,b,p){p.setAttribute("c"+b,a)};return b.attr(a)},arc:function(a,b,p,e,A,c){t(a)&&(b=a.y,p=a.r,e=a.innerR,A=a.start,c=a.end,a=a.x);a=this.symbol("arc",a||0,b||0,p||0,p||0,{innerR:e||0,start:A||0,end:c||0});a.r=p;return a},rect:function(a,
b,p,e,A,c){A=t(a)?a.r:A;var d=this.createElement("rect");a=t(a)?a:void 0===a?{}:{x:a,y:b,width:Math.max(p,0),height:Math.max(e,0)};void 0!==c&&(a.strokeWidth=c,a=d.crisp(a));a.fill="none";A&&(a.r=A);d.rSetter=function(a,b,p){m(p,{rx:a,ry:a})};return d.attr(a)},setSize:function(a,b,p){var e=this.alignedObjects,A=e.length;this.width=a;this.height=b;for(this.boxWrapper.animate({width:a,height:b},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:r(p,!0)?
void 0:0});A--;)e[A].align()},g:function(a){var b=this.createElement("g");return a?b.attr({"class":"highcharts-"+a}):b},image:function(a,b,p,e,A){var c={preserveAspectRatio:"none"};1<arguments.length&&B(c,{x:b,y:p,width:e,height:A});c=this.createElement("image").attr(c);c.element.setAttributeNS?c.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):c.element.setAttribute("hc-svg-href",a);return c},symbol:function(a,b,p,e,A,c){var d=this,E,t=this.symbols[a],l=k(b)&&t&&t(Math.round(b),Math.round(p),
e,A,c),C=/^url\((.*?)\)$/,y,u;t?(E=this.path(l),E.attr("fill","none"),B(E,{symbolName:a,x:b,y:p,width:e,height:A}),c&&B(E,c)):C.test(a)&&(y=a.match(C)[1],E=this.image(y),E.imgwidth=r(P[y]&&P[y].width,c&&c.width),E.imgheight=r(P[y]&&P[y].height,c&&c.height),u=function(){E.attr({width:E.width,height:E.height})},w(["width","height"],function(a){E[a+"Setter"]=function(a,b){var p={},e=this["img"+b],c="width"===b?"translateX":"translateY";this[b]=a;k(e)&&(this.element&&this.element.setAttribute(b,e),this.alignByTranslate||
(p[c]=((this[b]||0)-e)/2,this.attr(p)))}}),k(b)&&E.attr({x:b,y:p}),E.isImg=!0,k(E.imgwidth)&&k(E.imgheight)?u():(E.attr({width:0,height:0}),n("img",{onload:function(){var a=f[d.chartIndex];0===this.width&&(q(this,{position:"absolute",top:"-999em"}),g.body.appendChild(this));P[y]={width:this.width,height:this.height};E.imgwidth=this.width;E.imgheight=this.height;E.element&&u();this.parentNode&&this.parentNode.removeChild(this);d.imgCount--;if(!d.imgCount&&a&&a.onload)a.onload()},src:y}),this.imgCount++));
return E},symbols:{circle:function(a,b,p,e){var c=.166*p;return["M",a+p/2,b,"C",a+p+c,b,a+p+c,b+e,a+p/2,b+e,"C",a-c,b+e,a-c,b,a+p/2,b,"Z"]},square:function(a,b,p,e){return["M",a,b,"L",a+p,b,a+p,b+e,a,b+e,"Z"]},triangle:function(a,b,p,e){return["M",a+p/2,b,"L",a+p,b+e,a,b+e,"Z"]},"triangle-down":function(a,b,p,e){return["M",a,b,"L",a+p,b,a+p/2,b+e,"Z"]},diamond:function(a,b,p,e){return["M",a+p/2,b,"L",a+p,b+e/2,a+p/2,b+e,a,b+e/2,"Z"]},arc:function(a,b,p,e,c){var A=c.start;p=c.r||p||e;var d=c.end-.001;
e=c.innerR;var t=c.open,E=Math.cos(A),l=Math.sin(A),y=Math.cos(d),d=Math.sin(d);c=c.end-A<Math.PI?0:1;return["M",a+p*E,b+p*l,"A",p,p,0,c,1,a+p*y,b+p*d,t?"M":"L",a+e*y,b+e*d,"A",e,e,0,c,0,a+e*E,b+e*l,t?"":"Z"]},callout:function(a,b,p,e,c){var A=Math.min(c&&c.r||0,p,e),d=A+6,t=c&&c.anchorX;c=c&&c.anchorY;var l;l=["M",a+A,b,"L",a+p-A,b,"C",a+p,b,a+p,b,a+p,b+A,"L",a+p,b+e-A,"C",a+p,b+e,a+p,b+e,a+p-A,b+e,"L",a+A,b+e,"C",a,b+e,a,b+e,a,b+e-A,"L",a,b+A,"C",a,b,a,b,a+A,b];t&&t>p&&c>b+d&&c<b+e-d?l.splice(13,
3,"L",a+p,c-6,a+p+6,c,a+p,c+6,a+p,b+e-A):t&&0>t&&c>b+d&&c<b+e-d?l.splice(33,3,"L",a,c+6,a-6,c,a,c-6,a,b+A):c&&c>e&&t>a+d&&t<a+p-d?l.splice(23,3,"L",t+6,b+e,t,b+e+6,t-6,b+e,a+A,b+e):c&&0>c&&t>a+d&&t<a+p-d&&l.splice(3,3,"L",t-6,b,t,b-6,t+6,b,p-A,b);return l}},clipRect:function(b,p,e,c){var A="highcharts-"+a.idCounter++,d=this.createElement("clipPath").attr({id:A}).add(this.defs);b=this.rect(b,p,e,c,0).add(d);b.id=A;b.clipPath=d;b.count=0;return b},text:function(a,b,e,c){var A=!p&&this.forExport,d={};
if(c&&(this.allowHTML||!this.forExport))return this.html(a,b,e);d.x=Math.round(b||0);e&&(d.y=Math.round(e));if(a||0===a)d.text=a;a=this.createElement("text").attr(d);A&&a.css({position:"absolute"});c||(a.xSetter=function(a,b,p){var e=p.getElementsByTagName("tspan"),c,A=p.getAttribute(b),d;for(d=0;d<e.length;d++)c=e[d],c.getAttribute(b)===A&&c.setAttribute(b,a);p.setAttribute(b,a)});return a},fontMetrics:function(a,b){a=a||this.style&&this.style.fontSize;a=/px/.test(a)?G(a):/em/.test(a)?12*parseFloat(a):
12;b=24>a?a+3:Math.round(1.2*a);return{h:b,b:Math.round(.8*b),f:a}},rotCorr:function(a,b,p){var e=a;b&&p&&(e=Math.max(e*Math.cos(b*v),4));return{x:-a/3*Math.sin(b*v),y:e}},label:function(a,b,p,e,c,A,d,t,l){var y=this,r=y.g("button"!==l&&"label"),g=r.text=y.text("",0,0,d).attr({zIndex:1}),E,u,n=0,K=3,G=0,C,f,h,O,v,I={},P,S,q=/^url\((.*?)\)$/.test(e),N=q,L,m,R,Q;l&&r.addClass("highcharts-"+l);N=q;L=function(){return(P||0)%2/2};m=function(){var a=g.element.style,b={};u=(void 0===C||void 0===f||v)&&k(g.textStr)&&
g.getBBox();r.width=(C||u.width||0)+2*K+G;r.height=(f||u.height||0)+2*K;S=K+y.fontMetrics(a&&a.fontSize,g).b;N&&(E||(r.box=E=y.symbols[e]||q?y.symbol(e):y.rect(),E.addClass(("button"===l?"":"highcharts-label-box")+(l?" highcharts-"+l+"-box":"")),E.add(r),a=L(),b.x=a,b.y=(t?-S:0)+a),b.width=Math.round(r.width),b.height=Math.round(r.height),E.attr(B(b,I)),I={})};R=function(){var a=G+K,b;b=t?0:S;k(C)&&u&&("center"===v||"right"===v)&&(a+={center:.5,right:1}[v]*(C-u.width));if(a!==g.x||b!==g.y)g.attr("x",
a),void 0!==b&&g.attr("y",b);g.x=a;g.y=b};Q=function(a,b){E?E.attr(a,b):I[a]=b};r.onAdd=function(){g.add(r);r.attr({text:a||0===a?a:"",x:b,y:p});E&&k(c)&&r.attr({anchorX:c,anchorY:A})};r.widthSetter=function(a){C=a};r.heightSetter=function(a){f=a};r["text-alignSetter"]=function(a){v=a};r.paddingSetter=function(a){k(a)&&a!==K&&(K=r.padding=a,R())};r.paddingLeftSetter=function(a){k(a)&&a!==G&&(G=a,R())};r.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==n&&(n=a,u&&r.attr({x:h}))};r.textSetter=
function(a){void 0!==a&&g.textSetter(a);m();R()};r["stroke-widthSetter"]=function(a,b){a&&(N=!0);P=this["stroke-width"]=a;Q(b,a)};r.strokeSetter=r.fillSetter=r.rSetter=function(a,b){"fill"===b&&a&&(N=!0);Q(b,a)};r.anchorXSetter=function(a,b){c=a;Q(b,Math.round(a)-L()-h)};r.anchorYSetter=function(a,b){A=a;Q(b,a-O)};r.xSetter=function(a){r.x=a;n&&(a-=n*((C||u.width)+2*K));h=Math.round(a);r.attr("translateX",h)};r.ySetter=function(a){O=r.y=Math.round(a);r.attr("translateY",O)};var T=r.css;return B(r,
{css:function(a){if(a){var b={};a=x(a);w(r.textProps,function(p){void 0!==a[p]&&(b[p]=a[p],delete a[p])});g.css(b)}return T.call(r,a)},getBBox:function(){return{width:u.width+2*K,height:u.height+2*K,x:u.x-K,y:u.y-K}},shadow:function(a){a&&(m(),E&&E.shadow(a));return r},destroy:function(){H(r.element,"mouseenter");H(r.element,"mouseleave");g&&(g=g.destroy());E&&(E=E.destroy());D.prototype.destroy.call(r);r=y=m=R=Q=null}})}};a.Renderer=z})(M);(function(a){var D=a.attr,z=a.createElement,F=a.css,J=a.defined,
m=a.each,f=a.extend,h=a.isFirefox,q=a.isMS,n=a.isWebKit,k=a.pInt,v=a.SVGRenderer,d=a.win,g=a.wrap;f(a.SVGElement.prototype,{htmlCss:function(a){var d=this.element;if(d=a&&"SPAN"===d.tagName&&a.width)delete a.width,this.textWidth=d,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=f(this.styles,a);F(this.element,a);return this},htmlGetBBox:function(){var a=this.element;"text"===a.nodeName&&(a.style.position="absolute");return{x:a.offsetLeft,
y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,d=this.element,c=this.translateX||0,e=this.translateY||0,l=this.x||0,g=this.y||0,f=this.textAlign||"left",b={left:0,center:.5,right:1}[f],t=this.styles;F(d,{marginLeft:c,marginTop:e});this.shadows&&m(this.shadows,function(a){F(a,{marginLeft:c+1,marginTop:e+1})});this.inverted&&m(d.childNodes,function(b){a.invertChild(b,d)});if("SPAN"===d.tagName){var y=this.rotation,K=k(this.textWidth),
x=t&&t.whiteSpace,h=[y,f,d.innerHTML,this.textWidth,this.textAlign].join();h!==this.cTT&&(t=a.fontMetrics(d.style.fontSize).b,J(y)&&this.setSpanRotation(y,b,t),F(d,{width:"",whiteSpace:x||"nowrap"}),d.offsetWidth>K&&/[ \-]/.test(d.textContent||d.innerText)&&F(d,{width:K+"px",display:"block",whiteSpace:x||"normal"}),this.getSpanCorrection(d.offsetWidth,t,b,y,f));F(d,{left:l+(this.xCorr||0)+"px",top:g+(this.yCorr||0)+"px"});n&&(t=d.offsetHeight);this.cTT=h}}else this.alignOnAdd=!0},setSpanRotation:function(a,
g,c){var e={},l=q?"-ms-transform":n?"-webkit-transform":h?"MozTransform":d.opera?"-o-transform":"";e[l]=e.transform="rotate("+a+"deg)";e[l+(h?"Origin":"-origin")]=e.transformOrigin=100*g+"% "+c+"px";F(this.element,e)},getSpanCorrection:function(a,d,c){this.xCorr=-a*c;this.yCorr=-d}});f(v.prototype,{html:function(a,d,c){var e=this.createElement("span"),l=e.element,u=e.renderer,k=u.isSVG,b=function(a,b){m(["opacity","visibility"],function(e){g(a,e+"Setter",function(a,e,c,d){a.call(this,e,c,d);b[c]=
e})})};e.textSetter=function(a){a!==l.innerHTML&&delete this.bBox;l.innerHTML=this.textStr=a;e.htmlUpdateTransform()};k&&b(e,e.element.style);e.xSetter=e.ySetter=e.alignSetter=e.rotationSetter=function(a,b){"align"===b&&(b="textAlign");e[b]=a;e.htmlUpdateTransform()};e.attr({text:a,x:Math.round(d),y:Math.round(c)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});l.style.whiteSpace="nowrap";e.css=e.htmlCss;k&&(e.add=function(a){var c,d=u.box.parentNode,t=[];
if(this.parentGroup=a){if(c=a.div,!c){for(;a;)t.push(a),a=a.parentGroup;m(t.reverse(),function(a){var e,t=D(a.element,"class");t&&(t={className:t});c=a.div=a.div||z("div",t,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},c||d);e=c.style;f(a,{translateXSetter:function(b,c){e.left=b+"px";a[c]=b;a.doTransform=!0},translateYSetter:function(b,c){e.top=b+"px";a[c]=b;a.doTransform=!0}});b(a,e)})}}else c=
d;c.appendChild(l);e.added=!0;e.alignOnAdd&&e.htmlUpdateTransform();return e});return e}})})(M);(function(a){var D,z,F=a.createElement,J=a.css,m=a.defined,f=a.deg2rad,h=a.discardElement,q=a.doc,n=a.each,k=a.erase,v=a.extend;D=a.extendClass;var d=a.isArray,g=a.isNumber,w=a.isObject,B=a.merge;z=a.noop;var c=a.pick,e=a.pInt,l=a.SVGElement,u=a.SVGRenderer,L=a.win;a.svg||(z={docMode8:q&&8===q.documentMode,init:function(a,e){var b=["\x3c",e,' filled\x3d"f" stroked\x3d"f"'],c=["position: ","absolute",";"],
d="div"===e;("shape"===e||d)&&c.push("left:0;top:0;width:1px;height:1px;");c.push("visibility: ",d?"hidden":"visible");b.push(' style\x3d"',c.join(""),'"/\x3e');e&&(b=d||"span"===e||"img"===e?b.join(""):a.prepVML(b),this.element=F(b));this.renderer=a},add:function(a){var b=this.renderer,e=this.element,c=b.box,d=a&&a.inverted,c=a?a.element||a:c;a&&(this.parentGroup=a);d&&b.invertChild(e,c);c.appendChild(e);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();
this.className&&this.attr("class",this.className);return this},updateTransform:l.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,e=Math.cos(a*f),c=Math.sin(a*f);J(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11\x3d",e,", M12\x3d",-c,", M21\x3d",c,", M22\x3d",e,", sizingMethod\x3d'auto expand')"].join(""):"none"})},getSpanCorrection:function(a,e,d,l,g){var b=l?Math.cos(l*f):1,t=l?Math.sin(l*f):0,y=c(this.elemHeight,this.element.offsetHeight),u;this.xCorr=
0>b&&-a;this.yCorr=0>t&&-y;u=0>b*t;this.xCorr+=t*e*(u?1-d:d);this.yCorr-=b*e*(l?u?d:1-d:1);g&&"left"!==g&&(this.xCorr-=a*d*(0>b?-1:1),l&&(this.yCorr-=y*d*(0>t?-1:1)),J(this.element,{textAlign:g}))},pathToVML:function(a){for(var b=a.length,e=[];b--;)g(a[b])?e[b]=Math.round(10*a[b])-5:"Z"===a[b]?e[b]="x":(e[b]=a[b],!a.isArc||"wa"!==a[b]&&"at"!==a[b]||(e[b+5]===e[b+7]&&(e[b+7]+=a[b+7]>a[b+5]?1:-1),e[b+6]===e[b+8]&&(e[b+8]+=a[b+8]>a[b+6]?1:-1)));return e.join(" ")||"x"},clip:function(a){var b=this,e;
a?(e=a.members,k(e,b),e.push(b),b.destroyClip=function(){k(e,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:b.docMode8?"inherit":"rect(auto)"});return b.css(a)},css:l.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&h(a)},destroy:function(){this.destroyClip&&this.destroyClip();return l.prototype.destroy.apply(this)},on:function(a,e){this.element["on"+a]=function(){var a=L.event;a.target=a.srcElement;e(a)};return this},cutOffPath:function(a,c){var b;a=a.split(/[ ,]/);b=a.length;
if(9===b||11===b)a[b-4]=a[b-2]=e(a[b-2])-10*c;return a.join(" ")},shadow:function(a,d,l){var b=[],g,t=this.element,r=this.renderer,u,y=t.style,k,p=t.path,A,n,f,C;p&&"string"!==typeof p.value&&(p="x");n=p;if(a){f=c(a.width,3);C=(a.opacity||.15)/f;for(g=1;3>=g;g++)A=2*f+1-2*g,l&&(n=this.cutOffPath(p.value,A+.5)),k=['\x3cshape isShadow\x3d"true" strokeweight\x3d"',A,'" filled\x3d"false" path\x3d"',n,'" coordsize\x3d"10 10" style\x3d"',t.style.cssText,'" /\x3e'],u=F(r.prepVML(k),null,{left:e(y.left)+
c(a.offsetX,1),top:e(y.top)+c(a.offsetY,1)}),l&&(u.cutOff=A+1),k=['\x3cstroke color\x3d"',a.color||"#000000",'" opacity\x3d"',C*g,'"/\x3e'],F(r.prepVML(k),null,null,u),d?d.element.appendChild(u):t.parentNode.insertBefore(u,t),b.push(u);this.shadows=b}return this},updateShadows:z,setAttr:function(a,e){this.docMode8?this.element[a]=e:this.element.setAttribute(a,e)},classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,e,c){(c.getElementsByTagName("stroke")[0]||
F(this.renderer.prepVML(["\x3cstroke/\x3e"]),null,null,c))[e]=a||"solid";this[e]=a},dSetter:function(a,e,c){var b=this.shadows;a=a||[];this.d=a.join&&a.join(" ");c.path=a=this.pathToVML(a);if(b)for(c=b.length;c--;)b[c].path=b[c].cutOff?this.cutOffPath(a,b[c].cutOff):a;this.setAttr(e,a)},fillSetter:function(a,e,c){var b=c.nodeName;"SPAN"===b?c.style.color=a:"IMG"!==b&&(c.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,c,e,this)))},"fill-opacitySetter":function(a,e,c){F(this.renderer.prepVML(["\x3c",
e.split("-")[0],' opacity\x3d"',a,'"/\x3e']),null,null,c)},opacitySetter:z,rotationSetter:function(a,e,c){c=c.style;this[e]=c[e]=a;c.left=-Math.round(Math.sin(a*f)+1)+"px";c.top=Math.round(Math.cos(a*f))+"px"},strokeSetter:function(a,e,c){this.setAttr("strokecolor",this.renderer.color(a,c,e,this))},"stroke-widthSetter":function(a,e,c){c.stroked=!!a;this[e]=a;g(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,e){this.setAttr(e,a)},visibilitySetter:function(a,e,c){"inherit"===a&&
(a="visible");this.shadows&&n(this.shadows,function(b){b.style[e]=a});"DIV"===c.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(c.style[e]=a?"visible":"hidden"),e="top");c.style[e]=a},xSetter:function(a,e,c){this[e]=a;"x"===e?e="left":"y"===e&&(e="top");this.updateClipping?(this[e]=a,this.updateClipping()):c.style[e]=a},zIndexSetter:function(a,e,c){c.style[e]=a}},z["stroke-opacitySetter"]=z["fill-opacitySetter"],a.VMLElement=z=D(l,z),z.prototype.ySetter=z.prototype.widthSetter=z.prototype.heightSetter=
z.prototype.xSetter,z={Element:z,isIE8:-1<L.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,e,c){var b,d;this.alignedObjects=[];b=this.createElement("div").css({position:"relative"});d=b.element;a.appendChild(b.element);this.isVML=!0;this.box=d;this.boxWrapper=b;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(e,c,!1);if(!q.namespaces.hcv){q.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{q.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(I){q.styleSheets[0].cssText+=
"hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,e,c,d){var b=this.createElement(),l=w(a);return v(b,{members:[],count:0,left:(l?a.x:a)+1,top:(l?a.y:e)+1,width:(l?a.width:c)-1,height:(l?a.height:d)-1,getCSS:function(a){var b=a.element,e=b.nodeName,c=a.inverted,p=this.top-("shape"===e?b.offsetTop:0),d=this.left,b=d+this.width,l=p+this.height,p={clip:"rect("+Math.round(c?
d:p)+"px,"+Math.round(c?l:b)+"px,"+Math.round(c?b:l)+"px,"+Math.round(c?p:d)+"px)"};!c&&a.docMode8&&"DIV"===e&&v(p,{width:b+"px",height:l+"px"});return p},updateClipping:function(){n(b.members,function(a){a.element&&a.css(b.getCSS(a))})}})},color:function(b,e,c,d){var l=this,g,r=/^rgba/,u,t,k="none";b&&b.linearGradient?t="gradient":b&&b.radialGradient&&(t="pattern");if(t){var p,A,f=b.linearGradient||b.radialGradient,h,C,E,y,w,v="";b=b.stops;var K,B=[],q=function(){u=['\x3cfill colors\x3d"'+B.join(",")+
'" opacity\x3d"',E,'" o:opacity2\x3d"',C,'" type\x3d"',t,'" ',v,'focus\x3d"100%" method\x3d"any" /\x3e'];F(l.prepVML(u),null,null,e)};h=b[0];K=b[b.length-1];0<h[0]&&b.unshift([0,h[1]]);1>K[0]&&b.push([1,K[1]]);n(b,function(b,e){r.test(b[1])?(g=a.color(b[1]),p=g.get("rgb"),A=g.get("a")):(p=b[1],A=1);B.push(100*b[0]+"% "+p);e?(E=A,y=p):(C=A,w=p)});if("fill"===c)if("gradient"===t)c=f.x1||f[0]||0,b=f.y1||f[1]||0,h=f.x2||f[2]||0,f=f.y2||f[3]||0,v='angle\x3d"'+(90-180*Math.atan((f-b)/(h-c))/Math.PI)+'"',
q();else{var k=f.r,L=2*k,m=2*k,z=f.cx,D=f.cy,J=e.radialReference,U,k=function(){J&&(U=d.getBBox(),z+=(J[0]-U.x)/U.width-.5,D+=(J[1]-U.y)/U.height-.5,L*=J[2]/U.width,m*=J[2]/U.height);v='src\x3d"'+a.getOptions().global.VMLRadialGradientURL+'" size\x3d"'+L+","+m+'" origin\x3d"0.5,0.5" position\x3d"'+z+","+D+'" color2\x3d"'+w+'" ';q()};d.added?k():d.onAdd=k;k=y}else k=p}else r.test(b)&&"IMG"!==e.tagName?(g=a.color(b),d[c+"-opacitySetter"](g.get("a"),c,e),k=g.get("rgb")):(k=e.getElementsByTagName(c),
k.length&&(k[0].opacity=1,k[0].type="solid"),k=b);return k},prepVML:function(a){var b=this.isIE8;a=a.join("");b?(a=a.replace("/\x3e",' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'),a=-1===a.indexOf('style\x3d"')?a.replace("/\x3e",' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e'):a.replace('style\x3d"','style\x3d"display:inline-block;behavior:url(#default#VML);')):a=a.replace("\x3c","\x3chcv:");return a},text:u.prototype.html,path:function(a){var b={coordsize:"10 10"};d(a)?b.d=
a:w(a)&&v(b,a);return this.createElement("shape").attr(b)},circle:function(a,e,c){var b=this.symbol("circle");w(a)&&(c=a.r,e=a.y,a=a.x);b.isCircle=!0;b.r=c;return b.attr({x:a,y:e})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(b)},image:function(a,e,c,d,l){var b=this.createElement("img").attr({src:a});1<arguments.length&&b.attr({x:e,y:c,width:d,height:l});return b},createElement:function(a){return"rect"===a?this.symbol(a):u.prototype.createElement.call(this,
a)},invertChild:function(a,c){var b=this;c=c.style;var d="IMG"===a.tagName&&a.style;J(a,{flip:"x",left:e(c.width)-(d?e(d.top):1),top:e(c.height)-(d?e(d.left):1),rotation:-90});n(a.childNodes,function(e){b.invertChild(e,a)})},symbols:{arc:function(a,e,c,d,l){var b=l.start,g=l.end,u=l.r||c||d;c=l.innerR;d=Math.cos(b);var k=Math.sin(b),t=Math.cos(g),p=Math.sin(g);if(0===g-b)return["x"];b=["wa",a-u,e-u,a+u,e+u,a+u*d,e+u*k,a+u*t,e+u*p];l.open&&!c&&b.push("e","M",a,e);b.push("at",a-c,e-c,a+c,e+c,a+c*t,
e+c*p,a+c*d,e+c*k,"x","e");b.isArc=!0;return b},circle:function(a,e,c,d,l){l&&m(l.r)&&(c=d=2*l.r);l&&l.isCircle&&(a-=c/2,e-=d/2);return["wa",a,e,a+c,e+d,a+c,e+d/2,a+c,e+d/2,"e"]},rect:function(a,e,c,d,l){return u.prototype.symbols[m(l)&&l.r?"callout":"square"].call(0,a,e,c,d,l)}}},a.VMLRenderer=D=function(){this.init.apply(this,arguments)},D.prototype=B(u.prototype,z),a.Renderer=D);u.prototype.measureSpanWidth=function(a,e){var b=q.createElement("span");a=q.createTextNode(a);b.appendChild(a);J(b,
e);this.box.appendChild(b);e=b.offsetWidth;h(b);return e}})(M);(function(a){function D(){var q=a.defaultOptions.global,n,k=q.useUTC,v=k?"getUTC":"get",d=k?"setUTC":"set";a.Date=n=q.Date||h.Date;n.hcTimezoneOffset=k&&q.timezoneOffset;n.hcGetTimezoneOffset=k&&q.getTimezoneOffset;n.hcMakeTime=function(a,d,h,c,e,l){var g;k?(g=n.UTC.apply(0,arguments),g+=J(g)):g=(new n(a,d,f(h,1),f(c,0),f(e,0),f(l,0))).getTime();return g};F("Minutes Hours Day Date Month FullYear".split(" "),function(a){n["hcGet"+a]=v+
a});F("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),function(a){n["hcSet"+a]=d+a})}var z=a.color,F=a.each,J=a.getTZOffset,m=a.merge,f=a.pick,h=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,VMLRadialGradientURL:"http://code.highcharts.com/5.0.2/gfx/vml-radial-gradient.png"},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",
backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,style:{color:"#333333",fontSize:"18px"},widthAdjust:-44},subtitle:{text:"",align:"center",style:{color:"#666666"},widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",
fontSize:"12px",fontWeight:"bold"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",
second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:z("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,
style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(f){a.defaultOptions=m(!0,a.defaultOptions,f);D();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;D()})(M);(function(a){var D=
a.arrayMax,z=a.arrayMin,F=a.defined,J=a.destroyObjectProperties,m=a.each,f=a.erase,h=a.merge,q=a.pick;a.PlotLineOrBand=function(a,k){this.axis=a;k&&(this.options=k,this.id=k.id)};a.PlotLineOrBand.prototype={render:function(){var a=this,k=a.axis,f=k.horiz,d=a.options,g=d.label,w=a.label,B=d.to,c=d.from,e=d.value,l=F(c)&&F(B),u=F(e),L=a.svgElem,b=!L,t=[],y,K=d.color,x=q(d.zIndex,0),m=d.events,t={"class":"highcharts-plot-"+(l?"band ":"line ")+(d.className||"")},r={},G=k.chart.renderer,H=l?"bands":"lines",
N=k.log2lin;k.isLog&&(c=N(c),B=N(B),e=N(e));u?(t={stroke:K,"stroke-width":d.width},d.dashStyle&&(t.dashstyle=d.dashStyle)):l&&(K&&(t.fill=K),d.borderWidth&&(t.stroke=d.borderColor,t["stroke-width"]=d.borderWidth));r.zIndex=x;H+="-"+x;(K=k[H])||(k[H]=K=G.g("plot-"+H).attr(r).add());b&&(a.svgElem=L=G.path().attr(t).add(K));if(u)t=k.getPlotLinePath(e,L.strokeWidth());else if(l)t=k.getPlotBandPath(c,B,d);else return;if(b&&t&&t.length){if(L.attr({d:t}),m)for(y in d=function(b){L.on(b,function(e){m[b].apply(a,
[e])})},m)d(y)}else L&&(t?(L.show(),L.animate({d:t})):(L.hide(),w&&(a.label=w=w.destroy())));g&&F(g.text)&&t&&t.length&&0<k.width&&0<k.height&&!t.flat?(g=h({align:f&&l&&"center",x:f?!l&&4:10,verticalAlign:!f&&l&&"middle",y:f?l?16:10:l?6:-4,rotation:f&&!l&&90},g),this.renderLabel(g,t,l,x)):w&&w.hide();return a},renderLabel:function(a,k,f,d){var g=this.label,h=this.axis.chart.renderer;g||(g={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(f?"band":"line")+"-label "+(a.className||
"")},g.zIndex=d,this.label=g=h.text(a.text,0,0,a.useHTML).attr(g).add(),g.css(a.style));d=[k[1],k[4],f?k[6]:k[1]];k=[k[2],k[5],f?k[7]:k[2]];f=z(d);h=z(k);g.align(a,!1,{x:f,y:h,width:D(d)-f,height:D(k)-h});g.show()},destroy:function(){f(this.axis.plotLinesAndBands,this);delete this.axis;J(this)}};a.AxisPlotLineOrBandExtension={getPlotBandPath:function(a,k){k=this.getPlotLinePath(k,null,null,!0);(a=this.getPlotLinePath(a,null,null,!0))&&k?(a.flat=a.toString()===k.toString(),a.push(k[4],k[5],k[1],k[2])):
a=null;return a},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(f,k){var h=(new a.PlotLineOrBand(this,f)).render(),d=this.userOptions;h&&(k&&(d[k]=d[k]||[],d[k].push(f)),this.plotLinesAndBands.push(h));return h},removePlotBandOrLine:function(a){for(var k=this.plotLinesAndBands,h=this.options,d=this.userOptions,g=k.length;g--;)k[g].id===a&&k[g].destroy();m([h.plotLines||[],d.plotLines||
[],h.plotBands||[],d.plotBands||[]],function(d){for(g=d.length;g--;)d[g].id===a&&f(d,d[g])})}}})(M);(function(a){var D=a.correctFloat,z=a.defined,F=a.destroyObjectProperties,J=a.isNumber,m=a.merge,f=a.pick,h=a.stop,q=a.deg2rad;a.Tick=function(a,k,f,d){this.axis=a;this.pos=k;this.type=f||"";this.isNew=!0;f||d||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,k=a.options,h=a.chart,d=a.categories,g=a.names,w=this.pos,B=k.labels,c=a.tickPositions,e=w===c[0],l=w===c[c.length-1],g=
d?f(d[w],g[w],w):w,d=this.label,c=c.info,u;a.isDatetimeAxis&&c&&(u=k.dateTimeLabelFormats[c.higherRanks[w]||c.unitName]);this.isFirst=e;this.isLast=l;k=a.labelFormatter.call({axis:a,chart:h,isFirst:e,isLast:l,dateTimeLabelFormat:u,value:a.isLog?D(a.lin2log(g)):g});z(d)?d&&d.attr({text:k}):(this.labelLength=(this.label=d=z(k)&&B.enabled?h.renderer.text(k,0,0,B.useHTML).css(m(B.style)).add(a.labelGroup):null)&&d.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?
"height":"width"]:0},handleOverflow:function(a){var k=this.axis,h=a.x,d=k.chart.chartWidth,g=k.chart.spacing,w=f(k.labelLeft,Math.min(k.pos,g[3])),g=f(k.labelRight,Math.max(k.pos+k.len,d-g[1])),n=this.label,c=this.rotation,e={left:0,center:.5,right:1}[k.labelAlign],l=n.getBBox().width,u=k.getSlotWidth(),m=u,b=1,t,y={};if(c)0>c&&h-e*l<w?t=Math.round(h/Math.cos(c*q)-w):0<c&&h+e*l>g&&(t=Math.round((d-h)/Math.cos(c*q)));else if(d=h+(1-e)*l,h-e*l<w?m=a.x+m*(1-e)-w:d>g&&(m=g-a.x+m*e,b=-1),m=Math.min(u,
m),m<u&&"center"===k.labelAlign&&(a.x+=b*(u-m-e*(u-Math.min(l,m)))),l>m||k.autoRotation&&(n.styles||{}).width)t=m;t&&(y.width=t,(k.options.labels.style||{}).textOverflow||(y.textOverflow="ellipsis"),n.css(y))},getPosition:function(a,k,f,d){var g=this.axis,h=g.chart,n=d&&h.oldChartHeight||h.chartHeight;return{x:a?g.translate(k+f,null,null,d)+g.transB:g.left+g.offset+(g.opposite?(d&&h.oldChartWidth||h.chartWidth)-g.right-g.left:0),y:a?n-g.bottom+g.offset-(g.opposite?g.height:0):n-g.translate(k+f,null,
null,d)-g.transB}},getLabelPosition:function(a,k,f,d,g,h,B,c){var e=this.axis,l=e.transA,u=e.reversed,w=e.staggerLines,b=e.tickRotCorr||{x:0,y:0},t=g.y;z(t)||(t=0===e.side?f.rotation?-8:-f.getBBox().height:2===e.side?b.y+8:Math.cos(f.rotation*q)*(b.y-f.getBBox(!1,0).height/2));a=a+g.x+b.x-(h&&d?h*l*(u?-1:1):0);k=k+t-(h&&!d?h*l*(u?1:-1):0);w&&(f=B/(c||1)%w,e.opposite&&(f=w-f-1),k+=e.labelOffset/w*f);return{x:a,y:Math.round(k)}},getMarkPath:function(a,f,h,d,g,w){return w.crispLine(["M",a,f,"L",a+(g?
0:-h),f+(g?h:0)],d)},render:function(a,k,v){var d=this.axis,g=d.options,w=d.chart.renderer,n=d.horiz,c=this.type,e=this.label,l=this.pos,u=g.labels,q=this.gridLine,b=c?c+"Tick":"tick",t=d.tickSize(b),y=this.mark,K=!y,x=u.step,m={},r=!0,G=d.tickmarkOffset,H=this.getPosition(n,l,G,k),N=H.x,H=H.y,p=n&&N===d.pos+d.len||!n&&H===d.pos?-1:1,A=c?c+"Grid":"grid",P=g[A+"LineWidth"],O=g[A+"LineColor"],C=g[A+"LineDashStyle"],A=f(g[b+"Width"],!c&&d.isXAxis?1:0),b=g[b+"Color"];v=f(v,1);this.isActive=!0;q||(m.stroke=
O,m["stroke-width"]=P,C&&(m.dashstyle=C),c||(m.zIndex=1),k&&(m.opacity=0),this.gridLine=q=w.path().attr(m).addClass("highcharts-"+(c?c+"-":"")+"grid-line").add(d.gridGroup));if(!k&&q&&(l=d.getPlotLinePath(l+G,q.strokeWidth()*p,k,!0)))q[this.isNew?"attr":"animate"]({d:l,opacity:v});t&&(d.opposite&&(t[0]=-t[0]),K&&(this.mark=y=w.path().addClass("highcharts-"+(c?c+"-":"")+"tick").add(d.axisGroup),y.attr({stroke:b,"stroke-width":A})),y[K?"attr":"animate"]({d:this.getMarkPath(N,H,t[0],y.strokeWidth()*
p,n,w),opacity:v}));e&&J(N)&&(e.xy=H=this.getLabelPosition(N,H,e,n,u,G,a,x),this.isFirst&&!this.isLast&&!f(g.showFirstLabel,1)||this.isLast&&!this.isFirst&&!f(g.showLastLabel,1)?r=!1:!n||d.isRadial||u.step||u.rotation||k||0===v||this.handleOverflow(H),x&&a%x&&(r=!1),r&&J(H.y)?(H.opacity=v,e[this.isNew?"attr":"animate"](H)):(h(e),e.attr("y",-9999)),this.isNew=!1)},destroy:function(){F(this,this.axis)}}})(M);(function(a){var D=a.addEvent,z=a.animObject,F=a.arrayMax,J=a.arrayMin,m=a.AxisPlotLineOrBandExtension,
f=a.color,h=a.correctFloat,q=a.defaultOptions,n=a.defined,k=a.deg2rad,v=a.destroyObjectProperties,d=a.each,g=a.error,w=a.extend,B=a.fireEvent,c=a.format,e=a.getMagnitude,l=a.grep,u=a.inArray,L=a.isArray,b=a.isNumber,t=a.isString,y=a.merge,K=a.normalizeTickInterval,x=a.pick,I=a.PlotLineOrBand,r=a.removeEvent,G=a.splat,H=a.syncTimeout,N=a.Tick;a.Axis=function(){this.init.apply(this,arguments)};a.Axis.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",
hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",
lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textShadow:"1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},
title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,b){var e=b.isX;this.chart=a;this.horiz=a.inverted?!e:e;this.isXAxis=e;this.coll=this.coll||(e?"xAxis":"yAxis");this.opposite=b.opposite;this.side=b.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(b);var c=this.options,p=c.type;
this.labelFormatter=c.labels.formatter||this.defaultLabelFormatter;this.userOptions=b;this.minPixelPadding=0;this.reversed=c.reversed;this.visible=!1!==c.visible;this.zoomEnabled=!1!==c.zoomEnabled;this.hasNames="category"===p||!0===c.categories;this.categories=c.categories||this.hasNames;this.names=this.names||[];this.isLog="logarithmic"===p;this.isDatetimeAxis="datetime"===p;this.isLinked=n(c.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands=
{};this.len=0;this.minRange=this.userMinRange=c.minRange||c.maxZoom;this.range=c.range;this.offset=c.offset||0;this.stacks={};this.oldStacks={};this.stacksTouched=0;this.min=this.max=null;this.crosshair=x(c.crosshair,G(a.options.tooltip.crosshairs)[e?0:1],!1);var d;b=this.options.events;-1===u(this,a.axes)&&(e?a.axes.splice(a.xAxis.length,0,this):a.axes.push(this),a[this.coll].push(this));this.series=this.series||[];a.inverted&&e&&void 0===this.reversed&&(this.reversed=!0);this.removePlotLine=this.removePlotBand=
this.removePlotBandOrLine;for(d in b)D(this,d,b[d]);this.isLog&&(this.val2lin=this.log2lin,this.lin2val=this.lin2log)},setOptions:function(a){this.options=y(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],y(q[this.coll],a))},defaultLabelFormatter:function(){var b=this.axis,e=this.value,d=b.categories,l=this.dateTimeLabelFormat,g=q.lang.numericSymbols,r=g&&
g.length,u,f=b.options.labels.format,b=b.isLog?e:b.tickInterval;if(f)u=c(f,this);else if(d)u=e;else if(l)u=a.dateFormat(l,e);else if(r&&1E3<=b)for(;r--&&void 0===u;)d=Math.pow(1E3,r+1),b>=d&&0===10*e%d&&null!==g[r]&&0!==e&&(u=a.numberFormat(e/d,-1)+g[r]);void 0===u&&(u=1E4<=Math.abs(e)?a.numberFormat(e,-1):a.numberFormat(e,-1,void 0,""));return u},getSeriesExtremes:function(){var a=this,e=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&
a.buildStacks();d(a.series,function(c){if(c.visible||!e.options.chart.ignoreHiddenSeries){var p=c.options,d=p.threshold,A;a.hasVisibleSeries=!0;a.isLog&&0>=d&&(d=null);if(a.isXAxis)p=c.xData,p.length&&(c=J(p),b(c)||c instanceof Date||(p=l(p,function(a){return b(a)}),c=J(p)),a.dataMin=Math.min(x(a.dataMin,p[0]),c),a.dataMax=Math.max(x(a.dataMax,p[0]),F(p)));else if(c.getExtremes(),A=c.dataMax,c=c.dataMin,n(c)&&n(A)&&(a.dataMin=Math.min(x(a.dataMin,c),c),a.dataMax=Math.max(x(a.dataMax,A),A)),n(d)&&
(a.threshold=d),!p.softThreshold||a.isLog)a.softThreshold=!1}})},translate:function(a,e,c,d,l,g){var p=this.linkedParent||this,A=1,r=0,u=d?p.oldTransA:p.transA;d=d?p.oldMin:p.min;var E=p.minPixelPadding;l=(p.isOrdinal||p.isBroken||p.isLog&&l)&&p.lin2val;u||(u=p.transA);c&&(A*=-1,r=p.len);p.reversed&&(A*=-1,r-=A*(p.sector||p.len));e?(a=(a*A+r-E)/u+d,l&&(a=p.lin2val(a))):(l&&(a=p.val2lin(a)),"between"===g&&(g=.5),a=A*(a-d)*u+r+A*E+(b(g)?u*g*p.pointRange:0));return a},toPixels:function(a,b){return this.translate(a,
!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,e,c,d,l){var p=this.chart,A=this.left,g=this.top,r,u,f=c&&p.oldChartHeight||p.chartHeight,k=c&&p.oldChartWidth||p.chartWidth,h;r=this.transB;var t=function(a,b,e){if(a<b||a>e)d?a=Math.min(Math.max(b,a),e):h=!0;return a};l=x(l,this.translate(a,null,null,c));a=c=Math.round(l+r);r=u=Math.round(f-l-r);b(l)?this.horiz?(r=g,u=f-this.bottom,a=c=t(a,A,A+
this.width)):(a=A,c=k-this.right,r=u=t(r,g,g+this.height)):h=!0;return h&&!d?null:p.renderer.crispLine(["M",a,r,"L",c,u],e||1)},getLinearTickPositions:function(a,e,c){var p,d=h(Math.floor(e/a)*a),A=h(Math.ceil(c/a)*a),l=[];if(e===c&&b(e))return[e];for(e=d;e<=A;){l.push(e);e=h(e+a);if(e===p)break;p=e}return l},getMinorTickPositions:function(){var a=this.options,b=this.tickPositions,e=this.minorTickInterval,c=[],d,l=this.pointRangePadding||0;d=this.min-l;var l=this.max+l,g=l-d;if(g&&g/e<this.len/3)if(this.isLog)for(l=
b.length,d=1;d<l;d++)c=c.concat(this.getLogTickPositions(e,b[d-1],b[d],!0));else if(this.isDatetimeAxis&&"auto"===a.minorTickInterval)c=c.concat(this.getTimeTicks(this.normalizeTimeTickInterval(e),d,l,a.startOfWeek));else for(b=d+(b[0]-d)%e;b<=l;b+=e)c.push(b);0!==c.length&&this.trimTicks(c,a.startOnTick,a.endOnTick);return c},adjustForMinRange:function(){var a=this.options,b=this.min,e=this.max,c,l=this.dataMax-this.dataMin>=this.minRange,g,r,u,f,k,h;this.isXAxis&&void 0===this.minRange&&!this.isLog&&
(n(a.min)||n(a.max)?this.minRange=null:(d(this.series,function(a){f=a.xData;for(r=k=a.xIncrement?1:f.length-1;0<r;r--)if(u=f[r]-f[r-1],void 0===g||u<g)g=u}),this.minRange=Math.min(5*g,this.dataMax-this.dataMin)));e-b<this.minRange&&(h=this.minRange,c=(h-e+b)/2,c=[b-c,x(a.min,b-c)],l&&(c[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=F(c),e=[b+h,x(a.max,b+h)],l&&(e[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),e=J(e),e-b<h&&(c[0]=e-h,c[1]=x(a.min,e-h),b=F(c)));this.min=b;this.max=
e},getClosest:function(){var a;this.categories?a=1:d(this.series,function(b){var e=b.closestPointRange;!b.noSharedTooltip&&n(e)&&(a=n(a)?Math.min(a,e):e)});return a},nameToX:function(a){var b=L(this.categories),e=b?this.categories:this.names,c=a.options.x,p;a.series.requireSorting=!1;n(c)||(c=!1===this.options.uniqueNames?a.series.autoIncrement():u(a.name,e));-1===c?b||(p=e.length):p=c;this.names[p]=a.name;return p},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=
void 0,d(this.series||[],function(b){if(!b.points||b.isDirtyData)b.processData(),b.generatePoints();d(b.points,function(e,c){var p;e.options&&void 0===e.options.x&&(p=a.nameToX(e),p!==e.x&&(e.x=p,b.xData[c]=p))})}))},setAxisTranslation:function(a){var b=this,e=b.max-b.min,c=b.axisPointRange||0,p,l=0,g=0,r=b.linkedParent,u=!!b.categories,f=b.transA,h=b.isXAxis;if(h||u||c)r?(l=r.minPointOffset,g=r.pointRangePadding):(p=b.getClosest(),d(b.series,function(a){var e=u?1:h?x(a.options.pointRange,p,0):b.axisPointRange||
0;a=a.options.pointPlacement;c=Math.max(c,e);b.single||(l=Math.max(l,t(a)?0:e/2),g=Math.max(g,"on"===a?0:e))})),r=b.ordinalSlope&&p?b.ordinalSlope/p:1,b.minPointOffset=l*=r,b.pointRangePadding=g*=r,b.pointRange=Math.min(c,e),h&&(b.closestPointRange=p);a&&(b.oldTransA=f);b.translationSlope=b.transA=f=b.len/(e+g||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=f*l},minFromRange:function(){return this.max-this.range},setTickInterval:function(a){var c=this,p=c.chart,l=c.options,r=c.isLog,u=c.log2lin,
f=c.isDatetimeAxis,k=c.isXAxis,t=c.isLinked,H=l.maxPadding,w=l.minPadding,y=l.tickInterval,G=l.tickPixelInterval,v=c.categories,q=c.threshold,m=c.softThreshold,I,L,N,z;f||v||t||this.getTickAmount();N=x(c.userMin,l.min);z=x(c.userMax,l.max);t?(c.linkedParent=p[c.coll][l.linkedTo],p=c.linkedParent.getExtremes(),c.min=x(p.min,p.dataMin),c.max=x(p.max,p.dataMax),l.type!==c.linkedParent.options.type&&g(11,1)):(!m&&n(q)&&(c.dataMin>=q?(I=q,w=0):c.dataMax<=q&&(L=q,H=0)),c.min=x(N,I,c.dataMin),c.max=x(z,
L,c.dataMax));r&&(!a&&0>=Math.min(c.min,x(c.dataMin,c.min))&&g(10,1),c.min=h(u(c.min),15),c.max=h(u(c.max),15));c.range&&n(c.max)&&(c.userMin=c.min=N=Math.max(c.min,c.minFromRange()),c.userMax=z=c.max,c.range=null);B(c,"foundExtremes");c.beforePadding&&c.beforePadding();c.adjustForMinRange();!(v||c.axisPointRange||c.usePercentage||t)&&n(c.min)&&n(c.max)&&(u=c.max-c.min)&&(!n(N)&&w&&(c.min-=u*w),!n(z)&&H&&(c.max+=u*H));b(l.floor)?c.min=Math.max(c.min,l.floor):b(l.softMin)&&(c.min=Math.min(c.min,l.softMin));
b(l.ceiling)?c.max=Math.min(c.max,l.ceiling):b(l.softMax)&&(c.max=Math.max(c.max,l.softMax));m&&n(c.dataMin)&&(q=q||0,!n(N)&&c.min<q&&c.dataMin>=q?c.min=q:!n(z)&&c.max>q&&c.dataMax<=q&&(c.max=q));c.tickInterval=c.min===c.max||void 0===c.min||void 0===c.max?1:t&&!y&&G===c.linkedParent.options.tickPixelInterval?y=c.linkedParent.tickInterval:x(y,this.tickAmount?(c.max-c.min)/Math.max(this.tickAmount-1,1):void 0,v?1:(c.max-c.min)*G/Math.max(c.len,G));k&&!a&&d(c.series,function(a){a.processData(c.min!==
c.oldMin||c.max!==c.oldMax)});c.setAxisTranslation(!0);c.beforeSetTickPositions&&c.beforeSetTickPositions();c.postProcessTickInterval&&(c.tickInterval=c.postProcessTickInterval(c.tickInterval));c.pointRange&&!y&&(c.tickInterval=Math.max(c.pointRange,c.tickInterval));a=x(l.minTickInterval,c.isDatetimeAxis&&c.closestPointRange);!y&&c.tickInterval<a&&(c.tickInterval=a);f||r||y||(c.tickInterval=K(c.tickInterval,null,e(c.tickInterval),x(l.allowDecimals,!(.5<c.tickInterval&&5>c.tickInterval&&1E3<c.max&&
9999>c.max)),!!this.tickAmount));this.tickAmount||(c.tickInterval=c.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,b,c=a.tickPositions,e=a.tickPositioner,d=a.startOnTick,l=a.endOnTick,g;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.tickPositions=b=c&&c.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,
a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,e&&(e=e.apply(this,[this.min,this.max])))&&(this.tickPositions=b=e);this.isLinked||(this.trimTicks(b,d,l),this.min===this.max&&n(this.min)&&!this.tickAmount&&(g=!0,this.min-=.5,this.max+=.5),this.single=g,c||e||this.adjustTickAmount())},
trimTicks:function(a,b,c){var e=a[0],d=a[a.length-1],p=this.minPointOffset||0;if(b)this.min=e;else for(;this.min-p>a[0];)a.shift();if(c)this.max=d;else for(;this.max+p<a[a.length-1];)a.pop();0===a.length&&n(e)&&a.push((d+e)/2)},alignToOthers:function(){var a={},b,c=this.options;!1!==this.chart.options.chart.alignTicks&&!1!==c.alignTicks&&d(this.chart[this.coll],function(c){var e=c.options,e=[c.horiz?e.left:e.top,e.width,e.height,e.pane].join();c.series.length&&(a[e]?b=!0:a[e]=1)});return b},getTickAmount:function(){var a=
this.options,b=a.tickAmount,c=a.tickPixelInterval;!n(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/c)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,c=this.tickAmount,e=this.finalTickAmt,d=b&&b.length;if(d<c){for(;b.length<c;)b.push(h(b[b.length-1]+a));this.transA*=(d-1)/(c-1);this.max=b[b.length-1]}else d>c&&(this.tickInterval*=
2,this.setTickPositions());if(n(e)){for(a=c=b.length;a--;)(3===e&&1===a%2||2>=e&&0<a&&a<c-1)&&b.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;d(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&
this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,c,e,l){var p=this,g=p.chart;c=x(c,!0);d(p.series,function(a){delete a.kdTree});l=w(l,{min:a,max:b});B(p,"setExtremes",l,function(){p.userMin=a;p.userMax=b;p.eventArgs=l;c&&g.redraw(e)})},zoom:function(a,b){var c=this.dataMin,
e=this.dataMax,d=this.options,p=Math.min(c,x(d.min,c)),d=Math.max(e,x(d.max,e));if(a!==this.min||b!==this.max)this.allowZoomOutside||(n(c)&&a<=p&&(a=p),n(e)&&b>=d&&(b=d)),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsetLeft||0,e=this.horiz,d=x(b.width,a.plotWidth-c+(b.offsetRight||0)),l=x(b.height,a.plotHeight),g=x(b.top,a.plotTop),b=x(b.left,a.plotLeft+c),c=/%$/;c.test(l)&&(l=Math.round(parseFloat(l)/
100*a.plotHeight));c.test(g)&&(g=Math.round(parseFloat(g)/100*a.plotHeight+a.plotTop));this.left=b;this.top=g;this.width=d;this.height=l;this.bottom=a.chartHeight-l-g;this.right=a.chartWidth-d-b;this.len=Math.max(e?d:l,0);this.pos=e?b:g},getExtremes:function(){var a=this.isLog,b=this.lin2log;return{min:a?h(b(this.min)):this.min,max:a?h(b(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,c=this.lin2log,
e=b?c(this.min):this.min,b=b?c(this.max):this.max;null===a?a=e:e>a?a=e:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(x(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,c=b[a+"Length"],e=x(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(e&&c)return"inside"===b[a+"Position"]&&(c=-c),[c,e]},labelMetrics:function(){return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,
this.ticks[0]&&this.ticks[0].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,c=this.tickInterval,e=c,l=this.len/(((this.categories?1:0)+this.max-this.min)/c),g,r=a.rotation,u=this.labelMetrics(),f,h=Number.MAX_VALUE,t,H=function(a){a/=l||1;a=1<a?Math.ceil(a):1;return a*c};b?(t=!a.staggerLines&&!a.step&&(n(r)?[r]:l<x(a.autoRotationLimit,80)&&a.autoRotation))&&d(t,function(a){var b;if(a===r||a&&-90<=a&&90>=a)f=H(Math.abs(u.h/Math.sin(k*a))),b=f+Math.abs(a/360),b<h&&(h=b,g=a,e=f)}):
a.step||(e=H(u.h));this.autoRotation=t;this.labelRotation=x(g,r);return e},getSlotWidth:function(){var a=this.chart,b=this.horiz,c=this.options.labels,e=Math.max(this.tickPositions.length-(this.categories?0:1),1),d=a.margin[3];return b&&2>(c.step||0)&&!c.rotation&&(this.staggerLines||1)*a.plotWidth/e||!b&&(d&&d-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,c=this.tickPositions,e=this.ticks,l=this.options.labels,g=this.horiz,r=this.getSlotWidth(),u=Math.max(1,
Math.round(r-2*(l.padding||5))),f={},h=this.labelMetrics(),k=l.style&&l.style.textOverflow,H,w=0,x,G;t(l.rotation)||(f.rotation=l.rotation||0);d(c,function(a){(a=e[a])&&a.labelLength>w&&(w=a.labelLength)});this.maxLabelLength=w;if(this.autoRotation)w>u&&w>h.h?f.rotation=this.labelRotation:this.labelRotation=0;else if(r&&(H={width:u+"px"},!k))for(H.textOverflow="clip",x=c.length;!g&&x--;)if(G=c[x],u=e[G].label)u.styles&&"ellipsis"===u.styles.textOverflow?u.css({textOverflow:"clip"}):e[G].labelLength>
r&&u.css({width:r+"px"}),u.getBBox().height>this.len/c.length-(h.h-h.f)&&(u.specCss={textOverflow:"ellipsis"});f.rotation&&(H={width:(w>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},k||(H.textOverflow="ellipsis"));if(this.labelAlign=l.align||this.autoLabelAlign(this.labelRotation))f.align=this.labelAlign;d(c,function(a){var b=(a=e[a])&&a.label;b&&(b.attr(f),H&&b.css(y(H,b.specCss)),delete b.specCss,a.rotation=f.rotation)});this.tickRotCorr=b.rotCorr(h.b,this.labelRotation||0,0!==this.side)},
hasData:function(){return this.hasVisibleSeries||n(this.min)&&n(this.max)&&!!this.tickPositions},getOffset:function(){var a=this,b=a.chart,c=b.renderer,e=a.options,l=a.tickPositions,g=a.ticks,r=a.horiz,u=a.side,f=b.inverted?[1,0,3,2][u]:u,h,k,t=0,H,w=0,y=e.title,G=e.labels,K=0,v=a.opposite,q=b.axisOffset,b=b.clipOffset,m=[-1,1,1,-1][u],B,I=e.className,L=a.axisParent,z=this.tickSize("tick");h=a.hasData();a.showAxis=k=h||x(e.showEmpty,!0);a.staggerLines=a.horiz&&G.staggerLines;a.axisGroup||(a.gridGroup=
c.g("grid").attr({zIndex:e.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(I||"")).add(L),a.axisGroup=c.g("axis").attr({zIndex:e.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(I||"")).add(L),a.labelGroup=c.g("axis-labels").attr({zIndex:G.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(I||"")).add(L));if(h||a.isLinked)d(l,function(b){g[b]?g[b].addLabel():g[b]=new N(a,b)}),a.renderUnsquish(),!1===G.reserveSpace||0!==u&&2!==u&&{1:"left",3:"right"}[u]!==
a.labelAlign&&"center"!==a.labelAlign||d(l,function(a){K=Math.max(g[a].getLabelSize(),K)}),a.staggerLines&&(K*=a.staggerLines,a.labelOffset=K*(a.opposite?-1:1));else for(B in g)g[B].destroy(),delete g[B];y&&y.text&&!1!==y.enabled&&(a.axisTitle||((B=y.textAlign)||(B=(r?{low:"left",middle:"center",high:"right"}:{low:v?"right":"left",middle:"center",high:v?"left":"right"})[y.align]),a.axisTitle=c.text(y.text,0,0,y.useHTML).attr({zIndex:7,rotation:y.rotation||0,align:B}).addClass("highcharts-axis-title").css(y.style).add(a.axisGroup),
a.axisTitle.isNew=!0),k&&(t=a.axisTitle.getBBox()[r?"height":"width"],H=y.offset,w=n(H)?0:x(y.margin,r?5:10)),a.axisTitle[k?"show":"hide"](!0));a.renderLine();a.offset=m*x(e.offset,q[u]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};c=0===u?-a.labelMetrics().h:2===u?a.tickRotCorr.y:0;w=Math.abs(K)+w;K&&(w=w-c+m*(r?x(G.y,a.tickRotCorr.y+8*m):G.x));a.axisTitleMargin=x(H,w);q[u]=Math.max(q[u],a.axisTitleMargin+t+m*a.offset,w,h&&l.length&&z?z[0]:0);e=e.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[f]=
Math.max(b[f],e)},getLinePath:function(a){var b=this.chart,c=this.opposite,e=this.offset,d=this.horiz,l=this.left+(c?this.width:0)+e,e=b.chartHeight-this.bottom-(c?this.height:0)+e;c&&(a*=-1);return b.renderer.crispLine(["M",d?this.left:l,d?e:this.top,"L",d?b.chartWidth-this.right:l,d?e:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,
"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,e=this.len,d=this.options.title,l=a?b:c,g=this.opposite,r=this.offset,u=d.x||0,f=d.y||0,h=this.chart.renderer.fontMetrics(d.style&&d.style.fontSize,this.axisTitle).f,e={low:l+(a?0:e),middle:l+e/2,high:l+(a?e:0)}[d.align],b=(a?c+this.height:b)+(a?1:-1)*(g?-1:1)*this.axisTitleMargin+(2===this.side?h:0);return{x:a?e+u:b+(g?this.width:0)+r+u,y:a?b+f-(g?this.height:0)+r:e+f}},render:function(){var a=
this,c=a.chart,e=c.renderer,l=a.options,g=a.isLog,r=a.lin2log,u=a.isLinked,f=a.tickPositions,h=a.axisTitle,k=a.ticks,t=a.minorTicks,w=a.alternateBands,y=l.stackLabels,x=l.alternateGridColor,G=a.tickmarkOffset,n=a.axisLine,K=c.hasRendered&&b(a.oldMin),v=a.showAxis,q=z(e.globalAnimation),m,B;a.labelEdge.length=0;a.overlap=!1;d([k,t,w],function(a){for(var b in a)a[b].isActive=!1});if(a.hasData()||u)a.minorTickInterval&&!a.categories&&d(a.getMinorTickPositions(),function(b){t[b]||(t[b]=new N(a,b,"minor"));
K&&t[b].isNew&&t[b].render(null,!0);t[b].render(null,!1,1)}),f.length&&(d(f,function(b,c){if(!u||b>=a.min&&b<=a.max)k[b]||(k[b]=new N(a,b)),K&&k[b].isNew&&k[b].render(c,!0,.1),k[b].render(c)}),G&&(0===a.min||a.single)&&(k[-1]||(k[-1]=new N(a,-1,null,!0)),k[-1].render(-1))),x&&d(f,function(b,e){B=void 0!==f[e+1]?f[e+1]+G:a.max-G;0===e%2&&b<a.max&&B<=a.max+(c.polar?-G:G)&&(w[b]||(w[b]=new I(a)),m=b+G,w[b].options={from:g?r(m):m,to:g?r(B):B,color:x},w[b].render(),w[b].isActive=!0)}),a._addedPlotLB||
(d((l.plotLines||[]).concat(l.plotBands||[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0);d([k,t,w],function(a){var b,e,d=[],l=q.duration;for(b in a)a[b].isActive||(a[b].render(b,!1,0),a[b].isActive=!1,d.push(b));H(function(){for(e=d.length;e--;)a[d[e]]&&!a[d[e]].isActive&&(a[d[e]].destroy(),delete a[d[e]])},a!==w&&c.hasRendered&&l?l:0)});n&&(n[n.isPlaced?"animate":"attr"]({d:this.getLinePath(n.strokeWidth())}),n.isPlaced=!0,n[v?"show":"hide"](!0));h&&v&&(h[h.isNew?"attr":"animate"](a.getTitlePosition()),
h.isNew=!1);y&&y.enabled&&a.renderStackTotals();a.isDirty=!1},redraw:function(){this.visible&&(this.render(),d(this.plotLinesAndBands,function(a){a.render()}));d(this.series,function(a){a.isDirty=!0})},destroy:function(a){var b=this,c=b.stacks,e,l=b.plotLinesAndBands,g;a||r(b);for(e in c)v(c[e]),c[e]=null;d([b.ticks,b.minorTicks,b.alternateBands],function(a){v(a)});if(l)for(a=l.length;a--;)l[a].destroy();d("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){b[a]&&
(b[a]=b[a].destroy())});l="extKey hcEvents names series userMax userMin".split(" ");for(g in b)b.hasOwnProperty(g)&&-1===u(g,l)&&delete b[g]},drawCrosshair:function(a,b){var c,e=this.crosshair,d=x(e.snap,!0),l,g=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(n(b)||!d)?(d?n(b)&&(l=this.isXAxis?b.plotX:this.len-b.plotY):l=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),n(l)&&(c=this.getPlotLinePath(b&&(this.isXAxis?b.x:x(b.stackY,b.y)),null,null,null,l)||null),n(c)?(b=
this.categories&&!this.isRadial,g||(this.cross=g=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(b?"category ":"thin ")+e.className).attr({zIndex:x(e.zIndex,2)}).add(),g.attr({stroke:e.color||(b?f("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":x(e.width,1)}),e.dashStyle&&g.attr({dashstyle:e.dashStyle})),g.show().attr({d:c}),b&&!e.width&&g.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&
this.cross.hide()}};w(a.Axis.prototype,m)})(M);(function(a){var D=a.Axis,z=a.Date,F=a.dateFormat,J=a.defaultOptions,m=a.defined,f=a.each,h=a.extend,q=a.getMagnitude,n=a.getTZOffset,k=a.normalizeTickInterval,v=a.pick,d=a.timeUnits;D.prototype.getTimeTicks=function(a,k,q,c){var e=[],l={},g=J.global.useUTC,w,b=new z(k-n(k)),t,y=z.hcMakeTime,K=a.unitRange,x=a.count,B;if(m(k)){b[z.hcSetMilliseconds](K>=d.second?0:x*Math.floor(b.getMilliseconds()/x));if(K>=d.second)b[z.hcSetSeconds](K>=d.minute?0:x*Math.floor(b.getSeconds()/
x));if(K>=d.minute)b[z.hcSetMinutes](K>=d.hour?0:x*Math.floor(b[z.hcGetMinutes]()/x));K>=d.hour&&(b[z.hcSetHours](K>=d.day?0:x*Math.floor(b[z.hcGetHours]()/x)),t=b[z.hcGetHours]());if(K>=d.day)b[z.hcSetDate](K>=d.month?1:x*Math.floor(b[z.hcGetDate]()/x));K>=d.month&&(b[z.hcSetMonth](K>=d.year?0:x*Math.floor(b[z.hcGetMonth]()/x)),w=b[z.hcGetFullYear]());if(K>=d.year)b[z.hcSetFullYear](w-w%x);if(K===d.week)b[z.hcSetDate](b[z.hcGetDate]()-b[z.hcGetDay]()+v(c,1));c=1;if(z.hcTimezoneOffset||z.hcGetTimezoneOffset)B=
(!g||!!z.hcGetTimezoneOffset)&&(q-k>4*d.month||n(k)!==n(q)),b=b.getTime(),b=new z(b+n(b));w=b[z.hcGetFullYear]();k=b.getTime();g=b[z.hcGetMonth]();for(b=b[z.hcGetDate]();k<q;)e.push(k),k=K===d.year?y(w+c*x,0):K===d.month?y(w,g+c*x):!B||K!==d.day&&K!==d.week?B&&K===d.hour?y(w,g,b,t+c*x):k+K*x:y(w,g,b+c*x*(K===d.day?1:7)),c++;e.push(k);K<=d.hour&&f(e,function(a){"000000000"===F("%H%M%S%L",a)&&(l[a]="day")})}e.info=h(a,{higherRanks:l,totalRange:K*x});return e};D.prototype.normalizeTimeTickInterval=function(a,
f){var g=f||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];f=g[g.length-1];var c=d[f[0]],e=f[1],l;for(l=0;l<g.length&&!(f=g[l],c=d[f[0]],e=f[1],g[l+1]&&a<=(c*e[e.length-1]+d[g[l+1][0]])/2);l++);c===d.year&&a<5*c&&(e=[1,2,5]);a=k(a/c,e,"year"===f[0]?Math.max(q(a/c),1):1);return{unitRange:c,count:a,unitName:f[0]}}})(M);(function(a){var D=a.Axis,z=a.getMagnitude,
F=a.map,J=a.normalizeTickInterval,m=a.pick;D.prototype.getLogTickPositions=function(a,h,q,n){var f=this.options,v=this.len,d=this.lin2log,g=this.log2lin,w=[];n||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),w=this.getLinearTickPositions(a,h,q);else if(.08<=a)for(var v=Math.floor(h),B,c,e,l,u,f=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];v<q+1&&!u;v++)for(c=f.length,B=0;B<c&&!u;B++)e=g(d(v)*f[B]),e>h&&(!n||l<=q)&&void 0!==l&&w.push(l),l>q&&(u=!0),l=e;else h=d(h),q=d(q),a=f[n?"minorTickInterval":
"tickInterval"],a=m("auto"===a?null:a,this._minorAutoInterval,f.tickPixelInterval/(n?5:1)*(q-h)/((n?v/this.tickPositions.length:v)||1)),a=J(a,null,z(a)),w=F(this.getLinearTickPositions(a,h,q),g),n||(this._minorAutoInterval=a/5);n||(this.tickInterval=a);return w};D.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};D.prototype.lin2log=function(a){return Math.pow(10,a)}})(M);(function(a){var D=a.dateFormat,z=a.each,F=a.extend,J=a.format,m=a.isNumber,f=a.map,h=a.merge,q=a.pick,n=a.splat,k=a.stop,
v=a.syncTimeout,d=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,d){this.chart=a;this.options=d;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=d.split&&!a.inverted;this.shared=d.shared||this.split},cleanSplit:function(a){z(this.chart.series,function(d){var g=d&&d.tt;g&&(!g.isActive||a?d.tt=g.destroy():g.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,d=this.options;this.label||(this.split?this.label=a.g("tooltip"):
(this.label=a.label("",0,0,d.shape||"callout",null,null,d.useHTML,null,"tooltip").attr({padding:d.padding,r:d.borderRadius}),this.label.attr({fill:d.backgroundColor,"stroke-width":d.borderWidth}).css(d.style).shadow(d.shadow)),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();this.init(this.chart,h(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());
clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,d,f,c){var e=this,l=e.now,g=!1!==e.options.animation&&!e.isHidden&&(1<Math.abs(a-l.x)||1<Math.abs(d-l.y)),h=e.followPointer||1<e.len;F(l,{x:g?(2*l.x+a)/3:a,y:g?(l.y+d)/2:d,anchorX:h?void 0:g?(2*l.anchorX+f)/3:f,anchorY:h?void 0:g?(l.anchorY+c)/2:c});e.getLabel().attr(l);g&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(a,d,f,c)},32))},hide:function(a){var d=this;clearTimeout(this.hideTimer);
a=q(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=v(function(){d.getLabel()[a?"fadeOut":"hide"]();d.isHidden=!0},a))},getAnchor:function(a,d){var g,c=this.chart,e=c.inverted,l=c.plotTop,u=c.plotLeft,h=0,b=0,k,y;a=n(a);g=a[0].tooltipPos;this.followPointer&&d&&(void 0===d.chartX&&(d=c.pointer.normalize(d)),g=[d.chartX-c.plotLeft,d.chartY-l]);g||(z(a,function(a){k=a.series.yAxis;y=a.series.xAxis;h+=a.plotX+(!e&&y?y.left-u:0);b+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&k?k.top-
l:0)}),h/=a.length,b/=a.length,g=[e?c.plotWidth-b:h,this.shared&&!e&&1<a.length&&d?d.chartY-l:e?c.plotHeight-h:b]);return f(g,Math.round)},getPosition:function(a,d,f){var c=this.chart,e=this.distance,l={},g=f.h||0,h,b=["y",c.chartHeight,d,f.plotY+c.plotTop,c.plotTop,c.plotTop+c.plotHeight],k=["x",c.chartWidth,a,f.plotX+c.plotLeft,c.plotLeft,c.plotLeft+c.plotWidth],y=!this.followPointer&&q(f.ttBelow,!c.inverted===!!f.negative),n=function(a,b,c,d,r,u){var p=c<d-e,f=d+e+c<b,h=d-e-c;d+=e;if(y&&f)l[a]=
d;else if(!y&&p)l[a]=h;else if(p)l[a]=Math.min(u-c,0>h-g?h:h-g);else if(f)l[a]=Math.max(r,d+g+c>b?d:d+g);else return!1},x=function(a,b,c,d){var g;d<e||d>b-e?g=!1:l[a]=d<c/2?1:d>b-c/2?b-c-2:d-c/2;return g},w=function(a){var c=b;b=k;k=c;h=a},r=function(){!1!==n.apply(0,b)?!1!==x.apply(0,k)||h||(w(!0),r()):h?l.x=l.y=0:(w(!0),r())};(c.inverted||1<this.len)&&w();r();return l},defaultFormatter:function(a){var d=this.points||n(this),g;g=[a.tooltipFooterHeaderFormatter(d[0])];g=g.concat(a.bodyFormatter(d));
g.push(a.tooltipFooterHeaderFormatter(d[0],!0));return g},refresh:function(a,d){var g=this.chart,c=this.getLabel(),e=this.options,l,u,f={},b,h=[];b=e.formatter||this.defaultFormatter;var f=g.hoverPoints,y=this.shared;clearTimeout(this.hideTimer);this.followPointer=n(a)[0].series.tooltipOptions.followPointer;u=this.getAnchor(a,d);d=u[0];l=u[1];!y||a.series&&a.series.noSharedTooltip?f=a.getLabelConfig():(g.hoverPoints=a,f&&z(f,function(a){a.setState()}),z(a,function(a){a.setState("hover");h.push(a.getLabelConfig())}),
f={x:a[0].category,y:a[0].y},f.points=h,this.len=h.length,a=a[0]);b=b.call(f,this);f=a.series;this.distance=q(f.tooltipOptions.distance,16);!1===b?this.hide():(this.isHidden&&(k(c),c.attr({opacity:1}).show()),this.split?this.renderSplit(b,g.hoverPoints):(c.attr({text:b.join?b.join(""):b}),c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+q(a.colorIndex,f.colorIndex)),c.attr({stroke:e.borderColor||a.color||f.color||"#666666"}),this.updatePosition({plotX:d,plotY:l,negative:a.negative,
ttBelow:a.ttBelow,h:u[2]||0})),this.isHidden=!1)},renderSplit:function(d,f){var g=this,c=[],e=this.chart,l=e.renderer,u=!0,h=this.options,b,k=this.getLabel();z(d.slice(0,d.length-1),function(a,d){d=f[d-1]||{isHeader:!0,plotX:f[0].plotX};var t=d.series||g,y=t.tt,r=d.series||{},G="highcharts-color-"+q(d.colorIndex,r.colorIndex,"none");y||(t.tt=y=l.label(null,null,null,d.isHeader&&"callout").addClass("highcharts-tooltip-box "+G).attr({padding:h.padding,r:h.borderRadius,fill:h.backgroundColor,stroke:d.color||
r.color||"#333333","stroke-width":h.borderWidth}).add(k),d.series&&(y.connector=l.path().addClass("highcharts-tooltip-connector "+G).attr({"stroke-width":r.options.lineWidth||2,stroke:d.color||r.color||"#666666"}).add(y)));y.isActive=!0;y.attr({text:a});a=y.getBBox();r=a.width+y.strokeWidth();d.isHeader?(b=a.height,r=Math.max(0,Math.min(d.plotX+e.plotLeft-r/2,e.chartWidth-r))):r=d.plotX+e.plotLeft-q(h.distance,16)-r;0>r&&(u=!1);a=(d.series&&d.series.yAxis&&d.series.yAxis.pos)+(d.plotY||0);a-=e.plotTop;
c.push({target:d.isHeader?e.plotHeight+b:a,rank:d.isHeader?1:0,size:t.tt.getBBox().height+1,point:d,x:r,tt:y})});this.cleanSplit();a.distribute(c,e.plotHeight+b);z(c,function(a){var b=a.point,c=a.tt,d;d={visibility:void 0===a.pos?"hidden":"inherit",x:u||b.isHeader?a.x:b.plotX+e.plotLeft+q(h.distance,16),y:a.pos+e.plotTop};b.isHeader&&(d.anchorX=b.plotX+e.plotLeft,d.anchorY=d.y-100);c.attr(d);b.isHeader||c.connector.attr({d:["M",b.plotX+e.plotLeft-d.x,b.plotY+b.series.yAxis.pos-d.y,"L",(u?-1:1)*q(h.distance,
16)+b.plotX+e.plotLeft-d.x,a.pos+e.plotTop+c.getBBox().height/2-d.y]})})},updatePosition:function(a){var d=this.chart,g=this.getLabel(),g=(this.options.positioner||this.getPosition).call(this,g.width,g.height,a);this.move(Math.round(g.x),Math.round(g.y||0),a.plotX+d.plotLeft,a.plotY+d.plotTop)},getXDateFormat:function(a,f,h){var c;f=f.dateTimeLabelFormats;var e=h&&h.closestPointRange,l,g={millisecond:15,second:12,minute:9,hour:6,day:3},k,b="millisecond";if(e){k=D("%m-%d %H:%M:%S.%L",a.x);for(l in d){if(e===
d.week&&+D("%w",a.x)===h.options.startOfWeek&&"00:00:00.000"===k.substr(6)){l="week";break}if(d[l]>e){l=b;break}if(g[l]&&k.substr(g[l])!=="01-01 00:00:00.000".substr(g[l]))break;"week"!==l&&(b=l)}l&&(c=f[l])}else c=f.day;return c||f.year},tooltipFooterHeaderFormatter:function(a,d){var g=d?"footer":"header";d=a.series;var c=d.tooltipOptions,e=c.xDateFormat,l=d.xAxis,u=l&&"datetime"===l.options.type&&m(a.key),g=c[g+"Format"];u&&!e&&(e=this.getXDateFormat(a,c,l));u&&e&&(g=g.replace("{point.key}","{point.key:"+
e+"}"));return J(g,{point:a,series:d})},bodyFormatter:function(a){return f(a,function(a){var d=a.series.tooltipOptions;return(d.pointFormatter||a.point.tooltipFormatter).call(a.point,d.pointFormat)})}}})(M);(function(a){var D=a.addEvent,z=a.attr,F=a.charts,J=a.color,m=a.css,f=a.defined,h=a.doc,q=a.each,n=a.extend,k=a.fireEvent,v=a.offset,d=a.pick,g=a.removeEvent,w=a.splat,B=a.Tooltip,c=a.win;a.Pointer=function(a,c){this.init(a,c)};a.Pointer.prototype={init:function(a,c){this.options=c;this.chart=
a;this.runChartClick=c.chart.events&&!!c.chart.events.click;this.pinchDown=[];this.lastValidTouch={};B&&c.tooltip.enabled&&(a.tooltip=new B(a,c.tooltip),this.followTouchMove=d(c.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(){var a=this.chart,c=a.options.chart.zoomType,d=/x/.test(c),c=/y/.test(c),a=a.inverted;this.zoomX=d;this.zoomY=c;this.zoomHor=d&&!a||c&&a;this.zoomVert=c&&!a||d&&a;this.hasZoom=d||c},normalize:function(a,d){var e,l;a=a||c.event;a.target||(a.target=a.srcElement);
l=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;d||(this.chartPosition=d=v(this.chart.container));void 0===l.pageX?(e=Math.max(a.x,a.clientX-d.left),d=a.y):(e=l.pageX-d.left,d=l.pageY-d.top);return n(a,{chartX:Math.round(e),chartY:Math.round(d)})},getCoordinates:function(a){var c={xAxis:[],yAxis:[]};q(this.chart.axes,function(e){c[e.isXAxis?"xAxis":"yAxis"].push({axis:e,value:e.toValue(a[e.horiz?"chartX":"chartY"])})});return c},runPointActions:function(c){var e=this.chart,g=
e.series,f=e.tooltip,b=f?f.shared:!1,k=!0,y=e.hoverPoint,n=e.hoverSeries,x,v,r,G=[],H;if(!b&&!n)for(x=0;x<g.length;x++)if(g[x].directTouch||!g[x].options.stickyTracking)g=[];n&&(b?n.noSharedTooltip:n.directTouch)&&y?G=[y]:(b||!n||n.options.stickyTracking||(g=[n]),q(g,function(a){v=a.noSharedTooltip&&b;r=!b&&a.directTouch;a.visible&&!v&&!r&&d(a.options.enableMouseTracking,!0)&&(H=a.searchPoint(c,!v&&1===a.kdDimensions))&&H.series&&G.push(H)}),G.sort(function(a,c){var e=a.distX-c.distX,d=a.dist-c.dist;
return 0!==e&&b?e:0!==d?d:a.series.group.zIndex>c.series.group.zIndex?-1:1}));if(b)for(x=G.length;x--;)(G[x].x!==G[0].x||G[x].series.noSharedTooltip)&&G.splice(x,1);if(G[0]&&(G[0]!==this.prevKDPoint||f&&f.isHidden)){if(b&&!G[0].series.noSharedTooltip){for(x=0;x<G.length;x++)G[x].onMouseOver(c,G[x]!==(n&&n.directTouch&&y||G[0]));G.length&&f&&f.refresh(G.sort(function(a,b){return a.series.index-b.series.index}),c)}else if(f&&f.refresh(G[0],c),!n||!n.directTouch)G[0].onMouseOver(c);this.prevKDPoint=
G[0];k=!1}k&&(g=n&&n.tooltipOptions.followPointer,f&&g&&!f.isHidden&&(g=f.getAnchor([{}],c),f.updatePosition({plotX:g[0],plotY:g[1]})));this._onDocumentMouseMove||(this._onDocumentMouseMove=function(b){if(F[a.hoverChartIndex])F[a.hoverChartIndex].pointer.onDocumentMouseMove(b)},D(h,"mousemove",this._onDocumentMouseMove));q(b?G:[d(y,G[0])],function(a){q(e.axes,function(b){(!a||a.series&&a.series[b.coll]===b)&&b.drawCrosshair(c,a)})})},reset:function(a,c){var e=this.chart,d=e.hoverSeries,b=e.hoverPoint,
l=e.hoverPoints,f=e.tooltip,k=f&&f.shared?l:b;a&&k&&q(w(k),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)f&&k&&(f.refresh(k),b&&(b.setState(b.state,!0),q(e.axes,function(a){a.crosshair&&a.drawCrosshair(null,b)})));else{if(b)b.onMouseOut();l&&q(l,function(a){a.setState()});if(d)d.onMouseOut();f&&f.hide(c);this._onDocumentMouseMove&&(g(h,"mousemove",this._onDocumentMouseMove),this._onDocumentMouseMove=null);q(e.axes,function(a){a.hideCrosshair()});this.hoverX=this.prevKDPoint=e.hoverPoints=
e.hoverPoint=null}},scaleGroups:function(a,c){var e=this.chart,d;q(e.series,function(b){d=a||b.getPlotBox();b.xAxis&&b.xAxis.zoomEnabled&&b.group&&(b.group.attr(d),b.markerGroup&&(b.markerGroup.attr(d),b.markerGroup.clip(c?e.clipRect:null)),b.dataLabelsGroup&&b.dataLabelsGroup.attr(d))});e.clipRect.attr(c||e.clipBox)},dragStart:function(a){var c=this.chart;c.mouseIsDown=a.type;c.cancelClick=!1;c.mouseDownX=this.mouseDownX=a.chartX;c.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var c=this.chart,
e=c.options.chart,d=a.chartX,b=a.chartY,g=this.zoomHor,f=this.zoomVert,h=c.plotLeft,k=c.plotTop,n=c.plotWidth,r=c.plotHeight,G,H=this.selectionMarker,v=this.mouseDownX,p=this.mouseDownY,q=e.panKey&&a[e.panKey+"Key"];H&&H.touch||(d<h?d=h:d>h+n&&(d=h+n),b<k?b=k:b>k+r&&(b=k+r),this.hasDragged=Math.sqrt(Math.pow(v-d,2)+Math.pow(p-b,2)),10<this.hasDragged&&(G=c.isInsidePlot(v-h,p-k),c.hasCartesianSeries&&(this.zoomX||this.zoomY)&&G&&!q&&!H&&(this.selectionMarker=H=c.renderer.rect(h,k,g?1:n,f?1:r,0).attr({fill:e.selectionMarkerFill||
J("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),H&&g&&(d-=v,H.attr({width:Math.abs(d),x:(0<d?0:d)+v})),H&&f&&(d=b-p,H.attr({height:Math.abs(d),y:(0<d?0:d)+p})),G&&!H&&e.panning&&c.pan(a,e.panning)))},drop:function(a){var c=this,e=this.chart,d=this.hasPinched;if(this.selectionMarker){var b={originalEvent:a,xAxis:[],yAxis:[]},g=this.selectionMarker,h=g.attr?g.attr("x"):g.x,v=g.attr?g.attr("y"):g.y,x=g.attr?g.attr("width"):g.width,w=g.attr?g.attr("height"):
g.height,r;if(this.hasDragged||d)q(e.axes,function(e){if(e.zoomEnabled&&f(e.min)&&(d||c[{xAxis:"zoomX",yAxis:"zoomY"}[e.coll]])){var l=e.horiz,g="touchend"===a.type?e.minPixelPadding:0,p=e.toValue((l?h:v)+g),l=e.toValue((l?h+x:v+w)-g);b[e.coll].push({axis:e,min:Math.min(p,l),max:Math.max(p,l)});r=!0}}),r&&k(e,"selection",b,function(a){e.zoom(n(a,d?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();d&&this.scaleGroups()}e&&(m(e.container,{cursor:e._cursor}),e.cancelClick=10<
this.hasDragged,e.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption();a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(c){F[a.hoverChartIndex]&&F[a.hoverChartIndex].pointer.drop(c)},onDocumentMouseMove:function(a){var c=this.chart,e=this.chartPosition;a=this.normalize(a,e);!e||this.inClass(a.target,"highcharts-tracker")||c.isInsidePlot(a.chartX-c.plotLeft,a.chartY-c.plotTop)||this.reset()},
onContainerMouseLeave:function(c){var e=F[a.hoverChartIndex];e&&(c.relatedTarget||c.toElement)&&(e.pointer.reset(),e.pointer.chartPosition=null)},onContainerMouseMove:function(c){var e=this.chart;f(a.hoverChartIndex)&&F[a.hoverChartIndex]&&F[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=e.index);c=this.normalize(c);c.returnValue=!1;"mousedown"===e.mouseIsDown&&this.drag(c);!this.inClass(c.target,"highcharts-tracker")&&!e.isInsidePlot(c.chartX-e.plotLeft,c.chartY-e.plotTop)||e.openMenu||this.runPointActions(c)},
inClass:function(a,c){for(var e;a;){if(e=z(a,"class")){if(-1!==e.indexOf(c))return!0;if(-1!==e.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var c=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;if(!(!c||!a||c.options.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+c.index)&&this.inClass(a,"highcharts-tracker")))c.onMouseOut()},onContainerClick:function(a){var c=this.chart,e=c.hoverPoint,d=c.plotLeft,b=c.plotTop;
a=this.normalize(a);c.cancelClick||(e&&this.inClass(a.target,"highcharts-tracker")?(k(e.series,"click",n(a,{point:e})),c.hoverPoint&&e.firePointEvent("click",a)):(n(a,this.getCoordinates(a)),c.isInsidePlot(a.chartX-d,a.chartY-b)&&k(c,"click",a)))},setDOMEvents:function(){var c=this,d=c.chart.container;d.onmousedown=function(a){c.onContainerMouseDown(a)};d.onmousemove=function(a){c.onContainerMouseMove(a)};d.onclick=function(a){c.onContainerClick(a)};D(d,"mouseleave",c.onContainerMouseLeave);1===a.chartCount&&
D(h,"mouseup",c.onDocumentMouseUp);a.hasTouch&&(d.ontouchstart=function(a){c.onContainerTouchStart(a)},d.ontouchmove=function(a){c.onContainerTouchMove(a)},1===a.chartCount&&D(h,"touchend",c.onDocumentTouchEnd))},destroy:function(){var c;g(this.chart.container,"mouseleave",this.onContainerMouseLeave);a.chartCount||(g(h,"mouseup",this.onDocumentMouseUp),g(h,"touchend",this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);for(c in this)this[c]=null}}})(M);(function(a){var D=a.charts,z=a.each,
F=a.extend,J=a.map,m=a.noop,f=a.pick;F(a.Pointer.prototype,{pinchTranslate:function(a,f,n,k,v,d){(this.zoomHor||this.pinchHor)&&this.pinchTranslateDirection(!0,a,f,n,k,v,d);(this.zoomVert||this.pinchVert)&&this.pinchTranslateDirection(!1,a,f,n,k,v,d)},pinchTranslateDirection:function(a,f,n,k,v,d,g,w){var h=this.chart,c=a?"x":"y",e=a?"X":"Y",l="chart"+e,u=a?"width":"height",q=h["plot"+(a?"Left":"Top")],b,t,y=w||1,m=h.inverted,x=h.bounds[a?"h":"v"],I=1===f.length,r=f[0][l],G=n[0][l],H=!I&&f[1][l],N=
!I&&n[1][l],p;n=function(){!I&&20<Math.abs(r-H)&&(y=w||Math.abs(G-N)/Math.abs(r-H));t=(q-G)/y+r;b=h["plot"+(a?"Width":"Height")]/y};n();f=t;f<x.min?(f=x.min,p=!0):f+b>x.max&&(f=x.max-b,p=!0);p?(G-=.8*(G-g[c][0]),I||(N-=.8*(N-g[c][1])),n()):g[c]=[G,N];m||(d[c]=t-q,d[u]=b);d=m?1/y:y;v[u]=b;v[c]=f;k[m?a?"scaleY":"scaleX":"scale"+e]=y;k["translate"+e]=d*q+(G-d*r)},pinch:function(a){var h=this,n=h.chart,k=h.pinchDown,v=a.touches,d=v.length,g=h.lastValidTouch,w=h.hasZoom,B=h.selectionMarker,c={},e=1===
d&&(h.inClass(a.target,"highcharts-tracker")&&n.runTrackerClick||h.runChartClick),l={};1<d&&(h.initiated=!0);w&&h.initiated&&!e&&a.preventDefault();J(v,function(a){return h.normalize(a)});"touchstart"===a.type?(z(v,function(a,c){k[c]={chartX:a.chartX,chartY:a.chartY}}),g.x=[k[0].chartX,k[1]&&k[1].chartX],g.y=[k[0].chartY,k[1]&&k[1].chartY],z(n.axes,function(a){if(a.zoomEnabled){var c=n.bounds[a.horiz?"h":"v"],b=a.minPixelPadding,e=a.toPixels(f(a.options.min,a.dataMin)),d=a.toPixels(f(a.options.max,
a.dataMax)),g=Math.max(e,d);c.min=Math.min(a.pos,Math.min(e,d)-b);c.max=Math.max(a.pos+a.len,g+b)}}),h.res=!0):k.length&&(B||(h.selectionMarker=B=F({destroy:m,touch:!0},n.plotBox)),h.pinchTranslate(k,v,c,B,l,g),h.hasPinched=w,h.scaleGroups(c,l),!w&&h.followTouchMove&&1===d?this.runPointActions(h.normalize(a)):h.res&&(h.res=!1,this.reset(!1,0)))},touch:function(h,m){var n=this.chart,k;a.hoverChartIndex=n.index;1===h.touches.length?(h=this.normalize(h),n.isInsidePlot(h.chartX-n.plotLeft,h.chartY-n.plotTop)&&
!n.openMenu?(m&&this.runPointActions(h),"touchmove"===h.type&&(m=this.pinchDown,k=m[0]?4<=Math.sqrt(Math.pow(m[0].chartX-h.chartX,2)+Math.pow(m[0].chartY-h.chartY,2)):!1),f(k,!0)&&this.pinch(h)):m&&this.reset()):2===h.touches.length&&this.pinch(h)},onContainerTouchStart:function(a){this.zoomOption();this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(f){D[a.hoverChartIndex]&&D[a.hoverChartIndex].pointer.drop(f)}})})(M);(function(a){var D=a.addEvent,z=a.charts,
F=a.css,J=a.doc,m=a.extend,f=a.noop,h=a.Pointer,q=a.removeEvent,n=a.win,k=a.wrap;if(n.PointerEvent||n.MSPointerEvent){var v={},d=!!n.PointerEvent,g=function(){var a,c=[];c.item=function(a){return this[a]};for(a in v)v.hasOwnProperty(a)&&c.push({pageX:v[a].pageX,pageY:v[a].pageY,target:v[a].target});return c},w=function(d,c,e,l){"touch"!==d.pointerType&&d.pointerType!==d.MSPOINTER_TYPE_TOUCH||!z[a.hoverChartIndex]||(l(d),l=z[a.hoverChartIndex].pointer,l[c]({type:e,target:d.currentTarget,preventDefault:f,
touches:g()}))};m(h.prototype,{onContainerPointerDown:function(a){w(a,"onContainerTouchStart","touchstart",function(a){v[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){w(a,"onContainerTouchMove","touchmove",function(a){v[a.pointerId]={pageX:a.pageX,pageY:a.pageY};v[a.pointerId].target||(v[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){w(a,"onDocumentTouchEnd","touchend",function(a){delete v[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,
d?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,d?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(J,d?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});k(h.prototype,"init",function(a,c,e){a.call(this,c,e);this.hasZoom&&F(c.container,{"-ms-touch-action":"none","touch-action":"none"})});k(h.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(D)});k(h.prototype,"destroy",function(a){this.batchMSEvents(q);
a.call(this)})}})(M);(function(a){var D,z=a.addEvent,F=a.css,J=a.discardElement,m=a.defined,f=a.each,h=a.extend,q=a.isFirefox,n=a.marginNames,k=a.merge,v=a.pick,d=a.setAnimation,g=a.stableSort,w=a.win,B=a.wrap;D=a.Legend=function(a,e){this.init(a,e)};D.prototype={init:function(a,e){this.chart=a;this.setOptions(e);e.enabled&&(this.render(),z(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var c=v(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=
k(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.initialItemX=this.padding=c;this.initialItemY=c-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=v(a.symbolWidth,16);this.pages=[]},update:function(a,e){var c=this.chart;this.setOptions(k(!0,this.options,a));this.destroy();c.isDirtyLegend=c.isDirtyBox=!0;v(e,!0)&&c.redraw()},colorizeItem:function(a,e){a.legendGroup[e?"removeClass":"addClass"]("highcharts-legend-item-hidden");var c=this.options,d=a.legendItem,g=a.legendLine,
b=a.legendSymbol,f=this.itemHiddenStyle.color,c=e?c.itemStyle.color:f,h=e?a.color||f:f,k=a.options&&a.options.marker,n={fill:h},v;d&&d.css({fill:c,color:c});g&&g.attr({stroke:h});if(b){if(k&&b.isMarker&&(n=a.pointAttribs(),!e))for(v in n)n[v]=f;b.attr(n)}},positionItem:function(a){var c=this.options,d=c.symbolPadding,c=!c.rtl,g=a._legendItemPos,f=g[0],g=g[1],b=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(c?f:this.legendWidth-f-2*d-4,g);b&&(b.x=f,b.y=g)},destroyItem:function(a){var c=a.checkbox;
f(["legendItem","legendLine","legendSymbol","legendGroup"],function(c){a[c]&&(a[c]=a[c].destroy())});c&&J(a.checkbox)},destroy:function(){var a=this.group,e=this.box;e&&(this.box=e.destroy());f(this.getAllItems(),function(a){f(["legendItem","legendGroup"],function(c){a[c]&&(a[c]=a[c].destroy())})});a&&(this.group=a.destroy())},positionCheckboxes:function(a){var c=this.group.alignAttr,d,g=this.clipHeight||this.legendHeight,h=this.titleHeight;c&&(d=c.translateY,f(this.allItems,function(b){var e=b.checkbox,
l;e&&(l=d+h+e.y+(a||0)+3,F(e,{left:c.translateX+b.checkboxOffset+e.x-20+"px",top:l+"px",display:l>d-6&&l<d+g-6?"":"none"}))}))},renderTitle:function(){var a=this.padding,e=this.options.title,d=0;e.text&&(this.title||(this.title=this.chart.renderer.label(e.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(e.style).add(this.group)),a=this.title.getBBox(),d=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:d}));this.titleHeight=d},setText:function(c){var e=
this.options;c.legendItem.attr({text:e.labelFormat?a.format(e.labelFormat,c):e.labelFormatter.call(c)})},renderItem:function(a){var c=this.chart,d=c.renderer,g=this.options,f="horizontal"===g.layout,b=this.symbolWidth,h=g.symbolPadding,n=this.itemStyle,m=this.itemHiddenStyle,x=this.padding,w=f?v(g.itemDistance,20):0,r=!g.rtl,G=g.width,H=g.itemMarginBottom||0,q=this.itemMarginTop,p=this.initialItemX,A=a.legendItem,B=!a.series,O=!B&&a.series.drawLegendSymbol?a.series:a,C=O.options,C=this.createCheckboxForItem&&
C&&C.showCheckbox,E=g.useHTML;A||(a.legendGroup=d.g("legend-item").addClass("highcharts-"+O.type+"-series highcharts-color-"+a.colorIndex+" "+(a.options.className||"")+(B?"highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=A=d.text("",r?b+h:-h,this.baseline||0,E).css(k(a.visible?n:m)).attr({align:r?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(n=n.fontSize,this.fontMetrics=d.fontMetrics(n,A),this.baseline=this.fontMetrics.f+3+q,A.attr("y",this.baseline)),
O.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,A,E),C&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);this.setText(a);d=A.getBBox();b=a.checkboxOffset=g.itemWidth||a.legendItemWidth||b+h+d.width+w+(C?20:0);this.itemHeight=h=Math.round(a.legendItemHeight||d.height);f&&this.itemX-p+b>(G||c.chartWidth-2*x-p-g.x)&&(this.itemX=p,this.itemY+=q+this.lastLineHeight+H,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,b);this.lastItemY=q+this.itemY+H;this.lastLineHeight=
Math.max(h,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];f?this.itemX+=b:(this.itemY+=q+h+H,this.lastLineHeight=h);this.offsetWidth=G||Math.max((f?this.itemX-p-w:b)+x,this.offsetWidth)},getAllItems:function(){var a=[];f(this.chart.series,function(c){var e=c&&c.options;c&&v(e.showInLegend,m(e.linkedTo)?!1:void 0,!0)&&(a=a.concat(c.legendItems||("point"===e.legendType?c.data:c)))});return a},adjustMargins:function(a,e){var c=this.chart,d=this.options,g=d.align.charAt(0)+d.verticalAlign.charAt(0)+
d.layout.charAt(0);d.floating||f([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(b,f){b.test(g)&&!m(a[f])&&(c[n[f]]=Math.max(c[n[f]],c.legend[(f+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][f]*d[f%2?"x":"y"]+v(d.margin,12)+e[f]))})},render:function(){var a=this,e=a.chart,d=e.renderer,k=a.group,n,b,t,v,m=a.box,x=a.options,w=a.padding;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;k||(a.group=k=d.g("legend").attr({zIndex:7}).add(),a.contentGroup=
d.g().attr({zIndex:1}).add(k),a.scrollGroup=d.g().add(a.contentGroup));a.renderTitle();n=a.getAllItems();g(n,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});x.reversed&&n.reverse();a.allItems=n;a.display=b=!!n.length;a.lastLineHeight=0;f(n,function(b){a.renderItem(b)});t=(x.width||a.offsetWidth)+w;v=a.lastItemY+a.lastLineHeight+a.titleHeight;v=a.handleOverflow(v);v+=w;m||(a.box=m=d.rect().addClass("highcharts-legend-box").attr({r:x.borderRadius}).add(k),
m.isNew=!0);m.attr({stroke:x.borderColor,"stroke-width":x.borderWidth||0,fill:x.backgroundColor||"none"}).shadow(x.shadow);0<t&&0<v&&(m[m.isNew?"attr":"animate"](m.crisp({x:0,y:0,width:t,height:v},m.strokeWidth())),m.isNew=!1);m[b?"show":"hide"]();a.legendWidth=t;a.legendHeight=v;f(n,function(b){a.positionItem(b)});b&&k.align(h({width:t,height:v},x),!0,"spacingBox");e.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var c=this,d=this.chart,g=d.renderer,h=this.options,b=h.y,b=d.spacingBox.height+
("top"===h.verticalAlign?-b:b)-this.padding,k=h.maxHeight,n,m=this.clipRect,x=h.navigation,w=v(x.animation,!0),r=x.arrowSize||12,G=this.nav,H=this.pages,q=this.padding,p,A=this.allItems,B=function(a){m.attr({height:a});c.contentGroup.div&&(c.contentGroup.div.style.clip="rect("+q+"px,9999px,"+(q+a)+"px,0)")};"horizontal"===h.layout&&(b/=2);k&&(b=Math.min(b,k));H.length=0;a>b&&!1!==x.enabled?(this.clipHeight=n=Math.max(b-20-this.titleHeight-q,0),this.currentPage=v(this.currentPage,1),this.fullHeight=
a,f(A,function(a,b){var c=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var d=H.length;if(!d||c-H[d-1]>n&&(p||c)!==H[d-1])H.push(p||c),d++;b===A.length-1&&c+a-H[d-1]>n&&H.push(c);c!==p&&(p=c)}),m||(m=c.clipRect=g.clipRect(0,q,9999,0),c.contentGroup.clip(m)),B(n),G||(this.nav=G=g.g().attr({zIndex:1}).add(this.group),this.up=g.symbol("triangle",0,0,r,r).on("click",function(){c.scroll(-1,w)}).add(G),this.pager=g.text("",15,10).addClass("highcharts-legend-navigation").css(x.style).add(G),
this.down=g.symbol("triangle-down",0,0,r,r).on("click",function(){c.scroll(1,w)}).add(G)),c.scroll(0),a=b):G&&(B(d.chartHeight),G.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,e){var c=this.pages,g=c.length;a=this.currentPage+a;var f=this.clipHeight,b=this.options.navigation,h=this.pager,k=this.padding;a>g&&(a=g);0<a&&(void 0!==e&&d(e,this.chart),this.nav.attr({translateX:k,translateY:f+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===
a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),h.attr({text:a+"/"+g}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===g?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?b.inactiveColor:b.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===g?b.inactiveColor:b.activeColor}).css({cursor:a===g?"default":"pointer"}),e=-c[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:e}),this.currentPage=
a,this.positionCheckboxes(e))}};a.LegendSymbolMixin={drawRectangle:function(a,d){var c=a.options,e=c.symbolHeight||a.fontMetrics.f,c=c.squareSymbol;d.legendSymbol=this.chart.renderer.rect(c?(a.symbolWidth-e)/2:0,a.baseline-e+1,c?e:a.symbolWidth,e,v(a.options.symbolRadius,e/2)).addClass("highcharts-point").attr({zIndex:3}).add(d.legendGroup)},drawLineMarker:function(a){var c=this.options,d=c.marker,g=a.symbolWidth,f=this.chart.renderer,b=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);
var h;h={"stroke-width":c.lineWidth||0};c.dashStyle&&(h.dashstyle=c.dashStyle);this.legendLine=f.path(["M",0,a,"L",g,a]).addClass("highcharts-graph").attr(h).add(b);d&&!1!==d.enabled&&(c=0===this.symbol.indexOf("url")?0:d.radius,this.legendSymbol=d=f.symbol(this.symbol,g/2-c,a-c,2*c,2*c,d).addClass("highcharts-point").add(b),d.isMarker=!0)}};(/Trident\/7\.0/.test(w.navigator.userAgent)||q)&&B(D.prototype,"positionItem",function(a,d){var c=this,e=function(){d._legendItemPos&&a.call(c,d)};e();setTimeout(e)})})(M);
(function(a){var D=a.addEvent,z=a.animate,F=a.animObject,J=a.attr,m=a.doc,f=a.Axis,h=a.createElement,q=a.defaultOptions,n=a.discardElement,k=a.charts,v=a.css,d=a.defined,g=a.each,w=a.error,B=a.extend,c=a.fireEvent,e=a.getStyle,l=a.grep,u=a.isNumber,L=a.isObject,b=a.isString,t=a.Legend,y=a.marginNames,K=a.merge,x=a.Pointer,I=a.pick,r=a.pInt,G=a.removeEvent,H=a.seriesTypes,N=a.splat,p=a.svg,A=a.syncTimeout,P=a.win,O=a.Renderer,C=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,
b,c){return new C(a,b,c)};C.prototype={callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(b(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var d,e=b.series;b.series=null;d=K(q,b);d.series=b.series=e;this.userOptions=b;this.respRules=[];b=d.chart;e=b.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.callback=c;this.isResizing=0;this.options=d;this.axes=[];this.series=[];this.hasCartesianSeries=b.showAxes;var g;this.index=k.length;
k.push(this);a.chartCount++;if(e)for(g in e)D(this,g,e[g]);this.xAxis=[];this.yAxis=[];this.pointCount=this.colorCounter=this.symbolCounter=0;this.firstRender()},initSeries:function(a){var b=this.options.chart;(b=H[a.type||b.type||b.defaultSeriesType])||w(17,!0);b=new b;b.init(this,a);return b},isInsidePlot:function(a,b,c){var d=c?b:a;a=c?a:b;return 0<=d&&d<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){var d=this.axes,e=this.series,f=this.pointer,r=this.legend,h=this.isDirtyLegend,
l,p,k=this.hasCartesianSeries,n=this.isDirtyBox,H=e.length,t=H,u=this.renderer,v=u.isHidden(),G=[];a.setAnimation(b,this);v&&this.cloneRenderTo();for(this.layOutTitles();t--;)if(b=e[t],b.options.stacking&&(l=!0,b.isDirty)){p=!0;break}if(p)for(t=H;t--;)b=e[t],b.options.stacking&&(b.isDirty=!0);g(e,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),h=!0);a.isDirtyData&&c(a,"updatedData")});h&&r.options.enabled&&(r.render(),this.isDirtyLegend=!1);l&&this.getStacks();
k&&g(d,function(a){a.updateNames();a.setScale()});this.getMargins();k&&(g(d,function(a){a.isDirty&&(n=!0)}),g(d,function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,G.push(function(){c(a,"afterSetExtremes",B(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(n||l)&&a.redraw()}));n&&this.drawChartBox();g(e,function(a){(n||a.isDirty)&&a.visible&&a.redraw()});f&&f.reset(!0);u.draw();c(this,"redraw");v&&this.cloneRenderTo(!0);g(G,function(a){a.call()})},get:function(a){var b=this.axes,c=this.series,
d,e;for(d=0;d<b.length;d++)if(b[d].options.id===a)return b[d];for(d=0;d<c.length;d++)if(c[d].options.id===a)return c[d];for(d=0;d<c.length;d++)for(e=c[d].points||[],b=0;b<e.length;b++)if(e[b].id===a)return e[b];return null},getAxes:function(){var a=this,b=this.options,c=b.xAxis=N(b.xAxis||{}),b=b.yAxis=N(b.yAxis||{});g(c,function(a,b){a.index=b;a.isX=!0});g(b,function(a,b){a.index=b});c=c.concat(b);g(c,function(b){new f(a,b)})},getSelectedPoints:function(){var a=[];g(this.series,function(b){a=a.concat(l(b.points||
[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return l(this.series,function(a){return a.selected})},setTitle:function(a,b,c){var d=this,e=d.options,f;f=e.title=K(e.title,a);e=e.subtitle=K(e.subtitle,b);g([["title",a,f],["subtitle",b,e]],function(a,b){var c=a[0],e=d[c],g=a[1];a=a[2];e&&g&&(d[c]=e=e.destroy());a&&a.text&&!e&&(d[c]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),d[c].update=function(a){d.setTitle(!b&&
a,b&&a)},d[c].css(a.style))});d.layOutTitles(c)},layOutTitles:function(a){var b=0,c,d=this.renderer,e=this.spacingBox;g(["title","subtitle"],function(a){var c=this[a],g=this.options[a],f;c&&(f=g.style.fontSize,f=d.fontMetrics(f,c).b,c.css({width:(g.width||e.width+g.widthAdjust)+"px"}).align(B({y:b+f+("title"===a?-3:2)},g),!1,"spacingBox"),g.floating||g.verticalAlign||(b=Math.ceil(b+c.getBBox().height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&c&&(this.isDirtyBox=c,this.hasRendered&&
I(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var a=this.options.chart,b=a.width,a=a.height,c=this.renderToClone||this.renderTo;d(b)||(this.containerWidth=e(c,"width"));d(a)||(this.containerHeight=e(c,"height"));this.chartWidth=Math.max(0,b||this.containerWidth||600);this.chartHeight=Math.max(0,I(a,19<this.containerHeight?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;if(a){if(b){for(;b.childNodes.length;)this.renderTo.appendChild(b.firstChild);
n(b);delete this.renderToClone}}else c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),v(b,{position:"absolute",top:"-9999px",display:"block"}),b.style.setProperty&&b.style.setProperty("display","block","important"),m.body.appendChild(b),c&&b.appendChild(c)},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var c,d=this.options,e=d.chart,g,f;c=this.renderTo;var l="highcharts-"+a.idCounter++,
p;c||(this.renderTo=c=e.renderTo);b(c)&&(this.renderTo=c=m.getElementById(c));c||w(13,!0);g=r(J(c,"data-highcharts-chart"));u(g)&&k[g]&&k[g].hasRendered&&k[g].destroy();J(c,"data-highcharts-chart",this.index);c.innerHTML="";e.skipClone||c.offsetWidth||this.cloneRenderTo();this.getChartSize();g=this.chartWidth;f=this.chartHeight;p=B({position:"relative",overflow:"hidden",width:g+"px",height:f+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},e.style);
this.container=c=h("div",{id:l},p,this.renderToClone||c);this._cursor=c.style.cursor;this.renderer=new (a[e.renderer]||O)(c,g,f,null,e.forExport,d.exporting&&d.exporting.allowHTML);this.setClassName(e.className);this.renderer.setStyle(e.style);this.renderer.chartIndex=this.index},getMargins:function(a){var b=this.spacing,c=this.margin,e=this.titleOffset;this.resetMargins();e&&!d(c[0])&&(this.plotTop=Math.max(this.plotTop,e+this.options.title.margin+b[0]));this.legend.display&&this.legend.adjustMargins(c,
b);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&g(a.axes,function(a){a.visible&&a.getOffset()});g(y,function(e,g){d(c[g])||(a[e]+=b[g])});a.setChartSize()},reflow:function(a){var b=this,c=b.options.chart,g=b.renderTo,f=d(c.width),r=c.width||e(g,"width"),c=c.height||e(g,"height"),g=a?a.target:P;if(!f&&
!b.isPrinting&&r&&c&&(g===P||g===m)){if(r!==b.containerWidth||c!==b.containerHeight)clearTimeout(b.reflowTimeout),b.reflowTimeout=A(function(){b.container&&b.setSize(void 0,void 0,!1)},a?100:0);b.containerWidth=r;b.containerHeight=c}},initReflow:function(){var a=this,b=function(b){a.reflow(b)};D(P,"resize",b);D(a,"destroy",function(){G(P,"resize",b)})},setSize:function(b,d,e){var f=this,r=f.renderer;f.isResizing+=1;a.setAnimation(e,f);f.oldChartHeight=f.chartHeight;f.oldChartWidth=f.chartWidth;void 0!==
b&&(f.options.chart.width=b);void 0!==d&&(f.options.chart.height=d);f.getChartSize();b=r.globalAnimation;(b?z:v)(f.container,{width:f.chartWidth+"px",height:f.chartHeight+"px"},b);f.setChartSize(!0);r.setSize(f.chartWidth,f.chartHeight,e);g(f.axes,function(a){a.isDirty=!0;a.setScale()});f.isDirtyLegend=!0;f.isDirtyBox=!0;f.layOutTitles();f.getMargins();f.setResponsive&&f.setResponsive(!1);f.redraw(e);f.oldChartHeight=null;c(f,"resize");A(function(){f&&c(f,"endResize",null,function(){--f.isResizing})},
F(b).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,e=this.chartHeight,f=this.options.chart,r=this.spacing,h=this.clipOffset,l,p,k,n;this.plotLeft=l=Math.round(this.plotLeft);this.plotTop=p=Math.round(this.plotTop);this.plotWidth=k=Math.max(0,Math.round(d-l-this.marginRight));this.plotHeight=n=Math.max(0,Math.round(e-p-this.marginBottom));this.plotSizeX=b?n:k;this.plotSizeY=b?k:n;this.plotBorderWidth=f.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:r[3],
y:r[0],width:d-r[3]-r[1],height:e-r[0]-r[2]};this.plotBox=c.plotBox={x:l,y:p,width:k,height:n};d=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(d,h[3])/2);c=Math.ceil(Math.max(d,h[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(d,h[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(d,h[2])/2-c))};a||g(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;g(["margin","spacing"],function(c){var d=
b[c],e=L(d)?d:[d,d,d,d];g(["Top","Right","Bottom","Left"],function(d,g){a[c][g]=I(b[c+d],e[g])})});g(y,function(b,c){a[b]=I(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,e=this.chartBackground,g=this.plotBackground,f=this.plotBorder,r,h=this.plotBGImage,l=a.backgroundColor,p=a.plotBackgroundColor,k=a.plotBackgroundImage,n,t=this.plotLeft,H=this.plotTop,u=this.plotWidth,
v=this.plotHeight,G=this.plotBox,m=this.clipRect,x=this.clipBox,y="animate";e||(this.chartBackground=e=b.rect().addClass("highcharts-background").add(),y="attr");r=a.borderWidth||0;n=r+(a.shadow?8:0);l={fill:l||"none"};if(r||e["stroke-width"])l.stroke=a.borderColor,l["stroke-width"]=r;e.attr(l).shadow(a.shadow);e[y]({x:n/2,y:n/2,width:c-n-r%2,height:d-n-r%2,r:a.borderRadius});y="animate";g||(y="attr",this.plotBackground=g=b.rect().addClass("highcharts-plot-background").add());g[y](G);g.attr({fill:p||
"none"}).shadow(a.plotShadow);k&&(h?h.animate(G):this.plotBGImage=b.image(k,t,H,u,v).add());m?m.animate({width:x.width,height:x.height}):this.clipRect=b.clipRect(x);y="animate";f||(y="attr",this.plotBorder=f=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());f.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});f[y](f.crisp({x:t,y:H,width:u,height:v},-f.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,
e,f;g(["inverted","angular","polar"],function(g){c=H[b.type||b.defaultSeriesType];f=b[g]||c&&c.prototype[g];for(e=d&&d.length;!f&&e--;)(c=H[d[e].type])&&c.prototype[g]&&(f=!0);a[g]=f})},linkSeries:function(){var a=this,c=a.series;g(c,function(a){a.linkedSeries.length=0});g(c,function(c){var d=c.options.linkedTo;b(d)&&(d=":previous"===d?a.series[c.index-1]:a.get(d))&&d.linkedParent!==c&&(d.linkedSeries.push(c),c.linkedParent=d,c.visible=I(c.options.visible,d.options.visible,c.visible))})},renderSeries:function(){g(this.series,
function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&g(b.items,function(c){var d=B(b.style,c.style),e=r(d.left)+a.plotLeft,g=r(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(c.html,e,g).attr({zIndex:2}).css(d).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,d,e,f;this.setTitle();this.legend=new t(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;d=this.plotHeight-=
21;g(a,function(a){a.setScale()});this.getAxisMargins();e=1.1<c/this.plotWidth;f=1.05<d/this.plotHeight;if(e||f)g(a,function(a){(a.horiz&&e||!a.horiz&&f)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&g(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=
this;a=K(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(P.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,d=b.axes,e=b.series,f=b.container,r,h=f&&f.parentNode;c(b,"destroy");k[b.index]=void 0;a.chartCount--;
b.renderTo.removeAttribute("data-highcharts-chart");G(b);for(r=d.length;r--;)d[r]=d[r].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(r=e.length;r--;)e[r]=e[r].destroy();g("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});f&&(f.innerHTML="",G(f),h&&n(f));for(r in b)delete b[r]},isReadyToRender:function(){var a=
this;return p||P!=P.top||"complete"===m.readyState?!0:(m.attachEvent("onreadystatechange",function(){m.detachEvent("onreadystatechange",a.firstRender);"complete"===m.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();c(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();g(b.series||[],function(b){a.initSeries(b)});a.linkSeries();c(a,"beforeRender");x&&(a.pointer=new x(a,b));a.render();a.renderer.draw();if(!a.renderer.imgCount&&
a.onload)a.onload();a.cloneRenderTo(!0)}},onload:function(){g([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);c(this,"load");!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}}})(M);(function(a){var D,z=a.each,F=a.extend,J=a.erase,m=a.fireEvent,f=a.format,h=a.isArray,q=a.isNumber,n=a.pick,k=a.removeEvent;D=a.Point=function(){};D.prototype={init:function(a,d,g){this.series=a;this.color=a.color;this.applyOptions(d,g);a.options.colorByPoint?
(d=a.options.colors||a.chart.options.colors,this.color=this.color||d[a.colorCounter],d=d.length,g=a.colorCounter,a.colorCounter++,a.colorCounter===d&&(a.colorCounter=0)):g=a.colorIndex;this.colorIndex=n(this.colorIndex,g);a.chart.pointCount++;return this},applyOptions:function(a,d){var g=this.series,f=g.options.pointValKey||g.pointValKey;a=D.prototype.optionsToObject.call(this,a);F(this,a);this.options=this.options?F(this.options,a):a;a.group&&delete this.group;f&&(this.y=this[f]);this.isNull=n(this.isValid&&
!this.isValid(),null===this.x||!q(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===d&&g.xAxis&&g.xAxis.hasNames&&(this.x=g.xAxis.nameToX(this));void 0===this.x&&g&&(this.x=void 0===d?g.autoIncrement(this):d);return this},optionsToObject:function(a){var d={},g=this.series,f=g.options.keys,k=f||g.pointArrayMap||["y"],c=k.length,e=0,l=0;if(q(a)||null===a)d[k[0]]=a;else if(h(a))for(!f&&a.length>c&&(g=typeof a[0],"string"===g?d.name=a[0]:"number"===g&&(d.x=a[0]),e++);l<c;)f&&void 0===
a[e]||(d[k[l]]=a[e]),e++,l++;else"object"===typeof a&&(d=a,a.dataLabels&&(g._hasPointLabels=!0),a.marker&&(g._hasPointMarkers=!0));return d},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")},getZone:function(){var a=this.series,d=a.zones,a=a.zoneAxis||
"y",g=0,f;for(f=d[g];this[a]>=f.value;)f=d[++g];f&&f.color&&!this.options.color&&(this.color=f.color);return f},destroy:function(){var a=this.series.chart,d=a.hoverPoints,g;a.pointCount--;d&&(this.setState(),J(d,this),d.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)k(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(g in this)this[g]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper",
"connector","shadowGroup"],d,g=6;g--;)d=a[g],this[d]&&(this[d]=this[d].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var d=this.series,g=d.tooltipOptions,h=n(g.valueDecimals,""),k=g.valuePrefix||"",c=g.valueSuffix||"";z(d.pointArrayMap||["y"],function(d){d="{point."+d;if(k||c)a=a.replace(d+"}",k+d+"}"+c);a=a.replace(d+
"}",d+":,."+h+"f}")});return f(a,{point:this,series:this.series})},firePointEvent:function(a,d,g){var f=this,h=this.series.options;(h.point.events[a]||f.options&&f.options.events&&f.options.events[a])&&this.importEvents();"click"===a&&h.allowPointSelect&&(g=function(a){f.select&&f.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});m(this,a,d,g)},visible:!0}})(M);(function(a){var D=a.addEvent,z=a.animObject,F=a.arrayMax,J=a.arrayMin,m=a.correctFloat,f=a.Date,h=a.defaultOptions,q=a.defaultPlotOptions,
n=a.defined,k=a.each,v=a.erase,d=a.error,g=a.extend,w=a.fireEvent,B=a.grep,c=a.isArray,e=a.isNumber,l=a.isString,u=a.merge,L=a.pick,b=a.removeEvent,t=a.splat,y=a.stableSort,K=a.SVGElement,x=a.syncTimeout,I=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",
lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textShadow:"1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3},{isCartesian:!0,
pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,d,e,f=a.series,r=function(a,b){return L(a.options.index,a._i)-L(b.options.index,b._i)};c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();g(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});e=b.events;for(d in e)D(c,d,e[d]);if(e&&e.click||b.point&&b.point.events&&b.point.events.click||
b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();k(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);f.push(c);c._i=f.length-1;y(f,r);this.yAxis&&y(this.yAxis.series,r);k(f,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)})},bindAxes:function(){var a=this,b=a.options,c=a.chart,e;k(a.axisTypes||[],function(g){k(c[g],function(c){e=c.options;if(b[g]===e.index||void 0!==b[g]&&b[g]===e.id||void 0===b[g]&&0===e.index)c.series.push(a),
a[g]=c,c.isDirty=!0});a[g]||a.optionalAxis===g||d(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,d=arguments,g=e(b)?function(d){var e="y"===d&&c.toYData?c.toYData(a):a[d];c[d+"Data"][b]=e}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))};k(c.parallelArrays,g)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,d=a.pointIntervalUnit,b=L(b,a.pointStart,0);this.pointInterval=c=L(this.pointInterval,a.pointInterval,1);d&&(a=new f(b),"day"===d?
a=+a[f.hcSetDate](a[f.hcGetDate]()+c):"month"===d?a=+a[f.hcSetMonth](a[f.hcGetMonth]()+c):"year"===d&&(a=+a[f.hcSetFullYear](a[f.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options.plotOptions,b=b.userOptions||{},d=b.plotOptions||{},e=c[this.type];this.userOptions=a;c=u(e,c.series,a);this.tooltipOptions=u(h.tooltip,h.plotOptions[this.type].tooltip,b.tooltip,d.series&&d.series.tooltip,d[this.type]&&d[this.type].tooltip,a.tooltip);null===e.marker&&
delete c.marker;this.zoneAxis=c.zoneAxis;a=this.zones=(c.zones||[]).slice();!c.negativeColor&&!c.negativeFillColor||c.zones||a.push({value:c[this.zoneAxis+"Threshold"]||c.threshold||0,className:"highcharts-negative",color:c.negativeColor,fillColor:c.negativeFillColor});a.length&&n(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return c},getCyclic:function(a,b,c){var d,e=this.userOptions,g=a+"Index",f=a+"Counter",h=c?c.length:L(this.chart.options.chart[a+"Count"],this.chart[a+
"Count"]);b||(d=L(e[g],e["_"+g]),n(d)||(e["_"+g]=d=this.chart[f]%h,this.chart[f]+=1),c&&(b=c[d]));void 0!==d&&(this[g]=d);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||q[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(a,b,g,f){var h=this,r=h.points,n=r&&r.length||
0,t,u=h.options,x=h.chart,m=null,y=h.xAxis,G=u.turboThreshold,q=this.xData,w=this.yData,v=(t=h.pointArrayMap)&&t.length;a=a||[];t=a.length;b=L(b,!0);if(!1!==f&&t&&n===t&&!h.cropped&&!h.hasGroupedData&&h.visible)k(a,function(a,b){r[b].update&&a!==u.data[b]&&r[b].update(a,!1,null,!1)});else{h.xIncrement=null;h.colorCounter=0;k(this.parallelArrays,function(a){h[a+"Data"].length=0});if(G&&t>G){for(g=0;null===m&&g<t;)m=a[g],g++;if(e(m))for(g=0;g<t;g++)q[g]=this.autoIncrement(),w[g]=a[g];else if(c(m))if(v)for(g=
0;g<t;g++)m=a[g],q[g]=m[0],w[g]=m.slice(1,v+1);else for(g=0;g<t;g++)m=a[g],q[g]=m[0],w[g]=m[1];else d(12)}else for(g=0;g<t;g++)void 0!==a[g]&&(m={series:h},h.pointClass.prototype.applyOptions.apply(m,[a[g]]),h.updateParallelArrays(m,g));l(w[0])&&d(14,!0);h.data=[];h.options.data=h.userOptions.data=a;for(g=n;g--;)r[g]&&r[g].destroy&&r[g].destroy();y&&(y.minRange=y.userMinRange);h.isDirty=x.isDirtyBox=!0;h.isDirtyData=!!r;g=!1}"point"===u.legendType&&(this.processData(),this.generatePoints());b&&x.redraw(g)},
processData:function(a){var b=this.xData,c=this.yData,e=b.length,g;g=0;var f,h,l=this.xAxis,k,r=this.options;k=r.cropThreshold;var n=this.getExtremesFromAll||r.getExtremesFromAll,t=this.isCartesian,r=l&&l.val2lin,u=l&&l.isLog,m,x;if(t&&!this.isDirty&&!l.isDirty&&!this.yAxis.isDirty&&!a)return!1;l&&(a=l.getExtremes(),m=a.min,x=a.max);if(t&&this.sorted&&!n&&(!k||e>k||this.forceCrop))if(b[e-1]<m||b[0]>x)b=[],c=[];else if(b[0]<m||b[e-1]>x)g=this.cropData(this.xData,this.yData,m,x),b=g.xData,c=g.yData,
g=g.start,f=!0;for(k=b.length||1;--k;)e=u?r(b[k])-r(b[k-1]):b[k]-b[k-1],0<e&&(void 0===h||e<h)?h=e:0>e&&this.requireSorting&&d(15);this.cropped=f;this.cropStart=g;this.processedXData=b;this.processedYData=c;this.closestPointRange=h},cropData:function(a,b,c,d){var e=a.length,g=0,f=e,h=L(this.cropShoulder,1),l;for(l=0;l<e;l++)if(a[l]>=c){g=Math.max(0,l-h);break}for(c=l;c<e;c++)if(a[c]>d){f=c+h;break}return{xData:a.slice(g,f),yData:b.slice(g,f),start:g,end:f}},generatePoints:function(){var a=this.options.data,
b=this.data,c,d=this.processedXData,e=this.processedYData,g=this.pointClass,f=d.length,h=this.cropStart||0,l,k=this.hasGroupedData,n,u=[],m;b||k||(b=[],b.length=a.length,b=this.data=b);for(m=0;m<f;m++)l=h+m,k?(u[m]=(new g).init(this,[d[m]].concat(t(e[m]))),u[m].dataGroup=this.groupMap[m]):(b[l]?n=b[l]:void 0!==a[l]&&(b[l]=n=(new g).init(this,a[l],d[m])),u[m]=n),u[m].index=l;if(b&&(f!==(c=b.length)||k))for(m=0;m<c;m++)m!==h||k||(m+=f),b[m]&&(b[m].destroyElements(),b[m].plotX=void 0);this.data=b;this.points=
u},getExtremes:function(a){var b=this.yAxis,d=this.processedXData,g,f=[],h=0;g=this.xAxis.getExtremes();var l=g.min,k=g.max,r,n,t,m;a=a||this.stackedYData||this.processedYData||[];g=a.length;for(m=0;m<g;m++)if(n=d[m],t=a[m],r=(e(t,!0)||c(t))&&(!b.isLog||t.length||0<t),n=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(d[m+1]||n)>=l&&(d[m-1]||n)<=k,r&&n)if(r=t.length)for(;r--;)null!==t[r]&&(f[h++]=t[r]);else f[h++]=t;this.dataMin=J(f);this.dataMax=F(f)},translate:function(){this.processedXData||
this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,g=this.yAxis,f=this.points,h=f.length,l=!!this.modifyValue,k=a.pointPlacement,t="between"===k||e(k),u=a.threshold,x=a.startFromThreshold?u:0,y,q,w,v,K=Number.MAX_VALUE,a=0;a<h;a++){var I=f[a],B=I.x,z=I.y;q=I.low;var D=b&&g.stacks[(this.negStacks&&z<(x?0:u)?"-":"")+this.stackKey],F;g.isLog&&null!==z&&0>=z&&(I.isNull=!0);I.plotX=y=m(Math.min(Math.max(-1E5,c.translate(B,0,0,0,1,k,"flags"===this.type)),
1E5));b&&this.visible&&!I.isNull&&D&&D[B]&&(v=this.getStackIndicator(v,B,this.index),F=D[B],z=F.points[v.key],q=z[0],z=z[1],q===x&&v.key===D[B].base&&(q=L(u,g.min)),g.isLog&&0>=q&&(q=null),I.total=I.stackTotal=F.total,I.percentage=F.total&&I.y/F.total*100,I.stackY=z,F.setOffset(this.pointXOffset||0,this.barW||0));I.yBottom=n(q)?g.translate(q,0,1,0,1):null;l&&(z=this.modifyValue(z,I));I.plotY=q="number"===typeof z&&Infinity!==z?Math.min(Math.max(-1E5,g.translate(z,0,1,0,1)),1E5):void 0;I.isInside=
void 0!==q&&0<=q&&q<=g.len&&0<=y&&y<=c.len;I.clientX=t?m(c.translate(B,0,0,0,1,k)):y;I.negative=I.y<(u||0);I.category=d&&void 0!==d[I.x]?d[I.x]:I.x;I.isNull||(void 0!==w&&(K=Math.min(K,Math.abs(y-w))),w=y)}this.closestPointRangePx=K},getValidPoints:function(a,b){var c=this.chart;return B(a||this.points||[],function(a){return b&&!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,e=b.inverted,g=this.clipBox,f=g||b.clipBox,h=this.sharedClipKey||
["_sharedClip",a&&a.duration,a&&a.easing,f.height,c.xAxis,c.yAxis].join(),l=b[h],k=b[h+"m"];l||(a&&(f.width=0,b[h+"m"]=k=d.clipRect(-99,e?-b.plotLeft:-b.plotTop,99,e?b.chartWidth:b.chartHeight)),b[h]=l=d.clipRect(f),l.count={length:0});a&&!l.count[this.index]&&(l.count[this.index]=!0,l.count.length+=1);!1!==c.clip&&(this.group.clip(a||g?l:b.clipRect),this.markerGroup.clip(k),this.sharedClipKey=h);a||(l.count[this.index]&&(delete l.count[this.index],--l.count.length),0===l.count.length&&h&&b[h]&&(g||
(b[h]=b[h].destroy()),b[h+"m"]&&(b[h+"m"]=b[h+"m"].destroy())))},animate:function(a){var b=this.chart,c=z(this.options.animation),d;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();w(this,"afterAnimate")},drawPoints:function(){var a=this.points,b=this.chart,c,d,g,f,h=this.options.marker,l,k,n,t,m=this.markerGroup,u=L(h.enabled,this.xAxis.isRadial?!0:null,
this.closestPointRangePx>2*h.radius);if(!1!==h.enabled||this._hasPointMarkers)for(d=a.length;d--;)g=a[d],c=g.plotY,f=g.graphic,l=g.marker||{},k=!!g.marker,n=u&&void 0===l.enabled||l.enabled,t=g.isInside,n&&e(c)&&null!==g.y?(c=L(l.symbol,this.symbol),g.hasImage=0===c.indexOf("url"),n=this.markerAttribs(g,g.selected&&"select"),f?f[t?"show":"hide"](!0).animate(n):t&&(0<n.width||g.hasImage)&&(g.graphic=f=b.renderer.symbol(c,n.x,n.y,n.width,n.height,k?l:h).add(m)),f&&f.attr(this.pointAttribs(g,g.selected&&
"select")),f&&f.addClass(g.getClassName(),!0)):f&&(g.graphic=f.destroy())},markerAttribs:function(a,b){var c=this.options.marker,d=a&&a.options,e=d&&d.marker||{},d=L(e.radius,c.radius);b&&(c=c.states[b],b=e.states&&e.states[b],d=L(b&&b.radius,c&&c.radius,d+(c&&c.radiusPlus||0)));a.hasImage&&(d=0);a={x:Math.floor(a.plotX)-d,y:a.plotY-d};d&&(a.width=a.height=2*d);return a},pointAttribs:function(a,b){var c=this.options.marker,d=a&&a.options,e=d&&d.marker||{},g=c.lineWidth,f=this.color,d=d&&d.color,h=
a&&a.color,l;a&&this.zones.length&&(a=a.getZone())&&a.color&&(l=a.color);f=d||l||h||f;l=e.fillColor||c.fillColor||f;f=e.lineColor||c.lineColor||f;b&&(c=c.states[b],b=e.states&&e.states[b]||{},g=c.lineWidth||g+c.lineWidthPlus,l=b.fillColor||c.fillColor||l,f=b.lineColor||c.lineColor||f);return{stroke:f,"stroke-width":g,fill:l}},destroy:function(){var a=this,c=a.chart,d=/AppleWebKit\/533/.test(I.navigator.userAgent),e,g=a.data||[],f,h,l;w(a,"destroy");b(a);k(a.axisTypes||[],function(b){(l=a[b])&&l.series&&
(v(l.series,a),l.isDirty=l.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(e=g.length;e--;)(f=g[e])&&f.destroy&&f.destroy();a.points=null;clearTimeout(a.animationTimeout);for(h in a)a[h]instanceof K&&!a[h].survive&&(e=d&&"group"===h?"hide":"destroy",a[h][e]());c.hoverSeries===a&&(c.hoverSeries=null);v(c.series,a);for(h in a)delete a[h]},getGraphPath:function(a,b,c){var d=this,e=d.options,g=e.step,f,h=[],l=[],r;a=a||d.points;(f=a.reversed)&&a.reverse();(g={right:1,center:2}[g]||g&&
3)&&f&&(g=4-g);!e.connectNulls||b||c||(a=this.getValidPoints(a));k(a,function(f,k){var t=f.plotX,p=f.plotY,m=a[k-1];(f.leftCliff||m&&m.rightCliff)&&!c&&(r=!0);f.isNull&&!n(b)&&0<k?r=!e.connectNulls:f.isNull&&!b?r=!0:(0===k||r?k=["M",f.plotX,f.plotY]:d.getPointSpline?k=d.getPointSpline(a,f,k):g?(k=1===g?["L",m.plotX,p]:2===g?["L",(m.plotX+t)/2,m.plotY,"L",(m.plotX+t)/2,p]:["L",t,m.plotY],k.push("L",t,p)):k=["L",t,p],l.push(f.x),g&&l.push(f.x),h.push.apply(h,k),r=!1)});h.xMap=l;return d.graphPath=h},
drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),d=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];k(this.zones,function(c,e){d.push(["zone-graph-"+e,"highcharts-graph highcharts-zone-graph-"+e+" "+(c.className||""),c.color||a.color,c.dashStyle||b.dashStyle])});k(d,function(d,e){var g=d[0],f=a[g];f?(f.endX=c.xMap,f.animate({d:c})):c.length&&(a[g]=a.chart.renderer.path(c).addClass(d[1]).attr({zIndex:1}).add(a.group),f={stroke:d[2],
"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},d[3]?f.dashstyle=d[3]:"square"!==b.linecap&&(f["stroke-linecap"]=f["stroke-linejoin"]="round"),f=a[g].attr(f).shadow(2>e&&b.shadow));f&&(f.startX=c.xMap,f.isArea=c.isArea)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,d=this.zones,e,g,f=this.clips||[],h,l=this.graph,n=this.area,t=Math.max(b.chartWidth,b.chartHeight),m=this[(this.zoneAxis||"y")+"Axis"],u,x,y=b.inverted,q,w,v,K,I=!1;d.length&&(l||n)&&m&&void 0!==m.min&&(x=
m.reversed,q=m.horiz,l&&l.hide(),n&&n.hide(),u=m.getExtremes(),k(d,function(d,k){e=x?q?b.plotWidth:0:q?0:m.toPixels(u.min);e=Math.min(Math.max(L(g,e),0),t);g=Math.min(Math.max(Math.round(m.toPixels(L(d.value,u.max),!0)),0),t);I&&(e=g=m.toPixels(u.max));w=Math.abs(e-g);v=Math.min(e,g);K=Math.max(e,g);m.isXAxis?(h={x:y?K:v,y:0,width:w,height:t},q||(h.x=b.plotHeight-h.x)):(h={x:0,y:y?K:v,width:t,height:w},q&&(h.y=b.plotWidth-h.y));y&&c.isVML&&(h=m.isXAxis?{x:0,y:x?v:K,height:h.width,width:b.chartWidth}:
{x:h.y-b.plotLeft-b.spacingBox.x,y:0,width:h.height,height:b.chartHeight});f[k]?f[k].animate(h):(f[k]=c.clipRect(h),l&&a["zone-graph-"+k].clip(f[k]),n&&a["zone-area-"+k].clip(f[k]));I=d.value>u.max}),this.clips=f)},invertGroups:function(a){function c(){var b={width:d.yAxis.len,height:d.xAxis.len};k(["group","markerGroup"],function(c){d[c]&&d[c].attr(b).invert(a)})}var d=this,e=d.chart;d.xAxis&&(D(e,"resize",c),D(d,"destroy",function(){b(e,"resize",c)}),c(a),d.invertGroups=c)},plotGroup:function(a,
b,c,d,e){var g=this[a],f=!g;f&&(this[a]=g=this.chart.renderer.g(b).attr({zIndex:d||.1}).add(e),g.addClass("highcharts-series-"+this.index+" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+" "+(this.options.className||"")));g.attr({visibility:c})[f?"attr":"animate"](this.getPlotBox());return g},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=
this,b=a.chart,c,d=a.options,e=!!a.animate&&b.renderer.isSVG&&z(d.animation).duration,g=a.visible?"inherit":"hidden",f=d.zIndex,h=a.hasRendered,l=b.seriesGroup,k=b.inverted;c=a.plotGroup("group","series",g,f,l);a.markerGroup=a.plotGroup("markerGroup","markers",g,f,l);e&&a.animate(!0);c.inverted=a.isCartesian?k:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(k);
!1===d.clip||a.sharedClipKey||h||c.clip(b.clipRect);e&&a.animate();h||(a.animationTimeout=x(function(){a.afterAnimate()},e));a.isDirty=a.isDirtyData=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,c=this.group,d=this.xAxis,e=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:L(d&&d.left,a.plotLeft),translateY:L(e&&e.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdDimensions:1,kdAxisArray:["clientX",
"plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,e=this.chart.inverted;return this.searchKDTree({clientX:e?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:e?d.len-a.chartX+d.pos:a.chartY-d.pos},b)},buildKDTree:function(){function a(c,d,e){var g,f;if(f=c&&c.length)return g=b.kdAxisArray[d%e],c.sort(function(a,b){return a[g]-b[g]}),f=Math.floor(f/2),{point:c[f],left:a(c.slice(0,f),d+1,e),right:a(c.slice(f+1),d+1,e)}}var b=this,c=b.kdDimensions;delete b.kdTree;x(function(){b.kdTree=a(b.getValidPoints(null,
!b.directTouch),c,c)},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,h,l){var k=b.point,t=d.kdAxisArray[h%l],m,u,r=k;u=n(a[e])&&n(k[e])?Math.pow(a[e]-k[e],2):null;m=n(a[g])&&n(k[g])?Math.pow(a[g]-k[g],2):null;m=(u||0)+(m||0);k.dist=n(m)?Math.sqrt(m):Number.MAX_VALUE;k.distX=n(u)?Math.sqrt(u):Number.MAX_VALUE;t=a[t]-k[t];m=0>t?"left":"right";u=0>t?"right":"left";b[m]&&(m=c(a,b[m],h+1,l),r=m[f]<r[f]?m:k);b[u]&&Math.sqrt(t*t)<r[f]&&(a=c(a,b[u],h+1,l),r=a[f]<r[f]?a:r);return r}var d=
this,e=this.kdAxisArray[0],g=this.kdAxisArray[1],f=b?"distX":"dist";this.kdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,this.kdDimensions,this.kdDimensions)}})})(M);(function(a){function D(a,f,d,g,h){var k=a.chart.inverted;this.axis=a;this.isNegative=d;this.options=f;this.x=g;this.total=null;this.points={};this.stack=h;this.rightCliff=this.leftCliff=0;this.alignOptions={align:f.align||(k?d?"left":"right":"center"),verticalAlign:f.verticalAlign||(k?"middle":d?"bottom":"top"),y:n(f.y,
k?4:d?14:-6),x:n(f.x,k?d?-6:6:0)};this.textAlign=f.textAlign||(k?d?"right":"left":"center")}var z=a.Axis,F=a.Chart,J=a.correctFloat,m=a.defined,f=a.destroyObjectProperties,h=a.each,q=a.format,n=a.pick;a=a.Series;D.prototype={destroy:function(){f(this,this.axis)},render:function(a){var f=this.options,d=f.format,d=d?q(d,this):f.formatter.call(this);this.label?this.label.attr({text:d,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(d,null,null,f.useHTML).css(f.style).attr({align:this.textAlign,
rotation:f.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,f){var d=this.axis,g=d.chart,h=g.inverted,k=d.reversed,k=this.isNegative&&!k||!this.isNegative&&k,c=d.translate(d.usePercentage?100:this.total,0,0,0,1),d=d.translate(0),d=Math.abs(c-d);a=g.xAxis[0].translate(this.x)+a;var e=g.plotHeight,h={x:h?k?c:c-d:a,y:h?e-a-f:k?e-c-d:e-c,width:h?d:f,height:h?f:d};if(f=this.label)f.align(this.alignOptions,null,h),h=f.alignAttr,f[!1===this.options.crop||g.isInsidePlot(h.x,h.y)?"show":"hide"](!0)}};
F.prototype.getStacks=function(){var a=this;h(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});h(a.series,function(f){!f.options.stacking||!0!==f.visible&&!1!==a.options.chart.ignoreHiddenSeries||(f.stackKey=f.type+n(f.options.stack,""))})};z.prototype.buildStacks=function(){var a=this.series,f,d=n(this.options.reversedStacks,!0),g=a.length,h;if(!this.isXAxis){this.usePercentage=!1;for(h=g;h--;)a[d?h:g-h-1].setStackedPoints();for(h=g;h--;)f=a[d?h:g-h-1],f.setStackCliffs&&
f.setStackCliffs();if(this.usePercentage)for(h=0;h<g;h++)a[h].setPercentStacks()}};z.prototype.renderStackTotals=function(){var a=this.chart,f=a.renderer,d=this.stacks,g,h,n=this.stackTotalGroup;n||(this.stackTotalGroup=n=f.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());n.translate(a.plotLeft,a.plotTop);for(g in d)for(h in a=d[g],a)a[h].render(n)};z.prototype.resetStacks=function(){var a=this.stacks,f,d;if(!this.isXAxis)for(f in a)for(d in a[f])a[f][d].touched<this.stacksTouched?(a[f][d].destroy(),
delete a[f][d]):(a[f][d].total=null,a[f][d].cum=0)};z.prototype.cleanStacks=function(){var a,f,d;if(!this.isXAxis)for(f in this.oldStacks&&(a=this.stacks=this.oldStacks),a)for(d in a[f])a[f][d].cum=a[f][d].total};a.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var a=this.processedXData,f=this.processedYData,d=[],g=f.length,h=this.options,q=h.threshold,c=h.startFromThreshold?q:0,e=h.stack,h=h.stacking,l=this.stackKey,
u="-"+l,z=this.negStacks,b=this.yAxis,t=b.stacks,y=b.oldStacks,K,x,I,r,G,H,F;b.stacksTouched+=1;for(G=0;G<g;G++)H=a[G],F=f[G],K=this.getStackIndicator(K,H,this.index),r=K.key,I=(x=z&&F<(c?0:q))?u:l,t[I]||(t[I]={}),t[I][H]||(y[I]&&y[I][H]?(t[I][H]=y[I][H],t[I][H].total=null):t[I][H]=new D(b,b.options.stackLabels,x,H,e)),I=t[I][H],null!==F&&(I.points[r]=I.points[this.index]=[n(I.cum,c)],m(I.cum)||(I.base=r),I.touched=b.stacksTouched,0<K.index&&!1===this.singleStacks&&(I.points[r][0]=I.points[this.index+
","+H+",0"][0])),"percent"===h?(x=x?l:u,z&&t[x]&&t[x][H]?(x=t[x][H],I.total=x.total=Math.max(x.total,I.total)+Math.abs(F)||0):I.total=J(I.total+(Math.abs(F)||0))):I.total=J(I.total+(F||0)),I.cum=n(I.cum,c)+(F||0),null!==F&&(I.points[r].push(I.cum),d[G]=I.cum);"percent"===h&&(b.usePercentage=!0);this.stackedYData=d;b.oldStacks={}}};a.prototype.setPercentStacks=function(){var a=this,f=a.stackKey,d=a.yAxis.stacks,g=a.processedXData,n;h([f,"-"+f],function(f){for(var c=g.length,e,h;c--;)if(e=g[c],n=a.getStackIndicator(n,
e,a.index,f),e=(h=d[f]&&d[f][e])&&h.points[n.key])h=h.total?100/h.total:0,e[0]=J(e[0]*h),e[1]=J(e[1]*h),a.stackedYData[c]=e[1]})};a.prototype.getStackIndicator=function(a,f,d,g){!m(a)||a.x!==f||g&&a.key!==g?a={x:f,index:0,key:g}:a.index++;a.key=[d,f,a.index].join();return a}})(M);(function(a){var D=a.addEvent,z=a.animate,F=a.Axis,J=a.createElement,m=a.css,f=a.defined,h=a.each,q=a.erase,n=a.extend,k=a.fireEvent,v=a.inArray,d=a.isNumber,g=a.isObject,w=a.merge,B=a.pick,c=a.Point,e=a.Series,l=a.seriesTypes,
u=a.setAnimation,L=a.splat;n(a.Chart.prototype,{addSeries:function(a,c,d){var b,e=this;a&&(c=B(c,!0),k(e,"addSeries",{options:a},function(){b=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();c&&e.redraw(d)}));return b},addAxis:function(a,c,d,e){var b=c?"xAxis":"yAxis",f=this.options;a=w(a,{index:this[b].length,isX:c});new F(this,a);f[b]=L(f[b]||{});f[b].push(a);B(d,!0)&&this.redraw(e)},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,e=c.loading,f=function(){d&&m(d,{left:b.plotLeft+
"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};d||(b.loadingDiv=d=J("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=J("span",{className:"highcharts-loading-inner"},null,d),D(b,"redraw",f));d.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;m(d,n(e.style,{zIndex:10}));m(b.loadingSpan,e.labelStyle);b.loadingShown||(m(d,{opacity:0,display:""}),z(d,{opacity:e.style.opacity||.5},{duration:e.showDuration||
0}));b.loadingShown=!0;f()},hideLoading:function(){var a=this.options,c=this.loadingDiv;c&&(c.className="highcharts-loading highcharts-loading-hidden",z(c,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){m(c,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireUpdateSeries:["chart.polar","chart.ignoreHiddenSeries","chart.type","colors","plotOptions"],update:function(a,c){var b,e={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},g=a.chart,l,k;if(g){w(!0,this.options.chart,g);"className"in g&&this.setClassName(g.className);if("inverted"in g||"polar"in g)this.propFromSeries(),l=!0;for(b in g)g.hasOwnProperty(b)&&(-1!==v("chart."+b,this.propsRequireUpdateSeries)&&(k=!0),-1!==v(b,this.propsRequireDirtyBox)&&(this.isDirtyBox=!0));"style"in
g&&this.renderer.setStyle(g.style)}for(b in a){if(this[b]&&"function"===typeof this[b].update)this[b].update(a[b],!1);else if("function"===typeof this[e[b]])this[e[b]](a[b]);"chart"!==b&&-1!==v(b,this.propsRequireUpdateSeries)&&(k=!0)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&w(!0,this.options.plotOptions,a.plotOptions);h(["xAxis","yAxis","series"],function(b){a[b]&&h(L(a[b]),function(a){var c=f(a.id)&&this.get(a.id)||this[b][0];c&&c.coll===b&&c.update(a,!1)},this)},this);l&&h(this.axes,
function(a){a.update({},!1)});k&&h(this.series,function(a){a.update({},!1)});a.loading&&w(!0,this.options.loading,a.loading);b=g&&g.width;g=g&&g.height;d(b)&&b!==this.chartWidth||d(g)&&g!==this.chartHeight?this.setSize(b,g):B(c,!0)&&this.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});n(c.prototype,{update:function(a,c,d,e){function b(){f.applyOptions(a);null===f.y&&l&&(f.graphic=l.destroy());g(a,!0)&&(l&&l.element&&a&&a.marker&&a.marker.symbol&&(f.graphic=l.destroy()),a&&a.dataLabels&&
f.dataLabel&&(f.dataLabel=f.dataLabel.destroy()));k=f.index;h.updateParallelArrays(f,k);m.data[k]=g(m.data[k],!0)?f.options:a;h.isDirty=h.isDirtyData=!0;!h.fixedBox&&h.hasCartesianSeries&&(n.isDirtyBox=!0);"point"===m.legendType&&(n.isDirtyLegend=!0);c&&n.redraw(d)}var f=this,h=f.series,l=f.graphic,k,n=h.chart,m=h.options;c=B(c,!0);!1===e?b():f.firePointEvent("update",{options:a},b)},remove:function(a,c){this.series.removePoint(v(this,this.series.data),a,c)}});n(e.prototype,{addPoint:function(a,c,
d,e){var b=this.options,f=this.data,g=this.chart,h=this.xAxis&&this.xAxis.names,l=b.data,k,n,m=this.xData,u,t;c=B(c,!0);k={series:this};this.pointClass.prototype.applyOptions.apply(k,[a]);t=k.x;u=m.length;if(this.requireSorting&&t<m[u-1])for(n=!0;u&&m[u-1]>t;)u--;this.updateParallelArrays(k,"splice",u,0,0);this.updateParallelArrays(k,u);h&&k.name&&(h[t]=k.name);l.splice(u,0,a);n&&(this.data.splice(u,0,null),this.processData());"point"===b.legendType&&this.generatePoints();d&&(f[0]&&f[0].remove?f[0].remove(!1):
(f.shift(),this.updateParallelArrays(k,"shift"),l.shift()));this.isDirtyData=this.isDirty=!0;c&&g.redraw(e)},removePoint:function(a,c,d){var b=this,e=b.data,f=e[a],g=b.points,h=b.chart,l=function(){g&&g.length===e.length&&g.splice(a,1);e.splice(a,1);b.options.data.splice(a,1);b.updateParallelArrays(f||{series:b},"splice",a,1);f&&f.destroy();b.isDirty=!0;b.isDirtyData=!0;c&&h.redraw()};u(d,h);c=B(c,!0);f?f.firePointEvent("remove",null,l):l()},remove:function(a,c,d){function b(){e.destroy();f.isDirtyLegend=
f.isDirtyBox=!0;f.linkSeries();B(a,!0)&&f.redraw(c)}var e=this,f=e.chart;!1!==d?k(e,"remove",null,b):b()},update:function(a,c){var b=this,d=this.chart,e=this.userOptions,f=this.type,g=a.type||e.type||d.options.chart.type,k=l[f].prototype,m=["group","markerGroup","dataLabelsGroup"],u;if(g&&g!==f||void 0!==a.zIndex)m.length=0;h(m,function(a){m[a]=b[a];delete b[a]});a=w(e,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1,null,!1);for(u in k)this[u]=void 0;
n(this,l[g||f].prototype);h(m,function(a){b[a]=m[a]});this.init(d,a);d.linkSeries();B(c,!0)&&d.redraw(!1)}});n(F.prototype,{update:function(a,c){var b=this.chart;a=b.options[this.coll][this.options.index]=w(this.userOptions,a);this.destroy(!0);this.init(b,n(a,{events:void 0}));b.isDirtyBox=!0;B(c,!0)&&b.redraw()},remove:function(a){for(var b=this.chart,c=this.coll,d=this.series,e=d.length;e--;)d[e]&&d[e].remove(!1);q(b.axes,this);q(b[c],this);b.options[c].splice(this.options.index,1);h(b[c],function(a,
b){a.options.index=b});this.destroy();b.isDirtyBox=!0;B(a,!0)&&b.redraw()},setTitle:function(a,c){this.update({title:a},c)},setCategories:function(a,c){this.update({categories:a},c)}})})(M);(function(a){var D=a.color,z=a.each,F=a.map,J=a.pick,m=a.Series,f=a.seriesType;f("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(){var a=[],f=[],n=this.xAxis,k=this.yAxis,m=k.stacks[this.stackKey],d={},g=this.points,w=this.index,B=k.series,c=B.length,e,l=J(k.options.reversedStacks,
!0)?1:-1,u,L;if(this.options.stacking){for(u=0;u<g.length;u++)d[g[u].x]=g[u];for(L in m)null!==m[L].total&&f.push(L);f.sort(function(a,c){return a-c});e=F(B,function(){return this.visible});z(f,function(b,g){var h=0,t,q;if(d[b]&&!d[b].isNull)a.push(d[b]),z([-1,1],function(a){var h=1===a?"rightNull":"leftNull",k=0,n=m[f[g+a]];if(n)for(u=w;0<=u&&u<c;)t=n.points[u],t||(u===w?d[b][h]=!0:e[u]&&(q=m[b].points[u])&&(k-=q[1]-q[0])),u+=l;d[b][1===a?"rightCliff":"leftCliff"]=k});else{for(u=w;0<=u&&u<c;){if(t=
m[b].points[u]){h=t[1];break}u+=l}h=k.toPixels(h,!0);a.push({isNull:!0,plotX:n.toPixels(b,!0),plotY:h,yBottom:h})}})}return a},getGraphPath:function(a){var f=m.prototype.getGraphPath,h=this.options,k=h.stacking,v=this.yAxis,d,g,w=[],B=[],c=this.index,e,l=v.stacks[this.stackKey],u=h.threshold,z=v.getThreshold(h.threshold),b,h=h.connectNulls||"percent"===k,t=function(b,d,f){var g=a[b];b=k&&l[g.x].points[c];var h=g[f+"Null"]||0;f=g[f+"Cliff"]||0;var n,m,g=!0;f||h?(n=(h?b[0]:b[1])+f,m=b[0]+f,g=!!h):!k&&
a[d]&&a[d].isNull&&(n=m=u);void 0!==n&&(B.push({plotX:e,plotY:null===n?z:v.getThreshold(n),isNull:g}),w.push({plotX:e,plotY:null===m?z:v.getThreshold(m),doCurve:!1}))};a=a||this.points;k&&(a=this.getStackPoints());for(d=0;d<a.length;d++)if(g=a[d].isNull,e=J(a[d].rectPlotX,a[d].plotX),b=J(a[d].yBottom,z),!g||h)h||t(d,d-1,"left"),g&&!k&&h||(B.push(a[d]),w.push({x:d,plotX:e,plotY:b})),h||t(d,d+1,"right");d=f.call(this,B,!0,!0);w.reversed=!0;g=f.call(this,w,!0,!0);g.length&&(g[0]="L");g=d.concat(g);f=
f.call(this,B,!1,h);g.xMap=d.xMap;this.areaPath=g;return f},drawGraph:function(){this.areaPath=[];m.prototype.drawGraph.apply(this);var a=this,f=this.areaPath,n=this.options,k=[["area","highcharts-area",this.color,n.fillColor]];z(this.zones,function(f,d){k.push(["zone-area-"+d,"highcharts-area highcharts-zone-area-"+d+" "+f.className,f.color||a.color,f.fillColor||n.fillColor])});z(k,function(h){var d=h[0],g=a[d];g?(g.endX=f.xMap,g.animate({d:f})):(g=a[d]=a.chart.renderer.path(f).addClass(h[1]).attr({fill:J(h[3],
D(h[2]).setOpacity(J(n.fillOpacity,.75)).get()),zIndex:0}).add(a.group),g.isArea=!0);g.startX=f.xMap;g.shiftUnit=n.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(M);(function(a){var D=a.extendClass,z=a.merge,F=a.pick,J=a.Series,m=a.seriesTypes;a.defaultPlotOptions.spline=z(a.defaultPlotOptions.line);m.spline=D(J,{type:"spline",getPointSpline:function(a,h,m){var f=h.plotX,k=h.plotY,q=a[m-1];m=a[m+1];var d,g,w,B;if(q&&!q.isNull&&!1!==q.doCurve&&m&&!m.isNull&&!1!==m.doCurve){a=q.plotY;
w=m.plotX;m=m.plotY;var c=0;d=(1.5*f+q.plotX)/2.5;g=(1.5*k+a)/2.5;w=(1.5*f+w)/2.5;B=(1.5*k+m)/2.5;w!==d&&(c=(B-g)*(w-f)/(w-d)+k-B);g+=c;B+=c;g>a&&g>k?(g=Math.max(a,k),B=2*k-g):g<a&&g<k&&(g=Math.min(a,k),B=2*k-g);B>m&&B>k?(B=Math.max(m,k),g=2*k-B):B<m&&B<k&&(B=Math.min(m,k),g=2*k-B);h.rightContX=w;h.rightContY=B}h=["C",F(q.rightContX,q.plotX),F(q.rightContY,q.plotY),F(d,f),F(g,k),f,k];q.rightContX=q.rightContY=null;return h}})})(M);(function(a){var D=a.seriesTypes.area.prototype,z=a.seriesType;z("areaspline",
"spline",a.defaultPlotOptions.area,{getStackPoints:D.getStackPoints,getGraphPath:D.getGraphPath,setStackCliffs:D.setStackCliffs,drawGraph:D.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(M);(function(a){var D=a.animObject,z=a.color,F=a.each,J=a.extend,m=a.isNumber,f=a.merge,h=a.pick,q=a.Series,n=a.seriesType,k=a.stop,v=a.svg;n("column","line",{borderRadius:0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,
shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){q.prototype.init.apply(this,arguments);var a=this,f=a.chart;f.hasRendered&&F(f.series,function(d){d.type===a.type&&(d.isDirty=!0)})},getColumnMetrics:function(){var a=
this,f=a.options,k=a.xAxis,m=a.yAxis,c=k.reversed,e,l={},n=0;!1===f.grouping?n=1:F(a.chart.series,function(b){var c=b.options,d=b.yAxis,f;b.type===a.type&&b.visible&&m.len===d.len&&m.pos===d.pos&&(c.stacking?(e=b.stackKey,void 0===l[e]&&(l[e]=n++),f=l[e]):!1!==c.grouping&&(f=n++),b.columnIndex=f)});var q=Math.min(Math.abs(k.transA)*(k.ordinalSlope||f.pointRange||k.closestPointRange||k.tickInterval||1),k.len),b=q*f.groupPadding,t=(q-2*b)/n,f=Math.min(f.maxPointWidth||k.len,h(f.pointWidth,t*(1-2*f.pointPadding)));
a.columnMetrics={width:f,offset:(t-f)/2+(b+((a.columnIndex||0)+(c?1:0))*t-q/2)*(c?-1:1)};return a.columnMetrics},crispCol:function(a,f,h,k){var c=this.chart,d=this.borderWidth,g=-(d%2?.5:0),d=d%2?.5:1;c.inverted&&c.renderer.isVML&&(d+=1);h=Math.round(a+h)+g;a=Math.round(a)+g;k=Math.round(f+k)+d;g=.5>=Math.abs(f)&&.5<k;f=Math.round(f)+d;k-=f;g&&k&&(--f,k+=1);return{x:a,y:f,width:h-a,height:k}},translate:function(){var a=this,f=a.chart,k=a.options,m=a.dense=2>a.closestPointRange*a.xAxis.transA,m=a.borderWidth=
h(k.borderWidth,m?0:1),c=a.yAxis,e=a.translatedThreshold=c.getThreshold(k.threshold),l=h(k.minPointLength,5),n=a.getColumnMetrics(),v=n.width,b=a.barW=Math.max(v,1+2*m),t=a.pointXOffset=n.offset;f.inverted&&(e-=.5);k.pointPadding&&(b=Math.ceil(b));q.prototype.translate.apply(a);F(a.points,function(d){var g=h(d.yBottom,e),k=999+Math.abs(g),k=Math.min(Math.max(-k,d.plotY),c.len+k),m=d.plotX+t,n=b,u=Math.min(k,g),q,y=Math.max(k,g)-u;Math.abs(y)<l&&l&&(y=l,q=!c.reversed&&!d.negative||c.reversed&&d.negative,
u=Math.abs(u-e)>l?g-l:e-(q?l:0));d.barX=m;d.pointWidth=v;d.tooltipPos=f.inverted?[c.len+c.pos-f.plotLeft-k,a.xAxis.len-m-n/2,y]:[m+n/2,k+c.pos-f.plotTop,y];d.shapeType="rect";d.shapeArgs=a.crispCol.apply(a,d.isNull?[d.plotX,c.len/2,0,0]:[m,u,n,y])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,f){var d=this.options,g=this.pointAttrToOptions||{},c=g.stroke||
"borderColor",e=g["stroke-width"]||"borderWidth",h=a&&a.color||this.color,k=a[c]||d[c]||this.color||h,g=d.dashStyle,m;a&&this.zones.length&&(h=(h=a.getZone())&&h.color||a.options.color||this.color);f&&(f=d.states[f],m=f.brightness,h=f.color||void 0!==m&&z(h).brighten(f.brightness).get()||h,k=f[c]||k,g=f.dashStyle||g);a={fill:h,stroke:k,"stroke-width":a[e]||d[e]||this[e]||0};d.borderRadius&&(a.r=d.borderRadius);g&&(a.dashstyle=g);return a},drawPoints:function(){var a=this,g=this.chart,h=a.options,
n=g.renderer,c=h.animationLimit||250,e;F(a.points,function(d){var l=d.graphic;m(d.plotY)&&null!==d.y?(e=d.shapeArgs,l?(k(l),l[g.pointCount<c?"animate":"attr"](f(e))):d.graphic=l=n[d.shapeType](e).attr({"class":d.getClassName()}).add(d.group||a.group),l.attr(a.pointAttribs(d,d.selected&&"select")).shadow(h.shadow,null,h.stacking&&!h.borderRadius)):l&&(d.graphic=l.destroy())})},animate:function(a){var d=this,f=this.yAxis,h=d.options,c=this.chart.inverted,e={};v&&(a?(e.scaleY=.001,a=Math.min(f.pos+f.len,
Math.max(f.pos,f.toPixels(h.threshold))),c?e.translateX=a-f.len:e.translateY=a,d.group.attr(e)):(e[c?"translateX":"translateY"]=f.pos,d.group.animate(e,J(D(d.options.animation),{step:function(a,c){d.group.attr({scaleY:Math.max(.001,c.pos)})}})),d.animate=null))},remove:function(){var a=this,f=a.chart;f.hasRendered&&F(f.series,function(d){d.type===a.type&&(d.isDirty=!0)});q.prototype.remove.apply(a,arguments)}})})(M);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(M);(function(a){var D=
a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,kdDimensions:2,drawGraph:function(){this.options.lineWidth&&
D.prototype.drawGraph.call(this)}})})(M);(function(a){var D=a.pick,z=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,J=this.chart,m=2*(a.slicedOffset||0),f=J.plotWidth-2*m,J=J.plotHeight-2*m,h=a.center,h=[D(h[0],"50%"),D(h[1],"50%"),a.size||"100%",a.innerSize||0],q=Math.min(f,J),n,k;for(n=0;4>n;++n)k=h[n],a=2>n||2===n&&/%$/.test(k),h[n]=z(k,[f,J,q,h[2]][n])+(a?m:0);h[3]>h[2]&&(h[3]=h[2]);return h}}})(M);(function(a){var D=a.addEvent,z=a.defined,F=a.each,J=a.extend,
m=a.inArray,f=a.noop,h=a.pick,q=a.Point,n=a.Series,k=a.seriesType,v=a.setAnimation;k("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return null===this.y?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,
noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var d=this,f=d.points,h=d.startAngleRad;a||(F(f,function(a){var c=a.graphic,f=a.shapeArgs;c&&(c.attr({r:a.startR||d.center[3]/2,start:h,end:h}),c.animate({r:f.r,start:f.start,end:f.end},d.options.animation))}),d.animate=null)},updateTotals:function(){var a,f=0,h=this.points,k=h.length,c,e=this.options.ignoreHiddenPoint;for(a=0;a<k;a++)c=h[a],0>c.y&&
(c.y=null),f+=e&&!c.visible?0:c.y;this.total=f;for(a=0;a<k;a++)c=h[a],c.percentage=0<f&&(c.visible||!e)?c.y/f*100:0,c.total=f},generatePoints:function(){n.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var d=0,f=this.options,k=f.slicedOffset,c=k+(f.borderWidth||0),e,l,m,n=f.startAngle||0,b=this.startAngleRad=Math.PI/180*(n-90),n=(this.endAngleRad=Math.PI/180*(h(f.endAngle,n+360)-90))-b,t=this.points,q=f.dataLabels.distance,f=f.ignoreHiddenPoint,
v,x=t.length,I;a||(this.center=a=this.getCenter());this.getX=function(b,c){m=Math.asin(Math.min((b-a[1])/(a[2]/2+q),1));return a[0]+(c?-1:1)*Math.cos(m)*(a[2]/2+q)};for(v=0;v<x;v++){I=t[v];e=b+d*n;if(!f||I.visible)d+=I.percentage/100;l=b+d*n;I.shapeType="arc";I.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*e)/1E3,end:Math.round(1E3*l)/1E3};m=(l+e)/2;m>1.5*Math.PI?m-=2*Math.PI:m<-Math.PI/2&&(m+=2*Math.PI);I.slicedTranslation={translateX:Math.round(Math.cos(m)*k),translateY:Math.round(Math.sin(m)*
k)};e=Math.cos(m)*a[2]/2;l=Math.sin(m)*a[2]/2;I.tooltipPos=[a[0]+.7*e,a[1]+.7*l];I.half=m<-Math.PI/2||m>Math.PI/2?1:0;I.angle=m;c=Math.min(c,q/5);I.labelPos=[a[0]+e+Math.cos(m)*q,a[1]+l+Math.sin(m)*q,a[0]+e+Math.cos(m)*c,a[1]+l+Math.sin(m)*c,a[0]+e,a[1]+l,0>q?"center":I.half?"right":"left",m]}},drawGraph:null,drawPoints:function(){var a=this,f=a.chart.renderer,h,k,c,e,l=a.options.shadow;l&&!a.shadowGroup&&(a.shadowGroup=f.g("shadow").add(a.group));F(a.points,function(d){if(null!==d.y){k=d.graphic;
e=d.shapeArgs;h=d.sliced?d.slicedTranslation:{};var g=d.shadowGroup;l&&!g&&(g=d.shadowGroup=f.g("shadow").add(a.shadowGroup));g&&g.attr(h);c=a.pointAttribs(d,d.selected&&"select");k?k.setRadialReference(a.center).attr(c).animate(J(e,h)):(d.graphic=k=f[d.shapeType](e).addClass(d.getClassName()).setRadialReference(a.center).attr(h).add(a.group),d.visible||k.attr({visibility:"hidden"}),k.attr(c).attr({"stroke-linejoin":"round"}).shadow(l,g))}})},searchPoint:f,sortByAngle:function(a,f){a.sort(function(a,
d){return void 0!==a.angle&&(d.angle-a.angle)*f})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:a.CenteredSeriesMixin.getCenter,getSymbol:f},{init:function(){q.prototype.init.apply(this,arguments);var a=this,f;a.name=h(a.name,"Slice");f=function(d){a.slice("select"===d.type)};D(a,"select",f);D(a,"unselect",f);return a},setVisible:function(a,f){var d=this,g=d.series,c=g.chart,e=g.options.ignoreHiddenPoint;f=h(f,e);a!==d.visible&&(d.visible=d.options.visible=a=void 0===a?!d.visible:
a,g.options.data[m(d,g.data)]=d.options,F(["graphic","dataLabel","connector","shadowGroup"],function(c){if(d[c])d[c][a?"show":"hide"](!0)}),d.legendItem&&c.legend.colorizeItem(d,a),a||"hover"!==d.state||d.setState(""),e&&(g.isDirty=!0),f&&c.redraw())},slice:function(a,f,k){var d=this.series;v(k,d.chart);h(f,!0);this.sliced=this.options.sliced=a=z(a)?a:!this.sliced;d.options.data[m(this,d.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&
this.shadowGroup.animate(a)},haloPath:function(a){var d=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(d.x,d.y,d.r+a,d.r+a,{innerR:this.shapeArgs.r,start:d.start,end:d.end})}})})(M);(function(a){var D=a.addEvent,z=a.arrayMax,F=a.defined,J=a.each,m=a.extend,f=a.format,h=a.map,q=a.merge,n=a.noop,k=a.pick,v=a.relativeLength,d=a.Series,g=a.seriesTypes,w=a.stableSort,B=a.stop;a.distribute=function(a,d){function c(a,b){return a.target-b.target}var e,f=!0,b=a,
g=[],k;k=0;for(e=a.length;e--;)k+=a[e].size;if(k>d){w(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(k=e=0;k<=d;)k+=a[e].size,e++;g=a.splice(e-1,a.length)}w(a,c);for(a=h(a,function(a){return{size:a.size,targets:[a.target]}});f;){for(e=a.length;e--;)f=a[e],k=(Math.min.apply(0,f.targets)+Math.max.apply(0,f.targets))/2,f.pos=Math.min(Math.max(0,k-f.size/2),d-f.size);e=a.length;for(f=!1;e--;)0<e&&a[e-1].pos+a[e-1].size>a[e].pos&&(a[e-1].size+=a[e].size,a[e-1].targets=a[e-1].targets.concat(a[e].targets),
a[e-1].pos+a[e-1].size>d&&(a[e-1].pos=d-a[e-1].size),a.splice(e,1),f=!0)}e=0;J(a,function(a){var c=0;J(a.targets,function(){b[e].pos=a.pos+c;c+=b[e].size;e++})});b.push.apply(b,g);w(b,c)};d.prototype.drawDataLabels=function(){var a=this,d=a.options,g=d.dataLabels,h=a.points,n,b,t=a.hasRendered||0,y,v,x=k(g.defer,!0),w=a.chart.renderer;if(g.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(g),v=a.plotGroup("dataLabelsGroup","data-labels",x&&!t?"hidden":"visible",g.zIndex||6),x&&(v.attr({opacity:+t}),
t||D(a,"afterAnimate",function(){a.visible&&v.show(!0);v[d.animation?"animate":"attr"]({opacity:1},{duration:200})})),b=g,J(h,function(c){var e,h=c.dataLabel,l,t,r=c.connector,u=!0,x,I={};n=c.dlOptions||c.options&&c.options.dataLabels;e=k(n&&n.enabled,b.enabled)&&null!==c.y;if(h&&!e)c.dataLabel=h.destroy();else if(e){g=q(b,n);x=g.style;e=g.rotation;l=c.getLabelConfig();y=g.format?f(g.format,l):g.formatter.call(l,g);x.color=k(g.color,x.color,a.color,"#000000");if(h)F(y)?(h.attr({text:y}),u=!1):(c.dataLabel=
h=h.destroy(),r&&(c.connector=r.destroy()));else if(F(y)){h={fill:g.backgroundColor,stroke:g.borderColor,"stroke-width":g.borderWidth,r:g.borderRadius||0,rotation:e,padding:g.padding,zIndex:1};"contrast"===x.color&&(I.color=g.inside||0>g.distance||d.stacking?w.getContrast(c.color||a.color):"#000000");d.cursor&&(I.cursor=d.cursor);for(t in h)void 0===h[t]&&delete h[t];h=c.dataLabel=w[e?"text":"label"](y,0,-9999,g.shape,null,null,g.useHTML,null,"data-label").attr(h);h.addClass("highcharts-data-label-color-"+
c.colorIndex+" "+(g.className||""));h.css(m(x,I));h.add(v);h.shadow(g.shadow)}h&&a.alignDataLabel(c,h,g,null,u)}})};d.prototype.alignDataLabel=function(a,d,f,g,h){var b=this.chart,c=b.inverted,e=k(a.plotX,-9999),l=k(a.plotY,-9999),n=d.getBBox(),q,r=f.rotation,u=f.align,v=this.visible&&(a.series.forceDL||b.isInsidePlot(e,Math.round(l),c)||g&&b.isInsidePlot(e,c?g.x+1:g.y+g.height-1,c)),w="justify"===k(f.overflow,"justify");v&&(q=f.style.fontSize,q=b.renderer.fontMetrics(q,d).b,g=m({x:c?b.plotWidth-
l:e,y:Math.round(c?b.plotHeight-e:l),width:0,height:0},g),m(f,{width:n.width,height:n.height}),r?(w=!1,c=b.renderer.rotCorr(q,r),c={x:g.x+f.x+g.width/2+c.x,y:g.y+f.y+{top:0,middle:.5,bottom:1}[f.verticalAlign]*g.height},d[h?"attr":"animate"](c).attr({align:u}),e=(r+720)%360,e=180<e&&360>e,"left"===u?c.y-=e?n.height:0:"center"===u?(c.x-=n.width/2,c.y-=n.height/2):"right"===u&&(c.x-=n.width,c.y-=e?0:n.height)):(d.align(f,null,g),c=d.alignAttr),w?this.justifyDataLabel(d,f,c,n,g,h):k(f.crop,!0)&&(v=b.isInsidePlot(c.x,
c.y)&&b.isInsidePlot(c.x+n.width,c.y+n.height)),f.shape&&!r&&d.attr({anchorX:a.plotX,anchorY:a.plotY}));v||(B(d),d.attr({y:-9999}),d.placed=!1)};d.prototype.justifyDataLabel=function(a,d,f,g,h,b){var c=this.chart,e=d.align,k=d.verticalAlign,l,m,n=a.box?0:a.padding||0;l=f.x+n;0>l&&("right"===e?d.align="left":d.x=-l,m=!0);l=f.x+g.width-n;l>c.plotWidth&&("left"===e?d.align="right":d.x=c.plotWidth-l,m=!0);l=f.y+n;0>l&&("bottom"===k?d.verticalAlign="top":d.y=-l,m=!0);l=f.y+g.height-n;l>c.plotHeight&&("top"===
k?d.verticalAlign="bottom":d.y=c.plotHeight-l,m=!0);m&&(a.placed=!b,a.align(d,null,h))};g.pie&&(g.pie.prototype.drawDataLabels=function(){var c=this,e=c.data,f,g=c.chart,m=c.options.dataLabels,b=k(m.connectorPadding,10),n=k(m.connectorWidth,1),q=g.plotWidth,v=g.plotHeight,x,w=m.distance,r=c.center,B=r[2]/2,H=r[1],D=0<w,p,A,F,O,C=[[],[]],E,M,Q,R,T=[0,0,0,0];c.visible&&(m.enabled||c._hasPointLabels)&&(d.prototype.drawDataLabels.apply(c),J(e,function(a){a.dataLabel&&a.visible&&(C[a.half].push(a),a.dataLabel._pos=
null)}),J(C,function(d,e){var k,l,n=d.length,t,u,x;if(n)for(c.sortByAngle(d,e-.5),0<w&&(k=Math.max(0,H-B-w),l=Math.min(H+B+w,g.plotHeight),t=h(d,function(a){if(a.dataLabel)return x=a.dataLabel.getBBox().height||21,{target:a.labelPos[1]-k+x/2,size:x,rank:a.y}}),a.distribute(t,l+x-k)),R=0;R<n;R++)f=d[R],F=f.labelPos,p=f.dataLabel,Q=!1===f.visible?"hidden":"inherit",u=F[1],t?void 0===t[R].pos?Q="hidden":(O=t[R].size,M=k+t[R].pos):M=u,E=m.justify?r[0]+(e?-1:1)*(B+w):c.getX(M<k+2||M>l-2?u:M,e),p._attr=
{visibility:Q,align:F[6]},p._pos={x:E+m.x+({left:b,right:-b}[F[6]]||0),y:M+m.y-10},F.x=E,F.y=M,null===c.options.size&&(A=p.width,E-A<b?T[3]=Math.max(Math.round(A-E+b),T[3]):E+A>q-b&&(T[1]=Math.max(Math.round(E+A-q+b),T[1])),0>M-O/2?T[0]=Math.max(Math.round(-M+O/2),T[0]):M+O/2>v&&(T[2]=Math.max(Math.round(M+O/2-v),T[2])))}),0===z(T)||this.verifyDataLabelOverflow(T))&&(this.placeDataLabels(),D&&n&&J(this.points,function(a){var b;x=a.connector;if((p=a.dataLabel)&&p._pos&&a.visible){Q=p._attr.visibility;
if(b=!x)a.connector=x=g.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+a.colorIndex).add(c.dataLabelsGroup),x.attr({"stroke-width":n,stroke:m.connectorColor||a.color||"#666666"});x[b?"attr":"animate"]({d:c.connectorPath(a.labelPos)});x.attr("visibility",Q)}else x&&(a.connector=x.destroy())}))},g.pie.prototype.connectorPath=function(a){var c=a.x,d=a.y;return k(this.options.softConnector,!0)?["M",c+("left"===a[6]?5:-5),d,"C",c,d,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],
a[5]]:["M",c+("left"===a[6]?5:-5),d,"L",a[2],a[3],"L",a[4],a[5]]},g.pie.prototype.placeDataLabels=function(){J(this.points,function(a){var c=a.dataLabel;c&&a.visible&&((a=c._pos)?(c.attr(c._attr),c[c.moved?"animate":"attr"](a),c.moved=!0):c&&c.attr({y:-9999}))})},g.pie.prototype.alignDataLabel=n,g.pie.prototype.verifyDataLabelOverflow=function(a){var c=this.center,d=this.options,f=d.center,g=d.minSize||80,b,h;null!==f[0]?b=Math.max(c[2]-Math.max(a[1],a[3]),g):(b=Math.max(c[2]-a[1]-a[3],g),c[0]+=(a[3]-
a[1])/2);null!==f[1]?b=Math.max(Math.min(b,c[2]-Math.max(a[0],a[2])),g):(b=Math.max(Math.min(b,c[2]-a[0]-a[2]),g),c[1]+=(a[0]-a[2])/2);b<c[2]?(c[2]=b,c[3]=Math.min(v(d.innerSize||0,b),b),this.translate(c),this.drawDataLabels&&this.drawDataLabels()):h=!0;return h});g.column&&(g.column.prototype.alignDataLabel=function(a,e,f,g,h){var b=this.chart.inverted,c=a.series,l=a.dlBox||a.shapeArgs,m=k(a.below,a.plotY>k(this.translatedThreshold,c.yAxis.len)),n=k(f.inside,!!this.options.stacking);l&&(g=q(l),0>
g.y&&(g.height+=g.y,g.y=0),l=g.y+g.height-c.yAxis.len,0<l&&(g.height-=l),b&&(g={x:c.yAxis.len-g.y-g.height,y:c.xAxis.len-g.x-g.width,width:g.height,height:g.width}),n||(b?(g.x+=m?0:g.width,g.width=0):(g.y+=m?g.height:0,g.height=0)));f.align=k(f.align,!b||n?"center":m?"right":"left");f.verticalAlign=k(f.verticalAlign,b||n?"middle":m?"top":"bottom");d.prototype.alignDataLabel.call(this,a,e,f,g,h)})})(M);(function(a){var D=a.Chart,z=a.each,F=a.pick,J=a.addEvent;D.prototype.callbacks.push(function(a){function f(){var f=
[];z(a.series,function(a){var h=a.options.dataLabels,k=a.dataLabelCollections||["dataLabel"];(h.enabled||a._hasPointLabels)&&!h.allowOverlap&&a.visible&&z(k,function(h){z(a.points,function(a){a[h]&&(a[h].labelrank=F(a.labelrank,a.shapeArgs&&a.shapeArgs.height),f.push(a[h]))})})});a.hideOverlappingLabels(f)}f();J(a,"redraw",f)});D.prototype.hideOverlappingLabels=function(a){var f=a.length,h,m,n,k,v,d,g,w,B,c=function(a,c,d,f,b,g,h,k){return!(b>a+d||b+h<a||g>c+f||g+k<c)};for(m=0;m<f;m++)if(h=a[m])h.oldOpacity=
h.opacity,h.newOpacity=1;a.sort(function(a,c){return(c.labelrank||0)-(a.labelrank||0)});for(m=0;m<f;m++)for(n=a[m],h=m+1;h<f;++h)if(k=a[h],n&&k&&n.placed&&k.placed&&0!==n.newOpacity&&0!==k.newOpacity&&(v=n.alignAttr,d=k.alignAttr,g=n.parentGroup,w=k.parentGroup,B=2*(n.box?0:n.padding),v=c(v.x+g.translateX,v.y+g.translateY,n.width-B,n.height-B,d.x+w.translateX,d.y+w.translateY,k.width-B,k.height-B)))(n.labelrank<k.labelrank?n:k).newOpacity=0;z(a,function(a){var c,d;a&&(d=a.newOpacity,a.oldOpacity!==
d&&a.placed&&(d?a.show(!0):c=function(){a.hide()},a.alignAttr.opacity=d,a[a.isOld?"animate":"attr"](a.alignAttr,null,c)),a.isOld=!0)})}})(M);(function(a){var D=a.addEvent,z=a.Chart,F=a.createElement,J=a.css,m=a.defaultOptions,f=a.defaultPlotOptions,h=a.each,q=a.extend,n=a.fireEvent,k=a.hasTouch,v=a.inArray,d=a.isObject,g=a.Legend,w=a.merge,B=a.pick,c=a.Point,e=a.Series,l=a.seriesTypes,u=a.svg,L;L=a.TrackerMixin={drawTrackerPoint:function(){var a=this,c=a.chart,d=c.pointer,e=function(a){for(var b=
a.target,d;b&&!d;)d=b.point,b=b.parentNode;if(void 0!==d&&d!==c.hoverPoint)d.onMouseOver(a)};h(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.element.point=a)});a._hasTracking||(h(a.trackerGroups,function(b){if(a[b]){a[b].addClass("highcharts-tracker").on("mouseover",e).on("mouseout",function(a){d.onTrackerMouseOut(a)});if(k)a[b].on("touchstart",e);a.options.cursor&&a[b].css(J).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=
this,c=a.options,d=c.trackByArea,e=[].concat(d?a.areaPath:a.graphPath),f=e.length,g=a.chart,l=g.pointer,m=g.renderer,n=g.options.tooltip.snap,q=a.tracker,p,v=function(){if(g.hoverSeries!==a)a.onMouseOver()},w="rgba(192,192,192,"+(u?.0001:.002)+")";if(f&&!d)for(p=f+1;p--;)"M"===e[p]&&e.splice(p+1,0,e[p+1]-n,e[p+2],"L"),(p&&"M"===e[p]||p===f)&&e.splice(p,0,"L",e[p-2]+n,e[p-1]);q?q.attr({d:e}):a.graph&&(a.tracker=m.path(e).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:w,
fill:d?w:"none","stroke-width":a.graph.strokeWidth()+(d?0:2*n),zIndex:2}).add(a.group),h([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",v).on("mouseout",function(a){l.onTrackerMouseOut(a)});c.cursor&&a.css({cursor:c.cursor});if(k)a.on("touchstart",v)}))}};l.column&&(l.column.prototype.drawTracker=L.drawTrackerPoint);l.pie&&(l.pie.prototype.drawTracker=L.drawTrackerPoint);l.scatter&&(l.scatter.prototype.drawTracker=L.drawTrackerPoint);q(g.prototype,{setItemEvents:function(a,
c,d){var b=this,e=b.chart,f="highcharts-legend-"+(a.series?"point":"series")+"-active";(d?c:a.legendGroup).on("mouseover",function(){a.setState("hover");e.seriesGroup.addClass(f);c.css(b.options.itemHoverStyle)}).on("mouseout",function(){c.css(a.visible?b.itemStyle:b.itemHiddenStyle);e.seriesGroup.removeClass(f);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):n(a,"legendItemClick",b,c)})},
createCheckboxForItem:function(a){a.checkbox=F("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);D(a.checkbox,"click",function(b){n(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});m.legend.itemStyle.cursor="pointer";q(z.prototype,{showResetZoom:function(){var a=this,c=m.lang,d=a.options.chart.resetZoomButton,e=d.theme,f=e.states,g="chart"===d.relativeTo?null:"plotBox";this.resetZoomButton=
a.renderer.button(c.resetZoom,null,null,function(){a.zoomOut()},e,f&&f.hover).attr({align:d.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(d.position,!1,g)},zoomOut:function(){var a=this;n(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,e=!1,f;!a||a.resetSelection?h(this.axes,function(a){b=a.zoom()}):h(a.xAxis.concat(a.yAxis),function(a){var d=a.axis,f=d.isXAxis;if(c[f?"zoomX":"zoomY"]||c[f?"pinchX":"pinchY"])b=
d.zoom(a.min,a.max),d.displayBtn&&(e=!0)});f=this.resetZoomButton;e&&!f?this.showResetZoom():!e&&d(f)&&(this.resetZoomButton=f.destroy());b&&this.redraw(B(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,c){var b=this,d=b.hoverPoints,e;d&&h(d,function(a){a.setState()});h("xy"===c?[1,0]:[1],function(c){c=b[c?"xAxis":"yAxis"][0];var d=c.horiz,f=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",g=b[d],h=(c.pointRange||0)/2,k=c.getExtremes(),l=c.toValue(g-f,!0)+h,h=
c.toValue(g+c.len-f,!0)-h,g=g>f;c.series.length&&(g||l>Math.min(k.dataMin,k.min))&&(!g||h<Math.max(k.dataMax,k.max))&&(c.setExtremes(l,h,!1,!1,{trigger:"pan"}),e=!0);b[d]=f});e&&b.redraw(!1);J(b.container,{cursor:"move"})}});q(c.prototype,{select:function(a,c){var b=this,d=b.series,e=d.chart;a=B(a,!b.selected);b.firePointEvent(a?"select":"unselect",{accumulate:c},function(){b.selected=b.options.selected=a;d.options.data[v(b,d.data)]=b.options;b.setState(a&&"select");c||h(e.getSelectedPoints(),function(a){a.selected&&
a!==b&&(a.selected=a.options.selected=!1,d.options.data[v(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a,c){var b=this.series,d=b.chart,e=d.tooltip,f=d.hoverPoint;if(this.series){if(!c){if(f&&f!==this)f.onMouseOut();if(d.hoverSeries!==b)b.onMouseOver();d.hoverPoint=this}!e||e.shared&&!b.noSharedTooltip?e||this.setState("hover"):(this.setState("hover"),e.refresh(this,a));this.firePointEvent("mouseOver")}},onMouseOut:function(){var a=this.series.chart,
c=a.hoverPoints;this.firePointEvent("mouseOut");c&&-1!==v(this,c)||(this.setState(),a.hoverPoint=null)},importEvents:function(){if(!this.hasImportedEvents){var a=w(this.series.options.point,this.options).events,c;this.events=a;for(c in a)D(this,c,a[c]);this.hasImportedEvents=!0}},setState:function(b,c){var d=Math.floor(this.plotX),e=this.plotY,g=this.series,h=g.options.states[b]||{},k=f[g.type].marker&&g.options.marker,l=k&&!1===k.enabled,m=k&&k.states&&k.states[b]||{},n=!1===m.enabled,p=g.stateMarkerGraphic,
t=this.marker||{},u=g.chart,v=g.halo,w;b=b||"";if(!(b===this.state&&!c||this.selected&&"select"!==b||!1===h.enabled||b&&(n||l&&!1===m.enabled)||b&&t.states&&t.states[b]&&!1===t.states[b].enabled)){k&&g.markerAttribs&&(w=g.markerAttribs(this,b));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),b&&this.graphic.addClass("highcharts-point-"+b),this.graphic.attr(g.pointAttribs(this,b)),w&&this.graphic.animate(w,B(u.options.chart.animation,m.animation,k.animation)),p&&
p.hide();else{if(b&&m){k=t.symbol||g.symbol;p&&p.currentSymbol!==k&&(p=p.destroy());if(p)p[c?"animate":"attr"]({x:w.x,y:w.y});else k&&(g.stateMarkerGraphic=p=u.renderer.symbol(k,w.x,w.y,w.width,w.height).add(g.markerGroup),p.currentSymbol=k);p&&p.attr(g.pointAttribs(this,b))}p&&(p[b&&u.isInsidePlot(d,e,u.inverted)?"show":"hide"](),p.element.point=this)}(d=h.halo)&&d.size?(v||(g.halo=v=u.renderer.path().add(g.markerGroup||g.group)),a.stop(v),v[c?"animate":"attr"]({d:this.haloPath(d.size)}),v.attr({"class":"highcharts-halo highcharts-color-"+
B(this.colorIndex,g.colorIndex)}),v.attr(q({fill:this.color||g.color,"fill-opacity":d.opacity,zIndex:-1},d.attributes))):v&&v.animate({d:this.haloPath(0)});this.state=b}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});q(e.prototype,{onMouseOver:function(){var a=this.chart,c=a.hoverSeries;if(c&&c!==this)c.onMouseOut();this.options.events.mouseOver&&n(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=
this.options,c=this.chart,d=c.tooltip,e=c.hoverPoint;c.hoverSeries=null;if(e)e.onMouseOut();this&&a.events.mouseOut&&n(this,"mouseOut");!d||a.stickyTracking||d.shared&&!this.noSharedTooltip||d.hide();this.setState()},setState:function(a){var b=this,c=b.options,d=b.graph,e=c.states,f=c.lineWidth,c=0;a=a||"";if(b.state!==a&&(h([b.group,b.markerGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!e[a]||!1!==e[a].enabled)&&(a&&
(f=e[a].lineWidth||f+(e[a].lineWidthPlus||0)),d&&!d.dashstyle))for(e={"stroke-width":f},d.attr(e);b["zone-graph-"+c];)b["zone-graph-"+c].attr(e),c+=1},setVisible:function(a,c){var b=this,d=b.chart,e=b.legendItem,f,g=d.options.chart.ignoreHiddenSeries,k=b.visible;f=(b.visible=a=b.options.visible=b.userOptions.visible=void 0===a?!k:a)?"show":"hide";h(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(b[a])b[a][f]()});if(d.hoverSeries===b||(d.hoverPoint&&d.hoverPoint.series)===b)b.onMouseOut();
e&&d.legend.colorizeItem(b,a);b.isDirty=!0;b.options.stacking&&h(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});h(b.linkedSeries,function(b){b.setVisible(a,!1)});g&&(d.isDirtyBox=!0);!1!==c&&d.redraw();n(b,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);n(this,a?"select":"unselect")},drawTracker:L.drawTrackerGraph})})(M);(function(a){var D=a.Chart,
z=a.each,F=a.inArray,J=a.isObject,m=a.pick,f=a.splat;D.prototype.setResponsive=function(a){var f=this.options.responsive;f&&f.rules&&z(f.rules,function(f){this.matchResponsiveRule(f,a)},this)};D.prototype.matchResponsiveRule=function(f,q){var h=this.respRules,k=f.condition,v;v=f.callback||function(){return this.chartWidth<=m(k.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=m(k.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=m(k.minWidth,0)&&this.chartHeight>=m(k.minHeight,0)};void 0===f._id&&(f._id=
a.idCounter++);v=v.call(this);!h[f._id]&&v?f.chartOptions&&(h[f._id]=this.currentOptions(f.chartOptions),this.update(f.chartOptions,q)):h[f._id]&&!v&&(this.update(h[f._id],q),delete h[f._id])};D.prototype.currentOptions=function(a){function h(a,m,d){var g,k;for(g in a)if(-1<F(g,["series","xAxis","yAxis"]))for(a[g]=f(a[g]),d[g]=[],k=0;k<a[g].length;k++)d[g][k]={},h(a[g][k],m[g][k],d[g][k]);else J(a[g])?(d[g]={},h(a[g],m[g]||{},d[g])):d[g]=m[g]||null}var m={};h(a,this.options,m);return m}})(M);return M});
/*
 Highcharts JS v5.0.2 (2016-10-26)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(x){"object"===typeof module&&module.exports?module.exports=x:x(Highcharts)})(function(x){(function(a){function t(a,b,d){this.init(a,b,d)}var u=a.each,w=a.extend,q=a.merge,r=a.splat;w(t.prototype,{init:function(a,b,d){var h=this,k=h.defaultOptions;h.chart=b;h.options=a=q(k,b.angular?{background:{}}:void 0,a);(a=a.background)&&u([].concat(r(a)).reverse(),function(b){var c,k=d.userOptions;c=q(h.defaultBackgroundOptions,b);b.backgroundColor&&(c.backgroundColor=b.backgroundColor);c.color=c.backgroundColor;
d.options.plotBands.unshift(c);k.plotBands=k.plotBands||[];k.plotBands!==d.options.plotBands&&k.plotBands.unshift(c)})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{className:"highcharts-pane",shape:"circle",borderWidth:1,borderColor:"#cccccc",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#ffffff"],[1,"#e6e6e6"]]},from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"}});a.Pane=t})(x);(function(a){var t=a.CenteredSeriesMixin,
u=a.each,w=a.extend,q=a.map,r=a.merge,e=a.noop,b=a.Pane,d=a.pick,h=a.pInt,k=a.splat,n=a.wrap,c,g,l=a.Axis.prototype;a=a.Tick.prototype;c={getOffset:e,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:e,setCategories:e,setTitle:e};g={defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},
defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(b){b=this.options=r(this.defaultOptions,this.defaultRadialOptions,b);b.plotBands||(b.plotBands=[])},getOffset:function(){l.getOffset.call(this);this.chart.axisOffset[this.side]=0;this.center=this.pane.center=
t.getCenter.call(this.pane)},getLinePath:function(b,f){b=this.center;var c=this.chart,h=d(f,b[2]/2-this.offset);this.isCircular||void 0!==f?f=this.chart.renderer.symbols.arc(this.left+b[0],this.top+b[1],h,h,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0}):(f=this.postTranslate(this.angleRad,h),f=["M",b[0]+c.plotLeft,b[1]+c.plotTop,"L",f.x,f.y]);return f},setAxisTranslation:function(){l.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/
(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){if(this.autoConnect=this.isCircular&&void 0===d(this.userMax,this.options.max)&&this.endAngleRad-this.startAngleRad===2*Math.PI)this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0},setAxisSize:function(){l.setAxisSize.call(this);this.isRadial&&(this.center=this.pane.center=t.getCenter.call(this.pane),this.isCircular&&
(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*d(this.sector,1)/2)},getPosition:function(b,f){return this.postTranslate(this.isCircular?this.translate(b):this.angleRad,d(this.isCircular?f:this.translate(b),this.center[2]/2)-this.offset)},postTranslate:function(b,f){var d=this.chart,c=this.center;b=this.startAngleRad+b;return{x:d.plotLeft+c[0]+Math.cos(b)*f,y:d.plotTop+c[1]+Math.sin(b)*f}},getPlotBandPath:function(b,f,c){var k=this.center,p=this.startAngleRad,
l=k[2]/2,m=[d(c.outerRadius,"100%"),c.innerRadius,d(c.thickness,10)],a=Math.min(this.offset,0),g=/%$/,n,e=this.isCircular;"polygon"===this.options.gridLineInterpolation?k=this.getPlotLinePath(b).concat(this.getPlotLinePath(f,!0)):(b=Math.max(b,this.min),f=Math.min(f,this.max),e||(m[0]=this.translate(b),m[1]=this.translate(f)),m=q(m,function(b){g.test(b)&&(b=h(b,10)*l/100);return b}),"circle"!==c.shape&&e?(b=p+this.translate(b),f=p+this.translate(f)):(b=-Math.PI/2,f=1.5*Math.PI,n=!0),m[0]-=a,m[2]-=
a,k=this.chart.renderer.symbols.arc(this.left+k[0],this.top+k[1],m[0],m[0],{start:Math.min(b,f),end:Math.max(b,f),innerR:d(m[1],m[0]-m[2]),open:n}));return k},getPlotLinePath:function(b,f){var d=this,c=d.center,h=d.chart,k=d.getPosition(b),a,l,p;d.isCircular?p=["M",c[0]+h.plotLeft,c[1]+h.plotTop,"L",k.x,k.y]:"circle"===d.options.gridLineInterpolation?(b=d.translate(b))&&(p=d.getLinePath(0,b)):(u(h.xAxis,function(b){b.pane===d.pane&&(a=b)}),p=[],b=d.translate(b),c=a.tickPositions,a.autoConnect&&(c=
c.concat([c[0]])),f&&(c=[].concat(c).reverse()),u(c,function(f,d){l=a.getPosition(f,b);p.push(d?"L":"M",l.x,l.y)}));return p},getTitlePosition:function(){var b=this.center,f=this.chart,d=this.options.title;return{x:f.plotLeft+b[0]+(d.x||0),y:f.plotTop+b[1]-{high:.5,middle:.25,low:0}[d.align]*b[2]+(d.y||0)}}};n(l,"init",function(h,f,a){var l=f.angular,p=f.polar,m=a.isX,n=l&&m,e,A=f.options,q=a.pane||0;if(l){if(w(this,n?c:g),e=!m)this.defaultRadialOptions=this.defaultRadialGaugeOptions}else p&&(w(this,
g),this.defaultRadialOptions=(e=m)?this.defaultRadialXOptions:r(this.defaultYAxisOptions,this.defaultRadialYOptions));l||p?(this.isRadial=!0,f.inverted=!1,A.chart.zoomType=null):this.isRadial=!1;h.call(this,f,a);n||!l&&!p||(h=this.options,f.panes||(f.panes=[]),this.pane=f=f.panes[q]=f.panes[q]||new b(k(A.pane)[q],f,this),f=f.options,this.angleRad=(h.angle||0)*Math.PI/180,this.startAngleRad=(f.startAngle-90)*Math.PI/180,this.endAngleRad=(d(f.endAngle,f.startAngle+360)-90)*Math.PI/180,this.offset=h.offset||
0,this.isCircular=e)});n(l,"autoLabelAlign",function(b){if(!this.isRadial)return b.apply(this,[].slice.call(arguments,1))});n(a,"getPosition",function(b,d,c,h,k){var f=this.axis;return f.getPosition?f.getPosition(c):b.call(this,d,c,h,k)});n(a,"getLabelPosition",function(b,f,c,h,k,a,l,g,n){var m=this.axis,p=a.y,e=20,y=a.align,v=(m.translate(this.pos)+m.startAngleRad+Math.PI/2)/Math.PI*180%360;m.isRadial?(b=m.getPosition(this.pos,m.center[2]/2+d(a.distance,-25)),"auto"===a.rotation?h.attr({rotation:v}):
null===p&&(p=m.chart.renderer.fontMetrics(h.styles.fontSize).b-h.getBBox().height/2),null===y&&(m.isCircular?(this.label.getBBox().width>m.len*m.tickInterval/(m.max-m.min)&&(e=0),y=v>e&&v<180-e?"left":v>180+e&&v<360-e?"right":"center"):y="center",h.attr({align:y})),b.x+=a.x,b.y+=p):b=b.call(this,f,c,h,k,a,l,g,n);return b});n(a,"getMarkPath",function(b,d,c,h,k,a,l){var f=this.axis;f.isRadial?(b=f.getPosition(this.pos,f.center[2]/2+h),d=["M",d,c,"L",b.x,b.y]):d=b.call(this,d,c,h,k,a,l);return d})})(x);
(function(a){var t=a.each,u=a.noop,w=a.pick,q=a.Series,r=a.seriesType,e=a.seriesTypes;r("arearange","area",{lineWidth:1,marker:null,threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0},states:{hover:{halo:!1}}},{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel",
"dataLabelUpper"],toYData:function(b){return[b.low,b.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(b){var d=this.chart,h=this.xAxis.postTranslate(b.rectPlotX,this.yAxis.len-b.plotHigh);b.plotHighX=h.x-d.plotLeft;b.plotHigh=h.y-d.plotTop},translate:function(){var b=this,d=b.yAxis,h=!!b.modifyValue;e.area.prototype.translate.apply(b);t(b.points,function(k){var a=k.low,c=k.high,g=k.plotY;null===c||null===a?k.isNull=!0:(k.plotLow=g,k.plotHigh=d.translate(h?b.modifyValue(c,k):c,0,1,
0,1),h&&(k.yBottom=k.plotHigh))});this.chart.polar&&t(this.points,function(d){b.highToXY(d)})},getGraphPath:function(b){var d=[],h=[],a,n=e.area.prototype.getGraphPath,c,g,l;l=this.options;var p=l.step;b=b||this.points;for(a=b.length;a--;)c=b[a],c.isNull||l.connectEnds||b[a+1]&&!b[a+1].isNull||h.push({plotX:c.plotX,plotY:c.plotY,doCurve:!1}),g={polarPlotY:c.polarPlotY,rectPlotX:c.rectPlotX,yBottom:c.yBottom,plotX:w(c.plotHighX,c.plotX),plotY:c.plotHigh,isNull:c.isNull},h.push(g),d.push(g),c.isNull||
l.connectEnds||b[a-1]&&!b[a-1].isNull||h.push({plotX:c.plotX,plotY:c.plotY,doCurve:!1});b=n.call(this,b);p&&(!0===p&&(p="left"),l.step={left:"right",center:"center",right:"left"}[p]);d=n.call(this,d);h=n.call(this,h);l.step=p;l=[].concat(b,d);this.chart.polar||"M"!==h[0]||(h[0]="L");this.graphPath=l;this.areaPath=this.areaPath.concat(b,h);l.isArea=!0;l.xMap=b.xMap;this.areaPath.xMap=b.xMap;return l},drawDataLabels:function(){var b=this.data,d=b.length,h,a=[],n=q.prototype,c=this.options.dataLabels,
g=c.align,l=c.verticalAlign,p=c.inside,f,m,e=this.chart.inverted;if(c.enabled||this._hasPointLabels){for(h=d;h--;)if(f=b[h])m=p?f.plotHigh<f.plotLow:f.plotHigh>f.plotLow,f.y=f.high,f._plotY=f.plotY,f.plotY=f.plotHigh,a[h]=f.dataLabel,f.dataLabel=f.dataLabelUpper,f.below=m,e?g||(c.align=m?"right":"left"):l||(c.verticalAlign=m?"top":"bottom"),c.x=c.xHigh,c.y=c.yHigh;n.drawDataLabels&&n.drawDataLabels.apply(this,arguments);for(h=d;h--;)if(f=b[h])m=p?f.plotHigh<f.plotLow:f.plotHigh>f.plotLow,f.dataLabelUpper=
f.dataLabel,f.dataLabel=a[h],f.y=f.low,f.plotY=f._plotY,f.below=!m,e?g||(c.align=m?"left":"right"):l||(c.verticalAlign=m?"bottom":"top"),c.x=c.xLow,c.y=c.yLow;n.drawDataLabels&&n.drawDataLabels.apply(this,arguments)}c.align=g;c.verticalAlign=l},alignDataLabel:function(){e.column.prototype.alignDataLabel.apply(this,arguments)},setStackedPoints:u,getSymbol:u,drawPoints:u})})(x);(function(a){var t=a.seriesType;t("areasplinerange","arearange",null,{getPointSpline:a.seriesTypes.spline.prototype.getPointSpline})})(x);
(function(a){var t=a.defaultPlotOptions,u=a.each,w=a.merge,q=a.noop,r=a.pick,e=a.seriesType,b=a.seriesTypes.column.prototype;e("columnrange","arearange",w(t.column,t.arearange,{lineWidth:1,pointRange:null}),{translate:function(){var d=this,h=d.yAxis,a=d.xAxis,n=a.startAngleRad,c,g=d.chart,l=d.xAxis.isRadial,p;b.translate.apply(d);u(d.points,function(b){var f=b.shapeArgs,k=d.options.minPointLength,e,v;b.plotHigh=p=h.translate(b.high,0,1,0,1);b.plotLow=b.plotY;v=p;e=r(b.rectPlotY,b.plotY)-p;Math.abs(e)<
k?(k-=e,e+=k,v-=k/2):0>e&&(e*=-1,v-=e);l?(c=b.barX+n,b.shapeType="path",b.shapeArgs={d:d.polarArc(v+e,v,c,c+b.pointWidth)}):(f.height=e,f.y=v,b.tooltipPos=g.inverted?[h.len+h.pos-g.plotLeft-v-e/2,a.len+a.pos-g.plotTop-f.x-f.width/2,e]:[a.left-g.plotLeft+f.x+f.width/2,h.pos-g.plotTop+v+e/2,e])})},directTouch:!0,trackerGroups:["group","dataLabelsGroup"],drawGraph:q,crispCol:b.crispCol,drawPoints:b.drawPoints,drawTracker:b.drawTracker,getColumnMetrics:b.getColumnMetrics,animate:function(){return b.animate.apply(this,
arguments)},polarArc:function(){return b.polarArc.apply(this,arguments)},pointAttribs:b.pointAttribs})})(x);(function(a){var t=a.each,u=a.isNumber,w=a.merge,q=a.pick,r=a.pInt,e=a.Series,b=a.seriesType,d=a.TrackerMixin;b("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2,borderWidth:1,borderColor:"#cccccc"},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:a.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,
trackerGroups:["group","dataLabelsGroup"],translate:function(){var b=this.yAxis,d=this.options,a=b.center;this.generatePoints();t(this.points,function(c){var h=w(d.dial,c.dial),l=r(q(h.radius,80))*a[2]/200,k=r(q(h.baseLength,70))*l/100,f=r(q(h.rearLength,10))*l/100,m=h.baseWidth||3,n=h.topWidth||1,e=d.overshoot,v=b.startAngleRad+b.translate(c.y,null,null,null,!0);u(e)?(e=e/180*Math.PI,v=Math.max(b.startAngleRad-e,Math.min(b.endAngleRad+e,v))):!1===d.wrap&&(v=Math.max(b.startAngleRad,Math.min(b.endAngleRad,
v)));v=180*v/Math.PI;c.shapeType="path";c.shapeArgs={d:h.path||["M",-f,-m/2,"L",k,-m/2,l,-n/2,l,n/2,k,m/2,-f,m/2,"z"],translateX:a[0],translateY:a[1],rotation:v};c.plotX=a[0];c.plotY=a[1]})},drawPoints:function(){var b=this,d=b.yAxis.center,a=b.pivot,c=b.options,g=c.pivot,l=b.chart.renderer;t(b.points,function(d){var a=d.graphic,h=d.shapeArgs,k=h.d,g=w(c.dial,d.dial);a?(a.animate(h),h.d=k):(d.graphic=l[d.shapeType](h).attr({rotation:h.rotation,zIndex:1}).addClass("highcharts-dial").add(b.group),d.graphic.attr({stroke:g.borderColor||
"none","stroke-width":g.borderWidth||0,fill:g.backgroundColor||"#000000"}))});a?a.animate({translateX:d[0],translateY:d[1]}):(b.pivot=l.circle(0,0,q(g.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(d[0],d[1]).add(b.group),b.pivot.attr({"stroke-width":g.borderWidth||0,stroke:g.borderColor||"#cccccc",fill:g.backgroundColor||"#000000"}))},animate:function(b){var d=this;b||(t(d.points,function(b){var c=b.graphic;c&&(c.attr({rotation:180*d.yAxis.startAngleRad/Math.PI}),c.animate({rotation:b.shapeArgs.rotation},
d.options.animation))}),d.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);e.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(b,d){e.prototype.setData.call(this,b,!1);this.processData();this.generatePoints();q(d,!0)&&this.chart.redraw()},drawTracker:d&&d.drawTrackerPoint},{setState:function(b){this.state=b}})})(x);(function(a){var t=a.each,u=a.noop,w=a.pick,q=a.seriesType,
r=a.seriesTypes;q("boxplot","column",{threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'},whiskerLength:"50%",fillColor:"#ffffff",lineWidth:1,medianWidth:2,states:{hover:{brightness:-.3}},whiskerWidth:2},{pointArrayMap:["low","q1","median",
"q3","high"],toYData:function(a){return[a.low,a.q1,a.median,a.q3,a.high]},pointValKey:"high",pointAttribs:function(a){var b=this.options,d=a&&a.color||this.color;return{fill:a.fillColor||b.fillColor||d,stroke:b.lineColor||d,"stroke-width":b.lineWidth||0}},drawDataLabels:u,translate:function(){var a=this.yAxis,b=this.pointArrayMap;r.column.prototype.translate.apply(this);t(this.points,function(d){t(b,function(b){null!==d[b]&&(d[b+"Plot"]=a.translate(d[b],0,1,0,1))})})},drawPoints:function(){var a=
this,b=a.options,d=a.chart.renderer,h,k,n,c,g,l,p=0,f,m,q,r,v=!1!==a.doQuartiles,u,x=a.options.whiskerLength;t(a.points,function(e){var t=e.graphic,y=t?"animate":"attr",I=e.shapeArgs,z={},B={},G={},H=e.color||a.color;void 0!==e.plotY&&(f=I.width,m=Math.floor(I.x),q=m+f,r=Math.round(f/2),h=Math.floor(v?e.q1Plot:e.lowPlot),k=Math.floor(v?e.q3Plot:e.lowPlot),n=Math.floor(e.highPlot),c=Math.floor(e.lowPlot),t||(e.graphic=t=d.g("point").add(a.group),e.stem=d.path().addClass("highcharts-boxplot-stem").add(t),
x&&(e.whiskers=d.path().addClass("highcharts-boxplot-whisker").add(t)),v&&(e.box=d.path(void 0).addClass("highcharts-boxplot-box").add(t)),e.medianShape=d.path(void 0).addClass("highcharts-boxplot-median").add(t),z.stroke=e.stemColor||b.stemColor||H,z["stroke-width"]=w(e.stemWidth,b.stemWidth,b.lineWidth),z.dashstyle=e.stemDashStyle||b.stemDashStyle,e.stem.attr(z),x&&(B.stroke=e.whiskerColor||b.whiskerColor||H,B["stroke-width"]=w(e.whiskerWidth,b.whiskerWidth,b.lineWidth),e.whiskers.attr(B)),v&&(t=
a.pointAttribs(e),e.box.attr(t)),G.stroke=e.medianColor||b.medianColor||H,G["stroke-width"]=w(e.medianWidth,b.medianWidth,b.lineWidth),e.medianShape.attr(G)),l=e.stem.strokeWidth()%2/2,p=m+r+l,e.stem[y]({d:["M",p,k,"L",p,n,"M",p,h,"L",p,c]}),v&&(l=e.box.strokeWidth()%2/2,h=Math.floor(h)+l,k=Math.floor(k)+l,m+=l,q+=l,e.box[y]({d:["M",m,k,"L",m,h,"L",q,h,"L",q,k,"L",m,k,"z"]})),x&&(l=e.whiskers.strokeWidth()%2/2,n+=l,c+=l,u=/%$/.test(x)?r*parseFloat(x)/100:x/2,e.whiskers[y]({d:["M",p-u,n,"L",p+u,n,
"M",p-u,c,"L",p+u,c]})),g=Math.round(e.medianPlot),l=e.medianShape.strokeWidth()%2/2,g+=l,e.medianShape[y]({d:["M",m,g,"L",q,g]}))})},setStackedPoints:u})})(x);(function(a){var t=a.each,u=a.noop,w=a.seriesType,q=a.seriesTypes;w("errorbar","boxplot",{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},whiskerWidth:null},{type:"errorbar",
pointArrayMap:["low","high"],toYData:function(a){return[a.low,a.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:q.arearange?function(){var a=this.pointValKey;q.arearange.prototype.drawDataLabels.call(this);t(this.data,function(e){e.y=e[a]})}:u,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||q.column.prototype.getColumnMetrics.call(this)}})})(x);(function(a){var t=a.correctFloat,u=a.isNumber,w=a.pick,q=a.Point,r=a.Series,e=a.seriesType,b=a.seriesTypes;
e("waterfall","column",{dataLabels:{inside:!0},lineWidth:1,lineColor:"#333333",dashStyle:"dot",borderColor:"#333333",states:{hover:{lineWidthPlus:0}}},{pointValKey:"y",translate:function(){var d=this.options,a=this.yAxis,k,e,c,g,l,p,f,m,q,r=w(d.minPointLength,5),v=d.threshold,u=d.stacking;b.column.prototype.translate.apply(this);this.minPointLengthOffset=0;f=m=v;e=this.points;k=0;for(d=e.length;k<d;k++)c=e[k],p=this.processedYData[k],g=c.shapeArgs,q=(l=u&&a.stacks[(this.negStacks&&p<v?"-":"")+this.stackKey])?
l[c.x].points[this.index+","+k]:[0,p],c.isSum?c.y=t(p):c.isIntermediateSum&&(c.y=t(p-m)),l=Math.max(f,f+c.y)+q[0],g.y=a.toPixels(l,!0),c.isSum?(g.y=a.toPixels(q[1],!0),g.height=Math.min(a.toPixels(q[0],!0),a.len)-g.y+this.minPointLengthOffset):c.isIntermediateSum?(g.y=a.toPixels(q[1],!0),g.height=Math.min(a.toPixels(m,!0),a.len)-g.y+this.minPointLengthOffset,m=q[1]):(g.height=0<p?a.toPixels(f,!0)-g.y:a.toPixels(f,!0)-a.toPixels(f-p,!0),f+=p),0>g.height&&(g.y+=g.height,g.height*=-1),c.plotY=g.y=Math.round(g.y)-
this.borderWidth%2/2,g.height=Math.max(Math.round(g.height),.001),c.yBottom=g.y+g.height,g.height<=r&&(g.height=r,this.minPointLengthOffset+=r),g.y-=this.minPointLengthOffset,g=c.plotY+(c.negative?g.height:0)-this.minPointLengthOffset,this.chart.inverted?c.tooltipPos[0]=a.len-g:c.tooltipPos[1]=g},processData:function(b){var a=this.yData,d=this.options.data,e,c=a.length,g,l,p,f,m,q;l=g=p=f=this.options.threshold||0;for(q=0;q<c;q++)m=a[q],e=d&&d[q]?d[q]:{},"sum"===m||e.isSum?a[q]=t(l):"intermediateSum"===
m||e.isIntermediateSum?a[q]=t(g):(l+=m,g+=m),p=Math.min(l,p),f=Math.max(l,f);r.prototype.processData.call(this,b);this.dataMin=p;this.dataMax=f},toYData:function(b){return b.isSum?0===b.x?null:"sum":b.isIntermediateSum?0===b.x?null:"intermediateSum":b.y},pointAttribs:function(a,h){var d=this.options.upColor;d&&!a.options.color&&(a.color=0<a.y?d:null);a=b.column.prototype.pointAttribs.call(this,a,h);delete a.dashstyle;return a},getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var b=
this.data,a=b.length,e=this.graph.strokeWidth()+this.borderWidth,e=Math.round(e)%2/2,n=[],c,g,l;for(l=1;l<a;l++)g=b[l].shapeArgs,c=b[l-1].shapeArgs,g=["M",c.x+c.width,c.y+e,"L",g.x,c.y+e],0>b[l-1].y&&(g[2]+=c.height,g[5]+=c.height),n=n.concat(g);return n},drawGraph:function(){r.prototype.drawGraph.call(this);this.graph.attr({d:this.getCrispPath()})},getExtremes:a.noop},{getClassName:function(){var b=q.prototype.getClassName.call(this);this.isSum?b+=" highcharts-sum":this.isIntermediateSum&&(b+=" highcharts-intermediate-sum");
return b},isValid:function(){return u(this.y,!0)||this.isSum||this.isIntermediateSum}})})(x);(function(a){var t=a.Series,u=a.seriesType,w=a.seriesTypes;u("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var a=t.prototype.getGraphPath.call(this),r=a.length+1;r--;)(r===a.length||"M"===a[r])&&0<r&&a.splice(r,0,"z");return this.areaPath=a},drawGraph:function(){this.options.fillColor=
this.color;w.area.prototype.drawGraph.call(this)},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawTracker:t.prototype.drawTracker,setStackedPoints:a.noop})})(x);(function(a){var t=a.arrayMax,u=a.arrayMin,w=a.Axis,q=a.color,r=a.each,e=a.isNumber,b=a.noop,d=a.pick,h=a.pInt,k=a.Point,n=a.Series,c=a.seriesType,g=a.seriesTypes;c("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1,radius:null,states:{hover:{radiusPlus:0}}},
minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],bubblePadding:!0,zoneAxis:"z",markerAttribs:null,pointAttribs:function(b,a){var c=d(this.options.marker.fillOpacity,.5);b=n.prototype.pointAttribs.call(this,b,a);1!==c&&(b.fill=q(b.fill).setOpacity(c).get("rgba"));return b},getRadii:function(b,
a,d,c){var f,h,e,l=this.zData,g=[],m=this.options,k="width"!==m.sizeBy,n=m.zThreshold,p=a-b;h=0;for(f=l.length;h<f;h++)e=l[h],m.sizeByAbsoluteValue&&null!==e&&(e=Math.abs(e-n),a=Math.max(a-n,Math.abs(b-n)),b=0),null===e?e=null:e<b?e=d/2-1:(e=0<p?(e-b)/p:.5,k&&0<=e&&(e=Math.sqrt(e)),e=Math.ceil(d+e*(c-d))/2),g.push(e);this.radii=g},animate:function(b){var a=this.options.animation;b||(r(this.points,function(b){var d=b.graphic;b=b.shapeArgs;d&&b&&(d.attr("r",1),d.animate({r:b.r},a))}),this.animate=null)},
translate:function(){var b,a=this.data,d,c,h=this.radii;g.scatter.prototype.translate.call(this);for(b=a.length;b--;)d=a[b],c=h?h[b]:0,e(c)&&c>=this.minPxSize/2?(d.shapeType="circle",d.shapeArgs={x:d.plotX,y:d.plotY,r:c},d.dlBox={x:d.plotX-c,y:d.plotY-c,width:2*c,height:2*c}):d.shapeArgs=d.plotY=d.dlBox=void 0},drawLegendSymbol:function(b,a){var d=this.chart.renderer,c=d.fontMetrics(b.itemStyle.fontSize).f/2;a.legendSymbol=d.circle(c,b.baseline-c,c).attr({zIndex:3}).add(a.legendGroup);a.legendSymbol.isMarker=
!0},drawPoints:g.column.prototype.drawPoints,alignDataLabel:g.column.prototype.alignDataLabel,buildKDTree:b,applyZones:b},{haloPath:function(){return k.prototype.haloPath.call(this,this.shapeArgs.r+this.series.options.states.hover.halo.size)},ttBelow:!1});w.prototype.beforePadding=function(){var b=this,a=this.len,c=this.chart,g=0,k=a,n=this.isXAxis,q=n?"xData":"yData",w=this.min,x={},A=Math.min(c.plotWidth,c.plotHeight),C=Number.MAX_VALUE,D=-Number.MAX_VALUE,E=this.max-w,z=a/E,F=[];r(this.series,
function(a){var e=a.options;!a.bubblePadding||!a.visible&&c.options.chart.ignoreHiddenSeries||(b.allowZoomOutside=!0,F.push(a),n&&(r(["minSize","maxSize"],function(b){var a=e[b],d=/%$/.test(a),a=h(a);x[b]=d?A*a/100:a}),a.minPxSize=x.minSize,a.maxPxSize=x.maxSize,a=a.zData,a.length&&(C=d(e.zMin,Math.min(C,Math.max(u(a),!1===e.displayNegative?e.zThreshold:-Number.MAX_VALUE))),D=d(e.zMax,Math.max(D,t(a))))))});r(F,function(a){var d=a[q],c=d.length,h;n&&a.getRadii(C,D,a.minPxSize,a.maxPxSize);if(0<E)for(;c--;)e(d[c])&&
b.dataMin<=d[c]&&d[c]<=b.dataMax&&(h=a.radii[c],g=Math.min((d[c]-w)*z-h,g),k=Math.max((d[c]-w)*z+h,k))});F.length&&0<E&&!this.isLog&&(k-=a,z*=(a+g-k)/a,r([["min","userMin",g],["max","userMax",k]],function(a){void 0===d(b.options[a[0]],b[a[1]])&&(b[a[0]]+=a[2]/z)}))}})(x);(function(a){function t(b,a){var d=this.chart,e=this.options.animation,n=this.group,c=this.markerGroup,g=this.xAxis.center,l=d.plotLeft,p=d.plotTop;d.polar?d.renderer.isSVG&&(!0===e&&(e={}),a?(b={translateX:g[0]+l,translateY:g[1]+
p,scaleX:.001,scaleY:.001},n.attr(b),c&&c.attr(b)):(b={translateX:l,translateY:p,scaleX:1,scaleY:1},n.animate(b,e),c&&c.animate(b,e),this.animate=null)):b.call(this,a)}var u=a.each,w=a.pick,q=a.seriesTypes,r=a.wrap,e=a.Series.prototype;a=a.Pointer.prototype;e.searchPointByAngle=function(b){var a=this.chart,e=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(b.chartX-e[0]-a.plotLeft,b.chartY-e[1]-a.plotTop)})};r(e,"buildKDTree",function(b){this.chart.polar&&(this.kdByAngle?
this.searchPoint=this.searchPointByAngle:this.kdDimensions=2);b.apply(this)});e.toXY=function(b){var a,e=this.chart,k=b.plotX;a=b.plotY;b.rectPlotX=k;b.rectPlotY=a;a=this.xAxis.postTranslate(b.plotX,this.yAxis.len-a);b.plotX=b.polarPlotX=a.x-e.plotLeft;b.plotY=b.polarPlotY=a.y-e.plotTop;this.kdByAngle?(e=(k/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>e&&(e+=360),b.clientX=e):b.clientX=b.plotX};q.spline&&r(q.spline.prototype,"getPointSpline",function(b,a,e,k){var d,c,g,h,p,f,m;this.chart.polar?
(d=e.plotX,c=e.plotY,b=a[k-1],g=a[k+1],this.connectEnds&&(b||(b=a[a.length-2]),g||(g=a[1])),b&&g&&(h=b.plotX,p=b.plotY,a=g.plotX,f=g.plotY,h=(1.5*d+h)/2.5,p=(1.5*c+p)/2.5,g=(1.5*d+a)/2.5,m=(1.5*c+f)/2.5,a=Math.sqrt(Math.pow(h-d,2)+Math.pow(p-c,2)),f=Math.sqrt(Math.pow(g-d,2)+Math.pow(m-c,2)),h=Math.atan2(p-c,h-d),p=Math.atan2(m-c,g-d),m=Math.PI/2+(h+p)/2,Math.abs(h-m)>Math.PI/2&&(m-=Math.PI),h=d+Math.cos(m)*a,p=c+Math.sin(m)*a,g=d+Math.cos(Math.PI+m)*f,m=c+Math.sin(Math.PI+m)*f,e.rightContX=g,e.rightContY=
m),k?(e=["C",b.rightContX||b.plotX,b.rightContY||b.plotY,h||d,p||c,d,c],b.rightContX=b.rightContY=null):e=["M",d,c]):e=b.call(this,a,e,k);return e});r(e,"translate",function(b){var a=this.chart;b.call(this);if(a.polar&&(this.kdByAngle=a.tooltip&&a.tooltip.shared,!this.preventPostTranslate))for(b=this.points,a=b.length;a--;)this.toXY(b[a])});r(e,"getGraphPath",function(b,a){var d=this,e,n;if(this.chart.polar){a=a||this.points;for(e=0;e<a.length;e++)if(!a[e].isNull){n=e;break}!1!==this.options.connectEnds&&
void 0!==n&&(this.connectEnds=!0,a.splice(a.length,0,a[n]));u(a,function(b){void 0===b.polarPlotY&&d.toXY(b)})}return b.apply(this,[].slice.call(arguments,1))});r(e,"animate",t);q.column&&(q=q.column.prototype,q.polarArc=function(b,a,e,k){var d=this.xAxis.center,c=this.yAxis.len;return this.chart.renderer.symbols.arc(d[0],d[1],c-a,null,{start:e,end:k,innerR:c-w(b,c)})},r(q,"animate",t),r(q,"translate",function(b){var a=this.xAxis,e=a.startAngleRad,k,n,c;this.preventPostTranslate=!0;b.call(this);if(a.isRadial)for(k=
this.points,c=k.length;c--;)n=k[c],b=n.barX+e,n.shapeType="path",n.shapeArgs={d:this.polarArc(n.yBottom,n.plotY,b,b+n.pointWidth)},this.toXY(n),n.tooltipPos=[n.plotX,n.plotY],n.ttBelow=n.plotY>a.center[1]}),r(q,"alignDataLabel",function(a,d,h,k,n,c){this.chart.polar?(a=d.rectPlotX/Math.PI*180,null===k.align&&(k.align=20<a&&160>a?"left":200<a&&340>a?"right":"center"),null===k.verticalAlign&&(k.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle"),e.alignDataLabel.call(this,d,h,k,n,c)):a.call(this,
d,h,k,n,c)}));r(a,"getCoordinates",function(a,d){var b=this.chart,e={xAxis:[],yAxis:[]};b.polar?u(b.axes,function(a){var c=a.isXAxis,g=a.center,h=d.chartX-g[0]-b.plotLeft,g=d.chartY-g[1]-b.plotTop;e[c?"xAxis":"yAxis"].push({axis:a,value:a.translate(c?Math.PI-Math.atan2(h,g):Math.sqrt(Math.pow(h,2)+Math.pow(g,2)),!0)})}):e=a.call(this,d);return e})})(x)});
/*
 Highstock JS v4.2.2 (2016-02-04)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(J,ea){typeof module==="object"&&module.exports?module.exports=J.document?ea(J):ea:J.Highcharts=ea(J)})(typeof window!=="undefined"?window:this,function(J){function ea(a,b){var c="Highcharts error #"+a+": www.highcharts.com/errors/"+a;if(b)throw Error(c);J.console&&console.log(c)}function yb(a,b,c){this.options=b;this.elem=a;this.prop=c}function C(){var a,b=arguments,c,d={},e=function(a,b){var c,d;typeof a!=="object"&&(a={});for(d in b)b.hasOwnProperty(d)&&(c=b[d],a[d]=c&&typeof c==="object"&&
Object.prototype.toString.call(c)!=="[object Array]"&&d!=="renderTo"&&typeof c.nodeType!=="number"?e(a[d]||{},c):b[d]);return a};b[0]===!0&&(d=b[1],b=Array.prototype.slice.call(b,2));c=b.length;for(a=0;a<c;a++)d=e(d,b[a]);return d}function G(a,b){return parseInt(a,b||10)}function Da(a){return typeof a==="string"}function fa(a){return a&&typeof a==="object"}function Na(a){return Object.prototype.toString.call(a)==="[object Array]"}function ta(a){return typeof a==="number"}function Oa(a){return X.log(a)/
X.LN10}function za(a){return X.pow(10,a)}function Aa(a,b){for(var c=a.length;c--;)if(a[c]===b){a.splice(c,1);break}}function t(a){return a!==u&&a!==null}function W(a,b,c){var d,e;if(Da(b))t(c)?a.setAttribute(b,c):a&&a.getAttribute&&(e=a.getAttribute(b));else if(t(b)&&fa(b))for(d in b)a.setAttribute(d,b[d]);return e}function ua(a){return Na(a)?a:[a]}function bb(a,b,c){if(b)return setTimeout(a,b,c);a.call(0,c)}function I(a,b){if(Ja&&!ha&&b&&b.opacity!==u)b.filter="alpha(opacity="+b.opacity*100+")";
w(a.style,b)}function ca(a,b,c,d,e){a=B.createElement(a);b&&w(a,b);e&&I(a,{padding:0,border:"none",margin:0});c&&I(a,c);d&&d.appendChild(a);return a}function ka(a,b){var c=function(){};c.prototype=new a;w(c.prototype,b);return c}function Wa(a,b){return Array((b||2)+1-String(a).length).join(0)+a}function gb(a){return(hb&&hb(a)||zb||0)*6E4}function Ka(a,b){for(var c="{",d=!1,e,f,g,h,i,j=[];(c=a.indexOf(c))!==-1;){e=a.slice(0,c);if(d){f=e.split(":");g=f.shift().split(".");i=g.length;e=b;for(h=0;h<i;h++)e=
e[g[h]];if(f.length)f=f.join(":"),g=/\.([0-9])/,h=O.lang,i=void 0,/f$/.test(f)?(i=(i=f.match(g))?i[1]:-1,e!==null&&(e=z.numberFormat(e,i,h.decimalPoint,f.indexOf(",")>-1?h.thousandsSep:""))):e=la(f,e)}j.push(e);a=a.slice(c+1);c=(d=!d)?"}":"{"}j.push(a);return j.join("")}function Ab(a){return X.pow(10,U(X.log(a)/X.LN10))}function Bb(a,b,c,d,e){var f,g=a,c=p(c,1);f=a/c;b||(b=[1,2,2.5,5,10],d===!1&&(c===1?b=[1,2,5,10]:c<=0.1&&(b=[1/c])));for(d=0;d<b.length;d++)if(g=b[d],e&&g*c>=a||!e&&f<=(b[d]+(b[d+
1]||b[d]))/2)break;g*=c;return g}function pb(a,b){var c=a.length,d,e;for(e=0;e<c;e++)a[e].safeI=e;a.sort(function(a,c){d=b(a,c);return d===0?a.safeI-c.safeI:d});for(e=0;e<c;e++)delete a[e].safeI}function Pa(a){for(var b=a.length,c=a[0];b--;)a[b]<c&&(c=a[b]);return c}function Ea(a){for(var b=a.length,c=a[0];b--;)a[b]>c&&(c=a[b]);return c}function Qa(a,b){for(var c in a)a[c]&&a[c]!==b&&a[c].destroy&&a[c].destroy(),delete a[c]}function Xa(a){qb||(qb=ca(Ya));a&&qb.appendChild(a);qb.innerHTML=""}function ma(a,
b){return parseFloat(a.toPrecision(b||14))}function cb(a,b){b.renderer.globalAnimation=p(a,b.animation)}function Pb(){var a=O.global,b=a.useUTC,c=b?"getUTC":"get",d=b?"setUTC":"set";da=a.Date||J.Date;zb=b&&a.timezoneOffset;hb=b&&a.getTimezoneOffset;rb=function(a,c,d,h,i,j){var k;b?(k=da.UTC.apply(0,arguments),k+=gb(k)):k=(new da(a,c,p(d,1),p(h,0),p(i,0),p(j,0))).getTime();return k};Cb=c+"Minutes";Db=c+"Hours";Eb=c+"Day";ib=c+"Date";jb=c+"Month";kb=c+"FullYear";Qb=d+"Milliseconds";Rb=d+"Seconds";Sb=
d+"Minutes";Tb=d+"Hours";Fb=d+"Date";Gb=d+"Month";Hb=d+"FullYear"}function va(a){if(!(this instanceof va))return new va(a);this.init(a)}function Y(){}function db(a,b,c,d){this.axis=a;this.pos=b;this.type=c||"";this.isNew=!0;!c&&!d&&this.addLabel()}function Ub(a,b,c,d,e){var f=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=b;this.x=d;this.total=null;this.points={};this.stack=e;this.rightCliff=this.leftCliff=0;this.alignOptions={align:b.align||(f?c?"left":"right":"center"),verticalAlign:b.verticalAlign||
(f?"middle":c?"bottom":"top"),y:p(b.y,f?4:c?14:-6),x:p(b.x,f?c?-6:6:0)};this.textAlign=b.textAlign||(f?c?"right":"left":"center")}function Ib(a){var b=a.options,c=b.navigator,d=c.enabled,b=b.scrollbar,e=b.enabled,f=d?c.height:0,g=e?b.height:0;this.handles=[];this.scrollbarButtons=[];this.elementsToDestroy=[];this.chart=a;this.setBaseSeries();this.height=f;this.scrollbarHeight=g;this.scrollbarEnabled=e;this.navigatorEnabled=d;this.navigatorOptions=c;this.scrollbarOptions=b;this.outlineHeight=f+g;this.init()}
function Jb(a){this.init(a)}var u,B=J.document,X=Math,y=X.round,U=X.floor,Fa=X.ceil,s=X.max,E=X.min,Q=X.abs,aa=X.cos,ia=X.sin,Ba=X.PI,na=Ba*2/360,La=J.navigator&&J.navigator.userAgent||"",Vb=J.opera,Ja=/(msie|trident|edge)/i.test(La)&&!Vb,sb=B&&B.documentMode===8,tb=!Ja&&/AppleWebKit/.test(La),Za=/Firefox/.test(La),lb=/(Mobile|Android|Windows Phone)/.test(La),Ra="http://www.w3.org/2000/svg",ha=B&&B.createElementNS&&!!B.createElementNS(Ra,"svg").createSVGRect,$b=Za&&parseInt(La.split("Firefox/")[1],
10)<4,oa=B&&!ha&&!Ja&&!!B.createElement("canvas").getContext,$a,eb,Wb={},Kb=0,qb,O,la,H,pa=function(){},$=[],mb=0,Ya="div",ac=/^[0-9]+$/,ub=["plotTop","marginRight","marginBottom","plotLeft"],da,rb,zb,hb,Cb,Db,Eb,ib,jb,kb,Qb,Rb,Sb,Tb,Fb,Gb,Hb,K={},z;z=J.Highcharts?ea(16,!0):{win:J};z.seriesTypes=K;var Sa=[],wa,qa,n,Ma,Lb,ra,D,R,M,fb,Ta;yb.prototype={dSetter:function(){var a=this.paths[0],b=this.paths[1],c=[],d=this.now,e=a.length,f;if(d===1)c=this.toD;else if(e===b.length&&d<1)for(;e--;)f=parseFloat(a[e]),
c[e]=isNaN(f)?a[e]:d*parseFloat(b[e]-f)+f;else c=b;this.elem.attr("d",c)},update:function(){var a=this.elem,b=this.prop,c=this.now,d=this.options.step;if(this[b+"Setter"])this[b+"Setter"]();else a.attr?a.element&&a.attr(b,c):a.style[b]=c+this.unit;d&&d.call(a,c,this)},run:function(a,b,c){var d=this,e=function(a){return e.stopped?!1:d.step(a)},f;this.startTime=+new da;this.start=a;this.end=b;this.unit=c;this.now=this.start;this.pos=0;e.elem=this.elem;if(e()&&Sa.push(e)===1)e.timerId=setInterval(function(){for(f=
0;f<Sa.length;f++)Sa[f]()||Sa.splice(f--,1);Sa.length||clearInterval(e.timerId)},13)},step:function(a){var b=+new da,c,d=this.options;c=this.elem;var e=d.complete,f=d.duration,g=d.curAnim,h;if(c.attr&&!c.element)c=!1;else if(a||b>=f+this.startTime){this.now=this.end;this.pos=1;this.update();a=g[this.prop]=!0;for(h in g)g[h]!==!0&&(a=!1);a&&e&&e.call(c);c=!1}else this.pos=d.easing((b-this.startTime)/f),this.now=this.start+(this.end-this.start)*this.pos,this.update(),c=!0;return c},initPath:function(a,
b,c){var b=b||"",d=a.shift,e=b.indexOf("C")>-1,f=e?7:3,g,b=b.split(" "),c=[].concat(c),h=a.isArea,i=h?2:1,j=function(a){for(g=a.length;g--;)(a[g]==="M"||a[g]==="L")&&a.splice(g+1,0,a[g+1],a[g+2],a[g+1],a[g+2])};e&&(j(b),j(c));if(d<=c.length/f&&b.length===c.length)for(;d--;)c=c.slice(0,f).concat(c),h&&(c=c.concat(c.slice(c.length-f)));a.shift=0;if(b.length)for(a=c.length;b.length<a;)d=b.slice().splice(b.length/i-f,f*i),e&&(d[f-6]=d[f-2],d[f-5]=d[f-1]),[].splice.apply(b,[b.length/i,0].concat(d));return[b,
c]}};var w=z.extend=function(a,b){var c;a||(a={});for(c in b)a[c]=b[c];return a},p=z.pick=function(){var a=arguments,b,c,d=a.length;for(b=0;b<d;b++)if(c=a[b],c!==u&&c!==null)return c},S=z.wrap=function(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(d);return c.apply(this,a)}};la=function(a,b,c){if(!t(b)||isNaN(b))return O.lang.invalidDate||"";var a=p(a,"%Y-%m-%d %H:%M:%S"),d=new da(b-gb(b)),e,f=d[Db](),g=d[Eb](),h=d[ib](),i=d[jb](),j=d[kb](),k=O.lang,l=k.weekdays,
d=w({a:l[g].substr(0,3),A:l[g],d:Wa(h),e:h,w:g,b:k.shortMonths[i],B:k.months[i],m:Wa(i+1),y:j.toString().substr(2,2),Y:j,H:Wa(f),k:f,I:Wa(f%12||12),l:f%12||12,M:Wa(d[Cb]()),p:f<12?"AM":"PM",P:f<12?"am":"pm",S:Wa(d.getSeconds()),L:Wa(y(b%1E3),3)},z.dateFormats);for(e in d)for(;a.indexOf("%"+e)!==-1;)a=a.replace("%"+e,typeof d[e]==="function"?d[e](b):d[e]);return c?a.substr(0,1).toUpperCase()+a.substr(1):a};H={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};
z.numberFormat=function(a,b,c,d){var a=+a||0,e=O.lang,f=(a.toString().split(".")[1]||"").length,g,h,i=Math.abs(a);b===-1?b=Math.min(f,20):isNaN(b)&&(b=2);g=String(G(i.toFixed(b)));h=g.length>3?g.length%3:0;c=p(c,e.decimalPoint);d=p(d,e.thousandsSep);a=a<0?"-":"";a+=h?g.substr(0,h)+d:"";a+=g.substr(h).replace(/(\d{3})(?=\d)/g,"$1"+d);+b&&(d=Math.abs(i-g+Math.pow(10,-Math.max(b,f)-1)),a+=c+d.toFixed(b).slice(2));return a};Math.easeInOutSine=function(a){return-0.5*(Math.cos(Math.PI*a)-1)};wa=function(a,
b){var c;if(b==="width")return Math.min(a.offsetWidth,a.scrollWidth)-wa(a,"padding-left")-wa(a,"padding-right");else if(b==="height")return Math.min(a.offsetHeight,a.scrollHeight)-wa(a,"padding-top")-wa(a,"padding-bottom");return(c=J.getComputedStyle(a,void 0))&&G(c.getPropertyValue(b))};qa=function(a,b){return b.indexOf?b.indexOf(a):[].indexOf.call(b,a)};Ma=function(a,b){return[].filter.call(a,b)};ra=function(a,b){for(var c=[],d=0,e=a.length;d<e;d++)c[d]=b.call(a[d],a[d],d,a);return c};Lb=function(a){var b=
B.documentElement,a=a.getBoundingClientRect();return{top:a.top+(J.pageYOffset||b.scrollTop)-(b.clientTop||0),left:a.left+(J.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}};Ta=function(a){for(var b=Sa.length;b--;)if(Sa[b].elem===a)Sa[b].stopped=!0};n=function(a,b){return Array.prototype.forEach.call(a,b)};D=function(a,b,c){function d(b){b.target=b.srcElement||J;c.call(a,b)}var e=a.hcEvents=a.hcEvents||{};if(a.addEventListener)a.addEventListener(b,c,!1);else if(a.attachEvent){if(!a.hcEventsIE)a.hcEventsIE=
{};a.hcEventsIE[c.toString()]=d;a.attachEvent("on"+b,d)}e[b]||(e[b]=[]);e[b].push(c)};R=function(a,b,c){function d(b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.attachEvent&&(c=a.hcEventsIE[c.toString()],a.detachEvent("on"+b,c))}function e(){var c,e,f;if(a.nodeName)for(f in b?(c={},c[b]=!0):c=g,c)if(g[f])for(e=g[f].length;e--;)d(f,g[f][e])}var f,g=a.hcEvents,h;if(g)b?(f=g[b]||[],c?(h=qa(c,f),h>-1&&(f.splice(h,1),g[b]=f),d(b,c)):(e(),g[b]=[])):(e(),a.hcEvents={})};M=function(a,b,c,d){var e;
e=a.hcEvents;var f,g,h,i,c=c||{};if(B.createEvent&&(a.dispatchEvent||a.fireEvent))e=B.createEvent("Events"),e.initEvent(b,!0,!0),e.target=a,w(e,c),a.dispatchEvent?a.dispatchEvent(e):a.fireEvent(b,e);else if(e){e=e[b]||[];f=e.length;h=function(){c.defaultPrevented=!0};for(g=0;g<f;g++){i=e[g];if(c.stopped)return;c.preventDefault=h;c.target=a;if(!c.type)c.type=b;i.call(a,c)===!1&&c.preventDefault()}}d&&!c.defaultPrevented&&d(c)};fb=function(a,b,c){var d,e="",f,g,h;fa(c)||(d=arguments,c={duration:d[2],
easing:d[3],complete:d[4]});if(!ta(c.duration))c.duration=400;c.easing=Math[c.easing]||Math.easeInOutSine;c.curAnim=C(b);for(h in b)g=new yb(a,c,h),f=null,h==="d"?(g.paths=g.initPath(a,a.d,b.d),g.toD=b.d,d=0,f=1):a.attr?d=a.attr(h):(d=parseFloat(wa(a,h))||0,h!=="opacity"&&(e="px")),f||(f=b[h]),f.match&&f.match("px")&&(f=f.replace(/px/g,"")),g.run(d,f,e)};if(J.jQuery)J.jQuery.fn.highcharts=function(){var a=[].slice.call(arguments);if(this[0])return a[0]?(new (z[Da(a[0])?a.shift():"Chart"])(this[0],
a[0],a[1]),this):$[W(this[0],"data-highcharts-chart")]};B&&!B.defaultView&&(wa=function(a,b){var c;c={width:"clientWidth",height:"clientHeight"}[b];if(a.style[b])return G(a.style[b]);b==="opacity"&&(b="filter");if(c)return a.style.zoom=1,a[c]-2*wa(a,"padding");c=a.currentStyle[b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()})];b==="filter"&&(c=c.replace(/alpha\(opacity=([0-9]+)\)/,function(a,b){return b/100}));return c===""?1:G(c)});Array.prototype.forEach||(n=function(a,b){for(var c=0,d=
a.length;c<d;c++)if(b.call(a[c],a[c],c,a)===!1)return c});Array.prototype.indexOf||(qa=function(a,b){var c,d=0;if(b)for(c=b.length;d<c;d++)if(b[d]===a)return d;return-1});Array.prototype.filter||(Ma=function(a,b){for(var c=[],d=0,e=a.length;d<e;d++)b(a[d],d)&&c.push(a[d]);return c});z.Fx=yb;z.inArray=qa;z.each=n;z.grep=Ma;z.offset=Lb;z.map=ra;z.addEvent=D;z.removeEvent=R;z.fireEvent=M;z.animate=fb;z.stop=Ta;O={colors:"#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#2b908f,#f45b5b,#91e8e1".split(","),
symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),decimalPoint:".",numericSymbols:"k,M,G,T,P,E".split(","),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,
canvasToolsURL:"http://code.highcharts.com/modules/canvas-tools.js",VMLRadialGradientURL:"http://code.highcharts.com/stock/4.2.2/gfx/vml-radial-gradient.png"},chart:{borderColor:"#4572A7",borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0",resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}}},title:{text:"Chart title",align:"center",margin:15,style:{color:"#333333",fontSize:"18px"}},subtitle:{text:"",
align:"center",style:{color:"#555555"}},plotOptions:{line:{allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},lineWidth:2,marker:{lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{enabled:!0,lineWidthPlus:1,radiusPlus:2},select:{fillColor:"#FFFFFF",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return this.y===null?"":z.numberFormat(this.y,-1)},style:{color:"contrast",fontSize:"11px",fontWeight:"bold",textShadow:"0 0 6px contrast, 0 0 3px contrast"},
verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{lineWidthPlus:1,marker:{},halo:{size:10,opacity:0.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3}},labels:{style:{position:"absolute",color:"#3E576F"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#909090",borderRadius:0,navigation:{activeColor:"#274b6d",inactiveColor:"#CCC"},shadow:!1,itemStyle:{color:"#333333",fontSize:"12px",
fontWeight:"bold"},itemHoverStyle:{color:"#000"},itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:!0,animation:ha,backgroundColor:"rgba(249, 249, 249, .85)",borderWidth:1,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",
second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',shadow:!0,snap:lb?25:10,style:{color:"#333333",cursor:"default",fontSize:"12px",padding:"8px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,text:"Highcharts.com",
href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#909090",fontSize:"9px"}}};var V=O.plotOptions,ba=V.line;Pb();va.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[G(a[1]),G(a[2]),G(a[3]),parseFloat(a[4],10)]}},{regex:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(a){return[G(a[1],16),G(a[2],16),G(a[3],16),1]}},
{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[G(a[1]),G(a[2]),G(a[3]),1]}}],init:function(a){var b,c,d,e;if((this.input=a)&&a.stops)this.stops=ra(a.stops,function(a){return new va(a[1])});else for(d=this.parsers.length;d--&&!c;)e=this.parsers[d],(b=e.regex.exec(a))&&(c=e.parse(b));this.rgba=c||[]},get:function(a){var b=this.input,c=this.rgba,d;this.stops?(d=C(b),d.stops=[].concat(d.stops),n(this.stops,function(b,c){d.stops[c]=[d.stops[c][0],b.get(a)]})):
d=c&&!isNaN(c[0])?a==="rgb"||!a&&c[3]===1?"rgb("+c[0]+","+c[1]+","+c[2]+")":a==="a"?c[3]:"rgba("+c.join(",")+")":b;return d},brighten:function(a){var b,c=this.rgba;if(this.stops)n(this.stops,function(b){b.brighten(a)});else if(ta(a)&&a!==0)for(b=0;b<3;b++)c[b]+=G(a*255),c[b]<0&&(c[b]=0),c[b]>255&&(c[b]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this}};Y.prototype={opacity:1,textProps:"direction,fontSize,fontWeight,fontFamily,fontStyle,color,lineHeight,width,textDecoration,textOverflow,textShadow".split(","),
init:function(a,b){this.element=b==="span"?ca(b):B.createElementNS(Ra,b);this.renderer=a},animate:function(a,b,c){b=p(b,this.renderer.globalAnimation,!0);Ta(this);if(b){b=C(b,{});if(c)b.complete=c;fb(this,a,b)}else this.attr(a,null,c);return this},colorGradient:function(a,b,c){var d=this.renderer,e,f,g,h,i,j,k,l,m,o,q,r=[],A;a.linearGradient?f="linearGradient":a.radialGradient&&(f="radialGradient");if(f){g=a[f];i=d.gradients;k=a.stops;o=c.radialReference;Na(g)&&(a[f]=g={x1:g[0],y1:g[1],x2:g[2],y2:g[3],
gradientUnits:"userSpaceOnUse"});f==="radialGradient"&&o&&!t(g.gradientUnits)&&(h=g,g=C(g,d.getRadialAttr(o,h),{gradientUnits:"userSpaceOnUse"}));for(q in g)q!=="id"&&r.push(q,g[q]);for(q in k)r.push(k[q]);r=r.join(",");i[r]?o=i[r].attr("id"):(g.id=o="highcharts-"+Kb++,i[r]=j=d.createElement(f).attr(g).add(d.defs),j.radAttr=h,j.stops=[],n(k,function(a){a[1].indexOf("rgba")===0?(e=va(a[1]),l=e.get("rgb"),m=e.get("a")):(l=a[1],m=1);a=d.createElement("stop").attr({offset:a[0],"stop-color":l,"stop-opacity":m}).add(j);
j.stops.push(a)}));A="url("+d.url+"#"+o+")";c.setAttribute(b,A);c.gradient=r;a.toString=function(){return A}}},applyTextShadow:function(a){var b=this.element,c,d=a.indexOf("contrast")!==-1,e={},f=this.renderer.forExport,g=f||b.style.textShadow!==u&&!Ja;if(d)e.textShadow=a=a.replace(/contrast/g,this.renderer.getContrast(b.style.fill));if(tb||f)e.textRendering="geometricPrecision";g?this.css(e):(this.fakeTS=!0,this.ySetter=this.xSetter,c=[].slice.call(b.getElementsByTagName("tspan")),n(a.split(/\s?,\s?/g),
function(a){var d=b.firstChild,e,f,a=a.split(" ");e=a[a.length-1];(f=a[a.length-2])&&n(c,function(a,c){var g;c===0&&(a.setAttribute("x",b.getAttribute("x")),c=b.getAttribute("y"),a.setAttribute("y",c||0),c===null&&b.setAttribute("y",0));g=a.cloneNode(1);W(g,{"class":"highcharts-text-shadow",fill:e,stroke:e,"stroke-opacity":1/s(G(f),3),"stroke-width":f,"stroke-linejoin":"round"});b.insertBefore(g,d)})}))},attr:function(a,b,c){var d,e=this.element,f,g=this,h;typeof a==="string"&&b!==u&&(d=a,a={},a[d]=
b);if(typeof a==="string")g=(this[a+"Getter"]||this._defaultGetter).call(this,a,e);else{for(d in a){b=a[d];h=!1;this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(d)&&(f||(this.symbolAttr(a),f=!0),h=!0);if(this.rotation&&(d==="x"||d==="y"))this.doTransform=!0;h||(h=this[d+"Setter"]||this._defaultSetter,h.call(this,b,d,e),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d)&&this.updateShadows(d,b,h))}if(this.doTransform)this.updateTransform(),this.doTransform=
!1}c&&c();return g},updateShadows:function(a,b,c){for(var d=this.shadows,e=d.length;e--;)c.call(null,a==="height"?Math.max(b-(d[e].cutHeight||0),0):a==="d"?this.d:b,a,d[e])},addClass:function(a){var b=this.element,c=W(b,"class")||"";c.indexOf(a)===-1&&W(b,"class",c+" "+a);return this},symbolAttr:function(a){var b=this;n("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","),function(c){b[c]=p(a[c],b[c])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",
a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a){var b,c={},d,e=a.strokeWidth||this.strokeWidth||0;d=y(e)%2/2;a.x=U(a.x||this.x||0)+d;a.y=U(a.y||this.y||0)+d;a.width=U((a.width||this.width||0)-2*d);a.height=U((a.height||this.height||0)-2*d);a.strokeWidth=e;for(b in a)this[b]!==a[b]&&(this[b]=c[b]=a[b]);return c},css:function(a){var b=this.styles,c={},d=this.element,e,f,g="";e=!b;if(a&&a.color)a.fill=a.color;if(b)for(f in a)a[f]!==b[f]&&(c[f]=a[f],e=!0);if(e){e=this.textWidth=a&&
a.width&&d.nodeName.toLowerCase()==="text"&&G(a.width)||this.textWidth;b&&(a=w(b,c));this.styles=a;e&&(oa||!ha&&this.renderer.forExport)&&delete a.width;if(Ja&&!ha)I(this.element,a);else{b=function(a,b){return"-"+b.toLowerCase()};for(f in a)g+=f.replace(/([A-Z])/g,b)+":"+a[f]+";";W(d,"style",g)}e&&this.added&&this.renderer.buildText(this)}return this},on:function(a,b){var c=this,d=c.element;eb&&a==="click"?(d.ontouchstart=function(a){c.touchEventFired=da.now();a.preventDefault();b.call(d,a)},d.onclick=
function(a){(La.indexOf("Android")===-1||da.now()-(c.touchEventFired||0)>1100)&&b.call(d,a)}):d["on"+a]=b;return this},setRadialReference:function(a){var b=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;b&&b.radAttr&&b.animate(this.renderer.getRadialAttr(a,b.radAttr));return this},translate:function(a,b){return this.attr({translateX:a,translateY:b})},invert:function(){this.inverted=!0;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||
0,b=this.translateY||0,c=this.scaleX,d=this.scaleY,e=this.inverted,f=this.rotation,g=this.element;e&&(a+=this.attr("width"),b+=this.attr("height"));a=["translate("+a+","+b+")"];e?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+(g.getAttribute("x")||0)+" "+(g.getAttribute("y")||0)+")");(t(c)||t(d))&&a.push("scale("+p(c,1)+" "+p(d,1)+")");a.length&&g.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,b,c){var d,
e,f,g,h={};e=this.renderer;f=e.alignedObjects;if(a){if(this.alignOptions=a,this.alignByTranslate=b,!c||Da(c))this.alignTo=d=c||"renderer",Aa(f,this),f.push(this),c=null}else a=this.alignOptions,b=this.alignByTranslate,d=this.alignTo;c=p(c,e[d],e);d=a.align;e=a.verticalAlign;f=(c.x||0)+(a.x||0);g=(c.y||0)+(a.y||0);if(d==="right"||d==="center")f+=(c.width-(a.width||0))/{right:1,center:2}[d];h[b?"translateX":"x"]=y(f);if(e==="bottom"||e==="middle")g+=(c.height-(a.height||0))/({bottom:1,middle:2}[e]||
1);h[b?"translateY":"y"]=y(g);this[this.placed?"animate":"attr"](h);this.placed=!0;this.alignAttr=h;return this},getBBox:function(a,b){var c,d=this.renderer,e,f,g,h=this.element,i=this.styles;e=this.textStr;var j,k=h.style,l,m=d.cache,o=d.cacheKeys,q;f=p(b,this.rotation);g=f*na;e!==u&&(q=["",f||0,i&&i.fontSize,h.style.width].join(","),q=e===""||ac.test(e)?"num:"+e.toString().length+q:e+q);q&&!a&&(c=m[q]);if(!c){if(h.namespaceURI===Ra||d.forExport){try{l=this.fakeTS&&function(a){n(h.querySelectorAll(".highcharts-text-shadow"),
function(b){b.style.display=a})},Za&&k.textShadow?(j=k.textShadow,k.textShadow=""):l&&l("none"),c=h.getBBox?w({},h.getBBox()):{width:h.offsetWidth,height:h.offsetHeight},j?k.textShadow=j:l&&l("")}catch(r){}if(!c||c.width<0)c={width:0,height:0}}else c=this.htmlGetBBox();if(d.isSVG){d=c.width;e=c.height;if(Ja&&i&&i.fontSize==="11px"&&e.toPrecision(3)==="16.9")c.height=e=14;if(f)c.width=Q(e*ia(g))+Q(d*aa(g)),c.height=Q(e*aa(g))+Q(d*ia(g))}if(q){for(;o.length>250;)delete m[o.shift()];m[q]||o.push(q);
m[q]=c}}return c},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||150,complete:function(){b.attr({y:-9999})}})},add:function(a){var b=this.renderer,c=this.element,d;if(a)this.parentGroup=a;this.parentInverted=a&&a.inverted;this.textStr!==void 0&&b.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)d=this.zIndexSetter();d||(a?a.element:b.box).appendChild(c);
if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var b=a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||{},c=a.shadows,d=a.renderer.isSVG&&b.nodeName==="SPAN"&&a.parentGroup,e,f;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=b.point=null;Ta(a);if(a.clipPath)a.clipPath=a.clipPath.destroy();if(a.stops){for(f=0;f<a.stops.length;f++)a.stops[f]=a.stops[f].destroy();a.stops=null}a.safeRemoveChild(b);for(c&&n(c,function(b){a.safeRemoveChild(b)});d&&d.div&&
d.div.childNodes.length===0;)b=d.parentGroup,a.safeRemoveChild(d.div),delete d.div,d=b;a.alignTo&&Aa(a.renderer.alignedObjects,a);for(e in a)delete a[e];return null},shadow:function(a,b,c){var d=[],e,f,g=this.element,h,i,j,k;if(a){i=p(a.width,3);j=(a.opacity||0.15)/i;k=this.parentInverted?"(-1,-1)":"("+p(a.offsetX,1)+", "+p(a.offsetY,1)+")";for(e=1;e<=i;e++){f=g.cloneNode(0);h=i*2+1-2*e;W(f,{isShadow:"true",stroke:a.color||"black","stroke-opacity":j*e,"stroke-width":h,transform:"translate"+k,fill:"none"});
if(c)W(f,"height",s(W(f,"height")-h,0)),f.cutHeight=h;b?b.element.appendChild(f):g.parentNode.insertBefore(f,g);d.push(f)}this.shadows=d}return this},xGetter:function(a){this.element.nodeName==="circle"&&(a={x:"cx",y:"cy"}[a]||a);return this._defaultGetter(a)},_defaultGetter:function(a){a=p(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,b,c){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");c.setAttribute(b,
a);this[b]=a},dashstyleSetter:function(a){var b;if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(b=a.length;b--;)a[b]=G(a[b])*this["stroke-width"];a=a.join(",").replace("NaN","none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",
{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,b,c){this[b]=a;c.setAttribute(b,a)},titleSetter:function(a){var b=this.element.getElementsByTagName("title")[0];b||(b=B.createElementNS(Ra,"title"),this.element.appendChild(b));b.appendChild(B.createTextNode(String(p(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){if(a!==this.textStr)delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this)},fillSetter:function(a,b,c){typeof a==="string"?c.setAttribute(b,
a):a&&this.colorGradient(a,b,c)},visibilitySetter:function(a,b,c){a==="inherit"?c.removeAttribute(b):c.setAttribute(b,a)},zIndexSetter:function(a,b){var c=this.renderer,d=this.parentGroup,c=(d||c).element||c.box,e,f,g=this.element,h;e=this.added;var i;t(a)&&(g.setAttribute(b,a),a=+a,this[b]===a&&(e=!1),this[b]=a);if(e){if((a=this.zIndex)&&d)d.handleZ=!0;d=c.childNodes;for(i=0;i<d.length&&!h;i++)if(e=d[i],f=W(e,"zIndex"),e!==g&&(G(f)>a||!t(a)&&t(f)))c.insertBefore(g,e),h=!0;h||c.appendChild(g)}return h},
_defaultSetter:function(a,b,c){c.setAttribute(b,a)}};Y.prototype.yGetter=Y.prototype.xGetter;Y.prototype.translateXSetter=Y.prototype.translateYSetter=Y.prototype.rotationSetter=Y.prototype.verticalAlignSetter=Y.prototype.scaleXSetter=Y.prototype.scaleYSetter=function(a,b){this[b]=a;this.doTransform=!0};Y.prototype["stroke-widthSetter"]=Y.prototype.strokeSetter=function(a,b,c){this[b]=a;if(this.stroke&&this["stroke-width"])this.strokeWidth=this["stroke-width"],Y.prototype.fillSetter.call(this,this.stroke,
"stroke",c),c.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0;else if(b==="stroke-width"&&a===0&&this.hasStroke)c.removeAttribute("stroke"),this.hasStroke=!1};var xa=function(){this.init.apply(this,arguments)};xa.prototype={Element:Y,init:function(a,b,c,d,e,f){var g,d=this.createElement("svg").attr({version:"1.1"}).css(this.getStyle(d));g=d.element;a.appendChild(g);a.innerHTML.indexOf("xmlns")===-1&&W(g,"xmlns",Ra);this.isSVG=!0;this.box=g;this.boxWrapper=d;this.alignedObjects=
[];this.url=(Za||tb)&&B.getElementsByTagName("base").length?J.location.href.replace(/#.*?$/,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(B.createTextNode("Created with Highstock 4.2.2"));this.defs=this.createElement("defs").add();this.allowHTML=f;this.forExport=e;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,c,!1);var h;if(Za&&a.getBoundingClientRect)this.subPixelFix=b=function(){I(a,{left:0,top:0});
h=a.getBoundingClientRect();I(a,{left:Fa(h.left)-h.left+"px",top:Fa(h.top)-h.top+"px"})},b(),D(J,"resize",b)},getStyle:function(a){return this.style=w({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();Qa(this.gradients||{});this.gradients=null;if(a)this.defs=a.destroy();this.subPixelFix&&R(J,"resize",
this.subPixelFix);return this.alignedObjects=null},createElement:function(a){var b=new this.Element;b.init(this,a);return b},draw:function(){},getRadialAttr:function(a,b){return{cx:a[0]-a[2]/2+b.cx*a[2],cy:a[1]-a[2]/2+b.cy*a[2],r:b.r*a[2]}},buildText:function(a){for(var b=a.element,c=this,d=c.forExport,e=p(a.textStr,"").toString(),f=e.indexOf("<")!==-1,g=b.childNodes,h,i,j=W(b,"x"),k=a.styles,l=a.textWidth,m=k&&k.lineHeight,o=k&&k.textShadow,q=k&&k.textOverflow==="ellipsis",r=g.length,A=l&&!a.added&&
this.box,T=function(a){return m?G(m):c.fontMetrics(/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:k&&k.fontSize||c.style.fontSize||12,a).h},v=function(a){return a.replace(/&lt;/g,"<").replace(/&gt;/g,">")};r--;)b.removeChild(g[r]);!f&&!o&&!q&&e.indexOf(" ")===-1?b.appendChild(B.createTextNode(v(e))):(h=/<.*style="([^"]+)".*>/,i=/<.*href="(http[^"]+)".*>/,A&&A.appendChild(b),e=f?e.replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,
"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g):[e],e[e.length-1]===""&&e.pop(),n(e,function(e,f){var g,m=0,e=e.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");g=e.split("|||");n(g,function(e){if(e!==""||g.length===1){var o={},r=B.createElementNS(Ra,"tspan"),A;h.test(e)&&(A=e.match(h)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),W(r,"style",A));i.test(e)&&!d&&(W(r,"onclick",'location.href="'+e.match(i)[1]+'"'),I(r,{cursor:"pointer"}));e=v(e.replace(/<(.|\n)*?>/g,
"")||" ");if(e!==" "){r.appendChild(B.createTextNode(e));if(m)o.dx=0;else if(f&&j!==null)o.x=j;W(r,o);b.appendChild(r);!m&&f&&(!ha&&d&&I(r,{display:"block"}),W(r,"dy",T(r)));if(l){for(var o=e.replace(/([^\^])-/g,"$1- ").split(" "),p=g.length>1||f||o.length>1&&k.whiteSpace!=="nowrap",x,n,t,u=[],s=T(r),y=1,w=a.rotation,C=e,z=C.length;(p||q)&&(o.length||u.length);)a.rotation=0,x=a.getBBox(!0),t=x.width,!ha&&c.forExport&&(t=c.measureSpanWidth(r.firstChild.data,a.styles)),x=t>l,n===void 0&&(n=x),q&&n?
(z/=2,C===""||!x&&z<0.5?o=[]:(x&&(n=!0),C=e.substring(0,C.length+(x?-1:1)*Fa(z)),o=[C+(l>3?"\u2026":"")],r.removeChild(r.firstChild))):!x||o.length===1?(o=u,u=[],o.length&&(y++,r=B.createElementNS(Ra,"tspan"),W(r,{dy:s,x:j}),A&&W(r,"style",A),b.appendChild(r)),t>l&&(l=t)):(r.removeChild(r.firstChild),u.unshift(o.pop())),o.length&&r.appendChild(B.createTextNode(o.join(" ").replace(/- /g,"-")));n&&a.attr("title",a.textStr);a.rotation=w}m++}}})}),A&&A.removeChild(b),o&&a.applyTextShadow&&a.applyTextShadow(o))},
getContrast:function(a){a=va(a).rgba;return a[0]+a[1]+a[2]>384?"#000000":"#FFFFFF"},button:function(a,b,c,d,e,f,g,h,i){var j=this.label(a,b,c,i,null,null,null,null,"button"),k=0,l,m,o,q,r,A,a={x1:0,y1:0,x2:0,y2:1},e=C({"stroke-width":1,stroke:"#CCCCCC",fill:{linearGradient:a,stops:[[0,"#FEFEFE"],[1,"#F6F6F6"]]},r:2,padding:5,style:{color:"black"}},e);o=e.style;delete e.style;f=C(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#FFF"],[1,"#ACF"]]}},f);q=f.style;delete f.style;g=C(e,{stroke:"#68A",
fill:{linearGradient:a,stops:[[0,"#9BD"],[1,"#CDF"]]}},g);r=g.style;delete g.style;h=C(e,{style:{color:"#CCC"}},h);A=h.style;delete h.style;D(j.element,Ja?"mouseover":"mouseenter",function(){k!==3&&j.attr(f).css(q)});D(j.element,Ja?"mouseout":"mouseleave",function(){k!==3&&(l=[e,f,g][k],m=[o,q,r][k],j.attr(l).css(m))});j.setState=function(a){(j.state=k=a)?a===2?j.attr(g).css(r):a===3&&j.attr(h).css(A):j.attr(e).css(o)};return j.on("click",function(a){k!==3&&d.call(j,a)}).attr(e).css(w({cursor:"default"},
o))},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=y(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=y(a[2])+b%2/2);return a},path:function(a){var b={fill:"none"};Na(a)?b.d=a:fa(a)&&w(b,a);return this.createElement("path").attr(b)},circle:function(a,b,c){a=fa(a)?a:{x:a,y:b,r:c};b=this.createElement("circle");b.xSetter=b.ySetter=function(a,b,c){c.setAttribute("c"+b,a)};return b.attr(a)},arc:function(a,b,c,d,e,f){if(fa(a))b=a.y,c=a.r,d=a.innerR,e=a.start,f=a.end,a=a.x;a=this.symbol("arc",a||0,b||0,c||0,c||0,
{innerR:d||0,start:e||0,end:f||0});a.r=c;return a},rect:function(a,b,c,d,e,f){var e=fa(a)?a.r:e,g=this.createElement("rect"),a=fa(a)?a:a===u?{}:{x:a,y:b,width:s(c,0),height:s(d,0)};if(f!==u)a.strokeWidth=f,a=g.crisp(a);if(e)a.r=e;g.rSetter=function(a){W(this.element,{rx:a,ry:a})};return g.attr(a)},setSize:function(a,b,c){var d=this.alignedObjects,e=d.length;this.width=a;this.height=b;for(this.boxWrapper[p(c,!0)?"animate":"attr"]({width:a,height:b});e--;)d[e].align()},g:function(a){var b=this.createElement("g");
return t(a)?b.attr({"class":"highcharts-"+a}):b},image:function(a,b,c,d,e){var f={preserveAspectRatio:"none"};arguments.length>1&&w(f,{x:b,y:c,width:d,height:e});f=this.createElement("image").attr(f);f.element.setAttributeNS?f.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):f.element.setAttribute("hc-svg-href",a);return f},symbol:function(a,b,c,d,e,f){var g=this,h,i=this.symbols[a],i=i&&i(y(b),y(c),d,e,f),j=/^url\((.*?)\)$/,k,l;if(i)h=this.path(i),w(h,{symbolName:a,x:b,y:c,width:d,
height:e}),f&&w(h,f);else if(j.test(a))l=function(a,b){a.element&&(a.attr({width:b[0],height:b[1]}),a.alignByTranslate||a.translate(y((d-b[0])/2),y((e-b[1])/2)))},k=a.match(j)[1],a=Wb[k]||f&&f.width&&f.height&&[f.width,f.height],h=this.image(k).attr({x:b,y:c}),h.isImg=!0,a?l(h,a):(h.attr({width:0,height:0}),ca("img",{onload:function(){this.width===0&&(I(this,{position:"absolute",top:"-999em"}),B.body.appendChild(this));l(h,Wb[k]=[this.width,this.height]);this.parentNode&&this.parentNode.removeChild(this);
g.imgCount--;if(!g.imgCount)$[g.chartIndex].onload()},src:k})),this.imgCount++;return h},symbols:{circle:function(a,b,c,d){var e=0.166*c;return["M",a+c/2,b,"C",a+c+e,b,a+c+e,b+d,a+c/2,b+d,"C",a-e,b+d,a-e,b,a+c/2,b,"Z"]},square:function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c,b+d,a,b+d,"Z"]},triangle:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d,a,b+d,"Z"]},"triangle-down":function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c/2,b+d,"Z"]},diamond:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d/2,a+c/2,b+
d,a,b+d/2,"Z"]},arc:function(a,b,c,d,e){var f=e.start,c=e.r||c||d,g=e.end-0.001,d=e.innerR,h=e.open,i=aa(f),j=ia(f),k=aa(g),g=ia(g),e=e.end-f<Ba?0:1;return["M",a+c*i,b+c*j,"A",c,c,0,e,1,a+c*k,b+c*g,h?"M":"L",a+d*k,b+d*g,"A",d,d,0,e,0,a+d*i,b+d*j,h?"":"Z"]},callout:function(a,b,c,d,e){var f=E(e&&e.r||0,c,d),g=f+6,h=e&&e.anchorX,e=e&&e.anchorY,i;i=["M",a+f,b,"L",a+c-f,b,"C",a+c,b,a+c,b,a+c,b+f,"L",a+c,b+d-f,"C",a+c,b+d,a+c,b+d,a+c-f,b+d,"L",a+f,b+d,"C",a,b+d,a,b+d,a,b+d-f,"L",a,b+f,"C",a,b,a,b,a+f,
b];h&&h>c&&e>b+g&&e<b+d-g?i.splice(13,3,"L",a+c,e-6,a+c+6,e,a+c,e+6,a+c,b+d-f):h&&h<0&&e>b+g&&e<b+d-g?i.splice(33,3,"L",a,e+6,a-6,e,a,e-6,a,b+f):e&&e>d&&h>a+g&&h<a+c-g?i.splice(23,3,"L",h+6,b+d,h,b+d+6,h-6,b+d,a+f,b+d):e&&e<0&&h>a+g&&h<a+c-g&&i.splice(3,3,"L",h-6,b,h,b-6,h+6,b,c-f,b);return i}},clipRect:function(a,b,c,d){var e="highcharts-"+Kb++,f=this.createElement("clipPath").attr({id:e}).add(this.defs),a=this.rect(a,b,c,d,0).add(f);a.id=e;a.clipPath=f;a.count=0;return a},text:function(a,b,c,d){var e=
oa||!ha&&this.forExport,f={};if(d&&(this.allowHTML||!this.forExport))return this.html(a,b,c);f.x=Math.round(b||0);if(c)f.y=Math.round(c);if(a||a===0)f.text=a;a=this.createElement("text").attr(f);e&&a.css({position:"absolute"});if(!d)a.xSetter=function(a,b,c){var d=c.getElementsByTagName("tspan"),e,f=c.getAttribute(b),m;for(m=0;m<d.length;m++)e=d[m],e.getAttribute(b)===f&&e.setAttribute(b,a);c.setAttribute(b,a)};return a},fontMetrics:function(a,b){var c,d,a=a||this.style.fontSize;!a&&b&&J.getComputedStyle&&
(b=b.element||b,a=(c=J.getComputedStyle(b,""))&&c.fontSize);a=/px/.test(a)?G(a):/em/.test(a)?parseFloat(a)*12:12;c=a<24?a+3:y(a*1.2);d=y(c*0.8);return{h:c,b:d,f:a}},rotCorr:function(a,b,c){var d=a;b&&c&&(d=s(d*aa(b*na),4));return{x:-a/3*ia(b*na),y:d}},label:function(a,b,c,d,e,f,g,h,i){var j=this,k=j.g(i),l=j.text("",0,0,g).attr({zIndex:1}),m,o,q=0,r=3,A=0,p,v,x,N,ja=0,Ua={},s,z,L,E,B;L=function(){var a,b;a=l.element.style;o=(p===void 0||v===void 0||k.styles.textAlign)&&t(l.textStr)&&l.getBBox();k.width=
(p||o.width||0)+2*r+A;k.height=(v||o.height||0)+2*r;s=r+j.fontMetrics(a&&a.fontSize,l).b;if(z){if(!m)a=ja,b=(h?-s:0)+ja,k.box=m=d?j.symbol(d,a,b,k.width,k.height,Ua):j.rect(a,b,k.width,k.height,0,Ua["stroke-width"]),m.isImg||m.attr("fill","none"),m.add(k);m.isImg||m.attr(w({width:y(k.width),height:y(k.height)},Ua));Ua=null}};E=function(){var a=k.styles,a=a&&a.textAlign,b=A+r,c;c=h?0:s;if(t(p)&&o&&(a==="center"||a==="right"))b+={center:0.5,right:1}[a]*(p-o.width);if(b!==l.x||c!==l.y)l.attr("x",b),
c!==u&&l.attr("y",c);l.x=b;l.y=c};B=function(a,b){m?m.attr(a,b):Ua[a]=b};k.onAdd=function(){l.add(k);k.attr({text:a||a===0?a:"",x:b,y:c});m&&t(e)&&k.attr({anchorX:e,anchorY:f})};k.widthSetter=function(a){p=a};k.heightSetter=function(a){v=a};k.paddingSetter=function(a){if(t(a)&&a!==r)r=k.padding=a,E()};k.paddingLeftSetter=function(a){t(a)&&a!==A&&(A=a,E())};k.alignSetter=function(a){a={left:0,center:0.5,right:1}[a];a!==q&&(q=a,o&&k.attr({x:b}))};k.textSetter=function(a){a!==u&&l.textSetter(a);L();
E()};k["stroke-widthSetter"]=function(a,b){a&&(z=!0);ja=a%2/2;B(b,a)};k.strokeSetter=k.fillSetter=k.rSetter=function(a,b){b==="fill"&&a&&(z=!0);B(b,a)};k.anchorXSetter=function(a,b){e=a;B(b,y(a)-ja-x)};k.anchorYSetter=function(a,b){f=a;B(b,a-N)};k.xSetter=function(a){k.x=a;q&&(a-=q*((p||o.width)+2*r));x=y(a);k.attr("translateX",x)};k.ySetter=function(a){N=k.y=y(a);k.attr("translateY",N)};var D=k.css;return w(k,{css:function(a){if(a){var b={},a=C(a);n(k.textProps,function(c){a[c]!==u&&(b[c]=a[c],delete a[c])});
l.css(b)}return D.call(k,a)},getBBox:function(){return{width:o.width+2*r,height:o.height+2*r,x:o.x-r,y:o.y-r}},shadow:function(a){m&&m.shadow(a);return k},destroy:function(){R(k.element,"mouseenter");R(k.element,"mouseleave");l&&(l=l.destroy());m&&(m=m.destroy());Y.prototype.destroy.call(k);k=j=L=E=B=null}})}};$a=xa;w(Y.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&b.tagName==="SPAN"&&a.width)delete a.width,this.textWidth=b,this.updateTransform();if(a&&a.textOverflow==="ellipsis")a.whiteSpace=
"nowrap",a.overflow="hidden";this.styles=w(this.styles,a);I(this.element,a);return this},htmlGetBBox:function(){var a=this.element;if(a.nodeName==="text")a.style.position="absolute";return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,c=this.translateX||0,d=this.translateY||0,e=this.x||0,f=this.y||0,g=this.textAlign||"left",h={left:0,center:0.5,right:1}[g],i=this.shadows,j=this.styles;I(b,{marginLeft:c,
marginTop:d});i&&n(i,function(a){I(a,{marginLeft:c+1,marginTop:d+1})});this.inverted&&n(b.childNodes,function(c){a.invertChild(c,b)});if(b.tagName==="SPAN"){var i=this.rotation,k=G(this.textWidth),l=j&&j.whiteSpace,m=[i,g,b.innerHTML,this.textWidth,this.textAlign].join(",");if(m!==this.cTT){j=a.fontMetrics(b.style.fontSize).b;t(i)&&this.setSpanRotation(i,h,j);if(b.offsetWidth>k&&/[ \-]/.test(b.textContent||b.innerText))I(b,{width:k+"px",display:"block",whiteSpace:l||"normal"}),this.hasTextWidth=!0;
else if(this.hasTextWidth)I(b,{width:"",display:"",whiteSpace:l||"nowrap"}),this.hasTextWidth=!1;this.getSpanCorrection(this.hasTextWidth?k:b.offsetWidth,j,h,i,g)}I(b,{left:e+(this.xCorr||0)+"px",top:f+(this.yCorr||0)+"px"});if(tb)j=b.offsetHeight;this.cTT=m}}else this.alignOnAdd=!0},setSpanRotation:function(a,b,c){var d={},e=Ja?"-ms-transform":tb?"-webkit-transform":Za?"MozTransform":Vb?"-o-transform":"";d[e]=d.transform="rotate("+a+"deg)";d[e+(Za?"Origin":"-origin")]=d.transformOrigin=b*100+"% "+
c+"px";I(this.element,d)},getSpanCorrection:function(a,b,c){this.xCorr=-a*c;this.yCorr=-b}});w(xa.prototype,{html:function(a,b,c){var d=this.createElement("span"),e=d.element,f=d.renderer,g=function(a,b){n(["opacity","visibility"],function(c){S(a,c+"Setter",function(a,c,d,e){a.call(this,c,d,e);b[d]=c})})};d.textSetter=function(a){a!==e.innerHTML&&delete this.bBox;e.innerHTML=this.textStr=a;d.htmlUpdateTransform()};g(d,d.element.style);d.xSetter=d.ySetter=d.alignSetter=d.rotationSetter=function(a,
b){b==="align"&&(b="textAlign");d[b]=a;d.htmlUpdateTransform()};d.attr({text:a,x:y(b),y:y(c)}).css({position:"absolute",fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});e.style.whiteSpace="nowrap";d.css=d.htmlCss;if(f.isSVG)d.add=function(a){var b,c=f.box.parentNode,k=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)k.push(a),a=a.parentGroup;n(k.reverse(),function(a){var d,e=W(a.element,"class");e&&(e={className:e});b=a.div=a.div||ca(Ya,e,{position:"absolute",left:(a.translateX||0)+
"px",top:(a.translateY||0)+"px"},b||c);d=b.style;w(a,{translateXSetter:function(b,c){d.left=b+"px";a[c]=b;a.doTransform=!0},translateYSetter:function(b,c){d.top=b+"px";a[c]=b;a.doTransform=!0}});g(a,d)})}}else b=c;b.appendChild(e);d.added=!0;d.alignOnAdd&&d.htmlUpdateTransform();return d};return d}});var nb,Z;if(!ha&&!oa)Z={init:function(a,b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ","absolute",";"],e=b===Ya;(b==="shape"||e)&&d.push("left:0;top:0;width:1px;height:1px;");d.push("visibility: ",
e?"hidden":"visible");c.push(' style="',d.join(""),'"/>');if(b)c=e||b==="span"||b==="img"?c.join(""):a.prepVML(c),this.element=ca(c);this.renderer=a},add:function(a){var b=this.renderer,c=this.element,d=b.box,e=a&&a.inverted,d=a?a.element||a:d;if(a)this.parentGroup=a;e&&b.invertChild(c,d);d.appendChild(c);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();return this},updateTransform:Y.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=
this.rotation,b=aa(a*na),c=ia(a*na);I(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",b,", M12=",-c,", M21=",c,", M22=",b,", sizingMethod='auto expand')"].join(""):"none"})},getSpanCorrection:function(a,b,c,d,e){var f=d?aa(d*na):1,g=d?ia(d*na):0,h=p(this.elemHeight,this.element.offsetHeight),i;this.xCorr=f<0&&-a;this.yCorr=g<0&&-h;i=f*g<0;this.xCorr+=g*b*(i?1-c:c);this.yCorr-=f*b*(d?i?c:1-c:1);e&&e!=="left"&&(this.xCorr-=a*c*(f<0?-1:1),d&&(this.yCorr-=h*c*(g<0?-1:1)),I(this.element,
{textAlign:e}))},pathToVML:function(a){for(var b=a.length,c=[];b--;)if(ta(a[b]))c[b]=y(a[b]*10)-5;else if(a[b]==="Z")c[b]="x";else if(c[b]=a[b],a.isArc&&(a[b]==="wa"||a[b]==="at"))c[b+5]===c[b+7]&&(c[b+7]+=a[b+7]>a[b+5]?1:-1),c[b+6]===c[b+8]&&(c[b+8]+=a[b+8]>a[b+6]?1:-1);return c.join(" ")||"x"},clip:function(a){var b=this,c;a?(c=a.members,Aa(c,b),c.push(b),b.destroyClip=function(){Aa(c,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:sb?"inherit":"rect(auto)"});return b.css(a)},css:Y.prototype.htmlCss,
safeRemoveChild:function(a){a.parentNode&&Xa(a)},destroy:function(){this.destroyClip&&this.destroyClip();return Y.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=J.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var c,a=a.split(/[ ,]/);c=a.length;if(c===9||c===11)a[c-4]=a[c-2]=G(a[c-2])-10*b;return a.join(" ")},shadow:function(a,b,c){var d=[],e,f=this.element,g=this.renderer,h,i=f.style,j,k=f.path,l,m,o,q;k&&typeof k.value!=="string"&&
(k="x");m=k;if(a){o=p(a.width,3);q=(a.opacity||0.15)/o;for(e=1;e<=3;e++){l=o*2+1-2*e;c&&(m=this.cutOffPath(k.value,l+0.5));j=['<shape isShadow="true" strokeweight="',l,'" filled="false" path="',m,'" coordsize="10 10" style="',f.style.cssText,'" />'];h=ca(g.prepVML(j),null,{left:G(i.left)+p(a.offsetX,1),top:G(i.top)+p(a.offsetY,1)});if(c)h.cutOff=l+1;j=['<stroke color="',a.color||"black",'" opacity="',q*e,'"/>'];ca(g.prepVML(j),null,null,h);b?b.element.appendChild(h):f.parentNode.insertBefore(h,f);
d.push(h)}this.shadows=d}return this},updateShadows:pa,setAttr:function(a,b){sb?this.element[a]=b:this.element.setAttribute(a,b)},classSetter:function(a){this.element.className=a},dashstyleSetter:function(a,b,c){(c.getElementsByTagName("stroke")[0]||ca(this.renderer.prepVML(["<stroke/>"]),null,null,c))[b]=a||"solid";this[b]=a},dSetter:function(a,b,c){var d=this.shadows,a=a||[];this.d=a.join&&a.join(" ");c.path=a=this.pathToVML(a);if(d)for(c=d.length;c--;)d[c].path=d[c].cutOff?this.cutOffPath(a,d[c].cutOff):
a;this.setAttr(b,a)},fillSetter:function(a,b,c){var d=c.nodeName;if(d==="SPAN")c.style.color=a;else if(d!=="IMG")c.filled=a!=="none",this.setAttr("fillcolor",this.renderer.color(a,c,b,this))},"fill-opacitySetter":function(a,b,c){ca(this.renderer.prepVML(["<",b.split("-")[0],' opacity="',a,'"/>']),null,null,c)},opacitySetter:pa,rotationSetter:function(a,b,c){c=c.style;this[b]=c[b]=a;c.left=-y(ia(a*na)+1)+"px";c.top=y(aa(a*na))+"px"},strokeSetter:function(a,b,c){this.setAttr("strokecolor",this.renderer.color(a,
c,b,this))},"stroke-widthSetter":function(a,b,c){c.stroked=!!a;this[b]=a;ta(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,c){a==="inherit"&&(a="visible");this.shadows&&n(this.shadows,function(c){c.style[b]=a});c.nodeName==="DIV"&&(a=a==="hidden"?"-999em":0,sb||(c.style[b]=a?"visible":"hidden"),b="top");c.style[b]=a},xSetter:function(a,b,c){this[b]=a;b==="x"?b="left":b==="y"&&(b="top");this.updateClipping?(this[b]=a,this.updateClipping()):
c.style[b]=a},zIndexSetter:function(a,b,c){c.style[b]=a}},Z["stroke-opacitySetter"]=Z["fill-opacitySetter"],z.VMLElement=Z=ka(Y,Z),Z.prototype.ySetter=Z.prototype.widthSetter=Z.prototype.heightSetter=Z.prototype.xSetter,Z={Element:Z,isIE8:La.indexOf("MSIE 8.0")>-1,init:function(a,b,c,d){var e;this.alignedObjects=[];d=this.createElement(Ya).css(w(this.getStyle(d),{position:"relative"}));e=d.element;a.appendChild(d.element);this.isVML=!0;this.box=e;this.boxWrapper=d;this.gradients={};this.cache={};
this.cacheKeys=[];this.imgCount=0;this.setSize(b,c,!1);if(!B.namespaces.hcv){B.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{B.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(f){B.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,c,d){var e=this.createElement(),
f=fa(a);return w(e,{members:[],count:0,left:(f?a.x:a)+1,top:(f?a.y:b)+1,width:(f?a.width:c)-1,height:(f?a.height:d)-1,getCSS:function(a){var b=a.element,c=b.nodeName,a=a.inverted,d=this.top-(c==="shape"?b.offsetTop:0),e=this.left,b=e+this.width,f=d+this.height,d={clip:"rect("+y(a?e:d)+"px,"+y(a?f:b)+"px,"+y(a?b:f)+"px,"+y(a?d:e)+"px)"};!a&&sb&&c==="DIV"&&w(d,{width:b+"px",height:f+"px"});return d},updateClipping:function(){n(e.members,function(a){a.element&&a.css(e.getCSS(a))})}})},color:function(a,
b,c,d){var e=this,f,g=/^rgba/,h,i,j="none";a&&a.linearGradient?i="gradient":a&&a.radialGradient&&(i="pattern");if(i){var k,l,m=a.linearGradient||a.radialGradient,o,q,r,A,p,v="",a=a.stops,x,N=[],ja=function(){h=['<fill colors="'+N.join(",")+'" opacity="',r,'" o:opacity2="',q,'" type="',i,'" ',v,'focus="100%" method="any" />'];ca(e.prepVML(h),null,null,b)};o=a[0];x=a[a.length-1];o[0]>0&&a.unshift([0,o[1]]);x[0]<1&&a.push([1,x[1]]);n(a,function(a,b){g.test(a[1])?(f=va(a[1]),k=f.get("rgb"),l=f.get("a")):
(k=a[1],l=1);N.push(a[0]*100+"% "+k);b?(r=l,A=k):(q=l,p=k)});if(c==="fill")if(i==="gradient")c=m.x1||m[0]||0,a=m.y1||m[1]||0,o=m.x2||m[2]||0,m=m.y2||m[3]||0,v='angle="'+(90-X.atan((m-a)/(o-c))*180/Ba)+'"',ja();else{var j=m.r,Ua=j*2,t=j*2,u=m.cx,s=m.cy,y=b.radialReference,w,j=function(){y&&(w=d.getBBox(),u+=(y[0]-w.x)/w.width-0.5,s+=(y[1]-w.y)/w.height-0.5,Ua*=y[2]/w.width,t*=y[2]/w.height);v='src="'+O.global.VMLRadialGradientURL+'" size="'+Ua+","+t+'" origin="0.5,0.5" position="'+u+","+s+'" color2="'+
p+'" ';ja()};d.added?j():d.onAdd=j;j=A}else j=k}else if(g.test(a)&&b.tagName!=="IMG")f=va(a),d[c+"-opacitySetter"](f.get("a"),c,b),j=f.get("rgb");else{j=b.getElementsByTagName(c);if(j.length)j[0].opacity=1,j[0].type="solid";j=a}return j},prepVML:function(a){var b=this.isIE8,a=a.join("");b?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=a.indexOf('style="')===-1?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):
a=a.replace("<","<hcv:");return a},text:xa.prototype.html,path:function(a){var b={coordsize:"10 10"};Na(a)?b.d=a:fa(a)&&w(b,a);return this.createElement("shape").attr(b)},circle:function(a,b,c){var d=this.symbol("circle");if(fa(a))c=a.r,b=a.y,a=a.x;d.isCircle=!0;d.r=c;return d.attr({x:a,y:b})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement(Ya).attr(b)},image:function(a,b,c,d,e){var f=this.createElement("img").attr({src:a});arguments.length>
1&&f.attr({x:b,y:c,width:d,height:e});return f},createElement:function(a){return a==="rect"?this.symbol(a):xa.prototype.createElement.call(this,a)},invertChild:function(a,b){var c=this,d=b.style,e=a.tagName==="IMG"&&a.style;I(a,{flip:"x",left:G(d.width)-(e?G(e.top):1),top:G(d.height)-(e?G(e.left):1),rotation:-90});n(a.childNodes,function(b){c.invertChild(b,a)})},symbols:{arc:function(a,b,c,d,e){var f=e.start,g=e.end,h=e.r||c||d,c=e.innerR,d=aa(f),i=ia(f),j=aa(g),k=ia(g);if(g-f===0)return["x"];f=["wa",
a-h,b-h,a+h,b+h,a+h*d,b+h*i,a+h*j,b+h*k];e.open&&!c&&f.push("e","M",a,b);f.push("at",a-c,b-c,a+c,b+c,a+c*j,b+c*k,a+c*d,b+c*i,"x","e");f.isArc=!0;return f},circle:function(a,b,c,d,e){e&&(c=d=2*e.r);e&&e.isCircle&&(a-=c/2,b-=d/2);return["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,b+d/2,"e"]},rect:function(a,b,c,d,e){return xa.prototype.symbols[!t(e)||!e.r?"square":"callout"].call(0,a,b,c,d,e)}}},z.VMLRenderer=nb=function(){this.init.apply(this,arguments)},nb.prototype=C(xa.prototype,Z),$a=nb;xa.prototype.measureSpanWidth=
function(a,b){var c=B.createElement("span"),d;d=B.createTextNode(a);c.appendChild(d);I(c,b);this.box.appendChild(c);d=c.offsetWidth;Xa(c);return d};var Xb;if(oa)z.CanVGRenderer=Z=function(){Ra="http://www.w3.org/1999/xhtml"},Z.prototype.symbols={},Xb=function(){function a(){var a=b.length,d;for(d=0;d<a;d++)b[d]();b=[]}var b=[];return{push:function(c,d){if(b.length===0){var e=B.getElementsByTagName("head")[0],f=B.createElement("script");f.type="text/javascript";f.src=d;f.onload=a;e.appendChild(f)}b.push(c)}}}(),
$a=Z;db.prototype={addLabel:function(){var a=this.axis,b=a.options,c=a.chart,d=a.categories,e=a.names,f=this.pos,g=b.labels,h=a.tickPositions,i=f===h[0],j=f===h[h.length-1],e=d?p(d[f],e[f],f):f,d=this.label,h=h.info,k;a.isDatetimeAxis&&h&&(k=b.dateTimeLabelFormats[h.higherRanks[f]||h.unitName]);this.isFirst=i;this.isLast=j;b=a.labelFormatter.call({axis:a,chart:c,isFirst:i,isLast:j,dateTimeLabelFormat:k,value:a.isLog?ma(za(e)):e});t(d)?d&&d.attr({text:b}):(this.labelLength=(this.label=d=t(b)&&g.enabled?
c.renderer.text(b,0,0,g.useHTML).css(C(g.style)).add(a.labelGroup):null)&&d.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var b=this.axis,c=a.x,d=b.chart.chartWidth,e=b.chart.spacing,f=p(b.labelLeft,E(b.pos,e[3])),e=p(b.labelRight,s(b.pos+b.len,d-e[1])),g=this.label,h=this.rotation,i={left:0,center:0.5,right:1}[b.labelAlign],j=g.getBBox().width,k=b.slotWidth,l=1,m,o={};if(h)h<0&&c-i*
j<f?m=y(c/aa(h*na)-f):h>0&&c+i*j>e&&(m=y((d-c)/aa(h*na)));else if(d=c+(1-i)*j,c-i*j<f?k=a.x+k*(1-i)-f:d>e&&(k=e-a.x+k*i,l=-1),k=E(b.slotWidth,k),k<b.slotWidth&&b.labelAlign==="center"&&(a.x+=l*(b.slotWidth-k-i*(b.slotWidth-E(j,k)))),j>k||b.autoRotation&&g.styles.width)m=k;if(m){o.width=m;if(!b.options.labels.style.textOverflow)o.textOverflow="ellipsis";g.css(o)}},getPosition:function(a,b,c,d){var e=this.axis,f=e.chart,g=d&&f.oldChartHeight||f.chartHeight;return{x:a?e.translate(b+c,null,null,d)+e.transB:
e.left+e.offset+(e.opposite?(d&&f.oldChartWidth||f.chartWidth)-e.right-e.left:0),y:a?g-e.bottom+e.offset-(e.opposite?e.height:0):g-e.translate(b+c,null,null,d)-e.transB}},getLabelPosition:function(a,b,c,d,e,f,g,h){var i=this.axis,j=i.transA,k=i.reversed,l=i.staggerLines,m=i.tickRotCorr||{x:0,y:0},o=e.y;t(o)||(o=i.side===2?m.y+8:o=aa(c.rotation*na)*(m.y-c.getBBox(!1,0).height/2));a=a+e.x+m.x-(f&&d?f*j*(k?-1:1):0);b=b+o-(f&&!d?f*j*(k?1:-1):0);l&&(c=g/(h||1)%l,i.opposite&&(c=l-c-1),b+=c*(i.labelOffset/
l));return{x:a,y:y(b)}},getMarkPath:function(a,b,c,d,e,f){return f.crispLine(["M",a,b,"L",a+(e?0:-c),b+(e?c:0)],d)},render:function(a,b,c){var d=this.axis,e=d.options,f=d.chart.renderer,g=d.horiz,h=this.type,i=this.label,j=this.pos,k=e.labels,l=this.gridLine,m=h?h+"Grid":"grid",o=h?h+"Tick":"tick",q=e[m+"LineWidth"],r=e[m+"LineColor"],A=e[m+"LineDashStyle"],n=e[o+"Length"],m=p(e[o+"Width"],!h&&d.isXAxis?1:0),v=e[o+"Color"],x=e[o+"Position"],o=this.mark,N=k.step,ja=!0,t=d.tickmarkOffset,s=this.getPosition(g,
j,t,b),y=s.x,s=s.y,w=g&&y===d.pos+d.len||!g&&s===d.pos?-1:1,c=p(c,1);this.isActive=!0;if(q){j=d.getPlotLinePath(j+t,q*w,b,!0);if(l===u){l={stroke:r,"stroke-width":q};if(A)l.dashstyle=A;if(!h)l.zIndex=1;if(b)l.opacity=0;this.gridLine=l=q?f.path(j).attr(l).add(d.gridGroup):null}if(!b&&l&&j)l[this.isNew?"attr":"animate"]({d:j,opacity:c})}if(m&&n)x==="inside"&&(n=-n),d.opposite&&(n=-n),h=this.getMarkPath(y,s,n,m*w,g,f),o?o.animate({d:h,opacity:c}):this.mark=f.path(h).attr({stroke:v,"stroke-width":m,opacity:c}).add(d.axisGroup);
if(i&&!isNaN(y))i.xy=s=this.getLabelPosition(y,s,i,g,k,t,a,N),this.isFirst&&!this.isLast&&!p(e.showFirstLabel,1)||this.isLast&&!this.isFirst&&!p(e.showLastLabel,1)?ja=!1:g&&!d.isRadial&&!k.step&&!k.rotation&&!b&&c!==0&&this.handleOverflow(s),N&&a%N&&(ja=!1),ja&&!isNaN(s.y)?(s.opacity=c,i[this.isNew?"attr":"animate"](s),this.isNew=!1):i.attr("y",-9999)},destroy:function(){Qa(this,this.axis)}};z.PlotLineOrBand=function(a,b){this.axis=a;if(b)this.options=b,this.id=b.id};z.PlotLineOrBand.prototype={render:function(){var a=
this,b=a.axis,c=b.horiz,d=a.options,e=d.label,f=a.label,g=d.width,h=d.to,i=d.from,j=t(i)&&t(h),k=d.value,l=d.dashStyle,m=a.svgElem,o=[],q,r=d.color,A=p(d.zIndex,0),n=d.events,v={},x=b.chart.renderer;b.isLog&&(i=Oa(i),h=Oa(h),k=Oa(k));if(g){if(o=b.getPlotLinePath(k,g),v={stroke:r,"stroke-width":g},l)v.dashstyle=l}else if(j){o=b.getPlotBandPath(i,h,d);if(r)v.fill=r;if(d.borderWidth)v.stroke=d.borderColor,v["stroke-width"]=d.borderWidth}else return;v.zIndex=A;if(m)if(o)m.show(),m.animate({d:o});else{if(m.hide(),
f)a.label=f=f.destroy()}else if(o&&o.length&&(a.svgElem=m=x.path(o).attr(v).add(),n))for(q in d=function(b){m.on(b,function(c){n[b].apply(a,[c])})},n)d(q);e&&t(e.text)&&o&&o.length&&b.width>0&&b.height>0&&!o.flat?(e=C({align:c&&j&&"center",x:c?!j&&4:10,verticalAlign:!c&&j&&"middle",y:c?j?16:10:j?6:-4,rotation:c&&!j&&90},e),this.renderLabel(e,o,j,A)):f&&f.hide();return a},renderLabel:function(a,b,c,d){var e=this.label,f=this.axis.chart.renderer;if(!e)e={align:a.textAlign||a.align,rotation:a.rotation},
e.zIndex=d,this.label=e=f.text(a.text,0,0,a.useHTML).attr(e).css(a.style).add();d=[b[1],b[4],c?b[6]:b[1]];b=[b[2],b[5],c?b[7]:b[2]];c=Pa(d);f=Pa(b);e.align(a,!1,{x:c,y:f,width:Ea(d)-c,height:Ea(b)-f});e.show()},destroy:function(){Aa(this.axis.plotLinesAndBands,this);delete this.axis;Qa(this)}};var F=z.Axis=function(){this.init.apply(this,arguments)};F.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",
month:"%b '%y",year:"%Y"},endOnTick:!1,gridLineColor:"#D8D8D8",labels:{enabled:!0,style:{color:"#606060",cursor:"default",fontSize:"11px"},x:0,y:15},lineColor:"#C0D0E0",lineWidth:1,minPadding:0.01,maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickColor:"#C0D0E0",tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#707070"}},
type:"linear"},defaultYAxisOptions:{endOnTick:!0,gridLineWidth:1,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8,y:3},lineWidth:0,maxPadding:0.05,minPadding:0.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return z.numberFormat(this.total,-1)},style:C(V.line.dataLabels.style,{color:"#000000"})}},defaultLeftAxisOptions:{labels:{x:-15,y:null},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15,y:null},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],
x:0,y:null},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0,y:-15},title:{rotation:0}},init:function(a,b){var c=b.isX;this.chart=a;this.horiz=a.inverted?!c:c;this.coll=(this.isXAxis=c)?"xAxis":"yAxis";this.opposite=b.opposite;this.side=b.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(b);var d=this.options,e=d.type;this.labelFormatter=d.labels.formatter||this.defaultLabelFormatter;this.userOptions=b;this.minPixelPadding=0;this.reversed=d.reversed;this.visible=
d.visible!==!1;this.zoomEnabled=d.zoomEnabled!==!1;this.categories=d.categories||e==="category";this.names=this.names||[];this.isLog=e==="logarithmic";this.isDatetimeAxis=e==="datetime";this.isLinked=t(d.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=d.minRange||d.maxZoom;this.range=d.range;this.offset=d.offset||0;this.stacks={};this.oldStacks={};this.stacksTouched=0;this.min=this.max=null;this.crosshair=
p(d.crosshair,ua(a.options.tooltip.crosshairs)[c?0:1],!1);var f,d=this.options.events;qa(this,a.axes)===-1&&(c&&!this.isColorAxis?a.axes.splice(a.xAxis.length,0,this):a.axes.push(this),a[this.coll].push(this));this.series=this.series||[];if(a.inverted&&c&&this.reversed===u)this.reversed=!0;this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(f in d)D(this,f,d[f]);if(this.isLog)this.val2lin=Oa,this.lin2val=za},setOptions:function(a){this.options=C(this.defaultOptions,this.isXAxis?
{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],C(O[this.coll],a))},defaultLabelFormatter:function(){var a=this.axis,b=this.value,c=a.categories,d=this.dateTimeLabelFormat,e=O.lang.numericSymbols,f=e&&e.length,g,h=a.options.labels.format,a=a.isLog?b:a.tickInterval;if(h)g=Ka(h,this);else if(c)g=b;else if(d)g=la(d,b);else if(f&&a>=1E3)for(;f--&&g===u;)c=Math.pow(1E3,f+1),a>=c&&b*10%c===0&&e[f]!==
null&&(g=z.numberFormat(b/c,-1)+e[f]);g===u&&(g=Q(b)>=1E4?z.numberFormat(b,-1):z.numberFormat(b,-1,u,""));return g},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();n(a.series,function(c){if(c.visible||!b.options.chart.ignoreHiddenSeries){var d=c.options,e=d.threshold,f;a.hasVisibleSeries=!0;a.isLog&&e<=0&&(e=null);if(a.isXAxis){if(d=c.xData,d.length)a.dataMin=E(p(a.dataMin,d[0]),
Pa(d)),a.dataMax=s(p(a.dataMax,d[0]),Ea(d))}else{c.getExtremes();f=c.dataMax;c=c.dataMin;if(t(c)&&t(f))a.dataMin=E(p(a.dataMin,c),c),a.dataMax=s(p(a.dataMax,f),f);if(t(e))a.threshold=e;if(!d.softThreshold||a.isLog)a.softThreshold=!1}}})},translate:function(a,b,c,d,e,f){var g=this.linkedParent||this,h=1,i=0,j=d?g.oldTransA:g.transA,d=d?g.oldMin:g.min,k=g.minPixelPadding,e=(g.isOrdinal||g.isBroken||g.isLog&&e)&&g.lin2val;if(!j)j=g.transA;if(c)h*=-1,i=g.len;g.reversed&&(h*=-1,i-=h*(g.sector||g.len));
b?(a=a*h+i,a-=k,a=a/j+d,e&&(a=g.lin2val(a))):(e&&(a=g.val2lin(a)),f==="between"&&(f=0.5),a=h*(a-d)*j+i+h*k+(ta(f)?j*f*g.pointRange:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,d,e){var f=this.chart,g=this.left,h=this.top,i,j,k=c&&f.oldChartHeight||f.chartHeight,l=c&&f.oldChartWidth||f.chartWidth,m;i=this.transB;var o=function(a,
b,c){if(a<b||a>c)d?a=E(s(b,a),c):m=!0;return a},e=p(e,this.translate(a,null,null,c)),a=c=y(e+i);i=j=y(k-e-i);isNaN(e)?m=!0:this.horiz?(i=h,j=k-this.bottom,a=c=o(a,g,g+this.width)):(a=g,c=l-this.right,i=j=o(i,h,h+this.height));return m&&!d?null:f.renderer.crispLine(["M",a,i,"L",c,j],b||1)},getLinearTickPositions:function(a,b,c){var d,e=ma(U(b/a)*a),f=ma(Fa(c/a)*a),g=[];if(b===c&&ta(b))return[b];for(b=e;b<=f;){g.push(b);b=ma(b+a);if(b===d)break;d=b}return g},getMinorTickPositions:function(){var a=this.options,
b=this.tickPositions,c=this.minorTickInterval,d=[],e,f=this.pointRangePadding||0;e=this.min-f;var f=this.max+f,g=f-e;if(g&&g/c<this.len/3)if(this.isLog){f=b.length;for(e=1;e<f;e++)d=d.concat(this.getLogTickPositions(c,b[e-1],b[e],!0))}else if(this.isDatetimeAxis&&a.minorTickInterval==="auto")d=d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c),e,f,a.startOfWeek));else for(b=e+(b[0]-e)%c;b<=f;b+=c)d.push(b);d.length!==0&&this.trimTicks(d,a.startOnTick,a.endOnTick);return d},adjustForMinRange:function(){var a=
this.options,b=this.min,c=this.max,d,e=this.dataMax-this.dataMin>=this.minRange,f,g,h,i,j,k;if(this.isXAxis&&this.minRange===u&&!this.isLog)t(a.min)||t(a.max)?this.minRange=null:(n(this.series,function(a){i=a.xData;for(g=j=a.xIncrement?1:i.length-1;g>0;g--)if(h=i[g]-i[g-1],f===u||h<f)f=h}),this.minRange=E(f*5,this.dataMax-this.dataMin));if(c-b<this.minRange){k=this.minRange;d=(k-c+b)/2;d=[b-d,p(a.min,b-d)];if(e)d[2]=this.dataMin;b=Ea(d);c=[b+k,p(a.max,b+k)];if(e)c[2]=this.dataMax;c=Pa(c);c-b<k&&(d[0]=
c-k,d[1]=p(a.min,c-k),b=Ea(d))}this.min=b;this.max=c},setAxisTranslation:function(a){var b=this,c=b.max-b.min,d=b.axisPointRange||0,e,f=0,g=0,h=b.linkedParent,i=!!b.categories,j=b.transA,k=b.isXAxis;if(k||i||d)if(h?(f=h.minPointOffset,g=h.pointRangePadding):(n(b.series,function(a){var b=a.closestPointRange;!a.noSharedTooltip&&t(b)&&(e=t(e)?E(e,b):b)}),n(b.series,function(a){var c=i?1:k?p(a.options.pointRange,e,0):b.axisPointRange||0,a=a.options.pointPlacement;d=s(d,c);b.single||(f=s(f,Da(a)?0:c/2),
g=s(g,a==="on"?0:c))})),h=b.ordinalSlope&&e?b.ordinalSlope/e:1,b.minPointOffset=f*=h,b.pointRangePadding=g*=h,b.pointRange=E(d,c),k)b.closestPointRange=e;if(a)b.oldTransA=j;b.translationSlope=b.transA=j=b.len/(c+g||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=j*f},minFromRange:function(){return this.max-this.range},setTickInterval:function(a){var b=this,c=b.chart,d=b.options,e=b.isLog,f=b.isDatetimeAxis,g=b.isXAxis,h=b.isLinked,i=d.maxPadding,j=d.minPadding,k=d.tickInterval,l=d.tickPixelInterval,
m=b.categories,o=b.threshold,q=b.softThreshold,r,A,T,v;!f&&!m&&!h&&this.getTickAmount();T=p(b.userMin,d.min);v=p(b.userMax,d.max);h?(b.linkedParent=c[b.coll][d.linkedTo],c=b.linkedParent.getExtremes(),b.min=p(c.min,c.dataMin),b.max=p(c.max,c.dataMax),d.type!==b.linkedParent.options.type&&ea(11,1)):(!q&&t(o)&&(b.dataMin>=o?(r=o,j=0):b.dataMax<=o&&(A=o,i=0)),b.min=p(T,r,b.dataMin),b.max=p(v,A,b.dataMax));if(e)!a&&E(b.min,p(b.dataMin,b.min))<=0&&ea(10,1),b.min=ma(Oa(b.min),15),b.max=ma(Oa(b.max),15);
if(b.range&&t(b.max))b.userMin=b.min=T=s(b.min,b.minFromRange()),b.userMax=v=b.max,b.range=null;b.beforePadding&&b.beforePadding();b.adjustForMinRange();if(!m&&!b.axisPointRange&&!b.usePercentage&&!h&&t(b.min)&&t(b.max)&&(c=b.max-b.min))!t(T)&&j&&(b.min-=c*j),!t(v)&&i&&(b.max+=c*i);if(ta(d.floor))b.min=s(b.min,d.floor);if(ta(d.ceiling))b.max=E(b.max,d.ceiling);if(q&&t(b.dataMin))if(o=o||0,!t(T)&&b.min<o&&b.dataMin>=o)b.min=o;else if(!t(v)&&b.max>o&&b.dataMax<=o)b.max=o;b.tickInterval=b.min===b.max||
b.min===void 0||b.max===void 0?1:h&&!k&&l===b.linkedParent.options.tickPixelInterval?k=b.linkedParent.tickInterval:p(k,this.tickAmount?(b.max-b.min)/s(this.tickAmount-1,1):void 0,m?1:(b.max-b.min)*l/s(b.len,l));g&&!a&&n(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();if(b.postProcessTickInterval)b.tickInterval=b.postProcessTickInterval(b.tickInterval);if(b.pointRange&&!k)b.tickInterval=s(b.pointRange,
b.tickInterval);a=p(d.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);if(!k&&b.tickInterval<a)b.tickInterval=a;if(!f&&!e&&!k)b.tickInterval=Bb(b.tickInterval,null,Ab(b.tickInterval),p(d.allowDecimals,!(b.tickInterval>0.5&&b.tickInterval<5&&b.max>1E3&&b.max<9999)),!!this.tickAmount);if(!this.tickAmount&&this.len)b.tickInterval=b.unsquish();this.setTickPositions()},setTickPositions:function(){var a=this.options,b,c=a.tickPositions,d=a.tickPositioner,e=a.startOnTick,f=a.endOnTick,g;this.tickmarkOffset=
this.categories&&a.tickmarkPlacement==="between"&&this.tickInterval===1?0.5:0;this.minorTickInterval=a.minorTickInterval==="auto"&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.tickPositions=b=c&&c.slice();if(!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,
this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,d&&(d=d.apply(this,[this.min,this.max]))))this.tickPositions=b=d;if(!this.isLinked)this.trimTicks(b,e,f),this.min===this.max&&t(this.min)&&!this.tickAmount&&(g=!0,this.min-=0.5,this.max+=0.5),this.single=g,!c&&!d&&this.adjustTickAmount()},trimTicks:function(a,b,c){var d=a[0],e=a[a.length-1],f=this.minPointOffset||0;if(b)this.min=d;else for(;this.min-f>a[0];)a.shift();if(c)this.max=e;else for(;this.max+f<a[a.length-1];)a.pop();
a.length===0&&t(d)&&a.push((e+d)/2)},alignToOthers:function(){var a={},b,c=this.options;this.chart.options.chart.alignTicks!==!1&&c.alignTicks!==!1&&n(this.chart[this.coll],function(c){var e=c.options,e=[c.horiz?e.left:e.top,e.width,e.height,e.pane].join(",");c.series.length&&(a[e]?b=!0:a[e]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,c=a.tickPixelInterval;!t(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&
(b=Fa(this.len/c)+1);if(b<4)this.finalTickAmt=b,b=5;this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,c=this.tickAmount,d=this.finalTickAmt,e=b&&b.length;if(e<c){for(;b.length<c;)b.push(ma(b[b.length-1]+a));this.transA*=(e-1)/(c-1);this.max=b[b.length-1]}else e>c&&(this.tickInterval*=2,this.setTickPositions());if(t(d)){for(a=c=b.length;a--;)(d===3&&a%2===1||d<=2&&a>0&&a<c-1)&&b.splice(a,1);this.finalTickAmt=u}},setScale:function(){var a,b;this.oldMin=this.min;
this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;n(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});if(b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()){if(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,!this.isDirty)this.isDirty=b||
this.min!==this.oldMin||this.max!==this.oldMax}else this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,c,d,e){var f=this,g=f.chart,c=p(c,!0);n(f.series,function(a){delete a.kdTree});e=w(e,{min:a,max:b});M(f,"setExtremes",e,function(){f.userMin=a;f.userMax=b;f.eventArgs=e;c&&g.redraw(d)})},zoom:function(a,b){var c=this.dataMin,d=this.dataMax,e=this.options,f=E(c,p(e.min,c)),e=s(d,p(e.max,d));this.allowZoomOutside||(t(c)&&a<=f&&(a=f),t(d)&&b>=e&&(b=e));this.displayBtn=a!==u||b!==u;this.setExtremes(a,
b,!1,u,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsetLeft||0,d=this.horiz,e=p(b.width,a.plotWidth-c+(b.offsetRight||0)),f=p(b.height,a.plotHeight),g=p(b.top,a.plotTop),b=p(b.left,a.plotLeft+c),c=/%$/;c.test(f)&&(f=Math.round(parseFloat(f)/100*a.plotHeight));c.test(g)&&(g=Math.round(parseFloat(g)/100*a.plotHeight+a.plotTop));this.left=b;this.top=g;this.width=e;this.height=f;this.bottom=a.chartHeight-f-g;this.right=a.chartWidth-e-b;this.len=s(d?e:f,0);
this.pos=d?b:g},getExtremes:function(){var a=this.isLog;return{min:a?ma(za(this.min)):this.min,max:a?ma(za(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,c=b?za(this.min):this.min,b=b?za(this.max):this.max;a===null?a=b<0?b:c:c>a?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(p(a,0)-this.side*90+720)%360;return a>15&&a<165?"right":a>195&&a<345?"left":"center"},unsquish:function(){var a=
this.ticks,b=this.options.labels,c=this.horiz,d=this.tickInterval,e=d,f=this.len/(((this.categories?1:0)+this.max-this.min)/d),g,h=b.rotation,i=this.chart.renderer.fontMetrics(b.style.fontSize,a[0]&&a[0].label),j,k=Number.MAX_VALUE,l,m=function(a){a/=f||1;a=a>1?Fa(a):1;return a*d};c?(l=!b.staggerLines&&!b.step&&(t(h)?[h]:f<p(b.autoRotationLimit,80)&&b.autoRotation))&&n(l,function(a){var b;if(a===h||a&&a>=-90&&a<=90)j=m(Q(i.h/ia(na*a))),b=j+Q(a/360),b<k&&(k=b,g=a,e=j)}):b.step||(e=m(i.h));this.autoRotation=
l;this.labelRotation=p(g,h);return e},renderUnsquish:function(){var a=this.chart,b=a.renderer,c=this.tickPositions,d=this.ticks,e=this.options.labels,f=this.horiz,g=a.margin,h=this.categories?c.length:c.length-1,g=this.slotWidth=f&&(e.step||0)<2&&!e.rotation&&(this.staggerLines||1)*a.plotWidth/h||!f&&(g[3]&&g[3]-a.spacing[3]||a.chartWidth*0.33),i=s(1,y(g-2*(e.padding||5))),j={},h=b.fontMetrics(e.style.fontSize,d[0]&&d[0].label),k=e.style.textOverflow,l,m=0,o,q;if(!Da(e.rotation))j.rotation=e.rotation||
0;if(this.autoRotation)n(c,function(a){if((a=d[a])&&a.labelLength>m)m=a.labelLength}),m>i&&m>h.h?j.rotation=this.labelRotation:this.labelRotation=0;else if(g&&(l={width:i+"px"},!k)){l.textOverflow="clip";for(o=c.length;!f&&o--;)if(q=c[o],i=d[q].label)if(i.styles.textOverflow==="ellipsis"&&i.css({textOverflow:"clip"}),i.getBBox().height>this.len/c.length-(h.h-h.f)||d[q].labelLength>g)i.specCss={textOverflow:"ellipsis"}}if(j.rotation&&(l={width:(m>a.chartHeight*0.5?a.chartHeight*0.33:a.chartHeight)+
"px"},!k))l.textOverflow="ellipsis";if(this.labelAlign=e.align||this.autoLabelAlign(this.labelRotation))j.align=this.labelAlign;n(c,function(a){var b=(a=d[a])&&a.label;if(b)b.attr(j),l&&b.css(C(l,b.specCss)),delete b.specCss,a.rotation=j.rotation});this.tickRotCorr=b.rotCorr(h.b,this.labelRotation||0,this.side!==0)},hasData:function(){return this.hasVisibleSeries||t(this.min)&&t(this.max)&&!!this.tickPositions},getOffset:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.tickPositions,f=
a.ticks,g=a.horiz,h=a.side,i=b.inverted?[1,0,3,2][h]:h,j,k,l=0,m,o=0,q=d.title,r=d.labels,A=0,T=a.opposite,v=b.axisOffset,b=b.clipOffset,x=[-1,1,1,-1][h],N,ja=a.axisParent;j=a.hasData();a.showAxis=k=j||p(d.showEmpty,!0);a.staggerLines=a.horiz&&r.staggerLines;if(!a.axisGroup)a.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).add(ja),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).add(ja),a.labelGroup=c.g("axis-labels").attr({zIndex:r.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels").add(ja);
if(j||a.isLinked){if(n(e,function(b){f[b]?f[b].addLabel():f[b]=new db(a,b)}),a.renderUnsquish(),r.reserveSpace!==!1&&(h===0||h===2||{1:"left",3:"right"}[h]===a.labelAlign||a.labelAlign==="center")&&n(e,function(a){A=s(f[a].getLabelSize(),A)}),a.staggerLines)A*=a.staggerLines,a.labelOffset=A*(a.opposite?-1:1)}else for(N in f)f[N].destroy(),delete f[N];if(q&&q.text&&q.enabled!==!1){if(!a.axisTitle)a.axisTitle=c.text(q.text,0,0,q.useHTML).attr({zIndex:7,rotation:q.rotation||0,align:q.textAlign||{low:T?
"right":"left",middle:"center",high:T?"left":"right"}[q.align]}).addClass("highcharts-"+this.coll.toLowerCase()+"-title").css(q.style).add(a.axisGroup),a.axisTitle.isNew=!0;if(k)l=a.axisTitle.getBBox()[g?"height":"width"],m=q.offset,o=t(m)?0:p(q.margin,g?5:10);a.axisTitle[k?"show":"hide"](!0)}a.offset=x*p(d.offset,v[h]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};c=h===2?a.tickRotCorr.y:0;g=Math.abs(A)+o+(A&&x*(g?p(r.y,a.tickRotCorr.y+8):r.x)-c);a.axisTitleMargin=p(m,g);v[h]=s(v[h],a.axisTitleMargin+l+
x*a.offset,g);d=d.offset?0:U(d.lineWidth/2)*2;b[i]=s(b[i],d)},getLinePath:function(a){var b=this.chart,c=this.opposite,d=this.offset,e=this.horiz,f=this.left+(c?this.width:0)+d,d=b.chartHeight-this.bottom-(c?this.height:0)+d;c&&(a*=-1);return b.renderer.crispLine(["M",e?this.left:f,e?d:this.top,"L",e?b.chartWidth-this.right:f,e?d:b.chartHeight-this.bottom],a)},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,d=this.len,e=this.options.title,f=a?b:c,g=this.opposite,h=this.offset,
i=e.x||0,j=e.y||0,k=G(e.style.fontSize||12),d={low:f+(a?0:d),middle:f+d/2,high:f+(a?d:0)}[e.align],b=(a?c+this.height:b)+(a?1:-1)*(g?-1:1)*this.axisTitleMargin+(this.side===2?k:0);return{x:a?d+i:b+(g?this.width:0)+h+i,y:a?b+j-(g?this.height:0)+h:d+j}},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.isLog,f=a.isLinked,g=a.tickPositions,h=a.axisTitle,i=a.ticks,j=a.minorTicks,k=a.alternateBands,l=d.stackLabels,m=d.alternateGridColor,o=a.tickmarkOffset,q=d.lineWidth,r,A=b.hasRendered&&
t(a.oldMin)&&!isNaN(a.oldMin),p=a.showAxis,v=c.globalAnimation,x,N;a.labelEdge.length=0;a.overlap=!1;n([i,j,k],function(a){for(var b in a)a[b].isActive=!1});if(a.hasData()||f){a.minorTickInterval&&!a.categories&&n(a.getMinorTickPositions(),function(b){j[b]||(j[b]=new db(a,b,"minor"));A&&j[b].isNew&&j[b].render(null,!0);j[b].render(null,!1,1)});if(g.length&&(n(g,function(b,c){if(!f||b>=a.min&&b<=a.max)i[b]||(i[b]=new db(a,b)),A&&i[b].isNew&&i[b].render(c,!0,0.1),i[b].render(c)}),o&&(a.min===0||a.single)))i[-1]||
(i[-1]=new db(a,-1,null,!0)),i[-1].render(-1);m&&n(g,function(c,d){N=g[d+1]!==u?g[d+1]+o:a.max-o;if(d%2===0&&c<a.max&&N<=a.max+(b.polar?-o:o))k[c]||(k[c]=new z.PlotLineOrBand(a)),x=c+o,k[c].options={from:e?za(x):x,to:e?za(N):N,color:m},k[c].render(),k[c].isActive=!0});if(!a._addedPlotLB)n((d.plotLines||[]).concat(d.plotBands||[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0}n([i,j,k],function(a){var c,d,e=[],f=v?v.duration||500:0;for(c in a)if(!a[c].isActive)a[c].render(c,!1,0),a[c].isActive=
!1,e.push(c);bb(function(){for(d=e.length;d--;)a[e[d]]&&!a[e[d]].isActive&&(a[e[d]].destroy(),delete a[e[d]])},a===k||!b.hasRendered||!f?0:f)});if(q)r=a.getLinePath(q),a.axisLine?a.axisLine.animate({d:r}):a.axisLine=c.path(r).attr({stroke:d.lineColor,"stroke-width":q,zIndex:7}).add(a.axisGroup),a.axisLine[p?"show":"hide"](!0);if(h&&p)h[h.isNew?"attr":"animate"](a.getTitlePosition()),h.isNew=!1;l&&l.enabled&&a.renderStackTotals();a.isDirty=!1},redraw:function(){this.visible&&(this.render(),n(this.plotLinesAndBands,
function(a){a.render()}));n(this.series,function(a){a.isDirty=!0})},destroy:function(a){var b=this,c=b.stacks,d,e=b.plotLinesAndBands;a||R(b);for(d in c)Qa(c[d]),c[d]=null;n([b.ticks,b.minorTicks,b.alternateBands],function(a){Qa(a)});for(a=e.length;a--;)e[a].destroy();n("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","),function(a){b[a]&&(b[a]=b[a].destroy())});this.cross&&this.cross.destroy()},drawCrosshair:function(a,b){var c,d=this.crosshair,e,f;if(!this.crosshair||
(t(b)||!p(d.snap,!0))===!1)this.hideCrosshair();else if(p(d.snap,!0)?t(b)&&(c=this.isXAxis?b.plotX:this.len-b.plotY):c=this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos,c=this.isRadial?this.getPlotLinePath(this.isXAxis?b.x:p(b.stackY,b.y))||null:this.getPlotLinePath(null,null,null,null,c)||null,c===null)this.hideCrosshair();else if(e=this.categories&&!this.isRadial,f=p(d.width,e?this.transA:1),this.cross)this.cross.attr({d:c,visibility:"visible","stroke-width":f});else{e={"stroke-width":f,stroke:d.color||
(e?"rgba(155,200,255,0.2)":"#C0C0C0"),zIndex:p(d.zIndex,2)};if(d.dashStyle)e.dashstyle=d.dashStyle;this.cross=this.chart.renderer.path(c).attr(e).add()}},hideCrosshair:function(){this.cross&&this.cross.hide()}};w(F.prototype,{getPlotBandPath:function(a,b){var c=this.getPlotLinePath(b,null,null,!0),d=this.getPlotLinePath(a,null,null,!0);d&&c?(d.flat=d.toString()===c.toString(),d.push(c[4],c[5],c[1],c[2])):d=null;return d},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,
"plotLines")},addPlotBandOrLine:function(a,b){var c=(new z.PlotLineOrBand(this,a)).render(),d=this.userOptions;c&&(b&&(d[b]=d[b]||[],d[b].push(a)),this.plotLinesAndBands.push(c));return c},removePlotBandOrLine:function(a){for(var b=this.plotLinesAndBands,c=this.options,d=this.userOptions,e=b.length;e--;)b[e].id===a&&b[e].destroy();n([c.plotLines||[],d.plotLines||[],c.plotBands||[],d.plotBands||[]],function(b){for(e=b.length;e--;)b[e].id===a&&Aa(b,b[e])})}});F.prototype.getTimeTicks=function(a,b,c,
d){var e=[],f={},g=O.global.useUTC,h,i=new da(b-gb(b)),j=a.unitRange,k=a.count;if(t(b)){i[Qb](j>=H.second?0:k*U(i.getMilliseconds()/k));if(j>=H.second)i[Rb](j>=H.minute?0:k*U(i.getSeconds()/k));if(j>=H.minute)i[Sb](j>=H.hour?0:k*U(i[Cb]()/k));if(j>=H.hour)i[Tb](j>=H.day?0:k*U(i[Db]()/k));if(j>=H.day)i[Fb](j>=H.month?1:k*U(i[ib]()/k));j>=H.month&&(i[Gb](j>=H.year?0:k*U(i[jb]()/k)),h=i[kb]());j>=H.year&&(h-=h%k,i[Hb](h));if(j===H.week)i[Fb](i[ib]()-i[Eb]()+p(d,1));b=1;if(zb||hb)i=i.getTime(),i=new da(i+
gb(i));h=i[kb]();for(var d=i.getTime(),l=i[jb](),m=i[ib](),o=!g||!!hb,q=(H.day+(g?gb(i):i.getTimezoneOffset()*6E4))%H.day;d<c;)e.push(d),j===H.year?d=rb(h+b*k,0):j===H.month?d=rb(h,l+b*k):o&&(j===H.day||j===H.week)?d=rb(h,l,m+b*k*(j===H.day?1:7)):d+=j*k,b++;e.push(d);n(Ma(e,function(a){return j<=H.hour&&a%H.day===q}),function(a){f[a]="day"})}e.info=w(a,{higherRanks:f,totalRange:j*k});return e};F.prototype.normalizeTimeTickInterval=function(a,b){var c=b||[["millisecond",[1,2,5,10,20,25,50,100,200,
500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]],d=c[c.length-1],e=H[d[0]],f=d[1],g;for(g=0;g<c.length;g++)if(d=c[g],e=H[d[0]],f=d[1],c[g+1]&&a<=(e*f[f.length-1]+H[c[g+1][0]])/2)break;e===H.year&&a<5*e&&(f=[1,2,5]);c=Bb(a/e,f,d[0]==="year"?s(Ab(a/e),1):1);return{unitRange:e,count:c,unitName:d[0]}};F.prototype.getLogTickPositions=function(a,b,c,d){var e=this.options,f=this.len,g=[];if(!d)this._minorAutoInterval=
null;if(a>=0.5)a=y(a),g=this.getLinearTickPositions(a,b,c);else if(a>=0.08)for(var f=U(b),h,i,j,k,l,e=a>0.3?[1,2,4]:a>0.15?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<c+1&&!l;f++){i=e.length;for(h=0;h<i&&!l;h++)j=Oa(za(f)*e[h]),j>b&&(!d||k<=c)&&k!==u&&g.push(k),k>c&&(l=!0),k=j}else if(b=za(b),c=za(c),a=e[d?"minorTickInterval":"tickInterval"],a=p(a==="auto"?null:a,this._minorAutoInterval,(c-b)*(e.tickPixelInterval/(d?5:1))/((d?f/this.tickPositions.length:f)||1)),a=Bb(a,null,Ab(a)),g=ra(this.getLinearTickPositions(a,
b,c),Oa),!d)this._minorAutoInterval=a/5;if(!d)this.tickInterval=a;return g};var Mb=z.Tooltip=function(){this.init.apply(this,arguments)};Mb.prototype={init:function(a,b){var c=b.borderWidth,d=b.style,e=G(d.padding);this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.label=a.renderer.label("",0,0,b.shape||"callout",null,null,b.useHTML,null,"tooltip").attr({padding:e,fill:b.backgroundColor,"stroke-width":c,r:b.borderRadius,zIndex:8}).css(d).css({padding:0}).add().attr({y:-9999});
oa||this.label.shadow(b.shadow);this.shared=b.shared},destroy:function(){if(this.label)this.label=this.label.destroy();clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,b,c,d){var e=this,f=e.now,g=e.options.animation!==!1&&!e.isHidden&&(Q(a-f.x)>1||Q(b-f.y)>1),h=e.followPointer||e.len>1;w(f,{x:g?(2*f.x+a)/3:a,y:g?(f.y+b)/2:b,anchorX:h?u:g?(2*f.anchorX+c)/3:c,anchorY:h?u:g?(f.anchorY+d)/2:d});e.label.attr(f);if(g)clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&
e.move(a,b,c,d)},32)},hide:function(a){var b=this;clearTimeout(this.hideTimer);a=p(a,this.options.hideDelay,500);if(!this.isHidden)this.hideTimer=bb(function(){b.label[a?"fadeOut":"hide"]();b.isHidden=!0},a)},getAnchor:function(a,b){var c,d=this.chart,e=d.inverted,f=d.plotTop,g=d.plotLeft,h=0,i=0,j,k,a=ua(a);c=a[0].tooltipPos;this.followPointer&&b&&(b.chartX===u&&(b=d.pointer.normalize(b)),c=[b.chartX-d.plotLeft,b.chartY-f]);c||(n(a,function(a){j=a.series.yAxis;k=a.series.xAxis;h+=a.plotX+(!e&&k?
k.left-g:0);i+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&j?j.top-f:0)}),h/=a.length,i/=a.length,c=[e?d.plotWidth-i:h,this.shared&&!e&&a.length>1&&b?b.chartY-f:e?d.plotHeight-h:i]);return ra(c,y)},getPosition:function(a,b,c){var d=this.chart,e=this.distance,f={},g=c.h||0,h,i=["y",d.chartHeight,b,c.plotY+d.plotTop,d.plotTop,d.plotTop+d.plotHeight],j=["x",d.chartWidth,a,c.plotX+d.plotLeft,d.plotLeft,d.plotLeft+d.plotWidth],k=p(c.ttBelow,d.inverted&&!c.negative||!d.inverted&&c.negative),l=function(a,
b,c,d,h,i){var j=c<d-e,m=d+e+c<b,l=d-e-c;d+=e;if(k&&m)f[a]=d;else if(!k&&j)f[a]=l;else if(j)f[a]=E(i-c,l-g<0?l:l-g);else if(m)f[a]=s(h,d+g+c>b?d:d+g);else return!1},m=function(a,b,c,d){var g;d<e||d>b-e?g=!1:f[a]=d<c/2?1:d>b-c/2?b-c-2:d-c/2;return g},o=function(a){var b=i;i=j;j=b;h=a},q=function(){l.apply(0,i)!==!1?m.apply(0,j)===!1&&!h&&(o(!0),q()):h?f.x=f.y=0:(o(!0),q())};(d.inverted||this.len>1)&&o();q();return f},defaultFormatter:function(a){var b=this.points||ua(this),c;c=[a.tooltipFooterHeaderFormatter(b[0])];
c=c.concat(a.bodyFormatter(b));c.push(a.tooltipFooterHeaderFormatter(b[0],!0));return c.join("")},refresh:function(a,b){var c=this.chart,d=this.label,e=this.options,f,g,h,i={},j,k=[];j=e.formatter||this.defaultFormatter;var i=c.hoverPoints,l,m=this.shared;clearTimeout(this.hideTimer);this.followPointer=ua(a)[0].series.tooltipOptions.followPointer;h=this.getAnchor(a,b);f=h[0];g=h[1];m&&(!a.series||!a.series.noSharedTooltip)?(c.hoverPoints=a,i&&n(i,function(a){a.setState()}),n(a,function(a){a.setState("hover");
k.push(a.getLabelConfig())}),i={x:a[0].category,y:a[0].y},i.points=k,this.len=k.length,a=a[0]):i=a.getLabelConfig();j=j.call(i,this);i=a.series;this.distance=p(i.tooltipOptions.distance,16);j===!1?this.hide():(this.isHidden&&(Ta(d),d.attr("opacity",1).show()),d.attr({text:j}),l=e.borderColor||a.color||i.color||"#606060",d.attr({stroke:l}),this.updatePosition({plotX:f,plotY:g,negative:a.negative,ttBelow:a.ttBelow,h:h[2]||0}),this.isHidden=!1);M(c,"tooltipRefresh",{text:j,x:f+c.plotLeft,y:g+c.plotTop,
borderColor:l})},updatePosition:function(a){var b=this.chart,c=this.label,c=(this.options.positioner||this.getPosition).call(this,c.width,c.height,a);this.move(y(c.x),y(c.y||0),a.plotX+b.plotLeft,a.plotY+b.plotTop)},getXDateFormat:function(a,b,c){var d,b=b.dateTimeLabelFormats,e=c&&c.closestPointRange,f,g={millisecond:15,second:12,minute:9,hour:6,day:3},h,i="millisecond";if(e){h=la("%m-%d %H:%M:%S.%L",a.x);for(f in H){if(e===H.week&&+la("%w",a.x)===c.options.startOfWeek&&h.substr(6)==="00:00:00.000"){f=
"week";break}if(H[f]>e){f=i;break}if(g[f]&&h.substr(g[f])!=="01-01 00:00:00.000".substr(g[f]))break;f!=="week"&&(i=f)}f&&(d=b[f])}else d=b.day;return d||b.year},tooltipFooterHeaderFormatter:function(a,b){var c=b?"footer":"header",d=a.series,e=d.tooltipOptions,f=e.xDateFormat,g=d.xAxis,h=g&&g.options.type==="datetime"&&ta(a.key),c=e[c+"Format"];h&&!f&&(f=this.getXDateFormat(a,e,g));h&&f&&(c=c.replace("{point.key}","{point.key:"+f+"}"));return Ka(c,{point:a,series:d})},bodyFormatter:function(a){return ra(a,
function(a){var c=a.series.tooltipOptions;return(c.pointFormatter||a.point.tooltipFormatter).call(a.point,c.pointFormat)})}};var sa;eb=B&&B.documentElement.ontouchstart!==u;var ab=z.Pointer=function(a,b){this.init(a,b)};ab.prototype={init:function(a,b){var c=b.chart,d=c.events,e=oa?"":c.zoomType,c=a.inverted,f;this.options=b;this.chart=a;this.zoomX=f=/x/.test(e);this.zoomY=e=/y/.test(e);this.zoomHor=f&&!c||e&&c;this.zoomVert=e&&!c||f&&c;this.hasZoom=f||e;this.runChartClick=d&&!!d.click;this.pinchDown=
[];this.lastValidTouch={};if(z.Tooltip&&b.tooltip.enabled)a.tooltip=new Mb(a,b.tooltip),this.followTouchMove=p(b.tooltip.followTouchMove,!0);this.setDOMEvents()},normalize:function(a,b){var c,d,a=a||J.event;if(!a.target)a.target=a.srcElement;d=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;if(!b)this.chartPosition=b=Lb(this.chart.container);d.pageX===u?(c=s(a.x,a.clientX-b.left),d=a.y):(c=d.pageX-b.left,d=d.pageY-b.top);return w(a,{chartX:y(c),chartY:y(d)})},getCoordinates:function(a){var b=
{xAxis:[],yAxis:[]};n(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},runPointActions:function(a){var b=this.chart,c=b.series,d=b.tooltip,e=d?d.shared:!1,f=b.hoverPoint,g=b.hoverSeries,h=[Number.MAX_VALUE,Number.MAX_VALUE],i,j,k=[],l=[],m;if(!e&&!g)for(b=0;b<c.length;b++)if(c[b].directTouch||!c[b].options.stickyTracking)c=[];g&&(e?g.noSharedTooltip:g.directTouch)&&f?l=[f]:(n(c,function(b){i=b.noSharedTooltip&&e;j=!e&&
b.directTouch;b.visible&&!i&&!j&&p(b.options.enableMouseTracking,!0)&&(m=b.searchPoint(a,!i&&b.kdDimensions===1))&&k.push(m)}),n(k,function(a){a&&n(["dist","distX"],function(b,c){typeof a[b]==="number"&&a[b]<h[c]&&(h[c]=a[b],l[c]=a)})}));if(e)for(b=k.length;b--;)(k[b].clientX!==l[1].clientX||k[b].series.noSharedTooltip)&&k.splice(b,1);if(l[0]&&(l[0]!==this.prevKDPoint||d&&d.isHidden))if(e&&!l[0].series.noSharedTooltip)k.length&&d&&d.refresh(k,a),n(k,function(b){b.onMouseOver(a,b!==(g&&g.directTouch&&
f||l[0]))}),this.prevKDPoint=l[1];else{d&&d.refresh(l[0],a);if(!g||!g.directTouch)l[0].onMouseOver(a);this.prevKDPoint=l[0]}else c=g&&g.tooltipOptions.followPointer,d&&c&&!d.isHidden&&(c=d.getAnchor([{}],a),d.updatePosition({plotX:c[0],plotY:c[1]}));if(!this._onDocumentMouseMove)this._onDocumentMouseMove=function(a){if($[sa])$[sa].pointer.onDocumentMouseMove(a)},D(B,"mousemove",this._onDocumentMouseMove);n(e?k:[p(l[1],f)],function(b){var c=b&&b.series;c&&n(["xAxis","yAxis","colorAxis"],function(d){c[d]&&
c[d].drawCrosshair(a,b)})})},reset:function(a,b){var c=this.chart,d=c.hoverSeries,e=c.hoverPoint,f=c.hoverPoints,g=c.tooltip,h=g&&g.shared?f:e;(a=a&&g&&h)&&n(ua(h),function(b){b.plotX===void 0&&(a=!1)});if(a)g.refresh(h),e&&(e.setState(e.state,!0),n(c.axes,function(a){p(a.options.crosshair&&a.options.crosshair.snap,!0)?a.drawCrosshair(null,e):a.hideCrosshair()}));else{if(e)e.onMouseOut();f&&n(f,function(a){a.setState()});if(d)d.onMouseOut();g&&g.hide(b);if(this._onDocumentMouseMove)R(B,"mousemove",
this._onDocumentMouseMove),this._onDocumentMouseMove=null;n(c.axes,function(a){a.hideCrosshair()});this.hoverX=c.hoverPoints=c.hoverPoint=null}},scaleGroups:function(a,b){var c=this.chart,d;n(c.series,function(e){d=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&(e.group.attr(d),e.markerGroup&&(e.markerGroup.attr(d),e.markerGroup.clip(b?c.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d))});c.clipRect.attr(b||c.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=
!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,e=a.chartY,f=this.zoomHor,g=this.zoomVert,h=b.plotLeft,i=b.plotTop,j=b.plotWidth,k=b.plotHeight,l,m=this.selectionMarker,o=this.mouseDownX,q=this.mouseDownY,r=c.panKey&&a[c.panKey+"Key"];if(!m||!m.touch)if(d<h?d=h:d>h+j&&(d=h+j),e<i?e=i:e>i+k&&(e=i+k),this.hasDragged=Math.sqrt(Math.pow(o-d,2)+Math.pow(q-e,2)),this.hasDragged>10){l=b.isInsidePlot(o-h,q-i);if(b.hasCartesianSeries&&
(this.zoomX||this.zoomY)&&l&&!r&&!m)this.selectionMarker=m=b.renderer.rect(h,i,f?1:j,g?1:k,0).attr({fill:c.selectionMarkerFill||"rgba(69,114,167,0.25)",zIndex:7}).add();m&&f&&(d-=o,m.attr({width:Q(d),x:(d>0?0:d)+o}));m&&g&&(d=e-q,m.attr({height:Q(d),y:(d>0?0:d)+q}));l&&!m&&c.panning&&b.pan(a,c.panning)}},drop:function(a){var b=this,c=this.chart,d=this.hasPinched;if(this.selectionMarker){var e={originalEvent:a,xAxis:[],yAxis:[]},f=this.selectionMarker,g=f.attr?f.attr("x"):f.x,h=f.attr?f.attr("y"):
f.y,i=f.attr?f.attr("width"):f.width,j=f.attr?f.attr("height"):f.height,k;if(this.hasDragged||d)n(c.axes,function(c){if(c.zoomEnabled&&t(c.min)&&(d||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var f=c.horiz,o=a.type==="touchend"?c.minPixelPadding:0,q=c.toValue((f?g:h)+o),f=c.toValue((f?g+i:h+j)-o);e[c.coll].push({axis:c,min:E(q,f),max:s(q,f)});k=!0}}),k&&M(c,"selection",e,function(a){c.zoom(w(a,d?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();d&&this.scaleGroups()}if(c)I(c.container,
{cursor:c._cursor}),c.cancelClick=this.hasDragged>10,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[]},onContainerMouseDown:function(a){a=this.normalize(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(a){$[sa]&&$[sa].pointer.drop(a)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition,a=this.normalize(a,c);c&&!this.inClass(a.target,"highcharts-tracker")&&!b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)&&this.reset()},
onContainerMouseLeave:function(a){var b=$[sa];if(b&&(a.relatedTarget||a.toElement))b.pointer.reset(),b.pointer.chartPosition=null},onContainerMouseMove:function(a){var b=this.chart;if(!t(sa)||!$[sa].mouseIsDown)sa=b.index;a=this.normalize(a);a.returnValue=!1;b.mouseIsDown==="mousedown"&&this.drag(a);(this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop))&&!b.openMenu&&this.runPointActions(a)},inClass:function(a,b){for(var c;a;){if(c=W(a,"class")){if(c.indexOf(b)!==
-1)return!0;if(c.indexOf("highcharts-container")!==-1)return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries,a=a.relatedTarget||a.toElement;if(b&&a&&!b.options.stickyTracking&&!this.inClass(a,"highcharts-tooltip")&&!this.inClass(a,"highcharts-series-"+b.index))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,d=b.plotLeft,e=b.plotTop,a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(M(c.series,"click",w(a,{point:c})),
b.hoverPoint&&c.firePointEvent("click",a)):(w(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-e)&&M(b,"click",a)))},setDOMEvents:function(){var a=this,b=a.chart.container;b.onmousedown=function(b){a.onContainerMouseDown(b)};b.onmousemove=function(b){a.onContainerMouseMove(b)};b.onclick=function(b){a.onContainerClick(b)};D(b,"mouseleave",a.onContainerMouseLeave);mb===1&&D(B,"mouseup",a.onDocumentMouseUp);if(eb)b.ontouchstart=function(b){a.onContainerTouchStart(b)},b.ontouchmove=function(b){a.onContainerTouchMove(b)},
mb===1&&D(B,"touchend",a.onDocumentTouchEnd)},destroy:function(){var a;R(this.chart.container,"mouseleave",this.onContainerMouseLeave);mb||(R(B,"mouseup",this.onDocumentMouseUp),R(B,"touchend",this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);for(a in this)this[a]=null}};w(z.Pointer.prototype,{pinchTranslate:function(a,b,c,d,e,f){(this.zoomHor||this.pinchHor)&&this.pinchTranslateDirection(!0,a,b,c,d,e,f);(this.zoomVert||this.pinchVert)&&this.pinchTranslateDirection(!1,a,b,c,d,e,f)},pinchTranslateDirection:function(a,
b,c,d,e,f,g,h){var i=this.chart,j=a?"x":"y",k=a?"X":"Y",l="chart"+k,m=a?"width":"height",o=i["plot"+(a?"Left":"Top")],q,r,A=h||1,p=i.inverted,n=i.bounds[a?"h":"v"],x=b.length===1,N=b[0][l],s=c[0][l],t=!x&&b[1][l],u=!x&&c[1][l],y,c=function(){!x&&Q(N-t)>20&&(A=h||Q(s-u)/Q(N-t));r=(o-s)/A+N;q=i["plot"+(a?"Width":"Height")]/A};c();b=r;b<n.min?(b=n.min,y=!0):b+q>n.max&&(b=n.max-q,y=!0);y?(s-=0.8*(s-g[j][0]),x||(u-=0.8*(u-g[j][1])),c()):g[j]=[s,u];p||(f[j]=r-o,f[m]=q);f=p?1/A:A;e[m]=q;e[j]=b;d[p?a?"scaleY":
"scaleX":"scale"+k]=A;d["translate"+k]=f*o+(s-f*N)},pinch:function(a){var b=this,c=b.chart,d=b.pinchDown,e=a.touches,f=e.length,g=b.lastValidTouch,h=b.hasZoom,i=b.selectionMarker,j={},k=f===1&&(b.inClass(a.target,"highcharts-tracker")&&c.runTrackerClick||b.runChartClick),l={};if(f>1)b.initiated=!0;h&&b.initiated&&!k&&a.preventDefault();ra(e,function(a){return b.normalize(a)});if(a.type==="touchstart")n(e,function(a,b){d[b]={chartX:a.chartX,chartY:a.chartY}}),g.x=[d[0].chartX,d[1]&&d[1].chartX],g.y=
[d[0].chartY,d[1]&&d[1].chartY],n(c.axes,function(a){if(a.zoomEnabled){var b=c.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,e=a.toPixels(p(a.options.min,a.dataMin)),f=a.toPixels(p(a.options.max,a.dataMax)),g=E(e,f),e=s(e,f);b.min=E(a.pos,g-d);b.max=s(a.pos+a.len,e+d)}}),b.res=!0;else if(d.length){if(!i)b.selectionMarker=i=w({destroy:pa,touch:!0},c.plotBox);b.pinchTranslate(d,e,j,i,l,g);b.hasPinched=h;b.scaleGroups(j,l);if(!h&&b.followTouchMove&&f===1)this.runPointActions(b.normalize(a));else if(b.res)b.res=
!1,this.reset(!1,0)}},touch:function(a,b){var c=this.chart;sa=c.index;a.touches.length===1?(a=this.normalize(a),c.isInsidePlot(a.chartX-c.plotLeft,a.chartY-c.plotTop)&&!c.openMenu?(b&&this.runPointActions(a),this.pinch(a)):b&&this.reset()):a.touches.length===2&&this.pinch(a)},onContainerTouchStart:function(a){this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(a){$[sa]&&$[sa].pointer.drop(a)}});if(J.PointerEvent||J.MSPointerEvent){var Ga={},Nb=!!J.PointerEvent,
bc=function(){var a,b=[];b.item=function(a){return this[a]};for(a in Ga)Ga.hasOwnProperty(a)&&b.push({pageX:Ga[a].pageX,pageY:Ga[a].pageY,target:Ga[a].target});return b},Ob=function(a,b,c,d){if((a.pointerType==="touch"||a.pointerType===a.MSPOINTER_TYPE_TOUCH)&&$[sa])d(a),d=$[sa].pointer,d[b]({type:c,target:a.currentTarget,preventDefault:pa,touches:bc()})};w(ab.prototype,{onContainerPointerDown:function(a){Ob(a,"onContainerTouchStart","touchstart",function(a){Ga[a.pointerId]={pageX:a.pageX,pageY:a.pageY,
target:a.currentTarget}})},onContainerPointerMove:function(a){Ob(a,"onContainerTouchMove","touchmove",function(a){Ga[a.pointerId]={pageX:a.pageX,pageY:a.pageY};if(!Ga[a.pointerId].target)Ga[a.pointerId].target=a.currentTarget})},onDocumentPointerUp:function(a){Ob(a,"onDocumentTouchEnd","touchend",function(a){delete Ga[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,Nb?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,Nb?"pointermove":"MSPointerMove",
this.onContainerPointerMove);a(B,Nb?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});S(ab.prototype,"init",function(a,b,c){a.call(this,b,c);this.hasZoom&&I(b.container,{"-ms-touch-action":"none","touch-action":"none"})});S(ab.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(D)});S(ab.prototype,"destroy",function(a){this.batchMSEvents(R);a.call(this)})}var vb=z.Legend=function(a,b){this.init(a,b)};vb.prototype={init:function(a,b){var c=
this,d=b.itemStyle,e=b.itemMarginTop||0;this.options=b;if(b.enabled)c.itemStyle=d,c.itemHiddenStyle=C(d,b.itemHiddenStyle),c.itemMarginTop=e,c.padding=d=p(b.padding,8),c.initialItemX=d,c.initialItemY=d-5,c.maxItemWidth=0,c.chart=a,c.itemHeight=0,c.symbolWidth=p(b.symbolWidth,16),c.pages=[],c.render(),D(c.chart,"endResize",function(){c.positionCheckboxes()})},colorizeItem:function(a,b){var c=this.options,d=a.legendItem,e=a.legendLine,f=a.legendSymbol,g=this.itemHiddenStyle.color,c=b?c.itemStyle.color:
g,h=b?a.legendColor||a.color||"#CCC":g,g=a.options&&a.options.marker,i={fill:h},j;d&&d.css({fill:c,color:c});e&&e.attr({stroke:h});if(f){if(g&&f.isMarker)for(j in i.stroke=h,g=a.convertAttribs(g),g)d=g[j],d!==u&&(i[j]=d);f.attr(i)}},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,e=d[0],d=d[1],f=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?e:this.legendWidth-e-2*c-4,d);if(f)f.x=e,f.y=d},destroyItem:function(a){var b=a.checkbox;n(["legendItem","legendLine",
"legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&Xa(a.checkbox)},destroy:function(){var a=this.group,b=this.box;if(b)this.box=b.destroy();if(a)this.group=a.destroy()},positionCheckboxes:function(a){var b=this.group.alignAttr,c,d=this.clipHeight||this.legendHeight,e=this.titleHeight;if(b)c=b.translateY,n(this.allItems,function(f){var g=f.checkbox,h;g&&(h=c+e+g.y+(a||0)+3,I(g,{left:b.translateX+f.checkboxOffset+g.x-20+"px",top:h+"px",display:h>c-6&&h<c+d-6?"":"none"}))})},
renderTitle:function(){var a=this.padding,b=this.options.title,c=0;if(b.text){if(!this.title)this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group);a=this.title.getBBox();c=a.height;this.offsetWidth=a.width;this.contentGroup.attr({translateY:c})}this.titleHeight=c},setText:function(a){var b=this.options;a.legendItem.attr({text:b.labelFormat?Ka(b.labelFormat,a):b.labelFormatter.call(a)})},renderItem:function(a){var b=
this.chart,c=b.renderer,d=this.options,e=d.layout==="horizontal",f=this.symbolWidth,g=d.symbolPadding,h=this.itemStyle,i=this.itemHiddenStyle,j=this.padding,k=e?p(d.itemDistance,20):0,l=!d.rtl,m=d.width,o=d.itemMarginBottom||0,q=this.itemMarginTop,r=this.initialItemX,A=a.legendItem,n=a.series&&a.series.drawLegendSymbol?a.series:a,v=n.options,v=this.createCheckboxForItem&&v&&v.showCheckbox,x=d.useHTML;if(!A){a.legendGroup=c.g("legend-item").attr({zIndex:1}).add(this.scrollGroup);a.legendItem=A=c.text("",
l?f+g:-g,this.baseline||0,x).css(C(a.visible?h:i)).attr({align:l?"left":"right",zIndex:2}).add(a.legendGroup);if(!this.baseline)this.fontMetrics=c.fontMetrics(h.fontSize,A),this.baseline=this.fontMetrics.f+3+q,A.attr("y",this.baseline);n.drawLegendSymbol(this,a);this.setItemEvents&&this.setItemEvents(a,A,x,h,i);v&&this.createCheckboxForItem(a)}this.colorizeItem(a,a.visible);this.setText(a);c=A.getBBox();f=a.checkboxOffset=d.itemWidth||a.legendItemWidth||f+g+c.width+k+(v?20:0);this.itemHeight=g=y(a.legendItemHeight||
c.height);if(e&&this.itemX-r+f>(m||b.chartWidth-2*j-r-d.x))this.itemX=r,this.itemY+=q+this.lastLineHeight+o,this.lastLineHeight=0;this.maxItemWidth=s(this.maxItemWidth,f);this.lastItemY=q+this.itemY+o;this.lastLineHeight=s(g,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];e?this.itemX+=f:(this.itemY+=q+g+o,this.lastLineHeight=g);this.offsetWidth=m||s((e?this.itemX-r-k:f)+j,this.offsetWidth)},getAllItems:function(){var a=[];n(this.chart.series,function(b){var c=b.options;if(p(c.showInLegend,
!t(c.linkedTo)?u:!1,!0))a=a.concat(b.legendItems||(c.legendType==="point"?b.data:b))});return a},adjustMargins:function(a,b){var c=this.chart,d=this.options,e=d.align.charAt(0)+d.verticalAlign.charAt(0)+d.layout.charAt(0);this.display&&!d.floating&&n([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(f,g){f.test(e)&&!t(a[g])&&(c[ub[g]]=s(c[ub[g]],c.legend[(g+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][g]*d[g%2?"x":"y"]+p(d.margin,12)+b[g]))})},render:function(){var a=this,b=
a.chart,c=b.renderer,d=a.group,e,f,g,h,i=a.box,j=a.options,k=a.padding,l=j.borderWidth,m=j.backgroundColor;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;if(!d)a.group=d=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(d),a.scrollGroup=c.g().add(a.contentGroup);a.renderTitle();e=a.getAllItems();pb(e,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});j.reversed&&e.reverse();a.allItems=e;a.display=
f=!!e.length;a.lastLineHeight=0;n(e,function(b){a.renderItem(b)});g=(j.width||a.offsetWidth)+k;h=a.lastItemY+a.lastLineHeight+a.titleHeight;h=a.handleOverflow(h);h+=k;if(l||m){if(i){if(g>0&&h>0)i[i.isNew?"attr":"animate"](i.crisp({width:g,height:h})),i.isNew=!1}else a.box=i=c.rect(0,0,g,h,j.borderRadius,l||0).attr({stroke:j.borderColor,"stroke-width":l||0,fill:m||"none"}).add(d).shadow(j.shadow),i.isNew=!0;i[f?"show":"hide"]()}a.legendWidth=g;a.legendHeight=h;n(e,function(b){a.positionItem(b)});f&&
d.align(w({width:g,height:h},j),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,d=c.renderer,e=this.options,f=e.y,f=c.spacingBox.height+(e.verticalAlign==="top"?-f:f)-this.padding,g=e.maxHeight,h,i=this.clipRect,j=e.navigation,k=p(j.animation,!0),l=j.arrowSize||12,m=this.nav,o=this.pages,q=this.padding,r,A=this.allItems,T=function(a){i.attr({height:a});if(b.contentGroup.div)b.contentGroup.div.style.clip="rect("+q+"px,9999px,"+(q+a)+"px,0)"};
e.layout==="horizontal"&&(f/=2);g&&(f=E(f,g));o.length=0;if(a>f){this.clipHeight=h=s(f-20-this.titleHeight-q,0);this.currentPage=p(this.currentPage,1);this.fullHeight=a;n(A,function(a,b){var c=a._legendItemPos[1],d=y(a.legendItem.getBBox().height),e=o.length;if(!e||c-o[e-1]>h&&(r||c)!==o[e-1])o.push(r||c),e++;b===A.length-1&&c+d-o[e-1]>h&&o.push(c);c!==r&&(r=c)});if(!i)i=b.clipRect=d.clipRect(0,q,9999,0),b.contentGroup.clip(i);T(h);if(!m)this.nav=m=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",
0,0,l,l).on("click",function(){b.scroll(-1,k)}).add(m),this.pager=d.text("",15,10).css(j.style).add(m),this.down=d.symbol("triangle-down",0,0,l,l).on("click",function(){b.scroll(1,k)}).add(m);b.scroll(0);a=f}else if(m)T(c.chartHeight),m.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0;return a},scroll:function(a,b){var c=this.pages,d=c.length,e=this.currentPage+a,f=this.clipHeight,g=this.options.navigation,h=g.activeColor,g=g.inactiveColor,i=this.pager,j=this.padding;e>d&&(e=d);if(e>
0)b!==u&&cb(b,this.chart),this.nav.attr({translateX:j,translateY:f+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({fill:e===1?g:h}).css({cursor:e===1?"default":"pointer"}),i.attr({text:e+"/"+d}),this.down.attr({x:18+this.pager.getBBox().width,fill:e===d?g:h}).css({cursor:e===d?"default":"pointer"}),c=-c[e-1]+this.initialItemY,this.scrollGroup.animate({translateY:c}),this.currentPage=e,this.positionCheckboxes(c)}};Z=z.LegendSymbolMixin={drawRectangle:function(a,b){var c=a.options.symbolHeight||
a.fontMetrics.f;b.legendSymbol=this.chart.renderer.rect(0,a.baseline-c+1,a.symbolWidth,c,a.options.symbolRadius||0).attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(a){var b=this.options,c=b.marker,d=a.symbolWidth,e=this.chart.renderer,f=this.legendGroup,a=a.baseline-y(a.fontMetrics.b*0.3),g;if(b.lineWidth){g={"stroke-width":b.lineWidth};if(b.dashStyle)g.dashstyle=b.dashStyle;this.legendLine=e.path(["M",0,a,"L",d,a]).attr(g).add(f)}if(c&&c.enabled!==!1)b=c.radius,this.legendSymbol=c=e.symbol(this.symbol,
d/2-b,a-b,2*b,2*b,c).add(f),c.isMarker=!0}};(/Trident\/7\.0/.test(La)||Za)&&S(vb.prototype,"positionItem",function(a,b){var c=this,d=function(){b._legendItemPos&&a.call(c,b)};d();setTimeout(d)});var Ca=z.Chart=function(){this.getArgs.apply(this,arguments)};z.chart=function(a,b,c){return new Ca(a,b,c)};Ca.prototype={callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(Da(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(a,b){var c,d=a.series;a.series=null;
c=C(O,a);c.series=a.series=d;this.userOptions=a;d=c.chart;this.margin=this.splashArray("margin",d);this.spacing=this.splashArray("spacing",d);var e=d.events;this.bounds={h:{},v:{}};this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.hasCartesianSeries=d.showAxes;var f=this,g;f.index=$.length;$.push(f);mb++;d.reflow!==!1&&D(f,"load",function(){f.initReflow()});if(e)for(g in e)D(f,g,e[g]);f.xAxis=[];f.yAxis=[];f.animation=oa?!1:p(d.animation,!0);f.pointCount=f.colorCounter=
f.symbolCounter=0;f.firstRender()},initSeries:function(a){var b=this.options.chart;(b=K[a.type||b.type||b.defaultSeriesType])||ea(17,!0);b=new b;b.init(this,a);return b},isInsidePlot:function(a,b,c){var d=c?b:a,a=c?a:b;return d>=0&&d<=this.plotWidth&&a>=0&&a<=this.plotHeight},redraw:function(a){var b=this.axes,c=this.series,d=this.pointer,e=this.legend,f=this.isDirtyLegend,g,h,i=this.hasCartesianSeries,j=this.isDirtyBox,k=c.length,l=k,m=this.renderer,o=m.isHidden(),q=[];cb(a,this);o&&this.cloneRenderTo();
for(this.layOutTitles();l--;)if(a=c[l],a.options.stacking&&(g=!0,a.isDirty)){h=!0;break}if(h)for(l=k;l--;)if(a=c[l],a.options.stacking)a.isDirty=!0;n(c,function(a){a.isDirty&&a.options.legendType==="point"&&(a.updateTotals&&a.updateTotals(),f=!0)});if(f&&e.options.enabled)e.render(),this.isDirtyLegend=!1;g&&this.getStacks();if(i&&!this.isResizing)this.maxTicks=null,n(b,function(a){a.setScale()});this.getMargins();i&&(n(b,function(a){a.isDirty&&(j=!0)}),n(b,function(a){var b=a.min+","+a.max;if(a.extKey!==
b)a.extKey=b,q.push(function(){M(a,"afterSetExtremes",w(a.eventArgs,a.getExtremes()));delete a.eventArgs});(j||g)&&a.redraw()}));j&&this.drawChartBox();n(c,function(a){a.isDirty&&a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw()});d&&d.reset(!0);m.draw();M(this,"redraw");o&&this.cloneRenderTo(!0);n(q,function(a){a.call()})},get:function(a){var b=this.axes,c=this.series,d,e;for(d=0;d<b.length;d++)if(b[d].options.id===a)return b[d];for(d=0;d<c.length;d++)if(c[d].options.id===a)return c[d];for(d=0;d<
c.length;d++){e=c[d].points||[];for(b=0;b<e.length;b++)if(e[b].id===a)return e[b]}return null},getAxes:function(){var a=this,b=this.options,c=b.xAxis=ua(b.xAxis||{}),b=b.yAxis=ua(b.yAxis||{});n(c,function(a,b){a.index=b;a.isX=!0});n(b,function(a,b){a.index=b});c=c.concat(b);n(c,function(b){new F(a,b)})},getSelectedPoints:function(){var a=[];n(this.series,function(b){a=a.concat(Ma(b.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return Ma(this.series,function(a){return a.selected})},
setTitle:function(a,b,c){var g;var d=this,e=d.options,f;f=e.title=C(e.title,a);g=e.subtitle=C(e.subtitle,b),e=g;n([["title",a,f],["subtitle",b,e]],function(a){var b=a[0],c=d[b],e=a[1],a=a[2];c&&e&&(d[b]=c=c.destroy());a&&a.text&&!c&&(d[b]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+b,zIndex:a.zIndex||4}).css(a.style).add())});d.layOutTitles(c)},layOutTitles:function(a){var b=0,c=this.title,d=this.subtitle,e=this.options,f=e.title,e=e.subtitle,g=this.renderer,h=
this.spacingBox.width-44;if(c&&(c.css({width:(f.width||h)+"px"}).align(w({y:g.fontMetrics(f.style.fontSize,c).b-3},f),!1,"spacingBox"),!f.floating&&!f.verticalAlign))b=c.getBBox().height;d&&(d.css({width:(e.width||h)+"px"}).align(w({y:b+(f.margin-13)+g.fontMetrics(e.style.fontSize,c).b},e),!1,"spacingBox"),!e.floating&&!e.verticalAlign&&(b=Fa(b+d.getBBox().height)));c=this.titleOffset!==b;this.titleOffset=b;if(!this.isDirtyBox&&c)this.isDirtyBox=c,this.hasRendered&&p(a,!0)&&this.isDirtyBox&&this.redraw()},
getChartSize:function(){var a=this.options.chart,b=a.width,a=a.height,c=this.renderToClone||this.renderTo;if(!t(b))this.containerWidth=wa(c,"width");if(!t(a))this.containerHeight=wa(c,"height");this.chartWidth=s(0,b||this.containerWidth||600);this.chartHeight=s(0,p(a,this.containerHeight>19?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;a?b&&(this.renderTo.appendChild(c),Xa(b),delete this.renderToClone):(c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),
this.renderToClone=b=this.renderTo.cloneNode(0),I(b,{position:"absolute",top:"-9999px",display:"block"}),b.style.setProperty&&b.style.setProperty("display","block","important"),B.body.appendChild(b),c&&b.appendChild(c))},getContainer:function(){var a,b=this.options,c=b.chart,d,e;a=this.renderTo;var f="highcharts-"+Kb++;if(!a)this.renderTo=a=c.renderTo;if(Da(a))this.renderTo=a=B.getElementById(a);a||ea(13,!0);d=G(W(a,"data-highcharts-chart"));!isNaN(d)&&$[d]&&$[d].hasRendered&&$[d].destroy();W(a,"data-highcharts-chart",
this.index);a.innerHTML="";!c.skipClone&&!a.offsetWidth&&this.cloneRenderTo();this.getChartSize();d=this.chartWidth;e=this.chartHeight;this.container=a=ca(Ya,{className:"highcharts-container"+(c.className?" "+c.className:""),id:f},w({position:"relative",overflow:"hidden",width:d+"px",height:e+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},c.style),this.renderToClone||a);this._cursor=a.style.cursor;this.renderer=new (z[c.renderer]||$a)(a,d,e,c.style,
c.forExport,b.exporting&&b.exporting.allowHTML);oa&&this.renderer.create(this,a,d,e);this.renderer.chartIndex=this.index},getMargins:function(a){var b=this.spacing,c=this.margin,d=this.titleOffset;this.resetMargins();if(d&&!t(c[0]))this.plotTop=s(this.plotTop,d+this.options.title.margin+b[0]);this.legend.adjustMargins(c,b);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=
this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&n(a.axes,function(a){a.visible&&a.getOffset()});n(ub,function(d,e){t(c[e])||(a[d]+=b[e])});a.setChartSize()},reflow:function(a){var b=this,c=b.options.chart,d=b.renderTo,e=c.width||wa(d,"width"),f=c.height||wa(d,"height"),c=a?a.target:J;if(!b.hasUserSize&&!b.isPrinting&&e&&f&&(c===J||c===B)){if(e!==b.containerWidth||f!==b.containerHeight)clearTimeout(b.reflowTimeout),b.reflowTimeout=bb(function(){if(b.container)b.setSize(e,f,!1),b.hasUserSize=
null},a?100:0);b.containerWidth=e;b.containerHeight=f}},initReflow:function(){var a=this,b=function(b){a.reflow(b)};D(J,"resize",b);D(a,"destroy",function(){R(J,"resize",b)})},setSize:function(a,b,c){var d=this,e,f,g=d.renderer;d.isResizing+=1;cb(c,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;if(t(a))d.chartWidth=e=s(0,y(a)),d.hasUserSize=!!e;if(t(b))d.chartHeight=f=s(0,y(b));a=g.globalAnimation;(a?fb:I)(d.container,{width:e+"px",height:f+"px"},a);d.setChartSize(!0);g.setSize(e,
f,c);d.maxTicks=null;n(d.axes,function(a){a.isDirty=!0;a.setScale()});n(d.series,function(a){a.isDirty=!0});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();d.getMargins();d.redraw(c);d.oldChartHeight=null;M(d,"resize");a=g.globalAnimation;bb(function(){d&&M(d,"endResize",null,function(){d.isResizing-=1})},a===!1?0:a&&a.duration||500)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,e=this.chartHeight,f=this.options.chart,g=this.spacing,h=this.clipOffset,i,j,k,l;
this.plotLeft=i=y(this.plotLeft);this.plotTop=j=y(this.plotTop);this.plotWidth=k=s(0,y(d-i-this.marginRight));this.plotHeight=l=s(0,y(e-j-this.marginBottom));this.plotSizeX=b?l:k;this.plotSizeY=b?k:l;this.plotBorderWidth=f.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:g[3],y:g[0],width:d-g[3]-g[1],height:e-g[0]-g[2]};this.plotBox=c.plotBox={x:i,y:j,width:k,height:l};d=2*U(this.plotBorderWidth/2);b=Fa(s(d,h[3])/2);c=Fa(s(d,h[0])/2);this.clipBox={x:b,y:c,width:U(this.plotSizeX-s(d,h[1])/2-b),height:s(0,
U(this.plotSizeY-s(d,h[2])/2-c))};a||n(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this;n(ub,function(b,c){a[b]=p(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,e=this.chartBackground,f=this.plotBackground,g=this.plotBorder,h=this.plotBGImage,i=a.borderWidth||0,j=a.backgroundColor,k=a.plotBackgroundColor,l=a.plotBackgroundImage,
m=a.plotBorderWidth||0,o,q=this.plotLeft,r=this.plotTop,A=this.plotWidth,p=this.plotHeight,n=this.plotBox,x=this.clipRect,s=this.clipBox;o=i+(a.shadow?8:0);if(i||j)if(e)e.animate(e.crisp({width:c-o,height:d-o}));else{e={fill:j||"none"};if(i)e.stroke=a.borderColor,e["stroke-width"]=i;this.chartBackground=b.rect(o/2,o/2,c-o,d-o,a.borderRadius,i).attr(e).addClass("highcharts-background").add().shadow(a.shadow)}if(k)f?f.animate(n):this.plotBackground=b.rect(q,r,A,p,0).attr({fill:k}).add().shadow(a.plotShadow);
if(l)h?h.animate(n):this.plotBGImage=b.image(l,q,r,A,p).add();x?x.animate({width:s.width,height:s.height}):this.clipRect=b.clipRect(s);if(m)g?g.animate(g.crisp({x:q,y:r,width:A,height:p,strokeWidth:-m})):this.plotBorder=b.rect(q,r,A,p,0,-m).attr({stroke:a.plotBorderColor,"stroke-width":m,fill:"none",zIndex:1}).add();this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,e,f;n(["inverted","angular","polar"],function(g){c=K[b.type||b.defaultSeriesType];f=a[g]||
b[g]||c&&c.prototype[g];for(e=d&&d.length;!f&&e--;)(c=K[d[e].type])&&c.prototype[g]&&(f=!0);a[g]=f})},linkSeries:function(){var a=this,b=a.series;n(b,function(a){a.linkedSeries.length=0});n(b,function(b){var d=b.options.linkedTo;if(Da(d)&&(d=d===":previous"?a.series[b.index-1]:a.get(d)))d.linkedSeries.push(b),b.linkedParent=d,b.visible=p(b.options.visible,d.options.visible,b.visible)})},renderSeries:function(){n(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,
b=a.options.labels;b.items&&n(b.items,function(c){var d=w(b.style,c.style),e=G(d.left)+a.plotLeft,f=G(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(c.html,e,f).attr({zIndex:2}).css(d).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,d,e,f,g;this.setTitle();this.legend=new vb(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();d=this.plotWidth;e=this.plotHeight-=21;n(a,function(a){a.setScale()});this.getAxisMargins();f=d/
this.plotWidth>1.1;g=e/this.plotHeight>1.05;if(f||g)this.maxTicks=null,n(a,function(a){(a.horiz&&f||!a.horiz&&g)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&n(a,function(a){a.visible&&a.render()});if(!this.seriesGroup)this.seriesGroup=b.g("series-group").attr({zIndex:3}).add();this.renderSeries();this.renderLabels();this.showCredits(c.credits);this.hasRendered=!0},showCredits:function(a){if(a.enabled&&!this.credits)this.credits=this.renderer.text(a.text,
0,0).on("click",function(){if(a.href)J.location.href=a.href}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position)},destroy:function(){var a=this,b=a.axes,c=a.series,d=a.container,e,f=d&&d.parentNode;M(a,"destroy");$[a.index]=u;mb--;a.renderTo.removeAttribute("data-highcharts-chart");R(a);for(e=b.length;e--;)b[e]=b[e].destroy();for(e=c.length;e--;)c[e]=c[e].destroy();n("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","),
function(b){var c=a[b];c&&c.destroy&&(a[b]=c.destroy())});if(d)d.innerHTML="",R(d),f&&Xa(d);for(e in a)delete a[e]},isReadyToRender:function(){var a=this;return!ha&&J==J.top&&B.readyState!=="complete"||oa&&!J.canvg?(oa?Xb.push(function(){a.firstRender()},a.options.global.canvasToolsURL):B.attachEvent("onreadystatechange",function(){B.detachEvent("onreadystatechange",a.firstRender);B.readyState==="complete"&&a.firstRender()}),!1):!0},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();
M(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();n(b.series||[],function(b){a.initSeries(b)});a.linkSeries();M(a,"beforeRender");if(z.Pointer)a.pointer=new ab(a,b);a.render();a.renderer.draw();if(!a.renderer.imgCount)a.onload();a.cloneRenderTo(!0)}},onload:function(){var a=this;n([this.callback].concat(this.callbacks),function(b){b&&a.index!==void 0&&b.apply(a,[a])});a.renderer.imgCount||M(a,"load")},splashArray:function(a,b){var c=b[a],c=fa(c)?c:[c,c,c,c];return[p(b[a+
"Top"],c[0]),p(b[a+"Right"],c[1]),p(b[a+"Bottom"],c[2]),p(b[a+"Left"],c[3])]}};var cc=z.CenteredSeriesMixin={getCenter:function(){var a=this.options,b=this.chart,c=2*(a.slicedOffset||0),d=b.plotWidth-2*c,b=b.plotHeight-2*c,e=a.center,e=[p(e[0],"50%"),p(e[1],"50%"),a.size||"100%",a.innerSize||0],f=E(d,b),g,h;for(g=0;g<4;++g)h=e[g],a=g<2||g===2&&/%$/.test(h),e[g]=(/%$/.test(h)?[d,b,f,e[2]][g]*parseFloat(h)/100:parseFloat(h))+(a?c:0);e[3]>e[2]&&(e[3]=e[2]);return e}},Ha=function(){};Ha.prototype={init:function(a,
b,c){this.series=a;this.color=a.color;this.applyOptions(b,c);this.pointAttr={};if(a.options.colorByPoint&&(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter++],a.colorCounter===b.length))a.colorCounter=0;a.chart.pointCount++;return this},applyOptions:function(a,b){var c=this.series,d=c.options.pointValKey||c.pointValKey,a=Ha.prototype.optionsToObject.call(this,a);w(this,a);this.options=this.options?w(this.options,a):a;if(d)this.y=this[d];this.isNull=this.y===null;
if(this.x===u&&c)this.x=b===u?c.autoIncrement():b;return this},optionsToObject:function(a){var b={},c=this.series,d=c.options.keys,e=d||c.pointArrayMap||["y"],f=e.length,g=0,h=0;if(typeof a==="number"||a===null)b[e[0]]=a;else if(Na(a)){if(!d&&a.length>f){c=typeof a[0];if(c==="string")b.name=a[0];else if(c==="number")b.x=a[0];g++}for(;h<f;){if(!d||a[g]!==void 0)b[e[h]]=a[g];g++;h++}}else if(typeof a==="object"){b=a;if(a.dataLabels)c._hasPointLabels=!0;if(a.marker)c._hasPointMarkers=!0}return b},destroy:function(){var a=
this.series.chart,b=a.hoverPoints,c;a.pointCount--;if(b&&(this.setState(),Aa(b,this),!b.length))a.hoverPoints=null;if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)R(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(c in this)this[c]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],b,c=6;c--;)b=a[c],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,
color:this.color,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var b=this.series,c=b.tooltipOptions,d=p(c.valueDecimals,""),e=c.valuePrefix||"",f=c.valueSuffix||"";n(b.pointArrayMap||["y"],function(b){b="{point."+b;if(e||f)a=a.replace(b+"}",e+b+"}"+f);a=a.replace(b+"}",b+":,."+d+"f}")});return Ka(a,{point:this,series:this.series})},firePointEvent:function(a,b,c){var d=this,e=this.series.options;
(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();a==="click"&&e.allowPointSelect&&(c=function(a){d.select&&d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});M(this,a,b,c)},visible:!0};var P=z.Series=function(){};P.prototype={isCartesian:!0,type:"line",pointClass:Ha,sorted:!0,requireSorting:!0,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor",r:"radius"},directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x",
"y"],init:function(a,b){var c=this,d,e,f=a.series,g=function(a,b){return p(a.options.index,a._i)-p(b.options.index,b._i)};c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();w(c,{name:b.name,state:"",pointAttr:{},visible:b.visible!==!1,selected:b.selected===!0});if(oa)b.animation=!1;e=b.events;for(d in e)D(c,d,e[d]);if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();n(c.parallelArrays,function(a){c[a+"Data"]=
[]});c.setData(b.data,!1);if(c.isCartesian)a.hasCartesianSeries=!0;f.push(c);c._i=f.length-1;pb(f,g);this.yAxis&&pb(this.yAxis.series,g);n(f,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)})},bindAxes:function(){var a=this,b=a.options,c=a.chart,d;n(a.axisTypes||[],function(e){n(c[e],function(c){d=c.options;if(b[e]===d.index||b[e]!==u&&b[e]===d.id||b[e]===u&&d.index===0)c.series.push(a),a[e]=c,c.isDirty=!0});!a[e]&&a.optionalAxis!==e&&ea(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,
d=arguments;n(c.parallelArrays,typeof b==="number"?function(d){var f=d==="y"&&c.toYData?c.toYData(a):a[d];c[d+"Data"][b]=f}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))})},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,d=a.pointIntervalUnit,b=p(b,a.pointStart,0);this.pointInterval=c=p(this.pointInterval,a.pointInterval,1);if(d==="month"||d==="year")a=new da(b),a=d==="month"?+a[Gb](a[jb]()+c):+a[Hb](a[kb]()+c),c=a-b;this.xIncrement=b+c;return b},
setOptions:function(a){var b=this.chart,c=b.options.plotOptions,b=b.userOptions||{},d=b.plotOptions||{},e=c[this.type];this.userOptions=a;c=C(e,c.series,a);this.tooltipOptions=C(O.tooltip,O.plotOptions[this.type].tooltip,b.tooltip,d.series&&d.series.tooltip,d[this.type]&&d[this.type].tooltip,a.tooltip);e.marker===null&&delete c.marker;this.zoneAxis=c.zoneAxis;a=this.zones=(c.zones||[]).slice();if((c.negativeColor||c.negativeFillColor)&&!c.zones)a.push({value:c[this.zoneAxis+"Threshold"]||c.threshold||
0,color:c.negativeColor,fillColor:c.negativeFillColor});a.length&&t(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return c},getCyclic:function(a,b,c){var d=this.userOptions,e="_"+a+"Index",f=a+"Counter";b||(t(d[e])?b=d[e]:(d[e]=b=this.chart[f]%c.length,this.chart[f]+=1),b=c[b]);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||V[this.type].color,this.chart.options.colors)},getSymbol:function(){var a=
this.options.marker;this.getCyclic("symbol",a.symbol,this.chart.options.symbols);if(/^url/.test(this.symbol))a.radius=0},drawLegendSymbol:Z.drawLineMarker,setData:function(a,b,c,d){var e=this,f=e.points,g=f&&f.length||0,h,i=e.options,j=e.chart,k=null,l=e.xAxis,m=l&&!!l.categories,o=i.turboThreshold,q=this.xData,r=this.yData,A=(h=e.pointArrayMap)&&h.length,a=a||[];h=a.length;b=p(b,!0);if(d!==!1&&h&&g===h&&!e.cropped&&!e.hasGroupedData&&e.visible)n(a,function(a,b){f[b].update&&a!==i.data[b]&&f[b].update(a,
!1,null,!1)});else{e.xIncrement=null;e.colorCounter=0;n(this.parallelArrays,function(a){e[a+"Data"].length=0});if(o&&h>o){for(c=0;k===null&&c<h;)k=a[c],c++;if(ta(k)){m=p(i.pointStart,0);k=p(i.pointInterval,1);for(c=0;c<h;c++)q[c]=m,r[c]=a[c],m+=k;e.xIncrement=m}else if(Na(k))if(A)for(c=0;c<h;c++)k=a[c],q[c]=k[0],r[c]=k.slice(1,A+1);else for(c=0;c<h;c++)k=a[c],q[c]=k[0],r[c]=k[1];else ea(12)}else for(c=0;c<h;c++)if(a[c]!==u&&(k={series:e},e.pointClass.prototype.applyOptions.apply(k,[a[c]]),e.updateParallelArrays(k,
c),m&&t(k.name)))l.names[k.x]=k.name;Da(r[0])&&ea(14,!0);e.data=[];e.options.data=e.userOptions.data=a;for(c=g;c--;)f[c]&&f[c].destroy&&f[c].destroy();if(l)l.minRange=l.userMinRange;e.isDirty=e.isDirtyData=j.isDirtyBox=!0;c=!1}i.legendType==="point"&&(this.processData(),this.generatePoints());b&&j.redraw(c)},processData:function(a){var b=this.xData,c=this.yData,d=b.length,e;e=0;var f,g,h=this.xAxis,i,j=this.options;i=j.cropThreshold;var k=this.getExtremesFromAll||j.getExtremesFromAll,l=this.isCartesian,
j=h&&h.val2lin,m=h&&h.isLog,o,q;if(l&&!this.isDirty&&!h.isDirty&&!this.yAxis.isDirty&&!a)return!1;if(h)a=h.getExtremes(),o=a.min,q=a.max;if(l&&this.sorted&&!k&&(!i||d>i||this.forceCrop))if(b[d-1]<o||b[0]>q)b=[],c=[];else if(b[0]<o||b[d-1]>q)e=this.cropData(this.xData,this.yData,o,q),b=e.xData,c=e.yData,e=e.start,f=!0;for(i=b.length||1;--i;)d=m?j(b[i])-j(b[i-1]):b[i]-b[i-1],d>0&&(g===u||d<g)?g=d:d<0&&this.requireSorting&&ea(15);this.cropped=f;this.cropStart=e;this.processedXData=b;this.processedYData=
c;this.closestPointRange=g},cropData:function(a,b,c,d){var e=a.length,f=0,g=e,h=p(this.cropShoulder,1),i;for(i=0;i<e;i++)if(a[i]>=c){f=s(0,i-h);break}for(c=i;c<e;c++)if(a[c]>d){g=c+h;break}return{xData:a.slice(f,g),yData:b.slice(f,g),start:f,end:g}},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,e=this.processedYData,f=this.pointClass,g=d.length,h=this.cropStart||0,i,j=this.hasGroupedData,k,l=[],m;if(!b&&!j)b=[],b.length=a.length,b=this.data=b;for(m=0;m<g;m++)i=
h+m,j?l[m]=(new f).init(this,[d[m]].concat(ua(e[m]))):(b[i]?k=b[i]:a[i]!==u&&(b[i]=k=(new f).init(this,a[i],d[m])),l[m]=k),l[m].index=i;if(b&&(g!==(c=b.length)||j))for(m=0;m<c;m++)if(m===h&&!j&&(m+=g),b[m])b[m].destroyElements(),b[m].plotX=u;this.data=b;this.points=l},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,d,e=[],f=0;d=this.xAxis.getExtremes();var g=d.min,h=d.max,i,j,k,l,a=a||this.stackedYData||this.processedYData;d=a.length;for(l=0;l<d;l++)if(j=c[l],k=a[l],i=k!==null&&k!==
u&&(!b.isLog||k.length||k>0),j=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[l+1]||j)>=g&&(c[l-1]||j)<=h,i&&j)if(i=k.length)for(;i--;)k[i]!==null&&(e[f++]=k[i]);else e[f++]=k;this.dataMin=Pa(e);this.dataMax=Ea(e)},translate:function(){this.processedXData||this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,e=this.yAxis,f=this.points,g=f.length,h=!!this.modifyValue,i=a.pointPlacement,j=i==="between"||ta(i),k=a.threshold,
l=a.startFromThreshold?k:0,m,o,q,r,A=Number.MAX_VALUE,a=0;a<g;a++){var n=f[a],v=n.x,x=n.y;o=n.low;var N=b&&e.stacks[(this.negStacks&&x<(l?0:k)?"-":"")+this.stackKey];if(e.isLog&&x!==null&&x<=0)n.y=x=null,ea(10);n.plotX=m=E(s(-1E5,c.translate(v,0,0,0,1,i,this.type==="flags")),1E5);if(b&&this.visible&&!n.isNull&&N&&N[v])r=this.getStackIndicator(r,v,this.index),N=N[v],x=N.points[r.key],o=x[0],x=x[1],o===l&&(o=p(k,e.min)),e.isLog&&o<=0&&(o=null),n.total=n.stackTotal=N.total,n.percentage=N.total&&n.y/
N.total*100,n.stackY=x,N.setOffset(this.pointXOffset||0,this.barW||0);n.yBottom=t(o)?e.translate(o,0,1,0,1):null;h&&(x=this.modifyValue(x,n));n.plotY=o=typeof x==="number"&&x!==Infinity?E(s(-1E5,e.translate(x,0,1,0,1)),1E5):u;n.isInside=o!==u&&o>=0&&o<=e.len&&m>=0&&m<=c.len;n.clientX=j?c.translate(v,0,0,0,1):m;n.negative=n.y<(k||0);n.category=d&&d[n.x]!==u?d[n.x]:n.x;a&&(A=E(A,Q(m-q)));q=m}this.closestPointRangePx=A},getValidPoints:function(){return Ma(this.points,function(a){return!a.isNull})},setClip:function(a){var b=
this.chart,c=this.options,d=b.renderer,e=b.inverted,f=this.clipBox,g=f||b.clipBox,h=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,g.height,c.xAxis,c.yAxis].join(","),i=b[h],j=b[h+"m"];if(!i){if(a)g.width=0,b[h+"m"]=j=d.clipRect(-99,e?-b.plotLeft:-b.plotTop,99,e?b.chartWidth:b.chartHeight);b[h]=i=d.clipRect(g)}a&&(i.count+=1);if(c.clip!==!1)this.group.clip(a||f?i:b.clipRect),this.markerGroup.clip(j),this.sharedClipKey=h;a||(i.count-=1,i.count<=0&&h&&b[h]&&(f||(b[h]=b[h].destroy()),b[h+
"m"]&&(b[h+"m"]=b[h+"m"].destroy())))},animate:function(a){var b=this.chart,c=this.options.animation,d;if(c&&!fa(c))c=V[this.type].animation;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();M(this,"afterAnimate")},drawPoints:function(){var a,b=this.points,c=this.chart,d,e,f,g,h,i,j,k,l=this.options.marker,m=this.pointAttr[""],o,q,r,n=this.markerGroup,s=
p(l.enabled,this.xAxis.isRadial,this.closestPointRangePx>2*l.radius);if(l.enabled!==!1||this._hasPointMarkers)for(f=b.length;f--;)if(g=b[f],d=U(g.plotX),e=g.plotY,k=g.graphic,o=g.marker||{},q=!!g.marker,a=s&&o.enabled===u||o.enabled,r=g.isInside,a&&e!==u&&!isNaN(e)&&g.y!==null)if(a=g.pointAttr[g.selected?"select":""]||m,h=a.r,i=p(o.symbol,this.symbol),j=i.indexOf("url")===0,k)k[r?"show":"hide"](!0).attr(a).animate(w({x:d-h,y:e-h},k.symbolName?{width:2*h,height:2*h}:{}));else{if(r&&(h>0||j))g.graphic=
c.renderer.symbol(i,d-h,e-h,2*h,2*h,q?o:l).attr(a).add(n)}else if(k)g.graphic=k.destroy()},convertAttribs:function(a,b,c,d){var e=this.pointAttrToOptions,f,g,h={},a=a||{},b=b||{},c=c||{},d=d||{};for(f in e)g=e[f],h[f]=p(a[g],b[f],c[f],d[f]);return h},getAttribs:function(){var a=this,b=a.options,c=V[a.type].marker?b.marker:b,d=c.states,e=d.hover,f,g=a.color,h=a.options.negativeColor;f={stroke:g,fill:g};var i=a.points||[],j,k,l=[],m=a.pointAttrToOptions;j=a.hasPointSpecificOptions;var o=c.lineColor,
q=c.fillColor;k=b.turboThreshold;var r=a.zones,A=a.zoneAxis||"y",s;b.marker?(e.radius=e.radius||c.radius+e.radiusPlus,e.lineWidth=e.lineWidth||c.lineWidth+e.lineWidthPlus):(e.color=e.color||va(e.color||g).brighten(e.brightness).get(),e.negativeColor=e.negativeColor||va(e.negativeColor||h).brighten(e.brightness).get());l[""]=a.convertAttribs(c,f);n(["hover","select"],function(b){l[b]=a.convertAttribs(d[b],l[""])});a.pointAttr=l;g=i.length;if(!k||g<k||j)for(;g--;){k=i[g];if((c=k.options&&k.options.marker||
k.options)&&c.enabled===!1)c.radius=0;if(r.length){j=0;for(f=r[j];k[A]>=f.value;)f=r[++j];k.color=k.fillColor=p(f.color,a.color)}j=b.colorByPoint||k.color;if(k.options)for(s in m)t(c[m[s]])&&(j=!0);if(j){c=c||{};j=[];d=c.states||{};f=d.hover=d.hover||{};if(!b.marker||k.negative&&!f.fillColor&&!e.fillColor)f[a.pointAttrToOptions.fill]=f.color||!k.options.color&&e[k.negative&&h?"negativeColor":"color"]||va(k.color).brighten(f.brightness||e.brightness).get();f={color:k.color};if(!q)f.fillColor=k.color;
if(!o)f.lineColor=k.color;c.hasOwnProperty("color")&&!c.color&&delete c.color;j[""]=a.convertAttribs(w(f,c),l[""]);j.hover=a.convertAttribs(d.hover,l.hover,j[""]);j.select=a.convertAttribs(d.select,l.select,j[""])}else j=l;k.pointAttr=j}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(La),d,e=a.data||[],f,g,h;M(a,"destroy");R(a);n(a.axisTypes||[],function(b){if(h=a[b])Aa(h.series,a),h.isDirty=h.forceRedraw=!0});a.legendItem&&a.chart.legend.destroyItem(a);for(d=e.length;d--;)(f=
e[d])&&f.destroy&&f.destroy();a.points=null;clearTimeout(a.animationTimeout);for(g in a)a[g]instanceof Y&&!a[g].survive&&(d=c&&g==="group"?"hide":"destroy",a[g][d]());if(b.hoverSeries===a)b.hoverSeries=null;Aa(b.series,a);for(g in a)delete a[g]},getGraphPath:function(a,b,c){var d=this,e=d.options,f=e.step,g=[],h,a=a||d.points;n(a,function(i,j){var k=i.plotX,l=i.plotY,m=a[j-1];if((i.leftCliff||m&&m.rightCliff)&&!c)h=!0;i.isNull&&!t(b)&&j>0?h=!e.connectNulls:i.isNull&&!b?h=!0:(j===0||h?m=["M",i.plotX,
i.plotY]:d.getPointSpline?m=d.getPointSpline(a,i,j):f?(m=f==="right"?["L",m.plotX,l]:f==="center"?["L",(m.plotX+k)/2,m.plotY,"L",(m.plotX+k)/2,l]:["L",k,m.plotY],m.push("L",k,l)):m=["L",k,l],g.push.apply(g,m),h=!1)});return d.graphPath=g},drawGraph:function(){var a=this,b=this.options,c=[["graph",b.lineColor||this.color,b.dashStyle]],d=b.lineWidth,e=b.linecap!=="square",f=(this.gappedPath||this.getGraphPath).call(this),g=this.fillGraph&&this.color||"none";n(this.zones,function(d,e){c.push(["zoneGraph"+
e,d.color||a.color,d.dashStyle||b.dashStyle])});n(c,function(c,i){var j=c[0],k=a[j];if(k)k.animate({d:f});else if((d||g)&&f.length)k={stroke:c[1],"stroke-width":d,fill:g,zIndex:1},c[2]?k.dashstyle=c[2]:e&&(k["stroke-linecap"]=k["stroke-linejoin"]="round"),a[j]=a.chart.renderer.path(f).attr(k).add(a.group).shadow(i<2&&b.shadow)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,d=this.zones,e,f,g=this.clips||[],h,i=this.graph,j=this.area,k=s(b.chartWidth,b.chartHeight),l=this[(this.zoneAxis||
"y")+"Axis"],m,o=l.reversed,q=b.inverted,r=l.horiz,A,T,v,x=!1;if(d.length&&(i||j)&&l.min!==u)i&&i.hide(),j&&j.hide(),m=l.getExtremes(),n(d,function(d,n){e=o?r?b.plotWidth:0:r?0:l.toPixels(m.min);e=E(s(p(f,e),0),k);f=E(s(y(l.toPixels(p(d.value,m.max),!0)),0),k);x&&(e=f=l.toPixels(m.max));A=Math.abs(e-f);T=E(e,f);v=s(e,f);if(l.isXAxis){if(h={x:q?v:T,y:0,width:A,height:k},!r)h.x=b.plotHeight-h.x}else if(h={x:0,y:q?v:T,width:k,height:A},r)h.y=b.plotWidth-h.y;b.inverted&&c.isVML&&(h=l.isXAxis?{x:0,y:o?
T:v,height:h.width,width:b.chartWidth}:{x:h.y-b.plotLeft-b.spacingBox.x,y:0,width:h.height,height:b.chartHeight});g[n]?g[n].animate(h):(g[n]=c.clipRect(h),i&&a["zoneGraph"+n].clip(g[n]),j&&a["zoneArea"+n].clip(g[n]));x=d.value>m.max}),this.clips=g},invertGroups:function(){function a(){var a={width:b.yAxis.len,height:b.xAxis.len};n(["group","markerGroup"],function(c){b[c]&&b[c].attr(a).invert()})}var b=this,c=b.chart;if(b.xAxis)D(c,"resize",a),D(b,"destroy",function(){R(c,"resize",a)}),a(),b.invertGroups=
a},plotGroup:function(a,b,c,d,e){var f=this[a],g=!f;g&&(this[a]=f=this.chart.renderer.g(b).attr({zIndex:d||0.1}).add(e),f.addClass("highcharts-series-"+this.index));f.attr({visibility:c})[g?"attr":"animate"](this.getPlotBox());return f},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;if(a.inverted)b=c,c=this.xAxis;return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,d=a.options,e=(c=d.animation)&&!!a.animate&&
b.renderer.isSVG&&p(c.duration,500)||0,f=a.visible?"inherit":"hidden",g=d.zIndex,h=a.hasRendered,i=b.seriesGroup;c=a.plotGroup("group","series",f,g,i);a.markerGroup=a.plotGroup("markerGroup","markers",f,g,i);e&&a.animate(!0);a.getAttribs();c.inverted=a.isCartesian?b.inverted:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());n(a.points,function(a){a.redraw&&a.redraw()});a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&a.options.enableMouseTracking!==!1&&a.drawTracker();b.inverted&&
a.invertGroups();d.clip!==!1&&!a.sharedClipKey&&!h&&c.clip(b.clipRect);e&&a.animate();if(!h)a.animationTimeout=bb(function(){a.afterAnimate()},e);a.isDirty=a.isDirtyData=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirtyData,c=this.isDirty,d=this.group,e=this.xAxis,f=this.yAxis;d&&(a.inverted&&d.attr({width:a.plotWidth,height:a.plotHeight}),d.animate({translateX:p(e&&e.left,a.plotLeft),translateY:p(f&&f.top,a.plotTop)}));this.translate();this.render();b&&M(this,"updatedData");
(c||b)&&delete this.kdTree},kdDimensions:1,kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,e=this.chart.inverted;return this.searchKDTree({clientX:e?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:e?d.len-a.chartX+d.pos:a.chartY-d.pos},b)},buildKDTree:function(){function a(c,e,f){var g,h;if(h=c&&c.length)return g=b.kdAxisArray[e%f],c.sort(function(a,b){return a[g]-b[g]}),h=Math.floor(h/2),{point:c[h],left:a(c.slice(0,h),e+1,f),right:a(c.slice(h+1),e+1,f)}}var b=this,
c=b.kdDimensions;delete b.kdTree;bb(function(){var d=Ma(b.points||[],function(a){return a.y!==null});b.kdTree=a(d,c,c)},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,j,k){var l=b.point,m=d.kdAxisArray[j%k],o,q,r=l;q=t(a[e])&&t(l[e])?Math.pow(a[e]-l[e],2):null;o=t(a[f])&&t(l[f])?Math.pow(a[f]-l[f],2):null;o=(q||0)+(o||0);l.dist=t(o)?Math.sqrt(o):Number.MAX_VALUE;l.distX=t(q)?Math.sqrt(q):Number.MAX_VALUE;m=a[m]-l[m];o=m<0?"left":"right";q=m<0?"right":"left";b[o]&&(o=c(a,b[o],j+1,
k),r=o[g]<r[g]?o:l);b[q]&&Math.sqrt(m*m)<r[g]&&(a=c(a,b[q],j+1,k),r=a[g]<r[g]?a:r);return r}var d=this,e=this.kdAxisArray[0],f=this.kdAxisArray[1],g=b?"distX":"dist";this.kdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,this.kdDimensions,this.kdDimensions)}};Ub.prototype={destroy:function(){Qa(this,this.axis)},render:function(a){var b=this.options,c=b.format,c=c?Ka(c,this):b.formatter.call(this);this.label?this.label.attr({text:c,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(c,
null,null,b.useHTML).css(b.style).attr({align:this.textAlign,rotation:b.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,b){var c=this.axis,d=c.chart,e=d.inverted,f=c.reversed,f=this.isNegative&&!f||!this.isNegative&&f,g=c.translate(c.usePercentage?100:this.total,0,0,0,1),c=c.translate(0),c=Q(g-c),h=d.xAxis[0].translate(this.x)+a,i=d.plotHeight,f={x:e?f?g:g-c:h,y:e?i-h-b:f?i-g-c:i-g,width:e?c:b,height:e?b:c};if(e=this.label)e.align(this.alignOptions,null,f),f=e.alignAttr,e[this.options.crop===
!1||d.isInsidePlot(f.x,f.y)?"show":"hide"](!0)}};Ca.prototype.getStacks=function(){var a=this;n(a.yAxis,function(a){if(a.stacks&&a.hasVisibleSeries)a.oldStacks=a.stacks});n(a.series,function(b){if(b.options.stacking&&(b.visible===!0||a.options.chart.ignoreHiddenSeries===!1))b.stackKey=b.type+p(b.options.stack,"")})};F.prototype.buildStacks=function(){var a=this.series,b,c=p(this.options.reversedStacks,!0),d=a.length,e;if(!this.isXAxis){this.usePercentage=!1;for(e=d;e--;)a[c?e:d-e-1].setStackedPoints();
for(e=d;e--;)b=a[c?e:d-e-1],b.setStackCliffs&&b.setStackCliffs();if(this.usePercentage)for(e=0;e<d;e++)a[e].setPercentStacks()}};F.prototype.renderStackTotals=function(){var a=this.chart,b=a.renderer,c=this.stacks,d,e,f=this.stackTotalGroup;if(!f)this.stackTotalGroup=f=b.g("stack-labels").attr({visibility:"visible",zIndex:6}).add();f.translate(a.plotLeft,a.plotTop);for(d in c)for(e in a=c[d],a)a[e].render(f)};F.prototype.resetStacks=function(){var a=this.stacks,b,c;if(!this.isXAxis)for(b in a)for(c in a[b])a[b][c].touched<
this.stacksTouched?(a[b][c].destroy(),delete a[b][c]):(a[b][c].total=null,a[b][c].cum=0)};F.prototype.cleanStacks=function(){var a,b,c;if(!this.isXAxis){if(this.oldStacks)a=this.stacks=this.oldStacks;for(b in a)for(c in a[b])a[b][c].cum=a[b][c].total}};P.prototype.setStackedPoints=function(){if(this.options.stacking&&!(this.visible!==!0&&this.chart.options.chart.ignoreHiddenSeries!==!1)){var a=this.processedXData,b=this.processedYData,c=[],d=b.length,e=this.options,f=e.threshold,g=e.startFromThreshold?
f:0,h=e.stack,e=e.stacking,i=this.stackKey,j="-"+i,k=this.negStacks,l=this.yAxis,m=l.stacks,o=l.oldStacks,q,r,n,T,v,x,t;l.stacksTouched+=1;for(v=0;v<d;v++){x=a[v];t=b[v];q=this.getStackIndicator(q,x,this.index);T=q.key;n=(r=k&&t<(g?0:f))?j:i;m[n]||(m[n]={});if(!m[n][x])o[n]&&o[n][x]?(m[n][x]=o[n][x],m[n][x].total=null):m[n][x]=new Ub(l,l.options.stackLabels,r,x,h);n=m[n][x];if(t!==null)n.points[T]=n.points[this.index]=[p(n.cum,g)],n.touched=l.stacksTouched,q.index>0&&this.singleStacks===!1&&(n.points[T][0]=
n.points[this.index+","+x+",0"][0]);e==="percent"?(r=r?i:j,k&&m[r]&&m[r][x]?(r=m[r][x],n.total=r.total=s(r.total,n.total)+Q(t)||0):n.total=ma(n.total+(Q(t)||0))):n.total=ma(n.total+(t||0));n.cum=p(n.cum,g)+(t||0);t!==null&&n.points[T].push(n.cum);c[v]=n.cum}if(e==="percent")l.usePercentage=!0;this.stackedYData=c;l.oldStacks={}}};P.prototype.setPercentStacks=function(){var a=this,b=a.stackKey,c=a.yAxis.stacks,d=a.processedXData,e;n([b,"-"+b],function(b){var f;for(var g=d.length,h,i;g--;)if(h=d[g],
e=a.getStackIndicator(e,h,a.index),f=(i=c[b]&&c[b][h])&&i.points[e.key],h=f)i=i.total?100/i.total:0,h[0]=ma(h[0]*i),h[1]=ma(h[1]*i),a.stackedYData[g]=h[1]})};P.prototype.getStackIndicator=function(a,b,c){!t(a)||a.x!==b?a={x:b,index:0}:a.index++;a.key=[c,b,a.index].join(",");return a};w(Ca.prototype,{addSeries:function(a,b,c){var d,e=this;a&&(b=p(b,!0),M(e,"addSeries",{options:a},function(){d=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();b&&e.redraw(c)}));return d},addAxis:function(a,b,c,d){var e=
b?"xAxis":"yAxis",f=this.options;new F(this,C(a,{index:this[e].length,isX:b}));f[e]=ua(f[e]||{});f[e].push(a);p(c,!0)&&this.redraw(d)},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,e=c.loading,f=function(){d&&I(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};if(!d)b.loadingDiv=d=ca(Ya,{className:"highcharts-loading"},w(e.style,{zIndex:10,display:"none"}),b.container),b.loadingSpan=ca("span",null,e.labelStyle,d),D(b,"redraw",f);b.loadingSpan.innerHTML=
a||c.lang.loading;if(!b.loadingShown)I(d,{opacity:0,display:""}),fb(d,{opacity:e.style.opacity},{duration:e.showDuration||0}),b.loadingShown=!0;f()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&fb(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){I(b,{display:"none"})}});this.loadingShown=!1}});w(Ha.prototype,{update:function(a,b,c,d){function e(){f.applyOptions(a);if(f.y===null&&h)f.graphic=h.destroy();if(fa(a)&&!Na(a))f.redraw=function(){if(h&&h.element&&
a&&a.marker&&a.marker.symbol)f.graphic=h.destroy();if(a&&a.dataLabels&&f.dataLabel)f.dataLabel=f.dataLabel.destroy();f.redraw=null};i=f.index;g.updateParallelArrays(f,i);if(l&&f.name)l[f.x]=f.name;k.data[i]=fa(k.data[i])?f.options:a;g.isDirty=g.isDirtyData=!0;if(!g.fixedBox&&g.hasCartesianSeries)j.isDirtyBox=!0;if(k.legendType==="point")j.isDirtyLegend=!0;b&&j.redraw(c)}var f=this,g=f.series,h=f.graphic,i,j=g.chart,k=g.options,l=g.xAxis&&g.xAxis.names,b=p(b,!0);d===!1?e():f.firePointEvent("update",
{options:a},e)},remove:function(a,b){this.series.removePoint(qa(this,this.series.data),a,b)}});w(P.prototype,{addPoint:function(a,b,c,d){var e=this,f=e.options,g=e.data,h=e.graph,i=e.area,j=e.chart,k=e.xAxis&&e.xAxis.names,l=h&&h.shift||0,m=["graph","area"],h=f.data,o,q=e.xData;cb(d,j);if(c){for(d=e.zones.length;d--;)m.push("zoneGraph"+d,"zoneArea"+d);n(m,function(a){if(e[a])e[a].shift=l+(f.step?2:1)})}if(i)i.isArea=!0;b=p(b,!0);i={series:e};e.pointClass.prototype.applyOptions.apply(i,[a]);m=i.x;
d=q.length;if(e.requireSorting&&m<q[d-1])for(o=!0;d&&q[d-1]>m;)d--;e.updateParallelArrays(i,"splice",d,0,0);e.updateParallelArrays(i,d);if(k&&i.name)k[m]=i.name;h.splice(d,0,a);o&&(e.data.splice(d,0,null),e.processData());f.legendType==="point"&&e.generatePoints();c&&(g[0]&&g[0].remove?g[0].remove(!1):(g.shift(),e.updateParallelArrays(i,"shift"),h.shift()));e.isDirty=!0;e.isDirtyData=!0;b&&(e.getAttribs(),j.redraw())},removePoint:function(a,b,c){var d=this,e=d.data,f=e[a],g=d.points,h=d.chart,i=function(){g&&
g.length===e.length&&g.splice(a,1);e.splice(a,1);d.options.data.splice(a,1);d.updateParallelArrays(f||{series:d},"splice",a,1);f&&f.destroy();d.isDirty=!0;d.isDirtyData=!0;b&&h.redraw()};cb(c,h);b=p(b,!0);f?f.firePointEvent("remove",null,i):i()},remove:function(a,b){var c=this,d=c.chart;M(c,"remove",null,function(){c.destroy();d.isDirtyLegend=d.isDirtyBox=!0;d.linkSeries();p(a,!0)&&d.redraw(b)})},update:function(a,b){var c=this,d=this.chart,e=this.userOptions,f=this.type,g=K[f].prototype,h=["group",
"markerGroup","dataLabelsGroup"],i;if(a.type&&a.type!==f||a.zIndex!==void 0)h.length=0;n(h,function(a){h[a]=c[a];delete c[a]});a=C(e,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1);for(i in g)this[i]=u;w(this,K[a.type||f].prototype);n(h,function(a){c[a]=h[a]});this.init(d,a);d.linkSeries();p(b,!0)&&d.redraw(!1)}});w(F.prototype,{update:function(a,b){var c=this.chart,a=c.options[this.coll][this.options.index]=C(this.userOptions,a);this.destroy(!0);
this._addedPlotLB=this.chart._labelPanes=u;this.init(c,w(a,{events:u}));c.isDirtyBox=!0;p(b,!0)&&c.redraw()},remove:function(a){for(var b=this.chart,c=this.coll,d=this.series,e=d.length;e--;)d[e]&&d[e].remove(!1);Aa(b.axes,this);Aa(b[c],this);b.options[c].splice(this.options.index,1);n(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;p(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}});var Ia=ka(P);
K.line=Ia;V.area=C(ba,{softThreshold:!1,threshold:0});var ya=ka(P,{type:"area",singleStacks:!1,getStackPoints:function(){var a=[],b=[],c=this.xAxis,d=this.yAxis,e=d.stacks[this.stackKey],f={},g=this.points,h=this.index,i=d.series,j=i.length,k,l=p(d.options.reversedStacks,!0)?1:-1,m,o;if(this.options.stacking){for(m=0;m<g.length;m++)f[g[m].x]=g[m];for(o in e)e[o].total!==null&&b.push(+o);b.sort(function(a,b){return a-b});k=ra(i,function(){return this.visible});n(b,function(g,i){var o=0,p,v;if(f[g]&&
!f[g].isNull)a.push(f[g]),n([-1,1],function(a){var c=a===1?"rightNull":"leftNull",d=0,o=e[b[i+a]];if(o)for(m=h;m>=0&&m<j;)p=o.points[m],p||(m===h?f[g][c]=!0:k[m]&&(v=e[g].points[m])&&(d-=v[1]-v[0])),m+=l;f[g][a===1?"rightCliff":"leftCliff"]=d});else{for(m=h;m>=0&&m<j;){if(p=e[g].points[m]){o=p[1];break}m+=l}o=d.toPixels(o,!0);a.push({isNull:!0,plotX:c.toPixels(g,!0),plotY:o,yBottom:o})}})}return a},getGraphPath:function(a){var b=P.prototype.getGraphPath,c=this.options,d=c.stacking,e=this.yAxis,f,
g,h=[],i=[],j=this.index,k,l=e.stacks[this.stackKey],m=c.threshold,o=e.getThreshold(c.threshold),q,c=c.connectNulls||d==="percent",r=function(b,c,f){var g=a[b],b=d&&l[g.x].points[j],q=g[f+"Null"]||0,f=g[f+"Cliff"]||0,r,n,g=!0;f||q?(r=(q?b[0]:b[1])+f,n=b[0]+f,g=!!q):!d&&a[c]&&a[c].isNull&&(r=n=m);r!==void 0&&(i.push({plotX:k,plotY:r===null?o:e.toPixels(r,!0),isNull:g}),h.push({plotX:k,plotY:n===null?o:e.toPixels(n,!0)}))},a=a||this.points;d&&(a=this.getStackPoints());for(f=0;f<a.length;f++)if(g=a[f].isNull,
k=p(a[f].rectPlotX,a[f].plotX),q=p(a[f].yBottom,o),!g||c){c||r(f,f-1,"left");if(!g||d||!c)i.push(a[f]),h.push({x:f,plotX:k,plotY:q});c||r(f,f+1,"right")}f=b.call(this,i,!0,!0);g=b.call(this,h.reverse(),!0,!0);g.length&&(g[0]="L");f=f.concat(g);b=b.call(this,i,!1,c);this.areaPath=f;return b},drawGraph:function(){this.areaPath=[];P.prototype.drawGraph.apply(this);var a=this,b=this.areaPath,c=this.options,d=[["area",this.color,c.fillColor]];n(this.zones,function(b,f){d.push(["zoneArea"+f,b.color||a.color,
b.fillColor||c.fillColor])});n(d,function(d){var f=d[0],g=a[f];g?g.animate({d:b}):(g={fill:d[2]||d[1],zIndex:0},d[2]||(g["fill-opacity"]=p(c.fillOpacity,0.75)),a[f]=a.chart.renderer.path(b).attr(g).add(a.group))})},drawLegendSymbol:Z.drawRectangle});K.area=ya;V.spline=C(ba);Ia=ka(P,{type:"spline",getPointSpline:function(a,b,c){var d=b.plotX,e=b.plotY,f=a[c-1],c=a[c+1],g,h,i,j;if(f&&!f.isNull&&c&&!c.isNull){a=f.plotY;i=c.plotX;var c=c.plotY,k;g=(1.5*d+f.plotX)/2.5;h=(1.5*e+a)/2.5;i=(1.5*d+i)/2.5;j=
(1.5*e+c)/2.5;k=(j-h)*(i-d)/(i-g)+e-j;h+=k;j+=k;h>a&&h>e?(h=s(a,e),j=2*e-h):h<a&&h<e&&(h=E(a,e),j=2*e-h);j>c&&j>e?(j=s(c,e),h=2*e-j):j<c&&j<e&&(j=E(c,e),h=2*e-j);b.rightContX=i;b.rightContY=j}b=["C",p(f.rightContX,f.plotX),p(f.rightContY,f.plotY),p(g,d),p(h,e),d,e];f.rightContX=f.rightContY=null;return b}});K.spline=Ia;V.areaspline=C(V.area);ya=ya.prototype;Ia=ka(Ia,{type:"areaspline",getStackPoints:ya.getStackPoints,getGraphPath:ya.getGraphPath,setStackCliffs:ya.setStackCliffs,drawGraph:ya.drawGraph,
drawLegendSymbol:Z.drawRectangle});K.areaspline=Ia;V.column=C(ba,{borderColor:"#FFFFFF",borderRadius:0,groupPadding:0.2,marker:null,pointPadding:0.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{brightness:0.1,shadow:!1,halo:!1},select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0});Ia=ka(P,{type:"column",pointAttrToOptions:{stroke:"borderColor",
fill:"color",r:"borderRadius"},cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){P.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&n(b.series,function(b){if(b.type===a.type)b.isDirty=!0})},getColumnMetrics:function(){var a=this,b=a.options,c=a.xAxis,d=a.yAxis,e=c.reversed,f,g={},h=0;b.grouping===!1?h=1:n(a.chart.series,function(b){var c=b.options,e=b.yAxis,i;if(b.type===a.type&&b.visible&&d.len===e.len&&d.pos===e.pos)c.stacking?
(f=b.stackKey,g[f]===u&&(g[f]=h++),i=g[f]):c.grouping!==!1&&(i=h++),b.columnIndex=i});var i=E(Q(c.transA)*(c.ordinalSlope||b.pointRange||c.closestPointRange||c.tickInterval||1),c.len),j=i*b.groupPadding,k=(i-2*j)/h,b=E(b.maxPointWidth||c.len,p(b.pointWidth,k*(1-2*b.pointPadding)));a.columnMetrics={width:b,offset:(k-b)/2+(j+((a.columnIndex||0)+(e?1:0))*k-i/2)*(e?-1:1)};return a.columnMetrics},crispCol:function(a,b,c,d){var e=this.chart,f=this.borderWidth,g=-(f%2?0.5:0),f=f%2?0.5:1;e.inverted&&e.renderer.isVML&&
(f+=1);c=Math.round(a+c)+g;a=Math.round(a)+g;c-=a;d=Math.round(b+d)+f;g=Q(b)<=0.5&&d>0.5;b=Math.round(b)+f;d-=b;g&&(b-=1,d+=1);return{x:a,y:b,width:c,height:d}},translate:function(){var a=this,b=a.chart,c=a.options,d=a.borderWidth=p(c.borderWidth,a.closestPointRange*a.xAxis.transA<2?0:1),e=a.yAxis,f=a.translatedThreshold=e.getThreshold(c.threshold),g=p(c.minPointLength,5),h=a.getColumnMetrics(),i=h.width,j=a.barW=s(i,1+2*d),k=a.pointXOffset=h.offset;b.inverted&&(f-=0.5);c.pointPadding&&(j=Fa(j));
P.prototype.translate.apply(a);n(a.points,function(c){var d=E(p(c.yBottom,f),9E4),h=999+Q(d),h=E(s(-h,c.plotY),e.len+h),q=c.plotX+k,r=j,n=E(h,d),t,v=s(h,d)-n;Q(v)<g&&g&&(v=g,t=!e.reversed&&!c.negative||e.reversed&&c.negative,n=Q(n-f)>g?d-g:f-(t?g:0));c.barX=q;c.pointWidth=i;c.tooltipPos=b.inverted?[e.len+e.pos-b.plotLeft-h,a.xAxis.len-q-r/2,v]:[q+r/2,h+e.pos-b.plotTop,v];c.shapeType="rect";c.shapeArgs=a.crispCol(q,n,r,v)})},getSymbol:pa,drawLegendSymbol:Z.drawRectangle,drawGraph:pa,drawPoints:function(){var a=
this,b=this.chart,c=a.options,d=b.renderer,e=c.animationLimit||250,f,g;n(a.points,function(h){var i=h.plotY,j=h.graphic;if(i!==u&&!isNaN(i)&&h.y!==null)f=h.shapeArgs,i=t(a.borderWidth)?{"stroke-width":a.borderWidth}:{},g=h.pointAttr[h.selected?"select":""]||a.pointAttr[""],j?(Ta(j),j.attr(i).attr(g)[b.pointCount<e?"animate":"attr"](C(f))):h.graphic=d[h.shapeType](f).attr(i).attr(g).add(h.group||a.group).shadow(c.shadow,null,c.stacking&&!c.borderRadius);else if(j)h.graphic=j.destroy()})},animate:function(a){var b=
this.yAxis,c=this.options,d=this.chart.inverted,e={};if(ha)a?(e.scaleY=0.001,a=E(b.pos+b.len,s(b.pos,b.toPixels(c.threshold))),d?e.translateX=a-b.len:e.translateY=a,this.group.attr(e)):(e.scaleY=1,e[d?"translateX":"translateY"]=b.pos,this.group.animate(e,this.options.animation),this.animate=null)},remove:function(){var a=this,b=a.chart;b.hasRendered&&n(b.series,function(b){if(b.type===a.type)b.isDirty=!0});P.prototype.remove.apply(a,arguments)}});K.column=Ia;V.bar=C(V.column);ya=ka(Ia,{type:"bar",
inverted:!0});K.bar=ya;V.scatter=C(ba,{lineWidth:0,marker:{enabled:!0},tooltip:{headerFormat:'<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px;"> {series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}});ya=ka(P,{type:"scatter",sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,kdDimensions:2,drawGraph:function(){this.options.lineWidth&&P.prototype.drawGraph.call(this)}});
K.scatter=ya;V.pie=C(ba,{borderColor:"#FFFFFF",borderWidth:1,center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.y===null?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,states:{hover:{brightness:0.1,shadow:!1}},stickyTracking:!1,tooltip:{followPointer:!0}});ba={type:"pie",isCartesian:!1,pointClass:ka(Ha,{init:function(){Ha.prototype.init.apply(this,arguments);var a=
this,b;a.name=p(a.name,"Slice");b=function(b){a.slice(b.type==="select")};D(a,"select",b);D(a,"unselect",b);return a},setVisible:function(a,b){var c=this,d=c.series,e=d.chart,f=d.options.ignoreHiddenPoint,b=p(b,f);if(a!==c.visible){c.visible=c.options.visible=a=a===u?!c.visible:a;d.options.data[qa(c,d.data)]=c.options;n(["graphic","dataLabel","connector","shadowGroup"],function(b){if(c[b])c[b][a?"show":"hide"](!0)});c.legendItem&&e.legend.colorizeItem(c,a);!a&&c.state==="hover"&&c.setState("");if(f)d.isDirty=
!0;b&&e.redraw()}},slice:function(a,b,c){var d=this.series;cb(c,d.chart);p(b,!0);this.sliced=this.options.sliced=a=t(a)?a:!this.sliced;d.options.data[qa(this,d.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)},haloPath:function(a){var b=this.shapeArgs,c=this.series.chart;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.plotLeft+b.x,c.plotTop+b.y,b.r+a,b.r+a,{innerR:this.shapeArgs.r,
start:b.start,end:b.end})}}),requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color"},animate:function(a){var b=this,c=b.points,d=b.startAngleRad;if(!a)n(c,function(a){var c=a.graphic,g=a.shapeArgs;c&&(c.attr({r:a.startR||b.center[3]/2,start:d,end:d}),c.animate({r:g.r,start:g.start,end:g.end},b.options.animation))}),b.animate=null},updateTotals:function(){var a,b=0,
c=this.points,d=c.length,e,f=this.options.ignoreHiddenPoint;for(a=0;a<d;a++)e=c[a],b+=f&&!e.visible?0:e.y;this.total=b;for(a=0;a<d;a++)e=c[a],e.percentage=b>0&&(e.visible||!f)?e.y/b*100:0,e.total=b},generatePoints:function(){P.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var b=0,c=this.options,d=c.slicedOffset,e=d+c.borderWidth,f,g,h,i=c.startAngle||0,j=this.startAngleRad=Ba/180*(i-90),i=(this.endAngleRad=Ba/180*(p(c.endAngle,i+360)-90))-j,k=
this.points,l=c.dataLabels.distance,c=c.ignoreHiddenPoint,m,o=k.length,q;if(!a)this.center=a=this.getCenter();this.getX=function(b,c){h=X.asin(E((b-a[1])/(a[2]/2+l),1));return a[0]+(c?-1:1)*aa(h)*(a[2]/2+l)};for(m=0;m<o;m++){q=k[m];f=j+b*i;if(!c||q.visible)b+=q.percentage/100;g=j+b*i;q.shapeType="arc";q.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:y(f*1E3)/1E3,end:y(g*1E3)/1E3};h=(g+f)/2;h>1.5*Ba?h-=2*Ba:h<-Ba/2&&(h+=2*Ba);q.slicedTranslation={translateX:y(aa(h)*d),translateY:y(ia(h)*d)};
f=aa(h)*a[2]/2;g=ia(h)*a[2]/2;q.tooltipPos=[a[0]+f*0.7,a[1]+g*0.7];q.half=h<-Ba/2||h>Ba/2?1:0;q.angle=h;e=E(e,l/2);q.labelPos=[a[0]+f+aa(h)*l,a[1]+g+ia(h)*l,a[0]+f+aa(h)*e,a[1]+g+ia(h)*e,a[0]+f,a[1]+g,l<0?"center":q.half?"right":"left",h]}},drawGraph:null,drawPoints:function(){var a=this,b=a.chart.renderer,c,d,e=a.options.shadow,f,g,h,i;if(e&&!a.shadowGroup)a.shadowGroup=b.g("shadow").add(a.group);n(a.points,function(j){if(j.y!==null){d=j.graphic;h=j.shapeArgs;f=j.shadowGroup;g=j.pointAttr[j.selected?
"select":""];if(!g.stroke)g.stroke=g.fill;if(e&&!f)f=j.shadowGroup=b.g("shadow").add(a.shadowGroup);c=j.sliced?j.slicedTranslation:{translateX:0,translateY:0};f&&f.attr(c);if(d)d.setRadialReference(a.center).attr(g).animate(w(h,c));else{i={"stroke-linejoin":"round"};if(!j.visible)i.visibility="hidden";j.graphic=d=b[j.shapeType](h).setRadialReference(a.center).attr(g).attr(i).attr(c).add(a.group).shadow(e,f)}}})},searchPoint:pa,sortByAngle:function(a,b){a.sort(function(a,d){return a.angle!==void 0&&
(d.angle-a.angle)*b})},drawLegendSymbol:Z.drawRectangle,getCenter:cc.getCenter,getSymbol:pa};ba=ka(P,ba);K.pie=ba;P.prototype.drawDataLabels=function(){var a=this,b=a.options,c=b.cursor,d=b.dataLabels,e=a.points,f,g,h=a.hasRendered||0,i,j,k=a.chart.renderer;if(d.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(d),j=a.plotGroup("dataLabelsGroup","data-labels",d.defer?"hidden":"visible",d.zIndex||6),p(d.defer,!0)&&(j.attr({opacity:+h}),h||D(a,"afterAnimate",function(){a.visible&&j.show();
j[b.animation?"animate":"attr"]({opacity:1},{duration:200})})),g=d,n(e,function(e){var h,o=e.dataLabel,q,r,n=e.connector,s=!0,v,x={};f=e.dlOptions||e.options&&e.options.dataLabels;h=p(f&&f.enabled,g.enabled)&&e.y!==null;if(o&&!h)e.dataLabel=o.destroy();else if(h){d=C(g,f);v=d.style;h=d.rotation;q=e.getLabelConfig();i=d.format?Ka(d.format,q):d.formatter.call(q,d);v.color=p(d.color,v.color,a.color,"black");if(o)if(t(i))o.attr({text:i}),s=!1;else{if(e.dataLabel=o=o.destroy(),n)e.connector=n.destroy()}else if(t(i)){o=
{fill:d.backgroundColor,stroke:d.borderColor,"stroke-width":d.borderWidth,r:d.borderRadius||0,rotation:h,padding:d.padding,zIndex:1};if(v.color==="contrast")x.color=d.inside||d.distance<0||b.stacking?k.getContrast(e.color||a.color):"#000000";if(c)x.cursor=c;for(r in o)o[r]===u&&delete o[r];o=e.dataLabel=k[h?"text":"label"](i,0,-9999,d.shape,null,null,d.useHTML).attr(o).css(w(v,x)).add(j).shadow(d.shadow)}o&&a.alignDataLabel(e,o,d,null,s)}})};P.prototype.alignDataLabel=function(a,b,c,d,e){var f=this.chart,
g=f.inverted,h=p(a.plotX,-9999),i=p(a.plotY,-9999),j=b.getBBox(),k=f.renderer.fontMetrics(c.style.fontSize).b,l=c.rotation,m=c.align,o=this.visible&&(a.series.forceDL||f.isInsidePlot(h,y(i),g)||d&&f.isInsidePlot(h,g?d.x+1:d.y+d.height-1,g)),q=p(c.overflow,"justify")==="justify";if(o)d=w({x:g?f.plotWidth-i:h,y:y(g?f.plotHeight-h:i),width:0,height:0},d),w(c,{width:j.width,height:j.height}),l?(q=!1,g=f.renderer.rotCorr(k,l),g={x:d.x+c.x+d.width/2+g.x,y:d.y+c.y+d.height/2},b[e?"attr":"animate"](g).attr({align:c.align}),
h=(l+720)%360,h=h>180&&h<360,m==="left"?g.y-=h?j.height:0:m==="center"?(g.x-=j.width/2,g.y-=j.height/2):m==="right"&&(g.x-=j.width,g.y-=h?0:j.height)):(b.align(c,null,d),g=b.alignAttr),q?this.justifyDataLabel(b,c,g,j,d,e):p(c.crop,!0)&&(o=f.isInsidePlot(g.x,g.y)&&f.isInsidePlot(g.x+j.width,g.y+j.height)),c.shape&&!l&&b.attr({anchorX:a.plotX,anchorY:a.plotY});if(!o)Ta(b),b.attr({y:-9999}),b.placed=!1};P.prototype.justifyDataLabel=function(a,b,c,d,e,f){var g=this.chart,h=b.align,i=b.verticalAlign,j,
k,l=a.box?0:a.padding||0;j=c.x+l;if(j<0)h==="right"?b.align="left":b.x=-j,k=!0;j=c.x+d.width-l;if(j>g.plotWidth)h==="left"?b.align="right":b.x=g.plotWidth-j,k=!0;j=c.y+l;if(j<0)i==="bottom"?b.verticalAlign="top":b.y=-j,k=!0;j=c.y+d.height-l;if(j>g.plotHeight)i==="top"?b.verticalAlign="bottom":b.y=g.plotHeight-j,k=!0;if(k)a.placed=!f,a.align(b,null,e)};if(K.pie)K.pie.prototype.drawDataLabels=function(){var a=this,b=a.data,c,d=a.chart,e=a.options.dataLabels,f=p(e.connectorPadding,10),g=p(e.connectorWidth,
1),h=d.plotWidth,i=d.plotHeight,j,k,l=p(e.softConnector,!0),m=e.distance,o=a.center,q=o[2]/2,r=o[1],A=m>0,t,v,x,u=[[],[]],w,z,C,B,L,D=[0,0,0,0],J=function(a,b){return b.y-a.y};if(a.visible&&(e.enabled||a._hasPointLabels)){P.prototype.drawDataLabels.apply(a);n(b,function(a){if(a.dataLabel&&a.visible)u[a.half].push(a),a.dataLabel._pos=null});for(B=2;B--;){var G=[],K=[],I=u[B],F=I.length,H;if(F){a.sortByAngle(I,B-0.5);for(L=b=0;!b&&I[L];)b=I[L]&&I[L].dataLabel&&(I[L].dataLabel.getBBox().height||21),
L++;if(m>0){v=E(r+q+m,d.plotHeight);for(L=s(0,r-q-m);L<=v;L+=b)G.push(L);v=G.length;if(F>v){c=[].concat(I);c.sort(J);for(L=F;L--;)c[L].rank=L;for(L=F;L--;)I[L].rank>=v&&I.splice(L,1);F=I.length}for(L=0;L<F;L++){c=I[L];x=c.labelPos;c=9999;var M,O;for(O=0;O<v;O++)M=Q(G[O]-x[1]),M<c&&(c=M,H=O);if(H<L&&G[L]!==null)H=L;else for(v<F-L+H&&G[L]!==null&&(H=v-F+L);G[H]===null;)H++;K.push({i:H,y:G[H]});G[H]=null}K.sort(J)}for(L=0;L<F;L++){c=I[L];x=c.labelPos;t=c.dataLabel;C=c.visible===!1?"hidden":"inherit";
c=x[1];if(m>0){if(v=K.pop(),H=v.i,z=v.y,c>z&&G[H+1]!==null||c<z&&G[H-1]!==null)z=E(s(0,c),d.plotHeight)}else z=c;w=e.justify?o[0]+(B?-1:1)*(q+m):a.getX(z===r-q-m||z===r+q+m?c:z,B);t._attr={visibility:C,align:x[6]};t._pos={x:w+e.x+({left:f,right:-f}[x[6]]||0),y:z+e.y-10};t.connX=w;t.connY=z;if(this.options.size===null)v=t.width,w-v<f?D[3]=s(y(v-w+f),D[3]):w+v>h-f&&(D[1]=s(y(w+v-h+f),D[1])),z-b/2<0?D[0]=s(y(-z+b/2),D[0]):z+b/2>i&&(D[2]=s(y(z+b/2-i),D[2]))}}}if(Ea(D)===0||this.verifyDataLabelOverflow(D))this.placeDataLabels(),
A&&g&&n(this.points,function(b){j=b.connector;x=b.labelPos;if((t=b.dataLabel)&&t._pos&&b.visible)C=t._attr.visibility,w=t.connX,z=t.connY,k=l?["M",w+(x[6]==="left"?5:-5),z,"C",w,z,2*x[2]-x[4],2*x[3]-x[5],x[2],x[3],"L",x[4],x[5]]:["M",w+(x[6]==="left"?5:-5),z,"L",x[2],x[3],"L",x[4],x[5]],j?(j.animate({d:k}),j.attr("visibility",C)):b.connector=j=a.chart.renderer.path(k).attr({"stroke-width":g,stroke:e.connectorColor||b.color||"#606060",visibility:C}).add(a.dataLabelsGroup);else if(j)b.connector=j.destroy()})}},
K.pie.prototype.placeDataLabels=function(){n(this.points,function(a){var b=a.dataLabel;if(b&&a.visible)(a=b._pos)?(b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999})})},K.pie.prototype.alignDataLabel=pa,K.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,d=c.center,e=c.minSize||80,f=e,g;d[0]!==null?f=s(b[2]-s(a[1],a[3]),e):(f=s(b[2]-a[1]-a[3],e),b[0]+=(a[3]-a[1])/2);d[1]!==null?f=s(E(f,b[2]-s(a[0],a[2])),e):(f=s(E(f,b[2]-a[0]-a[2]),e),
b[1]+=(a[0]-a[2])/2);f<b[2]?(b[2]=f,b[3]=Math.min(/%$/.test(c.innerSize||0)?f*parseFloat(c.innerSize||0)/100:parseFloat(c.innerSize||0),f),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):g=!0;return g};if(K.column)K.column.prototype.alignDataLabel=function(a,b,c,d,e){var f=this.chart.inverted,g=a.series,h=a.dlBox||a.shapeArgs,i=p(a.below,a.plotY>p(this.translatedThreshold,g.yAxis.len)),j=p(c.inside,!!this.options.stacking);if(h){d=C(h);if(d.y<0)d.height+=d.y,d.y=0;h=d.y+d.height-g.yAxis.len;
h>0&&(d.height-=h);f&&(d={x:g.yAxis.len-d.y-d.height,y:g.xAxis.len-d.x-d.width,width:d.height,height:d.width});if(!j)f?(d.x+=i?0:d.width,d.width=0):(d.y+=i?d.height:0,d.height=0)}c.align=p(c.align,!f||j?"center":i?"right":"left");c.verticalAlign=p(c.verticalAlign,f||j?"middle":i?"top":"bottom");P.prototype.alignDataLabel.call(this,a,b,c,d,e)};(function(a){var b=a.Chart,c=a.each,d=a.pick,e=a.addEvent;b.prototype.callbacks.push(function(a){function b(){var e=[];c(a.series,function(a){var b=a.options.dataLabels,
f=a.dataLabelCollections||["dataLabel"];(b.enabled||a._hasPointLabels)&&!b.allowOverlap&&a.visible&&c(f,function(b){c(a.points,function(a){if(a[b])a[b].labelrank=d(a.labelrank,a.shapeArgs&&a.shapeArgs.height),e.push(a[b])})})});a.hideOverlappingLabels(e)}b();e(a,"redraw",b)});b.prototype.hideOverlappingLabels=function(a){var b=a.length,d,e,j,k,l,m,o,q,r;for(e=0;e<b;e++)if(d=a[e])d.oldOpacity=d.opacity,d.newOpacity=1;a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(e=0;e<b;e++){j=
a[e];for(d=e+1;d<b;++d)if(k=a[d],j&&k&&j.placed&&k.placed&&j.newOpacity!==0&&k.newOpacity!==0&&(l=j.alignAttr,m=k.alignAttr,o=j.parentGroup,q=k.parentGroup,r=2*(j.box?0:j.padding),l=!(m.x+q.translateX>l.x+o.translateX+(j.width-r)||m.x+q.translateX+(k.width-r)<l.x+o.translateX||m.y+q.translateY>l.y+o.translateY+(j.height-r)||m.y+q.translateY+(k.height-r)<l.y+o.translateY)))(j.labelrank<k.labelrank?j:k).newOpacity=0}c(a,function(a){var b,c;if(a){c=a.newOpacity;if(a.oldOpacity!==c&&a.placed)c?a.show(!0):
b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b);a.isOld=!0}})}})(z);var ob=z.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,d=a.options.cursor,e=d&&{cursor:d},f=function(a){for(var c=a.target,d;c&&!d;)d=c.point,c=c.parentNode;if(d!==u&&d!==b.hoverPoint)d.onMouseOver(a)};n(a.points,function(a){if(a.graphic)a.graphic.element.point=a;if(a.dataLabel)a.dataLabel.element.point=a});if(!a._hasTracking)n(a.trackerGroups,function(b){if(a[b]&&
(a[b].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){c.onTrackerMouseOut(a)}).css(e),eb))a[b].on("touchstart",f)}),a._hasTracking=!0},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,g=f.pointer,h=f.renderer,i=f.options.tooltip.snap,j=a.tracker,k=b.cursor,l=k&&{cursor:k},m=function(){if(f.hoverSeries!==a)a.onMouseOver()},o="rgba(192,192,192,"+(ha?1.0E-4:0.002)+")";if(e&&!c)for(k=e+1;k--;)d[k]===
"M"&&d.splice(k+1,0,d[k+1]-i,d[k+2],"L"),(k&&d[k]==="M"||k===e)&&d.splice(k,0,"L",d[k-2]+i,d[k-1]);j?j.attr({d:d}):(a.tracker=h.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:o,fill:c?o:"none","stroke-width":b.lineWidth+(c?0:2*i),zIndex:2}).add(a.group),n([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",m).on("mouseout",function(a){g.onTrackerMouseOut(a)}).css(l);if(eb)a.on("touchstart",m)}))}};if(K.column)Ia.prototype.drawTracker=
ob.drawTrackerPoint;if(K.pie)K.pie.prototype.drawTracker=ob.drawTrackerPoint;if(K.scatter)ya.prototype.drawTracker=ob.drawTrackerPoint;w(vb.prototype,{setItemEvents:function(a,b,c,d,e){var f=this;(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");b.css(f.options.itemHoverStyle)}).on("mouseout",function(){b.css(a.visible?d:e);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()},b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):
M(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=ca("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);D(a.checkbox,"click",function(b){M(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});O.legend.itemStyle.cursor="pointer";w(Ca.prototype,{showResetZoom:function(){var a=this,b=O.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f=c.relativeTo==="chart"?
null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).add().align(c.position,!1,f)},zoomOut:function(){var a=this;M(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,d=!1,e;!a||a.resetSelection?n(this.axes,function(a){b=a.zoom()}):n(a.xAxis.concat(a.yAxis),function(a){var e=a.axis,h=e.isXAxis;if(c[h?"zoomX":"zoomY"]||c[h?"pinchX":"pinchY"])b=
e.zoom(a.min,a.max),e.displayBtn&&(d=!0)});e=this.resetZoomButton;if(d&&!e)this.showResetZoom();else if(!d&&fa(e))this.resetZoomButton=e.destroy();b&&this.redraw(p(this.options.chart.animation,a&&a.animation,this.pointCount<100))},pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&n(d,function(a){a.setState()});n(b==="xy"?[1,0]:[1],function(b){var b=c[b?"xAxis":"yAxis"][0],d=b.horiz,h=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",i=c[d],j=(b.pointRange||0)/2,k=b.getExtremes(),l=b.toValue(i-
h,!0)+j,j=b.toValue(i+b.len-h,!0)-j,i=i>h;if(b.series.length&&(i||l>E(k.dataMin,k.min))&&(!i||j<s(k.dataMax,k.max)))b.setExtremes(l,j,!1,!1,{trigger:"pan"}),e=!0;c[d]=h});e&&c.redraw(!1);I(c.container,{cursor:"move"})}});w(Ha.prototype,{select:function(a,b){var c=this,d=c.series,e=d.chart,a=p(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[qa(c,d.data)]=c.options;c.setState(a&&"select");b||n(e.getSelectedPoints(),function(a){if(a.selected&&
a!==c)a.selected=a.options.selected=!1,d.options.data[qa(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect")})})},onMouseOver:function(a,b){var c=this.series,d=c.chart,e=d.tooltip,f=d.hoverPoint;if(d.hoverSeries!==c)c.onMouseOver();if(f&&f!==this)f.onMouseOut();if(this.series&&(this.firePointEvent("mouseOver"),e&&(!e.shared||c.noSharedTooltip)&&e.refresh(this,a),this.setState("hover"),!b))d.hoverPoint=this},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;this.firePointEvent("mouseOut");
if(!b||qa(this,b)===-1)this.setState(),a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var a=C(this.series.options.point,this.options).events,b;this.events=a;for(b in a)D(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a,b){var c=U(this.plotX),d=this.plotY,e=this.series,f=e.options.states,g=V[e.type].marker&&e.options.marker,h=g&&!g.enabled,i=g&&g.states[a],j=i&&i.enabled===!1,k=e.stateMarkerGraphic,l=this.marker||{},m=e.chart,o=e.halo,q,a=a||"";q=this.pointAttr[a]||
e.pointAttr[a];if(!(a===this.state&&!b||this.selected&&a!=="select"||f[a]&&f[a].enabled===!1||a&&(j||h&&i.enabled===!1)||a&&l.states&&l.states[a]&&l.states[a].enabled===!1)){if(this.graphic)g=g&&this.graphic.symbolName&&q.r,this.graphic.attr(C(q,g?{x:c-g,y:d-g,width:2*g,height:2*g}:{})),k&&k.hide();else{if(a&&i)if(g=i.radius,l=l.symbol||e.symbol,k&&k.currentSymbol!==l&&(k=k.destroy()),k)k[b?"animate":"attr"]({x:c-g,y:d-g});else if(l)e.stateMarkerGraphic=k=m.renderer.symbol(l,c-g,d-g,2*g,2*g).attr(q).add(e.markerGroup),
k.currentSymbol=l;if(k)k[a&&m.isInsidePlot(c,d,m.inverted)?"show":"hide"](),k.element.point=this}if((c=f[a]&&f[a].halo)&&c.size){if(!o)e.halo=o=m.renderer.path().add(m.seriesGroup);o.attr(w({fill:this.color||e.color,"fill-opacity":c.opacity,zIndex:-1},c.attributes))[b?"animate":"attr"]({d:this.haloPath(c.size)})}else o&&o.attr({d:[]});this.state=a}},haloPath:function(a){var b=this.series,c=b.chart,d=b.getPlotBox(),e=c.inverted,f=Math.floor(this.plotX);return c.renderer.symbols.circle(d.translateX+
(e?b.yAxis.len-this.plotY:f)-a,d.translateY+(e?b.xAxis.len-f:this.plotY)-a,a*2,a*2)}});w(P.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&M(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&M(this,"mouseOut");c&&!a.stickyTracking&&(!c.shared||this.noSharedTooltip)&&
c.hide();this.setState()},setState:function(a){var b=this.options,c=this.graph,d=b.states,e=b.lineWidth,b=0,a=a||"";if(this.state!==a&&(this.state=a,!(d[a]&&d[a].enabled===!1)&&(a&&(e=d[a].lineWidth||e+(d[a].lineWidthPlus||0)),c&&!c.dashstyle))){a={"stroke-width":e};for(c.attr(a);this["zoneGraph"+b];)this["zoneGraph"+b].attr(a),b+=1}},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,g=d.options.chart.ignoreHiddenSeries,h=c.visible;f=(c.visible=a=c.userOptions.visible=a===u?!h:a)?"show":
"hide";n(["group","dataLabelsGroup","markerGroup","tracker"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&n(d.series,function(a){if(a.options.stacking&&a.visible)a.isDirty=!0});n(c.linkedSeries,function(b){b.setVisible(a,!1)});if(g)d.isDirtyBox=!0;b!==!1&&d.redraw();M(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=
a=a===u?!this.selected:a;if(this.checkbox)this.checkbox.checked=a;M(this,a?"select":"unselect")},drawTracker:ob.drawTrackerGraph});S(P.prototype,"init",function(a){var b;a.apply(this,Array.prototype.slice.call(arguments,1));(b=this.xAxis)&&b.options.ordinal&&D(this,"updatedData",function(){delete b.ordinalIndex})});S(F.prototype,"getTimeTicks",function(a,b,c,d,e,f,g,h){var i=0,j,k,l={},m,o,q,r=[],n=-Number.MAX_VALUE,p=this.options.tickPixelInterval;if(!this.options.ordinal&&!this.options.breaks||
!f||f.length<3||c===u)return a.call(this,b,c,d,e);o=f.length;for(j=0;j<o;j++){q=j&&f[j-1]>d;f[j]<c&&(i=j);if(j===o-1||f[j+1]-f[j]>g*5||q){if(f[j]>n){for(k=a.call(this,b,f[i],f[j],e);k.length&&k[0]<=n;)k.shift();k.length&&(n=k[k.length-1]);r=r.concat(k)}i=j+1}if(q)break}a=k.info;if(h&&a.unitRange<=H.hour){j=r.length-1;for(i=1;i<j;i++)la("%d",r[i])!==la("%d",r[i-1])&&(l[r[i]]="day",m=!0);m&&(l[r[0]]="day");a.higherRanks=l}r.info=a;if(h&&t(p)){h=a=r.length;j=[];var v;for(m=[];h--;)i=this.translate(r[h]),
v&&(m[h]=v-i),j[h]=v=i;m.sort();m=m[U(m.length/2)];m<p*0.6&&(m=null);h=r[a-1]>d?a-1:a;for(v=void 0;h--;)i=j[h],d=v-i,v&&d<p*0.8&&(m===null||d<m*0.8)?(l[r[h]]&&!l[r[h+1]]?(d=h+1,v=i):d=h,r.splice(d,1)):v=i}return r});w(F.prototype,{beforeSetTickPositions:function(){var a,b=[],c=!1,d,e=this.getExtremes(),f=e.min,g=e.max,h,i=this.isXAxis&&!!this.options.breaks;if((e=this.options.ordinal)||i){n(this.series,function(c,d){if(c.visible!==!1&&(c.takeOrdinalPosition!==!1||i))if(b=b.concat(c.processedXData),
a=b.length,b.sort(function(a,b){return a-b}),a)for(d=a-1;d--;)b[d]===b[d+1]&&b.splice(d,1)});a=b.length;if(a>2){d=b[1]-b[0];for(h=a-1;h--&&!c;)b[h+1]-b[h]!==d&&(c=!0);if(!this.options.keepOrdinalPadding&&(b[0]-f>d||g-b[b.length-1]>d))c=!0}c?(this.ordinalPositions=b,d=this.val2lin(s(f,b[0]),!0),h=s(this.val2lin(E(g,b[b.length-1]),!0),1),this.ordinalSlope=g=(g-f)/(h-d),this.ordinalOffset=f-d*g):this.ordinalPositions=this.ordinalSlope=this.ordinalOffset=u}this.isOrdinal=e&&c;this.groupIntervalFactor=
null},val2lin:function(a,b){var c=this.ordinalPositions,d;if(c){var e=c.length,f;for(d=e;d--;)if(c[d]===a){f=d;break}for(d=e-1;d--;)if(a>c[d]||d===0){c=(a-c[d])/(c[d+1]-c[d]);f=d+c;break}d=b?f:this.ordinalSlope*(f||0)+this.ordinalOffset}else d=a;return d},lin2val:function(a,b){var c=this.ordinalPositions;if(c){var d=this.ordinalSlope,e=this.ordinalOffset,f=c.length-1,g,h;if(b)a<0?a=c[0]:a>f?a=c[f]:(f=U(a),h=a-f);else for(;f--;)if(g=d*f+e,a>=g){d=d*(f+1)+e;h=(a-g)/(d-g);break}c=h!==u&&c[f]!==u?c[f]+
(h?h*(c[f+1]-c[f]):0):a}else c=a;return c},getExtendedPositions:function(){var a=this.chart,b=this.series[0].currentDataGrouping,c=this.ordinalIndex,d=b?b.count+b.unitName:"raw",e=this.getExtremes(),f,g;if(!c)c=this.ordinalIndex={};if(!c[d])f={series:[],getExtremes:function(){return{min:e.dataMin,max:e.dataMax}},options:{ordinal:!0},val2lin:F.prototype.val2lin},n(this.series,function(c){g={xAxis:f,xData:c.xData,chart:a,destroyGroupedData:pa};g.options={dataGrouping:b?{enabled:!0,forced:!0,approximation:"open",
units:[[b.unitName,[b.count]]]}:{enabled:!1}};c.processData.apply(g);f.series.push(g)}),this.beforeSetTickPositions.apply(f),c[d]=f.ordinalPositions;return c[d]},getGroupIntervalFactor:function(a,b,c){var d,c=c.processedXData,e=c.length,f=[];d=this.groupIntervalFactor;if(!d){for(d=0;d<e-1;d++)f[d]=c[d+1]-c[d];f.sort(function(a,b){return a-b});f=f[U(e/2)];a=s(a,c[0]);b=E(b,c[e-1]);this.groupIntervalFactor=d=e*f/(b-a)}return d},postProcessTickInterval:function(a){var b=this.ordinalSlope;return b?this.options.breaks?
this.closestPointRange:a/(b/this.closestPointRange):a}});S(Ca.prototype,"pan",function(a,b){var c=this.xAxis[0],d=b.chartX,e=!1;if(c.options.ordinal&&c.series.length){var f=this.mouseDownX,g=c.getExtremes(),h=g.dataMax,i=g.min,j=g.max,k=this.hoverPoints,l=c.closestPointRange,f=(f-d)/(c.translationSlope*(c.ordinalSlope||l)),m={ordinalPositions:c.getExtendedPositions()},l=c.lin2val,o=c.val2lin,q;if(m.ordinalPositions){if(Q(f)>1)k&&n(k,function(a){a.setState()}),f<0?(k=m,q=c.ordinalPositions?c:m):(k=
c.ordinalPositions?c:m,q=m),m=q.ordinalPositions,h>m[m.length-1]&&m.push(h),this.fixedRange=j-i,f=c.toFixedRange(null,null,l.apply(k,[o.apply(k,[i,!0])+f,!0]),l.apply(q,[o.apply(q,[j,!0])+f,!0])),f.min>=E(g.dataMin,i)&&f.max<=s(h,j)&&c.setExtremes(f.min,f.max,!0,!1,{trigger:"pan"}),this.mouseDownX=d,I(this.container,{cursor:"move"})}else e=!0}else e=!0;e&&a.apply(this,Array.prototype.slice.call(arguments,1))});P.prototype.gappedPath=function(){var a=this.options.gapSize,b=this.xAxis,c=this.points.slice(),
d;if(a)for(d=c.length-1;d--;)c[d+1].x-c[d].x>b.closestPointRange*a&&c.splice(d+1,0,{isNull:!0});return this.getGraphPath(c)};(function(a){a(z)})(function(a){function b(){return Array.prototype.slice.call(arguments,1)}function c(a){a.apply(this);this.drawBreaks()}var d=a.pick,e=a.wrap,f=a.each,g=a.extend,h=a.fireEvent,i=a.Axis,j=a.Series;g(i.prototype,{isInBreak:function(a,b){var c=a.repeat||Infinity,d=a.from,e=a.to-a.from,c=b>=d?(b-d)%c:c-(d-b)%c;return a.inclusive?c<=e:c<e&&c!==0},isInAnyBreak:function(a,
b){var c=this.options.breaks,e=c&&c.length,f,g,h;if(e){for(;e--;)this.isInBreak(c[e],a)&&(f=!0,g||(g=d(c[e].showPoints,this.isXAxis?!1:!0)));h=f&&b?f&&!g:f}return h}});e(i.prototype,"setTickPositions",function(a){a.apply(this,Array.prototype.slice.call(arguments,1));if(this.options.breaks){var b=this.tickPositions,c=this.tickPositions.info,d=[],e;for(e=0;e<b.length;e++)this.isInAnyBreak(b[e])||d.push(b[e]);this.tickPositions=d;this.tickPositions.info=c}});e(i.prototype,"init",function(a,b,c){if(c.breaks&&
c.breaks.length)c.ordinal=!1;a.call(this,b,c);if(this.options.breaks){var d=this;d.isBroken=!0;this.val2lin=function(a){var b=a,c,e;for(e=0;e<d.breakArray.length;e++)if(c=d.breakArray[e],c.to<=a)b-=c.len;else if(c.from>=a)break;else if(d.isInBreak(c,a)){b-=a-c.from;break}return b};this.lin2val=function(a){var b,c;for(c=0;c<d.breakArray.length;c++)if(b=d.breakArray[c],b.from>=a)break;else b.to<a?a+=b.len:d.isInBreak(b,a)&&(a+=b.len);return a};this.setExtremes=function(a,b,c,d,e){for(;this.isInAnyBreak(a);)a-=
this.closestPointRange;for(;this.isInAnyBreak(b);)b-=this.closestPointRange;i.prototype.setExtremes.call(this,a,b,c,d,e)};this.setAxisTranslation=function(a){i.prototype.setAxisTranslation.call(this,a);var b=d.options.breaks,a=[],c=[],e=0,f,g,k=d.userMin||d.min,j=d.userMax||d.max,m,l;for(l in b)g=b[l],f=g.repeat||Infinity,d.isInBreak(g,k)&&(k+=g.to%f-k%f),d.isInBreak(g,j)&&(j-=j%f-g.from%f);for(l in b){g=b[l];m=g.from;for(f=g.repeat||Infinity;m-f>k;)m-=f;for(;m<k;)m+=f;for(;m<j;m+=f)a.push({value:m,
move:"in"}),a.push({value:m+(g.to-g.from),move:"out",size:g.breakSize})}a.sort(function(a,b){return a.value===b.value?(a.move==="in"?0:1)-(b.move==="in"?0:1):a.value-b.value});b=0;m=k;for(l in a){g=a[l];b+=g.move==="in"?1:-1;if(b===1&&g.move==="in")m=g.value;b===0&&(c.push({from:m,to:g.value,len:g.value-m-(g.size||0)}),e+=g.value-m-(g.size||0))}d.breakArray=c;h(d,"afterBreaks");d.transA*=(j-d.min)/(j-k-e);d.min=k;d.max=j}}});e(j.prototype,"generatePoints",function(a){a.apply(this,b(arguments));var c=
this.xAxis,d=this.yAxis,e=this.points,f,g=e.length,h=this.options.connectNulls,i;if(c&&d&&(c.options.breaks||d.options.breaks))for(;g--;)if(f=e[g],i=f.y===null&&h===!1,!i&&(c.isInAnyBreak(f.x,!0)||d.isInAnyBreak(f.y,!0)))e.splice(g,1),this.data[g]&&this.data[g].destroyElements()});a.Series.prototype.drawBreaks=function(){var a=this,b=a.points,c,e,g,i,j;f(["y","x"],function(n){c=a[n+"Axis"];e=c.breakArray||[];g=c.isXAxis?c.min:d(a.options.threshold,c.min);f(b,function(a){j=d(a["stack"+n.toUpperCase()],
a[n]);f(e,function(b){i=!1;if(g<b.from&&j>b.to||g>b.from&&j<b.from)i="pointBreak";else if(g<b.from&&j>b.from&&j<b.to||g>b.from&&j>b.to&&j<b.from)i="pointInBreak";i&&h(c,i,{point:a,brk:b})})})})};e(a.seriesTypes.column.prototype,"drawPoints",c);e(a.Series.prototype,"drawPoints",c)});var ga=P.prototype,dc=ga.processData,ec=ga.generatePoints,fc=ga.destroy,gc={approximation:"average",groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %b %e, %H:%M:%S.%L","%A, %b %e, %H:%M:%S.%L","-%H:%M:%S.%L"],
second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"],minute:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],hour:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],day:["%A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],week:["Week from %A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y","%Y","-%Y"]}},Yb={line:{},spline:{},area:{},areaspline:{},column:{approximation:"sum",groupPixelWidth:10},arearange:{approximation:"range"},areasplinerange:{approximation:"range"},
columnrange:{approximation:"range",groupPixelWidth:10},candlestick:{approximation:"ohlc",groupPixelWidth:10},ohlc:{approximation:"ohlc",groupPixelWidth:5}},Zb=[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1]],["week",[1]],["month",[1,3,6]],["year",null]],Va={sum:function(a){var b=a.length,c;if(!b&&a.hasNulls)c=null;else if(b)for(c=0;b--;)c+=a[b];return c},average:function(a){var b=a.length,a=Va.sum(a);typeof a===
"number"&&b&&(a/=b);return a},open:function(a){return a.length?a[0]:a.hasNulls?null:u},high:function(a){return a.length?Ea(a):a.hasNulls?null:u},low:function(a){return a.length?Pa(a):a.hasNulls?null:u},close:function(a){return a.length?a[a.length-1]:a.hasNulls?null:u},ohlc:function(a,b,c,d){a=Va.open(a);b=Va.high(b);c=Va.low(c);d=Va.close(d);if(typeof a==="number"||typeof b==="number"||typeof c==="number"||typeof d==="number")return[a,b,c,d]},range:function(a,b){a=Va.low(a);b=Va.high(b);if(typeof a===
"number"||typeof b==="number")return[a,b]}};ga.groupData=function(a,b,c,d){var e=this.data,f=this.options.data,g=[],h=[],i=a.length,j,k,l=!!b,m=[[],[],[],[]],d=typeof d==="function"?d:Va[d],o=this.pointArrayMap,q=o&&o.length,n;for(n=0;n<=i;n++)if(a[n]>=c[0])break;for(;n<=i;n++){for(;c[1]!==u&&a[n]>=c[1]||n===i;)if(j=c.shift(),k=d.apply(0,m),k!==u&&(g.push(j),h.push(k)),m[0]=[],m[1]=[],m[2]=[],m[3]=[],n===i)break;if(n===i)break;if(o){j=this.cropStart+n;j=e&&e[j]||this.pointClass.prototype.applyOptions.apply({series:this},
[f[j]]);var p;for(k=0;k<q;k++)if(p=j[o[k]],typeof p==="number")m[k].push(p);else if(p===null)m[k].hasNulls=!0}else if(j=l?b[n]:null,typeof j==="number")m[0].push(j);else if(j===null)m[0].hasNulls=!0}return[g,h]};ga.processData=function(){var a=this.chart,b=this.options.dataGrouping,c=this.allowDG!==!1&&b&&p(b.enabled,a.options._stock),d;this.forceCrop=c;this.groupPixelWidth=null;this.hasProcessed=!0;if(dc.apply(this,arguments)!==!1&&c){this.destroyGroupedData();var e=this.processedXData,f=this.processedYData,
g=a.plotSizeX,a=this.xAxis,h=a.options.ordinal,i=this.groupPixelWidth=a.getGroupPixelWidth&&a.getGroupPixelWidth();if(i){d=!0;this.points=null;var j=a.getExtremes(),c=j.min,j=j.max,h=h&&a.getGroupIntervalFactor(c,j,this)||1,g=i*(j-c)/g*h,i=a.getTimeTicks(a.normalizeTimeTickInterval(g,b.units||Zb),Math.min(c,e[0]),Math.max(j,e[e.length-1]),a.options.startOfWeek,e,this.closestPointRange),f=ga.groupData.apply(this,[e,f,i,b.approximation]),e=f[0],f=f[1];if(b.smoothed){b=e.length-1;for(e[b]=Math.min(e[b],
j);b--&&b>0;)e[b]+=g/2;e[0]=Math.max(e[0],c)}this.currentDataGrouping=i.info;this.closestPointRange=i.info.totalRange;if(t(e[0])&&e[0]<a.dataMin){if(a.min===a.dataMin)a.min=e[0];a.dataMin=e[0]}this.processedXData=e;this.processedYData=f}else this.currentDataGrouping=null;this.hasGroupedData=d}};ga.destroyGroupedData=function(){var a=this.groupedData;n(a||[],function(b,c){b&&(a[c]=b.destroy?b.destroy():null)});this.groupedData=null};ga.generatePoints=function(){ec.apply(this);this.destroyGroupedData();
this.groupedData=this.hasGroupedData?this.points:null};S(Mb.prototype,"tooltipFooterHeaderFormatter",function(a,b,c){var d=b.series,e=d.tooltipOptions,f=d.options.dataGrouping,g=e.xDateFormat,h,i=d.xAxis;return i&&i.options.type==="datetime"&&f&&ta(b.key)?(a=d.currentDataGrouping,f=f.dateTimeLabelFormats,a?(i=f[a.unitName],a.count===1?g=i[0]:(g=i[1],h=i[2])):!g&&f&&(g=this.getXDateFormat(b,e,i)),g=la(g,b.key),h&&(g+=la(h,b.key+a.totalRange-1)),Ka(e[(c?"footer":"header")+"Format"],{point:w(b,{key:g}),
series:d})):a.call(this,b,c)});ga.destroy=function(){for(var a=this.groupedData||[],b=a.length;b--;)a[b]&&a[b].destroy();fc.apply(this)};S(ga,"setOptions",function(a,b){var c=a.call(this,b),d=this.type,e=this.chart.options.plotOptions,f=V[d].dataGrouping;if(Yb[d])f||(f=C(gc,Yb[d])),c.dataGrouping=C(f,e.series&&e.series.dataGrouping,e[d].dataGrouping,b.dataGrouping);if(this.chart.options._stock)this.requireSorting=!0;return c});S(F.prototype,"setScale",function(a){a.call(this);n(this.series,function(a){a.hasProcessed=
!1})});F.prototype.getGroupPixelWidth=function(){var a=this.series,b=a.length,c,d=0,e=!1,f;for(c=b;c--;)(f=a[c].options.dataGrouping)&&(d=s(d,f.groupPixelWidth));for(c=b;c--;)if((f=a[c].options.dataGrouping)&&a[c].hasProcessed)if(b=(a[c].processedXData||a[c].data).length,a[c].groupPixelWidth||b>this.chart.plotSizeX/d||b&&f.forced)e=!0;return e?d:0};F.prototype.setDataGrouping=function(a,b){var c,b=p(b,!0);a||(a={forced:!1,units:null});if(this instanceof F)for(c=this.series.length;c--;)this.series[c].update({dataGrouping:a},
!1);else n(this.chart.options.series,function(b){b.dataGrouping=a},!1);b&&this.chart.redraw()};V.ohlc=C(V.column,{lineWidth:1,tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'},states:{hover:{lineWidth:3}},threshold:null});ba=ka(K.column,{type:"ohlc",pointArrayMap:["open","high","low","close"],toYData:function(a){return[a.open,a.high,a.low,a.close]},pointValKey:"high",
pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},upColorProp:"stroke",getAttribs:function(){K.column.prototype.getAttribs.apply(this,arguments);var a=this.options,b=a.states,a=a.upColor||this.color,c=C(this.pointAttr),d=this.upColorProp;c[""][d]=a;c.hover[d]=b.hover.upColor||a;c.select[d]=b.select.upColor||a;n(this.points,function(a){if(a.open<a.close&&!a.options.color)a.pointAttr=c})},translate:function(){var a=this.yAxis;K.column.prototype.translate.apply(this);n(this.points,function(b){if(b.open!==
null)b.plotOpen=a.translate(b.open,0,1,0,1);if(b.close!==null)b.plotClose=a.translate(b.close,0,1,0,1)})},drawPoints:function(){var a=this,b=a.chart,c,d,e,f,g,h,i,j;n(a.points,function(k){if(k.plotY!==u)i=k.graphic,c=k.pointAttr[k.selected?"selected":""]||a.pointAttr[""],f=c["stroke-width"]%2/2,j=y(k.plotX)-f,g=y(k.shapeArgs.width/2),h=["M",j,y(k.yBottom),"L",j,y(k.plotY)],k.open!==null&&(d=y(k.plotOpen)+f,h.push("M",j,d,"L",j-g,d)),k.close!==null&&(e=y(k.plotClose)+f,h.push("M",j,e,"L",j+g,e)),i?
i.attr(c).animate({d:h}):k.graphic=b.renderer.path(h).attr(c).add(a.group)})},animate:null});K.ohlc=ba;V.candlestick=C(V.column,{lineColor:"black",lineWidth:1,states:{hover:{lineWidth:2}},tooltip:V.ohlc.tooltip,threshold:null,upColor:"white"});ba=ka(ba,{type:"candlestick",pointAttrToOptions:{fill:"color",stroke:"lineColor","stroke-width":"lineWidth"},upColorProp:"fill",getAttribs:function(){K.ohlc.prototype.getAttribs.apply(this,arguments);var a=this.options,b=a.states,c=a.upLineColor||a.lineColor,
d=b.hover.upLineColor||c,e=b.select.upLineColor||c;n(this.points,function(a){if(a.open<a.close){if(a.lineColor)a.pointAttr=C(a.pointAttr),c=a.lineColor;a.pointAttr[""].stroke=c;a.pointAttr.hover.stroke=d;a.pointAttr.select.stroke=e}})},drawPoints:function(){var a=this,b=a.chart,c,d=a.pointAttr[""],e,f,g,h,i,j,k,l,m,o,q;n(a.points,function(n){m=n.graphic;if(n.plotY!==u)c=n.pointAttr[n.selected?"selected":""]||d,k=c["stroke-width"]%2/2,l=y(n.plotX)-k,e=n.plotOpen,f=n.plotClose,g=X.min(e,f),h=X.max(e,
f),q=y(n.shapeArgs.width/2),i=y(g)!==y(n.plotY),j=h!==n.yBottom,g=y(g)+k,h=y(h)+k,o=["M",l-q,h,"L",l-q,g,"L",l+q,g,"L",l+q,h,"Z","M",l,g,"L",l,i?y(n.plotY):g,"M",l,h,"L",l,j?y(n.yBottom):h],m?m.attr(c).animate({d:o}):n.graphic=b.renderer.path(o).attr(c).add(a.group).shadow(a.options.shadow)})}});K.candlestick=ba;var wb=xa.prototype.symbols;V.flags=C(V.column,{fillColor:"white",lineWidth:1,pointRange:0,shape:"flag",stackDistance:12,states:{hover:{lineColor:"black",fillColor:"#FCFFC5"}},style:{fontSize:"11px",
fontWeight:"bold",textAlign:"center"},tooltip:{pointFormat:"{point.text}<br/>"},threshold:null,y:-30});K.flags=ka(K.column,{type:"flags",sorted:!1,noSharedTooltip:!0,allowDG:!1,takeOrdinalPosition:!1,trackerGroups:["markerGroup"],forceCrop:!0,init:P.prototype.init,pointAttrToOptions:{fill:"fillColor",stroke:"color","stroke-width":"lineWidth",r:"radius"},translate:function(){K.column.prototype.translate.apply(this);var a=this.options,b=this.chart,c=this.points,d=c.length-1,e,f,g=a.onSeries;e=g&&b.get(g);
var a=a.onKey||"y",g=e&&e.options.step,h=e&&e.points,i=h&&h.length,j=this.xAxis,k=j.getExtremes(),l,m,o;if(e&&e.visible&&i){e=e.currentDataGrouping;m=h[i-1].x+(e?e.totalRange:0);c.sort(function(a,b){return a.x-b.x});for(a="plot"+a[0].toUpperCase()+a.substr(1);i--&&c[d];)if(e=c[d],l=h[i],l.x<=e.x&&l[a]!==void 0){if(e.x<=m)e.plotY=l[a],l.x<e.x&&!g&&(o=h[i+1])&&o[a]!==u&&(e.plotY+=(e.x-l.x)/(o.x-l.x)*(o[a]-l[a]));d--;i++;if(d<0)break}}n(c,function(a,d){var e;if(a.plotY===u)a.x>=k.min&&a.x<=k.max?a.plotY=
b.chartHeight-j.bottom-(j.opposite?j.height:0)+j.offset-b.plotTop:a.shapeArgs={};if((f=c[d-1])&&f.plotX===a.plotX){if(f.stackIndex===u)f.stackIndex=0;e=f.stackIndex+1}a.stackIndex=e})},drawPoints:function(){var a,b=this.pointAttr[""],c=this.points,d=this.chart.renderer,e,f,g=this.options,h=g.y,i,j,k,l,m,o;for(j=c.length;j--;)if(k=c[j],a=k.plotX>this.xAxis.len,e=k.plotX,e>0&&(e-=p(k.lineWidth,g.lineWidth)%2),l=k.stackIndex,i=k.options.shape||g.shape,f=k.plotY,f!==u&&(f=k.plotY+h-(l!==u&&l*g.stackDistance)),
m=l?u:k.plotX,o=l?u:k.plotY,l=k.graphic,f!==u&&e>=0&&!a)a=k.pointAttr[k.selected?"select":""]||b,l?l.attr({x:e,y:f,r:a.r,anchorX:m,anchorY:o}):k.graphic=d.label(k.options.title||g.title||"A",e,f,i,m,o,g.useHTML).css(C(g.style,k.style)).attr(a).attr({align:i==="flag"?"left":"center",width:g.width,height:g.height}).add(this.markerGroup).shadow(g.shadow),k.tooltipPos=[e,f];else if(l)k.graphic=l.destroy()},drawTracker:function(){var a=this.points;ob.drawTrackerPoint.apply(this);n(a,function(b){var c=
b.graphic;c&&D(c.element,"mouseover",function(){if(b.stackIndex>0&&!b.raised)b._y=c.y,c.attr({y:b._y-8}),b.raised=!0;n(a,function(a){if(a!==b&&a.raised&&a.graphic)a.graphic.attr({y:a._y}),a.raised=!1})})})},animate:pa,buildKDTree:pa,setClip:pa});wb.flag=function(a,b,c,d,e){return["M",e&&e.anchorX||a,e&&e.anchorY||b,"L",a,b+d,a,b,a+c,b,a+c,b+d,a,b+d,"Z"]};n(["circle","square"],function(a){wb[a+"pin"]=function(b,c,d,e,f){var g=f&&f.anchorX,f=f&&f.anchorY;a==="circle"&&e>d&&(b-=y((e-d)/2),d=e);b=wb[a](b,
c,d,e);g&&f&&b.push("M",g,c>f?c:c+e,"L",g,f);return b}});$a===z.VMLRenderer&&n(["flag","circlepin","squarepin"],function(a){nb.prototype.symbols[a]=wb[a]});var ba=[].concat(Zb),xb=function(a){var b=Ma(arguments,function(a){return typeof a==="number"});if(b.length)return Math[a].apply(0,b)};ba[4]=["day",[1,2,3,4]];ba[5]=["week",[1,2,3]];w(O,{navigator:{handles:{backgroundColor:"#ebe7e8",borderColor:"#b2b1b6"},height:40,margin:25,maskFill:"rgba(128,179,236,0.3)",maskInside:!0,outlineColor:"#b2b1b6",
outlineWidth:1,series:{type:K.areaspline===u?"line":"areaspline",color:"#4572A7",compare:null,fillOpacity:0.05,dataGrouping:{approximation:"average",enabled:!0,groupPixelWidth:2,smoothed:!0,units:ba},dataLabels:{enabled:!1,zIndex:2},id:"highcharts-navigator-series",lineColor:null,lineWidth:1,marker:{enabled:!1},pointRange:0,shadow:!1,threshold:null},xAxis:{tickWidth:0,lineWidth:0,gridLineColor:"#EEE",gridLineWidth:1,tickPixelInterval:200,labels:{align:"left",style:{color:"#888"},x:3,y:-4},crosshair:!1},
yAxis:{gridLineWidth:0,startOnTick:!1,endOnTick:!1,minPadding:0.1,maxPadding:0.1,labels:{enabled:!1},crosshair:!1,title:{text:null},tickWidth:0}},scrollbar:{height:lb?20:14,barBackgroundColor:"#bfc8d1",barBorderRadius:0,barBorderWidth:1,barBorderColor:"#bfc8d1",buttonArrowColor:"#666",buttonBackgroundColor:"#ebe7e8",buttonBorderColor:"#bbb",buttonBorderRadius:0,buttonBorderWidth:1,minWidth:6,rifleColor:"#666",trackBackgroundColor:"#eeeeee",trackBorderColor:"#eeeeee",trackBorderWidth:1,liveRedraw:ha&&
!lb}});Ib.prototype={drawHandle:function(a,b){var c=this.chart,d=c.renderer,e=this.elementsToDestroy,f=this.handles,g=this.navigatorOptions.handles,g={fill:g.backgroundColor,stroke:g.borderColor,"stroke-width":1},h;this.rendered||(f[b]=d.g("navigator-handle-"+["left","right"][b]).css({cursor:"ew-resize"}).attr({zIndex:10-b}).add(),h=d.rect(-4.5,0,9,16,0,1).attr(g).add(f[b]),e.push(h),h=d.path(["M",-1.5,4,"L",-1.5,12,"M",0.5,4,"L",0.5,12]).attr(g).add(f[b]),e.push(h));f[b][c.isResizing?"animate":"attr"]({translateX:this.scrollerLeft+
this.scrollbarHeight+parseInt(a,10),translateY:this.top+this.height/2-8})},drawScrollbarButton:function(a){var b=this.chart.renderer,c=this.elementsToDestroy,d=this.scrollbarButtons,e=this.scrollbarHeight,f=this.scrollbarOptions,g;this.rendered||(d[a]=b.g().add(this.scrollbarGroup),g=b.rect(-0.5,-0.5,e+1,e+1,f.buttonBorderRadius,f.buttonBorderWidth).attr({stroke:f.buttonBorderColor,"stroke-width":f.buttonBorderWidth,fill:f.buttonBackgroundColor}).add(d[a]),c.push(g),g=b.path(["M",e/2+(a?-1:1),e/2-
3,"L",e/2+(a?-1:1),e/2+3,e/2+(a?2:-2),e/2]).attr({fill:f.buttonArrowColor}).add(d[a]),c.push(g));a&&d[a].attr({translateX:this.scrollerWidth-e})},render:function(a,b,c,d){var e=this.chart,f=e.renderer,g,h,i,j,k=this.scrollbarGroup,l=this.navigatorGroup,m=this.scrollbar,l=this.xAxis,o=this.scrollbarTrack,n=this.scrollbarHeight,r=this.scrollbarEnabled,A=this.navigatorOptions,u=this.scrollbarOptions,v=u.minWidth,x=this.height,w=this.top,z=this.navigatorEnabled,C=A.outlineWidth,B=C/2,D=0,G=this.outlineHeight,
I=u.barBorderRadius,H=u.barBorderWidth,F=w+B,J;if(t(a)&&!(isNaN(a)||this.hasDragged&&!t(c))){this.navigatorLeft=g=p(l.left,e.plotLeft+n);this.navigatorWidth=h=p(l.len,e.plotWidth-2*n);this.scrollerLeft=i=g-n;this.scrollerWidth=j=j=h+2*n;l.getExtremes&&(J=this.getUnionExtremes(!0))&&(J.dataMin!==l.min||J.dataMax!==l.max)&&l.setExtremes(J.dataMin,J.dataMax,!0,!1);c=p(c,l.translate(a));d=p(d,l.translate(b));if(isNaN(c)||Q(c)===Infinity)c=0,d=j;if(!(l.translate(d,!0)-l.translate(c,!0)<e.xAxis[0].minRange)){this.zoomedMax=
E(s(c,d,0),h);this.zoomedMin=s(this.fixedWidth?this.zoomedMax-this.fixedWidth:E(c,d),0);this.range=this.zoomedMax-this.zoomedMin;c=y(this.zoomedMax);b=y(this.zoomedMin);a=c-b;if(!this.rendered){if(z)this.navigatorGroup=l=f.g("navigator").attr({zIndex:3}).add(),this.leftShade=f.rect().attr({fill:A.maskFill}).add(l),A.maskInside?this.leftShade.css({cursor:"ew-resize"}):this.rightShade=f.rect().attr({fill:A.maskFill}).add(l),this.outline=f.path().attr({"stroke-width":C,stroke:A.outlineColor}).add(l);
if(r)this.scrollbarGroup=k=f.g("scrollbar").add(),m=u.trackBorderWidth,this.scrollbarTrack=o=f.rect().attr({x:0,y:-m%2/2,fill:u.trackBackgroundColor,stroke:u.trackBorderColor,"stroke-width":m,r:u.trackBorderRadius||0,height:n}).add(k),this.scrollbar=m=f.rect().attr({y:-H%2/2,height:n,fill:u.barBackgroundColor,stroke:u.barBorderColor,"stroke-width":H,r:I}).add(k),this.scrollbarRifles=f.path().attr({stroke:u.rifleColor,"stroke-width":1}).add(k)}e=e.isResizing?"animate":"attr";if(z){this.leftShade[e](A.maskInside?
{x:g+b,y:w,width:c-b,height:x}:{x:g,y:w,width:b,height:x});if(this.rightShade)this.rightShade[e]({x:g+c,y:w,width:h-c,height:x});this.outline[e]({d:["M",i,F,"L",g+b-B,F,g+b-B,F+G,"L",g+c-B,F+G,"L",g+c-B,F,i+j,F].concat(A.maskInside?["M",g+b+B,F,"L",g+c-B,F]:[])});this.drawHandle(b+B,0);this.drawHandle(c+B,1)}if(r&&k)this.drawScrollbarButton(0),this.drawScrollbarButton(1),k[e]({translateX:i,translateY:y(F+x)}),o[e]({width:j}),g=n+b,h=a-H,h<v&&(D=(v-h)/2,h=v,g-=D),this.scrollbarPad=D,m[e]({x:U(g)+H%
2/2,width:h}),v=n+b+a/2-0.5,this.scrollbarRifles.attr({visibility:a>12?"visible":"hidden"})[e]({d:["M",v-3,n/4,"L",v-3,2*n/3,"M",v,n/4,"L",v,2*n/3,"M",v+3,n/4,"L",v+3,2*n/3]});this.scrollbarPad=D;this.rendered=!0}}},addEvents:function(){var a=this.chart.container,b=this.mouseDownHandler,c=this.mouseMoveHandler,d=this.mouseUpHandler,e;e=[[a,"mousedown",b],[a,"mousemove",c],[B,"mouseup",d]];eb&&e.push([a,"touchstart",b],[a,"touchmove",c],[B,"touchend",d]);n(e,function(a){D.apply(null,a)});this._events=
e},removeEvents:function(){n(this._events,function(a){R.apply(null,a)});this._events=u;this.navigatorEnabled&&this.baseSeries&&R(this.baseSeries,"updatedData",this.updatedDataHandler)},init:function(){var a=this,b=a.chart,c,d,e=a.scrollbarHeight,f=a.navigatorOptions,g=a.height,h=a.top,i,j=a.baseSeries;a.mouseDownHandler=function(d){var d=b.pointer.normalize(d),e=a.zoomedMin,f=a.zoomedMax,h=a.top,k=a.scrollbarHeight,j=a.scrollerLeft,l=a.scrollerWidth,n=a.navigatorLeft,p=a.navigatorWidth,t=a.scrollbarPad,
s=a.range,u=d.chartX,w=d.chartY,d=b.xAxis[0],y,z=lb?10:7;if(w>h&&w<h+g+k)if((h=!a.scrollbarEnabled||w<h+g)&&X.abs(u-e-n)<z)a.grabbedLeft=!0,a.otherHandlePos=f,a.fixedExtreme=d.max,b.fixedRange=null;else if(h&&X.abs(u-f-n)<z)a.grabbedRight=!0,a.otherHandlePos=e,a.fixedExtreme=d.min,b.fixedRange=null;else if(u>n+e-t&&u<n+f+t)a.grabbedCenter=u,a.fixedWidth=s,i=u-e;else if(u>j&&u<j+l){f=h?u-n-s/2:u<n?e-s*0.2:u>j+l-k?e+s*0.2:u<n+e?e-s:f;if(f<0)f=0;else if(f+s>=p)f=p-s,y=a.getUnionExtremes().dataMax;if(f!==
e)a.fixedWidth=s,e=c.toFixedRange(f,f+s,null,y),d.setExtremes(e.min,e.max,!0,!1,{trigger:"navigator"})}};a.mouseMoveHandler=function(c){var d=a.scrollbarHeight,e=a.navigatorLeft,f=a.navigatorWidth,g=a.scrollerLeft,h=a.scrollerWidth,k=a.range,j,l;if(!c.touches||c.touches[0].pageX!==0)c=b.pointer.normalize(c),j=c.chartX,j<e?j=e:j>g+h-d&&(j=g+h-d),a.grabbedLeft?(l=!0,a.render(0,0,j-e,a.otherHandlePos)):a.grabbedRight?(l=!0,a.render(0,0,a.otherHandlePos,j-e)):a.grabbedCenter&&(l=!0,j<i?j=i:j>f+i-k&&(j=
f+i-k),a.render(0,0,j-i,j-i+k)),l&&a.scrollbarOptions.liveRedraw&&setTimeout(function(){a.mouseUpHandler(c)},0),a.hasDragged=l};a.mouseUpHandler=function(d){var e,f;if(a.hasDragged){if(a.zoomedMin===a.otherHandlePos)e=a.fixedExtreme;else if(a.zoomedMax===a.otherHandlePos)f=a.fixedExtreme;if(a.zoomedMax===a.navigatorWidth)f=a.getUnionExtremes().dataMax;e=c.toFixedRange(a.zoomedMin,a.zoomedMax,e,f);t(e.min)&&b.xAxis[0].setExtremes(e.min,e.max,!0,!1,{trigger:"navigator",triggerOp:"navigator-drag",DOMEvent:d})}if(d.type!==
"mousemove")a.grabbedLeft=a.grabbedRight=a.grabbedCenter=a.fixedWidth=a.fixedExtreme=a.otherHandlePos=a.hasDragged=i=null};var k=b.xAxis.length,l=b.yAxis.length;b.extraBottomMargin=a.outlineHeight+f.margin;a.navigatorEnabled?(a.xAxis=c=new F(b,C({breaks:j&&j.xAxis.options.breaks,ordinal:j&&j.xAxis.options.ordinal},f.xAxis,{id:"navigator-x-axis",isX:!0,type:"datetime",index:k,height:g,offset:0,offsetLeft:e,offsetRight:-e,keepOrdinalPadding:!0,startOnTick:!1,endOnTick:!1,minPadding:0,maxPadding:0,zoomEnabled:!1})),
a.yAxis=d=new F(b,C(f.yAxis,{id:"navigator-y-axis",alignTicks:!1,height:g,offset:0,index:l,zoomEnabled:!1})),j||f.series.data?a.addBaseSeries():b.series.length===0&&S(b,"redraw",function(c,d){if(b.series.length>0&&!a.series)a.setBaseSeries(),b.redraw=c;c.call(b,d)})):a.xAxis=c={translate:function(a,c){var d=b.xAxis[0],f=d.getExtremes(),g=b.plotWidth-2*e,h=xb("min",d.options.min,f.dataMin),d=xb("max",d.options.max,f.dataMax)-h;return c?a*d/g+h:g*(a-h)/d},toFixedRange:F.prototype.toFixedRange};S(b,
"getMargins",function(b){var e=this.legend,f=e.options;b.apply(this,[].slice.call(arguments,1));a.top=h=a.navigatorOptions.top||this.chartHeight-a.height-a.scrollbarHeight-this.spacing[2]-(f.verticalAlign==="bottom"&&f.enabled&&!f.floating?e.legendHeight+p(f.margin,10):0);if(c&&d)c.options.top=d.options.top=h,c.setAxisSize(),d.setAxisSize()});a.addEvents()},getUnionExtremes:function(a){var b=this.chart.xAxis[0],c=this.xAxis,d=c.options,e=b.options,f;if(!a||b.dataMin!==null)f={dataMin:p(d&&d.min,xb("min",
e.min,b.dataMin,c.dataMin)),dataMax:p(d&&d.max,xb("max",e.max,b.dataMax,c.dataMax))};return f},setBaseSeries:function(a){var b=this.chart,a=a||b.options.navigator.baseSeries;this.series&&this.series.remove();this.baseSeries=b.series[a]||typeof a==="string"&&b.get(a)||b.series[0];this.xAxis&&this.addBaseSeries()},addBaseSeries:function(){var a=this.baseSeries,b=a?a.options:{},c=b.data,d=this.navigatorOptions.series,e;e=d.data;this.hasNavigatorData=!!e;b=C(b,d,{enableMouseTracking:!1,group:"nav",padXAxis:!1,
xAxis:"navigator-x-axis",yAxis:"navigator-y-axis",name:"Navigator",showInLegend:!1,stacking:!1,isInternal:!0,visible:!0});b.data=e||c.slice(0);this.series=this.chart.initSeries(b);if(a&&this.navigatorOptions.adaptToUpdatedData!==!1)D(a,"updatedData",this.updatedDataHandler),a.userOptions.events=w(a.userOptions.event,{updatedData:this.updatedDataHandler})},updatedDataHandler:function(){var a=this.chart.scroller,b=a.baseSeries,c=b.xAxis,d=c.getExtremes(),e=d.min,f=d.max,g=d.dataMin,d=d.dataMax,h=f-
e,i,j,k,l,m,n=a.series;i=n.xData;var q=!!c.setExtremes;j=f>=i[i.length-1]-(this.closestPointRange||0);i=e<=g;if(!a.hasNavigatorData)n.options.pointStart=b.xData[0],n.setData(b.options.data,!1),m=!0;i&&(l=g,k=l+h);j&&(k=d,i||(l=s(k-h,n.xData[0])));q&&(i||j)?isNaN(l)||c.setExtremes(l,k,!0,!1,{trigger:"updatedData"}):(m&&this.chart.redraw(!1),a.render(s(e,g),E(f,d)))},destroy:function(){this.removeEvents();n([this.xAxis,this.yAxis,this.leftShade,this.rightShade,this.outline,this.scrollbarTrack,this.scrollbarRifles,
this.scrollbarGroup,this.scrollbar],function(a){a&&a.destroy&&a.destroy()});this.xAxis=this.yAxis=this.leftShade=this.rightShade=this.outline=this.scrollbarTrack=this.scrollbarRifles=this.scrollbarGroup=this.scrollbar=null;n([this.scrollbarButtons,this.handles,this.elementsToDestroy],function(a){Qa(a)})}};z.Scroller=Ib;S(F.prototype,"zoom",function(a,b,c){var d=this.chart,e=d.options,f=e.chart.zoomType,g=e.navigator,e=e.rangeSelector,h;if(this.isXAxis&&(g&&g.enabled||e&&e.enabled))if(f==="x")d.resetZoomButton=
"blocked";else if(f==="y")h=!1;else if(f==="xy")d=this.previousZoom,t(b)?this.previousZoom=[this.min,this.max]:d&&(b=d[0],c=d[1],delete this.previousZoom);return h!==u?h:a.call(this,b,c)});S(Ca.prototype,"init",function(a,b,c){D(this,"beforeRender",function(){var a=this.options;if(a.navigator.enabled||a.scrollbar.enabled)this.scroller=new Ib(this)});a.call(this,b,c)});S(P.prototype,"addPoint",function(a,b,c,d,e){var f=this.options.turboThreshold;f&&this.xData.length>f&&fa(b)&&!Na(b)&&this.chart.scroller&&
ea(20,!0);a.call(this,b,c,d,e)});w(O,{rangeSelector:{buttonTheme:{width:28,height:18,fill:"#f7f7f7",padding:2,r:0,"stroke-width":0,style:{color:"#444",cursor:"pointer",fontWeight:"normal"},zIndex:7,states:{hover:{fill:"#e7e7e7"},select:{fill:"#e7f0f9",style:{color:"black",fontWeight:"bold"}}}},height:35,inputPosition:{align:"right"},labelStyle:{color:"#666"}}});O.lang=C(O.lang,{rangeSelectorZoom:"Zoom",rangeSelectorFrom:"From",rangeSelectorTo:"To"});Jb.prototype={clickButton:function(a,b){var c=this,
d=c.selected,e=c.chart,f=c.buttons,g=c.buttonOptions[a],h=e.xAxis[0],i=e.scroller&&e.scroller.getUnionExtremes()||h||{},j=i.dataMin,k=i.dataMax,l,m=h&&y(E(h.max,p(k,h.max))),o=g.type,q,i=g._range,r,t,w,v=g.dataGrouping;if(!(j===null||k===null||a===c.selected)){e.fixedRange=i;if(v)this.forcedDataGrouping=!0,F.prototype.setDataGrouping.call(h||{chart:this.chart},v,!1);if(o==="month"||o==="year")if(h){if(o={range:g,max:m,dataMin:j,dataMax:k},l=h.minFromRange.call(o),typeof o.newMax==="number")m=o.newMax}else i=
g;else if(i)l=s(m-i,j),m=E(l+i,k);else if(o==="ytd")if(h){if(k===u)j=Number.MAX_VALUE,k=Number.MIN_VALUE,n(e.series,function(a){a=a.xData;j=E(a[0],j);k=s(a[a.length-1],k)}),b=!1;m=new da(k);l=m.getFullYear();l=r=s(j||0,da.UTC(l,0,1));m=m.getTime();m=E(k||m,m)}else{D(e,"beforeRender",function(){c.clickButton(a)});return}else o==="all"&&h&&(l=j,m=k);f[d]&&f[d].setState(0);if(f[a])f[a].setState(2),c.lastSelected=a;h?(h.setExtremes(l,m,p(b,1),0,{trigger:"rangeSelectorButton",rangeSelectorButton:g}),c.setSelected(a)):
(q=e.options.xAxis[0],w=q.range,q.range=i,t=q.min,q.min=r,c.setSelected(a),D(e,"load",function(){q.range=w;q.min=t}))}},setSelected:function(a){this.selected=this.options.selected=a},defaultButtons:[{type:"month",count:1,text:"1m"},{type:"month",count:3,text:"3m"},{type:"month",count:6,text:"6m"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"1y"},{type:"all",text:"All"}],init:function(a){var b=this,c=a.options.rangeSelector,d=c.buttons||[].concat(b.defaultButtons),e=c.selected,f=b.blurInputs=
function(){var a=b.minInput,c=b.maxInput;a&&a.blur&&M(a,"blur");c&&c.blur&&M(c,"blur")};b.chart=a;b.options=c;b.buttons=[];a.extraTopMargin=c.height;b.buttonOptions=d;D(a.container,"mousedown",f);D(a,"resize",f);n(d,b.computeButtonRange);e!==u&&d[e]&&this.clickButton(e,!1);D(a,"load",function(){D(a.xAxis[0],"setExtremes",function(c){this.max-this.min!==a.fixedRange&&c.trigger!=="rangeSelectorButton"&&c.trigger!=="updatedData"&&b.forcedDataGrouping&&this.setDataGrouping(!1,!1)});D(a.xAxis[0],"afterSetExtremes",
function(){b.updateButtonStates(!0)})})},updateButtonStates:function(a){var b=this,c=this.chart,d=c.xAxis[0],e=c.scroller&&c.scroller.getUnionExtremes()||d,f=e.dataMin,g=e.dataMax,h=b.selected,i=b.options.allButtonsEnabled,j=b.buttons;a&&c.fixedRange!==y(d.max-d.min)&&(j[h]&&j[h].setState(0),b.setSelected(null));n(b.buttonOptions,function(a,e){var m=y(d.max-d.min),n=a._range,q=a.type,p=a.count||1,t=n>g-f,s=n<d.minRange,u=a.type==="all"&&d.max-d.min>=g-f&&j[e].state!==2,x=a.type==="ytd"&&la("%Y",f)===
la("%Y",g),w=c.renderer.forExport&&e===h,n=n===m,z=!d.hasVisibleSeries;if((q==="month"||q==="year")&&m>={month:28,year:365}[q]*864E5*p&&m<={month:31,year:366}[q]*864E5*p)n=!0;w||n&&e!==h&&e===b.lastSelected?(b.setSelected(e),j[e].setState(2)):!i&&(t||s||u||x||z)?j[e].setState(3):j[e].state===3&&j[e].setState(0)})},computeButtonRange:function(a){var b=a.type,c=a.count||1,d={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5};if(d[b])a._range=d[b]*c;else if(b==="month"||b==="year")a._range=
{month:30,year:365}[b]*864E5*c},setInputValue:function(a,b){var c=this.chart.options.rangeSelector;if(t(b))this[a+"Input"].HCTime=b;this[a+"Input"].value=la(c.inputEditDateFormat||"%Y-%m-%d",this[a+"Input"].HCTime);this[a+"DateBox"].attr({text:la(c.inputDateFormat||"%b %e, %Y",this[a+"Input"].HCTime)})},showInput:function(a){var b=this.inputGroup,c=this[a+"DateBox"];I(this[a+"Input"],{left:b.translateX+c.x+"px",top:b.translateY+"px",width:c.width-2+"px",height:c.height-2+"px",border:"2px solid silver"})},
hideInput:function(a){I(this[a+"Input"],{border:0,width:"1px",height:"1px"});this.setInputValue(a)},drawInput:function(a){var b=this,c=b.chart,d=c.renderer.style,e=c.renderer,f=c.options.rangeSelector,g=b.div,h=a==="min",i,j,k=this.inputGroup;this[a+"Label"]=j=e.label(O.lang[h?"rangeSelectorFrom":"rangeSelectorTo"],this.inputGroup.offset).attr({padding:2}).css(C(d,f.labelStyle)).add(k);k.offset+=j.width+5;this[a+"DateBox"]=e=e.label("",k.offset).attr({padding:2,width:f.inputBoxWidth||90,height:f.inputBoxHeight||
17,stroke:f.inputBoxBorderColor||"silver","stroke-width":1}).css(C({textAlign:"center",color:"#444"},d,f.inputStyle)).on("click",function(){b.showInput(a);b[a+"Input"].focus()}).add(k);k.offset+=e.width+(h?10:0);this[a+"Input"]=i=ca("input",{name:a,className:"highcharts-range-selector",type:"text"},w({position:"absolute",border:0,width:"1px",height:"1px",padding:0,textAlign:"center",fontSize:d.fontSize,fontFamily:d.fontFamily,left:"-9em",top:c.plotTop+"px"},f.inputStyle),g);i.onfocus=function(){b.showInput(a)};
i.onblur=function(){b.hideInput(a)};i.onchange=function(){var a=i.value,d=(f.inputDateParser||da.parse)(a),e=c.xAxis[0],g=e.dataMin,j=e.dataMax;isNaN(d)&&(d=a.split("-"),d=da.UTC(G(d[0]),G(d[1])-1,G(d[2])));isNaN(d)||(O.global.useUTC||(d+=(new da).getTimezoneOffset()*6E4),h?d>b.maxInput.HCTime?d=u:d<g&&(d=g):d<b.minInput.HCTime?d=u:d>j&&(d=j),d!==u&&c.xAxis[0].setExtremes(h?d:e.min,h?e.max:d,u,u,{trigger:"rangeSelectorInput"}))}},getPosition:function(){var a=this.chart,b=a.options.rangeSelector,a=
p((b.buttonPosition||{}).y,a.plotTop-a.axisOffset[0]-b.height);return{buttonTop:a,inputTop:a-10}},render:function(a,b){var c=this,d=c.chart,e=d.renderer,f=d.container,g=d.options,h=g.exporting&&g.navigation&&g.navigation.buttonOptions,i=g.rangeSelector,j=c.buttons,g=O.lang,k=c.div,k=c.inputGroup,l=i.buttonTheme,m=i.buttonPosition||{},o=i.inputEnabled,q=l&&l.states,r=d.plotLeft,s,u=this.getPosition(),v=c.group,x=c.rendered;if(!x&&(c.group=v=e.g("range-selector-buttons").add(),c.zoomText=e.text(g.rangeSelectorZoom,
p(m.x,r),15).css(i.labelStyle).add(v),s=p(m.x,r)+c.zoomText.getBBox().width+5,n(c.buttonOptions,function(a,b){j[b]=e.button(a.text,s,0,function(){c.clickButton(b);c.isActive=!0},l,q&&q.hover,q&&q.select,q&&q.disabled).css({textAlign:"center"}).add(v);s+=j[b].width+p(i.buttonSpacing,5);c.selected===b&&j[b].setState(2)}),c.updateButtonStates(),o!==!1))c.div=k=ca("div",null,{position:"relative",height:0,zIndex:1}),f.parentNode.insertBefore(k,f),c.inputGroup=k=e.g("input-group").add(),k.offset=0,c.drawInput("min"),
c.drawInput("max");v[x?"animate":"attr"]({translateY:u.buttonTop});o!==!1&&(k.align(w({y:u.inputTop,width:k.offset,x:h&&u.inputTop<(h.y||0)+h.height-d.spacing[0]?-40:0},i.inputPosition),!0,d.spacingBox),t(o)||(d=v.getBBox(),k[k.translateX<d.x+d.width+10?"hide":"show"]()),c.setInputValue("min",a),c.setInputValue("max",b));c.rendered=!0},destroy:function(){var a=this.minInput,b=this.maxInput,c=this.chart,d=this.blurInputs,e;R(c.container,"mousedown",d);R(c,"resize",d);Qa(this.buttons);if(a)a.onfocus=
a.onblur=a.onchange=null;if(b)b.onfocus=b.onblur=b.onchange=null;for(e in this)this[e]&&e!=="chart"&&(this[e].destroy?this[e].destroy():this[e].nodeType&&Xa(this[e])),this[e]=null}};F.prototype.toFixedRange=function(a,b,c,d){var e=this.chart&&this.chart.fixedRange,a=p(c,this.translate(a,!0)),b=p(d,this.translate(b,!0)),c=e&&(b-a)/e;c>0.7&&c<1.3&&(d?a=b-e:b=a+e);isNaN(a)&&(a=b=void 0);return{min:a,max:b}};F.prototype.minFromRange=function(){var a=this.range,b={month:"Month",year:"FullYear"}[a.type],
c,d=this.max,e,f,g=function(a,c){var d=new da(a);d["set"+b](d["get"+b]()+c);return d.getTime()-a};typeof a==="number"?(c=this.max-a,f=a):c=d+g(d,-a.count);e=p(this.dataMin,Number.MIN_VALUE);isNaN(c)&&(c=e);if(c<=e)c=e,f===void 0&&(f=g(c,a.count)),this.newMax=E(c+f,this.dataMax);isNaN(d)&&(c=void 0);return c};S(Ca.prototype,"init",function(a,b,c){D(this,"init",function(){if(this.options.rangeSelector.enabled)this.rangeSelector=new Jb(this)});a.call(this,b,c)});z.RangeSelector=Jb;Ca.prototype.callbacks.push(function(a){function b(){f=
a.xAxis[0].getExtremes();g.render(f.min,f.max)}function c(){f=a.xAxis[0].getExtremes();isNaN(f.min)||h.render(f.min,f.max)}function d(a){a.triggerOp!=="navigator-drag"&&g.render(a.min,a.max)}function e(a){h.render(a.min,a.max)}var f,g=a.scroller,h=a.rangeSelector;g&&(D(a.xAxis[0],"afterSetExtremes",d),S(a,"drawChartBox",function(a){var c=this.isDirtyBox;a.call(this);c&&b()}),b());h&&(D(a.xAxis[0],"afterSetExtremes",e),D(a,"resize",c),c());D(a,"destroy",function(){g&&R(a.xAxis[0],"afterSetExtremes",
d);h&&(R(a,"resize",c),R(a.xAxis[0],"afterSetExtremes",e))})});z.StockChart=z.stockChart=function(a,b,c){var d=Da(a)||a.nodeName,e=arguments[d?1:0],f=e.series,g,h=p(e.navigator&&e.navigator.enabled,!0)?{startOnTick:!1,endOnTick:!1}:null,i={marker:{enabled:!1,radius:2}},j={shadow:!1,borderWidth:0};e.xAxis=ra(ua(e.xAxis||{}),function(a){return C({minPadding:0,maxPadding:0,ordinal:!0,title:{text:null},labels:{overflow:"justify"},showLastLabel:!0},a,{type:"datetime",categories:null},h)});e.yAxis=ra(ua(e.yAxis||
{}),function(a){g=p(a.opposite,!0);return C({labels:{y:-2},opposite:g,showLastLabel:!1,title:{text:null}},a)});e.series=null;e=C({chart:{panning:!0,pinchType:"x"},navigator:{enabled:!0},scrollbar:{enabled:!0},rangeSelector:{enabled:!0},title:{text:null,style:{fontSize:"16px"}},tooltip:{shared:!0,crosshairs:!0},legend:{enabled:!1},plotOptions:{line:i,spline:i,area:i,areaspline:i,arearange:i,areasplinerange:i,column:j,columnrange:j,candlestick:j,ohlc:j}},e,{_stock:!0,chart:{inverted:!1}});e.series=
f;return d?new Ca(a,e,c):new Ca(e,b)};S(ab.prototype,"init",function(a,b,c){var d=c.chart.pinchType||"";a.call(this,b,c);this.pinchX=this.pinchHor=d.indexOf("x")!==-1;this.pinchY=this.pinchVert=d.indexOf("y")!==-1;this.hasZoom=this.hasZoom||this.pinchHor||this.pinchVert});S(F.prototype,"autoLabelAlign",function(a){var b=this.chart,c=this.options,b=b._labelPanes=b._labelPanes||{},d=this.options.labels;if(this.chart.options._stock&&this.coll==="yAxis"&&(c=c.top+","+c.height,!b[c]&&d.enabled)){if(d.x===
15)d.x=0;if(d.align===void 0)d.align="right";b[c]=1;return"right"}return a.call(this,[].slice.call(arguments,1))});S(F.prototype,"getPlotLinePath",function(a,b,c,d,e,f){var g=this,h=this.isLinked&&!this.series?this.linkedParent.series:this.series,i=g.chart,j=i.renderer,k=g.left,l=g.top,m,o,q,r,u=[],w=[],v,x;if(g.coll==="colorAxis")return a.apply(this,[].slice.call(arguments,1));w=g.isXAxis?t(g.options.yAxis)?[i.yAxis[g.options.yAxis]]:ra(h,function(a){return a.yAxis}):t(g.options.xAxis)?[i.xAxis[g.options.xAxis]]:
ra(h,function(a){return a.xAxis});n(g.isXAxis?i.yAxis:i.xAxis,function(a){if(t(a.options.id)?a.options.id.indexOf("navigator")===-1:1){var b=a.isXAxis?"yAxis":"xAxis",b=t(a.options[b])?i[b][a.options[b]]:i[b][0];g===b&&w.push(a)}});v=w.length?[]:[g.isXAxis?i.yAxis[0]:i.xAxis[0]];n(w,function(a){qa(a,v)===-1&&v.push(a)});x=p(f,g.translate(b,null,null,d));isNaN(x)||(g.horiz?n(v,function(a){var b;o=a.pos;r=o+a.len;m=q=y(x+g.transB);if(m<k||m>k+g.width)e?m=q=E(s(k,m),k+g.width):b=!0;b||u.push("M",m,o,
"L",q,r)}):n(v,function(a){var b;m=a.pos;q=m+a.len;o=r=y(l+g.height-x);if(o<l||o>l+g.height)e?o=r=E(s(l,o),g.top+g.height):b=!0;b||u.push("M",m,o,"L",q,r)}));return u.length>0?j.crispPolyLine(u,c||1):null});F.prototype.getPlotBandPath=function(a,b){var c=this.getPlotLinePath(b,null,null,!0),d=this.getPlotLinePath(a,null,null,!0),e=[],f;if(d&&c&&d.toString()!==c.toString())for(f=0;f<d.length;f+=6)e.push("M",d[f+1],d[f+2],"L",d[f+4],d[f+5],c[f+4],c[f+5],c[f+1],c[f+2]);else e=null;return e};xa.prototype.crispPolyLine=
function(a,b){var c;for(c=0;c<a.length;c+=6)a[c+1]===a[c+4]&&(a[c+1]=a[c+4]=y(a[c+1])-b%2/2),a[c+2]===a[c+5]&&(a[c+2]=a[c+5]=y(a[c+2])+b%2/2);return a};if($a===z.VMLRenderer)nb.prototype.crispPolyLine=xa.prototype.crispPolyLine;S(F.prototype,"hideCrosshair",function(a,b){a.call(this,b);if(this.crossLabel)this.crossLabel=this.crossLabel.hide()});S(F.prototype,"drawCrosshair",function(a,b,c){var d,e;a.call(this,b,c);if(t(this.crosshair.label)&&this.crosshair.label.enabled){var a=this.chart,f=this.options.crosshair.label,
g=this.horiz,h=this.opposite,i=this.left,j=this.top,k=this.crossLabel,l,m=f.format,n="",q=this.options.tickPosition==="inside",r=this.crosshair.snap!==!1;l=g?"center":h?this.labelAlign==="right"?"right":"left":this.labelAlign==="left"?"left":"center";if(!k)k=this.crossLabel=a.renderer.label(null,null,null,f.shape||"callout").attr({align:f.align||l,zIndex:12,fill:f.backgroundColor||this.series[0]&&this.series[0].color||"gray",padding:p(f.padding,8),stroke:f.borderColor||"","stroke-width":f.borderWidth||
0,r:p(f.borderRadius,3)}).css(w({color:"white",fontWeight:"normal",fontSize:"11px",textAlign:"center"},f.style)).add();g?(l=r?c.plotX+i:b.chartX,j+=h?0:this.height):(l=h?this.width+i:0,j=r?c.plotY+j:b.chartY);!m&&!f.formatter&&(this.isDatetimeAxis&&(n="%b %d, %Y"),m="{value"+(n?":"+n:"")+"}");b=r?c[this.isXAxis?"x":"y"]:this.toValue(g?b.chartX:b.chartY);k.attr({text:m?Ka(m,{value:b}):f.formatter.call(this,b),anchorX:g?l:this.opposite?0:a.chartWidth,anchorY:g?this.opposite?a.chartHeight:0:j,x:l,y:j,
visibility:"visible"});b=k.getBBox();if(g){if(q&&!h||!q&&h)j=k.y-b.height}else j=k.y-b.height/2;g?(d=i-b.x,e=i+this.width-b.x):(d=this.labelAlign==="left"?i:0,e=this.labelAlign==="right"?i+this.width:a.chartWidth);k.translateX<d&&(l+=d-k.translateX);k.translateX+b.width>=e&&(l-=k.translateX+b.width-e);k.attr({x:l,y:j,visibility:"visible"})}});var hc=ga.init,ic=ga.processData,jc=Ha.prototype.tooltipFormatter;ga.init=function(){hc.apply(this,arguments);this.setCompare(this.options.compare)};ga.setCompare=
function(a){this.modifyValue=a==="value"||a==="percent"?function(b,c){var d=this.compareValue;if(b!==u&&(b=a==="value"?b-d:b=100*(b/d)-100,c))c.change=b;return b}:null;if(this.chart.hasRendered)this.isDirty=!0};ga.processData=function(){var a,b=-1,c,d,e,f;ic.apply(this,arguments);if(this.xAxis&&this.processedYData){c=this.processedXData;d=this.processedYData;e=d.length;this.pointArrayMap&&(b=qa(this.pointValKey||"y",this.pointArrayMap));for(a=0;a<e;a++)if(f=b>-1?d[a][b]:d[a],typeof f==="number"&&
c[a]>=this.xAxis.min&&f!==0){this.compareValue=f;break}}};S(ga,"getExtremes",function(a){var b;a.apply(this,[].slice.call(arguments,1));if(this.modifyValue)b=[this.modifyValue(this.dataMin),this.modifyValue(this.dataMax)],this.dataMin=Pa(b),this.dataMax=Ea(b)});F.prototype.setCompare=function(a,b){this.isXAxis||(n(this.series,function(b){b.setCompare(a)}),p(b,!0)&&this.chart.redraw())};Ha.prototype.tooltipFormatter=function(a){a=a.replace("{point.change}",(this.change>0?"+":"")+z.numberFormat(this.change,
p(this.series.tooltipOptions.changeDecimals,2)));return jc.apply(this,[a])};S(P.prototype,"render",function(a){if(this.chart.options._stock&&this.xAxis)!this.clipBox&&this.animate?(this.clipBox=C(this.chart.clipBox),this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len):this.chart[this.sharedClipKey]&&(Ta(this.chart[this.sharedClipKey]),this.chart[this.sharedClipKey].attr({width:this.xAxis.len,height:this.yAxis.len}));a.call(this)});w(z,{Color:va,Point:Ha,Tick:db,Renderer:$a,SVGElement:Y,
SVGRenderer:xa,arrayMin:Pa,arrayMax:Ea,charts:$,dateFormat:la,error:ea,format:Ka,pathAnim:void 0,getOptions:function(){return O},hasBidiBug:$b,isTouchDevice:lb,setOptions:function(a){O=C(!0,O,a);Pb();return O},addEvent:D,removeEvent:R,createElement:ca,discardElement:Xa,css:I,each:n,map:ra,merge:C,splat:ua,stableSort:pb,extendClass:ka,pInt:G,svg:ha,canvas:oa,vml:!ha&&!oa,product:"Highstock",version:"4.2.2"});return z});
/*
 Highcharts JS v5.0.2 (2016-10-26)
 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2016 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/

(function(d){"object"===typeof module&&module.exports?module.exports=d:d(Highcharts)})(function(d){(function(c){function d(){return!!this.points.length}function g(){this.hasData()?this.hideNoData():this.showNoData()}var h=c.seriesTypes,e=c.Chart.prototype,f=c.getOptions(),k=c.extend,l=c.each;k(f.lang,{noData:"No data to display"});f.noData={position:{x:0,y:0,align:"center",verticalAlign:"middle"}};f.noData.style={fontWeight:"bold",fontSize:"12px",color:"#666666"};l(["pie","gauge","waterfall","bubble",
"treemap"],function(a){h[a]&&(h[a].prototype.hasData=d)});c.Series.prototype.hasData=function(){return this.visible&&void 0!==this.dataMax&&void 0!==this.dataMin};e.showNoData=function(a){var b=this.options;a=a||b.lang.noData;b=b.noData;this.noDataLabel||(this.noDataLabel=this.renderer.label(a,0,0,null,null,null,b.useHTML,null,"no-data"),this.noDataLabel.attr(b.attr).css(b.style),this.noDataLabel.add(),this.noDataLabel.align(k(this.noDataLabel.getBBox(),b.position),!1,"plotBox"))};e.hideNoData=function(){this.noDataLabel&&
(this.noDataLabel=this.noDataLabel.destroy())};e.hasData=function(){for(var a=this.series,b=a.length;b--;)if(a[b].hasData()&&!a[b].options.isInternal)return!0;return!1};e.callbacks.push(function(a){c.addEvent(a,"load",g);c.addEvent(a,"redraw",g)})})(d)});












