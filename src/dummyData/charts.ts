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
          anchorSliderPos: 0,
          isEditing: false,
        },
        rightCard: {
          statement: "Statement 2.",
          anchorSliderPos: 100,
          isEditing: false,
        },
        marks: {
          0: "Academic/abstract",
          100: "Authentic/experimental",
        },
        userSelectedSliderPos: -1,
        userExplanation: undefined,
      },
      {
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
          0: "High/constrained",
          100: "Low/open",
        },
        userSelectedSliderPos: -1,
        userExplanation: undefined,
      },
      {
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
          0: "Navigational",
          100: "Manipulative",
        },
        userSelectedSliderPos: -1,
        userExplanation: undefined,
      },
      {
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
          0: "Structured",
          50: "Guided",
          100: "Facilitated",
        },
        userSelectedSliderPos: -1,
        userExplanation: undefined,
      },
      {
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
          0: "Teacher-managed",
          100: "Student-managed",
        },
        userSelectedSliderPos: -1,
        userExplanation: undefined,
      },
      {
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
          0: "Reproduction",
          100: "Construction",
        },
        userSelectedSliderPos: -1,
        userExplanation: undefined,
      },
      {
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
          0: "Minimal",
          50: "Fixed",
          100: "Responsive",
        },
        userSelectedSliderPos: -1,
        userExplanation: undefined,
      },
      {
        name: "Learning goals (Curriculum beliefs)",
        type: "Belief",
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
          0: "Sharply focused",
          100: "Unfocused",
        },
        userSelectedSliderPos: -1,
        userExplanation: undefined,
      },
      {
        name: "Dimension 10",
        type: "Belief",
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
          0: "Instructivist",
          100: "Constructivist",
        },
        userSelectedSliderPos: -1,
        userExplanation: undefined,
      },
      {
        name: "Dimension 14",
        type: "Belief",
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
          0: "Personal",
          100: "Social",
        },
        userSelectedSliderPos: -1,
        userExplanation: undefined,
      },
    ],
  },
  {
    id: "2",
    courseID: "2",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    dimensions: [
      {
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
          0: "Academic/abstract",
          100: "Authentic/experimental",
        },
        userSelectedSliderPos: 20,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
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
          0: "High/constrained",
          100: "Low/open",
        },
        userSelectedSliderPos: 30,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
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
          0: "Navigational",
          100: "Manipulative",
        },
        userSelectedSliderPos: 40,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
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
          0: "Structured",
          50: "Guided",
          100: "Facilitated",
        },
        userSelectedSliderPos: 50,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
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
          0: "Teacher-managed",
          100: "Student-managed",
        },
        userSelectedSliderPos: 60,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
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
          0: "Reproduction",
          100: "Construction",
        },
        userSelectedSliderPos: 70,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
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
          0: "Minimal",
          50: "Fixed",
          100: "Responsive",
        },
        userSelectedSliderPos: 20,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
        name: "Learning goals (Curriculum beliefs)",
        type: "Belief",
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
          0: "Sharply focused",
          100: "Unfocused",
        },
        userSelectedSliderPos: 30,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
        name: "Dimension 10",
        type: "Belief",
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
          0: "Instructivist",
          100: "Constructivist",
        },
        userSelectedSliderPos: 40,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
      {
        name: "Dimension 14",
        type: "Belief",
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
          0: "Personal",
          100: "Social",
        },
        userSelectedSliderPos: 50,
        userExplanation:
          "Monocle ipsum dolor sit amet charming Marylebone bulletin cutting-edge hub intricate bureaux St Moritz. Classic craftsmanship Marylebone boutique, cosy concierge Ettinger hand-crafted Zürich sophisticated Toto bulletin emerging. Marylebone quality of life Airbus A380 remarkable cutting-edge punctual alluring Beams eclectic. St Moritz exclusive Gaggenau carefully curated Sunspel cutting-edge intricate.",
      },
    ],
  },
  {
    id: "3",
    courseID: "2",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    dimensions: [
      {
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
          0: "Academic/abstract",
          100: "Authentic/experimental",
        },
        userSelectedSliderPos: 10,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not looking for a penpal making lasagna from scratch Portlandia road trips I don't really like talking about myself. My goofy smile whatever topic is on NPR On The Road fixing my scooter Doctor Who long-term dating.",
      },
      {
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
          0: "High/constrained",
          100: "Low/open",
        },
        userSelectedSliderPos: 20,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not looking for a penpal making lasagna from scratch Portlandia road trips I don't really like talking about myself. My goofy smile whatever topic is on NPR On The Road fixing my scooter Doctor Who long-term dating.",
      },
      {
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
          0: "Navigational",
          100: "Manipulative",
        },
        userSelectedSliderPos: 30,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not looking for a penpal making lasagna from scratch Portlandia road trips I don't really like talking about myself. My goofy smile whatever topic is on NPR On The Road fixing my scooter Doctor Who long-term dating.",
      },
      {
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
          0: "Structured",
          50: "Guided",
          100: "Facilitated",
        },
        userSelectedSliderPos: 40,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not looking for a penpal making lasagna from scratch Portlandia road trips I don't really like talking about myself. My goofy smile whatever topic is on NPR On The Road fixing my scooter Doctor Who long-term dating.",
      },
      {
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
          0: "Teacher-managed",
          100: "Student-managed",
        },
        userSelectedSliderPos: 50,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not looking for a penpal making lasagna from scratch Portlandia road trips I don't really like talking about myself. My goofy smile whatever topic is on NPR On The Road fixing my scooter Doctor Who long-term dating.",
      },
      {
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
          0: "Reproduction",
          100: "Construction",
        },
        userSelectedSliderPos: 60,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not looking for a penpal making lasagna from scratch Portlandia road trips I don't really like talking about myself. My goofy smile whatever topic is on NPR On The Road fixing my scooter Doctor Who long-term dating.",
      },
      {
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
          0: "Minimal",
          50: "Fixed",
          100: "Responsive",
        },
        userSelectedSliderPos: 70,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not looking for a penpal making lasagna from scratch Portlandia road trips I don't really like talking about myself. My goofy smile whatever topic is on NPR On The Road fixing my scooter Doctor Who long-term dating.",
      },
      {
        name: "Learning goals (Curriculum beliefs)",
        type: "Belief",
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
          0: "Sharply focused",
          100: "Unfocused",
        },
        userSelectedSliderPos: 80,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not looking for a penpal making lasagna from scratch Portlandia road trips I don't really like talking about myself. My goofy smile whatever topic is on NPR On The Road fixing my scooter Doctor Who long-term dating.",
      },
      {
        name: "Dimension 10",
        type: "Belief",
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
          0: "Instructivist",
          100: "Constructivist",
        },
        userSelectedSliderPos: 90,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not looking for a penpal making lasagna from scratch Portlandia road trips I don't really like talking about myself. My goofy smile whatever topic is on NPR On The Road fixing my scooter Doctor Who long-term dating.",
      },
      {
        name: "Dimension 14",
        type: "Belief",
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
          0: "Personal",
          100: "Social",
        },
        userSelectedSliderPos: 30,
        userExplanation:
          "Parallel parking video games playing my guitar snowboarding. Mountain biking Family Guy local sports teams exploring the city local sports teams, not looking for a penpal making lasagna from scratch Portlandia road trips I don't really like talking about myself. My goofy smile whatever topic is on NPR On The Road fixing my scooter Doctor Who long-term dating.",
      },
    ],
  },
  {
    id: "4",
    courseID: "2",
    createdAt: new Date(),
    dimensions: [
      {
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
          0: "Academic/abstract",
          100: "Authentic/experimental",
        },
        userSelectedSliderPos: 10,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious. ",
      },
      {
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
          0: "High/constrained",
          100: "Low/open",
        },
        userSelectedSliderPos: 30,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious. ",
      },
      {
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
          0: "Navigational",
          100: "Manipulative",
        },
        userSelectedSliderPos: 20,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious. ",
      },
      {
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
          0: "Structured",
          50: "Guided",
          100: "Facilitated",
        },
        userSelectedSliderPos: 60,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious. ",
      },
      {
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
          0: "Teacher-managed",
          100: "Student-managed",
        },
        userSelectedSliderPos: 40,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious. ",
      },
      {
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
          0: "Reproduction",
          100: "Construction",
        },
        userSelectedSliderPos: 60,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious. ",
      },
      {
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
          0: "Minimal",
          50: "Fixed",
          100: "Responsive",
        },
        userSelectedSliderPos: 30,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious. ",
      },
      {
        name: "Learning goals (Curriculum beliefs)",
        type: "Belief",
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
          0: "Sharply focused",
          100: "Unfocused",
        },
        userSelectedSliderPos: 90,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious. ",
      },
      {
        name: "Dimension 10",
        type: "Belief",
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
          0: "Instructivist",
          100: "Constructivist",
        },
        userSelectedSliderPos: 20,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious. ",
      },
      {
        name: "Dimension 14",
        type: "Belief",
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
          0: "Personal",
          100: "Social",
        },
        userSelectedSliderPos: 30,
        userExplanation:
          "No borders, no limits… go ahead, touch the Cornballer… you know best? Let's make Ann the backup, okay? Very good way to think about her, as a backup. If you're suggesting I play favorites, you're wrong. I love all of my children equally. I don't care for Gob. No, I was ashamed to be SEEN with you. I like being WITH you. After all, why should you go to jail for a crime somebody else noticed? I guess you can say I'm buy-curious. ",
      },
    ],
  },
];

export default charts;
