console.log("Hello, World!");

function outer() {
    let count = 0;
    console.log("Outer function called");
    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}

console.log("Outer function returned inner function");
const counter = outer();
console.log("Counter function created");


counter(); // 1
counter(); // 2
counter(); // 3