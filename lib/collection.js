/**
 * Module dependencies.
 */
var DOMParser = require('xmldom').DOMParser;


/**
 * Creates an instance of `Collection`.
 *
 * @constructor
 * @param {Array} nodes DOM elements to wrap.
 * @api protected
 */
function Collection(nodes) {
  this.length = 0;
  if (nodes) {
    nodes = unique(nodes);
    this.length = nodes.length;
    // add each node to an index-based property on collection, in order to
    // appear "array"-like
    for (var i = 0, len = nodes.length; i < len; i++) {
      this[i] = nodes[i];
    }
  }
}

Collection.prototype.each =
Collection.prototype.forEach = function(fn, scope) {
  for (var i = 0, len = this.length; i < len; i++) {
    fn.call(scope, this[i], i, this);
  }
  return this;
}

Collection.prototype.every = function(fn, scope) {
  var rv;
  for (var i = 0, len = this.length; i < len; i++) {
    rv = fn.call(scope, this[i], i, this);
    if (!rv) return false;
  }
  return true;
}

Collection.prototype.some = function(fn, scope) {
  var rv;
  for (var i = 0, len = this.length; i < len; i++) {
    rv = fn.call(scope, this[i], i, this);
    if (rv) return false;
  }
  return false;
}

Collection.prototype.map = function(fn, scope) {
  var m = [], n;
  for (var i = 0, len = this.length; i < len; i++) {
    n = fn.call(scope, this[i], i, this);
    if (!(n === null || n === undefined)) m.push(n);
  }
  return m;
}

/**
 * Reduce the set of matched elements to the first in the set, optionally
 * filtered by a name and namespace.
 *
 * Examples:
 *
 *     var children = el.children();
 *
 *     for (var child = children.first(); child.length > 0; child = child.next()) {
 *       // process all child elements
 *     }
 *
 *     for (var child = children.first('foo'); child.length > 0; child = child.next('foo')) {
 *       // process <foo/> child elements
 *     }
 *
 * @return {Collection} The wrapped first element.
 * @api public
 */
Collection.prototype.first = function(name, ns) {
  var n;
  for (var i = 0, len = this.length; i < len; ++i) {
    n = this[i];
    if ((!name || name === n.localName) && (!ns || ns === n.namespaceURI)) { return wrap(n); }
  }
  return wrap([]);
}

/**
 * Reduce the set of matched elements to the final one in the set.
 *
 * @return {Collection} The wrapped last element.
 * @api public
 */
Collection.prototype.last = function(name, ns) {
  return wrap(this.length ? this[this.length - 1] : []);
}

Collection.prototype.next = function(name, ns) {
  return this._related('nextSibling', name, ns);
}

Collection.prototype.prev =
Collection.prototype.previous = function(name, ns) {
  return this._related('previousSibling', name, ns);
}

Collection.prototype.up =
Collection.prototype.parent = function(name, ns) {
  return this._related('parentNode', name, ns, 1);
}

Collection.prototype.children = function(name, ns) {
  var arr = [];
  this.forEach(function(n) {
    for (var c = n.firstChild; c; c = c.nextSibling) {
      if (c.nodeType === 1 && (!name || name === c.localName) && (!ns || ns === c.namespaceURI)) {
        arr.push(c);
      }
    }
  });
  return wrap(arr);
}

// FIXME: Skip back to first sibling, and iterate from there.
Collection.prototype.siblings = function(name, ns) {
  var arr = [];
  this.forEach(function(n) {
    for ( ; n; n = n.nextSibling) {
      if (n.nodeType === 1 && (!name || name === n.localName) && (!ns || ns === n.namespaceURI)) {
        arr.push(n);
      }
    }
  });
  return wrap(arr);
}

Collection.prototype._related = function(rel, name, ns, limit) {
  limit = (limit !== undefined ? limit : Number.MAX_VALUE);
  return wrap(this.map(function(n) {
    var i = 0;
    n = n[rel];
    while (n && (n.nodeType !== 1 || (name && name !== n.localName) || (ns && ns !== n.namespaceURI)) && ++i < limit) {
      n = n[rel];
    }
    return (i < limit ? n : undefined);
  }));
}

Collection.prototype.name = function() {
  return (this[0] ? this[0].localName : null);
}

Collection.prototype.ns = function() {
  return (this[0] ? this[0].namespaceURI : null);
}

Collection.prototype.attr = function(name) {
  return (this[0] ? this[0].getAttribute(name) : null);
}

Collection.prototype.attrNS = function(name, ns) {
  return (this[0] ? this[0].getAttributeNS(ns, name) : null);
}

Collection.prototype.text = function() {
  return (this[0] ? this[0].textContent : null);
}


/**
 * Expose `Collection`.
 */
exports = module.exports = Collection;

/**
 * Export functions.
 */
exports.wrap = wrap;

function wrap(nodes) {
  if ('string' == typeof nodes) {
    nodes = new DOMParser().parseFromString(nodes);
  }
  
  if (nodes.attrNS && nodes._related) {
    // attempt to re-wrap Collection, return it directly
    return nodes;
  } else if (nodes.documentElement) {
    nodes = [ nodes.documentElement ];
  } else if (nodes.nodeType) {
    nodes = [ nodes ];
  }
  return new Collection(nodes);
}

function unique(ar) {
  var a = []
    , i = -1
    , j
    , has;
  while (++i < ar.length) {
    j = -1;
    has = false;
    while (++j < a.length) {
      if (a[j] === ar[i]) {
        has = true;
        break;
      }
    }
    if (!has) { a.push(ar[i]); }
  }
  return a;
}
