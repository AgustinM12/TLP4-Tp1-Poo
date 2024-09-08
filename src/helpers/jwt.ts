import jwt from "jsonwebtoken"
import { secretKey } from "../config/config"
import { IUser } from "../models/User"
import { Request, Response, NextFunction } from "express"

interface IToken {
    id: unknown,
    name: string,
    email: string,
    role: string
}

interface AuthenticatedRequest extends Request {
    user?: any; // Ajusta el tipo según lo que esperas que sea `req.user`
}

export const generateToken = (user: IUser): string => {
    try {
        const tokenPayload: IToken = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        if (secretKey !== undefined) {
            // ! Crear el token con duracion de una hora
            const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });
            return token;
        } else {
            throw new Error("Debe proporcionar una clave secreta")
        }
    } catch (error) {
        throw new Error("Debe proporcionar una clave secreta")
    }
}


export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // ! Obtener el token de los headers de la solicitud
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' });
    }

    try {
        if (secretKey !== undefined) {
            //! Verificar el token
            const decoded = jwt.verify(token, secretKey);
            req.user = decoded;
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido.' });
    }
}

export const verifyAdminOrSeller = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const { role } = req.user;

    // ! Verificar si el rol es "ADMIN" o "SELLER"
    if (role === "ADMIN" || role === "SELLER") {
        next(); // Permitir el acceso
    } else {
        return res.status(403).json({ message: 'Acceso denegado. Requiere rol de ADMIN o SELLER.' });
    }
};

export const verifyAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const { role } = req.user;

    // ! Verificar si el rol es "ADMIN" o "SELLER"
    if (role === "ADMIN") {
        next(); // Permitir el acceso
    } else {
        return res.status(403).json({ message: 'Acceso denegado. Requiere rol de ADMIN.' });
    }
};