const HashMap = require('./HashMap')
const data = require('./data')

// Initialize map here
let map = new HashMap(16);

// Load names data
data.forEach((person) => {
  map.set(person.key, person.value)
})

// TESTING //
// map.set('California', 'Robert')
// map.remove('California'); // Handle deletion when only 1 item in linked list

// tips over the load Factor forcing a rebalance.
map.set('Jim', 'Hash 14 - Load Balance Testing')

