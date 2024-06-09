const LinkedList = require('./LinkedList');
const Node = require('./LinkedList');

class HashMap {
  constructor (size) {
    this.theArray = new Array(size);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % 16;
    }
    hashCode = hashCode % 16;
    return hashCode;
  } 

  set(key, value){
    assertStringType(key);
    const hash = this.hash(key)
    if (this.theArray[hash] == undefined ){
      console.log('it was undefined')
    // Create a Linked List!
    const list = new LinkedList();
    // Add the key-value pair as a new Node
    list.prepend(key, value, null);
    // store the linked list in the Array
    this.theArray[hash] = list;
    console.log(this.theArray)
    // If the bucket is not empty, traverse the linked list?
    } else if (this.theArray[hash] != undefined){
      console.log('it was NOT undefined')
      
    }
    
  }
}

// Project Constraint
function checkIndex() {
  if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }
}

function assertStringType (key) {
  if (typeof(key) !== 'string'){
    throw new Error('Please try again with a String-type key')
  }
}

module.exports = HashMap