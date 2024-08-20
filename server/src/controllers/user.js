import User from "../models/user.js";

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { email } = userData;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exist' });
        }

        const savedData = await userData.save();
        res.status(200).json({ success: true, message: 'User Created Successfully', savedData });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error });
    }
};

export const getAll = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ success: true, userData });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error });
    }
};

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ success: true, userExist });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        // const userExist = await User.findOne({ _id: id });
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, message: 'User Updated Successfully', updatedData});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        // const userExist = await User.findOne({ _id: id });
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'User Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error });
    }
};