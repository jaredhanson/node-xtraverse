var $ = require('..');


describe('mutating', function() {
  
  describe('empty', function() {
    it('should remove text element', function() {
      var el = $('<foo bar="baz">hello</foo>');
      
      expect(el.empty()).to.equal(el);
      expect(el.toString()).to.equal('<foo bar="baz"/>');
    });
    
    it('should remove all child elements', function() {
      var el = $('<foo><bar>hello</bar><baz>world</baz></foo>');
      
      expect(el.empty()).to.equal(el);
      expect(el.root().toString()).to.equal('<foo/>');
    });
    
    it('should remove child elements of all elements in set', function() {
      var el = $('<foo><bar>hello</bar><baz>world</baz></foo>').children();
      
      expect(el.empty()).to.equal(el);
      expect(el.root().toString()).to.equal('<foo><bar/><baz/></foo>');
    });
    
    it('should be noop on empty collection', function() {
      var el = $();
      
      expect(el.empty()).to.equal(el);
      expect(el.toString()).to.be.null;
    });
  });
  
});
