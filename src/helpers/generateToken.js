import jwt from 'jsonwebtoken'
import {} from "../controllers/user.controller"

const validarJWT = async (req, res, next) => {
    console.log(req.headers.authorization);
    
    const token = req.headers.authorization

    try {
        const { id } = jwt.verify(token, process.env.SECRET);

        // Leer el usuario que corresponde al id
        const user = await User.findByPk(id_user);

        if (!user) {
            return res.status(401).json({
                message: 'Token no válido - usuario no existe en la base de datos',
            });
        }

        // Verificar si el usuario está activo
        if (!user.estado) {
            return res.status(401).json({
                message: 'Token no válido - usuario con estado: false',
            });
        }

        console.log(user.user_name);

        next();
    } catch (error) {
        console.error(error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Sesión caducada',
            });
        }

        return res.status(401).json({
            message: 'Token no válido',
        });

        // res.redirect('/login');
    }
}

module.exports = {
    validarJWT,
}