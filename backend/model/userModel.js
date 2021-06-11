import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  } catch (err) {
    next(err);
  }
});

userSchema.methods.isValidPassword = async function (
  enteredPassword,
  userPassword
) {
  try {
    return await bcrypt.compare(enteredPassword, userPassword);
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("User", userSchema);

export { User };
