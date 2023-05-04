const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2] || 'JUL02';

// Store all potentially malicious values in an array.
const value = [`%${cohortName}%`];
const queryString = `SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
                    FROM teachers 
                    JOIN assistance_requests ON teachers.id = teacher_id
                    JOIN students on student_id = students.id 
                    JOIN cohorts on cohort_id = cohorts.id
                    WHERE cohorts.name LIKE $1
                    ORDER BY teacher;`

pool.query(queryString, value)
.then(res => {
  // console.log(res.rows);
  res.rows.forEach(user => {
    console.log(`${user.cohort}: ${user.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));
