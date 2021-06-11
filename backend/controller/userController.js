import { User } from "../model/userModel.js";

const getAllUsers = async (req, res, next) => {
  try {
    const allUserData = await User.find().sort({ userId: "desc" });
    res.json({ allUserData });
  } catch (err) {
    next(err);
  }
};

export {getAllUsers}