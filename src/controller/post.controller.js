const getDataUri = require('../../utils/datauri');
const cloudinary = require('cloudinary');
const postModel = require('../model/post.model');
const userModel = require('../model/user.model');
const commentModel = require('../model/comment.model');
const { ObjectId } = require('mongodb');

const createPost = async (req, res) => {
  const { title, description, userId } = req.body;
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
    user: userId,
    created_at: Date.now(),
  };
  const post = await postModel.create(newPost);
  if (post) {
    res.send('Post created');
  }
};
const like = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const postExist = await postModel.findById(id);
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
    }
    postExist.likedBy.push(userId);

    const saveLike = await postExist.save();
    return res.status(201).send(saveLike);
  } catch (error) {
    console.log('error', error);
    res.status(500).send('Something wents wrong');
  }
};
const disLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const postExist = await postModel.findById(id);
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
    }
    postExist.disLikedBy.push(userId);

    const saveLike = await postExist.save();
    return res.status(201).send(saveLike);
  } catch (error) {
    console.log('error', error);
    res.status(500).send('Something wents wrong');
  }
};
const getPostByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userModel.aggregate([
      { $match: { _id: new ObjectId(`${id}`) } },
      { $unset: 'password' },
      { $unset: 'reset_password_expiry_date' },
      { $unset: 'reset_password_token' },

      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'user',
          as: 'Post',
        },
      },
    ]);

    if (data.length > 0) {
      return res.status(200).send(data);
    }

    return res.status(200).send('No Post Available');
  } catch (error) {
    console.log('Error', error);
    return res.status(400).send('Something wents wrong');
  }
};

const getPostDetailById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await postModel.aggregate([
      { $match: { _id: new ObjectId(`${id}`) } },

      {
        $lookup: {
          // pipeline: [{ $match: { _id: '659566af6150d03475370795' } }],
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'Comments',
        },
      },
    ]);

    if (data.length > 0) {
      return res.status(200).send(data);
    }

    return res.status(200).send('No Post Available');
  } catch (error) {
    console.log('Error', error);
    res.status(400).send('Something wents wrong');
  }
};
const getAllPosts = async (req, res) => {
  const data = await postModel.aggregate([
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'postId',
        as: 'Comments',
      },
    },
  ]);
  if (data.length > 0) {
    return res.status(200).send(data);
  }

  return res.status(200).send('No Post Available');
};
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletePost = await postModel.findOneAndDelete({ _id: id });

    if (deletePost) {
      cloudinary.v2.api;
      await cloudinary.v2.api.delete_resources(
        [deletePost.post_image.public_id],
        { type: 'upload', resource_type: 'image' }
      );
    }
    if (deletePost) {
      return res.send({
        status: 200,
        message: 'Post deleted Successfully',
      });
    } else {
      return res.send({
        status: 400,
        message: 'Post Not Found',
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: error,
    });
  }
};
module.exports = {
  createPost,
  like,
  disLike,
  getAllPosts,
  getPostDetailById,
  deletePost,
  getPostByUser,
};
