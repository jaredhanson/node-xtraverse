var fs = require('fs')
  , DOMParser = require('@xmldom/xmldom').DOMParser
  , $ = require('..');


describe('wrap', function() {
  
  it('should wrap documents', function(done) {
    fs.readFile(__dirname + '/data/parent-2children-3grandchildren.xml', 'utf8', function(err, xml) {
      if (err) return done(err);
      var doc = new DOMParser().parseFromString(xml);
      var el = $(doc);
    
      expect(el).to.have.length(1);
      expect(el.name()).to.equal('parent');
      done();
    });
  });
  
  it('should wrap elements', function(done) {
    fs.readFile(__dirname + '/data/parent-2children-3grandchildren.xml', 'utf8', function(err, xml) {
      if (err) return done(err);
      var doc = new DOMParser().parseFromString(xml);
      var el = $(doc.documentElement.childNodes[1]);
    
      expect(el).to.have.length(1);
      expect(el.name()).to.equal('child');
      expect(el.attr('name')).to.equal('John');
      done();
    });
  });
  
  it('should wrap strings of XML', function(done) {
    fs.readFile(__dirname + '/data/parent-2children-3grandchildren.xml', 'utf8', function(err, xml) {
      if (err) return done(err);
      var el = $(xml);
    
      expect(el).to.have.length(1);
      expect(el.name()).to.equal('parent');
      done();
    });
  });
  
  it('should not rewrap wrapped nodes', function(done) {
    fs.readFile(__dirname + '/data/parent-2children-3grandchildren.xml', 'utf8', function(err, xml) {
      if (err) return done(err);
      var doc = new DOMParser().parseFromString(xml);
      var el = $(doc);
      var reel = $(el);
    
      expect(el).to.have.length(1);
      expect(el.name()).to.equal('parent');
      expect(reel).to.have.length(1);
      expect(reel.name()).to.equal('parent');
      expect(el).to.equal(reel);
      done();
    });
  });
  
  it('should wrap undefined argument', function() {
    var el = $();
    
    expect(el).to.have.length(0);
  });
  
});
