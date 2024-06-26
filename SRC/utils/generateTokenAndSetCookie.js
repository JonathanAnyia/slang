import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expresIn: "15d",
    });

    res.cookies("jwt", token,{
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    return token;
};

export default generateTokenAndSetCookies;