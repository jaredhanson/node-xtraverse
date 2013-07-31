var fs = require('fs')
  , XT = require('..');

var xml = fs.readFileSync(__dirname + '/feed.xml', 'utf8');
var feed = XT(xml);

console.log(feed.children('title').text());
for (var link = feed.children().first('link'); link.length > 0; link = link.next('link')) {
  console.log(link.attr('href'));
}
for (var entry = feed.children().first('entry'); entry.length > 0; entry = entry.next('entry')) {
  console.log('Entry: ' + entry.children('title').text());
}
