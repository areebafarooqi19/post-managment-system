const getDataUri = require('../../utils/datauri');
const cloudinary = require('cloudinary');
const postModel = require('../model/post.model');

const createPost = async (req, res) => {
  const { title = 'first title', description = 'first description' } =
    req.params;
  const file = req.file;
  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  console.log('jjj');
  const newPost = {
    post_title: title,
    post_description: description,
    post_image: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
    created_at: Date.now(),
  };
  const post = await postModel.create(newPost);
  if (post) {
    res.send('Post created');
  }
};

module.exports = {
  createPost,
};
