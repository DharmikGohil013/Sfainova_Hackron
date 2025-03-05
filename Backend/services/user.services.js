const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

class UserService {
    
    static async registerUser({
        name,
        mobile,
        email,
        password,
        height,
        weight,
        bloodGroup,
        age,
        allergies,
        medicalConditions,
        medications,
    }) {
        try {
            console.log("----- Registering User -----", email);

          
            const existingUserByEmail = await UserModel.findOne({ email });
            const existingUserByMobile = await UserModel.findOne({ mobile });

            if (existingUserByEmail) {
                throw new Error("User already exists with this email.");
            }
            if (existingUserByMobile) {
                throw new Error("User already exists with this mobile number.");
            }

           
            const newUser = new UserModel({
                name,
                mobile,
                email,
                password,
                height,
                weight,
                bloodGroup,
                age,
                allergies,
                medicalConditions,
                medications,
            });

           
            await newUser.save();
            return newUser;
        } catch (err) {
            throw err;
        }
    }

   
    static async getUserByEmail(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (err) {
            throw new Error("Error fetching user by email");
        }
    }


    static async checkUser(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            throw new Error("Error checking user");
        }
    }

   
    static async generateAccessToken(tokenData, JWTSecret_Key, JWT_EXPIRE) {
        try {
            return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
        } catch (error) {
            throw new Error("Token generation failed");
        }
    }

    static async getUserDataByEmail(email) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (err) {
            throw new Error("Error fetching user data by email");
        }
    }
}

module.exports = UserService;