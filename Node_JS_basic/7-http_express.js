const express = require('express');
const fs = require('fs');
const countStudents = require('./3-read_file_async');

const app = express();
const database = process.argv[2];

app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.type('text/plain');

  countStudents(database)
    .then(() => {
      const lines = fs.readFileSync(database, 'utf8')
        .split('\n')
        .filter((line) => line.trim() !== '')
        .slice(1);

      const fields = {};
      let output = 'This is the list of our students\n';

      lines.forEach((line) => {
        const [firstName, , , field] = line.split(',').map((item) => item.trim());

        if (!fields[field]) {
          fields[field] = [];
        }

        fields[field].push(firstName);
      });

      output += `Number of students: ${lines.length}\n`;

      Object.keys(fields).forEach((field, index, array) => {
        output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
        if (index < array.length - 1) {
          output += '\n';
        }
      });

      res.send(output);
    })
    .catch((err) => {
      res.send(`This is the list of our students\n${err.message}`);
    });
});

app.listen(1245);

module.exports = app;
