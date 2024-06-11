import { HashMap } from "./HashMap.js"
import { data } from "./data.js"

// Initialize map here
let map = new HashMap(16);

// Load placeholder names once
data.forEach((person) => {
  map.set(person.key, person.value)
})
// Do not maintain the database - let Hashmap be the memory.

// TESTING //
// map.set('California', 'Robert')
// map.remove('California'); // Handle deletion when only 1 item in linked list



const addJimBtn = document.querySelector('.add-jim-btn')

addJimBtn.addEventListener('click', () => {
  addJim();
})

function addJim () {
  map.set('Jim', 'Hash 14 - Causing a load rebalance')

}