import { model, Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserModel extends Model<IUser> {
    createDefaultAdmin(): Promise<void>;
}

// Definir el esquema de usuario
const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
}, {
    timestamps: true
});

// Middleware para encriptar la contraseña antes de guardar
UserSchema.pre<IUser>("save", async function (next) {
    const user = this

    // Solo encriptar la contraseña si ha sido modificada o es nueva

    if (!user.isModified("password")) {
        return next();
    }

    try {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        // Reemplazar la contraseña en texto plano con la encriptada
        user.password = hash;
        next();
    } catch (err) {
        next(err as Error);
    }
});

// Verificar si ya existe un usuario ADMIN
UserSchema.statics.createDefaultAdmin = async function (): Promise<void> {
    const User = this;

    const adminExists: IUser = await User.findOne({ name: "ADMIN" });

    if (!adminExists) {
        // Crear un nuevo usuario "ADMIN" con la contraseña "0000"
        const admin = new User({
            name: "ADMIN",
            password: "0000",
            email: "adminEmail@gmail.com",
            role: "ADMIN"
            // Esta será encriptada por el middlewarerole: "ADMIN"
        });
        await admin.save();
        console.log("Usuario ADMIN creado por defecto");
    }
};

// Crear el modelo
export const User = model<IUser, IUserModel>("users", UserSchema);

// Crear el usuario ADMIN por defecto

User.createDefaultAdmin();
