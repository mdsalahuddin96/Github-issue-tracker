## 1️. What is the difference between var, let, and const?  
answer: var, let, and const are used to declare variables in JavaScript. The main differences are shown in the table below.      
| var | let | const |
|-----|-----|------|
| var is function scoped | let is block scoped | const is block scoped |
| var can be redeclare in the same scope | let can’t be redeclare in the same scope | const can’t be redeclare in the same scope |
| Reassign are allowed using var | Reassign are allowed using let | Reassign are not allowed using const |
|Hoisted and initialized with undefined |Hoisted but not initialized | Hoisted but not initialized 

## 2️. What is the spread operator (...)?  
answer: The spread operator (...) is a JavaScript operator that is used to expand elements of an array or properties of an object 
into individual elements.   
## 3. What is the difference between map(), filter(), and forEach()?    
answer:  
map(): map() iterates over an array and applies a function to each element and each time take an item from the array and
make some process on the item and give a new array with the processed data.  
filter(): filter() makes an new array with that element that are satisfy a given condition.
It takes a callback function as an argument.  
forEach(): forEach() iterates over an array and executes a function for each element, but it does not return a new array.  
## 4. What is an arrow function?  
answer: Arrow function is the way of writing a function in shorter syntax in modern JavaScript.
This is introduced in ES6. Syntax of the arrow function is (parameter)=>{function body}.
If inside the arrow function have only one statement there no need to return, it will implicitly returned.  
## 5. What are template literals?  
answer: Template literals are a JavaScript feature that allow us to create strings using backticks (``), 
supporting multiline strings and embedded expressions using ${}.This is a powerful feature in JS that is introduced in ES6.  


