const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAlluser, getSingleuser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

//register user route
router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/password/forgot', forgotPassword);

router.put("/password/reset/:token", resetPassword);

router.get('/logout', logout);

router.get('/me', isAuthenticatedUser, getUserDetails);

router.put('/password/update', isAuthenticatedUser, updatePassword);

router.put('/me/update', isAuthenticatedUser, updateProfile);

router.get('/admin/users', isAuthenticatedUser, authorizeRoles('admin'), getAlluser);

router.get('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), getSingleuser);

router.put('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), updateUserRole);

router.delete('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;