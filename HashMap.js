class HashMap {
  constructor () {

  }
  
  hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
  
    return hashCode;
  } 

}

// Project Constraint
function checkIndex() {
  if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }
}

module.exports = HashMap