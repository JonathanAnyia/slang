import cryptoHash from 'crypto';
import User from '../models/user.model.js';
import { signUpValidator, signInValidator } from '../validators/auth.validator.js';
import { formatZodError } from '../utils/errorMessage.js';
import generateTokenAndSetCookies from '../utils/generateTokenAndSetCookie.js';

function hashValue(value) {
    const hash = cryptoHash.createHash('sha256');
    hash.update(value);
    return hash.digest('hex')
}


function comparePassword(inputPassword, hashedPassword) {
    return hashValue(inputPassword)===hashedPassword
};


export const signUp = async (req, res) => {
    const registerResults = signUpValidator.safeParse(req.body)
    if (!registerResults) {
        return res.status(400).json(formatZodError(registerResults.error.issues))
    }
    try {
        const user = await User.findOne({email:req.body.email})
        if (user) {
            res.status(409).json({messaage:'User with email already exists'})
        } else {
            const {
                name,
                userName,
                password,
                confirmPassword,
                email,
                phoneNumber,
                bio,
                gender
            } = req.body

            if (password !== confirmPassword) {
                return res.status(400).json({message: "fuck u"})
            }

            const encryption = hashValue(password)
            const newUser = new User({
                name,
                userName,
                password,
                email,
                phoneNumber,
                bio,
                gender
            })
            await newUser.save()
            res.status(200).json({message: 'User registered succesfully',newUser})
            console.log('User registered succesfully',newUser);
        }
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log('INTERNAL SERVER ERROR',error.message)
    }
}

export const signIn = async (req, res, next) => {
    const logInResults = signInValidator.safeParse(req.body)
    if (!logInResults) {
        return res.status(400).json(formatZodError(logInResults.error.issues))
    } 

    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if  (!user) {
            return res.status(400).json({message: "User with email not found"})
        }
        const comparePass = comparePassword(password,user.passsword)
        if(!comparePass) {
            return res.status(400).json({message:"Password is incorrect"})
        }
        const accessToken = generateTokenAndSetCookies(user._id)

        res.status(200).json({message:"User Login successful",accessToken, user})
    }catch(error){
        res.status(500).json({message: error.message})
        console.log('INTERNAL SERVER ERROR',error.message)
    }
};
export const getSingleUsers = async() =>{

};

export const logout = async (req, res, next) => {

};