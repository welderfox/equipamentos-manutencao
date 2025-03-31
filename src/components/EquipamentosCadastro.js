import React, { useState } from "react";
import { TextField, Button, Container, Paper, Typography, Grid } from "@mui/material";
import { useApi } from "../services/api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  nome: Yup.string().required("Nome é obrigatório"),
  setor: Yup.string().required("Setor é obrigatório"),
  dataFabricacao: Yup.date().required("Data de fabricação é obrigatória"),
});

const EquipamentosCadastro = () => {
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [dataFabricacao, setDataFabricacao] = useState("");
  const api = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ nome, setor, dataFabricacao });
      await api.post("/equipamentos", { nome, setor, dataFabricacao });
      navigate("/relatorio"); // Redireciona para a tela de relatório
    } catch (error) {
      console.error("Erro ao cadastrar equipamento", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Cadastro de Equipamento
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Setor"
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Data de Fabricação"
                type="date"
                value={dataFabricacao}
                onChange={(e) => setDataFabricacao(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EquipamentosCadastro;
