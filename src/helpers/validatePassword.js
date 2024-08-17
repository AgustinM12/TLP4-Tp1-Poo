import bcrypt from 'bcrypt'

export const verifyPassword = async (Password, PasswordHash) => {
    try {

        const match = await bcrypt.compare(Password, PasswordHash);

        return match;
    } catch (error) {
        throw new Error('Error al verificar la contraseña');
    }
}
