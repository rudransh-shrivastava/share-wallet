const User = require('../models/Users');
const Friend = require('../models/Friends');
const Transaction = require('../models/Transactions');
const FriendRequest = require('../models/FriendRequest');
const { createUserMap } = require('./transaction');

// delete friends from the database
function deleteFriendPair(userId, friendId) {
  return Promise.all([
    Friend.deleteOne({ userId, friendId }),
    Friend.deleteOne({ userId: friendId, friendId: userId }),
  ]);
}

// create friends in the database
function createFriendPair(userId, friendId) {
  const newFriend = new Friend({ userId, friendId });
  const newFriendBack = new Friend({ userId: friendId, friendId: userId });

  return Promise.all([newFriend.save(), newFriendBack.save()]);
}

// find id of the user given their email
function findIdByEmail(email) {
  return Promise.all([User.findOne({ email })]);
}

// find name of user given their id
function findNameById(id) {
  return Promise.all([User.findOne({ googleId: id })]);
}

// calculate the total amount owed and the total amount owed to the user by all friends
function calculateTotal(transactions, googleId) {
  let owed = 0;
  let owes = 0;

  transactions.forEach((transaction) => {
    transaction.participants.forEach((participant) => {
      if (participant.user === googleId) {
        owes += participant.amountOwes;
        owed += participant.amountOwed;
      }
    });
  });

  return { total: owed - owes, owes, owed };
}

module.exports = {
  createUser: function (req, res) {
    const googleId = req.user.googleId;
    const { name, email, username } = req.query;

    // Check if the username already exists
    User.findOne({ username })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({
          googleId,
          name,
          email,
          username,
        });
        newUser
          .save()
          .then((newUser) => {
            res.json(newUser);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'An error occurred' });
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
      });
  },
  removeFriend: function (req, res) {
    const googleId = req.user.googleId;
    const friendId = req.query.friendId;
    deleteFriendPair(googleId, friendId)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while deleting friend' });
      });
  },
  addFriend: function (req, res) {
    const googleId = req.user.googleId;
    // let friendId;
    // findIdByEmail(req.query.email).then((result) => {
    //   if (result[0] == null) {
    //     return res.json({ message: 'No user found with this email' });
    //   } else {
    //     friendId = result[0].googleId;
    //   }
    // });
    const friendId = req.query.friendId;
    FriendRequest.findOne({
      userId: friendId,
      friendId: googleId,
      status: 'pending',
    }).then((existingFriendRequest) => {
      if (existingFriendRequest) {
        createFriendPair(googleId, friendId).then(() => {
          FriendRequest.deleteOne({
            userId: friendId,
            friendId: googleId,
          }).then((result) => {
            return res.json(result);
          });
        });
      }
    });

    Friend.findOne({ userId: googleId, friendId: friendId })
      .then((existingFriend) => {
        if (existingFriend) {
          res.json({ message: 'Already friends' });
        } else {
          const newFriend = new FriendRequest({
            userId: googleId,
            friendId: friendId,
            status: 'pending',
          });
          newFriend
            .save()
            .then((result) => {
              console.log(result);
              res.json(result);
            })
            .catch((error) => {
              console.error(error);
              res
                .status(500)
                .json({ error: 'An error occurred while adding friend' });
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while checking friend' });
      });
  },
  getFriendRequests: function (req, res) {
    const googleId = req.user.googleId;
    FriendRequest.find({ friendId: googleId, status: 'pending' })
      .then(async (result) => {
        const userMap = await createUserMap();
        let friendRequests = [];
        for (const friend of result) {
          friendRequests.push({
            id: friend.userId,
            name: userMap[friend.userId],
          });
        }
        res.json(friendRequests);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          error: 'An error occurred while fetching friend requests',
        });
      });
  },
  acceptFriendRequest: function (req, res) {
    const googleId = req.user.googleId;
    const friendId = req.query.friendId;
    createFriendPair(googleId, friendId)
      .then(() => {
        FriendRequest.deleteOne({ userId: friendId, friendId: googleId })
          .then((result) => {
            res.json(result);
          })
          .catch((error) => {
            console.error(error);
            res
              .status(500)
              .json({ error: 'An error occurred while accepting friend' });
          });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while accepting friend' });
      });
  },
  rejectFriendRequest: function (req, res) {
    const googleId = req.user.googleId;
    const friendId = req.query.friendId;
    FriendRequest.deleteOne({ userId: friendId, friendId: googleId })
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while rejecting friend' });
      });
  },
  getUsers: function (req, res) {
    const googleId = req.user.googleId;

    User.find({}, 'name googleId')
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while fetching users' });
      });
  },
  getDetails: function (req, res) {
    const googleId = req.user.googleId;

    User.find({ googleId: googleId })
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while fetching user details' });
      });
  },
  getTotal: function (req, res) {
    const googleId = req.user.googleId;

    Transaction.find({ 'participants.user': googleId })
      .then((transactions) => {
        const { total, owes, owed } = calculateTotal(transactions, googleId);
        res.json({ total, owes, owed });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while fetching transactions' });
      });
  },
  getFriends: function (req, res) {
    const currentUser = req.user.googleId;

    Friend.find()
      .then((users) => {
        const friends = users.filter((user) => user.userId == currentUser);
        const friendIds = friends.map((friend) => friend.friendId);

        User.find({ googleId: { $in: friendIds } }, 'name googleId')
          .then((users) => {
            res.json(users);
          })
          .catch((error) => {
            console.error(error);
            res
              .status(500)
              .json({ error: 'An error occurred while fetching friends' });
          });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while fetching friends' });
      });
  },
  searchUsers: function (req, res) {
    const username = req.query.username;

    User.find({ username: new RegExp('^' + username, 'i') })
      .limit(20)
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
      });
  },
};
