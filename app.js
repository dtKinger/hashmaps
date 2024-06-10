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
// map.set('Jim', 'Hash 14 - Load Balance Testing')
map.remove('California'); // Handle deletion when only 1 item in linked list



console.log(map.theArray[8])
map.checkLoad();