var animals = [
    { name: 'Ssaro', species: 'snake' },
    { name: 'Caro', species: 'dog' },
    { name: 'Hamilton', species: 'fish' },
    { name: 'Nemo', species: 'dog' },
    { name: 'Jimmy', species: 'fish' },
]

// we want all names of all animals
/*
// without map
var names = []
for (let i=0; i < animals.length; i++) {
    names.push(animals[i].name)
}
*/

// with map, wo arrow functions
//var names = animals.map(function(animal) { return animal.name })

// with map, with arrow functions
var names = animals.map((animal) => animal.name)
console.log(names)