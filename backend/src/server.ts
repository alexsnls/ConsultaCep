import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import cepRoutes from "./routes/cepRoutes"; 

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", cepRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
