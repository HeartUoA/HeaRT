import { Chart } from "../types/chart";

const charts: Chart[] = [
  {
    id: "1",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    dimensions: [
      {
        id: "1",
        chartID: "1",
        name: "Nature and purpose of learning tasks",
        type: "Practice",
        leftCard: {
          statement: "Statement 1.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement: "Statement 2.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Academic/abstract",
            id: "1",
          },
          100: {
            style: { color: "#212121" },
            label: "Authentic/experimental",
            id: "1",
          },
        },
        userSelectedSliderPos: 32,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
      },
      {
        id: "2",
        chartID: "1",
        name: "Degree of structure of learning tasks",
        type: "Practice",
        leftCard: {
          statement: "Learners can only do learning tasks in one way.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement: "Learners can do learning tasks in a variety of ways.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "High/constrained",
            id: "2",
          },
          100: {
            style: { color: "#212121" },
            label: "Low/open",
            id: "2",
          },
        },
        userSelectedSliderPos: 68,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
      },
      {
        id: "3",
        chartID: "1",
        name: "Interactivity",
        type: "Practice",
        leftCard: {
          statement: "Learners can contribute to or change the content.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "The content is pre-prepared and fixed. Learners can’t contribute to or change the content.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Navigational",
            id: "3",
          },
          100: {
            style: { color: "#212121" },
            label: "Manipulative",
            id: "3",
          },
        },
        userSelectedSliderPos: 18,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
      },
      {
        id: "4",
        chartID: "1",
        name: "Learning framework",
        type: "Practice",
        leftCard: {
          statement:
            "Learners perform set learning tasks using information provided.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "Learners explore the content and learning tasks in their own way.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Structured",
            id: "4",
          },
          50: {
            style: { color: "#212121" },
            label: "Guided",
            id: "4",
          },
          100: {
            style: { color: "#212121" },
            label: "Facilitated",
            id: "4",
          },
        },
        userSelectedSliderPos: 96,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
      },
      {
        id: "5",
        chartID: "1",
        name: "Learning control",
        type: "Practice",
        leftCard: {
          statement: "Statement 1.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement: "Statement 2.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Teacher-managed",
            id: "5",
          },
          100: {
            style: { color: "#212121" },
            label: "Student-managed",
            id: "5",
          },
        },
        userSelectedSliderPos: 28,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
      },
      {
        id: "6",
        chartID: "1",
        name: "Learning process",
        type: "Practice",
        leftCard: {
          statement: "Statement 1.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement: "Statement 2.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Reproduction",
            id: "6",
          },
          100: {
            style: { color: "#212121" },
            label: "Construction",
            id: "6",
          },
        },
        userSelectedSliderPos: 85,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
      },
      {
        id: "7",
        chartID: "1",
        name: "Feedback",
        type: "Practice",
        leftCard: {
          statement:
            "Students receive predetermined feedback that is built into learning activities.",
          anchorSliderPos: 50,
          isEditing: false,
        },
        rightCard: {
          statement:
            "Students receive personalised feedback to guide their learning.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Minimal",
            id: "7",
          },
          50: {
            style: { color: "#212121" },
            label: "Fixed",
            id: "7",
          },
          100: {
            style: { color: "#212121" },
            label: "Responsive",
            id: "7",
          },
        },
        userSelectedSliderPos: 27,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
      },
      {
        id: "8",
        chartID: "1",
        name: "Learning goals (Curriculum beliefs)",
        type: "Beliefs",
        leftCard: {
          statement:
            "Learning goals are clearly defined and can be linked to assessment clearly.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "Learning goals are open to interpretation and are not easily assessable.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Sharply focused",
            id: "8",
          },
          100: {
            style: { color: "#212121" },
            label: "Unfocused",
            id: "8",
          },
        },
        userSelectedSliderPos: 64,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
      },
      {
        id: "9",
        chartID: "1",
        name: "Dimension 10",
        type: "Beliefs",
        leftCard: {
          statement:
            "The curriculum or course content determines the learning goals of this course.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "Learners can determine (some or all of) the learning goals in this course.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Instructivist",
            id: "9",
          },
          100: {
            style: { color: "#212121" },
            label: "Constructivist",
            id: "9",
          },
        },
        userSelectedSliderPos: 50,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
      },
      {
        id: "10",
        chartID: "1",
        name: "Dimension 14",
        type: "Beliefs",
        leftCard: {
          statement:
            "For learning to occur in this course, the learning needs to happen ‘solo’, in private.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "For learning to occur in this course, the learning needs to happen together, in a learning community.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Personal",
            id: "10",
          },
          100: {
            style: { color: "#212121" },
            label: "Social",
            id: "10",
          },
        },
        userSelectedSliderPos: 38,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious.",
      },
    ],
  },
  {
    id: "2",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    dimensions: [
      {
        id: "11",
        chartID: "2",
        name: "Nature and purpose of learning tasks",
        type: "Practice",
        leftCard: {
          statement: "Statement 1.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement: "Statement 2.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Academic/abstract",
            id: "11",
          },
          100: {
            style: { color: "#212121" },
            label: "Authentic/experimental",
            id: "11",
          },
        },
        userSelectedSliderPos: 82,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
        id: "12",
        chartID: "2",
        name: "Degree of structure of learning tasks",
        type: "Practice",
        leftCard: {
          statement: "Learners can only do learning tasks in one way.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement: "Learners can do learning tasks in a variety of ways.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "High/constrained",
            id: "12",
          },
          100: {
            style: { color: "#212121" },
            label: "Low/open",
            id: "12",
          },
        },
        userSelectedSliderPos: 83,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
        id: "13",
        chartID: "2",
        name: "Interactivity",
        type: "Practice",
        leftCard: {
          statement: "Learners can contribute to or change the content.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "The content is pre-prepared and fixed. Learners can’t contribute to or change the content.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Navigational",
            id: "13",
          },
          100: {
            style: { color: "#212121" },
            label: "Manipulative",
            id: "13",
          },
        },
        userSelectedSliderPos: 86,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
        id: "14",
        chartID: "2",
        name: "Learning framework",
        type: "Practice",
        leftCard: {
          statement:
            "Learners perform set learning tasks using information provided.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "Learners explore the content and learning tasks in their own way.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Structured",
            id: "14",
          },
          50: {
            style: { color: "#212121" },
            label: "Guided",
            id: "14",
          },
          100: {
            style: { color: "#212121" },
            label: "Facilitated",
            id: "14",
          },
        },
        userSelectedSliderPos: 27,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
        id: "15",
        chartID: "2",
        name: "Learning control",
        type: "Practice",
        leftCard: {
          statement: "Statement 1.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement: "Statement 2.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Teacher-managed",
            id: "15",
          },
          10: {
            style: { color: "#212121" },
            label: "Student-managed",
            id: "15",
          },
        },
        userSelectedSliderPos: 27,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
        id: "16",
        chartID: "2",
        name: "Learning process",
        type: "Practice",
        leftCard: {
          statement: "Statement 1.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement: "Statement 2.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Reproduction",
            id: "16",
          },
          100: {
            style: { color: "#212121" },
            label: "Construction",
            id: "16",
          },
        },
        userSelectedSliderPos: 58,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
        id: "17",
        chartID: "2",
        name: "Feedback",
        type: "Practice",
        leftCard: {
          statement:
            "Students receive predetermined feedback that is built into learning activities.",
          anchorSliderPos: 50,
          isEditing: false,
        },
        rightCard: {
          statement:
            "Students receive personalised feedback to guide their learning.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Minimal",
            id: "17",
          },
          50: {
            style: { color: "#212121" },
            label: "Fixed",
            id: "17",
          },
          100: {
            style: { color: "#212121" },
            label: "Responsive",
            id: "17",
          },
        },
        userSelectedSliderPos: 100,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
        id: "18",
        chartID: "2",
        name: "Learning goals (Curriculum beliefs)",
        type: "Beliefs",
        leftCard: {
          statement:
            "Learning goals are clearly defined and can be linked to assessment clearly.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "Learning goals are open to interpretation and are not easily assessable.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Sharply focused",
            id: "18",
          },
          100: {
            style: { color: "#212121" },
            label: "Unfocused",
            id: "18",
          },
        },
        userSelectedSliderPos: 100,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
        id: "19",
        chartID: "2",
        name: "Dimension 10",
        type: "Beliefs",
        leftCard: {
          statement:
            "The curriculum or course content determines the learning goals of this course.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "Learners can determine (some or all of) the learning goals in this course.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Instructivist",
            id: "19",
          },
          100: {
            style: { color: "#212121" },
            label: "Constructivist",
            id: "19",
          },
        },
        userSelectedSliderPos: 100,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
        id: "20",
        chartID: "2",
        name: "Dimension 14",
        type: "Beliefs",
        leftCard: {
          statement:
            "For learning to occur in this course, the learning needs to happen ‘solo’, in private.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "For learning to occur in this course, the learning needs to happen together, in a learning community.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Personal",
            id: "20",
          },
          100: {
            style: { color: "#212121" },
            label: "Social",
            id: "20",
          },
        },
        userSelectedSliderPos: 10,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
    ],
  },
  {
    id: "3",
    createdAt: new Date(),
    dimensions: [
      {
        id: "21",
        chartID: "3",
        name: "Nature and purpose of learning tasks",
        type: "Practice",
        leftCard: {
          statement: "Statement 1.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement: "Statement 2.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Academic/abstract",
            id: "21",
          },
          100: {
            style: { color: "#212121" },
            label: "Authentic/experimental",
            id: "21",
          },
        },
        userSelectedSliderPos: 10,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
      },
      {
        id: "22",
        chartID: "3",
        name: "Degree of structure of learning tasks",
        type: "Practice",
        leftCard: {
          statement: "Learners can only do learning tasks in one way.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement: "Learners can do learning tasks in a variety of ways.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "High/constrained",
            id: "22",
          },
          100: {
            style: { color: "#212121" },
            label: "Low/open",
            id: "22",
          },
        },
        userSelectedSliderPos: 5,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
      },
      {
        id: "23",
        chartID: "3",
        name: "Interactivity",
        type: "Practice",
        leftCard: {
          statement: "Learners can contribute to or change the content.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "The content is pre-prepared and fixed. Learners can’t contribute to or change the content.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Navigational",
            id: "23",
          },
          100: {
            style: { color: "#212121" },
            label: "Manipulative",
            id: "23",
          },
        },
        userSelectedSliderPos: 85,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
      },
      {
        id: "24",
        chartID: "3",
        name: "Learning framework",
        type: "Practice",
        leftCard: {
          statement:
            "Learners perform set learning tasks using information provided.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "Learners explore the content and learning tasks in their own way.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Structured",
            id: "24",
          },
          50: {
            style: { color: "#212121" },
            label: "Guided",
            id: "24",
          },
          100: {
            style: { color: "#212121" },
            label: "Facilitated",
            id: "24",
          },
        },
        userSelectedSliderPos: 37,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
      },
      {
        id: "25",
        chartID: "3",
        name: "Learning control",
        type: "Practice",
        leftCard: {
          statement: "Statement 1.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement: "Statement 2.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Teacher-managed",
            id: "25",
          },
          100: {
            style: { color: "#212121" },
            label: "Student-managed",
            id: "25",
          },
        },
        userSelectedSliderPos: 29,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
      },
      {
        id: "26",
        chartID: "3",
        name: "Learning process",
        type: "Practice",
        leftCard: {
          statement: "Statement 1.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement: "Statement 2.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Reproduction",
            id: "26",
          },
          100: {
            style: { color: "#212121" },
            label: "Construction",
            id: "26",
          },
        },
        userSelectedSliderPos: 29,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
      },
      {
        id: "27",
        chartID: "3",
        name: "Feedback",
        type: "Practice",
        leftCard: {
          statement:
            "Students receive predetermined feedback that is built into learning activities.",
          anchorSliderPos: 50,
          isEditing: false,
        },
        rightCard: {
          statement:
            "Students receive personalised feedback to guide their learning.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Minimal",
            id: "27",
          },
          50: {
            style: { color: "#212121" },
            label: "Fixed",
            id: "27",
          },
          100: {
            style: { color: "#212121" },
            label: "Responsive",
            id: "27",
          },
        },
        userSelectedSliderPos: 18,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
      },
      {
        id: "28",
        chartID: "3",
        name: "Learning goals (Curriculum beliefs)",
        type: "Beliefs",
        leftCard: {
          statement:
            "Learning goals are clearly defined and can be linked to assessment clearly.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "Learning goals are open to interpretation and are not easily assessable.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Sharply focused",
            id: "28",
          },
          100: {
            style: { color: "#212121" },
            label: "Unfocused",
            id: "28",
          },
        },
        userSelectedSliderPos: 18,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
      },
      {
        id: "29",
        chartID: "3",
        name: "Dimension 10",
        type: "Beliefs",
        leftCard: {
          statement:
            "The curriculum or course content determines the learning goals of this course.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "Learners can determine (some or all of) the learning goals in this course.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Instructivist",
            id: "29",
          },
          100: {
            style: { color: "#212121" },
            label: "Constructivist",
            id: "29",
          },
        },
        userSelectedSliderPos: 18,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
      },
      {
        id: "30",
        chartID: "3",
        name: "Dimension 14",
        type: "Beliefs",
        leftCard: {
          statement:
            "For learning to occur in this course, the learning needs to happen ‘solo’, in private.",
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement:
            "For learning to occur in this course, the learning needs to happen together, in a learning community.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: {
            style: { color: "#212121" },
            label: "Personal",
            id: "30",
          },
          100: {
            style: { color: "#212121" },
            label: "Social",
            id: "30",
          },
        },
        userSelectedSliderPos: 10,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not",
      },
    ],
  },
];

export default charts;
