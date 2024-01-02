const DataUriParser = require('datauri/parser');
const path = require('path');

const getDataUri = (file) => {
  console.log(
    '===========================================================',
    file.originalname
  );
  console.log('jkasjxushcjhkwe', path.extname(file.originalname));
  const parser = new DataUriParser();
  console.log('hello');
  const extName = path.extname(file.originalname).toString();
  console.log('sdfghjkl', typeof extName);
  return parser.format(extName, file.buffer);
};

module.exports = getDataUri;
