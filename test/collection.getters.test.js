var fs = require('fs')
  , $ = require('..');


describe('getters', function() {
  
  var el = $('<foo bar="baz">hello</foo>');
  
  describe('attr', function() {
    it('should get value of attribute', function() {
      expect(el.attr('bar')).to.equal('baz');
    });
    
    it('should not get value of non-existent attribute', function() {
      expect(el.attr('bux')).to.be.null;
    });
  });
  
});
