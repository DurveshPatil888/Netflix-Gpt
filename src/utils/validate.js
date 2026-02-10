export const CheckValidData = (fullname, email, password, isSignIn) => {
  if (!isSignIn) {
    const IsNameValid = /^[A-Za-z]{3,16}\s[A-Za-z]{3,16}$/.test(fullname);

    if (!IsNameValid) return 'Please enter your first and last name.';
  }

  const IsEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const IsPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!IsEmailValid) return 'Email Id is not valid';
  if (!IsPasswordValid) return 'Password is not valid';

  return null;
};
