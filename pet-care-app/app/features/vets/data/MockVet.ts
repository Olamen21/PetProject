import { Vet } from "../types/Vets";

export const MockVets: Vet[] = [
  {
    id: "1",
    name: "Dr. Sara Fredo Jay",
    role: "DVM, Veterinary Dermatologist",
    avatarUrl: require("../../../../assets/images/doctor_remove_background.png"),
    online: true,
    rating: 4.5,
  },
  {
    id: "2",
    name: "Dr. John Smith",
    role: "DVM, Veterinary Surgeon",
    avatarUrl: "https://thumbs.dreamstime.com/b/doctor-portrait-21332357.jpg",
    online: true,
    rating: 4.7,
  },
  {
    id: "3",
    name: "Dr. Anna Lee",
    role: "DVM, Veterinary Cardiologist",
    avatarUrl: "https://thumbs.dreamstime.com/b/doctor-portrait-21332357.jpg",
    online: false,
    rating: 3.5,
  },
  {
    id: "4",
    name: "Dr. Mark Brown",
    role: "DVM, Veterinary Dentist",
    avatarUrl: "https://thumbs.dreamstime.com/b/doctor-portrait-21332357.jpg",
    online: false,
    rating: 5.0,
  },
];