const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
      select: false, // Exclude password from query results by default
    },
    phone: {
        type: String,
        maxlength: 10,
        required: true,
        trim: true,
    },

    role: {
      type: String,
      enum: ["user", "staff", "manager", "admin"],
      default: "user"
    }
  },
  { timestamps: true }
);

const Users = mongoose.model("User", userSchema);

module.exports = Users;
