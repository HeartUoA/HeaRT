import { Course } from "../types/course";

const courses: Course[] = [
  {
    id: "1",
    name: "SOFTENG 761",
    cohortSize: 100,
    startYear: new Date(2010, 1, 25),
    role: "Lecturer",
    userID: "1",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "SOFTENG 306",
    cohortSize: 80,
    startYear: new Date(2015, 5, 19),
    role: "Lecturer",
    userID: "1",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "COMPSYS 302",
    cohortSize: 138,
    startYear: new Date(2008, 6, 4),
    role: "Lecturer",
    userID: "1",
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "SOFTENG 750",
    cohortSize: 50,
    startYear: new Date(2007, 2, 21),
    role: "Lecturer",
    userID: "1",
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "ENGGEN 121",
    cohortSize: 1000,
    startYear: new Date(2010, 3, 4),
    role: "Lecturer",
    userID: "1",
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "SOFTENG 250",
    cohortSize: 138,
    startYear: new Date(2015, 12, 20),
    role: "Lecturer",
    userID: "1",
    createdAt: new Date(),
  },
  {
    id: "7",
    name: "SOFTENG 760",
    cohortSize: 45,
    startYear: new Date(2013, 3, 4),
    role: "Lecturer",
    userID: "1",
    createdAt: new Date(),
  },
];

export default courses;
