import dotenv from "dotenv";

dotenv.config();

const REQUIRED_VARS = ["PORT", "MONGODB_URI", "NODE_ENV"];

const missing = REQUIRED_VARS.filter((name) => !process.env[name]);

if (missing.length > 0) {
    throw new Error(
        `Configuración inválida: faltan las variables de entorno ${missing.join(",")}. ` + 
        `Revisa tu archivo .env (usá .env.example como guía).`
    );
}

const config = Object.freeze ({
    port: Number(process.env.PORT),
    mongoUri: process.env.MONGODB_URI,
    nodeEnv: process.env.NODE_ENV, 
    isDevelopment: process.env.NODE_ENV=== "development"
});

export default config