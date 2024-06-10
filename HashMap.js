const LinkedList = require('./LinkedList');

class HashMap {
  constructor (capacity) {
    this.theArray = new Array(capacity);
    this.loadFactor = 0.8;
  }

  hash(key) {
    let hashCode = 0;
        
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % 16;
    }
    // console.log(`${key} hashed to ${hashCode}`)
    return hashCode;
  } 

  get(key) {
    let value = null;
    const hash = this.hash(key);
    if (this.theArray){
      const headNode = this.theArray[hash].head;
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
      return value;
    }
  }

  itHas (key) {
    let keyFound = false;
    if (this.theArray){
        const hash = this.hash(key);
        const headNode = this.theArray[hash].head;
        // Traverse time
        let temp = headNode;
        while (temp){ // like my print function - want to check the last value in list as well.
          // Check the key
          if (temp.key == key){
            keyFound = true;
          }
            temp = temp.nextNode
          }
      return keyFound;
    }
  }

  update (key, newValue) {
    if (this.theArray){
      const hash = this.hash(key)
      const headNode = this.theArray[hash].head;
      // Traverse time
      let temp = headNode;
      while (temp){ // like my print function - want to check the last value in list as well.
        // Check the key
        if (temp.key == key){
          temp.value = newValue;
        }
        temp = temp.nextNode
      }
    }
  }

  set(key, value){
    assertStringType(key);
    const hash = this.hash(key)
    checkIndex(hash, this.theArray);
    if (this.theArray[hash] == undefined ){
      // Create a Linked List!
      const list = new LinkedList();
      list.prepend(key, value, null); // creates a new node
      this.theArray[hash] = list; // store the linked list in the Array
      } else if (this.theArray[hash] != undefined){
        // Run the has(key) method to see if we want to overwrite an existing key's value
        if (this.itHas(key)){
          this.update(key, value);
        } else {
          // append
          this.theArray[hash].append(key, value)
        }
      }
      // checkLoad();
    }

    remove (key) {
      if (!this.itHas(key)) return false;
      const hash = this.hash(key);
      const headNode = this.theArray[hash].head
      // traverse and find
      let temp = headNode;
      let prev = null;
      while (temp){
        if (temp.key == key){
          if (prev){
            prev.nextNode = temp.nextNode; // point the old prev to new temp, dropping the target from chain.
            return true;
          } else if (!prev && temp.nextNode == null){
            temp.head = null;
          } else if (!prev || prev == null) {
            // you're looking at first node in the list
            temp = temp.nextNode;
            return true;
          }
        }
        prev = temp;
        temp = temp.nextNode;
      }
    }

}


// Project Constraint
function checkIndex(index, arr) {
  if (index < 0 || index >= arr.length) {
    throw new Error("Trying to access index out of bound");
  }
}

function assertStringType (key) {
  if (typeof(key) !== 'string'){
    throw new Error('Please try again with a String-type key')
  }
}

module.exports = HashMap