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
  }
];

export default courses;