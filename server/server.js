const read = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const RecruiterSchema = require('./models/Recruiters');
const JobSchema = require('./models/Jobs');
const StudentSchema = require('./models/Students');
const InstructorSchema = require('./models/Instructors');
const ResumeSchema = require('./models/Resumes');

const mongoose = require('mongoose');

const ObjectID = require('mongodb').ObjectID;
// const ObjectId = mongoose.Types.ObjectId;

const port = process.env.PORT || 3001;


// --------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,OPTIONS,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

var url = 'mongodb://admin:!Hackerbandits@ds231360.mlab.com:31360/job_placement';

mongoose.connect(url, function (err) {
  if (err) throw err;
  console.log('mLab is now connected to MongoDB');
});

const Recruiter = mongoose.model('Recruiter', RecruiterSchema);
const Student = mongoose.model('Student', StudentSchema);
const Job = mongoose.model('Job', JobSchema);
const Instructor = mongoose.model('Instructor', InstructorSchema);
const Resume = mongoose.model('Resume', ResumeSchema);

// Singular, not pularlized models declared here for Referencing in other schemas
// Be sure to import in order to work

// student sign up page --------------------------------------------------------

app.post('/student/signup', (req, res) => {
  console.log('in /student/signup, req.body sent is :\n', req.body)
  var student = new Student(req.body);
  console.log('student created is \n', student);

  student.save(function (err, r) {
    if (err) {
      res.send(err)
    }
    res.json(student)
  })

});

// ****** Get all students from Postman *******

app.get('/student', (req, res) => {
  Student.find((err, students) => {
    if (err)
      res.send(err);
    res.json(students);
  })
});

// get the student with that id (accessed at GET http://localhost:3001/student/:student_id)
app.get('/student/:student_id', (req, res) => {
  Student.findById(req.params.student_id, (err, student) => {
    if (err)
      res.send(err);
    res.json(student);
  });
});

// student update account form PUT ---------------------------------------------------
// be sure to set values in Postman if testing with Postman under the Body tab below the url path bar

app.put('/student/:student_id', (req, res) => {
  Student.findById(req.params.student_id, (err, student) => {

    // updating student info
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.email = req.body.email;
    student.password = req.body.password;
    student.savedJobs = req.body.savedJobs;
    student.fieldOfStudy = req.body.fieldOfStudy;
    student.skills = req.body.skills;

    // save info
    student.save((err) => {
      if (err)
        res.send(err);

      res.json({ message: 'Student account information updated.' });
    });

  });
});

// RESUME START ----------------------------------------------------------------------->

// get all resumes

app.get('/resume', (req, res) => {
  Resume.find((err, resumes) => {
    if (err)
      res.send(err);
    console.log('resumes are ', resumes)
    res.json(resumes);
  })
});

// get individual resume

app.get('/resume/:resume_id', (req, res) => {
  Student.findById(req.params.resume_id, (err, resume) => {
    if (err)
      res.send(err);
    res.json(resume);
  });
});

app.post('/resume/post', (req, res) => {
  console.log('in /resume/post, req.body sent is :\n', req.body);
  var resume = new Resume(req.body);
  console.log('resume created is \n', resume);

  resume.save(function (err, r) {
    if (err) {
      res.send(err)
    }
    res.json(resume)
  })
});

app.put('/resume/:resume_id', (req, res) => {
  console.log('in /resume/:resume_id, req.body sent is : ', req.body);
  Resume.findByIdAndUpdate(
    req.params.resume_id,
    req.body,
    { new: true },
    (err, resume) => {
      if (err) return res.status(500).send(err);
      return res.send(resume);
    }
  )
});

// app.put('/resume/:resume_id', (req, res) => {
//   Resume.findById(req.params.resume_id, (err, resume) => {
//     if (err)
//       res.send(err);

//       resume.title = req.body.title;
//       resume.defaultFlag = req.body.defaultFlag;
//       resume.videos = req.body.videos;
//       // ^may not work
//       resume.summary = req.body.summary;
//       resume.education = req.body.education;
//       // ^may not work
//       resume.workExperience = req.body.workExperience;
//       resume.skills = req.body.skills;
//       // ^may not work
//       resume.isPrivate = req.body.isPrivate;

//       resume.save((err) => {
//         if (err)
//           res.send(err);

//         res.json({ message: 'Resume Updated!' });
//       });
//   });
// });


//RESUME END -------------------------------------------------------------------------->

// BELOW recruiter update account form PUT / -------------------------------------------------

// recruiter signup form submit start --------------------------------------------------------

app.post('/recruiter/signup', (req, res) => {
  console.log('in /recruiter/signup, req.body sent is :\n', req.body)
  var recruiter = new Recruiter(req.body);
  console.log('recruiter created is \n', recruiter);

  recruiter.save(function (err, r) {
    if (err) {
      res.send(err)
    }
    res.json(recruiter)
  })
});

// recruiter signup form submit end / ------------------------------------------------------

// app.get to get and see ALL recruiter in postman

app.get('/recruiter', (req, res) => {
  Recruiter.find((err, recruiters) => {
    if (err)
      res.send(err);
    res.json(recruiters);
  });
});

// /////////////////


// get the recruiter with that id (accessed at GET http://localhost:3001/recruiter/:recruiter_id)
app.get('/recruiter/:recruiter_id', (req, res) => {
  Recruiter.findById(req.params.recruiter_id, (err, recruiter) => {
    if (err)
      res.send(err);
    res.json(recruiter);
  });
});

// recruiter update account form PUT ---------------------------------------------------
// be sure to set values in Postman if testing with Postman under the Body tab below the url path bar

app.put('/recruiter/:recruiter_id', (req, res) => {
  Recruiter.findById(req.params.recruiter_id, (err, recruiter) => {

    recruiter.companyName = req.body.companyName;
    recruiter.firstName = req.body.firstName;
    recruiter.lastName = req.body.lastName;
    recruiter.email = req.body.email;
    recruiter.password = req.body.password;
    recruiter.url = req.body.url; // updating recruiter info

    // save info
    recruiter.save((err) => {
      if (err)
        res.send(err);

      res.json({ message: 'Recruiter account information updated.' });
    });

  });
});

// recruiter update account form PUT / -------------------------------------------------

// recruiter DELETE account form DELETE / ----------------------------------------------

app.delete('/recruiter/:recruiter_id', (req, res) => {
  Recruiter.remove({
    _id: req.params.recruiter_id
  }, (err, recruiter) => {
    if (err)
      res.send(err);

    res.json({ message: 'Recruiter successfully deleted.' });
  });
});

// /////    recruiter DELETE account form DELETE / -------------------------------------

// GET route for Recruiter job list, may not need this and many other blocks of code

// ****** Get all jobs from Postman *******

app.get('/job', (req, res) => {
  Job.find((err, jobs) => {
    if (err)
      res.send(err);
    res.json(jobs);
  })
});

// PREVIOUS get route for jobs I don't think this works as intended
// app.get('/job', (req, res) => {
//   // var {limit, companyid} = req.query;
//   // var { limit } = req.query;
//   // var  companyid  = req.query;
//   // companyid was hard coded in previously, make this dynamic
//   // var companyid = "5a975d329bfa160783522cdf" // not sure what to do with this stuff
//   Job.find({ companyId: companyid }).
//     limit(20).
//     sort({ timePosted: -1 }).
//     exec((err, data) => {
//       if (err) return (err);
//       res.json(data);
//     });
// })

// GET for job with specific ID

app.get('/job/:job_id', (req, res) => {
  Job.findById(req.params.job_id, (err, job) => {
    if (err)
      res.send(err);
    res.json(job);
  });
});

// POST route for Job below

app.post('/job', (req, res) => {
  Job.create(
    {
      jobTitle: req.body.jobTitle,
      // companyId: ObjectID(req.body.companyId),    will use later
      jobDescription: req.body.jobDescription,
      skills: req.body.skills,
      url: req.body.url,
      location: req.body.location
    }
  )
    .then(data => {
      console.log('Data returned from Recruiter Create Job ', data);
      res.json(data);
    })
    .catch(err => {
      res.json({ code: 400, message: "Recruiter job post failed", error: err });
    });
});

// POST route for Job above /-----------------------------------------

// PUT route for updating Job Post below /---------------------------------------------

// job update account form PUT ---------------------------------------------------
// be sure to set values in Postman if testing with Postman under the Body tab below the url path bar

app.put('/job/:job_id', (req, res) => {
  Job.findById(req.params.job_id, (err, job) => {

    // updating student info
    job.jobTitle = req.body.jobTitle;
    job.jobDescription = req.body.jobDescription;
    job.skills = req.body.skills;
    job.location = req.body.location;
    job.url = req.body.url;

    // save info
    job.save((err) => {
      if (err)
        res.send(err);

      res.json({ message: 'Job information updated.' });
    });

  });
});
// PUT route for updating Job Post above /---------------------------------------------

// PREVIOUS code, I don't think this is working as intended
// app.put('/job/:job_id', (req, res) => {
//   Job.findByIdAndUpdate(
//     req.params.job_id,
//     req.body,
//     { new: true },
//     (err, job) => {
//       if (err) return res.status(500).send(err);
//       return res.send(job);
//     }
//   )
// });

// DELETE route  below for deletion of job post by recruiter /--------------------------

app.delete('/job/:job_id', (req, res) => {
  Job.findByIdAndRemove(req.params.job_id, (err, job) => {
    if (err) return res.status(400).send(err);
    const response = {
      message: "Job successfully deleted",
      id: job._id
    };
    return res.status(200).send(response);
  })
});

// app.delete('/job/:job_id', (req, res) => {
//   Job.remove({
//     _id: req.params.job_id
//   }, (err, job) => {
//     if (err)
//       res.send(err);

//     res.json({ message: 'Job post successfully deleted.' });
//   });
// });

// DELETE route  above for deletion of job post by recruiter /--------------------------

// Below is Instructor Code -----------------------------------------------------------

// app.get to get and see ALL instructors in postman

app.get('/instructor', (req, res) => {
  Instructor.find((err, instructors) => {
    if (err)
      res.send(err);
    res.json(instructors);
  });
});

// get the instructor with that id (accessed at GET http://localhost:3001/instructor/:instructor_id)
app.get('/instructor/:instructor_id', (req, res) => {
  Instructor.findById(req.params.instructor_id, (err, instructor) => {
    if (err)
      res.send(err);
    res.json(instructor);
  });
});

// instructor update account form PUT ---------------------------------------------------
// be sure to set values in Postman if testing with Postman under the Body tab below the url path bar

app.put('/instructor/:instructor_id', (req, res) => {
  Instructor.findById(req.params.instructor_id, (err, instructor) => {

    // updating instructor info
    instructor.institution = req.body.institution;
    instructor.firstName = req.body.firstName;
    instructor.lastName = req.body.lastName;
    instructor.email = req.body.email;
    instructor.password = req.body.password;
    instructor.academicFields = req.body.academicFields;

    // save info
    instructor.save((err) => {
      if (err)
        res.send(err);

      res.json({ message: 'Instructor account information updated.' });
    });

  });
});

// app.post to create an instructor

app.post('/instructor/signup', (req, res) => {
  console.log('in /instructor/signup, req.body sent is :\n', req.body)
  var instructor = new Instructor(req.body);
  console.log('student created is \n', instructor);

  instructor.save(function (err, r) {
    if (err) {
      res.send(err)
    }
    res.json(instructor)
  })

});

// app.post('/instructor/signup', (req, res) => {
//   Instructor.create(
//     {
//       institution: req.body.institution,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: req.body.password,
//       academicFields: req.body.academicFields
//     }
//   )
//     .then(data => {
//       console.log('Data returned from Instructor signup ', data);
//       res.json(data);
//     })
//     .catch(err => {
//       res.json({ code: 400, message: "Instructor signup failed", error: err });
//     });
// });

// get the instructor with that id (accessed at GET http://localhost:3001/instructor/:instructor_id)
app.get('/instructor/:instructor_id', (req, res) => {
  Instructor.findById(req.params.instructor_id, (err, instructor) => {
    if (err)
      res.send(err);
    res.json(instructor);
  });
});

// Above is Instructor Code -----------------------------------------------------------

// below is unused so far

app.get('/login', (req, res) => { });

app.post('/login', (req, res) => {
  var newLogin = req.body;
  newLogin.createDate = new Date();

  if (!(req.body.firstName || req.bodylastName)) {
    handleError(res, "Invalid user", "Must provide first and last name.", 400);
  }

  db.collection(Students).insertOne(newLogin, (err, doc) => {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.get('/student/login/:id', (req, res) => { });

app.put('/student/login/:id', (req, res) => { });

app.delete('/student/login/:id', (req, res) => { });


//

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});