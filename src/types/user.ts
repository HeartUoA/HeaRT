export type User = {
  id: string;
  username: string;
  email: string;
  name: string;
  institution: string;
  department: string;
  position: string;
  passwordHash: string;
  createdAt: Date;
};