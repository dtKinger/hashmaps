const HashMap = require('./HashMap')
const data = require('./data')

const map = new HashMap(16);

// Load names data
data.forEach((person) => {
  map.set(person.key, person.value)
})

// TESTING //
// map.itHas('Carlos')
// map.remove('Daniel')
// map.remove('California'); // Handle deletion when only 1 item in linked list
// map.set('California', 'Robert')
// map.set('Jim', 'Hash 14 - Load Balance Testing')

console.log(map.theArray)
map.checkLoad();