import jwt from "jsonwebtoken";

const GenerateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SUCRET_KEY_JWT, {
    expiresIn: process.env.EXIPRED_JWT,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
  });
};

export default GenerateToken;
