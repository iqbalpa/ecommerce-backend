const bcrypt = require('bcrypt');

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
}