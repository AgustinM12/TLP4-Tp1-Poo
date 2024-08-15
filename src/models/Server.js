import express from "express"
import cors from "cors"
import morgan from "morgan"
import { PORT } from "../config/config.js"
import productRouter from "../routes/products.routes.js"
import { dbConnection } from "../db/connectionDB.js"

class Server {

    constructor() {
        this.app = express();
        this.port = PORT;

        this.dbConnection()

        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json());
    }

    routes() {
        this.app.use("/api", productRouter);
    }

    listen() {
        this.app.listen(this.port, () => console.log("Servidor corriendo en http://localhost:" + this.port))
    }
}

export default Server