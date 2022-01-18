let users = [
  {
    id: 1,
    name: 'Mauro',
    cars: [1, 3]
  },
  {
    id: 2,
    name: 'Sofi',
    cars: [2]
  },
  {
    id: 3,
    name: 'Gladys',
    cars: []
  },
  {
    id: 4,
    name: 'Luisa',
    cars: []
  }
]

let cars = [
  {
    id: 1,
    make: 'Mazda',
    model: '3',
    colour: 'titanium',
    ownedBy: 1
  },
  {
    id: 2,
    make: 'Ford',
    model: 'Focus',
    colour: 'red',
    ownedBy: 2
  },
  {
    id: 3,
    make: 'Chevrolet',
    model: 'Camaro',
    colour: 'yellow',
    ownedBy: 1
  }
]

module.exports = {
  users,
  cars
}