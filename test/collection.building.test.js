var $ = require('..');


describe('building', function() {
  
  describe('c', function() {
    
    it('should append element', function() {
      var el = $('<foo bar="baz"></foo>');
      el.c('bar');
      
      expect(el.toString()).to.equal('<foo bar="baz"><bar/></foo>');
    });
    
    it('should append element with attributes', function() {
      var el = $('<foo bar="baz"></foo>');
      el.c('bar', { 'a': '1', 'b': '2' });
      
      expect(el.toString()).to.equal('<foo bar="baz"><bar a="1" b="2"/></foo>');
    });
    
    it('should append element with attributes and text', function() {
      var el = $('<foo bar="baz"></foo>');
      el.c('bar', { 'a': '1', 'b': '2' }, 'garply');
      
      expect(el.toString()).to.equal('<foo bar="baz"><bar a="1" b="2">garply</bar></foo>');
    });
    
    it('should append element with attributes and namespace', function() {
      var el = $('<foo bar="baz"></foo>');
      el.c('bar', { 'a': '1', 'b': '2', xmlns: 'urn:foo:bar' });
      
      expect(el.toString()).to.equal('<foo bar="baz"><bar xmlns=\"urn:foo:bar\" a="1" b="2"/></foo>');
    });
    
    it('should append element with attributes and namespace that already exists', function() {
      var el = $('<foo bar="baz" xmlns=\"urn:foo:bar\"></foo>');
      el.c('bar', { 'a': '1', 'b': '2', xmlns: 'urn:foo:bar' });
      
      expect(el.toString()).to.equal('<foo bar="baz" xmlns=\"urn:foo:bar\"><bar xmlns=\"urn:foo:bar\" a="1" b="2"/></foo>');
    });
    
    it('should append element to all element in set', function() {
      var el = $('<foo bar="baz"><qux/><qux/></foo>').children();
      el.c('bar');
      
      expect(el.root().toString()).to.equal('<foo bar="baz"><qux><bar/></qux><qux><bar/></qux></foo>');
    });
    
    it('should append multiple elements beneath each other', function() {
      var el = $('<foo bar="baz"></foo>');
      el.c('bar').c('baz');
      
      expect(el.toString()).to.equal('<foo bar="baz"><bar><baz/></bar></foo>');
    });
  
  });
  
});
