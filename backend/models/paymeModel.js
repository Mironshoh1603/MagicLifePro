const mongoose = require("mongoose");

const paymeSchema = new mongoose.Schema({
  payme_id: {
    type: String,
    // unique: true,
    // required: [true, "Payme must send id"],
  },
  time: {
    time: String,
  },
  amount: {
    type: Number,
  },
  account: {
    type: Number,
  },
  create_time: {
    type: String,
    default: Date.now(),
  },
  perform_time: {
    type: String,
  },
  cancel_time: {
    type: String,
    default: 0,
  },
  order_id: {
    type: Number,
  },
  state: {
    type: Number,
    enum: [1, 2, -1 - 2],
  },
  reason: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 10],
  },
  receivers: [
    {
      id: {
        type: String,
      },
      amount: Number,
    },
  ],
});

const Payme = mongoose.model("paymes", paymeSchema);

module.exports = Payme;
