// reduce is not specific

var orders = [
    { amount: 250 },
    { amount: 400 },
    { amount: 100 },
    { amount: 325 },
]

/*
// without reduce
var totalAmount = 0
for (let i=0; i < orders.length; i++) {
    totalAmount += orders[i].amount
}
*/

// with reduce, without arrow functions
//var totalAmount = orders.reduce(function(sum, order) { return sum + order.amount }, 0)

// with reduce, with arrow functions
var totalAmount = orders.reduce((sum, order) => sum + order.amount, 0)
console.log(totalAmount)