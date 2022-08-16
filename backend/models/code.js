const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema(
  {
    email_or_phone: {
      type: String,
      required: true,
      unique: [true, "Bir xil email kirish mumkin emas!"],
    },
    code: {
      type: Number,
      required: true,
    },
    expires_date: {
      type: Number,
      default: Date.now() + Number(process.env.EXPIRES_TIME_CODE),
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Code = mongoose.model("codes", codeSchema);

module.exports = Code;
