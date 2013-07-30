var fs = require('fs')
  , $ = require('..');


describe('iterating', function() {
  
  describe('siblings', function() {
    var xml = fs.readFileSync(__dirname + '/data/siblings.xml', 'utf8');
    var root = $(xml);
    
    describe('all siblings', function() {
      var siblings = root.children();
      
      it('should have total of five', function() {
        expect(siblings).to.have.length(5);
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
      
      it('should iterate from first to all next a elements', function() {
        var vals = [];
        for (var sib = siblings.first(); sib.length > 0; sib = sib.next('a')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(3);
        expect(vals[0]).to.equal('1');
        expect(vals[1]).to.equal('2');
        expect(vals[2]).to.equal('4');
      });
      
      it('should iterate from first to all next b elements', function() {
        var vals = [];
        for (var sib = siblings.first(); sib.length > 0; sib = sib.next('b')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(3);
        expect(vals[0]).to.equal('1'); // first is unqualified, includes <a>
        expect(vals[1]).to.equal('3');
        expect(vals[2]).to.equal('5');
      });
      
      it('should iterate from first a to last a', function() {
        var vals = [];
        for (var sib = siblings.first('a'); sib.length > 0; sib = sib.next('a')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(3);
        expect(vals[0]).to.equal('1');
        expect(vals[1]).to.equal('2');
        expect(vals[2]).to.equal('4');
      });
      
      it('should iterate from first b to last b', function() {
        var vals = [];
        for (var sib = siblings.first('b'); sib.length > 0; sib = sib.next('b')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(2);
        expect(vals[0]).to.equal('3');
        expect(vals[1]).to.equal('5');
      });
    });
    
    describe('only a siblings', function() {
      var siblings = root.children('a');
      
      it('should have total of three', function() {
        expect(siblings).to.have.length(3);
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
      
      it('should iterate from first to all next a elements', function() {
        var vals = [];
        for (var sib = siblings.first(); sib.length > 0; sib = sib.next('a')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(3);
        expect(vals[0]).to.equal('1');
        expect(vals[1]).to.equal('2');
        expect(vals[2]).to.equal('4');
      });
      
      it('should iterate from first to all next b elements', function() {
        var vals = [];
        for (var sib = siblings.first(); sib.length > 0; sib = sib.next('b')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(3);
        expect(vals[0]).to.equal('1'); // first is unqualified, includes <a>
        expect(vals[1]).to.equal('3');
        expect(vals[2]).to.equal('5');
      });
    });
    
    describe('only b siblings', function() {
      var siblings = root.children('b');
      
      it('should have total of two', function() {
        expect(siblings).to.have.length(2);
      });
      
      it('should iterate from first to last', function() {
        var vals = [];
        for (var sib = siblings.first(); sib.length > 0; sib = sib.next()) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(3);
        expect(vals[0]).to.equal('3');
        expect(vals[1]).to.equal('4');
        expect(vals[2]).to.equal('5');
      });
      
      it('should iterate from first to all next a elements', function() {
        var vals = [];
        for (var sib = siblings.first(); sib.length > 0; sib = sib.next('a')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(2);
        expect(vals[0]).to.equal('3'); // first is unqualified, includes <b>
        expect(vals[1]).to.equal('4');
      });
      
      it('should iterate from first to all next b elements', function() {
        var vals = [];
        for (var sib = siblings.first(); sib.length > 0; sib = sib.next('b')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(2);
        expect(vals[0]).to.equal('3');
        expect(vals[1]).to.equal('5');
      });
    });
  });
  
});
