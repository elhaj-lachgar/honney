import jwt from "jsonwebtoken";

const GenerateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SUCRET_KEY_JWT, {
    expiresIn: process.env.EXIPRED_JWT,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 10* 24*3600* 1000),
    secure: process.env.NODE_ENV !== "dev",
  });
};

export default GenerateToken;
