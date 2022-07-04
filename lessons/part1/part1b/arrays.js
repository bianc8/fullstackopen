const t = [1, -1, 3]

console.log("length of t: "+t.length) // 4 is printed

console.log("Print all values of t")
t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
})       

console.log("t[1]: "+t[1])     // -1 is printed

// preferrable in React instead of push
const t2 = t.concat(5)
console.log("t: "+t)
console.log("t2: "+t2)

// double
const m1 = t.map(val => val * 2)
console.log("doubled t: "+m1)

// create li
const m2 = t.map(val => '<li>'+val+'</li>')
console.log("list m2: "+m2)

// destructure
const [first, second, ...rest] = t
console.log("destruct first: ",first," second ", second, " destruct rest: ",rest)