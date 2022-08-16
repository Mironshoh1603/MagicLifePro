const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    account_id: {
      type: mongoose.Schema.ObjectId,
      ref: "accounts",
    },
    name: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: [true, "Siz ismingizni to'liq kiritishingiz kerak!"],
    },
    birth_date: {
      type: String,
      required: [true, "Siz tug'ulgan kuningizni kiritishingiz kerak!"],
    },
    image: {
      type: String,
      default: "default.jpg",
    },
    phone: {
      type: String,
      // required: [true, "Siz telefon rqam kitishingiz shart!"],
    },
    email: {
      type: String,
      unique: [true, "bu email ilgari ishlatilgan"],
      validate: [validator.isEmail, "Siz bu yerga email kirishingiz kerak!"],
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      validate: [
        validator.isStrongPassword,
        "Siz kuchliroq parol kiritshingiz kerak",
      ],
      select: false,
    },
    password_confirm: {
      type: String,
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Siz passwordlaringiz ikki xil bo'lib qoldi!",
      },
    },
    phone_active: {
      type: Boolean,
      default: false,
    },
    email_active: {
      type: Boolean,
      default: false,
    },
    active_user: {
      type: Boolean,
      default: true,
    },
    password_change_date: {
      type: Date,
      default: undefined,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
