import { connect } from "mongoose"
import { URI } from "../config/config.js"

export const dbConnection = async (): Promise<void> => {
    try {
        if (URI != undefined) {
            await connect(URI)
            console.log("Base de datos conectada");
        } else {
            console.log("Debe proporcionar una URI de conexion a la DB");
        }
    } catch (error) {
        console.log("Error al conectar a la DB", error);
        process.exit()
    }
}

