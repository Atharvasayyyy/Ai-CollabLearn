import User from '../models/user.model.js';

export const createUser = async (email, password) => {
    const hashedPassword = await User.hashPassword(password);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    return newUser;
}
