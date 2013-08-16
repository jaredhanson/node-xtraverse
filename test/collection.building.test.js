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
    
    it('should append element to all elements in set', function() {
      var el = $('<foo bar="baz"><qux/><qux/></foo>').children();
      el.c('bar');
      
      expect(el.root().toString()).to.equal('<foo bar="baz"><qux><bar/></qux><qux><bar/></qux></foo>');
    });
    
    it('should append element as children of previously appended element', function() {
      var el = $('<foo bar="baz"></foo>');
      el.c('bar').c('baz');
      
      expect(el.toString()).to.equal('<foo bar="baz"><bar><baz/></bar></foo>');
    });
    
    it('should append element as children of previously appended element and traverse up', function() {
      var el = $('<foo bar="baz"></foo>');
      el.c('bar').c('baz').up().c('qux');
      
      expect(el.toString()).to.equal('<foo bar="baz"><bar><baz/><qux/></bar></foo>');
    });
    
    it('should append element as children of previously appended element and traverse two levels up', function() {
      var el = $('<foo bar="baz"></foo>');
      el.c('bar').c('baz').up().up().c('qux').c('quux');
      
      expect(el.toString()).to.equal('<foo bar="baz"><bar><baz/></bar><qux><quux/></qux></foo>');
    });
    
    it('should append element and set its text content', function() {
      var el = $('<foo bar="baz"></foo>');
      el.c('bar').t('garply');
      
      expect(el.toString()).to.equal('<foo bar="baz"><bar>garply</bar></foo>');
    });
    
    it('should append element and set its text content and traverse up and append element', function() {
      var el = $('<foo bar="baz"></foo>');
      el.c('bar').t('garply').up()
        .c('bux');
      
      expect(el.toString()).to.equal('<foo bar="baz"><bar>garply</bar><bux/></foo>');
    });
    
    it('should append element and set its text content and traverse up and append element and set its text content', function() {
      var el = $('<foo bar="baz"></foo>');
      el.c('bar').t('warbly').up()
        .c('baz').t('gorply');
      
      expect(el.toString()).to.equal('<foo bar="baz"><bar>warbly</bar><baz>gorply</baz></foo>');
    });
    
    it('should append element and included text content without requiring up traversal', function() {
      var el = $('<foo bar="baz"></foo>');
      el.c('bar', 'warbly')
        .c('baz', 'gorply');
      
      expect(el.toString()).to.equal('<foo bar="baz"><bar>warbly</bar><baz>gorply</baz></foo>');
    });
    
    it('should append element with no attributes and included text content without requiring up traversal', function() {
      var el = $('<foo bar="baz"></foo>');
      el.c('bar', {}, 'warbly')
        .c('baz', {}, 'gorply');
      
      expect(el.toString()).to.equal('<foo bar="baz"><bar>warbly</bar><baz>gorply</baz></foo>');
    });
  
  });
  
});
