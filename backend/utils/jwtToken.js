import jwt from "jsonwebtoken";

const createAccessToken = (userId, userEmail, userRole) => {
  return new Promise((resolve, reject) => {
    const payload = {
      sub: userId,
      email: userEmail,
      role: userRole,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "30m",
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(new Error("Internal Server Error Token"));
        return;
      }
      resolve(token);
    });
  });
};

const decodedToken = (accessToken, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, secret, (err, payload) => {
      if (err) {
        console.log(err.message);
        reject(new Error("Unauthorised User"));
        return;
      }
      resolve(payload);
    });
  });
};

export { createAccessToken, decodedToken };
