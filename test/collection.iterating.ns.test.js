var fs = require('fs')
  , $ = require('..');


describe('iterating', function() {
  
  describe('siblings', function() {
    var xml = fs.readFileSync(__dirname + '/data/siblings-ns.xml', 'utf8');
    var root = $(xml);
    
    describe('only a siblings in one namespace', function() {
      var siblings = root.children('a', 'urn:example:one');
      
      it('should have total of two', function() {
        expect(siblings).to.have.length(2);
      });
      
      it('should iterate from first to last', function() {
        var vals = [];
        for (var sib = siblings.first(); sib.length > 0; sib = sib.next()) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(5);
        expect(vals[0]).to.equal('1');
        expect(vals[1]).to.equal('2');
        expect(vals[2]).to.equal('3');
        expect(vals[3]).to.equal('4');
        expect(vals[4]).to.equal('5');
      });
      
      it('should iterate from first to all next one:a elements', function() {
        var vals = [];
        for (var sib = siblings.first('a', 'urn:example:one'); sib.length > 0; sib = sib.next('a', 'urn:example:one')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(2);
        expect(vals[0]).to.equal('1');
        expect(vals[1]).to.equal('4');
      });
      
      it('should iterate from last to all previous one:a elements', function() {
        var vals = [];
        for (var sib = siblings.last('a', 'urn:example:one'); sib.length > 0; sib = sib.prev('a', 'urn:example:one')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(2);
        expect(vals[0]).to.equal('4');
        expect(vals[1]).to.equal('1');
      });
      
      it('should iterate from last to all previous two:b elements', function() {
        var vals = [];
        for (var sib = siblings.last('a', 'urn:example:one'); sib.length > 0; sib = sib.prev('b', 'urn:example:two')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(2);
        expect(vals[0]).to.equal('4'); // first is unqualified, includes <a>
        expect(vals[1]).to.equal('3');
      });
    });
  });
  
});
