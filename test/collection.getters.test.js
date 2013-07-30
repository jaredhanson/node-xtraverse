var fs = require('fs')
  , $ = require('..');


describe('getters', function() {
  
  var el = $('<foo bar="baz">hello</foo>');
  
  describe('attr', function() {
    it('should get value of attribute', function() {
      expect(el.attr('bar')).to.equal('baz');
    });
    
    it('should get value of first element in set', function() {
      var el = $('<foo><bar a="one">baz</bar><qux a="two">qoo</qux></foo>').children();
      expect(el.attr('a')).to.equal('one');
    });
    
    it('should not get value of non-existent attribute', function() {
      expect(el.attr('bux')).to.be.null;
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
