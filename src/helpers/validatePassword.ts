import bcrypt from 'bcrypt'

export const verifyPassword = async (Password: string, PasswordHash: string): Promise<boolean> => {
    try {

        const match = await bcrypt.compare(Password, PasswordHash);
        if (match === true) {
            return match;
        } else {
            throw new Error("Las contraseñas no coinciden");
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Error desconocido al verificar la contraseña');
        }
    }
}
