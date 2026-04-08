const fs = require('fs');

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return reject(new Error('Cannot load the database'));

      const lines = data.split('\n').filter((l) => l.trim() !== '').slice(1);
      const fields = {};

      for (const s of lines) {
        const [firstname, , , field] = s.split(',').map((item) => item.trim());
        if (!fields[field]) fields[field] = [];
        fields[field].push(firstname);
      }

      resolve(fields);
    });
  });
}

module.exports = readDatabase;
