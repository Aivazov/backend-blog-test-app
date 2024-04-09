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

export const getLastTags = async (req, res) => {
  try {
    const getTags = await PostModel.find().limit(5).exec();
    const tags = getTags
      .map((object) => object.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to show tags',
    });
  }
};

export const getOne = async (req, res) => {
  // try {
  const postId = req.params.id;
  PostModel.findOneAndUpdate(
    {
      _id: postId,
    },
    { $inc: { viewsCount: 1 } }, //$inc is mongoDB method to increment determined field //returning updated doc after all the manipulations
    { returnDocument: 'after' }
  )
    .populate('author')
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: 'The article was not found',
        });
      }
      res.json(doc);
    })
    .catch((error) => {
      if (error) {
        console.error(error);

        return res.status(500).json({
          message: 'Failed to show post',
        });
      }
    });
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

export const deletePost = async (req, res) => {
  // try {
  const postId = req.params.id;
  PostModel.findOneAndDelete({
    _id: postId,
  })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: 'The article was not found',
        });
      }
      res.json({
        message: 'Success! The article was deleted',
      });
    })
    .catch((error) => {
      if (error) {
        console.error(error);

        return res.status(500).json({
          message: 'Failed to delete post',
        });
      }
    });
};

export const updatePost = async (req, res) => {
  // try {
  const postId = req.params.id;
  await PostModel.updateOne(
    {
      _id: postId,
    },
    {
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
      tags: req.body.tags,
      imgUrl: req.body.imgUrl,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: 'The article was not found',
        });
      }
      res.json({
        message: 'Success! The article was updated',
      });
    })
    .catch((error) => {
      if (error) {
        console.error(error);

        return res.status(500).json({
          message: 'Failed to update the post',
        });
      }
    });
};
