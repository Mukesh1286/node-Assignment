const express = require('express')
const router = express.Router();


const { 
    registerUser, 
    allUsers, 
    getUserDetails, 
    updateUser, 
    deleteUser  
} = require('../controllers/userController')



router.route('/registerUsers').post(registerUser);
router.route('/allUsers').get(allUsers);
router.route('/getUserDetails/:id').get(getUserDetails);
router.route('/updateUser/:id').put(updateUser);
router.route('/deleteUser/:id').delete(deleteUser);

module.exports= router
