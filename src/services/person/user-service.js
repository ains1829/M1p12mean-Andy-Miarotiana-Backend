const User = require("../../models/person/users-model");

async function getEmail(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { getEmail };
