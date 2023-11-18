import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user and get token
// @routes POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Let"s check if the user is already logged in
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      password: user.password,
    });
  } else {
    res.status(401);
    throw new Error("Email ou mot de pass invalide");
  }
});

// @desc Register user
// @routes POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, telephone } = req.body;

  //Let check if user is already registered
  const isAlreadyRegistered = await User.findOne({ email });

  if (isAlreadyRegistered) {
    res.status(400);
    throw new Error("Vous êtes déjà enregistré.e");
  }
  //If the user is not registered yet, then we need to create a new one
  const user = await User.create({
    name,
    email,
    password,
    telephone,
  });
  //Then if they are a user we are going to respond with a success message
  if (user) {
    generateToken(res, user._Id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      telephone: user.telephone,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Vérifier vos données");
  }
});

// @desc Logout user / clear cookie
// @routes POST /api/users
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Deconexion accepté" });
});

// @desc Get user profile
// @routes GETT /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  console.log("REQ-USER", req.user);
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      telephone: user.telephone,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Utilisateur non trouvé");
  }
});

// @desc Update user
// @routes PUT /api/users
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    (user.name = req.body.name),
      (user.email = req.body.email),
      (user.telephone = req.body.telephone);

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      telephone: updatedUser.telephone,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Utilisateur non trouvé");
  }
});

// @desc Get users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// @desc Delete users
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// @desc Update user by id
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
