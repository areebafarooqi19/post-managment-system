const getDataUri = require('../../utils/datauri');

const createPost = (req, res) => {
  const file = req.file;
  console.log('fileeeeeeeeeeeee', file);
  const fileUri = getDataUri(file);
};

module.exports = {
  createPost,
};
