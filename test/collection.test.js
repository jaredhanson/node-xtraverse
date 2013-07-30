var fs = require('fs')
  , $ = require('..');


describe('Collection', function() {
  
  var xml = fs.readFileSync(__dirname + '/data/parent-2children-3grandchildren.xml', 'utf8');
  var doc = $(xml);
  
  it('root alias up to parent', function() {
    expect(doc.up).to.equal(doc.parent);
  });
  
  it('root alias prev to previous', function() {
    expect(doc.prev).to.equal(doc.previous);
  });
  
});
