var fs = require('fs')
  , $ = require('..');


describe('traversing', function() {
  
  describe('parent with 2 children and 3 grandchildren', function() {
    var xml = fs.readFileSync(__dirname + '/data/parent-2children-5grandchildren-ns.xml', 'utf8');
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
        var grandchildren = parent.children('grandchild', 'urn:example:human');
        expect(grandchildren).to.have.length(0);
      });
    });
    
    describe('total children', function() {
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
      
      it('should have five grandchildren', function() {
        expect(children.children('grandchild')).to.have.length(5);
      });
      
      it('should have three human grandchildren', function() {
        expect(children.children('grandchild', 'urn:example:human')).to.have.length(3);
      });
      
      it('should have two alien grandchildren', function() {
        expect(children.children('grandchild', 'urn:example:alien')).to.have.length(2);
      });
      
      it('should have two genders', function() {
        expect(children.children('gender')).to.have.length(2);
      });
      
      it('should have seven subelements', function() {
        expect(children.children()).to.have.length(7);
      });
      
      it('should return empty set for unmatched qualifier', function() {
        expect(children.children('foo')).to.have.length(0);
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
      
      it('should have two children', function() {
        expect(child.children('grandchild')).to.have.length(2);
      });
      
      it('should have one human child', function() {
        expect(child.children('grandchild', 'urn:example:human')).to.have.length(1);
      });
      
      it('should have one alien child', function() {
        expect(child.children('grandchild', 'urn:example:alien')).to.have.length(1);
      });
      
      it('should have three subelements', function() {
        expect(child.children()).to.have.length(3);
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
      
      it('should have three children', function() {
        expect(child.children('grandchild')).to.have.length(3);
      });
      
      it('should have two human children', function() {
        expect(child.children('grandchild', 'urn:example:human')).to.have.length(2);
      });
      
      it('should have one alein child', function() {
        expect(child.children('grandchild', 'urn:example:alien')).to.have.length(1);
      });
      
      it('should have four subelements', function() {
        expect(child.children()).to.have.length(4);
      });
    });
    
    describe('grand children', function() {
      var grandchildren = parent.children().children('grandchild');
    
      it('should be length of five', function() {
        expect(grandchildren).to.have.length(5);
      });
      
      it('should select parents of all grand children in set', function() {
        var parents = grandchildren.parent();
        expect(parents).to.have.length(2);
        expect(parents.first().attr('name')).to.equal('John');
        expect(parents.last().attr('name')).to.equal('Jane');
      });
      
      it('should select parents of all grand children in set when using name qualifier', function() {
        var parents = grandchildren.parent('child');
        expect(parents).to.have.length(2);
        expect(parents.first().attr('name')).to.equal('John');
        expect(parents.last().attr('name')).to.equal('Jane');
      });
      
      it('should filter parents of all grand children in set when using namespace qualifier', function() {
        var parents = grandchildren.parent('child', 'urn:example:human');
        expect(parents).to.have.length(1);
        expect(parents.first().attr('name')).to.equal('Jane');
      });
      
      it('should not find elements that are not direct parents', function() {
        var grandparent = grandchildren.parent('parent');
        expect(grandparent).to.have.length(0);
      });
      
      it('should return empty set for unmatched qualifier', function() {
        expect(grandchildren.parent('foo')).to.have.length(0);
      });
    });
  });
  
});
