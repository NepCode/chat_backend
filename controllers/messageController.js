import asyncHandler from 'express-async-handler'
import Message from '../models/messageModel.js'

// @desc    Get messages from some user chat
// @route   GET /api/v1/{from}/messages
// @access  Private
const getMessagesFromChat = asyncHandler(async (req, res) => {

    const userId = req.user.id
    const fromUserId = req.params.from

    const last30 = await Message.find({
      $or: [
          { from: userId, para: fromUserId },
          { from: fromUserId, para: userId },
      ]
     })
    .sort({ createdAt: 'asc' })
    .limit(30);

    res.json({ 
      myId: userId,
      idFromUser : fromUserId,
      last30
    })
})


export {
  getMessagesFromChat
}