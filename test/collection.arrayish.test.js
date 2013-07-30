var $ = require('..');


describe('arrayish', function() {
  
  var doc = $('<foo><bar>hello</bar><baz>world</baz></foo>')
    , children = doc.children();
  
  describe('forEach', function() {
    it('should iterate over elements', function() {
      var nodes = []
        , indexes = []
        , contexts = []
        , scopes = [];
      
      var rv = children.forEach(function(n, i, c) {
        nodes.push(n);
        indexes.push(i);
        contexts.push(c);
        scopes.push(this);
      }, { x: 'scope' });
      
      expect(rv).to.equal(children);
      
      expect(nodes).to.have.length(2);
      expect(nodes[0].localName).to.equal('bar');
      expect(nodes[1].localName).to.equal('baz');
      
      expect(indexes).to.have.length(2);
      expect(indexes[0]).to.equal(0);
      expect(indexes[1]).to.equal(1);
      
      expect(contexts).to.have.length(2);
      expect(contexts[0]).to.equal(children);
      expect(contexts[1]).to.equal(children);
      
      expect(scopes).to.have.length(2);
      expect(scopes[0].x).to.equal('scope');
      expect(scopes[1].x).to.equal('scope');
    });
  });
  
  describe('every', function() {
    it('should iterate over elements until false is returned', function() {
      var nodes = []
        , indexes = []
        , contexts = []
        , scopes = [];
      
      var rv = children.every(function(n, i, c) {
        nodes.push(n);
        indexes.push(i);
        contexts.push(c);
        scopes.push(this);
        return n.localName === 'baz';
      }, { x: 'scope' });
      
      expect(rv).to.be.false;
      
      expect(nodes).to.have.length(1);
      expect(nodes[0].localName).to.equal('bar');
      
      expect(indexes).to.have.length(1);
      expect(indexes[0]).to.equal(0);
      
      expect(contexts).to.have.length(1);
      expect(contexts[0]).to.equal(children);
      
      expect(scopes).to.have.length(1);
      expect(scopes[0].x).to.equal('scope');
    });
    
    it('should iterate over all elements if true is returned', function() {
      var nodes = []
        , indexes = []
        , contexts = []
        , scopes = [];
      
      var rv = children.every(function(n, i, c) {
        nodes.push(n);
        indexes.push(i);
        contexts.push(c);
        scopes.push(this);
        return n.localName === 'bar' || n.localName === 'baz';
      }, { x: 'scope' });
      
      expect(rv).to.be.true;
      
      expect(nodes).to.have.length(2);
      expect(nodes[0].localName).to.equal('bar');
      expect(nodes[1].localName).to.equal('baz');
      
      expect(indexes).to.have.length(2);
      expect(indexes[0]).to.equal(0);
      expect(indexes[1]).to.equal(1);
      
      expect(contexts).to.have.length(2);
      expect(contexts[0]).to.equal(children);
      expect(contexts[1]).to.equal(children);
      
      expect(scopes).to.have.length(2);
      expect(scopes[0].x).to.equal('scope');
      expect(scopes[1].x).to.equal('scope');
    });
  });
  
  describe('some', function() {
    it('should iterate over elements until true is returned', function() {
      var nodes = []
        , indexes = []
        , contexts = []
        , scopes = [];
      
      var rv = children.some(function(n, i, c) {
        nodes.push(n);
        indexes.push(i);
        contexts.push(c);
        scopes.push(this);
        return n.localName === 'bar';
      }, { x: 'scope' });
      
      expect(rv).to.be.false;
      
      expect(nodes).to.have.length(1);
      expect(nodes[0].localName).to.equal('bar');
      
      expect(indexes).to.have.length(1);
      expect(indexes[0]).to.equal(0);
      
      expect(contexts).to.have.length(1);
      expect(contexts[0]).to.equal(children);
      
      expect(scopes).to.have.length(1);
      expect(scopes[0].x).to.equal('scope');
    });
    
    it('should iterate over all elements if false is returned', function() {
      var nodes = []
        , indexes = []
        , contexts = []
        , scopes = [];
      
      var rv = children.some(function(n, i, c) {
        nodes.push(n);
        indexes.push(i);
        contexts.push(c);
        scopes.push(this);
        return n.localName !== 'bar' && n.localName !== 'baz';
      }, { x: 'scope' });
      
      expect(rv).to.be.false;
      
      expect(nodes).to.have.length(2);
      expect(nodes[0].localName).to.equal('bar');
      expect(nodes[1].localName).to.equal('baz');
      
      expect(indexes).to.have.length(2);
      expect(indexes[0]).to.equal(0);
      expect(indexes[1]).to.equal(1);
      
      expect(contexts).to.have.length(2);
      expect(contexts[0]).to.equal(children);
      expect(contexts[1]).to.equal(children);
      
      expect(scopes).to.have.length(2);
      expect(scopes[0].x).to.equal('scope');
      expect(scopes[1].x).to.equal('scope');
    });
  });
  
  describe('map', function() {
    it('should iterate over elements', function() {
      var nodes = []
        , indexes = []
        , contexts = []
        , scopes = [];
      
      var rv = children.map(function(n, i, c) {
        nodes.push(n);
        indexes.push(i);
        contexts.push(c);
        scopes.push(this);
        return n.localName + 'Map';
      }, { x: 'scope' });
      
      expect(rv).to.have.length(2);
      expect(rv[0]).to.equal('barMap');
      expect(rv[1]).to.equal('bazMap');
      
      expect(nodes).to.have.length(2);
      expect(nodes[0].localName).to.equal('bar');
      expect(nodes[1].localName).to.equal('baz');
      
      expect(indexes).to.have.length(2);
      expect(indexes[0]).to.equal(0);
      expect(indexes[1]).to.equal(1);
      
      expect(contexts).to.have.length(2);
      expect(contexts[0]).to.equal(children);
      expect(contexts[1]).to.equal(children);
      
      expect(scopes).to.have.length(2);
      expect(scopes[0].x).to.equal('scope');
      expect(scopes[1].x).to.equal('scope');
    });
    
    it('should include null and undefined', function() {
      var nodes = []
        , indexes = []
        , contexts = []
        , scopes = [];
      
      var rv = children.map(function(n, i, c) {
        nodes.push(n);
        indexes.push(i);
        contexts.push(c);
        scopes.push(this);
        return i === 0 ? null : undefined;
      }, { x: 'scope' });
      
      expect(rv).to.have.length(2);
      expect(rv[0]).to.be.null;
      expect(rv[1]).to.be.undefined;
      
      expect(nodes).to.have.length(2);
      expect(nodes[0].localName).to.equal('bar');
      expect(nodes[1].localName).to.equal('baz');
      
      expect(indexes).to.have.length(2);
      expect(indexes[0]).to.equal(0);
      expect(indexes[1]).to.equal(1);
      
      expect(contexts).to.have.length(2);
      expect(contexts[0]).to.equal(children);
      expect(contexts[1]).to.equal(children);
      
      expect(scopes).to.have.length(2);
      expect(scopes[0].x).to.equal('scope');
      expect(scopes[1].x).to.equal('scope');
    });
    
    it('should not include null or undefined with filter set', function() {
      var nodes = []
        , indexes = []
        , contexts = []
        , scopes = [];
      
      var rv = children.map(function(n, i, c) {
        nodes.push(n);
        indexes.push(i);
        contexts.push(c);
        scopes.push(this);
        return i === 0 ? null : undefined;
      }, { x: 'scope' }, true);
      
      expect(rv).to.have.length(0);
      
      expect(nodes).to.have.length(2);
      expect(nodes[0].localName).to.equal('bar');
      expect(nodes[1].localName).to.equal('baz');
      
      expect(indexes).to.have.length(2);
      expect(indexes[0]).to.equal(0);
      expect(indexes[1]).to.equal(1);
      
      expect(contexts).to.have.length(2);
      expect(contexts[0]).to.equal(children);
      expect(contexts[1]).to.equal(children);
      
      expect(scopes).to.have.length(2);
      expect(scopes[0].x).to.equal('scope');
      expect(scopes[1].x).to.equal('scope');
    });
    
    it('should include false with filter set', function() {
      var nodes = []
        , indexes = []
        , contexts = []
        , scopes = [];
      
      var rv = children.map(function(n, i, c) {
        nodes.push(n);
        indexes.push(i);
        contexts.push(c);
        scopes.push(this);
        return i === 0 ? null : false;
      }, { x: 'scope' }, true);
      
      expect(rv).to.have.length(1);
      expect(rv[0]).to.be.false;
      
      expect(nodes).to.have.length(2);
      expect(nodes[0].localName).to.equal('bar');
      expect(nodes[1].localName).to.equal('baz');
      
      expect(indexes).to.have.length(2);
      expect(indexes[0]).to.equal(0);
      expect(indexes[1]).to.equal(1);
      
      expect(contexts).to.have.length(2);
      expect(contexts[0]).to.equal(children);
      expect(contexts[1]).to.equal(children);
      
      expect(scopes).to.have.length(2);
      expect(scopes[0].x).to.equal('scope');
      expect(scopes[1].x).to.equal('scope');
    });
  });
  
});
