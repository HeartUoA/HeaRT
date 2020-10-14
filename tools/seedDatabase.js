import { connect, disconnect } from "mongoose";
import chalk from "chalk";
import Course from "../server/course/course.model";
import User from "../server/users/user.model";
import Chart from "../server/chart/chart.model";
import Dimension from "../server/dimension/dimension.model";
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
    const charts = await Chart.find({});
    if (users.length === 0 || courses.length === 0 || charts.length === 0) {
      console.log(
        chalk.yellow(
          "No users, courses or charts in the database, creating sample data..."
        )
      );
      console.log(chalk.yellow("Purging any pre-existing stale..."));
      await User.deleteMany({});
      await Course.deleteMany({});
      await Chart.deleteMany({});
      await Dimension.deleteMany({});

      // Create dummy user
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
      console.log(chalk.green("Sample user successfully created!"));

      // Create dummy courses
      const newCourses = [
        {
          name: "SOFTENG 750",
          cohortSize: 100,
          role: "Course Instructor",
          ageOfCourse: 4,
          createdByUserID: userid,
          createdAt: Date.now(),
          startYear: Date.now(),
        },
        {
          name: "COMPSCI 221",
          cohortSize: 263,
          role: "Course Cordinator",
          ageOfCourse: 3,
          createdByUserID: userid,
          createdAt: Date.now(),
          startYear: Date.now(),
        },
        {
          name: "BUSADMIN 350",
          cohortSize: 140,
          role: "Course Cordinator",
          ageOfCourse: 2,
          createdByUserID: userid,
          createdAt: Date.now(),
          startYear: Date.now(),
        },
      ];
      await Course.insertMany(newCourses);
      const courseWithCharts = new Course({
        name: "SOFTENG 700",
        cohortSize: 200,
        role: "Course Cordinator",
        ageOfCourse: 5,
        createdByUserID: userid,
        createdAt: Date.now(),
        startYear: Date.now(),
      });
      let courseid = courseWithCharts._id;
      await courseWithCharts.save();
      console.log(
        chalk.green(`${newCourses.length} course(s) successfully created!`)
      );

      // Create dummy charts
      const newChart1 = new Chart({
        courseID: courseid,
        createdAt: Date.now(),
        isComplete: true,
        reasonOfPlay: "Designing the course",
        createdByUserID: userid,
      });
      let chart1id = newChart1._id;
      await newChart1.save();
      const chart1Dimensions = [
        {
          chartID: chart1id,
          score: 32,
          note:
            "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
          definition: "Nature and purpose of learning tasks",
          type: "Practice",
          leftCardStatement:
            "Learning tasks reflect the practical context in which the knowledge or skills will be used.",
          rightCardStatement:
            "Learning tasks focus on theoretical concepts (even if physical objects are used).",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Academic/abstract" },
            { position: 100, label: "Authentic/experimental" },
          ],
        },
        {
          chartID: chart1id,
          score: 68,
          note:
            "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
          definition: "Degree of structure of learning tasks",
          type: "Practice",
          leftCardStatement: "Learners can only do learning tasks in one way.",
          rightCardStatement:
            "Learners can do the learning tasks in a variety of ways.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "High/constrained" },
            { position: 100, label: "Low/open" },
          ],
        },
        {
          chartID: chart1id,
          score: 18,
          note:
            "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
          definition: "Interactivity",
          type: "Practice",
          leftCardStatement:
            "Learners can contribute to or change the content.",
          rightCardStatement:
            "The content is pre-prepared and fixed. Learners can't contribute to or change the content.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Navigational" },
            { position: 100, label: "Manipulative" },
          ],
        },
        {
          chartID: chart1id,
          score: 96,
          note:
            "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
          definition: "Learning framework",
          type: "Practice",
          leftCardStatement:
            "Learners perform set learning tasks using the information provided.",
          rightCardStatement:
            "Learners explore the content and learning tasks in their own way.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Structured" },
            { position: 50, label: "Guided" },
            { position: 100, label: "Facilitated" },
          ],
        },
        {
          chartID: chart1id,
          score: 28,
          note:
            "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
          definition: "Learning control",
          type: "Practice",
          leftCardStatement:
            "Learning activities are directed by the teacher or resource.",
          rightCardStatement:
            "Students choose the sequence and type of learning activities they undertake.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Teacher-managed" },
            { position: 100, label: "Student-managed" },
          ],
        },
        {
          chartID: chart1id,
          score: 85,
          note:
            "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
          definition: "Learning process",
          type: "Practice",
          leftCardStatement:
            "Students reproduce accepted discipline knowledge.",
          rightCardStatement:
            "Students learn to construct their own understanding of the discipline.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Reproduction" },
            { position: 100, label: "Construction" },
          ],
        },
        {
          chartID: chart1id,
          score: 27,
          note:
            "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
          definition: "Feedback",
          type: "Practice",
          leftCardStatement: "Left card statement", // TODO: TBC
          rightCardStatement: "Right card statement", // TODO: TBC
          leftCardDefaultSliderPosition: 0, // TODO: TBC
          rightCardDefaultSliderPosition: 100, // TODO: TBC
          marks: [
            { position: 0, label: "Minimal" },
            { position: 50, label: "Fixed" },
            { position: 100, label: "Responsive" },
          ],
        },
        {
          chartID: chart1id,
          score: 64,
          note:
            "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
          definition: "Learning goals (Curriculum beliefs)",
          type: "Beliefs",
          leftCardStatement:
            "Learning goals are clearly defined and can be linked to assessment clearly.",
          rightCardStatement:
            "Learning goals are open to interpretation and are not easily assessable.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Sharply-focused" },
            { position: 100, label: "Unfocused" },
          ],
        },
        {
          chartID: chart1id,
          score: 50,
          note:
            "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
          definition: "Student collaboration (Curriculum beliefs)",
          type: "Beliefs",
          leftCardStatement: "Left card statement", // TODO: TBC
          rightCardStatement: "Right card statement", // TODO: TBC
          leftCardDefaultSliderPosition: 0, // TODO: TBC
          rightCardDefaultSliderPosition: 100, // TODO: TBC
          marks: [
            { position: 0, label: "Minimal" },
            { position: 50, label: "Social" },
            { position: 100, label: "Cognitive" },
          ],
        },
        {
          chartID: chart1id,
          score: 38,
          note:
            "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
          definition: "Dimension 10", // TODO: TBC
          type: "Beliefs",
          leftCardStatement:
            "The curriculum or course content determines the learning goals of this course.",
          rightCardStatement:
            "Learners can determine (some or all of) the learning outcomes in the course.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Instructivist" },
            { position: 100, label: "Constructivist" },
          ],
        },
        {
          chartID: chart1id,
          definition: "Dimension 11", // TODO: TBC
          type: "Beliefs",
          leftCardStatement:
            "Learners' incoming knowledge of the content is taken into account by explaining course concepts in ways they are likely to understand.",
          rightCardStatement:
            "Learners' incoming knowledge is taken into account through dialogue and discussion between learners and teachers.",
          leftCardDefaultSliderPosition: 50,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Left Mark" },
            { position: 50, label: "Pre-emptive" },
            { position: 100, label: "Conversational" },
          ],
        },
        {
          chartID: chart1id,
          definition: "Dimension 12", // TODO: TBC
          type: "Beliefs",
          leftCardStatement: "Left card statement", // TODO: TBC
          rightCardStatement: "Right card statement", // TODO: TBC
          leftCardDefaultSliderPosition: 0, // TODO: TBC
          rightCardDefaultSliderPosition: 100, // TODO: TBC
          marks: [
            { position: 0, label: "Left Mark" }, // TODO: TBC
            { position: 100, label: "Right Mark" }, // TODO: TBC
          ],
        },
        {
          chartID: chart1id,
          definition: "Dimension 13", // TODO: TBC
          type: "Beliefs",
          leftCardStatement: "Left card statement", // TODO: TBC
          rightCardStatement: "Right card statement", // TODO: TBC
          leftCardDefaultSliderPosition: 0, // TODO: TBC
          rightCardDefaultSliderPosition: 100, // TODO: TBC
          marks: [
            { position: 0, label: "Left Mark" }, // TODO: TBC
            { position: 100, label: "Right Mark" }, // TODO: TBC
          ],
        },
        {
          chartID: chart1id,
          definition: "Dimension 14", // TODO: TBC
          type: "Beliefs",
          leftCardStatement:
            "For learning to occur in this course, the learning needs to happen 'solo', in private.",
          rightCardStatement:
            "For learning to occur in this course, the learning needs to happen together, in a learning community.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Personal" },
            { position: 100, label: "Social" },
          ],
        },
      ];
      await Dimension.insertMany(chart1Dimensions);

      const newChart2 = new Chart({
        courseID: courseid,
        createdAt: Date.now(),
        isComplete: true,
        reasonOfPlay: "Reviewing the course",
        createdByUserID: userid,
      });
      let chart2id = newChart2._id;
      await newChart2.save();
      const chart2Dimensions = [
        {
          chartID: chart2id,
          score: 82,
          note:
            "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
          definition: "Nature and purpose of learning tasks",
          type: "Practice",
          leftCardStatement:
            "Learning tasks reflect the practical context in which the knowledge or skills will be used.",
          rightCardStatement:
            "Learning tasks focus on theoretical concepts (even if physical objects are used).",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Academic/abstract" },
            { position: 100, label: "Authentic/experimental" },
          ],
        },
        {
          chartID: chart2id,
          score: 83,
          note:
            "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
          definition: "Degree of structure of learning tasks",
          type: "Practice",
          leftCardStatement: "Learners can only do learning tasks in one way.",
          rightCardStatement:
            "Learners can do the learning tasks in a variety of ways.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "High/constrained" },
            { position: 100, label: "Low/open" },
          ],
        },
        {
          chartID: chart2id,
          score: 86,
          note:
            "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
          definition: "Interactivity",
          type: "Practice",
          leftCardStatement:
            "Learners can contribute to or change the content.",
          rightCardStatement:
            "The content is pre-prepared and fixed. Learners can't contribute to or change the content.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Navigational" },
            { position: 100, label: "Manipulative" },
          ],
        },
        {
          chartID: chart2id,
          score: 27,
          note:
            "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
          definition: "Learning framework",
          type: "Practice",
          leftCardStatement:
            "Learners perform set learning tasks using the information provided.",
          rightCardStatement:
            "Learners explore the content and learning tasks in their own way.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Structured" },
            { position: 50, label: "Guided" },
            { position: 100, label: "Facilitated" },
          ],
        },
        {
          chartID: chart2id,
          score: 27,
          note:
            "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
          definition: "Learning control",
          type: "Practice",
          leftCardStatement:
            "Learning activities are directed by the teacher or resource.",
          rightCardStatement:
            "Students choose the sequence and type of learning activities they undertake.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Teacher-managed" },
            { position: 100, label: "Student-managed" },
          ],
        },
        {
          chartID: chart2id,
          score: 58,
          note:
            "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
          definition: "Learning process",
          type: "Practice",
          leftCardStatement:
            "Students reproduce accepted discipline knowledge.",
          rightCardStatement:
            "Students learn to construct their own understanding of the discipline.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Reproduction" },
            { position: 100, label: "Construction" },
          ],
        },
        {
          chartID: chart2id,
          score: 100,
          note:
            "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
          definition: "Feedback",
          type: "Practice",
          leftCardStatement: "Left card statement", // TODO: TBC
          rightCardStatement: "Right card statement", // TODO: TBC
          leftCardDefaultSliderPosition: 0, // TODO: TBC
          rightCardDefaultSliderPosition: 100, // TODO: TBC
          marks: [
            { position: 0, label: "Minimal" },
            { position: 50, label: "Fixed" },
            { position: 100, label: "Responsive" },
          ],
        },
        {
          chartID: chart2id,
          score: 100,
          note:
            "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
          definition: "Learning goals (Curriculum beliefs)",
          type: "Beliefs",
          leftCardStatement:
            "Learning goals are clearly defined and can be linked to assessment clearly.",
          rightCardStatement:
            "Learning goals are open to interpretation and are not easily assessable.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Sharply-focused" },
            { position: 100, label: "Unfocused" },
          ],
        },
        {
          chartID: chart2id,
          score: 100,
          note:
            "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
          definition: "Student collaboration (Curriculum beliefs)",
          type: "Beliefs",
          leftCardStatement: "Left card statement", // TODO: TBC
          rightCardStatement: "Right card statement", // TODO: TBC
          leftCardDefaultSliderPosition: 0, // TODO: TBC
          rightCardDefaultSliderPosition: 100, // TODO: TBC
          marks: [
            { position: 0, label: "Minimal" },
            { position: 50, label: "Social" },
            { position: 100, label: "Cognitive" },
          ],
        },
        {
          chartID: chart2id,
          score: 10,
          note:
            "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
          definition: "Dimension 10", // TODO: TBC
          type: "Beliefs",
          leftCardStatement:
            "The curriculum or course content determines the learning goals of this course.",
          rightCardStatement:
            "Learners can determine (some or all of) the learning outcomes in the course.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Instructivist" },
            { position: 100, label: "Constructivist" },
          ],
        },
        {
          chartID: chart2id,
          score: 15,
          note:
            "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
          definition: "Dimension 11", // TODO: TBC
          type: "Beliefs",
          leftCardStatement:
            "Learners' incoming knowledge of the content is taken into account by explaining course concepts in ways they are likely to understand.",
          rightCardStatement:
            "Learners' incoming knowledge is taken into account through dialogue and discussion between learners and teachers.",
          leftCardDefaultSliderPosition: 50,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Left Mark" },
            { position: 50, label: "Pre-emptive" },
            { position: 100, label: "Conversational" },
          ],
        },
        {
          chartID: chart2id,
          score: 73,
          note:
            "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
          definition: "Dimension 12", // TODO: TBC
          type: "Beliefs",
          leftCardStatement: "Left card statement", // TODO: TBC
          rightCardStatement: "Right card statement", // TODO: TBC
          leftCardDefaultSliderPosition: 0, // TODO: TBC
          rightCardDefaultSliderPosition: 100, // TODO: TBC
          marks: [
            { position: 0, label: "Left Mark" }, // TODO: TBC
            { position: 100, label: "Right Mark" }, // TODO: TBC
          ],
        },
        {
          chartID: chart2id,
          definition: "Dimension 13", // TODO: TBC
          type: "Beliefs",
          leftCardStatement: "Left card statement", // TODO: TBC
          rightCardStatement: "Right card statement", // TODO: TBC
          leftCardDefaultSliderPosition: 0, // TODO: TBC
          rightCardDefaultSliderPosition: 100, // TODO: TBC
          marks: [
            { position: 0, label: "Left Mark" }, // TODO: TBC
            { position: 100, label: "Right Mark" }, // TODO: TBC
          ],
        },
        {
          chartID: chart2id,
          definition: "Dimension 14", // TODO: TBC
          type: "Beliefs",
          leftCardStatement:
            "For learning to occur in this course, the learning needs to happen 'solo', in private.",
          rightCardStatement:
            "For learning to occur in this course, the learning needs to happen together, in a learning community.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Personal" },
            { position: 100, label: "Social" },
          ],
        },
      ];
      await Dimension.insertMany(chart2Dimensions);

      const newChart3 = new Chart({
        courseID: courseid,
        createdAt: Date.now(),
        isComplete: true,
        reasonOfPlay: "Reviewing the course again",
        createdByUserID: userid,
      });
      let chart3id = newChart3._id;
      await newChart3.save();
      const chart3Dimensions = [
        {
          chartID: chart3id,
          score: 10,
          note:
            "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
          definition: "Nature and purpose of learning tasks",
          type: "Practice",
          leftCardStatement:
            "Learning tasks reflect the practical context in which the knowledge or skills will be used.",
          rightCardStatement:
            "Learning tasks focus on theoretical concepts (even if physical objects are used).",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Academic/abstract" },
            { position: 100, label: "Authentic/experimental" },
          ],
        },
        {
          chartID: chart3id,
          score: 5,
          note:
            "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
          definition: "Degree of structure of learning tasks",
          type: "Practice",
          leftCardStatement: "Learners can only do learning tasks in one way.",
          rightCardStatement:
            "Learners can do the learning tasks in a variety of ways.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "High/constrained" },
            { position: 100, label: "Low/open" },
          ],
        },
        {
          chartID: chart3id,
          score: 85,
          note:
            "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
          definition: "Interactivity",
          type: "Practice",
          leftCardStatement:
            "Learners can contribute to or change the content.",
          rightCardStatement:
            "The content is pre-prepared and fixed. Learners can't contribute to or change the content.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Navigational" },
            { position: 100, label: "Manipulative" },
          ],
        },
        {
          chartID: chart3id,
          score: 37,
          note:
            "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
          definition: "Learning framework",
          type: "Practice",
          leftCardStatement:
            "Learners perform set learning tasks using the information provided.",
          rightCardStatement:
            "Learners explore the content and learning tasks in their own way.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Structured" },
            { position: 50, label: "Guided" },
            { position: 100, label: "Facilitated" },
          ],
        },
        {
          chartID: chart3id,
          note:
            "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
          definition: "Learning control",
          type: "Practice",
          leftCardStatement:
            "Learning activities are directed by the teacher or resource.",
          rightCardStatement:
            "Students choose the sequence and type of learning activities they undertake.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Teacher-managed" },
            { position: 100, label: "Student-managed" },
          ],
        },
        {
          chartID: chart3id,
          score: 29,
          note:
            "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
          definition: "Learning process",
          type: "Practice",
          leftCardStatement:
            "Students reproduce accepted discipline knowledge.",
          rightCardStatement:
            "Students learn to construct their own understanding of the discipline.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Reproduction" },
            { position: 100, label: "Construction" },
          ],
        },
        {
          chartID: chart3id,
          score: 18,
          note:
            "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
          definition: "Feedback",
          type: "Practice",
          leftCardStatement: "Left card statement", // TODO: TBC
          rightCardStatement: "Right card statement", // TODO: TBC
          leftCardDefaultSliderPosition: 0, // TODO: TBC
          rightCardDefaultSliderPosition: 100, // TODO: TBC
          marks: [
            { position: 0, label: "Minimal" },
            { position: 50, label: "Fixed" },
            { position: 100, label: "Responsive" },
          ],
        },
        {
          chartID: chart3id,
          score: 18,
          note:
            "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
          definition: "Learning goals (Curriculum beliefs)",
          type: "Beliefs",
          leftCardStatement:
            "Learning goals are clearly defined and can be linked to assessment clearly.",
          rightCardStatement:
            "Learning goals are open to interpretation and are not easily assessable.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Sharply-focused" },
            { position: 100, label: "Unfocused" },
          ],
        },
        {
          chartID: chart3id,
          score: 18,
          note:
            "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
          definition: "Student collaboration (Curriculum beliefs)",
          type: "Beliefs",
          leftCardStatement: "Left card statement", // TODO: TBC
          rightCardStatement: "Right card statement", // TODO: TBC
          leftCardDefaultSliderPosition: 0, // TODO: TBC
          rightCardDefaultSliderPosition: 100, // TODO: TBC
          marks: [
            { position: 0, label: "Minimal" },
            { position: 50, label: "Social" },
            { position: 100, label: "Cognitive" },
          ],
        },
        {
          chartID: chart3id,
          score: 10,
          note:
            "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
          definition: "Dimension 10", // TODO: TBC
          type: "Beliefs",
          leftCardStatement:
            "The curriculum or course content determines the learning goals of this course.",
          rightCardStatement:
            "Learners can determine (some or all of) the learning outcomes in the course.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Instructivist" },
            { position: 100, label: "Constructivist" },
          ],
        },
        {
          chartID: chart3id,
          score: 37,
          note:
            "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
          definition: "Dimension 11", // TODO: TBC
          type: "Beliefs",
          leftCardStatement:
            "Learners' incoming knowledge of the content is taken into account by explaining course concepts in ways they are likely to understand.",
          rightCardStatement:
            "Learners' incoming knowledge is taken into account through dialogue and discussion between learners and teachers.",
          leftCardDefaultSliderPosition: 50,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Left Mark" },
            { position: 50, label: "Pre-emptive" },
            { position: 100, label: "Conversational" },
          ],
        },
        {
          chartID: chart3id,
          score: 2,
          note:
            "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
          definition: "Dimension 12", // TODO: TBC
          type: "Beliefs",
          leftCardStatement: "Left card statement", // TODO: TBC
          rightCardStatement: "Right card statement", // TODO: TBC
          leftCardDefaultSliderPosition: 0, // TODO: TBC
          rightCardDefaultSliderPosition: 100, // TODO: TBC
          marks: [
            { position: 0, label: "Left Mark" }, // TODO: TBC
            { position: 100, label: "Right Mark" }, // TODO: TBC
          ],
        },
        {
          chartID: chart3id,
          definition: "Dimension 13", // TODO: TBC
          type: "Beliefs",
          leftCardStatement: "Left card statement", // TODO: TBC
          rightCardStatement: "Right card statement", // TODO: TBC
          leftCardDefaultSliderPosition: 0, // TODO: TBC
          rightCardDefaultSliderPosition: 100, // TODO: TBC
          marks: [
            { position: 0, label: "Left Mark" }, // TODO: TBC
            { position: 100, label: "Right Mark" }, // TODO: TBC
          ],
        },
        {
          chartID: chart3id,
          definition: "Dimension 14", // TODO: TBC
          type: "Beliefs",
          leftCardStatement:
            "For learning to occur in this course, the learning needs to happen 'solo', in private.",
          rightCardStatement:
            "For learning to occur in this course, the learning needs to happen together, in a learning community.",
          leftCardDefaultSliderPosition: 0,
          rightCardDefaultSliderPosition: 100,
          marks: [
            { position: 0, label: "Personal" },
            { position: 100, label: "Social" },
          ],
        },
      ];
      await Dimension.insertMany(chart3Dimensions);
      console.log(chalk.green(`3 chart(s) successfully created!`));
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
