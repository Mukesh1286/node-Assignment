const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');


 //Regster a user
 exports.registerUser = catchAsyncErrors(async(req, res, next) => {

   const { FirstName, LastName, email, Phone} = req.body;

   const user = await User.create({
    FirstName,
    LastName,
    email,
    Phone
    
   })

     const token = user.getJwtToken();
   
      res.status(201).json({
       success: true,
       token
      })
   })

   // Get all users 
exports.allUsers = catchAsyncErrors(async(req, res, next) =>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })

})

// Get user details 
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update user profile 
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        email: req.body.email,
        Phone: req.body.Phone
       
        
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})


// Delete user   
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

   
    await user.remove();

    res.status(200).json({
        success: true,
    
    })
})