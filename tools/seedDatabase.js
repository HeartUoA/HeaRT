import { connect, disconnect } from "mongoose";
import chalk from "chalk";
import Course from "../server/course/course.model";
import User from "../server/users/user.model";
import { url } from "../server/config";

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
      console.log(
        chalk.yellow(
          "No users or courses in the database, creating sample data..."
        )
      );
      console.log(chalk.yellow("Purging any pre-existing stale..."));
      await User.deleteMany({});
      await Course.deleteMany({});
      const user = new User({
        name: "John Doe",
        passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99",
        email: "john@doe.com",
        position: "Course Cordinator",
        department: "Engineering",
        institution: "The University Of Auckland",
        createdAt: Date.now(),
        username: "jdoe",
      });
      let userid = user._id;
      await user.save();
      console.log(chalk.green("Sample user successfuly created!"));
      const newCourses = [
        {
          name: "SOFTENG 700",
          date: new Date(),
          cohortSize: 200,
          role: "Course Cordinator",
          ageOfCourse: 5,
          createdByUserID: userid,
          createdAt: Date.now(),
        },
        {
          name: "SOFTENG 750",
          date: new Date(),
          cohortSize: 100,
          role: "Course Instructor",
          ageOfCourse: 4,
          createdByUserID: userid,
          createdAt: Date.now(),
        },
        {
          name: "COMPSCI 221",
          date: new Date(),
          cohortSize: 263,
          role: "Course Cordinator",
          ageOfCourse: 3,
          createdByUserID: userid,
          createdAt: Date.now(),
        },
        {
          name: "BUSADMIN 350",
          date: new Date(),
          cohortSize: 140,
          role: "Course Cordinator",
          ageOfCourse: 2,
          createdByUserID: userid,
          createdAt: Date.now(),
        },
      ];
      await Course.insertMany(newCourses);
      console.log(
        chalk.green(`${newCourses.length} course(s) successfuly created!`)
      );
    } else {
      console.log(
        chalk.yellow("Database already initiated, skipping populating script")
      );
    }
  } catch (error) {
    console.log(chalk.red(error));
  } finally {
    await disconnect();
  }
})();
