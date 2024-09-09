import { ValidationError, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateSchema = (allowedFields: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const receivedFields: string[] = Object.keys(req.body);

    const extraFields: string[] = receivedFields.filter((field: string) => !allowedFields.includes(field));

    if (extraFields.length > 0) {
        return res.status(400).json({
            errors: { message: `Los siguientes campos no están permitidos: ${extraFields.join(', ')}` }
        });
    }

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().reduce((acc: Record<string, string[]>, error: any) => {
            const { path, msg } = error;
            if (!acc[path]) {
                acc[path] = [];
            }
            acc[path].push(msg);
            return acc;
        }, {});

        return res.status(400).json({ errors: formattedErrors });
    }

    next();
};