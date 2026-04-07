const http = require('http');
const fs = require('fs');
const countStudents = require('./3-read_file_async');

const database = process.argv[2];

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/students') {
    let output = 'This is the list of our students\n';

    countStudents(database)
      .then(() => {
        const lines = fs.readFileSync(database, 'utf8')
          .split('\n')
          .filter((line) => line.trim() !== '')
          .slice(1);

        const fields = {};

        for (const line of lines) {
          const [firstName, , , field] = line.split(',').map((item) => item.trim());

          if (!fields[field]) {
            fields[field] = [];
          }

          fields[field].push(firstName);
        }

        output += `Number of students: ${lines.length}\n`;

        Object.keys(fields).forEach((field, index, array) => {
          output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
          if (index < array.length - 1) {
            output += '\n';
          }
        });

        res.end(output);
      })
      .catch((err) => {
        res.end(`This is the list of our students\n${err.message}`);
      });
  } else {
    res.end('Hello Holberton School!');
  }
});

app.listen(1245);

module.exports = app;
