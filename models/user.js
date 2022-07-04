const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      requried: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },

    name: {
      type: String,
      trim: true,
      requried: true,
      max: 32,
    },

    email: {
      type: String,
      trim: true,
      requried: true,
      unique: true,
      lowercase: true,
    },

    profile: {
      type: String,
      requried: true,
    },

    hashed_password: {
      type: String,
      requried: true,
    },

    salt: String,

    about: {
      type: String,
    },

    role: {
      type: Number,
      trim: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },

    resetPaswordLink: {
      data: String,
      default: "",
    },
  },
  {
    timestamp: true,
  }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password; //create a temporarity variable called _password
    this.salt = this.makeSalt(); // generate salt
    this.hashed_password = this.encryptPassword(password); //encryptPassword
  })
  .get(function () {
    return this._password;
  });

userSchema.method = {
  authenticate: function (plainText) {
    return this.encryptPasswordncrt(plainText) === this.hashed_password
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto.createHmac("sh1", this.salt).update(password).digest("hex");
    } catch (error) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userSchema);
