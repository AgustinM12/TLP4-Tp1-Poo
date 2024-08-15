import { validationResult } from "express-validator";

export const validateSchema = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Formateamos los errores agrupados por campo
        const formattedErrors = errors.array().reduce((acc, error) => {
            const { path, msg } = error;
            // Si el campo no existe en el acumulador, lo inicializamos como un array vacío
            if (!acc[path]) {
                acc[path] = [];
            }
            // Añadimos el mensaje correspondiente al campo
            acc[path].push(msg);
            return acc;
        }, {});

        return res.status(400).json({ errors: formattedErrors });
    }

    next();
};
