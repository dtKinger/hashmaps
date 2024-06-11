import { HashMap } from "./HashMap.js"
import { data } from "./data.js"

// Initialize map here
let hashmap = new HashMap(16);

// Load placeholder names once
// Do not maintain the database - store data in Hash Map or tempArray
data.forEach((person) => {
  hashmap.set(person.key, person.value)
})
console.log(`Default hash map loaded!`)
console.log(hashmap)


// TESTING //
// hashmap.set('California', 'Robert')
// hashmap.remove('California'); // Handle deletion when only 1 item in linked list

const addJimBtn = document.querySelector('.add-jim-btn')
const btnBackdrop = document.querySelector('.btn-backdrop')

addJimBtn.addEventListener('click', addJim)

function addJim () {
  hashmap.set('Jim', 'Halpert')
  morphJimBtn();
}

function morphJimBtn () {
  addJimBtn.removeEventListener('click', addJim);
  addJimBtn.textContent = 'Reload default'
  addJimBtn.addEventListener('click', () => {
    window.location = '/';
  })
  
}

setTimeout(() => {
  addJimBtn.style.opacity = 2;
  btnBackdrop.style.opacity = 2;
}, 3000)