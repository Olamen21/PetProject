import { Pet } from "../types/Pet";

export const mockPets: Pet[] = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    birthday: "2020-05-10",
    gender: "Male",
    photo: "https://tse2.mm.bing.net/th/id/OIP.pCmMNnwqozAI07jXWm3z3wHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    reproStatus: "Neutered",
    species: "Dog",
    height: 60,
    weight: 30,
    microchipID: "123456789",
    neutered: true,
    allergies: []
  },
  {
    id: 2,
    name: "Mimi",
    breed: "Shih Tzu",
    birthday: "2021-08-15",
    gender: "Female",
    photo: "https://tse2.mm.bing.net/th/id/OIP.pCmMNnwqozAI07jXWm3z3wHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    reproStatus: "Spayed",
    species: "Dog",
    height: 25,
    weight: 6,
    microchipID: "987654321",
    neutered: true,
    allergies: []
  },
  {
    id: 3,
    name: "Tom",
    breed: "British Shorthair",
    birthday: "2019-03-20",
    gender: "Male",
    photo: "https://tse2.mm.bing.net/th/id/OIP.pCmMNnwqozAI07jXWm3z3wHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    species: "Cat",
    height: 30,
    weight: 5,
    microchipID: "555666777",
    neutered: true,
    allergies: []
  },
];
