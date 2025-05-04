const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Insert sample students
router.get('/insert', async (req, res) => {
  await Student.insertMany([
    { Name: 'Alice', Roll_No: 101, WAD_Marks: 26, CC_Marks: 28, DSBDA_Marks: 30, CNS_Marks: 24, AI_marks: 27 },
    { Name: 'Bob', Roll_No: 102, WAD_Marks: 18, CC_Marks: 22, DSBDA_Marks: 19, CNS_Marks: 30, AI_marks: 24 },
    { Name: 'Charlie', Roll_No: 103, WAD_Marks: 31, CC_Marks: 35, DSBDA_Marks: 29, CNS_Marks: 26, AI_marks: 30 },
    { Name: 'David', Roll_No: 104, WAD_Marks: 25, CC_Marks: 20, DSBDA_Marks: 26, CNS_Marks: 20, AI_marks: 19 },
    { Name: 'Eva', Roll_No: 105, WAD_Marks: 40, CC_Marks: 42, DSBDA_Marks: 41, CNS_Marks: 38, AI_marks: 45 }
  ]);
  res.redirect('/students');
});

// View all students
router.get('/', async (req, res) => {
  const students = await Student.find();
  const count = await Student.countDocuments();
  res.render('index', { students, count });
});

// Insert a student
router.post('/insert', async (req, res) => {
  const { Name, Roll_No, WAD_Marks, CC_Marks, DSBDA_Marks, CNS_Marks, AI_marks } = req.body;
  const newStudent = new Student({ Name, Roll_No, WAD_Marks, CC_Marks, DSBDA_Marks, CNS_Marks, AI_marks });
  await newStudent.save();
  res.redirect('/students');
});

// Update a student's data by Roll No
router.post('/update', async (req, res) => {
  const { roll, Name, WAD_Marks, CC_Marks, DSBDA_Marks, CNS_Marks, AI_marks } = req.body;
  const student = await Student.findOne({ Roll_No: roll });
  if (student) {
    student.Name = Name;
    student.WAD_Marks = WAD_Marks;
    student.CC_Marks = CC_Marks;
    student.DSBDA_Marks = DSBDA_Marks;
    student.CNS_Marks = CNS_Marks;
    student.AI_marks = AI_marks;
    await student.save();
  }
  res.redirect('/students');
});

// DSBDA > custom value
router.get('/dsbda', async (req, res) => {
  const { marks } = req.query;
  const students = await Student.find({ DSBDA_Marks: { $gt: marks } });
  const count = await Student.countDocuments();
  res.render('index', { students, count });
});

// All subjects > custom value
router.get('/above', async (req, res) => {
  const { marks } = req.query;
  const students = await Student.find({
    WAD_Marks: { $gt: marks },
    CC_Marks: { $gt: marks },
    DSBDA_Marks: { $gt: marks },
    CNS_Marks: { $gt: marks },
    AI_marks: { $gt: marks }
  });
  const count = await Student.countDocuments();
  res.render('index', { students, count });
});

// WAD & CNS < custom value
router.get('/below', async (req, res) => {
  const { marks } = req.query;
  const students = await Student.find({
    WAD_Marks: { $lt: marks },
    CNS_Marks: { $lt: marks }
  });
  const count = await Student.countDocuments();
  res.render('index', { students, count });
});

// Delete a student by Roll No
router.post('/delete', async (req, res) => {
  await Student.deleteOne({ Roll_No: req.body.roll });
  res.redirect('/students');
});

// Show all students (no filter)
router.get('/all', async (req, res) => {
    const students = await Student.find();
    const count = await Student.countDocuments();
    res.render('index', { students, count });
  });
  
  // Update marks of a student by 10 for a specific subject or all subjects
  router.post('/updateMarks', async (req, res) => {
    const { roll, subject, allSubjects } = req.body;
    const student = await Student.findOne({ Roll_No: roll });
  
    if (student) {
      if (allSubjects === 'true') {
        student.WAD_Marks += 10;
        student.CC_Marks += 10;
        student.DSBDA_Marks += 10;
        student.CNS_Marks += 10;
        student.AI_marks += 10;
      } else if (subject) {
        student[subject] += 10;
      }
      await student.save();
    }
  
    res.redirect('/students');
  });
  

module.exports = router;
