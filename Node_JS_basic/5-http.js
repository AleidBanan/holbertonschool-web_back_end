const http = require('http');
const fs = require('fs');

const database = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1);

      const result = [`Number of students: ${students.length}`];

      const fields = {};

      students.forEach((line) => {
        const [firstName, , , field] = line.split(',').map((item) => item.trim());

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      });

      Object.keys(fields).forEach((field) => {
        result.push(
          `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`
        );
      });

      resolve(result.join('\n'));
    });
  });
}

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');

    countStudents(database)
      .then((data) => {
        res.end(data);
      })
      .catch(() => {
        res.end('Cannot load the database');
      });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
