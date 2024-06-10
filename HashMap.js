const LinkedList = require('./LinkedList');
const data = require('./data')

class HashMap {
  constructor (capacity) {
    this.capacity = capacity
    this.theArray = new Array(capacity);
    this.loadFactor = 0.8;
  }

  hash(key) {
    let hashCode = 0;
        
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity; // don't fix at 16
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

  //
  // Need to make this handle single node linked lists case
  //
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
          // if you're not at the start of the list, simple re-point
            prev.nextNode = temp.nextNode; // point the old prev to new temp, dropping the target from chain.
            return true;
          } else if (!prev && !temp.nextNode){
            // The single-entry delete case:
            // this.theArray[hash].head = null;
            // However, it would be better to clean out the bucket, so the load is not affected,
            // and also so that creating a new LinkedList next time is clean
            this.cleanBucket(hash);
            return true;
          } else if (!prev) {
            // you're looking at first node in the list
            temp = temp.nextNode;
            return true;
          }
        }
        prev = temp;
        temp = temp.nextNode;
      }
    }

  checkLoad (arr) {
    arr = this.theArray;
    let load = 0;
    arr.forEach((bucket) => {
      if (bucket !== undefined){
        load += 1
      } else {
        // do nothing
      }
    })
    if (load / this.capacity > this.loadFactor){
      this.balanceLoad();
    } else {
      // do nothing
      console.log(`PC Load level is ${load}`)
    }
    
    return load;
  }

  balanceLoad () {
    console.log('Reblancing...')
  }

  repopulateHashMap () {
    data.forEach((person) => {
      map.set(person.key, person.value)
    })
  }

  cleanBucket (hash) {
    this.theArray[hash] = undefined;
  }

}


// Project Constraints
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