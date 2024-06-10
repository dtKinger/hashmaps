export class LinkedList {
  constructor(){
    this.head = null;
    this.length = 0;
  }

  prepend (key, value, next) {
    const newNode = new Node(key, value, this.head);
    this.head = newNode;
    this.length += 1;
  }

  append (key, value) {
    // if list is empty, simply assign a newNode to this.head
    if (this.head == null){
      this.prepend(key, value)
    } else {
      // use a temp copy of head as a non-destructive way to traverse by continually reassigning itself to the next one.
      let temp = this.head;
      while (temp.nextNode != null) {
        temp = temp.nextNode; // Notice we don't reassign temp.value - but the whole object
        // This structure indicates that each node is actually nested inside its parent node
      }
      temp.nextNode = new Node(key, value, null);
      this.length += 1;
    }
  }

  print(){
    let niceArray = [];
    let niceString= '';
    let temp = this.head;
    while (temp){ // while temp is truthy (to include the final value)
      niceArray.push(temp.value)
      temp = temp.nextNode;
    }
    niceArray.forEach((item) => {
      niceString += ` (${item.toString()}) ->`;
    })
    niceString += ' null'
    console.log(niceString)
  }
}

export class Node {
  constructor (key, value, nextNode) {
    this.key = key
    this.value = value
    this.nextNode = nextNode;
  }
}