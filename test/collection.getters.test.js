var $ = require('..');


describe('getters', function() {
  
  var el = $('<foo bar="baz">hello</foo>');
  var nsel = $('<foo bar="baz" xmlns="urn:example:foo">hello</foo>');
  
  describe('is', function() {
    it('should be true if name is equal', function() {
      expect(el.is('foo')).to.be.true;
    });
    
    it('should be false if name is not equal', function() {
      expect(el.is('foox')).to.be.false;
    });
    
    it('should be true if name is equal and no namespace specified', function() {
      expect(nsel.is('foo')).to.be.true;
    });
    
    it('should be true if name and namespace are equal', function() {
      expect(nsel.is('foo', 'urn:example:foo')).to.be.true;
    });
    
    it('should be false if name is equal and namespace is not equal', function() {
      expect(nsel.is('foo', 'urn:example:foox')).to.be.false;
    });
    
    it('should be false if no arguments passed', function() {
      expect(nsel.is()).to.be.false;
    });
  });
  
  describe('attr', function() {
    it('should get value of attribute', function() {
      expect(el.attr('bar')).to.equal('baz');
    });
    
    it('should get value of attribute of first element in set', function() {
      var el = $('<foo><bar a="one">baz</bar><qux a="two">qoo</qux></foo>').children();
      expect(el.attr('a')).to.equal('one');
    });
    
    it('should not get value of non-existent attribute', function() {
      expect(el.attr('bux')).to.be.null;
    });
  });
  
  describe('attrNS', function() {
    var el = $('<foo bar="baz" baz:bux="qux" xmlns="urn:example:foo" xmlns:baz="urn:example:baz">hello</foo>');
    
    it('should get value of attribute', function() {
      expect(el.attrNS('bar')).to.equal('baz');
    });
    
    it('should get value of attribute with namespace', function() {
      expect(el.attrNS('bux', 'urn:example:baz')).to.equal('qux');
    });
    
    it('should not get value of non-existent attribute with namespace', function() {
      expect(el.attrNS('bar', 'urn:example:foo')).to.be.null;
    });
  });
  
  describe('text', function() {
    it('should get value of element', function() {
      expect(el.text()).to.equal('hello');
    });
    
    it('should get text of first element in set', function() {
      var el = $('<foo><bar>baz</bar><qux>qoo</qux></foo>').children();
      expect(el.text()).to.equal('baz');
    });
    
    it('should not get value of empty element', function() {
      var el = $('<foo bar="baz"></foo>');
      expect(el.text()).to.be.null;
    });
  });
  
});
