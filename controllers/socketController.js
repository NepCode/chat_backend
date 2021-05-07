import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Get user connected from some user chat
// @route   GET /api/v1/{from}/messages
// @access  Private
const userConnected = asyncHandler(async (id) => {

    const user = await User.findById(id);
    user.online = true;
    await user.save();
    
    return user;
})

const userDisconnected = asyncHandler( async (id ) => {
    const user = await User.findById(id);
    user.online = false;
    await user.save();
    
    return user;
})


export {
    userConnected,
    userDisconnected
}