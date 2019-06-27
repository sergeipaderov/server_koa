const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../temp/products.json');

exports.get = () => new Promise(async (resolve, reject) => {
  try {
    var products = [];
    if (fs.existsSync(productsPath)) {
      products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    }
    resolve(products);
  }
  catch(err) {
    reject(err);
  }
});

exports.add = ({photo, name, price}) => new Promise(async (resolve, reject) => {
  try {
    const { name: photoName, size, path: tempPath } = photo;
    const uploadDir = path.join(process.cwd(), '/public', 'assets', 'img', 'products');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    if (!name || !price) {
      fs.unlinkSync(tempPath);
      reject('All fields are required');
      return;
    }
    if (!photoName || !size) {
      fs.unlinkSync(tempPath);
      reject('File not saved');
      return;
    }

    fs.renameSync(tempPath, path.join(uploadDir, photoName));

    let products = [];
    if (fs.existsSync(productsPath)) {
      products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    }

    let newProducts = products.slice();
    newProducts.push({
      'src': './assets/img/products/' + photoName,
      'name': name,
      'price': price
    });

    fs.writeFileSync(path.join(process.cwd(), '/temp/products.json'), JSON.stringify(newProducts));

    resolve(true);
  }
  catch(err) {
    reject(err);
  }
});