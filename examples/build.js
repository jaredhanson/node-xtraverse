var XT = require('..');


var feed = XT('<feed xmlns="http://www.w3.org/2005/Atom"/>')
  .c('title').t('Example Feed').up()
  .c('link', { href: 'http://example.org/'})
  .c('entry').c('title').t('Atom-Powered Robots Run Amok').up().up()
  .c('entry').c('title').t('Today I Ate Pancakes');
  
console.log(feed.root().toString());
