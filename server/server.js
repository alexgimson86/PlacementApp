const read = require('fs');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path')
var cors = require('cors');
//const formidable = require('formidable');
//const formidableMiddleware = require('express-formidable');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
const uuidv4 = require('uuid/v4');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /*
      Files will be saved in the 'uploads' directory. Make
      sure this directory already exists!
    */
    cb(null, './server/public/uploads/');
  },
  filename: (req, file, cb) => {
    /*
      uuidv4() will generate a random ID that we'll use for the
      new filename. We use path.extname() to get
      the extension from the original file name and add that to the new
      generated ID. These combined will create the file name used
      to save the file on the server and will be available as
      req.file.pathname in the router handler.
    */
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  },
});
// create the multer instance that will be used to upload/save the file
//const upload = multer({ storage });
const upload = multer({ storage: storage })
const app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());


const RecruiterSchema = require('./models/Recruiters');
const JobSchema = require('./models/Jobs');
const StudentSchema = require('./models/Students');
const InstructorSchema = require('./models/Instructors');
const ResumeSchema = require('./models/Resumes');

const mongoose = require('mongoose');

const ObjectID = require('mongodb').ObjectID;
//const ObjectId = mongoose.Types.ObjectId;

const port = 4000;
app.use(express.static(path.join(__dirname, 'public/uploads')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,OPTIONS,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
const password = encodeURIComponent('accrocks@2019')
var url = `mongodb://personalprofileuser:${password}@ds223542.mlab.com:23542/personalprofiledb`;

mongoose.connect(url, { useNewUrlParser: true }, function (err) {
  if (err) throw err;
  console.log('now connected to MongoDB');
});

const Recruiter = mongoose.model('Recruiter', RecruiterSchema);
const Student = mongoose.model('Student', StudentSchema);
const Job = mongoose.model('Job', JobSchema);
const Instructor = mongoose.model('Instructor', InstructorSchema);
const Resume = mongoose.model('Resume', ResumeSchema);

//passport js strategy for username and password login i.e. not using social media
passport.use(new LocalStrategy(
  function(username, password, done) {
    Student.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
///////////end passportjs strategy

//serialize user so theres persistent session storages
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Student.findById(id, function(err, user) {
    done(err, user);
  });
});
//end of passport serialize funcs
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
  //save user id for this session
  req.session.student_id = req.params.student_id;
  Student.findById(ObjectID(req.params.student_id)/*req.params.student_id*/, (err, student) => {

    // updating student info
    if (req.body.firstName) student.firstName = req.body.firstName;
    if (req.body.lastName) student.lastName = req.body.lastName;
    if (req.body.email) student.email = req.body.email;
    if (req.body.password) student.password = req.body.password;
    if (req.body.savedJobs) student.savedJobs = req.body.savedJobs;
    if (req.body.fieldOfStudy) student.fieldOfStudy = req.body.fieldOfStudy;
    if (req.body.skills) student.skills = req.body.skills;
    if (req.body.phone) student.phone = req.body.phone;
    if (req.body.street) student.address.street = req.body.street;
    if (req.body.zip) student.address.zip = req.body.zip;
    if (req.body.state) student.address.state = req.body.state;
    if (req.body.title) student.title = req.body.title;

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

app.get('/resume/:student_id', (req, res) => {
  Student.findById(req.params.student_id, (error, student) => {
    Resume.findById(student.resumes[0] , (err, resume) => {
      if (err)
        res.send(err);
      res.send(resume.pdfFileUrl);

    });
  })
});

app.post('/resume/post', upload.any(), (req, res) => {
  var resumeId = null;
  console.log(req.files)
  var id = '5c9ea2db5298ca1c52e48f48'
  
  var resume = new Resume({ title: req.files[0].filename, studentId: ObjectID(id), pdfFileUrl: req.files[0].filename, })
  resume.save((function (err) {
    if (err) return handleError(err);

    Resume.find({ pdfFileUrl: { $eq: req.files[0].filename } }, (err, resume) => {
      if (!err) {
        resumeId = resume[0].id;
        Student.findById(ObjectID(id), (err, student) => {
          student.resumes = ObjectID(resumeId)
          student.save((err) => {
            console.log(err)
          })
        })
      }
    })
    //save image url to student db
  }));
  Student.findById(ObjectID(id), (err, student) => {
    student.imageUrl = req.files[1].filename
    student.save((err) => {
      if (err)
        res.send(err);
      res.send();
    });
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

app.post('/student/login/', passport.authenticate('local'),
function(req, res) {
  let user = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    username: req.user.username,
  }
  res.send(user);
}),
app.get('/student/login/:id', (req, res) => { });

app.put('/student/login/:id', (req, res) => { });

app.delete('/student/login/:id', (req, res) => { });



//

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});