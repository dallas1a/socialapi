const { Schema, model} = require('mongoose');

const UserSchema = new Schema(
  {

    username: {
      type: String,
      unique: true,
      trim: true,
      required: 'Please enter username'
    },
    email: {
      type: String,
      trim: true,
      required: 'Please enter an email',
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'

    }],

    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

UserSchema.virtual('friendsCount').get(function () {
  return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;