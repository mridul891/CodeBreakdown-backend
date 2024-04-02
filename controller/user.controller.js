import { user } from '../models/user.models.js'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { cookieParser } from 'cookie-parser';

const SECRET_KEY = 'USERSELECTION'
export const signup = async (req, res) => {
    // Existing user
    // hashed Passwword
    // user Created
    // Token Generate
    const { name, email, password } = req.body;
    try {
        const cookie = cookieParser();
        const existingUser = await user.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists .Please Login" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await user.create({
            email: email,
            password: hashedPassword,
            name: name
        })

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({ user: result, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SomeThing got wrong" })
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await user.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const matchpassword = await bcrypt.compare(password, existingUser.password);

        if (!matchpassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY, { expiresIn: "30d" });
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        res.status(200).cookie("token", token, options).json({ user: existingUser, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SomeThing got wrong" })
    }
}