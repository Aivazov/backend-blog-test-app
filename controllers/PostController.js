import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('author').exec();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to show posts',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      { $inc: { viewsCount: 1 } }, //$inc is mongoDB method to increment determined field
      { returnDocument: 'after' } //returning updated doc after all the manipulations
    );
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to show post',
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      author: req.userId, //this id we getting from checkAuth.js line 12
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create a post',
    });
  }
};
