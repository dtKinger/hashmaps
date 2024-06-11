import { LinkedList } from "./LinkedList.js"

export class HashMap {
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
      // Time to traverse the linked list
      let temp = headNode;
      while (temp){
        // Check the key
        if (temp.key == key){
          temp.value = newValue;
        }
        temp = temp.nextNode
      }
    }
  }

  set(key, value){
    assertStringType(key); // Project constraint
    const hash = this.hash(key)
    checkIndex(hash, this.theArray); // Project constraint - JS too forgiving.
    if (this.theArray[hash] == undefined ){
      // Create a Linked List!
      const list = new LinkedList();
      list.prepend(key, value, null); // creates a new Node
      this.theArray[hash] = list;
      } else if (this.theArray[hash] != undefined){
        // Run the itHas(key) method to see if we want to overwrite an existing key's value
        if (this.itHas(key)){
          this.update(key, value);
        } else {
          // append
          this.theArray[hash].append(key, value)
        }
      }
      this.onChange(key, value)
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
      this.onChange(key);
    }

  clear (arr) {
    arr.length = 0;
  }

  checkLoad (key, value) {
    let arr = this.theArray;
    let loadInt = 0;
    let loadLevel = 0;
    arr.forEach((bucket) => {
      if (bucket !== undefined){
        loadInt += 1
      } else {
        // do nothing
      }
    })
    loadLevel = (loadInt / this.capacity).toFixed(2)
    if (loadLevel > this.loadFactor){
      // alert(`Load level of ${loadLevel} exceeds our Load Factor of ${this.loadFactor}. \n\nRebalancing...`)
      this.balanceLoad(key, value);
    } else {
      // do nothing
    }
    
    return loadInt, loadLevel;
  }

  balanceLoad (key, value) { 
    this.capacity = this.capacity * 2
    const tempArray = this.entries(this.theArray) // and store them as key-value STRING pairs in tempArray
    tempArray.push([key, value]) // Save the incoming key-value to tempArray
    this.clear(this.theArray)
    this.theArray = new Array(this.capacity)
    this.repopulateHashMap(tempArray); // Rehash and rebuild
    this.onChange();
  }

  entries (arr) {
    const entriesArray = new Array(); // unsure the size needed.
    arr.forEach((bucket => {
      if (bucket){
        const headNode = bucket.head;  
        // Traverse time
        let temp = headNode;
        while (temp){ 
          // Read the key/values and send to tempArray
          entriesArray.push([temp.key, temp.value])
          temp = temp.nextNode
        }
      }
    }))
    return entriesArray;
  }

  repopulateHashMap (tempArray) {
    tempArray.forEach((entry) => {
      // Pull out and control the type fed into this.set() as strings
      const [key, value] = entry // destructure the entry item (of array type)
      // Rehash
      this.set(key, value) // send them back into the new this.theArray
    })
    console.log(`Hash Map has been rebalanced`)
    console.log(this)
  }

  drawCurrentLoad () {
    const currentLoadNum = document.querySelector('.current-load')
    currentLoadNum.textContent = this.checkLoad();
  }

  drawBucketsAmount () {
    const bucketAmount = document.querySelector('.buckets-amount');
    bucketAmount.textContent = this.capacity;
  }
  
  drawHashMap () {
    const domMap = document.querySelector('.hash-map')
    // reset
    domMap.innerHTML = `
      <div class="buckets-col">
      </div>
      <div class="nodes-col">
      </div>
      `
    const domBucketsCol = document.querySelector('.buckets-col')
    const domNodesCol = document.querySelector('.nodes-col')
    
    // Make bucket numbers
    
    for (let i = 0; i < this.theArray.length; i +=1){
      const bucket = this.theArray[i];
      const newDiv = document.createElement('div');
      const newRow = document.createElement('div');  
      if (bucket){ // If there's a Linked List inside
        // Draw bucket numbers
        const bucketNumber = newDiv;
        bucketNumber.textContent = i;
        domBucketsCol.appendChild(bucketNumber);

        // make node row
        const nodeRow = newRow;
        nodeRow.className = 'nodes-row';
        domNodesCol.appendChild(nodeRow);
        // traverse the linked list
        const headNode = bucket.head;
        let temp = headNode;
        while(temp){
          const newNode = document.createElement('div');
          const node = newNode
          node.className = 'node';
          node.innerHTML = `
          <div>${temp.key} ${temp.value}</div><div>=></div>
          `;
          nodeRow.appendChild(node);
          
          temp = temp.nextNode;
        }
      } else if (!bucket) {
        // Draw the bucket still
        const bucketNumber = newDiv;
        bucketNumber.textContent = i;
        domBucketsCol.appendChild(bucketNumber);
        // Draw empty node
        const emptyNode = newRow;
        emptyNode.innerHTML = `
          <div class="nodes-row">
            <div class="node"><div>empty</div></div>
          </div>
        `
        domNodesCol.appendChild(emptyNode);
      }
    }
  }


  onChange (key, value) {
    this.checkLoad(key, value); // need to pass the incoming value from onChange() => checkLoad() => balanceLoad()
    this.drawBucketsAmount();
    this.drawCurrentLoad();
    this.drawHashMap();
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