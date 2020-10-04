export type Course = {
  id: string;
  name: string;
  cohortSize: number;
  startYear: Date;
  role: string;
  userID?: string;
  createdAt: Date;
};

export const createCourse = (course: any) => {
  const result: Course = {
    ...course,
    id: course._id,
    startYear: new Date(course.startYear),
    createdAt: new Date(course.createdAt),
  };
  return result;
};
