const calculatePasswordStrength = (password) => {
  const regexLower = /[a-z]/g;
  const regexUpper = /[A-Z]/g;
  const regexNumber = /[0-9]/g;
  const regexSpecial = /[`~!@#$%^&*()_+{}|;:'",<.>?]/g;
  let passwordStrength = 0;

  if (password.match(regexLower)) {
    passwordStrength += 1;
  }
  if (password.match(regexUpper)) {
    passwordStrength += 1;
  }
  if (password.match(regexNumber)) {
    passwordStrength += 1;
  }
  if (password.match(regexSpecial)) {
    passwordStrength += 1;
  }

  return passwordStrength;
};

export default calculatePasswordStrength;
