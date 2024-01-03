const getDataUri = require('../../utils/datauri');
const cloudinary = require('cloudinary');
const postModel = require('../model/post.model');
const userModel = require('../model/user.model');

const createPost = async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;
  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

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
const like = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const postExist = await postModel.findById(postId);
    const userExist = await userModel.findById(userId);
    if (!userExist) {
      return res.status(400).send('User Not found');
    }
    if (!postExist) {
      return res.status(400).send('Post Not found');
    }

    if (postExist.likedBy?.includes(userId)) {
      return res.status(400).send('Post already liked by this user');
    }
    if (postExist.disLikedBy.includes(userId)) {
      postExist.disLikedBy.pull(userId);
      postExist.dislikes -= 1;
    }
    postExist.likedBy.push(userId);
    postExist.likes += 1;

    const saveLike = await postExist.save();
    return res.status(201).send(saveLike);
  } catch (error) {
    console.log('error', error);
    res.status(500).send('Something wents wrong');
  }
};
const disLike = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const postExist = await postModel.findById(postId);
    const userExist = await userModel.findById(userId);
    if (!userExist) {
      return res.status(400).send('User Not found');
    }
    if (!postExist) {
      return res.status(400).send('Post Not found');
    }

    if (postExist.disLikedBy?.includes(userId)) {
      return res.status(400).send('Post already Disliked by this user');
    }
    if (postExist.likedBy.includes(userId)) {
      postExist.likedBy.pull(userId);
      postExist.likes -= 1;
    }
    postExist.disLikedBy.push(userId);
    postExist.dislikes += 1;

    const saveLike = await postExist.save();
    return res.status(201).send(saveLike);
  } catch (error) {
    console.log('error', error);
    res.status(500).send('Something wents wrong');
  }
};
module.exports = {
  createPost,
  like,
  disLike,
};
