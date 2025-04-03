import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useApi } from "../services/api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  nome: Yup.string().required("Nome é obrigatório"),
  setor: Yup.string().required("Setor é obrigatório"),
  dataDeFabricacao: Yup.date().required("Data de fabricação é obrigatória"),
});

const EquipamentosCadastro = () => {
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [dataDeFabricacao, setDataFabricacao] = useState("");
  const api = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ nome, setor, dataDeFabricacao });
      const formattedData = dataDeFabricacao.split("-").join("-"); // Formata para ano-mês-dia
      await api.post("/equipamentos", { nome, setor, dataDeFabricacao: formattedData });
      navigate("/relatorio");
    } catch (error) {
      console.error("Erro ao cadastrar equipamento", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Cadastro de Equipamento
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Setor"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Data de Fabricação"
          type="date"
          value={dataDeFabricacao}
          onChange={(e) => setDataFabricacao(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Cadastrar
        </Button>
      </form>
    </Container>
  );
};

export default EquipamentosCadastro;
