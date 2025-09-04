// run_queries.js
// Usage:
//   1) npm init -y
//   2) npm install mongodb
//   3) node run_queries.js
//
// Set MONGODB_URI in env if not localhost:27017
// Exports: prints all requested query results to console.

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'zen_class';

async function seedIfEmpty(db) {
  const names = ['users','mentors','topics','tasks','attendance','codekata','company_drives'];
  const counts = await Promise.all(names.map(n => db.collection(n).countDocuments().catch(() => 0)));
  const total = counts.reduce((a,b)=>a+b,0);
  if (total > 0) {
    console.log(`ℹ️ Seed skipped (collections already contain ${total} docs).`);
    return;
  }
  console.log('🌱 Seeding database...');

  const users = [
    { userId: "U001", name: "Aisha Khan",  email: "aisha@example.com",  batch: "Zen-Oct-2020", mentorId: "M001" },
    { userId: "U002", name: "Rahul Verma", email: "rahul@example.com",  batch: "Zen-Oct-2020", mentorId: "M001" },
    { userId: "U003", name: "Priya Sharma",email: "priya@example.com",  batch: "Zen-Oct-2020", mentorId: "M002" },
    { userId: "U004", name: "Vikas Singh", email: "vikas@example.com",  batch: "Zen-Oct-2020", mentorId: "M002" },
    { userId: "U005", name: "Meera Nair",  email: "meera@example.com",  batch: "Zen-Oct-2020", mentorId: "M003" },
    { userId: "U006", name: "John Doe",    email: "john@example.com",   batch: "Zen-Oct-2020", mentorId: "M003" },
    { userId: "U007", name: "Anita Iyer",  email: "anita@example.com",  batch: "Zen-Oct-2020", mentorId: "M004" },
    { userId: "U008", name: "Suresh Patil",email: "suresh@example.com", batch: "Zen-Oct-2020", mentorId: "M004" },
    { userId: "U009", name: "Kavita Das",  email: "kavita@example.com", batch: "Zen-Oct-2020", mentorId: "M005" },
    { userId: "U010", name: "Arjun Reddy", email: "arjun@example.com",  batch: "Zen-Oct-2020", mentorId: "M005" }
  ];

  const mentors = [
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
  ];

  const topics = [
    { topicId: "T001", title: "MongoDB Basics",             taughtOn: new Date("2020-10-01T00:00:00Z") },
    { topicId: "T002", title: "MongoDB Aggregations",       taughtOn: new Date("2020-10-05T00:00:00Z") },
    { topicId: "T003", title: "Node.js Intro",              taughtOn: new Date("2020-10-10T00:00:00Z") },
    { topicId: "T004", title: "Express Framework",          taughtOn: new Date("2020-10-12T00:00:00Z") },
    { topicId: "T005", title: "React Basics",               taughtOn: new Date("2020-10-15T00:00:00Z") },
    { topicId: "T006", title: "React Hooks",                taughtOn: new Date("2020-10-18T00:00:00Z") },
    { topicId: "T007", title: "Redux Fundamentals",         taughtOn: new Date("2020-10-20T00:00:00Z") },
    { topicId: "T008", title: "Authentication with JWT",    taughtOn: new Date("2020-10-22T00:00:00Z") },
    { topicId: "T009", title: "Deployment with Docker",     taughtOn: new Date("2020-10-25T00:00:00Z") },
    { topicId: "T010", title: "CI/CD Basics",               taughtOn: new Date("2020-10-28T00:00:00Z") }
  ];

  const tasks = [
    { taskId: "TK001", topicId: "T001", title: "CRUD Operations",       assignedOn: new Date("2020-10-01T00:00:00Z"), dueOn: new Date("2020-10-03T00:00:00Z") },
    { taskId: "TK002", topicId: "T002", title: "Aggregation Pipelines", assignedOn: new Date("2020-10-05T00:00:00Z"), dueOn: new Date("2020-10-07T00:00:00Z") },
    { taskId: "TK003", topicId: "T003", title: "Simple API with Node",  assignedOn: new Date("2020-10-10T00:00:00Z"), dueOn: new Date("2020-10-12T00:00:00Z") },
    { taskId: "TK004", topicId: "T004", title: "Routing with Express",  assignedOn: new Date("2020-10-12T00:00:00Z"), dueOn: new Date("2020-10-14T00:00:00Z") },
    { taskId: "TK005", topicId: "T005", title: "React Component",       assignedOn: new Date("2020-10-15T00:00:00Z"), dueOn: new Date("2020-10-17T00:00:00Z"),
      submissions: [
        { userId: "U001", status: "Submitted" }, { userId: "U002", status: "Submitted" },
        { userId: "U003", status: "Submitted" }, { userId: "U004", status: "Submitted" },
        { userId: "U005", status: "Submitted" }, { userId: "U006", status: "Submitted" },
        { userId: "U007", status: "Submitted" }, { userId: "U008", status: "Not Submitted" },
        { userId: "U009", status: "Submitted" }, { userId: "U010", status: "Submitted" }
      ]
    },
    { taskId: "TK006", topicId: "T006", title: "Hooks Example",         assignedOn: new Date("2020-10-18T00:00:00Z"), dueOn: new Date("2020-10-20T00:00:00Z") },
    { taskId: "TK007", topicId: "T007", title: "Redux Store",           assignedOn: new Date("2020-10-20T00:00:00Z"), dueOn: new Date("2020-10-22T00:00:00Z") },
    { taskId: "TK008", topicId: "T008", title: "JWT Auth",              assignedOn: new Date("2020-10-22T00:00:00Z"), dueOn: new Date("2020-10-24T00:00:00Z") },
    { taskId: "TK009", topicId: "T009", title: "Dockerize App",         assignedOn: new Date("2020-10-25T00:00:00Z"), dueOn: new Date("2020-10-27T00:00:00Z") },
    { taskId: "TK010", topicId: "T010", title: "Jenkins Pipeline",      assignedOn: new Date("2020-10-28T00:00:00Z"), dueOn: new Date("2020-10-30T00:00:00Z"),
      submissions: [
        { userId: "U001", status: "Submitted" }, { userId: "U002", status: "Submitted" },
        { userId: "U003", status: "Submitted" }, { userId: "U004", status: "Submitted" },
        { userId: "U005", status: "Submitted" }, { userId: "U006", status: "Submitted" },
        { userId: "U007", status: "Submitted" }, { userId: "U008", status: "Submitted" },
        { userId: "U009", status: "Submitted" }, { userId: "U010", status: "Not Submitted" }
      ]
    }
  ];

  const attendance = [
    { userId: "U001", date: new Date("2020-10-01T00:00:00Z"), status: "Present" },
    { userId: "U002", date: new Date("2020-10-01T00:00:00Z"), status: "Absent" },
    { userId: "U003", date: new Date("2020-10-05T00:00:00Z"), status: "Present" },
    { userId: "U004", date: new Date("2020-10-05T00:00:00Z"), status: "Absent" },
    { userId: "U005", date: new Date("2020-10-10T00:00:00Z"), status: "Present" },
    { userId: "U006", date: new Date("2020-10-10T00:00:00Z"), status: "Absent" },
    { userId: "U007", date: new Date("2020-10-15T00:00:00Z"), status: "Present" },
    { userId: "U008", date: new Date("2020-10-15T00:00:00Z"), status: "Absent" },
    { userId: "U009", date: new Date("2020-10-20T00:00:00Z"), status: "Present" },
    { userId: "U010", date: new Date("2020-10-20T00:00:00Z"), status: "Absent" }
  ];

  const codekata = [
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
  ];

  const drives = [
    { company: "Walmart",    driveDate: new Date("2020-10-15T00:00:00Z"), studentsAppeared: ["U001","U003","U005"] },
    { company: "Amazon",     driveDate: new Date("2020-10-16T00:00:00Z"), studentsAppeared: ["U002","U004","U006"] },
    { company: "Google",     driveDate: new Date("2020-10-18T00:00:00Z"), studentsAppeared: ["U001","U007","U009"] },
    { company: "Microsoft",  driveDate: new Date("2020-10-20T00:00:00Z"), studentsAppeared: ["U002","U008","U010"] },
    { company: "Infosys",    driveDate: new Date("2020-10-22T00:00:00Z"), studentsAppeared: ["U003","U005","U007"] },
    { company: "TCS",        driveDate: new Date("2020-10-23T00:00:00Z"), studentsAppeared: ["U004","U006","U008"] },
    { company: "Accenture",  driveDate: new Date("2020-10-25T00:00:00Z"), studentsAppeared: ["U001","U009","U010"] },
    { company: "Capgemini",  driveDate: new Date("2020-10-27T00:00:00Z"), studentsAppeared: ["U002","U005","U007"] },
    { company: "Cognizant",  driveDate: new Date("2020-10-29T00:00:00Z"), studentsAppeared: ["U003","U006","U008"] },
    { company: "Oracle",     driveDate: new Date("2020-10-31T00:00:00Z"), studentsAppeared: ["U004","U009","U010"] }
  ];

  await db.collection('users').insertMany(users);
  await db.collection('mentors').insertMany(mentors);
  await db.collection('topics').insertMany(topics);
  await db.collection('tasks').insertMany(tasks);
  await db.collection('attendance').insertMany(attendance);
  await db.collection('codekata').insertMany(codekata);
  await db.collection('company_drives').insertMany(drives);

  // helpful indexes
  await db.collection('users').createIndex({ userId: 1 }, { unique: true }).catch(()=>{});
  await db.collection('mentors').createIndex({ mentorId: 1 }, { unique: true }).catch(()=>{});
  await db.collection('topics').createIndex({ taughtOn: 1 }).catch(()=>{});
  await db.collection('tasks').createIndex({ dueOn: 1 }).catch(()=>{});
  await db.collection('tasks').createIndex({ topicId: 1 }).catch(()=>{});
  await db.collection('tasks').createIndex({ "submissions.userId": 1 }).catch(()=>{});
  await db.collection('attendance').createIndex({ date: 1, userId: 1 }).catch(()=>{});
  await db.collection('codekata').createIndex({ userId: 1 }, { unique: true }).catch(()=>{});
  await db.collection('company_drives').createIndex({ driveDate: 1 }).catch(()=>{});

  console.log('✅ Seed complete');
}

async function runQueries(db) {
  const topicsTasks = await db.collection('topics').aggregate([
    { $match: { taughtOn: { $gte: new Date("2020-10-01T00:00:00Z"), $lte: new Date("2020-10-31T23:59:59Z") } } },
    { $lookup: { from: 'tasks', localField: 'topicId', foreignField: 'topicId', as: 'tasks' } },
    { $project: { _id:0, topicId:1, title:1, taughtOn:1, "tasks.taskId":1, "tasks.title":1, "tasks.assignedOn":1, "tasks.dueOn":1 } }
  ]).toArray();

  const drivesRange = await db.collection('company_drives').find(
    { driveDate: { $gte: new Date("2020-10-15T00:00:00Z"), $lte: new Date("2020-10-31T23:59:59Z") } },
    { projection: { _id:0, company:1, driveDate:1 } }
  ).toArray();

  const drivesWithStudents = await db.collection('company_drives').aggregate([
    { $unwind: "$studentsAppeared" },
    { $lookup: { from: "users", localField: "studentsAppeared", foreignField: "userId", as: "student" } },
    { $unwind: "$student" },
    { $project: { _id:0, company:1, driveDate:1, "student.userId":1, "student.name":1 } },
    { $sort: { driveDate: 1, company: 1, "student.name": 1 } }
  ]).toArray();

  const codekataTotals = await db.collection('codekata').aggregate([
    { $lookup: { from: "users", localField: "userId", foreignField: "userId", as: "u" } },
    { $unwind: "$u" },
    { $project: { _id:0, userId:1, name:"$u.name", totalSolved:1 } },
    { $sort: { totalSolved: -1 } }
  ]).toArray();

  const mentorsOver15 = await db.collection('users').aggregate([
    { $match: { mentorId: { $type: "string", $ne: "" } } },
    { $group: { _id: { $trim: { input: "$mentorId" } }, menteeCount: { $sum: 1 } } },
    { $match: { menteeCount: { $gt: 15 } } },
    { $lookup: { from: "mentors", localField: "_id", foreignField: "mentorId", as: "mentor" } },
    { $unwind: { path: "$mentor", preserveNullAndEmptyArrays: true } },
    { $project: { _id:0, mentorId:"$_id", mentorName:"$mentor.name", menteeCount:1 } },
    { $sort: { menteeCount: -1, mentorId: 1 } }
  ]).toArray();

  // Absent + Not Submitted in window (count + list)
  const absentNotSubmittedCount = await db.collection('users').aggregate([
    { $lookup: {
        from: "attendance",
        let: { uid: "$userId" },
        pipeline: [
          { $match: { $expr: {
            $and: [
              { $eq: ["$userId", "$$uid"] },
              { $eq: ["$status", "Absent"] },
              { $gte: ["$date", new Date("2020-10-15T00:00:00Z")] },
              { $lte: ["$date", new Date("2020-10-31T23:59:59Z")] }
            ]
          } } }
        ],
        as: "absences"
    }},
    { $addFields: { wasAbsent: { $gt: [ { $size: "$absences" }, 0 ] } } },
    { $lookup: {
        from: "tasks",
        let: { uid: "$userId" },
        pipeline: [
          { $match: {
            dueOn: { $gte: new Date("2020-10-15T00:00:00Z"), $lte: new Date("2020-10-31T23:59:59Z") }
          } },
          { $addFields: { submissions: { $ifNull: ["$submissions", []] } } },
          { $addFields: {
            mySubs: { $filter: { input: "$submissions", as: "s", cond: { $eq: ["$$s.userId", "$$uid"] } } }
          } },
          { $addFields: {
            isNotSubmitted: {
              $or: [
                { $eq: [ { $size: "$mySubs" }, 0 ] },
                { $gt: [ { $size: { $filter: { input: "$mySubs", as: "ms", cond: { $eq: ["$$ms.status", "Not Submitted"] } } } }, 0 ] }
              ]
            }
          } },
          { $match: { isNotSubmitted: true } },
          { $project: { _id:0, taskId:1 } }
        ],
        as: "missingTasks"
    }},
    { $addFields: { notSubmitted: { $gt: [ { $size: "$missingTasks" }, 0 ] } } },
    { $match: { wasAbsent: true, notSubmitted: true } },
    { $count: "usersAbsentAndNotSubmitted" }
  ]).toArray();

  const absentNotSubmittedList = await db.collection('users').aggregate([
    { $lookup: {
        from: "attendance",
        let: { uid: "$userId" },
        pipeline: [
          { $match: { $expr: {
            $and: [
              { $eq: ["$userId", "$$uid"] },
              { $eq: ["$status", "Absent"] },
              { $gte: ["$date", new Date("2020-10-15T00:00:00Z")] },
              { $lte: ["$date", new Date("2020-10-31T23:59:59Z")] }
            ]
          } } }
        ],
        as: "absences"
    }},
    { $addFields: { wasAbsent: { $gt: [ { $size: "$absences" }, 0 ] } } },
    { $lookup: {
        from: "tasks",
        let: { uid: "$userId" },
        pipeline: [
          { $match: {
            dueOn: { $gte: new Date("2020-10-15T00:00:00Z"), $lte: new Date("2020-10-31T23:59:59Z") }
          } },
          { $addFields: { submissions: { $ifNull: ["$submissions", []] } } },
          { $addFields: {
            mySubs: { $filter: { input: "$submissions", as: "s", cond: { $eq: ["$$s.userId", "$$uid"] } } }
          } },
          { $addFields: {
            isNotSubmitted: {
              $or: [
                { $eq: [ { $size: "$mySubs" }, 0 ] },
                { $gt: [ { $size: { $filter: { input: "$mySubs", as: "ms", cond: { $eq: ["$$ms.status", "Not Submitted"] } } } }, 0 ] }
              ]
            }
          } },
          { $match: { isNotSubmitted: true } }
        ],
        as: "missingTasks"
    }},
    { $addFields: { notSubmitted: { $gt: [ { $size: "$missingTasks" }, 0 ] } } },
    { $match: { wasAbsent: true, notSubmitted: true } },
    { $project: { _id:0, userId:1, name:1 } }
  ]).toArray();

  console.log("---- Topics & Tasks in Oct 2020 ----");
  console.dir(topicsTasks, { depth: null });

  console.log("---- Company drives 15-31 Oct 2020 ----");
  console.dir(drivesRange, { depth: null });

  console.log("---- Company drives + students appeared ----");
  console.dir(drivesWithStudents, { depth: null });

  console.log("---- CodeKata totals ----");
  console.dir(codekataTotals, { depth: null });

  console.log("---- Mentors with menteeCount > 15 ----");
  console.dir(mentorsOver15, { depth: null });

  console.log("---- Absent & Not Submitted (count) ----");
  console.dir(absentNotSubmittedCount, { depth: null });

  console.log("---- Absent & Not Submitted (list) ----");
  console.dir(absentNotSubmittedList, { depth: null });
}

(async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    await seedIfEmpty(db);
    await runQueries(db);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
})();
