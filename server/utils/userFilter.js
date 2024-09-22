const userFilter =  (user) => {
  const virtual_user = user;
  virtual_user.password = undefined;
  virtual_user.resetCode = undefined;
  virtual_user.resetCodeSign = undefined;

  virtual_user.resetCode_At = undefined;
  virtual_user.role = undefined;
  virtual_user.changePassword_At = undefined;

  virtual_user.isResetCode = undefined;
  virtual_user.isResetCode_At = undefined;
  virtual_user.isValidSign = undefined;

  return virtual_user;
};

export default userFilter;
