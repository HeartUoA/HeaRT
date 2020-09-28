import { Chart } from "../types/chart";

const charts: Chart[] = [
  {
    id: "1",
    courseID: "1",
    createdAt: new Date(),
    dimensions: [
      {
        name: "Nature and purpose of learning tasks",
        type: "Practice",
        leftCard: {
          statement: "Statement 1.",
          sliderPosition: 0,
        },
        rightCard: { 
          statement: "Statement 2.",
          sliderPosition: 100,
        },
        marks: {
          0: "Academic/abstract",
          100: "Authentic/experimental",
        },
        position: -1,
        note: undefined,
      },
      {
        name: "Degree of structure of learning tasks",
        type: "Practice",
        leftCard: {
          statement: "Learners can only do learning tasks in one way.",
          sliderPosition: 0,
        },
        rightCard: { 
          statement: "Learners can do learning tasks in a variety of ways.",
          sliderPosition: 100,
        },
        marks: {
          0: "High/constrained",
          100: "Low/open",
        },
        position: -1,
        note: undefined,
      },
      {
        name: "Interactivity",
        type: "Practice",
        leftCard: {
          statement: "Learners can contribute to or change the content.",
          sliderPosition: 0,
        },
        rightCard: { 
          statement: "The content is pre-prepared and fixed. Learners can’t contribute to or change the content.",
          sliderPosition: 100,
        },
        marks: {
          0: "Navigational",
          100: "Manipulative",
        },
        position: -1,
        note: undefined,
      },
      {
        name: "Learning framework",
        type: "Practice",
        leftCard: {
          statement: "Learners perform set learning tasks using information provided.",
          sliderPosition: 0,
        },
        rightCard: { 
          statement: "Learners explore the content and learning tasks in their own way.",
          sliderPosition: 100,
        },
        marks: {
          0: "Structured",
          50: "Guided",
          100: "Facilitated",
        },
        position: -1,
        note: undefined,
      },
      {
        name: "Learning control",
        type: "Practice",
        leftCard: {
          statement: "Statement 1.",
          sliderPosition: 0,
        },
        rightCard: { 
          statement: "Statement 2.",
          sliderPosition: 100,
        },
        marks: {
          0: "Teacher-managed",
          100: "Student-managed",
        },
        position: -1,
        note: undefined,
      },
      {
        name: "Learning process",
        type: "Practice",
        leftCard: {
          statement: "Statement 1.",
          sliderPosition: 0,
        },
        rightCard: { 
          statement: "Statement 2.",
          sliderPosition: 100,
        },
        marks: {
          0: "Reproduction",
          100: "Construction",
        },
        position: -1,
        note: undefined,
      },
      {
        name: "Feedback",
        type: "Practice",
        leftCard: {
          statement: "Students receive predetermined feedback that is built into learning activities.",
          sliderPosition: 50,
        },
        rightCard: { 
          statement: "Students receive personalised feedback to guide their learning.",
          sliderPosition: 100,
        },
        marks: {
          0: "Minimal",
          50: "Fixed",
          100: "Responsive",
        },
        position: -1,
        note: undefined,
      },
      {
        name: "Learning goals (Curriculum beliefs)",
        type: "Belief",
        leftCard: {
          statement: "Learning goals are clearly defined and can be linked to assessment clearly.",
          sliderPosition: 0,
        },
        rightCard: { 
          statement: "Learning goals are open to interpretation and are not easily assessable.",
          sliderPosition: 100,
        },
        marks: {
          0: "Sharply focused",
          100: "Unfocused",
        },
        position: -1,
        note: undefined,
      },
      {
        name: "Dimension 10",
        type: "Belief",
        leftCard: {
          statement: "The curriculum or course content determines the learning goals of this course.",
          sliderPosition: 0,
        },
        rightCard: { 
          statement: "Learners can determine (some or all of) the learning goals in this course.",
          sliderPosition: 100,
        },
        marks: {
          0: "Instructivist",
          100: "Constructivist",
        },
        position: -1,
        note: undefined,
      },
      {
        name: "Dimension 14",
        type: "Belief",
        leftCard: {
          statement: "For learning to occur in this course, the learning needs to happen ‘solo’, in private.",
          sliderPosition: 0,
        },
        rightCard: { 
          statement: "For learning to occur in this course, the learning needs to happen together, in a learning community.",
          sliderPosition: 100,
        },
        marks: {
          0: "Personal",
          100: "Social",
        },
        position: -1,
        note: undefined,
      },
    ],
  },
];

export default charts;