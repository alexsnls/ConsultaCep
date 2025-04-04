import { useState } from "react";
import axios from "axios";

export default function BuscaCEP() {
  const [cep, setCep] = useState("");
  interface DadosCEP {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
  }

  const [dados, setDados] = useState<DadosCEP | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const buscarCEP = async () => {
    if (!cep.match(/^\d{8}$/)) {
      setErro("CEP inválido! Digite 8 números.");
      setDados(null);
      return;
    }
    setErro(null);
    try {
      const response = await axios.get(`/api/cep/${cep}`);
      setDados(response.data);
    } catch (error) {
      setErro("CEP não encontrado!");
      setDados(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Busca de CEP</h1>
      <p className="text-gray-400 mb-6">Digite um CEP válido para buscar informações</p>
      <div className="relative w-full max-w-md">
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        <button
          className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition"
          onClick={buscarCEP}
        >
          Buscar
        </button>
      </div>
      {erro && <p className="text-red-500 mt-4">{erro}</p>}
      {dados && (
        <div className="mt-6 p-4 bg-gray-900 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Resultado:</h2>
          <p><strong>CEP:</strong> {dados.cep}</p>
          <p><strong>Logradouro:</strong> {dados.logradouro}</p>
          <p><strong>Bairro:</strong> {dados.bairro}</p>
          <p><strong>Cidade:</strong> {dados.localidade}</p>
          <p><strong>Estado:</strong> {dados.uf}</p>
        </div>
      )}
      <div className="absolute bottom-5 right-5 opacity-50">
        <img src="/brasil.png" alt="Mapa do Brasil" className="w-40" />
      </div>
    </div>
  );
}
