import express from 'express'
import { check } from 'express-validator'
import { validateInputFields } from '../middleware/validateInputFields.js'
import { protect, admin } from '../middleware/authMiddleware.js'


const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'

router.route('/').post(registerUser, [
        check('email', 'email is required').isEmail(),
        check('password', 'password is required').not().isEmpty(),
        validateInputFields
      ] ).get(protect, admin, getUsers)

router.post('/login', [
        check('email', 'email is required').isEmail(),
        check('password', 'password is required').not().isEmpty(),
        validateInputFields
      ],
    authUser)
    
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router