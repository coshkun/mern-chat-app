import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: "15d",
        algorithm: "HS256"
    });
    
   res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    //signed: true,
    httpOnly: true, // prevents XSS attacks crose-site scripting attacks
    sameSite:"strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development" ? true : false
   });

   return token;
};

export default generateTokenAndSetCookie;