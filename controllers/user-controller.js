const { User, Thought} = require('../models');
//user controller to properly execute routes
const userController = {
  // create user 
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  // get all users
  getAllUsers(req, res) {
    User.find({})
        .select ('-__v')
        .sort({ _id: -1 })
      
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getUserById({ params }, res) {

    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No  user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id },
       body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    Thought.deleteMany({ userId: params.id })
    .then(() => {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
    })
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate
    ({ _id: params.userId },
       { $push: { friends: params.friendId } },
        { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' })
          return;

        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err))
  },

  // delete friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, 
      { $pull: { friends: params.friendId } },
       { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' })
          return;

        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err))
  },
};
module.exports = userController;