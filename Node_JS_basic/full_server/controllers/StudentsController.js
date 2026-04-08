const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(req, res) {
    const db = process.argv[2];

    readDatabase(db)
      .then((fields) => {
        const sorted = Object.keys(fields)
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

        let output = 'This is the list of our students\n';

        for (const field of sorted) {
          output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
        }

        res.status(200).send(output.trim());
      })
      .catch(() => res.status(500).send('Cannot load the database'));
  }

  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    const db = process.argv[2];

    readDatabase(db)
      .then((fields) => {
        const names = fields[major] || [];
        res.status(200).send(`List: ${names.join(', ')}`);
      })
      .catch(() => res.status(500).send('Cannot load the database'));
  }
}

module.exports = StudentsController;
