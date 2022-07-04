/*
Higher order functions

hofunctions good for composition
*/

function fnTriple(x) {
    return x * 3
}

var triple = function(x) {
    return x *3;
}

var waffle = triple
waffle(30)

// filter 

var animals = [
    { name: 'Ssaro', species: 'snake' },
    { name: 'Caro', species: 'dog' },
    { name: 'Hamilton', species: 'fish' },
    { name: 'Nemo', species: 'dog' },
    { name: 'Jimmy', species: 'fish' },
]

/*
// normal way without filter
var dogs = []
for (let i=0; i < animals.length; i++) {
    if (animals[i].species === 'dog')
        dogs.push(animals[i])
}
*/

// with filter
var isDog = function(animal) {
    return animal.species === 'dog'
}
// filter use callback functions
var dogs = animals.filter(isDog)

// reject is reverse of filter
var otherAnimals = animals.reject(isDog)