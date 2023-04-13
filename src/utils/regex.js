export const isValidateEmail = (email) => {
  const emailReg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (!emailReg.test(email)) {
    return false;
  }
  return true;
};
