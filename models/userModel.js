import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Name field is required"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Name field is required"],
    },
    userName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "E-mail already exist, please login"],
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Please provide a valid E-mail address",
      },
      required: [true, "E-mail field is required"],
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId && !this.twitterId && !this.facebookId;
      },
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value);
        },
        message:
          "Password must contain an Uppercase and a Lowercase letter and a special character",
      },
    },

    // confirmPassword: {
    //     type: String,
    //     validate: {
    //         validator: function (value) {
    //            return this.password === value
    //         },
    //         message: 'Password not match'
    //     }
    // },

    googleId: {
      type: String,
    },

    facebookId: {
      type: String,
    },
    location: {
      type: String,
    },
    twitterId: {
      type: String,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    cloudinary_id: {
      type: String,
    },
    resetPasswordOTP: {
      type: String,
      default: "",
    },
    resetPasswordOTPExpireAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);

  // this.confirmPassword = null;

  next();
});

userSchema.methods.comparePassword = async function (password) {
  if (!this.password) {
    throw new Error("Password is undefined in the database");
  }
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
