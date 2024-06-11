# Hash Map Project for TOP

## See it in action

I wanted to physically see how the hash map would rebalance when the load factor was exceeded. So after getting the logic working in node, I converted the app to run in the browser and built-out a front end.

The implementation is simplified, not showing off every method of the hash map... Instead, I pre-populate many key-value pairs, so if you add just one more specific one, with the click of a button, the hash table must rebalance. 

[https://dtkinger.github.io/hashmaps/](https://dtkinger.github.io/hashmaps/)

You can check the developer console for some logging of the hash table before and after it load balances, too. 

## Key Learnings

* When and why to use a hashing function
* Why a hash lookup is so fast, with O(1) time complexity.
* How to create Linked Lists inside Array slots.
* Array.forEach() skips empty buckets, use a for loop for more granular control

## Reminders

* Building a Linked List from scratch
* Traversing a Linked List 
* "Building a house from the inside out"
* Porting a simple app from Node to the Browser

(I in fact re-did the Linked List project to get a better understanding for hash maps)
