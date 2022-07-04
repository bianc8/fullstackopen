const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet: function() {
        console.log('hello, my name is ' + this.name)
    },
    doAddition: function(a, b) {
        console.log(a + b)
    },
    
}
  
arto.greet()  // "hello, my name is Arto Hellas" gets printed

// add method after the creation of obj
arto.growOlder = function() {
    this.age += 1
}
console.log(arto.age)   // 35 is printed
arto.growOlder()
console.log(arto.age)   // 36 is printed


// reference of method
arto.doAddition(1, 4)        // 5 is printed

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)   // 25 is printed

// undef obj in reference
const referenceToGreet = arto.greet
referenceToGreet() // prints "hello, my name is undefined"

// undef this in reference
setTimeout(arto.greet, 100)

// preserve this passing by ref
setTimeout(arto.greet.bind(arto), 100)