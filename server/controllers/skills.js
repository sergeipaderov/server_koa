const fs = require('fs');
const path = require('path');

const skillsPath = path.join(__dirname, '../temp/skills.json');

exports.get = () => new Promise(async (resolve, reject) => {
  try {
    var skills = [];
    if (fs.existsSync(skillsPath)) {
      skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));
    }
    resolve(skills);
  }
  catch(err) {
    reject(err);
  }
});

exports.add = ({age, concerts, cities, years}) => new Promise(async (resolve, reject) => {
  try {

    if (!age || !concerts || !cities || !years ) {
      reject('All fields are required');
      return;
    }

    let skills = [];
    
    if (fs.existsSync(skillsPath)) {
      skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));
    }

    skills = [
      {
        'number': age,
        'text': 'Возраст начала занятий на скрипке'
      },
      {
        'number': concerts,
        'text': 'Концертов отыграл'
      },
      {
        'number': cities,
        'text': 'Максимальное число городов в туре'
      },
      {
        'number': years,
        'text': 'Лет на сцене в качестве скрипача'
      }
    ];
    
    fs.writeFileSync(path.join(process.cwd(), '/temp/skills.json'), JSON.stringify(skills));

    resolve(true);
  }
  catch(err) {
    reject(err);
  }
});