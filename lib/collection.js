/**
 * Module dependencies.
 */
var DOMParser = require('xmldom').DOMParser;


function Collection(nodes) {
  this.length = 0;
  if (nodes) {
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

Collection.prototype.first = function() {
  return wrap(this.length ? this[0] : []);
}

Collection.prototype.last = function() {
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
  return this._related('parentNode', name, ns);
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

Collection.prototype._related = function(rel, name, ns) {
  return wrap(this.map(function(n) {
    n = n[rel];
    while (n && n.nodeType !== 1 && (!name || name === n.localName) && (!ns || ns === n.namespaceURI)) {
      n = n[rel];
    }
    return n;
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


exports = module.exports = Collection;

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
