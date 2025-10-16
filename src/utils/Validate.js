export const CheckValidData = (email, password) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*?&])[A-Za-z\d@!%*?&]{8,}$/.test(
      password
    );

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid)
    return "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.";

  return null;
};
