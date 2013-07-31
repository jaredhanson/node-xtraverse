var $ = require('..');


describe('Collection', function() {
  
  var doc = $('<foo bar="baz">hello</foo>');
  
  it('should alias each to forEach', function() {
    expect(doc.each).to.equal(doc.forEach);
  });
  
  it('should alias root to tree', function() {
    expect(doc.root).to.equal(doc.tree);
  });
  
  it('should alias up to parent', function() {
    expect(doc.up).to.equal(doc.parent);
  });
  
  it('should alias prev to previous', function() {
    expect(doc.prev).to.equal(doc.previous);
  });
  
  it('should alias ns to namespace', function() {
    expect(doc.ns).to.equal(doc.namespace);
  });
  
  it('should alias attr to attrs', function() {
    expect(doc.attr).to.equal(doc.attrs);
  });
  
  it('should alias t to text', function() {
    expect(doc.t).to.equal(doc.text);
  });
  
});
