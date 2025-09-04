// zen_queries.js
// Run with:
// mongosh zen_class --file "C:\Users\Pandy\Desktop\zen_queries.js"

use("zen_class");

// 1️⃣ Topics & Tasks in October
print("\n1️⃣ Topics & Tasks in October");
db.topics.aggregate([
  { $match: { taughtOn: { $gte: ISODate("2020-10-01"), $lte: ISODate("2020-10-31") } } },
  { $lookup: { from: "tasks", localField: "topicId", foreignField: "topicId", as: "tasks" } },
  { $project: { _id:0, topicId:1, title:1, taughtOn:1, "tasks.taskId":1, "tasks.title":1, "tasks.dueOn":1 } }
]).forEach(printjson);

// 2️⃣ Company drives 15–31 Oct 2020
print("\n2️⃣ Company drives between 15–31 Oct 2020");
db.company_drives.find(
  { driveDate: { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") } },
  { _id:0, company:1, driveDate:1 }
).forEach(printjson);

// 3️⃣ Company drives + students appeared
print("\n3️⃣ Company drives + students appeared");
db.company_drives.aggregate([
  { $unwind: "$studentsAppeared" },
  { $lookup: { from: "users", localField: "studentsAppeared", foreignField: "userId", as: "student" } },
  { $unwind: "$student" },
  { $project: { _id:0, company:1, driveDate:1, "student.userId":1, "student.name":1 } }
]).forEach(printjson);

// 4️⃣ CodeKata totals
print("\n4️⃣ CodeKata totals");
db.codekata.aggregate([
  { $lookup: { from: "users", localField: "userId", foreignField: "userId", as: "u" } },
  { $unwind: "$u" },
  { $project: { _id:0, userId:1, name:"$u.name", totalSolved:1 } },
  { $sort: { totalSolved:-1 } }
]).forEach(printjson);

// 5️⃣ Mentors with mentees > 15
print("\n5️⃣ Mentors with mentees > 15");
db.users.aggregate([
  { $group: { _id: "$mentorId", menteeCount: { $sum: 1 } } },
  { $match: { menteeCount: { $gt: 15 } } },
  { $lookup: { from: "mentors", localField: "_id", foreignField: "mentorId", as: "mentor" } },
  { $unwind: { path: "$mentor", preserveNullAndEmptyArrays: true } },
  { $project: { _id:0, mentorId:"$_id", mentorName:"$mentor.name", menteeCount:1 } }
]).forEach(printjson);

// 6️⃣ Users absent & not submitted (15–31 Oct 2020)
print("\n6️⃣ Users absent & not submitted tasks (15–31 Oct 2020)");
db.users.aggregate([
  { $lookup: {
      from: "attendance",
      let: { uid: "$userId" },
      pipeline: [
        { $match: { $expr: { $and: [
          { $eq: ["$userId", "$$uid"] },
          { $eq: ["$status", "Absent"] },
          { $gte: ["$date", ISODate("2020-10-15")] },
          { $lte: ["$date", ISODate("2020-10-31")] }
        ] } } }
      ],
      as: "absences"
  }},
  { $addFields: { wasAbsent: { $gt: [ { $size: "$absences" }, 0 ] } } },
  { $lookup: {
      from: "tasks",
      let: { uid: "$userId" },
      pipeline: [
        { $match: { dueOn: { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") } } },
        { $addFields: { submissions: { $ifNull: ["$submissions", []] } } },
        { $addFields: {
          mySubs: { $filter: { input: "$submissions", as: "s", cond: { $eq: ["$$s.userId", "$$uid"] } } }
        }},
        { $addFields: {
          isNotSubmitted: {
            $or: [
              { $eq: [ { $size: "$mySubs" }, 0 ] },
              { $gt: [ { $size: { $filter: { input: "$mySubs", as: "ms", cond: { $eq: ["$$ms.status","Not Submitted"] } } } }, 0 ] }
            ]
          }
        }},
        { $match: { isNotSubmitted: true } }
      ],
      as: "missingTasks"
  }},
  { $addFields: { notSubmitted: { $gt: [ { $size: "$missingTasks" }, 0 ] } } },
  { $match: { wasAbsent: true, notSubmitted: true } },
  { $count: "usersAbsentAndNotSubmitted" }
]).forEach(printjson);

print("\n✅ All queries executed!");
