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
      
      it('should be identitcal to siblings', function() {
        var s = siblings.siblings();
        expect(siblings).to.have.length(5);
        expect(siblings[0].textContent).to.equal('1');
        expect(siblings[4].textContent).to.equal('5');
      });
      
      it('should wrap nodes when using at', function() {
        expect(siblings.at(1).text()).to.equal('2');
        expect(siblings.at(2).name()).to.equal('b');
        expect(siblings.at(5)).to.have.length(0);
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
      
      it('should iterate from last to first', function() {
        var vals = [];
        for (var sib = siblings.last(); sib.length > 0; sib = sib.prev()) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(5);
        expect(vals[0]).to.equal('5');
        expect(vals[1]).to.equal('4');
        expect(vals[2]).to.equal('3');
        expect(vals[3]).to.equal('2');
        expect(vals[4]).to.equal('1');
      });
      
      it('should iterate from last to all previous a elements', function() {
        var vals = [];
        for (var sib = siblings.last(); sib.length > 0; sib = sib.prev('a')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(4);
        expect(vals[0]).to.equal('5'); // first is unqualified, includes <b>
        expect(vals[1]).to.equal('4');
        expect(vals[2]).to.equal('2');
        expect(vals[3]).to.equal('1');
      });
      
      it('should iterate from last to all previous b elements', function() {
        var vals = [];
        for (var sib = siblings.last(); sib.length > 0; sib = sib.prev('b')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(2);
        expect(vals[0]).to.equal('5');
        expect(vals[1]).to.equal('3');
      });
      
      it('should iterate from last a to first a', function() {
        var vals = [];
        for (var sib = siblings.last('a'); sib.length > 0; sib = sib.prev('a')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(3);
        expect(vals[0]).to.equal('4');
        expect(vals[1]).to.equal('2');
        expect(vals[2]).to.equal('1');
      });
      
      it('should iterate from last b to first b', function() {
        var vals = [];
        for (var sib = siblings.last('b'); sib.length > 0; sib = sib.prev('b')) {
          vals.push(sib.text());
        }
        expect(vals).to.have.length(2);
        expect(vals[0]).to.equal('5');
        expect(vals[1]).to.equal('3');
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
    
    describe('siblings of', function() {
      var children = root.children();
      
      describe('first child', function() {
        var first = children.at(0);
        
        it('should get all siblings', function() {
          var siblings = first.siblings();
          
          expect(siblings).to.have.length(4);
          expect(siblings[0].textContent).to.equal('2');
          expect(siblings[1].textContent).to.equal('3');
          expect(siblings[2].textContent).to.equal('4');
          expect(siblings[3].textContent).to.equal('5');
        });
        
        it('should get qualified siblings with a name', function() {
          var siblings = first.siblings('a');
          
          expect(siblings).to.have.length(2);
          expect(siblings[0].textContent).to.equal('2');
          expect(siblings[1].textContent).to.equal('4');
        });
        
        it('should get qualified siblings with b name', function() {
          var siblings = first.siblings('b');
          
          expect(siblings).to.have.length(2);
          expect(siblings[0].textContent).to.equal('3');
          expect(siblings[1].textContent).to.equal('5');
        });
      });
      
      describe('third child', function() {
        var third = children.at(2);
        
        it('should get all siblings', function() {
          var siblings = third.siblings();
          
          expect(siblings).to.have.length(4);
          expect(siblings[0].textContent).to.equal('1');
          expect(siblings[1].textContent).to.equal('2');
          expect(siblings[2].textContent).to.equal('4');
          expect(siblings[3].textContent).to.equal('5');
        });
      });
      
      describe('fifth child', function() {
        var fifth = children.at(4);
        
        it('should get all siblings', function() {
          var siblings = fifth.siblings();
          
          expect(siblings).to.have.length(4);
          expect(siblings[0].textContent).to.equal('1');
          expect(siblings[1].textContent).to.equal('2');
          expect(siblings[2].textContent).to.equal('3');
          expect(siblings[3].textContent).to.equal('4');
        });
      });
    });
  });
  
});
