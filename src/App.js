import './App.css';
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EquipamentosCadastro from "./components/EquipamentosCadastro";
import ManutencaoCadastro from "./components/ManutencaoCadastro";
import Relatorio from "./components/Relatorio";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<EquipamentosCadastro />} />
          <Route path="/manutencao" element={<ManutencaoCadastro />} />
          <Route path="/relatorio" element={<Relatorio />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
