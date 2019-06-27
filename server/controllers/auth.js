

exports.auth = ({email, password }) => new Promise(async (resolve, reject) => {
  try {
    if (!email || !password) {
      reject('Email and Password is reqired!');
      return;
    }

    if (email !== 'admin@gmail.com' || password !== 'admin') {
      reject('Email or Password is wrong!');
      return;
    }
    
    resolve(true);
  }
  catch(err) {
    reject(err);
  }
});