import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js"
import userRoutes from "./routes/user.routes.js"
import mockRoutes from "./routes/mock.routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/mocks", mockRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((req, res) => {
    res.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

export default app;