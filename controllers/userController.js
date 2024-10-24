const { check, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


//@desc Register user
//@route POST /api/register
//@access public
const registerUser = [
  check("firstName")
    .notEmpty()
    .withMessage("firstName is required")
    .isLength({ min: 3 })
    .withMessage("firstName must be at least 3 characters long"),
  check("lastName")
    .notEmpty()
    .withMessage("lastName is required")
    .isLength({ min: 3 })
    .withMessage("lastName must be at least 3 characters long"),
  check("email").isEmail().withMessage("Please provide a valid email address"),
  check("about")
    .optional()
    .isLength({ min: 3 })
    .withMessage("About must be at least 3 characters long"),
  check("role").notEmpty().withMessage("Please provide a role of user"),
  check('password')
    .isLength({ min: 8 }) // Enforce a minimum length of 8 characters
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/) // Ensure it contains at least one digit
    .withMessage('Password must contain at least one number')
    .matches(/[A-Z]/) // Ensure it contains at least one uppercase letter
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/) // Ensure it contains at least one lowercase letter
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[\W_]/) // Ensure it contains at least one special character
    .withMessage('Password must contain at least one special character'),

  asyncHandler(async (req, res) => {
    // Get validation result from request
    const errors = validationResult(req);

    // If there are validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract validated data
    const { firstName, lastName, email, about, role, password } = req.body;

    //check if the user is available
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered!");
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    //save user
    const user = await User.create({ firstName, lastName, email, role, about, password: hashedPassword });

    if (user) {
      const userObj = user.toObject();
      delete userObj.password
      //return user info without passwords
      res.status(201).json(userObj);
    } else {
      res.status(400);
      throw new Error("user data is not valid!");
    }
  }),
];

//@desc login 
//@route POST /api/login
//@access public
const loginUser = [
  check("email").isEmail().withMessage("Please provide a valid email address"),
  check('password')
    .isLength({ min: 8 }) // Enforce a minimum length of 8 characters
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/) // Ensure it contains at least one digit
    .withMessage('Password must contain at least one number')
    .matches(/[A-Z]/) // Ensure it contains at least one uppercase letter
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/) // Ensure it contains at least one lowercase letter
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[\W_]/) // Ensure it contains at least one special character
    .withMessage('Password must contain at least one special character'),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    // If there are validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract validated data
    const { email, password } = req.body;
    const user = await User.findOne({ email })


    //password compare
    if (user && (await bcrypt.compare(password, user.password))) {

      const accessToken = jwt.sign({
        //payload
        user: {
          email: user.email,
          id: user.id,
          role: user.role,
        }
      },
        //access token
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      )

      res.status(200).json({ accessToken })
    } else {
      res.status(401)
      throw new Error("email or password is not valid!")
    }

  })
]


const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})



module.exports = {
  registerUser,
  loginUser,
  getAllUsers
};
