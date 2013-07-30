var fs = require('fs')
  , $ = require('..');


describe('traversing', function() {
  
  describe('parent with 2 children and 3 grandchildren', function() {
    
    var xml = fs.readFileSync(__dirname + '/data/parent-2children-3grandchildren.xml', 'utf8');
    var root = $(xml);
    
    it('root should not have parent', function() {
      expect(root.up()).to.have.length(0);
    });
    
  });
  
});
