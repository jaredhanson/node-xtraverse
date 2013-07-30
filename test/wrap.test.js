var fs = require('fs')
  , DOMParser = require('xmldom').DOMParser
  , $ = require('..');


describe('wrap', function() {
  
  it('should wrap documents', function() {
    var xml = fs.readFileSync(__dirname + '/data/parent-2children-3grandchildren.xml', 'utf8');
    var doc = new DOMParser().parseFromString(xml);
    var el = $(doc);
    
    expect(el).to.have.length(1);
    expect(el.name()).to.equal('parent');
  });
  
  it('should wrap elements', function() {
    var xml = fs.readFileSync(__dirname + '/data/parent-2children-3grandchildren.xml', 'utf8');
    var doc = new DOMParser().parseFromString(xml);
    var el = $(doc.documentElement.childNodes[1]);
    
    expect(el).to.have.length(1);
    expect(el.name()).to.equal('child');
    expect(el.attr('name')).to.equal('John');
  });
  
  it('should strings of XML', function() {
    var xml = fs.readFileSync(__dirname + '/data/parent-2children-3grandchildren.xml', 'utf8');
    var el = $(xml);
    
    expect(el).to.have.length(1);
    expect(el.name()).to.equal('parent');
  });
  
  it('should not rewrap wrapped nodes', function() {
    var xml = fs.readFileSync(__dirname + '/data/parent-2children-3grandchildren.xml', 'utf8');
    var doc = new DOMParser().parseFromString(xml);
    var el = $(doc);
    var reel = $(el);
    
    expect(el).to.have.length(1);
    expect(el.name()).to.equal('parent');
    expect(reel).to.have.length(1);
    expect(reel.name()).to.equal('parent');
    expect(el).to.equal(reel);
  });
  
});
