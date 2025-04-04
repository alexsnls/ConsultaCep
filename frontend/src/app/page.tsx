"use client";
import "@/styles/globals.css"; 

import { useState } from "react";
import api from "@/lib/api";

export default function Home() {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState<any>(null);
  const [erro, setErro] = useState("");

  async function buscarCep() {
    setErro("");
    setDados(null);

    if (!cep.match(/^\d{8}$/)) {
      setErro("CEP inválido! Digite 8 números.");
      return;
    }

    try {
      const response = await api.get(`/cep/${cep}`);
      setDados(response.data);
    } catch (error) {
      setErro("CEP não encontrado!");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-6xl font-bold mb-12">Consulta de CEP</h1>

      <div className="flex gap-6">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className="w-96 px-6 py-5 text-2xl border border-gray-600 bg-gray-900 text-white placeholder-gray-400 rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-500 transition"
        />

        <button
          onClick={buscarCep}
          className="px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-2xl hover:brightness-110 active:scale-95 transition duration-300 ease-in-out"
        >
          Buscar CEP
        </button>
      </div>

      {erro && <p className="text-red-400 mt-6 text-2xl">{erro}</p>}

      {dados && (
        <div className="mt-8 p-8 bg-gray-900 shadow-2xl rounded-2xl text-2xl">
          <p><strong>CEP:</strong> {dados.cep}</p>
          <p><strong>Logradouro:</strong> {dados.logradouro}</p>
          <p><strong>Bairro:</strong> {dados.bairro}</p>
          <p><strong>Cidade:</strong> {dados.localidade} - {dados.uf}</p>
        </div>
      )}
    </div>
  );
}
