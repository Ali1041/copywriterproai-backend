const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, interestService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  // await authService.requestOneTimePassword(user.phoneNumber);
  res.status(httpStatus.CREATED).send({ user });
});

const verifyAccount = catchAsync(async (req, res) => {
  const { userId, phoneNumber, OTP } = req.body;
  const user = await userService.getUserById(userId);
  if (!user || user.phoneNumber !== phoneNumber) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'User not found!' });
  } else if (user.isVerified) {
    res.status(httpStatus.OK).send({ message: 'Account is already verified!' });
  } else {
    // const { status } = await authService.verifyPhoneNumber(phoneNumber, OTP);
    // if (status !== 'approved') {
    //   res.status(httpStatus.BAD_REQUEST).send({ message: 'Account verification failed.' });
    // } else {
      await userService.createUserPayment(userId);
      await interestService.createUserInterest(userId);
      await userService.updateUserById(user, userId, { isVerified: true, bookmarks: {} });
      res.status(httpStatus.OK).send({ message: 'Your account is verified!' });
    // }
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  verifyAccount,
  login,
  logout,
  refreshTokens,
  resetPassword,
};
