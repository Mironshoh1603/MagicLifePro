const Payme = require("../models/paymeModel");

const openKassa = async (req, res, next) => {
  res.status(200).render("kassa");
};

const saveDataKassa = async (req, res, next) => {
  const amount = req.body.amount;

  // const jwt = req.cookies.jwt
  const merchant_id = process.env.PAYME_MARCHANT_ID;

  const data = await Payme.create({
    amount: amount,
    account: 1,
  });
  res.status(200).render("payme", data, merchant_id);
};

module.exports = {
  openKassa,
  saveDataKassa,
};
