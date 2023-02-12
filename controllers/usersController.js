const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/usersModel");
const { SECRET } = require("../config.json");
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user_db = await usersModel.findOne({ email });
    const match = await bcrypt.compare(password, user_db.password);
    if (!match) return next(new Error("User authentication failed"));
    const token = jwt.sign(
      {
        _id: user_db._id,
        fullname: user_db.fullname,
        email: user_db.email,
      },
      SECRET
    );
    res.json({ success: true ,results:token});
  } catch (error) {
    next(error); 
  }
};

module.exports.signup = async (req, res, next) => {
  try {
    const new_user = req.body;
    const hashed_password = await bcrypt.hash(new_user.password, 10);
    const results = await usersModel.create({
      ...new_user,
      password: hashed_password,
    });
    res.json({ success: true, results });
  } catch (error) {
    next(error);
  }
};
