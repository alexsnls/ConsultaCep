import { Router, Request, Response } from "express";
import pool from "../database";

const router = Router(); 

router.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao inserir usuário:", err);
    return res.status(500).json({ error: "Erro ao cadastrar usuário." });
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT id, name, email, created_at FROM users");
    return res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    return res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});


export default router;
