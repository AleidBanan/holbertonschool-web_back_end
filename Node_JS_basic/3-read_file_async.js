const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const rows = data.split('\n').filter((line) => line.trim() !== '');
      const students = rows.slice(1);

      console.log(`Number of students: ${students.length}`);

      const groups = {};

      students.forEach((student) => {
        const [firstName, , , field] = student.split(',').map((item) => item.trim());

        if (!groups[field]) {
          groups[field] = [];
        }

        groups[field].push(firstName);
      });

      Object.keys(groups).forEach((field) => {
        console.log(
          `Number of students in ${field}: ${groups[field].length}. List: ${groups[field].join(', ')}`
        );
      });

      resolve();
    });
  });
}

module.exports = countStudents;
