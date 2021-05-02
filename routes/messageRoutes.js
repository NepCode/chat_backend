import express from 'express'
import { protect, admin
 } from '../middleware/authMiddleware.js'

const router = express.Router()

import {
  getMessagesFromChat
} from '../controllers/messageController.js'

router.route('/:from').get( protect, getMessagesFromChat )

export default router