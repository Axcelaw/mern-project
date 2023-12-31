const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please input an user name."],
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please input an user email."],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please input a valid email.",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please input an user password."],
      minlength: [6, "The password must be at least 6 characters long."],
      unique: true,
      match: [
        /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
        "The password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.",
      ],
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Password encryption
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = async function (passwordInput) {
  return await bcrypt.compare(passwordInput, this.password);
};

// Create login token
userSchema.methods.jwtGenerateToken = function () {
  return jwt.sign({ id: this.id }, proceess.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

module.exports = mongoose.model("User", userSchema);
