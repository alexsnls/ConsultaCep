import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

router.get("/cep/:cep", async (req: Request, res: Response) => {
  const { cep } = req.params;
  console.log(`Buscando CEP: ${cep}`); // Log para debug

  if (!cep.match(/^\d{8}$/)) {
    return res.status(400).json({ error: "CEP inválido!" });
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    console.log("Resposta da API ViaCEP:", response.data);

    if (response.data.erro) {
      return res.status(404).json({ error: "CEP não encontrado!" });
    }
    res.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar o CEP:", error);
    res.status(500).json({ error: "Erro ao buscar o CEP." });
  }
});

export default router;
