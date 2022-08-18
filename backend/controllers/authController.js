const User = require("../models/user");
const AppError = require("../utility/appError");
const { catchErrorAsync } = require("../utility/catchErrorAsync");
const Mail = require("../utility/mail");
const Code = require("../models/code");
const jwt = require("jsonwebtoken");

const saveCookie = (token, res) => {
  res.cookie("code", token, {
    maxAge: 3600000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
  });
};
createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 600,
  });
};

const signUp = catchErrorAsync(async (req, res, next) => {
  const randomCode = Math.round(Math.random() * 900000 + 100000);
  let token;
  if (req.body.email) {
    const user = {
      email: req.body.email,
    };
    await new Mail(user, randomCode).sendCode();

    const hasEmail = await Code.findOne({ email_or_phone: user.email });
    if (hasEmail) {
      token = createToken(hasEmail._id);
      console.log("xato");
      hasEmail.verified = false;
      await hasEmail.save();

      await Code.findByIdAndUpdate(
        hasEmail._id,
        {
          code: randomCode,
          expires_date: Date.now() + Number(process.env.EXPIRES_TIME_CODE),
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      const codeSave = await Code.create({
        email_or_phone: user.email,
        code: randomCode,
      });
      token = createToken(codeSave._id);
    }
  }
  saveCookie(token, res);
  res.status(200).json({
    status: "Succes",
    message: "Emailingizga kod jo'natildi",
  });
});

const verify_code = catchErrorAsync(async (req, res, next) => {
  const getCode = jwt.verify(req.cookies.code, process.env.JWT_SECRET_KEY);

  const user = await Code.findById(getCode.id);
  if (!user) {
    return next(new AppError("bunday User mavjud emas!", 404));
  }

  if (!(user.code == req.body.code && user.expires_date > Number(Date.now()))) {
    return next(new AppError("User codi yoki vati o'tganexpires_date ", 404));
  }
  console.log(user.code);
  user.verified = true;
  await user.save();

  res.status(200).json({
    status: "Succes",
    message: "Siz muvafaqiyatli vvertifikatsiyadan  o'tdingiz",
  });
});

const RegisterData = catchErrorAsync(async (req, res, next) => {
  const getCode = jwt.verify(req.cookies.code, process.env.JWT_SECRET_KEY);
  const code = await Code.findById(getCode.id);
  if (!code) {
    return next(new AppError("Siz oldin Signup qilishingiz kerak!", 404));
  }
  if (!code.verified) {
    return next(
      new AppError(
        "Siz oldin emailingizni vertifikatsiyadan o'tishingiz  kerak!",
        404
      )
    );
  }

  const isEmail = code.email_or_phone.includes("@");
  console.log(isEmail);
  const datas = {
    account_id: req.body.account_id,
    name: req.body.name,
    birth_date: req.body.birth_date,
    image: req.body.image,
    phone: !isEmail ? code.email_or_phone : null,
    email: isEmail ? code.email_or_phone : null,
    password: req.body.password,
    password_confirm: req.body.password_confirm,
    phone_active: !isEmail,
    email_active: isEmail,
  };

  const data = await User.create(datas);
  res.status(200).json({
    status: "Succes",
    data: datas,
  });
});

module.exports = { signUp, verify_code, RegisterData };
