import { promises as fs } from 'fs';

const readDatabase = (filePath) => fs.readFile(filePath, 'utf8')
  .then((data) => {
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1);
    const fields = {};

    students.forEach((student) => {
      const parts = student.split(',');
      const firstname = parts[0];
      const field = parts[3];

      if (!fields[field]) fields[field] = [];
      fields[field].push(firstname);
    });

    return fields;
  });

export default readDatabase;
