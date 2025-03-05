const UserService = require("../services/user.services");

exports.register = async (req, res, next) => {
    try {
        const {
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
        } = req.body;

        if (
            !name ||
            !mobile ||
            !email ||
            !password ||
            !height ||
            !weight ||
            !bloodGroup ||
            !age
        ) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }


        await UserService.registerUser({
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

        res.status(201).json({ status: true, message: "User Registered Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and Password are required" });
        }

        let user = await UserService.checkUser(email);
        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const tokenData = { _id: user._id, email: user.email };
        const token = await UserService.generateAccessToken(
            tokenData,
            process.env.JWT_SECRET || "secret",
            "1h"
        );

        req.session.user = {
            id: user._id,
            email: user.email,
            name: user.name,
            mobile: user.mobile,
            bloodGroup: user.bloodGroup,
            height: user.height,
            weight: user.weight,
            age: user.age,
            allergies: user.allergies,
            medicalConditions: user.medicalConditions,
            medications: user.medications
        };
        
        res.status(200).json({
            status: true,
            message: "Login successful",
            user: req.session.user,
            token:token
        });

       
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserDataByEmail = async (req, res, next) => {
    try {
        const { email } = req.params; 
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const userData = await UserService.getUserDataByEmail(email);

        res.status(200).json({ status: true, data: userData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};