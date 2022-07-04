const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}

const result = sum(1, 5)
console.log(result)

const square = p => p * p
const t = [1, 2, 3]
const tSquared = t.map(p => square(p))
console.log("og ",t," tSquared ", tSquared)   // tSquared is now [1, 4, 9]

function product(a, b) {
    return a * b
}
  
const pp = product(2, 6)
console.log("product 2*6=",pp)    // result is now 12

const average = function(a, b) {
    return (a + b) / 2
  }
  
const avg = average(2, 5)
console.log("avg 2 and 5 is ",avg)  // result is now 3.5