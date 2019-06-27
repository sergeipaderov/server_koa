const fs = require('fs');
const path = require('path');

const messagesPath = path.join(__dirname, '../temp/messages.json');

exports.get = () => new Promise(async (resolve, reject) => {
  try {
    var messages = [];
    if (fs.existsSync(messagesPath)) {
      messages = JSON.parse(fs.readFileSync(messagesPath, 'utf-8'));
    }
    resolve(messages);
  }
  catch(err) {
    reject(err);
  }
});

exports.add = ({name, email, message}) => new Promise(async (resolve, reject) => {
  try {

    if (!name || !email || !message) {
      reject('All fields are required');
      return;
    }

    let messages = [];
    if (fs.existsSync(messagesPath)) {
      messages = JSON.parse(fs.readFileSync(messagesPath, 'utf-8'));
    }

    let newMessages = messages.slice();
    newMessages.push({
      'name': name,
      'email': email,
      'message': message
    });

    fs.writeFileSync(path.join(process.cwd(), '/temp/messages.json'), JSON.stringify(newMessages));

    resolve(true);
  }
  catch(err) {
    reject(err);
  }
});