const http = require('http');
const fs = require('fs');

const database = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error('Cannot load the database'));
      return;
    }

    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const rows = data
        .toString()
        .split('\n')
        .filter((line) => line.trim() !== '');

      const students = rows.slice(1);
      const groups = {};
      const output = [`Number of students: ${students.length}`];

      students.forEach((student) => {
        const [firstName, , , field] = student.split(',').map((item) => item.trim());

        if (!groups[field]) {
          groups[field] = [];
        }
        groups[field].push(firstName);
      });

      Object.keys(groups).forEach((field) => {
        output.push(
          `Number of students in ${field}: ${groups[field].length}. List: ${groups[field].join(', ')}`
        );
      });

      resolve(output.join('\n'));
    });
  });
}

const app = http.createServer((req, res) => {
  const path = req.url.split('?')[0];

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (path === '/') {
    res.end('Hello Holberton School!');
    return;
  }

  if (path === '/students') {
    countStudents(database)
      .then((data) => {
        res.end(`This is the list of our students\n${data}`);
      })
      .catch((error) => {
        res.end(`This is the list of our students\n${error.message}`);
      });
    return;
  }

  res.end('Hello Holberton School!');
});

app.listen(1245);

module.exports = app;
