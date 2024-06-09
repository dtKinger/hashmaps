const HashMap = require('./HashMap')

const map = new HashMap(16);

map.set('Carlos', 'This is the old one')
map.set('Carlos', 'This is the new one')
map.set('Carlsg', 'This is made up to hash collide');
map.set('Daniel', 'Programmed this HashMap')