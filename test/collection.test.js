var fs = require('fs')
  , $ = require('..');


describe('Collection', function() {
  
  var xml = fs.readFileSync(__dirname + '/data/parent-2children-3grandchildren.xml', 'utf8');
  var doc = $(xml);
  
  it('should alias each to forEach', function() {
    expect(doc.each).to.equal(doc.forEach);
  });
  
  it('should alias up to parent', function() {
    expect(doc.up).to.equal(doc.parent);
  });
  
  it('should alias prev to previous', function() {
    expect(doc.prev).to.equal(doc.previous);
  });
  
});
