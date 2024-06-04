import bcrypt from "bcrypt"

const createHash = async (plainText) => {
    const hash = await bcrypt.hash(plainText, 10)
    return hash
}

export { createHash}