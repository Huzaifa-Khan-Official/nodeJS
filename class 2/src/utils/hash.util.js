import bcrypt from "bcrypt"

const createHash = async (plainText) => {
    const hash = await bcrypt.hash(plainText, 10)
    return hash
}

const compareHash = async (plainText, hash) => {
    const isMatch = await bcrypt.compare(plainText, hash)
    return isMatch
}

export { createHash, compareHash }