import bcrypt from "bcrypt";

const hashPassword = async (password, salt = 10) => {
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
}

export {
  hashPassword,
  comparePassword
}

