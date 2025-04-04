"use client"; 

import { useState } from "react";
import api from "@/lib/api";

export default function BuscarCEP() {
  const [cep, setCep] = useState("");
  const [data, setData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/cep/${cep}`);
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setData(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Consulta de CEP</h1>
      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleSearch}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Buscar
      </button>
      {data && (
        <pre className="mt-4 p-4 bg-white shadow rounded">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
