var fs = require('fs')
  , $ = require('..');


describe('traversing', function() {
  
  describe('parent with 2 children and 3 grandchildren', function() {
    var xml = fs.readFileSync(__dirname + '/data/parent-2children-3grandchildren.xml', 'utf8');
    var parent = $(xml);
    
    describe('parent', function() {
      it('should not have a parent', function() {
        expect(parent.up()).to.have.length(0);
      });
    
      it('subscript should access underlying nodes', function() {
        expect(parent).to.have.length(1);
        expect(parent[0].localName).to.equal('parent');
        expect(parent[0].attributes[0].name).to.equal('name');
        expect(parent[0].attributes[0].value).to.equal('Bob');
        expect(parent[1]).to.be.undefined;
      });
      
      it('should not find elements that are not direct children', function() {
        var grandchildren = parent.children('grandchild');
        expect(grandchildren).to.have.length(0);
      });
    });
    
    describe('children', function() {
      var children = parent.children();
      
      it('should be length of two', function() {
        expect(children).to.have.length(2);
      });
      
      it('subscript should access underlying nodes', function() {
        expect(children).to.have.length(2);
        expect(children[0].localName).to.equal('child');
        expect(children[0].attributes[0].name).to.equal('name');
        expect(children[0].attributes[0].value).to.equal('John');
        expect(children[1].localName).to.equal('child');
        expect(children[1].attributes[0].name).to.equal('name');
        expect(children[1].attributes[0].value).to.equal('Jane');
        expect(children[2]).to.be.undefined;
      });
      
      it('should have single parent', function() {
        var parent = children.parent();
        expect(parent).to.have.length(1);
        expect(parent.attr('name')).to.equal('Bob');
      });
    });
    
    describe('first child', function() {
      var child = parent.children().first();
      
      it('should be named John', function() {
        expect(child.attr('name')).to.equal('John');
      });
      
      it('should be male', function() {
        expect(child.children('gender').text()).to.equal('male');
      });
      
      it('should have parent', function() {
        var parent = child.parent();
        expect(parent).to.have.length(1);
        expect(parent.attr('name')).to.equal('Bob');
      });
      
      describe('should have one child', function() {
        expect(child.children('grandchild')).to.have.length(1);
      });
      
      describe('should have two subelements', function() {
        expect(child.children()).to.have.length(2);
      });
    });
    
    describe('last child', function() {
      var child = parent.children().last();
      
      it('should be named Jane', function() {
        expect(child.attr('name')).to.equal('Jane');
      });
      
      it('should be female', function() {
        expect(child.children('gender').text()).to.equal('female');
      });
      
      it('should have parent', function() {
        var parent = child.parent();
        expect(parent).to.have.length(1);
        expect(parent.attr('name')).to.equal('Bob');
      });
      
      describe('should have two children', function() {
        expect(child.children('grandchild')).to.have.length(2);
      });
      
      describe('should have three subelements', function() {
        expect(child.children()).to.have.length(3);
      });
    });
  });
  
});
