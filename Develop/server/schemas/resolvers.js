const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log(args, context.user);
            if(context.user) {
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('books')

            return userData;
            }
            throw new AuthenticationError("login fail")
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user)

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
              throw new AuthenticationError('email not found');
            }
      
            const passwordCorrect = await user.isCorrectPassword(password);
      
            if (!passwordCorrect) {
              throw new AuthenticationError('wrong password');
            }
      
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            console.log(context.user)
            console.log( args.input)
            return User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $push: {
                        savedBooks: args.input
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        removeBook: async (parent, args, context) => {
            console.log(args, context.user);
            
            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: {savedBooks: { bookId: args.bookId}} },
                { new: true}
            );
            
        }

    }

}
module.exports = resolvers;