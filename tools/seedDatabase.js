import { connect, disconnect } from 'mongoose';
import chalk from 'chalk';
import Course from '../server/course/course.model';
import User from '../server/users/user.model';
import { url } from '../server/config';

(async () => {
  try {
    await connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const users = await User.find({});
    const courses = await Course.find({});
    if (users.length === 0 || courses.length === 0) {
      console.log(chalk.yellow('No users or courses in the database, creating sample data...'));
      console.log(chalk.yellow('Purging any pre-existing stale...'));
      await User.deleteMany({})
      await Course.deleteMany({})
      const user = new User({ name: 'John Doe', course: 'SOFTENG 700' });
      await user.save();
      console.log(chalk.green('Sample user successfuly created!'));
      const newCourses = [
        { name: 'SOFTENG 700', date: new Date(), cohortSize: 200, role: 'Course Cordinator', ageOfCourse: 5 },
        { name: 'SOFTENG 750', date: new Date(), cohortSize: 100, role: 'Course Instructor', ageOfCourse: 4 },
        { name: 'COMPSCI 221', date: new Date(), cohortSize: 263, role: 'Course Cordinator', ageOfCourse: 3 },
        { name: 'BUSADMIN 350', date: new Date(), cohortSize: 140, role: 'Course Cordinator', ageOfCourse: 2 }
      ];
      await Course.insertMany(newCourses);
      console.log(chalk.green(`${newCourses.length} course(s) successfuly created!`));
    } else {
      console.log(chalk.yellow('Database already initiated, skipping populating script'));
    }
  } catch (error) {
    console.log(chalk.red(error));
  } finally {
    await disconnect();
  }
})();
