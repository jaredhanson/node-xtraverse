var $ = require('..');


describe('setters', function() {
  
  describe('attr', function() {
    it('should set value of existing attribute', function() {
      var el = $('<foo bar="baz">hello</foo>');
      
      expect(el.attr('bar', 'qux')).to.equal(el);
      expect(el.attr('bar')).to.equal('qux');
      expect(el.toString()).to.equal('<foo bar="qux">hello</foo>');
    });
    
    it('should set value of new attribute', function() {
      var el = $('<foo bar="baz">hello</foo>');
      
      expect(el.attr('qux', 'qoo')).to.equal(el);
      expect(el.attr('qux')).to.equal('qoo');
      expect(el.toString()).to.equal('<foo bar="baz" qux="qoo">hello</foo>');
    });
    
    it('should set multiple attributes', function() {
      var el = $('<foo bar="baz">hello</foo>');
      
      expect(el.attr({ bar: 'bux', a: '1', b: '2' })).to.equal(el);
      expect(el.attr('bar')).to.equal('bux');
      expect(el.attr('a')).to.equal('1');
      expect(el.attr('b')).to.equal('2');
      expect(el.toString()).to.equal('<foo bar="bux" a="1" b="2">hello</foo>');
    });
    
    it('should set value of all elements in set', function() {
      var el = $('<foo><bar>hello</bar><baz>world</baz></foo>').children();
      
      expect(el.attr('a', '1')).to.equal(el);
      expect(el.root().toString()).to.equal('<foo><bar a="1">hello</bar><baz a="1">world</baz></foo>');
    });
    
    it('should be noop on empty collection', function() {
      var el = $();
      
      expect(el.attr('bar', 'qux')).to.equal(el);
      expect(el.toString()).to.be.null;
    });
  });
  
  // FIXME: This is being skipped for now because it fails.  The failure
  //        appears to be an issue with the underlying `xmldom` module.
  describe('attrNS', function() {
    it.skip('should set value of existing attribute', function() {
      var el = $('<foo bar="baz" baz:bux="qux" xmlns="urn:example:foo" xmlns:baz="urn:example:baz">hello</foo>');
      
      expect(el.attrNS('bux', 'urn:example:baz', 'quux')).to.equal(el);
      expect(el.toString()).to.equal('<foo bar="baz" baz:bux="quux" xmlns="urn:example:foo" xmlns:baz="urn:example:baz">hello</foo>');
    });
    
    it.skip('should set value of new attribute', function() {
      var el = $('<foo bar="baz" baz:bux="qux" xmlns="urn:example:foo" xmlns:baz="urn:example:baz">hello</foo>');
      
      expect(el.attrNS('bax', 'urn:example:bix', 'box')).to.equal(el);
      expect(el.toString()).to.equal('<foo bar="baz" baz:bux="qux" xmlns="urn:example:foo" xmlns:baz="urn:example:baz">hello</foo>');
    });
  });
  
  describe('text', function() {
    it('should set value of existing text', function() {
      var el = $('<foo bar="baz">hello</foo>');
      
      expect(el.text('goodbye')).to.equal(el);
      expect(el.text()).to.equal('goodbye');
      expect(el.toString()).to.equal('<foo bar="baz">goodbye</foo>');
    });
    
    it('should set value of all elements in set', function() {
      var el = $('<foo><bar>hello</bar><baz>world</baz></foo>').children();
      
      expect(el.text('goodbye')).to.equal(el);
      expect(el.text()).to.equal('goodbye');
      expect(el.root().toString()).to.equal('<foo><bar>goodbye</bar><baz>goodbye</baz></foo>');
    });
    
    it('should be noop on empty collection', function() {
      var el = $();
      
      expect(el.text('goodbye')).to.equal(el);
      expect(el.toString()).to.be.null;
    });
  });
  
});
