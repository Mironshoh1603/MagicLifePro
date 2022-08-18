const CheckPreformTransaction = async (req, res, next) => {
  const id = req.body.params.account.id;
  if (id != 1) {
    res.status(200).json({
      result: {
        allow: -31050,
      },
    });
  }
};
const CreateTransaction = async (req, res, next) => {};
const PreformTransaction = async (req, res, next) => {};
const CancelTransaction = async (req, res, next) => {};
const CheckTransaction = async (req, res, next) => {};
const GetStatement = async (req, res, next) => {};

const handler = async (req, res, next) => {
  switch (req.body.method) {
    case "CheckPreformTransaction":
      CheckPreformTransaction(req, res, next);
      break;
    case "CreateTransaction":
      CreateTransaction(req, res, next);
      break;

    case "PreformTransaction":
      PreformTransaction(req, res, next);
      break;

    case "CancelTransaction":
      CancelTransaction(req, res, next);
      break;

    case "CheckTransaction":
      CheckTransaction(req, res, next);
      break;

    case "GetStatement":
      GetStatement(req, res, next);
      break;
    default:
      next;
  }
};

module.exports = { handler };
