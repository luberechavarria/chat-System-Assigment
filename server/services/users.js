const ObjectId = require('mongodb').ObjectId;

const mongoUtil = require("../mongoUtil");

const db = mongoUtil.getDb();
const users = db.collection('users');

/**
 * Retrieves a user by their unique ID.
 *
 * @param {string} userId - The unique identifier of the user.
 * @returns {Promise<Object|null>} A promise that resolves with the user object if found, or null if not found.
 * @throws {Error} If an error occurs while querying the database.
 */
const getUserById = async(userId) => {
  try{
    const userFound= await users.findOne({_id: new ObjectId(userId)});
    return userFound;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const getAllUsers = async() => { 
  try{
    const usersFound= await users.find({}).toArray();
    return usersFound;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const createNewUser = async(newUser) => {
  try{
    const result = await users.insertOne(newUser);
    if (result.acknowledged) {
      newUser._id = result.insertedId;
    }
    return null;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const getUserByUsernameAndPassword = async(username, password) => { 
  try{
    const userFound = await users.findOne({ username, pwd: password });
    delete userFound.pwd;
    return userFound;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const removeUser = async(userId) => {
  try{
    const userWasRemoved = await users.deleteOne({ _id: userId });
    return userWasRemoved;
  }catch(err){
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

const updateUser = async(userId, data) => {
  try {
    const result = await users.updateOne(
      { _id: userId },
      data
    );
    return result;
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

module.exports = {
  getUserById,
  getAllUsers,
  createNewUser,
  removeUser,
  updateUser,
  getUserByUsernameAndPassword
};