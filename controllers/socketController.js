import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Message from '../models/messageModel.js'

// @desc    Get user connected from some user chat
// @route   GET /api/v1/{from}/messages
// @access  Private
const userConnected = asyncHandler(async (id) => {

    const user = await User.findById(id);
    user.status = true;
    await user.save();
    
    return user;
})

const userDisconnected = asyncHandler( async (id ) => {
    const user = await User.findById(id);
    user.status = false;
    await user.save();
    
    return user;
})

const getUsers = asyncHandler( async () => {

    const users = await User
            .find()
            .sort('-status');
    return users;

})

const saveMessage = asyncHandler( async (payload) => {

   const message = new Message( payload )
   await message.save();
   return message

})


export {
    userConnected,
    userDisconnected,
    getUsers,
    saveMessage
}