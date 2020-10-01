import { User } from "../types/user";

const users: User[] = [
  {
    id: "1",
    username: "rezasha",
    email: "reza.shahamiri@auckland.ac.nz",
    name: "Reza Shahamiri",
    institution: "The University of Auckland",
    department:
      "Department of Electrical, Computer Systems and Software Engineering",
    position: "Lecturer",
    passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99", // decrypted password is "password"
    createdAt: new Date(),
  },
];

export default users;
