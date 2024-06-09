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

  get(key) {
    let value = null;
    if (this.theArray){
      this.theArray.forEach((bucket) => {
        const headNode = bucket.head;
        // Traverse time
        let temp = headNode;
        while (temp){ // like my print function - want to check the last value in list as well.
          // Check the key
          if (temp.key == key){
            value = temp.value
            return value; // a lot like itHas() but dif return value.
          }
            temp = temp.nextNode
          }
        })
      return value; // small dif here too
    }
  }

  itHas (key) {
    let keyFound = false;
    if (this.theArray){
      this.theArray.forEach((bucket) => {
        const headNode = bucket.head;
        // Traverse time
        let temp = headNode;
        while (temp){ // like my print function - want to check the last value in list as well.
          // Check the key
          if (temp.key == key){
            console.log('We Have a Match!')
            keyFound = true;
            return keyFound;
          }
            temp = temp.nextNode
          }
        })
      return keyFound;
    }
  }

  update (key, newValue) {
    
    if (this.theArray){
      this.theArray.forEach((bucket) => {
        const headNode = bucket.head;
        // Traverse time
        let temp = headNode;
        while (temp){ // like my print function - want to check the last value in list as well.
          // Check the key
          if (temp.key == key){
            temp.value = newValue;
            console.log(`value updated to ${newValue}`)
          }
            temp = temp.nextNode
          }
        })
      
    }
  }

  set(key, value){
    assertStringType(key);
    const hash = this.hash(key)
    if (this.theArray[hash] == undefined ){
      
    // Create a Linked List!
    const list = new LinkedList();
    list.prepend(key, value, null); // creates a new node
    this.theArray[hash] = list; // store the linked list in the Array
    } else if (this.theArray[hash] != undefined){
      console.log('We have a Collision')
    // Run the has(key) method to see if we want to overwrite an existing key's value
    if (this.itHas(key)){
    // Traverse again and update value?
      this.update(key, value);
      console.log(this.theArray[hash]);
    } else {
      // link a new node
    }
    }
    // Else, append this new key value pair to the tail of linked list
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