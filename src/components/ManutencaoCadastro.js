import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useApi } from "../services/api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  descricao: Yup.string().required("Descrição é obrigatória"),
  data: Yup.date().required("Data da manutenção é obrigatória"),
});

const ManutencaoCadastro = () => {
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [equipamentos, setEquipamentos] = useState([]);
  const [equipamentoId, setEquipamentoId] = useState("");
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/equipamentos").then((response) => {
      setEquipamentos(response.data);
    });
  }, [api]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ descricao, data });

      // Verificação de data
      const equipamento = equipamentos.find((e) => e.id === equipamentoId);
      if (new Date(data) < new Date(equipamento.dataDeFabricacao)) {
        throw new Error("Data da manutenção não pode ser anterior à data de fabricação.");
      }

      await api.post("/manutencao", { descricao, data, equipamentoId });
      navigate("/relatorio"); // Redireciona para a tela de relatório
    } catch (error) {
      console.error("Erro ao cadastrar manutenção", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        fullWidth
      />
      <TextField
        label="Data da Manutenção"
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControl fullWidth>
        <InputLabel>Equipamento</InputLabel>
        <Select
          value={equipamentoId}
          onChange={(e) => setEquipamentoId(e.target.value)}
        >
          {equipamentos.map((equip) => (
            <MenuItem key={equip.id} value={equip.id}>
              {equip.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit">Cadastrar</Button>
    </form>
  );
};

export default ManutencaoCadastro;
