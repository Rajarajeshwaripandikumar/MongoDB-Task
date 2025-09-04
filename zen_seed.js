// zen_seed.js

db.users.insertMany([
  { userId: "U001", name: "Aisha",  email: "aisha@example.com",  batch: "Zen-Oct-2020", mentorId: "M001" },
  { userId: "U002", name: "Rahul", email: "rahul@example.com",  batch: "Zen-Oct-2020", mentorId: "M001" },
  { userId: "U003", name: "Priya",email: "priya@example.com",  batch: "Zen-Oct-2020", mentorId: "M002" },
  { userId: "U004", name: "Vikas", email: "vikas@example.com",  batch: "Zen-Oct-2020", mentorId: "M002" },
  { userId: "U005", name: "Meera",  email: "meera@example.com",  batch: "Zen-Oct-2020", mentorId: "M003" },
  { userId: "U006", name: "John",    email: "john@example.com",   batch: "Zen-Oct-2020", mentorId: "M003" },
  { userId: "U007", name: "Iyer",  email: "anita@example.com",  batch: "Zen-Oct-2020", mentorId: "M004" },
  { userId: "U008", name: "Suresh", email: "suresh@example.com", batch: "Zen-Oct-2020", mentorId: "M004" },
  { userId: "U009", name: "Kavita",  email: "kavita@example.com", batch: "Zen-Oct-2020", mentorId: "M005" },
  { userId: "U010", name: "Arjun", email: "arjun@example.com",  batch: "Zen-Oct-2020", mentorId: "M005" }
]);

// --- MENTORS (10) ---
db.mentors.insertMany([
  { mentorId: "M001", name: "Sundar",  expertise: ["MERN", "MongoDB"] },
  { mentorId: "M002", name: "Lakshmi", expertise: ["Python", "Django"] },
  { mentorId: "M003", name: "Kiran",   expertise: ["Java", "Spring Boot"] },
  { mentorId: "M004", name: "Deepa",   expertise: ["React", "Redux"] },
  { mentorId: "M005", name: "Anil",    expertise: ["Node.js", "Express"] },
  { mentorId: "M006", name: "Ramesh",  expertise: ["DevOps", "Docker"] },
  { mentorId: "M007", name: "Sneha",   expertise: ["Angular", "TypeScript"] },
  { mentorId: "M008", name: "Vivek",   expertise: ["AWS", "Cloud"] },
  { mentorId: "M009", name: "Neha",    expertise: ["AI", "ML"] },
  { mentorId: "M010", name: "Arvind",  expertise: ["Data Science", "Python"] }
]);

// --- TOPICS (10) ---
db.topics.insertMany([
  { topicId: "T001", title: "MongoDB Basics",             taughtOn: ISODate("2020-10-01T00:00:00Z") },
  { topicId: "T002", title: "MongoDB Aggregations",       taughtOn: ISODate("2020-10-05T00:00:00Z") },
  { topicId: "T003", title: "Node.js Intro",              taughtOn: ISODate("2020-10-10T00:00:00Z") },
  { topicId: "T004", title: "Express Framework",          taughtOn: ISODate("2020-10-12T00:00:00Z") },
  { topicId: "T005", title: "React Basics",               taughtOn: ISODate("2020-10-15T00:00:00Z") },
  { topicId: "T006", title: "React Hooks",                taughtOn: ISODate("2020-10-18T00:00:00Z") },
  { topicId: "T007", title: "Redux Fundamentals",         taughtOn: ISODate("2020-10-20T00:00:00Z") },
  { topicId: "T008", title: "Authentication with JWT",    taughtOn: ISODate("2020-10-22T00:00:00Z") },
  { topicId: "T009", title: "Deployment with Docker",     taughtOn: ISODate("2020-10-25T00:00:00Z") },
  { topicId: "T010", title: "CI/CD Basics",               taughtOn: ISODate("2020-10-28T00:00:00Z") }
]);

// --- TASKS (10) ---
// Note: TK005 and TK010 include submissions so Query #6 works out of the box.
db.tasks.insertMany([
  { taskId: "TK001", topicId: "T001", title: "CRUD Operations",       assignedOn: ISODate("2020-10-01T00:00:00Z"), dueOn: ISODate("2020-10-03T00:00:00Z") },
  { taskId: "TK002", topicId: "T002", title: "Aggregation Pipelines", assignedOn: ISODate("2020-10-05T00:00:00Z"), dueOn: ISODate("2020-10-07T00:00:00Z") },
  { taskId: "TK003", topicId: "T003", title: "Simple API with Node",  assignedOn: ISODate("2020-10-10T00:00:00Z"), dueOn: ISODate("2020-10-12T00:00:00Z") },
  { taskId: "TK004", topicId: "T004", title: "Routing with Express",  assignedOn: ISODate("2020-10-12T00:00:00Z"), dueOn: ISODate("2020-10-14T00:00:00Z") },
  { taskId: "TK005", topicId: "T005", title: "React Component",       assignedOn: ISODate("2020-10-15T00:00:00Z"), dueOn: ISODate("2020-10-17T00:00:00Z"),
    submissions: [
      { userId: "U001", status: "Submitted" }, { userId: "U002", status: "Submitted" },
      { userId: "U003", status: "Submitted" }, { userId: "U004", status: "Submitted" },
      { userId: "U005", status: "Submitted" }, { userId: "U006", status: "Submitted" },
      { userId: "U007", status: "Submitted" }, { userId: "U008", status: "Not Submitted" },
      { userId: "U009", status: "Submitted" }, { userId: "U010", status: "Submitted" }
    ]
  },
  { taskId: "TK006", topicId: "T006", title: "Hooks Example",         assignedOn: ISODate("2020-10-18T00:00:00Z"), dueOn: ISODate("2020-10-20T00:00:00Z") },
  { taskId: "TK007", topicId: "T007", title: "Redux Store",           assignedOn: ISODate("2020-10-20T00:00:00Z"), dueOn: ISODate("2020-10-22T00:00:00Z") },
  { taskId: "TK008", topicId: "T008", title: "JWT Auth",              assignedOn: ISODate("2020-10-22T00:00:00Z"), dueOn: ISODate("2020-10-24T00:00:00Z") },
  { taskId: "TK009", topicId: "T009", title: "Dockerize App",         assignedOn: ISODate("2020-10-25T00:00:00Z"), dueOn: ISODate("2020-10-27T00:00:00Z") },
  { taskId: "TK010", topicId: "T010", title: "Jenkins Pipeline",      assignedOn: ISODate("2020-10-28T00:00:00Z"), dueOn: ISODate("2020-10-30T00:00:00Z"),
    submissions: [
      { userId: "U001", status: "Submitted" }, { userId: "U002", status: "Submitted" },
      { userId: "U003", status: "Submitted" }, { userId: "U004", status: "Submitted" },
      { userId: "U005", status: "Submitted" }, { userId: "U006", status: "Submitted" },
      { userId: "U007", status: "Submitted" }, { userId: "U008", status: "Submitted" },
      { userId: "U009", status: "Submitted" }, { userId: "U010", status: "Not Submitted" }
    ]
  }
]);

// --- ATTENDANCE (10) ---
// Includes absences in the requested window for U008 (2020-10-15) and U010 (2020-10-20)
db.attendance.insertMany([
  { userId: "U001", date: ISODate("2020-10-01T00:00:00Z"), status: "Present" },
  { userId: "U002", date: ISODate("2020-10-01T00:00:00Z"), status: "Absent" },
  { userId: "U003", date: ISODate("2020-10-05T00:00:00Z"), status: "Present" },
  { userId: "U004", date: ISODate("2020-10-05T00:00:00Z"), status: "Absent" },
  { userId: "U005", date: ISODate("2020-10-10T00:00:00Z"), status: "Present" },
  { userId: "U006", date: ISODate("2020-10-10T00:00:00Z"), status: "Absent" },
  { userId: "U007", date: ISODate("2020-10-15T00:00:00Z"), status: "Present" },
  { userId: "U008", date: ISODate("2020-10-15T00:00:00Z"), status: "Absent" },
  { userId: "U009", date: ISODate("2020-10-20T00:00:00Z"), status: "Present" },
  { userId: "U010", date: ISODate("2020-10-20T00:00:00Z"), status: "Absent" }
]);

// --- CODEKATA (10) ---
db.codekata.insertMany([
  { userId: "U001", totalSolved: 100 },
  { userId: "U002", totalSolved: 80  },
  { userId: "U003", totalSolved: 95  },
  { userId: "U004", totalSolved: 70  },
  { userId: "U005", totalSolved: 60  },
  { userId: "U006", totalSolved: 85  },
  { userId: "U007", totalSolved: 110 },
  { userId: "U008", totalSolved: 55  },
  { userId: "U009", totalSolved: 65  },
  { userId: "U010", totalSolved: 75  }
]);

// --- COMPANY_DRIVES (10) ---
db.company_drives.insertMany([
  { company: "Walmart",    driveDate: ISODate("2020-10-15T00:00:00Z"), studentsAppeared: ["U001","U003","U005"] },
  { company: "Amazon",     driveDate: ISODate("2020-10-16T00:00:00Z"), studentsAppeared: ["U002","U004","U006"] },
  { company: "Google",     driveDate: ISODate("2020-10-18T00:00:00Z"), studentsAppeared: ["U001","U007","U009"] },
  { company: "Microsoft",  driveDate: ISODate("2020-10-20T00:00:00Z"), studentsAppeared: ["U002","U008","U010"] },
  { company: "Infosys",    driveDate: ISODate("2020-10-22T00:00:00Z"), studentsAppeared: ["U003","U005","U007"] },
  { company: "TCS",        driveDate: ISODate("2020-10-23T00:00:00Z"), studentsAppeared: ["U004","U006","U008"] },
  { company: "Accenture",  driveDate: ISODate("2020-10-25T00:00:00Z"), studentsAppeared: ["U001","U009","U010"] },
  { company: "Capgemini",  driveDate: ISODate("2020-10-27T00:00:00Z"), studentsAppeared: ["U002","U005","U007"] },
  { company: "Cognizant",  driveDate: ISODate("2020-10-29T00:00:00Z"), studentsAppeared: ["U003","U006","U008"] },
  { company: "Oracle",     driveDate: ISODate("2020-10-31T00:00:00Z"), studentsAppeared: ["U004","U009","U010"] }
]);