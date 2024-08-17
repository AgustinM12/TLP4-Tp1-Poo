import jwt from "jsonwebtoken"
const secretKey = process.env.SECRET

export const generateToken = (user) => {
    const tokenPayload = {
        id: user._id,
        username: user.username,
        email: user.email
    };

    // ! Crear el token con duracion de una hora
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });

    return token;
}


export const verifyToken = (req, res, next) => {
    // ! Obtener el token de los headers de la solicitud
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' });
    }

    try {
        //! Verificar el token
        const decoded = jwt.verify(token.split(' ')[1], secretKey);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido.' });
    }
}
